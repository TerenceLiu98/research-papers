---
title: Denotation and Connotation
type: concept
tags:
  - semantics
  - political-language
  - representation-learning
---

## Overview

Denotation concerns what an expression refers to; connotation concerns the associations or attitudes conveyed by its choice. Political expressions can share a referent while framing it differently, as with “estate tax” and “death tax.” Separating these aspects can make semantic similarity less dependent on partisan vocabulary.

## Key Ideas

- Two-factor semantics motivates distinguishing referential and conceptual aspects of meaning, but a computational operationalization captures only selected parts of that distinction.
- Denotation can be grounded approximately in a discussed bill or policy topic, and connotation in speaker party or publisher leaning. These labels remain proxies rather than definitions of meaning.
- Adversarial embedding decomposition preserves predictability of one factor while suppressing another; reconstruction encourages the two spaces jointly to retain pretrained information.
- A context-prediction objective can substitute for unavailable denotation labels, but residual information need not be purely referential.
- Evaluation should distinguish lexical separation, retrieval diversity, and relevance. More politically balanced results can be less relevant to the query.

## Important Papers

- [[papers/are-undocumented-workers-the-same-as-illegal-aliens-disentangling-denotation-and-connotation-in-vector-spaces|Are “Undocumented Workers” the Same as “Illegal Aliens”?]]: tests adversarial separation in congressional speeches and partisan news, including a retrieval diversity–relevance tradeoff.

## Related Concepts

- [[concepts/disentangled-representations|Disentangled Representations]]
- [[concepts/text-embedding-models|Text Embedding Models]]
