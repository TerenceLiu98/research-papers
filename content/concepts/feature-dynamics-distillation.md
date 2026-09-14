---
title: Feature Dynamics Distillation
type: concept
aliases:
  - FDD
tags:
  - knowledge-distillation
  - representation-learning
  - neural-odes
---

## Overview

Feature Dynamics Distillation (FDD) extends [[concepts/knowledge-distillation|Knowledge Distillation]] by matching intermediate predictions and their changes across layer depth. It views a residual transformer as a discretized dynamical system and uses teacher supervision at multiple points along that system's trajectory.

## Key Ideas

- **Shared prediction space:** Each model's LM head maps hidden states to vocabulary probabilities. FDD calls the resulting log-probability sequence its feature dynamics; it does not directly equate teacher and student hidden coordinates.
- **Trajectory matching:** KL divergence aligns prediction distributions at selected, paired teacher and student layers. This provides supervision beyond the final output.
- **Delta matching:** Differences of log probabilities between consecutive selected layers describe prediction changes. Cosine distance aligns teacher and student change directions without forcing equal magnitudes.
- **Combined objective:** Final-output KD, trajectory KL, and delta cosine losses are weighted and jointly optimized. The ODE interpretation motivates finite-depth losses; no numerical ODE solver is required in training.
- **Capacity and alignment:** Layer pairing controls how densely the student is constrained. The originating paper finds four sampled layers best in its GPT-2 ablation, with a slight decline beyond that. This is an experimental result, not a universal layer-selection rule.
- **Applicability:** Teacher internals and compatible vocabulary predictions must be available. Different hidden widths can be accommodated through separate LM heads, but incompatible vocabularies are not automatically aligned. Optional Tuned Lens-style adapters address mismatch between intermediate states and final-layer heads.

## Important Papers

- [[papers/beyond-logits-aligning-feature-dynamics-for-effective-knowledge-distillation|Beyond Logits: Aligning Feature Dynamics for Effective Knowledge Distillation]] introduces FDD and reports complementary benefits from trajectory and delta losses on instruction-following benchmarks.

## Related Concepts

- [[concepts/knowledge-distillation|Knowledge Distillation]]
- Logit lens and tuned lens: decode intermediate states into vocabulary predictions; the latter motivates optional adapters in FDD.
- Neural ordinary differential equations: the continuous-depth perspective that motivates trajectory and derivative alignment.
