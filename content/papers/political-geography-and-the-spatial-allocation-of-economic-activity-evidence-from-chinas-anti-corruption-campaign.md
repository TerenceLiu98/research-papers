---
title: "Political Geography and the Spatial Allocation of Economic Activity: Evidence from China's Anti-Corruption Campaign"
type: paper
authors:
  - Filipe Campante
  - Rui Du
  - Weizeng Sun
  - Jianghao Wang
  - Siqi Zheng
year: 2025
doi: "10.1016/j.jue.2025.103797"
source_job_id: ddfd60ac-21ff-46d9-bd45-1592538a7dcc
tags:
  - political-geography
  - anti-corruption
  - urban-economics
  - difference-in-differences
  - china
---

## TL;DR

China's 2012 Eight-Point Regulation produced a geographically concentrated demand shock in Beijing's restaurant sector. Relative to restaurants farther away, establishments within 1.5 km of government offices experienced a reported **5.5% decline in customer reviews** and **2.7% decline in expenditure per customer** in 2013-2014. By 2016, restaurants were also less concentrated near government offices, and the reduction in high-end establishments came from those nearby areas. The evidence links [[concepts/political-geography|Political Geography]] to the location and composition of urban economic activity, although it does not establish the policy's overall welfare effect.

## Research Question

Did China's anti-corruption campaign reduce restaurant demand near political power centers, and did this localized shock subsequently change the spatial and quality distribution of Beijing restaurants?

## Motivation

Proximity to government offices may create specialized demand through official receptions, political connections, and information advantages. These interactions are difficult to observe, making it hard to distinguish political demand from ordinary city-center agglomeration. The sudden December 2012 Eight-Point Regulation curtailed reimbursed banquets and other official extravagance without relocating government offices, providing a policy shock to the value of proximity to political power.

## Contributions

- Connects [[concepts/political-geography|Political Geography]] to within-city consumer demand and the allocation of urban amenities rather than only to firm value, public decisions, or city-level development.
- Uses restaurant-level distance from 120 central and municipal government offices to measure heterogeneous exposure to a nationwide anti-corruption intervention.
- Separates immediate changes in customer traffic and spending from medium-run changes in restaurant location and market composition.
- Uses sector, location, weekday, office-rank, and designated-hotel comparisons to test whether the estimated pattern reflects government-related demand rather than general commercial activity.

## Method

The main panel contains 30,974 restaurants in Beijing's six inner districts from 2010 through 2014. Dianping reviews proxy quarterly customer traffic, while the platform's reported expenditure per person measures customer spending. The authors geocode restaurants and 120 government bureaus, including 74 central and 46 local offices. Post-2014 data provide restaurant counts in 1 km by 1 km grid cells through 2016 but no longer include individual reviews or prices.

The first specification interacts the post-campaign period with distance to the nearest government office and then estimates effects in 200-meter rings. Based on the resulting spatial gradient, the main difference-in-differences design defines restaurants within 1.5 km of an office as treated and those farther away as controls. Restaurant fixed effects absorb time-invariant establishment characteristics, and cuisine-by-quarter fixed effects absorb category-specific shocks. Event-study estimates assess pre-policy trends.

The paper examines mechanisms and alternative explanations using restaurants in government-designated hotels, central versus local offices, weekday versus weekend reviews, pricing tiers, government-office density and scandal exposure, unrelated businesses, and distance from 17 business centers. Grid-level restaurant counts and price categories are used to study subsequent spatial and compositional reallocation.

## Experiments

### Demand Effects

The semiparametric estimates show statistically detectable post-policy declines in reviews and expenditure within 1.5 km of government offices, with no corresponding effect beyond that distance. In the binary difference-in-differences specification, nearby restaurants have a reported **5.5% relative decline in reviews** and **2.7% relative decline in expenditure per person**. The authors' back-of-the-envelope calculation applies these estimates to the affected share of Beijing restaurants and obtains an annual revenue loss of about **3.0 billion RMB** (roughly **488 million USD** at the stated 2013 exchange rate); this is an extrapolation, not a directly observed revenue total.

The event-study plots show no apparent differential pre-trend and a gap after implementation. Effects are stronger for government-designated hotels, proximity to central rather than local offices, weekdays, areas with more offices, and areas near offices subsequently associated with more political scandals. High-end establishments have larger point estimates, but differences across price tiers are not estimated precisely enough to be statistically distinguished.

### Placebos and Reallocation

Grocery stores, supermarkets, and laundromats do not exhibit the same proximity pattern. Defining proximity around business centers rather than government offices also produces small, statistically insignificant estimates, often with the opposite sign. Including both government-office and business-center distance leaves the former estimate similar to the baseline.

Restaurant locations become less concentrated around government offices by 2016. Counts decline within 3 km and rise relatively farther away. The number of restaurants charging more than 100 RMB per person also falls, entirely among establishments in the treatment area. The paper reports no differential post-policy changes in nearby land sales, land-use composition, or development intensity that would account for this reorganization.

## Limitations

- The design requires parallel untreated trends by proximity to government offices. Event-study patterns and placebo tests support this assumption but cannot rule out every spatially correlated change after 2012.
- Review counts are a proxy for visits, and reported expenditure is a proxy for spending. The analysis assumes that review behavior did not change differentially near government offices after the campaign.
- The medium-run data contain grid-cell counts rather than establishment-level reviews and prices. The distributional changes are consistent with reduced local demand, but the authors state that they cannot be attributed solely to the regulation.
- Price-tier heterogeneity is imprecisely estimated. The proposed competitive spillover from high-end restaurants to lower-tier establishments is an interpretation rather than a directly tested mechanism.
- The 3.0 billion RMB revenue effect combines estimated percentage changes with sector-wide revenue and treatment-share data; it should not be read as a measured accounting loss.
- The study covers restaurants in Beijing's six inner districts and does not establish how the mechanism generalizes to other cities, sectors, or institutional settings.
- The paper does not evaluate overall welfare. It cannot measure the campaign's full effects on corruption, government decision-making, consumers, or offsetting gains elsewhere.

## Related Concepts

- [[concepts/political-geography|Political Geography]]: explains how the location of political power can organize nearby economic activity and policy exposure.
- [[concepts/spatial-causal-inference|Spatial Causal Inference]]: provides a broader framework for geographic treatment assignment, confounding, and interpretation.
- [[concepts/spatial-difference-in-differences|Spatial Difference-in-Differences]]: a related but distinct approach that explicitly models effects transmitted across neighboring units; this paper instead uses distance to government offices to define exposure.

## Related Papers

- Campante and Do (2014), "Isolated Capital Cities, Accountability, and Corruption": cited evidence connecting the spatial location of political power to accountability and corruption.
- Campante, Do, and Guimaraes (2019), "Isolated Capital Cities and Misgovernance: Theory and Evidence": cited work on capital-city isolation and governance.
- Leonardi and Moretti (2023), "The Agglomeration of Urban Amenities: Evidence from Milan Restaurants": cited comparison on the agglomeration of restaurants under market demand and spillovers.
- Chen and Kung (2019), "Busting the 'Princelings': The Campaign Against Corruption in China's Primary Land Market": cited evidence on China's anti-corruption campaign and politically connected economic activity.
- [[papers/are-firms-gerrymandered|Are Firms Gerrymandered?]]: a complementary library study showing how political geography can allocate firms as resources; it is not cited by this paper.

Article: [10.1016/j.jue.2025.103797](https://doi.org/10.1016/j.jue.2025.103797). Replication package identified in the source: [10.17632/sn7vj72b6y.2](https://doi.org/10.17632/sn7vj72b6y.2).

[[index|Library home]]
