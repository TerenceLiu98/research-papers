---
title: Computational Transcendence
type: concept
aliases:
  - Elastic Identity
tags:
  - multi-agent-systems
  - cooperation
  - identity
  - trust
---

## Overview

Computational Transcendence models an agent with an elastic identity: its utility includes the payoffs of other agents it identifies with, alongside its own payoff. The agent still maximizes utility, but that utility is broader than individual material gain. This provides a formal mechanism for welfare-sensitive choices in social dilemmas.

## Key Ideas

- **Identity changes the objective.** An identity set specifies whose outcomes matter. In the network formulation, direct neighbors form that set.
- **Disposition and relationship strength are separate.** Agent-level elasticity $\gamma_a$ and directed semantic distance $d_a(b)$ produce a weight $\gamma_a^{d_a(b)}$ on another agent's payoff. For the tested range $0<\gamma_a<1$, larger elasticity or smaller distance increases this weight.
- **Normalization preserves a weighted-average interpretation.** Own payoff has weight one, and the sum of own and weighted neighbor payoffs is divided by the total weight.
- **Experience can revise identification.** Relative reward and cost contributions update semantic distances. This makes the welfare weights adaptive without requiring elasticity itself to change.
- **Trust can extend identity beyond neighbors.** The CT+ extension aggregates distances along a shortest-hop path using a scaled geometric mean and assigns infinite distance to disconnected agents. Social connections govern trust even when game encounters occur between every pair.
- **Cooperation is a limited responsibility proxy.** Higher cooperation in an iterated prisoner's dilemma supports a claim about the modeled welfare objective, not a general guarantee of ethical conduct or resistance to manipulation.

## Important Papers

- Deshmukh and Srinivasa (2022), "Computational transcendence: Responsibility and agency": foundational work identified in the CT+ paper's reference 12; not independently ingested here.
- [[papers/the-triad-of-identity-trust-and-responsibility-in-multi-agent-systems|The Triad of Identity, Trust and Responsibility in Multi-Agent Systems]]: extends the identity model with indirect trust and evaluates network topology and elasticity in repeated-game simulations. It does not include an ablation isolating trust propagation from the original model.

## Related Concepts

- [[concepts/reputation-based-cooperation|Reputation-Based Cooperation]]: experience and third-party information inform treatment of others.
- [[concepts/social-trust-networks|Social Trust Networks]]: relational structure supports trust-dependent decisions.
- [[concepts/network-games|Network Games]]: strategic outcomes depend on social structure and how other agents enter utility.
