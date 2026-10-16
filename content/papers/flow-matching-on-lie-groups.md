---
title: Flow Matching on Lie Groups
type: paper
authors:
  - Finn M. Sherry
  - Bart M.N. Smets
year: null
source_job_id: "76336aa8-f094-42fc-b2af-696597c3a3e1"
repository: "https://github.com/finnsherry/FlowMatching"
tags:
  - flow-matching
  - lie-groups
  - generative-models
---

[[index|Library home]]

## TL;DR

The paper extends flow matching to Lie groups with surjective exponential maps by replacing straight-line interpolation with exponential curves. Conditional training targets can be computed directly from group operations, and exponential-based sampling keeps states on the group. Qualitative demonstrations on $\mathrm{SE}(2)$, $\mathrm{SO}(3)$, and $\mathrm{SE}(2)\times\mathbb R^2$ show approximate agreement with target distributions; no quantitative accuracy or speed comparisons are reported.

## Research Question

Can group exponentials provide tractable, intrinsic conditional paths for flow matching on geometric data without requiring geodesic computation or simulation of training paths?

## Motivation

Euclidean straight lines need not stay on a curved data space. Riemannian flow matching can use geodesics or premetric-based vector fields, but computing those paths may be expensive on less tractable manifolds. Lie groups provide multiplication, inversion, exponentials, and logarithms that can instead construct paths directly. Product groups also accommodate joint pose and feature representations.

## Contributions

- Defines a conditional vector field whose integral curves are exponential curves connecting source and target group elements (Proposition 1).
- Establishes equality of the parameter gradients of conditional and marginal flow-matching losses by applying an existing general result for Bregman divergences (Theorem 1).
- Recovers Euclidean flow matching on the translation group and describes matrix-group and product-group implementations.
- Demonstrates the construction on three groups and discusses an extension to homogeneous spaces that requires a rule for selecting connecting curves.

## Method

For a Lie group $G$ with surjective exponential map, choose a logarithm branch and independent endpoints $g_0\sim\mathfrak X_0$, $g_1\sim\mathfrak X_1$. The conditional path is

$$
g_t=g_0\exp\!\left(t\log(g_0^{-1}g_1)\right).
$$

With $L_g(h)=gh$ and $(L_g)_*$ its tangent push-forward, the conditional field is

$$
u_t(g\mid g_1)=\frac{(L_g)_*\log(g^{-1}g_1)}{1-t},\qquad t<1.
$$

Under the logarithm choice used along the path, its left-trivialized velocity is the fixed Lie algebra element $A=\log(g_0^{-1}g_1)$. Sample $t$ uniformly and regress the conditional field using

$$
\mathcal L^G_{\mathrm{CFM}}(\theta)
=\mathbb E\left[\left\|u_t^\theta(g_t)-u_t(g_t\mid g_1)\right\|_{\mathcal G}^2\right].
$$

A left-invariant metric $\mathcal G$ makes identification of tangent vectors with Lie algebra coordinates isometric. Theorem 1 states that this tractable loss has the same parameter gradient as the marginal flow-matching loss. Training is simulation-free because both the intermediate state and its target velocity are available directly; generation still integrates a learned field.

The implementation predicts coefficients in a fixed left-invariant frame using an MLP with four hidden layers of width 64. Integration uses the Lie group exponential to preserve group membership. Matrix representations allow standard matrix operations, although the paper notes a memory cost relative to specialized coordinates. Product-group operations act componentwise, extending the construction to $(G\times H)^m$.

Exponential curves are not generally geodesics for a merely left-invariant metric. With a bi-invariant metric, they coincide, and the paper recovers the geodesic construction of Riemannian flow matching on $\mathrm{SO}(3)$. For general groups, the authors do not identify a premetric inducing their conditional field (Section 2, Remark 2).

## Experiments

Section 3 presents visual proof-of-concept experiments rather than benchmark tables.

| Group | Demonstration | Reported observation |
| --- | --- | --- |
| $\mathrm{SE}(2)$ | Planar positions and orientations: horizontal line to vertical line; vertical line to circle | Final samples reasonably resemble the targets; line-to-circle intermediate distributions are more complicated. |
| $\mathrm{SO}(3)$ | Spherical positions and orientations with analogous line and circle configurations | Final samples reasonably resemble the target configurations. |
| $\mathrm{SE}(2)\times\mathbb R^2$ | One joint distribution pair, with pose and feature components plotted separately | Both displayed components approximately match their targets at the end of the learned flow. |

Figures 1-3 show initial samples, learned trajectories, and target samples. The source links the implementation and animations in the repository recorded above. It provides no numerical distributional errors, timing measurements, ablations, or comparative baseline results.

## Limitations

- The construction assumes a surjective exponential map; it does not cover every Lie group. Choosing a logarithm branch is also necessary, and surjectivity alone does not supply a globally smooth inverse.
- The demonstrations concern low-dimensional synthetic distributions. Image generation through Equivariant Neural Field latent codes is proposed future work, not an evaluated application.
- Simulation-free training does not eliminate numerical integration at generation time or establish a measured speedup over Riemannian alternatives.
- The homogeneous-space extension leaves a curve-selection problem because multiple group elements can map one point to another.

Source note: The supplied Markdown does not state the paper's publication year, venue, DOI, or arXiv identifier, so the year remains null. Some group-specific formulas are ambiguous in the supplied text, including the displayed $\mathrm{SE}(2)$ exponential and $\mathrm{SO}(3)$ logarithm. Those formulas are not reproduced here; the summary uses the recoverable general construction.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: conditional vector-field regression and ODE-based generation.
- [[concepts/lie-group-flow-matching|Lie Group Flow Matching]]: exponential interpolation and left-invariant coordinates.
- [[concepts/geodesic-distance|Geodesic Distance]]: distinguishes metric geodesics from group exponential curves.

## Related Papers

- Lipman et al. (2023), "Flow Matching for Generative Modeling" (reference 6): the Euclidean conditional-flow foundation recovered by the translation-group example.
- Chen and Lipman (2024), "Flow Matching on General Geometries" (reference 3): Riemannian flow matching using geodesics or other premetrics.
- Lipman et al. (2024), "Flow Matching Guide and Code," arXiv:2412.06264 (reference 7): supplies the general gradient-equivalence result invoked by Theorem 1.
- Wessels et al. (2025), "Grounding Continuous Representations in Geometry: Equivariant Neural Fields" (reference 10): motivates the proposed pose-feature latent-space application.
