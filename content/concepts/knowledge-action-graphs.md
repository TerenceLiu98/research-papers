---
title: Knowledge-Action Graphs
type: concept
aliases:
  - Knowledge-Action Graph
  - KAG
tags:
  - llm-agents
  - long-horizon-reasoning
  - tool-use
  - process-supervision
---

## Overview

A knowledge-action graph represents not only domain facts but also the process by which an agent acquires evidence, takes actions, observes results, satisfies constraints, encounters failures, and verifies progress. It turns grounded interaction traces into linked process supervision for training long-horizon agents.

## Key Ideas

- **Four typed components organize interaction.** A domain graph $\mathcal{G}_d=(\mathcal{C}_d,\mathcal{A}_d,\mathcal{O}_d,\mathcal{V}_d)$ contains contextual resources, available actions, resulting observations, and verifiers.
- **Action records preserve provenance.** Each step links its state and consulted evidence to an action, observation, and optional verifier outcome. Edges can encode support, dependency, production, verification, and action transitions.
- **Failures are useful supervision.** Retaining failed, revised, and successful paths exposes recovery behavior and enables credit assignment beyond the final answer.
- **Self-play can expand the graph.** A proposer samples graph regions to construct constrained tasks, a solver interacts with retrieval or execution tools, and a verifier accepts trajectories only when their result and process meet specified checks.
- **Domain instantiations share a schema.** Search graphs can encode hyperlink transitions and supporting passages, while engineering graphs can encode code edits, executions, logs, metrics, and submission validity.
- **A KAG differs from a conventional knowledge graph.** Entity-relation facts are only part of the structure; the defining content is the evidence-backed process through which an answer or artifact is produced and checked.

## Important Papers

- [[papers/scaling-the-horizon-not-the-parameters-reaching-trillion-parameter-performance-with-a-35b-agent|Scaling the Horizon, Not the Parameters: Reaching Trillion-Parameter Performance with a 35B Agent]] uses knowledge-action graphs to generate average 45K-token trajectories across search, engineering, science, instruction following, and tool-use domains.
- Cao et al. (2026), "Agents-K1: Towards Agent-native Knowledge Orchestration," is cited as motivation for the representation.

## Related Concepts

- [[concepts/environment-grounded-agent-memory|Environment-Grounded Agent Memory]]: retains lessons from observed outcomes for future agent decisions.
- [[concepts/long-horizon-agent-judgment|Long-Horizon Agent Judgment]]: evaluates choices whose consequences become clear only later in a trajectory.
- [[concepts/domain-routed-on-policy-distillation|Domain-Routed On-Policy Distillation]]: transfers policies learned from domain-specific trajectory data into one student.

