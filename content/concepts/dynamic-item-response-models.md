---
title: Dynamic Item Response Models
type: concept
aliases:
  - Dynamic IRT
  - DIR models
tags:
  - item-response-theory
  - longitudinal-data
  - state-space-models
  - educational-assessment
---

## Overview

Dynamic item response models extend [[concepts/item-response-theory|Item Response Theory]] by allowing a respondent's latent trait to evolve over time. A response model connects observed answers to the current latent state, while a transition model connects that state across measurement occasions. This separates persistent change in ability from short-lived response variation and supports both retrospective smoothing and online filtering.

## Key Ideas

- **State-space decomposition:** The observation equation models item responses at each occasion; the system equation describes how latent ability changes between occasions.
- **Irregular timing:** Transition drift and innovation variance can depend on elapsed time, so respondents need not share a fixed testing schedule.
- **Soft growth assumptions:** A positive expected drift can encode likely learning while process noise still permits temporary or sustained declines when supported by the data.
- **Local dependence:** Day-, session-, or test-level random effects can absorb shared conditions that violate conditional item independence. Constraints are needed to distinguish effects at nested levels.
- **Uncertain item difficulty:** When items are generated once or cannot be repeatedly calibrated, difficulty may be modeled as a deviation around a known or estimated ensemble mean.
- **Retrospective and online inference:** Smoothing uses later responses to revise earlier states; filtering estimates the current state using data available so far. These target different information sets and should not be compared as if equally informed.

## Important Papers

- [[papers/bayesian-analysis-of-dynamic-item-response-models-in-educational-testing|Bayesian Analysis of Dynamic Item Response Models in Educational Testing]]: combines logistic IRT, an irregular-time ability process, daily and test random effects, uncertain generated-item difficulty, and Bayesian filtering and smoothing.
- Martin and Quinn (2002), "Dynamic Ideal Point Estimation via Markov Chain Monte Carlo for the U.S. Supreme Court, 1953-1999": an influential dynamic latent-trait application cited as a Markov-process predecessor.
- Czado and Song (2008), "State Space Mixed Models for Longitudinal Observations with Binary and Binomial Responses": cited work connecting state-space models with longitudinal discrete observations.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: the static measurement framework extended by a temporal latent-state process.
- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: dynamic latent response models for changing political positions.
