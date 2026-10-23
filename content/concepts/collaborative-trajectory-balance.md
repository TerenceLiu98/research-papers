---
title: Collaborative Trajectory Balance
type: concept
aliases:
  - CTB
tags:
  - gflownets
  - llm-agents
  - multi-agent-systems
  - trajectory-balance
---

## Overview

Collaborative Trajectory Balance applies a GFlowNet trajectory-balance objective to the construction of multi-agent teams. Its scored outcome is a canonical team rather than a particular action sequence, so different legal construction orders share one terminal reward. At exact balance, the conditional probability of a valid team is proportional to its tempered positive reward.

## Key Ideas

- **Canonicalize outcomes.** Construction orders that produce the same agents, protocol-labeled edges, permissions, and output rule terminate at one team identity. This prevents teams with more serializations from receiving extra probability.
- **Normalize both path directions.** The forward policy samples legal construction actions. A backward kernel distributes the canonical team's credit over its valid parent-action orders and must include the full incoming support.
- **Preserve diverse useful teams.** Reward-proportional sampling assigns positive mass to every positive-reward team, unlike pure expected-reward maximization, which can concentrate on a few modes.
- **Treat aborts explicitly.** When training replays only valid constructions, the reward-proportional result applies to the team distribution conditional on valid completion; the normalizer absorbs the valid-completion probability.
- **Control approximation claims.** Exact terminal sampling requires zero balance residual on the relevant paths. Uniform residual bounds imply distributional error bounds, while a small average replay loss alone needs support assumptions to provide the same guarantee.
- **Freeze reward snapshots within a batch.** If team rewards depend on accumulated outcomes, counters should be fixed during collection and updated afterward. With fixed support and reward components, increasing record counts can reduce target drift between rounds.

## Important Papers

- [[papers/collabflow-recursive-self-improvement-of-agent-collaboration|CollabFlow: Recursive Self-Improvement of Agent Collaboration]] develops CTB for canonical complete-agent teams and combines it with reliability-weighted self-improvement rounds.
- Malkin et al. (2022), "Trajectory Balance: Improved Credit Assignment in GFlowNets": provides the trajectory-balance objective on which CTB builds.
- Bengio et al. (2023), "GFlowNet Foundations": develops the broader framework for sampling structured objects in proportion to reward.

## Related Concepts

- [[concepts/maximum-entropy-rl-for-posterior-sampling|Maximum-Entropy RL for Posterior Sampling]]
- [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]]
- [[concepts/evidence-conditioned-agent-communication|Evidence-Conditioned Agent Communication]]
- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]
