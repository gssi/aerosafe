window.AEROSAFE_MAP_DATA = {
  "metadata": {
    "version": "1.0.0",
    "title": "Aerosafe interactive framework map",
    "purpose": "A navigable visual entry point that links framework steps to named checklist groups and the guided project record.",
    "figure2_source": "data/diagram_sources/Checklist_amlas_ecss-Pagina-8.json",
    "figure3_source": "data/diagram_sources/figure3-lifecycle.tikz.tex",
    "interpretation_note": "The map preserves the source labels and graph relations. Screen layout, explanatory text, checklist-group links, and guided-stage links are editorial navigation aids. The source JSON contains one unattached feedback edge; its placement follows the rendered Figure 2 and is recorded explicitly in the edge metadata."
  },
  "modes": [
    {
      "id": "assurance-flow",
      "title": "Assurance decision flow",
      "short_title": "Decision flow",
      "figure_reference": "Figure 2",
      "view_box": [
        0,
        0,
        1560,
        650
      ],
      "intro": "Follow the problem-definition, model V&V, deployment, and IMVV decisions. Select any activity or decision to see the associated checklist groups, project questions, branches, and guided stages.",
      "regions": [
        {
          "id": "problem-definition",
          "label": "Problem Definition",
          "x": 20,
          "y": 30,
          "w": 350,
          "h": 560,
          "class": "problem",
          "groups": [
            "governance",
            "configuration-traceability",
            "data-assurance"
          ]
        },
        {
          "id": "model-vv",
          "label": "Model Verification and Validation",
          "x": 390,
          "y": 30,
          "w": 830,
          "h": 560,
          "class": "vv",
          "groups": [
            "model-learning",
            "model-vv",
            "software-system-vv",
            "imvv",
            "safety-normative"
          ]
        },
        {
          "id": "model-deployment",
          "label": "Model Deployment",
          "x": 1240,
          "y": 30,
          "w": 300,
          "h": 560,
          "class": "deployment",
          "groups": [
            "deployment-change"
          ]
        }
      ],
      "nodes": [
        {
          "id": "configuration-management",
          "source_id": "Atoau5tYlu5lBZZD6wAI-5",
          "source_label": "Configuration Management",
          "label": "Configuration Management",
          "kind": "activity",
          "criticality": "all",
          "x": 110,
          "y": 100,
          "w": 180,
          "h": 76,
          "region": "problem-definition",
          "groups": [
            "configuration-traceability"
          ],
          "wizard_stages": [
            1,
            3,
            6
          ],
          "description": "Establish and maintain controlled baselines for datasets, labels, models, code, tools, releases, and changes. Configuration control continues across the complete flow rather than ending after problem definition.",
          "user_question": "Which controlled baseline identifies the exact data, model, software, tool, and release configuration under review?"
        },
        {
          "id": "data-management",
          "source_id": "Atoau5tYlu5lBZZD6wAI-7",
          "source_label": "Data\nManagement",
          "label": "Data Management",
          "kind": "activity",
          "criticality": "all",
          "x": 110,
          "y": 250,
          "w": 180,
          "h": 76,
          "region": "problem-definition",
          "groups": [
            "data-assurance",
            "configuration-traceability"
          ],
          "wizard_stages": [
            3,
            4
          ],
          "description": "Define, acquire, curate, partition, control, and review the data needed to support the claimed operating domain and model requirements.",
          "user_question": "Are provenance, quality, partition independence, ODD coverage, integrity, and applicable privacy or disparity concerns evidenced?"
        },
        {
          "id": "data-requirements-assured",
          "source_id": "Atoau5tYlu5lBZZD6wAI-10",
          "source_label": "Are all requirements \nassured?",
          "label": "Are all requirements assured?",
          "kind": "decision",
          "criticality": "all",
          "x": 65,
          "y": 400,
          "w": 270,
          "h": 88,
          "region": "problem-definition",
          "groups": [
            "data-assurance",
            "governance"
          ],
          "wizard_stages": [
            4,
            5
          ],
          "description": "Review whether the problem-definition and data requirements are supported by controlled evidence. A negative result returns the project to dataset improvement.",
          "user_question": "Can the designated reviewer trace every applicable requirement to accepted evidence and an authorised disposition?"
        },
        {
          "id": "model-learning",
          "source_id": "Atoau5tYlu5lBZZD6wAI-14",
          "source_label": "Model \nLearning",
          "label": "Model Learning",
          "kind": "activity",
          "criticality": "all",
          "x": 425,
          "y": 160,
          "w": 150,
          "h": 78,
          "region": "model-vv",
          "groups": [
            "model-learning"
          ],
          "wizard_stages": [
            3,
            4
          ],
          "description": "Train, compare, select, and document candidate models using a reproducible and configuration-controlled learning process.",
          "user_question": "Are training configuration, candidate comparison, selection rationale, and mismatch or overfitting evidence reproducible?"
        },
        {
          "id": "model-requirements-assured",
          "source_id": "Atoau5tYlu5lBZZD6wAI-27",
          "source_label": "Are \nmodel requirements \nassured?",
          "label": "Are model requirements assured?",
          "kind": "decision",
          "criticality": "all",
          "x": 620,
          "y": 140,
          "w": 250,
          "h": 100,
          "region": "model-vv",
          "groups": [
            "model-vv",
            "model-learning"
          ],
          "wizard_stages": [
            4,
            5
          ],
          "description": "Assess the learned model against predeclared model-level requirements and acceptance criteria. The source diagram branches according to the project category and whether model embedding is needed.",
          "user_question": "Do the controlled verification and validation results satisfy every claimed model-level requirement for the intended use?"
        },
        {
          "id": "model-deployment",
          "source_id": "Atoau5tYlu5lBZZD6wAI-29",
          "source_label": "Model \nDeployment",
          "label": "Model Deployment",
          "kind": "activity",
          "criticality": "ba",
          "x": 1320,
          "y": 130,
          "w": 150,
          "h": 80,
          "region": "model-deployment",
          "groups": [
            "deployment-change"
          ],
          "wizard_stages": [
            3,
            4,
            6
          ],
          "description": "Convert, integrate, release, and control the model on the target environment, including target equivalence, resource constraints, rollback, monitoring, and change triggers.",
          "user_question": "Is the deployed artefact configuration-identical or demonstrably equivalent to the accepted model and software baseline?"
        },
        {
          "id": "embedded-model-assured",
          "source_id": "Atoau5tYlu5lBZZD6wAI-35",
          "source_label": "Are requirements assured by Embedded model?",
          "label": "Are requirements assured by the embedded model?",
          "kind": "decision",
          "criticality": "ba",
          "x": 995,
          "y": 260,
          "w": 230,
          "h": 110,
          "region": "model-vv",
          "groups": [
            "software-system-vv",
            "deployment-change"
          ],
          "wizard_stages": [
            4,
            5
          ],
          "description": "Check whether conversion, embedding, interfaces, numerical behaviour, timing, memory, target hardware, and operational interactions preserve the required behaviour.",
          "user_question": "Does target-level evidence show that embedding has not invalidated the accepted model and system requirements?"
        },
        {
          "id": "design-requirements-assured",
          "source_id": "Atoau5tYlu5lBZZD6wAI-44",
          "source_label": "Are \ndesign requirements \nassured?",
          "label": "Are design requirements assured?",
          "kind": "decision",
          "criticality": "ba",
          "x": 995,
          "y": 435,
          "w": 230,
          "h": 100,
          "region": "model-vv",
          "groups": [
            "software-system-vv",
            "safety-normative"
          ],
          "wizard_stages": [
            4,
            5
          ],
          "description": "Review integrated design requirements, interfaces, fallback, hazard controls, and the evidence used to support the system-level assurance claim.",
          "user_question": "Are integrated design requirements, hazard controls, fallback provisions, and residual-risk decisions supported and authorised?"
        },
        {
          "id": "model-imvv",
          "source_id": "Atoau5tYlu5lBZZD6wAI-16",
          "source_label": "Model \nIMVV",
          "label": "Model IMVV",
          "kind": "activity",
          "criticality": "ba",
          "x": 700,
          "y": 420,
          "w": 145,
          "h": 80,
          "region": "model-vv",
          "groups": [
            "imvv"
          ],
          "wizard_stages": [
            2,
            3,
            4
          ],
          "description": "Activate the documented independent model verification and validation challenge when project criticality and risk require organisational, technical, or decisional independence.",
          "user_question": "Is the independence need documented, and are the independent scope, evidence, criteria, interfaces, and authority boundaries configured before review?"
        },
        {
          "id": "imvv-activity-assured",
          "source_id": "Atoau5tYlu5lBZZD6wAI-20",
          "source_label": "Are \nrequirements\nand IMVV activity \nassured?",
          "label": "Are requirements and IMVV activity assured?",
          "kind": "decision",
          "criticality": "ba",
          "x": 430,
          "y": 420,
          "w": 230,
          "h": 105,
          "region": "model-vv",
          "groups": [
            "imvv",
            "safety-normative"
          ],
          "wizard_stages": [
            4,
            5
          ],
          "description": "Determine whether independent challenge findings, retest evidence, waivers, and closure records support the required assurance conclusion. A negative result returns to design correction.",
          "user_question": "Have all independent findings been resolved, retested, waived, or explicitly retained by the designated closure authority?"
        },
        {
          "id": "imvv-output",
          "source_id": "Atoau5tYlu5lBZZD6wAI-28",
          "source_label": "Independent Model \nVerification and Validation",
          "label": "Independent Model Verification and Validation",
          "kind": "output",
          "criticality": "ba",
          "x": 690,
          "y": 545,
          "w": 250,
          "h": 60,
          "region": "model-vv",
          "groups": [
            "imvv"
          ],
          "wizard_stages": [
            5,
            6
          ],
          "description": "The controlled IMVV output records the independent scope, evidence reviewed, findings, retest, waiver or disposition, closure authority, and residual limitations.",
          "user_question": "Is the independent output configuration-controlled, traceable to findings and evidence, and accepted by the named authority?"
        },
        {
          "id": "all-steps-completed",
          "source_id": "Atoau5tYlu5lBZZD6wAI-38",
          "source_label": "All steps completed",
          "label": "All steps completed",
          "kind": "complete",
          "criticality": "all",
          "cx": 925,
          "cy": 330,
          "r": 22,
          "region": "model-vv",
          "groups": [
            "safety-normative"
          ],
          "wizard_stages": [
            5,
            6
          ],
          "description": "The flow reaches this state only after the applicable path has evidence-backed decisions and authorised closure. In the companion, the corresponding output is the final checklist-conformity record for the selected baseline.",
          "user_question": "Has the designated authority accepted the disposition of every applicable control and every retained residual limitation?",
          "label_source_id": "Atoau5tYlu5lBZZD6wAI-54"
        }
      ],
      "edges": [
        {
          "id": "configuration-data",
          "source_id": "Atoau5tYlu5lBZZD6wAI-4",
          "from": "configuration-management",
          "to": "data-management",
          "path": "M 195 176 L 195 250",
          "bidirectional": true,
          "label": "controlled baseline",
          "label_x": 206,
          "label_y": 220
        },
        {
          "id": "data-decision",
          "source_id": "Atoau5tYlu5lBZZD6wAI-6",
          "from": "data-management",
          "to": "data-requirements-assured",
          "path": "M 200 326 L 200 400"
        },
        {
          "id": "data-no",
          "source_id": "Atoau5tYlu5lBZZD6wAI-8",
          "from": "data-requirements-assured",
          "to": "data-management",
          "path": "M 65 444 L 34 444 L 34 288 L 110 288",
          "outcome": "No",
          "label": "No: Improve dataset",
          "label_x": 40,
          "label_y": 370
        },
        {
          "id": "data-yes",
          "source_id": "Atoau5tYlu5lBZZD6wAI-11",
          "from": "data-requirements-assured",
          "to": "model-learning",
          "path": "M 335 444 L 382 444 L 382 199 L 425 199",
          "outcome": "Yes",
          "label": "Yes",
          "label_x": 350,
          "label_y": 430
        },
        {
          "id": "learning-model-decision",
          "source_id": "Atoau5tYlu5lBZZD6wAI-13",
          "from": "model-learning",
          "to": "model-requirements-assured",
          "path": "M 575 199 L 620 190"
        },
        {
          "id": "model-no",
          "source_id": "Atoau5tYlu5lBZZD6wAI-25",
          "from": "model-requirements-assured",
          "to": "model-learning",
          "path": "M 745 140 L 745 82 L 500 82 L 500 160",
          "outcome": "No",
          "label": "No: improve model definition and/or training method",
          "label_x": 515,
          "label_y": 68
        },
        {
          "id": "model-cat-c",
          "source_id": "SSdyoXZw2NnMWia9ZhrV-1",
          "from": "model-requirements-assured",
          "to": "all-steps-completed",
          "path": "M 870 190 L 925 190 L 925 306",
          "outcome": "Yes: Cat C",
          "label": "Yes: Cat C",
          "label_x": 875,
          "label_y": 175
        },
        {
          "id": "model-embedding",
          "source_id": "Atoau5tYlu5lBZZD6wAI-21",
          "from": "model-requirements-assured",
          "to": "model-deployment",
          "path": "M 745 140 L 745 42 L 1395 42 L 1395 130",
          "outcome": "Model embedding needed",
          "label": "Model embedding needed / Cat A-B path",
          "label_x": 1000,
          "label_y": 30
        },
        {
          "id": "deployment-embedded",
          "source_id": "Atoau5tYlu5lBZZD6wAI-45",
          "from": "model-deployment",
          "to": "embedded-model-assured",
          "path": "M 1395 210 L 1395 315 L 1225 315"
        },
        {
          "id": "embedded-no",
          "source_id": "Atoau5tYlu5lBZZD6wAI-30",
          "from": "embedded-model-assured",
          "to": "model-deployment",
          "path": "M 1225 315 L 1510 315 L 1510 170 L 1470 170",
          "outcome": "No",
          "label": "No: Improve embedding strategies",
          "label_x": 1260,
          "label_y": 342
        },
        {
          "id": "embedded-yes",
          "source_id": "Atoau5tYlu5lBZZD6wAI-34",
          "from": "embedded-model-assured",
          "to": "design-requirements-assured",
          "path": "M 1110 370 L 1110 435",
          "outcome": "Yes",
          "label": "Yes",
          "label_x": 1122,
          "label_y": 409
        },
        {
          "id": "design-cat-c",
          "source_id": "Atoau5tYlu5lBZZD6wAI-42",
          "from": "design-requirements-assured",
          "to": "all-steps-completed",
          "path": "M 995 485 L 925 485 L 925 354",
          "outcome": "Yes: Cat C",
          "label": "Yes: Cat C",
          "label_x": 930,
          "label_y": 470
        },
        {
          "id": "design-cat-ab",
          "source_id": "Atoau5tYlu5lBZZD6wAI-32",
          "from": "design-requirements-assured",
          "to": "model-imvv",
          "path": "M 995 485 L 845 485",
          "outcome": "Yes: Cat A/B",
          "label": "Yes: Cat A/B",
          "label_x": 865,
          "label_y": 470
        },
        {
          "id": "imvv-review",
          "source_id": "Atoau5tYlu5lBZZD6wAI-15",
          "from": "model-imvv",
          "to": "imvv-activity-assured",
          "path": "M 700 460 L 660 460"
        },
        {
          "id": "imvv-output-relation",
          "source_id": null,
          "from": "model-imvv",
          "to": "imvv-output",
          "path": "M 772 500 L 772 545",
          "relation": true,
          "label": "controlled output",
          "label_x": 782,
          "label_y": 530
        },
        {
          "id": "imvv-yes",
          "source_id": "Atoau5tYlu5lBZZD6wAI-17",
          "from": "imvv-activity-assured",
          "to": "all-steps-completed",
          "path": "M 545 420 L 545 330 L 901 330",
          "outcome": "Yes",
          "label": "Yes",
          "label_x": 675,
          "label_y": 316
        },
        {
          "id": "imvv-no",
          "source_id": "Atoau5tYlu5lBZZD6wAI-18",
          "source_inference": "The export contains an unattached edge labelled “No: Check design”; the rendered Figure 2 shows it as the feedback path from the IMVV assurance decision to design assurance.",
          "from": "imvv-activity-assured",
          "to": "design-requirements-assured",
          "path": "M 545 525 L 545 585 L 1110 585 L 1110 535",
          "outcome": "No",
          "label": "No: Check design",
          "label_x": 605,
          "label_y": 573
        }
      ],
      "tour": [
        "configuration-management",
        "data-management",
        "data-requirements-assured",
        "model-learning",
        "model-requirements-assured",
        "model-deployment",
        "embedded-model-assured",
        "design-requirements-assured",
        "model-imvv",
        "imvv-activity-assured",
        "imvv-output",
        "all-steps-completed"
      ],
      "legend": [
        {
          "key": "activity-all",
          "label": "Activity for all criticality"
        },
        {
          "key": "activity-ba",
          "label": "Activity for criticality B & A"
        },
        {
          "key": "decision",
          "label": "Decision point"
        },
        {
          "key": "output",
          "label": "Controlled output"
        },
        {
          "key": "complete",
          "label": "All steps completed"
        }
      ]
    },
    {
      "id": "lifecycle-gates",
      "title": "Lifecycle phases and review gates",
      "short_title": "Lifecycle & gates",
      "figure_reference": "Figure 3",
      "view_box": [
        0,
        0,
        1500,
        500
      ],
      "intro": "Explore the five lifecycle phases, their ECSS-oriented review gates, and the two cross-cutting controls. Exact review names and phasing remain subject to contractual tailoring.",
      "regions": [],
      "nodes": [
        {
          "id": "scope-phase",
          "source_id": "fig3-phase-1",
          "source_label": "Scoping, criticality, and ML safety requirements",
          "label": "Scoping, criticality, and ML safety requirements",
          "kind": "phase",
          "x": 55,
          "y": 105,
          "w": 230,
          "h": 90,
          "groups": [
            "governance",
            "safety-normative"
          ],
          "wizard_stages": [
            1,
            2
          ],
          "description": "Define the assurance boundary, criticality rationale, ML safety requirements, ODD, hazards, authority, and review-plan assumptions before checklist tailoring.",
          "user_question": "Which checklist groups, evidence baselines, and authority decisions are required before the project leaves this lifecycle phase?"
        },
        {
          "id": "data-phase",
          "source_id": "fig3-phase-2",
          "source_label": "Data assurance and configuration baseline",
          "label": "Data assurance and configuration baseline",
          "kind": "phase",
          "x": 335,
          "y": 105,
          "w": 230,
          "h": 90,
          "groups": [
            "data-assurance",
            "configuration-traceability"
          ],
          "wizard_stages": [
            3,
            4
          ],
          "description": "Establish controlled data and configuration baselines, provenance, quality evidence, partitions, and bidirectional traceability before model acceptance claims are reviewed.",
          "user_question": "Which checklist groups, evidence baselines, and authority decisions are required before the project leaves this lifecycle phase?"
        },
        {
          "id": "learning-phase",
          "source_id": "fig3-phase-3",
          "source_label": "Model learning, selection, and design",
          "label": "Model learning, selection, and design",
          "kind": "phase",
          "x": 615,
          "y": 105,
          "w": 230,
          "h": 90,
          "groups": [
            "model-learning"
          ],
          "wizard_stages": [
            3,
            4
          ],
          "description": "Configure and review the reproducible training, candidate comparison, selection, model design, and mismatch-analysis evidence.",
          "user_question": "Which checklist groups, evidence baselines, and authority decisions are required before the project leaves this lifecycle phase?"
        },
        {
          "id": "vv-phase",
          "source_id": "fig3-phase-4",
          "source_label": "Model, software, and system V&V",
          "label": "Model, software, and system V&V",
          "kind": "phase",
          "x": 895,
          "y": 105,
          "w": 230,
          "h": 90,
          "groups": [
            "model-vv",
            "software-system-vv"
          ],
          "wizard_stages": [
            3,
            4,
            5
          ],
          "description": "Assess model criteria, target implementation, interfaces, integrated-system behaviour, robustness, fallback, and hazard-control evidence.",
          "user_question": "Which checklist groups, evidence baselines, and authority decisions are required before the project leaves this lifecycle phase?"
        },
        {
          "id": "deployment-phase",
          "source_id": "fig3-phase-5",
          "source_label": "Deployment, operation, and controlled change",
          "label": "Deployment, operation, and controlled change",
          "kind": "phase",
          "x": 1175,
          "y": 105,
          "w": 230,
          "h": 90,
          "groups": [
            "deployment-change"
          ],
          "wizard_stages": [
            3,
            4,
            5,
            6
          ],
          "description": "Control conversion, release, target equivalence, monitoring, rollback, anomalies, maintenance, and requalification after change.",
          "user_question": "Which checklist groups, evidence baselines, and authority decisions are required before the project leaves this lifecycle phase?"
        },
        {
          "id": "gate-srr-pdr",
          "source_id": "fig3-gate-1",
          "source_label": "SRR / PDR",
          "label": "SRR / PDR",
          "kind": "gate",
          "x": 55,
          "y": 330,
          "w": 230,
          "h": 60,
          "groups": [
            "governance"
          ],
          "wizard_stages": [
            3,
            5
          ],
          "description": "Confirm entry, evidence, actions, and authority for the project-defined SRR/PDR gate.",
          "user_question": "Are the gate entry/exit criteria, evidence package, actions, decision, closure authority, and residual limitations recorded?"
        },
        {
          "id": "gate-pdr-cdr",
          "source_id": "fig3-gate-2",
          "source_label": "PDR / CDR",
          "label": "PDR / CDR",
          "kind": "gate",
          "x": 335,
          "y": 330,
          "w": 230,
          "h": 60,
          "groups": [
            "governance",
            "data-assurance"
          ],
          "wizard_stages": [
            3,
            5
          ],
          "description": "Review the controlled design and data baselines at the applicable PDR/CDR gate.",
          "user_question": "Are the gate entry/exit criteria, evidence package, actions, decision, closure authority, and residual limitations recorded?"
        },
        {
          "id": "gate-cdr-trr",
          "source_id": "fig3-gate-3",
          "source_label": "CDR / TRR",
          "label": "CDR / TRR",
          "kind": "gate",
          "x": 615,
          "y": 330,
          "w": 230,
          "h": 60,
          "groups": [
            "governance",
            "model-learning"
          ],
          "wizard_stages": [
            3,
            5
          ],
          "description": "Confirm design maturity and test readiness using the contractually applicable CDR/TRR evidence.",
          "user_question": "Are the gate entry/exit criteria, evidence package, actions, decision, closure authority, and residual limitations recorded?"
        },
        {
          "id": "gate-trr-qr",
          "source_id": "fig3-gate-4",
          "source_label": "TRR / QR or project VVR",
          "label": "TRR / QR or project VVR",
          "kind": "gate",
          "x": 895,
          "y": 330,
          "w": 230,
          "h": 60,
          "groups": [
            "governance",
            "model-vv",
            "software-system-vv"
          ],
          "wizard_stages": [
            4,
            5
          ],
          "description": "Review verification readiness and qualification or project-level V&V results. “VVR” is used only when the applicable review plan defines it.",
          "user_question": "Are the gate entry/exit criteria, evidence package, actions, decision, closure authority, and residual limitations recorded?"
        },
        {
          "id": "gate-ar-orr",
          "source_id": "fig3-gate-5",
          "source_label": "AR / project ORR",
          "label": "AR / project ORR",
          "kind": "gate",
          "x": 1175,
          "y": 330,
          "w": 230,
          "h": 60,
          "groups": [
            "governance",
            "deployment-change"
          ],
          "wizard_stages": [
            4,
            5,
            6
          ],
          "description": "Record acceptance or operational-readiness disposition. “ORR” is a project-level label used only when the applicable review plan defines it.",
          "user_question": "Are the gate entry/exit criteria, evidence package, actions, decision, closure authority, and residual limitations recorded?"
        },
        {
          "id": "configuration-band",
          "source_id": "fig3-band-configuration",
          "source_label": "Configuration management and bidirectional traceability across every baseline",
          "label": "Configuration management and bidirectional traceability across every baseline",
          "kind": "band",
          "x": 35,
          "y": 55,
          "w": 1390,
          "h": 190,
          "groups": [
            "configuration-traceability"
          ],
          "wizard_stages": [
            1,
            3,
            4,
            6
          ],
          "description": "Configuration management and bidirectional assurance traceability span every lifecycle phase and baseline. The band is cross-cutting, not a separate terminal phase.",
          "user_question": "Can every reviewed result be traced to the exact requirement, hazard, assumption, dataset, model, software, tool, test, finding, and decision baseline?",
          "band_position": "top"
        },
        {
          "id": "imvv-band",
          "source_id": "fig3-band-imvv",
          "source_label": "IMVV challenge and finding management when activated by criticality and risk",
          "label": "IMVV challenge and finding management when activated by criticality and risk",
          "kind": "band",
          "x": 315,
          "y": 285,
          "w": 1110,
          "h": 145,
          "groups": [
            "imvv"
          ],
          "wizard_stages": [
            2,
            3,
            4,
            5
          ],
          "description": "IMVV challenge and finding management spans the relevant review interval when the documented independence need is activated by criticality and risk.",
          "user_question": "Has the project defined when independent challenge starts, what it covers, how findings are controlled, and who may close them?",
          "band_position": "bottom"
        }
      ],
      "edges": [
        {
          "id": "scope-phase-data-phase",
          "from": "scope-phase",
          "to": "data-phase",
          "path": "M 285 150.0 L 335 150.0"
        },
        {
          "id": "data-phase-learning-phase",
          "from": "data-phase",
          "to": "learning-phase",
          "path": "M 565 150.0 L 615 150.0"
        },
        {
          "id": "learning-phase-vv-phase",
          "from": "learning-phase",
          "to": "vv-phase",
          "path": "M 845 150.0 L 895 150.0"
        },
        {
          "id": "vv-phase-deployment-phase",
          "from": "vv-phase",
          "to": "deployment-phase",
          "path": "M 1125 150.0 L 1175 150.0"
        },
        {
          "id": "scope-phase-gate-srr-pdr",
          "from": "scope-phase",
          "to": "gate-srr-pdr",
          "path": "M 170.0 195 L 170.0 330",
          "relation": true
        },
        {
          "id": "data-phase-gate-pdr-cdr",
          "from": "data-phase",
          "to": "gate-pdr-cdr",
          "path": "M 450.0 195 L 450.0 330",
          "relation": true
        },
        {
          "id": "learning-phase-gate-cdr-trr",
          "from": "learning-phase",
          "to": "gate-cdr-trr",
          "path": "M 730.0 195 L 730.0 330",
          "relation": true
        },
        {
          "id": "vv-phase-gate-trr-qr",
          "from": "vv-phase",
          "to": "gate-trr-qr",
          "path": "M 1010.0 195 L 1010.0 330",
          "relation": true
        },
        {
          "id": "deployment-phase-gate-ar-orr",
          "from": "deployment-phase",
          "to": "gate-ar-orr",
          "path": "M 1290.0 195 L 1290.0 330",
          "relation": true
        }
      ],
      "tour": [
        "scope-phase",
        "gate-srr-pdr",
        "data-phase",
        "gate-pdr-cdr",
        "learning-phase",
        "gate-cdr-trr",
        "vv-phase",
        "gate-trr-qr",
        "deployment-phase",
        "gate-ar-orr",
        "configuration-band",
        "imvv-band"
      ],
      "legend": [
        {
          "key": "phase",
          "label": "Lifecycle phase"
        },
        {
          "key": "gate",
          "label": "ECSS-oriented or project-defined gate"
        },
        {
          "key": "band-configuration",
          "label": "Cross-cutting configuration and traceability"
        },
        {
          "key": "band-imvv",
          "label": "Risk-triggered IMVV challenge and finding management"
        }
      ]
    }
  ]
};
