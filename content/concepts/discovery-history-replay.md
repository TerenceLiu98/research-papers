---
title: Discovery History Replay
type: concept
aliases:
  - Discovery Replay Simulator
  - Replay-Based Meta-Exploration
tags:
  - llm-agents
  - scientific-discovery
  - experience-replay
  - exploration-policy
---

## Overview

Discovery history replay treats a completed, structured search history as an empirical simulator for evaluating alternative exploration policies. Instead of rerunning costly candidate generation and evaluation, a policy navigates recorded branches and receives their stored outcomes. The simulator is grounded in actual executions but limited to the portion of the search space already observed.

## Key Ideas

- A discovery tree records parent-child attempts, workspace states, artifacts, evaluation diagnostics, scores, and execution order. Replay reveals this information incrementally rather than exposing the full tree to the policy.
- A shared online/replay action interface lets an exploration policy choose where to continue, when to open a new branch, which requests to batch, and when to stop.
- Recorded outcomes make off-policy comparison cheap, but only within historical support. Replay cannot determine what an unrecorded action would have produced or reproduce online stochasticity at a visited state.
- A replay objective can balance attained solution quality against represented execution work and decision-round parallelism. Its coefficients define which exploration behavior is preferred.
- Redeploying an improved policy produces another real discovery tree, expanding the simulator pool and enabling a bounded [[concepts/recursive-self-improvement|recursive improvement]] loop at the exploration layer.
- This differs from using history as prompt context or distilled guidance: the history remains an interactive environment against which complete exploration policies are evaluated.

## Important Papers

- [[papers/dream-rsi-recursive-self-improvement-through-evolving-worlds|Dream-RSI: Recursive Self-Improvement through Evolving Worlds]]: formalizes discovery-tree replay, revises executable exploration policies from replay feedback, and redeploys selected policies across eight scientific and engineering discovery tasks.
- Ha and Schmidhuber (2018), "World Models," and Hafner et al. (2019-2025), the Dreamer series: provide the model-based control analogy of improving behavior through imagined trajectories, although discovery replay uses stored outcomes rather than a learned dynamics model.

## Related Concepts

- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]
- [[concepts/world-models|World Models]]
- [[concepts/meta-evolution|Meta-Evolution]]
- [[concepts/experience-guided-program-evolution|Experience-Guided Program Evolution]]
