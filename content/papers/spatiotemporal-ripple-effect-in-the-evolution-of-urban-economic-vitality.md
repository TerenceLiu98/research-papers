---
title: Spatiotemporal ripple effect in the evolution of urban economic vitality
type: paper
authors:
  - Yingying Gou
  - Haiping Zhang
  - Zitong Li
  - Ruisi Luo
  - Yu Yang
  - Yan Cheng
  - Ling Yang
  - Wangfeng Zhang
year: null
source_job_id: "95a5f670-968b-4488-b662-e95b551106ed"
tags:
  - urban-economic-vitality
  - spatial-regionalization
  - nighttime-lights
  - urban-diffusion
---

## TL;DR

Long-run nighttime-light trajectories in Chengdu, Nanjing, Shanghai, and Shenzhen form spatially contiguous regions rather than a random arrangement. A trajectory-based regionalization identifies a [[concepts/core-transition-periphery-structure|Core-Transition-Periphery Structure]] in which growth tends to begin in the core and reach transition and peripheral zones with increasing delays, a pattern the authors call the [[concepts/spatiotemporal-ripple-effect|Spatiotemporal Ripple Effect]]. Across partition scales, cores and outer peripheries are relatively stable while transition zones reorganize most readily.

## Research Question

How are long-term trajectories of urban economic vitality organized in space, and do trajectory similarity and spatial adjacency reveal a recurring intra-urban diffusion structure that comparisons of annual spatial snapshots miss?

## Motivation

Studies of urban vitality commonly either compare spatial distributions at selected dates or analyze temporal change at individual locations. The first approach can hide different paths leading to similar observed states; the second can omit the citywide organization of those paths. The paper therefore shifts the object of analysis from the evolution of spatial structure to the spatial structure of evolutionary processes.

## Contributions

- Treats complete local vitality trajectories, rather than annual cross-sections, as the units of spatial analysis.
- Uses [[concepts/process-oriented-geographic-regionalization|Process-Oriented Geographic Regionalization]] to derive contiguous regions from trajectory similarity and adjacency instead of imposing administrative or concentric boundaries.
- Proposes a process-based Core-Transition-Periphery structure coupled to a temporally ordered ripple mechanism.
- Develops a multiscale comparison over partition counts and a second-peak criterion intended to balance citywide representativeness against local fragmentation.
- Distinguishes stable-gradient, stepped-gradient, and synchronous-convergence patterns across the four case cities.

## Method

The analysis uses annual DMSP-OLS-like nighttime lights from 1992 through 2023 on 1 km by 1 km grids within built-up-area boundaries for Chengdu, Nanjing, Shanghai, and Shenzhen. Nighttime-light brightness is treated as a proxy for urban economic vitality.

For each grid cell, the authors construct a 32-year trajectory. Pairwise dissimilarity is the mean squared difference between time-aligned brightness sequences. A bottom-up agglomerative procedure repeatedly merges spatially adjacent clusters with similar trajectories, subject to envelopment and minimum-size rules, until a target number of regions is reached. Each region is summarized by the observed trajectory with the smallest total distance to other member trajectories, with standard-deviation bands and moving-average smoothing used for visualization.

Before regionalization, one-to-many similarity and distance-similarity curves test whether trajectory similarity is spatially structured. A Gaussian bump fit summarizes the distance at which similarity peaks. For multiscale analysis, the paper compares representative-curve sets for region counts $K=2$ through $10$ using globally normalized pairwise Euclidean distances. Mean cross-scale similarity measures representativeness, while minimum similarity is used as a stability diagnostic. The proposed scale-selection rule favors the second peak in representativeness after meaningful heterogeneity has emerged.

## Experiments

Across all four cities, reference cells selected farther from the urban center have similarity peaks at correspondingly greater center distances. The paper gives a peak near 30 km for a middle-ring Shanghai reference and near 50 km for an outer-ring Shenzhen reference, supporting ring-dependent clustering rather than a single monotonic proximity effect.

Regionalization yields a broadly Core-Transition-Periphery ordering despite morphological differences among cities. In Chengdu, the core trajectory rises from 24.1 in 1994 to 43.5 in 2003, while middle and outer zones accelerate later. Chengdu exemplifies a stable gradient; Shenzhen shows larger, step-like discontinuities among zones; and Nanjing's nighttime-light trajectories narrow after roughly 2015, which the authors describe cautiously as convergence in the observed proxy.

When $K$ varies from 2 to 10, low-$K$ solutions retain a common citywide pattern, intermediate partitions expose transition-zone heterogeneity, and high-$K$ solutions become locally specific. The reported mean cross-scale similarity exceeds 0.72 for $K=2$ and $K=3$. Across cities, core regions remain structurally persistent, transition regions show the greatest boundary volatility, and aggregate peripheral boundaries are comparatively stable.

## Limitations

- The four cases are large Chinese cities, so neither the Core-Transition-Periphery structure nor outward ripple propagation is established for smaller cities, shrinking cities, or other institutional and geographic settings.
- Nighttime lights are an indirect proxy with saturation and semantic ambiguity. Late flattening or convergence in brightness does not necessarily mean stagnation or convergence in underlying economic vitality.
- The evidence is descriptive of ordered, lagged trajectories. It does not by itself identify causal transmission from the core or separate infrastructure, policy, agglomeration, and other mechanisms.
- Built-up-area boundaries come from a 2020 dataset while trajectories span 1992-2023, and the implications of holding this analytical footprint fixed are not separately evaluated.
- The target region count, minimum-size constraints, curve smoothing, and the proposed second-peak rule introduce analytical choices. Cross-scale stability documents sensitivity but does not independently validate a uniquely correct partition.
- Publication year, venue, DOI, and other stable article identifiers are absent from the supplied Markdown and are not inferred here.

## Related Concepts

- [[concepts/process-oriented-geographic-regionalization|Process-Oriented Geographic Regionalization]]
- [[concepts/core-transition-periphery-structure|Core-Transition-Periphery Structure]]
- [[concepts/spatiotemporal-ripple-effect|Spatiotemporal Ripple Effect]]
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]
- [[concepts/modifiable-areal-unit-problem|Modifiable Areal Unit Problem]]

## Related Papers

- Zhang et al. (2024), "Advancing process-oriented geographical regionalization model": methodological basis cited for trajectory-based regionalization.
- Guo et al. (2025), "Spatial association measures for time series with fixed spatial locations": cited basis for spatial dependence among fixed-location trajectories.
- Wu et al. (2021), "Developing improved time-series DMSP-OLS-like data (1992-2019) in China by integrating DMSP-OLS and SNPP-VIIRS": source methodology for the nighttime-light series extended in this study.
- Shi et al. (2023), "Nighttime light remote sensing in characterizing urban spatial structure": context for using nighttime lights to study urban form.

The source reports data and computational tools at [gissuifeng/UEV](https://github.com/gissuifeng/UEV). The repository was not independently inspected during this ingest.

[[index|Library home]]
