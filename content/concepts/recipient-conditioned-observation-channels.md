---
title: Recipient-Conditioned Observation Channels
type: concept
aliases:
  - Polarization Observation Wedge
tags:
  - generative-personalization
  - measurement
  - opinion-dynamics
---

## Overview

A recipient-conditioned observation channel maps one underlying source position to different expressions for different audiences. When generation performs this adaptation, visible discourse can change even when the source commitment remains fixed. Measuring underlying disagreement therefore requires specifying both the observation unit and the message-production process.

## Key Ideas

- Selection determines which speakers and histories are observed; rewriting changes their observed expressions. Matching sender histories before comparing latent and expressed dispersion separates these effects.
- With sender-average expression $\bar y=\bar x+\delta$, the variance change is $2\operatorname{Cov}(\bar x,\delta)+\operatorname{Var}(\delta)$. Centerward displacement can compress dispersion, while heterogeneous displacement can expand it.
- A wedge defined as latent minus observed standard deviation is positive for masking and negative for amplification. This sign convention is opposite to observed-minus-latent variance change.
- Audience organization matters because it determines recipient-specific displacements. Cross-audience comparability can constrain divergent variants through accountability costs.
- Source fidelity is a separate empirical requirement. Audience adaptation does not itself establish semantic preservation, and evaluator disagreement does not establish ambiguity or drift.
- Counterfactual dynamics on empirical network schedules demonstrate model behavior under observed interaction structure; they do not measure actual private opinions.

## Important Papers

- [[The Chameleon Dynamics: How Personalised Generation Reshapes Online Polarisation]] — derives the observation-wedge decomposition and variance criterion, studies network replays, and audits source fidelity.

## Related Concepts

- [[Political Polarization]]
- [[Opinion Dynamics]]
