---
title: "Structured Complex Temporal Events"
type: concept
aliases:
  - SCTc-TE
  - Structured, Complex, and Time-complete Temporal Events
tags:
  - complex-events
  - temporal-knowledge-graphs
  - event-forecasting
---

## Overview

A structured complex temporal event groups related atomic events while retaining their actors, relation types, and timestamps. In the SCTc-TE formulation, an atomic event is $(s,r,o,t,c)$, where $c$ identifies the complex event. Each complex event becomes a chronological sequence of relational graphs, supporting forecasts conditioned on both its own history and a broader event graph.

## Key Ideas

- **Structure and grouping serve different purposes.** Subject-relation-object triples encode interactions; complex-event membership identifies an evolving situation that may involve many actors and interactions.
- **Time completeness is representational.** Each atomic event receives an absolute timestamp instead of relying solely on pairwise before/after relations. This does not guarantee complete observation, precise occurrence times, or correct extraction.
- **Local and global histories are complementary.** Local graphs focus on the queried situation, while the global graph supplies background events and interactions outside it. LoGo encodes these histories separately and adds representations before decoding.
- **Query fields define the forecasting claim.** Ranking the missing object in $(s,r,?,t+1,c)$ assumes the subject, relation, timestamp, and group are already supplied. It is a narrower problem than predicting which events will occur without those conditions.
- **Construction is part of measurement.** Temporal clustering, relation ontologies, entity merging, and source filtering determine what the graph represents. Outliers can remain useful as global context even when excluded from complex-event targets.
- **Predictive and extraction evaluations differ.** Better ranking against extracted labels does not validate those labels as real-world events. Extraction precision, event coverage, and forecasting accuracy need separate assessment.

## Important Papers

- [[papers/structured-complex-and-time-complete-temporal-event-forecasting|Structured, Complex and Time-complete Temporal Event Forecasting]]: defines SCTc-TE, builds MidEast-TE and GDELT-TE, and evaluates local/global context fusion with LoGo. Reported gains coexist with low model-judged extraction precision and inconsistent dataset and result totals.
- Li et al. (2021), "The future is not one-dimensional: Complex event schema induction by graph modeling for event prediction": the LoGo paper's cited contrast with schema-guided complex-event representations.

## Related Concepts

- [[concepts/ontology-constrained-relation-extraction|Ontology-Constrained Relation Extraction]]: an ontology determines which event relations can be recorded.
- [[concepts/protest-event-analysis|Protest Event Analysis]]: illustrates why documentary coverage and event identity must be distinguished from the underlying political activity.
