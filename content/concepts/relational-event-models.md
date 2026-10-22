---
title: Relational Event Models
type: concept
aliases:
  - Relational Event Model
  - REM
  - REMs
tags:
  - event-history-analysis
  - network-analysis
  - longitudinal-networks
---

## Overview

Relational event models explain ordered interaction events by making each possible next event depend on the observed event history. Rather than treating a network as a sequence of static snapshots, an REM models instantaneous actions such as messages, transfers, statements, or ties as they occur. Endogenous statistics summarize mechanisms such as repetition, actor activity, receiver popularity, reciprocity, or homophily from prior events.

## Key Ideas

- **History-dependent risk:** At each event time, the observed event competes with eligible alternatives in a dynamically defined risk set. Statistics computed from earlier events determine their relative hazards.
- **Event-history and choice views:** An ordinal REM can be written as a time-stratified Cox model or, equivalently, as a conditional-logit choice among candidate events. The baseline hazard cancels from the conditional probability.
- **Repeated relational events:** Events typically encode a sender, receiver, type or weight, and time. Risk sets can admit repeated events and exclude structurally impossible ones.
- **Conditional independence:** Events are conditionally independent given the selected summaries of the prior event sequence and any exogenous covariates. Conclusions therefore depend on whether those statistics adequately represent the relevant history.
- **Time and ties:** Continuous-time models use exact timing, whereas ordinal models use event order. When multiple events share an observed time, approximations such as Breslow's or Efron's adjust the partial likelihood.
- **Memory specification:** Historical events may be down-weighted by recency. Fixing that decay can alter both sufficient statistics and estimated effects, motivating [[concepts/temporal-decay-in-relational-event-models|Temporal Decay in Relational Event Models]] as an inferential target.

## Important Papers

- Butts (2008), "A relational event framework for social action": introduces the general relational-event framework.
- Brandes, Lerner, and Snijders (2009), "Networks evolving step by step": develops statistical analysis for dyadic event sequences and temporally decayed statistics.
- Bianchi et al. (2023), "Relational event modeling": reviews the REM framework and its applications.
- [[papers/fully-bayesian-estimation-of-temporal-decay-in-ordinal-relational-event-models|Fully Bayesian estimation of temporal decay in ordinal relational event models]]: estimates the decay half-life jointly with network-effect coefficients in ordinal REMs.

## Related Concepts

- [[concepts/temporal-decay-in-relational-event-models|Temporal Decay in Relational Event Models]]: controls how strongly older events contribute to current network statistics.
- [[concepts/discrete-time-hawkes-processes|Discrete-Time Hawkes Processes]]: another family of history-dependent event models, formulated for counts in time bins rather than choices among relational events.
- [[concepts/history-stratified-recurrent-event-models|History-Stratified Recurrent Event Models]]: recurrent-event models that partition risk sets by event history.
