---
title: Visiting Order Graphs
type: concept
aliases:
  - Visiting Order Graph
tags:
  - trajectory-extraction
  - geographic-information
  - relation-extraction
---

## Overview

A visiting order graph represents a narrated trip with two distinct relations: geographic containment and temporal transitions. Nodes represent geographic entities, or separate visits to an entity when revisits must be distinguished. Separating these relations avoids treating a city and a landmark within it as consecutive stops merely because both appear in the narrative.

## Key Ideas

- **Containment defines the hierarchy.** An inclusion edge points from a containing location to a contained location. A synthetic ROOT accommodates entities without another recorded geographic parent.
- **Transitions order siblings.** Direct visit-order edges connect entities with the same parent. Order across different geographic levels can be interpreted through inclusion edges and transitions between ancestors.
- **Mentions are evidence, not visits.** Coreference clusters can contain descriptions of actual visits, plans, views, past trips, and non-visits. Visit-status aggregation must specify how such evidence determines node eligibility.
- **Narrative order is a baseline.** Mention order often approximates travel order, but retrospective descriptions can reverse it. A graph's geographic hierarchy alone does not resolve this temporal ambiguity.
- **Exceptional cases require explicit conventions.** ATD-VSO splits repeated visits, excludes entities with unknown visit timing, and uses an overlap relation with a representative entity for intersecting locations that lack containment. The resulting graph is conditional on these annotation choices.
- **Hierarchy errors change temporal candidates.** Because transition prediction is restricted to siblings, a wrong geographic parent can invalidate otherwise sensible visit ordering. Transition accuracy with gold parents must be distinguished from complete pipeline accuracy.

## Important Papers

- [[papers/graph-structured-trajectory-extraction-from-travelogues|Graph-Structured Trajectory Extraction from Travelogues]]: introduces the representation and ATD-VSO. Fine-tuned inclusion prediction reaches 0.514 F1, while transition prediction with gold upstream annotations is close to a strong mention-order heuristic.

## Related Concepts

- [[concepts/ontology-constrained-relation-extraction|Ontology-Constrained Relation Extraction]]: typed edges and endpoint restrictions define valid outputs without ensuring factual correctness.
- [[concepts/structured-complex-temporal-events|Structured Complex Temporal Events]]: another structured temporal representation, using timestamped relational events instead of geographically nested visits.
