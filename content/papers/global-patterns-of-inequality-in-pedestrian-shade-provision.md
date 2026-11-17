---
title: "Global patterns of inequality in pedestrian shade provision"
type: paper
authors:
  - Xinyue Gu
  - Lukas Beuster
  - Xintao Liu
  - Eveline van Leeuwen
  - Titus Venverloo
  - Fábio Duarte
year: 2026
doi: "10.1038/s41467-026-69190-w"
tags:
  - urban-climate-adaptation
  - environmental-justice
  - pedestrian-shade
---

## TL;DR

Across nine cities, simulated shade on public pedestrian surfaces is unevenly distributed, with lower-income and peripheral neighbourhoods generally receiving less. High average provision does not ensure equality: Stockholm combines abundant shade with substantial disparities. Income associations nevertheless vary by city, including reversed patterns in Barcelona and Milan.

## Research Question

How does publicly accessible pedestrian shade vary within and across cities, and how is its distribution associated with neighbourhood wealth, population, trees, and built form?

## Motivation

Tree canopy and green-space coverage do not directly measure shade available where people walk. Building geometry, solar position, and the location of public pedestrian infrastructure determine whether cooling resources reach pedestrians. This makes pedestrian space an important unit for assessing adaptation equity.

## Contributions

- Compares sidewalk shade in Amsterdam, Barcelona, Belém, Boston, Hong Kong, Milan, Rio de Janeiro, Stockholm, and Sydney using a common simulation workflow.
- Distinguishes average shade intensity from cumulative shade resource, connecting physical availability to distributional inequality.
- Separates building shade from additional tree shade and checks whether spatial inequality persists on historically hottest days.

## Method

The study simulates shadows at 0.5 m resolution with a standalone UMEP Shadow Generator, using surface elevations and tree geometry. Google Solar API supplies surface models except in Amsterdam, where AHN4 LiDAR substitutes for incomplete coverage. Tree crowns transmit 10% of direct solar radiation. KerbSide generates sidewalk and footpath polygons from OpenStreetMap networks; these polygons mask the simulated surfaces before neighbourhood aggregation.

Half-hourly simulations cover the summer solstice, with average shade summarized over 10:00–17:00. Average shade equals one minus average sunlit intensity; cumulative shade resource equals average shade multiplied by sidewalk area in square metres. Neighbourhoods missing necessary data or below their city's fifth population-density percentile are excluded.

Lorenz curves and weighted [[concepts/gini-coefficient|Gini coefficients]] characterize shade inequality, with bootstrap 95% confidence intervals. XGBoost models average shade from population, households, income, home value, building height, canopy height, and construction-era variables. Methods describe pooled city data with weights proportional to city sample sizes and five-fold grid search. SHAP describes predictive associations, not causal effects. Data and code are reported at [Zenodo](https://doi.org/10.5281/zenodo.17972371).

## Experiments

The observational comparison covers nine cities with neighbourhood counts ranging from 129 in Hong Kong to 6,933 in Rio de Janeiro (Fig. 1). Shade below 0.4, between 0.4 and 0.6, and above 0.6 is classified as low, moderate, and high using the observed distribution; these are not independently validated comfort thresholds.

The paper reports shade of 0.58 for Stockholm's bottom 20% of neighbourhoods versus 0.37 for Belém's top 20%, illustrating that absolute availability and relative inequality answer different questions. Low-income and peripheral deficits are widespread, while wealth–shade spatial patterns remain heterogeneous (Figs. 1–2).

Canopy height is reported as the most influential positive predictor across cities; building height also has positive associations. Lower income is associated with higher shade in Barcelona and Milan, unlike several other cities (Fig. 3). Numerical predictive performance is referred to supplementary material and is not supplied in the main text.

Separating shade sources shows building shade as the most evenly distributed, combined shade intermediate, and additional tree shade most unequal. Additional tree shade is the increment beyond building shade, not all shade cast by trees. Comparisons with hottest days identified over 1991–2020 produce modest localized map changes without overturning the broad inequality pattern (Figs. 4–7).

## Limitations

- Generated sidewalks introduce uncertainty in location, width, and informal paths; actual pedestrian activity is not measured.
- Socioeconomic definitions and observation years differ between cities. Neighbourhood wealth proxies do not measure individual resources or exposure.
- Artificial shade structures are omitted. Geometric shade does not capture the full thermal effects of evapotranspiration or establish measured health benefits.
- Reference-day comparisons do not characterize full seasonal exposure. The authors recommend hottest-month conditions for local policy targets.
- Observational regressions and SHAP cannot establish that income or planning decisions cause the observed disparities; the proposed historical mechanisms remain interpretations.

## Related Concepts

- [[concepts/pedestrian-shade-equity|Pedestrian Shade Equity]]: evaluates the distribution of shade on publicly accessible walking surfaces.
- [[concepts/gini-coefficient|Gini Coefficient]]: summarizes concentration alongside absolute provision.

## Related Papers

- Turner, Middel, and Vanos (2023), “Shade is an essential solution for hotter cities”: motivates shade-focused heat adaptation (reference 14).
- Chakraborty et al. (2019), “Disproportionately higher exposure to urban heat in lower-income neighborhoods: a multi-city perspective”: examines socioeconomic heat disparities; this study shifts attention to sidewalk shade (reference 16).
- [[papers/identification-of-the-potential-for-roof-greening-using-remote-sensing-and-deep-learning|Identification of the potential for roof greening using remote sensing and deep learning]]: a complementary library study of geospatial adaptation prioritization, assessing roof suitability rather than pedestrian shade access.
