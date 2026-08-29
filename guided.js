(() => {
  'use strict';

  const ui = window.AEROSAFE_UI;
  const root = document.getElementById('guided-app');
  if (!ui || !root) return;

  const { data, groups, itemMap, escapeHtml } = ui;
  const guided = data.guided_use;
  const recommender = guided.recommender;
  const storageKey = String(guided.storage_key || 'aerosafe-guided-record-v2').replace(/v1$/, 'v2');
  const RECORD_VERSION = 2;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const isBlank = value => !String(value ?? '').trim();
  const normalize = value => String(value ?? '').trim();
  const today = () => {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  };
  const formatDateTime = value => {
    if (!value) return 'Not recorded';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString();
  };
  const display = (value, fallback = 'Not recorded') => isBlank(value) ? fallback : escapeHtml(value);

  function parseStatus(item) {
    const match = String(item['source/status'] || '').match(/Status:\s*([^.;]+)/i);
    return match ? match[1].trim() : 'Project-tailored';
  }

  function defaultApplicability(item) {
    const status = parseStatus(item);
    if (/^M(?:\s|$)/i.test(status)) return 'applicable';
    if (/^C(?:\s|$)/i.test(status)) return 'conditional';
    if (/^N\.A\./i.test(status)) return 'na';
    return 'pending';
  }

  function makePhaseChecks() {
    return Object.fromEntries(guided.steps.map(step => [
      step.id,
      Object.fromEntries(step.checks.map(check => [check.id, false]))
    ]));
  }

  function makeControlRecord(item) {
    return {
      applicability: defaultApplicability(item),
      owner: item.owner || '',
      gate: item.gate || '',
      closureAuthority: item['closure authority'] || '',
      plannedEvidence: '',
      tailoringRationale: '',
      configured: false,
      result: 'pending',
      evidenceRef: '',
      decisionFinding: '',
      projectLinks: '',
      residuals: '',
      executed: false,
      closure: 'open',
      closureNote: '',
      closureConfirmed: false
    };
  }

  function createDefaultRecord() {
    const project = Object.fromEntries(guided.project_fields.map(field => [field.id, '']));
    project.record_date = today();
    const gate = Object.fromEntries(guided.gate_fields.map(field => [
      field.id,
      field.type === 'select' ? (field.options?.[0]?.value || '') : ''
    ]));
    const controls = Object.fromEntries([...itemMap.entries()].map(([id, item]) => [id, makeControlRecord(item)]));
    return {
      schemaVersion: RECORD_VERSION,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      currentStep: 0,
      project,
      recommendationAnswers: Object.fromEntries(recommender.questions.map(question => [question.id, 'pending'])),
      recommendations: { generatedAt: null, byGroup: {} },
      groups: Object.fromEntries(groups.map(group => [group.id, { decision: 'pending', rationale: '' }])),
      controls,
      gate,
      phaseChecks: makePhaseChecks(),
      report: { generatedAt: null }
    };
  }

  function hydrateRecord(saved) {
    const fresh = createDefaultRecord();
    if (!saved || typeof saved !== 'object' || Number(saved.schemaVersion) !== RECORD_VERSION) return fresh;
    return {
      ...fresh,
      ...saved,
      currentStep: Math.max(0, Math.min(guided.steps.length - 1, Number(saved.currentStep) || 0)),
      project: { ...fresh.project, ...(saved.project || {}) },
      recommendationAnswers: { ...fresh.recommendationAnswers, ...(saved.recommendationAnswers || {}) },
      recommendations: {
        ...fresh.recommendations,
        ...(saved.recommendations || {}),
        byGroup: { ...fresh.recommendations.byGroup, ...((saved.recommendations || {}).byGroup || {}) }
      },
      groups: Object.fromEntries(groups.map(group => [
        group.id,
        { ...fresh.groups[group.id], ...((saved.groups || {})[group.id] || {}) }
      ])),
      controls: Object.fromEntries([...itemMap.keys()].map(id => [
        id,
        { ...fresh.controls[id], ...((saved.controls || {})[id] || {}) }
      ])),
      gate: { ...fresh.gate, ...(saved.gate || {}) },
      phaseChecks: Object.fromEntries(guided.steps.map(step => [
        step.id,
        { ...fresh.phaseChecks[step.id], ...((saved.phaseChecks || {})[step.id] || {}) }
      ])),
      report: { ...fresh.report, ...(saved.report || {}) }
    };
  }

  function loadRecord() {
    try {
      const raw = localStorage.getItem(storageKey);
      return hydrateRecord(raw ? JSON.parse(raw) : null);
    } catch (error) {
      console.warn('Aerosafe guided record could not be restored.', error);
      return createDefaultRecord();
    }
  }

  let record = loadRecord();
  let autoSaveTimer = null;

  function selectedGroups() {
    return groups.filter(group => record.groups[group.id].decision === 'included');
  }

  function selectedControlIds() {
    return selectedGroups().flatMap(group => group.ids);
  }

  function applicableControlIds() {
    return selectedControlIds().filter(id => ['applicable', 'conditional'].includes(record.controls[id].applicability));
  }

  function groupRecommendation(groupId) {
    return record.recommendations.byGroup[groupId] || null;
  }

  function recommendationExpectedDecision(recommendation) {
    if (!recommendation) return null;
    return recommendation.level === 'not-triggered' ? 'excluded' : 'included';
  }

  function evaluateRecommendations() {
    const answers = record.recommendationAnswers;
    const byGroup = {};

    recommender.rules.forEach(rule => {
      const reasons = [];
      let level = 'not-triggered';
      if (rule.baseline) {
        level = 'baseline';
        if (rule.reason) reasons.push(rule.reason);
        (rule.reason_if || []).forEach(condition => {
          if (answers[condition.question] === condition.value) reasons.push(condition.text);
        });
      } else {
        const triggered = (rule.triggers || []).filter(trigger => answers[trigger.question] === trigger.value);
        if (triggered.length) {
          level = 'recommended';
          reasons.push(...triggered.map(trigger => trigger.text));
        } else {
          const relevantQuestions = rule.questions || (rule.triggers || []).map(trigger => trigger.question);
          const hasUnknown = relevantQuestions.some(questionId => answers[questionId] === 'unknown');
          level = hasUnknown ? 'consider' : 'not-triggered';
          if (rule.fallback) reasons.push(rule.fallback);
          if (hasUnknown) reasons.push('At least one triggering project characteristic is not yet known; retain an explicit conservative decision.');
        }
      }
      byGroup[rule.group_id] = { level, reasons };
    });

    record.recommendations = { generatedAt: new Date().toISOString(), byGroup };
    record.report.generatedAt = null;
  }

  function applyRecommendations() {
    if (!record.recommendations.generatedAt) evaluateRecommendations();
    groups.forEach(group => {
      const recommendation = groupRecommendation(group.id);
      const expected = recommendationExpectedDecision(recommendation);
      record.groups[group.id].decision = expected || 'pending';
      const reasonText = recommendation?.reasons?.join(' ') || '';
      record.groups[group.id].rationale = `Recommender (${recommendationLabel(recommendation?.level)}): ${reasonText}`.trim();
    });
    record.report.generatedAt = null;
  }

  function recommendationLabel(level) {
    return ({
      baseline: 'Baseline',
      recommended: 'Recommended',
      consider: 'Consider / resolve uncertainty',
      'not-triggered': 'Not triggered'
    })[level] || 'Not generated';
  }

  function recommendationClass(level) {
    return ({ baseline: 'baseline', recommended: 'recommended', consider: 'consider', 'not-triggered': 'not-triggered' })[level] || 'pending';
  }

  function phaseCheckScore(step) {
    const values = step.checks.map(check => Boolean(record.phaseChecks[step.id][check.id]));
    return { done: values.filter(Boolean).length, total: values.length };
  }

  function completionForStep(index) {
    const step = guided.steps[index];
    let done = 0;
    let total = 0;
    const issues = [];
    const add = (condition, issue) => {
      total += 1;
      if (condition) done += 1;
      else if (issue) issues.push(issue);
    };

    if (step.id === 'context') {
      guided.project_fields.filter(field => field.required).forEach(field => {
        add(!isBlank(record.project[field.id]), `${field.label} is required.`);
      });
    }

    if (step.id === 'scope') {
      recommender.questions.forEach(question => {
        add(record.recommendationAnswers[question.id] !== 'pending', `Answer: ${question.label}`);
      });
      add(Boolean(record.recommendations.generatedAt), 'Generate and review the group recommendations.');
      groups.forEach(group => {
        const groupRecord = record.groups[group.id];
        const recommendation = groupRecommendation(group.id);
        const expected = recommendationExpectedDecision(recommendation);
        add(groupRecord.decision !== 'pending', `${group.code}: record an include or exclude decision.`);
        const needsRationale = groupRecord.decision === 'excluded'
          || (expected && groupRecord.decision !== expected)
          || recommendation?.level === 'consider';
        if (needsRationale) add(!isBlank(groupRecord.rationale), `${group.code}: explain exclusion, uncertainty, or departure from the recommendation.`);
      });
      add(selectedGroups().length > 0, 'Include at least one checklist group.');
    }

    if (step.id === 'configure') {
      const ids = selectedControlIds();
      add(ids.length > 0, 'Select at least one checklist group before configuration.');
      ids.forEach(id => {
        const control = record.controls[id];
        add(control.applicability !== 'pending', `${id}: decide applicability.`);
        if (control.applicability === 'na') {
          add(!isBlank(control.tailoringRationale), `${id}: justify N.A. and record the approval route.`);
          add(control.configured, `${id}: confirm the N.A. construction record.`);
        } else if (['applicable', 'conditional'].includes(control.applicability)) {
          add(!isBlank(control.owner), `${id}: owner is required.`);
          add(!isBlank(control.gate), `${id}: gate is required.`);
          add(!isBlank(control.closureAuthority), `${id}: closure authority is required.`);
          add(!isBlank(control.plannedEvidence), `${id}: planned evidence or controlled-record reference is required.`);
          if (control.applicability === 'conditional') {
            add(!isBlank(control.tailoringRationale), `${id}: explain the activation condition and tailoring decision.`);
          }
          add(control.configured, `${id}: confirm the construction and traceability record.`);
        }
      });
    }

    if (step.id === 'execute') {
      const ids = applicableControlIds();
      add(ids.length > 0, 'No applicable controls are available for execution.');
      ids.forEach(id => {
        const control = record.controls[id];
        add(control.result !== 'pending', `${id}: record an execution result.`);
        if (control.result === 'pass') add(!isBlank(control.evidenceRef), `${id}: a pass requires a controlled evidence reference.`);
        if (['fail', 'blocked'].includes(control.result)) {
          add(!isBlank(control.decisionFinding), `${id}: identify the finding, NCR, deviation, or blocking decision.`);
          add(!isBlank(control.residuals), `${id}: record the resulting residual or limitation.`);
        }
        add(!isBlank(control.projectLinks), `${id}: link the result to project requirements, hazards, claims, configurations, or findings.`);
        add(control.executed, `${id}: confirm that execution is complete.`);
      });
    }

    if (step.id === 'closure') {
      guided.gate_fields.filter(field => field.required).forEach(field => {
        const value = record.gate[field.id];
        add(!isBlank(value) && value !== 'pending', `${field.label} is required.`);
      });
      applicableControlIds().forEach(id => {
        const control = record.controls[id];
        add(control.closureConfirmed, `${id}: review and confirm the closure state.`);
        if (['open', 'conditional', 'waived', 'rejected'].includes(control.closure)) {
          add(!isBlank(control.closureNote), `${id}: explain the ${control.closure} state and retain the authority or due-gate reference.`);
        }
      });
    }

    if (step.id === 'conformity') {
      add(Boolean(record.report.generatedAt), 'Generate the checklist-conformity page.');
    }

    const phase = phaseCheckScore(step);
    done += phase.done;
    total += phase.total;
    step.checks.forEach(check => {
      if (!record.phaseChecks[step.id][check.id]) issues.push(check.label);
    });

    return {
      done,
      total,
      percent: total ? Math.round((done / total) * 100) : 0,
      complete: total > 0 && done === total,
      issues
    };
  }

  function workflowCompletion() {
    const steps = guided.steps.map((_, index) => completionForStep(index));
    const done = steps.reduce((sum, value) => sum + value.done, 0);
    const total = steps.reduce((sum, value) => sum + value.total, 0);
    return { steps, done, total, percent: total ? Math.round((done / total) * 100) : 0 };
  }

  function saveRecord({ announce = true } = {}) {
    record.updatedAt = new Date().toISOString();
    try {
      localStorage.setItem(storageKey, JSON.stringify(record));
      if (announce) $('#guided-save-status').textContent = `Saved locally ${new Date(record.updatedAt).toLocaleString()}`;
    } catch (error) {
      $('#guided-save-status').textContent = 'Local save unavailable; export the JSON record instead.';
      console.warn('Aerosafe guided record could not be saved.', error);
    }
  }

  function scheduleSave() {
    clearTimeout(autoSaveTimer);
    $('#guided-save-status').textContent = 'Saving locally…';
    autoSaveTimer = setTimeout(() => saveRecord(), 300);
  }

  function recordName() {
    return record.project.project_name || record.project.record_id || 'Untitled record';
  }

  function renderField(definition, value, attribute, extraClass = '') {
    const required = definition.required ? ' <span aria-hidden="true">*</span>' : '';
    const common = `${attribute} aria-label="${escapeHtml(definition.label)}"`;
    let input;
    if (definition.type === 'textarea') {
      input = `<textarea ${common} rows="3" placeholder="${escapeHtml(definition.placeholder || '')}">${escapeHtml(value)}</textarea>`;
    } else if (definition.type === 'select') {
      input = `<select ${common}>${definition.options.map(option => `<option value="${escapeHtml(option.value)}"${option.value === value ? ' selected' : ''}>${escapeHtml(option.label)}</option>`).join('')}</select>`;
    } else {
      input = `<input ${common} type="${escapeHtml(definition.type || 'text')}" value="${escapeHtml(value)}" placeholder="${escapeHtml(definition.placeholder || '')}">`;
    }
    return `<label class="guided-field ${definition.type === 'textarea' ? 'field-wide' : ''} ${extraClass}"><span>${escapeHtml(definition.label)}${required}</span>${input}</label>`;
  }

  function renderPhaseChecks(step, reportMode = false) {
    return `<fieldset class="phase-checks${reportMode ? ' report-phase-checks' : ''}"><legend>Stage completion checks</legend>${step.checks.map(check => `
      <label><input type="checkbox" data-phase-id="${escapeHtml(step.id)}" data-phase-check="${escapeHtml(check.id)}"${record.phaseChecks[step.id][check.id] ? ' checked' : ''}><span>${escapeHtml(check.label)}</span></label>`).join('')}</fieldset>`;
  }

  function stepHeader(step, index) {
    const completion = completionForStep(index);
    return `<div class="guided-step-heading">
      <div><p class="eyebrow">Stage ${escapeHtml(step.number)} of ${guided.steps.length}</p><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.user_action)}</p></div>
      <div class="step-completion ${completion.complete ? 'complete' : ''}"><strong>${completion.percent}%</strong><span>${completion.complete ? 'complete' : 'recorded'}</span></div>
    </div>`;
  }

  function renderGuidance(step) {
    return `<div class="guided-help"><strong>Record to complete:</strong> ${escapeHtml(step.record)}<br><strong>Completion criterion:</strong> ${escapeHtml(step.completion)}</div>`;
  }

  function renderContextStep(step, index) {
    return `${stepHeader(step, index)}${renderGuidance(step)}
      <div class="guided-field-grid">${guided.project_fields.map(field => renderField(field, record.project[field.id], `data-project-field="${escapeHtml(field.id)}"`)).join('')}</div>
      ${renderPhaseChecks(step)}`;
  }

  function renderQuestion(question) {
    const current = record.recommendationAnswers[question.id];
    return `<label class="recommender-question"><span class="question-label">${escapeHtml(question.label)}</span><span class="question-help">${escapeHtml(question.help)}</span><select data-recommender-question="${escapeHtml(question.id)}">${question.options.map(option => `<option value="${escapeHtml(option.value)}"${current === option.value ? ' selected' : ''}>${escapeHtml(option.label)}</option>`).join('')}</select></label>`;
  }

  function renderGroupDecision(group) {
    const groupRecord = record.groups[group.id];
    const recommendation = groupRecommendation(group.id);
    const level = recommendation?.level || 'pending';
    const expected = recommendationExpectedDecision(recommendation);
    const override = expected && groupRecord.decision !== 'pending' && groupRecord.decision !== expected;
    const reasons = recommendation?.reasons?.length
      ? `<ul>${recommendation.reasons.map(reason => `<li>${escapeHtml(reason)}</li>`).join('')}</ul>`
      : '<p>Generate recommendations after answering all project-characteristic questions.</p>';
    return `<article class="recommendation-card ${escapeHtml(groupRecord.decision)}">
      <header><span class="group-code">${escapeHtml(group.code)}</span><span class="group-count">${group.item_count} controls</span><div><h4>${escapeHtml(group.group_name)}</h4><p>${escapeHtml(group.item_spec)}</p></div></header>
      <div class="recommendation-body"><div><span class="recommendation-badge ${recommendationClass(level)}">${escapeHtml(recommendationLabel(level))}</span>${reasons}</div><div class="decision-controls">
        <label><span>Project decision</span><select data-group-decision="${escapeHtml(group.id)}"><option value="pending"${groupRecord.decision === 'pending' ? ' selected' : ''}>Pending</option><option value="included"${groupRecord.decision === 'included' ? ' selected' : ''}>Include group</option><option value="excluded"${groupRecord.decision === 'excluded' ? ' selected' : ''}>Exclude group</option></select></label>
        <label><span>Decision / override rationale${(groupRecord.decision === 'excluded' || override || level === 'consider') ? ' *' : ''}</span><textarea rows="3" data-group-rationale="${escapeHtml(group.id)}" placeholder="Record project evidence, contractual tailoring, uncertainty resolution, approval route, or reason for overriding the suggestion.">${escapeHtml(groupRecord.rationale)}</textarea></label>
      </div></div>
      <footer><span><strong>Construction audience:</strong> ${escapeHtml(group.planner_audience)}</span><span><strong>Execution audience:</strong> ${escapeHtml(group.user_audience)}</span></footer>
    </article>`;
  }

  function renderScopeStep(step, index) {
    const answered = recommender.questions.filter(question => record.recommendationAnswers[question.id] !== 'pending').length;
    const decided = groups.filter(group => record.groups[group.id].decision !== 'pending').length;
    return `${stepHeader(step, index)}${renderGuidance(step)}
      <aside class="recommender-caveat"><strong>Advisory, deterministic, and inspectable.</strong><span>${escapeHtml(recommender.intro)}</span></aside>
      <div class="recommender-summary"><div><strong>${answered}/${recommender.questions.length}</strong><span>questions answered</span></div><div><strong>${record.recommendations.generatedAt ? 'Yes' : 'No'}</strong><span>recommendations generated</span></div><div><strong>${decided}/${groups.length}</strong><span>group decisions recorded</span></div><div><strong>${selectedGroups().length}</strong><span>groups included</span></div></div>
      <div class="recommender-questions">${recommender.questions.map(renderQuestion).join('')}</div>
      <div class="recommender-actions"><button class="button primary" type="button" data-generate-recommendations>Generate recommendations</button><button class="button secondary" type="button" data-apply-recommendations>Apply as starting scope</button><button class="button secondary" type="button" data-clear-decisions>Clear project decisions</button></div>
      <div class="recommendation-list">${groups.map(renderGroupDecision).join('')}</div>
      ${renderPhaseChecks(step)}`;
  }

  function controlHeader(id, item, control) {
    return `<summary><span class="control-summary-main"><strong>${escapeHtml(id)}</strong><span class="status-badge">${escapeHtml(parseStatus(item))}</span><span>${escapeHtml(item.objective)}</span></span><span class="control-state ${control.configured ? 'done' : ''}">${control.configured ? 'configured' : 'open'}</span></summary>`;
  }

  function renderConfigureControl(id) {
    const item = itemMap.get(id);
    const control = record.controls[id];
    const options = [
      ['pending', 'Decide applicability'],
      ['applicable', 'Applicable'],
      ['conditional', 'Conditional'],
      ['na', 'Not applicable (N.A.)']
    ];
    return `<details class="guided-control-card"${!control.configured ? ' open' : ''}>${controlHeader(id, item, control)}<div class="guided-control-body">
      <div class="control-reference"><div><span>Objective</span><p>${escapeHtml(item.objective)}</p></div><div><span>Configured acceptance criterion</span><p>${escapeHtml(item['acceptance criterion'])}</p></div><div><span>Canonical traceability targets</span><p>${escapeHtml(item.links)}</p></div><div><span>Residual-treatment rule</span><p>${escapeHtml(item.residuals)}</p></div></div>
      <div class="guided-field-grid compact-grid">
        <label class="guided-field"><span>Applicability *</span><select data-control-id="${escapeHtml(id)}" data-control-field="applicability">${options.map(([value, label]) => `<option value="${value}"${control.applicability === value ? ' selected' : ''}>${label}</option>`).join('')}</select></label>
        <label class="guided-field"><span>Evidence owner *</span><input type="text" value="${escapeHtml(control.owner)}" data-control-id="${escapeHtml(id)}" data-control-field="owner"></label>
        <label class="guided-field"><span>Review gate *</span><input type="text" value="${escapeHtml(control.gate)}" data-control-id="${escapeHtml(id)}" data-control-field="gate"></label>
        <label class="guided-field"><span>Closure authority *</span><input type="text" value="${escapeHtml(control.closureAuthority)}" data-control-id="${escapeHtml(id)}" data-control-field="closureAuthority"></label>
        <label class="guided-field field-wide"><span>Planned evidence / controlled-record references *</span><textarea rows="2" data-control-id="${escapeHtml(id)}" data-control-field="plannedEvidence" placeholder="Identify the evidence package, test record, baseline, or review artefact to be produced.">${escapeHtml(control.plannedEvidence)}</textarea></label>
        <label class="guided-field field-wide"><span>Tailoring, conditional activation, N.A., or substitution rationale</span><textarea rows="2" data-control-id="${escapeHtml(id)}" data-control-field="tailoringRationale" placeholder="Required for conditional and N.A. decisions; include the approval route.">${escapeHtml(control.tailoringRationale)}</textarea></label>
      </div>
      <label class="record-confirm"><input type="checkbox" data-control-id="${escapeHtml(id)}" data-control-field="configured"${control.configured ? ' checked' : ''}><span>The construction and traceability record is baselined before execution.</span></label>
    </div></details>`;
  }

  function renderControlGroups(ids, renderer) {
    return selectedGroups().map(group => {
      const groupIds = group.ids.filter(id => ids.includes(id));
      if (!groupIds.length) return '';
      const complete = groupIds.filter(id => {
        const control = record.controls[id];
        return renderer === renderConfigureControl ? control.configured : control.executed;
      }).length;
      return `<details class="control-group" open><summary><span><strong><span class="group-code inline">${escapeHtml(group.code)}</span> ${escapeHtml(group.group_name)}</strong><small>${escapeHtml(group.item_spec)}</small></span><span>${complete}/${groupIds.length} recorded</span></summary><div class="control-group-body">${groupIds.map(renderer).join('')}</div></details>`;
    }).join('');
  }

  function renderConfigureStep(step, index) {
    const ids = selectedControlIds();
    if (!ids.length) return `${stepHeader(step, index)}${renderGuidance(step)}<div class="guided-empty"><h4>No checklist controls selected</h4><p>Return to Stage 2, review the recommender, and include at least one named checklist group.</p></div>${renderPhaseChecks(step)}`;
    return `${stepHeader(step, index)}${renderGuidance(step)}
      <aside class="view-purpose"><strong>Construction and traceability view</strong><span>Used by assurance planners before evidence is judged. It preserves why the control exists, what evidence is expected, who owns it, which gate judges it, who may close it, and which project artefacts must remain linked.</span></aside>
      <div class="control-groups">${renderControlGroups(ids, renderConfigureControl)}</div>${renderPhaseChecks(step)}`;
  }

  function resultLabel(value) {
    return ({ pending: 'Pending', pass: 'Pass', fail: 'Fail', blocked: 'Blocked' })[value] || value;
  }

  function renderExecutionControl(id) {
    const item = itemMap.get(id);
    const control = record.controls[id];
    return `<details class="guided-control-card"${!control.executed ? ' open' : ''}><summary><span class="control-summary-main"><strong>${escapeHtml(id)}</strong><span class="result-badge result-${escapeHtml(control.result)}">${escapeHtml(resultLabel(control.result))}</span><span>${escapeHtml(item.objective)}</span></span><span class="control-state ${control.executed ? 'done' : ''}">${control.executed ? 'recorded' : 'open'}</span></summary><div class="guided-control-body">
      <div class="control-reference"><div><span>Acceptance criterion</span><p>${escapeHtml(item['acceptance criterion'])}</p></div><div><span>Planned evidence</span><p>${display(control.plannedEvidence)}</p></div><div><span>Owner / gate</span><p>${display(control.owner)} · ${display(control.gate)}</p></div><div><span>Closure authority</span><p>${display(control.closureAuthority)}</p></div></div>
      <div class="guided-field-grid">
        <label class="guided-field"><span>Execution result *</span><select data-control-id="${escapeHtml(id)}" data-control-field="result"><option value="pending"${control.result === 'pending' ? ' selected' : ''}>Pending</option><option value="pass"${control.result === 'pass' ? ' selected' : ''}>Pass</option><option value="fail"${control.result === 'fail' ? ' selected' : ''}>Fail</option><option value="blocked"${control.result === 'blocked' ? ' selected' : ''}>Blocked</option></select></label>
        <label class="guided-field field-wide"><span>Evidence reviewed and configuration identifiers *</span><textarea rows="2" data-control-id="${escapeHtml(id)}" data-control-field="evidenceRef" placeholder="Evidence record, dataset/model/software/tool/target versions, test run, or review minutes.">${escapeHtml(control.evidenceRef)}</textarea></label>
        <label class="guided-field field-wide"><span>Decision, finding, NCR, deviation, or waiver</span><textarea rows="2" data-control-id="${escapeHtml(id)}" data-control-field="decisionFinding" placeholder="Required when the result is fail or blocked; record identifiers and disposition route.">${escapeHtml(control.decisionFinding)}</textarea></label>
        <label class="guided-field field-wide"><span>Project traceability links *</span><textarea rows="2" data-control-id="${escapeHtml(id)}" data-control-field="projectLinks" placeholder="Requirements, hazards, claims, configurations, findings, tests, and review actions linked to this result.">${escapeHtml(control.projectLinks)}</textarea></label>
        <label class="guided-field field-wide"><span>Residuals, limitations, or open conditions</span><textarea rows="2" data-control-id="${escapeHtml(id)}" data-control-field="residuals" placeholder="Retain what remains unverified, accepted conditionally, or outside the authorised baseline.">${escapeHtml(control.residuals)}</textarea></label>
      </div>
      <label class="record-confirm"><input type="checkbox" data-control-id="${escapeHtml(id)}" data-control-field="executed"${control.executed ? ' checked' : ''}><span>The result reflects controlled evidence; missing evidence has not been treated as a pass.</span></label>
    </div></details>`;
  }

  function renderExecuteStep(step, index) {
    const ids = applicableControlIds();
    if (!ids.length) return `${stepHeader(step, index)}${renderGuidance(step)}<div class="guided-empty"><h4>No applicable controls</h4><p>Complete Stage 3 and mark at least one selected control Applicable or Conditional.</p></div>${renderPhaseChecks(step)}`;
    return `${stepHeader(step, index)}${renderGuidance(step)}
      <aside class="view-purpose"><strong>Execution checklist view</strong><span>Used by reviewers and assessors at the gate. Record what was actually examined, the result, any finding, the project traceability links, and the residuals. A planned record is not evidence of completion.</span></aside>
      <div class="control-groups">${renderControlGroups(ids, renderExecutionControl)}</div>${renderPhaseChecks(step)}`;
  }

  function closureLabel(value) {
    return ({ open: 'Open', closed: 'Closed', conditional: 'Conditionally closed', waived: 'Waived', rejected: 'Rejected' })[value] || value;
  }

  function renderClosureControl(id) {
    const item = itemMap.get(id);
    const control = record.controls[id];
    return `<article class="closure-card"><header><span class="control-id">${escapeHtml(id)}</span><div><strong>${escapeHtml(item.objective)}</strong><small>Result: ${escapeHtml(resultLabel(control.result))} · planned closure authority: ${display(control.closureAuthority)}</small></div></header><div class="closure-grid">
      <label class="guided-field"><span>Closure state *</span><select data-control-id="${escapeHtml(id)}" data-control-field="closure"><option value="open"${control.closure === 'open' ? ' selected' : ''}>Open</option><option value="closed"${control.closure === 'closed' ? ' selected' : ''}>Closed</option><option value="conditional"${control.closure === 'conditional' ? ' selected' : ''}>Conditionally closed</option><option value="waived"${control.closure === 'waived' ? ' selected' : ''}>Waived</option><option value="rejected"${control.closure === 'rejected' ? ' selected' : ''}>Rejected</option></select></label>
      <label class="guided-field field-wide"><span>Authority reference, closure note, due gate, or retained condition</span><textarea rows="2" data-control-id="${escapeHtml(id)}" data-control-field="closureNote" placeholder="Name the decision body or role and retain finding, waiver, condition, owner, date, and due gate as applicable.">${escapeHtml(control.closureNote)}</textarea></label>
      <label class="record-confirm"><input type="checkbox" data-control-id="${escapeHtml(id)}" data-control-field="closureConfirmed"${control.closureConfirmed ? ' checked' : ''}><span>The designated authority disposition and any open condition have been reviewed and recorded.</span></label>
    </div></article>`;
  }

  function renderClosureStep(step, index) {
    const ids = applicableControlIds();
    return `${stepHeader(step, index)}${renderGuidance(step)}
      <div class="guided-field-grid">${guided.gate_fields.map(field => renderField(field, record.gate[field.id], `data-gate-field="${escapeHtml(field.id)}"`)).join('')}</div>
      <h4 class="guided-subheading">Control-level closure and retained conditions</h4>
      ${ids.length ? `<div class="closure-list">${ids.map(renderClosureControl).join('')}</div>` : '<div class="guided-empty"><h4>No applicable controls</h4><p>Complete the earlier stages before recording closure.</p></div>'}
      ${renderPhaseChecks(step)}`;
  }

  function renderConformityStep(step, index) {
    const workflow = workflowCompletion();
    const stats = recordStats();
    const openIssues = workflow.steps.flatMap((status, stageIndex) => status.issues.map(issue => `Stage ${stageIndex + 1}: ${issue}`));
    return `${stepHeader(step, index)}${renderGuidance(step)}
      <div class="conformity-preview-grid"><article><strong>${workflow.percent}%</strong><span>workflow recorded</span></article><article><strong>${stats.includedGroups}</strong><span>groups included</span></article><article><strong>${stats.selected}</strong><span>controls selected</span></article><article><strong>${stats.pass}</strong><span>passed</span></article><article><strong>${stats.fail + stats.blocked}</strong><span>failed / blocked</span></article><article><strong>${stats.openOrConditional}</strong><span>open / conditional closure</span></article></div>
      <div class="completion-issues"><h4>Open completion information</h4>${openIssues.length ? `<ul>${openIssues.slice(0, 30).map(issue => `<li>${escapeHtml(issue)}</li>`).join('')}</ul>${openIssues.length > 30 ? `<p>Plus ${openIssues.length - 30} additional open entries retained in the project record.</p>` : ''}` : '<p>No open completion issue is currently detected.</p>'}</div>
      ${renderPhaseChecks(step)}
      <button class="button primary generate-report-button" type="button" data-generate-report>Generate checklist-conformity page</button>
      <p class="guided-final-note">The generated page records conformity to the selected Aerosafe checklist for the identified baseline. It does not certify ECSS compliance or replace the project/customer qualification authority.</p>`;
  }

  function renderPanel() {
    const step = guided.steps[record.currentStep];
    const renderer = ({ context: renderContextStep, scope: renderScopeStep, configure: renderConfigureStep, execute: renderExecuteStep, closure: renderClosureStep, conformity: renderConformityStep })[step.id];
    $('#guided-panel').innerHTML = renderer(step, record.currentStep);
  }

  function renderChrome() {
    const workflow = workflowCompletion();
    const current = record.currentStep;
    $('#guided-record-name').textContent = recordName();
    $('#guided-progress-label').textContent = `Stage ${current + 1} of ${guided.steps.length}`;
    $('#guided-progress-percent').textContent = `${workflow.percent}%`;
    $('#guided-progress-bar').style.width = `${workflow.percent}%`;
    $('#guided-back').disabled = current === 0;
    $('#guided-next').textContent = current === guided.steps.length - 1 ? 'Generate conformity page' : 'Next stage';
    $('#guided-stepper').innerHTML = guided.steps.map((step, index) => {
      const completion = workflow.steps[index];
      return `<li><button type="button" data-guided-step="${index}" class="${index === current ? 'active' : ''} ${completion.complete ? 'complete' : ''}" aria-current="${index === current ? 'step' : 'false'}"><span>${escapeHtml(step.number)}</span><strong>${escapeHtml(step.title)}</strong><small>${completion.percent}% recorded</small></button></li>`;
    }).join('');
  }

  function renderGuided() {
    renderChrome();
    renderPanel();
  }

  function invalidateReport() {
    record.report.generatedAt = null;
  }

  function handleInput(target) {
    if (target.dataset.projectField) {
      record.project[target.dataset.projectField] = target.value;
      invalidateReport();
    }
    if (target.dataset.recommenderQuestion) {
      record.recommendationAnswers[target.dataset.recommenderQuestion] = target.value;
      record.recommendations = { generatedAt: null, byGroup: {} };
      invalidateReport();
    }
    if (target.dataset.groupDecision) {
      record.groups[target.dataset.groupDecision].decision = target.value;
      invalidateReport();
    }
    if (target.dataset.groupRationale) {
      record.groups[target.dataset.groupRationale].rationale = target.value;
      invalidateReport();
    }
    if (target.dataset.controlId && target.dataset.controlField) {
      const field = target.dataset.controlField;
      record.controls[target.dataset.controlId][field] = target.type === 'checkbox' ? target.checked : target.value;
      invalidateReport();
    }
    if (target.dataset.gateField) {
      record.gate[target.dataset.gateField] = target.value;
      invalidateReport();
    }
    if (target.dataset.phaseId && target.dataset.phaseCheck) {
      record.phaseChecks[target.dataset.phaseId][target.dataset.phaseCheck] = target.checked;
      invalidateReport();
    }
    scheduleSave();
    renderChrome();
  }

  function recordStats() {
    const selected = selectedControlIds();
    const applicable = applicableControlIds();
    const controls = applicable.map(id => record.controls[id]);
    return {
      includedGroups: selectedGroups().length,
      selected: selected.length,
      applicable: applicable.length,
      pass: controls.filter(control => control.result === 'pass').length,
      fail: controls.filter(control => control.result === 'fail').length,
      blocked: controls.filter(control => control.result === 'blocked').length,
      pending: controls.filter(control => control.result === 'pending').length,
      closed: controls.filter(control => control.closure === 'closed').length,
      openOrConditional: controls.filter(control => ['open', 'conditional', 'waived'].includes(control.closure)).length
    };
  }

  function determineOutcome() {
    const workflow = workflowCompletion();
    const stats = recordStats();
    const gate = record.gate.gate_decision;
    if (gate === 'rejected' || gate === 'blocked' || stats.fail > 0 || stats.blocked > 0) {
      return { code: 'not-ready', label: 'Not ready for a positive decision', note: 'A rejected/blocked gate, failed control, or blocker remains visible in the record.' };
    }
    if (!workflow.steps.every(step => step.complete) || stats.pending > 0 || gate === 'pending') {
      return { code: 'incomplete', label: 'Incomplete checklist record', note: 'Mandatory project, control, execution, closure, or confirmation information is still open.' };
    }
    if (gate === 'conditional' || stats.openOrConditional > 0) {
      return { code: 'conditional', label: 'Conditional checklist conformity', note: 'The selected checklist is recorded with retained conditions, waivers, or open closure states.' };
    }
    return { code: 'conforming', label: 'Conforming to the selected Aerosafe checklist', note: 'All selected applicable controls are recorded for the identified baseline and the designated gate decision is accepted.' };
  }

  function reportKeyValue(label, value) {
    return `<div><dt>${escapeHtml(label)}</dt><dd>${display(value)}</dd></div>`;
  }

  function renderReportControl(id) {
    const item = itemMap.get(id);
    const control = record.controls[id];
    return `<article class="report-control-card"><header><div><strong>${escapeHtml(id)}</strong><span>${escapeHtml(parseStatus(item))}</span></div><div><span class="scope-decision scope-${escapeHtml(control.applicability)}">${escapeHtml(control.applicability)}</span><span class="result-badge result-${escapeHtml(control.result)}">${escapeHtml(resultLabel(control.result))}</span></div></header><p class="report-control-objective">${escapeHtml(item.objective)}</p><dl class="report-control-grid">
      ${reportKeyValue('Canonical source / status', item['source/status'])}
      ${reportKeyValue('Acceptance criterion', item['acceptance criterion'])}
      ${reportKeyValue('Applicability', control.applicability)}
      ${reportKeyValue('Owner', control.owner)}
      ${reportKeyValue('Gate', control.gate)}
      ${reportKeyValue('Closure authority', control.closureAuthority)}
      ${reportKeyValue('Planned evidence / record', control.plannedEvidence)}
      ${reportKeyValue('Tailoring / N.A. rationale', control.tailoringRationale)}
      ${reportKeyValue('Construction confirmed', control.configured ? 'Yes' : 'No')}
      ${reportKeyValue('Evidence reviewed / configuration IDs', control.evidenceRef)}
      ${reportKeyValue('Result', resultLabel(control.result))}
      ${reportKeyValue('Finding / decision / waiver', control.decisionFinding)}
      ${reportKeyValue('Canonical traceability targets', item.links)}
      ${reportKeyValue('Project traceability links', control.projectLinks)}
      ${reportKeyValue('Residuals / limitations', control.residuals)}
      ${reportKeyValue('Execution confirmed', control.executed ? 'Yes' : 'No')}
      ${reportKeyValue('Closure state', closureLabel(control.closure))}
      ${reportKeyValue('Closure note / authority reference', control.closureNote)}
      ${reportKeyValue('Closure reviewed', control.closureConfirmed ? 'Yes' : 'No')}
    </dl></article>`;
  }

  function renderReport() {
    const outcome = determineOutcome();
    const stats = recordStats();
    const workflow = workflowCompletion();
    const generated = record.report.generatedAt || new Date().toISOString();
    const projectFields = guided.project_fields.map(field => reportKeyValue(field.label, record.project[field.id])).join('');
    const answerRows = recommender.questions.map(question => {
      const option = question.options.find(candidate => candidate.value === record.recommendationAnswers[question.id]);
      return `<tr><td>${escapeHtml(question.label)}</td><td>${escapeHtml(option?.label || record.recommendationAnswers[question.id])}</td></tr>`;
    }).join('');
    const groupRows = groups.map(group => {
      const recommendation = groupRecommendation(group.id);
      const groupRecord = record.groups[group.id];
      return `<tr><td><span class="group-code inline">${escapeHtml(group.code)}</span></td><td><strong>${escapeHtml(group.group_name)}</strong><br><small>${escapeHtml(group.item_spec)}</small></td><td>${escapeHtml(recommendationLabel(recommendation?.level))}</td><td><span class="scope-decision scope-${escapeHtml(groupRecord.decision)}">${escapeHtml(groupRecord.decision)}</span></td><td>${display(groupRecord.rationale)}</td></tr>`;
    }).join('');
    const workflowRows = guided.steps.map((step, index) => {
      const status = workflow.steps[index];
      return `<tr><td>${escapeHtml(step.number)}</td><td><strong>${escapeHtml(step.title)}</strong></td><td>${status.percent}%</td><td>${status.complete ? 'Complete' : 'Incomplete'}</td><td>${status.issues.length ? escapeHtml(status.issues.slice(0, 4).join(' | ')) : 'No open completion issue'}</td></tr>`;
    }).join('');
    const controlGroups = selectedGroups().map(group => `<section class="report-control-group"><h3><span class="group-code inline">${escapeHtml(group.code)}</span> ${escapeHtml(group.group_name)}</h3>${group.ids.map(renderReportControl).join('')}</section>`).join('');
    const finalStep = guided.steps.find(step => step.id === 'conformity');

    $('#conformity-report-content').innerHTML = `<article class="report-paper">
      <header class="report-title-block"><div><p class="report-kicker">Aerosafe checklist-conformity record</p><h1>${escapeHtml(recordName())}</h1><p>${display(record.project.system_item, 'System or software item not recorded')}</p></div><div class="report-outcome outcome-${escapeHtml(outcome.code)}"><strong>${escapeHtml(outcome.label)}</strong><span>${escapeHtml(outcome.note)}</span></div></header>
      <div class="report-disclaimer"><strong>Scope of this output.</strong> This page records completion against the project-selected Aerosafe checklist for the identified configuration, ODD, and gate. It is not an ECSS certificate, a compliance decision, a qualification approval, or a substitute for the designated project/customer authority.</div>
      <section><h2>Record identity and project context</h2><dl class="report-definition-grid">${projectFields}${reportKeyValue('Generated at', formatDateTime(generated))}${reportKeyValue('Companion edition', data.metadata.version)}</dl></section>
      <section><h2>Conformity summary</h2><div class="report-summary-grid"><div><strong>${workflow.percent}%</strong><span>workflow recorded</span></div><div><strong>${stats.includedGroups}</strong><span>groups included</span></div><div><strong>${stats.selected}</strong><span>controls selected</span></div><div><strong>${stats.applicable}</strong><span>applicable / conditional</span></div><div><strong>${stats.pass}</strong><span>passed</span></div><div><strong>${stats.fail + stats.blocked}</strong><span>failed / blocked</span></div><div><strong>${stats.closed}</strong><span>closed</span></div><div><strong>${stats.openOrConditional}</strong><span>open / conditional</span></div></div></section>
      <section><h2>Recommender answers</h2><div class="report-table-shell"><table><thead><tr><th>Project characteristic</th><th>Recorded answer</th></tr></thead><tbody>${answerRows}</tbody></table></div></section>
      <section><h2>Named checklist-group tailoring decisions</h2><div class="report-table-shell"><table><thead><tr><th>Code</th><th>Checklist group</th><th>Transparent suggestion</th><th>Project decision</th><th>Rationale / override</th></tr></thead><tbody>${groupRows}</tbody></table></div></section>
      <section><h2>Workflow completion</h2><div class="report-table-shell"><table><thead><tr><th>Stage</th><th>Record</th><th>Progress</th><th>Status</th><th>Open completion information</th></tr></thead><tbody>${workflowRows}</tbody></table></div></section>
      <section><h2>Gate and authority decision</h2><dl class="report-definition-grid">${guided.gate_fields.map(field => reportKeyValue(field.label, field.type === 'select' ? (field.options.find(option => option.value === record.gate[field.id])?.label || record.gate[field.id]) : record.gate[field.id])).join('')}</dl></section>
      <section><h2>Item-level construction, execution, and closure record</h2>${controlGroups || '<p>No checklist controls were selected.</p>'}</section>
      <section class="report-final-confirmations"><h2>Final confirmations</h2><p>These checks remain part of the controlled record and do not override open findings or authority decisions.</p>${renderPhaseChecks(finalStep, true)}</section>
      <footer class="report-footer"><div><strong>Prepared by</strong><span>${display(record.project.prepared_by)}</span></div><div><strong>Decision authority</strong><span>${display(record.gate.decision_authority)}</span></div><div><strong>Record / decision date</strong><span>${display(record.gate.decision_date || record.project.record_date)}</span></div></footer>
    </article>`;
  }

  function generateReport() {
    record.report.generatedAt = new Date().toISOString();
    saveRecord();
    renderReport();
    const section = $('#conformity-report');
    section.hidden = false;
    history.replaceState(null, '', '#conformity-report');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    renderChrome();
  }

  function downloadJson(finalRecord) {
    const payload = {
      exportType: finalRecord ? 'Aerosafe checklist-conformity record' : 'Aerosafe guided draft',
      exportedAt: new Date().toISOString(),
      frameworkVersion: data.metadata.version,
      disclaimer: data.metadata.disclaimer,
      record
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    const base = normalize(record.project.record_id || 'aerosafe-record').replace(/[^a-z0-9_-]+/gi, '-').replace(/^-|-$/g, '') || 'aerosafe-record';
    anchor.href = url;
    anchor.download = `${base}${finalRecord ? '-conformity' : '-draft'}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  function bindEvents() {
    $('#guided-panel').addEventListener('input', event => handleInput(event.target));
    $('#guided-panel').addEventListener('change', event => {
      const target = event.target;
      handleInput(target);
      if (target.matches('select, input[type="checkbox"]')) renderPanel();
    });
    $('#guided-panel').addEventListener('click', event => {
      const generate = event.target.closest('[data-generate-recommendations]');
      if (generate) {
        evaluateRecommendations();
        saveRecord({ announce: false });
        renderGuided();
        return;
      }
      const apply = event.target.closest('[data-apply-recommendations]');
      if (apply) {
        applyRecommendations();
        saveRecord({ announce: false });
        renderGuided();
        return;
      }
      const clear = event.target.closest('[data-clear-decisions]');
      if (clear) {
        groups.forEach(group => { record.groups[group.id] = { decision: 'pending', rationale: '' }; });
        invalidateReport();
        saveRecord({ announce: false });
        renderGuided();
        return;
      }
      if (event.target.closest('[data-generate-report]')) generateReport();
    });

    $('#guided-stepper').addEventListener('click', event => {
      const button = event.target.closest('[data-guided-step]');
      if (!button) return;
      record.currentStep = Number(button.dataset.guidedStep);
      saveRecord({ announce: false });
      renderGuided();
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    $('#guided-back').addEventListener('click', () => {
      if (record.currentStep > 0) record.currentStep -= 1;
      saveRecord({ announce: false });
      renderGuided();
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    $('#guided-next').addEventListener('click', () => {
      if (record.currentStep < guided.steps.length - 1) {
        record.currentStep += 1;
        saveRecord({ announce: false });
        renderGuided();
        root.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else generateReport();
    });

    $('#guided-save').addEventListener('click', () => saveRecord());
    $('#guided-export-draft').addEventListener('click', () => downloadJson(false));
    $('#guided-reset').addEventListener('click', () => {
      if (!window.confirm('Reset the complete Aerosafe record stored in this browser? Export a copy first if it must be retained.')) return;
      record = createDefaultRecord();
      try { localStorage.removeItem(storageKey); } catch (error) { console.warn(error); }
      $('#conformity-report').hidden = true;
      $('#guided-save-status').textContent = 'Record reset; not yet saved';
      renderGuided();
    });

    $('#report-back').addEventListener('click', () => {
      $('#conformity-report').hidden = true;
      history.replaceState(null, '', '#guided-use');
      $('#guided-use').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    $('#report-export').addEventListener('click', () => downloadJson(true));
    $('#report-print').addEventListener('click', () => {
      document.body.classList.add('report-print-mode');
      window.print();
      document.body.classList.remove('report-print-mode');
    });
    $('#conformity-report-content').addEventListener('change', event => {
      if (!event.target.dataset.phaseCheck) return;
      handleInput(event.target);
      saveRecord({ announce: false });
      renderReport();
    });
  }

  function openStage(stageIdOrIndex) {
    const index = typeof stageIdOrIndex === 'number'
      ? stageIdOrIndex
      : guided.steps.findIndex(step => step.id === stageIdOrIndex);
    if (index < 0 || index >= guided.steps.length) return false;
    record.currentStep = index;
    saveRecord({ announce: false });
    renderGuided();
    history.replaceState(null, '', '#guided-use');
    requestAnimationFrame(() => root.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    return true;
  }

  window.AEROSAFE_GUIDED = { openStage };
  renderGuided();
  bindEvents();
  if (record.updatedAt) $('#guided-save-status').textContent = `Restored local record saved ${new Date(record.updatedAt).toLocaleString()}`;
})();
