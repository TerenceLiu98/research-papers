---
title: "Pattern recognition in complex systems via vector-field representations of spatio-temporal data"
type: paper
authors:
  - Ingrid Amaranta Membrillo Solis
  - Maria van Rossem
  - Tristan Madeleine
  - Nina Podoliak
  - Tetiana Orlova
  - Giampaolo D'Alessandro
  - Jacek Brodzki
  - Malgosia Kaczmarek
year: null
source_job_id: 896d3477-1cab-43e3-8074-97804f670352
tags:
  - spatio-temporal-data
  - complex-systems
  - multidimensional-scaling
  - dimensionality-reduction
  - chaos-detection
---

[[index|Library home]]

## TL;DR

The paper represents images, image gradients, and functions on meshes as vector fields over discrete measure spaces, compares time-indexed states with a two-parameter family of $L^{p,q}$ metrics, and embeds the resulting distance matrices with classical [[concepts/multidimensional-scaling|multidimensional scaling]]. Simulations of the complex Ginzburg-Landau and Gray-Scott equations show that the embeddings can expose dynamical regimes and support low-rank reconstruction when a few embedding coordinates dominate. The fully turbulent Ginzburg-Landau regime is an important negative case: its spectrum does not support a low-dimensional global representation.

## Research Question

Can heterogeneous, high-dimensional spatio-temporal observations be given a common geometric representation that supports dimensionality reduction, phase-space visualization, mode reconstruction, and qualitative attractor characterization without prior knowledge of the governing dynamics?

## Motivation

Complex systems generate observations in forms such as images, movies, gradients, and fields on curved meshes. Flattening every observation into an ordinary Euclidean vector can obscure the underlying spatial support, while model-based attractor analysis is difficult when governing equations are unknown. The paper seeks a common distance construction that retains the local value structure and the measure attached to the sampled domain before applying an unsupervised embedding.

## Contributions

- Formalizes monochrome and RGB images, image gradients, and scalar or vector-valued data on cubical and simplicial meshes as [[concepts/vector-fields-over-discrete-measure-spaces|vector fields over discrete measure spaces]].
- Defines $L^{p,q}$ norms and metrics that separately control aggregation across the spatial domain and comparison within each vector value.
- Uses pairwise $L^{p,q}$ distances with classical MDS to visualize system trajectories and identify principal embedding coordinates.
- Gives a linear reconstruction formula for approximating observed fields from a selected number of principal coordinates.
- Demonstrates the pipeline on simulated dynamics over both a flat grid and a triangulated sphere, including stable, metastable, and chaotic regimes.

## Method

For a finite discrete measure space $(\mathcal M,\mu)$, a normed vector space $V$, and a field $X:\mathcal M\to V$, the proposed family is

$$
\lVert X\rVert_{L^{p,q}}
=\left(\sum_{s\in\mathcal M}\lVert X(s)\rVert_q^p\mu(s)\right)^{1/p},
$$

with the usual maximum form when $p=\infty$. The distance between two states is $d_{L^{p,q}}(X,Y)=\lVert X-Y\rVert_{L^{p,q}}$. The exponent $q$ compares components at one spatial element, while $p$ aggregates discrepancies across elements; for $p=q=2$, the norm is induced by an inner product.

The method computes every pairwise distance between observed time states, squares the distance matrix $D$, and applies classical MDS through the centered Gram matrix

$$
B=-\tfrac12 C D^{(2)} C, \qquad C=I-\tfrac1nJ.
$$

Eigenvalues of $B$ indicate how many coordinates account for most of the embedded variation, and rows of $A=Y\Lambda$ provide coordinates for visualizing the dynamics. The paper additionally derives a reconstruction of each centered field as a linear combination of these coordinates and truncates that expansion to obtain a low-rank approximation. This reconstruction assumes that the map from embedding coordinates back to centered fields extends linearly.

## Experiments

**Complex Ginzburg-Landau equation.** The equation is integrated on a periodic $128\times128$ grid using a split-step scheme with a third-order explicit Runge-Kutta nonlinear step. Three parameter settings produce a frozen state, defect turbulence, and defect turbulence with spirals. The analysis compares both scalar fields and their rank-two image-gradient fields using $L^{1,1}$ and $L^{2,2}$ distances. Frozen and spiral-turbulence dynamics have a few dominant embedding coordinates and approach relatively simple trajectories. Defect turbulence lacks a comparably simple global three-dimensional orbit at the coarser time resolution, although shorter, more finely sampled windows reveal local trajectories. Three-coordinate reconstructions retain the main visible structure for the frozen regime; no small eigenvalue subset captures most variation in the fully turbulent regime.

**Gray-Scott reaction-diffusion system.** Simulations run on a sphere triangulated into 6,670 elements for 20,000 time units with outputs every 20 units. Stable stripe and dot patterns and an oscillatory turbulent state are compared using area-weighted distances for fields and gradients. The first three MDS coordinates capture the main variation reported for all three settings. Their trajectories distinguish initial diffusion, pattern formation, and later steady or oscillatory behavior, while three-coordinate reconstructions of stripe states retain their main spatial features.

**Lyapunov comparison.** The paper reports maximum Lyapunov estimates of 0.38 from the first MDS coordinate of an $L^1$ image-distance representation and 0.15 from image $L^2$ norms. Only the turbulent solution with oscillations has a positive reported maximum exponent, consistent with the qualitative geometric diagnosis.

## Limitations

- Evidence comes from numerical solutions of two known equations, not from the motivating experimental soft-matter data or other measured complex systems.
- Attractor assessment is primarily qualitative and resolution-dependent. Coarse temporal sampling can hide trajectories that appear in shorter, more finely sampled windows.
- Low-dimensional reconstruction succeeds only when the eigenvalue spectrum is concentrated. The defect-turbulence example explicitly fails this condition for a global reduction.
- Classical MDS preserves a non-Euclidean distance matrix only approximately, and the paper does not report embedding stress or reconstruction-error curves.
- The reconstruction theorem assumes a linear extension from embedding coordinates to centered fields; this may not describe arbitrary nonlinear data geometry.
- The supplied text provides no publication year or stable identifier. Data and code are available only from the corresponding author on reasonable request.

## Related Concepts

- [[concepts/vector-fields-over-discrete-measure-spaces|Vector Fields over Discrete Measure Spaces]]: the common representation and metric family used for all observations.
- [[concepts/multidimensional-scaling|Multidimensional Scaling]]: converts pairwise field distances into Euclidean coordinates for visualization and reconstruction.
- [[concepts/supervised-manifold-learning|Supervised Manifold Learning]]: a related distance-embedding pipeline that incorporates labels and out-of-sample prediction, unlike this paper's unsupervised dynamical analysis.
- [[concepts/geodesic-distance|Geodesic Distance]]: an alternative way to define geometry before dimensionality reduction when data lie on a manifold.

## Related Papers

- [[papers/supervised-manifold-learning-for-functional-data|Supervised Manifold Learning for Functional Data]]: also constructs a problem-specific distance and applies MDS, but targets labeled functional classification and includes an out-of-sample coordinate map.
- Chaté and Manneville (1996), "Phase diagram of the two-dimensional complex Ginzburg-Landau equation": supplies the dynamical regimes used for the flat-domain demonstration.
- Pearson (1993), "Complex patterns in a simple system": supplies the Gray-Scott reaction-diffusion regimes used for the curved-domain demonstration.
- Cox and Cox (2008), "Multidimensional scaling": the cited embedding method used to turn pairwise distances into Euclidean coordinates.
