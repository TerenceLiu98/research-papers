---
title: Temporal Causal Reasoning
type: concept
definition: "Temporal causal reasoning combines temporal constraints with directed event dependencies to infer how states evolve and how hypothetical changes propagate."
aliases:
  - Temporal-Causal Reasoning
tags:
  - temporal-reasoning
  - causal-reasoning
---

## Overview

Temporal causal reasoning combines event times, durations, concurrent states, and directed dependencies. It supports questions about delayed consequences and hypothetical changes while distinguishing chronological precedence from causal influence.

## Key Ideas

- Temporal constraints locate events and bound intervals; dependency relations describe why one event affects another.
- Counterfactual narrative questions require explicit rules for propagating a changed premise. Deleting a graph edge or blocking attention is a computational operation whose causal interpretation needs separate justification.
- External event graphs offer inspectable state and symbolic edits. Learned event representations can instead supply temporal priors within model computation.
- Retaining original text alongside compressed event structure can preserve details and mitigate extraction errors.
- Evaluation should separate interval localization, dependency reconstruction, and rule application: a better-organized trace can still yield an incorrect deduction.

## Important Papers

- [[papers/from-document-layout-to-causal-topology-an-end-to-end-architecture-for-temporal-causal-reasoning|From Document Layout to Causal Topology]] compares external graph intervention with learned attention-based event representations and introduces TempoCausal-Bench.

## Related Concepts

- [[concepts/explicit-belief-state-control-for-abductive-reasoning|Explicit Belief-State Control for Abductive Reasoning]] also externalizes reasoning state, but focuses on evidence-driven hypothesis revision.
