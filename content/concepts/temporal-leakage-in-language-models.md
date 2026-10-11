---
title: Temporal Leakage in Language Models
type: concept
aliases:
  - Lookahead Bias in Language Models
tags:
  - temporal-leakage
  - historical-language-models
  - evaluation
---

## Overview

Temporal leakage occurs when a language model has access to information later than the knowledge boundary assumed by an analysis. In historical reasoning or forecasting, knowledge of later outcomes can make retrospective performance appear to reflect foresight. A document's nominal publication date is insufficient protection if digitized text includes later annotations, and post-training can reintroduce modern information after temporally restricted pretraining.

## Key Ideas

- **Audit the full training pipeline.** Archival metadata, editorial additions, tokenizer vocabulary, and instruction data can each undermine an intended cutoff.
- **Separate aggregate surprise from specific knowledge.** Higher post-cutoff bits per byte is consistent with temporal restriction but does not exclude memorized later facts. Pair likelihood measurements with targeted recall tests.
- **Account for information in the prompt.** A question that supplies an event description already reveals part of the answer. Leakage tests should demand correct information beyond that description and distinguish year accuracy from other recalled details.
- **Treat non-detection cautiously.** Weak models may fail to recall both earlier and later events. Zero detected leakage can reflect low capability or limited test coverage rather than a clean corpus.
- **Keep knowledge and style distinct.** Modern topics and modern wording both affect benchmark performance. Historically adapted tests need controls for changed examples and difficulty.
- **Bound downstream claims.** A historical cutoff does not independently validate a model as a representation of historical people, institutions, or counterfactual behavior.

## Important Papers

- [[Pretraining Language Models on Historical Text]] combines archival filtering, grounded instruction tuning, and event-based likelihood and recall evaluation. Residual post-cutoff recall demonstrates that leakage mitigation is not a guarantee.

## Related Concepts

- [[Lexically Grounded Instruction Tuning]]
- [[Validity Boundaries for LLM Social Simulations]]
