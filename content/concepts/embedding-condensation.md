---
title: Embedding Condensation
type: concept
tags:
  - representation-geometry
  - transformers
---

## Overview

Embedding condensation is the concentration of contextual token representations into nearly parallel directions, visible as pairwise cosine similarities approaching one. It concerns hidden states within a sequence, rather than merely the input embedding lookup table. Dispersion describes resistance to this directional concentration.

## Key Ideas

- Layerwise cosine distributions reveal when directional concentration develops. Correlations between depth and mean similarity summarize trends but do not measure absolute concentration.
- Directional alignment differs from equality of vectors: norms can remain different even when cosine similarity approaches one.
- Condensation can be present at initialization and reduced by training. Its relationship with capacity is empirical and architecture-dependent.
- Angular repulsion directly discourages aligned token states; feature decorrelation and Euclidean repulsion target different geometric properties.
- Better dispersion is a candidate mechanism for improved generalization, not a sufficient guarantee of semantic quality or better performance on every task.

## Important Papers

- [[papers/dispersion-loss-counteracts-embedding-condensation-and-improves-generalization-in-small-language-models|Dispersion Loss Counteracts Embedding Condensation and Improves Generalization in Small Language Models]]: measures depth-dependent condensation and evaluates an auxiliary angular penalty.

## Related Concepts

- [[concepts/geometry-aware-regularization|Geometry-Aware Regularization]]
