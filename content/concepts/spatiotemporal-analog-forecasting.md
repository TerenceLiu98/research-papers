---
title: Spatiotemporal Analog Forecasting
type: concept
aliases:
  - Spatiotemporal Pattern-Based Forecasting
tags:
  - analog-forecasting
  - spatiotemporal-patterns
  - conflict-forecasting
---

## Overview

Spatiotemporal analog forecasting retrieves historical configurations resembling a current spatial and temporal sequence, then uses their observed continuations to construct forecasts. Its central predictive assumption is that similarity of histories contains information about similarity of subsequent outcomes. Historical matches make forecast provenance inspectable, without establishing a causal mechanism.

## Key Ideas

- **Representation defines similarity:** Coordinates and intensities can be normalized to compare patterns across geographic extent, duration, and magnitude. Those choices deliberately discard some contextual differences and require substantive justification.
- **Flexible matching:** The three-dimensional ShapeFinder application uses [[concepts/optimal-transport|Optimal Transport]] to compare fatality distributions, allows quarter-turn spatial rotations, and separately filters discrepancies in nonzero cell-month counts. Time is not reversed.
- **Continuation transfer:** Historical outcomes following each match must be aligned with the target grid and forecast horizon. Clustering these continuations can retain distinct scenarios; selecting the largest cluster's mean emphasizes the most frequent historical scenario.
- **Traceability differs from calibration:** A forecast can be traced to historical cases even when its shape is hard to interpret. Cluster frequencies describe the retrieved sample and do not automatically constitute calibrated probabilities.
- **Selection limits coverage:** Restricting retrieval and prediction to recently active zones reduces computation but misses onsets elsewhere. Input coverage and future coverage must be assessed separately.
- **Evaluation needs multiple scales:** Exact cell-month errors penalize small spatial or temporal displacement. Zone totals and shape distances answer complementary questions, and all can miss operationally important onset failures if dominated by zeros.

## Important Papers

- [[papers/the-geometry-of-conflict-3d-spatio-temporal-patterns-in-fatalities-prediction|The geometry of conflict: 3D Spatio-temporal patterns in fatalities prediction]]: adapts ShapeFinder to normalized longitude-latitude-time patterns and tests six-month state-based fatality forecasts in Africa and the Middle East. Reported gains over ViEWS are qualified by horizon mismatch and limits on onset prediction.
- Schincariol, Frank, and Chadefaux (2025), "Accounting for variability in conflict dynamics: A pattern-based predictive model": the country-level predecessor cited by the three-dimensional application.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]: compares distributions while accounting for the cost of moving mass across coordinates.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: summarizes geographic dependence; analog matching instead compares whole historical configurations.
