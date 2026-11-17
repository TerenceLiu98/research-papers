---
title: Semantic IDs for Generative Recommendation
type: concept
aliases: [Hierarchical Semantic Item IDs]
definition: "Semantic IDs encode items as discrete sequences derived from semantic representations, allowing a recommender to predict items through identifier generation."
tags: [generative-recommendation, semantic-ids]
---

## Overview

Semantic IDs turn item retrieval into discrete sequence generation. Hierarchical codes organize items at successive levels of granularity, so shared prefixes expose structure beyond an arbitrary atomic item label.

## Key Ideas

- Residual quantization can map item-text embeddings into successive discrete codes. Construction choices determine which relationships the identifier space preserves.
- A trie of valid identifiers constrains generation to catalog items. Identifier validity alone does not establish recommendation relevance.
- Hierarchical codes can serve as intermediate reasoning objects as well as outputs. CogRec supplements the hierarchy with centroid edges and supervises layer-wise transitions; unsupported transitions remain learned predictions rather than verified graph paths.

## Important Papers

- [[papers/cogrec-structure-cognitive-fast-and-slow-reasoning-for-generative-recommendation|CogRec]] demonstrates structure-grounded routing, with improvements on two of three evaluated datasets and increased generation cost.

## Related Concepts

- [[concepts/latent-reasoning|Latent Reasoning]] — intermediate computation can instead operate in hidden representations; a semantic identifier is an output representation and does not by itself imply explicit reasoning.
