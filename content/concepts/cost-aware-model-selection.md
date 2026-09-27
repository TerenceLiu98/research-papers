---
title: Cost-Aware Model Selection
type: concept
aliases:
  - Cost-Performance Model Selection
  - Quality-Cost Tradeoffs
tags:
  - model-evaluation
  - deployment-efficiency
  - pareto-frontiers
  - green-ai
---

## Overview

Cost-aware model selection evaluates models by capability together with the resources required to serve them. It treats accuracy, inference cost, throughput, latency, and sometimes environmental impact as deployment objectives rather than reporting quality alone. Pareto frontiers make visible which models deliver a useful quality improvement for a given resource budget.

## Key Ideas

- A model is Pareto-dominated when another model is at least as capable and no more expensive under the same accounting assumptions. The frontier can change with hardware prices, API rates, workload size, or task weighting.
- Cost accounting should match the deployment pipeline. API token usage, cached input, generated reasoning tokens, GPU throughput, tokenizer choice, and one-time training or indexing costs can contribute differently for different model families.
- Throughput matters separately from per-call price. Encoder batching and offline document indexing can make embedding systems much faster than autoregressive generation on the same hardware.
- Aggregate quality can hide task-specific specialization. A hybrid pipeline can use an inexpensive model for candidate generation and a more capable model only for shortlist reranking or reasoning.
- Statistical uncertainty belongs beside the frontier. Small score differences should not be treated as meaningful when confidence intervals include a tie.
- Cost comparisons are conditional, not universal rankings. Reporting the hardware, prices, token accounting, corpus scale, caching policy, and task weights is necessary for reuse.
- Agent operating settings can be evaluated jointly on held-out quality, discovery cost, elapsed time, and process complexity. A pre-specified utility contrast makes the tradeoff explicit, but conclusions depend on its weights and response standardization. Higher reasoning effort need not improve that utility even when it increases search activity.

## Important Papers

- [[papers/an-experimental-design-approach-to-evaluating-agentic-ais-autonomous-model-discovery|An Experimental Design Approach to Evaluating Agentic AI's Autonomous Model Discovery]] evaluates reasoning-effort settings with a factorial design. Under its fixed standardized quality-cost utility, slopes are negative in all eight strata and significant after Holm correction in seven; the unreplicated design and mixed cost accounting constrain generalization.
- [[The Embedder's Dilemma: LLMs Are Better, but at What Cost?]]
- Schwartz et al. (2020), "Green AI." [arXiv](https://arxiv.org/abs/1907.10597)
- Gonzalez (2026), "Cost-aware model selection for text classification: Multi-objective trade-offs between fine-tuned encoders and LLM prompting in production." [arXiv](https://arxiv.org/abs/2602.06370)
- Li et al. (2024), "Retrieval augmented generation or long-context LLMs? A comprehensive study and hybrid approach." [arXiv](https://arxiv.org/abs/2407.16833)

## Related Concepts

- [[concepts/utility-aligned-canonical-decomposition|Utility-Aligned Canonical Decomposition]] describes whether a dominant multivariate treatment direction aligns with a chosen quality-cost preference, separately from testing the utility slope itself.
- [[Text Embedding Models]]
- [[Massive Text Embedding Benchmark (MTEB)]]
- Pareto optimization
- Inference efficiency
- Retrieval-augmented generation
