---
title: Multilingual Entity Linking
type: concept
aliases:
  - Cross-Lingual Entity Linking
tags:
  - entity-linking
  - multilingual-nlp
  - knowledge-graphs
---

## Overview

Multilingual entity linking maps textual mentions across languages to stable knowledge-base identifiers. Names, abbreviations, aliases, and inflected forms can then refer to one graph node. Linking differs from recognizing that a span names an entity: it must identify which entity is meant, or retain an unresolved mention when no adequate candidate exists.

## Key Ideas

- Candidate retrieval and contextual selection are separate stages. Exact aliases can resolve abbreviations that embeddings miss; fuzzy matching handles small surface variations; dense retrieval supplies semantic candidates for remaining mentions.
- Morphology affects both retrieval and post-processing. A correctly selected candidate can still be lost if downstream lookup uses the original inflected mention while the model outputs a canonical name.
- Constrained candidate indices prevent fabricated identifiers but cannot guarantee that a selected identifier refers to the correct person or institution. A no-match option and anchor verification remain necessary.
- Knowledge-base filters are measurement choices. Removing entities with few sitelinks can disproportionately erase regional and less prominent actors needed for elite-network research.
- Node coverage and relation-level identifier fill answer different questions. Well-linked prominent actors may dominate edges even while most distinct nodes remain unresolved.
- Country, language, and entity-type cues help disambiguate homonyms. Cross-language identity alone does not guarantee comparable coverage across countries.

## Important Papers

- [[Mapping Political-Elite Networks in Europe with a Multilingual Joint Entity-Relation Extraction Pipeline]]: Uses exact, fuzzy, and dense candidate retrieval for Wikidata linking, and documents fragmentation and canonical-name failures.
- De Cao et al. (2022), "Multilingual Autoregressive Entity Linking." Cited in the pipeline paper as a cross-language linking approach.
- Sevgili et al. (2022), "Neural Entity Linking: A Survey of Models Based on Deep Learning." Cited survey.

## Related Concepts

- [[Ontology-Constrained Relation Extraction]]
- [[Social Network Analysis]]
- [[Text Embedding Models]]
