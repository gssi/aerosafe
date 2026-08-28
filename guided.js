(() => {
  'use strict';

  const data = window.AEROSAFE_DATA;
  const root = document.getElementById('guided-app');
  if (!data || !data.guided_use || !root) return;

  const guided = data.guided_use;
  const storageKey = guided.storage_key || 'aerosafe-guided-record';
  const RECORD_VERSION = 1;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const escapeHtml = (value) => String(value ?? '')
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
  const isBlank = (value) => !String(value ?? '').trim();
  const today = () => {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
  };

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
    const match = String(item['source/status']).match(/Status:\s*(.*?)(?:\.|$)/i);
    return match ? match[1].trim() : 'Unspecified';
  }

  function statusCategory(status) {
    const value = String(status || '').trim();
    if (value.startsWith('M all')) return 'M all';
    if (value.startsWith('M')) return 'M';
    if (value.startsWith('C')) return 'C';
    if (value.startsWith('N.A.')) return 'N.A.';
    return 'Unspecified';
  }

  function statusClass(status) {
    const value = statusCategory(status);
    if (value === 'M all') return 'm-all';
    if (value === 'M') return 'm';
    if (value === 'C') return 'c';
    if (value === 'N.A.') return 'na';
    return '';
  }

  const tablesByKey = new Map(data.appendix_tables.map(table => [table.key, table]));
  const itemsById = new Map();
  data.appendix_tables.forEach(table => table.items.forEach(item => {
    itemsById.set(item.id, { item, table });
  }));

  const areaControlIds = new Map();
  const controlArea = new Map();
  data.table7.forEach(row => {
    const ids = row.refs.flatMap(ref => expandItemSpec(ref.items));
    areaControlIds.set(row.id, ids);
    ids.forEach(id => controlArea.set(id, row));
  });

  function defaultApplicability(item) {
    const category = statusCategory(itemStatus(item));
    if (category === 'M' || category === 'M all') return 'applicable';
    if (category === 'N.A.') return 'na';
    return 'pending';
  }

  function createDefaultRecord() {
    const project = Object.fromEntries(guided.project_fields.map(field => [field.id, '']));
    project.record_date = today();

    const phaseChecks = {};
    guided.steps.forEach(step => {
      phaseChecks[step.id] = Object.fromEntries(step.checks.map(check => [check.id, false]));
    });

    const areas = Object.fromEntries(data.table7.map(row => [row.id, {
      decision: 'pending',
      rationale: ''
    }]));

    const controls = {};
    itemsById.forEach(({ item }) => {
      controls[item.id] = {
        applicability: defaultApplicability(item),
        owner: item.owner,
        gate: item.gate,
        closureAuthority: item['closure authority'],
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
    });

    const gate = Object.fromEntries(guided.gate_fields.map(field => [
      field.id,
      field.type === 'select' ? (field.options?.[0]?.value || '') : ''
    ]));

    return {
      schemaVersion: RECORD_VERSION,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      currentStep: 0,
      project,
      phaseChecks,
      areas,
      controls,
      gate,
      report: { generatedAt: null }
    };
  }

  function hydrateRecord(saved) {
    const fresh = createDefaultRecord();
    if (!saved || typeof saved !== 'object') return fresh;
    return {
      ...fresh,
      ...saved,
      currentStep: Math.max(0, Math.min(guided.steps.length - 1, Number(saved.currentStep) || 0)),
      project: { ...fresh.project, ...(saved.project || {}) },
      phaseChecks: Object.fromEntries(guided.steps.map(step => [
        step.id,
        { ...fresh.phaseChecks[step.id], ...((saved.phaseChecks || {})[step.id] || {}) }
      ])),
      areas: Object.fromEntries(data.table7.map(row => [
        row.id,
        { ...fresh.areas[row.id], ...((saved.areas || {})[row.id] || {}) }
      ])),
      controls: Object.fromEntries([...itemsById.keys()].map(id => [
        id,
        { ...fresh.controls[id], ...((saved.controls || {})[id] || {}) }
      ])),
      gate: { ...fresh.gate, ...(saved.gate || {}) },
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

  function selectedAreas() {
    return data.table7.filter(row => record.areas[row.id].decision === 'included');
  }

  function selectedControlIds() {
    const ids = new Set();
    selectedAreas().forEach(row => areaControlIds.get(row.id).forEach(id => ids.add(id)));
    return [...ids];
  }

  function applicableControlIds() {
    return selectedControlIds().filter(id => {
      const value = record.controls[id].applicability;
      return value === 'applicable' || value === 'conditional';
    });
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
    const add = (condition, issue = '') => {
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
      data.table7.forEach(row => {
        const decision = record.areas[row.id].decision;
        add(decision !== 'pending', `Decide whether “${row.area}” is included or excluded.`);
        if (decision === 'excluded') {
          add(!isBlank(record.areas[row.id].rationale), `Add a rationale for excluding “${row.area}”.`);
        }
      });
      add(selectedAreas().length > 0, 'Include at least one Table 7 assurance area.');
    }

    if (step.id === 'configure') {
      const ids = selectedControlIds();
      add(ids.length > 0, 'Select at least one assurance area before configuring controls.');
      ids.forEach(id => {
        const control = record.controls[id];
        add(control.applicability !== 'pending', `${id}: decide applicability.`);
        if (control.applicability === 'na') {
          add(!isBlank(control.tailoringRationale), `${id}: justify N.A.`);
          add(control.configured, `${id}: confirm the N.A. configuration record.`);
        } else if (control.applicability === 'applicable' || control.applicability === 'conditional') {
          add(!isBlank(control.owner), `${id}: owner is required.`);
          add(!isBlank(control.gate), `${id}: gate is required.`);
          add(!isBlank(control.closureAuthority), `${id}: closure authority is required.`);
          add(!isBlank(control.plannedEvidence), `${id}: planned evidence or record reference is required.`);
          add(control.configured, `${id}: confirm the construction record.`);
        }
      });
    }

    if (step.id === 'execute') {
      const ids = applicableControlIds();
      add(ids.length > 0, 'No applicable controls are available for execution.');
      ids.forEach(id => {
        const control = record.controls[id];
        add(control.result !== 'pending', `${id}: record an execution result.`);
        if (control.result === 'pass') {
          add(!isBlank(control.evidenceRef), `${id}: a pass requires a controlled evidence reference.`);
        }
        if (control.result === 'fail' || control.result === 'blocked') {
          add(!isBlank(control.decisionFinding), `${id}: record the finding or blocking decision.`);
          add(!isBlank(control.residuals), `${id}: record the resulting residual or limitation.`);
        }
        add(control.executed, `${id}: confirm that the execution record is complete.`);
      });
    }

    if (step.id === 'closure') {
      guided.gate_fields.filter(field => field.required).forEach(field => {
        const value = record.gate[field.id];
        add(!isBlank(value) && value !== 'pending', `${field.label} is required.`);
      });
      applicableControlIds().forEach(id => {
        const control = record.controls[id];
        add(control.closureConfirmed, `${id}: review and confirm the closure status.`);
        if (['open', 'conditional', 'waived', 'rejected'].includes(control.closure)) {
          add(!isBlank(control.closureNote), `${id}: explain the ${control.closure} closure state.`);
        }
      });
    }

    if (step.id === 'conformity') {
      add(Boolean(record.report.generatedAt), 'Generate the conformity page.');
    }

    const checkScore = phaseCheckScore(step);
    done += checkScore.done;
    total += checkScore.total;
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
    record.currentStep = Number(record.currentStep) || 0;
    try {
      localStorage.setItem(storageKey, JSON.stringify(record));
      if (announce) {
        $('#guided-save-status').textContent = `Saved locally ${new Date(record.updatedAt).toLocaleString()}`;
      }
    } catch (error) {
      $('#guided-save-status').textContent = 'Local save unavailable; export the record instead.';
      console.warn('Aerosafe guided record could not be saved.', error);
    }
  }

  function scheduleSave() {
    clearTimeout(autoSaveTimer);
    $('#guided-save-status').textContent = 'Saving locally…';
    autoSaveTimer = setTimeout(() => saveRecord(), 350);
  }

  function recordName() {
    return record.project.project_name || record.project.record_id || 'Untitled record';
  }

  function renderField(definition, value, dataAttribute) {
    const required = definition.required ? ' <span aria-hidden="true">*</span>' : '';
    const common = `${dataAttribute} aria-label="${escapeHtml(definition.label)}"`;
    let input = '';
    if (definition.type === 'textarea') {
      input = `<textarea ${common} rows="3" placeholder="${escapeHtml(definition.placeholder || '')}">${escapeHtml(value)}</textarea>`;
    } else if (definition.type === 'select') {
      input = `<select ${common}>${definition.options.map(option => `<option value="${escapeHtml(option.value)}"${option.value === value ? ' selected' : ''}>${escapeHtml(option.label)}</option>`).join('')}</select>`;
    } else {
      input = `<input ${common} type="${escapeHtml(definition.type || 'text')}" value="${escapeHtml(value)}" placeholder="${escapeHtml(definition.placeholder || '')}">`;
    }
    return `<label class="guided-field ${definition.type === 'textarea' ? 'field-wide' : ''}"><span>${escapeHtml(definition.label)}${required}</span>${input}</label>`;
  }

  function renderPhaseChecks(step, { reportMode = false } = {}) {
    return `<fieldset class="phase-checks${reportMode ? ' report-phase-checks' : ''}"><legend>Phase completion checks</legend>${step.checks.map(check => `
      <label><input type="checkbox" data-phase-check="${escapeHtml(check.id)}" data-phase-id="${escapeHtml(step.id)}"${record.phaseChecks[step.id][check.id] ? ' checked' : ''}> <span>${escapeHtml(check.label)}</span></label>`).join('')}</fieldset>`;
  }

  function stepHeader(step, index) {
    const completion = completionForStep(index);
    return `<div class="guided-step-heading">
      <div><p class="eyebrow">Step ${escapeHtml(step.number)} of ${guided.steps.length}</p><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.user_action)}</p></div>
      <div class="step-completion ${completion.complete ? 'complete' : ''}"><strong>${completion.percent}%</strong><span>${completion.complete ? 'complete' : 'recorded'}</span></div>
    </div>`;
  }

  function renderContextStep(step, index) {
    return `${stepHeader(step, index)}
      <div class="guided-help"><strong>Record to complete:</strong> ${escapeHtml(step.record)}<br><strong>Completion criterion:</strong> ${escapeHtml(step.completion)}</div>
      <div class="guided-field-grid">${guided.project_fields.map(field => renderField(field, record.project[field.id], `data-project-field="${escapeHtml(field.id)}"`)).join('')}</div>
      ${renderPhaseChecks(step)}`;
  }

  function renderScopeStep(step, index) {
    const included = selectedAreas().length;
    const decided = data.table7.filter(row => record.areas[row.id].decision !== 'pending').length;
    return `${stepHeader(step, index)}
      <div class="guided-help"><strong>Record to complete:</strong> ${escapeHtml(step.record)}<br><strong>Completion criterion:</strong> ${escapeHtml(step.completion)}</div>
      <div class="scope-toolbar"><div><strong>${decided}/${data.table7.length}</strong> areas decided · <strong>${included}</strong> included</div><div><button class="button small secondary" type="button" data-bulk-area="included">Use full baseline</button><button class="button small secondary" type="button" data-bulk-area="pending">Clear decisions</button></div></div>
      <div class="area-scope-grid">${data.table7.map(row => {
        const area = record.areas[row.id];
        const count = areaControlIds.get(row.id).length;
        const refs = row.refs.map(ref => `<button type="button" class="ref-chip" data-open-map="${escapeHtml(ref.key)}" data-item-spec="${escapeHtml(ref.items)}">${escapeHtml(ref.table)} · ${escapeHtml(ref.items)}</button>`).join('');
        return `<article class="area-scope-card ${escapeHtml(area.decision)}">
          <div class="area-card-head"><div><span class="mini-label">${count} control${count === 1 ? '' : 's'}</span><h4>${escapeHtml(row.area)}</h4></div><label><span>Scope decision</span><select data-area-decision="${escapeHtml(row.id)}"><option value="pending"${area.decision === 'pending' ? ' selected' : ''}>Pending</option><option value="included"${area.decision === 'included' ? ' selected' : ''}>Included</option><option value="excluded"${area.decision === 'excluded' ? ' selected' : ''}>Excluded</option></select></label></div>
          <p>${escapeHtml(row.scope)}</p><div class="ref-group">${refs}</div>
          <label class="guided-field field-wide"><span>Decision / tailoring rationale${area.decision === 'excluded' ? ' *' : ''}</span><textarea rows="2" data-area-rationale="${escapeHtml(row.id)}" placeholder="Explain inclusion, exclusion, substitutions, or project-specific activation.">${escapeHtml(area.rationale)}</textarea></label>
        </article>`;
      }).join('')}</div>
      ${renderPhaseChecks(step)}`;
  }

  function controlStatusBadge(item) {
    const status = itemStatus(item);
    return `<span class="status-badge ${statusClass(status)}">${escapeHtml(status)}</span>`;
  }

  function areaGroups(ids) {
    return data.table7.map(row => ({ row, ids: areaControlIds.get(row.id).filter(id => ids.includes(id)) })).filter(group => group.ids.length);
  }

  function renderConfigureStep(step, index) {
    const ids = selectedControlIds();
    if (!ids.length) {
      return `${stepHeader(step, index)}<div class="guided-empty"><h4>No controls selected</h4><p>Return to Step 2 and include at least one Table 7 assurance area.</p></div>${renderPhaseChecks(step)}`;
    }
    return `${stepHeader(step, index)}
      <div class="guided-help"><strong>Record to complete:</strong> ${escapeHtml(step.record)}<br><strong>Completion criterion:</strong> ${escapeHtml(step.completion)}</div>
      <div class="control-groups">${areaGroups(ids).map(group => {
        const configured = group.ids.filter(id => record.controls[id].configured).length;
        return `<details class="control-group"${group.row.id === selectedAreas()[0]?.id ? ' open' : ''}><summary><span><strong>${escapeHtml(group.row.area)}</strong><small>${configured}/${group.ids.length} configuration records confirmed</small></span><span>${group.ids.length}</span></summary><div class="control-group-body">${group.ids.map(id => {
          const { item, table } = itemsById.get(id);
          const control = record.controls[id];
          return `<details class="guided-control-card"><summary><span class="control-summary-main"><strong>${escapeHtml(id)}</strong>${controlStatusBadge(item)}<span>${escapeHtml(item.objective)}</span></span><span class="control-state ${control.configured ? 'done' : ''}">${control.configured ? 'Configured' : 'Open'}</span></summary>
            <div class="guided-control-body">
              <div class="canonical-record"><div><strong>Online source</strong><button class="item-link" type="button" data-open-item="${escapeHtml(id)}">Table ${escapeHtml(table.number)} · ${escapeHtml(id)}</button></div><div><strong>Canonical evidence</strong><span>${escapeHtml(item.evidence)}</span></div><div><strong>Acceptance criterion</strong><span>${escapeHtml(item['acceptance criterion'])}</span></div><div><strong>Canonical links / residuals</strong><span>${escapeHtml(item.links)} · ${escapeHtml(item.residuals)}</span></div></div>
              <div class="guided-field-grid compact-grid">
                <label class="guided-field"><span>Applicability *</span><select data-control-id="${escapeHtml(id)}" data-control-field="applicability"><option value="pending"${control.applicability === 'pending' ? ' selected' : ''}>Pending</option><option value="applicable"${control.applicability === 'applicable' ? ' selected' : ''}>Applicable</option><option value="conditional"${control.applicability === 'conditional' ? ' selected' : ''}>Conditional - activated</option><option value="na"${control.applicability === 'na' ? ' selected' : ''}>N.A. - justified</option></select></label>
                <label class="guided-field"><span>Owner *</span><input type="text" data-control-id="${escapeHtml(id)}" data-control-field="owner" value="${escapeHtml(control.owner)}"></label>
                <label class="guided-field"><span>Gate *</span><input type="text" data-control-id="${escapeHtml(id)}" data-control-field="gate" value="${escapeHtml(control.gate)}"></label>
                <label class="guided-field"><span>Closure authority *</span><input type="text" data-control-id="${escapeHtml(id)}" data-control-field="closureAuthority" value="${escapeHtml(control.closureAuthority)}"></label>
                <label class="guided-field field-wide"><span>Planned evidence / project record reference *</span><textarea rows="2" data-control-id="${escapeHtml(id)}" data-control-field="plannedEvidence" placeholder="Controlled document, test, dataset, model, tool, claim, or record identifier.">${escapeHtml(control.plannedEvidence)}</textarea></label>
                <label class="guided-field field-wide"><span>Tailoring, substitution, or N.A. rationale</span><textarea rows="2" data-control-id="${escapeHtml(id)}" data-control-field="tailoringRationale" placeholder="Required for N.A.; also record conditional activation or substitutions.">${escapeHtml(control.tailoringRationale)}</textarea></label>
              </div>
              <label class="record-confirm"><input type="checkbox" data-control-id="${escapeHtml(id)}" data-control-field="configured"${control.configured ? ' checked' : ''}> <span>I confirm that this control's construction/configuration record is complete and baselined before execution.</span></label>
            </div>
          </details>`;
        }).join('')}</div></details>`;
      }).join('')}</div>
      ${renderPhaseChecks(step)}`;
  }

  function resultLabel(value) {
    return ({ pending: 'Pending', pass: 'Pass', fail: 'Fail', blocked: 'Blocked' })[value] || value;
  }

  function closureLabel(value) {
    return ({ open: 'Open', closed: 'Closed', conditional: 'Conditionally closed', waived: 'Waived', rejected: 'Rejected' })[value] || value;
  }

  function renderExecuteStep(step, index) {
    const ids = applicableControlIds();
    if (!ids.length) {
      return `${stepHeader(step, index)}<div class="guided-empty"><h4>No applicable controls</h4><p>Return to Step 3 and complete the applicability decisions for selected controls.</p></div>${renderPhaseChecks(step)}`;
    }
    return `${stepHeader(step, index)}
      <div class="guided-help"><strong>Record to complete:</strong> ${escapeHtml(step.record)}<br><strong>Completion criterion:</strong> ${escapeHtml(step.completion)}</div>
      <div class="control-groups execution-groups">${areaGroups(ids).map(group => {
        const complete = group.ids.filter(id => record.controls[id].executed).length;
        return `<details class="control-group"${group.row.id === selectedAreas()[0]?.id ? ' open' : ''}><summary><span><strong>${escapeHtml(group.row.area)}</strong><small>${complete}/${group.ids.length} execution records confirmed</small></span><span>${group.ids.length}</span></summary><div class="control-group-body">${group.ids.map(id => {
          const { item, table } = itemsById.get(id);
          const control = record.controls[id];
          return `<details class="guided-control-card"><summary><span class="control-summary-main"><strong>${escapeHtml(id)}</strong><span class="result-badge result-${escapeHtml(control.result)}">${escapeHtml(resultLabel(control.result))}</span><span>${escapeHtml(item.objective)}</span></span><span class="control-state ${control.executed ? 'done' : ''}">${control.executed ? 'Recorded' : 'Open'}</span></summary>
            <div class="guided-control-body">
              <div class="canonical-record"><div><strong>Configured plan</strong><span>${escapeHtml(control.plannedEvidence || 'No planned evidence recorded.')}</span></div><div><strong>Criterion</strong><span>${escapeHtml(item['acceptance criterion'])}</span></div><div><strong>Gate / authority</strong><span>${escapeHtml(control.gate)} · ${escapeHtml(control.closureAuthority)}</span></div><div><strong>Online source</strong><button class="item-link" type="button" data-open-item="${escapeHtml(id)}">Table ${escapeHtml(table.number)} · ${escapeHtml(id)}</button></div></div>
              <div class="guided-field-grid compact-grid">
                <label class="guided-field"><span>Execution result *</span><select data-control-id="${escapeHtml(id)}" data-control-field="result"><option value="pending"${control.result === 'pending' ? ' selected' : ''}>Pending</option><option value="pass"${control.result === 'pass' ? ' selected' : ''}>Pass</option><option value="fail"${control.result === 'fail' ? ' selected' : ''}>Fail</option><option value="blocked"${control.result === 'blocked' ? ' selected' : ''}>Blocked</option></select></label>
                <label class="guided-field field-wide"><span>Evidence reviewed / result reference *</span><textarea rows="2" data-control-id="${escapeHtml(id)}" data-control-field="evidenceRef" placeholder="Configuration IDs, document/test/result references, dates, versions and reviewers.">${escapeHtml(control.evidenceRef)}</textarea></label>
                <label class="guided-field field-wide"><span>Decision, finding, NCR, or waiver</span><textarea rows="2" data-control-id="${escapeHtml(id)}" data-control-field="decisionFinding" placeholder="Record pass rationale or the finding/blocking decision and owner.">${escapeHtml(control.decisionFinding)}</textarea></label>
                <label class="guided-field field-wide"><span>Project traceability links</span><textarea rows="2" data-control-id="${escapeHtml(id)}" data-control-field="projectLinks" placeholder="Hazards, requirements, claims, configurations, tests, findings and gate records.">${escapeHtml(control.projectLinks)}</textarea></label>
                <label class="guided-field field-wide"><span>Residuals / limitations</span><textarea rows="2" data-control-id="${escapeHtml(id)}" data-control-field="residuals" placeholder="Uncertainty, exclusions, open actions, operating restrictions and evidence limits.">${escapeHtml(control.residuals)}</textarea></label>
              </div>
              <label class="record-confirm"><input type="checkbox" data-control-id="${escapeHtml(id)}" data-control-field="executed"${control.executed ? ' checked' : ''}> <span>I confirm that the execution record reflects the evidence actually reviewed; missing evidence has not been recorded as a pass.</span></label>
            </div>
          </details>`;
        }).join('')}</div></details>`;
      }).join('')}</div>
      ${renderPhaseChecks(step)}`;
  }

  function renderClosureStep(step, index) {
    const ids = applicableControlIds();
    return `${stepHeader(step, index)}
      <div class="guided-help"><strong>Record to complete:</strong> ${escapeHtml(step.record)}<br><strong>Completion criterion:</strong> ${escapeHtml(step.completion)}</div>
      <h4 class="guided-subheading">Gate decision record</h4>
      <div class="guided-field-grid">${guided.gate_fields.map(field => renderField(field, record.gate[field.id], `data-gate-field="${escapeHtml(field.id)}"`)).join('')}</div>
      <h4 class="guided-subheading">Item-level closure review</h4>
      ${ids.length ? `<div class="closure-grid">${ids.map(id => {
        const { item, table } = itemsById.get(id);
        const control = record.controls[id];
        return `<article class="closure-card"><div class="closure-card-head"><div><strong>${escapeHtml(id)}</strong><span>${escapeHtml(item.objective)}</span></div><span class="result-badge result-${escapeHtml(control.result)}">${escapeHtml(resultLabel(control.result))}</span></div>
          <div class="closure-meta"><span>${escapeHtml(control.gate)}</span><span>${escapeHtml(control.closureAuthority)}</span><button class="item-link" type="button" data-open-item="${escapeHtml(id)}">Table ${escapeHtml(table.number)}</button></div>
          <label class="guided-field"><span>Closure state *</span><select data-control-id="${escapeHtml(id)}" data-control-field="closure"><option value="open"${control.closure === 'open' ? ' selected' : ''}>Open</option><option value="closed"${control.closure === 'closed' ? ' selected' : ''}>Closed</option><option value="conditional"${control.closure === 'conditional' ? ' selected' : ''}>Conditionally closed</option><option value="waived"${control.closure === 'waived' ? ' selected' : ''}>Waived</option><option value="rejected"${control.closure === 'rejected' ? ' selected' : ''}>Rejected</option></select></label>
          <label class="guided-field"><span>Closure note / authority reference</span><textarea rows="2" data-control-id="${escapeHtml(id)}" data-control-field="closureNote" placeholder="Authority, date, finding/waiver reference, conditions, owner and due gate.">${escapeHtml(control.closureNote)}</textarea></label>
          <label class="record-confirm compact-confirm"><input type="checkbox" data-control-id="${escapeHtml(id)}" data-control-field="closureConfirmed"${control.closureConfirmed ? ' checked' : ''}> <span>Closure status reviewed</span></label>
        </article>`;
      }).join('')}</div>` : '<div class="guided-empty"><p>No applicable controls are available for closure review.</p></div>'}
      ${renderPhaseChecks(step)}`;
  }

  function renderConformityStep(step, index) {
    const workflow = workflowCompletion();
    const priorIssues = workflow.steps.slice(0, 5).flatMap((status, stepIndex) => status.issues.slice(0, 4).map(issue => `Step ${stepIndex + 1}: ${issue}`));
    const stats = recordStats();
    return `${stepHeader(step, index)}
      <div class="guided-help"><strong>Record to complete:</strong> ${escapeHtml(step.record)}<br><strong>Completion criterion:</strong> ${escapeHtml(step.completion)}</div>
      <div class="preflight-grid"><article><strong>${workflow.percent}%</strong><span>workflow recorded</span></article><article><strong>${stats.includedAreas}</strong><span>areas included</span></article><article><strong>${stats.applicable}</strong><span>applicable controls</span></article><article><strong>${stats.openOrConditional}</strong><span>open / conditional closures</span></article></div>
      <div class="preflight-box ${priorIssues.length ? 'has-issues' : 'ready'}"><h4>${priorIssues.length ? 'Items still requiring attention' : 'Record ready for final generation'}</h4>${priorIssues.length ? `<ul>${priorIssues.slice(0, 18).map(issue => `<li>${escapeHtml(issue)}</li>`).join('')}</ul>${priorIssues.length > 18 ? `<p>Plus ${priorIssues.length - 18} additional item-level issue(s). The generated page will retain the incomplete status.</p>` : ''}` : '<p>The first five workflow phases are complete. Generate the conformity page, review its contents, and confirm the final checks on that page.</p>'}</div>
      ${renderPhaseChecks(step)}
      <p class="guided-final-note">Selecting <strong>Generate conformity page</strong> creates a complete project summary even when the record is incomplete, failed, blocked, waived, or conditional. The status shown is checklist-specific and is never presented as an ECSS certificate.</p>`;
  }

  function renderPanel() {
    const step = guided.steps[record.currentStep];
    let html = '';
    if (step.id === 'context') html = renderContextStep(step, record.currentStep);
    if (step.id === 'scope') html = renderScopeStep(step, record.currentStep);
    if (step.id === 'configure') html = renderConfigureStep(step, record.currentStep);
    if (step.id === 'execute') html = renderExecuteStep(step, record.currentStep);
    if (step.id === 'closure') html = renderClosureStep(step, record.currentStep);
    if (step.id === 'conformity') html = renderConformityStep(step, record.currentStep);
    $('#guided-panel').innerHTML = html;
  }

  function renderStepper() {
    const workflow = workflowCompletion();
    $('#guided-stepper').innerHTML = guided.steps.map((step, index) => {
      const status = workflow.steps[index];
      const active = index === record.currentStep;
      return `<li><button type="button" data-guided-step="${index}" class="${active ? 'active' : ''} ${status.complete ? 'complete' : ''}" aria-current="${active ? 'step' : 'false'}"><span>${escapeHtml(step.number)}</span><span><strong>${escapeHtml(step.title)}</strong><small>${status.percent}% recorded</small></span></button></li>`;
    }).join('');
  }

  function renderChrome() {
    const workflow = workflowCompletion();
    const step = guided.steps[record.currentStep];
    $('#guided-record-name').textContent = recordName();
    $('#guided-progress-label').textContent = `Step ${step.number} of ${guided.steps.length} · ${step.title}`;
    $('#guided-progress-percent').textContent = `${workflow.percent}%`;
    $('#guided-progress-bar').style.width = `${workflow.percent}%`;
    $('#guided-back').disabled = record.currentStep === 0;
    $('#guided-next').textContent = record.currentStep === guided.steps.length - 1 ? 'Generate conformity page' : 'Next step';
    renderStepper();
  }

  function renderGuided() {
    renderPanel();
    renderChrome();
  }

  function handleInput(target) {
    if (target.dataset.projectField) {
      record.project[target.dataset.projectField] = target.value;
    } else if (target.dataset.phaseCheck) {
      record.phaseChecks[target.dataset.phaseId][target.dataset.phaseCheck] = target.checked;
    } else if (target.dataset.areaDecision) {
      record.areas[target.dataset.areaDecision].decision = target.value;
    } else if (target.dataset.areaRationale) {
      record.areas[target.dataset.areaRationale].rationale = target.value;
    } else if (target.dataset.controlId && target.dataset.controlField) {
      const field = target.dataset.controlField;
      record.controls[target.dataset.controlId][field] = target.type === 'checkbox' ? target.checked : target.value;
    } else if (target.dataset.gateField) {
      record.gate[target.dataset.gateField] = target.value;
    } else {
      return;
    }
    scheduleSave();
    renderChrome();
  }

  function setAllAreas(value) {
    data.table7.forEach(row => {
      record.areas[row.id].decision = value;
      if (value === 'pending') record.areas[row.id].rationale = '';
    });
    scheduleSave();
    renderGuided();
  }

  function sanitizeFileName(value) {
    return String(value || 'aerosafe-record').trim().toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '') || 'aerosafe-record';
  }

  function downloadJson(includeDerived = true) {
    const payload = {
      format: 'Aerosafe guided checklist record',
      exportedAt: new Date().toISOString(),
      companionVersion: data.metadata.version,
      record,
      ...(includeDerived ? { derived: { outcome: determineOutcome(), statistics: recordStats(), workflow: workflowCompletion() } } : {})
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sanitizeFileName(record.project.record_id || record.project.project_name)}-aerosafe-record.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function recordStats() {
    const selectedIds = selectedControlIds();
    const applicableIds = applicableControlIds();
    const selectedControls = selectedIds.map(id => record.controls[id]);
    const applicableControls = applicableIds.map(id => record.controls[id]);
    return {
      includedAreas: selectedAreas().length,
      excludedAreas: data.table7.filter(row => record.areas[row.id].decision === 'excluded').length,
      pendingAreas: data.table7.filter(row => record.areas[row.id].decision === 'pending').length,
      selected: selectedIds.length,
      applicable: applicableIds.length,
      na: selectedControls.filter(control => control.applicability === 'na').length,
      pendingApplicability: selectedControls.filter(control => control.applicability === 'pending').length,
      pass: applicableControls.filter(control => control.result === 'pass').length,
      fail: applicableControls.filter(control => control.result === 'fail').length,
      blocked: applicableControls.filter(control => control.result === 'blocked').length,
      pendingResults: applicableControls.filter(control => control.result === 'pending').length,
      closed: applicableControls.filter(control => control.closure === 'closed').length,
      openOrConditional: applicableControls.filter(control => ['open', 'conditional', 'waived'].includes(control.closure)).length,
      rejectedClosure: applicableControls.filter(control => control.closure === 'rejected').length
    };
  }

  function determineOutcome() {
    const workflow = workflowCompletion();
    const stats = recordStats();
    const gateDecision = record.gate.gate_decision;
    const hardFailure = stats.fail > 0 || stats.blocked > 0 || stats.rejectedClosure > 0 || gateDecision === 'rejected' || gateDecision === 'blocked';
    const incomplete = workflow.steps.some(status => !status.complete) || stats.pendingAreas > 0 || stats.pendingApplicability > 0 || stats.pendingResults > 0;
    const conditional = gateDecision === 'conditional' || stats.openOrConditional > 0;

    if (hardFailure) {
      return { code: 'not-ready', label: 'NOT READY / NON-CONFORMING', note: 'One or more controls failed, remain blocked, were rejected, or the gate decision does not permit acceptance.' };
    }
    if (incomplete) {
      return { code: 'incomplete', label: 'INCOMPLETE RECORD', note: 'Required context, tailoring, control, execution, closure, or final-review information is still missing.' };
    }
    if (conditional) {
      return { code: 'conditional', label: 'CONDITIONALLY CONFORMING', note: 'The selected checklist is complete, but conditions, waivers, or open closure states remain attached to the decision.' };
    }
    if (gateDecision === 'accepted' && stats.applicable > 0 && stats.pass === stats.applicable && stats.closed === stats.applicable) {
      return { code: 'conforming', label: 'CONFORMING TO THE SELECTED AEROSAFE CHECKLIST', note: 'All applicable controls are recorded as passed and closed for the identified project baseline and gate decision.' };
    }
    return { code: 'incomplete', label: 'INCOMPLETE RECORD', note: 'The record does not yet support a positive checklist-conformity status.' };
  }

  function formatDateTime(value) {
    if (!value) return 'Not recorded';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? escapeHtml(value) : date.toLocaleString();
  }

  function display(value, fallback = 'Not recorded') {
    return isBlank(value) ? `<span class="not-recorded">${escapeHtml(fallback)}</span>` : escapeHtml(value).replaceAll('\n', '<br>');
  }

  function reportKeyValue(label, value) {
    return `<div><dt>${escapeHtml(label)}</dt><dd>${display(value)}</dd></div>`;
  }

  function renderReport() {
    const outcome = determineOutcome();
    const stats = recordStats();
    const workflow = workflowCompletion();
    const selectedIds = selectedControlIds();
    const generated = record.report.generatedAt || new Date().toISOString();
    const step6 = guided.steps.find(step => step.id === 'conformity');

    const projectFields = guided.project_fields.map(field => reportKeyValue(field.label, record.project[field.id])).join('');
    const scopeRows = data.table7.map(row => {
      const area = record.areas[row.id];
      const refs = row.refs.map(ref => `${ref.table}: ${ref.items}`).join('; ');
      return `<tr><td><strong>${escapeHtml(row.area)}</strong></td><td><span class="scope-decision scope-${escapeHtml(area.decision)}">${escapeHtml(area.decision)}</span></td><td>${escapeHtml(refs)}</td><td>${display(area.rationale, 'No rationale recorded')}</td></tr>`;
    }).join('');
    const workflowRows = guided.steps.map((step, index) => {
      const status = workflow.steps[index];
      return `<tr><td>${escapeHtml(step.number)}</td><td><strong>${escapeHtml(step.title)}</strong></td><td>${status.percent}%</td><td>${status.complete ? 'Complete' : 'Incomplete'}</td><td>${status.issues.length ? escapeHtml(status.issues.slice(0, 3).join(' | ')) : 'No open completion issue'}</td></tr>`;
    }).join('');

    const controlGroups = areaGroups(selectedIds).map(group => `<section class="report-control-group"><h3>${escapeHtml(group.row.area)}</h3>${group.ids.map(id => {
      const { item, table } = itemsById.get(id);
      const control = record.controls[id];
      return `<article class="report-control-card">
        <header><div><strong>${escapeHtml(id)}</strong><span>Online Table ${escapeHtml(table.number)}</span></div><div><span class="scope-decision scope-${escapeHtml(control.applicability)}">${escapeHtml(control.applicability)}</span><span class="result-badge result-${escapeHtml(control.result)}">${escapeHtml(resultLabel(control.result))}</span></div></header>
        <p class="report-control-objective">${escapeHtml(item.objective)}</p>
        <dl class="report-control-grid">
          ${reportKeyValue('Owner', control.owner)}
          ${reportKeyValue('Gate', control.gate)}
          ${reportKeyValue('Closure authority', control.closureAuthority)}
          ${reportKeyValue('Planned evidence / record', control.plannedEvidence)}
          ${reportKeyValue('Tailoring / N.A. rationale', control.tailoringRationale)}
          ${reportKeyValue('Configuration confirmed', control.configured ? 'Yes' : 'No')}
          ${reportKeyValue('Evidence reviewed / result reference', control.evidenceRef)}
          ${reportKeyValue('Decision / finding / waiver', control.decisionFinding)}
          ${reportKeyValue('Project traceability links', control.projectLinks)}
          ${reportKeyValue('Residuals / limitations', control.residuals)}
          ${reportKeyValue('Execution confirmed', control.executed ? 'Yes' : 'No')}
          ${reportKeyValue('Closure state', closureLabel(control.closure))}
          ${reportKeyValue('Closure note / authority reference', control.closureNote)}
          ${reportKeyValue('Closure reviewed', control.closureConfirmed ? 'Yes' : 'No')}
        </dl>
      </article>`;
    }).join('')}</section>`).join('');

    $('#conformity-report-content').innerHTML = `<article class="report-paper">
      <header class="report-title-block">
        <div><p class="report-kicker">Aerosafe checklist-conformity record</p><h1>${escapeHtml(recordName())}</h1><p>${display(record.project.system_item, 'System or software item not recorded')}</p></div>
        <div class="report-outcome outcome-${escapeHtml(outcome.code)}"><strong>${escapeHtml(outcome.label)}</strong><span>${escapeHtml(outcome.note)}</span></div>
      </header>
      <div class="report-disclaimer"><strong>Scope of this output.</strong> This page records completion against the project-selected Aerosafe checklist for the identified baseline. It is not an ECSS certificate, compliance decision, qualification approval, or substitute for the designated authority.</div>
      <section><h2>Record identity and project context</h2><dl class="report-definition-grid">${projectFields}${reportKeyValue('Generated at', formatDateTime(generated))}${reportKeyValue('Companion edition', data.metadata.version)}</dl></section>
      <section><h2>Conformity summary</h2><div class="report-summary-grid"><div><strong>${workflow.percent}%</strong><span>workflow recorded</span></div><div><strong>${stats.includedAreas}</strong><span>areas included</span></div><div><strong>${stats.selected}</strong><span>controls selected</span></div><div><strong>${stats.applicable}</strong><span>applicable</span></div><div><strong>${stats.pass}</strong><span>passed</span></div><div><strong>${stats.fail + stats.blocked}</strong><span>failed / blocked</span></div><div><strong>${stats.closed}</strong><span>closed</span></div><div><strong>${stats.openOrConditional}</strong><span>open / conditional</span></div></div></section>
      <section><h2>Table 7 scope decisions</h2><div class="report-table-shell"><table><thead><tr><th>Assurance area</th><th>Decision</th><th>Online mapping</th><th>Rationale</th></tr></thead><tbody>${scopeRows}</tbody></table></div></section>
      <section><h2>Workflow completion</h2><div class="report-table-shell"><table><thead><tr><th>Step</th><th>Record</th><th>Progress</th><th>Status</th><th>Open completion information</th></tr></thead><tbody>${workflowRows}</tbody></table></div></section>
      <section><h2>Gate and authority decision</h2><dl class="report-definition-grid">${guided.gate_fields.map(field => reportKeyValue(field.label, field.id === 'gate_decision' ? (field.options.find(option => option.value === record.gate[field.id])?.label || record.gate[field.id]) : record.gate[field.id])).join('')}</dl></section>
      <section><h2>Item-level checklist record</h2>${controlGroups || '<p>No controls were selected.</p>'}</section>
      <section class="report-final-confirmations"><h2>Final confirmations</h2><p>Complete these checks after reviewing the generated page. The status above updates when the record is regenerated.</p>${renderPhaseChecks(step6, { reportMode: true })}</section>
      <footer class="report-footer"><div><strong>Prepared by</strong><span>${display(record.project.prepared_by)}</span></div><div><strong>Decision authority</strong><span>${display(record.gate.decision_authority)}</span></div><div><strong>Record / decision date</strong><span>${display(record.gate.decision_date || record.project.record_date)}</span></div></footer>
    </article>`;
  }

  function generateReport() {
    record.report.generatedAt = new Date().toISOString();
    saveRecord();
    renderReport();
    const reportSection = $('#conformity-report');
    reportSection.hidden = false;
    history.replaceState(null, '', '#conformity-report');
    reportSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function bindEvents() {
    $('#guided-panel').addEventListener('input', event => handleInput(event.target));
    $('#guided-panel').addEventListener('change', event => {
      handleInput(event.target);
      if (event.target.dataset.areaDecision) renderPanel();
    });
    $('#guided-panel').addEventListener('click', event => {
      const bulk = event.target.closest('[data-bulk-area]');
      if (bulk) setAllAreas(bulk.dataset.bulkArea);
    });

    $('#guided-stepper').addEventListener('click', event => {
      const button = event.target.closest('[data-guided-step]');
      if (!button) return;
      record.currentStep = Number(button.dataset.guidedStep);
      saveRecord({ announce: false });
      renderGuided();
      $('#guided-app').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    $('#guided-back').addEventListener('click', () => {
      if (record.currentStep > 0) record.currentStep -= 1;
      saveRecord({ announce: false });
      renderGuided();
      $('#guided-app').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    $('#guided-next').addEventListener('click', () => {
      if (record.currentStep < guided.steps.length - 1) {
        record.currentStep += 1;
        saveRecord({ announce: false });
        renderGuided();
        $('#guided-app').scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        generateReport();
      }
    });

    $('#guided-save').addEventListener('click', () => saveRecord());
    $('#guided-export-draft').addEventListener('click', () => downloadJson(false));
    $('#guided-reset').addEventListener('click', () => {
      if (!window.confirm('Reset the complete Aerosafe guided record stored in this browser? This cannot be undone unless you exported a copy.')) return;
      record = createDefaultRecord();
      try { localStorage.removeItem(storageKey); } catch (error) { console.warn(error); }
      $('#conformity-report').hidden = true;
      renderGuided();
      $('#guided-save-status').textContent = 'Record reset; not yet saved';
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

  renderGuided();
  bindEvents();
  if (record.updatedAt) $('#guided-save-status').textContent = `Restored local record saved ${new Date(record.updatedAt).toLocaleString()}`;
})();
