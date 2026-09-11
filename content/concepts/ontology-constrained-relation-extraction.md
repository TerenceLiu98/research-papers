---
title: Ontology-Constrained Relation Extraction
type: concept
tags:
  - relation-extraction
  - constrained-decoding
  - knowledge-graphs
---

## Overview

Ontology-constrained relation extraction converts text into structured entity relationships using a fixed inventory of types. An ontology specifies admissible categories and can encode direction, endpoint types, and temporal scope. Grammar-constrained decoding enforces output form and label membership; whether the relationship is supported by the text remains a separate empirical question.

## Key Ideas

- A shared vocabulary supports aggregation across documents and languages. Discovering candidate types on a corpus sample before freezing the ontology can improve coverage, but a closed inventory can still omit meaningful relationships.
- Direction and endpoint types matter. Post-processing can repair some subject-object inversions, while semantic confusions such as candidacy versus office holding require evidence beyond schema validity.
- Event, state, and property categories distinguish bounded occurrences from ongoing or definitional relationships. Publication dates should not automatically be treated as start or end dates.
- Candidate indices and deterministic identifier lookup reduce the amount of structured data a model must generate. They constrain identifier provenance without ensuring correct entity selection.
- Schema complexity affects speed. The VALPOP paper reports a throughput gain from removing a large identifier enum and assigning those identifiers after extraction.
- Incomplete gold annotations can label valid extractions as false positives. Text-grounded checking helps diagnose this, but model judging, matching accuracy, recall, and rubric strictness must be reported separately.

## Important Papers

- [[Mapping Political-Elite Networks in Europe with a Multilingual Joint Entity-Relation Extraction Pipeline]]: Combines ontology-constrained outputs, candidate linking, temporal fields, and per-relation valence for multilingual news.
- Geng et al. (2023), "Grammar-Constrained Decoding for Structured NLP Tasks without Finetuning." Cited methodological foundation.

## Related Concepts

- [[Multilingual Entity Linking]]
- [[Key Information Extraction]]
- [[Signed Political Networks]]
