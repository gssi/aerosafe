import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const downloads = path.join(root, 'downloads');
const version = fs.readFileSync(path.join(root, 'VERSION'), 'utf8').trim();

function loadWindowValue(filename, key) {
  const context = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(root, filename), 'utf8'), context);
  return context.window[key];
}

function csvCell(value) {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeJson(filename, value) {
  fs.writeFileSync(path.join(downloads, filename), `${JSON.stringify(value, null, 2)}\n`);
}

const framework = loadWindowValue('data.js', 'AEROSAFE_DATA');
const controls = framework.appendix_tables.flatMap((group) =>
  group.items.map((item) => ({
    checklist_group: group.number,
    checklist_group_title: group.title,
    control_id: item.id,
    ...Object.fromEntries(framework.schema.map((field) => [field, item[field]])),
  })),
);

if (controls.length !== 52 || new Set(controls.map((item) => item.control_id)).size !== 52) {
  throw new Error('Expected 52 uniquely identified controls.');
}

for (const control of controls) {
  for (const field of ['control_id', ...framework.schema]) {
    if (!control[field]) throw new Error(`Missing ${field} for ${control.control_id || 'unknown control'}.`);
  }
}

const catalogue = {
  metadata: {
    title: 'Aerosafe complete control catalogue',
    version,
    generated_on: '2026-09-07',
    control_count: controls.length,
    disclaimer: framework.metadata.disclaimer,
  },
  schema: ['checklist_group', 'checklist_group_title', 'control_id', ...framework.schema],
  controls,
};
writeJson('aerosafe-complete-control-catalogue.json', catalogue);

const csvHeaders = catalogue.schema;
const csvRows = [csvHeaders, ...controls.map((control) => csvHeaders.map((field) => control[field]))];
fs.writeFileSync(
  path.join(downloads, 'aerosafe-complete-control-catalogue.csv'),
  `${csvRows.map((row) => row.map(csvCell).join(',')).join('\n')}\n`,
);

const validation = loadWindowValue('second-validation-data.js', 'AEROSAFE_SECOND_VALIDATION');
writeJson('second-validation-instrument.json', {
  metadata: validation.metadata,
  instrument: validation.instrument,
  clarification_policy: validation.clarification_policy,
  limitations: validation.limitations,
});

const releaseFiles = [
  'data.js',
  'second-validation-data.js',
  'downloads/aerosafe-complete-control-catalogue.csv',
  'downloads/aerosafe-complete-control-catalogue.json',
  'downloads/second-validation-instrument.json',
  'downloads/second-validation-anonymised-response-matrix.csv',
  'downloads/second-validation-participant-profile.csv',
  'downloads/second-validation-item-statistics.csv',
  'downloads/second-validation-group-statistics.csv',
];

const manifest = {
  release: `v${version}`,
  generated_on: '2026-09-07',
  files: releaseFiles.map((filename) => {
    const content = fs.readFileSync(path.join(root, filename));
    return {
      filename,
      bytes: content.length,
      sha256: crypto.createHash('sha256').update(content).digest('hex'),
    };
  }),
};
writeJson('release-manifest.json', manifest);

console.log(`Exported ${controls.length} controls and VQ3 release artefacts for v${version}.`);
