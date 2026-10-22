---
title: Gromov-Wasserstein Transfer Operators
type: paper
authors:
  - Florian Beier
year: 2023
source_job_id: 5d86280e-e859-43ab-9da2-eb9a0f6852d1
tags:
  - gromov-wasserstein
  - transfer-operators
  - dynamical-systems
  - coherent-structures
---

[[index|Library home]]

## TL;DR

The paper constructs [[concepts/transfer-operators|Transfer Operators]] from entropy-regularized Gromov-Wasserstein (GW) plans to estimate dynamics from only an initial and a final observation. Because GW compares intrinsic pairwise distances, the estimator can recover rotational motion that ordinary [[concepts/optimal-transport|Optimal Transport]] misses. Singular-vector clustering of the resulting operator identifies coherent structures, while restricted GW objectives provide a shape-coherence score. Three numerical examples illustrate the method, but the evidence is qualitative or simulation-based and exposes ambiguity under near-symmetries.

## Research Question

Can a transfer operator estimated from two snapshots recover coherent dynamics that are dominated by isometries, such as rotation, without knowing the governing map or requiring a meaningful pointwise cost between the snapshots?

## Motivation

Entropic optimal-transport plans can be normalized into transfer operators and analyzed spectrally, but ordinary transport favors short pointwise displacement. A large rotation may therefore be inexpensive in intrinsic geometric distortion yet expensive under Euclidean transport. [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]] instead compares within-snapshot distances and is invariant to measure-preserving isometries, making it a natural basis for rotation-sensitive dynamical estimation.

## Contributions

- Derives transfer operators from entropy-regularized GW plans and applies the usual second-singular-vector relaxation to coherent-set detection.
- Extends the construction to fused GW for labelled observations and to [[concepts/unbalanced-optimal-transport|Unbalanced Optimal Transport]] variants for noisy or dissipative data.
- Proposes evaluating the GW objective on each restricted cluster coupling as a quantitative measure of shape coherence: values closer to zero indicate stronger preservation of intrinsic geometry.
- Demonstrates the approach on a rotating point cloud, two locally rotating disks, and two snapshots of a simulated two-dimensional Navier-Stokes vorticity field.

## Method

**Transport-derived operator.** For probability measures $\mu$ and $\nu$, an entropy-regularized transport plan is written as $\hat\pi_\varepsilon=k_\varepsilon(\mu\otimes\nu)$. Its kernel defines

$$
(K_\varepsilon\psi)(y)=\int_X k_\varepsilon(x,y)\psi(x)\,\mathrm d\mu(x).
$$

For atomic measures, $K_\varepsilon=D_\nu^{-1}\hat\pi_\varepsilon^\mathsf T$. The same construction applies to a GW plan returned by the paper's block-coordinate relaxation because each update reduces to an entropic transport problem.

**Coherent-set extraction.** In the balanced setting, the constant functions form the leading singular pair with singular value one. The method uses the left and right singular functions associated with the second singular value and thresholds them at zero to partition the initial and final spaces. Recursive application yields more than two sets.

**Structural variants.** Fused GW adds a label discrepancy to intrinsic-distance preservation. The unbalanced formulation penalizes deviations of the plan's marginals from the observed measures rather than enforcing exact equality. The vorticity experiment combines both: sign labels discourage matching positive to negative vorticity, while relaxed marginals accommodate dissipation.

**Shape-coherence assessment.** After spectral partitioning, the GW objective is evaluated on the plan restricted to each paired subset. This supplements transport coherence and approximate mass preservation with an intrinsic-shape criterion; it is a diagnostic attached to the estimated coupling, not an independent recovery guarantee.

## Experiments

### Rotating Disk

Fifty uniformly sampled points on the unit disk are rotated through angles from $\pi/30$ to $\pi$. With $\varepsilon=0.0008$ and ten sampled point clouds per angle, ordinary OT degrades as the angle grows; the paper reports mean error 0.15 even at 18 degrees. GW nearly recovers the exact rotation across the tested noiseless angles. Under additive uniform noise, GW remains comparable at small angles and performs better at large angles; a separate experiment varies noise magnitude from 0.5 to 4.5 at a fixed 90-degree rotation. The supplied text presents these comparisons in plots rather than numerical tables.

### Multiple Rotating Disks

An 80-point configuration contains two half-radius disks subject to a global 90-degree rotation and separate local rotations. Neither OT nor GW recovers the full pointwise map. The GW operator nevertheless sends most mass between the corresponding disks, and its second spectral modes identify the two coherent subsets; the OT partition does not. The paper also reports that this identification can fail under noise because the configuration is nearly invariant to a 180-degree rotation and a reflection, allowing the two disks to be swapped.

### Navier-Stokes Vorticity

The final example uses two thresholded snapshots from a forced, damped two-dimensional Navier-Stokes simulation on a $4096\times4096$ grid. Within a 290-pixel-diameter patch, points with $|\omega|\geq600$ receive mass proportional to absolute vorticity and a binary vorticity-sign label. Fused unbalanced GW and a labelled unbalanced OT baseline use $\varepsilon=0.0003$ and marginal penalty $\kappa=0.1$.

The GW operator qualitatively captures counterclockwise rotation where OT does not. Three recursive spectral splits produce eight partitions, identifying the central vortex and several smaller structures. Restricted GW objective values rank their shape preservation, but the supplied text gives no external ground truth or aggregate detection metric.

## Limitations

- GW alignment is non-identifiable when several near-isometries explain the observations. The two-disk experiment explicitly shows that noise can cause coherent components to be swapped.
- The block-coordinate GW computation addresses a quadratic, nonconvex objective; the paper does not establish global optimality or initialization stability.
- The experiments cover three rotational systems and mostly rely on plots and qualitative structure recovery. There is no broad benchmark, runtime study, statistical uncertainty analysis, or comparison with the global-invariance transport method discussed as future work.
- Only two snapshots are used, so the inferred coupling need not identify the true dynamics when multiple maps are compatible with those marginals and intrinsic geometries.
- The recursive binary clustering used for eight vorticity structures is heuristic, and no model-selection rule for the number of clusters is evaluated.
- The supplied Markdown does not provide a DOI, arXiv identifier, venue metadata, or code artifact. The year follows the document context and 2023 access date.

## Related Concepts

- [[concepts/transfer-operators|Transfer Operators]]: linear descriptions of density evolution and the object estimated from each transport plan.
- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: supplies isometry-aware couplings based on intrinsic geometry.
- [[concepts/optimal-transport|Optimal Transport]]: the pointwise-cost baseline and computational subproblem used in the GW solver.
- [[concepts/unbalanced-optimal-transport|Unbalanced Optimal Transport]]: relaxes marginal matching for noisy or dissipative observations.

## Related Papers

- Koltai et al. (2021), "Transfer Operators from Optimal Transport Plans for Coherent Set Detection": the direct OT-based predecessor generalized here to GW plans.
- Junge, Matthes, and Schmitzer (2022), "Entropic Transfer Operators": studies finite-dimensional entropic approximations when the exact transfer operator is known on a finite subset.
- Memoli (2011), "Gromov-Wasserstein Distances and the Metric Approach to Object Matching": foundational GW formulation.
- Peyre, Cuturi, and Solomon (2016), "Gromov-Wasserstein Averaging of Kernel and Distance Matrices": basis for the balanced iterative GW computation.
- Alvarez-Melis, Jegelka, and Jaakkola (2019), "Towards Optimal Transport with Global Invariances": a computationally attractive alternative noted by the paper, but requiring centered inputs embedded in a common space.
