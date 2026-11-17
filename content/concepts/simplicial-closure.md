---
title: Simplicial Closure
type: concept
definition: "Simplicial closure is the first joint appearance of a previously unobserved group of nodes within a shared interaction, potentially following earlier interactions among its subsets."
tags:
  - higher-order-networks
  - link-prediction
---

## Overview

Simplicial closure describes the emergence of joint group participation in temporal interaction data. Three people may already have met in every pair yet never have met together. Their first shared event closes this open triangle, even though the unweighted pairwise projection gains no edge.

## Key Ideas

- **Event membership matters.** A triple closes when all its members appear in one event, even if the event includes other participants.
- **Closure and density differ.** An open triangle already contains every pairwise edge. More general open configurations can lack edges before joint participation occurs.
- **Subset history supplies predictors.** Repeated pairwise participation can predict triple closure; histories of triple participation can inform four-node closure.
- **Prediction needs a candidate set.** Ranking open triangles is tractable but evaluates a narrower problem than forecasting all unseen groups. Rare positives motivate precision–recall evaluation with explicit prevalence baselines.
- **Two meanings of closure must be separated.** Temporal simplicial closure is an observed event. Downward closure of an abstract simplicial complex is a mathematical requirement that every face is included, not evidence of separately observed subgroup events.

## Important Papers

- [[papers/simplicial-closure-and-higher-order-link-prediction|Simplicial closure and higher-order link prediction]] analyzes 19 datasets and introduces open-triangle prediction, finding useful local tie-strength signals and domain-dependent tradeoffs with density.

## Related Concepts

- [[concepts/hypergraphs|Hypergraphs]] retain the group memberships needed to distinguish joint events from projected cliques.
