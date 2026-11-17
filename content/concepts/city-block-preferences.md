---
title: City Block Preferences
type: concept
aliases:
  - Manhattan Preferences
  - Weighted L1 Preferences
definition: "Preferences that rank outcomes by increasing weighted sums of absolute coordinate deviations from an ideal point."
tags:
  - preference-modeling
  - spatial-models
  - social-choice
---

## Overview

City block preferences evaluate a policy by summing absolute deviations from a preferred position across dimensions, with positive dimension-specific weights. Their indifference surfaces have kinks where a policy coordinate equals the corresponding ideal coordinate. These kinks can change collective-choice stability.

## Key Ideas

- A uniform profile has the same relative issue weights across individuals. Shared coordinate rescaling reduces this case to ordinary Manhattan distance. Uniformity does not require identical ideal points.
- For an odd electorate in general position, any majority-rule equilibrium must be the dimension-by-dimension median. Being that median alone does not guarantee stability in higher dimensions.
- With uniform weights, stability holds exactly when every rugged halfspace centered at the median contains a majority of ideals. These closed unions of orthants capture common directional opposition and include their boundaries.
- Heterogeneous issue weights weaken this opposition structure. Unequal voting weights are a separate feature of the aggregation rule.
- Near-city-block smooth metrics can yield small winsets without an exact equilibrium. Approximate and exact stability should be distinguished.

## Important Papers

- [[papers/spatial-models-cognitive-metrics-and-majority-rule-equilibria|Spatial Models, Cognitive Metrics, and Majority Rule Equilibria]]: characterizes equilibrium under uniform city block preferences and examines heterogeneous weights and approximate metrics.

## Related Concepts

- [[concepts/euclidean-preferences|Euclidean Preferences]]: combines coordinate differences using a different geometry, with different indifference surfaces and equilibrium implications.
- [[concepts/hotelling-downs-model|Hotelling-Downs Model]]: uses spatial proximity to model political competition; the choice of distance metric is a substantive modeling assumption.
