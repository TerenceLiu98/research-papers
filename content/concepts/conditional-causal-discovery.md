---
title: Conditional Causal Discovery
type: concept
aliases:
  - Causal Discovery under Effect Constraints
tags:
  - causal-discovery
  - bayesian-inference
  - causal-effects
  - posterior-conditioning
---

## Overview

Conditional causal discovery studies a posterior over causal structures and mechanism parameters after imposing a constraint on a causal quantity, such as a total effect, path-specific effect, or conjunction of effects. It asks which causal explanations remain plausible under both the observed data and a specified phenomenon, rather than selecting one unconstrained graph.

## Key Ideas

- The inferential target is $p(G,\theta\mid\mathcal D,\mathcal E)$, where $\mathcal E$ is an event defined by a causal functional of the graph and parameters.
- Conditioning can reveal edges and pathways characteristic of an effect regime while preserving posterior uncertainty.
- A scalar score can encode right- or left-tail constraints; the minimum normalized margin can encode conjunctions and intervals.
- Rare constraints make rejection from an unconstrained posterior inefficient, motivating dedicated rare-event samplers.
- The result is conditional on the chosen effect definition, threshold, prior, model class, and causal assumptions. It does not by itself identify a unique true graph or establish that the constrained event describes the data-generating system.

## Important Papers

- [[papers/interpretable-causal-discovery-via-causal-effect-constraints|Interpretable Causal Discovery via Causal-Effect Constraints]]: formulates the task for Bayesian graph-and-weight posteriors and uses adaptive multilevel splitting for rare effect constraints.
- Friedman and Koller (2003), "Being Bayesian about Network Structure": foundational Bayesian treatment of uncertainty over network structures.

## Related Concepts

- [[concepts/adaptive-multilevel-splitting|Adaptive Multilevel Splitting]]
- Bayesian causal discovery
- Causal effects
- Structural equation models
- Posterior predictive inference
