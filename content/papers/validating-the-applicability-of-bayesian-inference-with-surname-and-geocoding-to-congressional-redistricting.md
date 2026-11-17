---
title: "Validating the Applicability of Bayesian Inference with Surname and Geocoding to Congressional Redistricting"
type: paper
authors:
  - Kevin DeLuca
  - John A. Curiel
year: 2023
doi: "10.1017/pan.2022.14"
tags:
  - redistricting
  - race-estimation
  - bayesian-inference
---

## TL;DR

Summing Bayesian Improved Surname Geocoding (BISG) race probabilities produces more accurate precinct and congressional-district racial composition estimates than assigning each voter their most probable race. Validation against self-reported voter-file race in North Carolina and Georgia, with 10,000 simulated congressional plans per state, finds Black-share errors around five percentage points or less under probability summation; Georgia White-share errors can approach ten points.

## Research Question

How accurately can BISG estimate the racial composition of proposed congressional districts, and how does aggregating probabilities compare with plurality assignment?

## Motivation

Census population shares do not capture differences in registration and turnout across racial groups. Voter files can support electorate-based estimates, but many states lack self-reported race. Reliable aggregate estimates could help assess minority representation without introducing additional packing or cracking through measurement error.

## Contributions

- Validates BISG for precinct and district composition against voter-file race.
- Compares probability-summed and plurality allocation using the same underlying race predictions.
- Uses alternative district boundaries to characterize variation in estimation error across states, racial groups, and district composition.

## Method

The authors use zipWRUext to estimate race probabilities from surnames and ZIP-code demographics. This avoids address-level geocoding, at the cost of potentially less accurate estimates for non-Black minority groups than finer Census geography.

For voter probabilities (p_{ir}), the probability-summed method (PSM) estimates a geographic unit's count in group (r) as the sum of (p_{ir}) over its voters. The plurality method (PM) first assigns each voter to the group with the largest probability and then counts assignments. Dividing counts by the unit's voter total yields estimated shares. PSM retains uncertainty that PM discards.

The study aggregates predictions to precincts and then simulated districts. Using Redist version 2 and precinct-based maps with rook contiguity, it generates 10,000 plans for each state. District errors are absolute percentage-point differences between estimated and self-reported voter-file racial shares. The authors summarize simulated error distributions with 95% intervals.

## Experiments

At the precinct level, both methods have White-voter error distributions with modes near zero, but PM has a longer right tail. PSM substantially reduces Black-voter errors. Precinct errors are described as absolute percentage differences in counts, distinct from district percentage-point share errors.

At the district level, PSM has lower absolute errors in nearly all comparisons:

| Group and state | Reported PSM error pattern |
| --- | --- |
| White, North Carolina | Close to zero |
| Black, North Carolina | Does not exceed about five percentage points |
| White, Georgia | Reaches about ten percentage points |
| Black, Georgia | Peaks around five percentage points |

These approximate magnitudes are the text's descriptions of Figure 2, not independently reconstructed numerical results. The authors recommend probability summation for aggregate racial composition and allowing for roughly 5–10 percentage points of district-level error depending on context.

## Limitations

Validation covers two states where Black and White voters are the largest racial groups and residential segregation is substantial. Accuracy need not transfer to more heterogeneous states or electorates with larger Hispanic and other minority populations. Results validate registered-voter racial composition, not turnout, vote choice, or the ability to elect a preferred candidate. Incorporating voter-history turnout information remains future work.

The supplied Markdown refers to supplementary diagnostics and data descriptions but does not include them; it also omits the text of numbered footnotes. Consequently, detailed sampling constraints and individual-level diagnostics cannot be assessed here. Simulation-based error intervals describe this validation setting and should not be treated as universal uncertainty bounds for new states.

## Related Concepts

- [[concepts/bayesian-improved-surname-geocoding|Bayesian Improved Surname Geocoding]] combines surname and geography information while retaining race probabilities for aggregation.
- [[concepts/redistricting-ensembles|Redistricting Ensembles]] supply alternative boundaries over which measurement errors can be evaluated.

## Related Papers

- Imai and Khanna (2016), “Improving Ecological Inference by Predicting Individual Ethnicity from Voter Registration Record”: methodological foundation cited for voter-file BISG.
- Clark, Curiel, and Steelman (2021), “Minmaxing of Bayesian Improved Surname Geocoding and Geography Level Ups in Predicting Race”: cited foundation for the ZIP-code implementation.
- [[papers/a-decomposition-of-partisan-advantage-in-electoral-district-maps|A Decomposition of Partisan Advantage in Electoral District Maps]] addresses a complementary question: how legal constraints and ensemble benchmarks affect attribution of partisan advantage, rather than validating racial measurement.

## Source and Replication

Published in *Political Analysis* 31 (2023), 465–471; first published online 20 May 2022. Replication identifier: DOI 10.7910/DVN/LXGDWZ. The paper states that identifying voter-file information is redacted. This page uses the supplied parsed Markdown for Cognitio job 06cb7a08-9cb8-4286-9181-c28410b7ecda.
