---
title: "Does Low-Carbon Pilot City Program Reduce Carbon Intensity? Evidence from Chinese Cities"
type: paper
authors:
  - Tong Feng
  - Zhongguo Lin
  - Huibin Du
  - Yueming Qiu
  - Jian Zuo
year: 2021
doi: 10.1016/j.ribaf.2021.101450
tags:
  - environmental-policy
  - carbon-intensity
  - difference-in-differences
  - propensity-score-matching
  - china
---

## TL;DR

Using a city panel and matched difference-in-differences design, the paper finds that China's low-carbon pilot city program slowed the decline in [[concepts/carbon-intensity|Carbon Intensity]] relative to comparison cities. Its pooled estimates imply a 15-20% relative increase, despite absolute declines in both groups. The authors attribute this short-run result partly to energy-intensive infrastructure construction, while emphasizing that their data cannot establish the program's long-run effect.

## Research Question

Did China's low-carbon pilot city program reduce city-level carbon intensity, and did its effects vary across implementation rounds, years, and city characteristics?

## Motivation

Carbon intensity is a central target in Chinese climate policy, but a decline after a policy begins does not by itself show that the policy caused the decline. Other national and local measures also affected emissions during the study period. The paper therefore compares changes in pilot and nonpilot cities rather than treating pilot cities' before-after trend as the program effect.

## Contributions

- Evaluates two rounds of China's low-carbon pilot city program using city and year fixed-effects difference-in-differences (DID).
- Combines DID with propensity-score kernel matching to improve observed comparability between pilot and nonpilot cities.
- Separates the two policy rounds and estimates annual dynamics and heterogeneity across geographic and socioeconomic groups.
- Documents a negative policy-evaluation result: pilot cities reduced carbon intensity, but less than comparison cities.

## Method

The analysis uses annual data for 49 Chinese cities from 2005 to 2018: 27 cities exposed to one of two pilot rounds and 22 comparison cities. Nine pilot cities are excluded because their data are unavailable or insufficiently comparable. The first-round effect begins in 2011 and the second-round effect in 2013, reflecting when annual statistics could register the programs launched in August 2010 and November 2012.

The outcome is carbon emissions per unit of GDP. Emissions are calculated from energy consumption using IPCC carbon coefficients and a sectoral emissions-accounting approach. The DID regressions include city and year fixed effects and controls for GDP, population, investment, energy consumption, secondary-industry share, and geographic location. The treatment interaction compares the pilot cities' change with the contemporaneous change in nonpilot cities.

Because pilot status was associated with several observed city characteristics, the authors also use propensity-score matching followed by DID. A quadratic-kernel procedure matches on baseline socioeconomic, energy, and geographic variables. Reported balance tests find no statistically significant post-match differences in those variables. Pre-policy trends are examined graphically and with year interactions; placebo timing and alternative outcomes, standard errors, and samples provide additional checks.

## Experiments

Across all cities, carbon intensity fell by 0.164 kg CO2/GDP (CNY) in the treatment group and by 0.264 in the control group after implementation. The preferred controlled DID coefficient is **0.058**, while matched DID yields **0.061**; both are reported as statistically significant and interpreted as a **15-20%** relative increase in pilot-city carbon intensity.

The first-round estimates are **0.103** under DID and **0.101** under matched DID, corresponding to about **32-33%**. For the second round, the DID estimate is positive but not significant (**0.042**), whereas matched DID is positive and significant (**0.082**, about **23%**). The authors caution that the second round has a shorter post-treatment window.

Annual estimates indicate that the relative increase grew for roughly three years after adoption and then began to weaken after three to four years. Subsample estimates are stronger in eastern, coastal, and nonwestern cities and in cities with higher GDP, larger populations, more fixed investment, or a lower secondary-industry share. Placebo timing produces insignificant treatment interactions. Results are also broadly maintained with logged carbon intensity, province-clustered errors, and samples excluding early WWF pilots, centrally administered municipalities, or cities in pilot provinces.

The paper interprets the short-run increase as potentially arising from energy-intensive construction of clean-energy infrastructure and economic development zones, policy support that stimulated activity, and carbon-reduction measures adopted by comparison cities. These are proposed explanations rather than directly identified mechanisms.

## Limitations

- Pilot participation followed local applications and was not randomized. Matching balances observed covariates, but does not remove bias from unobserved factors or policy selection related to future trends.
- The claim that selection was random "from the perspective of carbon intensity" rests on an insignificant pre-policy carbon-intensity coefficient; this does not establish overall treatment exogeneity.
- DID requires credible untreated parallel trends. The reported pre-trend and placebo checks support this assumption but cannot prove it, especially with staggered implementation and potentially different local policies.
- The design treats comparison cities as unaffected, although low-carbon policies and regional economic connections could create contamination or spillovers.
- The second round has a short post-policy period, and the 2005-2018 panel cannot determine whether infrastructure investments eventually reduced carbon intensity.
- The mechanism discussion is suggestive: infrastructure construction, subsidies, and control-city initiatives are not isolated in dedicated causal tests.
- Nine pilot cities are omitted for data availability and comparability, limiting coverage of the national program.

## Related Concepts

- [[concepts/carbon-intensity|Carbon Intensity]]
- [[concepts/spatial-difference-in-differences|Spatial Difference-in-Differences]]: relevant when policies or emissions in one city affect neighboring cities, an interference channel not modeled here.
- [[concepts/distributional-difference-in-differences|Distributional Difference-in-Differences]]: studies policy effects on outcome distributions rather than only mean changes.
- [[concepts/factorial-difference-in-differences|Factorial Difference-in-Differences]]: distinguishes effect modification from stronger causal moderation claims when comparing baseline subgroups.

## Related Papers

- Shan et al. (2018), "China CO2 Emission Accounts 1997-2015": supplies the sectoral emissions-accounting approach used to construct city outcomes.
- Abadie, Diamond, and Hainmueller (2010), "Synthetic Control Methods for Comparative Case Studies": motivates the paper's placebo analysis.
- Viard and Fu (2015), "The Effect of Beijing's Driving Restrictions on Pollution and Economic Activity": illustrates a contemporaneous local policy that could affect carbon outcomes.
- [[papers/the-spatial-difference-in-difference-measurement-of-policy-effect-of-environmental-protection-interview-on-green-innovation|The Spatial Difference-in-Difference Measurement of Policy Effect of Environmental Protection Interview on Green Innovation]]: another evaluation of Chinese city-level environmental policy that explicitly models geographic spillovers.

[[index|Library home]]
