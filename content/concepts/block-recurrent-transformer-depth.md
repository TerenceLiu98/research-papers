---
title: Block-Recurrent Transformer Depth
type: concept
aliases:
  - Block-Recurrent Hypothesis
  - BRH
tags:
  - transformers
  - recurrent-depth
  - parameter-sharing
  - model-compression
---

## Overview

Block-recurrent Transformer depth is the hypothesis that a trained Transformer's layers form a small number of contiguous computational phases, each of which can be approximated by repeatedly applying one parameter-tied block. It is stronger than observing similar activations across layers: the shared block must reproduce the teacher's intermediate trajectory and not merely its final output.

## Key Ideas

- **Phases before recurrence:** A layer similarity matrix can suggest contiguous regimes, but representational similarity is only a candidate signal. Functional recurrence requires a shared update to work throughout a phase.
- **Trajectory fidelity:** Matching all intermediate activations constrains where computation occurs and limits solutions that reproduce only the terminal prediction.
- **Parameters for iterations:** Reusing $k$ blocks over $L$ steps reduces distinct parameter sets while preserving roughly $L$ block evaluations. This is parameter compression, not automatically a reduction in inference FLOPs or latency.
- **Partition dependence:** Phase boundaries and the chosen value of $k$ affect approximation quality. Contiguity encodes an ordered program; arbitrarily grouping similar layers would define a different hypothesis.
- **Closed-loop training:** A recurrent surrogate must handle its own rollout errors. Teacher forcing can initialize one-step prediction, but autoregressive training is needed to reduce train-test mismatch.
- **Autonomy matters:** Supplying a depth index or depth-dependent scaling improves expressivity but makes the repeated update non-autonomous. Claims about one fixed dynamical map should distinguish this case.
- **Evidence levels:** Layer similarity, successful recurrent distillation, within-phase interventions, and exact parameter tying provide progressively stronger evidence. None alone proves that the original untied weights are literally identical.

## Important Papers

- [[papers/block-recurrent-dynamics-in-vits|Block-Recurrent Dynamics in ViTs]] formalizes BRH and trains Raptor surrogates that approximate DINOv2 with two to four recurrent phases.
- Dehghani et al. (2018), "Universal Transformers," applies a shared transition recurrently across depth as an architectural design.
- Schwarzschild et al. (2021), "The Uncanny Similarity of Recurrence and Depth," examines relationships between recurrent and feedforward computation.
- Nguyen, Raghu, and Kornblith (2022), "On the Origins of the Block Structure Phenomenon in Neural Network Representations," studies block patterns in layerwise representation similarity.

## Related Concepts

- [[concepts/dynamical-interpretability|Dynamical Interpretability]]: uses the recurrent-depth view to analyze representations as evolving states.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: supplies intermediate teacher states for fitting recurrent surrogates.
- [[concepts/feature-dynamics-distillation|Feature Dynamics Distillation]]: aligns student and teacher behavior across layer trajectories without requiring phase-wise parameter tying.
- [[concepts/adaptive-computation|Adaptive Computation]]: also trades repeated processing for depth, but may vary the number of iterations by input or stopping rule.
