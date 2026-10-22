---
title: Kendall Tau Distance
type: concept
aliases:
  - Kendall Distance
  - Bubble-Sort Distance
  - Adjacent-Swap Distance
tags:
  - ranking
  - preference-modeling
  - distance-metrics
---

## Overview

Kendall tau distance measures disagreement between two strict rankings by counting pairs of alternatives ordered differently. The same quantity is the minimum number of adjacent swaps needed to transform one ranking into the other, making it both an ordinal error measure and a graph distance on permutations.

## Key Ideas

- **Pairwise definition:** For rankings $\pi$ and $\pi'$, the distance is the number of unordered alternative pairs whose relative order is reversed.
- **Adjacent-swap equivalence:** Each adjacent swap changes one inversion, so the pairwise disagreement count equals the shortest adjacent-swap sequence between the rankings.
- **Range and normalization:** With $A$ alternatives, distance ranges from $0$ to $\binom{A}{2}$. Dividing by this maximum gives the fraction of alternative pairs ranked differently.
- **Permutohedron geometry:** Rankings can be represented as vertices of a permutohedron, with edges joining rankings one adjacent swap apart. Kendall tau distance is then shortest-path distance on this graph.
- **Interpretive scope:** The metric compares complete strict orders. Rankings with ties, partial rankings, or top-$k$ observations require an adapted definition and should not be treated as ordinary permutations without an explicit convention.

## Important Papers

- Kumar and Vassilvitskii (2010), "Generalized distances between rankings": situates Kendall-style measures within a broader ranking-distance framework.
- [[papers/error-in-the-euclidean-preference-model|Error in the Euclidean Preference Model]]: uses Kendall tau distance to lower-bound the error of approximating an arbitrary ranking in a Euclidean preference model.

## Related Concepts

- [[concepts/euclidean-preferences|Euclidean Preferences]]: the representable ranking family whose approximation error can be evaluated with Kendall distance.
- [[concepts/normalized-roll-call-voting-distance|Normalized Roll-Call Voting Distance]]: compares aggregate vote profiles in Euclidean space rather than comparing complete ordinal rankings.
- [[concepts/party-preference-cohesion|Party Preference Cohesion]]: another setting where within-group agreement is studied, though not necessarily through permutation distance.
