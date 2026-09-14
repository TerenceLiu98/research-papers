---
title: Information-Flow Causality
type: concept
aliases:
  - Liang-Kleeman Information Flow
  - Information Flow-Based Causality
tags:
  - causality
  - information-flow
  - time-series
---

## Overview

Information-flow causality defines a directed influence through the contribution of one dynamical component to another component's marginal entropy change. The flow $T_{j\to i}$ has units of nats per unit time, and the Liang framework defines causality by its being nonzero. Its sign describes an entropy contribution; its absolute magnitude measures influence within that definition.

## Key Ideas

- **Nil causality:** If the target's drift and diffusion variance do not depend on a source component, that source contributes zero information flow to the target. This is a property of the dynamical theory, not a guarantee that finite-sample estimates are exactly zero.
- **Linear simplification:** For a linear drift matrix $A$ and constant additive noise, $T_{j\to i}=a_{ij}\sigma_{ij}/\sigma_{ii}$. Correlation alone is insufficient for nonzero flow. Conversely, zero covariance gives zero flow in this formula even if a drift coupling coefficient is nonzero, so the flow definition should not be conflated with every structural notion of causality.
- **Multivariate estimation:** Fit each target's finite-difference derivative using all observed variables, then multiply each fitted source coefficient by the source-target covariance divided by target variance. This incorporates the observed system rather than fitting isolated pairs. The supplied estimator assumes stationary, equally spaced series and a linear model with diagonal additive noise.
- **Entropy accounting:** Target entropy change separates into self dynamics, incoming flows, and a noise term. In the linear model these are $a_{ii}$, $\sum_{j\ne i}T_{j\to i}$, and $g_{ii}/(2\sigma_{ii})$, respectively.
- **Normalization:** Divide a flow by the sum of the absolute values of those contributions. The resulting signed share lies in $[-1,1]$ when the denominator is positive. The absolute values prevent cancellation; this share is not an explained-variance fraction.
- **Inference and scope:** Estimated flows require significance testing. Successful recovery with an observed common driver does not establish robustness to hidden confounders, and nonlinear systems can yield approximation errors under the linear estimator. Nonsingular covariance is required, making exact synchronization a distinct issue from near synchronization.

## Important Papers

- [[papers/normalized-multivariate-time-series-causality-analysis-and-causal-graph-reconstruction|Normalized Multivariate Time Series Causality Analysis and Causal Graph Reconstruction]]: multivariate estimation, self and noise contributions, normalization, and synthetic graph-reconstruction examples.
- Liang and Kleeman (2005), "Information transfer between dynamical system components."
- Liang (2014), "Unraveling the cause-effect relation between time series."
- Liang (2015), "Normalizing the causality between time series."
- Liang (2016), "Information flow and causality as rigorous notions ab initio."

## Related Concepts

- [[concepts/independent-causal-mechanisms|Independent Causal Mechanisms]]: a complementary causal-modeling principle concerned with autonomous mechanisms; information-flow causality instead defines influence through entropy dynamics.
- Causal graph reconstruction
- Marginal entropy
- Vector autoregressive processes
- Observed common drivers and synchronization
