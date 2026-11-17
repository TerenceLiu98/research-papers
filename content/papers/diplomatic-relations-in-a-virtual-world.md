---
title: Diplomatic Relations in a Virtual World
type: paper
authors:
  - Aaron Bramson
  - Kevin Hoefman
  - Koen Schoors
  - Jan Ryckebusch
year: 2022
doi: "10.1017/pan.2021.1"
source_job_id: "47aaad8b-1515-4a16-99d6-6b604872a2ab"
tags:
  - signed-networks
  - international-relations
  - structural-balance
---

## TL;DR

Daily diplomatic standings in EVE Online support a multipolar interpretation of structural balance: mutually hostile triples persist, while triples with two friendly ties and one hostile tie are uncommon. Coalition structure offers stronger support than convergence toward complete balance; weighting by size, territory, distance, and standing strength does not eliminate persistent frustration.

## Research Question

Do human-controlled alliances in a virtual world follow structural balance predictions, and do alliance importance and geographic proximity improve those predictions?

## Motivation

International relations provide relatively few actors and slow-moving, context-dependent observations. EVE supplies frequent, explicitly recorded political decisions under stable game rules, with real investments of time and money. Its informal coalitions also provide a comparison between network partitions and player-recognized political organization.

## Contributions

- Distinguishes four triad configurations to accommodate multipolar competition.
- Extends descriptive balance analysis with weighted triad proportions and conditional triad transitions.
- Compares network-derived coalitions with player-reported memberships and examines internal friendship and external hostility.

## Method

The analysis covers February 4, 2015–April 17, 2016, separately studying alliances with more than 200 members and alliances holding sovereignty. Directed standings have about 84% matched-sign reciprocity. For triad classification, either negative or neutral direction makes the symmetric edge negative; two positive directions, or one positive direction with the reverse unset, make it positive.

Triads with zero, one, two, or three negative edges are called strongly balanced, strongly frustrated, weakly balanced, and weakly frustrated, respectively. The last category accommodates stable three-way antagonism. A triadic representation tracks individual triples through creation, persistence, state changes, and dissolution.

Membership and sovereignty weights use geometric means of normalized node properties. Proximity uses one minus the geometric mean of normalized centroid distances; standing strength uses absolute directed standings. Their arithmetic mean supplies a combined weight. A baseline randomly reallocates signs 100 times per day while preserving network structure and sign counts (Sections 3–4).

Coalition analysis compares six community methods using positive links and eleven vector-distance methods across outgoing, incoming, and symmetric representations. Accuracy assigns each discovered cluster its plurality player-reported coalition, then counts matching alliances; this is descriptive agreement rather than held-out prediction.

## Experiments

Mean sovereign-alliance triad proportions (Section 4):

| Configuration | Observed | Randomized baseline |
| --- | ---: | ---: |
| Strongly balanced | 20.26% | 5.60% |
| Strongly frustrated | 5.69% | 26.92% |
| Weakly balanced | 46.29% | — |
| Weakly frustrated | 27.76% | 43.66% |

More than 98% of triads retain their state from day to day. Among changes excluding deletion, 94.5% are one edge flip away. Conditional on changing, weakly balanced triads become weakly frustrated in 36.32% of cases, strongly frustrated in 11.98%, and dissolve in 49.53%. These patterns indicate avoidance of strong frustration without its disappearance.

Weighting generally has modest effects. Sovereignty weighting increases strongly balanced proportions among large alliances by 9.78 percentage points, but increases strong frustration by 0.40 points. Combined weighting changes conditional transitions only modestly and does not strengthen support for balance predictions (Tables 1–6).

Coalition comparisons use 38 sovereign alliances on the first day and 80 on the last. Hierarchical community detection on outgoing standings achieves 0.895 and 0.675 accuracy, respectively (mean 0.785). Mean accuracy across the best five methods is 0.752 for outgoing, 0.765 for incoming, and 0.766 for symmetric representations. First-day hierarchical partitioning finds four clusters with only four negative internal edges and two positive external edges among 543 edges (Section 5).

## Limitations

Persistent strong frustration contradicts complete convergence to balance. The observational comparisons do not identify balance as the unique cause of tie changes. Symmetrization and binary signs discard directional and intensity information, including distinctions between neutral and unset standings. Geographic centroids may misrepresent dispersed territories, and alliances can relocate. Player-reported coalition maps are imperfect, and static partitions can lag fluid affiliations. Generalization from a conflict-oriented game to states depends on whether incentives and institutional constraints are comparable.

## Related Concepts

- [[concepts/signed-political-networks|Signed Political Networks]]: diplomatic standings encode friendship and hostility, allowing triadic and coalition-level analysis.

## Related Papers

- [[papers/exponential-random-graph-models-for-dynamic-signed-networks|Exponential Random Graph Models for Dynamic Signed Networks]]: a methodological complement that models contemporaneous signed closure and persistence statistically, whereas this study analyzes descriptive triad transitions and coalition agreement.

Published in *Political Analysis* 30, 214–235 (2022); first published online April 21, 2021. Replication materials: [Harvard Dataverse](https://doi.org/10.7910/DVN/S8M39Y).
