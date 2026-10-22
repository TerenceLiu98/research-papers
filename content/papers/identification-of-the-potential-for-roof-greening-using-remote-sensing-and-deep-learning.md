---
title: "Identification of the potential for roof greening using remote sensing and deep learning"
type: paper
authors:
  - Qingyu Li
  - Hannes Taubenbock
  - Xiao Xiang Zhu
year: null
tags:
  - green-roofs
  - remote-sensing
  - semantic-segmentation
  - urban-climate-adaptation
  - geospatial-ai
---

## TL;DR

This paper develops a multi-city workflow for screening roofs that may be suitable for greening from aerial imagery and prioritizing them by surrounding vegetation, land surface temperature, and building density. A U-Net trained on the 6,400-pair GreenRoof dataset performs best among six segmentation networks, while fine-tuning on local samples improves transfer to 15 Bavarian cities. The resulting maps reproduce broad spatial trends in official 3D building data but systematically underestimate suitable roof area, so they are better treated as preliminary planning evidence than as engineering feasibility assessments.

## Research Question

Can high-resolution remote sensing and deep learning identify roofs with high greening potential across multiple cities, particularly where detailed 3D building models are unavailable, and can those predictions support spatial prioritization for urban climate adaptation?

## Motivation

Green roofs can add vegetation without consuming scarce urban land and may reduce heat exposure, stormwater runoff, noise, and air pollution. Existing city-scale assessments often depend on municipal records, LiDAR, or 3D building models and commonly examine one city. A transferable imagery-based method could extend initial screening to cities lacking those data, while spatial context could help planners focus limited resources where additional vegetation is most needed.

## Contributions

- Introduces GreenRoof, a dataset of 6,400 aerial-image and pixel-mask pairs from Berlin, Brussels, Helsinki, and Vienna. The masks identify roof planes with slopes from 0 to 10 degrees, derived from LOD2 building models and manually checked.
- Compares U-Net, Efficient-UNet, DeepLab v3+, HRNet, SegFormer, and FC-DenseNet for binary segmentation of potential and non-potential green-roof pixels.
- Tests direct transfer and city-specific fine-tuning in 15 Bavarian cities, using official building data as a reference.
- Combines predicted candidate roofs with NDVI, land surface temperature, and building-density strata to evaluate where roof greening may have higher priority.
- Demonstrates a scalable screening workflow while documenting persistent underestimation and the gap between remotely inferred roof slope and actual retrofit feasibility.

## Method

The GreenRoof imagery has RGB bands at 0.1-0.2 m per pixel and is divided into 512 by 512 pixel patches. Each of the four source cities contributes 1,120 training, 160 validation, and 320 test pairs, producing a 7:1:2 split. Ground-reference masks are generated from LOD2 roof-plane normals: slopes between 0 and 10 degrees are labeled as having high greening potential, after which erroneous or missing annotations are removed through manual verification.

Six semantic segmentation networks are trained on the pooled dataset and evaluated using pixel-level F1 and intersection over union (IoU). The best model is then transferred to 15 Bavarian cities in two ways: direct inference and local adaptation. Local adaptation fine-tunes the pretrained model separately for each city with 140 training and 60 validation patches sampled across central and peripheral building types.

The spatial evaluation measures the ratio of candidate roof area to all roof area under three contextual dimensions. Landsat 8 summer 2023 composites provide NDVI and land surface temperature. Green and non-green areas are compared across NDVI thresholds from 0.2 to 0.8; urban hot spots satisfy `LST > mean urban LST + 0.5 * standard deviation`; and official footprints are aggregated to 100 m by 100 m cells, then grouped by k-means into five building-density levels. This workflow is an instance of [[concepts/remote-sensing-based-green-roof-potential-assessment|Remote-Sensing-Based Green Roof Potential Assessment]].

## Experiments

### Segmentation Benchmark

U-Net has the strongest reported test-set performance, with an F1 score of 61.41% and IoU of 44.31%. FC-DenseNet is close at 60.62% F1 and 43.50% IoU. Efficient-UNet, DeepLab v3+, HRNet, and SegFormer report F1 scores of 58.00%, 56.73%, 54.02%, and 48.33%, respectively. The paper therefore uses U-Net for the multi-city application.

### Cross-City Transfer

Across the 15 Bavarian cities, direct transfer identifies potential green-roof area equal to 15.59% of all roof area. Local adaptation raises this to 20.30%, closer to the 29.75% obtained from official data. Even after adaptation, predictions underestimate the official ratio in every city by 7.65 percentage points on average. The discrepancy ranges from 0.06 points in Weilheim to 18.83 points in Schweinfurt and is attributed partly to differences in roof materials and urban morphology between source and target cities.

### Spatial Prioritization

Predictions and official data show similar aggregate spatial patterns. When the NDVI threshold is below 0.6, potential is higher in areas classified as non-green than in green areas. Larger cities generally have a smaller share of roofs in green areas than medium and small cities at a given threshold. Munich combines a relatively high share of roofs in hot spots with substantial potential in non-green areas, whereas Hemau has comparatively few roofs in hot spots. Both data sources also place more potential roof area in high-density city centers than outside them, with Landau, Regensburg, and Munich standing out in the combined city-center analysis.

These comparisons concern ratios and broad trends. Boundary errors remain visible, and agreement in spatial patterns does not imply building-level engineering accuracy.

## Limitations

- The suitability label is based only on roof slope. It omits structural load capacity, building age and heritage status, roof material, use, ownership, cost, and obstructions such as chimneys or elevator shafts.
- U-Net's reported F1 of 61.41% and IoU of 44.31% leave substantial segmentation error. Local adaptation still underestimates candidate area in all 15 target cities.
- Very-high-resolution aerial imagery may be unavailable or expensive outside well-mapped regions. Commercial satellite alternatives remain costly at national or continental scale, while lower-resolution imagery may not support adequate roof assessment.
- Official footprints and open alternatives such as OpenStreetMap or Microsoft building data have uneven completeness and accuracy.
- The study uses 3D data to construct training labels and as a reference. It shows that imagery can support approximate screening where 3D models are absent, not that it replaces detailed structural inspection.
- Spatial prioritization covers vegetation, heat, and building density but excludes flood exposure, air quality, implementation cost, and other policy criteria.
- The paper reports that data will be available on request; the supplied text does not provide a public dataset or code location.

## Related Concepts

- [[concepts/remote-sensing-based-green-roof-potential-assessment|Remote-Sensing-Based Green Roof Potential Assessment]]
- Semantic segmentation
- Normalized Difference Vegetation Index
- Urban heat island
- Domain adaptation

## Related Papers

- Xu et al. (2021), "A framework for the evaluation of roof greening priority": uses deep learning to distinguish flat and sloped roofs in Xiamen.
- Silva, Flores-Colen, and Antunes (2017), "Step-by-step approach to ranking green roof retrofit potential in urban areas": develops a retrofit-ranking workflow for Lisbon.
- Joshi et al. (2020), "Potential for urban greening with green roofs: A way towards smart cities": uses geospatial building information to assess urban greening potential.
- Slootweg et al. (2023), "Identifying the geographical potential of rooftop systems: Space competition and synergy": evaluates rooftop system potential in Amsterdam.
- Shao et al. (2021), "Assessing city-scale green roof development potential using unmanned aerial vehicle (UAV) imagery": studies city-scale mapping from very-high-resolution imagery.

[[index|Library home]]
