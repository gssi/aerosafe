window.AEROSAFE_DATA = {
  "metadata": {
    "framework": "Aerosafe",
    "paper_title": "Aerosafe: A Software Quality Assurance Framework for AI-Based Aerospace Systems in ECSS Lifecycles",
    "version": "guided-use companion edition with first formative evaluation",
    "disclaimer": "Aerosafe is an operational assurance aid. Its conformity page records completion against the project-selected Aerosafe checklist; it is not an ECSS certificate, compliance decision, qualification approval, or substitute for the designated authority.",
    "companion_url": "https://example.org/aerosafe-framework"
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
      "detail": "Freeze the contractual ECSS baseline, review plan, criticality input, AI/ML boundary, ODD, hazards, authority, and compensating provisions."
    },
    {
      "step": "2",
      "title": "Construct the checklist",
      "detail": "Select the relevant items and instantiate the ten-field tuple before evidence is judged."
    },
    {
      "step": "3",
      "title": "Baseline inputs and evidence",
      "detail": "Configuration-control data, model, software, tools, target artefacts, claims, and acceptance criteria."
    },
    {
      "step": "4",
      "title": "Execute at gates",
      "detail": "Review or test the controlled baseline; record results, decisions, findings, and traceability links."
    },
    {
      "step": "5",
      "title": "Close or constrain",
      "detail": "The named authority closes, waives, rejects, or conditionally accepts; the evidence owner cannot self-close independent findings."
    },
    {
      "step": "6",
      "title": "Maintain and reopen",
      "detail": "Changes, anomalies, invalidated assumptions, or ODD updates trigger impact analysis and reopen affected evidence."
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
      "id": "governance"
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
      "id": "configuration-traceability"
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
      "id": "data-assurance"
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
      "id": "model-learning"
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
      "id": "model-vv"
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
      "id": "software-system-vv"
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
      "id": "deployment-change"
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
      "id": "safety-normative"
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
      "id": "imvv"
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
    ]
  },
  "guided_use": {
    "storage_key": "aerosafe-guided-record-v1",
    "title": "Aerosafe user-completed qualification checklist",
    "intro": "Complete the six records in order. Construction defines what must be reviewed; execution records what was actually reviewed; the conformity page preserves scope, evidence, findings, closure, links, and residuals without turning open items into a positive claim.",
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
        "title": "Select assurance areas and tailor controls",
        "user_action": "Use Table 7 as the index. For every assurance area, record whether it is included or excluded; then decide the applicability of each mapped control in online Tables A.13–A.17.",
        "record": "Area decision and rationale; selected control IDs; M/C/N.A. decision; substitution or non-applicability rationale; responsible owner.",
        "completion": "Every Table 7 area has an explicit decision, every selected control has an applicability status, and exclusions/N.A. decisions have a recorded rationale.",
        "checks": [
          {
            "id": "scope_table7",
            "label": "All nine Table 7 assurance areas have been reviewed."
          },
          {
            "id": "scope_rationale",
            "label": "Excluded areas and N.A. controls have a justification and intended approval route."
          },
          {
            "id": "scope_mapping",
            "label": "The selected control IDs preserve the Table 7 to A.13–A.17 mapping."
          }
        ]
      },
      {
        "id": "configure",
        "number": "3",
        "title": "Configure the checklist before judging evidence",
        "user_action": "Instantiate the ordered ten-field tuple for every applicable control and baseline the construction record.",
        "record": "Source/status, objective, inputs, owner, planned evidence, acceptance criterion, gate, closure authority, links, and residual-treatment rule.",
        "completion": "Every applicable control has a confirmed owner, gate, closure authority, planned evidence reference, and tailoring rationale where needed; the construction record is frozen before execution.",
        "checks": [
          {
            "id": "configure_tuple",
            "label": "All ten operational fields are available for each applicable control."
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
        "record": "Evidence references and configuration IDs; result; decision/finding/NCR/waiver; gate status; links; residuals; execution-complete confirmation.",
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
        "record": "Project context; area decisions; item-level configuration and execution; summary counts; gate decision; open findings; residuals; change triggers.",
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
    ]
  }
};
