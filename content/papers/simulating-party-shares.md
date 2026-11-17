---
title: Simulating Party Shares
type: paper
authors:
  - Denis Cohen
  - Chris Hanretty
year: 2024
doi: 10.1017/pan.2023.13
tags:
  - party-systems
  - electoral-systems
  - compositional-data
---

## TL;DR

A standard Dirichlet distribution with theoretically specified mean shares and one estimated concentration parameter simulates realistic party systems conditional on their raw party count. On ParlGov elections, it fits better than politically adjusted or ordered alternatives and approaches a saturated model, although it overestimates effective party numbers.

## Research Question

How can researchers generate plausible vote or seat distributions for a given number of parties and estimate probabilities of majorities or coalition configurations?

## Motivation

Deterministic predictions of ranked party shares cannot quantify uncertainty about majority outcomes. Perturbing observed elections also cannot generate party systems from scratch for arbitrary party counts.

## Contributions

- Converts Taagepera and Allik’s logical share predictions into a probabilistic simulation model.
- Compares standard and ordered Dirichlet formulations against null, political-adjustment, and saturated benchmarks.
- Provides empirical concentration estimates and illustrates majority-probability calculations.

## Method

For raw party count $K$, the expected share of rank $i$ is recursively specified by

$$
p_i=\frac{1-\sum_{j<i}p_j}{\sqrt{K-i+1}}.
$$

Draw $\mathbf{s}\sim\operatorname{Dirichlet}(\alpha\mathbf{p})$, separating theoretical expected shares from estimated dispersion. Larger $\alpha$ concentrates draws around $\mathbf{p}$. Ordered means do not guarantee ordered draws from the standard distribution.

The ordered alternative uses differences between successive ascending expected shares, bounded by zero and one, as Dirichlet parameters and takes cumulative sums. Tied seat shares require negligible perturbations. The supplied main text refers to supplementary details for generating ordered deviates; this sketch should not be treated as a complete implementation recipe for normalized party shares.

The null model uses equal means. The political model reduces small-party shares and redistributes the surplus to larger parties. The saturated model estimates means separately by rank and system size. Stan fits seven specifications for each outcome: four standard models and three ordered models, excluding the ordered null because equal means imply zero differences.

## Experiments

ParlGov supplies 813 elections across 37 countries, with raw party counts from 2 to 20. Inclusion covers parties winning more than 1% of votes or at least two seats. Evaluation averages election-level RMSE and coverage of 90% posterior intervals and examines proportional errors in effective party counts and the two largest shares. These are fit comparisons; the supplied text does not describe a held-out test split.

Selected results from Tables 1–2 (RMSE in percentage points; calibration and effective-count errors in percent):

| Outcome | Model | Concentration | RMSE | Calibration | Effective-count error |
|---|---|---:|---:|---:|---:|
| Seats | Logical, standard | 39.1 | 7.75 | 87.4 | +8.95 |
| Seats | Logical, ordered | 18.5 | 9.30 | 94.8 | +16.9 |
| Seats | Political, standard | 37.2 | 8.06 | 79.5 | −6.03 |
| Seats | Saturated, standard | 41.9 | 7.24 | 90.6 | +5.00 |
| Votes | Logical, standard | 50.0 | 6.34 | 88.2 | +4.12 |
| Votes | Logical, ordered | 21.8 | 7.93 | 95.6 | +9.98 |
| Votes | Political, standard | 45.1 | 6.83 | 79.1 | −11.1 |
| Votes | Saturated, standard | 59.7 | 5.81 | 90.4 | +3.05 |

The authors recommend the standard logical model, using concentration roughly 40 for seats and 50 for votes. Their five-party example gives a single-party-majority probability of roughly one quarter. This is conditional on party count, not a universal electoral forecast.

## Limitations

The method requires a known or predicted raw party count. ParlGov omits presidential regimes and some smaller parliamentary democracies outside Europe; transportability is argued rather than directly demonstrated. Effective-party-count bias persists even when share fit is good. Ordered models add complexity and generally worsen fit. The parsed political-adjustment equation is corrupted, and the vote-results prose conflicts with the table on the saturated ordered model; numerical summaries above use the tables and omit ambiguous formulas.

Published online 11 April 2023; journal issue: *Political Analysis* 32 (2024), 140–147. Replication data: [Harvard Dataverse](https://doi.org/10.7910/DVN/3WILXI).

## Related Concepts

- [[concepts/quantitatively-predictive-logical-models|Quantitatively Predictive Logical Models]] — logical bounds specify the mean allocation before dispersion is estimated.
- [[concepts/effective-number-of-parties|Effective Number of Parties]] — evaluates whether simulated systems reproduce concentration, beyond the raw count.
- [[concepts/isometric-log-ratio-transformation|Isometric Log-Ratio Transformation]] — an alternative representation of compositional outcomes; this paper instead models shares on the simplex.

## Related Papers

- Taagepera and Allik (2006), “Seat Share Distribution of Parties: Models and Empirical Patterns” — supplies the deterministic logical and political means.
- [[papers/effective-number-of-parties-a-measure-with-application-to-west-europe|“Effective” Number of Parties]] — develops the concentration measure used to assess simulated fragmentation.
