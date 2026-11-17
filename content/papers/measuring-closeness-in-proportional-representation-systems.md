---
title: Measuring Closeness in Proportional Representation Systems
type: paper
authors:
  - Simon Luechinger
  - Mark Schelker
  - Lukas Schmid
year: 2024
doi: 10.1017/pan.2023.22
tags:
  - electoral-systems
  - causal-inference
  - proportional-representation
---

## TL;DR

The paper derives candidate-level vote surpluses and shortfalls for proportional representation, combining party seat allocation with within-party candidate ranking. The resulting signed distance supports electoral competitiveness measurement and regression discontinuity (RD) designs across open and closed lists and both major allocation families.

## Research Question

How many votes must a candidate gain or lose to reach the boundary of election when votes affect both party seats and candidate ranking?

## Motivation

Raw vote gaps do not identify marginal seats under proportional representation. Candidate-only margins can overlook an easier route through an additional party seat, and cannot be computed when all or none of a party's candidates win.

## Contributions

- Derives party margins for every potential seat under highest-average and largest-remainder rules.
- Aggregates party and candidate margins into a unified signed distance, including non-marginal candidates.
- Illustrates adaptations for party alliances and applications to individual incumbency advantage in three countries.

## Method

The counterfactual changes the focal candidate's votes while holding other candidates' and parties' votes fixed. Positive margins denote surpluses and negative margins shortfalls; zero denotes an election boundary.

For D’Hondt allocation with $n$ seats, let $q_{n-i+1}^{(-j)}$ be the $(n-i+1)$th largest quotient among other parties. Party $j$'s margin for its $i$th seat is

$$
P_{ij}=V_j-iq_{n-i+1}^{(-j)}.
$$

For Hare–Niemeyer allocation, the procedure solves candidate vote totals at which remainders tie, recalculates the quota and remaining seats, and selects the tie corresponding to the final allocated remainder seat. Thus the quota changes with the focal party's votes.

In open lists, $C_{hij}$ is the vote difference between candidate $h$ and the $i$th highest other copartisan, with a boundary convention for the lowest position. The overall margin is

$$
M_{hj}=\max_i\min(P_{ij},C_{hij}).
$$

Each minimum imposes both the party-seat and candidate-rank requirement; the maximum selects the easiest feasible route to election. In the worked D’Hondt example, party margins $(15,-10,-100)$ and candidate margins $(-14,3,8)$ yield $M=-10$, rather than the candidate-only shortfall of 14 votes. Closed lists use the party margin for the candidate's fixed list position. Section 2.4 refers to an alliance extension in the supplement.

## Experiments

The empirical illustrations estimate the discontinuity in unconditional election probability at the next election, using margins divided by eligible voters. Local linear fits use triangular kernels, bandwidth sensitivity checks, and candidate-clustered confidence intervals.

| Setting | Data and rules | Reported finding |
| --- | --- | --- |
| Switzerland | 22 elections, 1931–2015; 41,463 observations, 26,629 candidates; open-list D’Hondt | Incumbency advantage of roughly 30–45 percentage points across displayed bandwidths. |
| Honduras | 2009, 2013, 2017; 3,025 observations, 2,644 candidates; open-list Hare–Niemeyer | No detected incumbency advantage; reported checks support balance and specification robustness. |
| Norway | Closed-list modified Sainte-Laguë | Including all candidates yields a larger estimated advantage than restricting to marginal candidates. |

In Switzerland, candidate-only margins are undefined for 44% of candidates; the party margin binds for another reported 3%. A separate numerical simulation shows election probabilities varying strongly with resampling size, demonstrating dependence on simulation choices rather than an invariant vote distance (§3.4).

## Limitations

The distance is conditional on a fixed-other-votes counterfactual. Redistributing votes across parties or candidates defines a different quantity and requires further assumptions. Correctly measuring the assignment variable does not establish RD identification: other determinants of future outcomes must be continuous at the cutoff. The authors caution that fixed seat totals can conceal manipulation from a density test because moving one candidate above the cutoff moves another below it.

The supplied text has OCR artifacts in mathematical indices; this summary uses the clearly explained D’Hondt and aggregation expressions rather than reproducing every largest-remainder formula. Norway's introduction describes eight elections in 1953–1981, whereas the application heading says 1953–1985; the supplied text does not explicitly reconcile these periods. Supplementary analyses are described by the article but are not included in the supplied Markdown.

## Related Concepts

- [[concepts/electoral-closeness-in-proportional-representation|Electoral Closeness in Proportional Representation]]: combines party-seat and within-party ranking thresholds.

## Related Papers

- [[papers/inference-at-the-datas-edge-gaussian-processes-for-estimation-and-inference-in-the-face-of-extrapolation-uncertainty|Inference at the Data’s Edge]]: addresses estimation and uncertainty near RD boundaries, complementing this paper's construction of the running variable.
- Fiva and Smith (2018), “Political Dynasties and the Incumbency Advantage in Party-Centered Environments”: supplies the Norwegian application data.
- Kotakorpi, Poutvaara, and Terviö (2017), “Returns to Office in National and Local Politics”: simulation-based comparison discussed in the article.

Published online July 24, 2023; Political Analysis 32 (2024): 101–114. Replication materials reported by the paper: https://doi.org/10.7910/DVN/FBZMWN.
