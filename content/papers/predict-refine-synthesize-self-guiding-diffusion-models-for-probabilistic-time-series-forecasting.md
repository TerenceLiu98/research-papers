---
title: "Predict, Refine, Synthesize: Self-Guiding Diffusion Models for Probabilistic Time Series Forecasting"
type: paper
authors:
  - Marcel Kollovieh
  - Abdul Fatir Ansari
  - Michael Bohlke-Schneider
  - Jasper Zschiegner
  - Hao Wang
  - Yuyang Wang
year: null
tags:
  - time-series
  - diffusion-models
  - probabilistic-forecasting
---

[[index|Library home]]

## TL;DR

TSDiff trains an unconditional time series diffusion model and reuses it for forecasting through observation self-guidance, post hoc forecast refinement, and synthetic training-data generation. Quantile guidance competes with task-specific models across eight univariate benchmarks, while retaining unconditional generation.

## Research Question

Can one unconditional time series model support conditional forecasting and forecast refinement without retraining or auxiliary guidance networks, while preserving useful synthetic generation?

## Motivation

Conditional diffusion forecasters learn a particular observation-to-target task. An unconditional prior could support different observation masks at inference and also generate complete sequences for training downstream predictors.

## Contributions

- TSDiff uses an S4-based denoising backbone with lagged sequences as channels.
- Observation self-guidance conditions generation using the model's own estimated clean sequence.
- Data-space refinement uses an approximate diffusion density to improve forecasts from arbitrary base models.
- Linear Predictive Score evaluates synthetic data through a ridge forecaster trained on synthetic sequences and tested on real data.

## Method

**Predict.** Train a standard noise-prediction diffusion objective on complete sequences. At inference, estimate the clean sequence from the noisy state and predicted noise, then differentiate an observation likelihood through that estimate. Gaussian observation likelihood gives mean-square guidance; an asymmetric Laplace likelihood gives quantile guidance with multiple quantile levels across forecast samples. Conditioning is a soft constraint (Section 3.1).

**Refine.** Concatenate history with a base forecast and optimize a regularized energy combining approximate negative log density with proximity to that initial sequence. Langevin Monte Carlo adds noise; the maximum-likelihood variant uses deterministic gradient descent. A representative diffusion timestep approximates the average denoising loss, reducing cost. This is a density surrogate, not exact likelihood evaluation (Section 3.2).

**Synthesize.** Sample unconditionally and train downstream ridge, DeepAR, or Transformer forecasters. LPS is the real-test CRPS of the ridge model trained on 10,000 synthetic samples. For this point predictor, the paper's metric reduces to normalized absolute error (Appendix B.2).

Training uses 100 diffusion steps, three residual layers with 64 channels, Adam at learning rate 0.001, and 1,000 epochs. Refinement uses 20 iterations, selected using Solar experiments and then reused across datasets.

## Experiments

Eight GluonTS datasets cover Solar, Electricity, Traffic, Exchange, M4-Hourly, UberTLC-Hourly, KDDCup, and Wikipedia. Forecast CRPS is approximated by normalized quantile loss at nine levels using 100 sample paths; results report three-run means and standard deviations.

Selected Table 1 scores (lower is better):

| Dataset | TSDiff-Q | TSDiff-MS | TSDiff-Cond |
| --- | --- | --- | --- |
| Electricity | 0.049 ± 0.000 | 0.062 ± 0.001 | 0.050 ± 0.002 |
| M4-Hourly | 0.036 ± 0.001 | 0.045 ± 0.000 | 0.039 ± 0.006 |
| KDDCup | 0.311 ± 0.026 | 0.325 ± 0.028 | 0.754 ± 0.007 |
| Exchange | 0.011 ± 0.001 | 0.018 ± 0.003 | 0.013 ± 0.002 |

The authors report lowest or second-lowest CRPS on five of eight datasets for TSDiff-Q. Quantile guidance improves all eight means over mean-square guidance, but does not beat every competing forecaster: TFT scores 0.007 on Exchange.

**Missing history.** Six datasets test 50% missing context under random masking and contiguous blackouts at either end. One unconditional model per dataset handles all three masks; conditional comparators train for each scenario. Evaluation scores only the forecast horizon, not imputation accuracy.

**Refinement.** Table 3 shows Seasonal Naive on Electricity improving from 0.069 to 0.050 with ML-Q, and DeepAR on M4-Hourly from 0.052 to 0.035. Gains depend on the method: DeepAR on KDDCup worsens from 0.414 to 0.477 with ML-MS.

**Synthetic data.** Table 4 gives TSDiff the lowest LPS among generators on seven of eight datasets. Exchange is the exception: TimeGAN scores 0.011 versus TSDiff's 0.012. Electricity LPS is 0.065 for TSDiff, 0.128 for TimeVAE, and 0.234 for TimeGAN; real-data training scores 0.088. Such improvements concern particular downstream models and do not establish universal superiority to real data.

**Cost.** On Exchange, Table 8 reports 201.67 seconds for quantile self-guidance versus 162.97 seconds for conditional diffusion under controlled hardware and sampling settings.

## Limitations

- Experiments are univariate; the proposed multivariate architectural extension is not evaluated here.
- Iterative denoising and guidance gradients increase inference cost, and guidance strength requires validation.
- Soft conditioning does not guarantee exact observation recovery. Refinement depends on initialization and an approximate density; nonconvex optimization has no global-optimum guarantee.
- LPS measures predictive usefulness to a linear model, rather than every aspect of distributional fidelity.
- The supplied Markdown's Equation 14 omits the negative sign implied by the preceding negative pinball-loss log density; Algorithm 2 also has a score-sign inconsistency relative to energy descent. These expressions should not be copied as implementation formulas.
- Publication year and stable identifiers are not established in the supplied Markdown and are left unspecified.

## Related Concepts

- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/probabilistic-time-series-forecasting|Probabilistic Time Series Forecasting]]
- [[concepts/observation-self-guidance|Observation Self-Guidance]]

## Related Papers

- [[papers/flow-matching-with-gaussian-process-priors-for-probabilistic-time-series-forecasting|Flow Matching with Gaussian Process Priors for Probabilistic Time Series Forecasting]]: a related library paper that uses TSDiff as a comparator and develops observation conditioning for flow models.
- Tashiro et al. (2021), “CSDI: Conditional Score-Based Diffusion Models for Probabilistic Time Series Imputation”: conditional diffusion baseline (source reference 52).
- Alcaraz and Strodthoff (2023), “Diffusion-based Time Series Imputation and Forecasting with Structured State Space Models”: SSSD supplies the architectural starting point (source reference 1).
