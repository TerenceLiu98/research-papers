---
title: "Crossing the Boundaries: An Implementation of Two Methods for Projecting Data across Boundary Changes"
type: paper
authors:
  - Max Goplerud
year: 2016
replication_data_doi: "10.7910/DVN/MVIQUD"
source_job_id: "1d182fa9-12dd-4c08-b803-13f43c9e9f52"
tags:
  - areal-interpolation
  - change-of-support
  - electoral-geography
  - spatial-statistics
---

## TL;DR

The paper implements areal weighting and population-informed dasymetric interpolation for transferring aggregate data from old to new geographic boundaries. Across electoral applications in six countries, both methods usually estimate party vote shares with mean absolute errors around 2-3 percentage points; dasymetric interpolation generally performs better, though not in every election. Simulations show larger errors when constituencies are heterogeneous, party support is strongly spatially autocorrelated, or boundaries are gerrymandered.

The supplied text identifies replication data by DOI `10.7910/DVN/MVIQUD`, but does not state an article DOI.

## Research Question

How accurately can researchers project aggregate variables from old geographic units onto new, overlapping units when exact observations for the intersections are unavailable, and under what spatial conditions do simple interpolation methods fail?

## Motivation

Boundary changes break comparability across elections and other geographically aggregated observations. Direct aggregation is exact when data exist for stable units smaller than every old-new intersection, but governments may not release data at that resolution and the smaller units may themselves change. Researchers then face a [[concepts/change-of-spatial-support|Change of Spatial Support]] and must make assumptions about the unobserved distribution within source units. The same setting also exposes the zoning dimension of the [[concepts/modifiable-areal-unit-problem|Modifiable Areal Unit Problem]].

## Contributions

- Implements two transparent interpolation methods in an accompanying R program using old and new boundary shapefiles, with population data optional for the more detailed method.
- Evaluates projected electoral results against sub-constituency tabulations, or a detailed local-election-based benchmark in Great Britain, across Australia, Canada, Germany, Great Britain, New Zealand, and the United States.
- Uses Monte Carlo simulations to vary constituency-size heterogeneity, spatial autocorrelation in party support, and gerrymandering.
- Shows that simple area-based transfers can be useful when detailed ancillary information is unavailable, while identifying the uniformity assumption that determines their errors.

## Method

### Areal Weighting

Areal weighting (AW) allocates each old constituency's total according to its physical overlap with each new constituency. If $s_{j,l}^{k}$ is the area of ward $l$ lying in both old constituency $j$ and new constituency $k$, AW gives every pixel within old constituency $j$ equal density. The resulting matrix element $a_{k,j}$ is the share of old unit $j$ assigned to new unit $k$.

This requires only the two boundary systems, but assumes that the variable is uniformly distributed throughout each old constituency. It therefore ignores within-constituency population concentration.

### Dasymetric Interpolation

Dasymetric interpolation (DI) uses smaller wards with population $p_l$ and area $s_l$ to estimate density $\theta_l=p_l/s_l$. The overlap pixels are weighted by that density, so a ward receives a share of the old constituency's electoral quantity proportional to its estimated population. It still assumes uniformity within each ward, making small sub-units that are rarely split by new boundaries preferable.

For both methods, the transformation matrix maps a vector of old-unit totals to new-unit estimates by matrix multiplication. Its columns sum to one, preserving the total of each interpolated count over a fully covered domain. This pycnophylactic property does not establish that the within-domain allocation is correct.

### Evaluation

The empirical analysis projects major-party vote totals, valid votes, and electorate sizes, then compares reconstructed party shares with a lower-level benchmark using root mean-squared error, mean absolute error, the middle 90% of absolute errors, and first-place-party accuracy in marginal seats. Constituencies with only minor boundary changes are excluded.

The simulations generate spatially correlated population and government-support fields, independently generated old and new Voronoi constituencies, and an automated gerrymandering procedure. They vary the spatial range of support, constituency heterogeneity, and the proportion of sub-constituency units considered for partisan reassignment. Each combination of spatial range and constituency heterogeneity is simulated 750 times at five gerrymandering levels.

## Experiments

Across the country-election cases, reported MAE is generally around 2-3 percentage points or lower. DI usually has lower RMSE and MAE than AW, but the advantage is neither universal nor large in every case. Germany produces the lowest reported errors: MAE ranges from 0.279 to 0.460 across the tested elections and methods. The United States performs worst, with MAE 2.913 for DI and 3.352 for AW in the 2012 case. Correct prediction in marginal seats is more variable; across all constituencies, the appendix reportedly gives at least 90% first-place-party agreement for both methods.

The simulations find that method choice is a comparatively small predictor of error. More homogeneous constituency sizes and weaker spatial autocorrelation reduce RMSE and MAE, while the simulated gerrymandering process increases both. Spatial autocorrelation has the clearest association with error, consistent with concentrated party support violating the within-unit uniformity assumption. The paper treats the modest simulated gerrymandering effect cautiously because other redistricting procedures could generate larger errors.

## Limitations

- Both methods depend on unobserved uniformity assumptions. AW assumes uniform density within old constituencies; DI moves that assumption to smaller population units.
- DI depends on the relevance, timing, and spatial resolution of ancillary population data. Poor ancillary data can fail to improve allocation.
- Validation covers selected elections in six countries; data availability determines the cases, and Great Britain uses an estimated benchmark rather than direct sub-constituency parliamentary returns.
- Correct winner prediction is least stable in marginal seats, where small allocation errors can change the first-place party.
- The simulated gerrymandering algorithm is only one stylized form of partisan boundary manipulation and does not bound errors under other procedures.
- The methods provide point reconstructions but no measure of projection uncertainty.
- The parsed text contains apparent extraction corruption in some mathematical symbols, so this page retains only formulas and notation that can be reconstructed unambiguously from the surrounding definitions.

## Related Concepts

- [[concepts/change-of-spatial-support|Change of Spatial Support]]: the general problem of transferring measurements between spatial representations.
- [[concepts/modifiable-areal-unit-problem|Modifiable Areal Unit Problem]]: explains how boundary and scale choices alter aggregate measurements and inference.
- [[concepts/electoral-precinct-harmonization|Electoral Precinct Harmonization]]: applies allocation or aggregation rules to make election results comparable across changing units.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: concentrated party support is a major source of interpolation error in the simulations.

## Related Papers

- [[papers/integrating-data-across-misaligned-spatial-units|Integrating Data Across Misaligned Spatial Units]]: develops geometric diagnostics and compares downstream measurement and regression error across change-of-support methods.
- [[papers/spatial-vote-redistribution-in-redrawn-polling-units|Spatial Vote Redistribution in Redrawn Polling Units]]: compares overlap weighting with point-, surface-, and voter-density-based allocations for redrawn polling units.
- Fisher and Langford (1995), "Modelling the Errors in Areal Interpolation Between Zonal Systems by Monte Carlo Simulation": cited precedent for simulation-based evaluation of areal interpolation.
- Qiu, Zhang, and Zhou (2012), "The Development of an Areal Interpolation ArcGIS Extension and a Comparative Study": cited comparison of interpolation methods and software implementation.
- Zhang and Qiu (2011), "A Point-Based Intelligent Approach to Areal Interpolation": cited source for interpolation error measures.

[[index|Library home]]
