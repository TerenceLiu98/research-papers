---
title: Semantic Role-Based Narrative Mining
type: concept
aliases:
  - Semantic Role Narrative Extraction
definition: "Extracting recurring agent–action–patient statements from text through semantic role labeling and consolidation of entity mentions."
tags:
  - narrative-mining
  - semantic-role-labeling
  - text-as-data
---

## Overview

Semantic role-based narrative mining represents discourse as directed relations between entities. Semantic role labeling identifies who acts, what action occurs, and who or what is affected; entity consolidation makes recurring statements comparable across different phrasings.

## Key Ideas

- Semantic roles can preserve relation direction across active and passive wording. Negation must remain attached to the action.
- Named-entity recognition and phrase clustering reduce mention variation, but entity granularity is an analytical choice. Similar embeddings do not guarantee interchangeable meanings.
- Counts of triples describe recurring claims. Linking triples through shared entities yields directed multigraphs whose edges represent actions.
- Aggregated graph paths connect statements in a corpus; they do not by themselves establish a causal chain or a single speaker's coherent story.
- Extraction and frequency filters define which discourse survives. Differential parsing quality can create differential measurement error across groups.

## Important Papers

- [[papers/relatio-text-semantics-capture-political-and-economic-narratives|RELATIO: Text Semantics Capture Political and Economic Narratives]]: combines semantic role labeling, named entities, and phrase clustering to measure congressional narratives and partisan relations.

## Related Concepts

- [[concepts/causal-text-mining|Causal Text Mining]]: extracts expressed causal relations, a narrower semantic requirement than general agent–action–patient extraction.
- [[concepts/narrative-polarization|Narrative Polarization]]: studies group differences in narrative representations; relational features provide one operational approach.
