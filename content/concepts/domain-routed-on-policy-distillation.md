---
title: Domain-Routed On-Policy Distillation
type: concept
aliases:
  - Multi-Teacher Domain-Routed On-Policy Distillation
  - Salient Vocabulary Alignment
  - SVA
tags:
  - knowledge-distillation
  - on-policy-learning
  - llm-agents
  - multi-domain-learning
---

## Overview

Domain-routed on-policy distillation consolidates multiple specialist teachers into one general student by routing each training example to the teacher for its domain and supervising trajectories sampled by the student itself. It is designed for heterogeneous domains whose reasoning and interaction patterns can interfere when their data are simply mixed.

## Key Ideas

- **The student supplies the trajectory.** The teacher scores student-generated prefixes instead of generating a separate reference response, keeping supervision on the states the current student visits.
- **Hard routing preserves specialization.** Each prompt has a domain label and receives token-level guidance only from the corresponding frozen teacher. Teachers are not merged at the parameter level.
- **Interaction protocols can vary by domain.** Routing also selects finalization rules, simulated user turns, environment tools, and rollout bounds. Tool outputs and user or environment turns provide context but are masked from the loss.
- **Salient vocabulary alignment broadens token supervision.** Rather than score only the realized token, SVA selects the teacher's top-$k$ valid tokens, renormalizes teacher and student probabilities on that support, and minimizes truncated reverse KL.
- **Coverage remains an approximation diagnostic.** Because SVA does not directly constrain student mass outside the teacher-selected support, the student probability captured by that support should be monitored.
- **Domain normalization limits domination.** Averaging sample losses within each active domain before averaging across domains gives comparable weight to task families with different frequencies or loss scales.
- **Generalization trades off against specialization.** A consolidated student can become better balanced than a mixed-data SFT model without surpassing every teacher on that teacher's specialty.

## Important Papers

- [[papers/scaling-the-horizon-not-the-parameters-reaching-trillion-parameter-performance-with-a-35b-agent|Scaling the Horizon, Not the Parameters: Reaching Trillion-Parameter Performance with a 35B Agent]] introduces the domain-routed, salient-vocabulary formulation for consolidating six agentic domains.
- Lu and Thinking Machines Lab (2025), "On-Policy Distillation," provides the sampled-token formulation that this method extends.
- Fu et al. (2026), "Revisiting On-Policy Distillation: Empirical Failure Modes and Simple Fixes," studies limitations of sampled-token on-policy distillation.

## Related Concepts

- [[concepts/knowledge-distillation|Knowledge Distillation]]: the general framework for transferring behavior from teacher models to a student.
- [[concepts/knowledge-action-graphs|Knowledge-Action Graphs]]: a source of verified, domain-specific trajectories for specialist training.
- [[concepts/sparse-mixture-of-experts|Sparse Mixture of Experts]]: a complementary form of specialization inside a model rather than across external teachers.
- [[concepts/long-horizon-agent-judgment|Long-Horizon Agent Judgment]]: another setting where teacher supervision can transfer decisions whose quality is revealed later.

