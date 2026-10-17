---
title: "A New Clustering Strategy for Geo-Referenced Time Series Based on Optimal Transport"
type: paper
authors:
  - Pasquale Pipiciello
  - Antonio Balzanella
  - Gianmarco Borrata
year: 2026
source_job_id: bc2a08a7-a2ec-45fd-926b-15656baff853
tags:
  - optimal-transport
  - time-series
  - spatiotemporal-clustering
---

[[index|Library home]]

## TL;DR

Bi-Gromov Dynamic Time Warping (Bi-GDTW) multiplies a temporal Gromov-DTW dissimilarity by an exponential weight derived from the Gromov-Wasserstein discrepancy between spatial geometries. A barycenter-based K-means procedure clusters locations using this combined criterion. Across 20-run simulations, it leads the spatial-only and mixed settings but trails DTW K-means when only temporal patterns distinguish clusters. An application to Italian regional temperatures selects four clusters and reports a silhouette score of 0.47.

## Research Question

How can locations be clustered using both their representative temporal trajectories and the internal geometry of their sensor or municipality coordinates, with interpretable cluster prototypes?

## Motivation

Temporal alignment alone discards spatial structure, while spatial clustering alone misses dynamic patterns. Regions can have similar time series but different internal arrangements of measurement sites. Comparing within-region distance matrices through optimal transport allows these geometries to differ in size and avoids requiring direct point correspondence.

## Contributions

- Defines [[concepts/bi-gromov-dynamic-time-warping|Bi-Gromov Dynamic Time Warping]] as a multiplicative combination of temporal GDTW and spatial GW dissimilarities (Equations 16-17).
- Develops a K-means-like allocation and barycenter procedure producing temporal representatives, spatial prototypes, temporal alignments, and spatial couplings (Algorithms 5-6).
- Evaluates complementary temporal and spatial information in three synthetic settings and illustrates regional temperature clustering with distance decompositions and internal validation.

## Method

**Data representation.** Each location has multiple sensor series, potentially multivariate, and a point cloud of sensor coordinates. A function reduces the sensor series to one representative trajectory per location; the temperature application uses a Euclidean mean. Thus the objects being clustered are locations or regions, not individual municipality series.

**Temporal comparison.** Gromov-DTW, attributed to Cohen et al. (2021), compares pairwise distances within trajectories while restricting correspondence to monotone DTW paths. For trajectories $x,y$ with internal distance matrices $D_x,D_y$, the objective is

$$
\operatorname{GDTW}(x,y)=\min_{A\in\mathcal A}
\sum_{i,j,k,l}(D_{x,ik}-D_{y,jl})^2 A_{ij}A_{kl}.
$$

The solver iteratively linearizes the objective and solves a DTW alignment subproblem. Temporal barycenters are represented as distance matrices, with alternating alignment and matrix updates. Multidimensional scaling supplies approximate trajectories for interpretation.

**Spatial modulation.** [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]] compares within-location spatial distance matrices under transport couplings. The implementation uses geodesic distances between coordinates. For location $S_i=(\Phi_i,\Psi_i)$,

$$
\operatorname{BiGDTW}(S_i,S_j)
=\exp\!\left(\operatorname{GW}(D_{\Psi_i},D_{\Psi_j})\right)
\operatorname{GDTW}(\Phi_i,\Phi_j).
$$

The spatial factor is at least one: spatial disagreement amplifies temporal dissimilarity. It compares internal spatial geometry rather than geographic proximity between regions. Section 3.3 optionally rescales all spatial distance matrices by a common factor, the inverse average distance to their GW barycenter, before computing weights. The authors describe this as numerical stabilization and report that their simulations also work without it.

**Clustering.** Equation 18 minimizes the sum of Bi-GDTW dissimilarities to cluster representatives. Alternating steps compute cluster spatial and temporal barycenters and reassign locations to the closest representative. Multiple random initializations mitigate sensitivity to local solutions. The elbow criterion and a Bi-GDTW silhouette variant select the number of clusters in the application.

## Experiments

### Synthetic Clustering

All three settings use length-50 univariate series, Gaussian noise with standard deviation 0.1, and 220-point spatial clouds per observation. Simulation 1 has 60 observations in three clusters distinguished by temporal amplitudes. Simulation 2 has 75 observations in three clusters distinguished by compact, coast-like, or island geometry, with shared temporal patterns plus noise. Simulation 3 has 75 observations in five clusters with partially shared temporal patterns and overlapping spatial clouds.

Table 4 reports adjusted Rand index, mean (standard deviation) over 20 runs:

| Method | Temporal-only signal | Spatial-only signal | Mixed signal |
| --- | --- | --- | --- |
| Bi-GDTW K-means | 0.885 (0.231) | 0.882 (0.110) | 0.871 (0.087) |
| DTW K-means | 0.974 (0.113) | 0.011 (0.014) | 0.484 (0.039) |
| DTW hierarchical | 0.665 (0.000) | -0.001 (0.000) | 0.398 (0.000) |
| GW K-means | -0.008 (0.017) | 0.649 (0.460) | 0.439 (0.054) |

The combined method improves recovery when spatial structure is informative. Adding noninformative geometry reduces its mean ARI and increases variability relative to DTW K-means in Simulation 1. Distributions of final objective values provide empirical convergence evidence, not a global-optimality guarantee.

### Italian Regional Temperatures

Section 4.2 describes 1,500 municipality temperature series from Open-Meteo for January 2023, each with 31 daily measurements, summarized into trajectories for 20 Italian regions. The elbow and silhouette diagnostics select $K=4$. The authors choose the run with the lowest objective across repeated initializations.

The overall reported silhouette is 0.47. Puglia forms a singleton assigned silhouette zero; Trentino-Alto Adige has a negative silhouette. Table 5 decomposes each assignment into temporal discrepancy, spatial discrepancy, weight, and combined cost. For Campania these are 0.074, 0.227, 1.254, and 0.093, respectively. The application demonstrates interpretable grouping but provides no external ground-truth partition or quantitative real-data comparison against competing methods.

## Limitations

- The fixed exponential weighting is a modeling choice; adaptive weighting and stronger clustering validation remain future work. GW calculations and repeated barycenter optimization can be expensive; proposed accelerations are not benchmarked here.
- Multiplication cannot separate locations whose temporal GDTW is exactly zero, regardless of spatial discrepancy. This follows from Equation 16; the spatial-only simulation includes temporal noise and therefore does not establish separation for exactly identical trajectories.
- Within-location averaging removes sensor-specific temporal variation. Distance-matrix representations also discard absolute positioning under isometries, so reconstructed barycenter trajectories should not automatically be interpreted as calibrated temperature levels.
- Algorithm 5 computes spatial weights but calls the Equation 13 barycenter update without explicitly showing how those weights enter it. The supplied text also alternates between squared and unsquared GDTW objectives. These details require clarification for faithful implementation.
- Section 3.5 divides within-cluster dissimilarity by cluster size including the zero self-distance, unlike the usual leave-self-out silhouette denominator. Section 4.2 separately assigns singleton silhouettes zero. The reported score should therefore be read with the paper's stated conventions.
- Table 5 gives Puglia a nonzero GW value of 0.031 despite prose claiming exact coincidence in both components. Its zero temporal GDTW is sufficient to explain its zero product dissimilarity.
- Evidence comprises small synthetic datasets and one month of regional temperature data. Initialization stability does not establish global convergence or generalization across seasons and domains.
- The supplied Markdown has damaged mathematical symbols and a malformed code-repository URL. No DOI, journal name, or stable paper identifier is supplied. The year follows the stated acceptance date, 16 March 2026.

## Related Concepts

- [[concepts/bi-gromov-dynamic-time-warping|Bi-Gromov Dynamic Time Warping]]: spatial modulation of temporal structural alignment.
- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: comparison of internal geometries without a shared coordinate system.
- [[concepts/dynamic-time-warping|Dynamic Time Warping]]: order-preserving temporal correspondence.
- [[concepts/optimal-transport|Optimal Transport]]: transport couplings underlying spatial comparison.
- [[concepts/wasserstein-barycenters|Wasserstein Barycenters]]: related distributional averaging; this paper instead uses GW and GDTW distance-matrix prototypes.

## Related Papers

- Cohen et al. (2021), "Aligning Time Series on Incomparable Spaces": cited source for GDTW, its alignment solver, and temporal barycenter computation.
- Memoli (2011), "Gromov-Wasserstein Distances and the Metric Approach to Object Matching": cited foundation for comparing metric-measure spaces.
- Peyre, Cuturi, and Solomon (2016), "Gromov-Wasserstein Averaging of Kernel and Distance Matrices": cited foundation for GW barycenters.
- [[papers/spatio-temporal-alignments-optimal-transport-through-space-and-time|Spatio-Temporal Alignments: Optimal transport through space and time]]: library comparison, not a citation in this paper; places spatial transport costs inside a Soft-DTW objective, whereas Bi-GDTW multiplies a trajectory-level GDTW cost by a spatial GW weight.
- [[papers/averaging-spatio-temporal-signals-using-optimal-transport-and-soft-alignments|Averaging Spatio-temporal Signals using Optimal Transport and Soft Alignments]]: library comparison on representative spatiotemporal signals under transport and alignment losses.
