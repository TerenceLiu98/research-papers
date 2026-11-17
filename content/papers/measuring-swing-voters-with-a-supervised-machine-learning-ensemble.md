---
title: "Measuring Swing Voters with a Supervised Machine Learning Ensemble"
type: paper
authors:
  - Christopher Hare
  - Mikayla Kutsuris
year: 2023
doi: "10.1017/pan.2022.24"
source_job_id: "c3995584-06e1-4e31-8322-95e1cfe0a945"
tags:
  - voting-behavior
  - machine-learning
  - predictive-measurement
---

## TL;DR

An ensemble trained on pre-election survey responses predicts swing voting more accurately than a generalized additive model (validation AUC 0.90 versus 0.82). Its scores also track related electoral behaviors and later vote choices or intentions. Feature permutation and ablation indicate that policy attitudes provide predictive information beyond demographics and partisanship, consistent with a role for electoral cross-pressures.

## Research Question

Can flexible supervised learning identify a durable propensity toward swing voting, and which kinds of information are necessary to predict it?

## Motivation

Cross-pressures combine partisan, demographic, ideological, and issue-specific considerations. Their potentially nonlinear interactions make additive regression an imperfect match for the theory. Predictive validation offers a way to assess whether these combinations reveal a meaningful individual propensity.

## Contributions

- Constructs and validates individual swing-voter scores using a weighted ensemble of supervised learners.
- Tests scores against related behaviors and later elections rather than only the training outcome.
- Uses model-agnostic permutation and refitted feature ablations to investigate the importance of policy information.

## Method

The 2012 Cooperative Campaign Analysis Project interviewed 43,998 respondents. The analysis uses 45 baseline predictors collected in December 2011. Swing voters include full defectors who switched parties between their 2008 and 2012 presidential votes and temporary defectors who ultimately stayed with their party but expressed indecision or opposite-party support during the campaign. There are 2,294 swing and 14,881 consistently partisan respondents before complete-case restriction; 12,914 complete cases are randomly split into 8,395 training and 4,519 validation observations.

Eight candidate learners are tuned with 10-fold cross-validation repeated five times. Out-of-fold predictions enter a constrained regression with nonnegative weights summing to one. The selected learners are extremely randomized trees, gradient boosting, a group-lasso interaction network, and an SVM, with reported rounded weights 0.32, 0.27, 0.23, and 0.17. A spline-based generalized additive model (GAM) is the comparison baseline.

Permutation importance disrupts a feature while retaining the fitted model; feature ablation refits the ensemble without selected inputs, testing whether remaining information compensates. These are exploratory predictive diagnostics, not causal effects.

## Experiments

Table 2 reports held-out performance; about 13% of cases are swing voters.

| Metric | Ensemble | GAM |
| --- | --- | --- |
| Accuracy | 0.90 | 0.87 |
| AUC-ROC | 0.90 | 0.82 |
| Sensitivity | 0.57 | 0.22 |
| Specificity | 0.95 | 0.97 |
| Brier skill score | 0.33 | 0.17 |
| Matthews correlation coefficient | 0.55 | 0.28 |
| Cross-entropy loss | 0.26 | 0.32 |

Platt scaling raises the ensemble's Brier skill score to 0.38, compared with 0.18 for the GAM. The ensemble outperforms its selected components on the four aggregate metrics, although extremely randomized trees and boosting have greater sensitivity.

Across 12 additional indicators, higher score deciles generally show more ambivalence, ticket splitting, congressional preference volatility, and later presidential party switching. The wider panel includes 4,715 respondents followed by the VOTER Study Group, enabling validation using 2016 vote choice and 2020 vote intentions; these are not all observed 2020 election outcomes.

Party identification is the strongest single permuted feature. Policy-related variables collectively account for 34–45% of aggregate importance under the paper's permutation metrics. Basic demographics yield AUC 0.74 and Brier skill −0.02. Removing demographics in subset I4 retains AUC 0.88, but its Brier skill of 0.23 remains below the full ensemble's 0.33. Thus policy-rich inputs retain substantial signal, without matching every full-model metric.

## Limitations

The analysis is exploratory and observational: predictive importance does not identify the causal effect of a policy attitude or isolate a specific high-order interaction. Complete-case selection and the operational restriction to comparable partisan vote histories delimit the analyzed population. Related-behavior and later-election validation support transport within this survey setting, not universal applicability to other electoral systems. Rich survey attitudes are needed; public-record-style demographics perform substantially worse. Supplementary appendices are referenced but are not included in the supplied Markdown.

## Related Concepts

- [[concepts/electoral-cross-pressures|Electoral Cross-Pressures]]: competing considerations motivate the interactive prediction strategy.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: a single ideological scale can conceal conflicting issue alignments.

## Related Papers

- Grimmer, Messing, and Westwood (2017), “Estimating Heterogeneous Treatment Effects and the Effects of Heterogeneous Treatments with Ensemble Methods”: supplies the ensemble-weighting approach.
- Hillygus and Shields (2008), *The Persuadable Voter*: develops the policy cross-pressure account motivating this application.
- Covert, Lundberg, and Lee (2021), “Explaining by Removing”: provides the framework connecting feature removal and model explanation.

Published in *Political Analysis* 31, 537–553 (2023); first published online 17 October 2022. [Paper DOI](https://doi.org/10.1017/pan.2022.24). [Replication materials](https://doi.org/10.7910/DVN/CLQY6O). Synthesized from the supplied parsed Markdown.
