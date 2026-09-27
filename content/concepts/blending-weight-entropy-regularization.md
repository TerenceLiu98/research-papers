---
title: Blending-Weight Entropy Regularization
type: concept
tags:
  - 3d-gaussian-splatting
  - entropy-regularization
  - differentiable-rendering
  - training-acceleration
---

## Overview

Blending-weight entropy regularization penalizes diffuse contributions along a rendering ray. In [[3D Gaussian Splatting]], minimizing this entropy encourages a few primitives, or the background, to dominate each pixel. The purpose in [[Speeding Up the Learning of 3D Gaussians with Much Shorter Gaussian Lists]] is to learn more localized Gaussian influence and shorten rendering lists while retaining a prescribed global primitive count.

## Key Ideas

### Include the Background

For depth-ordered alpha values $\alpha_i$, define

$$
T_i=\prod_{k<i}(1-\alpha_k),\qquad
w_i=T_i\alpha_i,\qquad
w_{N+1}=T_{N+1}.
$$

Since $w_i=T_i-T_{i+1}$ and $T_1=1$, the Gaussian weights plus residual background weight sum to one. Thus

$$
H=-\sum_{i=1}^{N+1}w_i\log w_i
$$

is entropy of a normalized distribution without an additional normalization pass. Omitting the background generally loses this property. At zero weight, the entropy term uses the limiting convention $0\log0=0$.

### Regularize Contributions, Not Only Opacity

Each weight includes the primitive's projected density, its opacity, and transmittance through earlier primitives. Gradients therefore affect geometry and opacity jointly. A binary opacity penalty alone cannot express these visibility-dependent interactions. Reconstruction loss must balance entropy minimization: low entropy by itself does not imply the correct pixel color or scene geometry.

### Accumulate Gradients Along the Ray

With $R_i=\sum_{k=i}^{N+1}(\log w_k+1)w_k$, the interior gradient is

$$
\frac{\partial H}{\partial\alpha_i}
=(-\log w_i-1)T_i+\frac{R_{i+1}}{1-\alpha_i}.
$$

A reverse accumulation computes the tail sums in linear time. The analytical expression contains logarithms and division by $1-\alpha_i$, so boundary values require numerical treatment in an implementation; the source does not specify that treatment completely.

### Distinguish Concentration from Pruning

Entropy changes the learned contribution distribution; it does not directly impose a shorter candidate list or remove primitives. The cited paper reports smaller scales and shorter lists after optimization, with further gains from periodic scale reset. This differs from [[Geometry-Aware Gaussian-Tile Culling]], which tightens candidate selection for the current projected footprint. Tile candidate counts, effective per-pixel contributions, and global primitive counts should be tracked separately.

The strength of the penalty controls a speed-quality trade-off. On LiteGS with resolution scheduling, adding entropy alone reduces Mip-NeRF 360 training time from 134.99 to 112.13 seconds while lowering PSNR from 27.85 to 27.38 dB (Table 4 of the cited paper). This establishes an empirical acceleration in that setup, not a guarantee of quality-preserving sparsity.

## Important Papers

- [[Speeding Up the Learning of 3D Gaussians with Much Shorter Gaussian Lists]]: normalized ray-weight entropy, linear-time differentiation, and combination with periodic scale reset and progressive resolution.

## Related Concepts

- [[3D Gaussian Splatting]]
- [[Geometry-Aware Gaussian-Tile Culling]]
