---
title: "Fast Unsupervised Ground Metric Learning with Tree-Wasserstein Distance"
type: paper
authors:
  - Kira M. Dusterwald
  - Samo Hromadka
  - Makoto Yamada
year: null
tags:
  - optimal-transport
  - tree-wasserstein-distance
  - ground-metric-learning
  - unsupervised-learning
  - single-cell-rna-sequencing
---

## TL;DR

This paper introduces Tree-WSV, an unsupervised ground-metric learning method that replaces the full pairwise Wasserstein computations in Wasserstein singular vectors with tree-Wasserstein distances. It learns nonnegative edge weights on trees whose leaves represent both samples and features, using nonnegative least squares over a basis of pairwise leaf paths. The resulting method is a low-rank approximation of WSV with much lower per-iteration complexity, and it gives useful cell-type clustering distances on single-cell RNA sequencing data.

## Research Question

Can tree-Wasserstein distance provide a computationally efficient approximation to unsupervised Wasserstein singular vectors while retaining useful learned ground metrics and clustering performance on large unlabelled datasets?

## Motivation

The distance used by an unsupervised clustering method depends on the ground metric between features. Euclidean heuristics and pretrained feature embeddings are not always available, especially for new biological datasets. Wasserstein singular vectors learn feature and sample ground metrics jointly from an unlabelled data matrix, but a power iteration requires many pairwise Wasserstein problems and becomes expensive at scale. Tree-Wasserstein distance offers a closed-form computation from weighted paths in a tree, creating a route to reduce this bottleneck.

## Contributions

- Defines Tree-WSV by embedding normalized samples and features as leaves in separate trees and learning their edge weights through alternating singular-vector updates.
- Shows that the tree fixed-point equations reduce to linear systems in the edge weights, solvable with nonnegative least squares.
- Establishes rank properties for the matrix of pairwise leaf paths and uses them to justify unique nonnegative weight solutions when the root has degree at least three.
- Provides a recursive basis-set algorithm that avoids materializing the full pairwise-path tensor for large datasets.
- Derives per-power-iteration complexity of $O(N^3 + mN + M^3 + nM)$, bounded by $O(n^3 + m^3 + mn)$ under the tree-size assumptions, versus the much larger standard WSV cost.
- Demonstrates faster and competitive or better clustering results on synthetic data and several single-cell RNA sequencing datasets.

## Method

Given a nonnegative data matrix $X$ with $n$ samples and $m$ features, the rows and columns are normalized into distributions. Tree-WSV builds a sample tree and a feature tree with the normalized rows and columns as leaves. Each tree has a binary path-parameter matrix $Z$ and a nonnegative edge-weight vector $w$. The distance between two leaves is the weighted sum of the edges on their unique path.

For two leaves, the path indicator is formed by the element-wise XOR of their root-to-leaf path vectors. For every pair of leaves, these indicators form a pairwise-path matrix $Y$. Because tree-Wasserstein distance has the closed form $||diag(w)Z(x-y)||_1$, the alternating WSV update becomes a linear system relating one tree's edge weights to tree-Wasserstein distances induced by the other tree's weights. The paper solves the systems with NNLS and repeats the updates until the edge-weight changes fall below $10^{-6}$.

The pairwise-path matrix has rank $N-1$ when every internal node has degree at least three, and rank $N-2$ when the only degree-two internal node is the root. The authors use this result to extract a full-rank basis either with sparse SVD for small datasets or with a recursive procedure for large datasets. They also use meta-iterations: the learned distance matrices from one run define the metric used to construct deeper trees for the next run.

## Experiments

The synthetic experiment uses translated unimodal periodic functions on a one-dimensional torus, with $n=80$ and $m=60$ as the main setting. Across repeated runs, tree-based methods were 2-3 orders of magnitude faster than standard WSV and entropic WSV; a three-child tree took about 1% of standard WSV runtime. Tree methods also had lower Hilbert-distance error relative to entropic WSV and generally converged in fewer than ten iterations. Trees with fewer children produced higher-rank, more accurate approximations but required more computation; two-child trees were less accurate because their rank does not guarantee unique edge weights.

The genomics evaluation covers PBMC3K (2,043 cells and 1,030 genes), mouse V1 neurons (1,468 cells and 1,000 genes), and a Human Lung Cell Atlas subset (7,000 cells and 3,923 genes). On PBMC3K, Tree-WSV reached ASW 0.299 after four iterations and 0.313 at its best, compared with 0.348 for entropic WSV; runtimes were 8 and 72 minutes versus 110 minutes. On V1 neurons, Tree-WSV reached ASW 0.436 after four iterations and 0.602 at its best, compared with 0.256 for entropic WSV, with runtimes of 7 and 32 minutes versus 70 minutes. On the lung data, entropic WSV had not converged after 12 hours, while Tree-WSV reached ASW 0.104 after four iterations and 0.457 at its best in 27 and 71 minutes.

## Limitations

The paper proves existence and, under tree-rank conditions, uniqueness of the weight updates, but it does not prove convergence of the alternating power iterations or the meta-iterations. In practice, the inner weight updates converged quickly, while ASW scores had not converged after 15 meta-iterations. Results can depend on the initial tree metric, tree branching parameters, basis-set stochasticity, and numerical conditioning; the recursive basis matrices had condition numbers around 1,000-3,000 in the reported large random settings.

Tree-Wasserstein approximation quality is not theoretically guaranteed for the simultaneous collection of many sample and feature measures in this construction. The experiments are limited to one synthetic family and three scRNA-seq datasets, with cell-type labels used for evaluation. Further large-scale testing and applications such as neuronal activity data remain open.

## Related Concepts

- [[Optimal Transport]]
- [[Tree-Wasserstein Distance]]
- [[Unsupervised Ground Metric Learning]]
- [[Geodesic Distance]]
- Single-cell RNA sequencing
- Average silhouette width

## Related Papers

- Huizing, Cantini, and Peyre (2022), "Unsupervised Ground Metric Learning using Wasserstein Singular Vectors."
- Le, Yamada, Fukumizu, and Cuturi (2019), "Tree-sliced Variants of Wasserstein Distances."
- Yamada et al. (2022), "Approximating 1-Wasserstein Distance with Trees."
- Takezawa, Sato, and Yamada (2021), "Supervised Tree-Wasserstein Distance."
- Peyre and Cuturi (2019), "Computational Optimal Transport."
- Wolf, Angerer, and Theis (2018), "SCANPY: Large-Scale Single-Cell Gene Expression Data Analysis."

[[index|Library home]]
