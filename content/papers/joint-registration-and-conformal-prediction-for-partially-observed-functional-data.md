---
title: Joint Registration and Conformal Prediction for Partially Observed Functional Data
type: paper
authors:
  - Fangyi Wang
  - Sebastian Kurtek
  - Yuan Zhang
year: 2026
doi: 10.1080/10618600.2026.2634823
venue: Journal of Computational and Graphical Statistics
tags:
  - functional-data-analysis
  - conformal-prediction
  - functional-registration
---

## TL;DR

The paper integrates elastic registration with conformal prediction of partially observed curves. An independently estimated registration template preserves exchangeability when predicting aligned amplitude, yielding finite-sample pointwise marginal coverage. A separate procedure predicts monotone relative phase on a coarse grid.

## Research Question

How can missing functional observations be predicted with finite-sample uncertainty guarantees when curves vary in both amplitude and feature timing?

## Motivation

Ignoring phase variation can inflate prediction intervals and obscure peaks and valleys. Registering partial curves directly against complete curves is difficult, while treating alignment as fixed preprocessing can omit registration uncertainty. The key statistical challenge is constructing exchangeable predictor-response pairs after registration.

## Contributions

- Full Functional Conformal Prediction (FFCP) constructs exchangeable pairs by restricting every historical curve to the target curve’s observed domain.
- Split Functional Conformal Prediction (SFCP) estimates a Karcher-mean template on an independent training subset and predicts registered amplitude from unregistered partial observations.
- Split Functional Conformal Prediction of relative Phase (SFCPP) jointly evaluates monotone warping vectors, respecting their boundary constraints.
- The framework accommodates truncated, fragmented, and sparsely observed target curves through appropriate predictor distances.

## Method

Assume complete historical curves and the target curve are i.i.d., and the truncation point is independent of the curves. FFCP uses the common observed restriction as the predictor and each time-specific curve value as the response. For each trial response, a permutation-symmetric neighborhood smoother fits the augmented sample; absolute residual ranks determine inclusion in the prediction set. Gaussian kernel weights depend on distances between partial observations. The paper uses a coverage-preserving bandwidth-selection procedure rather than unrestricted tuning on calibration outcomes.

SFCP splits the historical sample into training and calibration subsets. Elastic registration uses square-root slope functions and Fisher–Rao geometry to estimate a training-set Karcher mean. Calibration curves are aligned to this independent template; their aligned values become responses, while predictors remain unregistered partial curves. Full conformal evaluation then operates on these pairs. The split serves template independence, rather than merely replacing full conformal refitting with a fixed regression model.

The target is the amplitude of the full latent curve relative to the training template. Theorem 1 gives pointwise marginal coverage of at least 1 − α under the stated assumptions. Predictions span the entire aligned domain because the observed-domain boundary after warping is unknown. This does not directly supply a band for the original curve in calendar time.

SFCPP instead treats the discretized relative warping as a vector response. It searches monotone trial vectors with endpoints 0 and 1 and uses Fisher–Rao distance between warpings as its nonconformity score. Joint search motivates a much coarser grid than amplitude prediction.

## Experiments

Section 5 uses 500 Monte Carlo replicates, 100 historical curves, a 100-point amplitude grid, and nominal 90% coverage. Simulated two-peak curves are evaluated with and without random Beta-CDF time warping. Comparators are scalar-on-function regression (SoF), function-on-function regression (FoF), and FFCP. SFCP predicts aligned amplitude; the other three methods predict the original curve, so comparisons involve different targets.

Table 2 reports **whole-grid coverage**, not pointwise coverage:

| Data | SoF | FoF | FFCP | SFCP |
| --- | ---: | ---: | ---: | ---: |
| No phase variation | 0.174 | 0 | 0.690 | 0.680 |
| Phase variation | 0 | 0 | 0.362 | 0.674 |

FFCP and SFCP maintain reported pointwise coverage, while SFCP produces narrower intervals in the phase-varying setting. Fragmented and sparse-observation simulations also support pointwise validity. For phase prediction with truncation at 0.25, 0.5, and 0.75, reported coverage is 0.868, 0.878, and 0.894; the corresponding 95% confidence intervals include 0.9.

Applications cover Berkeley growth rates (93 curves), ECG PQRST complexes (80), and Taiwan traffic flow (84), with simulated halfway truncation. A Rhode Island temperature example uses complete years 1950–2024 and observations through March 13, 2025 to predict 2025 amplitude and phase. These examples illustrate geometric fidelity rather than establishing universal real-world coverage.

## Limitations

- Amplitude bands have pointwise marginal validity, not simultaneous whole-curve or input-conditional validity.
- The exchangeability argument relies on independent observation timing and i.i.d. curves; it does not establish robustness to temporal dependence or distribution shift.
- Heterogeneous amplitude subpopulations can make a single Karcher-mean template unrepresentative.
- Trial-grid search is costly, especially for joint phase prediction. With 50 trial values per time point, reported SFCPP runtimes rise from 0.12 minutes at five time points to 61.5 minutes at eight and over 1,440 minutes at nine.
- The supplied article references supplementary proofs and sensitivity studies; their full contents are not included in the supplied Markdown.

## Related Concepts

- [[concepts/functional-registration|Functional Registration]]: separates timing variation from the amplitude prediction target.
- [[concepts/conformal-prediction|Conformal Prediction]]: converts exchangeable residual scores into prediction sets.
- [[concepts/warping-processes|Warping Processes]]: describes the monotone domain transformations predicted by SFCPP.

## Related Papers

- Diquigiovanni, Fontana, and Vantini (2022), “Conformal Prediction Bands for Multivariate Functional Data”: cited functional conformal approach that does not incorporate registration.
- Matuk et al. (2022), “Bayesian Framework for Simultaneous Registration and Estimation of Noisy, Sparse, and Fragmented Functional Data”: cited Bayesian alternative for joint alignment and estimation.
- Srivastava et al. (2011), “Registration of Functional Data Using Fisher-Rao Metric”: supplies the elastic registration framework.

Source: [Published article](https://doi.org/10.1080/10618600.2026.2634823).
