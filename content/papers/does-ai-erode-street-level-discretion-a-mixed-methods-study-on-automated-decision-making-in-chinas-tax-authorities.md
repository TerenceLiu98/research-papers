---
title: "Does AI erode street-level discretion? A mixed-methods study on automated decision-making in China's tax authorities"
type: paper
authors:
  - Jingjing Li
  - Chuanshen Qin
  - Lan Xue
year: null
doi: "10.1016/j.giq.2026.102174"
tags:
  - public-administration
  - automated-decision-making
  - street-level-discretion
  - algorithm-literacy
---

## TL;DR

A vignette experiment with 310 Chinese tax officials finds higher perceived discretion under AI automation after covariate adjustment (B = 0.21, p < 0.05), although the unadjusted effect is not statistically significant. Nine interviews suggest that better information and more defensible decisions can support [[concepts/street-level-discretion|Street-Level Discretion]] when officials retain final authority. Aggregate [[concepts/algorithm-literacy|Algorithm Literacy]] does not significantly moderate the effect; exploratory analyses find opposing interactions for algorithm knowledge and reflection. These findings concern perceived discretion, not observed enforcement behavior or improvements in taxpayer outcomes.

## Research Question

How does AI automation affect frontline tax officials' perceived discretion in a regulation-oriented bureaucracy, and does their algorithm literacy condition that effect?

## Motivation

Automation may constrain professional judgment through standardized workflows or enable it through better information and decision support. Tax officials must interpret ambiguous rules, assess incomplete evidence, and justify decisions to both supervisors and taxpayers. The paper examines this regulatory setting to clarify when automation is experienced as enabling and whether technical understanding and critical reflection play different roles.

## Contributions

- Tests competing enablement and curtailment hypotheses in Chinese tax administration using a survey experiment and explanatory interviews.
- Proposes informational resource augmentation and decision legitimization as mechanisms, with retained human authority as an enabling condition.
- Distinguishes knowledge of algorithms (KOA) from reflection on algorithms (ROA), showing that an aggregate literacy measure can conceal opposing exploratory interaction estimates.
- Treats regulatory orientation, task structure, and organizational accountability as potential boundaries on the findings rather than establishing a universal effect of automation.

## Method

The authors describe an explanatory sequential mixed-methods design situated in China's Golden Tax Project (Sections 3-4). The survey ran in February-March 2023 through professional networks and MPA programs. Of 434 responses, 124 were excluded following an attention check, leaving 168 low-automation and 142 high-automation cases. Recruitment was purposive and emphasized digitally advanced jurisdictions; Table 1 places 66.77% of the final sample in Eastern China.

Respondents were randomly assigned a third-person vignette about an official handling tax declarations and deductions/exemptions. Under low automation, the official processes cases manually using professional judgment. Under high automation, Smart Tax processes information and generates results, with the official intervening when taxpayers challenge them. The manipulation also emphasizes efficiency and time costs, so it combines automation with descriptions of its operational benefits.

Perceived discretion is measured through three five-point items about choosing methods, processes, and flexible handling within legal constraints (Cronbach's alpha = 0.89). KOA and ROA each use three items and are measured before treatment, alongside technophobia. OLS models adjust for accountability pressures and demographic covariates; moderation models examine aggregate literacy and then its separate dimensions. Literacy itself is measured, not randomized.

Nine approximately 40-minute interviews with tax officials, including national-level participants, were conducted in February-March 2023 and analyzed interpretively. Their accounts explain how officials understand AI-supported judgment, legitimacy, and retained professional responsibility. They do not identify causal mediation effects.

## Experiments

| Analysis | Reported result | Interpretation |
| --- | --- | --- |
| Main adjusted model, Table 6 | Automation B = 0.21, robust t = 2.23, p < 0.05; R-squared = 0.185 | Supports the enablement hypothesis for perceived discretion under this specification |
| Original experiment without covariates, Section 5.1.2 | Positive but statistically nonsignificant automation coefficient | The main positive finding depends on adjustment; the authors attribute attenuation principally to an imbalance in pretreatment literacy |
| Aggregate literacy interaction, Table 7 | B = -0.10, p = 0.54 | Neither aggregate reinforcement nor buffering hypothesis is supported |
| Disaggregated interaction model, Table 8 and Figure 2 | Automation x KOA: B = -0.207, 95% CI [-0.352, -0.061]; automation x ROA: B = 0.172, 95% CI [0.029, 0.314] | Exploratory evidence of negative knowledge moderation and positive reflection moderation |
| Aggregate weighting sensitivity, Section 5.1.2 | Interaction confidence intervals include zero across all KOA/ROA weights | Reweighting the combined literacy index does not establish aggregate moderation |
| Supplementary manipulation check, Section 4.1.2 | Perceived automation: high mean 5.68 versus low mean 2.71; F = 215.59, p < 0.001 | Supports the intended manipulation in a separate sample |

The text also describes a supplementary 2 x 2 automation-by-task-complexity experiment with significant main effects and a marginal interaction. Its sample size and detailed outcome tables are not included in the supplied Markdown, which points to an external Appendix D. Those results cannot be independently inspected here.

Interviewees describe AI-supported risk screening, more focused enforcement, and structured grounds for explaining decisions. They also describe continuing human judgment in sanctions, contested cases, and field verification. These accounts support the authors' interpretation of resource augmentation and legitimization, alongside concerns about opacity, bias, and uneven digital competence (Section 5.2).

## Limitations

- The outcome is self-reported perceived discretion in hypothetical scenarios. It does not measure formally granted discretion, actual discretionary behavior, enforcement accuracy, fairness, or citizen trust.
- The main experiment lacks a manipulation check and a pretreatment discretion measure. A later manipulation check cannot establish how the original participants interpreted the scenarios.
- The unadjusted result is nonsignificant, and 124 responses were excluded after an attention check. Reported balance diagnostics do not establish equivalence on unmeasured prior AI experience, workload, or autonomy.
- Purposive recruitment, concentration in digitally experienced jurisdictions, two tax tasks, and nine interviews limit generalization. The comparison with service-oriented bureaucracies is theoretical rather than a direct experimental comparison.
- Self-reports may reflect social desirability and common method bias. Single-item accountability measures capture only limited dimensions of institutional pressure.
- KOA/ROA moderation is exploratory and does not demonstrate that literacy training would cause the reported differences. Their correlation is 0.788; the reported VIF checks address severe multicollinearity but do not establish the proposed cognitive mechanisms.
- The source has reporting inconsistencies. Table 8 gives p = 0.537 for the hypothesis that the two interactions are equal and opposite, so it does not support the prose assertion that they are demonstrably not mirror images. Section 4.1.3 also reports KOA/ROA average variance extracted values different from Table 3. Referenced supplementary diagnostics and the complete ROA item wording are unavailable in the supplied Markdown.

The DOI above appears in the source's supplementary-data statement. Publication year is not explicitly supplied and is left unspecified rather than inferred from the DOI or cited literature.

## Related Concepts

- [[concepts/street-level-discretion|Street-Level Discretion]]: distinguishes perceived, formally granted, and exercised decision latitude.
- [[concepts/algorithm-literacy|Algorithm Literacy]]: separates operational understanding from evaluative reflection.
- [[concepts/human-oversight-of-ai|Human Oversight of AI]]: retained authority and the ability to challenge outputs are central to the proposed enablement mechanism.

## Related Papers

- [[papers/trustworthy-ai-in-public-administration-the-pro-trust-pipeline-for-ethical-fraud-detection-in-public-procurement|Trustworthy AI in public administration: The PRO-Trust pipeline for ethical fraud detection in public procurement]]: a related library paper on review authority, explanation, and accountability in regulatory AI. This is a thematic connection, not a citation claimed by the tax study.
- de Boer and Raaphorst (2023), "Automation and discretion: Explaining the effect of automation on how street-level bureaucrats enforce." Cited evidence relevant to the curtailment hypothesis.
- Wang, Xie, and Li (2024), "Artificial intelligence, types of decisions, and street-level bureaucrats: Evidence from a survey experiment." Cited experimental precedent for the design and discussion of contextual differences.
- Dogruel, Masur, and Joeckel (2022), "Development and validation of an algorithm literacy scale for internet users." A cited measurement source adapted to public-sector decision-making.

[[index|Library home]]
