(() => {
  'use strict';

  const data = window.AEROSAFE_DATA;
  if (!data) throw new Error('AEROSAFE_DATA is not available.');

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const escapeHtml = value => String(value ?? '')
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
  const normalize = value => String(value || '').toLowerCase().replace(/[–—]/g, '-');

  function expandItemSpec(spec) {
    const ids = [];
    String(spec).split(';').map(part => part.trim()).filter(Boolean).forEach(part => {
      const match = part.match(/^([A-Z]+)-(\d+) to ([A-Z]+)-(\d+)$/);
      if (match) {
        const [, p1, a, p2, b] = match;
        if (p1 !== p2) return;
        const width = Math.max(a.length, b.length);
        for (let n = Number(a); n <= Number(b); n += 1) ids.push(`${p1}-${String(n).padStart(width, '0')}`);
      } else ids.push(part);
    });
    return ids;
  }

  const itemMap = new Map();
  data.appendix_tables.forEach(storage => storage.items.forEach(item => itemMap.set(item.id, item)));
  const groups = data.table7.map(group => {
    const ids = group.refs.flatMap(ref => expandItemSpec(ref.items));
    return { ...group, ids, items: ids.map(id => itemMap.get(id)).filter(Boolean) };
  });
  const groupById = new Map(groups.map(group => [group.id, group]));
  const groupByItem = new Map(groups.flatMap(group => group.ids.map(id => [id, group])));

  const state = {
    groupId: groups[0].id,
    view: 'construction',
    search: ''
  };

  function statusOf(item) {
    const match = String(item['source/status']).match(/Status:\s*([^.;]+)/i);
    return match ? match[1].trim() : 'Project-tailored';
  }

  function renderHeader() {
    $('#framework-disclaimer').textContent = data.metadata.disclaimer;
    $('#control-count').textContent = itemMap.size;
    $('#group-count').textContent = groups.length;
    $('#footer-version').textContent = `${data.metadata.version} · ${itemMap.size} controls · ${groups.length} named groups`;
    const tupleLabels = {
      'source/status': 'source / status', objective: 'objective', inputs: 'inputs', owner: 'owner',
      evidence: 'planned evidence', 'acceptance criterion': 'acceptance criterion', gate: 'gate',
      'closure authority': 'closure authority', links: 'traceability links', residuals: 'residuals'
    };
    $('#tuple-list').innerHTML = data.schema.map(field => `<li>${escapeHtml(tupleLabels[field] || field)}</li>`).join('');
  }

  function renderWorkflow() {
    $('#workflow-steps').innerHTML = data.guided_use.steps.map(step => `
      <article class="workflow-step">
        <span class="step-no">Stage ${escapeHtml(step.number)}</span>
        <h3>${escapeHtml(step.title)}</h3>
        <p>${escapeHtml(step.user_action)}</p>
      </article>`).join('');
  }

  function groupCard(group) {
    const selected = state.groupId === group.id;
    return `<button class="group-card ${selected ? 'selected' : ''}" type="button" data-group-id="${escapeHtml(group.id)}" aria-pressed="${selected}">
      <span class="group-code">${escapeHtml(group.code)}</span>
      <span class="group-count">${group.item_count} controls</span>
      <strong>${escapeHtml(group.group_name)}</strong>
      <span>${escapeHtml(group.purpose)}</span>
      <small>${escapeHtml(group.item_spec)}</small>
    </button>`;
  }

  function renderCatalogue() {
    $('#group-catalogue').innerHTML = groups.map(groupCard).join('');
    renderSelectedGroup();
  }

  function field(label, value, className = '') {
    return `<div class="control-field ${className}"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value || 'Not specified')}</dd></div>`;
  }

  function constructionCard(item) {
    return `<details class="control-card" id="item-${escapeHtml(item.id)}">
      <summary>
        <span class="control-id">${escapeHtml(item.id)}</span>
        <span class="control-summary"><strong>${escapeHtml(item.objective)}</strong><small>${escapeHtml(statusOf(item))}</small></span>
        <span class="details-cue">Open record</span>
      </summary>
      <div class="control-card-body">
        <dl class="control-definition-grid">
          ${field('Source / status', item['source/status'])}
          ${field('Project inputs', item.inputs)}
          ${field('Planned evidence', item.evidence)}
          ${field('Acceptance criterion', item['acceptance criterion'])}
          ${field('Owner', item.owner)}
          ${field('Review gate', item.gate)}
          ${field('Closure authority', item['closure authority'])}
          ${field('Traceability links', item.links, 'trace-field')}
          ${field('Residual handling', item.residuals, 'residual-field')}
        </dl>
      </div>
    </details>`;
  }

  function executionCard(item) {
    return `<article class="execution-template-card" id="item-${escapeHtml(item.id)}-execution">
      <header><span class="control-id">${escapeHtml(item.id)}</span><div><strong>${escapeHtml(item.objective)}</strong><small>Configured criterion: ${escapeHtml(item['acceptance criterion'])}</small></div></header>
      <div class="execution-template-grid">
        <div><span>Applicability</span><p>□ M &nbsp; □ C &nbsp; □ N.A.</p></div>
        <div><span>Evidence / controlled record</span><p class="blank-line">Record ID and configuration</p></div>
        <div><span>Result</span><p>□ pass &nbsp; □ fail &nbsp; □ blocked &nbsp; □ N.A.</p></div>
        <div><span>Finding / waiver / decision</span><p class="blank-line">Identifier and disposition</p></div>
        <div><span>Closure authority / gate / date</span><p class="blank-line">Named role or body</p></div>
        <div><span>Traceability links</span><p class="blank-line">Hazards, requirements, configurations, claims, findings</p></div>
        <div class="wide"><span>Residuals / limitations</span><p class="blank-line">Open conditions retained with the baseline</p></div>
      </div>
    </article>`;
  }

  function renderSelectedGroup() {
    const group = groupById.get(state.groupId);
    $('#selected-group-title').innerHTML = `<span class="group-code inline">${escapeHtml(group.code)}</span> ${escapeHtml(group.group_name)}`;
    $('#selected-group-summary').textContent = `${group.purpose} ${group.item_spec} (${group.item_count} controls).`;
    const query = normalize(state.search);
    const items = group.items.filter(item => !query || normalize([item.id, ...data.schema.map(fieldName => item[fieldName])].join(' ')).includes(query));
    $('#control-view').innerHTML = items.length
      ? (state.view === 'construction' ? items.map(constructionCard).join('') : items.map(executionCard).join(''))
      : '<div class="empty-state dark-empty">No controls match this search.</div>';
    $$('.group-card').forEach(card => {
      const selected = card.dataset.groupId === state.groupId;
      card.classList.toggle('selected', selected);
      card.setAttribute('aria-pressed', String(selected));
    });
  }

  function genericConstructionCard(row) {
    return `<details class="iv-record-card" open>
      <summary><span class="control-id">${escapeHtml(row.item)}</span><strong>${escapeHtml(row.configure)}</strong></summary>
      <dl>
        ${field('Inputs and traceability', row.traceability)}
        ${field('Planned evidence / acceptance', row.planned_acceptance)}
        ${field('Responsibility, gate, closure', row.responsibility)}
        ${field('Residual rule', row.residual_rule)}
      </dl>
    </details>`;
  }

  function genericExecutionCard(row) {
    const id = escapeHtml(row.item);
    return `<article class="iv-fill-card">
      <header><span class="control-id">${id}</span><strong>${escapeHtml(row.check)}</strong></header>
      <div class="iv-fill-grid">
        <label><span>${escapeHtml(row.evidence_prompt)}</span><textarea aria-label="${id} evidence"></textarea></label>
        <label><span>${escapeHtml(row.decision_prompt)}</span><textarea aria-label="${id} result and finding"></textarea></label>
        <label><span>${escapeHtml(row.closure_prompt)}</span><textarea aria-label="${id} closure and residuals"></textarea></label>
      </div>
      <div class="inline-checks"><label><input type="checkbox"> Pass</label><label><input type="checkbox"> Fail</label><label><input type="checkbox"> Blocked</label><label><input type="checkbox"> N.A.</label><label><input type="checkbox"> Closed</label></div>
    </article>`;
  }

  function renderIMVVVertical() {
    $('#imvv-construction-view').innerHTML = `<div class="iv-record-list">${data.imvv_generic.construction.map(genericConstructionCard).join('')}</div>`;
    $('#imvv-execution-view').innerHTML = `<div class="iv-fill-list">${data.imvv_generic.execution.map(genericExecutionCard).join('')}</div><p class="guided-cta"><a class="button primary" href="#guided-use">Create a persistent project record</a></p>`;
  }

  function renderCase() {
    $('#case-boundary').innerHTML = data.imvv_case.case_boundary.map(row => `
      <article class="boundary-card"><p class="mini-label">${escapeHtml(row.element)}</p><h3>${escapeHtml(row.evidence_status)}</h3><p>${escapeHtml(row.configuration)}</p><details><summary>IMVV implication</summary><p>${escapeHtml(row.imvv_implication)}</p></details></article>`).join('');
    $('#case-application').innerHTML = `<div class="case-records">${data.imvv_case.application.map(row => `
      <article class="case-record-card">
        <header><span class="control-id">${escapeHtml(row.item)}</span><strong>${escapeHtml(row.instantiated_focus)}</strong></header>
        <dl>${field('Evidence reviewed', row.evidence_reviewed)}${field('Analytical outcome / finding', row.outcome)}${field('Closure status / residual', row.closure_residual)}</dl>
      </article>`).join('')}</div>`;
  }

  function switchIMVV(view) {
    const construction = view === 'construction';
    $('#tab-imvv-construction').classList.toggle('active', construction);
    $('#tab-imvv-execution').classList.toggle('active', !construction);
    $('#tab-imvv-construction').setAttribute('aria-selected', String(construction));
    $('#tab-imvv-execution').setAttribute('aria-selected', String(!construction));
    $('#imvv-generic-construction').hidden = !construction;
    $('#imvv-generic-execution').hidden = construction;
  }

  function bindEvents() {
    $('.nav-toggle').addEventListener('click', event => {
      const open = $('.primary-nav').classList.toggle('open');
      event.currentTarget.setAttribute('aria-expanded', String(open));
    });
    $$('.primary-nav a').forEach(link => link.addEventListener('click', () => {
      $('.primary-nav').classList.remove('open');
      $('.nav-toggle').setAttribute('aria-expanded', 'false');
    }));
    $('#group-catalogue').addEventListener('click', event => {
      const card = event.target.closest('[data-group-id]');
      if (!card) return;
      state.groupId = card.dataset.groupId;
      state.search = '';
      $('#control-search').value = '';
      renderSelectedGroup();
      $('.catalogue-workbench').scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#group-${state.groupId}`);
    });
    $('#control-search').addEventListener('input', event => { state.search = event.target.value; renderSelectedGroup(); });
    $('#view-construction').addEventListener('click', () => {
      state.view = 'construction';
      $('#view-construction').classList.add('active'); $('#view-execution').classList.remove('active');
      $('#view-construction').setAttribute('aria-selected', 'true'); $('#view-execution').setAttribute('aria-selected', 'false');
      renderSelectedGroup();
    });
    $('#view-execution').addEventListener('click', () => {
      state.view = 'execution';
      $('#view-execution').classList.add('active'); $('#view-construction').classList.remove('active');
      $('#view-execution').setAttribute('aria-selected', 'true'); $('#view-construction').setAttribute('aria-selected', 'false');
      renderSelectedGroup();
    });
    $('#tab-imvv-construction').addEventListener('click', () => switchIMVV('construction'));
    $('#tab-imvv-execution').addEventListener('click', () => switchIMVV('execution'));
  }

  function openHashTarget() {
    const groupMatch = location.hash.match(/^#group-(.+)$/);
    if (groupMatch && groupById.has(groupMatch[1])) {
      state.groupId = groupMatch[1];
      renderSelectedGroup();
      setTimeout(() => $('#catalogue').scrollIntoView({ block: 'start' }), 80);
      return;
    }
    const itemMatch = location.hash.match(/^#item-([A-Z]+-\d+)$/);
    if (itemMatch && groupByItem.has(itemMatch[1])) {
      state.groupId = groupByItem.get(itemMatch[1]).id;
      state.view = 'construction';
      renderSelectedGroup();
      setTimeout(() => {
        const target = document.getElementById(`item-${itemMatch[1]}`);
        if (target) { target.open = true; target.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      }, 120);
    }
  }

  function openGroup(groupId, view = 'construction') {
    if (!groupById.has(groupId)) return false;
    state.groupId = groupId;
    state.view = view === 'execution' ? 'execution' : 'construction';
    state.search = '';
    $('#control-search').value = '';
    const construction = state.view === 'construction';
    $('#view-construction').classList.toggle('active', construction);
    $('#view-execution').classList.toggle('active', !construction);
    $('#view-construction').setAttribute('aria-selected', String(construction));
    $('#view-execution').setAttribute('aria-selected', String(!construction));
    renderSelectedGroup();
    history.replaceState(null, '', `#group-${groupId}`);
    requestAnimationFrame(() => $('#catalogue').scrollIntoView({ behavior: 'smooth', block: 'start' }));
    return true;
  }

  window.AEROSAFE_UI = { data, groups, groupById, groupByItem, itemMap, expandItemSpec, escapeHtml, openGroup };
  renderHeader();
  renderWorkflow();
  renderCatalogue();
  renderIMVVVertical();
  renderCase();
  bindEvents();
  openHashTarget();
})();
