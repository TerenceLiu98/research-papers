---
title: Concept Embedding Models
type: concept
aliases:
  - CEM
  - CEMs
  - Concept Embedding Model
tags:
  - concept-bottleneck-models
  - concept-supervision
  - representation-learning
---

## Overview

Concept Embedding Models are supervised [[concepts/concept-bottleneck-models|Concept Bottleneck Models]] that represent each binary concept through a mixture of input-dependent positive and negative vectors. The extra capacity preserves information that scalar concepts may discard, while a concept probability provides an interface for interventions.

## Key Ideas

- **Input-dependent endpoints.** An encoder generates $e_i^+(x)$ and $e_i^-(x)$ for each concept. These represent its active and inactive states and can vary between examples with the same concept label.
- **Probability-weighted mixing.** A shared scoring function predicts $p_i$, and the classifier receives the concatenation of $e_i=p_i e_i^+ +(1-p_i)e_i^-$. With $k$ concepts and embedding dimension $m$, the bottleneck has $km$ activations.
- **Joint supervision.** Task loss trains predictive embeddings, while concept loss aligns the mixing probabilities with human annotations. The model can retain task information missing from the binary concept set.
- **Completeness and readout capacity differ.** Binary concepts may fully determine a task without making it linearly separable, as in XOR. Embeddings can help a linear label predictor in this setting as well as retain information omitted by an incomplete concept vocabulary; these are different sources of benefit.
- **Interventions select embeddings.** Setting $p_i$ to a supplied concept value selects the corresponding endpoint. RandInt performs such substitutions randomly during training, using ground-truth labels to improve the model's later response to corrections.
- **Separate alignment from sufficiency.** [[concepts/concept-alignment-score|Concept Alignment Score]] measures label coherence in the embedding geometry. It does not establish that embeddings contain only their named concepts, or that the displayed probability vector fully explains the classifier's decision.
- **Conditional intervention benefits.** The introducing paper finds stronger correction effects than hybrid bottlenecks, especially with incomplete concept sets, but reports that scalar fuzzy CBMs can respond better to correct interventions on CUB. Sensitivity to incorrect corrections and the amount of retained input information also matter.

## Important Papers

- [[papers/concept-embedding-models-beyond-the-accuracy-explainability-trade-off|Concept Embedding Models: Beyond the Accuracy-Explainability Trade-Off]] introduces the paired embeddings, RandInt, and their evaluation.
- Koh et al. (2020), "Concept Bottleneck Models." Provides the scalar bottleneck and intervention framework extended by CEM.

## Related Concepts

- [[concepts/concept-bottleneck-models|Concept Bottleneck Models]]
- [[concepts/concept-alignment-score|Concept Alignment Score]]
- [[concepts/linear-probing|Linear Probing]]
- [[concepts/model-steerability|Model Steerability]]
