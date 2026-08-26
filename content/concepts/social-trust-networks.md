---
title: Social Trust Networks
type: concept
aliases:
  - STNs
  - Signed Social Trust Networks
tags:
  - social-trust-networks
  - signed-networks
  - directed-networks
  - social-influence
  - opinion-dynamics
---

## Overview

Social trust networks represent interpersonal trust or distrust as directed, signed, and often weighted graphs. An edge records who evaluates or influences whom, its sign distinguishes positive trust from distrust, and its magnitude represents relationship strength. These networks provide a structure for studying opinion formation, information diffusion, social learning, and trust-aware decision making.

## Key Ideas

- Direction matters: the relationship from `i` to `j` need not have the same meaning or strength as the relationship from `j` to `i`.
- Positive and negative edges can encode reinforcement and resistance. In trust-aware opinion models, agreement with a trusted neighbor and disagreement with an untrusted neighbor may both increase perceived feedback.
- Edge weights determine how strongly a relationship contributes to an update. Normalizing outgoing weights can make influence comparable across nodes while preserving direction and sign.
- Trust-network data are heterogeneous. Rating-platform networks may contain explicit weighted trust, while voting networks may provide endorsement or opposition proxies rather than direct measures of interpersonal trust.
- Signed structure connects trust-network models to structural balance, polarization, influence maximization, and consensus formation. It can also break monotonicity and submodularity assumptions used by unsigned diffusion algorithms.
- Network topology alone is not an opinion model. Interpreting edges as opinion influence requires assumptions about how users observe, evaluate, and respond to their neighbors and to global public information.

## Important Papers

- [[Opinion Maximization on Social Trust Networks Considering Local and Global Information]]
- Xu, Hu, Wu, and Liu (2021), "Opinion maximization in social trust networks."
- He, Zeng, Zhang, and Liu (2022), "Generalized opinion dynamics model for social trust networks."
- Leskovec, Huttenlocher, and Kleinberg (2010), "Signed networks in social media."
- West, Paskov, Leskovec, and Potts (2014), "Exploiting social network structure for person-to-person sentiment analysis."

## Related Concepts

- [[Opinion Dynamics]]
- [[Opinion Maximization]]
- [[Social Network Analysis]]
- [[Consensus Reaching in Group Decision Making]]
- Signed networks
- Structural balance
