---
title: Learning-Progress Rewards
type: concept
aliases:
  - Learning Progress
  - Intrinsic Learning Progress
tags:
  - reinforcement-learning
  - intrinsic-motivation
  - curriculum-learning
  - self-play
---

## Overview

Learning-progress rewards score experience by how much it advances a learner, rather than by difficulty, novelty, or task reward alone. They can produce an adaptive curriculum: already mastered examples become uninformative, while examples that are currently unlearnable need not dominate exploration. The appropriate progress signal depends on the learner, optimization geometry, and time horizon.

## Key Ideas

- Difficulty and usefulness are different. Randomness can increase prediction loss without supplying reusable structure, so a reward based only on surprise or difficulty can select unproductive data.
- A learner-relative signal can compare the gradient induced by a candidate example with the learner's recent parameter movement. In Self-Play Pretraining with Zero Data, the absolute, AdamW-preconditioned alignment over a growing lookback window is used as the generator reward.
- The lookback window trades responsiveness for stability. A one-step signal is noisier and performs worse in the reported ablations; a longer window can capture delayed learning while allowing stale progress to be forgotten.
- Search needs retention mechanisms as well as a reward. Replay, mutation, archive diversity, and reward decay help prevent the generator from forgetting useful behaviors or collapsing onto one structural niche.
- Reward design is an empirical claim. In the paper's ablations, signed, shuffled, one-step, finite-loss-difference, and negated rewards generally perform worse than the canonical score, but the result is limited to the tested models and datasets.
- Progress signals may improve a training distribution without explaining which structures cause downstream transfer. Causal curriculum ablations remain necessary.

## Important Papers

- [[papers/self-play-pretraining-with-zero-data|Self-Play Pretraining with Zero Data]]: uses preconditioned gradient alignment as an intrinsic reward for a program generator.
- Schmidhuber (2008), "Driven by Compression Progress": frames compression progress as a source of intrinsic motivation, curiosity, and discovery.
- Schmidhuber (2012), "PowerPlay": searches continually for simple problems that remain unsolved by an increasingly general solver.
- Poesia et al. (2024), "Learning Formal Mathematics from Intrinsic Motivation": applies intrinsic motivation to self-play formal mathematics.
- Mouret and Clune (2015), "Illuminating Search Spaces by Mapping Elites": provides the quality-diversity archive pattern used for program retention in the paper.

## Related Concepts

- [[concepts/self-play-pretraining|Self-Play Pretraining]]
- [[concepts/universal-prediction|Universal Prediction]]
- [[concepts/continual-learning|Continual Learning]]
- [[concepts/distributional-reinforcement-learning|Distributional Reinforcement Learning]]
- Intrinsic motivation
- Automatic curriculum learning
