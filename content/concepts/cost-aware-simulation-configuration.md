---
title: Cost-Aware Simulation Configuration
type: concept
tags:
  - simulation-optimization
  - scientific-agents
  - surrogate-modeling
---

## Overview

Cost-aware simulation configuration selects numerical settings, such as grid resolution, to satisfy accuracy requirements while controlling computational expense. The search itself can incur substantial cost, so evaluating only the final configuration can obscure the true expense of a tuning procedure.

## Key Ideas

- **Configuration-dependent cost:** Refinement changes the work required by a solver; counting simulator calls alone can miss large cost differences.
- **Single versus sequential decisions:** A single choice pays for one execution; iterative search should account for every evaluated configuration.
- **Metric surrogates:** Predicting error and cost can support candidate ranking without reproducing complete physical fields. Actual solver evaluations remain the basis for verifying feasibility.
- **Soft feedback:** Graded error signals can guide search when binary success provides little information. Better information does not by itself guarantee better decisions by a fixed agent.
- **Separate reward and reliability:** High inverse-cost rewards on a few cheap successes can coexist with poor overall success rates. Report both.

## Important Papers

- [[casco-agent-cost-aware-simulation-configuration-via-surrogate-guided-agents|CASCO-Agent]] combines LLM proposals with scalar surrogate feedback and evaluates spatial-resolution tuning in three PDE environments.

## Related Concepts

- [[neural-operators]] — learn mappings between functions for physical modeling; scalar metric surrogates address a narrower decision task.
