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
- In [[concepts/belief-embeddings|Belief Embeddings]], Lee et al. (2025) instead use distance from a user's mean belief vector to a candidate belief as a dissonance proxy. Their relative measure is $d^*=(d_{\max}-d_{\min})/d_{\min}$, comparing the farther and nearer of two candidate stances for $d_{\min}>0$. This measures geometric deviation from prior beliefs, rather than private-public mismatch.
- In their debate data, larger relative dissonance is associated with a higher probability of choosing the nearer stance. This observational result is consistent with an alignment preference but does not directly measure discomfort or identify a causal effect on belief adoption.

## Important Papers

- [[Who Should Fight the Spread of Fake News?]]
- [[papers/a-semantic-embedding-space-based-on-large-language-models-for-modelling-human-beliefs|A semantic embedding space based on large language models for modelling human beliefs]]
- Cooper (2019), "Cognitive dissonance: Where we've been and where we're going."
- McGrath (2017), "Dealing with dissonance: A review of cognitive dissonance reduction."
- Ecker et al. (2022), "The psychological drivers of misinformation belief and its resistance to correction."
- Zollo et al. (2017), "Debunking in a world of tribes."

## Related Concepts

- [[Distributed Hypothesis Testing]]
- [[concepts/belief-embeddings|Belief Embeddings]]
- [[Opinion Dynamics]]
- [[Rumor Refutation on Social Media]]
- Public-private belief alignment
- Backfire effect
