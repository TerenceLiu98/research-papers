---
title: Competitive Concern Minimization
type: concept
tags:
  - misinformation
  - information-diffusion
  - social-networks
  - combinatorial-optimization
  - nonsubmodular-optimization
---

## Overview

Competitive concern minimization selects users to distribute corrections while misinformation is spreading, with the objective of minimizing the expected total concern among users who end in the misinformation-activated state. It differs from influence minimization because it weights affected users by how strongly they care about the information, so minimizing the number of affected users alone may choose the wrong intervention.

## Key Ideas

- The intervention problem couples two competing cascades: a misinformation cascade and a delayed correction cascade. User states, timing, authority, similarity, and herd effects determine which cascade reaches each user.
- A concern-weighted objective can be nonnegative and non-increasing while lacking both submodularity and supermodularity. This removes the usual greedy-algorithm guarantee and makes objective evaluation computationally difficult.
- Concern-aware models can represent an innate vector of concern over information categories and update concern as messages pass through the network. These quantities are model variables and require empirical calibration before they can be interpreted as user behavior.
- Continuous relaxations based on the Lovasz extension and convex envelopes can provide approximate optimization tools for nonsubmodular objectives. The TAPS method combines this relaxation with candidate pruning and projected subgradient updates.
- Network heuristics are not interchangeable with concern-aware optimization. Out-degree, PageRank, closeness, and high initial concern can rank different users, and their effectiveness varies with network, timing, information category, and agent budget.

## Important Papers

- [[Minimizing the Misinformation Concern over Social Networks]]

## Related Concepts

- [[Misinformation Spreading Models]]
- [[Rumor Refutation on Social Media]]
- [[Social Network Analysis]]
- Submodular optimization
