---
title: Set-Valued Temporal Point Processes
type: concept
tags:
  - temporal-point-processes
  - set-valued-events
---

## Overview

A set-valued temporal point process associates each continuous-time event with a subset of a fixed item vocabulary. This represents genuine simultaneous inclusion, such as products in a shopping basket, while jointly modeling when events occur.

## Key Ideas

Factorizing intensity into a ground event rate and a conditional distribution over sets avoids learning a separate intensity for every one of the exponentially many subsets. Pooled item embeddings let recurrent history encoders consume variable-size sets.

A conditional Bernoulli distribution is inexpensive but assumes item independence given time and history. A determinantal distribution can model negative inclusion dependence at greater computational cost. Conditional independence does not imply marginal independence across evolving histories.

Item-level hitting and ordering queries require marginalizing over intermediate events. Proposals that suppress target-containing sets permit survival-weight estimators. Ordering queries must distinguish simultaneous first occurrence from either strict order, and must specify the time horizon.

## Important Papers

- [[papers/probabilistic-modeling-for-sequences-of-sets-in-continuous-time|Probabilistic Modeling for Sequences of Sets in Continuous-Time]] — develops recurrent Bernoulli/DPP models and importance-sampled item-level queries.

## Related Concepts

- [[concepts/synchronization-noise-in-temporal-point-processes|Synchronization Noise in Temporal Point Processes]] — timestamp misalignment is a different modeling issue from genuine simultaneous item inclusion.
