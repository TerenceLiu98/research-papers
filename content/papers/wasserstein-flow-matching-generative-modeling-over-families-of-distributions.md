---
title: "Wasserstein Flow Matching: Generative Modeling Over Families of Distributions"
type: paper
authors:
  - Doron Haviv
  - Aram-Alexandre Pooladian
  - Dana Pe'er
  - Brandon Amos
year: null
tags:
  - flow-matching
  - optimal-transport
  - generative-models
  - point-clouds
  - spatial-transcriptomics
---

## TL;DR

Wasserstein Flow Matching (WFM) treats each generated object as a probability distribution and learns a flow between families of such distributions. It uses exact Wasserstein geodesics for Gaussian objects and entropic optimal-transport estimates for point-cloud objects. The method generates fixed- or variable-size shapes and high-dimensional cellular microenvironments, while its practical general-distribution implementation remains an approximation to the paper's classical-OT theory and has quadratic cost in point-cloud size.

## Research Question

Can [[concepts/flow-matching|Flow Matching]] be lifted from Euclidean samples to distributions over probability distributions while respecting Wasserstein geometry and remaining practical for Gaussian and point-cloud representations?

## Motivation

Some datasets contain distribution-valued observations rather than ordinary vectors. A 3D object can be represented by a point-cloud distribution, and a cellular niche can be represented by the distribution of neighboring cells' gene-expression profiles. Flattening these objects or applying an ordinary Euclidean flow ignores their internal geometry. The paper seeks one generative framework for analytically represented Gaussian distributions and empirically observed, potentially variable-size point clouds.

## Contributions

- Formulates [[concepts/wasserstein-flow-matching|Wasserstein Flow Matching]] as Riemannian flow matching on Wasserstein space, using McCann interpolations and optimal-transport velocity fields as conditional training paths.
- Shows, under stated regularity assumptions, that these conditional vector fields generate valid conditional probability paths whose endpoint is the target distribution.
- Develops a Gaussian specialization on [[concepts/bures-wasserstein-geometry|Bures-Wasserstein Geometry]] with closed-form paths, tangent velocities, and geometry-preserving covariance updates.
- Approximates paths for general distributions with entropic transport maps between point clouds and parameterizes the learned equivariant field with a transformer.
- Demonstrates generation of Gaussian families, 2D and 3D shapes, variable-size image-derived point clouds, and high-dimensional cellular microenvironments.

## Method

Let $\mathfrak p_0$ and $\mathfrak p_1$ be source and target distributions whose samples are themselves probability measures. For independently sampled measures $\mu\sim\mathfrak p_0$ and $\nu\sim\mathfrak p_1$, WFM follows their Wasserstein geodesic

$$
\mu_t=((1-t)\operatorname{id}+tT_*^{\mu\to\nu})_\#\mu
$$

and regresses a learned field against the corresponding optimal velocity. The paper derives this objective from conditional flow matching and argues that the Wasserstein distance supplies the pre-metric construction needed for valid conditional paths. It explicitly distinguishes these inner transports from learning the outer optimal-transport map between $\mathfrak p_0$ and $\mathfrak p_1$.

For Gaussian measures, the optimal map is affine, so the mean, covariance path, tangent norm, and velocity are available in closed form. BW-FM uses separate multilayer networks for mean and covariance velocities and advances covariances with a Riemannian update that preserves positive semidefiniteness.

For general measures, observed point clouds replace continuous distributions. Entropic [[concepts/optimal-transport|Optimal Transport]] estimates the map used to construct interpolated particles and regression targets. Equal-size point clouds use a greedily rounded transport matching; unequal-size point clouds use an out-of-sample entropic map. A permutation-equivariant transformer predicts particle velocities, and Euler integration generates a new point cloud.

## Experiments

### Gaussian Families

BW-FM is compared with Euclidean covariance regression and Frobenius-norm flow matching on synthetic spirals, two moons, a sphere, U.S. cities, ECG data, seqFISH niches, and scRNA-seq MetaCells. Riemannian BW-FM has the lowest reported average minimum squared Wasserstein distance on every dataset in Table 2. For example, its values are $1.88\times10^{-4}$ on cities, versus $7.26\times10^{-3}$ for Euclidean BW-FM and $1.75\times10^{-3}$ for Frobenius FM; on 32-dimensional scRNA-seq they are 1.31, 2.74, and 3.21, respectively.

Conditional Gaussian experiments generate organ-specific seqFISH niches and immune-cell states. The supplementary scRNA-seq experiment reports 93.13% label accuracy for generated MetaCells.

### Point-Cloud Distributions

On ShapeNet airplanes, chairs, and cars, WFM is competitive with existing fixed-size 3D generators. Its 1-nearest-neighbor Chamfer accuracies are 69.88, 57.62, and 53.41; Earth Mover's Distance accuracies are 64.44, 57.93, and 58.10. These results do not dominate every baseline and should be read as competitiveness in the standard setting rather than universal superiority.

WFM also handles settings excluded by the cited voxel-based comparators. On variable-size MNIST digit 4 and EMNIST letter A point clouds, its reported Chamfer/EMD 1-NN accuracies are 63.34/59.97 and 62.12/58.68. On high-dimensional MERFISH and XENIUM niches they are 52.80/54.52 and 60.69/64.20. In a conditional ModelNet experiment, generated shapes obtain 77.66% class accuracy compared with 79.98% for real test samples. For Sst-neuron niches, conditional generated-label accuracy is 63.86%, close to the reported 62.19% test-data accuracy.

## Limitations

- The general Wasserstein-space calculations are formal rather than fully rigorous; the paper notes that the Gaussian submanifold is the clean finite-dimensional case.
- Theory uses classical optimal maps, while implementation uses entropy-regularized estimates, rounded matchings, and finite point clouds. The paper provides estimation bounds but retains a theory-to-implementation gap.
- Entropic OT and self-attention are both quadratic in point-cloud size. ShapeNet training is reported to take about three days on one A100 GPU; other experiments take roughly three to four hours.
- Statistical estimation of transport maps suffers from the curse of dimensionality even though the neural architecture can accept high-dimensional particles.
- Comparative experiments for variable-size and high-dimensional distributions contain no applicable prior-method baselines in Table 4, so those results establish feasibility more directly than comparative superiority.
- Biological outputs are generative approximations of cellular niches and should not by themselves support biological conclusions.
- The supplied Markdown does not provide a publication year, venue, DOI, arXiv identifier, or usable code URL, so those metadata are not inferred here.

## Related Concepts

- [[concepts/wasserstein-flow-matching|Wasserstein Flow Matching]]: learns generative flows whose individual states are probability measures.
- [[concepts/bures-wasserstein-geometry|Bures-Wasserstein Geometry]]: supplies closed-form paths and tangent updates for Gaussian measures.
- [[concepts/flow-matching|Flow Matching]]: provides the conditional velocity-regression framework.
- [[concepts/optimal-transport|Optimal Transport]]: defines the Wasserstein metric, transport maps, and displacement interpolations used as training paths.

## Related Papers

- Lipman et al. (2022), "Flow Matching for Generative Modeling": supplies the conditional flow-matching construction.
- Chen and Lipman (2023), "Riemannian Flow Matching on General Geometries": provides the manifold formulation and pre-metric recipe specialized by WFM.
- Cuturi (2013), "Sinkhorn Distances: Lightspeed Computation of Optimal Transport": supplies the entropic transport computation used for point clouds.
- Pooladian and Niles-Weed (2021), "Entropic Estimation of Optimal Transport Maps": supplies the out-of-sample transport-map estimator and statistical analysis used by the method.
- Atanackovic et al. (2024), "Meta Flow Matching: Integrating Vector Fields on the Wasserstein Manifold": studies a related paired-distribution setting; WFM instead takes separate, uncoupled families of distributions.
- [[papers/flow-matching-on-lie-groups|Flow Matching on Lie Groups]]: another extension of flow matching to a non-Euclidean state space.

[[index|Library home]]
