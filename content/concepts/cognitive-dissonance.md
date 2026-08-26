---
title: Cognitive Dissonance
type: concept
aliases:
  - Belief-Expression Misalignment
tags:
  - cognitive-dissonance
  - social-psychology
  - opinion-dynamics
  - misinformation
---

## Overview

Cognitive dissonance describes the discomfort associated with contradictory beliefs, information, or actions. In networked social-learning models, it can be operationalized as a mismatch between an agent's private belief and the belief the agent publicly expresses. This operationalization provides a trajectory-level model measure; it should not be treated as a direct observation of a person's mental state.

## Key Ideas

- In the DHT formulation used by Riazi and Livan, dissonance for agent `i`, time `t`, and hypothesis `theta_k` is `|q_i^(t)(theta_k) - b_i^(t)(theta_k)|`, where `q` is private belief and `b` is public belief.
- A network can therefore reach high average truthfulness while still exhibiting private-public disagreement, or show low truthfulness with relatively little dissonance if agents' public and private beliefs align.
- Selective exposure, ideological predispositions, and resistance to correction can alter both belief accuracy and public-private alignment.
- Interventions may change dissonance differently from truthfulness. In the fake-news simulations, conspirator sources increase volatility, while some debunking and inoculation regimes reduce dissonance under particular network and concentration settings.
- The measure is hypothesis-specific and depends on the model's distinction between public and private updates. It does not establish that an empirical participant experiences psychological discomfort.

## Important Papers

- [[Who Should Fight the Spread of Fake News?]]
- Cooper (2019), "Cognitive dissonance: Where we've been and where we're going."
- McGrath (2017), "Dealing with dissonance: A review of cognitive dissonance reduction."
- Ecker et al. (2022), "The psychological drivers of misinformation belief and its resistance to correction."
- Zollo et al. (2017), "Debunking in a world of tribes."

## Related Concepts

- [[Distributed Hypothesis Testing]]
- [[Opinion Dynamics]]
- [[Rumor Refutation on Social Media]]
- Public-private belief alignment
- Backfire effect
