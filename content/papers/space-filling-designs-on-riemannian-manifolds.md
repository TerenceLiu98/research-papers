---
title: "Space-filling designs on Riemannian manifolds"
type: paper
authors:
  - Mingyao Ai
  - Yunfan Yang
  - Xiangshun Kong
year: 2024
tags:
  - space-filling-designs
  - riemannian-manifolds
  - hilbert-curves
  - low-discrepancy-designs
  - experimental-design
  - wasserstein-distance
---

## TL;DR

This paper introduces Hilbert Curve based Designs (HCDs), which map one-dimensional low-discrepancy point sets onto Riemannian manifolds through a transformed Hilbert curve. The transformation is designed to preserve Riemannian volume while retaining Hilbert-curve locality, allowing HCDs to achieve the optimal $n^{-1/d}$ rate for several space-filling criteria under regularity conditions. Simulations on spheres, simplexes, and more general manifolds favor the basic and augmented HCD procedures over the compared alternatives, especially for large design sizes.

## Research Question

How can representative experimental-design points of arbitrary size be constructed on a Riemannian manifold while respecting intrinsic volume and geodesic distance, rather than the geometry of an ambient Euclidean parameterization?

## Motivation

Design points on spheres, rotation groups, Grassmannians, Stiefel manifolds, and other non-Euclidean domains cannot always be generated reliably by methods designed for convex Euclidean regions. Support-point optimization can place points outside a non-convex manifold and requires a non-convex iterative computation. Direct randomized resampling can have high discrepancy, depend on perturbations, and require substantial computation. A measure-preserving map alone can also distort local distances, so small perturbations in the parameter space may be magnified on the manifold.

## Contributions

- Constructs a transformed Hilbert curve that preserves Riemannian volume up to the total manifold volume and is locality preserving under regularity conditions.
- Defines HCDs by mapping any one-dimensional low-discrepancy design through this transformation, with an empirical inverse transform for practical computation and a multi-chart extension for manifolds covered by coordinate domains.
- Proves that suitable approximated HCDs attain the $O(n^{-1/d})$ rate for covering and separation radii, matching the general lower and upper rates for minimax and maximin design.
- Shows that HCDs attain the $O(n^{-1/d})$ Wasserstein rate relative to the uniform Riemannian-volume distribution.
- Extends star and $L_p$ discrepancies and Hardy-Krause variation to parameterized manifolds, obtaining a manifold Koksma-Hlawka inequality and corresponding discrepancy and worst-case integration-error rates.
- Gives transformed and augmented construction procedures and a unified parameterization strategy for general manifolds, with examples for spheres and simplexes.

## Method

Let $H:[0,1]\to[0,1]^d$ be a $d$-dimensional Hilbert curve and let $\varphi:[0,1]^d\to\mathcal{M}$ parameterize a Riemannian manifold with metric matrix $\tilde{g}$. The paper uses the Hilbert curve's measure-preserving property to write the manifold volume as

$$
\mathcal{V}_g(\mathcal{M}) = \int_0^1 \det(\tilde{g}(H(t)))^{1/2}\,dt.
$$

It then defines the one-dimensional volume reparameterization

$$
G(x)=\mathcal{V}_g(\mathcal{M})^{-1}\int_0^x\det(\tilde{g}(H(t)))^{1/2}\,dt
$$

and the transformed Hilbert curve $\widetilde{H}=\varphi\circ H\circ G^{-1}$. For a low-discrepancy set on $[0,1]$, its image under $\widetilde{H}$ is an HCD. Because $G^{-1}$ generally has no closed form, the implementation approximates it with a grid-based cumulative sum, yielding approximated HCDs. Algorithm 1 selects representatives from Hilbert subcubes inside each one-dimensional design interval; Algorithm 2 feeds basic HCDs at sizes $n$ and $N\gg n$ into the support-point procedure and projects the result back to the manifold, producing augmented HCDs (ATHs).

The theoretical analysis uses bounds on the largest and smallest eigenvalues of $\tilde{g}$. These bounds make the transformed curve both locality preserving and sufficiently separated from the boundary of each image interval. A radial parameterization from a largest inscribed cube is proposed for compact star-convex parameter domains, and specialized parameterizations are given for hemispheres and simplexes.

## Experiments

The experiments compare the transformed HCD (TH), augmented HCD (ATH), support points generated in parameter space (SP), support points generated directly on the manifold (SP2), measure-preserving transformed designs (TR), and Gaussian random points on spheres (GR). Evaluation uses separation radius, covering radius, and integration error for Gaussian peak functions on $S^2$ and $\mathcal{T}^2$. The reported plots favor TH and especially ATH across these criteria.

Additional experiments cover four-dimensional spheres and simplexes, small and moderate sample sizes, k-nearest-neighbor prediction, and construction time. The ATH procedure has lower average prediction error in the reported sphere experiment. For generating 200 through 3,000 points on a sphere, TH is slightly slower than SP at small or moderate sizes but becomes faster at larger sizes. With the paper's scaling choices, it characterizes the HCD construction as $O(n^d)$ and the support-point computation as $O(n^{d+1}d)$. The simulations are plot-based comparisons rather than a broad benchmark across many manifolds or finite-sample regimes.

## Limitations

The principal guarantees are asymptotic and depend on regularity assumptions, including bounded and non-degenerate metric eigenvalues, Lipschitz continuity, and sufficiently accurate approximation of $G^{-1}$. The quality of a practical design also depends on finding a suitable parameterization; a poor parameterization can undermine the intrinsic-distance guarantees. Hilbert-curve methods face the curse of dimensionality, so the approach is difficult to extend to high-dimensional manifolds. The numerical evidence is concentrated on spheres, simplexes, and selected test functions, with several results presented qualitatively in figures. The augmented method additionally inherits the computational and projection choices of the support-point procedure.

## Related Concepts

- [[Hilbert Curve Based Designs]]
- [[Geodesic Distance]]
- Riemannian manifolds
- Low-discrepancy designs
- Wasserstein distance
- Koksma-Hlawka inequality

## Related Papers

- He and Owen (2016), "Extensible grids: uniform sampling on a space filling curve."
- Li and Del Castillo (2022), "Optimal design of experiments on Riemannian manifolds."
- Mak and Joseph (2018), "Support points."
- De Marchi and Elefante (2018), "Quasi-Monte Carlo integration on manifolds with mapped low-discrepancy points and greedy minimal Riesz s-energy points."
- Rhee, Zhou, and Qiu (2017), "Space-filling design for nonlinear models."
- Ehler, Graef, and Oates (2019), "Optimal Monte Carlo integration on closed manifolds."
