---
title: "Mixed Latent Tree Models"
type: concept
tags: [latent-variable-models, mixed-data, structure-learning]
---

## Overview

Mixed latent tree models represent discrete and continuous observations as leaves of a tree with hidden internal variables. Multiple latent nodes allow hierarchical dependence beyond a single latent class.

## Key Ideas

With binary hidden nodes, conditional independence through a separator implies multiplicative correlations and additive distances $d_{uv}=-\log|\rho_{uv}|$, provided the correlations are defined and nonzero. This supports reconstruction by repeatedly grouping siblings using distance differences.

Structure and parameters are separate learning problems. After choosing a root, parameters comprise its marginal distribution and conditional distributions on directed edges. Local observed triples can identify conditional moments through eigendecomposition, and shared observed descendants connect the local estimates across hidden edges.

Identifiability requires excluding redundant hidden nodes and degenerate dependence. Small correlations and nearly indistinguishable distance differences make finite-sample reconstruction harder. Binary hidden states are central to this correlation factorization; arbitrary hidden cardinalities require additional analysis.

## Important Papers

[[papers/learning-mixed-latent-tree-models|Learning Mixed Latent Tree Models]] develops mixed-data SLLT reconstruction and PEMT moment estimation, including recovery and asymptotic-normality results for binary hidden states and binary or conditionally Gaussian observations.

## Related Concepts

Additive tree metrics provide the reconstruction geometry; spectral moment estimation supplies the parameter-recovery mechanism. Latent class models are the single-hidden-node special case.
