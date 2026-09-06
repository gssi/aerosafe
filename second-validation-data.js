window.AEROSAFE_SECOND_VALIDATION = {
  "metadata": {
    "title": "Second checklist-focused practitioner validation",
    "validation_question": "To what extent are the final 52 Aerosafe controls understandable without author assistance, perceived to cover expected ECSS-oriented AI/ML software-assurance obligations, and acceptable in effort, and where is clarification or project tailoring still required?",
    "instrument_version": "AREV-52-self-contained-2026-08-31",
    "collection_period": "31 August-2 September 2026",
    "respondent_count": 5,
    "control_count": 52,
    "control_rating_count": 260,
    "complete_control_ratings": 260,
    "group_count": 9,
    "source_sha256": "ae171bee9c45795018ef4ab31d9003dab32010a95a68fa5f6fb6f4e2c9da1ab3",
    "form_source_sha256": "687d09b09d89fa04c98dc829c47b4cae1926ac5c5e35591eab50a57e83bde87f",
    "clarification_source_sha256": "3e9e240130e2a8b5c022656fa8acf7a8133d6b60a5188e3b188bd8fb460b0166"
  },
  "instrument": {
    "purpose": "A self-contained rapid review of the final nine-group, 52-control catalogue. Participants did not need to read the paper or companion website.",
    "profile_questions": [
      "Primary professional background",
      "ECSS experience",
      "AI/ML experience"
    ],
    "control_prompt": "For each control, judge whether it is clear, justified, and usable on the basis of the self-contained group objective, scope, lifecycle position, and tailoring note.",
    "rating_choices": [
      {
        "code": "A",
        "label": "Clear and usable as written"
      },
      {
        "code": "B",
        "label": "Useful, but needs clarification/tailoring"
      },
      {
        "code": "C",
        "label": "Unclear, impractical, or not justified"
      },
      {
        "code": "X",
        "label": "Outside my expertise / cannot assess"
      }
    ],
    "group_comment_prompt": "Optional comments after each checklist group.",
    "overall_questions": [
      "The 52 controls are understandable enough to be applied without author assistance.",
      "The 52 controls cover the main AI/ML software-assurance obligations I would expect in an ECSS-oriented project.",
      "The effort required to use this checklist is acceptable for project assurance/review activities."
    ],
    "overall_scale": {
      "minimum": 1,
      "minimum_label": "Strongly disagree",
      "maximum": 5,
      "maximum_label": "Strongly agree"
    },
    "open_question": "Are any important assurance controls missing, redundant, or misplaced?",
    "completion_time_question": "Approximate completion time (minutes)"
  },
  "participants": [
    {
      "id": "V1",
      "collection_date": "8/31/2026",
      "background": "Software Product Assurance",
      "ecss_experience": "3-5 years",
      "aiml_experience": "0-2 years",
      "rating_counts": {
        "A": 1,
        "B": 51,
        "C": 0,
        "X": 0
      }
    },
    {
      "id": "V2",
      "collection_date": "8/31/2026",
      "background": "Software Product Assurance",
      "ecss_experience": "3-5 years",
      "aiml_experience": "0-2 years",
      "rating_counts": {
        "A": 52,
        "B": 0,
        "C": 0,
        "X": 0
      }
    },
    {
      "id": "V3",
      "collection_date": "9/1/2026",
      "background": "Software Product Assurance",
      "ecss_experience": "6-10 years",
      "aiml_experience": "0-2 years",
      "rating_counts": {
        "A": 35,
        "B": 4,
        "C": 0,
        "X": 13
      }
    },
    {
      "id": "V4",
      "collection_date": "9/2/2026",
      "background": "AI/ML, Data Engineering, or Statistics",
      "ecss_experience": "3-5 years",
      "aiml_experience": "3-5 years",
      "rating_counts": {
        "A": 36,
        "B": 9,
        "C": 0,
        "X": 7
      }
    },
    {
      "id": "V5",
      "collection_date": "9/2/2026",
      "background": "V&V, IV&V, or IMVV",
      "ecss_experience": "11-15 years",
      "aiml_experience": "0-2 years",
      "rating_counts": {
        "A": 43,
        "B": 4,
        "C": 0,
        "X": 5
      }
    }
  ],
  "overall": {
    "counts": {
      "A": 167,
      "B": 68,
      "C": 0,
      "X": 25
    },
    "percentages": {
      "A": 64.2,
      "B": 26.2,
      "C": 0.0,
      "X": 9.6
    },
    "assessable_count": 235,
    "a_among_assessable": 71.1,
    "b_among_assessable": 28.9,
    "c_among_assessable": 0.0,
    "response_pattern": {
      "participant": "V1",
      "b_count": 51,
      "b_share_of_all_b": 75.0,
      "remaining_participants": 4,
      "remaining_counts": {
        "A": 166,
        "B": 17,
        "C": 0,
        "X": 25
      },
      "remaining_a_among_assessable": 90.7,
      "remaining_b_among_assessable": 9.3,
      "interpretation": "All five responses remain in the primary analysis. This descriptive sensitivity view is reported only to show that B selections are strongly concentrated in one response pattern; it is not an exclusion rule."
    }
  },
  "groups": [
    {
      "id": "governance",
      "code": "SC/FR",
      "name": "Scope, Review, and Planning Checklists",
      "objective": "Define the AI/ML assurance boundary and control the entry, evidence, action, and closure conditions of project reviews.",
      "tailoring": "Review names and phasing follow the contractual plan; VVR and ORR are used only when project-defined.",
      "control_count": 7,
      "rating_count": 35,
      "counts": {
        "A": 26,
        "B": 7,
        "C": 0,
        "X": 2
      },
      "percentages": {
        "A": 74.3,
        "B": 20.0,
        "C": 0.0,
        "X": 5.7
      },
      "assessable_count": 33,
      "a_among_assessable": 78.8,
      "b_among_assessable": 21.2,
      "items_with_b": 7,
      "items_with_repeated_b": 0,
      "clarification": "Review names and timing follow the contractual review plan. The control requires an equivalent decision point with named input evidence, actions, and closure authority; it does not mandate an additional review merely because a label appears in Aerosafe."
    },
    {
      "id": "configuration-traceability",
      "code": "CM/TR",
      "name": "Configuration and Traceability Checklists",
      "objective": "Control datasets, models, code, tools, releases, changes, and bidirectional assurance links.",
      "tailoring": "Baseline and lifecycle traceability are minimum controls; runtime logging is conditional on architecture, resources, and purpose.",
      "control_count": 5,
      "rating_count": 25,
      "counts": {
        "A": 18,
        "B": 6,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 72.0,
        "B": 24.0,
        "C": 0.0,
        "X": 4.0
      },
      "assessable_count": 24,
      "a_among_assessable": 75.0,
      "b_among_assessable": 25.0,
      "items_with_b": 5,
      "items_with_repeated_b": 1,
      "clarification": "Traceability depth and runtime diagnostics are tailored to architecture, observability, mission constraints, and assurance purpose. Infeasible links or logging require a documented rationale and compensating evidence rather than silent omission."
    },
    {
      "id": "data-assurance",
      "code": "DM",
      "name": "Data Assurance Checklists",
      "objective": "Establish data requirements, provenance, quality, partition independence, ODD coverage, integrity, and context-dependent privacy or disparity controls.",
      "tailoring": "Integrity, provenance, and evidence fitness form the baseline; privacy and fairness depend on data, affected strata, and obligations.",
      "control_count": 9,
      "rating_count": 45,
      "counts": {
        "A": 29,
        "B": 11,
        "C": 0,
        "X": 5
      },
      "percentages": {
        "A": 64.4,
        "B": 24.4,
        "C": 0.0,
        "X": 11.1
      },
      "assessable_count": 40,
      "a_among_assessable": 72.5,
      "b_among_assessable": 27.5,
      "items_with_b": 8,
      "items_with_repeated_b": 2,
      "clarification": "Data controls apply to the data role and the claims being supported. Provenance, uncertainty, disagreement, partition dependence, and residual coverage gaps must be recorded; privacy and disparity controls activate only where the application and obligations make them meaningful."
    },
    {
      "id": "model-learning",
      "code": "ML",
      "name": "Model Learning Checklists",
      "objective": "Make training, candidate comparison, selection, mismatch analysis, and assurance-relevant explainability reproducible and reviewable.",
      "tailoring": "Core reproducibility and selection records are minimum; explainability is conditional on the claim, user, model, and method validity.",
      "control_count": 4,
      "rating_count": 20,
      "counts": {
        "A": 11,
        "B": 7,
        "C": 0,
        "X": 2
      },
      "percentages": {
        "A": 55.0,
        "B": 35.0,
        "C": 0.0,
        "X": 10.0
      },
      "assessable_count": 18,
      "a_among_assessable": 61.1,
      "b_among_assessable": 38.9,
      "items_with_b": 4,
      "items_with_repeated_b": 2,
      "clarification": "The controls prescribe reviewable outcomes, not a universal learning algorithm. Diagnostics and explainability methods are selected according to the requirement, model, intended user, decision, and demonstrated validity of the method."
    },
    {
      "id": "model-vv",
      "code": "MV",
      "name": "Model Verification and Validation Checklists",
      "objective": "Predeclare model-level criteria and assess independent data, scenarios, robustness, uncertainty, OOD behaviour, and intended-use adequacy.",
      "tailoring": "Requirements-linked V&V is minimum for claimed properties; formal and adversarial techniques are conditional on a property or threat model.",
      "control_count": 7,
      "rating_count": 35,
      "counts": {
        "A": 21,
        "B": 11,
        "C": 0,
        "X": 3
      },
      "percentages": {
        "A": 60.0,
        "B": 31.4,
        "C": 0.0,
        "X": 8.6
      },
      "assessable_count": 32,
      "a_among_assessable": 65.6,
      "b_among_assessable": 34.4,
      "items_with_b": 7,
      "items_with_repeated_b": 4,
      "clarification": "Scenario, robustness, formal, and adversarial techniques are activated by the claimed property, hazards, ODD, credible threat model, and safety reliance. Justified alternative evidence or N.A. treatment remains possible with named authority approval."
    },
    {
      "id": "software-system-vv",
      "code": "SV/SY",
      "name": "Software and System V&V Checklists",
      "objective": "Separate model evidence from implementation, target, interface, integrated-system, hazard-control, and fallback evidence.",
      "tailoring": "Software evidence is required for deployed implementations; integrated system evidence is required before operational acceptance.",
      "control_count": 2,
      "rating_count": 10,
      "counts": {
        "A": 7,
        "B": 3,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 70.0,
        "B": 30.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 10,
      "a_among_assessable": 70.0,
      "b_among_assessable": 30.0,
      "items_with_b": 2,
      "items_with_repeated_b": 1,
      "clarification": "Model, software, and system evidence are distinct. This group checks the implementation surrounding the model and the integrated function, interfaces, hazard controls, fallback, and mission context; model metrics alone do not satisfy it."
    },
    {
      "id": "deployment-change",
      "code": "DP",
      "name": "Deployment, Operations, and Change Checklists",
      "objective": "Control conversion, target equivalence, release, rollback, monitoring, fallback, anomalies, maintenance, and requalification triggers.",
      "tailoring": "Target/release controls apply when deployed; monitoring, fallback, and safety cages depend on observability, architecture, mission, and hazards.",
      "control_count": 8,
      "rating_count": 40,
      "counts": {
        "A": 24,
        "B": 10,
        "C": 0,
        "X": 6
      },
      "percentages": {
        "A": 60.0,
        "B": 25.0,
        "C": 0.0,
        "X": 15.0
      },
      "assessable_count": 34,
      "a_among_assessable": 70.6,
      "b_among_assessable": 29.4,
      "items_with_b": 8,
      "items_with_repeated_b": 2,
      "clarification": "A deployment control applies when the corresponding conversion, target, release, monitoring, fallback, or change mechanism exists. Equivalence limits must be predeclared, while monitoring and fallback remain mission-, architecture-, and risk-dependent."
    },
    {
      "id": "safety-normative",
      "code": "SA",
      "name": "Safety Argument and Normative-Status Checklists",
      "objective": "Connect hazards to evidence and residual-risk decisions while distinguishing contractual requirements, guidance, and Aerosafe recommendations.",
      "tailoring": "Argument depth follows safety reliance and project risk; source/status must never imply ECSS normativity without an applicable contractual clause.",
      "control_count": 4,
      "rating_count": 20,
      "counts": {
        "A": 13,
        "B": 7,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 65.0,
        "B": 35.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 20,
      "a_among_assessable": 65.0,
      "b_among_assessable": 35.0,
      "items_with_b": 4,
      "items_with_repeated_b": 3,
      "clarification": "Any structured argument notation may be used if claims, context, assumptions, strategy, evidence, findings, residuals, and authority decisions remain explicit. Source/status classification records normativity; it does not create a contractual obligation."
    },
    {
      "id": "imvv",
      "code": "IV",
      "name": "Independent Model Verification and Validation Checklists",
      "objective": "Plan and execute risk-triggered independent challenge of AI-specific evidence, independence arrangements, findings, retest, waiver, and closure.",
      "tailoring": "IMVV is risk-triggered; the independent team raises and verifies findings, while the designated project/customer authority closes them.",
      "control_count": 6,
      "rating_count": 30,
      "counts": {
        "A": 18,
        "B": 6,
        "C": 0,
        "X": 6
      },
      "percentages": {
        "A": 60.0,
        "B": 20.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 24,
      "a_among_assessable": 75.0,
      "b_among_assessable": 25.0,
      "items_with_b": 6,
      "items_with_repeated_b": 0,
      "clarification": "Independence arrangements are tailored to project risk and contract, but organisational, technical, and decisional independence and formal closure authority must be named. IMVV challenges evidence and verifies finding resolution; it does not automatically own residual-risk acceptance."
    }
  ],
  "items": [
    {
      "id": "SC-01",
      "group_name": "Scope, Review, and Planning Checklists",
      "group_code": "SC/FR",
      "group_id": "governance",
      "administered_wording": "Define the AI/ML boundary, ODD, decision authority, interfaces, compensating provisions, and criticality rationale.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 4,
        "B": 1,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 80.0,
        "B": 20.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 80.0,
      "b_among_assessable": 20.0,
      "clarification_level": "group",
      "group_clarification": "Review names and timing follow the contractual review plan. The control requires an equivalent decision point with named input evidence, actions, and closure authority; it does not mandate an additional review merely because a label appears in Aerosafe.",
      "targeted_clarification": null
    },
    {
      "id": "FR-01",
      "group_name": "Scope, Review, and Planning Checklists",
      "group_code": "SC/FR",
      "group_id": "governance",
      "administered_wording": "Review requirements and the AI assurance scope at SRR.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 4,
        "B": 1,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 80.0,
        "B": 20.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 80.0,
      "b_among_assessable": 20.0,
      "clarification_level": "group",
      "group_clarification": "Review names and timing follow the contractual review plan. The control requires an equivalent decision point with named input evidence, actions, and closure authority; it does not mandate an additional review merely because a label appears in Aerosafe.",
      "targeted_clarification": null
    },
    {
      "id": "FR-02",
      "group_name": "Scope, Review, and Planning Checklists",
      "group_code": "SC/FR",
      "group_id": "governance",
      "administered_wording": "Review the data strategy, architecture, model-class rationale, fallback concept, and verification plan.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 4,
        "B": 1,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 80.0,
        "B": 20.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 80.0,
      "b_among_assessable": 20.0,
      "clarification_level": "group",
      "group_clarification": "Review names and timing follow the contractual review plan. The control requires an equivalent decision point with named input evidence, actions, and closure authority; it does not mandate an additional review merely because a label appears in Aerosafe.",
      "targeted_clarification": null
    },
    {
      "id": "FR-03",
      "group_name": "Scope, Review, and Planning Checklists",
      "group_code": "SC/FR",
      "group_id": "governance",
      "administered_wording": "Review the detailed model/software design and freeze the development baseline.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 4,
        "B": 1,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 80.0,
        "B": 20.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 80.0,
      "b_among_assessable": 20.0,
      "clarification_level": "group",
      "group_clarification": "Review names and timing follow the contractual review plan. The control requires an equivalent decision point with named input evidence, actions, and closure authority; it does not mandate an additional review merely because a label appears in Aerosafe.",
      "targeted_clarification": null
    },
    {
      "id": "FR-04",
      "group_name": "Scope, Review, and Planning Checklists",
      "group_code": "SC/FR",
      "group_id": "governance",
      "administered_wording": "Establish test readiness for model, software, system, and independent-assessment activities.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 4,
        "B": 1,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 80.0,
        "B": 20.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 80.0,
      "b_among_assessable": 20.0,
      "clarification_level": "group",
      "group_clarification": "Review names and timing follow the contractual review plan. The control requires an equivalent decision point with named input evidence, actions, and closure authority; it does not mandate an additional review merely because a label appears in Aerosafe.",
      "targeted_clarification": null
    },
    {
      "id": "FR-05",
      "group_name": "Scope, Review, and Planning Checklists",
      "group_code": "SC/FR",
      "group_id": "governance",
      "administered_wording": "Assess qualification/V&V evidence, anomalies, limitations, waivers, and IMVV findings.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "X",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 1,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 60.0,
        "B": 20.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 75.0,
      "b_among_assessable": 25.0,
      "clarification_level": "group",
      "group_clarification": "Review names and timing follow the contractual review plan. The control requires an equivalent decision point with named input evidence, actions, and closure authority; it does not mandate an additional review merely because a label appears in Aerosafe.",
      "targeted_clarification": null
    },
    {
      "id": "FR-06",
      "group_name": "Scope, Review, and Planning Checklists",
      "group_code": "SC/FR",
      "group_id": "governance",
      "administered_wording": "Accept one controlled release together with its ODD, operating limitations, rollback, and change controls.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "X",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 1,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 60.0,
        "B": 20.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 75.0,
      "b_among_assessable": 25.0,
      "clarification_level": "group",
      "group_clarification": "Review names and timing follow the contractual review plan. The control requires an equivalent decision point with named input evidence, actions, and closure authority; it does not mandate an additional review merely because a label appears in Aerosafe.",
      "targeted_clarification": null
    },
    {
      "id": "CM-01",
      "group_name": "Configuration and Traceability Checklists",
      "group_code": "CM/TR",
      "group_id": "configuration-traceability",
      "administered_wording": "Configuration-control datasets, labels, partitions, and transformations.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 4,
        "B": 1,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 80.0,
        "B": 20.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 80.0,
      "b_among_assessable": 20.0,
      "clarification_level": "group",
      "group_clarification": "Traceability depth and runtime diagnostics are tailored to architecture, observability, mission constraints, and assurance purpose. Infeasible links or logging require a documented rationale and compensating evidence rather than silent omission.",
      "targeted_clarification": null
    },
    {
      "id": "CM-02",
      "group_name": "Configuration and Traceability Checklists",
      "group_code": "CM/TR",
      "group_id": "configuration-traceability",
      "administered_wording": "Configuration-control code, parameters, weights, tools, converters, monitors, and target binaries.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "X",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 1,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 60.0,
        "B": 20.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 75.0,
      "b_among_assessable": 25.0,
      "clarification_level": "group",
      "group_clarification": "Traceability depth and runtime diagnostics are tailored to architecture, observability, mission constraints, and assurance purpose. Infeasible links or logging require a documented rationale and compensating evidence rather than silent omission.",
      "targeted_clarification": null
    },
    {
      "id": "CM-03",
      "group_name": "Configuration and Traceability Checklists",
      "group_code": "CM/TR",
      "group_id": "configuration-traceability",
      "administered_wording": "Perform change-impact analysis and reopen affected evidence.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 4,
        "B": 1,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 80.0,
        "B": 20.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 80.0,
      "b_among_assessable": 20.0,
      "clarification_level": "group",
      "group_clarification": "Traceability depth and runtime diagnostics are tailored to architecture, observability, mission constraints, and assurance purpose. Infeasible links or logging require a documented rationale and compensating evidence rather than silent omission.",
      "targeted_clarification": null
    },
    {
      "id": "TR-01",
      "group_name": "Configuration and Traceability Checklists",
      "group_code": "CM/TR",
      "group_id": "configuration-traceability",
      "administered_wording": "Maintain forward and backward lifecycle traceability.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 4,
        "B": 1,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 80.0,
        "B": 20.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 80.0,
      "b_among_assessable": 20.0,
      "clarification_level": "group",
      "group_clarification": "Traceability depth and runtime diagnostics are tailored to architecture, observability, mission constraints, and assurance purpose. Infeasible links or logging require a documented rationale and compensating evidence rather than silent omission.",
      "targeted_clarification": null
    },
    {
      "id": "TR-02",
      "group_name": "Configuration and Traceability Checklists",
      "group_code": "CM/TR",
      "group_id": "configuration-traceability",
      "administered_wording": "Define feasible runtime traceability and diagnostic logging.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "B",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 2,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 60.0,
        "B": 40.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 60.0,
      "b_among_assessable": 40.0,
      "clarification_level": "targeted",
      "group_clarification": "Traceability depth and runtime diagnostics are tailored to architecture, observability, mission constraints, and assurance purpose. Infeasible links or logging require a documented rationale and compensating evidence rather than silent omission.",
      "targeted_clarification": "Runtime traceability does not require complete internal model introspection. Define the telemetry, event logging, provenance, and diagnostic correlation that are feasible and safety-relevant, and record justified gaps."
    },
    {
      "id": "DM-01",
      "group_name": "Data Assurance Checklists",
      "group_code": "DM",
      "group_id": "data-assurance",
      "administered_wording": "Derive data requirements from the ODD, hazards, and ML safety requirements.",
      "responses": {
        "V1": "A",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 5,
        "B": 0,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 100.0,
        "B": 0.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 100.0,
      "b_among_assessable": 0.0,
      "clarification_level": "none",
      "group_clarification": null,
      "targeted_clarification": null
    },
    {
      "id": "DM-02",
      "group_name": "Data Assurance Checklists",
      "group_code": "DM",
      "group_id": "data-assurance",
      "administered_wording": "Record data provenance and lineage.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "X",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 1,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 60.0,
        "B": 20.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 75.0,
      "b_among_assessable": 25.0,
      "clarification_level": "group",
      "group_clarification": "Data controls apply to the data role and the claims being supported. Provenance, uncertainty, disagreement, partition dependence, and residual coverage gaps must be recorded; privacy and disparity controls activate only where the application and obligations make them meaningful.",
      "targeted_clarification": null
    },
    {
      "id": "DM-03",
      "group_name": "Data Assurance Checklists",
      "group_code": "DM",
      "group_id": "data-assurance",
      "administered_wording": "Control labels, ground truth, and measurement uncertainty.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "B",
        "V4": "A",
        "V5": "B"
      },
      "counts": {
        "A": 2,
        "B": 3,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 40.0,
        "B": 60.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 40.0,
      "b_among_assessable": 60.0,
      "clarification_level": "targeted",
      "group_clarification": "Data controls apply to the data role and the claims being supported. Provenance, uncertainty, disagreement, partition dependence, and residual coverage gaps must be recorded; privacy and disparity controls activate only where the application and obligations make them meaningful.",
      "targeted_clarification": "Ground truth may be a calibrated measurement, expert adjudication, simulation reference, or consensus label. Record how it was produced, label disagreement and uncertainty, acceptance thresholds, and treatment of ambiguous cases."
    },
    {
      "id": "DM-04",
      "group_name": "Data Assurance Checklists",
      "group_code": "DM",
      "group_id": "data-assurance",
      "administered_wording": "Demonstrate partition independence and detect leakage or duplicates.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "X",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 1,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 60.0,
        "B": 20.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 75.0,
      "b_among_assessable": 25.0,
      "clarification_level": "group",
      "group_clarification": "Data controls apply to the data role and the claims being supported. Provenance, uncertainty, disagreement, partition dependence, and residual coverage gaps must be recorded; privacy and disparity controls activate only where the application and obligations make them meaningful.",
      "targeted_clarification": null
    },
    {
      "id": "DM-05",
      "group_name": "Data Assurance Checklists",
      "group_code": "DM",
      "group_id": "data-assurance",
      "administered_wording": "Justify ODD and hazard coverage and record residual gaps.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "X",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 1,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 60.0,
        "B": 20.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 75.0,
      "b_among_assessable": 25.0,
      "clarification_level": "group",
      "group_clarification": "Data controls apply to the data role and the claims being supported. Provenance, uncertainty, disagreement, partition dependence, and residual coverage gaps must be recorded; privacy and disparity controls activate only where the application and obligations make them meaningful.",
      "targeted_clarification": null
    },
    {
      "id": "DM-06",
      "group_name": "Data Assurance Checklists",
      "group_code": "DM",
      "group_id": "data-assurance",
      "administered_wording": "Validate data quality and preprocessing.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 4,
        "B": 1,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 80.0,
        "B": 20.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 80.0,
      "b_among_assessable": 20.0,
      "clarification_level": "group",
      "group_clarification": "Data controls apply to the data role and the claims being supported. Provenance, uncertainty, disagreement, partition dependence, and residual coverage gaps must be recorded; privacy and disparity controls activate only where the application and obligations make them meaningful.",
      "targeted_clarification": null
    },
    {
      "id": "DM-07",
      "group_name": "Data Assurance Checklists",
      "group_code": "DM",
      "group_id": "data-assurance",
      "administered_wording": "Protect data and tool integrity.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 4,
        "B": 1,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 80.0,
        "B": 20.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 80.0,
      "b_among_assessable": 20.0,
      "clarification_level": "group",
      "group_clarification": "Data controls apply to the data role and the claims being supported. Provenance, uncertainty, disagreement, partition dependence, and residual coverage gaps must be recorded; privacy and disparity controls activate only where the application and obligations make them meaningful.",
      "targeted_clarification": null
    },
    {
      "id": "DM-08",
      "group_name": "Data Assurance Checklists",
      "group_code": "DM",
      "group_id": "data-assurance",
      "administered_wording": "Assess whether privacy obligations apply and implement or justify the resulting controls.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "X",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 1,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 60.0,
        "B": 20.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 75.0,
      "b_among_assessable": 25.0,
      "clarification_level": "group",
      "group_clarification": "Data controls apply to the data role and the claims being supported. Provenance, uncertainty, disagreement, partition dependence, and residual coverage gaps must be recorded; privacy and disparity controls activate only where the application and obligations make them meaningful.",
      "targeted_clarification": null
    },
    {
      "id": "DM-09",
      "group_name": "Data Assurance Checklists",
      "group_code": "DM",
      "group_id": "data-assurance",
      "administered_wording": "Assess application-relevant bias and fairness.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "B",
        "V5": "X"
      },
      "counts": {
        "A": 2,
        "B": 2,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 40.0,
        "B": 40.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 50.0,
      "b_among_assessable": 50.0,
      "clarification_level": "targeted",
      "group_clarification": "Data controls apply to the data role and the claims being supported. Provenance, uncertainty, disagreement, partition dependence, and residual coverage gaps must be recorded; privacy and disparity controls activate only where the application and obligations make them meaningful.",
      "targeted_clarification": "Bias and fairness are not limited to demographic testing. Identify application-relevant safety or performance strata, such as mission phase, sensor, environment, equipment variant, fault class, or affected people, and justify N.A. where no meaningful disparity obligation exists."
    },
    {
      "id": "ML-01",
      "group_name": "Model Learning Checklists",
      "group_code": "ML",
      "group_id": "model-learning",
      "administered_wording": "Make model training reproducible.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 4,
        "B": 1,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 80.0,
        "B": 20.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 80.0,
      "b_among_assessable": 20.0,
      "clarification_level": "group",
      "group_clarification": "The controls prescribe reviewable outcomes, not a universal learning algorithm. Diagnostics and explainability methods are selected according to the requirement, model, intended user, decision, and demonstrated validity of the method.",
      "targeted_clarification": null
    },
    {
      "id": "ML-02",
      "group_name": "Model Learning Checklists",
      "group_code": "ML",
      "group_id": "model-learning",
      "administered_wording": "Compare candidates and justify model selection, including target feasibility.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 4,
        "B": 1,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 80.0,
        "B": 20.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 80.0,
      "b_among_assessable": 20.0,
      "clarification_level": "group",
      "group_clarification": "The controls prescribe reviewable outcomes, not a universal learning algorithm. Diagnostics and explainability methods are selected according to the requirement, model, intended user, decision, and demonstrated validity of the method.",
      "targeted_clarification": null
    },
    {
      "id": "ML-03",
      "group_name": "Model Learning Checklists",
      "group_code": "ML",
      "group_id": "model-learning",
      "administered_wording": "Analyse overfitting, mismatch, and development-time drift.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "X",
        "V4": "A",
        "V5": "B"
      },
      "counts": {
        "A": 2,
        "B": 2,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 40.0,
        "B": 40.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 50.0,
      "b_among_assessable": 50.0,
      "clarification_level": "targeted",
      "group_clarification": "The controls prescribe reviewable outcomes, not a universal learning algorithm. Diagnostics and explainability methods are selected according to the requirement, model, intended user, decision, and demonstrated validity of the method.",
      "targeted_clarification": "Treat overfitting, development-to-acceptance mismatch, and temporal or pipeline drift as distinct phenomena. Select diagnostics and thresholds appropriate to the data-generation process and retain unresolved mismatch as a limitation."
    },
    {
      "id": "ML-04",
      "group_name": "Model Learning Checklists",
      "group_code": "ML",
      "group_id": "model-learning",
      "administered_wording": "Provide explainability evidence when it supports a requirement or review decision.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "B",
        "V4": "B",
        "V5": "X"
      },
      "counts": {
        "A": 1,
        "B": 3,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 20.0,
        "B": 60.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 25.0,
      "b_among_assessable": 75.0,
      "clarification_level": "targeted",
      "group_clarification": "The controls prescribe reviewable outcomes, not a universal learning algorithm. Diagnostics and explainability methods are selected according to the requirement, model, intended user, decision, and demonstrated validity of the method.",
      "targeted_clarification": "Explainability is conditional. State the requirement or review decision it supports, the intended user, the method's validity limits, and why the resulting evidence is adequate; do not require explanation methods without an assurance purpose."
    },
    {
      "id": "MV-01",
      "group_name": "Model Verification and Validation Checklists",
      "group_code": "MV",
      "group_id": "model-vv",
      "administered_wording": "Freeze model-level requirements and acceptance criteria before testing.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 4,
        "B": 1,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 80.0,
        "B": 20.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 80.0,
      "b_among_assessable": 20.0,
      "clarification_level": "group",
      "group_clarification": "Scenario, robustness, formal, and adversarial techniques are activated by the claimed property, hazards, ODD, credible threat model, and safety reliance. Justified alternative evidence or N.A. treatment remains possible with named authority approval.",
      "targeted_clarification": null
    },
    {
      "id": "MV-02",
      "group_name": "Model Verification and Validation Checklists",
      "group_code": "MV",
      "group_id": "model-vv",
      "administered_wording": "Preserve independent acceptance data and prevent test-set tuning.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "X",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 1,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 60.0,
        "B": 20.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 75.0,
      "b_among_assessable": 25.0,
      "clarification_level": "group",
      "group_clarification": "Scenario, robustness, formal, and adversarial techniques are activated by the claimed property, hazards, ODD, credible threat model, and safety reliance. Justified alternative evidence or N.A. treatment remains possible with named authority approval.",
      "targeted_clarification": null
    },
    {
      "id": "MV-03",
      "group_name": "Model Verification and Validation Checklists",
      "group_code": "MV",
      "group_id": "model-vv",
      "administered_wording": "Generate tests and simulations from the ODD and hazard scenarios.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "B",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 2,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 60.0,
        "B": 40.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 60.0,
      "b_among_assessable": 40.0,
      "clarification_level": "targeted",
      "group_clarification": "Scenario, robustness, formal, and adversarial techniques are activated by the claimed property, hazards, ODD, credible threat model, and safety reliance. Justified alternative evidence or N.A. treatment remains possible with named authority approval.",
      "targeted_clarification": "ODD- and hazard-derived testing should cover relevant nominal, boundary, degraded, rare, and failure conditions. Simulation evidence requires a stated validity domain and residual model-to-reality limitations."
    },
    {
      "id": "MV-04",
      "group_name": "Model Verification and Validation Checklists",
      "group_code": "MV",
      "group_id": "model-vv",
      "administered_wording": "Use formal methods only for a defined, formalizable property.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "B",
        "V5": "X"
      },
      "counts": {
        "A": 2,
        "B": 2,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 40.0,
        "B": 40.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 50.0,
      "b_among_assessable": 50.0,
      "clarification_level": "targeted",
      "group_clarification": "Scenario, robustness, formal, and adversarial techniques are activated by the claimed property, hazards, ODD, credible threat model, and safety reliance. Justified alternative evidence or N.A. treatment remains possible with named authority approval.",
      "targeted_clarification": "Formal methods apply only to a clearly formalizable property and a justified abstraction boundary. Record what is proved, assumptions, tool confidence, and properties left to empirical evidence."
    },
    {
      "id": "MV-05",
      "group_name": "Model Verification and Validation Checklists",
      "group_code": "MV",
      "group_id": "model-vv",
      "administered_wording": "Conduct adversarial testing only against credible threats.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "B",
        "V5": "X"
      },
      "counts": {
        "A": 2,
        "B": 2,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 40.0,
        "B": 40.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 50.0,
      "b_among_assessable": 50.0,
      "clarification_level": "targeted",
      "group_clarification": "Scenario, robustness, formal, and adversarial techniques are activated by the claimed property, hazards, ODD, credible threat model, and safety reliance. Justified alternative evidence or N.A. treatment remains possible with named authority approval.",
      "targeted_clarification": "Adversarial testing is driven by a credible threat model and attack surface. Document why the technique is applicable or why the security analysis supports a justified N.A. decision."
    },
    {
      "id": "MV-06",
      "group_name": "Model Verification and Validation Checklists",
      "group_code": "MV",
      "group_id": "model-vv",
      "administered_wording": "Evaluate robustness, edge conditions, OOD behaviour, and uncertainty.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "B"
      },
      "counts": {
        "A": 3,
        "B": 2,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 60.0,
        "B": 40.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 60.0,
      "b_among_assessable": 40.0,
      "clarification_level": "targeted",
      "group_clarification": "Scenario, robustness, formal, and adversarial techniques are activated by the claimed property, hazards, ODD, credible threat model, and safety reliance. Justified alternative evidence or N.A. treatment remains possible with named authority approval.",
      "targeted_clarification": "Define which perturbations, edge conditions, OOD cases, uncertainty measures, and acceptance thresholds matter for the claimed function; Aerosafe does not assume one universal robustness metric."
    },
    {
      "id": "MV-07",
      "group_name": "Model Verification and Validation Checklists",
      "group_code": "MV",
      "group_id": "model-vv",
      "administered_wording": "Validate fitness for intended use by safety-relevant stratum.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 4,
        "B": 1,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 80.0,
        "B": 20.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 80.0,
      "b_among_assessable": 20.0,
      "clarification_level": "group",
      "group_clarification": "Scenario, robustness, formal, and adversarial techniques are activated by the claimed property, hazards, ODD, credible threat model, and safety reliance. Justified alternative evidence or N.A. treatment remains possible with named authority approval.",
      "targeted_clarification": null
    },
    {
      "id": "SV-01",
      "group_name": "Software and System V&V Checklists",
      "group_code": "SV/SY",
      "group_id": "software-system-vv",
      "administered_wording": "Verify and validate the software implementation surrounding the model.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 4,
        "B": 1,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 80.0,
        "B": 20.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 80.0,
      "b_among_assessable": 20.0,
      "clarification_level": "group",
      "group_clarification": "Model, software, and system evidence are distinct. This group checks the implementation surrounding the model and the integrated function, interfaces, hazard controls, fallback, and mission context; model metrics alone do not satisfy it.",
      "targeted_clarification": null
    },
    {
      "id": "SY-01",
      "group_name": "Software and System V&V Checklists",
      "group_code": "SV/SY",
      "group_id": "software-system-vv",
      "administered_wording": "Verify and validate the integrated system function and hazard controls.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "B",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 2,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 60.0,
        "B": 40.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 60.0,
      "b_among_assessable": 40.0,
      "clarification_level": "targeted",
      "group_clarification": "Model, software, and system evidence are distinct. This group checks the implementation surrounding the model and the integrated function, interfaces, hazard controls, fallback, and mission context; model metrics alone do not satisfy it.",
      "targeted_clarification": "System V&V addresses the integrated function, hardware and software interfaces, operators, hazard controls, fallback, and mission context. Passing model-level or software-unit tests alone is insufficient."
    },
    {
      "id": "DP-01",
      "group_name": "Deployment, Operations, and Change Checklists",
      "group_code": "DP",
      "group_id": "deployment-change",
      "administered_wording": "Control conversion, quantization, compilation, and target libraries.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "X",
        "V4": "A",
        "V5": "X"
      },
      "counts": {
        "A": 2,
        "B": 1,
        "C": 0,
        "X": 2
      },
      "percentages": {
        "A": 40.0,
        "B": 20.0,
        "C": 0.0,
        "X": 40.0
      },
      "assessable_count": 3,
      "a_among_assessable": 66.7,
      "b_among_assessable": 33.3,
      "clarification_level": "group",
      "group_clarification": "A deployment control applies when the corresponding conversion, target, release, monitoring, fallback, or change mechanism exists. Equivalence limits must be predeclared, while monitoring and fallback remain mission-, architecture-, and risk-dependent.",
      "targeted_clarification": null
    },
    {
      "id": "DP-02",
      "group_name": "Deployment, Operations, and Change Checklists",
      "group_code": "DP",
      "group_id": "deployment-change",
      "administered_wording": "Verify timing, memory, compute, power, and interface budgets on representative target hardware.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "X",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 1,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 60.0,
        "B": 20.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 75.0,
      "b_among_assessable": 25.0,
      "clarification_level": "group",
      "group_clarification": "A deployment control applies when the corresponding conversion, target, release, monitoring, fallback, or change mechanism exists. Equivalence limits must be predeclared, while monitoring and fallback remain mission-, architecture-, and risk-dependent.",
      "targeted_clarification": null
    },
    {
      "id": "DP-03",
      "group_name": "Deployment, Operations, and Change Checklists",
      "group_code": "DP",
      "group_id": "deployment-change",
      "administered_wording": "Demonstrate host-to-target behavioural equivalence or a bounded difference.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "X",
        "V4": "A",
        "V5": "B"
      },
      "counts": {
        "A": 2,
        "B": 2,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 40.0,
        "B": 40.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 50.0,
      "b_among_assessable": 50.0,
      "clarification_level": "targeted",
      "group_clarification": "A deployment control applies when the corresponding conversion, target, release, monitoring, fallback, or change mechanism exists. Equivalence limits must be predeclared, while monitoring and fallback remain mission-, architecture-, and risk-dependent.",
      "targeted_clarification": "A bounded host-to-target difference is a predeclared numerical or decision tolerance linked to affected requirements and hazards and verified on representative target configurations."
    },
    {
      "id": "DP-04",
      "group_name": "Deployment, Operations, and Change Checklists",
      "group_code": "DP",
      "group_id": "deployment-change",
      "administered_wording": "Make release construction, installation, and rollback reproducible.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "X",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 1,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 60.0,
        "B": 20.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 75.0,
      "b_among_assessable": 25.0,
      "clarification_level": "group",
      "group_clarification": "A deployment control applies when the corresponding conversion, target, release, monitoring, fallback, or change mechanism exists. Equivalence limits must be predeclared, while monitoring and fallback remain mission-, architecture-, and risk-dependent.",
      "targeted_clarification": null
    },
    {
      "id": "DP-05",
      "group_name": "Deployment, Operations, and Change Checklists",
      "group_code": "DP",
      "group_id": "deployment-change",
      "administered_wording": "Define monitoring according to observability, telemetry, mission constraints, and safety reliance.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 4,
        "B": 1,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 80.0,
        "B": 20.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 80.0,
      "b_among_assessable": 20.0,
      "clarification_level": "group",
      "group_clarification": "A deployment control applies when the corresponding conversion, target, release, monitoring, fallback, or change mechanism exists. Equivalence limits must be predeclared, while monitoring and fallback remain mission-, architecture-, and risk-dependent.",
      "targeted_clarification": null
    },
    {
      "id": "DP-06",
      "group_name": "Deployment, Operations, and Change Checklists",
      "group_code": "DP",
      "group_id": "deployment-change",
      "administered_wording": "Define maintenance, retraining, threshold, data, and platform change controls.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 4,
        "B": 1,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 80.0,
        "B": 20.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 80.0,
      "b_among_assessable": 20.0,
      "clarification_level": "group",
      "group_clarification": "A deployment control applies when the corresponding conversion, target, release, monitoring, fallback, or change mechanism exists. Equivalence limits must be predeclared, while monitoring and fallback remain mission-, architecture-, and risk-dependent.",
      "targeted_clarification": null
    },
    {
      "id": "DP-07",
      "group_name": "Deployment, Operations, and Change Checklists",
      "group_code": "DP",
      "group_id": "deployment-change",
      "administered_wording": "Select redundancy, fallback, or a safety cage only where justified by the architecture and hazards.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "X",
        "V4": "B",
        "V5": "A"
      },
      "counts": {
        "A": 2,
        "B": 2,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 40.0,
        "B": 40.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 50.0,
      "b_among_assessable": 50.0,
      "clarification_level": "targeted",
      "group_clarification": "A deployment control applies when the corresponding conversion, target, release, monitoring, fallback, or change mechanism exists. Equivalence limits must be predeclared, while monitoring and fallback remain mission-, architecture-, and risk-dependent.",
      "targeted_clarification": "Redundancy, fallback, and safety cages are design options rather than mandatory patterns. Select them only when hazard analysis, authority, observability, controllability, and resource constraints justify the architecture."
    },
    {
      "id": "DP-08",
      "group_name": "Deployment, Operations, and Change Checklists",
      "group_code": "DP",
      "group_id": "deployment-change",
      "administered_wording": "Control operational anomalies and reopen affected evidence.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 4,
        "B": 1,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 80.0,
        "B": 20.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 80.0,
      "b_among_assessable": 20.0,
      "clarification_level": "group",
      "group_clarification": "A deployment control applies when the corresponding conversion, target, release, monitoring, fallback, or change mechanism exists. Equivalence limits must be predeclared, while monitoring and fallback remain mission-, architecture-, and risk-dependent.",
      "targeted_clarification": null
    },
    {
      "id": "SA-01",
      "group_name": "Safety Argument and Normative-Status Checklists",
      "group_code": "SA",
      "group_id": "safety-normative",
      "administered_wording": "Link hazards and system controls to ML, data, software, integration, and monitoring requirements.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "A",
        "V5": "A"
      },
      "counts": {
        "A": 4,
        "B": 1,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 80.0,
        "B": 20.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 80.0,
      "b_among_assessable": 20.0,
      "clarification_level": "group",
      "group_clarification": "Any structured argument notation may be used if claims, context, assumptions, strategy, evidence, findings, residuals, and authority decisions remain explicit. Source/status classification records normativity; it does not create a contractual obligation.",
      "targeted_clarification": null
    },
    {
      "id": "SA-02",
      "group_name": "Safety Argument and Normative-Status Checklists",
      "group_code": "SA",
      "group_id": "safety-normative",
      "administered_wording": "Construct an explicit claim-context-assumption-strategy-evidence argument.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "B",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 2,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 60.0,
        "B": 40.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 60.0,
      "b_among_assessable": 40.0,
      "clarification_level": "targeted",
      "group_clarification": "Any structured argument notation may be used if claims, context, assumptions, strategy, evidence, findings, residuals, and authority decisions remain explicit. Source/status classification records normativity; it does not create a contractual obligation.",
      "targeted_clarification": "GSN is not mandatory. Any notation is acceptable if claim, context, assumptions, strategy, evidence, counter-evidence or findings, and decision links are explicit and reviewable."
    },
    {
      "id": "SA-03",
      "group_name": "Safety Argument and Normative-Status Checklists",
      "group_code": "SA",
      "group_id": "safety-normative",
      "administered_wording": "Record residual uncertainty, limitations, restrictions, and risk acceptance.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "B",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 2,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 60.0,
        "B": 40.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 60.0,
      "b_among_assessable": 40.0,
      "clarification_level": "targeted",
      "group_clarification": "Any structured argument notation may be used if claims, context, assumptions, strategy, evidence, findings, residuals, and authority decisions remain explicit. Source/status classification records normativity; it does not create a contractual obligation.",
      "targeted_clarification": "Residual uncertainty must be linked to operating restrictions, an owner, an expiry or review trigger, and the authority empowered to accept, reject, or condition the residual risk."
    },
    {
      "id": "SA-04",
      "group_name": "Safety Argument and Normative-Status Checklists",
      "group_code": "SA",
      "group_id": "safety-normative",
      "administered_wording": "Mark each control as a contractual requirement, source guidance, or Aerosafe recommendation.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "B",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 2,
        "C": 0,
        "X": 0
      },
      "percentages": {
        "A": 60.0,
        "B": 40.0,
        "C": 0.0,
        "X": 0.0
      },
      "assessable_count": 5,
      "a_among_assessable": 60.0,
      "b_among_assessable": 40.0,
      "clarification_level": "targeted",
      "group_clarification": "Any structured argument notation may be used if claims, context, assumptions, strategy, evidence, findings, residuals, and authority decisions remain explicit. Source/status classification records normativity; it does not create a contractual obligation.",
      "targeted_clarification": "Classify each item against the project baseline as a contractual requirement, source guidance, or Aerosafe recommendation. The label supports traceability and prevents recommendations from being presented as ECSS obligations."
    },
    {
      "id": "IV-01",
      "group_name": "Independent Model Verification and Validation Checklists",
      "group_code": "IV",
      "group_id": "imvv",
      "administered_wording": "Decide and plan whether independent V&V is activated for the AI-specific evidence scope.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "X",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 1,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 60.0,
        "B": 20.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 75.0,
      "b_among_assessable": 25.0,
      "clarification_level": "group",
      "group_clarification": "Independence arrangements are tailored to project risk and contract, but organisational, technical, and decisional independence and formal closure authority must be named. IMVV challenges evidence and verifies finding resolution; it does not automatically own residual-risk acceptance.",
      "targeted_clarification": null
    },
    {
      "id": "IV-02",
      "group_name": "Independent Model Verification and Validation Checklists",
      "group_code": "IV",
      "group_id": "imvv",
      "administered_wording": "Record organisational independence.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "X",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 1,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 60.0,
        "B": 20.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 75.0,
      "b_among_assessable": 25.0,
      "clarification_level": "group",
      "group_clarification": "Independence arrangements are tailored to project risk and contract, but organisational, technical, and decisional independence and formal closure authority must be named. IMVV challenges evidence and verifies finding resolution; it does not automatically own residual-risk acceptance.",
      "targeted_clarification": null
    },
    {
      "id": "IV-03",
      "group_name": "Independent Model Verification and Validation Checklists",
      "group_code": "IV",
      "group_id": "imvv",
      "administered_wording": "Record technical independence.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "X",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 1,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 60.0,
        "B": 20.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 75.0,
      "b_among_assessable": 25.0,
      "clarification_level": "group",
      "group_clarification": "Independence arrangements are tailored to project risk and contract, but organisational, technical, and decisional independence and formal closure authority must be named. IMVV challenges evidence and verifies finding resolution; it does not automatically own residual-risk acceptance.",
      "targeted_clarification": null
    },
    {
      "id": "IV-04",
      "group_name": "Independent Model Verification and Validation Checklists",
      "group_code": "IV",
      "group_id": "imvv",
      "administered_wording": "Record decisional independence and formal closure authority.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "X",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 1,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 60.0,
        "B": 20.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 75.0,
      "b_among_assessable": 25.0,
      "clarification_level": "group",
      "group_clarification": "Independence arrangements are tailored to project risk and contract, but organisational, technical, and decisional independence and formal closure authority must be named. IMVV challenges evidence and verifies finding resolution; it does not automatically own residual-risk acceptance.",
      "targeted_clarification": null
    },
    {
      "id": "IV-05",
      "group_name": "Independent Model Verification and Validation Checklists",
      "group_code": "IV",
      "group_id": "imvv",
      "administered_wording": "Independently challenge the AI-specific evidence chain.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "X",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 1,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 60.0,
        "B": 20.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 75.0,
      "b_among_assessable": 25.0,
      "clarification_level": "group",
      "group_clarification": "Independence arrangements are tailored to project risk and contract, but organisational, technical, and decisional independence and formal closure authority must be named. IMVV challenges evidence and verifies finding resolution; it does not automatically own residual-risk acceptance.",
      "targeted_clarification": null
    },
    {
      "id": "IV-06",
      "group_name": "Independent Model Verification and Validation Checklists",
      "group_code": "IV",
      "group_id": "imvv",
      "administered_wording": "Manage IMVV findings to auditable closure.",
      "responses": {
        "V1": "B",
        "V2": "A",
        "V3": "A",
        "V4": "X",
        "V5": "A"
      },
      "counts": {
        "A": 3,
        "B": 1,
        "C": 0,
        "X": 1
      },
      "percentages": {
        "A": 60.0,
        "B": 20.0,
        "C": 0.0,
        "X": 20.0
      },
      "assessable_count": 4,
      "a_among_assessable": 75.0,
      "b_among_assessable": 25.0,
      "clarification_level": "group",
      "group_clarification": "Independence arrangements are tailored to project risk and contract, but organisational, technical, and decisional independence and formal closure authority must be named. IMVV challenges evidence and verifies finding resolution; it does not automatically own residual-risk acceptance.",
      "targeted_clarification": null
    }
  ],
  "overall_scales": [
    {
      "question": "The 52 controls are understandable enough to be applied without author assistance.",
      "values": [
        4,
        4,
        5,
        5,
        4
      ],
      "n": 5,
      "mean": 4.4,
      "sample_sd": 0.55,
      "median": 4,
      "minimum": 4,
      "maximum": 5
    },
    {
      "question": "The 52 controls cover the main AI/ML software-assurance obligations I would expect in an ECSS-oriented project.",
      "values": [
        4,
        4,
        5,
        5,
        5
      ],
      "n": 5,
      "mean": 4.6,
      "sample_sd": 0.55,
      "median": 5,
      "minimum": 4,
      "maximum": 5
    },
    {
      "question": "The effort required to use this checklist is acceptable for project assurance/review activities.",
      "values": [
        4,
        4,
        5,
        4,
        4
      ],
      "n": 5,
      "mean": 4.2,
      "sample_sd": 0.45,
      "median": 4,
      "minimum": 4,
      "maximum": 5
    }
  ],
  "comments": {
    "group_comments": [],
    "final_comments": [
      {
        "participant": "V5",
        "comment": "The framework appears comprehensive and well aligned with an ECSS-oriented assurance process. The applicability of some specialised ML verification techniques should remain explicitly risk-based and supported by the relevant technical expertise. Clear identification of the closure authority is particularly valuable."
      }
    ]
  },
  "completion_time": {
    "reported_count": 0,
    "values": [],
    "statement": "The completion-time item was optional and no participant supplied a value; no empirical completion-time estimate is therefore reported."
  },
  "clarification_policy": "All observed responses are retained. Because option B did not require an item-specific explanation and one participant selected B for 51 of 52 controls, a single B triggers a concise group-level interpretation note rather than an inferred item defect. Controls receiving B from at least two participants receive an additional item-specific clarification. These notes are author-added wording clarifications; they are not quotations or reconstructed rationales from respondents.",
  "clarification_themes": [
    {
      "ids": "TR-02; DP-03; DP-07",
      "theme": "Feasibility, target equivalence, and architectural tailoring",
      "clarification": "Logging is limited to feasible safety-relevant telemetry; host-to-target equivalence uses predeclared tolerances; redundancy, fallback, and safety cages are selected only when the hazard analysis and architecture justify them."
    },
    {
      "ids": "DM-03; DM-09",
      "theme": "Ground truth, uncertainty, and application-relevant disparities",
      "clarification": "Ground truth may come from measurement, expert adjudication, simulation, or consensus, provided uncertainty and disagreement are recorded. Bias/fairness is evaluated over meaningful safety or performance strata and may be N.A. with justification."
    },
    {
      "ids": "ML-03; ML-04",
      "theme": "Development diagnostics and explainability",
      "clarification": "Overfitting, mismatch, and drift are treated separately. Explainability is required only when tied to a requirement or review decision, an identified user, and a method with stated validity limits."
    },
    {
      "ids": "MV-03--MV-06",
      "theme": "Activation and scope of specialised V&V techniques",
      "clarification": "Scenario, simulation, formal, adversarial, robustness, OOD, and uncertainty evidence is selected from the claimed property, hazards, ODD, threat model, and safety reliance rather than imposed universally."
    },
    {
      "ids": "SY-01",
      "theme": "Boundary between model, software, and system V&V",
      "clarification": "System V&V covers the integrated function, interfaces, operators, fallback, hazard controls, and mission context; passing model or software tests does not replace system evidence."
    },
    {
      "ids": "SA-02--SA-04",
      "theme": "Argument notation, residual authority, and normative status",
      "clarification": "The argument notation is flexible, but claims, evidence, assumptions, findings, and decisions must remain explicit. Residual-risk authority and review triggers are named, and source/status labels record rather than create normativity."
    }
  ],
  "limitations": [
    "The sample contains five practitioners and is not representative of all aerospace assurance roles or organisations.",
    "The exercise evaluates perceived clarity, coverage, and acceptable effort, not task performance, inter-rater agreement on a common case, defect detection, or operational effectiveness.",
    "Option B indicates that clarification or tailoring is needed but does not identify why; no item-specific rationale may be inferred without a written comment.",
    "One participant selected B for 51 of 52 controls, accounting for most B responses; all data are retained and the concentration is reported transparently.",
    "No group-level comments and only one final open comment were supplied.",
    "The optional completion-time question received no answers.",
    "No inferential statistics are appropriate for this small purposive sample; all numerical results are descriptive."
  ]
};
