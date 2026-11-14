---
title: Markovian Generation Chains
type: concept
aliases:
  - Inference-Time Text Reprocessing
tags:
  - large-language-models
  - markov-chains
  - iterative-generation
---

## Overview

A Markovian generation chain repeatedly transforms text using a model call conditioned only on the current text and task prompt. Under a fixed model, prompt, and decoding setup, complete output strings are states of a time-homogeneous Markov process. Examples include repeated paraphrasing and round-trip translation.

## Key Ideas

- The state is a sentence or passage, rather than the next token. The transition kernel represents the distribution over complete next outputs.
- Round-trip translation composes two directional kernels. Alternating prompts can be represented by a time-varying kernel or by adding schedule phase to the state.
- Greedy decoding often produces fixed points or short cycles; sampling can sustain novelty over longer observed horizons. A repeat in a stochastic trajectory does not establish permanent confinement.
- Exact recurrence, surface diversity, and semantic drift measure different properties. Many distinct strings can convey similar meanings, while meaning can change despite instructions to preserve it.
- Entropy need not decrease under a general stochastic kernel. KL contraction under a common kernel does not guarantee a unique stationary limit.
- Finite-horizon novelty cannot establish infinite-horizon divergence, and core-plus-tail kernel estimates may poorly predict future occupancy.

## Important Papers

- [[papers/markovian-generation-chains-in-large-language-models|Markovian Generation Chains in Large Language Models]] formalizes the process and examines rephrasing, translation, recurrence, and approximate kernel estimation.

## Related Concepts

- [[concepts/regurgitative-training|Regurgitative Training]] concerns learning from generated data; Markovian generation chains can occur with model parameters held fixed.
