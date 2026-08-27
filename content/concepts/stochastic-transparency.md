---
title: Stochastic Transparency
type: concept
tags:
  - stochastic-rendering
  - transparency
  - monte-carlo-rendering
  - gpu-rendering
---

## Overview

Stochastic transparency replaces deterministic alpha blending with randomized opaque coverage. A sample survives with a probability determined by the transparent primitive's opacity, allowing an ordinary depth buffer to resolve visibility without strictly sorting and compositing every transparent fragment. Individual frames are noisy, while supersampling or temporal accumulation makes the average converge toward the intended transparent appearance.

## Key Ideas

- **Opacity as coverage probability:** A semitransparent contribution is represented by the probability that an opaque sample covers a pixel or subpixel.
- **Depth-buffer visibility:** Surviving samples use conventional opaque depth tests, avoiding the sequential depth-ordered blending required by standard transparency.
- **Independent parallel work:** Random trials can be generated independently, which maps well to massively parallel GPU execution.
- **Noise-quality trade-off:** More spatial or temporal samples reduce variance but require additional rendering work. Reprojection can reuse history during motion, although disocclusion and inaccurate correspondence may produce ghosting.
- **Sampling formulation matters:** A renderer that samples points directly must account for multiple samples landing on the same pixel. [[Gaussian Point Splating]] models these collisions with a Poisson point process and modifies both the expected point count and spatial density to preserve the target coverage probability.

## Important Papers

- Enderton, Sintorn, Shirley, and Luebke (2010), "Stochastic Transparency."
- [[Gaussian Point Splating]]
- Kheradmand et al. (2025), "StochasticSplats: Stochastic Rasterization for Sorting-Free 3D Gaussian Splating."
- Sun et al. (2025), "Stochastic Ray Tracing of Transparent 3D Gaussians."

## Related Concepts

- [[3D Gaussian Splatting]]
- Monte Carlo rendering
- Alpha compositing
- Order-independent transparency
- Temporal accumulation
- Poisson point processes
