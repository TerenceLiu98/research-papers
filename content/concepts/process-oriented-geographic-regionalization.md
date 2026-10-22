---
title: Process-Oriented Geographic Regionalization
type: concept
aliases:
  - Process-Based Geographic Regionalization
  - PGR
tags:
  - spatial-regionalization
  - spatial-time-series
  - trajectory-clustering
  - spatial-statistics
---

## Overview

Process-oriented geographic regionalization partitions space according to the similarity of local temporal trajectories while enforcing geographic contiguity. Its boundaries are outcomes of the observed process rather than predefined administrative units or fixed distance bands. The approach asks where neighboring histories diverge, not merely where measurements differ at one date.

## Key Ideas

- **Trajectory as the observation:** Each spatial unit is represented by a time-aligned sequence or curve. Similar endpoints do not imply similar processes, so the full trajectory supplies the comparison object.
- **Joint attribute and spatial constraints:** Units are grouped only when their trajectories are sufficiently similar and their regions are spatially adjacent. This produces internally coherent, contiguous regions.
- **Endogenous boundaries:** Regional boundaries emerge where neighboring trajectories differ. This makes the method relevant to the [[concepts/modifiable-areal-unit-problem|Modifiable Areal Unit Problem]], but it does not eliminate sensitivity to grid resolution, distance metrics, stopping rules, or target cluster count.
- **Representative trajectories:** A regional medoid or another aggregate curve can summarize the dominant path, while dispersion bands preserve information about within-region heterogeneity.
- **Multiscale interpretation:** Comparing partitions across different region counts distinguishes broad common structure from meso-scale differentiation and fine local variation. Stability across selected scales is evidence about robustness, not proof of a uniquely true regionalization.

## Important Papers

- Zhang et al. (2024), "Advancing process-oriented geographical regionalization model": cited methodological foundation for process-based spatial partitioning.
- [[papers/spatiotemporal-ripple-effect-in-the-evolution-of-urban-economic-vitality|Spatiotemporal ripple effect in the evolution of urban economic vitality]]: applies adjacency-constrained clustering to 1992-2023 nighttime-light trajectories in four Chinese cities.

## Related Concepts

- [[concepts/core-transition-periphery-structure|Core-Transition-Periphery Structure]]: a process-based spatial pattern recovered in the urban-vitality application.
- [[concepts/spatiotemporal-ripple-effect|Spatiotemporal Ripple Effect]]: a temporally ordered diffusion pattern interpreted from the regional trajectories.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: dependence among nearby trajectories motivates spatial constraints but is distinct from regionalization.
- [[concepts/modifiable-areal-unit-problem|Modifiable Areal Unit Problem]]: aggregation choices can change spatial inference even when boundaries are data-driven.
