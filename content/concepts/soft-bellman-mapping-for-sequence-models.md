---
title: Soft Bellman Mapping for Sequence Models
type: concept
tags:
  - energy-based-models
  - language-models
  - reinforcement-learning
---

## Overview

For finite sequences with deterministic prefix extension, a globally normalized energy-based distribution can be represented by autoregressive logits combining immediate rewards with soft continuation values.

## Key Ideas

Let $r(s,a)$ reward appending token $a$ to prefix $s$, and define $V_q(s)=\log\sum_a\exp q(s,a)$. For nonterminal actions,

$$
q(s,a)=r(s,a)+V_q(s\oplus a).
$$

EOS has no continuation value. Consistent finite-horizon terminal conditions make backward recursion well-defined; subtracting the successor value recovers the reward. Products of normalized token probabilities telescope to the globally normalized sequence probability.

The mapping is between specified reward and logit functions. Probability distributions do not uniquely identify raw logits because normalization permits additive offsets.

Exact computation on the prefix tree can require exponentially many states. Likelihood training can learn continuation-aware logits implicitly, but the representation result does not guarantee efficient learning. Uniform logit error $\varepsilon$ gives a sequence KL bound $2T\varepsilon$ for maximum length $T$. Small KL does not conversely require small logit error, especially for sharply concentrated distributions.

## Important Papers

- [[papers/autoregressive-language-models-are-secretly-energy-based-models|Autoregressive Language Models are Secretly Energy-Based Models]]: derives the mapping, supervised optimum equivalence, and approximation bounds.

## Related Concepts

- [[concepts/maximum-entropy-rl-for-posterior-sampling|Maximum-Entropy RL for Posterior Sampling]]: reward-plus-entropy optimization targets normalized exponential reward distributions.
