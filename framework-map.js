(() => {
  'use strict';

  const mapData = window.AEROSAFE_MAP_DATA;
  const ui = window.AEROSAFE_UI;
  const root = document.getElementById('framework-map');
  if (!mapData || !ui || !root) return;

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const escapeHtml = ui.escapeHtml || (value => String(value ?? ''));
  const modeById = new Map(mapData.modes.map(mode => [mode.id, mode]));
  const groupById = ui.groupById;

  const els = {
    modes: $('#framework-map-modes'),
    modeIntro: $('#framework-map-mode-intro'),
    svg: $('#framework-map-svg'),
    viewport: $('#framework-map-viewport'),
    detail: $('#framework-map-detail'),
    legend: $('#framework-map-legend'),
    tour: $('#framework-map-tour'),
    status: $('#framework-map-status'),
    prev: $('#framework-map-prev'),
    next: $('#framework-map-next'),
    play: $('#framework-map-play'),
    fit: $('#framework-map-fit'),
    zoomIn: $('#framework-map-zoom-in'),
    zoomOut: $('#framework-map-zoom-out'),
    textAlternative: $('#framework-map-text-alternative'),
  };

  if (Object.values(els).some(value => !value)) return;

  const state = {
    modeId: mapData.modes[0].id,
    nodeId: null,
    tourIndex: 0,
    timer: null,
    viewBox: null,
    drag: null,
  };

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const svgEl = (name, attrs = {}) => {
    const node = document.createElementNS(SVG_NS, name);
    Object.entries(attrs).forEach(([key, value]) => {
      if (value !== undefined && value !== null) node.setAttribute(key, String(value));
    });
    return node;
  };

  function currentMode() {
    return modeById.get(state.modeId);
  }

  function currentNode() {
    return currentMode().nodes.find(node => node.id === state.nodeId) || null;
  }

  function nodeById(id) {
    return currentMode().nodes.find(node => node.id === id) || null;
  }

  function kindLabel(kind) {
    return ({
      activity: 'Activity', decision: 'Decision point', output: 'Controlled output', complete: 'Completion state',
      phase: 'Lifecycle phase', gate: 'Review gate', band: 'Cross-cutting control',
    })[kind] || kind;
  }

  function criticalityLabel(value) {
    return ({ all: 'All criticality categories', ba: 'Criticality B & A path' })[value] || '';
  }

  function wrapText(label, maxChars) {
    const explicit = String(label || '').split(/\n+/).map(line => line.trim()).filter(Boolean);
    const lines = [];
    explicit.forEach(part => {
      const words = part.split(/\s+/);
      let line = '';
      words.forEach(word => {
        const candidate = line ? `${line} ${word}` : word;
        if (candidate.length > maxChars && line) {
          lines.push(line);
          line = word;
        } else line = candidate;
      });
      if (line) lines.push(line);
    });
    return lines.length ? lines : [''];
  }

  function addMultilineText(parent, label, x, y, width, className = 'map-node-label', options = {}) {
    const maxChars = options.maxChars || Math.max(12, Math.floor(width / 8.2));
    const lines = wrapText(label, maxChars);
    const lineHeight = options.lineHeight || 18;
    const text = svgEl('text', {
      x, y: y - ((lines.length - 1) * lineHeight) / 2,
      class: className,
      'text-anchor': options.anchor || 'middle',
      'dominant-baseline': 'middle',
    });
    lines.forEach((line, index) => {
      const span = svgEl('tspan', { x, dy: index === 0 ? 0 : lineHeight });
      span.textContent = line;
      text.appendChild(span);
    });
    parent.appendChild(text);
    return text;
  }

  function makeDefinitions() {
    const defs = svgEl('defs');
    const marker = (id, color, reverse = false) => {
      const markerNode = svgEl('marker', {
        id, markerWidth: 9, markerHeight: 9, refX: reverse ? 1 : 8, refY: 4.5,
        orient: reverse ? 'auto-start-reverse' : 'auto', markerUnits: 'strokeWidth',
      });
      markerNode.appendChild(svgEl('path', { d: reverse ? 'M 9 0 L 0 4.5 L 9 9 z' : 'M 0 0 L 9 4.5 L 0 9 z', fill: color }));
      defs.appendChild(markerNode);
    };
    marker('map-arrow', '#425966');
    marker('map-arrow-active', '#0f6e68');
    marker('map-arrow-start', '#425966', true);
    marker('map-arrow-start-active', '#0f6e68', true);
    const filter = svgEl('filter', { id: 'map-node-shadow', x: '-20%', y: '-20%', width: '140%', height: '150%' });
    filter.appendChild(svgEl('feDropShadow', { dx: 0, dy: 4, stdDeviation: 4, 'flood-color': '#102c3a', 'flood-opacity': .16 }));
    defs.appendChild(filter);
    return defs;
  }

  function renderRegion(region, layer) {
    const group = svgEl('g', { class: `map-region map-region-${region.class || 'default'}`, 'data-region-id': region.id });
    group.appendChild(svgEl('rect', { x: region.x, y: region.y, width: region.w, height: region.h, rx: 22, ry: 22 }));
    addMultilineText(group, region.label, region.x + region.w / 2, region.y + 32, region.w - 24, 'map-region-label', { maxChars: 46, lineHeight: 22 });
    layer.appendChild(group);
  }

  function renderEdge(edge, layer) {
    const group = svgEl('g', { class: `map-edge-group ${edge.relation ? 'is-relation' : ''}`, 'data-edge-id': edge.id, 'data-from': edge.from, 'data-to': edge.to });
    const path = svgEl('path', {
      d: edge.path,
      class: 'map-edge',
      'marker-end': edge.relation ? undefined : 'url(#map-arrow)',
      'marker-start': edge.bidirectional ? 'url(#map-arrow-start)' : undefined,
    });
    group.appendChild(path);
    if (edge.label) {
      const label = svgEl('text', {
        x: edge.label_x, y: edge.label_y,
        class: `map-edge-label ${String(edge.outcome || '').toLowerCase().startsWith('no') ? 'is-negative' : ''}`,
        'text-anchor': 'start',
      });
      const lines = wrapText(edge.label, edge.label.length > 32 ? 34 : 26);
      lines.forEach((line, index) => {
        const span = svgEl('tspan', { x: edge.label_x, dy: index === 0 ? 0 : 15 });
        span.textContent = line;
        label.appendChild(span);
      });
      group.appendChild(label);
    }
    layer.appendChild(group);
  }

  function polygonPoints(node) {
    const { x, y, w, h } = node;
    const inset = Math.min(42, w * .18);
    return [
      [x + inset, y], [x + w - inset, y], [x + w, y + h / 2],
      [x + w - inset, y + h], [x + inset, y + h], [x, y + h / 2],
    ].map(point => point.join(',')).join(' ');
  }

  function outputPath(node) {
    const { x, y, w, h } = node;
    const fold = Math.min(28, h * .42);
    return `M ${x} ${y} H ${x + w - fold} L ${x + w} ${y + fold} V ${y + h} H ${x} Z M ${x + w - fold} ${y} V ${y + fold} H ${x + w}`;
  }

  function renderBand(node, layer) {
    const group = svgEl('g', {
      class: 'map-node map-band-node', 'data-node-id': node.id, role: 'button', tabindex: 0,
      'aria-label': `${node.label}. ${kindLabel(node.kind)}.`,
    });
    group.appendChild(svgEl('rect', { x: node.x, y: node.y, width: node.w, height: node.h, rx: 20, ry: 20, class: 'map-band-shape' }));
    const labelY = node.band_position === 'bottom' ? node.y + node.h + 28 : node.y - 20;
    addMultilineText(group, node.label, node.x + node.w / 2, labelY, node.w - 40, 'map-band-label', { maxChars: 90, lineHeight: 17 });
    layer.appendChild(group);
  }

  function renderNode(node, layer) {
    if (node.kind === 'band') {
      renderBand(node, layer);
      return;
    }
    const group = svgEl('g', {
      class: `map-node kind-${node.kind} ${node.criticality ? `criticality-${node.criticality}` : ''}`,
      'data-node-id': node.id, role: 'button', tabindex: 0,
      'aria-label': `${node.label}. ${kindLabel(node.kind)}.`,
    });
    const title = svgEl('title');
    title.textContent = `${node.label}: ${node.description}`;
    group.appendChild(title);

    if (node.kind === 'complete') {
      group.appendChild(svgEl('circle', { cx: node.cx, cy: node.cy, r: node.r + 7, class: 'map-complete-ring' }));
      group.appendChild(svgEl('circle', { cx: node.cx, cy: node.cy, r: node.r, class: 'map-complete-core' }));
      addMultilineText(group, node.label, node.cx, node.cy + node.r + 37, 150, 'map-complete-label', { maxChars: 24, lineHeight: 16 });
    } else if (node.kind === 'decision') {
      group.appendChild(svgEl('polygon', { points: polygonPoints(node), class: 'map-node-shape' }));
      addMultilineText(group, node.label, node.x + node.w / 2, node.y + node.h / 2, node.w - 65, 'map-node-label', { lineHeight: 18 });
    } else if (node.kind === 'output') {
      group.appendChild(svgEl('path', { d: outputPath(node), class: 'map-node-shape map-output-shape' }));
      addMultilineText(group, node.label, node.x + node.w / 2 - 6, node.y + node.h / 2 + 2, node.w - 48, 'map-node-label', { lineHeight: 17 });
    } else {
      group.appendChild(svgEl('rect', { x: node.x, y: node.y, width: node.w, height: node.h, rx: node.kind === 'gate' ? 8 : 15, ry: node.kind === 'gate' ? 8 : 15, class: 'map-node-shape' }));
      addMultilineText(group, node.label, node.x + node.w / 2, node.y + node.h / 2, node.w - 28, 'map-node-label', { lineHeight: node.kind === 'phase' ? 17 : 18 });
    }
    layer.appendChild(group);
  }

  function renderSvg() {
    const mode = currentMode();
    els.svg.replaceChildren();
    els.svg.appendChild(makeDefinitions());
    els.svg.setAttribute('aria-label', `${mode.title}. Select any node to inspect its checklist groups and guided stages.`);

    const regionLayer = svgEl('g', { class: 'map-region-layer' });
    mode.regions.forEach(region => renderRegion(region, regionLayer));
    els.svg.appendChild(regionLayer);

    const bandLayer = svgEl('g', { class: 'map-band-layer' });
    mode.nodes.filter(node => node.kind === 'band').forEach(node => renderNode(node, bandLayer));
    els.svg.appendChild(bandLayer);

    const edgeLayer = svgEl('g', { class: 'map-edge-layer' });
    mode.edges.forEach(edge => renderEdge(edge, edgeLayer));
    els.svg.appendChild(edgeLayer);

    const nodeLayer = svgEl('g', { class: 'map-node-layer' });
    mode.nodes.filter(node => node.kind !== 'band').forEach(node => renderNode(node, nodeLayer));
    els.svg.appendChild(nodeLayer);

    bindSvgEvents();
    updateViewBox();
    updateHighlight();
  }

  function fitView() {
    const [x, y, w, h] = currentMode().view_box;
    state.viewBox = { x, y, w, h };
    updateViewBox();
  }

  function updateViewBox() {
    if (!state.viewBox) fitView();
    const { x, y, w, h } = state.viewBox;
    els.svg.setAttribute('viewBox', `${x} ${y} ${w} ${h}`);
    const base = currentMode().view_box;
    const zoom = base[2] / w;
    els.viewport.dataset.zoom = zoom.toFixed(2);
    els.zoomIn.disabled = zoom >= 3.8;
    els.zoomOut.disabled = zoom <= .68;
  }

  function zoomBy(factor, clientPoint = null) {
    const base = currentMode().view_box;
    const current = state.viewBox;
    const minW = base[2] / 4;
    const maxW = base[2] * 1.45;
    let newW = Math.min(maxW, Math.max(minW, current.w * factor));
    let newH = newW * (base[3] / base[2]);
    let focusX = current.x + current.w / 2;
    let focusY = current.y + current.h / 2;
    if (clientPoint) {
      const rect = els.svg.getBoundingClientRect();
      const px = (clientPoint.x - rect.left) / rect.width;
      const py = (clientPoint.y - rect.top) / rect.height;
      focusX = current.x + px * current.w;
      focusY = current.y + py * current.h;
      state.viewBox = {
        x: focusX - px * newW,
        y: focusY - py * newH,
        w: newW, h: newH,
      };
    } else {
      state.viewBox = { x: focusX - newW / 2, y: focusY - newH / 2, w: newW, h: newH };
    }
    updateViewBox();
  }

  function focusNode(node) {
    if (!node) return;
    const base = currentMode().view_box;
    let x, y, w, h;
    if (node.kind === 'complete') {
      x = node.cx - 130; y = node.cy - 105; w = 260; h = 210;
    } else {
      const padding = node.kind === 'band' ? 75 : 85;
      x = node.x - padding; y = node.y - padding; w = node.w + padding * 2; h = node.h + padding * 2;
    }
    const targetRatio = base[2] / base[3];
    if (w / h > targetRatio) h = w / targetRatio;
    else w = h * targetRatio;
    const minW = base[2] / 3.5;
    if (w < minW) {
      const cx = x + w / 2; const cy = y + h / 2;
      w = minW; h = w / targetRatio; x = cx - w / 2; y = cy - h / 2;
    }
    state.viewBox = { x, y, w, h };
    updateViewBox();
  }

  function branchesFor(nodeId) {
    return currentMode().edges.filter(edge => edge.from === nodeId && (edge.outcome || edge.label));
  }

  function relatedNodeIds(nodeId) {
    const ids = new Set([nodeId]);
    currentMode().edges.forEach(edge => {
      if (edge.from === nodeId) ids.add(edge.to);
      if (edge.to === nodeId) ids.add(edge.from);
    });
    return ids;
  }

  function updateHighlight() {
    const node = currentNode();
    if (!node) return;
    const related = relatedNodeIds(node.id);
    $$('.map-node', els.svg).forEach(element => {
      const selected = element.dataset.nodeId === node.id;
      element.classList.toggle('is-selected', selected);
      element.classList.toggle('is-related', !selected && related.has(element.dataset.nodeId));
      element.classList.toggle('is-muted', !related.has(element.dataset.nodeId));
      element.setAttribute('aria-pressed', String(selected));
    });
    $$('.map-edge-group', els.svg).forEach(element => {
      const active = element.dataset.from === node.id || element.dataset.to === node.id;
      element.classList.toggle('is-active', active);
      element.classList.toggle('is-muted', !active);
      const path = $('.map-edge', element);
      if (path && !element.classList.contains('is-relation')) {
        path.setAttribute('marker-end', active ? 'url(#map-arrow-active)' : 'url(#map-arrow)');
        if (path.hasAttribute('marker-start')) path.setAttribute('marker-start', active ? 'url(#map-arrow-start-active)' : 'url(#map-arrow-start)');
      }
    });
    $$('.map-tour-step', els.tour).forEach(button => {
      const selected = button.dataset.nodeId === node.id;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-current', selected ? 'step' : 'false');
    });
  }

  function openGroup(groupId) {
    stopTour();
    if (typeof ui.openGroup === 'function') ui.openGroup(groupId, 'construction');
    else {
      location.hash = `group-${groupId}`;
      document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function openGuidedStage(stageNumber) {
    stopTour();
    const index = Number(stageNumber) - 1;
    if (window.AEROSAFE_GUIDED?.goToStage) window.AEROSAFE_GUIDED.goToStage(index);
    else if (window.AEROSAFE_GUIDED?.openStage) window.AEROSAFE_GUIDED.openStage(index);
    else document.getElementById('guided-use')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderDetail() {
    const node = currentNode();
    if (!node) return;
    const mode = currentMode();
    const groups = (node.groups || []).map(id => groupById.get(id)).filter(Boolean);
    const branches = branchesFor(node.id);
    const criticality = criticalityLabel(node.criticality);
    const sourceTrace = mode.id === 'assurance-flow'
      ? `<p><strong>Source node:</strong> <code>${escapeHtml(node.source_id || 'not assigned')}</code></p><p><strong>Source wording:</strong> ${escapeHtml(node.source_label || node.label)}</p>`
      : `<p><strong>Source element:</strong> ${escapeHtml(node.source_label || node.label)}</p>`;

    els.detail.innerHTML = `
      <div class="map-detail-head">
        <div>
          <p class="mini-label">${escapeHtml(mode.figure_reference)} · ${escapeHtml(kindLabel(node.kind))}</p>
          <h3>${escapeHtml(node.label)}</h3>
        </div>
        <button class="map-detail-focus" type="button" data-map-focus>Focus in map</button>
      </div>
      <div class="map-detail-badges">
        <span>${escapeHtml(kindLabel(node.kind))}</span>
        ${criticality ? `<span>${escapeHtml(criticality)}</span>` : ''}
      </div>
      <p class="map-detail-description">${escapeHtml(node.description)}</p>
      <aside class="map-question"><strong>Question for the project record</strong><span>${escapeHtml(node.user_question)}</span></aside>
      <div class="map-detail-section">
        <h4>Relevant checklist groups</h4>
        <div class="map-link-list">
          ${groups.length ? groups.map(group => `<button type="button" class="map-group-link" data-map-group="${escapeHtml(group.id)}"><span>${escapeHtml(group.code)}</span><strong>${escapeHtml(group.group_name)}</strong><small>${group.item_count} controls</small></button>`).join('') : '<p>No item-level group is assigned to this navigation element.</p>'}
        </div>
      </div>
      <div class="map-detail-section">
        <h4>Continue in guided project mode</h4>
        <div class="map-stage-links">
          ${(node.wizard_stages || []).map(stage => {
            const step = ui.data.guided_use.steps[stage - 1];
            return `<button type="button" data-map-stage="${stage}"><span>Stage ${stage}</span>${escapeHtml(step?.title || '')}</button>`;
          }).join('')}
        </div>
      </div>
      ${branches.length ? `<div class="map-detail-section"><h4>Outgoing path${branches.length > 1 ? 's' : ''}</h4><div class="map-branch-list">${branches.map(edge => `<button type="button" data-map-target="${escapeHtml(edge.to)}" class="${String(edge.outcome || '').toLowerCase().startsWith('no') ? 'negative' : ''}"><span>${escapeHtml(edge.outcome || edge.label)}</span><strong>Continue to ${escapeHtml(nodeById(edge.to)?.label || edge.to)}</strong></button>`).join('')}</div></div>` : ''}
      <details class="map-source-trace"><summary>Source traceability</summary>${sourceTrace}${mode.id === 'assurance-flow' && branches.some(edge => edge.source_inference) ? `<p class="map-inference-note">${escapeHtml(branches.find(edge => edge.source_inference)?.source_inference)}</p>` : ''}</details>
    `;

    $('[data-map-focus]', els.detail)?.addEventListener('click', () => focusNode(node));
    $$('[data-map-group]', els.detail).forEach(button => button.addEventListener('click', () => openGroup(button.dataset.mapGroup)));
    $$('[data-map-stage]', els.detail).forEach(button => button.addEventListener('click', () => openGuidedStage(button.dataset.mapStage)));
    $$('[data-map-target]', els.detail).forEach(button => button.addEventListener('click', () => selectNode(button.dataset.mapTarget, { announce: true })));
  }

  function renderTour() {
    const mode = currentMode();
    els.tour.innerHTML = mode.tour.map((nodeId, index) => {
      const node = mode.nodes.find(item => item.id === nodeId);
      return `<button type="button" class="map-tour-step" data-node-id="${escapeHtml(nodeId)}"><span>${index + 1}</span><strong>${escapeHtml(node?.label || nodeId)}</strong></button>`;
    }).join('');
    $$('.map-tour-step', els.tour).forEach(button => button.addEventListener('click', () => selectNode(button.dataset.nodeId, { announce: true })));
  }

  function renderLegend() {
    els.legend.innerHTML = currentMode().legend.map(item => `<li class="legend-${escapeHtml(item.key)}"><span aria-hidden="true"></span>${escapeHtml(item.label)}</li>`).join('');
  }

  function renderTextAlternative() {
    const mode = currentMode();
    els.textAlternative.innerHTML = `<ol>${mode.tour.map(nodeId => {
      const node = mode.nodes.find(item => item.id === nodeId);
      return `<li><strong>${escapeHtml(node.label)}</strong><span>${escapeHtml(node.description)}</span></li>`;
    }).join('')}</ol>`;
  }

  function updateStatus() {
    const mode = currentMode();
    const index = mode.tour.indexOf(state.nodeId);
    state.tourIndex = index >= 0 ? index : 0;
    const node = currentNode();
    els.status.textContent = `${mode.figure_reference} · ${index >= 0 ? `Step ${index + 1} of ${mode.tour.length}` : 'Supporting element'} · ${node?.label || ''}`;
    els.prev.disabled = index <= 0;
    els.next.disabled = index < 0 || index >= mode.tour.length - 1;
  }

  function selectNode(nodeId, options = {}) {
    if (!nodeById(nodeId)) return;
    state.nodeId = nodeId;
    updateHighlight();
    renderDetail();
    updateStatus();
    if (options.focus) focusNode(currentNode());
    if (options.announce) els.detail.focus({ preventScroll: true });
  }

  function setMode(modeId) {
    if (!modeById.has(modeId)) return;
    stopTour();
    state.modeId = modeId;
    const mode = currentMode();
    state.nodeId = mode.tour[0];
    state.tourIndex = 0;
    state.viewBox = null;
    $$('.map-mode-tab', els.modes).forEach(button => {
      const active = button.dataset.mapMode === modeId;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    els.modeIntro.innerHTML = `<strong>${escapeHtml(mode.title)}</strong><span>${escapeHtml(mode.intro)}</span>`;
    renderSvg();
    renderTour();
    updateHighlight();
    renderLegend();
    renderTextAlternative();
    renderDetail();
    updateStatus();
  }

  function renderModeTabs() {
    els.modes.innerHTML = mapData.modes.map(mode => `<button type="button" class="map-mode-tab" data-map-mode="${escapeHtml(mode.id)}" role="tab" aria-selected="false"><span>${escapeHtml(mode.figure_reference)}</span><strong>${escapeHtml(mode.short_title)}</strong></button>`).join('');
    $$('.map-mode-tab', els.modes).forEach(button => button.addEventListener('click', () => setMode(button.dataset.mapMode)));
  }

  function previousStep() {
    const mode = currentMode();
    const index = mode.tour.indexOf(state.nodeId);
    if (index > 0) selectNode(mode.tour[index - 1], { announce: true });
  }

  function nextStep() {
    const mode = currentMode();
    const index = mode.tour.indexOf(state.nodeId);
    if (index >= 0 && index < mode.tour.length - 1) selectNode(mode.tour[index + 1], { announce: true });
    else stopTour();
  }

  function startTour() {
    if (state.timer) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      selectNode(currentMode().tour[0], { announce: true });
      return;
    }
    if (currentMode().tour.indexOf(state.nodeId) >= currentMode().tour.length - 1) selectNode(currentMode().tour[0]);
    els.play.textContent = 'Pause tour';
    els.play.setAttribute('aria-pressed', 'true');
    state.timer = window.setInterval(() => {
      const mode = currentMode();
      const index = mode.tour.indexOf(state.nodeId);
      if (index >= mode.tour.length - 1) stopTour();
      else selectNode(mode.tour[index + 1]);
    }, 2600);
  }

  function stopTour() {
    if (state.timer) window.clearInterval(state.timer);
    state.timer = null;
    els.play.textContent = 'Play guided tour';
    els.play.setAttribute('aria-pressed', 'false');
  }

  function toggleTour() {
    if (state.timer) stopTour();
    else startTour();
  }

  function bindSvgEvents() {
    $$('.map-node', els.svg).forEach(element => {
      const activate = () => selectNode(element.dataset.nodeId, { announce: true });
      element.addEventListener('click', event => { event.stopPropagation(); activate(); });
      element.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault(); activate();
        }
      });
      element.addEventListener('dblclick', event => { event.stopPropagation(); focusNode(nodeById(element.dataset.nodeId)); });
    });
  }

  function bindEvents() {
    els.prev.addEventListener('click', previousStep);
    els.next.addEventListener('click', nextStep);
    els.play.addEventListener('click', toggleTour);
    els.fit.addEventListener('click', fitView);
    els.zoomIn.addEventListener('click', () => zoomBy(.8));
    els.zoomOut.addEventListener('click', () => zoomBy(1.25));

    els.viewport.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); previousStep(); }
      if (event.key === 'ArrowRight') { event.preventDefault(); nextStep(); }
      if (event.key === '+' || event.key === '=') { event.preventDefault(); zoomBy(.8); }
      if (event.key === '-') { event.preventDefault(); zoomBy(1.25); }
      if (event.key === '0') { event.preventDefault(); fitView(); }
      if (event.key === 'Escape') stopTour();
    });

    els.viewport.addEventListener('wheel', event => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      zoomBy(event.deltaY < 0 ? .86 : 1.16, { x: event.clientX, y: event.clientY });
    }, { passive: false });

    els.svg.addEventListener('pointerdown', event => {
      if (event.target.closest('.map-node')) return;
      const rect = els.svg.getBoundingClientRect();
      state.drag = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, view: { ...state.viewBox }, width: rect.width, height: rect.height };
      els.svg.setPointerCapture(event.pointerId);
      els.viewport.classList.add('is-dragging');
    });
    els.svg.addEventListener('pointermove', event => {
      if (!state.drag || state.drag.pointerId !== event.pointerId) return;
      const dx = (event.clientX - state.drag.x) / state.drag.width * state.drag.view.w;
      const dy = (event.clientY - state.drag.y) / state.drag.height * state.drag.view.h;
      state.viewBox = { ...state.drag.view, x: state.drag.view.x - dx, y: state.drag.view.y - dy };
      updateViewBox();
    });
    const endDrag = event => {
      if (!state.drag || state.drag.pointerId !== event.pointerId) return;
      state.drag = null;
      els.viewport.classList.remove('is-dragging');
    };
    els.svg.addEventListener('pointerup', endDrag);
    els.svg.addEventListener('pointercancel', endDrag);
    els.svg.addEventListener('dblclick', event => {
      if (!event.target.closest('.map-node')) fitView();
    });

    els.detail.addEventListener('keydown', event => {
      if (event.key === 'Escape') els.viewport.focus();
    });
  }

  renderModeTabs();
  bindEvents();
  setMode(state.modeId);

  window.AEROSAFE_MAP = {
    setMode,
    selectNode: id => selectNode(id, { announce: true }),
    fit: fitView,
  };
})();
