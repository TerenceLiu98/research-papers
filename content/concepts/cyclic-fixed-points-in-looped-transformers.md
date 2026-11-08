---
title: Cyclic Fixed Points in Looped Transformers
type: concept
aliases:
  - Cyclic Fixed-Point Dynamics
  - Layer-Specific Recurrent Fixed Points
tags:
  - looped-transformers
  - recurrent-depth
  - dynamical-systems
  - attention-dynamics
---

## Overview

A cyclic fixed point in a looped Transformer is a stable sequence of layer-specific hidden states produced by repeatedly applying a multi-layer block. The complete block returns to the same block-boundary state, while intermediate layers can converge to different states. The limiting behavior is therefore a closed trajectory through latent space rather than necessarily one state shared by every layer.

## Key Ideas

- **Block convergence permits an internal cycle.** If a composition of $k$ layers maps a state back to itself, every cyclic permutation of those layers also has a corresponding fixed point. Applying the individual layers traces the $k$ states of the cycle.
- **A common fixed point is a special case.** All layers converge to one state only when their individual updates vanish at that state. This can occur as a degenerate limit but is not implied by convergence of the full block.
- **Successive similarity is insufficient.** Very small differences between adjacent recurrences can coexist with slow drift, orbits, or other non-convergent behavior. Convergence must be checked against a stable reference over a longer horizon.
- **State convergence constrains attention.** With shared query/key weights and bounded inputs, a layer's attention matrix changes at most proportionally to the change in its recurrent hidden state. Stable layer states therefore imply stable attention patterns.
- **Architecture controls the limit.** Input injection can promote convergence by reintroducing a fixed reference on every recurrence. Normalization placement can change whether states converge, collapse to one common point, or continue drifting.
- **The limit matters outside the training horizon.** When each layer reaches a stable state, the recurrent block can continue replaying its learned attention behavior at additional test-time recurrences. A non-convergent model may instead drift away from its train-time stages even when adjacent updates remain small.
- **Fixed-point stability is not automatically task quality.** A stable cycle describes internal dynamics. It does not by itself prove better reasoning, useful extra computation, or optimal performance at arbitrary recurrence depth.

## Important Papers

- [[papers/a-mechanistic-analysis-of-looped-reasoning-language-models|A Mechanistic Analysis of Looped Reasoning Language Models]] formalizes cyclic fixed points, connects hidden-state convergence to stable attention, and compares convergent and drifting looped language models.
- Bai, Kolter, and Koltun (2019), "Deep Equilibrium Models," treats implicit neural computation through equilibrium states.
- Anil et al. (2022), "Path Independent Equilibrium Models Can Better Exploit Test-Time Computation," studies stable iterative computation and input injection.
- Geiping et al. (2025), "Scaling Up Test-Time Compute with Latent Reasoning," reports fixed points, orbits, and sliders in a recurrent-depth language model.

## Related Concepts

- [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]]
- [[concepts/transformer-representation-trajectory-geometry|Transformer Representation Trajectory Geometry]]
- [[concepts/latent-reasoning|Latent Reasoning]]
- [[concepts/adaptive-computation|Adaptive Computation]]
- [[concepts/mechanistic-interpretability|Mechanistic Interpretability]]
