---
title: Cross-Encoders
type: concept
aliases:
  - Cross-Encoder Models
  - Pair-Level Encoders
tags:
  - semantic-similarity
  - text-representations
  - transformers
  - information-retrieval
---

## Overview

Cross-encoders score the relationship between two texts by processing them jointly in a transformer. Because self-attention operates across the concatenated pair, the model can represent interactions such as paraphrase, entailment, contradiction, and query-document relevance that independent text vectors may miss.

## Key Ideas

- **Joint input:** The two texts are concatenated with classification and separator tokens before transformer encoding. Each token can attend to context in both texts.
- **Pair-level representation:** A classification-token representation summarizes the pair and feeds a task-specific prediction head for continuous, ordinal, multiclass, or binary outputs.
- **Task dependence:** "Similarity" must be operationalized through training labels. Off-the-shelf semantic textual similarity, retrieval relevance, and domain-specific entailment models do not necessarily measure the same construct.
- **Bi-encoder trade-off:** [[concepts/text-embedding-models|Text Embedding Models]] commonly encode texts independently and compare reusable vectors. Cross-encoders usually provide richer pairwise interaction at the cost of recomputing the model for every pair.
- **Domain adaptation:** Fine-tuning on expert-labeled pairs can align the representation and prediction head with specialized terminology and a particular similarity definition. Validation should cover both prediction quality and the downstream quantities built from the scores.
- **Scaling:** Exhaustive comparison of $n$ documents requires $O(n^2)$ pair evaluations. Sampling, lexical or embedding-based retrieval, and theoretically justified blocking can generate candidates for more expensive cross-encoder reranking.
- **Input length:** A transformer's context limit constrains direct comparison of long documents. Chunking and summarization enable processing but change what information is compared.

## Important Papers

- [[papers/using-cross-encoders-to-measure-the-similarity-of-short-texts-in-political-science|Using Cross-Encoders to Measure the Similarity of Short Texts in Political Science]]: evaluates off-the-shelf and customized cross-encoders across three political-science measurement tasks.
- Devlin et al. (2018), "BERT: Pre-Training of Deep Bidirectional Transformers for Language Understanding": establishes the transformer encoder architecture used by many cross-encoders.
- Reimers and Gurevych (2019), "Sentence-BERT: Sentence Embeddings Using Siamese BERT-Networks": develops an efficient bi-encoder alternative and discusses its accuracy-efficiency trade-off with joint pair classification.
- Rosa et al. (2022), "In Defense of Cross-Encoders for Zero-Shot Retrieval": cited work on cross-encoder retrieval performance.

## Related Concepts

- [[concepts/text-embedding-models|Text Embedding Models]]
- Semantic textual similarity
- Natural language inference
- Learning to rank
- Candidate reranking
