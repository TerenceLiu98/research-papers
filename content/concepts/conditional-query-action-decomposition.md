---
title: Conditional-Query Action Decomposition
type: concept
aliases:
  - Conditional Query Learning
tags:
  - reinforcement-learning
  - attention
  - structured-action-spaces
---

## Overview

Conditional-query action decomposition represents a structured action as an ordered sequence of sub-actions. Each sub-action has its own decoder, and the outputs already chosen are embedded into the attention query for the next decoder. This preserves dependencies among decisions without enumerating their Cartesian-product action space.

## Key Ideas

- **Sequential factorization:** The joint policy is expressed as a product of conditional sub-action policies rather than one categorical distribution over every combination.
- **Information transfer:** A later decoder queries shared state representations using an embedding of earlier outputs, making those choices directly available to subsequent decisions.
- **Smaller output spaces:** Each forward stage predicts only its corresponding sub-action, which can reduce the number of alternatives that a decoder must score.
- **State sufficiency:** Passing earlier choices into later stages is intended to close the information gap created when a compound action is split into multiple decisions.
- **Domain structure:** The order of sub-actions must follow the problem's dependencies; in packing, selection precedes rotation, which precedes positioning.

## Important Papers

- [[papers/one-model-packs-thousands-of-items-with-recurrent-conditional-query-learning|One Model Packs Thousands of Items with Recurrent Conditional Query Learning]] applies conditional queries to box selection, rotation, and positioning and compares against an ablation without them.
- Masson, Ranchod, and Konidaris (2016), "Reinforcement Learning with Parameterized Actions": provides background on policies with discrete actions and associated parameters.
- Wei, Wicke, and Luke (2018), "Hierarchical Approaches for Reinforcement Learning in Parameterized Action Space": conditions parameter policies on discrete action outputs.

## Related Concepts

- [[concepts/neural-combinatorial-optimization|Neural Combinatorial Optimization]]: the broader learned-optimization setting.
- [[concepts/strip-packing|Strip Packing]]: the application whose action is decomposed into selection, rotation, and position.
