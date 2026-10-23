---
title: Neural Combinatorial Optimization
type: concept
aliases:
  - NCO
tags:
  - combinatorial-optimization
  - reinforcement-learning
  - neural-networks
---

## Overview

Neural combinatorial optimization uses neural networks to represent policies or solution constructors for discrete optimization problems. Reinforcement learning is particularly useful when optimal solutions are too expensive to generate as supervision: a policy can instead improve from objective values observed on its own candidate solutions.

## Key Ideas

- Sequence models and attention can encode problem instances and select elements or actions during solution construction.
- A combinatorial problem can be formulated as a Markov decision process whose rewards reflect solution quality, allowing policy-gradient or actor-critic training.
- Learned construction policies amortize optimization cost across instances: training is expensive, but inference can avoid starting a search from scratch.
- Generalization depends on the state representation and architecture. Encoding every item jointly can make memory grow rapidly and can bind a model to the instance sizes seen during training.
- Structured decisions may need explicit factorization when one step contains mutually dependent sub-actions rather than a single selection.
- Unsupervised methods can replace labeled solutions with a known energy function. [[papers/a-diffusion-model-framework-for-unsupervised-neural-combinatorial-optimization|DiffUCO]] trains a multi-step discrete latent-variable model through a joint reverse-KL upper bound, trading the exact likelihoods of mean-field or autoregressive models for tractable complete-path probabilities.

## Important Papers

- Bello et al. (2016), "Neural Combinatorial Optimization with Reinforcement Learning": applies policy learning to classical combinatorial optimization.
- Vinyals, Fortunato, and Jaitly (2015), "Pointer Networks": introduces an attention mechanism that points to positions in an input sequence.
- Kool, van Hoof, and Welling (2019), "Attention, Learn to Solve Routing Problems!": uses attention and reinforcement learning for routing.
- [[papers/one-model-packs-thousands-of-items-with-recurrent-conditional-query-learning|One Model Packs Thousands of Items with Recurrent Conditional Query Learning]] combines recurrent state encoding with sequential conditional queries for packing.
- [[papers/a-diffusion-model-framework-for-unsupervised-neural-combinatorial-optimization|A Diffusion Model Framework for Unsupervised Neural Combinatorial Optimization]] applies data-free discrete diffusion to five graph optimization problems.

## Related Concepts

- [[concepts/strip-packing|Strip Packing]]: a geometric optimization domain with dependent selection, rotation, and positioning decisions.
- [[concepts/conditional-query-action-decomposition|Conditional-Query Action Decomposition]]: a way to factor mutually conditioned actions.
- [[concepts/discrete-diffusion-models|Discrete Diffusion Models]]: iterative categorical generators that can refine all solution variables in parallel.
