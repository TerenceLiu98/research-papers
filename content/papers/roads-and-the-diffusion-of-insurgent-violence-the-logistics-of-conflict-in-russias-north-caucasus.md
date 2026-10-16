---
title: "Roads and the diffusion of insurgent violence: The logistics of conflict in Russia's North Caucasus"
type: paper
authors:
  - Yuri M. Zhukov
year: null
doi: "10.1016/j.polgeo.2011.12.002"
tags:
  - armed-conflict
  - conflict-diffusion
  - road-networks
  - spatiotemporal-modeling
---

## TL;DR

Road connections help explain both the spread and the local contraction of insurgent violence in Russia's North Caucasus. In monthly municipality data for 2000-2008, proximity to another recent attack predicts more new violence but less persistence of existing violence. Zhukov interprets this as resource-constrained relocation between accessible targets. Road-distance models improve fit and slightly improve predictive discrimination over geodesic models, while producing substantially fewer secondary cases in a simulated outbreak.

## Research Question

How do logistical connections shape the onset, persistence, and relocation of insurgent violence, and how much does replacing geodesic proximity with road-network distance change inference and prediction?

## Motivation

Geographic proximity often stands in for a transmission mechanism in conflict research. Straight-line or geodesic distances can understate travel costs in mountainous terrain, while assuming independent locations omits resource movement altogether. Roads also have competing implications: they extend government reach while making targets and supplies more accessible to insurgents. [[concepts/logistics-constrained-conflict-diffusion|Logistics-Constrained Conflict Diffusion]] makes the physical transmission channel explicit.

## Contributions

- Uses an epidemic framework to distinguish new violence from continued violence, separating opportunities for transmission from conditions favoring persistence.
- Constructs municipality-level event and road-distance data to compare independent-location, geodesic-network, and road-network accounts of insurgent logistics.
- Finds opposite distance associations for onset and recurrence, consistent with relocation under competition for limited resources.
- Shows that distance definitions can materially change simulated contagion despite small differences in aggregate predictive discrimination.

## Method

The conceptual model divides locations into peaceful and violent states, with transmission moving locations into violence and recovery returning them to peace. High transmission with slow recovery implies expansion; high transmission with fast recovery implies relocation. Low transmission can instead produce persistent isolated hotspots or sporadic incidents, depending on recovery.

The empirical model is a first-order Markov transition model estimated by a logistic generalized additive model:

$$
\Pr(y_{it}=1)=\operatorname{logit}^{-1}\left(x_{it}^{\top}\theta_0+y_{i,t-1}x_{it}^{\top}\gamma+f(\mathrm{Long}_i,\mathrm{Lat}_i)\right).
$$

Here $\theta_0$ describes transitions from peace to violence, while $\theta_0+\gamma$ describes recurrence after violence. A thin-plate spatial spline captures persistent geographic variation in baseline risk. Covariates include distance to the nearest **other** municipality attacked in the preceding month, lagged government mop-up operations, population density, elevation, and road accessibility, defined as being within 5 km of a major road. Distance is measured along roads or geodesically; the no-network model omits this exposure term (Equation 3; Tables 1-2).

## Experiments

### Data and Evaluation

The panel covers 4,033 municipalities in seven North Caucasus republics from July 2000 through December 2008. The nominal panel contains 411,366 municipality-months; the main models use 406,727 observations. Memorial's Chronicle of Violence supplies over 28,102 reports of violence and unrest, automatically coded and geocoded through fuzzy place-name matching. The binary outcome records at least one insurgent attack in a municipality-month; the report count is not a count of insurgent attacks. USGS Global GIS provides roads and geographic covariates. The road data cover highways and primary and secondary roads, excluding within-municipality streets.

Table 2 compares AIC and ROC AUC. Out-of-sample AUC averages 100 random 90/10 splits; the text describes holding out monthly cross-sections. This is not a chronological future-period forecast.

| Model | AIC | In-sample AUC | Out-of-sample AUC (SD) |
| --- | ---: | ---: | ---: |
| No network | 14,965.62 | 0.9258 | 0.9193 (0.0141) |
| Geodesic network | 14,910.95 | 0.9265 | 0.9196 (0.0143) |
| Road network | 14,883.54 | 0.9267 | 0.9201 (0.0142) |

The road model ranks best on these diagnostics, but its mean held-out AUC advantage over the geodesic model is only 0.0005. The reported split variability does not establish a statistically significant paired difference.

### Findings and Simulations

- **New violence:** Road distance from the nearest recent attack has a negative coefficient, -0.0009 per km (SE 0.0002), in the onset equation. Road-accessible municipalities have more than twice the modeled risk of a new attack relative to inaccessible municipalities (reported 95% interval for the risk ratio: 1.74-2.32).
- **Recurring violence:** The distance coefficient reverses sign to 0.0066 (SE 0.0010). Predicted recurrence is 0.19 (95% CI 0.15-0.23) at 1 km from another recent conflict site and 0.86 (0.71-0.94) at 500 km, holding other covariates at medians. Road access and elevation are not statistically informative predictors of recurrence in the main model.
- **Logistical geometry:** Mean pairwise road distance is 334.17 km, compared with 235.69 km geodesically. The difference illustrates how terrain changes the implied opportunities for interaction (Figure 4).
- **Counterfactual outbreak:** With Grozny as the sole initial violent location and non-conflict covariates fixed at December 2008 values, 10,000 simulations produce 7.62 expected secondary cases under geodesic distance versus 4.45 under road distance. These are model-generated outcomes, not observed transmission counts (Figure 5).
- **Robustness:** Republic fixed effects preserve the main patterns and model ranking. An additional analysis instruments mop-up operations with federal election campaign cycles, motivated by temporary reassignment of security personnel; the reported substantive results remain similar (Tables 3-5).

## Limitations

- **Mechanism identification:** The opposite distance associations support the proposed relocation account, but the study does not directly track fighters or supplies moving between municipalities. Shared causes and strategic responses remain relevant to causal interpretation.
- **Counterinsurgency endogeneity:** The election-cycle analysis addresses one source of endogeneity. A causal interpretation still depends on the instrument's validity, including restrictions on other pathways from election timing to insurgent violence.
- **Measurement and scope:** Monthly binary outcomes omit within-month sequencing and attack intensity. Automated event reporting and geocoding can introduce measurement error. Road coverage excludes local streets and does not directly measure changing roadblocks or actual travel times. Evidence concerns one region's post-conventional-war period.
- **Prediction:** AUC measures discrimination rather than calibration or causal transmission, and random holdouts do not demonstrate performance in future periods or new regions. The larger outbreak-simulation contrast depends on the fitted models and the selected initial location.
- **Source metadata:** The supplied Markdown includes a 2011 copyright notice and the DOI above, but no explicit publication year; `year` is therefore null. Supplementary methods are referenced but not included in the supplied text.

## Related Concepts

- [[concepts/logistics-constrained-conflict-diffusion|Logistics-Constrained Conflict Diffusion]]: connects transport opportunities with onset, persistence, and resource competition.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: the meaning of spatial dependence depends on how geographic connections are represented.
- [[concepts/effective-distance-in-network-contagion|Effective Distance in Network Contagion]]: another mechanism-based geometry of spread; movement-probability distance differs from physical road length.
- [[concepts/spatiotemporal-history-smoothing|Spatiotemporal History Smoothing]]: a broader history representation than distance to the previous month's nearest attack.

## Related Papers

- Schutte and Weidmann (2011), "Diffusion patterns of violence in civil wars": cited framework for distinguishing spatial patterns of conflict diffusion.
- O'Loughlin and Witmer (2011), "The Localized geographies of violence in the North Caucasus of Russia, 1999-2007": cited regional evidence on the geography of violence.
- Lyall (2010), "Are coethnics more effective counterinsurgents? Evidence from the second Chechen war": a cited comparison whose findings concern coethnic operations and a different sample; Zhukov's mop-up measure does not distinguish forces by ethnicity.
- [[papers/capturing-the-spatio-temporal-diffusion-effects-of-armed-conflict-a-nonparametric-smoothing-approach|Capturing the spatio-temporal diffusion effects of armed conflict: A nonparametric smoothing approach]]: a library comparison modeling a broad distance-lag history in a Poisson GAM, rather than binary onset and recurrence with nearest-attack road distance. It is not a benchmark evaluated here.

[[index|Library home]]
