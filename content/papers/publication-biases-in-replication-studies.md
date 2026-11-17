---
title: Publication Biases in Replication Studies
type: paper
authors:
  - Adam J. Berinsky
  - James N. Druckman
  - Teppei Yamamoto
year: 2021
doi: 10.1017/pan.2020.34
tags:
  - publication-bias
  - replication
  - research-transparency
---

## TL;DR

A two-stage publication model and randomized faculty vignettes identify preferences for significant findings, original studies, and replications that contradict prior results. Replication-specific biases are smaller than the significance preference, but their combined model-implied effect raises the false-positive rate among published replications under a true null from 5% to 7.8%.

## Research Question

Do publication decisions favor original over replication studies and contradictory over confirming replications, and how do these preferences interact with the file drawer bias?

## Motivation

Replication can correct the scientific record only if its own publication process does not systematically select results. At the time of the study, few political science replications were available for conventional publication-bias diagnostics. Vignettes allow study quality to be held constant while varying results and replication status.

## Contributions

- Distinguishes three mechanisms of [[concepts/publication-bias|Publication Bias]]: file drawer, repeat study, and gotcha biases.
- Models selection through an original study and a subsequent replication using new data from the same population.
- Estimates publication-related preferences experimentally and translates them into a model-implied actual false-positive rate (AFPR).

## Method

The model starts under a true null. An original test rejects with probability $\alpha_1$; publication probabilities depend on significance. Only published original studies receive a replication, whose test rejects with probability $\alpha_2$. Replication publication depends on both studies' significance outcomes. All studies are assumed written up; decisions to initiate studies or abandon manuscripts are outside the model.

The key estimand is

$$
\widetilde{\alpha}_2 = \Pr(\text{replication significant} \mid \text{replication published}, H_0\text{ true}).
$$

This conditions on a true null, rather than estimating the probability that a published significant finding is false. Bias effects depend on their joint configuration: preference for contradictory findings can reinforce or offset selection for significance.

## Experiments

Political science faculty at US Ph.D.-granting institutions evaluated five author-role and five reviewer-role vignettes; those with editorial experience received five additional editor-role vignettes. Profiles independently randomized significance, original versus replication status, prior-study significance, design, sample size, hypothesis importance, and surprisingness, while describing methods as sound. Outcomes were stated percentage chances of submission, recommendation, or acceptance, pooled across roles (Sections 3–4).

| Contrast | Reported result |
| --- | --- |
| Significant versus nonsignificant original study | 67.1% versus 45.2%; 21.9 percentage-point preference |
| Significant versus nonsignificant replication | 62.5% versus 44.1%; 18.4-point preference |
| Confirming replication versus original, significant results | 61.2% versus 67.1%; 5.9-point replication penalty |
| Confirming replication versus original, nonsignificant results | 39.1% versus 45.2%; 6.1-point replication penalty |
| Nonsignificant replication contradicting versus confirming prior result | 49.1% versus 39.1%; 10-point contradiction preference |
| Significant replication contradicting versus confirming prior result | 63.9% versus 61.2%; reported contrast 2.6 points, reflecting unrounded estimates |

At nominal significance 0.05, model-implied replication AFPR is 0.078 (95% CI 0.074–0.081). Conditional on an originally nonsignificant result it is 0.079 (0.076–0.083), versus 0.062 (0.059–0.064) after an originally significant result. In the latter case, gotcha bias partly offsets the file drawer bias. These are implications of the model calibrated to hypothetical decisions, not observed journal error rates.

## Limitations

Stated publication intentions may differ from actual behavior and can reflect social desirability. The population is disciplinary and institutional, not a representative sample of all scientists. The model collapses publication stages, assumes manuscripts are written, and omits strategic selection of replication targets. The supplied main text does not provide respondent counts or the full supplementary estimation details. Its malformed significance strings are not reproduced here. Replication uses fresh data from the same population; reanalysis of existing data is a different setting.

## Related Concepts

- [[concepts/publication-bias|Publication Bias]] — selection can depend on significance, study status, and agreement with earlier evidence.
- [[concepts/null-results-reporting|Null Results Reporting]] — disclosure can preserve findings otherwise excluded from the accessible record.

## Related Papers

- [[papers/learning-from-null-effects-a-bottom-up-approach|Learning from Null Effects: A Bottom-Up Approach]] — complementary reporting reforms address visibility of unpublished null findings.
- Franco, Malhotra, and Simonovits (2014), *Publication Bias in the Social Sciences: Unlocking the File Drawer* — cited comparison separating manuscript production from later publication selection.
- Open Science Collaboration (2015), *Estimating the Reproducibility of Psychological Science* — motivates the model's counterfactual of publishing replication attempts individually.

Published in *Political Analysis* 29, 370–384 (2021), online 16 November 2020. Replication materials: DOI 10.7910/DVN/BJMZNR.
