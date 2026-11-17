---
title: Probabilistic Record Linkage
type: concept
aliases:
  - Probabilistic Entity Matching
definition: "Probabilistic record linkage estimates the probability that records refer to the same entity using imperfect identifying fields."
tags:
  - record-linkage
  - measurement
---

## Overview

Probabilistic record linkage connects records without a shared exact identifier by estimating match probabilities from field comparisons. It retains uncertainty that a deterministic string-similarity rule discards, which can matter for downstream measurement and inference.

## Key Ideas

- Unsupervised approaches such as Fellegi–Sunter exploit agreement patterns across identifying fields. Supervised alternatives learn from labeled record pairs.
- Active learning concentrates labeling on uncertain pairs, reducing annotation requirements; additional searches among unmatched records can improve recall.
- Exact blocking reduces the candidate-pair space but excludes true matches that disagree on blocking fields.
- [[concepts/text-embedding-models|Text Embedding Models]] can recover nicknames, acronyms, and cross-language similarities. Semantic proximity alone does not establish identity.
- Match definitions, probability calibration, and clerical validation matter independently of predictive accuracy. Multiple valid matches may exist, depending on the research question.

## Important Papers

- [[papers/probabilistic-record-linkage-using-pretrained-text-embeddings|Probabilistic Record Linkage Using Pretrained Text Embeddings]]: combines embedding and lexical similarity with LLM-labeled active learning in political science applications.
- Fellegi and Sunter (1969), *A Theory for Record Linkage*: foundational probabilistic framework, discussed by Ornstein (2025).

## Related Concepts

- [[concepts/text-embedding-models|Text Embedding Models]]: reusable semantic representations for comparing identifiers.
