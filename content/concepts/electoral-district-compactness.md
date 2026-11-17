---
title: Electoral District Compactness
type: concept
aliases:
  - District Compactness
  - Geometric Compactness of Electoral Districts
definition: "Geometric measures of how closely an electoral district resembles a regular or spatially concentrated shape, used as one criterion for evaluating district boundaries."
tags:
  - redistricting
  - spatial-analysis
  - measurement
---

## Overview

Electoral district compactness quantifies boundary geometry. It can inform districting standards, but irregular geography may reflect coastlines, state borders, or representation requirements, while compact districts can still favor a party. Shape is therefore an incomplete indicator of electoral fairness.

## Key Ideas

- **Different reference shapes:** Polsby–Popper uses $4\pi A/P^2$; Reock compares area to a minimum bounding circle; convex-hull compactness compares area to the enclosing convex hull.
- **Specify real geometry:** Islands, holes, and disconnected pieces require explicit aggregation rules. Cropping reference shapes to political superunits changes what counts as attainable compactness.
- **Boundary detail matters:** Perimeter-based scores can change sharply with resolution or simplification. A nearly unchanged visible outline need not imply a stable score.
- **Rankings are conditional:** Selecting definitions, projections, simplification, and comparison districts can change apparent outlier status without changing political boundaries.
- **Reproducibility requires implementation:** Document equations, geographic data, resolution, projection, and code. Appropriate low-distortion projections and consistent boundary data reduce avoidable variation.

## Important Papers

- [[papers/gerrymandering-and-compactness-implementation-flexibility-and-abuse|Gerrymandering and Compactness: Implementation Flexibility and Abuse]]: quantifies implementation sensitivity and demonstrates adversarial selection of measurement settings.

## Related Concepts

- [[concepts/redistricting-ensembles|Redistricting Ensembles]]: compactness is one constraint defining the alternative plans used for comparison; the ensemble also encodes other criteria.
