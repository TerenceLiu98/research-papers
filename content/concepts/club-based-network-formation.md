---
title: Club-Based Network Formation
type: concept
aliases:
  - Strategic Affiliation Network Formation
tags:
  - network-formation
  - social-networks
  - club-congestion
  - game-theory
---

## Overview

Club-based network formation models individuals choosing group affiliations that generate social links. A membership connects an individual to multiple club members at once, while overlapping affiliations create paths between clubs. The affiliation structure and its induced pairwise network are distinct objects: different club arrangements can generate the same unweighted graph while imposing different costs and link strengths.

## Key Ideas

- **Group size trades reach against quality.** In Fershtman and Persitz's model, link quality $h(m)$ falls weakly with club size. If two people share several clubs, the smallest one determines their direct-link weight. The direct value of a club is $k_h(m)=(m-1)h(m)$: more contacts need not mean greater total direct benefit.
- **Indirect access also loses value.** A path's value is the product of its link weights, and a pair's benefit uses its highest-value path. A direct connection through a large club may be better or worse than an indirect connection through small clubs.
- **Fees are paid per affiliation.** One large club can provide many weak contacts cheaply per contact; many small clubs offer stronger contacts at higher total membership cost. This differs from charging separately for each network edge.
- **Entry and exit create externalities.** A new member can improve access to other groups but reduce incumbents' existing link quality through congestion. Leaving a club can sever paths used by third parties.
- **Projection generates clustering.** Shared clubs induce cliques without requiring an explicit preference for transitive relationships. Observed clustering alone therefore cannot distinguish affiliation structure from preferences over individual links.
- **Architecture results have restricted scope.** For fixed club size, complete, star, and empty environments can maximize welfare over successive fee ranges. This does not characterize welfare for every mixture of club sizes or imply that stable affiliations are efficient.

## Important Papers

- [[papers/social-clubs-and-social-networks|Social Clubs and Social Networks]]: develops the strategic affiliation model, congestion trade-offs, and open versus closed membership stability.
- Feld (1981), "The Focused Organization of Social Ties": cited in that paper as a foundation for social contexts organizing ties.
- Jackson and Wolinsky (1996), "A Strategic Model of Social and Economic Networks": cited bilateral network-formation benchmark.

## Related Concepts

- [[concepts/clubwise-stability|Clubwise Stability]]: equilibrium restrictions on membership changes and new-club formation.
- [[concepts/hypergraphs|Hypergraphs]]: represent explicit groups rather than only their projected dyadic links.
- [[concepts/social-network-analysis|Social Network Analysis]]: describes the resulting connectivity and clustering.
