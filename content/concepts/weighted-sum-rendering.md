---
title: Weighted Sum Rendering
type: concept
aliases:
  - WSR
  - GS-WSR
tags:
  - differentiable-rendering
  - order-independent-transparency
  - gpu-rendering
---

## Overview

Weighted Sum Rendering forms pixel colors by normalizing accumulated weighted color contributions, including a background contribution. In learned Gaussian scene representations, depth-dependent weights and view-dependent opacity approximate visibility without depth-sorted alpha compositing. Commutative accumulation supports hardware additive blending, while training adapts the scene to the approximation.

## Key Ideas

- **Order-independent accumulation:** A numerator sums weighted colors and a denominator sums their weights. Neither requires the front-to-back transmittance product used in conventional [[3D Gaussian Splatting]].
- **Learned visibility approximation:** Depth weights determine how strongly a Gaussian contributes. Constant weights can blur overlapping surfaces; exponential decay favors nearer splats, while a truncated linear rule can suppress distant ones completely.
- **Joint representation and renderer:** Optimizing scene and blending parameters together compensates for changes in the compositing rule. This is not a guarantee that an existing scene trained with alpha compositing can be rendered unchanged at the same quality.
- **View-dependent opacity:** Spherical harmonics can adjust opacity with camera direction to reduce unwanted contributions. Unclamped learned opacity is an appearance parameter rather than a physically constrained transparency value.
- **Hardware trade-offs:** Eliminating sorting reduces work and storage, but weight evaluation and normalization add overhead. A fragment pipeline using hardware blending may lack access to accumulated opacity and thus cannot readily terminate saturated pixels early.
- **Approximation versus sampling:** [[Stochastic Transparency]] uses randomized opaque coverage and trades sample count against noise. Learned weighted blending is deterministic but can retain occlusion errors, such as apparent transparency of dark foreground objects.

## Important Papers

- [[Sort-Free Gaussian Splatting via Weighted Sum Rendering]]: learns depth weights and view-dependent opacity for sort-free mobile Gaussian rendering; its ablations show that both learning and opacity parameterization matter for fidelity.
- McGuire and Bavoil (2013), "Weighted Blended Order-Independent Transparency": the weighted transparency approach that motivates GS-WSR.

## Related Concepts

- [[3D Gaussian Splatting]]
- [[Stochastic Transparency]]
- Order-independent transparency
- Differentiable rendering
- Alpha compositing
