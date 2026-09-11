---
title: "Trustworthy AI in public administration: The PRO-Trust pipeline for ethical fraud detection in public procurement"
type: paper
authors:
  - Igor Garcia Ballhausen Sampaio
  - Eduardo de Oliveira Andrade
  - Sergio de Souza Barbosa Fontes
  - Flavia Cristina Bernardini
  - Jose Viterbo
year: null
tags:
  - public-procurement
  - trustworthy-ai
  - fraud-detection
  - human-oversight
---

## TL;DR

PRO-Trust is a proposed pipeline for [[concepts/ai-assisted-public-procurement-auditing|AI-Assisted Public Procurement Auditing]] that connects seven development tasks with five ethical mitigation subprocesses and explicit institutional responsibilities. A review of 17 studies and exploratory feedback from two Brazilian federal auditors motivate safeguards for explainability and [[concepts/human-oversight-of-ai|Human Oversight of AI]]. The paper does not deploy the pipeline or demonstrate improvements in detection accuracy, fairness, or institutional trust.

## Research Question

How has AI been applied to fraud detection in public procurement, what ethical gaps arise in those applications, and how can a development pipeline operationalize explainability and respect for human autonomy?

## Motivation

Procurement risk alerts can direct investigations and affect suppliers even when wrongdoing has not been established. Unclear training labels, opaque predictions, inaccessible explanations, and weak review procedures can therefore undermine the justification and contestability of administrative actions. The paper argues that predictive performance alone is insufficient: auditors need understandable evidence, managers need governance procedures, and affected suppliers need ways to contest decisions.

## Contributions

- Maps two prioritized ethical principles, explainability and respect for human autonomy, to five challenges: strategic control, explainability-tool limitations, user transparency, operational oversight, and model opacity.
- Cross-analyzes 17 publications and uses senior auditors' feedback to assess the practical relevance of these challenges.
- Proposes PRO-Trust, linking development tasks, mitigation subprocesses, and responsibilities for public managers, auditors, data scientists, and software developers.
- Treats explanations, communication, human review, and institutional governance as complementary safeguards rather than assuming that an explanation tool alone establishes trustworthiness.

## Method

The four phases are ethical-principle selection, systematic literature review, cross-analysis with expert validation, and pipeline construction (Sections 2-5). The normative analysis draws on the European Commission's 2019 trustworthy-AI guidelines but prioritizes autonomy and explainability; fairness and prevention of harm receive less attention.

The review searches IEEE Xplore and Scopus for work published through December 2024. It reports 621 retrieved publications, removal of 83 duplicates, and inclusion of 17 studies after screening. ACM searches reportedly yielded no additional relevant unique works. The authors did not perform backward or forward citation tracking. They derive the five challenges through iterative thematic synthesis and conceptual mapping.

Expert validation uses a structured questionnaire with a five-point agreement scale, guiding questions, and qualitative feedback from two senior auditors at Brazil's Office of the Comptroller General (CGU). This assesses perceived relevance and applicability rather than operational effectiveness.

PRO-Trust proceeds through data collection and red-flag definition (T1), labeling (T2), model selection (T3), testing (T4), evaluation (T5), production (T6), and alerts and notifications (T7). Advancement to production depends on meeting required metrics, without a reported operational benchmark. The five mitigation subprocesses are:

| Challenge | Proposed safeguards | Responsible actors |
| --- | --- | --- |
| E1: Lack of strategic control | Define objectives, boundaries, applicable rules, risk assessments, and bias-monitoring metrics; revise when risks are unacceptable | Public managers, supported by auditors |
| E2: Limitations in explainability tools | Apply explanation techniques such as SHAP or LIME and assess their compatibility with legal and administrative requirements | Data scientists and software developers |
| E3: Lack of transparency for users | Conduct usability testing, provide accessible documentation, and collect user feedback | Developers and data scientists with public managers |
| E4: Lack of oversight during operation | Establish audit committees, mandatory review of high-risk alerts, feedback, monitoring, recalibration, and supplier dispute mechanisms | Public managers and auditors |
| E5: System opacity | Use interpretable models or explanatory layers, accessible justifications, and interactive audit dashboards | Technical teams, auditors, and public managers |

These are proposed procedures, not evaluated guarantees of legal compliance or ethical performance (Section 5, Tables 5-6).

## Experiments

The evidence consists of a literature assessment and exploratory expert validation. No new fraud classifier, comparative accuracy experiment, or live procurement deployment is reported.

Table 1 classifies the included studies as 14 machine-learning studies, two network-analysis studies, and one NLP study. Table 3 reports the following challenge frequencies:

| Challenge coded by the authors | Studies | Reported percentage |
| --- | ---: | ---: |
| E1: Lack of strategic control | 10/17 | 59% |
| E2: Limitations in explainability tools | 16/17 | 94% |
| E3: Lack of transparency for users | 17/17 | 100% |
| E4: Lack of oversight during operation | 10/17 | 59% |
| E5: System opacity | 17/17 | 100% |

These frequencies summarize the authors' qualitative coding of publications. They do not measure the prevalence of proven ethical violations in deployed systems. The text reports strong expert agreement and maximum ratings for opacity, user transparency, and operational oversight, but does not provide a participant-level rating table. Qualitative feedback emphasizes understandable, auditable alerts and reviewers able to challenge model outputs (Section 4.2).

## Limitations

- The review covers two principal databases, English-language work, and 17 selected studies, without citation snowballing. Its scope does not establish comprehensive coverage of procurement AI.
- Validation involves only two senior auditors from one Brazilian institution. Suppliers, civil society, and other jurisdictions are not represented in this validation.
- The ethical scope prioritizes autonomy and explainability; it does not comprehensively operationalize fairness, harm prevention, or societal and environmental wellbeing.
- Deployment, resource requirements, reductions in false alerts, and improvements in trust or contestability remain untested. Section 7 identifies live evaluation as future work.
- The supplied text alternates between singular and plural descriptions of the auditor feedback. Its prose also generalizes explainability-tool shortcomings more broadly than Table 3, which marks E2 in 16 rather than all 17 studies. The counts above follow the table.
- Cross-jurisdictional use requires adaptation to local procurement procedures, institutional capacity, and regulatory context.

The supplied Markdown does not establish the paper's publication year, venue, or stable identifier; these are left unspecified rather than inferred from cited works.

## Related Concepts

- [[concepts/ai-assisted-public-procurement-auditing|AI-Assisted Public Procurement Auditing]]
- [[concepts/human-oversight-of-ai|Human Oversight of AI]]
- [[concepts/social-network-analysis|Social Network Analysis]]: the review includes relational approaches to suspected collusion and supplier connections.

## Related Papers

The following works are cited by the source paper:

- Sampaio et al. (2024a), "Enhancing transparency through explainable artificial intelligence: An exploratory analysis on collusion and corruption scenario in digital government." Prior work motivating concerns about explanation tools and fraud-label documentation.
- Lyra et al. (2022), "Fraud, corruption, and collusion in public procurement activities, a systematic literature review on data-driven methods." Related review of procurement analytics.
- De Bruijn, Warnier, and Janssen (2022), "The perils and pitfalls of explainable AI: Strategies for explaining algorithmic decision-making." Supports the discussion of limitations of purely technical explanations.
- Ruschemeier and Hondrich (2024), "Automation bias in public administration-An interdisciplinary perspective from law and psychology." Related discussion of overreliance on automated outputs.

[[index|Library home]]
