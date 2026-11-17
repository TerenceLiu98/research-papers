---
title: Hybrid Structural Methods for Mean Field Games
type: concept
aliases:
  - Hybrid Structural Methods
  - Structural Policy Gradient
definition: Methods for mean-field games that integrate known individual state and action dynamics while sampling common noise to evaluate and improve policies.
tags:
  - mean-field-games
  - reinforcement-learning
---

## Overview

Hybrid structural methods exploit known individual transition dynamics to reduce policy-evaluation variance while sampling aggregate common shocks. They occupy an intermediate position between exact dynamic programming over aggregate uncertainty and fully sample-based reinforcement learning.

## Key Ideas

- Analytic expectations replace individual trajectory sampling, but common-noise uncertainty remains sampled.
- Population evolution and individual best-response optimization have different roles: stopping gradients through population updates preserves the unilateral-response interpretation rather than optimizing collective welfare.
- Partial observability generally requires distributions over private histories. Shared public-history recurrence avoids this expansion by using a common embedding alongside each individual's current state. Preserving optimality additionally requires public-history informational sufficiency.
- Tractability depends on manageable individual state/action spaces and usable transition structure; functional sparse transitions avoid dense transition matrices.

## Important Papers

- [[papers/recurrent-structural-policy-gradient-for-partially-observable-mean-field-games|Recurrent Structural Policy Gradient for Partially Observable Mean Field Games]]: extends structural policy gradients with shared public-history recurrence and introduces MFAX; reports faster convergence than model-free baselines without proving Nash convergence.
- Yang et al. (2025), *Structural reinforcement learning for heterogeneous agent macroeconomics*: the structural policy gradient predecessor identified by the RSPG manuscript.

## Related Concepts

- [[concepts/graphon-mean-field-games|Graphon Mean Field Games]]: models network heterogeneity in population interactions; this is a distinct modeling axis from analytic versus sampled policy evaluation.
