---
title: "Refining Gamson: The Isometric Log-Ratio Transformation and Portfolio Proportionality in Multiparty Governments"
type: paper
authors:
  - Lanny W. Martin
  - Georg Vanberg
year: 2026
journal: Political Analysis
doi: 10.1017/pan.2026.10036
tags:
  - compositional-data
  - coalition-politics
  - political-methodology
---

## TL;DR

Martin and Vanberg model cabinet allocations with isometric log-ratio (ILR) balances and government-specific slopes. Their simulations favor this approach over regressions on raw shares; reanalysis of 308 governments finds a less proportional and more heterogeneous seat–portfolio relationship than conventional OLS suggests.

## Research Question

Does the apparent stability of [[concepts/gamsons-law|Gamson’s Law]] survive a model that respects the compositional structure of seat and portfolio shares?

## Motivation

Within a cabinet, shares sum to one and a gain for one party requires losses elsewhere. Dropping one party from a raw-share regression does not remove boundedness or dependence among the remaining shares. The authors argue that the conventional additive log-ratio plus seemingly unrelated regression approach is poorly suited to cabinets whose party identities and sizes change.

## Contributions

- Applies [[concepts/isometric-log-ratio-transformation|Isometric Log-Ratio Transformation]] to portfolio allocation, constructing balances separately within each cabinet.
- Compares recovery of average proportionality and slope heterogeneity against four leave-one-out OLS specifications.
- Reassesses both the average seat–portfolio association and its variation across governments.

## Method

For a government with K parties, construct K−1 balances for both seat and portfolio compositions using a sequential binary partition. The empirical partition orders parties from smallest to largest by seat share and contrasts each party with the geometric mean of the remaining larger parties. Pool balances in a multilevel regression with a government-level random slope; map fitted compositions back to share space for prediction assessment.

The simulation generates portfolio balances from seat balances with mean slope 0.70, random-slope standard deviation 0.13, residual standard deviation 0.36, and zero intercept. These are log-ratio-space parameters. The boundary proximity index measures concentration of portfolio shares, ranging from balanced allocations toward simplex boundaries.

## Experiments

### Monte Carlo comparison

Each of ten concentration bins contains 500 replications of 300 three-party governments. Comparators are single-level and multilevel leave-one-out OLS, each with conventional or government-clustered standard errors. Metrics include bias, RMSE, confidence-interval coverage, and power.

The authors report near-nominal 95% slope coverage for multilevel ILR across concentration bins. OLS coverage approaches zero above boundary proximity 0.20; at values above 0.50, reported slope bias is about 0.13 under their share-scale comparison. ILR also recovers slope heterogeneity, although recovery weakens near the simplex center. OLS multilevel estimates tend toward zero heterogeneity. These results concern the specified ILR-generated data-generating process.

### Coalition data

The application covers 910 parties in 308 governments across 16 parliamentary democracies, yielding 602 balances. Tables 1–3 report:

| Quantity | Estimate (standard error) |
| --- | --- |
| Raw-share OLS slope | 0.790 (0.011) |
| Raw-share OLS intercept | 0.068 (0.004) |
| Multilevel ILR slope | 0.712 (0.024) |
| Multilevel ILR intercept | −0.001 (0.026) |
| ILR random-slope variance | 0.017 (0.005) |

These slopes use different coordinate systems and are not directly comparable marginal effects. The ILR likelihood-ratio test favors a random slope over a fixed slope (21.82, p < 0.001); the corresponding raw-share multilevel test does not (p > 0.14). The authors report that raw-share OLS residual sum of squares is 56% higher than that of back-transformed ILR predictions.

## Limitations

- Simulations generate outcomes from the proposed ILR model; superiority there does not establish robustness to arbitrary compositional processes.
- Log-ratios require positive parts. The supplied text does not document a zero-share treatment.
- The authors summarize their transformed slope using an approximate 4:3 proportionality comparison. This should not be read as a universal marginal effect on individual shares: effects depend on the composition and inverse transformation.
- The supplied Markdown omits numbered footnote contents and supplementary derivations. Its displayed balance formulas omit normalization factors; implementation details should be checked against replication materials. Orthogonal coordinates alone do not establish statistical independence of errors.
- The empirical model detects heterogeneity but does not identify its causal sources. Proposed applications to elections, spending, and media attention are extensions rather than tested results here.

## Related Concepts

- [[concepts/isometric-log-ratio-transformation|Isometric Log-Ratio Transformation]] represents relative allocations with balance coordinates.
- [[concepts/gamsons-law|Gamson’s Law]] is the substantive proportionality hypothesis being reassessed.

## Related Papers

- Martin and Vanberg (2020), “What You See Is Not Always What You Get: Bargaining before an Audience under Multiparty Government,” supplies the coalition dataset and earlier OLS analysis.
- Egozcue et al. (2003), “Isometric Logratio Transformations for Compositional Data Analysis,” introduces the transformation used here.
- Aitchison (1982), “The Statistical Analysis of Compositional Data,” provides the compositional framework.

Replication materials: [Harvard Dataverse](https://doi.org/10.7910/DVN/MZAALH). Summary based on the supplied parsed article; supplementary materials and replication code were not evaluated.
