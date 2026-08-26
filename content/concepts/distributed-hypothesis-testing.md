---
title: Distributed Hypothesis Testing
type: concept
aliases:
  - DHT
  - Distributed Social Learning
tags:
  - social-learning
  - opinion-dynamics
  - distributed-inference
  - Bayesian-inference
  - network-models
---

## Overview

Distributed Hypothesis Testing (DHT) is a networked social-learning framework in which agents combine private signals with information exchanged from neighboring agents to identify a ground-truth hypothesis. Each agent maintains a probability vector over competing hypotheses, updates it locally using a Bayesian likelihood ratio, and aggregates neighbors' public beliefs through a log-linear rule.

## Key Ideas

- Agents receive signals from a distribution associated with the ground truth but do not directly observe which hypothesis generated it.
- A local Bayesian update turns the current private belief and the new signal into a public belief vector.
- Network communication then combines neighbors' public beliefs in log space, producing a normalized private belief vector for the next time step.
- Global distinguishability is a sufficient structural condition for collective learning in the cited DHT results: every pair of hypotheses must be distinguishable by at least one agent through positive Kullback-Leibler divergence.
- Network topology and external sources of influence affect transient trajectories and steady states. The fake-news application represents concentrated external influence with mega nodes and distributed influence with fixed subpopulations.
- DHT separates private beliefs from public expressions. That separation allows modelers to study misalignment between what agents believe and what they communicate, but it is not by itself a psychological measurement.

## Important Papers

- [[Who Should Fight the Spread of Fake News?]]
- Riazi and Livan (2024), "Public and private beliefs under disinformation in social networks."
- Riazi and Livan (2024), "Mitigating disinformation in social networks through noise," arXiv:2403.13630.
- Ntemos et al. (2021), "Social learning under inferential attacks."
- Hare et al. (2020), "Non-bayesian social learning with uncertain models."

## Related Concepts

- [[Opinion Dynamics]]
- [[Cognitive Dissonance]]
- [[Social Network Analysis]]
- Bayesian social learning
- Kullback-Leibler divergence
