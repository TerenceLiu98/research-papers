---
title: "Does Conjoint Analysis Mitigate Social Desirability Bias?"
type: paper
authors:
  - Yusaku Horiuchi
  - Zachary Markovich
  - Teppei Yamamoto
year: 2022
doi: "10.1017/pan.2021.30"
source_job_id: "260a99ba-8b2e-4826-bcac-8f0ac88bcbd2"
tags:
  - conjoint-experiments
  - survey-methodology
  - social-desirability-bias
---

## TL;DR

Two survey experiments provide exploratory evidence that fully randomized conjoint designs reduce social desirability bias among susceptible respondents. A controlled contrast separates this reduction from the attention effect of varying only one attribute. Preferred subgroup estimates are about two-thirds as large as the sensitive attribute’s fully randomized AMCE; this is not an estimate of the fraction of total bias eliminated.

## Research Question

Does varying multiple profile attributes reduce socially desirable reporting relative to varying only the sensitive attribute, after accounting for differences in attention?

## Motivation

Conjoint experiments are widely used to elicit sensitive preferences, but smaller attribute effects alone cannot establish more honest reporting: changing the design also changes attention. The paper develops a comparison that addresses this confounding.

## Contributions

- Proposes a factorial design separating social desirability from design-induced attention.
- Tests environmental consumption and political candidate evaluations using different low-bias controls.
- Shows why topic-specific susceptibility and exploratory subgroup selection matter for interpreting average findings.

## Method

The proposed mechanisms are imperceptibility (multiple attributes obscure the sensitive purpose) and rationalization (other differences justify a socially undesirable choice). Fully randomized profiles permit both; partially randomized pairs differ only on the focal attribute.

Let A denote an average marginal component effect (AMCE). The contrast is `(A_partial,high − A_full,high) − (A_partial,low − A_full,low)`. Interpreting it as reduced bias requires the low-bias comparison to capture the relevant attention-driven design effect. Study 1 uses gel cushioning as a nonsensitive control for ecofriendly shoe materials. Study 2 uses the same candidate-scandal attribute, with or without a randomized suggestion of a subsequent face-to-face interview to increase social pressure. The design does not separately identify the two psychological mechanisms.

## Experiments

Both studies rate each profile on a seven-point scale rather than using a forced binary choice.

| Study | Sample and tasks | Preferred subgroup result |
| --- | --- | --- |
| Athletic shoes, MTurk, December 2018 | 3,417 baseline respondents; 3,075 returnees; 20 paired tasks; 1,444 respondents selected by preregistered environmental-concern and SDB measures | Ecofriendly AMCEs: 1.86 partial versus 0.62 full. Gel-cushioning AMCEs: 1.28 versus 0.43. Adjusted contrast: 0.39, 95% CI [0.12, 0.66]. |
| Congressional candidates, Prolific, December 2020 | 2,000 respondents after quality checks; 10 paired tasks with eight attributes; top 10% of estimated SDB proneness | Causal-forest subgroup: adjusted contrast −1.26, 95% CI [−2.20, −0.31]; primed full-design scandal AMCE −1.86. |

Study 2 trains on subsets of partially randomized respondents and predicts prime responsiveness for held-out respondents using pretreatment covariates, repeating sample splitting and averaging predictions. An alternative S-learner yields −0.41, 95% CI [−1.37, 0.54], which is statistically insignificant. The paper reports null full-sample findings in both studies; Study 1 also finds no corresponding result in the excluded subgroup.

Replication materials: [Harvard Dataverse](https://doi.org/10.7910/DVN/4WDVDB). Published in *Political Analysis* 30, 535–549 (2022), online September 15, 2021.

## Limitations

Both main analyses depart from their preanalysis plans. Study 1 replaces an unstable difference-in-ratios estimator; its originally specified analysis was null. Study 2 adds subgroup analysis after a null preregistered full-sample test. Sample splitting addresses overfitting but does not make the revised analysis confirmatory. Results depend on subgroup thresholds and model choices. Study 1 assumes comparable attention effects for distinct attributes; Study 2 relies on the prime and control comparison isolating the relevant bias change. Neither study establishes absence of residual bias or universal benefits across topics, populations, and conjoint formats.

## Related Concepts

- [[concepts/social-desirability-bias|Social Desirability Bias]]: the reporting distortion targeted by the design.

## Related Papers

- [[papers/odd-profiles-in-conjoint-experimental-designs|Odd Profiles in Conjoint Experimental Designs: Effects on Survey-Taking Attention and Behavior]]: complementary evidence on how profile design affects attention, a central alternative explanation here.
- Hainmueller, Hopkins, and Yamamoto (2014), “Causal Inference in Conjoint Analysis: Understanding Multidimensional Choices via Stated Preference Experiments”: methodological foundation cited for AMCE-based conjoint analysis.
