---
title: Hilbert Curve Based Designs
type: concept
aliases:
  - HCDs
  - Transformed Hilbert Curve Designs
tags:
  - space-filling-designs
  - experimental-design
  - low-discrepancy-designs
  - riemannian-manifolds
  - quasi-monte-carlo
---

## Overview

Hilbert Curve based Designs (HCDs) are space-filling designs for Riemannian manifolds. They map a one-dimensional low-discrepancy point set through a Hilbert curve and a volume-correcting reparameterization into a manifold, aiming to distribute points uniformly under Riemannian volume while preserving local proximity under geodesic distance.

## Key Ideas

- **Volume correction:** If $H:[0,1]\to[0,1]^d$ is a Hilbert curve and $\varphi$ parameterizes the manifold, the cumulative map $G$ weights the curve by $\det(\tilde{g}(H(t)))^{1/2}$. The transformed curve $\varphi\circ H\circ G^{-1}$ therefore preserves normalized Riemannian volume.
- **Locality and coverage:** Hilbert curves map nearby one-dimensional intervals to nearby parameter-space regions. Under metric eigenvalue bounds, this gives both an upper bound on geodesic distances within an image interval and a contained geodesic ball, supporting minimax and maximin rates.
- **Intrinsic evaluation:** HCDs can be assessed with covering and separation radii, Wasserstein distance to uniform Riemannian volume, transformation discrepancy, and worst-case integration error. The paper derives $O(n^{-1/d})$ rates for the first three criteria and Sobolev-space rates for integration error under its assumptions.
- **Approximation is part of the method:** The inverse of $G$ is approximated with a grid-based cumulative sum. The approximation resolution must be sufficiently high relative to the target design size for the theoretical construction to apply.
- **Basic and augmented designs:** The transformed Hilbert curve method (TH) selects points inside Hilbert subcubes associated with one-dimensional intervals. The augmented method (ATH) uses a support-point optimization initialized by HCDs at two resolutions, followed by projection onto the manifold.
- **Parameterization matters:** A radial map from a largest inscribed cube can give metric eigenvalue bounds on compact star-convex domains. The paper instantiates this idea for hemispheres and simplexes, but the guarantees remain conditional on the resulting parameterization.

## Important Papers

- [[Space-filling designs on Riemannian manifolds]]
- He and Owen (2016), "Extensible grids: uniform sampling on a space filling curve."
- Mak and Joseph (2018), "Support points."
- De Marchi and Elefante (2018), "Quasi-Monte Carlo integration on manifolds with mapped low-discrepancy points and greedy minimal Riesz s-energy points."
- Li and Del Castillo (2022), "Optimal design of experiments on Riemannian manifolds."

## Related Concepts

- [[Geodesic Distance]]
- [[Uniform Design Subsampling]]
- Riemannian manifolds
- Low-discrepancy designs
- Quasi-Monte Carlo integration
- Wasserstein distance
