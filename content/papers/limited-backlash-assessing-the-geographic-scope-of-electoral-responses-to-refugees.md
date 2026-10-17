---
title: "Limited backlash? Assessing the geographic scope of electoral responses to refugees"
type: paper
authors:
  - Jeremy Ferwerda
  - Sascha Riaz
year: 2025
source_job_id: 327b037f-910b-4a07-9cf3-b2919bae04bf
tags:
  - refugee-exposure
  - electoral-behavior
  - difference-in-differences
  - spatial-measurement
---

## TL;DR

Using 341 stable synthetic precincts in Berlin, Ferwerda and Riaz estimate that refugee housing within 150 meters of a precinct's population-weighted centroid increased AfD vote share by 2.6 percentage points between the 2013 and 2017 federal elections (95% CI [0.05, 5.1]). No effect is detectable at the 250-meter threshold. The study argues that geographically narrow backlash can coexist with modest aggregate effects, while showing why nonrandom housing placement, changing precinct boundaries, and omitted mail ballots complicate earlier estimates.

## Research Question

How geographically localized are electoral responses to refugee housing, and can spatial aggregation and measurement choices explain previous null findings about far-right voting?

## Motivation

Comparisons between municipalities that host refugees and those that do not can pool voters with very different exposure. Berlin also presents two measurement problems: 50% of in-person precincts and 67% of mail-in precincts changed between 2013 and 2017, and mail ballots accounted for 33.4% of votes in 2017. Excluding those ballots can create a selected sample because voting mode is associated with both refugee exposure and AfD support.

The supplied research note records first online publication on 3 December 2025. It does not supply an article DOI or journal identification.

## Contributions

- Documents nonrandom refugee housing placement near younger populations and neighborhoods with fewer German citizens, challenging the assumption of locally exogenous exposure.
- Uses [[concepts/electoral-precinct-harmonization|Electoral Precinct Harmonization]] to retain both voting modes and construct comparable geographic units over time.
- Estimates exposure effects across distance thresholds, finding a localized increase in AfD support that disappears in coarser comparisons.

## Method

### Data and Geographic Units

The authors combine Berlin's 2013 and 2017 federal election returns, geocoded refugee housing facilities established since January 2014, and demographic information from the 2011 census at 100-by-100-meter resolution. They aggregate election returns to mail-in precincts and amalgamate units with changing borders, yielding 341 stable synthetic precincts. This addresses a [[concepts/change-of-spatial-support|Change of Spatial Support]] problem while preserving vote totals across voting modes.

Exposure is defined by distance from each precinct's population-weighted centroid to housing facilities. It is a precinct-level proxy, not a measurement of every voter's residential distance or personal contact with refugees.

### Identification

For each distance threshold $k$ between 150 and 1,000 meters, the authors estimate

$$
\Delta Y_{i,d} = \alpha_d + \tau_k T_i^k + \epsilon_{i,d},
$$

where $\Delta Y_{i,d}$ is the 2013-2017 change in AfD vote share, $\alpha_d$ is a city-district fixed effect, and $T_i^k$ indicates at least one newly opened housing facility within $k$ meters of precinct $i$'s centroid. The comparison is between vote-share changes in exposed and unexposed precincts within the same district.

Causal interpretation requires parallel counterfactual trends within districts. A direct AfD pretrend test is unavailable because the party first contested a federal election in 2013. Instead, the authors examine 2009-2013 trends in CDU support, combined FDP/AfD support, NPD/REP support, and turnout. At narrow thresholds, these tests show no statistically significant pretrend differences, which the authors treat as partial support for identification.

## Experiments

This is an observational electoral study. The following results are reported in the main text; supplementary checks are summarized there but their full tables are not included in the supplied Markdown.

| Analysis | Reported finding |
| --- | --- |
| Pretreatment demographic balance | Housing was concentrated near younger residents and fewer German citizens; imbalance was about 0.4 standard deviations (Figure 1). |
| 150-meter exposure threshold | AfD vote-share effect of about +2.6 percentage points, 95% CI [0.05, 5.1] (Figure 2). |
| 250-meter exposure threshold | No observable effect on AfD vote share (Figure 2). |
| City-district aggregation | No effect detected at this coarser geographic scale (Discussion). |
| Citywide electoral context | AfD support rose from 4.9% to 12%; this overall increase is distinct from the estimated local exposure effect. |
| Spatial randomization check | Randomly relocated counterfactual facilities yield a reported $p<0.04$ (SM Figure G.1, as summarized in the text). |

The main text reports similar results when counting facilities rather than using binary exposure, and stronger findings with population or land-area weights. Patterns are similar in former East and West Berlin. Results also persist with Conley standard errors and specifications allowing demographic covariates to predict different electoral trends (SM Tables G.1-G.4 and G.6).

Migration rates did not significantly change during the refugee crisis, and the authors find no significant change in eligible-voter counts associated with treatment. These checks offer no evidence of selective outmigration driving the electoral pattern. Supplementary point estimates suggest losses for CDU/CSU and Die Linke and lower turnout in exposed areas, but aggregate returns cannot establish individual vote switching.

## Limitations

- Parallel trends for AfD itself cannot be tested before treatment. Related-party and turnout pretrends provide indirect evidence; differencing alone does not eliminate demographic differences in electoral trajectories.
- Centroid-based thresholds change which precincts count as exposed. The absence of a detectable estimate at 250 meters does not establish an exact individual-level boundary beyond which effects are zero.
- Precinct aggregates cannot distinguish persuasion, vote switching, and selective abstention. Perceived neighborhood disruption, reduced trust, and protest voting are proposed mechanisms, not identified causal pathways.
- The evidence concerns Berlin and the 2017 federal election after the 2015-2016 influx. It does not establish the same spatial pattern in other settings or elections.
- The authors interpret limited aggregate exposure effects as compatible with a larger role for national concerns. The design does not directly estimate the contribution of those concerns to the AfD's total gains.
- The supplied Markdown includes references to supplementary material and footnotes without their full contents. Detailed robustness estimates and facility-level documentation cannot be independently assessed from this text.

## Related Concepts

- [[concepts/electoral-precinct-harmonization|Electoral Precinct Harmonization]]: Stable units across elections and voting modes.
- [[concepts/change-of-spatial-support|Change of Spatial Support]]: Geographic aggregation affects measurement and the exposure contrast.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: Spatial dependence motivates the reported Conley-standard-error check.
- Group threat theory: The localized backlash is consistent with this account, without directly identifying the mechanism.

## Related Papers

- Hennig (2021), "Neighborhood quality and opposition to immigration: Evidence from German refugee shelters." An earlier Berlin study with null findings whose handling of boundary changes this paper questions.
- Pettrachin et al. (2022), "Did exposure to asylum seeking migration affect the electoral outcome of the 'Alternative fur Deutschland' in Berlin? Evidence from the 2019 European elections." A cited Berlin comparison using a different election and cross-sectional design.
- Steinmayr (2021), "Contact versus exposure: Refugee presence and voting for the far right." Cited research distinguishing exposure from potentially ameliorating contact.
- [[papers/integrating-data-across-misaligned-spatial-units|Integrating Data Across Misaligned Spatial Units]]: Related library reading on how geographic transformations affect inference; not cited in this paper.
- [[papers/dynamics-and-determinants-of-right-wing-populist-mobilisation-in-germany|Dynamics and determinants of right-wing populist mobilisation in Germany]]: Related library evidence on contextual correlates of street mobilisation rather than causal electoral responses; not cited in this paper.

[[index|Library home]]
