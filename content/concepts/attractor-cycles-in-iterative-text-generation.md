---
title: Attractor Cycles in Iterative Text Generation
type: concept
tags:
  - large-language-models
  - dynamical-systems
  - paraphrasing
---

## Overview

Repeatedly applying a language-model transformation to its own output can produce recurring textual forms. An approximate cycle of period two means that outputs resemble those two steps earlier while alternating between distinct forms.

## Key Ideas

- Lag-specific edit distances reveal recurrence that single-output quality metrics miss. High lag-two similarity alone also includes fixed points and must be interpreted alongside adjacent-step distances.
- Falling forward and reverse conditional perplexity suggests increasingly predictable transitions in both directions. This is empirical evidence of concentration, not a general convergence theorem.
- Sampling and candidate selection form part of the transition rule. Choosing more surprising candidates can increase variation at a cost to meaning preservation.
- Adding history can change the apparent cycle period rather than remove recurrence. Finite stochastic trajectories need not be exact deterministic limit cycles.

## Important Papers

- [[papers/unveiling-attractor-cycles-in-large-language-models-a-dynamical-systems-view-of-successive-paraphrasing|Unveiling Attractor Cycles in Large Language Models]] reports approximate two-step recurrence during successive paraphrasing and evaluates interventions.

## Related Concepts

- [[concepts/cultural-attractors|Cultural Attractors]]: attraction in measured content properties need not entail textual cycles.
- [[concepts/markovian-generation-chains|Markovian Generation Chains]]: describes repeated output-to-input transformations through transition dynamics.
