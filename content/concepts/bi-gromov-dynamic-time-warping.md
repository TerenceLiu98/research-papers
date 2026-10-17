---
title: Bi-Gromov Dynamic Time Warping
type: concept
aliases:
  - Bi-GDTW
tags:
  - optimal-transport
  - time-series
  - spatiotemporal-clustering
---

## Overview

Bi-Gromov Dynamic Time Warping (Bi-GDTW) compares locations represented by a temporal trajectory and a spatial point cloud. It multiplies temporal Gromov-DTW dissimilarity by an exponential function of the Gromov-Wasserstein discrepancy between the spatial geometries. Spatial disagreement therefore modulates the temporal comparison.

## Key Ideas

- **Temporal structure:** Gromov-DTW aligns within-trajectory distance matrices along monotone temporal paths. This preserves chronology while comparing relational patterns rather than directly comparing absolute measurement values.
- **Spatial structure:** GW compares the internal distance matrices of the measurement-site clouds. It measures differences in geometry rather than absolute separation between locations.
- **Multiplicative coupling:** $\operatorname{BiGDTW}(S_i,S_j)=\exp(\operatorname{GW}(\Psi_i,\Psi_j))\operatorname{GDTW}(\Phi_i,\Phi_j)$. The factor is at least one. Exactly zero temporal dissimilarity remains zero regardless of spatial geometry; this is a consequence of the definition, not an empirical guarantee of spatial discrimination.
- **Prototypes:** A K-means-like procedure alternates assignments with spatial GW and temporal GDTW barycenter computations. Distance matrices are the primary temporal representatives; multidimensional scaling can reconstruct approximate trajectories.
- **Scaling matters:** The originating paper proposes common rescaling of spatial distance matrices using their average discrepancy from a GW barycenter to stabilize exponential weights. The weighting function and normalization affect the relative influence of geometry.
- **Interpretation and scope:** Temporal paths and spatial couplings help explain assignments. The method is best treated as a dissimilarity-based clustering construction; a metric guarantee or global optimization guarantee is not established in the supplied paper. Its pseudocode does not explicitly specify how spatial weights enter the temporal barycenter matrix update.

## Important Papers

- [[papers/a-new-clustering-strategy-for-geo-referenced-time-series-based-on-optimal-transport|A New Clustering Strategy for Geo-Referenced Time Series Based on Optimal Transport]] (Pipiciello, Balzanella, and Borrata, 2026): introduces Bi-GDTW and tests temporal-only, spatial-only, and mixed simulations plus Italian regional temperatures. The combined method leads the latter two synthetic settings, but DTW K-means leads the temporal-only setting.
- Cohen et al. (2021), "Aligning Time Series on Incomparable Spaces": the cited temporal Gromov-DTW foundation, not the source of the spatial multiplicative extension.

## Related Concepts

- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: spatial geometry comparison and barycenters.
- [[concepts/dynamic-time-warping|Dynamic Time Warping]]: monotone temporal alignment constraints.
- [[concepts/optimal-transport|Optimal Transport]]: mass couplings for structural comparison.
- [[concepts/soft-dtw-barycenters|Soft-DTW Barycenters]]: related temporal averaging with a smoothed alignment objective rather than the Bi-GDTW product.
