---
title: Opinion Maximization
type: concept
aliases:
  - OM
tags:
  - opinion-maximization
  - opinion-dynamics
  - social-influence
  - seed-selection
  - network-optimization
---

## Overview

Opinion maximization selects a limited set of seed nodes to maximize an aggregate opinion outcome after information or opinions propagate through a network. It extends influence maximization from counting activated nodes to modeling the direction and magnitude of continuous or discrete opinions. The objective can depend on network topology, signed relationships, local interaction rules, global information, and a finite time horizon.

## Key Ideas

- Seeds are nodes whose initial or expressed opinions are fixed or externally set. The objective commonly sums final opinions, or the opinions associated with a desired stance, over the network.
- Opinion maximization differs from influence maximization because more exposure does not necessarily produce more favorable opinion. Opinion updates can amplify, resist, reverse, or dilute a seed's effect.
- Signed and directed edges represent asymmetric reinforcement and opposition. In a social trust network, agreement with a trusted neighbor may reinforce an opinion while disagreement with an untrusted neighbor may be influential.
- Global public information can change the perceived utility of positive and negative opinions in addition to local neighbor feedback. Threshold rules can restrict interaction to neighbors whose scores are sufficiently higher.
- Signed interactions and nonlinear or threshold-based updates can make the objective non-monotone and non-submodular. Greedy selection may remain useful as a heuristic but loses the standard influence-maximization guarantee.
- Two-stage methods reduce computation by screening candidates with a structural or opinion-aware influence score, then applying a more expensive marginal-gain search to the smaller candidate set.

## Important Papers

- [[Opinion Maximization on Social Trust Networks Considering Local and Global Information]]
- Gionis, Terzi, and Tsaparas (2013), "Opinion maximization in social networks."
- Xu, Hu, Wu, and Liu (2021), "Opinion maximization in social trust networks."
- He, Sun, Wang, Wang, Huang, Yi, et al. (2021), "Positive opinion maximization in signed social networks."
- He, Wang, Huang, and Yi (2021), "Multi-stage opinion maximization in social networks."
- He, Wang, Yi, Mao, Cai, and Huang (2020), "Opinion maximization through unknown influence power in social networks under weighted voter model."

## Related Concepts

- [[Opinion Dynamics]]
- [[Social Trust Networks]]
- [[Social Network Analysis]]
- [[Network Games]]
- Influence maximization
- Social contagion
