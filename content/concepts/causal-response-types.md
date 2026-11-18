---
title: Causal Response Types
type: concept
aliases:
  - Nodal Response Types
  - Deterministic Response Functions
definition: Causal response types encode a variable's deterministic response to every possible configuration of its parents; combining these functions across nodes specifies a unit's responses throughout a discrete causal model.
tags:
  - causal-inference
  - counterfactuals
---

## Overview

A response type records what a variable would do under each possible setting of its parents. A distribution over these types represents population heterogeneity while preserving the joint potential outcomes needed for counterfactual queries. A complete causal type combines the nodal response types of a unit.

## Key Ideas

For a binary outcome with one binary parent, the response pair $(Y(0),Y(1))$ has four possibilities: always zero, increasing, decreasing, and always one. With $p$ binary parents, there are $2^{2^p}$ response functions. This expressive representation becomes computationally expensive as parent counts grow.

Independence across nodal types encodes an absence of unobserved confounding in the model. Dependence requires a joint type distribution. Restrictions such as monotonicity exclude specific response functions; they are substantive assumptions, not consequences of enumeration.

Compliance strata are an important application: treatment responses to an instrument distinguish never-takers, compliers, defiers, and always-takers. Full causal types can encode responses at additional nodes, giving a finer description than compliance strata alone.

Observed events generally combine multiple causal types. Consequently, learning event probabilities need not identify their underlying type probabilities. Bayesian updating provides a posterior over these possibilities, but nonidentified counterfactual quantities can remain prior-sensitive. Flat priors on type probabilities are not necessarily flat on effects.

## Important Papers

- [[papers/making-updating-and-querying-causal-models-with-causalqueries|Making, Updating, and Querying Causal Models with CausalQueries]] — enumerates types from a binary causal graph, learns distributions over them, and evaluates causal queries.
- Frangakis and Rubin (2002), “Principal Stratification in Causal Inference”: related classification by joint potential responses.

## Related Concepts

- [[concepts/conditional-causal-discovery|Conditional Causal Discovery]] — addresses posterior uncertainty over structure; response-type inference can instead operate within a fixed supplied graph.
