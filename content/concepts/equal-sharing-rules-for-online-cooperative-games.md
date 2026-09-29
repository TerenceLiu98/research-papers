---
title: Equal Sharing Rules for Online Cooperative Games
type: concept
aliases:
  - Marginal Equal Share
  - MES
  - Non-Dummy Marginal Equal Share
  - NDMES
tags:
  - cooperative-game-theory
  - value-sharing
  - participation-incentives
---

## Overview

Equal sharing rules allocate each new marginal contribution in an [[concepts/online-cooperative-games|online cooperative game]] equally among a selected set of arrived players. The main design choice is who enters that sharing set. Equal division at each step does not imply equal final payoffs, because players participate in different increments.

## Key Ideas

For entrant $i$, let $P_i$ be the current prefix, $\Delta_i=v(P_i)-v(P_i\setminus\{i\})$, and $S^i\subseteq P_i$ the sharing set. Each member receives the increment $\Delta_i/|S^i|$. A positive increment requires a nonempty sharing set.

- **Structural route to early arrival:** Aziz et al.'s Theorem 4.3 states that S-Stay and Part imply Early Arrival within this family when sharing sets are nested across prefixes and depend only on prefix membership. These conditions are sufficient, not a full characterization.
- **MES:** take $S^i=P_i$. This satisfies the participation guarantees but can pay dummy players.
- **NDMES:** exclude current prefix dummy players. This retains the participation guarantees and satisfies Online Dummy, but testing dummy status can require checking exponentially many coalitions. The paper reports polynomial computability under subadditivity.
- **Greedy pruning:** ULMES examines players from latest to earliest and removes those dispensable for retaining the full prefix value. It avoids dummy payments and uses $O(n^2)$ valuation checks overall, but can reward delayed arrival under general monotone valuations.
- **Decomposition:** eULMES applies ULMES to weighted monotone 0-1 component games and aggregates the results. The paper states that this recovers Early Arrival while preserving S-Stay, Part, and Online Dummy; polynomial runtime is guaranteed for the 0-1 case, not in general.
- **Singleton-first refinement:** under superadditivity, first pay $v(\{i\})$ to entrant $i$, then share $\Delta_i-v(\{i\})$. The paper reports preservation of the earlier axioms for IR-MES, IR-NDMES, and IR-eULMES. This guarantee is restricted to the stated domain and variants.

These constructions prioritize participation over Shapley fairness. Their guarantees should not be read as equal expected Shapley rewards or as empirically tested participation effects.

## Important Papers

- [[papers/participation-incentives-in-online-cooperative-games|Participation Incentives in Online Cooperative Games]] (Aziz, Guo, and Sun, 2026): introduces the sharing-set conditions, variants, counterexamples, and IR refinement. Several proofs and decomposition details are deferred to an appendix absent from the supplied source.

## Related Concepts

- [[concepts/online-cooperative-games|Online Cooperative Games]]: supplies the prefix model and the incentive and fairness criteria that sharing rules must satisfy.
