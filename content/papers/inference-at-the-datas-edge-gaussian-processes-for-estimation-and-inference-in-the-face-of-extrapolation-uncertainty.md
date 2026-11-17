---
title: "Inference at the Data’s Edge: Gaussian Processes for Estimation and Inference in the Face of Extrapolation Uncertainty"
type: paper
authors:
  - Soonhong Cho
  - Doeun Kim
  - Chad Hazlett
year: 2026
doi: 10.1017/pan.2026.10032
tags:
  - gaussian-processes
  - causal-inference
  - uncertainty-quantification
---

## TL;DR

Gaussian processes retain uncertainty over functions that fit observed data similarly but diverge beyond its support. Cho, Kim, and Hazlett demonstrate this advantage in poor-overlap comparisons, interrupted time series, and regression discontinuity, with particularly favorable small-sample RD results. Kernel assumptions remain decisive for distant extrapolation.

## Research Question

How can counterfactual estimates reflect uncertainty arising from sparse support and boundary prediction, rather than conditioning inference on one selected fitted function?

## Motivation

Plausible in-sample fits may imply very different unobserved counterfactuals. Flexible prediction alone does not resolve this: the paper contrasts GP and kernel regularized least squares, whose conditional-mean function spaces coincide but whose uncertainty calculations differ.

## Contributions

- Explains GP posterior uncertainty as a way to retain divergent plausible extrapolations within an assumed function space.
- Provides automated fitting in the R package gpss by fixing kernel amplitude, selecting bandwidth from covariates, and tuning residual variance.
- Evaluates three causal estimation settings and makes the sensitivity of long-range extrapolation to kernel choice explicit.

## Method

After standardizing outcomes and covariates, the procedure sets the prior mean to zero and kernel amplitude to one. Gaussian-kernel bandwidth maximizes variation among off-diagonal kernel entries; residual variance is selected by marginal likelihood.

For training kernel matrix $K$, test–training matrix $K_*$, and test matrix $K_{**}$, the posterior conditional-mean estimate and covariance are

$$
 m_*=K_*(K+\sigma^2 I)^{-1}y,\qquad
 V_*=K_{**}-K_*(K+\sigma^2 I)^{-1}K_*^\top.
$$

Predicting individual outcomes adds observation noise $\sigma^2 I$ to this covariance. Closed-form Gaussian conditioning avoids Markov chain sampling. Uncertainty grows as test points lose covariance with observations, but a stationary kernel eventually reverts toward its prior mean and bounded variance. Additive periodic and polynomial kernels encode seasonal or continuing-growth assumptions for longer extrapolation.

For RD, separate GPs fit each side of the cutoff; their predictions at the cutoff are differenced, with variances added. Causally motivated bandwidths and trimming can restrict the observations that inform boundary inference. These modeling choices do not replace the identification assumptions of the underlying causal design.

## Experiments

- **Poor overlap (§3.1):** Across 500 simulations with sample size 500 and quadratic outcome functions, GP intervals adapt to local support. BART conditional-effect coverage falls below 50% on one side and 25% on the other; GP also undercovers at distant points, reaching roughly 75%. Linear-model ATE coverage is 55%, with RMSE 1.52 times GP's. This is evidence of improved uncertainty accounting, not complete protection against extrapolation error.
- **Interrupted time series (§3.2):** Handgun background checks following the Heller decision illustrate counterfactual forecasting. DC shows a substantial increase relative to the modeled counterfactual. Vermont conclusions depend on the kernel: adding quadratic rather than linear growth substantially expands the envelope and removes apparent evidence of an effect.
- **RD simulations (§3.3):** In the zero-effect random-outcome setting with 500 observations and 500 repetitions, GP coverage is 97–98%, versus 93–96% for rdrobust, at similar interval lengths and lower RMSE. Additional latent-confounding simulations examine bandwidth and trimming choices.
- **Election benchmarking (§3.3.3):** Full-data estimates are broadly similar. Across 500 subsamples of 200 observations, GP coverage is 96–99%, using full-sample estimates as reference targets; rdrobust RMSE is roughly twice GPrd's. These targets are empirical benchmarks, not known causal truth.
- **Failure cases (§3.3.5):** Sharp boundary deflections can favor rdrobust. In the Lee simulation, GP has lower RMSE when $R^2\leq0.55$ but higher RMSE at lower noise levels.

## Limitations

Posterior uncertainty is conditional on covariance and noise assumptions. Gaussian, constant-variance errors support the tuning procedure; heteroskedasticity checks are encouraging but incomplete. Stationary kernels can understate uncertainty for extreme extrapolation. Regularization can smooth away genuine sharp changes. Exact kernel computations become burdensome beyond a few thousand observations, and evaluations cover at most ten covariates rather than high-dimensional settings. ITS and poor-overlap causal claims still require substantive identification assumptions.

## Related Concepts

- [[concepts/gaussian-process-regression|Gaussian Process Regression]]: supplies the function posterior and covariance-based prediction mechanism.

## Related Papers

- [[papers/nowcasting-with-mixed-frequency-data-using-gaussian-processes|Nowcasting with Mixed Frequency Data Using Gaussian Processes]]: another application of GP regression, focused on mixed-frequency predictive inputs rather than counterfactual extrapolation.
- King and Zeng (2006), “The Dangers of Extreme Counterfactuals”: motivates attention to support and model dependence.
- Hainmueller and Hazlett (2014), “Kernel Regularized Least Squares”: the paper's comparison for similar function spaces with different uncertainty calculations.
- Branson et al. (2019), “A Nonparametric Bayesian Methodology for Regression Discontinuity Designs”: prior Bayesian GP work on RD.

Replication materials: https://doi.org/10.7910/DVN/7G092W.
