---
title: Multi-Agent Credit Assignment
type: concept
aliases:
  - Agent-Level Credit Assignment
  - Multi-Agent Reward Attribution
tags:
  - multi-agent-reinforcement-learning
  - credit-assignment
  - reward-design
  - shapley-values
---

## Overview

Multi-agent credit assignment determines how a shared outcome should update the policies of individual participants. A team reward establishes whether the joint trajectory succeeded, but it does not identify which agent helped, harmed, or had no effect. Agent-level attribution aims to produce more informative learning signals without replacing the global objective.

## Key Ideas

- **Broadcast and individual signals answer different questions.** A terminal team reward aligns agents with the shared task; an individual reward distinguishes their contributions. Combining them can retain system-level alignment while reducing indiscriminate updates.
- **Counterfactual removal estimates marginal contribution.** Comparing the observed outcome with an outcome after masking one agent measures that agent's effect under a particular intervention. Its validity depends on whether the counterfactual trajectory remains coherent.
- **Shapley values average over coalitions.** Classical Shapley credit averages an agent's marginal contribution across possible subsets and satisfies cooperative-game allocation properties. Single-agent ablation from one realized team is computationally cheaper but is an approximation, not the full coalition average.
- **Roles may require different attribution rules.** Execution agents can affect observable actions directly, while planners influence downstream work through decomposition and selection. A hierarchical system may therefore define planner credit from worker outcomes rather than use the same intervention for every role.
- **Process rewards complement outcome attribution.** Tool validity, formatting, or other local checks can identify execution failures that terminal success alone misses. These proxies should not be interpreted as evidence that an action was useful.
- **Better attribution can cost more.** Counterfactual evaluation adds training computation. The relevant comparison includes accuracy, training latency, inference cost, stability, and the fraction of redundant or harmful interactions.

## Important Papers

- [[papers/who-deserves-the-reward-sharp-shapley-credit-based-optimization-for-multi-agent-system|Who Deserves the Reward? SHARP: Shapley Credit-based Optimization for Multi-Agent System]] uses worker masking, planner credit derived from positive worker contributions, and group-relative normalization for tool-using planner-worker agents.
- Shapley (1953), "A Value for N-Person Games": defines the coalition-weighted allocation principle underlying Shapley credit.
- Chen et al. (2023), "Algorithms to Estimate Shapley Value Feature Attributions": reviews computational approaches for estimating Shapley allocations in a different attribution setting.

## Related Concepts

- [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]]
- [[concepts/execution-validity-rewards-for-tool-learning|Execution-Validity Rewards for Tool Learning]]
- [[concepts/shap-feature-attribution|SHAP Feature Attribution]]

