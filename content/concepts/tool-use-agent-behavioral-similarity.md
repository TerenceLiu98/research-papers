---
title: Tool-Use Agent Behavioral Similarity
type: concept
aliases:
  - Agent Behavioral Similarity
  - Behavioral Similarity in Tool-Use Agents
tags:
  - llm-agents
  - tool-use
  - agent-evaluation
  - behavioral-similarity
---

## Overview

Tool-use agent behavioral similarity measures whether agents make comparable discretionary choices across interactive trajectories. It distinguishes actions required for task success from non-mandatory patterns such as optional verification calls, retries, response organization, and reuse of earlier tool outputs. This distinction reduces the risk of interpreting a single valid task path as evidence that agents share training signals.

## Key Ideas

- **Separate constraints from preferences.** Mandatory actions reveal little when every successful agent must take them. Optional actions provide more room to observe model-specific habits, although the mandatory set depends on the comparison pool and task definition.
- **Measure verbal and action behavior separately.** Response phrasing and tool invocation can converge independently. Response Pattern Similarity aligns messages by interaction stage; Action Graph Similarity represents tool selection, order, and data flow.
- **Retain trajectory structure.** Set overlap misses order and dependency. Sequential edges capture local execution habits, while dependency edges represent how results from earlier calls become arguments to later calls.
- **Use directional controls for attribution.** Similarity to one reference does not establish distillation. A known teacher-student intervention and a non-teacher control help distinguish teacher-specific convergence from broad capability improvement.
- **Audit measurement choices.** Agent framework prompts, model sampling temperature, judge temperature, stage taxonomies, and the model pool used to define mandatory tools can all change measured similarity.

## Important Papers

- [[papers/when-agents-look-the-same-quantifying-distillation-induced-similarity-in-tool-use-behaviors|When Agents Look the Same: Quantifying Distillation-Induced Similarity in Tool-Use Behaviors]] introduces Response Pattern Similarity and Action Graph Similarity, evaluates them across 18 models, and conducts a controlled distillation validation.

## Related Concepts

- [[concepts/knowledge-distillation|Knowledge Distillation]]: a possible source of behavioral inheritance and the intervention used for controlled validation.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: supports stage annotation, response scoring, and semantic validation of graph dependencies.
- [[concepts/long-horizon-agent-judgment|Long-Horizon Agent Judgment]]: evaluates choices whose quality is revealed later, whereas behavioral similarity compares whether agents make analogous choices.
