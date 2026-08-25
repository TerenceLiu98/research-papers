---
title: Massive Text Embedding Benchmark (MTEB)
type: concept
aliases:
  - MTEB
tags:
  - benchmark-datasets
  - text-embeddings
  - model-evaluation
  - semantic-similarity
---

## Overview

The Massive Text Embedding Benchmark (MTEB) is an evaluation framework and task suite for comparing text embedding models across multiple languages, domains, and capabilities. It broadened embedding evaluation beyond a single retrieval score by covering classification, clustering, pair classification, reranking, retrieval, and semantic textual similarity. The framework also supports extensions such as MTEB(LLM), which evaluates generative LLM pipelines on fixed task subsets alongside embedding models.

## Key Ideas

- MTEB aggregates heterogeneous tasks rather than assuming that one embedding model is best for every workload.
- Task-specific metrics preserve the distinction between accuracy, average precision, V-measure, Spearman correlation, and retrieval metrics such as Recall@1 or nDCG@k.
- A cross-paradigm comparison requires identical data subsets and evaluation procedures; MTEB(LLM) uses fixed subsets with seed 42 for this purpose.
- Aggregate scores are useful summaries but can conceal category-specific strengths and are sensitive to task weighting. Results should therefore be read with per-category scores and uncertainty estimates.
- The framework has been extended to multilingual text and other modalities, while the paper's MTEB(LLM) variant adds cost and throughput accounting to the quality comparison.

## Important Papers

- [[The Embedder's Dilemma: LLMs Are Better, but at What Cost?]]
- Muennighoff et al. (2023), "MTEB: Massive text embedding benchmark." [arXiv](https://arxiv.org/abs/2210.07316)
- Enevoldsen et al. (2025), "MMTEB: Massive multilingual text embedding benchmark." [arXiv](https://arxiv.org/abs/2502.13595)
- Thakur et al. (2021), "BEIR: A heterogenous benchmark for zero-shot evaluation of information retrieval models." [arXiv](https://arxiv.org/abs/2104.08663)

## Related Concepts

- [[Text Embedding Models]]
- [[Cost-Aware Model Selection]]
- Benchmark evaluation
- Multilingual evaluation
- Information retrieval
