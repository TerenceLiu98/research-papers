---
title: "Electoral Precinct Harmonization"
type: concept
aliases:
  - Synthetic Electoral Precincts
tags:
  - electoral-geography
  - spatial-measurement
  - panel-data
---

## Overview

Electoral precinct harmonization constructs comparable geographic units when election boundaries change over time or differ across voting modes. It is an application of [[concepts/change-of-spatial-support|Change of Spatial Support]]: a panel requires consistent geographic coverage, not merely precinct labels that appear to match.

## Key Ideas

- **Construct stable units.** In Ferwerda and Riaz's Berlin application, election returns are aggregated to mail-in precincts and units with changing borders are amalgamated into 341 synthetic precincts. These are geographic aggregates, not synthetic-control estimates.
- **Retain voting modes.** In-person and mail-in returns may use different boundaries. Dropping mail ballots can select observations on behavior associated with both exposure and political preferences.
- **Preserve counts through aggregation.** Combining whole reporting units avoids having to estimate how votes are distributed within each source unit. The cost is reduced geographic detail.
- **Use explicit allocation assumptions when boundaries cross.** Polygon-overlap weighting assumes uniform vote and voter density within source units. Centroid interpolation treats each source share as a point observation, surface interpolation averages predicted shares across each destination polygon, and compositional interpolation weights that surface by estimated voter density.
- **Evaluate methods at the intended downstream scale.** Pavía and López-Quílez find that rankings differ between cities and between polling-unit, aggregate, and election-night criteria. Centroid allocation performs best in their Goteborg comparisons, whereas surface allocation performs best in Barcelona and most Västra Götaland forecasting comparisons.
- **Keep harmonization and identification separate.** Stable boundaries address unit comparability; they do not make treatment placement random or establish parallel trends.
- **Reassess exposure at the resulting scale.** Distances from population-weighted centroids summarize precinct exposure. They cannot reveal every resident's distance, and coarser aggregates may dilute highly localized contrasts.

The Berlin study illustrates the trade-off: comparable units retain all votes, while varying distance thresholds reveals sensitivity to how local exposure is defined. A null effect at a wider threshold is not proof that no individual beyond a precise radius responds.

## Important Papers

- [[papers/crossing-the-boundaries-an-implementation-of-two-methods-for-projecting-data-across-boundary-changes|Crossing the Boundaries: An Implementation of Two Methods for Projecting Data across Boundary Changes]]: Evaluates areal weighting and population-informed dasymetric interpolation for reconstructing electoral results after boundary changes.
- [[papers/limited-backlash-assessing-the-geographic-scope-of-electoral-responses-to-refugees|Limited backlash? Assessing the geographic scope of electoral responses to refugees]]: Harmonizes Berlin precincts across the 2013 and 2017 federal elections and voting modes before estimating localized refugee-exposure effects.
- [[papers/spatial-vote-redistribution-in-redrawn-polling-units|Spatial Vote Redistribution in Redrawn Polling Units]]: Compares polygon-overlap, centroid, surface, and density-weighted allocations on redrawn Swedish and Spanish polling units.

## Related Concepts

- [[concepts/change-of-spatial-support|Change of Spatial Support]]: General framework for transferring observations between geographic units.
- [[concepts/relative-nesting-and-relative-scale|Relative Nesting and Relative Scale]]: Geometry diagnostics useful for assessing a proposed transformation; the Berlin paper does not report these measures.
- [[concepts/modifiable-areal-unit-problem|Modifiable Areal Unit Problem]]: Explains why changing electoral zoning can alter aggregate measurements and downstream models.
