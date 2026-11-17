---
title: Friendship Paradox
type: concept
aliases:
  - Mean Friendship Paradox
definition: "The friendship paradox is the increase in mean degree caused by sampling nodes through uniformly selected edge endpoints rather than uniformly across nodes."
tags:
  - network-science
  - network-sampling
---

## Overview

High-degree nodes appear in more neighbor lists. In an undirected network with positive mean degree $M$ and degree variance $V$, a uniformly sampled edge endpoint has expected degree $M+V/M$. This exceeds the uniform-node mean when degrees vary. It is an aggregate statement, not a claim that every person's friends are more connected.

## Key Ideas

- **Sampling determines the comparison.** A uniform edge endpoint has degree distribution proportional to $dP(D=d)$. Selecting a uniform person and then a uniform friend can give a different mean when the network has degree correlations.
- **Repeated nominations intensify the bias.** Counting common-neighbor instances for $k$ distinct neighbors weights degree by $(d)_k$. If $M_k,V_k$ are its weighted moments, then $M_{k+1}=M_k+V_k/(M_k-k)$ whenever the next distribution exists.
- **Heterogeneity controls amplification.** Highly skewed degree distributions can make a few shared nominations informative about hubs; narrow distributions offer weaker gains.
- **Local samples have local scope.** Repeated nominations within a restricted group may reveal only that group's hubs. First-hit stopping and incomplete neighbor lists also change the sampling distribution.

## Important Papers

- Feld (1991), *Why your friends have more friends than you do* — establishes the classical degree-weighted mean identity.
- [[papers/why-friends-in-common-reveal-network-stars|Why friends in common reveal network stars]] — derives a recurrence for common-neighbor degree and illustrates hub discovery through repeated nominations.

## Related Concepts

- [[concepts/chung-lu-graphs|Chung-Lu Graphs]] — neighbor distributions in this heterogeneous random graph model exhibit size bias; the friendship paradox itself is not specific to the model.
