---
title: Effects of extreme temperatures on public sentiment in 49 Chinese cities
type: paper
authors:
  - Chan Wang
  - Yi-Xiang Bai
  - Xin-Wu Li
  - Lu-tong Lin
year: 2024
doi: "10.1038/s41598-024-60804-1"
tags:
  - climate-impacts
  - sentiment-analysis
  - panel-data
---

## TL;DR

Across 49 Chinese cities in 2020, hotter and colder departures from historical temperature thresholds are associated with lower Weibo sentiment. Baseline reported standardized coefficients are −0.1606 for heat and −0.2724 for cold. Neighboring-city instruments preserve the negative estimates, although their causal interpretation depends on exclusion assumptions.

## Research Question

How do extreme temperatures relate to daily urban expressed sentiment, and how do environmental conditions and city characteristics modify that relationship?

## Motivation

Social media provides frequent observations of expressed emotion that can be matched to local weather. Historical city-specific thresholds distinguish unusual temperature exposure from ordinary climatic differences across locations.

## Contributions

- Combines daily temperature departures with city-day sentiment medians for 49 cities.
- Checks alternative sentiment tools, weather sources, historical thresholds, apparent temperatures, and neighboring-day temperature differences.
- Examines variation by pollution, wind, workdays, COVID-19 diagnoses, latitude, and income.

## Method

The study collects 497,736 Weibo posts from city topics in 2020 and retains 266,744 after duplicate filtering. Tencent NLP estimates positive-sentiment probabilities; city-day medians form a 0–100 outcome. The regression sample contains 16,944 observations.

NOAA station maximum and minimum temperatures are averaged within cities. Heat exposure is the daily maximum minus its city/calendar-day historical 95th-percentile threshold for 2000–2019. Cold exposure is the corresponding 5th-percentile minimum threshold minus the observed minimum. The displayed equations use signed differences, without explicitly truncating at zero. Apparent-temperature variants subtract the square root of wind speed from these indices.

Panel regressions include city effects, temporal indicators, precipitation, wind, PM2.5, and confirmed COVID-19 cases. The text describes temporal controls variously as week effects and weekday indicators; an alternative uses 24 solar terms. Table 1 reports city-clustered robust standard errors.

The [[concepts/fixed-effects-instrumental-variables|Fixed-Effects Instrumental Variables]] specification instruments local extremes with synthesized neighboring-city temperatures adjusted for altitude using 0.6°C per 100 metres. Identification assumes these neighboring temperatures affect local sentiment only through local temperature, conditional on controls.

## Experiments

These are observational regressions and robustness analyses, not randomized experiments.

| Specification | Heat coefficient | Cold coefficient | Source |
| --- | ---: | ---: | --- |
| Baseline | −0.1606 | −0.2724 | Table 1 |
| Alternative weather source | −0.1224 | −0.2190 | Table 2 |
| Baidu sentiment outcome | −0.1419 | −0.1331 | Table 2 |
| IV second stage | −0.1861 | −0.3766 | Table 3 |
| 1990–2019, 90th/10th thresholds | −0.1777 | −0.1456 | Table 4 |

All listed coefficients are reported significant at p < 0.01. The authors describe the baseline coefficients as standardized and interpret them as sentiment changes per one-standard-unit exposure increase; they should not be read as per-degree effects. Baseline R² is 0.2822. Negative signs persist across checks, but the larger cold coefficient is not universal: the Baidu outcome and extended historical baseline reverse that magnitude ordering.

Figures 3–4 report greater sensitivity on workdays, in poorer cities, under higher PM2.5, and when new COVID-19 cases occur. Stronger wind attenuates heat sensitivity but increases cold sensitivity. Northern cities show greater heat sensitivity and lower cold sensitivity than southern cities. These subgroup patterns are consistent with differential exposure and adaptation, without directly measuring those mechanisms.

## Limitations

Weibo city-topic users do not represent all residents, and automated expressed sentiment is not a direct measure of mental health. The sample covers major cities during the exceptional pandemic year 2020. Time-varying omitted factors remain a concern; instrument relevance alone cannot establish exclusion in geographically correlated weather and social conditions. The supplied main text refers instrument diagnostics to a supplement that is not included. Temporal-control terminology and standardized-effect interpretation require care when reproducing the estimates. Policy interventions proposed in the conclusion are not evaluated experimentally.

## Related Concepts

- [[concepts/fixed-effects-instrumental-variables|Fixed-Effects Instrumental Variables]]: combines stable city controls with neighboring-weather instruments; spatial exclusion remains the key causal assumption.

## Related Papers

- Baylis et al. (2018), *Weather impacts expressed sentiment*: cited antecedent linking weather to social-media emotion (reference 26).
- Zheng et al. (2019), *Air pollution lowers Chinese urbanites’ expressed happiness on social media*: informs sentiment aggregation and environmental identification choices (reference 28).
- Wang, Obradovich, and Zheng (2020), *A 43-million-person investigation into weather and expressed sentiment in a changing climate*: related large-scale weather–sentiment evidence (reference 29).
