---
title: Regionalized Land Cover Regression
type: concept
aliases:
  - RLCR
tags:
  - dasymetric-mapping
  - spatial-disaggregation
  - land-cover
  - population-allocation
---

## Overview

Regionalized Land Cover Regression (RLCR) is a dasymetric method for allocating known population totals from census units to smaller spatial intersections. It estimates how land-cover classes relate to population in small contiguous regions, then uses predicted subarea populations as weights. This combines ancillary raster information with exact preservation of source-zone totals, a common requirement in [[concepts/change-of-spatial-support|Change of Spatial Support]].

## Key Ideas

- **Regional calibration:** Relationships between land cover and settlement vary geographically. RLCR therefore fits separate models in small contiguous clusters rather than assuming one relationship for an entire state or country.
- **Constrained model:** Population is regressed on counts of potentially inhabited land-cover pixels with no intercept and non-negative coefficients. The constraints prevent a land-cover category from contributing a negative population weight.
- **Minimum cluster size:** With 12 land-cover predictors, each fitted region needs at least 12 block groups. A greedy procedure merges neighboring tract-based clusters until this threshold is met.
- **Weights, not unconstrained estimates:** Predicted fraction populations determine shares of the known parent total. Normalization ensures that allocated fraction populations sum exactly to the observed block-group household population.
- **Two-stage electoral allocation:** After household population is placed within precinct-block-group fractions, reported precinct votes are distributed by the fractions' population shares and aggregated to block groups, tracts, or ZCTAs.
- **Empirical validation:** In Fekrazad's application, RLCR yields lower census-block population errors and lower North Carolina tract vote-total errors than surface-area and imperviousness weights. This evidence supports that implementation and setting; it does not validate the assumption that candidate preferences are spatially proportional to household population within every precinct.

## Important Papers

- [[papers/a-dataset-of-us-precinct-votes-allocated-to-census-geographies-with-precision|A Dataset of US Precinct Votes Allocated to Census Geographies with Precision]]: Introduces RLCR for reallocating 2016 and 2020 U.S. precinct returns and compares it with areal and impervious-surface weighting.
- Swanwick et al. (2022), "Dasymetric Population Mapping Based on US Census Data and 30-m Gridded Estimates of Impervious Surface": Develops the impervious-surface population mapping approach used as a comparison method.
- Zandbergen and Ignizio (2010), "Comparison of Dasymetric Mapping Techniques for Small-Area Population Estimates": Provides background on land-cover-informed dasymetric population estimation.

## Related Concepts

- [[concepts/change-of-spatial-support|Change of Spatial Support]]
- [[concepts/relative-nesting-and-relative-scale|Relative Nesting and Relative Scale]]
- [[concepts/bayesian-spatial-disaggregation|Bayesian Spatial Disaggregation]]
