---
title: "The Embedder's Dilemma: LLMs Are Better, but at What Cost?"
type: paper
authors:
  - Adnan El Assadi
  - Niklas Muennighoff
  - Jinhyuk Lee
year: null
repository: "https://github.com/embeddings-benchmark/embedders-dilemma"
tags:
  - llm-evaluation
  - text-embeddings
  - information-retrieval
  - cost-aware-evaluation
  - mteb
---

## TL;DR

This paper compares ten LLMs and 26 text embedding models on 37 tasks in MTEB(LLM), covering classification, semantic textual similarity, clustering, pair classification, and retrieval. The best LLM, Gemini 3.1 Pro, scores 77.6 against 77.2 for the best embedding model, but costs $154.14 versus $0.108 for a comparable benchmark pass. LLMs lead on reasoning-heavy retrieval, embeddings lead on classification, and the paradigms are statistically tied on the remaining categories. The authors recommend embeddings as the default and LLM reasoning over a retrieved shortlist when cross-document reasoning is needed.

## Research Question

Can a general-purpose LLM replace a text-embedding pipeline across common embedding tasks, and how should quality be weighed against inference cost, throughput, and reasoning-token usage?

## Motivation

Text embedding models are designed for high-throughput vector operations, while LLMs can read multiple documents jointly and reason over their relationships. Aggregate accuracy alone does not show when that additional reasoning is useful or whether it justifies the deployment cost. The paper therefore evaluates both paradigms on identical task subsets and reports quality, statistical uncertainty, token-level cost, and same-hardware throughput.

## Contributions

- Releases MTEB(LLM), a 37-task benchmark derived from MTEB with fixed evaluation subsets for comparing LLM and embedding pipelines.
- Evaluates ten LLMs from six families and 26 embedding models ranging from 118M to 14B parameters across five task categories.
- Measures API token costs for LLMs and H100 throughput-derived costs for embedding models, producing a joint cost-performance Pareto frontier.
- Shows that the aggregate quality difference is small but task-dependent: LLMs lead retrieval, while embeddings lead classification and remain competitive elsewhere.
- Studies retrieve-then-rerank pipelines and reduced reasoning budgets, supporting a hybrid deployment strategy.

## Method

The benchmark contains eight classification tasks, ten semantic textual similarity tasks, nine clustering tasks, four pair-classification tasks, and six retrieval tasks. The tasks cover multiple languages and domains and use fixed subsets with seed 42 so that all models see identical evaluation data.

The compared systems are complete deployment pipelines. Embedding models use k-nearest-neighbor classification, cosine similarity for STS and retrieval, and k-means for clustering. LLMs receive zero-shot structured prompts; retrieval uses corpus-in-context prompts in which the full corpus is numbered and placed in the context window. The retrieval corpora contain 82-415 documents, allowing shorter-context models to participate. A five-shot classification ablation tests whether a small number of labelled examples narrows the embedding advantage.

Embedding costs are estimated from maximum-throughput processing on a single NVIDIA H100 80GB at sequence length 512 and a GPU rate of $2.49 per hour. LLM costs use provider token accounting, including cached input and generated reasoning tokens. The paper also serves two open-weight LLMs and the embedding models on the same H100 to compare throughput under a common hardware constraint. Retrieve-then-rerank experiments cross four first-stage retrievers with cross-encoder and LLM listwise rerankers on BEIR and BRIGHT.

## Experiments

Gemini 3.1 Pro is the strongest LLM at 77.6 overall, followed by Octen-8B at 77.2 and Qwen3-E-8B at 77.0. A paired bootstrap test finds the Pro-versus-Octen difference statistically indistinguishable from zero (difference +0.3, 95% CI [-2.4, +3.1], p = 0.85).

The category results are asymmetric:

- **Retrieval:** Gemini 3.1 Pro scores 64.5 versus 56.0 for the best embedding and wins five of six tasks, including a 20-point advantage on FQuAD.
- **Classification:** the best embedding scores 90.8 versus 85.2 for Pro. The comparison uses labelled-reference kNN for embeddings and zero-shot prediction for LLMs.
- **Clustering, STS, and pair classification:** category differences are small and statistically non-significant, with embeddings slightly ahead on each reported best-model comparison.

On BEIR, a strong embedding first stage reaches 63.1 nDCG@10, ahead of the best reranked configuration at 60.3. On reasoning-heavy BRIGHT, an LLM listwise reranker improves a strong embedding first stage from 22.3 to 35.1 nDCG@10. This supports using LLMs selectively after an inexpensive first-stage retrieval step.

The cost gap is large. Gemini 3.1 Pro costs $154.14 per benchmark pass versus $0.108 for Octen-8B, a 1,431x ratio. Across alternative hardware and pricing assumptions, the ratio ranges from 338x to 2,424x. Reasoning tokens account for 28-81% of reasoning-model inference cost. Reducing reasoning cuts generated tokens by 54-96% and preserves or improves retrieval for four of six evaluated models; the tested classification changes are all smaller than one point.

On the same H100, the two open-weight LLMs process 5,400-5,900 tokens per second, while embedding models range from 14,700 to 4.3 million tokens per second. The resulting 2.5-736x throughput advantage reflects autoregressive decoding versus a batched encoder pass.

## Limitations

The ten LLMs are a snapshot of a rapidly changing model frontier, and the cost figures depend on the public prices and hardware assumptions used in the study. The classification comparison gives embeddings access to the full labelled training set through kNN while LLMs receive zero-shot prompts or only five examples, so it compares realistic deployment pipelines rather than intrinsic model capacity.

The corpus-in-context retrieval protocol uses small corpora of 82-415 documents. It gives LLMs global access to the corpus and allows prompt caching, while production-scale retrieval generally requires an indexed first stage; the reported cost gap is therefore conservative for this protocol and does not establish performance at corpus scale. Pair classification also uses post-hoc threshold optimization for embeddings without an exact LLM analogue. Aggregate scores weight tasks equally, so alternative task or dataset weighting could change the overall ordering.

## Related Concepts

- [[Text Embedding Models]]
- [[Massive Text Embedding Benchmark (MTEB)]]
- [[Cost-Aware Model Selection]]
- Dense retrieval
- Retrieve-then-rerank pipelines
- Test-time reasoning budgets

## Related Papers

- [[Benchmarking LLMs for Political Science: A United Nations Perspective]]
- [[Polistemics: Evaluating LLMs as Information Mediators in Politics & Elections]]
- Muennighoff et al. (2023), "MTEB: Massive text embedding benchmark." [arXiv](https://arxiv.org/abs/2210.07316)
- Thakur et al. (2021), "BEIR: A heterogenous benchmark for zero-shot evaluation of information retrieval models." [arXiv](https://arxiv.org/abs/2104.08663)
- Su et al. (2024), "BRIGHT: A realistic and challenging benchmark for reasoning-intensive retrieval." [arXiv](https://arxiv.org/abs/2407.12883)
- Lewis et al. (2020), "Retrieval-augmented generation for knowledge-intensive NLP tasks." [arXiv](https://arxiv.org/abs/2005.11401)
