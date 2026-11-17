---
title: "Gerrymandering and Compactness: Implementation Flexibility and Abuse"
type: paper
authors:
  - Richard Barnes
  - Justin Solomon
year: 2021
doi: 10.1017/pan.2020.36
source_job_id: eff55aeb-7d9d-4657-a37e-cdc05527eb0b
tags:
  - redistricting
  - spatial-analysis
  - measurement
---

## TL;DR

[[concepts/electoral-district-compactness|Electoral District Compactness]] depends on data and implementation choices as well as boundary shape. Using congressional districts, Barnes and Solomon show that these choices can change rankings and make selected suspected gerrymanders appear ordinary. Explicit definitions, reproducible code, and appropriate geographic data are essential to interpreting scores.

## Research Question

How much do implementation decisions change geometric compactness measurements, and can an adversary exploit that flexibility to alter judgments about a fixed district?

## Motivation

A formula does not fully specify how to measure a real district containing islands, holes, coastlines, or boundaries inherited from a state. Compactness requirements therefore leave discretion even after a named score is selected. Geometric regularity also does not establish electoral fairness.

## Contributions

- Audits nine choices spanning score definition, noncontiguity, holes, superunit boundaries, projection, topography, resolution, numerical precision, and whether alternative boundaries were possible.
- Demonstrates adversarial selection of measurement settings for ten congressional districts.
- Releases a common C++ implementation, compactnesslib, with Python and R interfaces and a QGIS plugin, and proposes reproducible measurement practices.

## Method

The analysis uses 2015 Census Cartographic Boundary and TIGER/Line data for the 114th Congress. It studies Polsby–Popper, $4\pi A/P^2$, Reock, district area divided by minimum bounding-circle area, and convex-hull area ratios, with variants for disconnected polygons and superunit constraints. Treating disconnected pieces together or separately changes the reference geometry; clipping a hull to a state boundary accounts for shapes that the district could not occupy.

Sensitivity analyses vary projections, boundary resolutions and simplification, hole treatment, and floating-point precision. Terrain-inclusive area uses the 30 m USGS elevation dataset, with perimeter held constant in that comparison. A grid search then chooses settings minimizing or maximizing each focal district's absolute distance from the national or within-state mean. This varies the measurement procedure and reference distribution, rather than redrawing the focal district.

## Experiments

- **Disconnected geography:** 85 of 441 districts in the 1:500,000 data are noncontiguous; four have holes attributed to artifacts. Multipart conventions can produce substantial score differences.
- **Projection:** Local versus conterminous projections yield absolute score differences below 0.009 in 99% of cases. Outlying territories require suitable projections; Alaska differs by up to 20% under an inappropriate conterminous projection.
- **Topography and arithmetic:** Terrain changes Polsby–Popper by less than 0.03 for every district and by less than 0.005 for 75%. Single- versus double-precision scores differ by no more than 0.027%.
- **Resolution:** Simplification substantially changes scores, particularly perimeter-based Polsby–Popper. Hull-based scores are more stable in the illustrated boundary-detail example.
- **Adversarial selection:** NC01, IL04, and PA07 can move from national outlier status to the middle of the distribution. NC12, NC04, and TX35 move closer to the mean without reaching it. Figure 17 and Table 1 document the selected settings; not every district can be made average.

## Limitations

The empirical study concerns geometric scores and a historical U.S. dataset, not direct measures of partisan advantage or minority representation. The ten-district exercise demonstrates possibility rather than the prevalence of manipulation. Broader claims about other fairness measures are methodological implications, not direct empirical tests. Reasonable local projections and numerical precision are comparatively stable in these experiments, so sensitivity is not uniform across choices. Transparent software makes computation reproducible but cannot make compactness sufficient to diagnose gerrymandering.

## Related Concepts

- [[concepts/electoral-district-compactness|Electoral District Compactness]]: geometric target whose implementation is audited.
- [[concepts/redistricting-ensembles|Redistricting Ensembles]]: compactness constraints also help define admissible alternative maps; their implementation consequently matters to the reference set.

## Related Papers

- [[papers/implementing-partisan-symmetry-problems-and-paradoxes|Implementing Partisan Symmetry: Problems and Paradoxes]]: a later library comparison showing how ideal symmetry scores can coexist with extreme partisan outcomes; not a citation in this paper.
- Niemi et al. (1990), “Measuring Compactness and the Role of a Compactness Standard in a Test for Partisan and Racial Gerrymandering”: prior compactness framework discussed by the authors.
- DeFord et al. (2018), “Total Variation Isoperimetric Profiles”: cited as a multiresolution alternative meriting further investigation.

Published in *Political Analysis* 29, 448–466 (2021), online December 16, 2020. [Article](https://doi.org/10.1017/pan.2020.36). Replication materials: [Code Ocean](https://doi.org/10.24433/CO.0469487.v1) and [Harvard Dataverse](https://doi.org/10.7910/DVN/B8JYZW).
