---
title: Distributional Reduction
type: concept
aliases:
  - DistR
tags:
  - dimensionality-reduction
  - clustering
  - gromov-wasserstein
---

## Overview

Distributional reduction represents a dataset by a smaller weighted distribution of prototypes in a chosen embedding space. It unifies dimensionality reduction and clustering by optimizing prototype geometry and sample-to-prototype assignments through a semi-relaxed [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein]] objective.

## Key Ideas

- A dataset is treated as an empirical probability distribution whose internal geometry is encoded by a pairwise similarity matrix.
- The reduced representation has two independent complexity controls: embedding dimension determines the prototype space, while support size determines the number of prototypes.
- A coupling aligns input samples with prototypes. Fixing equal support sizes and balanced uniform marginals recovers a GW view of dimensionality reduction; allowing fewer target points and learning their marginal introduces clustering.
- The output similarity map can reproduce different reduction families, including inner-product spectral methods, neighbor embeddings, and non-Euclidean embeddings.
- For the unconstrained semi-relaxed GW barycenter with quadratic loss and conditionally positive- or negative-definite input similarities, an optimum can use a hard membership coupling. This provides a formal connection to kernel k-means and graph coarsening.
- Prototype weights are learned as the coupling's target marginal, so unused or nearly unused support points can reduce the effective number of clusters below the requested maximum.

## Important Papers

- [[papers/distributional-reduction-unifying-dimensionality-reduction-and-clustering-with-gromov-wasserstein|Distributional Reduction: Unifying Dimensionality Reduction and Clustering with Gromov-Wasserstein]]: introduces the framework, establishes its dimensionality-reduction and clustering connections, and evaluates DistR on image and genomic data.
- Vincent-Cuaz et al. (2022), "Semi-Relaxed Gromov-Wasserstein Divergence and Applications on Graphs": provides the semi-relaxed transport foundation.
- Chen et al. (2023), "A Gromov-Wasserstein Geometric View of Spectrum-Preserving Graph Coarsening": relates semi-relaxed GW barycenters to graph coarsening and kernel clustering.
- Clark, Needham, and Weighill (2024), "Generalized Dimension Reduction Using Semi-Relaxed Gromov-Wasserstein Distance": develops a related formulation for generalized multidimensional scaling.

## Related Concepts

- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: compares distributions through their internal pairwise relations.
- [[concepts/optimal-transport|Optimal Transport]]: supplies the coupling-based distributional view.
- [[concepts/multidimensional-scaling|Multidimensional Scaling]]: a classical structure-preserving reduction recovered in the spectral setting.
- [[concepts/k-means-clustering|K-Means Clustering]]: connected to semi-relaxed GW barycenters under quadratic similarity objectives.
- [[concepts/subspace-clustering|Subspace Clustering]]: also combines representation and grouping, but assumes clusters occupy subspaces rather than learning a shared prototype geometry through transport.
