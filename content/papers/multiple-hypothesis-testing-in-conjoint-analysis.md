---
title: Multiple Hypothesis Testing in Conjoint Analysis
type: paper
authors:
  - Guoer Liu
  - Yuki Shiraito
year: 2023
doi: "10.1017/pan.2022.30"
source_job_id: "fac45315-10e7-4449-8905-c89ef02bd800"
tags:
  - conjoint-experiments
  - multiple-testing
  - empirical-bayes
---

## TL;DR

Testing many conjoint attribute contrasts creates substantial false-positive risk. In the paper's all-zero-AMCE simulation, over 90% of uncorrected experiments yield at least one significant estimate. Bonferroni, Benjamini–Hochberg (BH), and adaptive shrinkage substantially reduce this risk, with different costs in missed effects.

## Research Question

How severe is multiple hypothesis testing in conjoint analysis, and which correction methods balance false positives and false negatives in realistic applications?

## Motivation

Conjoint experiments estimate many effects simultaneously: the motivating immigration design has nine attributes, 50 levels, and 41 reference-category contrasts. A nominal 5% threshold for each contrast does not control the probability of any false finding across the family.

## Contributions

- Quantifies false findings under zero and mixed nonzero average marginal component effects (AMCEs).
- Compares two frequentist corrections with empirical Bayes adaptive shrinkage.
- Reanalyzes immigration and trade-partner preferences and proposes preregistering correction choices and reporting corrected alongside uncorrected results.

## Method

The study compares approaches to [[concepts/multiple-hypothesis-testing|Multiple Hypothesis Testing]]. Bonferroni tests each of m hypotheses at alpha/m to control familywise error. BH orders p-values and rejects through the largest rank k satisfying p_(k) ≤ alpha k/m, targeting false discovery rate rather than familywise error.

Adaptive shrinkage uses estimated coefficients and standard errors with an approximately normal sampling model. A spike at zero and a mixture of normal or uniform components regularize effects; mixture weights are estimated by penalized likelihood before posterior inference. Unlike the two p-value corrections, it changes point estimates as well as uncertainty summaries. Its posterior intervals should be distinguished from frequentist confidence intervals.

Simulations generate forced choices by coarsening latent continuous responses, using the immigration design and 1,000 repetitions per setting. The all-zero setting allows offsetting individual effects, so zero AMCEs do not imply that every individual's effect is zero. Empirical regressions use respondent-clustered standard errors.

## Experiments

With all AMCEs zero, fewer than 75 of 1,000 uncorrected trials have no significant results. Bonferroni and BH eliminate false findings in over 90% of trials; adaptive shrinkage eliminates almost all (Sections 2 and 4.1).

Table 2 considers ten nonzero contrasts. Exact recovery means detecting all ten with no false positives:

| Method | Exact recovery / 1,000 | Trials with at least one false negative / 1,000 |
| --- | ---: | ---: |
| Uncorrected | 248 | 10 |
| Bonferroni | 625 | 341 |
| BH | 589 | 71 |
| Adaptive shrinkage, uniform mixture | 620 | 195 |
| Adaptive shrinkage, normal mixture | 645 | 225 |

The table shows the central tradeoff: correction increases exact recovery but also increases missed effects. BH misses fewer effects than the other corrections; adaptive shrinkage lies between BH and Bonferroni on this dimension.

In the U.S. immigration reanalysis, Bonferroni removes significance for several country and profession contrasts. Adaptive shrinkage removes the construction-worker bonus while retaining more findings than Bonferroni. In Vietnam's trade-partner experiment, Bonferroni and adaptive shrinkage remove significance for military alliance and similar environmental standards; the preference for higher environmental standards persists. BH preserves the original significant findings in these examples (Section 5).

## Limitations

The simulations use one underlying conjoint design and selected effect/noise configurations; their numerical error rates are not universal guarantees. Dependence, the choice of hypothesis family, and adaptive-shrinkage modeling assumptions matter. Empirical ground truth is unknown: a finding becoming nonsignificant does not establish that it was false, and substantive plausibility cannot adjudicate truth. Supplementary analyses are referenced but are not included in the supplied Markdown. Correction addresses multiplicity, not the identification or interpretation of the estimand.

## Related Concepts

- [[concepts/multiple-hypothesis-testing|Multiple Hypothesis Testing]]: distinguishes familywise error, false discovery rate, and power costs.
- [[concepts/population-average-marginal-component-effect|Population Average Marginal Component Effect]]: makes profile averaging explicit; multiplicity is a separate inferential concern.

## Related Papers

- [[papers/using-machine-learning-to-test-causal-hypotheses-in-conjoint-analysis|Using Machine Learning to Test Causal Hypotheses in Conjoint Analysis]]: tests broader attribute-level causal nulls, whereas this paper compares corrections across AMCE contrasts.
- [[papers/improving-the-external-validity-of-conjoint-analysis|Improving the External Validity of Conjoint Analysis]]: addresses profile-distribution dependence rather than multiple-testing correction.
- Stephens (2017), “False Discovery Rates: A New Deal”: methodological foundation for adaptive shrinkage cited by the paper.

Published in Political Analysis 31, 380–395; online 26 January 2023. Replication data: DOI 10.7910/DVN/HIPDOP.
