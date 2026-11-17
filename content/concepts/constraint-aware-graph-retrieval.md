---
title: Constraint-Aware Graph Retrieval
type: concept
definition: "Constraint-aware graph retrieval selects entities and relationships using explicit feasibility conditions before passing retrieved evidence to a language model."
aliases:
  - Constraint-First Graph Retrieval
tags:
  - graph-rag
  - spatial-reasoning
---

## Overview

Constraint-aware graph retrieval converts a request into a graph pattern and explicit conditions, then retrieves evidence satisfying those conditions before language generation. It is useful when semantic relevance alone cannot establish feasibility, such as an available parking facility connected to an accessible building entrance.

## Key Ideas

- Intent selects a structural query pattern; extracted slots supply temporal, spatial, and attribute filters.
- Typed relationships preserve connections between entities that independently retrieved text fragments may omit.
- Compact serialization gives the generator identities, relations, and relevant attributes to explain.
- Feasibility is relative to the encoded constraints and current data. Misinterpreted requests, stale graph attributes, and generation errors can still yield invalid recommendations.
- Retrieval-stage filtering differs from asking the generator to resolve all constraints after seeing potentially incompatible evidence.

## Important Papers

- [[papers/bridging-text-and-topology|Bridging text and topology]] applies this design to campus events, parking, and entrance accessibility, reporting improved constraint satisfaction on 89 curated queries.

## Related Concepts

- [[concepts/knowledge-action-graphs|Knowledge-Action Graphs]] represent actions, observations, and verification traces for agent supervision. They share an emphasis on explicit structure, but have a different scope from retrieving feasible entity configurations.
