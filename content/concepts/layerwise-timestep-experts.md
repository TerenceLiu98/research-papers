---
title: Layerwise Timestep Experts
type: concept
tags:
  - flow-matching
  - efficient-inference
---

## Overview

Layerwise timestep experts divide a generative transformer's layers into groups specialized to different intervals of diffusion or flow time. A sampling step executes only the group assigned to its current timestep, reducing active depth.

## Key Ideas

- **Specialization by time:** each group learns a velocity or denoising prediction on a restricted interval, separating optimization across distant timesteps.
- **Depth as the compute budget:** K equally sized groups reduce repeated layer evaluations by a factor of K in an idealized cost model. Actual speedup also depends on caching, routing, and hardware overhead.
- **Boundary handling:** overlapping training intervals can expose adjacent experts to boundary states, while inference uses one group per step.
- **Capacity trade-off:** larger groups provide more computation per prediction but reduce acceleration. The number of active parameters is distinct from total stored parameters.

## Important Papers

- [[papers/latte-flow|LaTtE-Flow]] — uses four groups of seven layers, cached multimodal conditioning, and timestep-conditioned residual attention; reports approximately 3× faster generation than its full-depth baseline on ImageNet-256.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]] — the velocity-learning objective used in LaTtE-Flow.
- [[concepts/diffusion-models|Diffusion Models]] — another iterative generation setting in which computation can specialize by noise level.
