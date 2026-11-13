---
title: "Beyond the Federer paradox in tennis"
type: paper
authors:
  - Andrés Martín
  - Johann H. Martínez
  - Javier M. Buldú
year: null
source_job_id: "2b309245-efac-469c-9229-f01742d7ecbc"
tags:
  - sports-statistics
  - hierarchical-scoring
  - stochastic-models
---

## TL;DR

Small point advantages become large match advantages primarily because matches aggregate many points. A two-probability model shows how superior performance on crucial points can also produce a majority of match wins with a minority of points. ATP evidence supports a small departure from independent-point benchmarks, although its magnitude depends strongly on modelling the serve.

[[index|Library home]]

## Research Question

When can a player win most matches while winning fewer than half of all points, and how do scoring rules and performance on crucial points determine this possibility?

## Motivation

Federer’s roughly 54% of points and 82% of matches illustrate amplification, but losing matches despite winning more points poses a different question. Raw counts confound conversion ability with opportunities: dominant players have more matches in which they can lose despite a point majority.

## Contributions

- Relates amplification near equal ability to mean match length across six formats in four sports.
- Characterises a narrow paradox region using ordinary-point and crucial-point probabilities and their relative influence on outcomes.
- Separates match conversion, serve-adjusted pressure performance, and close match balance in men’s professional tennis.

## Method

The model assigns probability $p_1$ to ordinary points and $p_2$ to points on which either player could close a game, set, or match at the selected level. Exact Markov calculations and pointwise Monte Carlo simulations yield match-win probability $P$ and pooled point share $F=E[N_A]/E[N_A+N_B]$. This is a ratio of expected totals, not an average of within-match shares.

For identical point probabilities, the slope near equality is approximately $\sqrt{2N/\pi}$, with $N$ the mean match length. Near $(p_1,p_2)=(1/2,1/2)$, a region with $P>1/2$ and $F<1/2$ exists when $P_2/P_1>F_2/F_1$, where subscripts denote partial derivatives. Crucial points must contribute more influence than their numerical frequency implies (Results, Eqs. 1–3).

The empirical benchmark $\pi(f)$ conditions on the realised point share in each match and is estimated from four million simulations per tennis format. It differs from substituting a career point share into the theoretical win curve. Match conversion averages $w_m-\pi(f_m)$; close match balance subtracts expected from observed paradoxical wins minus losses. The pressure index compares break-point wins with serve- and return-specific ordinary-point expectations.

## Experiments

The aggregate sample contains 97,950 completed ATP matches from 1991–2025; player comparisons use 328 players with at least 200 matches. Cleaned Grand Slam point sequences cover 4,062 matches from 2011–2024.

| Finding | Reported result |
| --- | --- |
| Amplification approximation | Within 5% across six scoring formats |
| Local paradox wedge | Opening angles of 0.3–1.6 degrees |
| Matches won with fewer points | 4,530 of 96,826 non-tied-point matches, or 4.68% |
| Independent-point expectation | 3,892 matches, or 4.02%; observed excess 16% |
| Serve-aware benchmark | Excess falls to 5%, z = 3.9 |
| Pressure measured in other seasons | Logistic coefficient 0.076 per percentage point, SE 0.011, across 90,229 matches |
| Fognini | 49.4% of points, 51.2% of 774 matches; close match balance +26.0 |

Fognini won close sets disproportionately and lost other sets by larger margins; his break-point pressure index was only +0.5 percentage points. Break-point performance, tiebreak overperformance, and set-margin asymmetry jointly explain 37% of between-player close match balance variance. Federer’s estimated deficit of 17 close matches is borderline after multiple-testing correction and becomes nonsignificant under the serve-aware benchmark. The historical excess over the independent-point baseline shows no significant trend despite changes in the raw paradox rate (Results; Table 1).

## Limitations

The minimal model omits serve effects, time-varying form, fatigue, and differences in importance among crucial points. Empirical evidence concerns men’s tennis; aggregate ATP records identify break points rather than every crucial point. Grand Slam coverage is incomplete and requires exclusions for corrupted sequences. Within-match crucial-point advantages partly follow mechanically from selecting winners; cross-season tests reduce that problem but do not establish a causal pressure mechanism or constitute forecasts using only information available before a match. No individual pressure-index estimate survives multiple-comparison correction. Supplementary results are described in the supplied manuscript, but the supplementary material itself is not included.

The supplied text provides no explicit publication year, venue, DOI, or identifier; the year is left unspecified.

## Related Concepts

- [[concepts/point-importance-in-hierarchical-scoring|Point Importance in Hierarchical Scoring]]

## Related Papers

The manuscript builds on Morris, *The most important points in tennis* (1977), for point importance; Wright, Rodenberg, and Sackmann, *Incentives in best of N contests: quasi-Simpson’s paradox in tennis* (2013), for paradoxical outcomes; and Lisi, Grigoletto, and Canesso, *Winning tennis matches with fewer points or games than the opponent* (2019), for earlier empirical and simulation analysis. These references are taken from the supplied manuscript.
