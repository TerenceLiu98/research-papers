---
title: "FlashSinkhorn 2: Block-Sparse Entropic Optimal Transport"
type: paper
authors:
  - Felix X.-F. Ye
  - Yu Chin Fabian Lim
  - Naigang Wang
  - Davis Wertheimer
year: null
tags:
  - optimal-transport
  - sinkhorn-algorithm
  - sparse-computation
  - gpu-computing
  - scientific-computing
---

## TL;DR

FlashSinkhorn 2 (FS2) solves large discrete entropic optimal transport problems on low-dimensional point clouds by combining inexpensive Sinkhorn updates on spatial cell centroids with block-sparse point-level corrections. Sampled marginal checks decide whether lifted coarse potentials are accurate enough, while a mass-dependent screening rule bounds the contribution of every omitted tile. On one A100, FS2 solves transport between two 134-million-particle measures to an all-particle marginal residual below 0.01 in 8,833 seconds.

## Research Question

Can discrete entropic optimal transport on very large, low-dimensional point clouds reach a prescribed marginal residual without storing a dense kernel or evaluating every point pair in every Sinkhorn update?

## Motivation

Streaming solvers such as FlashSinkhorn avoid materializing the $n\times m$ transport kernel, but their dense updates still perform $O(nm)$ work. Existing multiscale methods reduce work through coarsening and truncation, yet a coarse solution can retain point-level centroid error, checking its full marginals is itself quadratic, and irregular sparse supports do not map naturally to fixed tensor-core tiles. FS2 is designed to make these pieces work together on a single GPU while retaining an explicit accuracy target.

## Contributions

- Separates coarse marginal error from irreducible centroid-replacement error and uses sampled row and column checks to decide when a lifted coarse solution is sufficient.
- Introduces a block-mass-dependent truncation threshold that bounds each omitted tile's contribution to every row and column and supports a certificate for the full marginal residual.
- Co-designs spatial organization and GPU execution: Morton-ordered cells and blocks provide contiguous memory ranges, a two-stage screen selects useful block pairs, and fused FlashSinkhorn kernels recompute admitted tiles on tensor cores rather than storing kernel entries.
- Demonstrates the solver on 32 synthetic problems and on transport between two $2^{27}$-particle measures from the Quijote cosmological simulation.

## Method

For squared-Euclidean cost, FS2 first Morton-sorts each point cloud and forms two partitions. Cells aggregate nearby points into mass-weighted centroids for the coarse stage; fixed-size blocks of 64, 128, or 256 consecutive points support the fine stage.

The coarse stage anneals the entropic regularization parameter while running streaming Sinkhorn updates between centroids. It lifts the resulting dual potentials to all points using one half-step in each direction. Instead of computing the full $O(nm)$ marginal residual, it samples rows according to source mass and columns according to target mass. A lift passes when both estimated residuals plus three standard errors fall below tolerance $\tau$. If it fails, further centroid updates reduce coarse marginal error; point-level fine updates begin only after coarse progress stalls.

The fine stage uses [[concepts/block-sparse-entropic-optimal-transport|Block-Sparse Entropic Optimal Transport]]. For source block $I$ and target block $J$, it defines

$$
m_{IJ}=\max_{i\in I,j\in J}\frac{f_i+g_j-C_{ij}}{\varepsilon},
\qquad
\rho_{IJ}=\log\frac{\delta_{\mathrm{rel}}}{\max(a_I,b_J)}.
$$

When $m_{IJ}\leq\rho_{IJ}$, the omitted tile contributes at most $\delta_{\mathrm{rel}}a_i$ to every row $i\in I$ and at most $\delta_{\mathrm{rel}}b_j$ to every column $j\in J$. An axis-aligned bounding-box test first rejects distant block pairs using block-level summaries; exact verification then evaluates only candidates. Admitted tiles are stored as CSR indices, and fused kernels recompute their scores on chip. The automatic choice $\delta_{\mathrm{rel}}=\tau/[4\max(N_B,M_B)]$ bounds total omitted mass in either direction by $\tau/4$.

## Experiments

Experiments use one NVIDIA A100 and three-dimensional point clouds. The synthetic suite contains 32 problems with $n=m$ from $2^{19}$ to $2^{23}$ and $\varepsilon$ from 0.001 to 0.02, at target residual $\tau=0.005$.

- FS2 meets the target on all 32 synthetic problems; GeomLoss multiscale meets it on 10, all from the heterogeneous family.
- On clustered clouds with $n=m=2^{21}$ and $\varepsilon=0.001$, FS2 reaches residual 0.00483 in 15.44 seconds. GeomLoss ends at 0.05416 in 21.45 seconds, while a continued GeomLoss run reaches 0.004997 in 421.10 seconds.
- In the corresponding fine-update profile, FS2 processes 5.9% of the dense point pairs and takes 251 ms per direction, versus 3,600 ms for dense FlashSinkhorn. On the same sparse mask, its kernel is 1.57 times faster than the KeOps executor used for the comparison.
- At $n=m=2^{20}$ and $\varepsilon=0.001$, dense fine execution is 8 times slower than FS2; stopping coarse updates early is 51.6 times slower even with a much larger fine-update budget.

On the Quijote simulation, FS2 scales from $2^{24}$ to $2^{27}$ particles per measure. At $2^{27}$ and $\tau=0.01$, the first complete call takes 8,833 seconds and returns a full marginal residual of 0.009154. Its barycentric displacement estimate has RMSE 6.473 Mpc/$h$ on 4,096 sampled particles, versus 10.064 Mpc/$h$ for predicting zero displacement.

## Limitations

FS2 is specialized to squared-Euclidean cost in dimensions at most three, where a blur-sized neighborhood remains sparse. Its all-block-pairs box screen is still quadratic in the number of blocks; scaling toward $10^{10}$ points would require both multiple GPUs and a subquadratic search such as dual-tree traversal.

The sparse mask trades memory for speed. Its tile indices can make peak memory substantially larger than the streaming baselines, and mask size grows faster than the number of points at fixed regularization because each point acquires more neighbors within the blur. The automatic block-size policy is based on summary-state cache use rather than directly optimizing mask memory.

The coarse acceptance decision is statistical: the reported experiments found no false acceptance over the tested repeat seeds, but the deterministic centroid-error bound was too loose to accept any tested lift. The optimization surrogate uses centroid barycentric projections; its empirical directions can be effective, but the paper's bound does not certify relative error below one on several tested problems. The Quijote solve also uses a nonperiodic cost despite the simulation's periodic domain, with wrapping applied only during displacement scoring.

The supplied manuscript states no publication year or stable identifier for FlashSinkhorn 2; those fields are left unknown rather than inferred from its references.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/block-sparse-entropic-optimal-transport|Block-Sparse Entropic Optimal Transport]]
- [[concepts/sinkhorn-divergence|Sinkhorn Divergence]]

## Related Papers

- Ye et al. (2026), "FlashSinkhorn: IO-Aware Entropic Optimal Transport on GPU": supplies the streaming fused kernel used for dense and sparse half-steps.
- Schmitzer (2019), "Stabilized Sparse Scaling Algorithms for Entropy Regularized Transport Problems": provides the potential-based truncation principle and hierarchical screening context.
- Feydy et al. (2019), "Fast and Scalable Optimal Transport for Brain Tractograms": the GeomLoss multiscale approach used as the main baseline.
- [[papers/simple-approximative-algorithms-for-free-support-wasserstein-barycenters|Simple Approximative Algorithms for Free-Support Wasserstein Barycenters]]: another approach to reducing the computational burden of discrete transport, focused on barycenter approximation rather than sparse EOT solves.

[[index|Library home]]
