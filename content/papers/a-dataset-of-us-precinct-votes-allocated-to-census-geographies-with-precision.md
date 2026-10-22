---
title: "A Dataset of US Precinct Votes Allocated to Census Geographies with Precision"
type: paper
authors:
  - Amir Fekrazad
year: 2025
source_job_id: 7d274f5a-5219-43f3-a42b-7e0fea9eb4a8
tags:
  - electoral-geography
  - spatial-disaggregation
  - dasymetric-mapping
  - election-data
  - census-geographies
---

## TL;DR

This data descriptor reallocates 2016 and 2020 U.S. precinct election returns to census block groups, tracts, and ZIP Code Tabulation Areas (ZCTAs). Its preferred method, [[concepts/regionalized-land-cover-regression|Regionalized Land Cover Regression]], uses locally estimated land-cover weights to place household population within precinct-block-group intersections before distributing votes. It outperforms areal and impervious-surface weighting in census-block and North Carolina voter-file validations, while still relying on an untestable assumption that votes within each precinct are proportional to household population.

## Research Question

How can publicly reported precinct vote totals be allocated to standard census geographies accurately enough to support linkage with demographic, economic, health, and environmental data?

## Motivation

Precincts are the finest units at which U.S. election returns are generally reported, but most administrative covariates are published for census geographies. County aggregation suppresses within-county variation, while directly intersecting polygons requires assumptions about where people and votes are located inside each source unit. The paper treats this as a [[concepts/change-of-spatial-support|Change of Spatial Support]] problem and provides harmonized data for the conterminous United States.

## Contributions

- Releases 2016 and 2020 vote allocations for block groups, census tracts, and ZCTAs using areal, imperviousness, and RLCR weights, with nationwide and state-specific files.
- Develops RLCR, which estimates non-negative land-cover population contributions in small contiguous regional clusters rather than applying one national or statewide relationship.
- Preserves block-group household-population totals and precinct vote totals by using predicted subarea populations only as allocation weights.
- Validates population allocation against more than eight million 2020 census blocks and tract vote totals against geocoded North Carolina voter records.
- Shows that allocation choice can materially affect downstream turnout inference, especially in rural tracts.

## Method

### Precinct-Census Intersections

Precinct boundaries are intersected with block groups, and with ZCTAs when required, to form fractions belonging to one precinct and one census unit. Intersections whose area is no more than 0.1% of either parent feature are removed. Annual ACS household population, rather than total population, is used to avoid allocating votes to group quarters such as correctional facilities.

For each block group, household population is distributed across its fractions according to method-specific weights. Each precinct's reported total and candidate votes are then distributed in proportion to those estimated fraction populations and aggregated to the destination geography. This construction exactly preserves the source population and vote totals within their respective parents.

### Three Weighting Methods

The areal method weights a fraction by its surface area and therefore assumes uniform population density within a block group. The imperviousness method sums non-road NLCD impervious percentages above one percent, treating developed surfaces as a proxy for habitability.

RLCR overlays block groups and fractions on annual 30-meter National Land Cover Database rasters. Within each state, census tracts are greedily merged with neighbors until every contiguous cluster contains at least 12 block groups, matching the model's 12 land-cover predictors. A no-intercept, non-negative least-squares regression is fitted separately in each cluster, with block-group population as the response and pixel counts for potentially inhabited land-cover classes as predictors. Applying the fitted coefficients to a fraction produces a predicted population used as its allocation weight, not as the final population estimate.

## Experiments

### Census-Block Validation

The three methods distribute 2020 parent block-group populations to more than eight million census blocks, whose decennial counts provide observed targets. RLCR has the lowest error on all reported metrics: MAE 24.08, RMSE 62.23, and MAPE 4.45, compared with 28.98, 74.01, and 5.25 for areal weighting and 29.37, 76.40, and 4.55 for imperviousness weighting. The paper consequently recommends RLCR for primary analyses and the alternatives for robustness checks.

### North Carolina Vote Validation

The author identifies 5.52 million participants in the 2020 general election from North Carolina voter histories, joins them to election-date registration records, geocodes residential addresses, and aggregates matched locations to tracts. Against this near-ground-truth benchmark, RLCR again performs best: MAE 185.92 votes, RMSE 253.18, and MAPE 11.59, versus 209.00, 286.23, and 12.72 for areal weighting and 202.76, 273.95, and 12.44 for imperviousness weighting.

The benchmark itself is noisy: 3.8% of addresses do not geocode, 1.3% of voters have a registration precinct inconsistent with their geocoded location, and reconstructed precinct totals have 5.3% MAPE relative to official totals. A Pennsylvania map comparison further suggests that RLCR preserves broad partisan patterns, but it is a visual check rather than independent ground truth.

### Turnout Application

The tract-level 2020 files are merged with ACS profiles for 83,661 tracts. Regressions relate turnout to median age, median household income, college attainment, and minority population share for the full sample and density-defined rural and metropolitan subsets. Reported t-statistics differ by as much as 55% between areal and RLCR allocations, compared with at most 6% between imperviousness and RLCR. Differences are largest in rural areas, where tracts are larger and population is less uniformly distributed; these comparisons demonstrate sensitivity to allocation, not causal effects of the covariates.

The data are archived on Harvard Dataverse under DOI `10.7910/DVN/Z8TSH3`, and the paper identifies replication code at [fekrazad/precinct-tocensus-mapping](https://github.com/fekrazad/precinct-tocensus-mapping).

## Limitations

- Candidate choices and turnout cannot be observed within precincts, so proportional allocation by household population is an identifying assumption that the available data cannot test.
- NLCD coverage restricts the method and released analysis to the conterminous United States, excluding Alaska and Hawaii.
- Household population excludes both institutional and non-institutional group quarters; this reduces prison-related distortion but is still an imperfect proxy for the voting-eligible population.
- RLCR requires at least 12 block groups per local regression and uses a greedy clustering procedure that does not guarantee the maximum possible number of valid clusters.
- Census-block validation tests population placement rather than candidate-vote placement. The North Carolina validation covers total participation, not individual vote choice, and contains geocoding and boundary discrepancies.
- Precinct data provide nationwide presidential coverage, but coverage of other races varies by state. ZCTAs only approximate postal ZIP codes.

## Related Concepts

- [[concepts/regionalized-land-cover-regression|Regionalized Land Cover Regression]]
- [[concepts/change-of-spatial-support|Change of Spatial Support]]
- [[concepts/relative-nesting-and-relative-scale|Relative Nesting and Relative Scale]]

## Related Papers

- [[papers/integrating-data-across-misaligned-spatial-units|Integrating Data Across Misaligned Spatial Units]]: Provides geometry-based diagnostics and a broad comparison of methods for transferring data between incompatible spatial supports.
- Swanwick et al. (2022), "Dasymetric Population Mapping Based on US Census Data and 30-m Gridded Estimates of Impervious Surface": Supplies the impervious-surface alternative evaluated in this paper.
- Zandbergen and Ignizio (2010), "Comparison of Dasymetric Mapping Techniques for Small-Area Population Estimates": Reviews and compares land-cover-based small-area population allocation approaches cited by the paper.

[[index|Library home]]
