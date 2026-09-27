---
title: "Impacts of PM2.5 air pollution on high-skilled worker productivity in China"
type: paper
authors:
  - Xiaofang Dong
  - Liecheng Qiao
  - Yinggang Zhou
year: 2026
doi: "10.1038/s41562-026-02576-4"
venue: Nature Human Behaviour
tags:
  - air-pollution
  - labor-productivity
  - instrumental-variables
  - panel-data
  - china
---

## TL;DR

Using Chinese scholars' publication records from 2015-2022, Dong, Qiao, and Zhou estimate that an additional $1\,\mu\mathrm{g}/\mathrm{m}^3$ of PM2.5 exposure reduces fractional publication output by approximately 0.23% and journal-impact-factor-weighted output by 0.67%. Their instrumental-variable design uses thermal inversions, author fixed effects, city-by-year fixed effects, and weather controls. The baseline covers positive-publication years and approximates exposure using gaps between publication years. Separate analyses of campus attendance, hospital visits, and coauthorship support possible pathways without identifying how much each mediates the publication effect.

## Research Question

Does cumulative air pollution exposure reduce the output of workers doing sustained, cognitively demanding research, and do labor supply, health-related activity, collaboration, and migration help explain the relationship?

## Motivation

Much of the literature examines immediate productivity effects in physically demanding occupations or short tasks. Academic research has longer production cycles, flexible schedules, and substantial collaboration. These features motivate measuring exposure over the period preceding publication while addressing differences in scholars' ability, location choices, and local economic conditions.

## Contributions

- Constructs a panel from approximately 2.99 million SCI/SSCI articles with mainland Chinese affiliations, representing approximately 3.83 million scholars and 6.31 million positive-publication scholar-year records.
- Applies [[concepts/fixed-effects-instrumental-variables|Fixed-Effects Instrumental Variables]] with [[concepts/thermal-inversions-as-pollution-instruments|Thermal Inversions as Pollution Instruments]] to publication output and examines alternative exposure windows, zero-output years, and migration.
- Uses mobile signaling data and publication coauthorship to examine potential behavioral pathways alongside the national publication estimates.

## Method

**Outcome and exposure.** The Web of Science sample covers journal articles from 2015-2022, excluding Hong Kong, Macau, and Taiwan affiliations. A paper with $n$ authors contributes $1/n$ to each author's output; the second outcome additionally weights this contribution by journal impact factor (JIF). Names, affiliations, and research fields identify scholars. Affiliations are matched to the nearest pollution monitor, with matches beyond 50 km excluded; 1,730 monitors contribute exposure data.

The baseline uses only years with positive publications. Exposure is the average PM2.5 concentration after the previous publication year through the current publication year. For example, publications in 2015 and 2018 imply averaging pollution in 2016-2018 for the 2018 outcome. Consecutive publication years use contemporaneous annual exposure. This measures an average concentration over an inferred research period, rather than an accumulated physical dose.

**Identification.** Two-stage least squares instruments PM2.5 using annual thermal inversion counts derived from NASA MERRA-2 temperatures. An inversion occurs when temperature at 320 m exceeds temperature at 110 m. The outcome specification is:

$$
\log Y_{it}=\beta\widehat{P}_{it}+W_{it}'\gamma+\theta_i+\rho_{c(i)t}+\varepsilon_{it},
$$

where $P$ denotes the exposure measure, $W$ includes temperature, humidity, precipitation, pressure, and wind speed, $\theta_i$ is an author fixed effect, and $\rho_{c(i)t}$ is a city-by-year fixed effect. Standard errors are clustered by institution. Identification requires residual pollution variation within these fixed effects and the assumption that inversions affect output only through pollution, conditional on controls. Instrument strength alone does not establish this restriction.

**Supporting analyses.** An ORCID subsample tracks migration and supports Heckman selection corrections and migration difference-in-differences analyses. Mobile data identify 10,147 presumed faculty members aged at least 30 through campus location, application use, and schedule flexibility. The Methods describe 13 campuses at 11 universities in five cities, observed during nine selected months across 2019, 2021, 2022, and 2023. Campus-level daily regressions examine attendance and work schedules; visits to 21 hospitals provide a separate activity measure. A staggered information-disclosure analysis uses China's 2013-2015 monitoring rollout.

## Experiments

This is an observational study with an instrumental-variable design and supplementary quasi-experimental analyses.

### Main Estimates

Table 1 compares preferred specifications with author and city-by-year fixed effects and weather controls, each using 4,124,254 observations:

| Estimator | Outcome | PM2.5 coefficient | Reported 95% CI |
| --- | --- | ---: | --- |
| OLS | Log fractional publications | -0.0011 | [-0.0012, -0.0010] |
| OLS | Log JIF-weighted fractional publications | -0.0029 | [-0.0032, -0.0026] |
| 2SLS | Log fractional publications | -0.0023 | [-0.0028, -0.0017] |
| 2SLS | Log JIF-weighted fractional publications | -0.0067 | [-0.0084, -0.0050] |

All four coefficients have reported $p<0.01$. Coefficients are per additional $1\,\mu\mathrm{g}/\mathrm{m}^3$, so the 2SLS estimates correspond to approximate declines of 0.23% and 0.67%. The first-stage Kleibergen-Paap F-statistic is 117. The weighted-outcome interval above follows Table 1; the narrative instead gives [-0.0085, -0.0049].

At mean PM2.5 of 45.91, the authors report an output elasticity of about -0.11. Their estimate of 1,053 fewer publications nationwide for a 1% pollution increase, and the attribution of roughly 12% of publication growth to falling pollution, are back-of-the-envelope extrapolations from the panel estimate, not separately identified national effects.

### Heterogeneity and Robustness

Effects are more negative for highly productive and highly cited scholars and for junior scholars; seniority is proxied by first publication before 2018 rather than measured age. Negative estimates appear in all four broad disciplinary groups. The daily-pollution-bin analysis is not monotonically worsening: losses intensify through the 115-150 bin but attenuate above $150\,\mu\mathrm{g}/\mathrm{m}^3$. Protective behavior is an interpretation of this pattern, not directly demonstrated by the bin regression.

Alternative satellite pollution data, AQI, first-author attribution, exclusion of first observed publications, publication-count restrictions, and pre-pandemic samples retain negative estimates. Pre-pandemic unweighted output is significant only at the 10% level (Extended Data Table 3). Longer exposure windows also retain negative coefficients, but the three-calendar-year specification has a first-stage F-statistic of only 5, versus 117 at baseline (Extended Data Table 4). The text reports that including zero-publication years yields significant negative one- and two-year lag estimates but an insignificant third-year estimate; the referenced Supplementary Table 3 is not reproduced in the supplied Markdown.

The ORCID analysis identifies 231,563 scholars and 7,289 migrants, including 6,655 who move once. Excluding migrants and applying a selection correction preserve negative pollution estimates within this selected subsample. Moving is associated with increased output, with smaller gains for moves to more polluted cities; this does not isolate cleaner air from all other changes accompanying migration.

### Potential Mechanisms

- **Campus activity:** the narrative reports 0.069% fewer scholars working on campus per 1% increase in daily PM2.5, with stronger attendance effects for commuters. Work hours also decline. The work-hours coefficient for ages 50-59 is insignificant ($p=0.331$), unlike the younger groups. These are campus presence measures, not measurements of total work or home productivity.
- **Hospital visits:** Extended Data Table 8 reports increased visit counts at a two-day pollution lag and longer visits among those over 50 at a one-day lag. Same-day and one-day-lag visit-count coefficients are insignificant. Hospital presence does not establish a diagnosis or directly measure cognition.
- **Collaboration:** Table 3 uses 655,663 first-author observations, excluding single-author publications. Coauthor counts decline overall (coefficient -0.0056), chiefly through collaboration across institutions within the same city (-0.0102). International, inter-city, and within-institution estimates are individually insignificant.
- **Information:** the text reports increased publication output after pollution-information disclosure, with greater gains in medical fields. This is consistent with protective responses, but does not establish causal mediation of the baseline pollution effect.

## Limitations

- Publication gaps do not reveal actual project timelines, concurrent projects, or publication delays. Excluding zero-output years also changes the population and margin estimated. The authors' description of the baseline as a lower bound requires assumptions about selection and exposure error; it is not guaranteed by the design.
- Thermal inversion exclusion remains an identifying assumption. The strongest baseline first stage does not carry over to every robustness specification, particularly the longest calendar lag.
- Fractional authorship assumes equal contributions, JIF is a journal-level proxy for quality, and name-based disambiguation can merge or split scholars. ORCID users are more productive than the full sample, limiting generalization of migration corrections.
- The mobile sample covers selected universities and months. Faculty classification can include students or staff, and mechanisms are measured separately from publication production. The data do not quantify the mediated contribution of attendance, health, or collaboration.
- The supplied text contains reporting discrepancies: high productivity is defined using a field mean in the prose but a median in Table 2; mobile-provider coverage is described as both over 30% and over 60%; the reporting summary says 33 campuses versus 13 in Methods and says sex/gender was not collected despite the main-text gender analysis. The summary above follows Methods for sample construction and preserves the uncertainty.
- Full microdata are restricted. The paper reports Stata 17 code and a de-identified sample through OSF project `n6vrz`, with complete anonymized replication data available on request. Availability has not been independently checked. The supplied copy gives acceptance on 10 August 2026 but leaves the online publication date as a placeholder.

## Related Concepts

- [[concepts/fixed-effects-instrumental-variables|Fixed-Effects Instrumental Variables]]
- [[concepts/thermal-inversions-as-pollution-instruments|Thermal Inversions as Pollution Instruments]]
- [[concepts/spatial-causal-inference|Spatial Causal Inference]]: geographic confounding and location selection are shared concerns; this paper uses a panel-IV design rather than a spatial propensity model.

## Related Papers

The following works are cited in the supplied paper:

- Zivin and Neidell (2012), "The impact of pollution on worker productivity": the earlier physical-labor productivity literature motivating the high-skill extension.
- Fu, Viard, and Zhang (2021), "Air pollution and manufacturing firm productivity: nationwide estimates for China": a comparison for cumulative productivity effects.
- Cui, Huang, and Wang (2023), "The impact of air quality on innovation activities in China": city-level innovation evidence contrasted with individual scholar outcomes.
- Holub and Thies (2023), "Air quality, high-skilled worker productivity and adaptation: evidence from GitHub": a related high-skill application using daily software-development activity.
- Barwick et al. (2024), "From fog to smog: the value of pollution information": informs the auxiliary information-disclosure identification strategy.

[[index|Library home]]
