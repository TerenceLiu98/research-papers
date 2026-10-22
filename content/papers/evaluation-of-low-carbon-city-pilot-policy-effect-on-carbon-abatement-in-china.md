---
title: "Evaluation of Low Carbon City Pilot Policy Effect on Carbon Abatement in China: An Empirical Evidence Based on Time-Varying DID Model"
type: paper
authors:
  - Xiang Liu
  - Yichen Li
  - Xiaohong Chen
  - Jia Liu
year: 2022
doi: 10.1016/j.cities.2022.103582
venue: Cities
tags:
  - environmental-policy
  - carbon-intensity
  - difference-in-differences
  - policy-evaluation
  - china
---

## TL;DR

Using a staggered difference-in-differences design for Chinese prefecture-level cities, the paper reports that the low-carbon city pilot policy reduced [[concepts/carbon-intensity|Carbon Intensity]] and per-capita emissions but did not significantly reduce total emissions. The estimated effects emerge only after several years and are concentrated in eastern and non-sub-provincial cities. These results differ from another library study that finds a relative increase in pilot-city carbon intensity, underscoring sensitivity to samples, periods, and design choices.

## Research Question

Did China's low-carbon city pilots reduce city-level carbon emissions, carbon intensity, or per-capita emissions; how did effects evolve over time and vary across regions and administrative tiers; and which policy overlaps and city characteristics were associated with the estimated effects?

## Motivation

China introduced low-carbon pilots in batches beginning in 2010. Because carbon outcomes were already changing nationwide, before-after comparisons within pilot cities cannot isolate the program's contribution. The staggered rollout provides variation across cities and years, while the distinction among total emissions, emissions per capita, and emissions per unit of GDP matters because an intensity reduction need not imply an absolute emissions reduction.

## Contributions

- Evaluates the 2010 and 2012 pilot batches as a staggered quasi-natural experiment using city and year fixed effects.
- Separates effects on total carbon emissions, per-capita emissions, and [[concepts/carbon-intensity|carbon intensity]].
- Examines dynamic effects, eastern-central-western heterogeneity, sub-provincial status, repeated provincial-and-city pilot designation, and overlap with carbon-trading and new-energy-vehicle pilots.
- Relates pilot status to industrial structure, coal dependence, innovation, and marketization in an eastern-city mechanism analysis.

## Method

The study uses a panel of 285 prefecture-level cities, including 96 pilot and 189 non-pilot cities. The abstract describes the period as 2005-2016, while the methods and dynamic-effects discussion refer to observations spanning 2006-2017; the supplied text does not reconcile this discrepancy. City emissions are estimated from natural gas, liquefied petroleum gas, and electricity consumption using IPCC-style coefficients and provincial coal-power shares.

Treatment turns on when a city enters the 2010 or 2012 pilot batch. The main specification uses city and year fixed effects, controls for population, GDP, income, government revenue, industrial structure, foreign direct investment, and other city characteristics, and adds city-specific trends in some models. Event-time indicators test pre-policy trends and estimate dynamics. Robustness checks account for overlapping policies, randomize treatment 1,000 times as a placebo, and apply 1:4 caliper propensity-score matching before DID estimation.

The paper also regresses four proposed mediators on pilot status for eastern cities: tertiary-industry share, coal's share of primary energy consumption, an urban innovation index, and a marketization index. These regressions show whether pilot status predicts the proposed channels; by themselves they do not establish that each variable mediates the policy's effect on emissions.

## Experiments

In the benchmark model, pilot status has a coefficient of **-0.081** for carbon intensity and **-0.082** for per-capita emissions, both significant at the 10% level; the total-emissions coefficient (**-0.052**) is not significant. With controls, the corresponding estimates are **-0.080**, **-0.077**, and **-0.045**. The paper interprets the intensity estimate as an approximately **7.2%** reduction relative to non-pilot cities.

Event-time estimates are insignificant before adoption, supporting the reported parallel-trends diagnostic. Carbon intensity becomes significantly lower in the third post-policy year, while total and per-capita emissions become significantly lower in the fourth, which the authors interpret as a delayed, cumulative response.

The 1:4 matched DID retains negative estimates for carbon intensity (**-0.086**, 5% level) and per-capita emissions (**-0.082**, 10% level), while total emissions remain insignificant. Random assignment of pilot status 1,000 times produces placebo estimates centered near zero. Cities designated at both provincial and municipal levels do not show stronger effects.

Effects vary sharply across groups. For eastern cities, pilot coefficients are **-0.202** for both carbon intensity and per-capita emissions at the 1% level, while corresponding estimates for central and western cities are not significant. Among non-sub-provincial cities, intensity and per-capita coefficients are **-0.100** and **-0.097** at the 5% level; neither outcome is significant among sub-provincial cities.

Controlling for the carbon-trading pilot leaves the low-carbon-city intensity estimate negative and significant, while carbon trading itself is associated with lower total emissions (**-0.333**, 1% level). Controlling for the new-energy-vehicle pilot makes the low-carbon-city intensity coefficient more negative (**-0.086** versus **-0.080** in the controlled benchmark). The mechanism regressions associate pilot status with a smaller tertiary-industry share, lower coal share, and higher innovation, but not with marketization.

## Limitations

- Pilot selection was not randomized. Fixed effects, pre-trend checks, matching, and placebos do not eliminate bias from time-varying unobserved determinants of both selection and emissions.
- Conventional two-way fixed-effects estimates under staggered adoption can combine heterogeneous cohort and timing effects in difficult-to-interpret ways; the paper does not report cohort-specific modern staggered-DID estimators.
- City emissions are reconstructed from a limited set of energy sources and provincial electricity-generation shares, so outcome measurement may miss city-specific production, trade, and power-mix differences.
- The source is internally inconsistent about its observation window: 2005-2016 in the abstract versus 2006-2017 in the dynamic-analysis section.
- The mechanism analysis establishes associations between pilot status and proposed mediators, not mediated causal effects on emissions.
- The discussion of the new-energy-vehicle policy conflicts with the reported coefficients. Table 4 and Section 4.3.2 imply the original low-carbon-city effect was **underestimated** because controlling for that pilot makes the coefficient more negative, whereas the abstract and conclusion call it an **overestimate**.
- Regional and administrative-tier estimates use much smaller subsamples, particularly the 226 sub-provincial city-year observations, and should not be read as causal comparisons between regions or tiers.

## Related Concepts

- [[concepts/carbon-intensity|Carbon Intensity]]
- [[concepts/stacked-event-studies|Stacked Event Studies]]: an alternative organization for staggered treatment timing that makes cohort comparisons explicit.
- [[concepts/spatial-difference-in-differences|Spatial Difference-in-Differences]]: relevant if pilot policies or emissions spill across neighboring cities, which this paper does not model.
- [[concepts/distributional-difference-in-differences|Distributional Difference-in-Differences]]: evaluates changes beyond mean outcomes.

## Related Papers

- [[papers/does-low-carbon-pilot-city-program-reduce-carbon-intensity|Does Low-Carbon Pilot City Program Reduce Carbon Intensity? Evidence from Chinese Cities]]: studies the same program over 2005-2018 with 49 cities and matched DID, but reports that pilot cities' carbon intensity declined less than that of comparison cities.
- [[papers/the-spatial-difference-in-difference-measurement-of-policy-effect-of-environmental-protection-interview-on-green-innovation|The Spatial Difference-in-Difference Measurement of Policy Effect of Environmental Protection Interview on Green Innovation]]: evaluates another Chinese city-level environmental intervention while explicitly modeling spatial spillovers.
- Han et al. (2018), "The Effects of Urban Agglomeration Economies on Carbon Emissions: Evidence from Chinese Cities": supplies the city-emissions calculation adopted by this paper.
- Cai et al. (2018), "Local Strategies for China's Carbon Mitigation: An Investigation of Chinese City-Level CO2 Emissions": provides an alternative city inventory used for comparison.

Publication metadata: *Cities*, 123, 103582. [DOI](https://doi.org/10.1016/j.cities.2022.103582).

[[index|Library home]]
