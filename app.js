(() => {
  'use strict';

  const data = window.AEROSAFE_DATA;
  if (!data) {
    document.body.innerHTML = '<main style="padding:2rem;font-family:sans-serif"><h1>Companion data unavailable</h1><p>Keep data.js in the same directory as index.html.</p></main>';
    return;
  }

  const state = {
    appendixKey: data.appendix_tables[0].key,
    mappingItems: new Set(),
    mappingKey: null,
    highlightItem: null,
    appendixSearch: '',
    status: 'all'
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');

  const normalize = (value) => String(value || '').toLowerCase().replace(/[–—]/g, '-');

  function expandItemSpec(spec) {
    const items = [];
    String(spec).split(';').map(part => part.trim()).filter(Boolean).forEach(part => {
      const match = part.match(/^([A-Z]+)-(\d+)\s+to\s+([A-Z]+)-(\d+)$/);
      if (match && match[1] === match[3]) {
        const width = Math.max(match[2].length, match[4].length);
        for (let n = Number(match[2]); n <= Number(match[4]); n += 1) {
          items.push(`${match[1]}-${String(n).padStart(width, '0')}`);
        }
      } else {
        items.push(part);
      }
    });
    return items;
  }

  function itemStatus(item) {
    const text = item['source/status'];
    const match = text.match(/Status:\s*(.*?)(?:\.|$)/i);
    return match ? match[1].trim() : 'Unspecified';
  }

  function statusCategory(status) {
    const normalized = String(status).trim();
    if (normalized.startsWith('M all')) return 'M all';
    if (normalized.startsWith('M')) return 'M';
    if (normalized.startsWith('C')) return 'C';
    if (normalized.startsWith('N.A.')) return 'N.A.';
    return 'Unspecified';
  }

  function statusClass(status) {
    const category = statusCategory(status);
    if (category === 'M all') return 'm-all';
    if (category === 'M') return 'm';
    if (category === 'C') return 'c';
    if (category === 'N.A.') return 'na';
    return '';
  }

  function getTable(key) {
    return data.appendix_tables.find(table => table.key === key);
  }

  function getItem(itemId) {
    for (const table of data.appendix_tables) {
      const item = table.items.find(candidate => candidate.id === itemId);
      if (item) return { table, item };
    }
    return null;
  }

  function renderHeader() {
    $('#framework-disclaimer').textContent = data.metadata.disclaimer;
    $('#footer-version').textContent = `${data.metadata.paper_title} — ${data.metadata.version}.`;
    $('#tuple-list').innerHTML = data.schema.map(field => `<li>${escapeHtml(field)}</li>`).join('');
    const count = data.appendix_tables.reduce((sum, table) => sum + table.items.length, 0);
    $('#control-count').textContent = count;
    $('#mapping-count').textContent = data.table7.length;
    $('#appendix-count').textContent = data.appendix_tables.length;
  }

  function renderWorkflow() {
    $('#workflow-steps').innerHTML = data.workflow.map(step => `
      <article class="workflow-step">
        <span class="step-no">STEP ${escapeHtml(step.step)}</span>
        <h3>${escapeHtml(step.title)}</h3>
        <p>${escapeHtml(step.detail)}</p>
      </article>`).join('');
  }

  function renderBoundary() {
    $('#case-boundary').innerHTML = data.imvv_case.case_boundary.map((row, index) => `
      <article class="boundary-card">
        <span class="mini-label">Case boundary ${index + 1}</span>
        <h3>${escapeHtml(row.element)}</h3>
        <p>${escapeHtml(row.configuration)}</p>
        <details><summary>Evidence status and IMVV implication</summary>
          <p><strong>Evidence status:</strong> ${escapeHtml(row.evidence_status)}</p>
          <p><strong>IMVV implication:</strong> ${escapeHtml(row.imvv_implication)}</p>
        </details>
      </article>`).join('');
  }

  function flowTable(rows, type) {
    const isConstruction = type === 'construction';
    const headers = isConstruction
      ? ['Item', 'Source/status and objective', 'Inputs and owner', 'Acceptance criterion', 'Gate and closure', 'Links and residuals']
      : ['Item', 'Evidence/result', 'Decision/finding', 'Gate/closure status', 'Links', 'Residuals'];
    const fields = isConstruction
      ? ['item', 'source_status_objective', 'inputs_owner', 'criterion', 'gate_closure', 'links_residuals']
      : ['item', 'evidence_result', 'decision_finding', 'gate_closure', 'links', 'residuals'];
    return `<table class="flow-table"><thead><tr>${headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${fields.map((field, index) => {
      if (index === 0) return `<td><button class="item-link" type="button" data-open-item="${escapeHtml(row[field])}">${escapeHtml(row[field])}</button></td>`;
      return `<td>${escapeHtml(row[field])}</td>`;
    }).join('')}</tr>`).join('')}</tbody></table>`;
  }

  function renderIMVV() {
    $('#construction-table').innerHTML = flowTable(data.imvv_case.construction, 'construction');
    $('#execution-table').innerHTML = flowTable(data.imvv_case.execution, 'execution');
    const rows = data.imvv_case.generalization;
    $('#generalization-table').innerHTML = `<table><thead><tr><th>Principle</th><th>Case observation</th><th>Transferable rule</th><th>Project-specific</th></tr></thead><tbody>${rows.map(row => `<tr><td>${escapeHtml(row.principle)}</td><td>${escapeHtml(row.case_observation)}</td><td>${escapeHtml(row.transferable_rule)}</td><td>${escapeHtml(row.project_specific)}</td></tr>`).join('')}</tbody></table>`;
  }

  function renderTable7() {
    const query = normalize($('#mapping-search').value);
    const rows = data.table7.filter(row => normalize([row.area, row.scope, row.tailoring, ...row.refs.map(ref => `${ref.table} ${ref.items}`)].join(' ')).includes(query));
    const container = $('#table7-container');
    if (!rows.length) {
      container.innerHTML = '<div class="empty-state">No Table 7 areas match this search.</div>';
      return;
    }
    container.innerHTML = `<table><thead><tr><th>Assurance area</th><th>Representative scope</th><th>Companion table and item IDs</th><th>Activation / tailoring logic</th></tr></thead><tbody>${rows.map((row) => {
      const rowIndex = data.table7.indexOf(row);
      const selected = row.refs.some(ref => state.mappingKey === ref.key && expandItemSpec(ref.items).some(id => state.mappingItems.has(id)));
      const chips = row.refs.map(ref => `<button class="ref-chip" type="button" data-open-map="${escapeHtml(ref.key)}" data-item-spec="${escapeHtml(ref.items)}" title="Open ${escapeHtml(ref.table)} and highlight ${escapeHtml(ref.items)}">${escapeHtml(ref.table)} · ${escapeHtml(ref.items)}</button>`).join('');
      return `<tr class="mapping-row${selected ? ' selected' : ''}" data-mapping-row="${rowIndex}"><td><strong>${escapeHtml(row.area)}</strong></td><td>${escapeHtml(row.scope)}</td><td><div class="ref-group">${chips}</div></td><td>${escapeHtml(row.tailoring)}</td></tr>`;
    }).join('')}</tbody></table>`;
  }

  function renderNotation() {
    const order = [
      { label: 'M', key: 'M' },
      { label: 'C', key: 'C' },
      { label: 'N.A.', key: 'NA' },
      { label: 'M all', key: 'M all' }
    ];
    $('#notation-bar').innerHTML = order.map(entry => `<div class="notation-item"><strong>${escapeHtml(entry.label)}</strong><span>${escapeHtml(data.notation[entry.key])}</span></div>`).join('');
  }

  function renderAppendixTabs() {
    $('#appendix-tabs').innerHTML = data.appendix_tables.map(table => `<button id="table-${escapeHtml(table.key.toLowerCase())}" class="appendix-tab${state.appendixKey === table.key ? ' active' : ''}" type="button" role="tab" aria-selected="${state.appendixKey === table.key}" data-appendix-key="${escapeHtml(table.key)}">${escapeHtml(table.number)} <span>(${table.items.length})</span></button>`).join('');
  }

  function itemMatches(item) {
    const query = normalize(state.appendixSearch);
    const haystack = normalize([item.id, ...data.schema.map(field => item[field])].join(' '));
    const status = itemStatus(item);
    const category = statusCategory(status);
    const searchMatch = !query || haystack.includes(query);
    const statusMatch = state.status === 'all' || category === state.status;
    const mappingMatch = state.mappingItems.size === 0 || state.mappingItems.has(item.id);
    return searchMatch && statusMatch && mappingMatch;
  }

  function renderAppendix() {
    const table = getTable(state.appendixKey);
    renderAppendixTabs();
    const items = table.items.filter(itemMatches);
    const selected = state.mappingItems.size > 0;
    const banner = $('#appendix-selection');
    if (selected) {
      banner.hidden = false;
      banner.innerHTML = `Mapping selection: <strong>${escapeHtml([...state.mappingItems].join(', '))}</strong><button type="button" id="clear-appendix-selection">Show all controls</button>`;
    } else {
      banner.hidden = true;
      banner.innerHTML = '';
    }
    $('#appendix-summary').innerHTML = `<strong>${escapeHtml(table.number)}.</strong> ${escapeHtml(table.title)} Showing ${items.length} of ${table.items.length} controls.`;

    if (!items.length) {
      $('#appendix-table').innerHTML = '<div class="empty-state">No controls match the current mapping and filters.</div>';
      return;
    }

    const headers = data.schema.map(field => `<th>${escapeHtml(field)}</th>`).join('');
    const body = items.map(item => {
      const status = itemStatus(item);
      const cells = data.schema.map((field, index) => {
        const label = escapeHtml(field);
        if (index === 0) {
          return `<td data-label="${label}"><div class="item-id-line"><button class="item-link" type="button" data-open-item="${escapeHtml(item.id)}" aria-label="Open ${escapeHtml(item.id)}"><span>${escapeHtml(item.id)}</span></button><span class="status-badge ${statusClass(status)}">${escapeHtml(status)}</span></div><div>${escapeHtml(item[field])}</div><button class="item-record" type="button" data-expand-row="${escapeHtml(item.id)}" aria-expanded="false">Show all ten fields</button></td>`;
        }
        return `<td data-label="${label}">${escapeHtml(item[field])}</td>`;
      }).join('');
      return `<tr id="item-${escapeHtml(item.id)}" data-item-id="${escapeHtml(item.id)}" class="${state.highlightItem === item.id ? 'highlight' : ''}">${cells}</tr>`;
    }).join('');

    $('#appendix-table').innerHTML = `<table class="appendix-table"><thead><tr>${headers}</tr></thead><tbody>${body}</tbody></table>`;

    if (state.highlightItem) {
      const row = document.getElementById(`item-${state.highlightItem}`);
      if (row) {
        setTimeout(() => row.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' }), 40);
        setTimeout(() => { state.highlightItem = null; }, 2300);
      }
    }
  }

  function clearMappingSelection({ rerender = true } = {}) {
    state.mappingItems.clear();
    state.mappingKey = null;
    state.highlightItem = null;
    $('#mapping-status').textContent = '';
    if (rerender) {
      renderTable7();
      renderAppendix();
    }
  }

  function openMapping(key, itemSpec, highlight = null) {
    const ids = expandItemSpec(itemSpec);
    state.appendixKey = key;
    state.mappingKey = key;
    state.mappingItems = new Set(ids);
    state.highlightItem = highlight || ids[0] || null;
    state.appendixSearch = '';
    state.status = 'all';
    $('#appendix-search').value = '';
    $('#status-filter').value = 'all';
    $('#mapping-status').textContent = `Selected ${ids.length} control${ids.length === 1 ? '' : 's'} in ${getTable(key).number}: ${ids.join(', ')}.`;
    renderTable7();
    renderAppendix();
    $('#appendix').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function openItem(itemId) {
    const found = getItem(itemId);
    if (!found) return;
    state.appendixKey = found.table.key;
    state.mappingKey = found.table.key;
    state.mappingItems = new Set([itemId]);
    state.highlightItem = itemId;
    state.appendixSearch = '';
    state.status = 'all';
    $('#appendix-search').value = '';
    $('#status-filter').value = 'all';
    renderTable7();
    renderAppendix();
    $('#appendix').scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#item-${itemId}`);
  }

  function switchFlow(target) {
    const construction = target === 'construction';
    $('#tab-construction').classList.toggle('active', construction);
    $('#tab-execution').classList.toggle('active', !construction);
    $('#tab-construction').setAttribute('aria-selected', String(construction));
    $('#tab-execution').setAttribute('aria-selected', String(!construction));
    $('#imvv-construction').classList.toggle('active', construction);
    $('#imvv-execution').classList.toggle('active', !construction);
    $('#imvv-construction').hidden = !construction;
    $('#imvv-execution').hidden = construction;
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

    $('#tab-construction').addEventListener('click', () => switchFlow('construction'));
    $('#tab-execution').addEventListener('click', () => switchFlow('execution'));
    $('#mapping-search').addEventListener('input', renderTable7);
    $('#clear-mapping').addEventListener('click', () => {
      $('#mapping-search').value = '';
      clearMappingSelection();
      renderTable7();
    });
    $('#appendix-search').addEventListener('input', event => {
      state.appendixSearch = event.target.value;
      renderAppendix();
    });
    $('#status-filter').addEventListener('change', event => {
      state.status = event.target.value;
      renderAppendix();
    });
    $('#reset-appendix').addEventListener('click', () => {
      state.appendixSearch = '';
      state.status = 'all';
      $('#appendix-search').value = '';
      $('#status-filter').value = 'all';
      clearMappingSelection({ rerender: false });
      renderTable7();
      renderAppendix();
    });

    document.addEventListener('click', event => {
      const mapping = event.target.closest('[data-open-map]');
      if (mapping) {
        openMapping(mapping.dataset.openMap, mapping.dataset.itemSpec);
        return;
      }
      const item = event.target.closest('[data-open-item]');
      if (item) {
        openItem(item.dataset.openItem);
        return;
      }
      const tab = event.target.closest('[data-appendix-key]');
      if (tab) {
        state.appendixKey = tab.dataset.appendixKey;
        if (state.mappingKey !== state.appendixKey) clearMappingSelection({ rerender: false });
        state.highlightItem = null;
        renderTable7();
        renderAppendix();
        history.replaceState(null, '', `#table-${state.appendixKey.toLowerCase()}`);
        return;
      }
      if (event.target.id === 'clear-appendix-selection') {
        clearMappingSelection();
        return;
      }
      const expand = event.target.closest('[data-expand-row]');
      if (expand) {
        const row = expand.closest('tr');
        const expanded = row.classList.toggle('expanded');
        expand.setAttribute('aria-expanded', String(expanded));
        expand.textContent = expanded ? 'Hide field record' : 'Show all ten fields';
      }
    });
  }

  function openHashTarget() {
    const itemMatch = location.hash.match(/^#item-([A-Z]+-\d+)$/);
    if (itemMatch) {
      setTimeout(() => openItem(itemMatch[1]), 120);
      return;
    }
    const tableMatch = location.hash.match(/^#table-(a1[3-7])$/i);
    if (tableMatch) {
      const key = tableMatch[1].toUpperCase();
      if (getTable(key)) {
        state.appendixKey = key;
        clearMappingSelection({ rerender: false });
        renderTable7();
        renderAppendix();
        setTimeout(() => $('#appendix').scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
      }
    }
  }

  renderHeader();
  renderWorkflow();
  renderBoundary();
  renderIMVV();
  renderNotation();
  renderTable7();
  renderAppendix();
  bindEvents();
  openHashTarget();
})();
