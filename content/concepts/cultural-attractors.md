---
title: Cultural Attractors
type: concept
tags:
  - cultural-evolution
  - multi-turn-evaluation
  - large-language-models
---

## Overview

Cultural attractors describe tendencies for repeatedly transmitted information to move toward particular forms or properties from diverse starting points. Culture here denotes socially transmitted information. In LLM transmission experiments, attractors describe transformations of generated content while model parameters remain fixed.

## Key Ideas

- **Transmission chains isolate accumulation.** Each participant transforms the previous participant's output, allowing small directional biases to compound.
- **Position and strength differ.** Position describes where a measured property tends to settle; strength describes how strongly dependence on its initial value is reduced.
- **Operational definitions matter.** Perez and colleagues fit a block-level map $y=I+sx$, whose fixed point is $I/(1-s)$ for $|s|<1$. Their strength statistic is $1-s$. Its advertised [0,1] range requires nonnegative slopes; for negative slopes, convergence is oscillatory and governed by $|s|$.
- **Attraction depends on context.** Task constraints, model identity, sampling, and tuning can alter dynamics. Convergence of one scalar property does not imply identical texts or convergence of every semantic feature.
- **Finite-chain estimates need validation.** A regression-derived equilibrium extrapolates beyond observed transmissions and can conceal multiple modes.

## Important Papers

- [[papers/when-llms-play-the-telephone-game|When LLMs Play the Telephone Game]] operationalizes attractor position and strength for toxicity, positivity, difficulty, and length across frozen-model transmission chains.
- Buskell (2017), “What are cultural attractors?”, is the conceptual reference discussed in that paper.

## Related Concepts

- [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]]
- [[concepts/regurgitative-training|Regurgitative Training]]: a distinct mechanism involving training on generated data.
