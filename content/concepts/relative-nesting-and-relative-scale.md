---
title: "Relative Nesting and Relative Scale"
type: concept
aliases:
  - Relative Nesting
  - Relative Scale
tags:
  - spatial-statistics
  - change-of-support
  - geospatial-diagnostics
---

## Overview

Relative nesting (RN) and relative scale (RS) are geometry-only diagnostics for [[concepts/change-of-spatial-support|Change of Spatial Support]]. They describe how source polygons are split across destination polygons and whether sources are generally smaller than destinations. They provide evidence about transformation difficulty before destination-level truth is available.

## Key Ideas

Let $N_S$ be the number of source polygons and $N_{S\cap D}$ the number of nonempty source-destination intersections. Write $a_i$, $a_j$, and $a_{i\cap j}$ for source, destination, and intersection areas.

$$
RN=\frac{1}{N_S}\sum_{i=1}^{N_S}\sum_{j:a_{i\cap j}>0}
\left(\frac{a_{i\cap j}}{a_i}\right)^2.
$$

RN averages squared area shares within each source polygon. With complete coverage, RN equals 1 when every source lies within a single destination and declines as sources are fragmented. It is a concentration measure, rather than literally the fraction of completely unsplit polygons. For illustration, splitting each source equally between two destinations gives RN = 0.5. Small boundary misalignments can reduce RN even when the administrative units are intended to nest.

$$
RS=\frac{1}{N_{S\cap D}}\sum_{i\cap j}\mathbf{1}(a_i<a_j).
$$

RS counts intersections at which the source is smaller than the destination. A value of 1 indicates pure aggregation; intermediate values indicate a hybrid. A value of 0 means no source is smaller, which includes equal-area cases under the strict inequality. RS is not an area-weighted fraction or simply a ratio of polygon counts.

Both metrics depend on the direction of transformation. Their interpretation requires attention to coverage and boundary artifacts. A high RS need not mean complete nesting: Georgia precinct-to-grid conversion has RS = 1 but RN = 0.92 in Zhukov et al.'s example.

In that paper's elections and simulations, higher RN and RS generally predict lower transformation error and less severe regression bias. RN is more predictive alone, but RS adds information. These are empirical diagnostics, not universal error bounds or guarantees that a specific algorithm is appropriate.

## Important Papers

- [[papers/integrating-data-across-misaligned-spatial-units|Integrating Data Across Misaligned Spatial Units]]: Defines RN and RS in Equations 1-2, evaluates them across algorithms, and recommends reporting both for spatial transformations.

## Related Concepts

- [[concepts/change-of-spatial-support|Change of Spatial Support]]: The measurement problem these diagnostics characterize.
- [[concepts/bayesian-spatial-disaggregation|Bayesian Spatial Disaggregation]]: Fine-scale estimation whose difficulty cannot be assessed solely from the resolution of its output.
