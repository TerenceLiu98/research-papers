---
title: Exploratory Hierarchical Factor Analysis
type: concept
aliases:
  - Exploratory Hierarchical Factor Models
tags:
  - factor-analysis
  - hierarchical-factor-models
  - structure-learning
---

## Overview

Exploratory hierarchical factor analysis learns a tree of latent factors when neither the number of factors nor their nested loading pattern is known in advance. A broad factor explains all or many observed variables, while progressively narrower descendants explain variation within disjoint subsets. The task combines covariance decomposition with discrete structure learning and differs from confirmatory analysis, where the hierarchy is supplied beforehand.

## Key Ideas

- **Hierarchy through loading supports:** A factor's support is the set of variables with nonzero loadings. Two supports are nested or disjoint, and the children of an internal factor partition the parent's support.
- **Identifiability precedes estimation:** Factor models are rotationally ambiguous without restrictions. Tree constraints, sufficient rank conditions, and exclusion of single-child branches can reduce the remaining ambiguity to column sign flips.
- **Top-down decomposition:** Learning the children of one factor at a time replaces a single global tree search with smaller recursive problems. Errors near the top can still propagate to later layers.
- **Continuous surrogates for combinatorial search:** Nonlinear constraints and augmented Lagrangian optimization can search for block-sparse loading patterns, followed by an information criterion that selects child counts and dimensions.
- **Theory and implementation can diverge:** A consistency theorem based on globally solved partition subproblems does not by itself guarantee that a greedy, randomly initialized optimizer finds those solutions in finite samples.
- **Substantive interpretation remains separate:** A recovered statistical hierarchy can suggest general, intermediate, and specific constructs, but factor labels and validity require domain evidence beyond fit or BIC.

## Important Papers

- [[papers/exploratory-hierarchical-factor-analysis-with-an-application-to-psychological-measurement|Exploratory Hierarchical Factor Analysis with an Application to Psychological Measurement]]: gives identifiability conditions, a recursive information-criterion method, consistency theory, simulations, and an Agreeableness application.
- Schmid and Leiman (1957), “The development of hierarchical factor solutions”: introduced the transformation commonly used to derive hierarchical solutions from higher-order factors.
- Jennrich and Bentler (2011), “Exploratory bi-factor analysis”: develops exploratory bifactor analysis and documents a failure case for the Schmid-Leiman approach.
- Qiao, Chen, and Ying (2025), “Exact exploratory bi-factor analysis: A constraint-based optimisation approach”: treats the two-layer special case using constrained optimization.

## Related Concepts

- [[concepts/hierarchical-latent-trait-models|Hierarchical Latent Trait Models]]: connects specific abilities to broader traits in item response models.
- [[concepts/bifactor-item-response-models|Bifactor Item Response Models]]: uses one general factor and specific factors, corresponding to a shallow hierarchy under additional response-model assumptions.
