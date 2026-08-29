# Aerosafe static companion

Open `index.html` directly. The companion uses HTML, CSS, SVG, and JavaScript only; no server or external runtime asset is required.

## Information architecture

The public interface is organised by research and user tasks rather than paper table numbers:

- **Interactive map** - a navigable visual entry point combining the assurance decision flow of Figure 2 with the lifecycle phases and review gates of Figure 3;
- **Guided recommender** - project-context questions, explained group suggestions, authorised tailoring, item-level configuration and execution, and the final conformity record;
- **Checklist catalogue** - nine named groups covering all 52 controls;
- **IMVV vertical** - the reusable construction and execution views corresponding to paper Tables 4 and 5;
- **VQ1 application** - the single bounded spacecraft-FDIR application corresponding to paper Table 6;
- **First evaluation** - the descriptive dashboard derived from the questionnaire workbooks; and
- **How to use** - role-based routes through the companion.

## Interactive framework map

The map provides two synchronized views:

1. **Assurance decision flow.** It preserves the labelled activities, decisions, branches, rework loops, completion marker, and IMVV output represented in the Figure 2 JSON export.
2. **Lifecycle and gates.** It reproduces the five phases, five ECSS-oriented or project-defined review gates, and the two cross-cutting bands specified by the Figure 3 TikZ source.

Select any node to see:

- its role in the process;
- the question that must be answered in the project record;
- the named checklist groups that support it;
- the relevant guided-recommender stage or stages;
- its outgoing branch or branches; and
- source-traceability information.

The map includes Previous/Next navigation, an optional guided tour, pan and zoom, a text alternative, keyboard controls, and direct links to the checklist catalogue and guided project mode. It is an explanatory navigation aid, not an automated assurance or applicability decision.

The canonical visual data are stored in `../data/framework_map_data.json`. The source materials are retained in `../data/diagram_sources/` and downloadable from the website. The Figure 2 export contains one unattached edge labelled “No: Check design”; its placement follows the rendered Figure 2 and is explicitly recorded as an editorial interpretation in the canonical map data.

## Two audiences and records

The catalogue separates:

1. the **assurance planner/configurator**, who records applicability, provenance, objective, project inputs, planned evidence, criterion, owner, gate, closure authority, traceability links, and residual-handling rule; and
2. the **reviewer/checklist user**, who records controlled evidence reviewed, result, finding or waiver, authorised disposition, closure status, traceability links, and residual limitations.

The term **traceability links** denotes relations among hazards, requirements, ODD assumptions, configurations, datasets, models, tests, claims, findings, waivers, and gate decisions. It does not mean website hyperlinks.

## Guided recommender

The recommender is deterministic and transparent. It asks seven project-context questions, assigns each named group a baseline, recommended, context-dependent, or not-triggered status, and displays the reasons. Users may change every group decision, but exclusions and overrides must be justified in the project record.

The six guided stages operationalise the paper's “How to apply Aerosafe on a project” subsection. They are workflow stages, not six checklist controls. All selected item-level controls remain visible through construction, execution, gate disposition, and closure.

## Local data and output

Entries remain in the browser's local storage under the versioned key defined in `../data/framework_data.json`. Users can export the draft or final record as JSON and print/save the final page as PDF.

The generated page reports conformity to the selected Aerosafe checklist record for one identified baseline. It is not an ECSS certificate, certification decision, qualification approval, or automatic customer acceptance.
