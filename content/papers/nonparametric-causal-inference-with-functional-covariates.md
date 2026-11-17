---
title: Nonparametric Causal Inference with Functional Covariates
type: paper
authors:
  - Daisuke Kurisu
  - Taisuke Otsu
  - Mengshan Xu
year: 2026
doi: 10.1080/07350015.2025.2501563
journal: Journal of Business & Economic Statistics
tags:
  - causal-inference
  - functional-data
  - semiparametric-inference
---

## TL;DR

Kernel estimation of treatment propensities from function-valued covariates can support root-$n$ consistent, asymptotically efficient inverse probability weighting for an average treatment effect. The guarantee requires overlap, unconfoundedness, and restrictive smoothness and small-ball probability conditions. Simulations show that choosing a distance sensitive to treatment-relevant curve features is critical.

Published in volume 44(1), pages 53–66 (2026); first published online June 20, 2025.

## Research Question

Can nonparametric adjustment for functional confounders yield efficient inference for a scalar average treatment effect without specifying a parametric propensity model?

## Motivation

Discretizing curves into many covariates can introduce strong correlations and severe dimensionality costs. Functional kernel smoothing lets researchers define proximity through scientifically relevant properties of curves, such as derivatives or volatility, instead of treating all recorded coordinates equally.

## Contributions

- Constructs a leave-one-out kernel propensity estimator with functional and optional Euclidean covariates, followed by inverse probability weighting.
- Establishes uniform convergence for functional kernel-weighted sums and controls bias using higher-order kernels.
- Proves asymptotic normality and efficiency of the ATE estimator, consistency of its variance estimator, and bootstrap validity under the stated assumptions.
- Demonstrates sensitivity to propensity misspecification and distance selection, then illustrates monetary-policy effect estimation with historical interest-rate curves.

## Method

For binary treatment $D$, scalar outcome $Y$, functional covariate $X$, and optional vector $Z$, the target is $\theta=E[Y(1)-Y(0)]$. Identification assumes conditional independence of treatment and potential outcomes and propensities bounded away from zero and one.

With functional distance $d$, the leave-one-out weights are

$$
w_{ij}=K(d(X_j,X_i)/h)K_z((Z_j-Z_i)/h_z),\qquad
\hat p_i=\frac{\sum_{j\ne i}D_jw_{ij}}{\sum_{j\ne i}w_{ij}}.
$$

The estimator is

$$
\hat\theta=\frac1n\sum_i\left[\frac{D_iY_i}{\hat p_i}-\frac{(1-D_i)Y_i}{1-\hat p_i}\right].
$$

The main theory suppresses $Z$ for exposition. Small-ball probabilities $P(d(X,x)\le h)$ scale polynomially through $\varphi(h)=C h^\alpha$, while covering-number conditions control the complexity of the functional support. The stochastic uniform rate is $O_p(\sqrt{(\log n)^\eta/[n\varphi(h)]})$ and the bias is $O(h^\gamma)$. Theorem 1 additionally requires $nh^{2\gamma}\to0$ and $n\varphi(h)^2\to\infty$. The resulting asymptotic variance equals the semiparametric ATE efficiency bound. Theorems 2–3 supply variance estimation and bootstrap inference.

A seminorm determines which features are retained in conditioning. The regulator simulations use the absolute difference in discretized total variation, rather than the ordinary $L^2$ curve distance.

## Experiments

The simulations use 1,000 Monte Carlo replications.

- **Fourier-curve simulations:** When the logistic propensity model is correct, parametric IPW has slightly smaller MSE. Under misspecification, it retains roughly 0.1 bias for a true ATE of 0.5; the kernel estimator's bias declines and coverage remains approximately nominal.
- **Market-regulator simulations:** Curves come from Wiener processes or resampling 4,524 daily S&P 500 trajectories. At $n=5{,}000$ in the financial-curve experiment, the true ATE is 1.2. Total-variation kernel weighting gives mean 1.200, $n\cdot\mathrm{MSE}=5.471$, and coverage 1.00; $L^2$ weighting gives 1.689, 1210, and 0.00. The logit alternative gives 1.196, 186.4, and 0.96. Coverage above 0.95 indicates conservative intervals, not exact calibration.
- **Monetary policy:** Treatment is a target-rate decrease versus an increase or no change. Adjustment includes the previous month's effective-rate curve and five scalar covariates. Table 5 reports a six-month funds-rate effect of −0.100 points (95% CI [−0.168, −0.032]) and a 24-month unemployment effect of −0.064 points ([−0.108, −0.019]). The 24-month industrial-production estimate is positive, but its interval includes zero.

## Limitations

- Nonparametric propensity estimation does not remove unmeasured confounding or the need for [[concepts/causal-overlap|Causal Overlap]].
- The rate guarantees depend on polynomial small-ball behavior, entropy bounds, smoothness, kernel order, and bandwidth restrictions; they do not cover arbitrary functional distributions and distances.
- Metric selection depends on substantive knowledge. A data-driven selection procedure is left open, and unsuitable distances perform poorly in the simulations.
- The proved theory assumes independent observations. Weak dependence is discussed as an extension; the monetary-policy time-series application is not a separate proof of dependent-data inference.
- Doubly robust and regression-based estimators are discussed as future theoretical work, not established extensions.
- The supplied Markdown reports 242 observations for August 1989–July 2007, an apparent date/count inconsistency, and reverses the endpoints of one unemployment interval. These entries are not silently repaired here.

## Related Concepts

- [[concepts/functional-kernel-regression|Functional Kernel Regression]]: supplies the nonparametric propensity estimator and its geometry-dependent convergence rates.
- [[concepts/causal-overlap|Causal Overlap]]: required for stable inverse-propensity denominators.
- [[concepts/double-machine-learning|Double Machine Learning]]: a related nuisance-estimation framework; the paper discusses doubly robust product-rate conditions but proves its main results for kernel IPW.

## Related Papers

- Hirano, Imbens, and Ridder (2003), “Efficient Estimation of Average Treatment Effects Using the Estimated Propensity Score”: the finite-dimensional efficiency result motivating this functional extension.
- Ferraty et al. (2010), “Rate of Uniform Consistency of Nonparametric Estimates with Functional Variables”: the uniform-convergence foundation extended here.
- [[papers/stable-causal-estimation-with-optimal-transport|Stable Causal Estimation with Optimal Transport]]: addresses instability under limited overlap; the present paper instead retains bounded propensities and studies functional adjustment.
