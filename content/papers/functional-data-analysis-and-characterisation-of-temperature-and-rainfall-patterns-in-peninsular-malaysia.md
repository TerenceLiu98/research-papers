---
title: Functional data analysis and characterisation of temperature and rainfall patterns in Peninsular Malaysia
type: paper
authors:
  - Wan Anis Farhah Wan Amir
  - Md Yushalify Misro
  - Mohd Hafiz Mohd
  - Suhaila Jamaludin
year: 2026
tags:
  - functional-data-analysis
  - functional-registration
  - climate
---

## TL;DR

Beta-spline smoothing and landmark-based [[concepts/functional-registration|functional registration]] reveal seasonal temperature and rainfall profiles at 15 Peninsular Malaysian weather stations over 2015–2024. Aligning seasonal extrema produces more distinct mean curves than unregistered averaging; the evidence is exploratory and graphical, rather than a forecasting evaluation.

## Research Question

How can smoothing and temporal alignment make seasonal and regional structure in daily temperature and rainfall more interpretable?

## Motivation

Averaging years whose seasonal peaks occur on different dates can flatten meaningful features. Continuous curves support derivatives and time-varying summary statistics, while registration separates differences in timing from differences in magnitude.

## Contributions

- Applies a combined smoothing, landmark registration, and descriptive-analysis workflow to temperature and rainfall across three regions.
- Compares landmarks from original curves with derivative extrema, and landmark registration with continuous registration.
- Describes regional mean profiles, between-station variance, and rates of seasonal change.

## Method

Daily mean temperature and daily rainfall totals come from the National Climate Centre. Of 27 main stations considered, 15 are retained: four North, six East, and five West-South. Stations with at least seven consecutive defective daily values are excluded; trace rainfall below 0.1 mm is mapped to zero. The smoothing algorithm takes imputed observations as input, but the supplied text does not specify the imputation procedure.

Cubic beta-splines represent each curve, with a second-derivative roughness penalty. Generalised cross-validation selects shape parameters, reported as beta₁ = 2 and beta₂ = 1. The spline method and broader smoothing comparisons are attributed to Amir et al. (2024).

Within quarterly windows, extrema are detected using R's `which.max` and `which.min`. Temperature uses two maxima and six minima annually; rainfall uses four maxima. For each corresponding landmark, the target time is its average across years. Monotone PCHIP interpolation constructs boundary-preserving warps satisfying hᵢ(t₀,f) = tᵢ,f; cubic interpolation evaluates registered curves xᵢ(hᵢ(t)). Original-curve landmarks are retained after comparison with derivative landmarks.

The analysis then forms 365-point station profiles averaged over 2015–2024, regional means, pointwise sample variance across stations, and first derivatives of fitted curves (Sections 3–4).

## Experiments

KLIA illustrates alignment across ten annual curves. Figures 5–7 show more interpretable seasonal alignment with original extrema than derivative extrema. Example temperature landmark days are 16 and 83, 114 and 172, 211 and 261, and 291 and 347 across the four quarters.

Figure 8 compares landmark and continuous registration. The authors report clearer seasonal structure with landmarks; continuous registration is described as faster and automatic but less successful at preserving meaningful peak timing in this example. No numerical alignment-error or runtime benchmark is provided.

Regional profiles show the lowest mean temperatures in the East and highest in the North. Cameron Highlands is retained as meaningful high-altitude variation rather than removed as an erroneous outlier. Eastern rainfall is highest near the beginning and end of the year, coinciding with the northeast monsoon. Temperature variance increases in February–March, while rainfall variance spikes near year-end. Northern rainfall derivatives show abrupt changes around days 150 and 250 (Figures 12–15).

## Limitations

- This is descriptive profiling of selected stations over ten years, with no held-out forecast evaluation or formal test of regional differences. Claims of general superiority over conventional methods exceed the direct comparisons reported here.
- Landmark windows require seasonal knowledge despite automated extrema detection. The preference for original extrema is specific to these smoothed curves.
- Regional averages incorporate substantial elevation differences, including Cameron Highlands in the East; they do not isolate a regional causal effect.
- The supplied text contains inconsistent rainfall terminology: Section 3.3 specifies maxima, while Section 4.2 calls some corresponding features troughs. Some calendar and monsoon descriptions also differ across sections. These should not be treated as independently validated onset dates.
- Data are available on request. Inferential modelling, forecasting, and atmospheric moisture transport analysis are proposed future directions, not demonstrated outcomes.

## Related Concepts

- [[concepts/functional-registration|Functional Registration]] — aligns seasonal extrema before functional averaging and comparison.

## Related Papers

- [[papers/sequential-bayesian-registration-for-functional-data|Sequential Bayesian Registration for Functional Data]] — cited for amplitude–phase separation; provides a probabilistic registration approach rather than this study's fixed landmark workflow.
- Amir, Misro, and Mohd (2024), “Flexible functional data smoothing and optimization using beta spline” — the smoothing method adopted here; DOI: 10.3934/math.20241126.
- Suhaila and Yusop (2016), “Spatial and temporal variabilities of rainfall data using functional data analysis” — earlier rainfall-focused work motivating this temperature-and-rainfall extension.
