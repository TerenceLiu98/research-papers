---
title: "Blocks as Geographic Discontinuities: The Effect of Polling-Place Assignment on Voting"
type: paper
authors:
  - Sabina Tomkins
  - Keniel Yao
  - Johann Gaebler
  - Tobias Konitzer
  - David Rothschild
  - Marc Meredith
  - Sharad Goel
year: 2023
doi: "10.1017/pan.2022.19"
tags:
  - election-administration
  - voter-turnout
  - causal-inference
---

## TL;DR

Comparisons of registered voters living on the same residential block show that assignment to a farther or newly changed polling place reduces Election Day voting. Increased early in-person and mail voting offsets nearly all of the distance effect and more than half of the reassignment effect. The findings concern voting modes among registrants, rather than participation among all eligible citizens.

## Research Question

How do polling-place distance and reassignment affect Election Day voting, substitute voting modes, and overall turnout?

## Motivation

Search and transportation costs can discourage Election Day participation, but alternative voting methods may preserve turnout. Prior studies differ in access to alternatives and whether polling-place changes arise from consolidation, expansion, or relocation. A design that works without precinct-boundary shapefiles enables comparisons across more jurisdictions.

## Contributions

- Introduces two within-block geographic comparisons separating relative distance under stable assignments from polling-place reassignment.
- Links state polling-place records with individual registration and vote histories across multiple states.
- Demonstrates why Election Day turnout losses need not imply equivalent losses in total participation.

## Method

State-supplied polling-place addresses and precinct identifiers are linked to November 2012 and November 2016 TargetSmart voter files. Street-number prefixes, street names and types, city, and state identify residential blocks. Baseline samples retain stationary registrants, blocks with two polling-place assignments and at least two registrants per assignment, and blocks whose registrants are no more than 0.3 miles apart.

The relative-distance design compares farther versus nearer assignments that remain unchanged between elections: 252,428 registrants across Hawaii, Iowa, Indiana, Maryland, North Carolina, Pennsylvania, Rhode Island, Texas, Utah, and Wisconsin. The shock design compares changed versus unchanged assignments on the same block: 47,321 registrants across Iowa, Indiana, Maryland, North Carolina, Pennsylvania, and Wisconsin. Before a shock, assignments must be to the same location or have average distances differing by at most 0.25 miles.

For each binary outcome—Election Day voting, substitute voting, and any voting—the authors regress the outcome on treatment with block fixed effects and household-clustered standard errors (Equation 1). Identification assumes that opposite block faces would have similar voting behavior absent their assignment differences. This is an application of [[concepts/spatial-causal-inference|Spatial Causal Inference]]; proximity alone does not establish exchangeability.

## Experiments

This is a quasi-experimental analysis of 2016 presidential-election participation. Section 4 reports the following pooled differences, in percentage points; uncertainty is reproduced in the article's ± notation, with Figure 2 describing 95% confidence intervals.

| Comparison | Election Day voting | Early in-person or mail voting |
| --- | --- | --- |
| Farther versus nearer | −1.5 ± 0.40 | +1.6 ± 0.36 |
| Changed versus stable polling place | −1.3 ± 1.00 | +0.76 ± 0.71 |

Total turnout differs little for the relative-distance comparison. The shock estimates indicate substantial, but incomplete, substitution. Eight of ten states show the expected direction for each distance-related mode outcome. About 85% of distance differences are below one mile.

Reported diagnostics find small observable differences, similar house prices, and similar prior voting patterns for the shock groups. Registration-retention differences are small and imprecise. The article reports nearly identical conclusions with block-distance cutoffs of 0.1 or 0.5 miles and, for relative distance, after admitting movers. These supplementary analyses are described in the main text; the supplied source does not include the supplement itself.

States with less substitute voting in 2012 show less substitution in response to distance in 2016, but other state characteristics may explain this association. Larger distance increases accompanying shocks predict larger Election Day declines; these comparisons also change rural composition and the mix of consolidations, so they do not identify a causal effect per mile.

## Limitations

- Conditioning on registration can introduce selection if assignment affects registration. Stable-address restrictions and geocoding requirements also limit generalization, particularly to movers and rural residents.
- Political influence over polling-place siting could violate within-block comparability despite balance diagnostics.
- Farther versus nearer bundles different travel distances and transportation modes; it is not a standardized travel-time or per-mile treatment.
- Shocks combine search costs with distance changes and other consequences of additions, consolidations, or relocations. They do not isolate pure search costs.
- Most states do not distinguish early in-person from mail ballots in the available histories. Results need not transfer to elections with less accessible alternatives.

## Related Concepts

- [[concepts/costly-voting|Costly Voting]]: administrative search and travel costs can change voting mode as well as the decision to participate.
- [[concepts/spatial-causal-inference|Spatial Causal Inference]]: same-block comparisons exploit geographic assignment differences under a local comparability assumption.

## Related Papers

- [[papers/partisan-alignment-increases-voter-turnout-evidence-from-redistricting|Partisan Alignment Increases Voter Turnout: Evidence from Redistricting]]: another study of administrative reassignment and turnout among stationary registrants, with partisan context rather than polling access as the treatment.
- Cantoni (2020), “A Precinct Too Far: Turnout and Voting Costs”: studies relative distance independently of shocks but finds larger overall turnout losses.
- Brady and McNulty (2011), “Turning Out to Vote: The Costs of Finding and Getting to the Polling Place”: separates search and transportation costs in an earlier setting with less offsetting substitution.
- Keele and Titiunik (2015), “Geographic Boundaries as Regression Discontinuities”: methodological foundation for geographic comparisons.

Published in *Political Analysis* 31, 165–180 (2023), online 3 August 2022. Replication data: https://doi.org/10.7910/DVN/45GQNA.
