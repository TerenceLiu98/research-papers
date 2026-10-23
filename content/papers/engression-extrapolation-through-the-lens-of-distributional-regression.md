---
title: "Engression: Extrapolation through the Lens of Distributional Regression"
type: paper
authors:
  - Xinwei Shen
  - Nicolai Meinshausen
year: null
source_job_id: "6fb23330-3083-42a7-82b7-9fe18be82cf1"
tags:
  - distributional-regression
  - nonlinear-extrapolation
  - generative-models
  - energy-score
---

## TL;DR

Engression is a neural generative regression method trained with the energy score to estimate an entire conditional outcome distribution. Its central extrapolation result is model-dependent: when the data follow a monotone [[concepts/pre-additive-noise-models|Pre-Additive Noise Model]], fitting the full conditional distribution can identify behavior beyond the observed covariate support, whereas mean or quantile regression and post-additive noise models do not obtain the same guarantee. Simulations and 590 real-data configurations report substantially more stable out-of-support predictions, but the theory relies on structural assumptions that are not guaranteed in applications.

## Research Question

Can estimating the full conditional distribution, together with a pre-additive placement of noise, make nonlinear regression extrapolation identifiable beyond the support of the training covariates?

## Motivation

Linear functions extend beyond observed covariate support in a prescribed way, but flexible nonlinear regressors generally do not. Tree ensembles tend to remain constant outside the support, while neural-network continuations can vary sharply across architectures or initializations. The paper reframes this problem through [[concepts/distributional-extrapolation|Distributional Extrapolation]]: variation in the conditional outcome distribution may reveal values of a nonlinear response function evaluated beyond the observed covariate range.

## Contributions

- Introduces engression, a sample-based conditional generative model optimized by an energy-score loss, for means, quantiles, prediction intervals, and conditional sampling.
- Separates pre-additive models, where noise perturbs a covariate before a nonlinear transformation, from standard post-additive models, where noise perturbs the response afterward.
- Defines functional, mean, and distributional extrapolation uncertainty and proves global or local extrapolability results for pre-additive models under monotonicity, smoothness, support, symmetry, and correct-specification conditions.
- Quantifies extrapolability gains over mean, median, and quantile regression under a uniformly Lipschitz function class.
- Gives finite-sample consistency results for quadratic and general pre-additive models, including behavior under a specific post-additive misspecification.
- Evaluates univariate and multivariate prediction and prediction intervals using simulations and six real datasets.

## Method

Engression represents the conditional outcome as a generative map $g(x,\varepsilon)$, with exogenous noise $\varepsilon$. Given two independent noise draws, its population energy loss is

$$
\mathbb E\left[\lVert Y-g(X,\varepsilon)\rVert-
\frac{1}{2}\lVert g(X,\varepsilon)-g(X,\varepsilon')\rVert\right].
$$

The first term rewards agreement with observed outcomes; the second prevents the fitted distribution from collapsing. A finite-sample version averages generated draws per observation and is optimized by gradient descent. Conditional means and quantiles are computed by sampling from the fitted model.

For extrapolation, the principal model class is

$$
Y=g(WX+\eta)+\beta^\top X,
$$

where noise enters before the nonlinear map. In the neural implementation, input and noise receive learned linear transformations, with skip connections supplying additional nonlinear and linear paths. The theoretical comparison uses post-additive models $Y=g(WX)+\eta$ and non-distributional $L_1$, $L_2$, and quantile objectives.

At the population level, an unbounded pre-additive noise distribution and a strictly monotone, twice-differentiable $g$ give global distributional extrapolability. With bounded symmetric noise on $[-\eta_{\max},\eta_{\max}]$ and a half-line training support ending at $x_{\max}$, the fitted nonlinear function is identified through $x_{\max}+\eta_{\max}$ under correct specification. Thus the guarantee's range grows with the pre-additive noise support.

## Experiments

Four simulation families use softplus, square, cubic, and piecewise-log functions with bounded training covariates and Gaussian pre-additive noise. Across 20 repetitions, engression has much less dispersion beyond the support than matched neural $L_1$ and $L_2$ regressors. Conditional-median uncertainty is nearly zero in the predicted local range, and increasing the simulated noise level expands the range over which predictions remain close to the truth.

The real-data study covers GCM climate simulations, Abrupt4x climate data, NHANES, single-cell perturbation data, U.S. births, and air quality. Pairwise analyses produce 59 univariate tasks and 590 train-test configurations by splitting predictors at five quantiles in both tail directions. Across 18 neural-network hyperparameter settings, three neural methods account for 31,860 fitted model configurations, each aggregated through ten-fold cross-validation. On the reported out-of-support $L_2$ comparison, cross-validated engression is more than 10% above the best method in 28% of configurations, compared with 44% for $L_1$ neural regression, 56% for $L_2$ neural regression, 61% for linear quantile regression, 54% for linear regression, and 83% for quantile regression forests.

Multivariate experiments on air-quality and NHANES outcomes report lower out-of-support test loss for engression than matched neural and linear regression in the displayed tasks. Prediction-interval experiments form nominal 95% intervals from fitted 2.5% and 97.5% conditional quantiles; the paper reports better test coverage for engression in its displayed datasets, without accounting for finite-sample estimation uncertainty.

## Limitations

- Extrapolation guarantees depend on pre-additive noise, correct model specification, monotonicity and smoothness of the nonlinear map, and assumptions about the training and noise supports. These conditions are not established for the real datasets.
- Most population theory is univariate. The method supports multivariate inputs and outcomes, but the paper identifies broader multivariate theory as future work.
- Local identification under bounded noise extends only by a range governed by the noise support; empirical simulations also eventually diverge beyond that range.
- The general finite-sample results establish consistency under a grid-design condition. The explicit rate analysis is restricted to a quadratic model, and its $n^{-1/3}$ parameter rate is nonparametric; whether engression more generally attains parametric rates remains open.
- Under the analyzed post-additive misspecification, engression approaches a linear fallback, but this result does not establish robustness to arbitrary misspecification.
- Prediction intervals omit parameter-estimation uncertainty and do not provide distribution-free coverage. The out-of-support data are not exchangeable with the training sample, so ordinary conformal guarantees do not directly apply.
- The supplied source gives no explicit publication year, venue, DOI, or paper arXiv identifier.

## Related Concepts

- [[concepts/distributional-extrapolation|Distributional Extrapolation]]
- [[concepts/pre-additive-noise-models|Pre-Additive Noise Models]]
- [[concepts/normalizing-flows|Normalizing Flows]]: another conditional generative approach, but one that requires invertibility for tractable density evaluation.
- [[concepts/conditional-prediction-coverage|Conditional Prediction Coverage]]: clarifies the distinction between fitted conditional intervals and distribution-free marginal coverage.

## Related Papers

The source contrasts engression with quantile regression (Koenker and Bassett, 1978; Koenker, 2005), quantile regression forests (Meinshausen, 2006), generative adversarial networks (Goodfellow et al., 2014), variational autoencoders (Kingma and Welling, 2014), normalizing flows (Papamakarios et al., 2021), and diffusion models (Sohl-Dickstein et al., 2015; Ho et al., 2020). Its energy-score objective follows Gneiting and Raftery (2007), and its discussion of post-nonlinear causal models draws on Zhang and Hyvarinen (2009).

Software repository stated in the source: `https://github.com/xwshen51/engression`.

[[index|Library home]]
