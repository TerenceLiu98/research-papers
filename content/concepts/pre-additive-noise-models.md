---
title: Pre-Additive Noise Models
type: concept
aliases:
  - Pre-ANMs
  - Pre-Additive Noise Model
tags:
  - nonlinear-regression
  - distributional-regression
  - extrapolation
---

## Overview

A pre-additive noise model adds random variation to a covariate or latent index before applying a nonlinear response function. A general form is $Y=g(WX+\eta)+\beta^\top X$. This placement differs from standard post-additive regression, $Y=g(WX)+\eta$, and can make the conditional outcome distribution informative about the nonlinear function outside the observed covariate support.

## Key Ideas

- **Horizontal rather than vertical perturbation:** Pre-additive noise changes where the nonlinear function is evaluated. Post-additive noise changes the response after evaluation.
- **Boundary information:** Near a support boundary, pre-additive noise can push $WX+\eta$ beyond the observed range of $WX$. The distribution of observed responses can therefore contain information about $g$ outside that range.
- **Distributional fitting is essential:** A mean or quantile objective generally discards information about the latent noise distribution. The extrapolation results in [[papers/engression-extrapolation-through-the-lens-of-distributional-regression|Engression: Extrapolation through the Lens of Distributional Regression]] require fitting the full conditional law.
- **Noise can increase extrapolation reach:** Under bounded-noise theory, the identifiable continuation grows with the noise support. Under an unbounded noise support and monotone smooth response functions, population identification can become global.
- **Assumptions remain substantive:** Monotonicity, smoothness, independence, noise support, and correct specification determine whether the model is identifiable and extrapolable. Pre-additive noise is not a generic guarantee for arbitrary nonlinear data.
- **Neural parameterization:** A network can realize the structure by applying learned linear maps to covariates and random noise before nonlinear layers, with skip connections supplying additional covariate paths.

## Important Papers

- [[papers/engression-extrapolation-through-the-lens-of-distributional-regression|Engression: Extrapolation through the Lens of Distributional Regression]]: formalizes the extrapolation distinction between pre- and post-additive noise and implements pre-additive models with neural networks.
- Zhang and Hyvarinen (2009), "On the Identifiability of the Post-Nonlinear Causal Model": a related post-nonlinear construction discussed in the engression paper, but its noise is not generally added directly to the covariate index.

## Related Concepts

- [[concepts/distributional-extrapolation|Distributional Extrapolation]]: the identification goal enabled by the model's conditional-distribution structure.
- [[concepts/normalizing-flows|Normalizing Flows]]: transform base noise through invertible maps, whereas pre-additive noise models need not provide a tractable density or an invertible neural network.
