---
title: K-Means Clustering
type: concept
aliases:
  - K-means
  - Lloyd's algorithm
tags:
  - clustering
  - vector-quantization
  - unsupervised-learning
---

## Overview

K-means represents observations by $K$ centroids and assigns each observation to its nearest centroid under squared Euclidean distance. Lloyd's algorithm alternates nearest-centroid assignment with replacement of each centroid by the mean of its assigned observations. This decreases the objective at each completed step, but generally reaches a local rather than guaranteed global optimum.

## Key Ideas

- **Objective:** For assignments $a_i$ and centroids $c_k$, minimize $\sum_i \lVert x_i-c_{a_i}\rVert_2^2$.
- **Alternating optimization:** Assignment chooses the nearest fixed centroid; update computes the mean for every fixed cluster membership.
- **Initialization matters:** Different starting centroids can lead to different local solutions, so implementations commonly use informed initialization or multiple restarts.
- **Systems behavior differs from arithmetic complexity:** On accelerators, materializing every point-centroid distance can dominate memory traffic, while parallel centroid updates can contend on shared accumulators.
- **Approximation is optional:** Sampling, coresets, and skipped distance evaluations can change how work is reduced, whereas fused exact implementations can preserve the ordinary Lloyd assignment and update.

## Important Papers

- Lloyd (1982), "Least Squares Quantization in PCM": a foundational statement of the alternating least-squares procedure.
- MacQueen (1967), "Some Methods for Classification and Analysis of Multivariate Observations": an early formulation of k-means methods.
- Elkan (2003), "Using the Triangle Inequality to Accelerate K-Means": avoids some distance computations while preserving exact assignments.
- [[papers/flash-kmeans-fast-and-memory-efficient-exact-k-means|Flash-KMeans: Fast and Memory-Efficient Exact K-Means]]: reorganizes exact GPU assignment and centroid updates around memory traffic and atomic contention.
- [[papers/quantization-and-clustering-with-bregman-divergences|Quantization and Clustering with Bregman Divergences]]: places nearest-representative clustering in a broader divergence and quantization framework.

## Related Concepts

- [[concepts/bregman-divergences|Bregman Divergences]]
- [[concepts/representative-points|Representative Points]]
- Vector quantization
- Centroidal Voronoi partitions
- Clustering initialization
