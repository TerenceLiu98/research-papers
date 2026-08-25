---
title: Unstructured Outcome Causal Inference
type: concept
aliases:
  - Causal Inference for Text and Image Outcomes
tags:
  - causal-inference
  - unstructured-data
  - text-as-data
  - image-analysis
---

## Overview

Causal inference with unstructured outcomes studies how an intervention changes texts, images, documents, audio, or other rich objects. Because such objects generally lack a meaningful subtraction operation, the analysis first chooses a numerical representation and then defines causal contrasts on learned or specified features of that representation.

## Key Ideas

- The representation function determines which information from a raw object is available for causal analysis. Embeddings, hand-coded variables, and style-specific representations support different causal questions.
- A scalar summary can be treated as a causal outcome, but fixing that summary in advance may miss the feature most affected by treatment. The [[Maximally Contrasting Feature]] makes feature selection part of the estimand.
- Observational analyses still require consistency, overlap, and an adjustment strategy for confounding. Inverse-propensity weighting and sample splitting can separate treatment-assignment estimation from feature learning.
- Effects can be heterogeneous across context. A covariate-dependent score may identify different treatment-induced directions for different subpopulations.
- Learned directions are exploratory and representation-dependent. Interpretation requires examining high- and low-scoring objects, nearby examples, and domain-relevant summaries rather than treating a score label as a directly observed attribute.

## Important Papers

- [[Causal Inference with Unstructured Outcomes]]
- Egami et al. (2022), "How to make causal inferences using texts."
- Feder et al. (2022), "Causal inference in natural language processing: Estimation, prediction, interpretation and beyond."
- Veitch, Sridhar, and Blei (2020), "Adapting text embeddings for causal inference."

## Related Concepts

- [[Maximally Contrasting Feature]]
- [[Maximally Influential Treatment Features]]
- Potential outcomes
- Propensity scores
- Causal representation learning
- Text-as-data methods
