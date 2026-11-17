---
title: Human Decisions and Machine Predictions
type: paper
authors:
  - Jon Kleinberg
  - Himabindu Lakkaraju
  - Jure Leskovec
  - Jens Ludwig
  - Sendhil Mullainathan
year: null
venue: The Quarterly Journal of Economics
job_id: 4061e536-f12c-4b64-b80b-0817b1b727f5
tags:
  - prediction-policy
  - pretrial-detention
  - decision-making
---

## TL;DR

Machine predictions can improve simulated bail allocation, but demonstrating this requires addressing missing counterfactual outcomes and the objectives of human decision makers. In New York City data, full reranking predicts a 24.7% reduction in failure to appear at the same detention rate, or 41.9% less detention at the same failure-to-appear rate, under the baseline imputation assumption. More adverse assumptions reduce these gains. These are retrospective policy simulations, not deployed intervention effects.

## Research Question

Can machine predictions improve judges’ release decisions when outcomes are observed only for released defendants and judges may possess private information or pursue additional objectives?

## Motivation

Predictive accuracy alone does not establish decision quality. Past release decisions determine which defendants have observable outcomes, creating the [[concepts/selective-labels|selective labels]] problem. Comparing only a single outcome can also produce [[concepts/omitted-payoff-bias|omitted-payoff bias]] if judges value other consequences.

## Contributions

- Develops decision comparisons that exploit the one-sided nature of missing release outcomes and quasi-random assignment to judges of differing leniency.
- Quantifies potential improvements through contraction of released sets and full risk-based reranking with sensitivity bounds.
- Examines other arrest outcomes, racial detention rates, and judicial inconsistency rather than equating predictive accuracy with welfare.

## Method

Gradient-boosted decision trees predict failure to appear using current charges, criminal history, prior failures to appear, and age. Race, ethnicity, and gender are excluded from prediction inputs. Hyperparameters are selected by fivefold cross-validation. The paper often calls its outcome “crime,” although the primary NYC target is failure to appear; rearrest outcomes are examined separately.

**Contraction:** Start with defendants released by lenient judges and remove those with the highest predicted risk. Their observed outcomes permit evaluation of the remaining release set. Conditional quasi-random judge assignment makes stricter judges a comparison group. Interpreting the construction as a transferable decision aid additionally assumes comparable selection on unobservables across judges.

**Reranking:** Release defendants below a predicted-risk threshold, including some historically detained defendants. Within risk bins, outcomes are imputed up to the release rate of the most lenient judge group using calibration evidence. Beyond that support, sensitivity analysis assigns risk equal to the predicted risk multiplied by a parameter, capped at one. The extreme bound assigns certain failure to those remaining unobserved cases; it is conditional on the maintained structure, not an assumption-free bound.

**Behavioral diagnosis:** A separate model predicts judges’ release choices. Comparing its decisions with actual decisions probes whether unobserved influences add useful information or noise on net.

## Experiments

The NYC records cover November 2008–November 2013: 1,460,462 initial cases, of which 758,027 receive a pretrial release decision. A 203,338-case lockbox is reserved until the final revision. The remaining 554,689 cases are split 40% training, 40% imputation, and 20% testing; the principal test set has 110,938 cases. Reported predictive AUC is 0.707.

| Analysis | Reported result | Interpretation |
| --- | --- | --- |
| Highest predicted-risk 1% | Judges release 48.5%; released cases have 56.3% FTA and 62.7% rearrest | High predicted risk identifies substantial observed risk among released cases |
| Contraction, averaged across stricter judge quintiles | 48.2% as much additional detention for the same reduction, or 75.8% larger outcome reduction for the same additional detention | Relative to the most lenient quintile, not a reduction of total detention by 48.2% |
| Reranking, baseline imputation | 24.7% lower FTA at fixed detention, or 41.9% lower detention at fixed FTA | Assumes no extra unobserved risk in the remaining imputed cases |
| Reranking, extreme sensitivity bound | 14.4% lower FTA at fixed detention, or 18.5% lower detention at fixed FTA | Maintains calibration and judge-assignment assumptions |

At baseline imputation and fixed detention, FTA-based reranking also reduces rearrest by 11.07% and violent rearrest by 15.03% (Table V). Racial equity does not follow automatically from excluding race: unconstrained fixed-detention reranking increases the Black detention rate from 31.01% to 32.38%. Matching judges’ group detention rates retains a 24.64% FTA reduction (Table VII). At fixed FTA, the unconstrained rule reduces minority detention by 40.8%.

The authors report similar main findings in the lockbox and qualitatively similar national-data results. A separate older sample of 3,488 defendants examines employment and marriage: unconstrained allocation detains higher shares of employed and married defendants, but explicit constraints preserve nearly all of the predicted outcome gain.

## Limitations

- Outcomes for historically detained defendants remain unobserved; calibration checks cannot establish their risks without assumptions.
- Failure to appear and rearrest are distinct outcomes, and rearrest does not directly measure all offending. Replacement effects could reduce aggregate crime benefits.
- NYC data lack employment and family measures; the auxiliary sample is older and smaller. The complete judicial payoff function remains unknown.
- Release combines recognizance, bail amounts, and ability to pay. Recognizance-only checks support the findings but do not reproduce every institutional choice.
- Judicial uptake, overrides, behavioral responses, and equilibrium effects require prospective evaluation. The behavioral decomposition cannot identify the specific sources of noise.

## Related Concepts

- [[concepts/selective-labels|Selective Labels]] — human decisions determine outcome observability.
- [[concepts/omitted-payoff-bias|Omitted-Payoff Bias]] — measured outcome improvements can omit valued consequences.

## Related Papers

- Kleinberg et al., *Prediction Policy Problems* (2015): frames decisions whose key unknown is a prediction.
- Lakkaraju et al., *The Selective Labels Problem: Evaluating Algorithmic Predictions in the Presence of Unobservables* (2017): develops algorithmic aspects of the missing-label evaluation problem.

The supplied Markdown does not establish the publication year or article DOI; the year is left unset. Its replication-data identifier is DOI **10.7910/DVN/VWDGHT**, which identifies the dataset rather than the article.
