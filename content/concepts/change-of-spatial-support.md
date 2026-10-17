---
title: "Change of Spatial Support"
type: concept
aliases:
  - Change of Support
  - Change-of-Support Problem
tags:
  - spatial-statistics
  - change-of-support
  - measurement-error
---

## Overview

Change of spatial support means estimating a variable for destination geographic units from observations collected on different source units. Differences can concern scale, boundaries, shape, orientation, or historical definitions. The task includes aggregation, disaggregation, and mixtures of both across partially overlapping areas.

## Key Ideas

- **Match support to the research question.** Convenient administrative units may not represent the theoretical unit of interest. Transforming to appropriate units introduces measurement assumptions that should be documented.
- **Diagnose the geometry.** [[concepts/relative-nesting-and-relative-scale|Relative Nesting and Relative Scale]] quantify source fragmentation across destinations and the direction of scale change before any attribute values are transformed.
- **Respect the variable's aggregation rule.** Extensive quantities such as counts should preserve totals across a fully covered domain. Intensive quantities such as temperature usually require weighted means. Ratios constructed from extensive components can be transformed directly or reconstructed after transforming those components; neither approach is always superior.
- **Identify the unobserved allocation assumption.** Area weighting assumes uniformity within source units, population weighting substitutes an ancillary spatial distribution, and geostatistical models use assumptions about spatial structure. Finer output resolution alone does not establish finer measurement accuracy.
- **Separate mapping accuracy from inferential accuracy.** A transformed variable can track spatial ranks while biasing regression coefficients. Bias can be toward or away from zero.
- **Validate with the best available information.** Lowest-level data can provide destination truth, and reliable assignment IDs can permit direct aggregation. Otherwise, combine geometry diagnostics, map inspection, and sensitivity to transformation methods; agreement across algorithms is not proof of correctness.

Ecological inference and the modifiable areal unit problem are related: the former concerns inference about lower-level variation from aggregate data, while the latter concerns sensitivity to geographic grouping. Change of support also covers transfers between non-nested aggregate units.

## Important Papers

- [[papers/integrating-data-across-misaligned-spatial-units|Integrating Data Across Misaligned Spatial Units]]: Introduces geometric diagnostics and compares measurement and regression errors across transformation methods.
- Gotway and Young (2002), "Combining Incompatible Spatial Data." Foundational reference cited by that paper.

## Related Concepts

- [[concepts/relative-nesting-and-relative-scale|Relative Nesting and Relative Scale]]: Diagnostics for the geometry of a proposed transformation.
- [[concepts/bayesian-spatial-disaggregation|Bayesian Spatial Disaggregation]]: A model-based approach to estimating finer spatial processes from aggregate observations.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: Spatial dependence can inform interpolation but does not by itself validate a change of support.
