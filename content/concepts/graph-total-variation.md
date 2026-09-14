---
title: Graph Total Variation
type: concept
aliases:
  - Graph TV
tags:
  - graph-regularization
  - loss-functions
  - time-series-forecasting
---

## Overview

Graph total variation measures differences in a signal across connected nodes. An absolute edge penalty encourages agreement along the chosen graph while responding linearly to large differences. Applied to prediction residuals, it regularizes relationships between errors without requiring the underlying target signals themselves to be equal.

## Key Ideas

For vector-valued node signals $e_v\in\mathbb R^L$ and undirected edges $\mathcal E$, the normalized penalty is

$$
\operatorname{TV}_{\mathcal E}(e)
=\frac{1}{|\mathcal E|L}\sum_{(i,j)\in\mathcal E}\|e_i-e_j\|_1.
$$

With incidence matrix $A$ and node-stacked vector $r$, the numerator is $\|(A\otimes I_L)r\|_1$. Edge orientation does not affect the value because the norm removes the sign of each difference.

- **The regularized signal matters:** In CvLoss, $e_v=\hat z_v-z_v$ is a forecast-patch residual. Matching predicted and observed pairwise differences is equivalent to reducing differences between residuals. This is not an explicit correlation-matrix loss.
- **Topology specifies the coupling:** Variable-patch nodes can connect different variables synchronously or across patch indices. A complete cross-variable graph includes both, while restricted graphs impose selective couplings.
- **Absolute supervision is still needed:** Any constant signal on a connected component has zero graph total variation. Residual TV alone therefore cannot distinguish a correct forecast from one with a shared additive error. A positive point-wise loss supplies an absolute anchor.
- **Absolute and squared penalties differ:** Replacing the absolute norm with a squared norm yields $r^\top\tilde A^\top\tilde A r$, where $\tilde A=A\otimes I_L$. Combined with squared point-wise error, this corresponds to a Gaussian precision proportional to $I+\lambda\tilde A^\top\tilde A$. The absolute version instead gives non-Gaussian edge potentials. Their shared topology does not make their likelihoods equivalent.
- **Dense support is not unrestricted dependence:** Uniform graph penalties encourage similar residuals along every edge. A complete graph removes absent-edge constraints within its allowed pairs but still imposes a particular penalty form and weighting.
- **Computational cost depends on edges and signal dimension:** Forecast graphs can have $O(P^2D^2)$ edges for $P$ patches and $D$ variables, with length-$L$ differences per edge. Edge sampling reduces the evaluated set; selecting edges from measured discrepancies also incurs the cost of obtaining those discrepancies.

## Important Papers

- [[papers/multivariate-time-series-forecasting-needs-cross-variable-loss|Multivariate Time Series Forecasting needs Cross Variable Loss]]: applies absolute graph total variation to forecast residuals and compares it with a squared variant. The reported advantage of the absolute norm is empirical, not a consequence of its Gaussian analysis.

## Related Concepts

- Graph incidence matrices and graph Laplacians.
- Cross-variable residual consistency.
- Gaussian Markov random fields and pairwise Gibbs fields.
- [[concepts/geometry-aware-regularization|Geometry-Aware Regularization]]: a related approach to shaping penalties through structure, with the existing page treating metric-weighted decoder perturbations rather than residual graph differences.
