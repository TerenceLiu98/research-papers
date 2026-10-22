---
title: "Generative AI and Causal-Spatial Modeling for Understanding Nighttime Pedestrian Risk in Urban Systems"
type: paper
authors:
  - Muyi Zhu
  - Xiaotong Ye
  - Yuankai Wang
  - Chenming Niu
  - Waishan Qiu
  - Junshi Xu
year: 2026
doi: 10.1016/j.compenvurbsys.2026.102436
tags:
  - pedestrian-safety
  - spatial-causal-inference
  - double-machine-learning
  - street-view-imagery
  - generative-ai
  - urban-analytics
---

## TL;DR

This study combines AI-synthesized nighttime street-view imagery with [[Double Machine Learning]] and a geographically weighted causal random forest to estimate spatially varying effects on pedestrian crash risk across Hong Kong. Generated images supply street-level measures of brightness, contrast, inadequate lighting, and glare where real nighttime coverage is scarce. The reported estimates associate visual clutter and poorly defined paths with greater risk, while moderate object contrast and clear spatial boundaries are protective; overall brightness alone is not a reliable safety target.

## Research Question

How do street form and nighttime visual conditions affect pedestrian crash risk across a dense city, and can a causal machine-learning model account simultaneously for observed confounding, nonlinear effects, and geographic heterogeneity?

## Motivation

Conventional crash models often estimate associations without adequately addressing confounding or nonlinear response patterns. They also commonly treat observations as independent despite spatially clustered crashes and environments. Meanwhile, satellite nighttime-light products are too coarse to describe pedestrian-scale visibility, and widely available street-view imagery is predominantly captured during the day. The paper addresses these modeling and data gaps together by synthesizing nighttime street scenes and incorporating their visual measurements into a [[Spatial Causal Inference]] framework.

## Contributions

- Builds a citywide proxy for nighttime street conditions by applying a Hong Kong-fine-tuned CycleGAN to historical daytime street-view imagery.
- Defines image-level and object-specific measures of brightness, local contrast, inadequate lighting, and glare for roads, sidewalks, vehicles, and pedestrians.
- Integrates five-fold DML residualization with a geographically weighted causal random forest (GWCRF) to estimate nonlinear, location-specific marginal effects.
- Compares daytime and nighttime risk mechanisms and maps spatial variation in the estimated effects of traffic-sign density and visibility.

## Method

The analysis uses 18,355 pedestrian crashes recorded from 2014 to 2019, including 4,771 nighttime crashes. Roads are divided into 100-meter segments with 50-meter buffers, and crash severity is summarized by a Pedestrian Crash Risk Index that weights slight, serious, and fatal crashes by 1, 5, and 10. Historical street views are sampled every 50 meters along crash-associated segments. SegFormer extracts ten built-environment classes from 113,904 daytime images.

A locally fine-tuned CycleGAN translates the daytime scenes to nighttime conditions. After quality filtering, 107,116 synthesized nighttime images remain. The generator reports SSIM 0.52, Inception Score 1.824, and L2 distance 98.84; visual indicators computed on generated and manually captured nighttime images have reported Pearson correlations from 0.45 to 0.72. The nighttime model includes 20 indicators formed by crossing four lighting measures with the full scene and four semantic regions.

For each environmental treatment, five-fold cross-fitting estimates conditional outcome and treatment models from built-environment and socioeconomic covariates. Their residuals enter a causal forest. GWCRF modifies this second stage with Gaussian geographic weights derived from nearest-neighbor distances and uses weighted orthogonal loss to construct trees. Local leaf effects are averaged across trees, and average marginal effects summarize the expected PCRI change for a one-standard-deviation increase in each treatment. LOWESS curves and bivariate LISA maps describe nonlinear and spatial heterogeneity.

## Experiments

GWCRF is compared with an otherwise matched causal random forest without geographic weights. It reports lower R-loss for every evaluated daytime and nighttime treatment. First-stage random forests attain average treatment-model $R^2$ values of 0.59 by day and 0.57 at night; outcome-model $R^2$ values are 0.63 and 0.58, respectively.

Built-form effects differ substantially by time. Traffic-sign density has a reported average marginal effect of 1.22 by day and 0.22 at night, while footway density falls from 0.90 to 0.10. Sky segmentation is protective during the day (AME -0.61) but has little estimated nighttime effect (0.02). Lamp density changes from a positive daytime estimate (0.41) to a negative nighttime estimate (-0.08).

The synthesized nighttime measures distinguish illumination from visibility. Overall, road, and vehicle brightness have positive reported effects, while sidewalk brightness is slightly protective. Local contrast around pedestrians (-1.32), vehicles (-0.99), and the scene overall (-0.86) is protective, but contrast on roads (1.51) and sidewalks (1.40) is risk-enhancing. Dark road and sidewalk areas also have large positive estimates (0.98 and 1.06), and every glare-ratio estimate is positive. The nonlinear analysis finds the strongest protective pedestrian-contrast effect near 0.5 and rising risk as glare increases.

Spatial clusters reinforce the distinction between infrastructure quantity and legibility. Dense commercial districts show high daytime risk effects from sign density but protective effects from clearly visible signs. At night, both sign density and visual presence become protective in the reported cluster analysis, motivating time- and place-specific interventions rather than uniform increases in infrastructure or brightness.

## Limitations

Street-view capture dates do not perfectly align with the 2014-2019 crash period. Synthesized nighttime scenes are proxies rather than physical measurements: they cannot reproduce all temporal lighting variation, and bright reflective objects can be misclassified as glare. Their correlations with real-image indicators are only moderate. The causal estimates also rely on adequate adjustment for observed confounders; omitted pedestrian volume, dynamic lighting, and real-time traffic conditions could explain part of the estimated effects. Finally, all empirical evidence comes from Hong Kong, so transfer to other urban forms and lighting systems remains untested.

## Related Concepts

- [[Double Machine Learning]]
- [[Spatial Causal Inference]]
- [[Spatial Autocorrelation]]
- Heterogeneous treatment effects
- Causal forests
- Street-view imagery
- Pedestrian safety

## Related Papers

- [[papers/structured-pixels-satellite-imagery-as-the-cause-in-causal-effect-estimation|Structured Pixels: Satellite Imagery as the Cause in Causal Effect Estimation]]
- Chernozhukov et al. (2018), "Double/Debiased Machine Learning for Treatment and Structural Parameters."
- Wang et al. (2024), "Geographically Weighted Machine Learning for Modeling Spatial Heterogeneity in Traffic Crash Frequency and Determinants in US."
- Fan and Biljecki (2024), "Nighttime Street View Imagery: A New Perspective for Sensing Urban Lighting Landscape."
- Ye et al. (2024), "Generated Nighttime Street View Image to Inform Perceived Safety Divergence Between Day and Night in High Density Cities: A Case Study in Hong Kong."

[[index|Library home]]
