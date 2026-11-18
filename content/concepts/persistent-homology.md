---
title: Persistent Homology
type: concept
aliases:
  - Persistence Homology
definition: Persistent homology tracks the birth and death of topological features across a filtration to summarize structure at multiple scales.
tags:
  - topological-data-analysis
  - representation-learning
---

## Overview

Persistent homology summarizes how connected components, loops, and higher-dimensional cavities appear and disappear as a filtration changes. Persistence diagrams record birth and death values, allowing multiscale structure to be carried into statistical and machine-learning analyses.

## Key Ideas

- A filtration constructs a nested sequence of complexes from data; the chosen distances and construction determine which structure is measured.
- Feature lifetime is death minus birth. Longer-lived features lie farther from the birth-equals-death diagonal in a persistence diagram.
- Persistence images turn diagram information into numerical representations suitable for dimension reduction and downstream learning.
- In longitudinal applications, panel-level topological summaries can serve as moderators, classification labels, or conditioning information. Their association with outcomes does not itself identify a causal mechanism.

## Important Papers

- [[papers/generative-ai-and-topological-data-analysis-of-longitudinal-panel-data|Generative AI and Topological Data Analysis of Longitudinal Panel Data]] — uses persistence-image components for Bayesian moderation and graph learning on yearly interstate networks; additional conditioned latent factors provide little incremental predictive improvement.

## Related Concepts

- [[concepts/functional-principal-component-analysis|Functional Principal Component Analysis]] — reduces functional representations to component scores.
- [[concepts/neural-message-passing|Neural Message Passing]] — can use topological information as graph-level supervision or conditioning.
