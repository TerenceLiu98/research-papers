---
title: "The Spatial Structure of Party Competition: Party Dispersion within a Finite Policy Space"
type: paper
authors:
  - Josephine T. Andrews
  - Jeannette Money
year: 2009
source_job_id: 1ea2946a-75b6-4f28-913c-da25ed71147e
tags:
  - party-competition
  - comparative-politics
  - political-measurement
---

## TL;DR

Across 295 elections in twenty established parliamentary democracies, manifesto-based party dispersion increases with party-system size but broadly levels off around five parties. Electoral rules have no statistically significant independent association with dispersion in the reported regressions after controlling for party number. Even two-party systems exhibit substantial separation.

## Research Question

Does the number of parliamentary parties predict the breadth of policy alternatives, and do electoral rules explain dispersion independently of party number?

## Motivation

Spatial competition theory predicts different positioning incentives in two-party and multiparty systems. Comparisons of proportional and majoritarian systems can conflate institutional effects with differences in the number of competitors. Testing party number directly also asks whether additional parties continually expand the occupied policy space.

## Contributions

- Compares raw qualifying-party counts and effective parliamentary party numbers.
- Measures economic and social dispersion separately in a common cross-national manifesto space.
- Reports a plateau near five parties and separates party-number associations from electoral-rule associations.

## Method

Comparative Manifesto Project data cover twenty parliamentary democracies over 1945–1999. Separate principal component analyses of economic and social category subsets yield first-component party positions, pooled across countries and elections. Dispersion is the distance between the two extreme included parties on each dimension, not a weighted standard deviation or a joint two-dimensional distance.

The count measure admits parties winning at least 1% of parliamentary seats in two consecutive elections and drops parties after three consecutive elections below that threshold. The alternative uses the seat-share-based effective number of parties, grouped into intervals such as (1.5, 2.5] and (2.5, 3.5]. For this alternative, the corresponding number of largest parties by seat share determines which parties enter the range calculation. Thus both the predictor and the set defining dispersion change between specifications.

Unequal-variance t tests compare group means. OLS models regress log dispersion on log party number, a single-member-district indicator, and lagged log dispersion, with country-clustered robust standard errors. Median district magnitude replaces the electoral-rule indicator in a reported robustness check.

## Experiments

Table 2 contains 295 country-election observations; each regression in Table 4 uses 275.

| Classification | Economic range: two / multiparty | Social range: two / multiparty |
| --- | --- | --- |
| Qualifying-party count (13 / 282 elections) | 1.72 / 3.16 | 0.58 / 2.01 |
| Effective number (83 / 212 elections) | 1.67 / 2.76 | 1.04 / 1.62 |

Table 3's count-based economic ranges rise from 1.72 with two parties to 2.19, 2.78, and 3.92 with three, four, and five parties, respectively; six-party and seven-or-more systems average 3.50 and 3.60. Social ranges follow a similar broad pattern. Pairwise significance is less consistent for effective counts, especially on the social dimension: only the two-versus-three comparison is significant there.

Table 4 reports log-count coefficients of 0.39 (SE 0.14) for economic dispersion and 0.46 (0.17) for social dispersion. Effective-count coefficients are 0.87 (0.29) and 0.76 (0.25). All four are marked significant at the 95% level. Electoral-rule coefficients are not significant; replacing the indicator with median district magnitude leaves the main conclusion unchanged. Model R² values range from 0.19 to 0.31.

## Limitations

The pooled observational design does not isolate a causal effect of adding parties or establish institutional mediation. The plateau is a descriptive pattern, not an estimated universal five-party breakpoint. Limited within-country variation motivates pooling, making cross-national comparability central. Manifesto categories encode salience as well as position; the authors especially caution against a simple interpretation of the social dimension. Range measures depend on party inclusion, and the effective-count specification explicitly restricts coverage to the largest parties. Voter preferences are not directly modeled, so voter-driven and party-driven explanations of bounded space remain unresolved. Generalization beyond established parliamentary democracies is untested.

## Related Concepts

- [[concepts/party-system-polarization|Party-System Polarization]]: the paper uses extreme-party ranges rather than weighted variance.
- [[concepts/effective-number-of-parties|Effective Number of Parties]]: seat concentration supplies the alternative party-system size measure.
- [[concepts/party-position-measurement|Party-Position Measurement]]: pooled manifesto components define comparable policy coordinates.
- [[concepts/hotelling-downs-model|Hotelling-Downs Model]]: motivates competition-dependent convergence and divergence.

## Related Papers

- [[papers/estimating-party-positions-across-countries-and-time-a-dynamic-latent-variable-model-for-manifesto-data|Estimating Party Positions across Countries and Time]]: a later measurement approach explicitly models contextual shifts, addressing a comparability issue central to pooled manifesto analysis.

Publication year follows the existing library citation in Party-System Polarization; the supplied Markdown does not state publication metadata.
