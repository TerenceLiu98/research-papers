---
title: Thermal Inversions as Pollution Instruments
type: concept
aliases:
  - Thermal Inversion Instrumental Variables
tags:
  - instrumental-variables
  - air-pollution
  - environmental-economics
  - causal-inference
---

## Overview

Thermal inversions occur when warmer air overlies cooler air near the surface, restricting dispersion and trapping pollutants. Pollution studies can use inversion frequency as an instrument for ambient pollution to separate meteorologically induced exposure variation from economic activity and residential sorting. A causal interpretation requires both a relevant first stage and an exclusion restriction linking inversions to the outcome only through the pollution exposure under study, conditional on controls.

## Key Ideas

- **Measurement must match the setting.** Dong, Qiao, and Zhou define inversions using NASA MERRA-2 temperatures at 320 m and 110 m, observed at six-hour intervals and aggregated to annual counts. This is an application-specific operationalization, not a universal inversion threshold.
- **Fixed effects change the identifying variation.** With individual and city-by-year fixed effects, identification depends on variation remaining after both are removed. Broad differences between polluted and clean cities cannot by themselves identify the coefficient.
- **Weather controls support, but do not prove, exclusion.** Temperature, humidity, precipitation, pressure, and wind may affect outcomes directly. Controlling for them addresses specified pathways; it does not establish that all remaining inversion-related outcome variation operates through the measured pollutant.
- **Exposure timing matters.** Outcomes with long production cycles require explicit choices about contemporaneous exposure, lags, and multi-year windows. Publication gaps are proxies for research periods and can misrepresent concurrent projects or publication delays.
- **Strength is specification-specific.** In the scholar-productivity application, the baseline Kleibergen-Paap F-statistic is 117, while a three-calendar-year exposure specification reports 5. A negative coefficient in a robustness check should be interpreted alongside its first-stage strength.
- **Mechanisms need separate evidence.** An instrumented output effect does not establish that attendance, illness, or collaboration caused a particular share of that effect. Activity measures and subgroup comparisons can support explanations without identifying mediation.

## Important Papers

- [[papers/impacts-of-pm2-5-air-pollution-on-high-skilled-worker-productivity-in-china|Impacts of PM2.5 air pollution on high-skilled worker productivity in China]]: uses inversions in a scholar panel to estimate changes in fractional publication output and examines exposure windows and potential mechanisms.
- Arceo, Hanna, and Oliva (2016), "Does the effect of pollution on infant mortality differ between developing and developed countries? Evidence from Mexico City": cited by Dong et al. as a precedent for constructing the inversion instrument.
- Sager (2019), "Estimating the effect of air pollution on road safety using atmospheric temperature inversions": a related inversion-IV application cited by Dong et al.

## Related Concepts

- [[concepts/fixed-effects-instrumental-variables|Fixed-Effects Instrumental Variables]]: combines stable individual heterogeneity controls with an instrument for endogenous exposure.
- [[concepts/spatial-causal-inference|Spatial Causal Inference]]: considers geographic confounding and dependence, which also matter when instruments and exposure vary across places.
