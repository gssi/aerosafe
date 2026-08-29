window.AEROSAFE_DATA = {
  "metadata": {
    "framework": "Aerosafe",
    "paper_title": "Aerosafe: A Software Quality Assurance Framework for AI-Based Aerospace Systems in ECSS Lifecycles",
    "version": "interactive-map, checklist-catalogue, guided-recommender, and first-evaluation edition",
    "disclaimer": "Aerosafe is an operational assurance aid. The catalogue contains 52 controls in nine named checklist groups. The guided recommender proposes groups for project review, but every recommendation requires project tailoring and authority confirmation. The final record is not an ECSS certificate, compliance decision, qualification approval, or substitute for the designated authority.",
    "companion_url": "https://gssi.github.io/aerosafe/"
  },
  "schema": [
    "source/status",
    "objective",
    "inputs",
    "owner",
    "evidence",
    "acceptance criterion",
    "gate",
    "closure authority",
    "links",
    "residuals"
  ],
  "notation": {
    "M": "Minimum Aerosafe baseline.",
    "C": "Conditionally activated by project risk and context.",
    "NA": "Justified non-applicability approved during instantiation.",
    "M all": "The item contains multiple sub-points or requirements and every one of those sub-points is classified as Minimum (M)."
  },
  "workflow": [
    {
      "step": "1",
      "title": "Establish project context",
      "detail": "Freeze the contractual baseline, review plan, criticality input, AI/ML boundary, ODD, hazards, authority, and compensating provisions."
    },
    {
      "step": "2",
      "title": "Recommend and tailor checklist groups",
      "detail": "Use the guided questions to obtain a transparent recommendation, then include, exclude, or defer each named group with a rationale."
    },
    {
      "step": "3",
      "title": "Construct the checklist",
      "detail": "Instantiate the construction and traceability record for every applicable item before evidence is judged."
    },
    {
      "step": "4",
      "title": "Execute the checklist",
      "detail": "Review the controlled baseline and record evidence, results, findings, traceability links, and residual limitations."
    },
    {
      "step": "5",
      "title": "Close or constrain",
      "detail": "The named authority closes, waives, rejects, or conditionally accepts; evidence ownership does not confer closure authority."
    },
    {
      "step": "6",
      "title": "Issue and maintain the record",
      "detail": "Generate the checklist-conformity record and reopen affected controls after material changes, anomalies, or invalidated assumptions."
    }
  ],
  "table7": [
    {
      "area": "Scope, formal reviews, and planning",
      "scope": "AI/ML boundary, ODD, authority and criticality rationale; SRR/PDR/CDR/TRR/QR/AR entry, exit, evidence, and action control.",
      "refs": [
        {
          "table": "A.13",
          "key": "A13",
          "items": "SC-01; FR-01 to FR-06"
        }
      ],
      "tailoring": "Review names and phasing follow the contractual plan; VVR and ORR are used only when project-defined.",
      "id": "governance",
      "code": "SC/FR",
      "group_name": "Scope, Review, and Planning Checklists",
      "item_spec": "SC-01; FR-01 to FR-06",
      "item_count": 7,
      "purpose": "Define the AI/ML assurance boundary and control the entry, evidence, action, and closure conditions of project reviews.",
      "planner_audience": "System safety, PA/QA, systems engineering, and review planning roles.",
      "user_audience": "Review chairs, evidence owners, assessors, and project/customer decision authorities.",
      "lifecycle": "SRR through AR; project-defined reviews only where contractually adopted."
    },
    {
      "area": "Configuration management and traceability",
      "scope": "Controlled datasets, labels, models, code, tools, converters, binaries, changes, lifecycle links, and feasible runtime diagnostics.",
      "refs": [
        {
          "table": "A.13",
          "key": "A13",
          "items": "CM-01 to CM-03; TR-01 to TR-02"
        }
      ],
      "tailoring": "Baseline and lifecycle traceability are minimum controls; runtime logging is conditional on architecture, resources, and purpose.",
      "id": "configuration-traceability",
      "code": "CM/TR",
      "group_name": "Configuration and Traceability Checklists",
      "item_spec": "CM-01 to CM-03; TR-01 to TR-02",
      "item_count": 5,
      "purpose": "Control datasets, models, code, tools, releases, changes, and bidirectional assurance links.",
      "planner_audience": "Configuration management, PA/QA, systems/software engineering, and data/ML leads.",
      "user_audience": "Configuration controllers, reviewers, auditors, and release authorities.",
      "lifecycle": "Cross-cutting from initial baselines through release and change."
    },
    {
      "area": "Data assurance",
      "scope": "Requirements, provenance, labels/measurement, partition independence, ODD coverage, quality, integrity, privacy, and application-relevant bias.",
      "refs": [
        {
          "table": "A.14",
          "key": "A14",
          "items": "DM-01 to DM-09"
        }
      ],
      "tailoring": "Integrity, provenance, and evidence fitness form the baseline; privacy and fairness depend on data, affected strata, and obligations.",
      "id": "data-assurance",
      "code": "DM",
      "group_name": "Data Assurance Checklists",
      "item_spec": "DM-01 to DM-09",
      "item_count": 9,
      "purpose": "Establish data requirements, provenance, quality, partition independence, ODD coverage, integrity, and context-dependent privacy or disparity controls.",
      "planner_audience": "Data owners, domain experts, safety, security/privacy, and V&V planners.",
      "user_audience": "Data reviewers, ML engineers, independent assessors, and gate authorities.",
      "lifecycle": "Data specification and acquisition through model acceptance and change."
    },
    {
      "area": "Model learning",
      "scope": "Reproducible training, candidate comparison and selection, overfitting/mismatch analysis, and explainability when assurance-relevant.",
      "refs": [
        {
          "table": "A.14",
          "key": "A14",
          "items": "ML-01 to ML-04"
        }
      ],
      "tailoring": "Core reproducibility and selection records are minimum; explainability is conditional on the claim, user, model, and method validity.",
      "id": "model-learning",
      "code": "ML",
      "group_name": "Model Learning Checklists",
      "item_spec": "ML-01 to ML-04",
      "item_count": 4,
      "purpose": "Make training, candidate comparison, selection, mismatch analysis, and assurance-relevant explainability reproducible and reviewable.",
      "planner_audience": "ML engineering, data engineering, domain experts, safety, and V&V planners.",
      "user_audience": "ML reviewers, V&V assessors, configuration controllers, and selection authorities.",
      "lifecycle": "Model development and selection before verification readiness."
    },
    {
      "area": "Model verification and validation",
      "scope": "Predeclared criteria, independent acceptance data, scenario testing, formal/adversarial methods, robustness/OOD/uncertainty, and intended-use validation.",
      "refs": [
        {
          "table": "A.15",
          "key": "A15",
          "items": "MV-01 to MV-07"
        }
      ],
      "tailoring": "Requirements-linked V&V is minimum for claimed properties; formal and adversarial techniques are conditional on a property or threat model.",
      "id": "model-vv",
      "code": "MV",
      "group_name": "Model Verification and Validation Checklists",
      "item_spec": "MV-01 to MV-07",
      "item_count": 7,
      "purpose": "Predeclare model-level criteria and assess independent data, scenarios, robustness, uncertainty, OOD behaviour, and intended-use adequacy.",
      "planner_audience": "Safety, model V&V, statistics, domain, and independent-assurance planners.",
      "user_audience": "Model V&V teams, independent assessors, review boards, and acceptance authorities.",
      "lifecycle": "Requirements and test planning through QR/VVR evidence review."
    },
    {
      "area": "Software and system V&V",
      "scope": "Implementation, interfaces, numerical behaviour, timing/memory, monitoring, hardware/operational interactions, fallback, and hazard controls.",
      "refs": [
        {
          "table": "A.15",
          "key": "A15",
          "items": "SV-01; SY-01"
        }
      ],
      "tailoring": "Software evidence is required for deployed implementations; integrated system evidence is required before operational acceptance.",
      "id": "software-system-vv",
      "code": "SV/SY",
      "group_name": "Software and System V&V Checklists",
      "item_spec": "SV-01; SY-01",
      "item_count": 2,
      "purpose": "Separate model evidence from implementation, target, interface, integrated-system, hazard-control, and fallback evidence.",
      "planner_audience": "Software V&V, system V&V, safety, integration, and target-platform leads.",
      "user_audience": "Software/system testers, integration reviewers, safety assessors, and gate authorities.",
      "lifecycle": "Implementation and integration readiness through system acceptance."
    },
    {
      "area": "Deployment, operation, fallback, and change",
      "scope": "Conversion, target resources and equivalence, release/rollback, monitoring, maintenance/change, safety provisions, and operational anomalies.",
      "refs": [
        {
          "table": "A.16",
          "key": "A16",
          "items": "DP-01 to DP-08"
        }
      ],
      "tailoring": "Target/release controls apply when deployed; monitoring, fallback, and safety cages depend on observability, architecture, mission, and hazards.",
      "id": "deployment-change",
      "code": "DP",
      "group_name": "Deployment, Operations, and Change Checklists",
      "item_spec": "DP-01 to DP-08",
      "item_count": 8,
      "purpose": "Control conversion, target equivalence, release, rollback, monitoring, fallback, anomalies, maintenance, and requalification triggers.",
      "planner_audience": "Software/ML deployment, operations, CM, safety, PA/QA, and maintenance planners.",
      "user_audience": "Target V&V teams, operations/readiness reviewers, anomaly boards, and release authorities.",
      "lifecycle": "Target integration, AR/ORR, operation, maintenance, and change."
    },
    {
      "area": "Safety argument and normative status",
      "scope": "Hazard-to-evidence links, structured assurance claims, residual-risk decisions, and explicit contractual/guidance/recommendation status.",
      "refs": [
        {
          "table": "A.17",
          "key": "A17",
          "items": "SA-01 to SA-04"
        }
      ],
      "tailoring": "Argument depth follows safety reliance and project risk; source/status must never imply ECSS normativity without an applicable contractual clause.",
      "id": "safety-normative",
      "code": "SA",
      "group_name": "Safety Argument and Normative-Status Checklists",
      "item_spec": "SA-01 to SA-04",
      "item_count": 4,
      "purpose": "Connect hazards to evidence and residual-risk decisions while distinguishing contractual requirements, guidance, and Aerosafe recommendations.",
      "planner_audience": "System safety, PA/QA, assurance-case authors, and contractual/compliance roles.",
      "user_audience": "Safety reviewers, assurance-case assessors, customers, and risk-acceptance authorities.",
      "lifecycle": "Cross-cutting claim construction and review through release acceptance."
    },
    {
      "area": "Independent Model Verification and Validation (IMVV)",
      "scope": "Activation, organisational/technical/decisional independence, AI-evidence challenge, findings, retest, waiver, and closure.",
      "refs": [
        {
          "table": "A.17",
          "key": "A17",
          "items": "IV-01 to IV-06"
        }
      ],
      "tailoring": "IMVV is risk-triggered; the independent team raises and verifies findings, while the designated project/customer authority closes them.",
      "id": "imvv",
      "code": "IV",
      "group_name": "Independent Model Verification and Validation Checklists",
      "item_spec": "IV-01 to IV-06",
      "item_count": 6,
      "purpose": "Plan and execute risk-triggered independent challenge of AI-specific evidence, independence arrangements, findings, retest, waiver, and closure.",
      "planner_audience": "PA/QA, customer/project authority, and the independent-assurance lead.",
      "user_audience": "IMVV assessors, finding controllers, evidence owners, and designated closure authorities.",
      "lifecycle": "Activation at planning gates; challenge and finding closure through QR/AR."
    }
  ],
  "appendix_tables": [
    {
      "key": "A13",
      "number": "A.13",
      "title": "Operational checklist: scope, review gates, configuration management, and traceability.",
      "items": [
        {
          "id": "SC-01",
          "source/status": "AMLAS-P1 + Q80 Annex D + E40 requirements; synthesized. Status: M all.",
          "objective": "Define the AI/ML boundary, ODD, decision authority, interfaces, compensating provisions, and criticality rationale.",
          "inputs": "Contractual baseline; system architecture; preliminary hazard analysis; ODD; interface and authority concept; compensating provisions.",
          "owner": "System Safety with Product Assurance (PA).",
          "evidence": "SCAR/criticality record; approved ODD and boundary/interface description; assumptions; assurance plan.",
          "acceptance criterion": "The classification, AI failure propagation, authority boundary, interfaces, and compensating provisions are justified and mutually consistent.",
          "gate": "SRR.",
          "closure authority": "Project/customer SRR authority.",
          "links": "Hazards; system/software requirements; architecture; SA-01; FR-01.",
          "residuals": "Open assumptions, unresolved interfaces, and criticality dependencies are recorded with owners and due gates."
        },
        {
          "id": "FR-01",
          "source/status": "E40 5.2.5 and 5.3.4.1; AI evidence inputs adapted. Status: M.",
          "objective": "Review requirements and the AI assurance scope at SRR.",
          "inputs": "SC-01 baseline; preliminary ML safety requirements; data and V&V strategy; assurance plan; open actions.",
          "owner": "Systems Engineering and PA, supported by Safety, ML, and V&V leads.",
          "evidence": "SRR data pack and minutes identifying the baselined AI role, scope, requirements, strategies, and actions.",
          "acceptance criterion": "The SRR entry/exit criteria in the tailored review plan are met and every open action has an owner and due gate.",
          "gate": "SRR.",
          "closure authority": "Designated SRR authority.",
          "links": "SC-01; SA-01; DM-01; MV-01; IV-01.",
          "residuals": "Unclosed SRR actions and assumptions remain explicit and cannot be treated as accepted evidence."
        },
        {
          "id": "FR-02",
          "source/status": "E40 5.3.4.2 + AMLAS-P2/P3; synthesized. Status: M when PDR is in the review plan.",
          "objective": "Review the data strategy, architecture, model-class rationale, fallback concept, and verification plan.",
          "inputs": "Approved SRR baseline; data requirements; coverage model; architecture; model candidates; target constraints; fallback concept.",
          "owner": "Systems Engineering with Data/ML, Software, Safety, and V&V owners.",
          "evidence": "PDR data pack, decisions, action log, and updated assurance plan.",
          "acceptance criterion": "The proposed architecture and data/verification plans address allocated requirements and hazards with identified residual uncertainties.",
          "gate": "PDR.",
          "closure authority": "Designated PDR authority.",
          "links": "DM-01 to DM-09; ML-01 to ML-04; DP-07; SA-01.",
          "residuals": "Architecture trades, data gaps, and fallback limitations are carried into CDR/TRR planning."
        },
        {
          "id": "FR-03",
          "source/status": "E40 5.3.4.3 + AMLAS-P4 + HB40 6.4.2; synthesized. Status: M when CDR is in the review plan.",
          "objective": "Review the detailed model/software design and freeze the development baseline.",
          "inputs": "Approved PDR actions; model selection; training pipeline; software design; interfaces; target constraints; toolchain records.",
          "owner": "ML and Software Engineering with CM, Safety, PA, and V&V.",
          "evidence": "CDR baseline covering pipeline, interfaces, reproducibility, selected model, target feasibility, and remaining actions.",
          "acceptance criterion": "The design is traceable, reproducible, implementable on the target, and sufficiently mature for test-readiness preparation.",
          "gate": "CDR.",
          "closure authority": "Designated CDR authority.",
          "links": "CM-02; ML-01 to ML-04; SV-01; DP-01 to DP-03.",
          "residuals": "Unresolved design or target constraints are entered as controlled actions and reflected in test scope."
        },
        {
          "id": "FR-04",
          "source/status": "E40 5.3.5.1 + AMLAS-P5; AI-specific readiness content adapted. Status: M before applicable verification execution.",
          "objective": "Establish test readiness for model, software, system, and independent-assessment activities.",
          "inputs": "Frozen test object; independent data; procedures; acceptance criteria; tools; environments; anomaly process; IMVV plan.",
          "owner": "V&V lead with QA/CM; IMVV lead for the independent scope.",
          "evidence": "TRR data pack, readiness checklist, configuration list, approved procedures, criteria, and open-risk disposition.",
          "acceptance criterion": "Test objects and environments are identified and controlled; criteria are predeclared; independence and anomaly handling are adequate.",
          "gate": "TRR.",
          "closure authority": "Designated TRR authority.",
          "links": "MV-01 to MV-07; SV-01; SY-01; IV-03 to IV-05.",
          "residuals": "Any readiness exception is formally limited, owned, and either resolved before execution or explicitly accepted by authority."
        },
        {
          "id": "FR-05",
          "source/status": "E40 5.3.4.4 (QR); a separate VVR is a project-defined mapping option. Status: M at QR.",
          "objective": "Assess qualification/V&V evidence, anomalies, limitations, waivers, and IMVV findings.",
          "inputs": "Requirement-level results; coverage analyses; target evidence; NCRs; waivers; residual-risk record; IMVV report.",
          "owner": "V&V and PA with Safety, Engineering, and IMVV participation.",
          "evidence": "QR or project-defined VVR data pack, pass/fail matrix, finding dispositions, limitations, and recommendation.",
          "acceptance criterion": "Every applicable requirement and assurance claim has a controlled result or approved disposition; unresolved blockers are visible.",
          "gate": "QR; project-defined VVR only when included in the review plan.",
          "closure authority": "Designated QR/VVR authority.",
          "links": "MV-01 to SY-01; DP-01 to DP-03; SA-02 to SA-03; IV-05 to IV-06.",
          "residuals": "Open findings, unsupported claims, waivers, and operational restrictions remain attached to the release decision."
        },
        {
          "id": "FR-06",
          "source/status": "E40 5.3.4.5 and 5.7; AI release content adapted; ORR is project-defined. Status: M at AR.",
          "objective": "Accept one controlled release together with its ODD, operating limitations, rollback, and change controls.",
          "inputs": "Qualified configuration; release manifest; approved limitations; operating procedures; rollback; maintenance/change plan; residual risk.",
          "owner": "Project/customer acceptance authority supported by PA, CM, Operations, Safety, and Engineering.",
          "evidence": "AR/ORR record identifying the accepted release, ODD, restrictions, residual risks, waivers, and operating/change conditions.",
          "acceptance criterion": "The accepted configuration is uniquely identified and all conditions of use, rollback provisions, and residual-risk decisions are authorised.",
          "gate": "AR; project-defined ORR when applicable.",
          "closure authority": "Project/customer acceptance authority.",
          "links": "CM-02 to CM-03; DP-04 to DP-08; SA-03; IV-06.",
          "residuals": "Acceptance is limited to the stated configuration and ODD; changes or anomalies reopen affected evidence."
        },
        {
          "id": "CM-01",
          "source/status": "Q80 6.2.4 + AMLAS-P3; AI artefact scope adapted. Status: M all.",
          "objective": "Configuration-control datasets, labels, partitions, and transformations.",
          "inputs": "Data specification; source and custody records; transformation pipeline; split rules; access history.",
          "owner": "Configuration Management (CM) and QA with the Data owner.",
          "evidence": "Immutable identifiers/hashes, lineage, approved baselines, access history, and links to consuming models.",
          "acceptance criterion": "Every data artefact used for evidence or release can be uniquely identified, reproduced, and traced to its approved use.",
          "gate": "PDR onward; checked at TRR/QR/AR.",
          "closure authority": "Relevant gate authority accepts the baseline.",
          "links": "DM-01 to DM-09; ML-01; MV-02; TR-01.",
          "residuals": "Unavailable source records, mutable data, or uncharacterised transformations are recorded as evidence limitations."
        },
        {
          "id": "CM-02",
          "source/status": "Q80 6.2.4 + AMLAS-P4 to P6; adapted. Status: M all.",
          "objective": "Configuration-control code, parameters, weights, tools, converters, monitors, and target binaries.",
          "inputs": "Source repositories; training/build scripts; parameters; model weights; toolchain; converter/compiler settings; monitor configuration.",
          "owner": "CM and Engineering, with QA oversight.",
          "evidence": "Reproducible training/build/release manifest, identifiers and checksums, environment record, and tool confidence rationale where applicable.",
          "acceptance criterion": "The reviewed model, software, and target binary can be reconstructed or otherwise shown equivalent from controlled inputs and tools.",
          "gate": "CDR, QR, and AR.",
          "closure authority": "Relevant review/acceptance authority.",
          "links": "ML-01; SV-01; DP-01 to DP-04; TR-01.",
          "residuals": "Non-reproducible or supplier-controlled elements are documented with compensating evidence and confidence limits."
        },
        {
          "id": "CM-03",
          "source/status": "E40 5.10 + Q80 6.2.4; ML change triggers adapted. Status: M for material changes.",
          "objective": "Perform change-impact analysis and reopen affected evidence.",
          "inputs": "Change request; affected requirements, data, model, software, tools, target, monitoring, findings, and claims.",
          "owner": "Change Control Board (CCB) with CM, Engineering, V&V, Safety, and PA.",
          "evidence": "Approved impact analysis, regression/re-review scope, updated traceability, and release decision.",
          "acceptance criterion": "All affected artefacts and claims are identified; regression and review depth are justified before the changed baseline is accepted.",
          "gate": "CCB and any affected lifecycle gate.",
          "closure authority": "CCB/project authority.",
          "links": "TR-01; DP-06; DP-08; SA-02 to SA-03; IV-06.",
          "residuals": "Deferred regression, inherited evidence, and unchanged-item assumptions are explicit and authorised."
        },
        {
          "id": "TR-01",
          "source/status": "Q80 6.2.6.12 + AMLAS cross-process links; complete AI evidence graph synthesized. Status: M all.",
          "objective": "Maintain forward and backward lifecycle traceability.",
          "inputs": "Hazards; requirements; data/model/software configurations; tests; results; claims; findings; waivers; release decisions.",
          "owner": "PA/QA controls the traceability process; artefact owners maintain links.",
          "evidence": "Queries from hazard to decision and from released binary, result, or finding back to source artefacts and claims.",
          "acceptance criterion": "Required forward and backward queries are complete, configuration-consistent, and usable for review and change-impact analysis.",
          "gate": "Checked at every milestone.",
          "closure authority": "Relevant gate authority.",
          "links": "All checklist items; especially SA-01 to SA-03 and IV-05 to IV-06.",
          "residuals": "Broken, ambiguous, or many-to-one links are logged and cannot be hidden by aggregate status."
        },
        {
          "id": "TR-02",
          "source/status": "AMLAS-P6 + E40 operations; telemetry/resource interpretation introduced. Status: C; N.A. permitted with rationale.",
          "objective": "Define feasible runtime traceability and diagnostic logging.",
          "inputs": "Safety-monitoring objectives; event model; platform resources; telemetry bandwidth; retention, privacy, and security constraints.",
          "owner": "Operations and Software Engineering with Safety and Security.",
          "evidence": "Logging/telemetry specification identifying events, configuration IDs, retention, bandwidth, access, and diagnostic purpose.",
          "acceptance criterion": "Runtime records are sufficient for the stated safety/diagnostic purpose without violating resource, privacy, or security constraints; otherwise N.A. is approved.",
          "gate": "CDR, AR, and project-defined ORR.",
          "closure authority": "Operations/Safety authority.",
          "links": "DP-05; DP-08; CM-02; SA-03.",
          "residuals": "Unobservable states, sampling gaps, storage limits, and unavailable telemetry are explicit limitations in the safety argument."
        }
      ]
    },
    {
      "key": "A14",
      "number": "A.14",
      "title": "Operational checklist: data assurance and model learning.",
      "items": [
        {
          "id": "DM-01",
          "source/status": "AMLAS-P3 + HB40 6.4.1; ECSS gate allocation adapted. Status: M all.",
          "objective": "Derive data requirements from the ODD, hazards, and ML safety requirements.",
          "inputs": "Approved ODD; hazard analysis; ML safety requirements; intended use; data-source and simulation options.",
          "owner": "Data owner and domain expert with Safety/V&V.",
          "evidence": "Data specification covering nominal, degraded, boundary, rare, and hazard-relevant strata and the intended role of each partition.",
          "acceptance criterion": "Every safety-relevant data need is traceable to a requirement or hazard and has an identified source, coverage rationale, and intended partition use.",
          "gate": "PDR.",
          "closure authority": "Safety/V&V authority.",
          "links": "SC-01; SA-01; DM-05; MV-03; TR-01.",
          "residuals": "Unavailable strata, simulation dependence, and assumptions about operational representativeness are recorded."
        },
        {
          "id": "DM-02",
          "source/status": "AMLAS-P3 + HB40 6.4.1 + Q80 6.2.4; synthesized. Status: M all.",
          "objective": "Record data provenance and lineage.",
          "inputs": "Source systems; sensor/simulator versions; acquisition/generation procedures; transformations; rights and custody information.",
          "owner": "Data owner with QA/CM.",
          "evidence": "Provenance record with source, version, method, transformations, rights, hashes, custody, and consuming-baseline links.",
          "acceptance criterion": "Each sample or dataset can be traced to an authorised source and controlled transformation history sufficient for reproduction and audit.",
          "gate": "PDR and TRR.",
          "closure authority": "Relevant gate authority.",
          "links": "CM-01; DM-06; ML-01; TR-01.",
          "residuals": "Missing provenance, third-party restrictions, or uncertain simulator/sensor pedigree are explicit limitations."
        },
        {
          "id": "DM-03",
          "source/status": "AMLAS-P3 + HB40 6.4.1; acceptance fields adapted. Status: M when labelled or measured data are used.",
          "objective": "Control labels, ground truth, and measurement uncertainty.",
          "inputs": "Labelling protocol; annotator/domain authority; measurement process; calibration; disagreement and error data.",
          "owner": "Domain/measurement owner with V&V and QA.",
          "evidence": "Label/ground-truth record, disagreement/error estimates, measurement uncertainty, adjudication, and unresolved limitations.",
          "acceptance criterion": "Label authority and uncertainty are defined; error/disagreement is quantified or bounded; unresolved ambiguity is reflected in requirements and results.",
          "gate": "TRR.",
          "closure authority": "Domain/V&V authority.",
          "links": "DM-05; DM-06; MV-01; MV-07.",
          "residuals": "Ambiguous labels, proxy ground truth, calibration limits, and unresolved disagreement remain visible."
        },
        {
          "id": "DM-04",
          "source/status": "AMLAS-P3/P4 + HB40 6.4.1 to 6.4.2; inherited and operationalized. Status: M all.",
          "objective": "Demonstrate partition independence and detect leakage or duplicates.",
          "inputs": "Dataset entity/time/source structure; split-generation procedure; duplicate and dependence criteria; access history.",
          "owner": "ML and V&V owners with QA.",
          "evidence": "Split record, entity/time/source separation checks, duplicate/dependence analysis, leakage findings, and corrective action.",
          "acceptance criterion": "Acceptance data are independent of tuning to the justified degree; duplicates and dependencies are removed, controlled, or explicitly accounted for.",
          "gate": "CDR and TRR.",
          "closure authority": "Designated review authority.",
          "links": "CM-01; ML-03; MV-02; TR-01.",
          "residuals": "Residual dependence, repeated entities, temporal leakage risk, and unavoidable overlap are quantified and carried into uncertainty."
        },
        {
          "id": "DM-05",
          "source/status": "AMLAS-P3 + HB40 6.4.1; residual-gap register adapted. Status: M all; depth is risk-based.",
          "objective": "Justify ODD and hazard coverage and record residual gaps.",
          "inputs": "ODD model; hazard scenarios; data requirements; scenario catalogue; sample support; simulation credibility evidence.",
          "owner": "Data/domain owner with Safety and V&V.",
          "evidence": "Coverage matrix by scenario/stratum, sample support, simulation credibility, uncertainty, unsupported regions, and proposed restrictions.",
          "acceptance criterion": "Coverage is justified for each claimed use and safety-relevant stratum; unsupported regions are linked to restrictions, fallback, or additional evidence.",
          "gate": "TRR.",
          "closure authority": "TRR authority.",
          "links": "DM-01; MV-03; MV-06; MV-07; SA-03.",
          "residuals": "Residual ODD gaps, sparse strata, extrapolation, and simulator limitations are explicitly retained."
        },
        {
          "id": "DM-06",
          "source/status": "AMLAS-P3 + HB40 6.4.1; inherited. Status: M all.",
          "objective": "Validate data quality and preprocessing.",
          "inputs": "Raw and processed baselines; integrity/range rules; missingness policy; preprocessing code; mismatch and sensitivity plan.",
          "owner": "Data owner with QA and V&V.",
          "evidence": "Integrity, missingness, range, mismatch, preprocessing-sensitivity, and reproducibility results against predeclared thresholds.",
          "acceptance criterion": "Data defects and preprocessing effects remain within approved thresholds or have controlled corrective action and impact assessment.",
          "gate": "PDR and TRR.",
          "closure authority": "Data/QA/V&V sign-off authority.",
          "links": "CM-01; DM-02; ML-01; MV-06.",
          "residuals": "Known corruption, missingness mechanisms, distribution mismatch, and preprocessing instability are recorded."
        },
        {
          "id": "DM-07",
          "source/status": "Applicable security baseline + Q80 CM principles; poisoning/provenance application adapted. Status: M for assurance-relevant integrity; depth is threat-based.",
          "objective": "Protect data and tool integrity.",
          "inputs": "Threat model; access model; approved sources; supply-chain information; incident process; integrity mechanisms.",
          "owner": "Security owner with PA, QA, and CM.",
          "evidence": "Access-control records, integrity verification, approved-source list, tamper evidence, supply-chain checks, and incident handling.",
          "acceptance criterion": "Controls address credible modification, poisoning, provenance, access, and supply-chain threats to the depth required by the applicable baseline.",
          "gate": "PDR, CDR, and TRR as allocated.",
          "closure authority": "Security/PA authority.",
          "links": "CM-01 to CM-02; MV-05; DP-01; TR-01.",
          "residuals": "Unverified suppliers, unavailable signing, residual insider risk, and threat-model exclusions are documented."
        },
        {
          "id": "DM-08",
          "source/status": "Applicable legal/contractual privacy obligations; explicit N.A. logic introduced. Status: C.",
          "objective": "Assess whether privacy obligations apply and implement or justify the resulting controls.",
          "inputs": "Data classification; personal/sensitive-data assessment; legal and contractual baseline; intended use; retention and access needs.",
          "owner": "Data-protection/project authority with Data owner and Security.",
          "evidence": "Applicability decision and, when applicable, lawful/contractual basis, minimisation, access, retention, and protection records.",
          "acceptance criterion": "Applicable obligations are satisfied; otherwise a named authority approves a reasoned N.A. decision showing that relevant data are not processed.",
          "gate": "PDR and AR as applicable.",
          "closure authority": "Data-protection/project authority.",
          "links": "DM-02; DM-07; TR-02.",
          "residuals": "Re-identification, secondary-use, retention, jurisdiction, and third-party transfer limitations are recorded."
        },
        {
          "id": "DM-09",
          "source/status": "AMLAS data adequacy + application risk analysis; aerospace interpretation adapted. Status: C.",
          "objective": "Assess application-relevant bias and fairness.",
          "inputs": "Hazards; affected stakeholders; sensor, environment, mission, equipment, geographic, and fault strata; protected attributes when relevant.",
          "owner": "Safety/domain authority with Data and V&V owners.",
          "evidence": "Performance and uncertainty by relevant strata, disparity rationale, mitigation, and approved N.A. decision when the concept is inapplicable.",
          "acceptance criterion": "Safety-relevant disparities are assessed and controlled; demographic fairness is required only when people or protected attributes are relevant.",
          "gate": "PDR, TRR, and QR as allocated.",
          "closure authority": "Safety/domain authority.",
          "links": "DM-05; MV-06; MV-07; SA-03.",
          "residuals": "Small strata, confounding, unavailable attributes, and unresolved disparity are retained as limitations."
        },
        {
          "id": "ML-01",
          "source/status": "AMLAS-P4 + HB40 6.4.2 + Q80 CM; synthesized. Status: M all.",
          "objective": "Make model training reproducible.",
          "inputs": "Approved data IDs; preprocessing; code; seeds; hyperparameters; libraries; hardware; training procedure.",
          "owner": "ML owner with CM.",
          "evidence": "Training manifest, logs, environment, parameters, data/model identifiers, and resulting weights.",
          "acceptance criterion": "The selected training run can be reproduced or shown equivalent from controlled inputs, with all stochastic and platform factors recorded.",
          "gate": "CDR.",
          "closure authority": "CDR authority.",
          "links": "CM-01 to CM-02; DM-02; DM-06; TR-01.",
          "residuals": "Non-deterministic variation, unavailable hardware, external services, and irreproducible supplier elements are bounded."
        },
        {
          "id": "ML-02",
          "source/status": "AMLAS-P4 + HB40 6.4.2; target-selection fields adapted. Status: M all.",
          "objective": "Compare candidates and justify model selection, including target feasibility.",
          "inputs": "Predeclared metrics; candidate models; uncertainty method; resource estimates; interpretability and deployment constraints.",
          "owner": "ML lead with Software, Safety, and V&V participation.",
          "evidence": "Candidate-comparison and selection record covering metrics, uncertainty, complexity, resource feasibility, and residual limitations.",
          "acceptance criterion": "The selected model satisfies the declared selection rule and target constraints without concealing failed safety-relevant criteria.",
          "gate": "CDR.",
          "closure authority": "CDR authority.",
          "links": "MV-01; DP-01 to DP-03; SA-02.",
          "residuals": "Near-ties, metric trade-offs, model-class limitations, and target-feasibility uncertainty are explicit."
        },
        {
          "id": "ML-03",
          "source/status": "AMLAS-P4 + HB40 6.4.2; inherited. Status: M where meaningful.",
          "objective": "Analyse overfitting, mismatch, and development-time drift.",
          "inputs": "Learning curves; partition records; development/operational distributions; calibration and sensitivity plan.",
          "owner": "ML and V&V owners.",
          "evidence": "Learning curves, sensitivity and mismatch tests, leakage checks, calibration/uncertainty evidence, and corrective actions.",
          "acceptance criterion": "No unaddressed overfitting, leakage, or mismatch invalidates the intended-use claims; detected issues have controlled resolution or limitation.",
          "gate": "CDR and TRR.",
          "closure authority": "ML/V&V authority.",
          "links": "DM-04; DM-06; ML-01; MV-06 to MV-07.",
          "residuals": "Residual mismatch, unstable calibration, limited sample support, and unmodelled drift mechanisms are recorded."
        },
        {
          "id": "ML-04",
          "source/status": "AMLAS assurance rationale + HB40 model guidance; conditional allocation adapted. Status: C; N.A. requires alternative evidence.",
          "objective": "Provide explainability evidence when it supports a requirement or review decision.",
          "inputs": "Explanation objective; user and decision; model type; safety claim; candidate methods; validity and stability considerations.",
          "owner": "ML owner with Safety, Human Factors/domain, and V&V as relevant.",
          "evidence": "Explanation method, suitability and stability assessment, limitations, affected claim, and alternative evidence when N.A.",
          "acceptance criterion": "The explanation is fit for the stated assurance/user purpose and does not exceed its validated scope; otherwise alternative evidence is approved.",
          "gate": "CDR and QR.",
          "closure authority": "Relevant CDR/QR authority.",
          "links": "ML-02; MV-06 to MV-07; SA-02.",
          "residuals": "Method instability, misleading attribution, user interpretation limits, and non-explainable residuals are explicit."
        }
      ]
    },
    {
      "key": "A15",
      "number": "A.15",
      "title": "Operational checklist: model, software, and system verification and validation.",
      "items": [
        {
          "id": "MV-01",
          "source/status": "AMLAS-P2/P5 + E40 5.8; metric/population/uncertainty tuple adapted. Status: M for claimed model properties.",
          "objective": "Freeze model-level requirements and acceptance criteria before testing.",
          "inputs": "Hazards; ODD; ML safety requirements; evaluated populations/strata; metric and uncertainty methods; test procedure.",
          "owner": "Safety and V&V authority with ML/domain input.",
          "evidence": "Baselined requirement specifying property, population/ODD, threshold, uncertainty rule, procedure, and decision authority.",
          "acceptance criterion": "Each claimed property has a testable, predeclared pass/fail rule that cannot be replaced by post-hoc aggregate performance.",
          "gate": "SRR/PDR and TRR.",
          "closure authority": "Safety/V&V authority.",
          "links": "SA-01; DM-01; DM-03; MV-03 to MV-07.",
          "residuals": "Untestable or incompletely specified properties and statistical assumptions remain explicit."
        },
        {
          "id": "MV-02",
          "source/status": "AMLAS-P3/P5 + HB40 6.4.3; inherited. Status: M all.",
          "objective": "Preserve independent acceptance data and prevent test-set tuning.",
          "inputs": "Acceptance-data baseline; access controls; tuning history; data identifiers/hashes; split rationale.",
          "owner": "V&V/QA controls the acceptance baseline; ML has only authorised access.",
          "evidence": "Access separation, immutable IDs/hashes, use history, and evidence that acceptance outcomes did not guide tuning.",
          "acceptance criterion": "Acceptance data remain independent to the declared degree; any exposure is assessed and the affected evidence is replaced or qualified.",
          "gate": "TRR.",
          "closure authority": "TRR authority.",
          "links": "CM-01; DM-04; MV-07; IV-03.",
          "residuals": "Prior exposure, repeated benchmarking, hidden dependence, and limited data availability are recorded."
        },
        {
          "id": "MV-03",
          "source/status": "AMLAS-P5 + HB40 6.4.3; ECSS test-gate mapping adapted. Status: M when simulation/testing is applicable.",
          "objective": "Generate tests and simulations from the ODD and hazard scenarios.",
          "inputs": "ODD; hazards; requirements; scenario catalogue; simulator/model credibility; oracle; target environment.",
          "owner": "V&V owner with Safety and domain experts.",
          "evidence": "Scenario catalogue, coverage rationale, simulator credibility, oracle, procedures, results, and requirement links.",
          "acceptance criterion": "Scenarios cover the justified safety-relevant conditions and have credible oracles and environments for the claimed evidence.",
          "gate": "TRR and QR.",
          "closure authority": "V&V authority.",
          "links": "DM-05; MV-01; SY-01; TR-01.",
          "residuals": "Simulator fidelity, oracle uncertainty, missing scenarios, and extrapolation to operation are documented."
        },
        {
          "id": "MV-04",
          "source/status": "HB40 6.4.3 formal-method guidance; conditionality/substitution record adapted. Status: C; N.A. when unsuitable.",
          "objective": "Use formal methods only for a defined, formalizable property.",
          "inputs": "Formal property; model abstraction; assumptions; tool support and confidence; alternative evidence plan.",
          "owner": "Formal-method/V&V specialist with Safety and model owner.",
          "evidence": "Property, abstraction, assumptions, tool record, proof/result, coverage limit, and alternative evidence.",
          "acceptance criterion": "The result is valid for the stated property and assumptions; otherwise N.A. or partial coverage is approved with adequate alternative evidence.",
          "gate": "TRR and QR.",
          "closure authority": "TRR/QR authority.",
          "links": "MV-01; MV-03; SA-02.",
          "residuals": "Abstraction gap, unsupported operators, numerical semantics, scalability, and tool confidence limits are explicit."
        },
        {
          "id": "MV-05",
          "source/status": "HB40 6.4.3 + applicable security analysis; adapted. Status: C under a credible threat model.",
          "objective": "Conduct adversarial testing only against credible threats.",
          "inputs": "Threat model; attack surface; adversary capability; perturbation constraints; safety/security consequences.",
          "owner": "Security and V&V with Safety.",
          "evidence": "Adversarial test design and results, constraint rationale, affected requirements, findings, and residual risk.",
          "acceptance criterion": "Tests represent credible attacks and demonstrate compliance or produce controlled findings; demographic fairness is not used as a substitute.",
          "gate": "TRR and QR.",
          "closure authority": "Security/Safety authority.",
          "links": "DM-07; MV-06; SA-03.",
          "residuals": "Unmodelled adversaries, unrealistic perturbations, transferability limits, and unavailable attack access are recorded."
        },
        {
          "id": "MV-06",
          "source/status": "AMLAS-P5 + HB40 6.4.3; inherited and operationalized. Status: M when these properties support the safety argument.",
          "objective": "Evaluate robustness, edge conditions, OOD behaviour, and uncertainty.",
          "inputs": "ODD/reference distribution; boundary and stress scenarios; uncertainty method; requirements; accepted data.",
          "owner": "V&V owner with ML, Safety, and domain experts.",
          "evidence": "Stratum-level results, stress/boundary tests, OOD definition, uncertainty, anomalies, and stated limits.",
          "acceptance criterion": "Results satisfy predeclared requirements by relevant stratum; OOD and uncertainty claims are defined relative to an explicit reference and limitations.",
          "gate": "QR.",
          "closure authority": "QR authority.",
          "links": "DM-05; DM-09; MV-01; MV-07; SA-03.",
          "residuals": "Unsupported ODD regions, calibration error, rare-event uncertainty, and untested perturbations are retained."
        },
        {
          "id": "MV-07",
          "source/status": "AMLAS-P5 + E40 5.6 + HB40 6.4.3; synthesized. Status: M for intended-use claims.",
          "objective": "Validate fitness for intended use by safety-relevant stratum.",
          "inputs": "Independent validation data/scenarios; ODD; requirements; uncertainty method; coverage and exposure rationale.",
          "owner": "Validation authority independent from model tuning to the required degree.",
          "evidence": "Requirement-level pass/fail evidence, results by stratum, confidence/uncertainty, coverage limits, and anomalies.",
          "acceptance criterion": "Every intended-use claim passes for the relevant strata or is restricted; aggregate performance cannot mask a failed critical stratum.",
          "gate": "QR or project-defined VVR.",
          "closure authority": "Validation authority.",
          "links": "MV-01 to MV-03; MV-06; SA-02 to SA-03; IV-05.",
          "residuals": "Low-support strata, unresolved failures, limited exposure, and domain-shift uncertainty constrain the accepted use."
        },
        {
          "id": "SV-01",
          "source/status": "E40 5.6/5.8 + HB40 6.4.4; AI implementation scope adapted. Status: M when deployed as software.",
          "objective": "Verify and validate the software implementation surrounding the model.",
          "inputs": "Pre/post-processing; interfaces; error handling; converter; runtime libraries; configuration; timing/memory and monitoring requirements.",
          "owner": "Software V&V authority with Software, CM, and Safety.",
          "evidence": "Unit/integration and target tests covering numerical behaviour, interfaces, errors, timing, memory, monitoring, and configuration.",
          "acceptance criterion": "The deployed implementation satisfies software requirements and preserves the accepted model behaviour within predeclared tolerances.",
          "gate": "CDR, TRR, and QR.",
          "closure authority": "Software V&V authority.",
          "links": "CM-02; DP-01 to DP-03; SY-01; TR-01.",
          "residuals": "Compiler/library differences, untested error paths, numerical tolerances, and resource margin limits are documented."
        },
        {
          "id": "SY-01",
          "source/status": "E40 integration/acceptance + HB40 6.4.4; synthesized. Status: M for operational acceptance.",
          "objective": "Verify and validate the integrated system function and hazard controls.",
          "inputs": "System architecture; hazards; hardware/operator/ground interfaces; fallback/safe-mode logic; representative mission scenarios.",
          "owner": "System V&V and Safety with acceptance authority participation.",
          "evidence": "HIL/system scenarios, interaction and fault-response results, fallback/safe-mode evidence, and mission-context validation.",
          "acceptance criterion": "The integrated function and hazard controls satisfy allocated requirements for the intended mission context and accepted authority boundary.",
          "gate": "QR and AR.",
          "closure authority": "System V&V/Safety and project acceptance authority.",
          "links": "SA-01 to SA-03; DP-02; DP-05; DP-07; IV-05.",
          "residuals": "Unmodelled interactions, unavailable HIL fidelity, operator assumptions, and residual system risk are recorded."
        }
      ]
    },
    {
      "key": "A16",
      "number": "A.16",
      "title": "Operational checklist: deployment, operation, fallback, and controlled change.",
      "items": [
        {
          "id": "DP-01",
          "source/status": "AMLAS-P6 + HB40 6.4.4 + Q80 CM; synthesized. Status: M when conversion occurs.",
          "objective": "Control conversion, quantization, compilation, and target libraries.",
          "inputs": "Source-model ID; converter/compiler and library versions/options; target architecture; tool confidence evidence.",
          "owner": "Software/ML Engineering with CM and V&V.",
          "evidence": "Conversion manifest, target binary ID, tests, numerical-difference analysis, checksums, and tool-confidence record.",
          "acceptance criterion": "The target artefact is traceable to the accepted model and any numerical/decision differences remain within predeclared limits.",
          "gate": "CDR, QR, and AR.",
          "closure authority": "Software/CM/V&V authority.",
          "links": "CM-02; SV-01; DP-03 to DP-04; TR-01.",
          "residuals": "Unsupported operators, quantization loss, compiler/library variability, and tool limitations are retained."
        },
        {
          "id": "DP-02",
          "source/status": "E40 verification/acceptance + HB40 6.4.4; adapted. Status: M when resource or timing constraints exist.",
          "objective": "Verify timing, memory, compute, power, and interface budgets on representative target hardware.",
          "inputs": "Target platform; budgets; scheduling/interface constraints; representative workload and environment; acceptance limits.",
          "owner": "Software/System V&V with platform owner.",
          "evidence": "Worst-case or justified representative measurements, margins, environment record, anomalies, and requirement results.",
          "acceptance criterion": "Measured or analytically bounded resource use satisfies predeclared limits with approved margin and no unacceptable interference.",
          "gate": "QR and AR.",
          "closure authority": "Software/System authority.",
          "links": "SV-01; SY-01; DP-03; SA-03.",
          "residuals": "Measurement coverage, environment differences, worst-case assumptions, and remaining margin uncertainty are explicit."
        },
        {
          "id": "DP-03",
          "source/status": "AMLAS-P6 + HB40 6.4.4; tolerance/decision link adapted. Status: M for migrated models.",
          "objective": "Demonstrate host-to-target behavioural equivalence or a bounded difference.",
          "inputs": "Accepted host model; target binary; paired scenarios; numerical and timing tolerances; safety-decision equivalence rule.",
          "owner": "V&V with Software/ML and Safety.",
          "evidence": "Paired host/target results, tolerance analysis, safety-decision comparison, unexplained differences, and restrictions.",
          "acceptance criterion": "Differences are within predeclared numerical/timing bounds and do not alter accepted safety-relevant decisions, or use is restricted.",
          "gate": "QR.",
          "closure authority": "V&V/Safety authority.",
          "links": "DP-01 to DP-02; SV-01; MV-07.",
          "residuals": "Unexplained mismatch, non-bit-identical execution, platform nondeterminism, and untested scenarios are documented."
        },
        {
          "id": "DP-04",
          "source/status": "E40 5.7/5.10 + Q80 6.2.4; AI release content adapted. Status: M all.",
          "objective": "Make release construction, installation, and rollback reproducible.",
          "inputs": "Qualified sources and artefacts; build environment; target configuration; installation procedure; rollback image and authority.",
          "owner": "CM and Release Engineering with acceptance authority.",
          "evidence": "Release manifest, source-to-binary links, environment, checksums, installation/rollback procedures, image, and approval.",
          "acceptance criterion": "The released configuration is uniquely identified, reproducible, installable, and recoverable through an approved rollback path.",
          "gate": "AR.",
          "closure authority": "CM and project acceptance authority.",
          "links": "CM-02; FR-06; DP-01 to DP-03; TR-01.",
          "residuals": "Irreversible updates, supplier dependencies, rollback timing, and unavailable previous images are explicit constraints."
        },
        {
          "id": "DP-05",
          "source/status": "AMLAS-P6 + E40 5.9; monitoring-decision record introduced. Status: C.",
          "objective": "Define monitoring according to observability, telemetry, mission constraints, and safety reliance.",
          "inputs": "Monitoring objective; observable signals; thresholds; false-alarm/missed-detection trade-off; telemetry; response and retention constraints.",
          "owner": "Operations and Safety with Software/System Engineering.",
          "evidence": "Monitoring decision, signal/threshold specification, response procedure, retention, validation evidence, and limitations.",
          "acceptance criterion": "The selected monitoring supports its stated safety/operational claim and has validated response logic; alternatives or N.A. are justified.",
          "gate": "AR and project-defined ORR.",
          "closure authority": "Operations/Safety authority.",
          "links": "TR-02; SY-01; DP-08; SA-03.",
          "residuals": "Unobservable degradation, detection latency, false alarms, telemetry gaps, and ground-contact limits are retained."
        },
        {
          "id": "DP-06",
          "source/status": "E40 5.10 + AMLAS-P6; ML-specific triggers adapted. Status: M for the policy; implementation is conditional.",
          "objective": "Define maintenance, retraining, threshold, data, and platform change controls.",
          "inputs": "Update policy; permitted changes; impact-analysis rules; regression/re-review triggers; rollback and obsolescence plan.",
          "owner": "CCB with Engineering, CM, V&V, Safety, PA, and Operations.",
          "evidence": "Approved change policy identifying authority, triggers, affected evidence, regression depth, re-review, rollback, and end-of-life controls.",
          "acceptance criterion": "No change can enter operation without authorised impact assessment and the regression/review required by affected claims and configurations.",
          "gate": "AR and CCB; affected gates as triggered.",
          "closure authority": "CCB/project authority.",
          "links": "CM-03; DP-04; DP-08; SA-02 to SA-03; IV-06.",
          "residuals": "Unsupported updates, unavailable retraining data, platform obsolescence, and delayed requalification are documented."
        },
        {
          "id": "DP-07",
          "source/status": "HB40 6.4.4 + system safety analysis; conditional allocation adapted. Status: C.",
          "objective": "Select redundancy, fallback, or a safety cage only where justified by the architecture and hazards.",
          "inputs": "Hazards; controllability; safety authority; compensating provisions; observability; latency/resources; transition/failure modes.",
          "owner": "System Safety and Architecture owners with V&V.",
          "evidence": "Trade-off and design record covering independence, coverage, latency, resources, transitions, failure modes, and tests.",
          "acceptance criterion": "The selected provision demonstrably reduces the relevant risk without introducing unacceptable common-cause, transition, or resource hazards.",
          "gate": "PDR, CDR, and QR.",
          "closure authority": "System Safety authority.",
          "links": "SC-01; SY-01; DP-02; SA-01 to SA-03.",
          "residuals": "Coverage gaps, common-cause risk, unavailable redundancy, unsafe transitions, and fallback limits are retained."
        },
        {
          "id": "DP-08",
          "source/status": "E40 5.9 to 5.10 + Q80 finding/CM processes; synthesized. Status: M for observed material anomalies.",
          "objective": "Control operational anomalies and reopen affected evidence.",
          "inputs": "Anomaly report; affected configuration; telemetry/logs; requirement/claim links; containment and investigation data.",
          "owner": "Operations and CCB/project authority with Engineering, V&V, Safety, and PA.",
          "evidence": "Anomaly record, containment, root-cause investigation, corrective action, regression, traceability, and release decision.",
          "acceptance criterion": "Material anomalies are contained and traced; affected evidence is reopened; corrective or limitation decisions are independently reviewed as required.",
          "gate": "Operations review, CCB, and any reopened gate.",
          "closure authority": "Operations/CCB/project authority.",
          "links": "TR-02; CM-03; DP-05 to DP-06; SA-03; IV-06.",
          "residuals": "Unknown cause, incomplete telemetry, deferred correction, recurrence risk, and operational restrictions remain explicit."
        }
      ]
    },
    {
      "key": "A17",
      "number": "A.17",
      "title": "Operational checklist: safety argument, normative status, and IMVV.",
      "items": [
        {
          "id": "SA-01",
          "source/status": "AMLAS-P1/P2 + E40 requirements + Q80 safety; synthesized. Status: M for safety-relevant use.",
          "objective": "Link hazards and system controls to ML, data, software, integration, and monitoring requirements.",
          "inputs": "Hazard analysis; system controls; ODD; architecture; allocated ML/software/system requirements; monitoring/fallback concept.",
          "owner": "System Safety with Systems Engineering and PA.",
          "evidence": "Bidirectional hazard-to-requirement-to-evidence links and allocation rationale.",
          "acceptance criterion": "Every safety-relevant hazard/control has complete and configuration-consistent allocations to the evidence chain or an approved rationale.",
          "gate": "SRR and PDR; rechecked through AR.",
          "closure authority": "Safety authority.",
          "links": "SC-01; TR-01; DM-01; MV-01; SY-01; DP-05 to DP-07.",
          "residuals": "Unallocated controls, assumptions, weak compensating provisions, and incomplete propagation analysis are explicit."
        },
        {
          "id": "SA-02",
          "source/status": "AMLAS assurance argument; ECSS gate allocation adapted. Status: M for Category B and any Category A extension; C otherwise by risk.",
          "objective": "Construct an explicit claim-context-assumption-strategy-evidence argument.",
          "inputs": "Hazards; ODD; requirements; evidence baselines; assumptions; findings; limitations; decision-authority model.",
          "owner": "Safety-case owner with PA, V&V, Engineering, and IMVV input.",
          "evidence": "Claim/evidence matrix or equivalent argument, contexts, assumptions, defeaters/limitations, findings, and authority record.",
          "acceptance criterion": "Each claim is supported by controlled evidence within its stated context; open defeaters and limitations are visible to the decision authority.",
          "gate": "QR and AR.",
          "closure authority": "Designated QR/AR authority.",
          "links": "SA-01; TR-01; MV-07; SY-01; IV-05 to IV-06.",
          "residuals": "Unsupported claims, invalidated assumptions, evidence gaps, and scope restrictions remain explicit."
        },
        {
          "id": "SA-03",
          "source/status": "AMLAS risk rationale + Q80 dependability/safety; decision tuple adapted. Status: M when residual safety risk exists.",
          "objective": "Record residual uncertainty, limitations, restrictions, and risk acceptance.",
          "inputs": "Evidence gaps; anomalies/findings; uncertainty; operational restrictions; compensating provisions; waiver proposals.",
          "owner": "Safety/PA prepares; project/customer risk authority decides.",
          "evidence": "Residual-risk record linking limitations, restrictions, compensating provisions, waivers, configuration, and sign-off.",
          "acceptance criterion": "Every accepted residual risk is traceable, bounded to a configuration/ODD, and signed by the authorised risk owner.",
          "gate": "QR and AR; reopened after a material change or anomaly.",
          "closure authority": "Project/customer risk authority.",
          "links": "FR-05 to FR-06; CM-03; DP-05 to DP-08; IV-06.",
          "residuals": "Unknown uncertainty, unverified mitigations, conditional acceptance, and waiver expiry remain visible."
        },
        {
          "id": "SA-04",
          "source/status": "ECSS contractual/tailoring principle; provenance field introduced. Status: M all.",
          "objective": "Mark each control as a contractual requirement, source guidance, or Aerosafe recommendation.",
          "inputs": "Applicable contractual baseline and tailoring record; cited ECSS/AMLAS clauses; project policies; checklist item.",
          "owner": "PA/QA with the process owner.",
          "evidence": "Completed source/status field citing the exact project clause or documenting guidance/recommendation and tailoring rationale.",
          "acceptance criterion": "No checklist item is presented as normative without an applicable source; every deviation or recommendation has an explicit status and rationale.",
          "gate": "Checked at every gate.",
          "closure authority": "Relevant gate authority.",
          "links": "All items; especially Table 7 and project compliance matrix.",
          "residuals": "Ambiguous normativity, superseded clauses, contract-specific interpretations, and unresolved tailoring remain explicit."
        },
        {
          "id": "IV-01",
          "source/status": "Q80 6.2.6.13 and 6.3.5.28; AI activation factors adapted. Status: C and risk-triggered.",
          "objective": "Decide and plan whether independent V&V is activated for the AI-specific evidence scope.",
          "inputs": "Criticality and hazard rationale; AI authority; novelty; uncertainty; compensating provisions; contractual needs; assurance plan.",
          "owner": "PA/project authority with the proposed IMVV lead.",
          "evidence": "ISVV/IMVV activation decision and plan defining scope, roles, inputs, methods, deliverables, interfaces, and finding process.",
          "acceptance criterion": "Activation or non-activation is justified by risk and contract; the approved plan is independent, feasible, and traceable to the assurance scope.",
          "gate": "SRR/PDR.",
          "closure authority": "Project/PA authority.",
          "links": "SC-01; FR-01 to FR-02; SA-01; IV-02 to IV-06.",
          "residuals": "Unresolved criticality, limited access, resource constraints, or excluded evidence areas are recorded in the plan."
        },
        {
          "id": "IV-02",
          "source/status": "Q80 independent-V&V provisions; three-dimension record introduced. Status: M when IMVV is activated.",
          "objective": "Record organisational independence.",
          "inputs": "Organisation chart; contracts; reporting lines; conflicts; access rights; safeguards against self-approval.",
          "owner": "PA/customer authority with IMVV management.",
          "evidence": "Independence statement covering reporting, contractual separation, conflicts, access, and escalation routes.",
          "acceptance criterion": "IMVV personnel are not accountable for the development decisions they review and have protected access and escalation channels.",
          "gate": "Plan approval at SRR/PDR.",
          "closure authority": "PA/customer authority.",
          "links": "IV-01; IV-04; project RACI/authority matrix.",
          "residuals": "Shared management, funding dependence, unavailable expertise, conflicts, and access restrictions are disclosed and mitigated."
        },
        {
          "id": "IV-03",
          "source/status": "Q80 independent-V&V provisions + AMLAS evidence challenge; adapted. Status: M when IMVV is activated.",
          "objective": "Record technical independence.",
          "inputs": "Controlled datasets; scripts/tools; model/software/target artefacts; reproduction plan; sampling strategy; tool access.",
          "owner": "IMVV lead with independent CM/QA support.",
          "evidence": "Independent baseline, tools/scripts or justified alternatives, reproduction/sampling record, and limits to independence.",
          "acceptance criterion": "The independent team can reproduce or challenge the scoped evidence from controlled inputs without relying solely on developer interpretation.",
          "gate": "TRR and QR.",
          "closure authority": "IMVV/PA and designated review authority.",
          "links": "CM-01 to CM-02; MV-02; DP-01 to DP-03; IV-05.",
          "residuals": "Unavailable proprietary tools/data, shared scripts, sampling limits, and unreproduced results are recorded."
        },
        {
          "id": "IV-04",
          "source/status": "Q80 finding/independent-review intent; explicit separation introduced. Status: M when IMVV is activated.",
          "objective": "Record decisional independence and formal closure authority.",
          "inputs": "RACI/authority matrix; review plan; finding process; waiver and risk-acceptance rules.",
          "owner": "PA/project authority.",
          "evidence": "Authority matrix distinguishing evidence owner, reviewer, finding owner, disposition proposer, waiver authority, and formal closer.",
          "acceptance criterion": "No evidence owner can unilaterally close the independent finding or accept its residual risk; escalation and waiver paths are named.",
          "gate": "All relevant gates.",
          "closure authority": "Project/customer authority.",
          "links": "FR-01 to FR-06; SA-03; IV-02; IV-06.",
          "residuals": "Role overlap, delegated authority, absent customer participation, and emergency dispositions are explicitly controlled."
        },
        {
          "id": "IV-05",
          "source/status": "AMLAS-P1 to P6 + Q80 independent V&V; AI evidence scope introduced/adapted. Status: C according to the IV-01 scope.",
          "objective": "Independently challenge the AI-specific evidence chain.",
          "inputs": "Scoped requirements; ODD; data/labels; model/pipeline; converters; target evidence; interfaces; monitoring; claims and traceability.",
          "owner": "IMVV team; developers provide artefacts and responses.",
          "evidence": "Independent reviews, reproductions, samples, challenge records, findings, affected configurations/claims, and recommendation.",
          "acceptance criterion": "The approved IMVV scope is covered; departures and unsupported claims are raised as traceable findings rather than silently accepted.",
          "gate": "QR and AR, with earlier reviews as planned.",
          "closure authority": "IMVV reports; designated authority decides.",
          "links": "TR-01; SA-02; MV-07; SV-01; SY-01; DP-01 to DP-08.",
          "residuals": "Excluded artefacts, limited samples, unreproduced evidence, unresolved findings, and scope constraints remain visible."
        },
        {
          "id": "IV-06",
          "source/status": "Q80 independent-V&V report/finding provisions; AI claim linkage adapted. Status: M for every raised finding.",
          "objective": "Manage IMVV findings to auditable closure.",
          "inputs": "Finding log; severity; affected configuration/claims; owner; corrective action; retest/review; waiver and closure records.",
          "owner": "PA controls the process; action owners respond; IMVV verifies; designated authority closes.",
          "evidence": "Finding record, corrective evidence, independent retest/review, disposition, waiver or closure signature, and traceability update.",
          "acceptance criterion": "Every finding has complete provenance and an authorised disposition; a gate cannot close contrary to the applicable project rules.",
          "gate": "Relevant gate, especially QR/AR.",
          "closure authority": "Designated project/customer authority.",
          "links": "TR-01; FR-05 to FR-06; SA-02 to SA-03; CM-03; DP-08.",
          "residuals": "Open findings, conditional waivers, incomplete retest, recurring defects, and accepted limitations remain linked to release acceptance."
        }
      ]
    }
  ],
  "imvv_case": {
    "title": "Representative end-to-end IMVV flow for AI-augmented spacecraft FDIR",
    "case_boundary": [
      {
        "element": "Published detector baseline",
        "configuration": "Spacecraft attitude-sensor stuck-value detection using XGBoost and a multi-channel CNN; published precision/recall results and discussion of interpretability, generalisation, and constrained onboard resources.",
        "evidence_status": "Published model-level evidence only; no controlled ECSS project baseline or signed acceptance record is available in the cited paper.",
        "imvv_implication": "IMVV can challenge the published claims, but cannot relabel publication-level metrics as qualification evidence."
      },
      {
        "element": "Authority extension",
        "configuration": "Author-defined path from detection and diagnosis to direct isolation of a failed channel and activation of a redundant sensor; Tappe et al. are used only as contextual evidence for supervised diagnosis/reconfiguration/supervision.",
        "evidence_status": "The autonomous spacecraft reconfiguration is not a reported implementation in either source.",
        "imvv_implication": "The independent scope expands from model performance to action selection, sequencing, state continuity, backup health, fallback, and post-action verification."
      },
      {
        "element": "Hazard groups",
        "configuration": "H-FDIR-01 to 03: missed/false/misattributed detection; H-FDIR-04 to 06: recovery choice, sequencing/state transfer, and redundant-unit health; H-FDIR-07 to 10: configuration integrity, AI/conventional-FDIR disagreement, target resources, and post-action verification.",
        "evidence_status": "Identifiers and groupings are author-defined analytical constructs, not official hazards of the source projects.",
        "imvv_implication": "They provide the traceability spine for independent sampling, findings, and claim challenge."
      },
      {
        "element": "Activation rationale",
        "configuration": "Direct recovery authority, novelty, uncertainty, incomplete public evidence, and dependence on compensating provisions are treated as strong indicators for independent challenge.",
        "evidence_status": "No ECSS software category is inferred; authoritative criticality remains a project input.",
        "imvv_implication": "IV-01 is configured as activated for the representative analytical flow, without claiming a real project approval."
      },
      {
        "element": "Qualification boundary",
        "configuration": "The candidate system claim G-FDIR-1 covers the declared ODD and assigned authority, subject to system-safety constraints and project acceptance.",
        "evidence_status": "Public evidence is insufficient to close the claim, particularly for autonomous recovery and independent closure.",
        "imvv_implication": "The execution table must end with open findings and no qualification-success claim."
      }
    ],
    "construction": [
      {
        "item": "IV-01",
        "source_status_objective": "Q80 independent-V&V provisions, adapted to AI evidence. Conditional control configured as activated: plan an independent challenge of the detector-to-reconfiguration evidence chain.",
        "inputs_owner": "Inputs: H-FDIR-01 to 10, ODD/authority concept, preliminary G-FDIR-1 argument, data/model/target plans. Owner: PA with the IMVV lead.",
        "criterion": "The plan names the independent scope, methods, artefacts, interfaces, deliverables, escalation, and finding process.",
        "gate_closure": "SRR/PDR; project/PA authority approves activation.",
        "links_residuals": "Links: SC-01, SA-01, G-FDIR-1. Residual: criticality and contractual scope remain project inputs."
      },
      {
        "item": "IV-02",
        "source_status_objective": "Q80 independence provisions; Minimum once IMVV is activated. Configure organisational independence and protected escalation.",
        "inputs_owner": "Inputs: organisation chart, reporting/contract lines, conflict declarations, access routes. Owner: PA/customer authority with IMVV management.",
        "criterion": "Reviewers are not accountable for the development decisions they assess and have protected access and escalation channels.",
        "gate_closure": "SRR/PDR; PA/customer authority accepts the arrangement.",
        "links_residuals": "Links: IV-01, IV-04. Residual: shared management, limited expertise, or access constraints must be disclosed and mitigated."
      },
      {
        "item": "IV-03",
        "source_status_objective": "Q80 plus AMLAS evidence challenge; Minimum once activated. Configure technical independence for data, scripts, tools, model, target, and sampling.",
        "inputs_owner": "Inputs: controlled data/model/software/target baselines, reproduction and sampling plan, tool access. Owner: IMVV lead with independent CM/QA.",
        "criterion": "The independent team can reproduce or challenge scoped evidence from controlled inputs; any limits are justified before execution.",
        "gate_closure": "TRR/QR; IMVV/PA and the designated review authority accept readiness/results.",
        "links_residuals": "Links: CM-01/02, MV-02, DP-01 to 03. Residual: proprietary or unavailable artefacts constrain the claim scope."
      },
      {
        "item": "IV-04",
        "source_status_objective": "Q80 finding intent; Minimum once activated. Configure decisional independence and formal finding/waiver closure paths.",
        "inputs_owner": "Inputs: RACI/authority matrix, review plan, finding and waiver process. Owner: PA/project authority.",
        "criterion": "Evidence owner, independent reviewer, disposition proposer, waiver authority, and formal closer are explicitly separated.",
        "gate_closure": "All relevant gates; project/customer authority closes findings and risk decisions.",
        "links_residuals": "Links: FR-01 to 06, SA-03, IV-06. Residual: role overlap or delegated authority is explicitly controlled."
      },
      {
        "item": "IV-05",
        "source_status_objective": "AMLAS-P1 to P6 plus Q80; scope adapted. Configure independent challenge of requirements, ODD, data, model, target, FDIR integration, monitoring, and claims.",
        "inputs_owner": "Inputs: complete scoped evidence chain and traceability graph. Owner: IMVV team; development owners supply artefacts and responses.",
        "criterion": "The approved scope is sampled/reproduced and every unsupported claim or departure is recorded as a configuration-linked finding.",
        "gate_closure": "QR/AR, with earlier reviews as planned; IMVV reports and the designated authority decides.",
        "links_residuals": "Links: TR-01, SA-02, MV-07, SV-01, SY-01, DP-01 to 08. Residual: exclusions and sampling limits remain visible."
      },
      {
        "item": "IV-06",
        "source_status_objective": "Q80 finding/report provisions; Minimum for every raised finding. Configure auditable correction, independent retest/review, waiver, and closure.",
        "inputs_owner": "Inputs: finding log, severity, affected configurations/claims, corrective evidence, retest, waiver. Owner: PA controls; action owners respond; IMVV verifies.",
        "criterion": "Every finding has complete provenance and an authorised disposition; a gate cannot close contrary to project rules.",
        "gate_closure": "Relevant gate, especially QR/AR; designated project/customer authority closes.",
        "links_residuals": "Links: FR-05/06, SA-02/03, CM-03, DP-08. Residual: open findings or conditional waivers remain attached to release acceptance."
      }
    ],
    "execution": [
      {
        "item": "IV-01",
        "evidence_result": "The public detector papers, author-defined H-FDIR hazard groups, direct-reconfiguration authority extension, and preliminary G-FDIR-1 claim were reviewed.",
        "decision_finding": "Analytical decision: activate IMVV because direct action authority and incomplete system evidence create a material independent-challenge need.",
        "gate_closure": "Configured at SRR/PDR for the example; no real project/PA approval is available, so this is not an industrial closure.",
        "links": "H-FDIR-01 to 10; G-FDIR-1; SC-01; SA-01.",
        "residuals": "Authoritative criticality, contractual scope, staffing, and budget remain unknown project inputs."
      },
      {
        "item": "IV-02",
        "evidence_result": "The publications do not report reporting lines, contractual separation, conflict declarations, or protected escalation for an independent team.",
        "decision_finding": "F-IMVV-01: organisational independence is not demonstrated for the reconstructed case.",
        "gate_closure": "Open at PDR; only a project/customer authority could accept the arrangement.",
        "links": "IV-01; IV-04; proposed RACI/authority matrix.",
        "residuals": "Independence cannot be inferred from author affiliation or peer review."
      },
      {
        "item": "IV-03",
        "evidence_result": "Published data/model descriptions and metrics are available, but no immutable acceptance-data baseline, independent scripts, target binary, or reproducibility package is available in the source evidence used here.",
        "decision_finding": "F-IMVV-02: technical independence and independent reproduction are not established.",
        "gate_closure": "Open at TRR/QR; the independent baseline and readiness criteria are unmet.",
        "links": "CM-01/02; MV-02; DP-01 to 03.",
        "residuals": "Model-level results remain publication evidence, not controlled acceptance evidence."
      },
      {
        "item": "IV-04",
        "evidence_result": "Aerosafe defines separate evidence-owner, reviewer, disposition, waiver, and closure roles, but no source-project RACI, waiver path, or signed closure record is publicly available.",
        "decision_finding": "F-IMVV-03: decisional independence and closure authority are not evidenced for the case.",
        "gate_closure": "Open across QR/AR; no independent finding may be treated as closed by the evidence owner.",
        "links": "FR-05/06; SA-03; IV-06.",
        "residuals": "The analytical role model is a configuration proposal, not evidence that the source projects used it."
      },
      {
        "item": "IV-05",
        "evidence_result": "The independent challenge can examine reported precision/recall and model limitations, but hazard-derived thresholds, partition lineage, target equivalence, FDIR arbitration, recovery sequencing, backup health, timing/non-interference, and post-action verification are not established for autonomous use.",
        "decision_finding": "F-IMVV-04: model metrics are insufficient for the system claim. F-IMVV-05: autonomous-reconfiguration evidence is absent because the function is an analytical extension.",
        "gate_closure": "QR/AR recommendation: do not close G-FDIR-1 for autonomous authority; restrict the claim to the evidence actually available.",
        "links": "G-FDIR-1.1 to 1.8; MV-07; SV-01; SY-01; DP-01 to 08; SA-02.",
        "residuals": "Detection performance, recovery correctness, target behaviour, fallback, and monitoring remain distinct evidence obligations."
      },
      {
        "item": "IV-06",
        "evidence_result": "No project finding log, corrective-action evidence, independent retest, waiver, or signed QR/AR closure exists in the public record for this reconstructed flow.",
        "decision_finding": "F-IMVV-01 to 05 remain open in the analytical record; no waiver or closure is asserted.",
        "gate_closure": "The representative flow ends with QR/AR blocked for the autonomous claim; only a designated project/customer authority could later close or conditionally accept it.",
        "links": "TR-01; FR-05/06; SA-02/03; G-FDIR-1.",
        "residuals": "The case illustrates evidence structuring and closure discipline; it does not demonstrate qualification success, ECSS compliance, or operational effectiveness."
      }
    ],
    "generalization": [
      {
        "principle": "Model evidence is not system qualification evidence",
        "case_observation": "Published detector metrics support a model-test claim but do not establish safe isolation, recovery sequencing, target timing, fallback, or post-action verification.",
        "transferable_rule": "Keep model, software, system, operational, and independent-assessment evidence distinct and linked through explicit claims.",
        "project_specific": "Thresholds, exposure, test environments, criticality, and acceptance decisions."
      },
      {
        "principle": "Decision authority escalates assurance scope",
        "case_observation": "An advisory flag requires less recovery evidence than an AI output that directly initiates reconfiguration.",
        "transferable_rule": "Configure the checklist from the authority boundary, hazards, observability, and compensating provisions rather than model architecture alone.",
        "project_specific": "Actual action authority, fallback independence, redundancy, mission constraints, and system-safety allocation."
      },
      {
        "principle": "ECSS and AMLAS contribute different control structures",
        "case_observation": "ECSS supplies reviews, configuration/product assurance, findings, and decision authority; AMLAS supplies the ML assurance lifecycle and claim-evidence logic.",
        "transferable_rule": "Aerosafe uses ECSS governance as the operational frame and AMLAS reasoning for AI-specific evidence without claiming to replace either source.",
        "project_specific": "Contractual clauses, tailoring, review names, PA/QA roles, and customer authority."
      },
      {
        "principle": "Construction and execution must remain separate",
        "case_observation": "The configured IV-01 to IV-06 rows define what must be reviewed; the execution rows record what was actually available, what failed, and who could close it.",
        "transferable_rule": "Predeclare the tuple before review, then preserve evidence, decisions, findings, links, residuals, and closure status as an auditable execution record.",
        "project_specific": "Evidence owners, independent team, finding severity, corrective action, waiver, and closure date/signature."
      }
    ],
    "application": [
      {
        "item": "IV-01",
        "instantiated_focus": "Activate and plan an independent challenge of the detector-to-reconfiguration evidence chain; predeclare scope, methods, artefacts, escalation, and finding process.",
        "evidence_reviewed": "The public detector papers, author-defined H-FDIR hazard groups, direct-reconfiguration authority extension, and preliminary G-FDIR-1 claim were reviewed.",
        "outcome": "Analytical decision: activate IMVV because direct action authority and incomplete system evidence create a material independent-challenge need.",
        "closure_residual": "Configured at SRR/PDR for the example; no real project/PA approval is available, so this is not an industrial closure. Residuals: Authoritative criticality, contractual scope, staffing, and budget remain unknown project inputs."
      },
      {
        "item": "IV-02",
        "instantiated_focus": "Establish organisational independence, access, conflict controls, and protected escalation.",
        "evidence_reviewed": "The publications do not report reporting lines, contractual separation, conflict declarations, or protected escalation for an independent team.",
        "outcome": "F-IMVV-01: organisational independence is not demonstrated for the reconstructed case.",
        "closure_residual": "Open at PDR; only a project/customer authority could accept the arrangement. Residuals: Independence cannot be inferred from author affiliation or peer review."
      },
      {
        "item": "IV-03",
        "instantiated_focus": "Establish technical independence for controlled data, scripts, tools, model, target, reproduction, and sampling.",
        "evidence_reviewed": "Published data/model descriptions and metrics are available, but no immutable acceptance-data baseline, independent scripts, target binary, or reproducibility package is available in the source evidence used here.",
        "outcome": "F-IMVV-02: technical independence and independent reproduction are not established.",
        "closure_residual": "Open at TRR/QR; the independent baseline and readiness criteria are unmet. Residuals: Model-level results remain publication evidence, not controlled acceptance evidence."
      },
      {
        "item": "IV-04",
        "instantiated_focus": "Separate evidence ownership, independent review, disposition, waiver, and formal closure authority.",
        "evidence_reviewed": "Aerosafe defines separate evidence-owner, reviewer, disposition, waiver, and closure roles, but no source-project RACI, waiver path, or signed closure record is publicly available.",
        "outcome": "F-IMVV-03: decisional independence and closure authority are not evidenced for the case.",
        "closure_residual": "Open across QR/AR; no independent finding may be treated as closed by the evidence owner. Residuals: The analytical role model is a configuration proposal, not evidence that the source projects used it."
      },
      {
        "item": "IV-05",
        "instantiated_focus": "Challenge requirements, ODD, data, model, target, FDIR integration, monitoring, and claim-evidence links.",
        "evidence_reviewed": "The independent challenge can examine reported precision/recall and model limitations, but hazard-derived thresholds, partition lineage, target equivalence, FDIR arbitration, recovery sequencing, backup health, timing/non-interference, and post-action verification are not established for autonomous use.",
        "outcome": "F-IMVV-04: model metrics are insufficient for the system claim. F-IMVV-05: autonomous-reconfiguration evidence is absent because the function is an analytical extension.",
        "closure_residual": "QR/AR recommendation: do not close G-FDIR-1 for autonomous authority; restrict the claim to the evidence actually available. Residuals: Detection performance, recovery correctness, target behaviour, fallback, and monitoring remain distinct evidence obligations."
      },
      {
        "item": "IV-06",
        "instantiated_focus": "Control finding provenance, corrective action, independent retest/review, waiver, and authorised closure.",
        "evidence_reviewed": "No project finding log, corrective-action evidence, independent retest, waiver, or signed QR/AR closure exists in the public record for this reconstructed flow.",
        "outcome": "F-IMVV-01 to 05 remain open in the analytical record; no waiver or closure is asserted.",
        "closure_residual": "The representative flow ends with QR/AR blocked for the autonomous claim; only a designated project/customer authority could later close or conditionally accept it. Residuals: The case illustrates evidence structuring and closure discipline; it does not demonstrate qualification success, ECSS compliance, or operational effectiveness."
      }
    ]
  },
  "guided_use": {
    "storage_key": "aerosafe-guided-record-v2",
    "title": "Aerosafe transparent project recommender and checklist record",
    "intro": "Answer the project-characteristic questions, review the deterministic group recommendations, record project tailoring decisions, then complete separate construction, execution, closure, and conformity records. Recommendations are advisory and never replace contractual tailoring, safety analysis, or authority approval.",
    "project_fields": [
      {
        "id": "record_id",
        "label": "Record identifier",
        "type": "text",
        "required": true,
        "placeholder": "e.g., ASF-PROJ-001"
      },
      {
        "id": "project_name",
        "label": "Project / programme",
        "type": "text",
        "required": true,
        "placeholder": "Project name"
      },
      {
        "id": "system_item",
        "label": "System or software item",
        "type": "text",
        "required": true,
        "placeholder": "Item under assurance"
      },
      {
        "id": "organisation",
        "label": "Organisation",
        "type": "text",
        "required": false,
        "placeholder": "Organisation or consortium"
      },
      {
        "id": "baseline",
        "label": "Applicable ECSS / contractual baseline",
        "type": "textarea",
        "required": true,
        "placeholder": "Standards, contractual clauses, tailoring and compliance-matrix references"
      },
      {
        "id": "review_plan",
        "label": "Review plan and gates",
        "type": "textarea",
        "required": true,
        "placeholder": "SRR, PDR, CDR, TRR, QR, AR and project-defined reviews"
      },
      {
        "id": "criticality",
        "label": "Criticality rationale / SCAR reference",
        "type": "textarea",
        "required": true,
        "placeholder": "Authoritative category input, failure propagation and compensating provisions"
      },
      {
        "id": "ai_boundary",
        "label": "AI/ML boundary and decision authority",
        "type": "textarea",
        "required": true,
        "placeholder": "Inputs, outputs, interfaces, advisory/direct action authority"
      },
      {
        "id": "odd",
        "label": "Operational Design Domain (ODD)",
        "type": "textarea",
        "required": true,
        "placeholder": "Modes, environments, assumptions, limits and exclusions"
      },
      {
        "id": "hazard_refs",
        "label": "Hazard and safety references",
        "type": "textarea",
        "required": true,
        "placeholder": "Hazard log, SFMEA, safety requirements and claim identifiers"
      },
      {
        "id": "prepared_by",
        "label": "Prepared by",
        "type": "text",
        "required": true,
        "placeholder": "Name / role"
      },
      {
        "id": "record_date",
        "label": "Record date",
        "type": "date",
        "required": true,
        "placeholder": ""
      }
    ],
    "steps": [
      {
        "id": "context",
        "number": "1",
        "title": "Establish project context and qualification boundary",
        "user_action": "Record the applicable ECSS/contractual baseline, review plan, AI/ML boundary, ODD, hazards, criticality rationale, action authority, interfaces, and compensating provisions.",
        "record": "Project and item identifiers; standards/tailoring references; review gates; SCAR/SFMEA or equivalent references; ODD; authority and interface description.",
        "completion": "All mandatory context fields are completed and their configuration-controlled sources are identified before controls are tailored.",
        "checks": [
          {
            "id": "context_sources",
            "label": "The contractual and ECSS sources are identified and their normative status is clear."
          },
          {
            "id": "context_boundary",
            "label": "The AI/ML boundary, interfaces, ODD, hazards, and action authority are explicit."
          },
          {
            "id": "context_control",
            "label": "The context record has an owner, identifier, date, and controlled source references."
          }
        ]
      },
      {
        "id": "scope",
        "number": "2",
        "title": "Obtain recommendations and tailor checklist groups",
        "user_action": "Answer the project-characteristic questions, review the transparent group recommendations, and then record an include/exclude decision and rationale for each of the nine named checklist groups.",
        "record": "Recommendation answers and reasons; group decision and rationale; selected item IDs; M/C/N.A. decisions; substitutions and approval route.",
        "completion": "Every named checklist group has an explicit project decision. Recommended groups that are excluded, and all N.A. decisions, have a recorded rationale and intended approval route.",
        "checks": [
          {
            "id": "scope_recommender",
            "label": "The recommender questions have been answered and the generated reasons have been reviewed."
          },
          {
            "id": "scope_groups",
            "label": "All nine named checklist groups have an explicit include or exclude decision."
          },
          {
            "id": "scope_rationale",
            "label": "Departures from recommendations, exclusions, and N.A. controls have a rationale and approval route."
          }
        ]
      },
      {
        "id": "configure",
        "number": "3",
        "title": "Configure the checklist before judging evidence",
        "user_action": "Complete the construction and traceability view for every applicable control and baseline it before execution.",
        "record": "Source/status, objective, inputs, owner, planned evidence, acceptance criterion, gate, closure authority, traceability links, and residual-treatment rule.",
        "completion": "Every applicable control has a confirmed owner, gate, closure authority, planned evidence reference, and tailoring rationale where needed; the construction record is frozen before execution.",
        "checks": [
          {
            "id": "configure_tuple",
            "label": "The construction and traceability fields are available for each applicable control."
          },
          {
            "id": "configure_authority",
            "label": "Evidence ownership and formal closure authority are separate where independence applies."
          },
          {
            "id": "configure_baseline",
            "label": "The configured checklist has been baselined before results are assessed."
          }
        ]
      },
      {
        "id": "execute",
        "number": "4",
        "title": "Execute the checklist against controlled evidence",
        "user_action": "Review or test the controlled baseline and record the actual result for each applicable control.",
        "record": "Evidence references and configuration IDs; result; decision/finding/NCR/waiver; gate status; traceability links; residuals; execution confirmation.",
        "completion": "Every applicable control has a result and traceable evidence or an explicit finding/blocker; missing evidence is not recorded as a pass.",
        "checks": [
          {
            "id": "execute_baseline",
            "label": "Evidence, tools, data, models, software, and target artefacts are configuration identified."
          },
          {
            "id": "execute_findings",
            "label": "Failures, blockers, deviations, and missing evidence are recorded as findings or decisions."
          },
          {
            "id": "execute_traceability",
            "label": "Results are linked to requirements, hazards, claims, configurations, and affected gates."
          }
        ]
      },
      {
        "id": "closure",
        "number": "5",
        "title": "Record gate disposition and closure authority",
        "user_action": "Consolidate results at the applicable review gate and record who accepts, rejects, waives, conditionally closes, or keeps each item open.",
        "record": "Gate and decision; named authority; date; accepted configuration/ODD; open actions; waiver or conditional-acceptance references; closure notes.",
        "completion": "The named authority has recorded the decision; evidence owners do not self-close independent findings; open items, conditions, and due gates remain visible.",
        "checks": [
          {
            "id": "closure_authority",
            "label": "The decision is attributed to the designated project/customer authority."
          },
          {
            "id": "closure_open",
            "label": "Open findings, waivers, conditions, owners, and due gates are retained."
          },
          {
            "id": "closure_scope",
            "label": "Acceptance is limited to an identified configuration, ODD, assumptions, and limitations."
          }
        ]
      },
      {
        "id": "conformity",
        "number": "6",
        "title": "Issue the conformity record and maintain it after change",
        "user_action": "Generate the final checklist-conformity page, review the complete record, and define the changes or anomalies that reopen affected controls.",
        "record": "Project context; group decisions and recommendation record; item-level construction and execution; summary counts; gate decision; open findings; residuals; change triggers.",
        "completion": "The conformity page is generated without hiding incomplete or failed items, and the project records when the checklist must be reopened.",
        "checks": [
          {
            "id": "conformity_review",
            "label": "The generated page has been reviewed for completeness and internal consistency."
          },
          {
            "id": "conformity_disclaimer",
            "label": "The record is not presented as an ECSS certificate or automatic qualification approval."
          },
          {
            "id": "conformity_change",
            "label": "Material data, model, software, target, ODD, hazard, or operational changes trigger impact analysis."
          }
        ]
      }
    ],
    "gate_fields": [
      {
        "id": "review_gate",
        "label": "Review gate / decision point",
        "type": "text",
        "required": true,
        "placeholder": "e.g., QR / AR"
      },
      {
        "id": "gate_decision",
        "label": "Gate decision",
        "type": "select",
        "required": true,
        "options": [
          {
            "value": "pending",
            "label": "Pending"
          },
          {
            "value": "accepted",
            "label": "Accepted"
          },
          {
            "value": "conditional",
            "label": "Conditionally accepted"
          },
          {
            "value": "rejected",
            "label": "Rejected"
          },
          {
            "value": "blocked",
            "label": "Blocked"
          }
        ]
      },
      {
        "id": "decision_authority",
        "label": "Decision / closure authority",
        "type": "text",
        "required": true,
        "placeholder": "Named role or body"
      },
      {
        "id": "decision_date",
        "label": "Decision date",
        "type": "date",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "accepted_configuration",
        "label": "Configuration / release baseline",
        "type": "textarea",
        "required": true,
        "placeholder": "Release, model, data, software, tool and target identifiers"
      },
      {
        "id": "accepted_odd",
        "label": "Accepted ODD and operating limitations",
        "type": "textarea",
        "required": true,
        "placeholder": "Authorised domain, modes, restrictions and exclusions"
      },
      {
        "id": "decision_conditions",
        "label": "Conditions, waivers and open actions",
        "type": "textarea",
        "required": false,
        "placeholder": "Finding IDs, owners, due gates, waiver references and restrictions"
      },
      {
        "id": "change_triggers",
        "label": "Change / reopening triggers",
        "type": "textarea",
        "required": true,
        "placeholder": "Changes or anomalies that require impact analysis and re-execution"
      }
    ],
    "recommender": {
      "title": "Checklist-group recommender",
      "intro": "The recommender translates project characteristics into a transparent starting point. It does not replace contractual tailoring, safety analysis, or authority approval. Review every reason and override the suggestion when project evidence requires it.",
      "questions": [
        {
          "id": "safety_relevant",
          "label": "Does the AI/ML item contribute to a safety-relevant or mission-critical function?",
          "help": "Include direct and indirect failure propagation, reliance on compensating provisions, and mission-level consequences.",
          "options": [
            {
              "value": "pending",
              "label": "Select an answer"
            },
            {
              "value": "yes",
              "label": "Yes"
            },
            {
              "value": "no",
              "label": "No"
            },
            {
              "value": "unknown",
              "label": "Not yet known"
            }
          ]
        },
        {
          "id": "project_model_work",
          "label": "Will the project train, fine-tune, select, or materially configure a learned model?",
          "help": "Third-party or pretrained models still require selection and evidence review; answer No only when model development is completely outside project control.",
          "options": [
            {
              "value": "pending",
              "label": "Select an answer"
            },
            {
              "value": "yes",
              "label": "Yes"
            },
            {
              "value": "no",
              "label": "No"
            },
            {
              "value": "unknown",
              "label": "Not yet known"
            }
          ]
        },
        {
          "id": "target_integration",
          "label": "Will the model be converted, embedded, or integrated into executable software or target hardware?",
          "help": "Consider preprocessing, converters, libraries, timing, memory, numerical behaviour, interfaces, and target equivalence.",
          "options": [
            {
              "value": "pending",
              "label": "Select an answer"
            },
            {
              "value": "yes",
              "label": "Yes"
            },
            {
              "value": "no",
              "label": "No"
            },
            {
              "value": "unknown",
              "label": "Not yet known"
            }
          ]
        },
        {
          "id": "autonomous_authority",
          "label": "Can an AI/ML output directly influence control, reconfiguration, recovery, or another consequential action?",
          "help": "Direct authority, weak observability, or limited operator intervention generally increases system and independent-assurance needs.",
          "options": [
            {
              "value": "pending",
              "label": "Select an answer"
            },
            {
              "value": "yes",
              "label": "Yes"
            },
            {
              "value": "no",
              "label": "No"
            },
            {
              "value": "unknown",
              "label": "Not yet known"
            }
          ]
        },
        {
          "id": "operation_change",
          "label": "Will the item require operational monitoring, model/data updates, threshold changes, rollback, or maintenance after release?",
          "help": "Monitoring need depends on observability and the safety argument; updates and anomalies trigger controlled impact analysis.",
          "options": [
            {
              "value": "pending",
              "label": "Select an answer"
            },
            {
              "value": "yes",
              "label": "Yes"
            },
            {
              "value": "no",
              "label": "No"
            },
            {
              "value": "unknown",
              "label": "Not yet known"
            }
          ]
        },
        {
          "id": "security_privacy_disparity",
          "label": "Are credible cyber, privacy, sensitive-data, or affected-group disparity concerns present?",
          "help": "This activates context-specific controls; it does not make demographic fairness or adversarial testing universal.",
          "options": [
            {
              "value": "pending",
              "label": "Select an answer"
            },
            {
              "value": "yes",
              "label": "Yes"
            },
            {
              "value": "no",
              "label": "No"
            },
            {
              "value": "unknown",
              "label": "Not yet known"
            }
          ]
        },
        {
          "id": "independence_need",
          "label": "Do contract, criticality, novelty, uncertainty, customer expectations, or risk indicate a need for independent challenge?",
          "help": "IMVV is risk-triggered and extends the existing independent-assurance function to AI-specific evidence.",
          "options": [
            {
              "value": "pending",
              "label": "Select an answer"
            },
            {
              "value": "yes",
              "label": "Yes"
            },
            {
              "value": "no",
              "label": "No"
            },
            {
              "value": "unknown",
              "label": "Not yet known"
            }
          ]
        }
      ],
      "rules": [
        {
          "group_id": "governance",
          "baseline": true,
          "reason": "A project needs an explicit assurance boundary, review plan, and decision path before item-level tailoring."
        },
        {
          "group_id": "configuration-traceability",
          "baseline": true,
          "reason": "Configuration control and bidirectional traceability are cross-cutting foundations for all evidence."
        },
        {
          "group_id": "data-assurance",
          "baseline": true,
          "reason": "AI/ML behaviour depends on data provenance, fitness, coverage, quality, and controlled transformations.",
          "reason_if": [
            {
              "question": "security_privacy_disparity",
              "value": "yes",
              "text": "The project also reports security, privacy, sensitive-data, or disparity concerns."
            }
          ]
        },
        {
          "group_id": "model-learning",
          "baseline": true,
          "reason": "Model selection and learning evidence must be reviewable even when a pretrained model is reused.",
          "reason_if": [
            {
              "question": "project_model_work",
              "value": "yes",
              "text": "The project will train, fine-tune, select, or materially configure a model."
            }
          ]
        },
        {
          "group_id": "model-vv",
          "baseline": true,
          "reason": "Claims about learned behaviour require predeclared model-level verification and validation evidence."
        },
        {
          "group_id": "software-system-vv",
          "baseline": false,
          "questions": [
            "target_integration",
            "autonomous_authority"
          ],
          "triggers": [
            {
              "question": "target_integration",
              "value": "yes",
              "text": "The model will be embedded or integrated into executable software/target hardware."
            },
            {
              "question": "autonomous_authority",
              "value": "yes",
              "text": "The AI/ML output can directly influence consequential system action."
            }
          ],
          "fallback": "Consider this group whenever model evidence must be distinguished from implementation or integrated-system evidence."
        },
        {
          "group_id": "deployment-change",
          "baseline": false,
          "questions": [
            "target_integration",
            "operation_change"
          ],
          "triggers": [
            {
              "question": "target_integration",
              "value": "yes",
              "text": "Target conversion, release, or deployment evidence is required."
            },
            {
              "question": "operation_change",
              "value": "yes",
              "text": "Operational monitoring, updates, rollback, anomalies, or maintenance are expected."
            }
          ],
          "fallback": "Consider this group if any release, operational, maintenance, or change-control obligation exists."
        },
        {
          "group_id": "safety-normative",
          "baseline": false,
          "questions": [
            "safety_relevant",
            "autonomous_authority"
          ],
          "triggers": [
            {
              "question": "safety_relevant",
              "value": "yes",
              "text": "The AI/ML item contributes to a safety-relevant or mission-critical function."
            },
            {
              "question": "autonomous_authority",
              "value": "yes",
              "text": "Direct consequential action requires explicit claim, residual-risk, and authority reasoning."
            }
          ],
          "fallback": "Consider this group when assurance claims, contractual status, or residual-risk decisions must be made explicit."
        },
        {
          "group_id": "imvv",
          "baseline": false,
          "questions": [
            "independence_need",
            "autonomous_authority",
            "safety_relevant"
          ],
          "triggers": [
            {
              "question": "independence_need",
              "value": "yes",
              "text": "Contract, criticality, novelty, uncertainty, customer expectation, or risk indicates independent challenge."
            },
            {
              "question": "autonomous_authority",
              "value": "yes",
              "text": "Direct action authority increases the need for independent challenge of the evidence chain."
            }
          ],
          "fallback": "Consider IMVV when project risk justifies organisational, technical, or decisional independence."
        }
      ]
    }
  },
  "imvv_generic": {
    "construction": [
      {
        "item": "IV-01",
        "configure": "Decide whether AI-specific independent V&V is required and predeclare its scope, methods, artefacts, interfaces, deliverables, escalation, and finding process.",
        "traceability": "Criticality, hazards, AI authority, novelty, uncertainty, compensating provisions, contract, and assurance plan -> SC-01, FR-01/02, SA-01, IV-02--06.",
        "planned_acceptance": "Approved activation/non-activation rationale and feasible independent plan traceable to the assurance scope.",
        "responsibility": "PA/project authority with IMVV lead; decide at SRR/PDR; project/PA authority closes.",
        "residual_rule": "Record unresolved criticality, access limitations, resource constraints, and excluded evidence areas."
      },
      {
        "item": "IV-02",
        "configure": "Define organisational independence, including reporting, contractual separation, conflicts, access rights, and protected escalation.",
        "traceability": "Organisation chart, contracts, reporting lines, conflict declarations, and access controls -> IV-01, IV-04, RACI/authority matrix.",
        "planned_acceptance": "Reviewers are not accountable for the development decisions they challenge and have protected access and escalation.",
        "responsibility": "PA/customer authority with IMVV management; approve at SRR/PDR; PA/customer authority closes.",
        "residual_rule": "Disclose shared management, funding dependence, unavailable expertise, conflicts, and access restrictions."
      },
      {
        "item": "IV-03",
        "configure": "Define technical independence and how the team will reproduce, sample, or otherwise challenge controlled AI evidence.",
        "traceability": "Datasets, scripts, tools, model/software/target artefacts, reproduction plan, and sampling strategy -> CM-01/02, MV-02, DP-01--03, IV-05.",
        "planned_acceptance": "The independent team can challenge scoped evidence from controlled inputs without relying only on developer interpretation.",
        "responsibility": "IMVV lead with independent CM/QA; review at TRR/QR; IMVV/PA and the designated review authority close.",
        "residual_rule": "Record proprietary or unavailable artefacts, shared scripts, sampling limits, and unreproduced results."
      },
      {
        "item": "IV-04",
        "configure": "Separate evidence ownership, review, finding ownership, disposition proposal, waiver authority, and formal closure.",
        "traceability": "RACI/authority matrix, review plan, finding process, waiver and risk-acceptance rules -> FR-01--06, SA-03, IV-02, IV-06.",
        "planned_acceptance": "No evidence owner can unilaterally close an independent finding or accept its residual risk; escalation is named.",
        "responsibility": "PA/project authority; applies at all relevant gates; project/customer authority closes.",
        "residual_rule": "Control role overlap, delegated authority, absent customer participation, and emergency dispositions."
      },
      {
        "item": "IV-05",
        "configure": "Select the AI-specific evidence chain to challenge: requirements, ODD, data/labels, model/pipeline, conversion, target, interfaces, monitors, claims, and traceability.",
        "traceability": "Approved IMVV scope -> TR-01, SA-02, MV-07, SV-01, SY-01, DP-01--08 and affected configurations/claims.",
        "planned_acceptance": "The approved scope is covered and unsupported claims or departures become traceable findings.",
        "responsibility": "IMVV team; developers supply artefacts/responses; review mainly at QR/AR; designated authority decides.",
        "residual_rule": "Keep exclusions, limited samples, unreproduced evidence, unresolved findings, and scope constraints visible."
      },
      {
        "item": "IV-06",
        "configure": "Define the finding lifecycle from provenance and severity through action, independent retest/review, disposition, waiver, and authorised closure.",
        "traceability": "Finding log, affected configuration/claims, owner, corrective evidence, retest, waiver and closure -> TR-01, FR-05/06, SA-02/03, CM-03, DP-08.",
        "planned_acceptance": "Every finding has complete provenance and an authorised disposition; gates obey project closure rules.",
        "responsibility": "PA controls; action owners respond; IMVV verifies; project/customer authority closes at the affected gate.",
        "residual_rule": "Retain open findings, conditional waivers, incomplete retest, recurring defects, and accepted limitations with release acceptance."
      }
    ],
    "execution": [
      {
        "item": "IV-01",
        "check": "Was the IMVV activation decision and approved scope executed as planned?",
        "evidence_prompt": "Activation decision / plan ID",
        "decision_prompt": "Activated, not activated, or blocked; deviations/finding",
        "closure_prompt": "Authority, gate/date, links, and unresolved scope limits"
      },
      {
        "item": "IV-02",
        "check": "Is organisational independence demonstrated for the people who performed the challenge?",
        "evidence_prompt": "Independence statement / conflict record",
        "decision_prompt": "Pass, fail, blocked, or N.A.; finding/disposition",
        "closure_prompt": "Approver, escalation path, links, and remaining conflicts"
      },
      {
        "item": "IV-03",
        "check": "Could the independent team reproduce or credibly challenge the controlled technical evidence?",
        "evidence_prompt": "Independent baseline, scripts, samples, reproduction record",
        "decision_prompt": "Result and any unreproduced or access-related finding",
        "closure_prompt": "Review authority, retest/waiver, links, and technical limits"
      },
      {
        "item": "IV-04",
        "check": "Were review, disposition, waiver, and closure decisions made by the authorised independent roles?",
        "evidence_prompt": "RACI / authority matrix / decision record",
        "decision_prompt": "Result and any self-approval or authority finding",
        "closure_prompt": "Formal closer, gate/date, links, and delegated-authority limits"
      },
      {
        "item": "IV-05",
        "check": "Was every selected AI evidence area independently challenged, with unsupported claims raised as findings?",
        "evidence_prompt": "Review/reproduction records and finding IDs",
        "decision_prompt": "Coverage result, affected claims/configurations, recommendation",
        "closure_prompt": "Decision authority, links, excluded scope, and residual uncertainty"
      },
      {
        "item": "IV-06",
        "check": "Does every IMVV finding have corrective evidence, independent verification, and authorised disposition?",
        "evidence_prompt": "Finding log, corrective action, retest, waiver/closure record",
        "decision_prompt": "Closed, open, conditionally accepted, or blocked",
        "closure_prompt": "Closer/signature/date, release links, and retained limitations"
      }
    ]
  },
  "interactive_map": {
    "title": "Interactive Aerosafe framework map",
    "intro": "Explore the framework as a navigable diagram. Select a lifecycle phase, review gate, activity, decision point, or output to see its role, related checklist groups, and the corresponding guided-project stage.",
    "source_basis": {
      "figure2_json": {
        "path": "data/diagram_sources/Checklist_amlas_ecss-Pagina-8.json",
        "page": "Pagina-8",
        "sha256": "a2d03bf3fc09fa8857467044db1519d2ce7af307b87ce7d795e735ccfa274ddd",
        "note": "Node labels and directed relations are taken from the diagrams.net JSON export supplied for Figure 2. One visually explicit return loop has missing endpoints in the export and is therefore marked as reconstructed from the rendered figure."
      },
      "figure3_tex": {
        "path": "01-introduction.tex",
        "label": "fig:framework_flow_chart2",
        "note": "Lifecycle phases, review-gate labels, and the two cross-cutting bands reproduce the Figure 3 TikZ definition."
      },
      "editorial_note": "The website adds selection, zoom, navigation, and links to existing catalogue and guided-mode content. It does not add a new assurance requirement or replace project tailoring."
    },
    "views": [
      {
        "id": "lifecycle",
        "label": "Lifecycle and review gates",
        "short_label": "Lifecycle",
        "description": "Start here to understand where assurance work sits across the project lifecycle and which ECSS-oriented review gates normally expose the corresponding evidence."
      },
      {
        "id": "decision",
        "label": "Assurance decision flow",
        "short_label": "Decision flow",
        "description": "Follow the detailed Figure 2 logic, including rework loops, deployment checks, and risk-triggered IMVV."
      }
    ],
    "lifecycle": {
      "view_box": [
        0,
        0,
        1500,
        520
      ],
      "route_order": [
        "phase-scope",
        "gate-scope",
        "phase-data",
        "gate-data",
        "phase-learning",
        "gate-learning",
        "phase-vv",
        "gate-vv",
        "phase-deployment",
        "gate-deployment"
      ],
      "phases": [
        {
          "id": "phase-scope",
          "number": "L1",
          "title": "Scoping, criticality, and ML safety requirements",
          "lines": [
            "Scoping, criticality,",
            "and ML safety",
            "requirements"
          ],
          "x": 55,
          "y": 150,
          "width": 240,
          "height": 105,
          "gate_id": "gate-scope",
          "group_ids": [
            "governance",
            "safety-normative"
          ],
          "guided_stage": "context",
          "detail": "Define the AI/ML boundary, ODD, hazards, criticality rationale, review plan, and decision authority before tailoring controls.",
          "record_focus": "Controlled qualification context and scope."
        },
        {
          "id": "phase-data",
          "number": "L2",
          "title": "Data assurance and configuration baseline",
          "lines": [
            "Data assurance and",
            "configuration baseline"
          ],
          "x": 345,
          "y": 150,
          "width": 240,
          "height": 105,
          "gate_id": "gate-data",
          "group_ids": [
            "data-assurance",
            "configuration-traceability"
          ],
          "guided_stage": "configure",
          "detail": "Establish controlled data provenance, quality, partitions, ODD coverage, integrity, and the baseline identifiers needed for later evidence review.",
          "record_focus": "Baselined data and traceability record."
        },
        {
          "id": "phase-learning",
          "number": "L3",
          "title": "Model learning, selection, and design",
          "lines": [
            "Model learning, selection,",
            "and design"
          ],
          "x": 635,
          "y": 150,
          "width": 240,
          "height": 105,
          "gate_id": "gate-learning",
          "group_ids": [
            "model-learning"
          ],
          "guided_stage": "configure",
          "detail": "Make training, candidate comparison, selection, mismatch analysis, and assurance-relevant design decisions reproducible and reviewable.",
          "record_focus": "Model-development and selection evidence."
        },
        {
          "id": "phase-vv",
          "number": "L4",
          "title": "Model, software, and system V&V",
          "lines": [
            "Model, software,",
            "and system V&V"
          ],
          "x": 925,
          "y": 150,
          "width": 240,
          "height": 105,
          "gate_id": "gate-vv",
          "group_ids": [
            "model-vv",
            "software-system-vv",
            "imvv"
          ],
          "guided_stage": "execute",
          "detail": "Assess requirements-linked model evidence separately from implementation, target, interface, integrated-system, and independent-challenge evidence.",
          "record_focus": "Controlled V&V evidence, findings, and dispositions."
        },
        {
          "id": "phase-deployment",
          "number": "L5",
          "title": "Deployment, operation, and controlled change",
          "lines": [
            "Deployment, operation,",
            "and controlled change"
          ],
          "x": 1215,
          "y": 150,
          "width": 240,
          "height": 105,
          "gate_id": "gate-deployment",
          "group_ids": [
            "deployment-change",
            "configuration-traceability",
            "safety-normative"
          ],
          "guided_stage": "conformity",
          "detail": "Control conversion, target equivalence, release, monitoring, fallback, anomalies, maintenance, and requalification triggers for the accepted baseline.",
          "record_focus": "Release, operational acceptance, and maintained conformity record."
        }
      ],
      "gates": [
        {
          "id": "gate-scope",
          "title": "SRR / PDR",
          "lines": [
            "SRR / PDR"
          ],
          "x": 55,
          "y": 315,
          "width": 240,
          "height": 62,
          "phase_id": "phase-scope",
          "guided_stage": "scope",
          "group_ids": [
            "governance"
          ],
          "detail": "Use the applicable review plan to confirm the qualification boundary, evidence expectations, tailoring decisions, and open actions."
        },
        {
          "id": "gate-data",
          "title": "PDR / CDR",
          "lines": [
            "PDR / CDR"
          ],
          "x": 345,
          "y": 315,
          "width": 240,
          "height": 62,
          "phase_id": "phase-data",
          "guided_stage": "configure",
          "group_ids": [
            "data-assurance",
            "configuration-traceability"
          ],
          "detail": "Review the controlled data and configuration baseline before later model evidence is treated as stable."
        },
        {
          "id": "gate-learning",
          "title": "CDR / TRR",
          "lines": [
            "CDR / TRR"
          ],
          "x": 635,
          "y": 315,
          "width": 240,
          "height": 62,
          "phase_id": "phase-learning",
          "guided_stage": "execute",
          "group_ids": [
            "model-learning",
            "model-vv"
          ],
          "detail": "Confirm readiness for verification and testing against predeclared criteria and controlled model artefacts."
        },
        {
          "id": "gate-vv",
          "title": "TRR / QR or project VVR",
          "lines": [
            "TRR / QR or",
            "project VVR"
          ],
          "x": 925,
          "y": 315,
          "width": 240,
          "height": 62,
          "phase_id": "phase-vv",
          "guided_stage": "closure",
          "group_ids": [
            "model-vv",
            "software-system-vv",
            "imvv"
          ],
          "detail": "Consolidate evidence, findings, retest, waivers, residual limitations, and the named closure authority at the applicable review."
        },
        {
          "id": "gate-deployment",
          "title": "AR / project ORR",
          "lines": [
            "AR / project ORR"
          ],
          "x": 1215,
          "y": 315,
          "width": 240,
          "height": 62,
          "phase_id": "phase-deployment",
          "guided_stage": "conformity",
          "group_ids": [
            "deployment-change",
            "safety-normative"
          ],
          "detail": "Record the accepted configuration, ODD, authority decision, open conditions, and triggers that reopen affected controls."
        }
      ],
      "bands": [
        {
          "id": "band-configuration",
          "title": "Configuration management and bidirectional traceability across every baseline",
          "lines": [
            "Configuration management and bidirectional traceability across every baseline"
          ],
          "x": 35,
          "y": 45,
          "width": 1440,
          "height": 70,
          "group_ids": [
            "configuration-traceability"
          ],
          "guided_stage": "configure",
          "detail": "This cross-cutting band applies from initial baselines through release and change. It preserves controlled identities and relations among requirements, hazards, data, models, software, tests, claims, findings, and decisions."
        },
        {
          "id": "band-imvv",
          "title": "IMVV challenge and finding management when activated by criticality and risk",
          "lines": [
            "IMVV challenge and finding management when activated by criticality and risk"
          ],
          "x": 325,
          "y": 430,
          "width": 1150,
          "height": 58,
          "group_ids": [
            "imvv"
          ],
          "guided_stage": "execute",
          "detail": "IMVV is not a universal extra phase. It is activated by a documented independence need and keeps challenge, findings, retest, waiver, and closure authority visible."
        }
      ],
      "gate_disclaimer": "SRR, PDR, CDR, TRR, QR, and AR are ECSS-oriented review labels. VVR and ORR are shown only when the applicable project review plan defines them; exact names and phasing remain contractually tailored."
    },
    "decision_flow": {
      "view_box": [
        0,
        0,
        1600,
        720
      ],
      "route_order": [
        "configuration-management",
        "data-management",
        "all-requirements",
        "model-learning",
        "model-requirements",
        "model-deployment",
        "embedded-requirements",
        "design-requirements",
        "model-imvv",
        "imvv-requirements",
        "all-complete"
      ],
      "zones": [
        {
          "id": "zone-problem",
          "title": "Problem Definition",
          "source_id": "Atoau5tYlu5lBZZD6wAI-1",
          "x": 15,
          "y": 28,
          "width": 350,
          "height": 590,
          "class": "problem"
        },
        {
          "id": "zone-vv",
          "title": "Model Verification and Validation",
          "source_id": "Atoau5tYlu5lBZZD6wAI-2",
          "x": 390,
          "y": 28,
          "width": 850,
          "height": 590,
          "class": "vv"
        },
        {
          "id": "zone-deployment",
          "title": "Model Deployment",
          "source_id": "Atoau5tYlu5lBZZD6wAI-3",
          "x": 1265,
          "y": 28,
          "width": 320,
          "height": 590,
          "class": "deployment"
        }
      ],
      "nodes": [
        {
          "id": "configuration-management",
          "number": "D1",
          "source_ids": [
            "Atoau5tYlu5lBZZD6wAI-5"
          ],
          "title": "Configuration Management",
          "lines": [
            "Configuration",
            "Management"
          ],
          "type": "activity",
          "criticality": "all",
          "x": 85,
          "y": 130,
          "width": 230,
          "height": 92,
          "group_ids": [
            "configuration-traceability"
          ],
          "guided_stage": "configure",
          "detail": "Control the identities and changes of datasets, labels, models, code, tools, converters, binaries, and releases before assurance evidence is judged.",
          "record_focus": "Baselines, configuration identifiers, change status, and traceability relations."
        },
        {
          "id": "data-management",
          "number": "D2",
          "source_ids": [
            "Atoau5tYlu5lBZZD6wAI-7"
          ],
          "title": "Data Management",
          "lines": [
            "Data",
            "Management"
          ],
          "type": "activity",
          "criticality": "all",
          "x": 85,
          "y": 300,
          "width": 230,
          "height": 92,
          "group_ids": [
            "data-assurance",
            "configuration-traceability"
          ],
          "guided_stage": "execute",
          "detail": "Establish requirements, provenance, labels or measurements, partition independence, ODD coverage, quality, integrity, and context-dependent privacy or disparity evidence.",
          "record_focus": "Controlled data evidence and acceptance results."
        },
        {
          "id": "all-requirements",
          "number": "D3",
          "source_ids": [
            "Atoau5tYlu5lBZZD6wAI-10"
          ],
          "title": "Are all requirements assured?",
          "lines": [
            "Are all requirements",
            "assured?"
          ],
          "type": "decision",
          "criticality": "all",
          "x": 55,
          "y": 465,
          "width": 290,
          "height": 86,
          "group_ids": [
            "data-assurance",
            "governance"
          ],
          "guided_stage": "closure",
          "detail": "Decide whether the controlled problem-definition and data evidence supports the applicable requirements. Missing or inadequate evidence remains a visible rework condition.",
          "record_focus": "Decision, evidence reference, finding or blocker, authority, and residual limitation."
        },
        {
          "id": "model-learning",
          "number": "D4",
          "source_ids": [
            "Atoau5tYlu5lBZZD6wAI-14"
          ],
          "title": "Model Learning",
          "lines": [
            "Model",
            "Learning"
          ],
          "type": "activity",
          "criticality": "all",
          "x": 445,
          "y": 160,
          "width": 160,
          "height": 92,
          "group_ids": [
            "model-learning"
          ],
          "guided_stage": "execute",
          "detail": "Execute reproducible training, candidate comparison and selection, mismatch analysis, and any assurance-relevant explainability activity.",
          "record_focus": "Training configuration, candidate evidence, selection rationale, and limitations."
        },
        {
          "id": "model-requirements",
          "number": "D5",
          "source_ids": [
            "Atoau5tYlu5lBZZD6wAI-27"
          ],
          "title": "Are model requirements assured?",
          "lines": [
            "Are model requirements",
            "assured?"
          ],
          "type": "decision",
          "criticality": "all",
          "x": 670,
          "y": 155,
          "width": 255,
          "height": 100,
          "group_ids": [
            "model-learning",
            "model-vv"
          ],
          "guided_stage": "closure",
          "detail": "Determine whether model-level requirements are supported by controlled and requirements-linked evidence before deployment or completion of the non-embedded route.",
          "record_focus": "Model-level result, rework decision, and next assurance route."
        },
        {
          "id": "model-deployment",
          "number": "D6",
          "source_ids": [
            "Atoau5tYlu5lBZZD6wAI-29",
            "Atoau5tYlu5lBZZD6wAI-3"
          ],
          "title": "Model Deployment",
          "lines": [
            "Model",
            "Deployment"
          ],
          "type": "activity",
          "criticality": "deployment",
          "x": 1340,
          "y": 180,
          "width": 175,
          "height": 90,
          "group_ids": [
            "deployment-change",
            "software-system-vv"
          ],
          "guided_stage": "execute",
          "detail": "Control conversion, target resources and equivalence, release and rollback, monitoring, fallback, and the software/system evidence needed for the embedded model.",
          "record_focus": "Target configuration, equivalence evidence, release record, and operational provisions."
        },
        {
          "id": "embedded-requirements",
          "number": "D7",
          "source_ids": [
            "Atoau5tYlu5lBZZD6wAI-35"
          ],
          "title": "Are requirements assured by the embedded model?",
          "lines": [
            "Are requirements assured",
            "by the embedded model?"
          ],
          "type": "decision",
          "criticality": "ba",
          "x": 965,
          "y": 275,
          "width": 280,
          "height": 120,
          "group_ids": [
            "software-system-vv",
            "deployment-change"
          ],
          "guided_stage": "closure",
          "detail": "Judge the deployed implementation and target evidence, rather than assuming that model-level performance automatically transfers to the embedded system.",
          "record_focus": "Target/system result, rework action, gate decision, and retained limitations."
        },
        {
          "id": "design-requirements",
          "number": "D8",
          "source_ids": [
            "Atoau5tYlu5lBZZD6wAI-44"
          ],
          "title": "Are design requirements assured?",
          "lines": [
            "Are design requirements",
            "assured?"
          ],
          "type": "decision",
          "criticality": "ba",
          "x": 970,
          "y": 450,
          "width": 255,
          "height": 100,
          "group_ids": [
            "software-system-vv",
            "safety-normative",
            "imvv"
          ],
          "guided_stage": "closure",
          "detail": "Use the project-tailored criticality and risk decision to determine whether the design evidence is sufficient or whether independent model challenge is activated.",
          "record_focus": "Design assurance result, criticality/risk rationale, and IMVV activation decision."
        },
        {
          "id": "model-imvv",
          "number": "D9",
          "source_ids": [
            "Atoau5tYlu5lBZZD6wAI-16"
          ],
          "title": "Model IMVV",
          "lines": [
            "Model",
            "IMVV"
          ],
          "type": "activity",
          "criticality": "ba",
          "x": 760,
          "y": 430,
          "width": 160,
          "height": 92,
          "group_ids": [
            "imvv"
          ],
          "guided_stage": "execute",
          "detail": "Perform the documented independent challenge of AI-specific evidence, independence arrangements, findings, retest, waiver, and closure status.",
          "record_focus": "Independent evidence review, findings, retest, and authority-separated closure."
        },
        {
          "id": "imvv-requirements",
          "number": "D10",
          "source_ids": [
            "Atoau5tYlu5lBZZD6wAI-20"
          ],
          "title": "Are requirements and IMVV activity assured?",
          "lines": [
            "Are requirements and",
            "IMVV activity assured?"
          ],
          "type": "decision",
          "criticality": "ba",
          "x": 430,
          "y": 430,
          "width": 280,
          "height": 105,
          "group_ids": [
            "imvv",
            "safety-normative"
          ],
          "guided_stage": "closure",
          "detail": "Consolidate the independent challenge with the underlying requirements evidence. Open findings or inadequate design evidence prevent silent completion.",
          "record_focus": "Independent disposition, closure authority, open conditions, and residual risk."
        },
        {
          "id": "imvv-output",
          "number": "O1",
          "source_ids": [
            "Atoau5tYlu5lBZZD6wAI-28"
          ],
          "title": "Independent Model Verification and Validation",
          "lines": [
            "Independent Model Verification",
            "and Validation"
          ],
          "type": "output",
          "criticality": "ba",
          "x": 725,
          "y": 555,
          "width": 250,
          "height": 65,
          "group_ids": [
            "imvv"
          ],
          "guided_stage": "closure",
          "detail": "The controlled IMVV output retains the independent scope, evidence reviewed, findings, retest or waiver status, decision authority, and residual limitations.",
          "record_focus": "Independent assessment and finding-management record."
        },
        {
          "id": "all-complete",
          "number": "C",
          "source_ids": [
            "Atoau5tYlu5lBZZD6wAI-38",
            "Atoau5tYlu5lBZZD6wAI-54"
          ],
          "title": "All steps completed",
          "lines": [
            "All steps completed"
          ],
          "type": "completion",
          "criticality": "all",
          "cx": 930,
          "cy": 370,
          "radius": 27,
          "group_ids": [
            "governance",
            "safety-normative"
          ],
          "guided_stage": "conformity",
          "detail": "Completion means the selected controls and applicable gates have a controlled record. It does not by itself constitute ECSS certification or automatic qualification approval.",
          "record_focus": "Final checklist-conformity page, accepted scope, open conditions, authority, and change triggers."
        }
      ],
      "edges": [
        {
          "id": "edge-cm-data",
          "source_id": "Atoau5tYlu5lBZZD6wAI-4",
          "from": "configuration-management",
          "to": "data-management",
          "kind": "bidirectional",
          "path": "M 200 222 L 200 300",
          "label": "Controlled exchange"
        },
        {
          "id": "edge-data-all",
          "source_id": "Atoau5tYlu5lBZZD6wAI-6",
          "from": "data-management",
          "to": "all-requirements",
          "kind": "forward",
          "path": "M 200 392 L 200 465"
        },
        {
          "id": "edge-all-data",
          "source_id": "Atoau5tYlu5lBZZD6wAI-8",
          "from": "all-requirements",
          "to": "data-management",
          "kind": "rework",
          "path": "M 55 508 L 34 508 L 34 346 L 85 346",
          "label": "No: improve dataset",
          "label_x": 42,
          "label_y": 425
        },
        {
          "id": "edge-all-learning",
          "source_id": "Atoau5tYlu5lBZZD6wAI-11",
          "from": "all-requirements",
          "to": "model-learning",
          "kind": "forward",
          "path": "M 345 508 L 395 508 L 395 206 L 445 206",
          "label": "Yes",
          "label_x": 352,
          "label_y": 492
        },
        {
          "id": "edge-learning-model",
          "source_id": "Atoau5tYlu5lBZZD6wAI-13",
          "from": "model-learning",
          "to": "model-requirements",
          "kind": "forward",
          "path": "M 605 206 L 670 206"
        },
        {
          "id": "edge-model-learning",
          "source_id": "Atoau5tYlu5lBZZD6wAI-25",
          "from": "model-requirements",
          "to": "model-learning",
          "kind": "rework",
          "path": "M 797 155 L 797 92 L 525 92 L 525 160",
          "label": "No: improve model definition and/or training method",
          "label_x": 555,
          "label_y": 72
        },
        {
          "id": "edge-model-deployment",
          "source_id": "Atoau5tYlu5lBZZD6wAI-21",
          "from": "model-requirements",
          "to": "model-deployment",
          "kind": "forward",
          "path": "M 925 205 L 1295 205 L 1340 225",
          "label": "Model embedding needed",
          "label_x": 1035,
          "label_y": 188
        },
        {
          "id": "edge-model-complete",
          "source_id": "SSdyoXZw2NnMWia9ZhrV-1",
          "from": "model-requirements",
          "to": "all-complete",
          "kind": "forward",
          "path": "M 797 255 L 797 370 L 903 370",
          "label": "No embedding: Cat C",
          "label_x": 805,
          "label_y": 332
        },
        {
          "id": "edge-deploy-embedded",
          "source_id": "Atoau5tYlu5lBZZD6wAI-45",
          "from": "model-deployment",
          "to": "embedded-requirements",
          "kind": "forward",
          "path": "M 1340 225 L 1285 225 L 1285 335 L 1245 335"
        },
        {
          "id": "edge-embedded-deploy",
          "source_id": "Atoau5tYlu5lBZZD6wAI-30",
          "from": "embedded-requirements",
          "to": "model-deployment",
          "kind": "rework",
          "path": "M 1245 335 L 1560 335 L 1560 225 L 1515 225",
          "label": "No: improve embedding strategies",
          "label_x": 1270,
          "label_y": 365
        },
        {
          "id": "edge-embedded-design",
          "source_id": "Atoau5tYlu5lBZZD6wAI-34",
          "from": "embedded-requirements",
          "to": "design-requirements",
          "kind": "forward",
          "path": "M 1105 395 L 1105 450"
        },
        {
          "id": "edge-design-imvv",
          "source_id": "Atoau5tYlu5lBZZD6wAI-32",
          "from": "design-requirements",
          "to": "model-imvv",
          "kind": "forward",
          "path": "M 970 500 L 945 500 L 945 476 L 920 476",
          "label": "Yes: Cat A/B",
          "label_x": 905,
          "label_y": 530
        },
        {
          "id": "edge-design-complete",
          "source_id": "Atoau5tYlu5lBZZD6wAI-42",
          "from": "design-requirements",
          "to": "all-complete",
          "kind": "forward",
          "path": "M 1097 450 L 1097 370 L 957 370",
          "label": "Yes: Cat C",
          "label_x": 1030,
          "label_y": 350
        },
        {
          "id": "edge-imvv-decision",
          "source_id": "Atoau5tYlu5lBZZD6wAI-15",
          "from": "model-imvv",
          "to": "imvv-requirements",
          "kind": "forward",
          "path": "M 760 476 L 710 476"
        },
        {
          "id": "edge-imvv-complete",
          "source_id": "Atoau5tYlu5lBZZD6wAI-17",
          "from": "imvv-requirements",
          "to": "all-complete",
          "kind": "forward",
          "path": "M 710 455 L 735 455 L 735 370 L 903 370",
          "label": "Yes",
          "label_x": 744,
          "label_y": 395
        },
        {
          "id": "edge-imvv-design",
          "source_id": "Atoau5tYlu5lBZZD6wAI-18",
          "from": "imvv-requirements",
          "to": "design-requirements",
          "kind": "rework",
          "path": "M 570 535 L 570 600 L 1097 600 L 1097 550",
          "label": "No: check design",
          "label_x": 600,
          "label_y": 588,
          "reconstructed_from_render": true
        }
      ],
      "branches": {
        "all-requirements": [
          {
            "label": "Yes",
            "target": "model-learning",
            "meaning": "Proceed to model learning."
          },
          {
            "label": "No",
            "target": "data-management",
            "meaning": "Improve the dataset and repeat the assurance decision."
          }
        ],
        "model-requirements": [
          {
            "label": "No",
            "target": "model-learning",
            "meaning": "Improve the model definition and/or training method."
          },
          {
            "label": "Embedding needed",
            "target": "model-deployment",
            "meaning": "Continue through deployment and embedded-model assurance."
          },
          {
            "label": "No embedding: Cat C",
            "target": "all-complete",
            "meaning": "Follow the compact Category C completion route shown in Figure 2, subject to project tailoring."
          }
        ],
        "embedded-requirements": [
          {
            "label": "No",
            "target": "model-deployment",
            "meaning": "Improve embedding strategies and repeat the embedded-model check."
          },
          {
            "label": "Continue",
            "target": "design-requirements",
            "meaning": "Assess the design requirements and the need for independent challenge."
          }
        ],
        "design-requirements": [
          {
            "label": "Yes: Cat C",
            "target": "all-complete",
            "meaning": "Proceed to the completion marker shown by the source diagram."
          },
          {
            "label": "Yes: Cat A/B",
            "target": "model-imvv",
            "meaning": "Activate the IMVV route shown by the source diagram."
          }
        ],
        "imvv-requirements": [
          {
            "label": "Yes",
            "target": "all-complete",
            "meaning": "Proceed to the completion marker."
          },
          {
            "label": "No",
            "target": "design-requirements",
            "meaning": "Check the design and repeat the relevant assurance activities."
          }
        ]
      },
      "legend": [
        {
          "id": "all-criticality",
          "label": "Activity for all criticality",
          "class": "all"
        },
        {
          "id": "ba-criticality",
          "label": "Activity for Criticality B & A",
          "class": "ba"
        },
        {
          "id": "deployment",
          "label": "Deployment activity",
          "class": "deployment"
        },
        {
          "id": "decision",
          "label": "Decision point",
          "class": "decision"
        },
        {
          "id": "output",
          "label": "Output",
          "class": "output"
        },
        {
          "id": "completion",
          "label": "All steps completed",
          "class": "completion"
        }
      ],
      "criticality_disclaimer": "The colour coding reproduces the compact category-oriented view of Figure 2. Final activation remains risk-informed and project-tailored; a Category C item may still require a control normally associated with Category B when the documented risk conditions justify it."
    }
  }
};
