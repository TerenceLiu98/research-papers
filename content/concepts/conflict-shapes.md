---
title: Conflict Shapes
type: concept
aliases:
  - Conflict Shape
tags:
  - armed-conflict
  - spatial-analysis
  - conflict-actors
---

## Overview

A conflict shape summarizes the geographic area directly affected by conflict-related violence during a specified period. It distinguishes the observed footprint of violent events from the wider territory where armed actors may govern, recruit, or intimidate without recorded fighting. Comparing shapes over time separates relocation of violence from expansion or contraction of its geographic extent.

## Key Ideas

- **Multi-actor boundaries:** Related violent dyads can be combined into one umbrella conflict before constructing the geographic summary. Which actors and events belong together is a substantive research choice.
- **Shape and hotspots:** Idler and Tkacova construct concave hulls with a 50 km buffer and supplement them with Getis-Ord hotspots. Whole-area overlap can remain high even when the main concentrations of violence move.
- **Shift versus size:** Their operationalization labels a shift when the mean of between-period shape overlap and hotspot overlap is below 50%. Expansion or contraction requires at least a 20% area change. These are study-specific measurement rules, not universal definitions.
- **Actor-linked relocation:** Their low-risk/high-opportunity attraction mechanism proposes that newly dominant actors redirect fighting toward locations with support, recruits, income opportunities, and comparatively favorable security conditions. Prior armed influence can thus precede the arrival of substantial violence.
- **Measurement limits:** Polygons depend on event reporting, aggregation, buffers, and spatial algorithms. They do not establish territorial control, a causal mechanism, or exposure for every person inside the boundary. Aggregate stability can coexist with consequential local changes.

## Important Papers

- [[papers/conflict-shapes-in-flux-explaining-spatial-shift-in-conflict-related-violence|Conflict shapes in flux: Explaining spatial shift in conflict-related violence]]: develops the concept and tests the plausibility of actor-linked spatial shift across six periods in four conflicts. Three periods with new dominant actors exhibit shifts; three comparison periods do not.

## Related Concepts

- [[concepts/social-network-analysis|Social Network Analysis]]: measures actor involvement in violent interactions alongside the spatial summary.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: helps frame hotspot concentration as a distinct feature from the outer geographic footprint.
- [[concepts/spatiotemporal-analog-forecasting|Spatiotemporal Analog Forecasting]]: a different use of conflict geometry, matching historical space-time patterns for prediction rather than explaining changes in actor dominance.
