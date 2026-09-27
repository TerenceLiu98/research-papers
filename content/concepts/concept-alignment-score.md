---
title: Concept Alignment Score
type: concept
aliases:
  - CAS
tags:
  - interpretable-machine-learning
  - concept-supervision
  - representation-evaluation
---

## Overview

Concept Alignment Score (CAS) evaluates how coherently a learned concept representation groups examples according to their ground-truth concept labels. It extends evaluation beyond scalar concept-prediction accuracy to the multidimensional representations used by [[concepts/concept-embedding-models|Concept Embedding Models]].

## Key Ideas

- **Cluster one concept space at a time.** For each concept, cluster test examples using their representation for that concept. The introducing paper uses k-medoids.
- **Measure label homogeneity.** A cluster is homogeneous when its members share the concept label. Conditional entropy measures residual label uncertainty after cluster membership is known; lower uncertainty gives greater homogeneity.
- **Aggregate over resolutions.** Summarize homogeneity over concepts and multiple cluster counts rather than relying on a single partition. The paper's practical computation samples cluster counts in increments of 50 and reports the intended normalized score on a percentage scale in its results table.
- **Representation choices matter.** The paper evaluates scalar CBMs using concept logits and hybrid CBMs using a concept's scalar coordinate together with the shared unsupervised dimensions. These choices affect which distances and neighborhoods are evaluated.
- **Alignment is not exclusivity.** A representation can separate concept labels while also encoding class identity or other properties. Appendix A.7 of the introducing paper notes that class-concept correlations in CUB can yield high CAS even without concept supervision.
- **Use complementary evaluations.** Task accuracy, concept prediction, held-out [[concepts/linear-probing|linear probes]], and correct or incorrect concept interventions answer different questions. CAS alone does not establish faithful explanations or effective control of a model.

## Important Papers

- [[papers/concept-embedding-models-beyond-the-accuracy-explainability-trade-off|Concept Embedding Models: Beyond the Accuracy-Explainability Trade-Off]] introduces CAS in Section 4 and gives implementation details and qualifications in Appendices A.1 and A.7.
- Rosenberg and Hirschberg (2007), "V-Measure: A Conditional Entropy-Based External Cluster Evaluation Measure." Supplies the homogeneity measure used by CAS.

## Related Concepts

- [[concepts/concept-embedding-models|Concept Embedding Models]]
- [[concepts/concept-bottleneck-models|Concept Bottleneck Models]]
- [[concepts/linear-probing|Linear Probing]]
