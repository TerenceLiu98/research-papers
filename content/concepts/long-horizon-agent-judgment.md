---
title: Long-Horizon Agent Judgment
type: concept
aliases:
  - Agent Taste
  - Taste in Long-Horizon Tasks
tags:
  - llm-agents
  - agent-evaluation
  - long-horizon-reasoning
  - decision-making
---

## Overview

Long-horizon agent judgment is the ability to choose a promising direction when the consequences of that choice will appear only later in an extended task. The choice may concern an implementation, hypothesis, experiment, or recovery strategy. The concept is operationalized by presenting an agent with a trajectory prefix and competing next directions at a decision fork, then evaluating whether it selects the direction whose later continuation produced the better observed outcome.

## Key Ideas

- **Decision forks make delayed quality testable.** A fork consists of a shared task context and trajectory prefix followed by two plausible candidate directions. Later branch outcomes provide a comparison label while remaining hidden from the evaluated model.
- **Parallel and detour forks cover different errors.** Parallel attempts expose directions an agent follows without correction; detour trajectories expose directions that an agent abandons after an observed failure. Both require evidence that the outcome difference is attributable to the decision rather than execution noise or an environment failure.
- **Hindsight is useful but not automatically causal.** A branch outcome mixes the quality of the decision with later execution and environmental conditions. Comparable prefixes, outcome-grounded filtering, and audits of label agreement are needed to support the interpretation of a fork label.
- **The time horizon is part of the difficulty.** If the deciding evidence is already in the prefix, a model can use local clues. If it appears only after a completed check or substantial later work, the judgment requires forecasting the consequences of the direction.
- **Evaluation must control presentation effects.** Two-choice judgments can change when candidate order is reversed. Scoring both orders and counting a question as correct only when both choices are correct makes position sensitivity visible, though it is stricter than single-presentation accuracy.
- **Judgment can be transferred through privileged supervision.** A teacher that sees the supported direction can generate reasoning targets for a student that sees only the decision-time context. Task-disjoint evaluation is needed to distinguish learned judgment from memorized question labels.

## Important Papers

- [[papers/the-tasteful-agent-measuring-and-improving-taste-in-long-horizon-tasks|The Tasteful Agent: Measuring and Improving Taste in Long-Horizon Tasks]] introduces Taste-Bench, mines parallel and detour forks from engineering and research trajectories, and evaluates distillation of the resulting judgment.

## Related Concepts

- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: supplies the automated preference and label-audit setting, while long-horizon judgment hides the later outcome at decision time.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: provides the teacher-to-student training framework used to transfer privileged outcome-informed reasoning.
- [[concepts/transferability-evaluation|Transferability Evaluation]]: task-disjoint splits test whether judgment learned from source tasks benefits unseen tasks.
- [[concepts/environment-grounded-agent-memory|Environment-Grounded Agent Memory]]: retains conditional lessons from execution, whereas long-horizon judgment evaluates a choice before its continuation is observed.
