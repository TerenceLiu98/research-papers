---
title: Dynamics-informed machine learning for recovering extensive missing systems dynamics
type: paper
authors:
  - Tao Wu
  - Xiangyun Gao
  - Ying Tang
  - Feng An
  - Xiaotian Sun
  - Kazuyuki Aihara
  - Haizhong An
  - Jürgen Kurths
year: 2026
doi: 10.1038/s41467-026-77922-1
source_job_id: 1eaee0e2-396f-470c-88d6-b596eef4b629
tags:
  - time-series-imputation
  - dynamical-systems
  - gaussian-processes
---

## TL;DR

Full-Partial Reconstruction Mapping (FPRM) imputes incomplete time series by regressing their observed values on delay coordinates of a complete variable. Dynamical embedding theory motivates the representation; Gaussian process regression learns the mapping. Experiments recover substantial missingness in synthetic and real systems, including 90% missing values across nearly all variables, but effectiveness depends on the reference variable and is not uniformly best across datasets.

## Research Question

Can one fully observed component provide sufficient dynamical information to recover many other components when each has very few observed values?

## Motivation

Direct regression on one complete series offers limited instantaneous information. Delay coordinates expose temporal state information without requiring known governing equations, providing richer predictors when most other channels are incomplete.

## Contributions

- A mapping framework between full and partial delay reconstructions, motivated by the correspondence between embeddings of the same underlying attractor.
- Experiments spanning ecological and chaotic models, traffic occupancy, EEG, exchange rates, and supplementary wind-speed data.
- Tests of reference-variable choice, noise, coupling strength, and structured missingness, plus a lagged variant for synchronous gaps.

## Method

For a complete reference series, construct $X_i(t)=[x_i(t),x_i(t+\tau),\ldots,x_i(t+(E-1)\tau)]$. For each incomplete target $x_j$, fit a separate [[concepts/gaussian-process-regression|Gaussian Process Regression]] model from $X_i(t)$ to observed contemporaneous target values. Query it at missing target timestamps. The implementation uses a squared-exponential kernel and posterior-mean predictions; the paper specifies its length scale from predictor standard deviations.

If two valid embeddings are related to the original attractor by maps $f$ and $g$, their correspondence is $g\circ f^{-1}$. This motivates FPRM but does not make the fitted GP itself a guaranteed diffeomorphism. Operationally, the learner predicts the first target coordinate rather than requiring complete target delay vectors. The forward-delay formulation covers $l-(E-1)\tau$ input rows and uses later reference observations, so its evaluation is retrospective imputation rather than causal forecasting. Embedding-parameter selection is referred to supplementary material.

## Experiments

The main protocol randomly removes 10–90% of target observations and compares imputations with retained ground truth using Pearson correlation and the paper's normalized RMSE. Figure distributions include 200 repeated experiments. Models include a three-species ecological system, ordinary Lorenz dynamics, and coupled 120-dimensional Lorenz and Rössler systems. Real data include 500 road-occupancy series, 64 EEG channels from one healthy participant, and 52 exchange-rate series.

Table 1 fixes the first variable as complete and removes 90% of entries from all others. The following are reported mean scores, omitting the table's standard deviations:

| Dataset | FPRM correlation | FPRM normalized RMSE | MetaTSI correlation | MetaTSI normalized RMSE |
| --- | ---: | ---: | ---: | ---: |
| 120D Lorenz | 0.89 | 0.41 | 0.72 | 0.68 |
| 120D Rössler | 0.90 | 0.31 | 0.87 | 0.49 |
| Road occupancy | 0.83 | 0.49 | 0.75 | 0.66 |
| EEG | 0.95 | 0.27 | 0.12 | 1.01 |
| Exchange rates | 0.82 | 0.41 | 0.86 | 0.31 |

FPRM leads the reported comparisons on the first four datasets; MetaTSI is better on exchange rates. Other baselines include mean filling, k-NN, direct GPR, SVM, random forests, a two-layer neural network, MVCM, and S-map. Replacing GPR within FPRM with SVM or a neural network generally improves over their direct-regression counterparts, supporting the value of delay-coordinate inputs. Figure-specific results use different reference settings and should not be substituted for Table 1.

The paper also reports tests of contiguous, lower-quantile-induced, and periodic missingness. These are mainly documented in supplementary figures; their numerical results are not available in the supplied main text.

## Limitations

- Standard FPRM needs a complete reference channel and a dedicated model per target. Some reference variables recover only subsets of other channels.
- Embedding theory requires suitable dynamical and observational conditions; finite noisy observations and a flexible regressor do not guarantee recovery of arbitrary missing values.
- Abrupt transitions and threshold-induced gaps containing many abrupt points remain difficult. A segment-wise lagged variant addresses some synchronous gaps, but long synchronous outages can accumulate prediction error.
- The primary evidence uses artificially removed observations. Supplementary structured-missingness claims do not establish unrestricted performance under real missing-data mechanisms.
- The parsed metric formula and some dataset descriptions contain corruption or inconsistencies. Scores above retain the paper's normalized-RMSE label without reconstructing an uncertain normalization formula. Supplementary files and code were not part of this input.

## Related Concepts

- [[concepts/gaussian-process-regression|Gaussian Process Regression]] supplies the nonlinear mapping from delay vectors to target values.
- [[concepts/dynamical-systems-reconstruction|Dynamical Systems Reconstruction]] shares the concern with recovering dynamical structure; FPRM imputes observed trajectories rather than learning an autonomous generative simulator.

## Related Papers

- Takens (1981), “Detecting strange attractors in turbulence”: embedding-theory foundation cited by the paper.
- Carpenter et al. (2025), “Repairing gaps in ecological time series”: the MVCM comparison based on multiple attractor views.
- [[papers/time-series-continuous-modeling-for-imputation-and-forecasting-with-implicit-neural-representations|Time Series Continuous Modeling for Imputation and Forecasting with Implicit Neural Representations]]: a library comparison using continuous coordinate networks and per-series adaptation rather than a complete reference channel; not evaluated in this paper.

The paper identifies MATLAB R2024b code and generated data at [Figshare](https://doi.org/10.6084/m9.figshare.30446765).
