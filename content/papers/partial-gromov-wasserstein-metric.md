---
title: Partial Gromov-Wasserstein Metric
type: paper
authors:
  - Yikun Bai
  - Rocio Diaz Martin
  - Abihith Kothapalli
  - Hengrong Du
  - Xinran Liu
  - Soheil Kolouri
year: null
source_job_id: "efaade14-86ee-48fc-b0ca-1f9a0199a151"
tags:
  - gromov-wasserstein
  - optimal-transport
  - partial-matching
  - metric-measure-geometry
  - shape-analysis
---

[[index|Library home]]

## TL;DR

The paper defines [[concepts/partial-gromov-wasserstein-metric|Partial Gromov-Wasserstein]] (PGW), a total-variation-penalized extension of [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]] to finite metric-measure spaces with unequal mass. It proves existence and metric properties, gives two equivalent Frank-Wolfe implementations, introduces PGW barycenters, and reports robustness to outliers in shape matching and interpolation. In shape retrieval, PGW reaches 96.25% and 100% accuracy on two datasets while taking 35.92 and 79.27 seconds to compute their pairwise distances.

## Research Question

Can Gromov-Wasserstein comparison be extended from probability metric-measure spaces to arbitrary finite-mass metric-measure spaces while retaining a genuine metric, practical solvers, and robustness to unmatched or noisy mass?

## Motivation

Classical GW compares spaces through intrinsic pairwise geometry but requires probability measures and exact mass conservation. Existing unbalanced GW formulations relax those constraints, yet the paper argues that their metric status is unclear. Applications such as partial shape matching, graph matching, and cross-domain comparison need to ignore outliers or accommodate unequal mass without requiring a meaningful pointwise cost between the two ambient spaces.

## Contributions

- Defines PGW by combining pairwise geometric distortion with a total-variation penalty on the tensor-square marginals of a partial coupling.
- Proves that an optimizer exists and that the appropriate rooted PGW objective is a metric on compact finite metric-measure spaces modulo measure-preserving isometry.
- Shows that PGW approaches classical GW for probability metric-measure spaces as the mass-penalty parameter tends to infinity.
- Reformulates discrete PGW through an auxiliary point and presents two mathematically and computationally equivalent Frank-Wolfe implementations.
- Defines PGW barycenters and evaluates PGW on shape matching, shape retrieval, and shape interpolation under outliers or noise.

## Method

For metric-measure spaces with finite measures, PGW minimizes a pairwise distance-distortion loss plus a penalty for disagreement between each input's tensor-square measure and the corresponding tensor-square coupling marginal. The optimization can be restricted to partial couplings whose marginals are dominated by the inputs. For an absolute-power distortion loss, the paper proves existence of a minimizer and obtains a metric after taking the stated root and quotienting by the standard metric-measure equivalence.

For discrete inputs, the authors add an auxiliary point to each space, converting the partial-coupling problem into a balanced GW-like problem. One solver optimizes directly over partial couplings with partial optimal transport as the Frank-Wolfe linear subproblem; the other operates on the augmented balanced formulation. The two updates are shown to correspond under the augmentation map. The detailed convergence analysis bounds the minimum Frank-Wolfe gap after $K$ iterations by $O(1/\sqrt{K})$, or $O(1/\varepsilon^2)$ iterations for an $\varepsilon$-stationary point.

## Experiments

In 2D-to-3D and 2D-to-2D shape matching with added outliers, PGW visually preserves correspondences on the underlying shapes more effectively than balanced GW and the compared unbalanced or mass-constrained variants. The evidence is primarily qualitative in these matching experiments.

For SVM shape retrieval, Dataset I contains 160 shapes in eight related complete or partial classes. Dataset II contains six paired shape classes. PGW obtains 96.25% accuracy on Dataset I, compared with 98.13% for GW, 89.375% for UGW, and 23.75% for mass-constrained PGW. On Dataset II, PGW obtains 100%, compared with 80.83% for GW, 90% for UGW, and 25% for mass-constrained PGW. Pairwise-distance computation takes 35.92 seconds and 79.27 seconds for PGW, versus 49.02 and 137.12 seconds for GW and 1484.49 and 519.91 seconds for UGW.

PGW barycenters are also used to interpolate point-cloud shapes when the target contains 5% or 10% noise. The reported visualizations show less distortion in intermediate PGW shapes than in GW intermediates, particularly in their width-height ratios.

## Limitations

- The discrete objective is non-convex. The Frank-Wolfe analysis concerns convergence to a stationary point, not a global optimum.
- The contributions paragraph describes convergence as linear, but the detailed analysis states an $O(1/\sqrt{K})$ Frank-Wolfe gap rate. The latter is the precise bound reported in the paper.
- Shape-matching and barycenter conclusions are based mainly on visual examples; the retrieval study uses two modest shape datasets.
- Performance and behavior depend on penalty and initialization choices, with extensive experiment-specific parameter selection described in the appendices.
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier, so none is inferred here.

## Related Concepts

- [[concepts/partial-gromov-wasserstein-metric|Partial Gromov-Wasserstein Metric]]
- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]
- [[concepts/unbalanced-optimal-transport|Unbalanced Optimal Transport]]
- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/wasserstein-barycenters|Wasserstein Barycenters]]
- [[concepts/linear-partial-gromov-wasserstein-embedding|Linear Partial Gromov-Wasserstein Embedding]]

## Related Papers

- Chapel, Alaya, and Gasso (2020), "Partial Optimal Transport with Applications on Positive-Unlabeled Learning": supplies the mass-constrained partial GW baseline and a related Frank-Wolfe scheme.
- Sejourne, Vialard, and Peyre (2021), "The Unbalanced Gromov-Wasserstein Distance: Conic Formulation and Relaxation": provides the unbalanced GW framework from which the total-variation case is developed.
- Memoli (2011), "Gromov-Wasserstein Distances and the Metric Approach to Object Matching": establishes the balanced metric-measure comparison generalized by PGW.
- Peyre, Cuturi, and Solomon (2016), "Gromov-Wasserstein Averaging of Kernel and Distance Matrices": provides the GW solver and barycenter foundations extended in the paper.
- [[papers/linear-partial-gromov-wasserstein-embedding|Linear Partial Gromov-Wasserstein Embedding]]: linearizes the PGW construction around a reference space for repeated comparisons.
