---
title: Semantic Associations in Transformers
type: concept
aliases:
  - Transformer Token Associations
  - Token Association Learning
tags:
  - transformers
  - semantic-associations
  - distributional-semantics
  - mechanistic-interpretability
---

## Overview

Semantic associations in transformers are statistical and functional relationships between tokens that become encoded in model representations and weights. They include direct succession, substitutability in similar grammatical contexts, and longer-range co-occurrence between entities, attributes, actions, and settings.

## Key Ideas

- Next-token statistics encode local directed relations: a token is associated with words that commonly follow it.
- Tokens with similar preceding-token distributions can be functionally interchangeable even when they are not synonyms. This can group grammatical classes or entities that accept similar modifiers and constructions.
- Prefix-context statistics capture nonadjacent relationships, such as an entity's association with a typical location or activity.
- These association types can cooperate rather than occupy isolated modules. [[Gradient Leading-Term Analysis]] shows one mechanism in which an output map learns bigram structure, value weights compose context with output structure, and attention scores select prefix tokens useful for the current next-token prediction.
- Association is not equivalent to semantic comprehension. Corpus frequency, tokenization, architecture, optimization, and training stage all affect which relationships are represented and how they should be interpreted.

## Important Papers

- [[How Do Transformers Learn to Associate Tokens Gradient Leading Terms Bring Mechanistic Interpretability]]
- Harris (1954), "Distributional Structure."
- Miller and Charles (1991), "Contextual Correlates of Semantic Similarity."
- Olsson et al. (2022), "In-Context Learning and Induction Heads."

## Related Concepts

- [[Gradient Leading-Term Analysis]]
- Distributional semantics
- Token co-occurrence
- Mechanistic interpretability
- Transformer circuits
