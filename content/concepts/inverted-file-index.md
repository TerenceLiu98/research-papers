---
title: Inverted File Index
type: concept
aliases:
  - IVF index
  - Inverted file indexing
tags:
  - approximate-nearest-neighbor-search
  - vector-search
  - indexing
---

## Overview

An inverted file index accelerates vector search by partitioning the database into coarse cells and storing a posting list for each cell. At query time, the system probes only the lists associated with a selected number of nearby coarse centroids, trading search work for recall.

## Key Ideas

- A coarse quantizer maps database vectors to cells, commonly using [[concepts/k-means-clustering|K-Means Clustering]] centroids. The vectors assigned to each cell form its posting list.
- A query ranks coarse centroids and scans the lists for the nearest `nprobe` cells. Increasing `nprobe` usually improves recall while increasing distance computations.
- Probe count alone is not a method-independent cost measure because posting lists can have different sizes. The number of candidate distance computations better captures search work when assignment policies differ.
- Boundary vectors can be missed when a query and its true neighbor fall on opposite sides of a coarse-cell boundary. Multi-assignment stores selected vectors in more than one list to reduce this failure mode, at the cost of index growth.
- Product quantization can compress vectors or residuals inside the posting lists; this fine-quantization stage is distinct from the coarse partition.

## Important Papers

- Jegou et al. (2011), "Searching in One Billion Vectors: Re-rank with Source Coding": develops large-scale inverted-file search with source coding.
- Johnson, Douze, and Jegou (2021), "Billion-Scale Similarity Search with GPUs": describes GPU implementations of billion-scale similarity search.
- [[papers/flash-gmm-a-memory-efficient-kernel-for-scalable-soft-clustering|Flash-GMM: A Memory-Efficient Kernel for Scalable Soft Clustering]]: replaces the k-means coarse quantizer with a Gaussian mixture and uses responsibilities for adaptive multi-assignment.

## Related Concepts

- [[concepts/k-means-clustering|K-Means Clustering]]
- [[concepts/gaussian-mixture-models|Gaussian Mixture Models]]
- Approximate nearest-neighbor search
- Product quantization
- Vector quantization
