---
title: Unbalanced Optimal Transport
type: concept
aliases:
  - UOT
tags:
  - optimal-transport
  - distribution-comparison
  - barycenters
---

## Overview

Unbalanced optimal transport compares nonnegative measures whose total masses may differ. It relaxes exact marginal constraints by penalizing discrepancies between the transport plan's marginals and the input measures. This allows spatial displacement and amplitude variation to be modeled together without first normalizing all observations to probability distributions.

## Key Ideas

For measures $x,y$ on a common finite support, one entropy-regularized formulation is

$$
U(x,y)=\min_{P\geq0}\varepsilon\operatorname{KL}(P\Vert K)
+\gamma\operatorname{KL}(P\mathbf1\Vert x)
+\gamma\operatorname{KL}(P^\top\mathbf1\Vert y),
\qquad K=\exp(-C/\varepsilon).
$$

- **Ground geometry and mass relaxation.** $C$ encodes spatial cost, $\gamma$ controls marginal penalties, and $\varepsilon$ controls entropic smoothing. Relaxing mass constraints accommodates amplitude differences; it does not make amplitude irrelevant.
- **Generalized scaling.** With $\omega=\gamma/(\gamma+\varepsilon)$, dual scaling updates are $a=(x/(Kb))^\omega$ and $b=(y/(K^\top a))^\omega$. Exact marginal conservation is the balanced limiting constraint when feasible.
- **Debiasing depends on convention.** For the fixed-reference formulation above, subtracting half of each self-cost defines $\widetilde U(x,y)=U(x,y)-U(x,x)/2-U(y,y)/2$. The STA paper establishes nonnegativity with a positive-semidefinite kernel. A product-measure entropy reference requires an additional mass correction; formulas should not be transferred between these conventions unchanged.
- **Spatial barycenters.** A weighted mean minimizes $\sum_iw_i\widetilde U(x_i,z)$. The STA paper adds a symmetric self-potential to generalized Sinkhorn updates and shows that stationary points are global minima under its assumptions. This does not establish convexity or convergence of those updates.
- **Temporal composition.** Using the debiased cost between frames inside Soft-DTW combines spatial geometry, mass variation, and chronological alignment. Averaging frames independently cannot account for temporal displacement.

## Important Papers

- [[papers/averaging-spatio-temporal-signals-using-optimal-transport-and-soft-alignments|Averaging Spatio-temporal Signals using Optimal Transport and Soft Alignments]]: debiased unbalanced barycenters and their use in spatio-temporal averaging.
- Chizat et al. (2017), "Scaling Algorithms for Unbalanced Transport Problems": generalized scaling reference cited in the STA paper.
- Sejourne et al. (2019), "Sinkhorn divergences for unbalanced optimal transport": cited for the product-reference formulation and mass correction.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]: the mass-conserving transport framework.
- [[concepts/sinkhorn-divergence|Sinkhorn Divergence]]: self-cost subtraction for entropy-regularized transport.
- [[concepts/soft-dtw-barycenters|Soft-DTW Barycenters]]: temporally aligned averaging with a selectable spatial loss.
- [[concepts/wasserstein-barycenters|Wasserstein Barycenters]]: transport means of probability measures.
