---
title: Block-Sparse Entropic Optimal Transport
type: concept
aliases:
  - Block-Sparse EOT
tags:
  - optimal-transport
  - sinkhorn-algorithm
  - sparse-computation
  - gpu-computing
---

## Overview

Block-sparse entropic optimal transport accelerates Sinkhorn updates by evaluating only spatial block pairs that may carry material transport mass. It preserves hardware-friendly dense computation inside each admitted tile while using sparse indices between tiles. The central challenge is to select tiles cheaply and control the marginal error caused by omitted pairs.

## Key Ideas

- Entropic plans concentrate around pairs favored jointly by geometry and the current dual potentials. At moderate or low regularization, many distant point pairs contribute negligible mass even though the full kernel is dense.
- Spatial ordering, such as a Morton order, groups nearby points into contiguous blocks. A selected block pair therefore maps to a fixed dense tile with coalesced memory access and tensor-core-compatible matrix operations.
- Screening can use inexpensive block summaries before examining point pairs. Axis-aligned bounding boxes lower-bound cost between two blocks, while blockwise potential maxima upper-bound their best possible log-plan score.
- A mass-aware threshold can control errors in both transport directions. In [[papers/flashsinkhorn-2-block-sparse-entropic-optimal-transport|FlashSinkhorn 2]], rejecting tile $(I,J)$ when its maximum normalized log score is below $\log[\delta_{\mathrm{rel}}/\max(a_I,b_J)]$ bounds its contribution to every affected row and column.
- Tile selection depends on the current dual potentials. A certified mask must therefore be rebuilt as those potentials change.
- Sparsity does not remove every quadratic cost: a flat scan over all block pairs is quadratic in the block counts. Hierarchical or dual-tree searches are needed when even block-level screening becomes too large.
- Block size mediates a practical tradeoff. Smaller blocks screen more precisely but create more summaries and indices; larger blocks reduce index memory while admitting more negligible point pairs inside each retained tile.

## Important Papers

- [[papers/flashsinkhorn-2-block-sparse-entropic-optimal-transport|FlashSinkhorn 2: Block-Sparse Entropic Optimal Transport]]: couples certified mass-aware tile screening with streaming tensor-core Sinkhorn updates.
- Schmitzer (2019), "Stabilized Sparse Scaling Algorithms for Entropy Regularized Transport Problems": develops potential-based truncation with hierarchical refinement and sparse kernel storage.
- Feydy et al. (2019), "Fast and Scalable Optimal Transport for Brain Tractograms": uses multiscale centroid potentials to construct a fine-scale truncation mask.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/sinkhorn-divergence|Sinkhorn Divergence]]
- Sparse matrix computation
- Space-filling curves

