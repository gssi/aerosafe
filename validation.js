(() => {
  'use strict';

  const data = window.AEROSAFE_VALIDATION;
  const root = document.getElementById('validation');
  if (!root) return;
  if (!data) {
    root.innerHTML = '<div class="shell"><div class="validation-caveat"><strong>Evaluation data unavailable.</strong><span>Keep validation-data.js in the same directory as index.html.</span></div></div>';
    return;
  }

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const escapeHtml = (value) => String(value ?? '')
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
  const normalize = (value) => String(value || '').toLowerCase().replace(/[–—]/g, '-');
  const number = (value, digits = 2) => Number(value).toFixed(digits);
  const percent = (value, digits = 1) => `${(Number(value) * 100).toFixed(digits)}%`;

  const state = {
    itemSearch: '',
    itemSection: 'all',
    itemSort: 'id',
    commentSearch: '',
    commentSection: 'all'
  };

  const sectionOrder = data.categories.map(category => category.section);

  function formatDate(iso) {
    const [year, month, day] = iso.split('-').map(Number);
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      .format(new Date(Date.UTC(year, month - 1, day)));
  }

  function formatDateRange(start, end) {
    const startParts = start.split('-');
    const endParts = end.split('-');
    if (startParts[0] === endParts[0] && startParts[1] === endParts[1]) {
      const monthYear = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' })
        .format(new Date(Date.UTC(Number(startParts[0]), Number(startParts[1]) - 1, 1)));
      return `${Number(startParts[2])}-${Number(endParts[2])} ${monthYear}`;
    }
    return `${formatDate(start)} - ${formatDate(end)}`;
  }

  function renderCaveat() {
    $('#validation-caveat').innerHTML = `
      <strong>Interpret as formative co-design evidence.</strong>
      <span>${escapeHtml(data.metadata.interpretation)}</span>`;
  }

  function renderKpis() {
    const cards = [
      { value: data.metadata.participant_count, label: 'aerospace practitioners', detail: 'Five QA-oriented roles; one software/AI role' },
      { value: data.metadata.technical_item_count, label: 'technical agreement items', detail: 'Q7-Q28, plus six profile questions' },
      { value: data.metadata.rating_count, label: 'complete item ratings', detail: `${percent(data.overall.completion_rate, 0)} response completeness` },
      { value: percent(data.overall.agreement_4_5_rate), label: 'ratings equal to 4 or 5', detail: `${data.overall.agreement_4_5_count} of ${data.overall.rating_count}` },
      { value: data.metadata.comment_count, label: 'explicit written comments', detail: 'Across eight open-text prompts' }
    ];
    $('#validation-kpis').innerHTML = cards.map(card => `
      <article>
        <strong>${escapeHtml(card.value)}</strong>
        <span>${escapeHtml(card.label)}</span>
        <small>${escapeHtml(card.detail)}</small>
      </article>`).join('');
  }

  function orderedCounterEntries(counter, preferredOrder = []) {
    const entries = Object.entries(counter);
    const rank = new Map(preferredOrder.map((item, index) => [item, index]));
    return entries.sort((a, b) => {
      const rankA = rank.has(a[0]) ? rank.get(a[0]) : preferredOrder.length;
      const rankB = rank.has(b[0]) ? rank.get(b[0]) : preferredOrder.length;
      if (rankA !== rankB) return rankA - rankB;
      return b[1] - a[1] || a[0].localeCompare(b[0]);
    });
  }

  function renderProfileMeasure(title, counter, preferredOrder = []) {
    const total = Object.values(counter).reduce((sum, value) => sum + Number(value), 0);
    const entries = orderedCounterEntries(counter, preferredOrder);
    const segments = entries.map(([label, count], index) => `
      <span class="profile-segment profile-segment-${(index % 5) + 1}" style="width:${(count / total) * 100}%" title="${escapeHtml(label)}: ${count} of ${total}">
        ${count / total >= 0.25 ? escapeHtml(count) : ''}
      </span>`).join('');
    const legend = entries.map(([label, count], index) => `
      <li><span class="profile-key profile-segment-${(index % 5) + 1}"></span><span>${escapeHtml(label)}</span><strong>${count}/${total}</strong></li>`).join('');
    return `
      <div class="validation-profile-measure">
        <div class="validation-profile-title"><strong>${escapeHtml(title)}</strong><span>n = ${total}</span></div>
        <div class="validation-profile-bar" aria-label="${escapeHtml(title)}">${segments}</div>
        <ul class="validation-profile-legend">${legend}</ul>
      </div>`;
  }

  function renderProfile() {
    const counts = data.profile_counts;
    $('#validation-period').textContent = formatDateRange(data.metadata.collection_start, data.metadata.collection_end);
    $('#validation-profile').innerHTML = [
      renderProfileMeasure('Affiliation', counts.affiliation, ['Thales Alenia Space', 'Antwerp Space']),
      renderProfileMeasure('Primary role group', counts.professional_background_group, [
        'Product / Software Product Assurance and Quality',
        'Software development / AI engineering'
      ]),
      renderProfileMeasure('ECSS experience', counts.ecss_experience, [
        '0–2 years (Junior / Early career)',
        '3–5 years (Intermediate)',
        '16+ years (Expert)'
      ]),
      renderProfileMeasure('AI/ML experience', counts.ai_ml_experience, [
        '0–2 years (Junior / Early career)',
        '3–5 years (Intermediate)',
        '16+ years (Expert)'
      ])
    ].join('');
  }

  function renderDistribution() {
    const total = data.overall.rating_count;
    const segments = [1, 2, 3, 4, 5].map(score => {
      const count = data.overall.distribution[String(score)];
      const width = total ? (count / total) * 100 : 0;
      return `<span class="rating-segment rating-${score}" style="width:${width}%" title="Rating ${score}: ${count} (${percent(count / total)})">${width >= 7 ? count : ''}</span>`;
    }).join('');
    const legend = [1, 2, 3, 4, 5].map(score => {
      const count = data.overall.distribution[String(score)];
      return `<li><span class="rating-key rating-${score}"></span><strong>${score}</strong><span>${count} · ${percent(count / total)}</span></li>`;
    }).join('');
    $('#validation-distribution').innerHTML = `
      <div class="validation-distribution-bar" aria-label="Distribution of ratings 1 to 5">${segments}</div>
      <ul class="validation-rating-legend">${legend}</ul>
      <dl class="validation-stat-strip">
        <div><dt>Descriptive mean</dt><dd>${number(data.overall.mean)} / 5</dd></div>
        <div><dt>Sample SD</dt><dd>${number(data.overall.sample_sd)}</dd></div>
        <div><dt>Median</dt><dd>${number(data.overall.median, 1)}</dd></div>
        <div><dt>IQR</dt><dd>${number(data.overall.iqr, 1)}</dd></div>
      </dl>
      <p class="validation-scale-note">${escapeHtml(data.metadata.scale)}</p>`;
  }

  function renderCategories() {
    const rows = data.categories.map(category => {
      const width = (category.mean / 5) * 100;
      const single = category.single_item ? '<span class="single-item-badge">single item</span>' : '';
      return `
        <div class="validation-category-row">
          <div class="validation-category-label">
            <strong>${escapeHtml(category.section)}</strong>
            <span>${escapeHtml(category.item_spec)} · ${category.n} ratings ${single}</span>
          </div>
          <div class="validation-category-measure">
            <div class="validation-mean-track" aria-label="${escapeHtml(category.section)} mean ${number(category.mean)} out of 5">
              <span class="validation-mean-fill" style="width:${width}%"></span>
              <i style="left:${width}%" aria-hidden="true"></i>
            </div>
            <div class="validation-category-metrics">
              <strong>${number(category.mean)}</strong>
              <span>SD ${number(category.sample_sd)}</span>
              <span>${percent(category.agreement_4_5_rate)} rated 4-5</span>
            </div>
          </div>
        </div>`;
    }).join('');
    $('#validation-category-chart').innerHTML = `
      <div class="validation-chart-axis"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div>
      ${rows}`;
  }

  function renderInsights() {
    const notable = data.notable_results;
    const lowCategories = notable.lowest_categories.map(item => item.section).join(' and ');
    const insights = [
      {
        label: 'Highest category mean',
        value: number(notable.highest_category.mean),
        title: notable.highest_category.section,
        detail: `Pooled SD ${number(notable.highest_category.sample_sd)}.`
      },
      {
        label: 'Uniform item-level response',
        value: number(notable.highest_item.mean),
        title: `${notable.highest_item.id} · ${notable.highest_item.label}`,
        detail: `All six participants selected 5; sample SD ${number(notable.highest_item.sample_sd)}.`
      },
      {
        label: 'Lowest item mean',
        value: number(notable.lowest_item.mean),
        title: `${notable.lowest_item.id} · ${notable.lowest_item.label}`,
        detail: `Still descriptive only; sample SD ${number(notable.lowest_item.sample_sd)}.`
      },
      {
        label: 'Largest item variability',
        value: number(notable.highest_variability_item.sample_sd),
        title: `${notable.highest_variability_item.id} · ${notable.highest_variability_item.label}`,
        detail: `Mean ${number(notable.highest_variability_item.mean)}. Lowest category means were ${lowCategories} (${number(notable.lowest_categories[0].mean)}).`
      }
    ];
    $('#validation-insights').innerHTML = insights.map(insight => `
      <article>
        <span>${escapeHtml(insight.label)}</span>
        <strong>${escapeHtml(insight.value)}</strong>
        <h4>${escapeHtml(insight.title)}</h4>
        <p>${escapeHtml(insight.detail)}</p>
      </article>`).join('');
  }

  function renderSectionOptions(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;
    const current = select.value || 'all';
    select.innerHTML = '<option value="all">All areas</option>' + sectionOrder
      .map(section => `<option value="${escapeHtml(section)}">${escapeHtml(section)}</option>`).join('');
    select.value = sectionOrder.includes(current) ? current : 'all';
  }

  function itemMatches(item) {
    const query = normalize(state.itemSearch);
    const haystack = normalize([item.id, item.section, item.short_label, item.question].join(' '));
    return (!query || haystack.includes(query)) && (state.itemSection === 'all' || item.section === state.itemSection);
  }

  function sortedItems() {
    const items = data.items.filter(itemMatches).slice();
    const idNumber = item => Number(item.id.slice(1));
    if (state.itemSort === 'mean-desc') items.sort((a, b) => b.mean - a.mean || idNumber(a) - idNumber(b));
    else if (state.itemSort === 'mean-asc') items.sort((a, b) => a.mean - b.mean || idNumber(a) - idNumber(b));
    else if (state.itemSort === 'sd-desc') items.sort((a, b) => b.sample_sd - a.sample_sd || idNumber(a) - idNumber(b));
    else if (state.itemSort === 'agreement-desc') items.sort((a, b) => b.agreement_4_5_rate - a.agreement_4_5_rate || b.mean - a.mean || idNumber(a) - idNumber(b));
    else items.sort((a, b) => idNumber(a) - idNumber(b));
    return items;
  }

  function scoreCell(score) {
    return `<td class="validation-score-cell"><span class="score-pill score-${score}" aria-label="Rating ${score}">${score}</span></td>`;
  }

  function renderItems() {
    const items = sortedItems();
    $('#validation-item-summary').textContent = `Showing ${items.length} of ${data.items.length} technical items. Means, SDs, medians, and IQRs are descriptive summaries of six ordinal responses.`;
    if (!items.length) {
      $('#validation-item-table').innerHTML = '<div class="empty-state">No questions match the current filters.</div>';
      return;
    }
    const rows = items.map(item => {
      const ratings = Object.values(item.responses).map(scoreCell).join('');
      return `
        <tr>
          <td><strong class="validation-qid">${escapeHtml(item.id)}</strong></td>
          <td><span class="validation-area-tag">${escapeHtml(item.section)}</span></td>
          <td class="validation-item-wording">
            <strong>${escapeHtml(item.short_label)}</strong>
            <details class="validation-question-details"><summary>Full administered wording</summary><p>${escapeHtml(item.question)}</p></details>
          </td>
          ${ratings}
          <td class="numeric-cell"><strong>${number(item.mean)}</strong></td>
          <td class="numeric-cell">${number(item.sample_sd)}</td>
          <td class="numeric-cell">${number(item.median, 1)}</td>
          <td class="numeric-cell">${number(item.iqr, 2)}</td>
          <td class="numeric-cell"><strong>${percent(item.agreement_4_5_rate)}</strong></td>
        </tr>`;
    }).join('');
    $('#validation-item-table').innerHTML = `
      <table class="validation-item-table">
        <thead><tr>
          <th>ID</th><th>Area</th><th>Item</th>
          <th>E1</th><th>E2</th><th>E3</th><th>E4</th><th>E5</th><th>E6</th>
          <th>Mean</th><th>SD</th><th>Median</th><th>IQR</th><th>4-5</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
  }

  function renderThemes() {
    $('#validation-themes').innerHTML = data.themes.map((theme, index) => `
      <article>
        <div class="validation-theme-index"><span>${String(index + 1).padStart(2, '0')}</span><strong>${escapeHtml(theme.items)}</strong></div>
        <h4>${escapeHtml(theme.title)}</h4>
        <p><strong>Issue raised.</strong> ${escapeHtml(theme.issue)}</p>
        <p><strong>Resulting refinement.</strong> ${escapeHtml(theme.refinement)}</p>
      </article>`).join('');
  }

  function commentMatches(comment) {
    const query = normalize(state.commentSearch);
    const haystack = normalize([comment.id, comment.participant, comment.section, comment.items, comment.prompt, comment.comment].join(' '));
    return (!query || haystack.includes(query)) && (state.commentSection === 'all' || comment.section === state.commentSection);
  }

  function commentHtml(comment) {
    const compact = normalize(comment.comment).slice(0, 190);
    const suffix = normalize(comment.comment).length > 190 ? '…' : '';
    const body = escapeHtml(comment.comment).replaceAll('\n', '<br>');
    return `
      <details class="validation-comment-card">
        <summary>
          <span class="validation-comment-meta"><strong>${escapeHtml(comment.participant)}</strong><span>${escapeHtml(comment.section)}</span><span>${escapeHtml(comment.items)}</span></span>
          <span class="validation-comment-preview">${escapeHtml(compact)}${suffix}</span>
        </summary>
        <div class="validation-comment-content">
          <p><strong>Prompt:</strong> ${escapeHtml(comment.prompt)}</p>
          <blockquote>${body}</blockquote>
        </div>
      </details>`;
  }

  function renderComments() {
    const comments = data.comments.filter(commentMatches);
    $('#validation-comment-summary').textContent = `Showing ${comments.length} of ${data.comments.length} explicit comments. Participant IDs are anonymised.`;
    $('#validation-comments').innerHTML = comments.length
      ? comments.map(commentHtml).join('')
      : '<div class="empty-state">No comments match the current filters.</div>';
  }

  function renderMethod() {
    const sources = data.metadata.source_files.map(source => `
      <li><strong>${escapeHtml(source.name)}</strong><span>${escapeHtml(source.role)}</span><code>${escapeHtml(source.sha256.slice(0, 16))}…</code></li>`).join('');
    const limitations = data.limitations.map(limit => `<li>${escapeHtml(limit)}</li>`).join('');
    $('#validation-method').innerHTML = `
      <article class="validation-method-card">
        <p class="mini-label">Method and provenance</p>
        <h3>How the displayed statistics were produced</h3>
        <p>${escapeHtml(data.metadata.statistics_method)}</p>
        <dl>
          <div><dt>Collection period</dt><dd>${escapeHtml(formatDateRange(data.metadata.collection_start, data.metadata.collection_end))}</dd></div>
          <div><dt>Instrument</dt><dd>${data.metadata.profile_question_count} profile questions and ${data.metadata.technical_item_count} technical agreement items</dd></div>
          <div><dt>Completeness</dt><dd>${data.overall.complete_rating_count}/${data.overall.expected_rating_count} technical ratings present</dd></div>
        </dl>
        <ul class="validation-source-list">${sources}</ul>
      </article>
      <article class="validation-method-card validation-limitations-card">
        <p class="mini-label">Interpretation limits</p>
        <h3>What this first evaluation cannot establish</h3>
        <ul>${limitations}</ul>
      </article>`;
  }

  function bindEvents() {
    $('#validation-item-search').addEventListener('input', event => {
      state.itemSearch = event.target.value;
      renderItems();
    });
    $('#validation-item-section').addEventListener('change', event => {
      state.itemSection = event.target.value;
      renderItems();
    });
    $('#validation-item-sort').addEventListener('change', event => {
      state.itemSort = event.target.value;
      renderItems();
    });
    $('#validation-comment-search').addEventListener('input', event => {
      state.commentSearch = event.target.value;
      renderComments();
    });
    $('#validation-comment-section').addEventListener('change', event => {
      state.commentSection = event.target.value;
      renderComments();
    });
  }

  renderSectionOptions('validation-item-section');
  renderSectionOptions('validation-comment-section');
  renderCaveat();
  renderKpis();
  renderProfile();
  renderDistribution();
  renderCategories();
  renderInsights();
  renderItems();
  renderThemes();
  renderComments();
  renderMethod();
  bindEvents();
})();
