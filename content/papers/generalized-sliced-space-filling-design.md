---
title: "Generalized sliced space-filling design"
type: paper
authors:
  - Yuning Huang
  - Zikang Xiong
  - Hong Qin
year: 2026
tags:
  - experimental-design
  - representative-points
  - computer-experiments
---

## TL;DR

The paper constructs non-uniform experimental designs whose full point set and categorical slices approximate a chosen target distribution. A hybrid weighted energy-distance objective supports unequal slice sizes, hypercubes and mixture simplexes, with one-shot and sequential majorization-minimization algorithms. Four numerical examples report lower Gaussian-process prediction errors than the compared uniform or transformed designs.

## Research Question

How can designs for mixed qualitative and quantitative inputs represent a non-uniform target distribution both globally and within every qualitative-factor combination, without restrictive Latin-hypercube run sizes or explicit inverse transformations?

## Motivation

Uniform coverage can leave boundaries relatively poorly informed for surrogate prediction. Arcsine-type targets place more points near edges, but transforming an existing design need not preserve good multivariate or slice-level representativeness. Viewing designs as [[concepts/representative-points|Representative Points]] allows the desired density to enter the construction directly.

## Contributions

- Derives a decomposition relating full-set weighted energy distance to slice distances and between-slice discrepancies.
- Combines global and slice objectives and studies asymptotic distributional representativeness.
- Develops joint and sequential construction algorithms with stationary-solution convergence results on closed convex regions.
- Demonstrates non-uniform designs on rectangular and mixture domains, including unequal slice sizes.

## Method

For target distribution $F$, proposal $G$, and empirical design distribution $F_P$, the weighted energy distance uses importance weights $w(y)=f(y)/g(y)$, optionally normalized by their mean. Expectations are approximated using a large proposal sample; normalization permits densities known only up to constants.

For $K$ slices with sizes $n_k$ and total size $n$, the objective is

$$
E_w^\lambda(F,F_P)=\lambda E_w(F,F_P)+(1-\lambda)\sum_{k=1}^K\frac{n_k}{n}E_w(F,F_{P_k}).
$$

The one-shot algorithm jointly updates points using quadratic majorizers. The sequential algorithm freezes previous slices and optimizes the next slice, balancing target fit against separation from existing points. The paper recommends $\lambda=0.5$ for joint construction without prior preferences. Theorems 2–3 establish convergence to stationary solutions under their stated closed-convex-domain and initialization conditions, rather than global optimality.

Theorem 1 asserts convergence of full and slice empirical distributions when slice proportions tend to positive constants. Its proof uses nonnegative objective components; the slice conclusion requires care at $\lambda=1$, where the slice penalty vanishes. This endpoint caveat is a reading of the displayed objective and proof, not an additional result established by the authors.

## Experiments

Each scenario uses 100 repetitions and RMSPE over 1,000 uniformly sampled test points. Design targets are product arcsine densities on hypercubes and Dirichlet densities with all parameters one-half on simplexes; the evaluation distribution remains uniform.

- **Quantitative hypercube:** two- and three-variable functions, with 30, 40, 50 and 70 runs. GSFD has the lowest reported mean RMSPE in all eight settings against maximin LHD, generalized maximin LHD and NUSFD. For the two-variable function at 30 runs, reported RMSPE multiplied by $10^3$ is 35.2 (SD 6.0), versus 39.1 (8.3), 70.5 (19.8) and 111.6 (57.0), respectively (Table 1).
- **Quantitative mixture:** three components, 10–40 runs. At 30 runs, RMSPE multiplied by $10^3$ is 3.2 (SD 0.6) for GSFD, 7.6 (4.1) for NUSFD and 14.9 (2.3) for uniform design (Table 2).
- **Mixed hypercube:** two quantitative variables and four categorical levels, with 10 runs per slice. Figure 1 reports better prediction for GSSFD and its sequential variant than sliced LHD and arcsine-transformed sliced LHD, using EzGP and EEzGP models.
- **Mixed mixture:** three components and three process levels with slice sizes 15, 18 and 20. Figure 2 favors generalized sliced designs over uniform-target one-shot and sequential sliced designs. Exact numerical means are not supplied in the parsed figure captions.

The authors identify RP4design as their R/C++ implementation and give the reproduction repository as `github.com/doenew/GSSFDandRP4design`.

## Limitations

The numerical evidence concerns selected low-dimensional synthetic functions; it does not establish universal predictive superiority. Choosing a target distribution for a new application remains an open design decision. Isotropic energy distance may have poor projection properties in high dimensions, a limitation explicitly identified by the authors. Finite proposal samples and stationary-point optimization are distinct from the ideal population optimization underlying the distributional theory. The NUSFD comparisons use weights that concentrate points near boundaries; the paper notes that adjusting its weight range and maximum weight ratio can materially affect its behavior.

## Related Concepts

- [[concepts/representative-points|Representative Points]]: distribution approximation provides the design objective; energy-based equal-weight designs differ from nearest-neighbor MSE quantizers.

## Related Papers

- Qian and Wu (2009), “Sliced space-filling designs”: the mixed-input sliced-design framework.
- Dette and Pepelyshev (2010), “Generalized latin hypercube design for computer experiments”: arcsine transformations motivating boundary emphasis.
- Mak and Joseph (2018), “Support points”: energy-distance representative-point construction.
- Xiong et al. (2025), “Sliced space-filling design with mixtures”: decomposition and sequential construction extended here to non-uniform targets.
- [[papers/space-filling-designs-on-riemannian-manifolds|Space-filling designs on Riemannian manifolds]]: a complementary treatment of nonrectangular domains through intrinsic geometry and volume-preserving maps, rather than non-uniform sliced objectives.
