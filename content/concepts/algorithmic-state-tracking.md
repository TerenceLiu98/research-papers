---
title: Algorithmic State Tracking
type: concept
tags:
  - algorithmic-reasoning
  - length-generalization
  - sequence-modeling
---

## Overview

Algorithmic state tracking asks a sequence model to maintain the result of repeated updates, such as the parity of a bit stream or the product of a sequence of permutations. Longer test sequences probe whether a learned update procedure continues to work beyond the training horizon.

## Key Ideas

- **Composition over time:** For update symbols $x_t$, the target follows $q_t=f(q_{t-1},x_t)$. Parity accumulates bits modulo two; permutation tracking composes group elements in the task's specified order.
- **Input generators matter:** S5 has 120 permutations. Sampling all permutations and sampling only identity plus single transpositions yield different learning problems, even though both accumulate a state in the same group. Success on the restricted generator does not establish success on the full generator.
- **Separate metrics:** Final-state accuracy evaluates only the last state; prefix-token accuracy averages intermediate predictions; whole-sequence accuracy requires every prefix prediction to be correct. High prefix accuracy can coexist with late failures, and a correct final state can follow incorrect intermediate predictions.
- **Extrapolation protocol:** Report training lengths, test lengths, generator, supervision, and checkpoint selection. Select checkpoints using in-distribution validation rather than test-length performance, and compare models on shared held-out sequences.
- **Capacity versus learning:** A recurrent computation path can support sequential composition, but its availability does not guarantee that optimization learns a general update rule. Perfect training-length accuracy can coexist with poor extrapolation.

## Important Papers

- [[papers/recurrent-looped-transformer|Recurrent Looped Transformer]] reports strong parity and swap-based S5 extrapolation with temporal feedback, but near-chance standard S5 performance. Its depth and feedback-interval ablations show that different state-tracking tasks need different recurrent computation.

## Related Concepts

- [[concepts/cross-token-hidden-state-recurrence|Cross-Token Hidden-State Recurrence]]: passes completed hidden computations between tokens to implement repeated learned updates.
