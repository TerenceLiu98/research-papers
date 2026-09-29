---
title: Self-Play Pretraining
type: concept
aliases:
  - Zero-Data Pretraining
  - Adaptive Synthetic Pretraining
tags:
  - self-play
  - synthetic-pretraining
  - universal-prediction
  - curriculum-learning
---

## Overview

Self-play pretraining learns a training distribution while learning from it. A generator proposes programs, tasks, or sequences; a learner trains on their outputs; and feedback from the learner changes what the generator proposes next. In the zero-data formulation, the generator searches a universal program space rather than transforming a corpus of natural examples. The goal is to expose transferable predictive structure while leaving contingent facts to later natural-data training.

## Key Ideas

- A universal machine gives the generator a broad search space over computable data-generating processes. It does not by itself provide an effective curriculum: fixed sampling from the same space can waste most of its compute.
- The useful feedback signal is learner-relative. Programs that are already mastered provide little gradient, while random or unrelated programs may be difficult without extending reusable capabilities. Learning-progress rewards target the frontier between these cases.
- Fresh samples provide global exploration, mutations refine promising programs, and replay preserves useful behavior as the generator changes. Reward-weighted expert iteration can reduce forgetting in the generator.
- Transfer should be evaluated on held-out distributions and modalities. Better loss on generated data alone does not establish acquisition of universal structure.
- Zero natural-data training does not mean zero design choices. The programming language, execution limits, byte interface, benchmark encodings, model architecture, and reward all shape the learned curriculum.
- Self-play can serve as pre-pretraining: a checkpoint learned from synthetic programs may reduce the natural-data tokens needed to reach a target loss, even if the final advantage narrows after convergence.

## Important Papers

- [[papers/self-play-pretraining-with-zero-data|Self-Play Pretraining with Zero Data]]: learns a program distribution with reinforcement learning and evaluates zero-shot transfer across modalities.
- Grau-Moya et al. (2024), "Learning Universal Predictors": trains predictors on outputs of universal-machine programs without adapting the program distribution to the learner.
- Bloem (2025), "Universal Pre-training by Iterated Random Computation": studies transfer from iterated random computation with no natural-data pretraining.
- Hu, Petty, Shi, Merrill, and Linzen (2025), "Between Circuits and Chomsky": uses formal-language pre-pretraining to induce transferable linguistic biases.
- Papadimitriou and Jurafsky (2020), "Learning Music Helps You Read": shows cross-domain transfer from synthetic or nonlinguistic structure to language modeling.

## Related Concepts

- [[concepts/universal-prediction|Universal Prediction]]
- [[concepts/learning-progress-rewards|Learning-Progress Rewards]]
- [[concepts/meta-evolution|Meta-Evolution]]
- [[concepts/continual-learning|Continual Learning]]
- [[concepts/text-scaling-models|Text Scaling Models]]
