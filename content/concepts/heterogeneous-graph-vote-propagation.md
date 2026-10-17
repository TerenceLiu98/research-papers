---
title: Heterogeneous Graph Vote Propagation
type: concept
aliases:
  - Random Walks on a Heterogeneous Graph for Vote Prediction
  - RWHG
tags:
  - heterogeneous-graphs
  - link-prediction
  - roll-call-voting
  - random-walks
---

## Overview

Heterogeneous graph vote propagation predicts missing actor-item decisions by combining similarity among actors, similarity among items, and observed decisions connecting the two. For legislative roll calls, the actor graph represents cosponsorship, the item graph represents bill-text similarity, and directed cross-type links represent votes. This formulation connects legislative prediction to user-based and item-based collaborative filtering.

## Key Ideas

- **Separate outcome graphs:** Encoding yea and nay as distinct nonnegative adjacency matrices permits random-walk calculations without treating a negative outcome as a negative probability.
- **Two sources of transferable evidence:** Similar legislators supply evidence about a common bill, while similar bills supply evidence about a particular legislator. A mixture parameter controls their relative contribution.
- **Two-stage relevance computation:** RWHG first derives degree-weighted random-walk-with-restart relevance matrices within each vertex type. It then propagates each class matrix as $P^c\leftarrow\gamma R_xP^c+(1-\gamma)P^cR_y$.
- **Greedy completion:** Normalized yea/nay scores and a prior-dependent information criterion select the next predicted link. Adding it to the graph makes later predictions depend on earlier inferred outcomes, so errors may propagate.
- **Different missingness targets:** Randomly hidden votes can use other observed votes on the same bill. A new bill with no observed votes initially needs the bill-similarity path to connect it to voting history; actor similarity alone cannot supply that initial evidence.
- **Prediction and interpretation:** Cosponsorship similarity and graph relevance can improve prediction without identifying causal influence or recovering a uniquely interpretable ideological scale. Reported vote-class scores also require calibration evaluation before being treated as calibrated probabilities.

## Important Papers

- [[papers/legislative-prediction-via-random-walks-over-a-heterogeneous-graph|Legislative Prediction via Random Walks over a Heterogeneous Graph]]: introduces the two-stage RWHG procedure and reports 91.10% random missing-vote accuracy and 90.36% chronological accuracy on the 110th and 111th U.S. Congresses. Bill-based nearest neighbors outperform legislator-based nearest neighbors in the reported missing-vote comparison.

## Related Concepts

- [[concepts/topic-factorized-ideal-points|Topic-Factorized Ideal Points]]: combines bill text and voting through latent topic-specific parameters rather than similarity propagation.
- [[concepts/llm-based-roll-call-vote-prediction|LLM-Based Roll-Call Vote Prediction]]: another approach in which predicted votes can become inputs to subsequent predictions, with similar concerns about error propagation but a different modeling mechanism.
