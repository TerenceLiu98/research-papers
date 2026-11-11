---
title: Gromov-Monge Gap
type: concept
aliases:
  - Gromov–Monge Gap
tags:
  - optimal-transport
  - representation-learning
---

## Overview

The Gromov–Monge gap measures how much structural distortion a deterministic map incurs beyond the best coupling between the same source and pushforward distributions. It gives a relative measure of map quality across metric spaces.

## Key Ideas

For order two, subtract the squared [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]] from the encoder's expected squared pairwise-distance distortion. The encoder-induced coupling is feasible, so the gap is nonnegative. It vanishes exactly when that coupling is GW-optimal. Zero gap establishes optimality relative to those marginals; it does not establish zero absolute distortion.

GWIB uses this gap to upper-bound a specified empirical kernelized information score under bounded-space and kernel assumptions. The bound retains an additive constant. A reference-distribution relaxation combines distortion and fused GW alignment, enabling fixed-prior autoencoding and coupled group alignment. Exact-distance guarantees require care when approximate costs appear with negative signs.

## Important Papers

- Uscidda et al. (2025), *Disentangled Representation Learning with the Gromov-Monge Gap*: antecedent cited by GWIB for relational map regularization.
- [[papers/gromov-wasserstein-information-bottleneck-for-distance-preserving-representation-learning|Gromov-Wasserstein Information Bottleneck for Distance-Preserving Representation Learning]]: connects the gap to empirical kernelized information and derives a reference relaxation for generative and predictive learning.

## Related Concepts

- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: the optimal relational cost subtracted from map distortion.
- [[concepts/optimal-transport|Optimal Transport]]: the coupling-based framework underlying the comparison.
