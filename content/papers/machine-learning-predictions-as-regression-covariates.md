---
title: Machine Learning Predictions as Regression Covariates
type: paper
authors:
  - Christian Fong
  - Matthew Tyler
year: 2021
doi: 10.1017/pan.2020.38
tags:
  - measurement-error
  - political-methodology
  - machine-learning
---

## TL;DR

Replacing missing regression covariates with machine-learning predictions can produce inconsistent coefficients and misleading confidence intervals. Fong and Tyler combine labeled-only OLS with a validation-calibrated instrumental-variable estimator through GMM. Under a prediction exclusion restriction and representative labeling, this uses unlabeled observations to improve precision while accounting for prediction error.

Published in *Political Analysis* 29, 467–484 (2021); first published online November 11, 2020.

## Research Question

How can researchers use predicted covariates to improve regression efficiency without treating imperfect predictions as observed truth?

## Motivation

Text coding, voter files, and merged surveys often contain many observations but few verified covariate labels. Classification accuracy alone does not establish valid downstream inference. Bootstrapping or repeatedly sampling predicted labels does not remove the underlying plug-in inconsistency. Representative labeled-only regression supplies a useful baseline even when classifier assumptions fail.

## Contributions

- Characterizes three moment restrictions needed for naive substitution, explaining why bias need not be attenuation.
- Separates classifier training from validation calibration to avoid using optimistic in-sample prediction relationships.
- Combines labeled OLS and prediction-based 2SLS moments with GMM, including uncertainty from calibration and heteroskedasticity-robust inference.
- Supplies an exclusion-restriction diagnostic, simulations, and an application to political incivility on Reddit.

## Method

The target is the linear projection $y=x^T\beta+\epsilon$, with $E[x\epsilon]=0$. Some components of $x$ are missing; $z$ combines their predictions with the always-observed covariates. Naive regression on $z$ adds prediction error to the regression residual. Consistency requires predictions to be orthogonal to the original residual and prediction errors to be orthogonal to both observed and predicted covariates (Section 2).

Randomly label a subset, then randomly split it into training and validation samples. Train the classifier only on the training sample. In validation data estimate the linear projection $x=\Gamma z+\eta$. This calibration estimates the prediction–truth relationship applicable to the unlabeled primary sample, rather than the stronger relationship induced by training overfit.

The estimator stacks labeled-sample OLS moments with moments based on $z(y-(\widehat\Gamma z)^T\beta)$ in validation and primary data, minimizing their weighted quadratic form. Optimal weighting combines their information; standard errors account for estimating $\Gamma$ (Section 3). The remaining central restriction is $E[z\epsilon]=0$: predictions must not explain the outcome residual after the original covariates are controlled for. This is a regression measurement correction, not automatic causal identification.

The validation sample supports an overidentification test. Nonrejection cannot establish exclusion, especially with a small validation sample. Avoiding outcome information in classifier inputs can help defend the restriction. See [[concepts/inference-with-predicted-covariates|Inference with Predicted Covariates]].

## Experiments

Simulations compare naive substitution, labeled-only OLS, GMM, and an infeasible full-label oracle. They use 1,000 training and 1,000 validation observations, classifier accuracies of 72% or 90%, and 10,000 or 1,000,000 unlabeled observations, under high and low signal-to-noise conditions (Section 4).

For the 72%-accurate classifier under low signal-to-noise conditions (Table 1):

| Unlabeled observations | Naive RMSE | Labeled-only RMSE | GMM RMSE | GMM 95% coverage |
| --- | ---: | ---: | ---: | ---: |
| 10,000 | 0.50 | 0.46 | 0.36 | 0.95 |
| 1,000,000 | 0.56 | 0.46 | 0.08 | 0.94 |

Gains grow with classifier accuracy, unlabeled sample size, and lower signal-to-noise ratio. Some high-signal settings show little improvement over labeled-only OLS. The simulations satisfy exclusion by construction.

The application uses 1,210,166 replies in Reddit's politics subreddit from 2014, with 3,026 random hand labels split into 2,413 training and 613 validation observations. Scores are clipped to [-10, 10]. A word-indicator SVM achieves accuracy 0.75, precision 0.36, and recall 0.53 for incivility. The exclusion test yields p=0.302, while tests reject the additional naive-estimator restrictions (Section 5).

Under the paper's interpretation, a coefficient below -1 indicates punishment beyond a possible single downvote by the target. GMM's entire 95% interval lies below -1; labeled-only OLS cannot reject that threshold, and the naive interval lies entirely above it. The source does not supply exact interval endpoints in text, so none are reconstructed here.

## Limitations

- Exclusion remains substantive and can fail despite good prediction accuracy or a nonsignificant diagnostic.
- The basic design assumes representative random labeling. Active learning and selective oversampling require modifications and may compromise exclusion.
- When efficiency gains are small or exclusion is doubtful, labeled-only OLS is preferable.
- Human labels define the measurement target unless an audited gold standard is available; the estimator does not automatically correct human coding errors.
- Missing outcomes require a different solution; this covariate correction does not transfer directly.
- The supplied text contains damaged mathematical notation and references separate online appendices. This summary relies on intact equations and the main-text descriptions rather than reconstructing unavailable proofs.

## Related Concepts

- [[concepts/inference-with-predicted-covariates|Inference with Predicted Covariates]] — prediction error, validation calibration, and downstream regression validity.
- [[concepts/debiased-inference-with-multiple-imperfect-measurements|Debiased Inference with Multiple Imperfect Measurements]] — a distinct route using multiple proxies instead of verified labels.

## Related Papers

- [[papers/debiased-inference-for-ai-generated-data-without-gold-standard-labels-identification-via-multiple-imperfect-measurements|Debiased Inference for AI-Generated Data without Gold-Standard Labels: Identification via Multiple Imperfect Measurements]] — related library work replacing gold-standard validation with conditional-independence and identification assumptions; not a citation in this paper.
- Imai and Khanna (2016), “Improving Ecological Inference by Predicting Individual Ethnicity from Voter Registration Records” — motivating use of predicted covariates.
- Aigner (1973), “Regression with a Binary Independent Variable Subject to Errors of Observation” — antecedent analysis of misclassified binary regressors.
