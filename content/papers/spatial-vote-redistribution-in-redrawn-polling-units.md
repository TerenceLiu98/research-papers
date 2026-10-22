---
title: "Spatial Vote Redistribution in Redrawn Polling Units"
type: paper
authors:
  - Jose M. Pavía
  - Antonio López-Quílez
year: null
source_job_id: 27bf341f-6303-41c5-a6b6-49a1181a8d62
tags:
  - electoral-geography
  - change-of-support
  - spatial-interpolation
  - election-forecasting
---

## TL;DR

The paper replaces manual matching of polling units across elections with four GIS-based allocation methods: polygon-overlap weighting, centroid interpolation, surface averaging, and density-weighted surface averaging. Tests on redrawn units in Goteborg and Barcelona and election-night forecasting in Västra Götaland show that all four produce useful historical vote allocations. No method dominates every comparison, but the surface approach gives the strongest overall balance of accuracy and computational burden, especially for early constituency-level forecasts.

The supplied manuscript states that it was received in 2011 and revised in 2012, but it does not give a publication year, venue, DOI, or other stable identifier.

## Research Question

How can past vote shares and turnout be assigned to new polling units after boundaries change, particularly when a geographically extensive redesign makes manual matching impractical?

## Motivation

Small-area electoral forecasts and longitudinal analyses commonly use prior results as predictors. Polling-unit boundaries, identifiers, and electorates change between elections, so the prior outcomes are not directly aligned with current reporting units. Classical matching rules work for unchanged units, merges, splits, and isolated new units, but become costly or infeasible when many boundaries are redrawn at once. This is an electoral instance of [[concepts/change-of-spatial-support|Change of Spatial Support]] and a practical response to the zoning dimension of the [[concepts/modifiable-areal-unit-problem|Modifiable Areal Unit Problem]].

## Contributions

- Formalizes a geometric allocation that transfers votes according to the area of overlap between old and new polling-unit polygons.
- Proposes centroid, surface, and compositional alternatives that exploit spatial continuity in party support rather than assuming uniform vote density within every source polygon.
- Evaluates the allocations at aggregate and polling-unit levels after transferring historical shares to the later election through a multivariate linear regression.
- Tests the methods in election-night forecasting, where early reported units are not a representative sample of the final electorate.
- Shows that the same machinery can transfer other spatially aggregated socioeconomic quantities, while noting that ancillary population or land-use data could improve within-unit allocation.

## Method

### Classical and Geometric Allocation

Manual practice directly matches apparently unchanged units, sums source outcomes for merges, copies source proportions to subdivisions, and assigns broader neighborhood averages to genuinely new units. The geometric method automates the overlap logic. For old polygons $D_j$, new polygon $B_i$, and old votes $v_{kj}$ for option $k$, it weights each old count by the fraction of its polygon intersecting the new unit and renormalizes across options. This approximately preserves the classical treatment of unchanged units, merges, and splits, but assumes votes and electors are uniformly distributed inside each old polygon.

### Point and Surface Interpolation

The centroid method treats each old polygon's vote share as observed at its geometric centroid and predicts the share at each new polygon's centroid. The implementation uses inverse squared Euclidean distance weighting, chosen as a relatively automatic alternative to analyst-dependent variogram modelling.

The surface method applies the same interpolation across a raster covering each new polygon and averages its pixel-level predictions. It therefore reflects the destination polygon's shape rather than representing it by one point. The compositional method further weights those pixel predictions by an interpolated voter-density surface. In principle this accounts for unequal population within a new unit; in practice it adds computation and inherits error from both interpolated surfaces.

These estimators are alternative assumptions about unobserved within-unit geography. Spatial smoothness does not make any one allocation exact, and the paper does not propagate allocation uncertainty into downstream forecasts.

### Temporal Transfer and Evaluation

Because an allocated historical share cannot be compared directly with a later result after electoral swing, the paper estimates party-specific linear relationships between past and current polling-unit shares. The equations form a seemingly unrelated regression with linearly dependent disturbances because party shares sum to one. Predicted current shares are aggregated using electors and forecast turnout. Fit is assessed with absolute share error, polling-unit median absolute error, correlation, and an entropy-like aggregate discrepancy that equals zero at perfect fit.

For election-night forecasting, observed units contribute their reported results and the regression predicts unreported units from allocated historical shares. The evaluation takes snapshots near 1%, 2.5%, 5%, 10%, and 25% of the electorate counted.

## Experiments

### Goteborg Boundary Redesign

Goteborg changed from 286 polling units in the 2002 Riksdag election to 279 in 2006. The study compares a manual geometric reconstruction with all four automated methods. Aggregate estimates are accurate despite large party swings, and the automated approaches improve aggregate absolute error and entropy over the manual allocation. When the temporal regression is fitted on the rest of Sweden, the centroid method has the smallest aggregate error and entropy and the lowest overall polling-unit median absolute error (1.46 percentage points, versus 1.65 for manual matching). The geometric predictions have the highest reported correlation with actual polling-unit shares, 0.9753, while manual predictions have the lowest, 0.9624. These comparisons include error from the temporal regression as well as boundary allocation.

### Barcelona Boundary Redesign

Barcelona replaced 1,482 polling units with 1,061 before the 2009 European Parliament election. Manual allocation was omitted because of the scale of the redesign. Historical shares come from the 2008 Spanish general election, and 2,514 matched units elsewhere in Barcelona province estimate the temporal regression. All four methods yield similar aggregate results, with the surface method recording the lowest reported aggregate error (3.36) and entropy (0.27). It also has the lowest overall polling-unit median absolute error, 1.43 percentage points; correlations for all methods exceed 0.95. Differences between election types and turnout patterns limit how much forecast error can be attributed to spatial allocation alone.

### Västra Götaland Election-Night Forecasting

The county experiment covers 985 geographically referenced polling units and 1,164,890 electors in the 2006 Riksdag election. Each allocation method supplies the historical predictor for both regression fitting and prediction. At every evaluated count stage, spatially informed forecasts improve substantially over provisional results. Surface and compositional allocations generally produce the lowest county-level entropy, while the surface method gives the best combined constituency-weighted entropy and turnout error, particularly early in the count. At 0.98% counted, for example, constituency-weighted entropy is 0.20 for surface allocation, compared with 0.32 for manual matching and 5.41 for the provisional count; the corresponding weighted turnout errors are 0.47, 0.57, and 0.72 percentage points.

## Limitations

- Evaluation combines allocation error with temporal-regression error. The later election is not direct ground truth for the reconstructed earlier shares.
- Geometric allocation assumes uniform votes and electorate within source polygons; centroid interpolation ignores polygon shape; surface interpolation assumes smooth spatial vote shares; and compositional interpolation additionally depends on an estimated density surface.
- The inverse-distance interpolator is selected for accessibility, not shown to be optimal against kriging or other spatial models.
- Population data below polling-unit level were unavailable in the two countries studied. Proposed refinements using census blocks, land use, built structures, or imagery are not evaluated.
- The empirical comparisons cover two cities and one Swedish county. Relative performance varies by location and evaluation scale: centroid allocation is strongest in Goteborg, while surface allocation is strongest in Barcelona and most county forecasting comparisons.
- Allocation and forecast uncertainty are not carried through to reported uncertainty intervals.

## Related Concepts

- [[concepts/electoral-precinct-harmonization|Electoral Precinct Harmonization]]: constructing comparable electoral histories when reporting units change.
- [[concepts/change-of-spatial-support|Change of Spatial Support]]: transferring aggregate measurements between misaligned source and destination regions.
- [[concepts/modifiable-areal-unit-problem|Modifiable Areal Unit Problem]]: sensitivity of summaries and models to geographic scale and zoning.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: the spatial dependence used to motivate interpolation of party support.

## Related Papers

- Pavia-Miralles (2005), "Forecasts from Non-random Samples: The Election Night Case." Supplies the temporal-transfer and election-night prediction framework used in the evaluation.
- Gregory and Ell (2005), "Breaking the Boundaries: Geographical Approaches to Integrating 200 Years of the Census." Cited background on areal interpolation and historical boundary change.
- [[papers/integrating-data-across-misaligned-spatial-units|Integrating Data Across Misaligned Spatial Units]]: complementary library treatment of geometry diagnostics and downstream measurement error; it is not cited in the supplied paper.
- [[papers/electoral-change-on-moving-maps-joint-inference-under-misaligned-supports|Electoral Change on Moving Maps: Joint Inference under Misaligned Supports]]: complementary library treatment of differential reconstruction error across elections; it is not cited in the supplied paper.

[[index|Library home]]
