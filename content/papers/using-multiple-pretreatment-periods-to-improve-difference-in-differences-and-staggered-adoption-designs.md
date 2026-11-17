---
title: "Using Multiple Pretreatment Periods to Improve Difference-in-Differences and Staggered Adoption Designs"
type: paper
authors:
  - Naoki Egami
  - Soichiro Yamauchi
year: 2023
doi: "10.1017/pan.2022.8"
source_job_id: "03332340-1e9d-4fba-a385-71155647f189"
tags:
  - causal-inference
  - difference-in-differences
  - panel-data
---

## TL;DR

Double DID uses multiple pretreatment periods for assumption assessment, efficient estimation, and identification under [[concepts/parallel-trends-in-trends|Parallel Trends-in-Trends]]. It combines standard and sequential DID through generalized method of moments (GMM) when extended parallel trends is plausible; under the weaker trends-in-trends restriction alone, it uses sequential DID rather than pooling an invalid standard-DID moment.

## Research Question

How can additional pretreatment observations improve DID and staggered-adoption designs, and which assumptions justify each improvement?

## Motivation

Additional pretreatment data are often used only for placebo checks or incorporated into a fixed-effects regression without distinguishing identification from efficiency. The paper separates three uses: diagnosing trend restrictions, pooling valid comparisons to improve precision, and relaxing parallel trends by extrapolating differences in pretreatment slopes.

## Contributions

- Clarifies the potential-outcome assumptions behind standard, extended, and sequential DID.
- Unifies these estimators in double DID, with covariance-based optimal weighting when both constituent moments are valid.
- Extends the framework to covariates, additional pre- and posttreatment periods, and staggered adoption.
- Provides the DIDdesign R package and empirical reanalyses.

## Method

Let $g_t$ denote the observed treated-minus-control mean outcome gap at time $t$, with pretreatment periods 0 and 1 and posttreatment period 2. Standard DID is $g_2-g_1$; sequential DID is $(g_2-g_1)-(g_1-g_0)$. Extended parallel trends requires the untreated group gap to remain constant across all three periods. Parallel trends-in-trends instead permits that gap to change linearly.

Double DID minimizes $m(\tau)^\top Wm(\tau)$, where $m(\tau)=(\tau-\widehat\tau_{DID},\tau-\widehat\tau_{sDID})^\top$. Under extended parallel trends, the inverse estimated covariance of the two estimators supplies the efficient GMM weight. Its asymptotic variance is no larger than those of standard, sequential, or extended DID in the stated setting. The covariance is estimated by block bootstrap at the treatment-assignment level. Under trends-in-trends alone, only the sequential moment is retained.

Pretreatment DID provides an overidentification diagnostic conditional on validity of the sequential moment. The authors also recommend equivalence testing to distinguish accurately small pretrends from low-powered failure to reject zero. Neither diagnostic establishes posttreatment counterfactual trends.

For staggered adoption, each time-specific ATT compares newly treated units with units treated later or never treated; already-treated units are excluded. The setup assumes no anticipation and invariance to treatment history. Time-average effects weight adoption-time ATTs by cohort size. Generalized K-DID permits polynomial differential confounding of order K−1 with K pretreatment periods, subject to the corresponding identifying restrictions.

## Experiments

The main application reexamines abolition of elected councils in Vietnam in 2009, using outcomes from 2006, 2008, and 2010. Diagnostics include commune area, population, national-level-city status, and regional fixed effects; uncertainty uses 2,000 district-level bootstrap iterations.

| Outcome | Standard DID, 90% CI | Double DID, 90% CI | Interpretation |
| --- | --- | --- | --- |
| Education and cultural program | 0.084 [−0.006, 0.174] | 0.082 [0.001, 0.163] | Extended parallel trends is judged plausible; standard errors fall about 10%. |
| Tap water | −0.078 [−0.169, 0.012] | −0.119 [−0.225, −0.012] | Sequential adjustment under trends-in-trends changes the estimate. |

For agricultural centers, the authors find neither trend restriction sufficiently credible and decline to endorse an ATT estimate without stronger assumptions. The main text reports supplementary simulations and a staggered-adoption reanalysis of teacher collective-bargaining rights; their detailed results are not included in the supplied Markdown.

## Limitations

The efficiency result requires valid pooled moments and is asymptotic; it is not an unconditional robustness guarantee. With only two pretreatment observations, trends-in-trends still needs substantive justification. Opposite-signed pretrends in the agricultural-center example illustrate that additional differencing need not rescue identification. More flexible polynomial extrapolation also remains a restriction on untreated outcomes.

## Related Concepts

- [[concepts/parallel-trends-in-trends|Parallel Trends-in-Trends]]: the identifying restriction for sequential DID.
- [[concepts/honest-event-study-inference|Honest Event Study Inference]]: shares the distinction between equivalence evidence and insignificant pretrend tests.
- [[concepts/stacked-event-studies|Stacked Event Studies]]: a related approach to organizing untreated comparisons across adoption cohorts.

## Related Papers

- [[papers/making-event-study-plots-honest|Making Event Study Plots Honest]]: addresses pretrend equivalence and posttreatment inference with functional simultaneous bands, rather than GMM pooling.
- Mora and Reggio (2019), “Alternative Diff-in-Diffs Estimators with Several Pretreatment Periods”: precedent for sequential comparisons.
- Malesky, Nguyen, and Tran (2014), “The Impact of Recentralization on Public Services”: source of the Vietnam application.

Published in *Political Analysis* 31, 195–212 (2023); first published online March 30, 2022. [Article](https://doi.org/10.1017/pan.2022.8). [Replication data](https://doi.org/10.7910/DVN/SLIXNF).
