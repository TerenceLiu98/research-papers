---
title: Thinking with Images
type: concept
aliases:
  - Visual Tool-Interleaved Reasoning
tags:
  - multimodal-reasoning
  - visual-reasoning
  - tool-use
  - chain-of-thought
---

## Overview

Thinking with Images is a multimodal reasoning pattern in which a model actively transforms or inspects visual input during intermediate reasoning rather than treating the original image as fixed context. Textual reasoning can invoke tools such as region zooming, producing an interleaved trajectory of language, tool actions, and visual cues before the model gives an answer.

## Key Ideas

- **Cue mining precedes answer reasoning.** The model first decides which image content to inspect and how to manipulate it, then reasons over the resulting cues.
- **Visual actions create a distinct failure stage.** An irrelevant crop, coarse region, missed object, or false-positive localization can corrupt later reasoning even when the language model processes the retrieved cue consistently.
- **Correct retrieval does not guarantee correct interpretation.** Perspective, spatial relations, symbols, and fine visual attributes can still be misread after a relevant region is found.
- **Training and prompting provide different routes to the capability.** Prompt-based systems coordinate external tools without parameter updates, while trained systems learn visual manipulation trajectories through supervised fine-tuning or reinforcement learning.
- **Test-time aggregation must account for coupled stages.** Treating all completed traces equally can allow repeated cue-mining errors to dominate a vote. Stage-aware reliability signals can support filtering, weighting, and early stopping, connecting the paradigm to [[concepts/adaptive-test-time-reasoning-routing|Adaptive Test-Time Reasoning Routing]].

## Important Papers

- [[papers/reliable-thinking-with-images|Reliable Thinking with Images]]: formulates noisy cue mining and noisy answer reasoning as separate failure stages and uses textual token entropy for dual-stage filtering and weighted voting.
- Zheng et al. (2025), *DeepEyes: Incentivizing "Thinking with Images" via Reinforcement Learning*: trains visual-search behavior with reinforcement learning.
- Zhang et al. (2025), *Thyme: Think Beyond Images*: develops a trained thinking-with-images system using structured visual interaction trajectories.
- Lai et al. (2025), *Mini-o3: Scaling Up Reasoning Patterns and Interaction Turns for Visual Search*: studies longer visual-search interactions.

## Related Concepts

- [[concepts/adaptive-test-time-reasoning-routing|Adaptive Test-Time Reasoning Routing]]
- [[concepts/adaptive-computation|Adaptive Computation]]
- [[concepts/latent-reasoning|Latent Reasoning]]: concerns computation in hidden or compressed representations rather than explicit visual tool interaction.
