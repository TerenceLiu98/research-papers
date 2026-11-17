---
title: Resource-Limited Percolation Control
type: concept
aliases:
  - Budget-Constrained Percolation Control
definition: "Resource-limited percolation control allocates a finite intervention budget to alter the onset of macroscopic network connectivity."
tags:
  - percolation
  - network-control
  - phase-transitions
---

## Overview

Resource-limited percolation control treats interventions in network connectivity as costly decisions. A controller must choose both which proposed changes to prevent and when to spend its remaining resources. The threshold location and the abruptness of connectivity onset are separate outcomes.

## Key Ideas

- **Budget changes the growth process.** Rejecting candidate links can delay giant-component formation, but control ends when resources run out.
- **Rarity can guide allocation.** In the random-growth protocol of Schröder et al., rejecting a rare large merger is useful because another equally large merger is unlikely to occur immediately.
- **Exhaustion timing matters.** Under the studied constant-cost rule, exhaustion before the threshold leaves an uncontrolled interval and a continuous transition. Tuning exhaustion to the threshold maximizes delay but produces discontinuity.
- **Cost functions change conclusions.** When rejection costs increase with merged cluster size, early action becomes more attractive; the cited study reports that discontinuity then requires superlinear budget scaling.
- **Optimal delay is not equivalent to robustness.** A later threshold may coexist with a larger single-link connectivity jump. These objectives should be assessed separately.

## Important Papers

- [[papers/controlling-percolation-with-limited-resources|Controlling percolation with limited resources]]: develops a rarity-based rejection rule, finite-budget scaling analysis, and the delay–discontinuity tradeoff in random network growth.

## Related Concepts

- [[concepts/feature-enriched-percolation|Feature-Enriched Percolation]]: studies occupation decisions based on node attributes, rather than sequential spending on proposed mergers.
- [[concepts/induced-percolation|Induced Percolation]]: produces connectivity transitions through neighborhood-support pruning, a different mechanism from budget-limited control.
