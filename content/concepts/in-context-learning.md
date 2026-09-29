---
title: In-Context Learning
type: concept
aliases:
  - ICL
  - Few-Shot Learning
tags:
  - in-context-learning
  - sequence-modeling
  - language-models
  - meta-learning
---

## Overview

In-context learning is the ability of a model to infer a task, rule, or latent mapping from examples placed in its input and apply that inference to a new instance without parameter updates. The examples act as temporary task specification. Performance depends on the representation of the demonstrations, context length, task family, decoding rule, and the model's learned priors.

## Key Ideas

- In-context behavior is a test of contextual adaptation, not necessarily evidence that the model changes its weights or implements one identifiable algorithm.
- Tasks such as associative recall, reversal, stack simulation, and arithmetic relations probe different capabilities, including retrieval, dynamic indexing, context-free computation, and rule induction.
- Zero-example performance can reflect token or byte-frequency priors rather than task understanding. Accuracy should therefore be plotted as demonstrations accumulate and compared with relevant baselines.
- Synthetic or formal pretraining can produce in-context learning that transfers to held-out task instances. Self-Play Pretraining with Zero Data reports broad ICL despite training only on outputs of generated programs.
- Qualitative strategy changes and predictive uncertainty can reveal how a model moves from copying or marginal guesses toward a latent rule, but these trajectories do not by themselves establish the internal mechanism.
- Fixed synthetic baselines may learn some task families while failing to generalize across them. Broad ICL claims require multiple tasks and controls matched for compute, architecture, and token interface.

## Important Papers

- [[papers/self-play-pretraining-with-zero-data|Self-Play Pretraining with Zero Data]]: evaluates reverse-string, stack, associative-recall, sum, max, and min tasks after synthetic self-play pretraining.
- Brown et al. (2020), "Language Models are Few-Shot Learners": establishes the modern large-language-model framing of in-context learning.
- Ba et al. (2016), "Using Fast Weights to Attend to the Recent Past": an associative-recall reference used in the paper's ICL evaluation.
- Delétang et al. (2023), "Neural Networks and the Chomsky Hierarchy": supplies reverse-string and stack-style formal-language tasks.

## Related Concepts

- [[concepts/self-play-pretraining|Self-Play Pretraining]]
- [[concepts/universal-prediction|Universal Prediction]]
- [[concepts/continual-learning|Continual Learning]]
- Meta-learning
- Few-shot learning
