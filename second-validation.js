(() => {
  'use strict';

  const data = window.AEROSAFE_SECOND_VALIDATION;
  if (!data) throw new Error('AEROSAFE_SECOND_VALIDATION is not available.');

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const escapeHtml = value => String(value ?? '')
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
  const normalize = value => String(value || '').toLowerCase().replace(/[–—]/g, '-');
  const percent = value => `${Number(value).toFixed(1)}%`;

  const ratingMeta = {
    A: { label: 'Clear and usable as written', className: 'rating-a' },
    B: { label: 'Useful, but needs clarification/tailoring', className: 'rating-b' },
    C: { label: 'Unclear, impractical, or not justified', className: 'rating-c' },
    X: { label: 'Outside expertise / cannot assess', className: 'rating-x' }
  };

  const state = { search: '', group: 'all', focus: 'all', sort: 'catalogue' };
  const groupMap = new Map(data.groups.map(group => [group.id, group]));
  const itemMap = new Map(data.items.map(item => [item.id, item]));

  function renderCaveat() {
    $('#second-validation-caveat').innerHTML = `
      <strong>Descriptive perception evidence, not an effectiveness result.</strong>
      <span>${escapeHtml(data.instrument.purpose)} The sample is purposive and small; no inferential, completeness, compliance, qualification, or task-performance claim is made.</span>`;
  }

  function renderKpis() {
    const overall = data.overall;
    const cards = [
      [data.metadata.respondent_count, 'practitioners', 'All 52 controls rated'],
      [`${data.metadata.complete_control_ratings}/${data.metadata.control_rating_count}`, 'complete judgements', 'No missing control rating'],
      [percent(overall.percentages.A), 'A responses', `${overall.counts.A} clear / usable`],
      [percent(overall.percentages.B), 'B responses', `${overall.counts.B} clarification / tailoring`],
      [overall.counts.C, 'C responses', 'No control rejected'],
      [percent(overall.percentages.X), 'X responses', `${overall.counts.X} outside expertise`]
    ];
    $('#second-validation-kpis').innerHTML = cards.map(([value, label, note]) => `
      <article><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong><p>${escapeHtml(note)}</p></article>`).join('');
  }

  function renderInstrument() {
    $('#second-validation-period').textContent = data.metadata.collection_period;
    $('#second-validation-question').textContent = data.metadata.validation_question;
    $('#second-validation-instrument').innerHTML = `
      <dl>
        <div><dt>Profile</dt><dd>${data.instrument.profile_questions.length} questions</dd></div>
        <div><dt>Catalogue</dt><dd>${data.metadata.group_count} groups / ${data.metadata.control_count} controls</dd></div>
        <div><dt>Group comments</dt><dd>Optional after each group</dd></div>
        <div><dt>Overall ratings</dt><dd>${data.instrument.overall_questions.length} five-point questions; ${data.instrument.overall_scale.minimum} = ${escapeHtml(data.instrument.overall_scale.minimum_label)}, ${data.instrument.overall_scale.maximum} = ${escapeHtml(data.instrument.overall_scale.maximum_label)}</dd></div>
        <div><dt>Open feedback</dt><dd>Missing, redundant, or misplaced controls</dd></div>
        <div><dt>Completion time</dt><dd>Optional; no values received</dd></div>
      </dl>
      <p>${escapeHtml(data.instrument.control_prompt)}</p>`;
  }

  function countBy(key) {
    return data.participants.reduce((counts, participant) => {
      const value = participant[key];
      counts[value] = (counts[value] || 0) + 1;
      return counts;
    }, {});
  }

  function profileBlock(title, counts) {
    const max = Math.max(...Object.values(counts));
    return `<section class="second-validation-profile-block"><h4>${escapeHtml(title)}</h4>${Object.entries(counts).map(([label, count]) => `
      <div class="second-validation-profile-row">
        <span>${escapeHtml(label)}</span>
        <div><i style="width:${(count / max) * 100}%"></i></div>
        <strong>${count}</strong>
      </div>`).join('')}</section>`;
  }

  function renderProfile() {
    $('#second-validation-profile').innerHTML = [
      profileBlock('Primary background', countBy('background')),
      profileBlock('ECSS experience', countBy('ecss_experience')),
      profileBlock('AI/ML experience', countBy('aiml_experience'))
    ].join('');
  }

  function renderDistribution() {
    $('#second-validation-rating-legend').innerHTML = data.instrument.rating_choices.map(choice => `
      <article class="${ratingMeta[choice.code].className}"><strong>${choice.code}</strong><span>${escapeHtml(choice.label)}</span></article>`).join('');
    const overall = data.overall;
    $('#second-validation-distribution').innerHTML = `
      <div class="second-validation-stacked-bar" aria-label="A ${overall.percentages.A} percent, B ${overall.percentages.B} percent, C ${overall.percentages.C} percent, X ${overall.percentages.X} percent">
        ${['A', 'B', 'C', 'X'].map(code => overall.counts[code] ? `<span class="${ratingMeta[code].className}" style="width:${overall.percentages[code]}%"><b>${code}</b><small>${percent(overall.percentages[code])}</small></span>` : '').join('')}
      </div>
      <div class="second-validation-stat-strip">
        <div><span>Assessable A/B/C responses</span><strong>${overall.assessable_count}</strong></div>
        <div><span>A among assessable</span><strong>${percent(overall.a_among_assessable)}</strong></div>
        <div><span>B among assessable</span><strong>${percent(overall.b_among_assessable)}</strong></div>
        <div><span>C among assessable</span><strong>${percent(overall.c_among_assessable)}</strong></div>
      </div>`;
  }

  function renderOverallScales() {
    $('#second-validation-overall-scales').innerHTML = `<p class="second-validation-scale-anchor"><strong>${data.instrument.overall_scale.minimum}</strong> ${escapeHtml(data.instrument.overall_scale.minimum_label)} <span>→</span> <strong>${data.instrument.overall_scale.maximum}</strong> ${escapeHtml(data.instrument.overall_scale.maximum_label)}</p>` + data.overall_scales.map((scale, index) => `
      <article class="second-validation-scale-card">
        <div><span>O${index + 1}</span><strong>${scale.mean.toFixed(2)}<small>/5</small></strong></div>
        <p>${escapeHtml(scale.question)}</p>
        <dl><div><dt>Median</dt><dd>${scale.median}</dd></div><div><dt>Sample SD</dt><dd>${scale.sample_sd.toFixed(2)}</dd></div><div><dt>Range</dt><dd>${scale.minimum}–${scale.maximum}</dd></div></dl>
        <div class="second-validation-scale-values" aria-label="Ratings ${scale.values.join(', ')}">${scale.values.map(value => `<i style="--score:${value}" title="${value}/5"><span>${value}</span></i>`).join('')}</div>
      </article>`).join('');
  }

  function renderPattern() {
    const pattern = data.overall.response_pattern;
    $('#second-validation-pattern').innerHTML = `
      <div class="second-validation-pattern-lead"><strong>${pattern.b_count}</strong><span>B selections by one participant</span></div>
      <p>This single response pattern accounts for <strong>${percent(pattern.b_share_of_all_b)}</strong> of all B selections. It is retained in the primary analysis.</p>
      <div class="second-validation-pattern-comparison">
        <div><span>Primary analysis</span><strong>${percent(data.overall.b_among_assessable)}</strong><small>B among assessable, n = 5</small></div>
        <div><span>Descriptive sensitivity view</span><strong>${percent(pattern.remaining_b_among_assessable)}</strong><small>B among assessable, other ${pattern.remaining_participants}</small></div>
      </div>
      <p class="second-validation-inline-note">${escapeHtml(pattern.interpretation)}</p>`;
  }

  function renderGroups() {
    const maxRatings = Math.max(...data.groups.map(group => group.rating_count));
    $('#second-validation-group-chart').innerHTML = data.groups.map(group => `
      <article class="second-validation-group-row">
        <div class="second-validation-group-label"><span class="group-code inline">${escapeHtml(group.code)}</span><strong>${escapeHtml(group.name)}</strong><small>${group.control_count} controls · ${group.rating_count} ratings</small></div>
        <div class="second-validation-group-bars" style="--scale:${group.rating_count / maxRatings}">
          ${['A', 'B', 'C', 'X'].map(code => group.counts[code] ? `<span class="${ratingMeta[code].className}" style="width:${group.percentages[code]}%" title="${code}: ${group.counts[code]} (${percent(group.percentages[code])})"></span>` : '').join('')}
        </div>
        <div class="second-validation-group-metric"><strong>${percent(group.a_among_assessable)}</strong><span>A / assessable</span></div>
      </article>`).join('');

    $('#second-validation-group-table').innerHTML = `<table class="compact second-validation-group-table"><thead><tr><th>Group</th><th>Items</th><th>A</th><th>B</th><th>C</th><th>X</th><th>A / assessable</th><th>Repeated-B controls</th></tr></thead><tbody>${data.groups.map(group => {
      const repeated = data.items.filter(item => item.group_id === group.id && item.counts.B >= 2).map(item => item.id);
      return `<tr><td><span class="group-code inline">${escapeHtml(group.code)}</span><strong>${escapeHtml(group.name)}</strong></td><td>${group.control_count}</td><td>${group.counts.A}</td><td>${group.counts.B}</td><td>${group.counts.C}</td><td>${group.counts.X}</td><td>${percent(group.a_among_assessable)}</td><td>${repeated.length ? repeated.map(id => `<button type="button" class="second-validation-item-link" data-second-item="${escapeHtml(id)}">${escapeHtml(id)}</button>`).join(' ') : 'None'}</td></tr>`;
    }).join('')}</tbody></table>`;
  }

  function ratingChip(code) {
    return `<span class="second-validation-rating-chip ${ratingMeta[code].className}" title="${escapeHtml(ratingMeta[code].label)}">${code}</span>`;
  }

  function itemMatches(item) {
    const query = normalize(state.search);
    const searchable = normalize([item.id, item.group_code, item.group_name, item.administered_wording, item.group_clarification, item.targeted_clarification].join(' '));
    if (query && !searchable.includes(query)) return false;
    if (state.group !== 'all' && item.group_id !== state.group) return false;
    if (state.focus === 'repeated-b' && item.counts.B < 2) return false;
    if (state.focus === 'any-b' && item.counts.B < 1) return false;
    if (state.focus === 'x' && item.counts.X < 1) return false;
    return true;
  }

  function sortItems(items) {
    const indexed = new Map(data.items.map((item, index) => [item.id, index]));
    return [...items].sort((a, b) => {
      if (state.sort === 'b-desc') return b.counts.B - a.counts.B || indexed.get(a.id) - indexed.get(b.id);
      if (state.sort === 'a-desc') return b.a_among_assessable - a.a_among_assessable || indexed.get(a.id) - indexed.get(b.id);
      if (state.sort === 'x-desc') return b.counts.X - a.counts.X || indexed.get(a.id) - indexed.get(b.id);
      return indexed.get(a.id) - indexed.get(b.id);
    });
  }

  function clarificationCell(item) {
    if (item.clarification_level === 'none') return '<span class="second-validation-no-note">No B response</span>';
    const targeted = item.targeted_clarification ? `<p><strong>Targeted note:</strong> ${escapeHtml(item.targeted_clarification)}</p>` : '';
    return `<details class="second-validation-clarification-detail" ${item.targeted_clarification ? 'open' : ''}><summary>${item.targeted_clarification ? 'Targeted + group note' : 'Group-level note'}</summary><p><strong>Group interpretation:</strong> ${escapeHtml(item.group_clarification)}</p>${targeted}</details>`;
  }

  function renderItems() {
    const items = sortItems(data.items.filter(itemMatches));
    $('#second-validation-item-summary').textContent = `${items.length} of ${data.items.length} controls shown. ${items.filter(item => item.counts.B >= 2).length} shown controls have a targeted clarification.`;
    $('#second-validation-item-table').innerHTML = items.length ? `
      <table class="second-validation-item-table"><thead><tr><th>ID</th><th>Group</th><th>Administered control statement</th>${data.participants.map(p => `<th>${escapeHtml(p.id)}</th>`).join('')}<th>A / B / C / X</th><th>A / assessable</th><th>Clarification after validation</th><th>Catalogue</th></tr></thead><tbody>${items.map(item => `
        <tr id="second-validation-${escapeHtml(item.id)}" class="${item.counts.B >= 2 ? 'targeted-row' : ''}">
          <td><strong class="second-validation-control-id">${escapeHtml(item.id)}</strong></td>
          <td><span class="group-code inline">${escapeHtml(item.group_code)}</span><small>${escapeHtml(item.group_name)}</small></td>
          <td>${escapeHtml(item.administered_wording)}</td>
          ${data.participants.map(p => `<td class="second-validation-rating-cell">${ratingChip(item.responses[p.id])}</td>`).join('')}
          <td><span class="second-validation-count-sequence"><b class="rating-a">${item.counts.A}</b><b class="rating-b">${item.counts.B}</b><b class="rating-c">${item.counts.C}</b><b class="rating-x">${item.counts.X}</b></span></td>
          <td>${percent(item.a_among_assessable)}</td>
          <td>${clarificationCell(item)}</td>
          <td><a class="second-validation-catalogue-link" href="#item-${escapeHtml(item.id)}" data-open-catalogue-item="${escapeHtml(item.id)}">Open control</a></td>
        </tr>`).join('')}</tbody></table>` : '<div class="empty-state">No controls match the selected filters.</div>';
  }

  function renderThemes() {
    $('#second-validation-themes').innerHTML = data.clarification_themes.map((theme, index) => `
      <article><div><span>Theme ${index + 1}</span><strong>${escapeHtml(theme.ids)}</strong></div><h4>${escapeHtml(theme.theme)}</h4><p>${escapeHtml(theme.clarification)}</p></article>`).join('');
  }

  function renderComments() {
    const comments = data.comments.final_comments;
    $('#second-validation-comments').innerHTML = comments.length ? `
      <p class="second-validation-comment-context">No optional group comment was submitted. One participant used the final open field:</p>
      ${comments.map(comment => `<blockquote><span>${escapeHtml(comment.participant)}</span>${escapeHtml(comment.comment)}</blockquote>`).join('')}
      <p class="second-validation-inline-note">The comment supports risk-based activation of specialised ML techniques and explicit closure authority. It is reported as one observation, not a coded qualitative theme.</p>` : '<p>No written comments were supplied.</p>';
    $('#second-validation-limitations').innerHTML = data.limitations.map(item => `<li>${escapeHtml(item)}</li>`).join('');
  }

  function populateFilters() {
    $('#second-validation-item-group').innerHTML += data.groups.map(group => `<option value="${escapeHtml(group.id)}">${escapeHtml(group.code)} · ${escapeHtml(group.name)}</option>`).join('');
  }

  function openItem(itemId) {
    state.search = itemId;
    state.group = 'all';
    state.focus = 'all';
    $('#second-validation-item-search').value = itemId;
    $('#second-validation-item-group').value = 'all';
    $('#second-validation-item-focus').value = 'all';
    renderItems();
    requestAnimationFrame(() => document.getElementById(`second-validation-${itemId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  }

  function bindEvents() {
    $('#second-validation-item-search').addEventListener('input', event => { state.search = event.target.value; renderItems(); });
    $('#second-validation-item-group').addEventListener('change', event => { state.group = event.target.value; renderItems(); });
    $('#second-validation-item-focus').addEventListener('change', event => { state.focus = event.target.value; renderItems(); });
    $('#second-validation-item-sort').addEventListener('change', event => { state.sort = event.target.value; renderItems(); });
    $('#second-validation-group-table').addEventListener('click', event => {
      const target = event.target.closest('[data-second-item]');
      if (target) openItem(target.dataset.secondItem);
    });
    $('#second-validation-item-table').addEventListener('click', event => {
      const target = event.target.closest('[data-open-catalogue-item]');
      if (!target || !window.AEROSAFE_UI) return;
      event.preventDefault();
      const itemId = target.dataset.openCatalogueItem;
      const group = window.AEROSAFE_UI.groupByItem.get(itemId);
      if (!group) return;
      window.AEROSAFE_UI.openGroup(group.id, 'construction');
      setTimeout(() => {
        const item = document.getElementById(`item-${itemId}`);
        if (item) { item.open = true; item.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      }, 160);
    });
  }

  function render() {
    renderCaveat();
    renderKpis();
    renderInstrument();
    renderProfile();
    renderDistribution();
    renderOverallScales();
    renderPattern();
    renderGroups();
    populateFilters();
    renderItems();
    renderThemes();
    renderComments();
    bindEvents();
  }

  window.AEROSAFE_SECOND_VALIDATION_UI = { data, itemMap, groupMap, openItem };
  render();
})();
