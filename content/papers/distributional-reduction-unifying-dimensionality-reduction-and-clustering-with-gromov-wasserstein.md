---
title: "Distributional Reduction: Unifying Dimensionality Reduction and Clustering with Gromov-Wasserstein"
type: paper
authors:
  - Hugues Van Assel
  - Cédric Vincent-Cuaz
  - Nicolas Courty
  - Rémi Flamary
  - Pascal Frossard
  - Titouan Vayer
year: null
openreview: cllm6SS354
tags:
  - dimensionality-reduction
  - clustering
  - gromov-wasserstein
  - optimal-transport
---

## TL;DR

The paper formulates dimensionality reduction and clustering as instances of a common [[concepts/distributional-reduction|Distributional Reduction]] problem. DistR learns a smaller weighted set of low-dimensional prototypes by matching input and prototype similarity structures through a semi-relaxed [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein]] coupling.

## Research Question

Can dimensionality reduction and clustering be expressed in one optimization framework that preserves the input's pairwise structure while jointly reducing feature dimension and the number of represented samples?

## Motivation

Dimensionality reduction preserves all samples in a lower-dimensional coordinate system, whereas clustering replaces many samples with a smaller set of representatives. Both can be viewed as simplifying a similarity graph, but conventional pipelines apply them sequentially and can lose structure at either stage. A distributional formulation makes it possible to learn prototype positions, prototype masses, and sample-to-prototype assignments together.

## Contributions

- Shows that, under conditions on the loss and output-similarity map, familiar spectral and neighbor-embedding objectives can be written as Gromov-Wasserstein projection problems.
- Introduces DistR, which replaces the balanced coupling used for ordinary dimensionality reduction with a semi-relaxed coupling to learn fewer weighted prototypes.
- Connects the unconstrained semi-relaxed GW barycenter problem to hard clustering: with quadratic loss and conditionally positive- or negative-definite input similarities, an optimal coupling can be a membership matrix.
- Instantiates the framework with PCA-like, t-SNE-like, UMAP-like, and hyperbolic similarities and evaluates the resulting joint reduction on image and single-cell genomic datasets.

## Method

Given input samples $X$, DistR constructs a pairwise similarity matrix $C_X(X)$. It represents the reduced distribution by prototype locations $Z\in\mathbb{R}^{n\times d}$, induced similarities $C_Z(Z)$, and prototype weights. A transport matrix $T$ assigns input mass to prototypes while the objective penalizes disagreement between pairs of input similarities and pairs of prototype similarities.

When $n=N$ and both marginals are uniform, the formulation recovers a GW projection view of dimensionality reduction. Allowing $n<N$ and constraining only the input marginal gives the semi-relaxed problem: the second marginal $T^\top\mathbf{1}$ becomes the learned prototype-weight vector. The support size $n$ controls granularity and the embedding dimension $d$ controls geometric complexity.

The implementation alternates between optimizing the coupling and the prototype coordinates. The paper describes conditional-gradient and mirror-descent solvers for the coupling, gradient optimization for $Z$, and low-rank computations for common similarity matrices.

## Experiments

The evaluation uses three image datasets (COIL-20, MNIST, and Fashion-MNIST) and five genomic datasets (PBMC, two SNA datasets, and two ZEISEL datasets). DistR is compared with dimensionality reduction followed by spectral clustering, clustering followed by dimensionality reduction, and, in an appendix, COOT clustering.

Prototype quality is measured by homogeneity, a weighted silhouette score based on prototype labels, and normalized mutual information after k-means clustering of the prototypes. Across the paper's normalized trade-off plots, DistR is reported as the most consistently competitive method for jointly preserving prototype homogeneity and low-dimensional global organization. The appendix's selected homogeneity results show strong dataset dependence: sequential methods can match or exceed DistR on individual settings, while COOT is consistently much lower in the reported comparisons.

Additional studies vary the prototype count, embedding dimension, clustering initialization, and similarity model. Hyperbolic experiments support the method's ability to operate outside Euclidean space, but their silhouette scores remain below the corresponding Euclidean neighbor-embedding settings.

## Limitations

- The main comparisons use labeled benchmark data and select models through trade-offs among label-dependent metrics, so they do not establish unsupervised model-selection rules for unlabeled applications.
- The reported gains summarize normalized trade-offs across heterogeneous datasets; individual datasets and metrics sometimes favor a sequential baseline.
- Optimization is non-convex and depends on initialization and validated hyperparameters, including the number of prototypes and neighbor-embedding settings.
- The main experiments cover eight image and genomic datasets. Claims about broader domains, very large datasets, multi-view extensions, and hierarchical resolution remain prospective.
- The hyperbolic study fixes curvature and reports weaker silhouette structure than the Euclidean variants, indicating that geometry-specific tuning remains unresolved.
- The supplied manuscript identifies an OpenReview record but does not state a publication year, venue, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/distributional-reduction|Distributional Reduction]]
- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]
- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/multidimensional-scaling|Multidimensional Scaling]]
- [[concepts/k-means-clustering|K-Means Clustering]]

## Related Papers

- Van Assel et al. (2023), "SNEkhorn: Dimension Reduction with Symmetric Entropic Affinities": supplies the symmetric entropic affinity used in the principal neighbor-embedding experiments.
- Vincent-Cuaz et al. (2022), "Semi-Relaxed Gromov-Wasserstein Divergence and Applications on Graphs": provides the semi-relaxed GW formulation and coupling solvers extended by DistR.
- Chen et al. (2023), "A Gromov-Wasserstein Geometric View of Spectrum-Preserving Graph Coarsening": develops the link between GW graph reduction and kernel clustering.
- Clark, Needham, and Weighill (2024), "Generalized Dimension Reduction Using Semi-Relaxed Gromov-Wasserstein Distance": independently studies semi-relaxed GW for multidimensional scaling.
- Murray and Pickarski (2024), "On Probabilistic Embeddings in Optimal Dimension Reduction": independently develops a related probabilistic embedding perspective.

[[index|Library home]]
