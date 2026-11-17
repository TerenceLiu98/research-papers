---
title: "Identification of Preferences in Forced-Choice Conjoint Experiments: Reassessing the Quantity of Interest"
type: paper
authors:
  - Flavien Ganter
year: 2023
doi: "10.1017/pan.2021.41"
source_job_id: "e60865f0-1905-43dd-a249-a4c52690c1c9"
tags:
  - conjoint-experiments
  - preference-measurement
  - causal-inference
---

## TL;DR

Ganter distinguishes describing preferences from estimating effects on profile selection. He argues that AMCEs mix preferences with profile-composition effects and proposes the [[concepts/average-component-preference|Average Component Preference]] (ACP), which averages direct comparisons against different levels and excludes focal-attribute ties.

## Research Question

Which estimand identifies patterns of preferences in paired forced-choice conjoint experiments, and how can it be estimated under independent or restricted randomization?

## Motivation

A change in selection probability depends on which competitors a profile encounters. Preference measurement instead seeks a standardized summary of favorability. Restricted randomization changes the conditioning populations across contrasts, while ties dilute comparisons differently across attributes. Consequently, comparing AMCE magnitudes can misrepresent relative preference strength (Sections 3–4).

## Contributions

- Separates preference-related questions from selection-process questions and assigns distinct estimands to them.
- Explains compositional distortions from ties and differing support restrictions.
- Defines ACPs and conditional ACPs, with paired-data regression estimation and respondent-clustered inference.
- Illustrates agreement and disagreement with AMCE-based interpretations in two existing experiments.

## Method

For focal level $t$, let $p_{t,t'}$ denote pairwise favorability over alternative $t'$, measured as selection probability minus 0.5. The ACP is

$$
\pi_\ell(t;w_t)=\sum_{t'\ne t}w_t(t')p_{t,t'},\qquad \sum_{t'\ne t}w_t(t')=1.
$$

Equal weights over the other levels are recommended unless substantive reasons justify another choice. ACPs lie between −0.5 and 0.5; zero denotes average indifference. The level set and weights remain part of the target (Section 5).

Identification uses randomized attributes and assumptions excluding profile-order and task-order effects. Under independent randomization, pairwise conditional choice means identify the terms. With restrictions such as doctors requiring college education, conditional ACPs compare profiles under explicit education restrictions. Comparisons intended to isolate occupation preferences must retain common conditioning populations.

Estimation uses one row per profile pair. Signed indicators encode each unordered level comparison as +1, −1, or 0; a linear regression of first-profile selection on these indicators and an intercept estimates pairwise coefficients. Weighted coefficient sums yield ACPs. Other-attribute comparison indicators are optional for identification. Delta-method, simulation, or bootstrap inference must account for repeated tasks by clustering or resampling respondents (Section 6).

## Experiments

**Immigrant preferences.** Reanalysis of Hainmueller and Hopkins (2015) broadly agrees with the original AMCE conclusions. No plans to seek work has ACP −0.213, corresponding to a 28.7% selection probability against the weighted alternatives. Having an employer contract corresponds to 66.7%. Occupation comparisons differ by education conditioning: teachers are clearly preferred to construction workers among college-educated profiles, but the difference is small and statistically insignificant when lower-education comparable pairs enter.

**Community preferences.** Reanalysis of Mummolo and Nall (2017) yields similar within-attribute rankings but different relative importance. AMCEs suggest place type is at least as important as school quality; ACP ranges indicate stronger school-quality preferences. Approximately 50% of pairs tie on school quality versus 17% on place type. The author states that the original study's broader conclusions remain intact (Section 7).

Consistency proofs and Monte Carlo evidence are referenced in Supplementary Information D; their detailed results are not included in the supplied Markdown.

## Limitations

The framework addresses paired forced-choice tasks; extension to more than two alternatives is not straightforward. Restricted designs require explicit conditional targets unless additional no-interaction assumptions are imposed. Different conditioning sets can mix focal preferences with preferences for associated attributes. The critique concerns interpreting AMCEs as preference summaries, not their validity for appropriately specified selection-process questions.

## Related Concepts

- [[concepts/average-component-preference|Average Component Preference]]: standardized, tie-excluding preference summary introduced here.
- [[concepts/population-average-marginal-component-effect|Population Average Marginal Component Effect]]: includes a substantive profile distribution in the causal selection-process target.

## Related Papers

- [[papers/improving-the-external-validity-of-conjoint-analysis|Improving the External Validity of Conjoint Analysis]]: specifies profile distributions for causal effects; Ganter distinguishes this goal from preference measurement.
- Hainmueller, Hopkins, and Yamamoto (2014), “Causal Inference in Conjoint Analysis”: supplies the AMCE framework and identification assumptions discussed here.

Published in *Political Analysis* 31:98–112 (2023), online 16 December 2021. [Article](https://doi.org/10.1017/pan.2021.41). [Replication data](https://doi.org/10.7910/DVN/3RNU1Q).
