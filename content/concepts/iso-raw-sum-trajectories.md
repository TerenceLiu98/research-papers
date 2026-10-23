---
title: Iso-Raw-Sum Trajectories
type: concept
aliases:
  - IRST
  - IRSTs
tags:
  - mechanistic-interpretability
  - neural-arithmetic
  - representation-geometry
---

## Overview

An Iso-Raw-Sum Trajectory (IRST) is a proposed manifold of language-model activations that preserves the column-wise raw sum in multi-operand addition while the represented carry and output digit vary. Rather than assigning each arithmetic variable to an isolated cluster, the construction threads a constant-raw-sum path through adjacent digit basins. Correct states occupy stable regions along the path; carry leakage or hallucination can place an activation near a transition between them.

## Key Ideas

- **Raw sum identifies the trajectory.** For raw sum $r_p$ and represented carry $\hat c_p$, the generated digit satisfies $\hat s_p\equiv r_p+\hat c_p\pmod{10}$. Varying the carry moves a state between output digits without changing its trajectory identity.
- **Digit basins contain carry texture.** Output identity supplies the macroscopic organization, while states inside a digit basin separate by incoming carry. This lets probes decode several related variables from the same activation.
- **Off-by-one errors are local slippages.** If the raw sum remains correct, confusing adjacent carry states moves the representation along an IRST into a neighboring digit basin. More distant and raw-sum errors need not follow this pattern.
- **Projection is insufficient evidence.** A 2D visualization can suggest a trajectory, but direct distances in the original activation space, alternative projections, and interventions are needed to test whether its ordering is genuine.
- **Task complexity increases fiber density.** Adding more operands expands the possible carry values and introduces more paths between neighboring digit basins. A 2D view can then entangle fibers that remain distinguishable in higher dimensions.
- **Geometry and causal use are separate.** Decodable trajectory structure establishes representational accessibility. Steering along a trajectory-local carry direction provides stronger evidence that the model's output uses that organization.

## Important Papers

- [[papers/the-shape-of-addition-geometric-structures-of-arithmetic-in-large-language-models|The Shape of Addition: Geometric Structures of Arithmetic in Large Language Models]] introduces IRSTs, validates their ordering in projected and native spaces, and reports trajectory-local steering across carry boundaries.

## Related Concepts

- [[concepts/noisy-carry-quantization|Noisy Carry Quantization]]
- [[concepts/transformer-representation-trajectory-geometry|Transformer Representation Trajectory Geometry]]
- [[concepts/linear-probing|Linear Probing]]
- [[concepts/fourier-features-for-neural-arithmetic|Fourier Features for Neural Arithmetic]]
- [[concepts/manifold-steering|Manifold Steering]]
