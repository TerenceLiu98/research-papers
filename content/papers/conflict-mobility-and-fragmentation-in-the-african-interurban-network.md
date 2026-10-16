---
title: "Conflict, mobility and fragmentation in the African interurban network"
type: paper
authors:
  - Andrew Renninger
  - Valentina Marin
  - Carmen Cabrera
  - Rafael Prieto-Curiel
year: null
tags:
  - armed-conflict
  - road-networks
  - human-mobility
  - network-vulnerability
---

## TL;DR

Conflict threatens regional connectivity when exposed roads carry movement and have few substitutes. Across Africa, corridor conflict is negatively associated with bilateral migration in 2019-2022. In separate road-failure simulations, 18.6% of cascades isolate more than one million people, and lowering the conflict-removal threshold from 20 to 10 reduces the giant connected component from 85.1% to 39.2% of nodes. These are modeled vulnerability outcomes, not observed road closures or causal migration effects.

## Research Question

Which African interurban corridors combine conflict exposure, movement dependence, and limited redundancy, and how can disruptions to those roads affect connectivity beyond the immediate site of violence?

## Motivation

Areal conflict counts cannot show which distant journeys depend on an exposed road. The busiest roads and the most violent roads need not coincide, while a lightly used connector may have no substitute. Linking conflict histories to projected movement and network topology makes these different sources of vulnerability visible.

## Contributions

- Combines ACLED events, an OpenStreetMap road network, and Africapolis populations to map conflict exposure and expected corridor use separately.
- Uses aggregate bilateral migration as an empirical check on modeled corridor flows and their relationship with conflict.
- Evaluates localized failure scenarios, cumulative attack percolation, and detour distances to distinguish exposure from structural consequences.

## Method

The connected, simplified network contains 7,361 nodes (2,162 cities and 5,199 road junctions), 9,159 roads, and 274 border crossings, covering 460.7 million urban residents. Construction joins disconnected components based on road proximity and simplifies compatible degree-two nodes. Travel-time estimates include road type, a 120-minute border penalty, and population-dependent urban costs.

**Conflict memory.** For node $i$, the exposure index is

$$
\mu_i(t)=\sum_{s:t_s\leq t}I_i(s)(1+f_s)\exp[-\phi(t-t_s)],
$$

where $f_s$ is reported fatalities. Migration analysis assigns events to the nearest road-network node within 10 km. Road-level exposure $\mu_e$ is a separate segment-risk surface; city peaks should not be substituted for edge intensities. This uses a Hawkes-style memory kernel without estimating a full generative Hawkes process. Predictive calibration selects $\phi=0.055$ (roughly 13-day half-life) for cascades and percolation; migration uses $\phi=0.0005$ (roughly 1,386 days).

**Movement and migration.** The network adaptation of the [[concepts/radiation-model-of-human-mobility|Radiation Model of Human Mobility]] specifies

$$
R_{ij}\propto\frac{P_iP_j}{(P_i+s_{ij})(P_i+P_j+s_{ij})},
$$

with $s_{ij}$ defined as population along the shortest road path, excluding endpoints, and paths capped at 3,500 km. Summing normalized pair flows over their paths gives projected road movement $\nu_e$. Country-pair corridor exposure averages node intensity along each path and then averages paths using modeled city flows. The regression relates log observed migration shares to log predicted shares and $\log_{10}(C+0.01)$, clustering standard errors by directed country pair. Observations are annual aggregates of privacy-protected, platform-adjusted Facebook migration estimates.

**Failure scenarios.** In 10,000 simulations, a seed road is selected in proportion to $\mu_e$. Each other road $f$ fails with probability $1-\exp[-\mu_f/d(e,f)^{1.1}]$, using Euclidean midpoint distance in kilometers floored at 1 km. Failures are sampled relative to the seed, and the network resets after each simulation; the specified procedure is not an iterative secondary-triggering process. The main kernel has no hard radius cap. Attack percolation separately removes roads with $\mu_e>\tau$, with 100 Monte Carlo runs per threshold adding Gaussian risk noise of standard deviation 5. Outcomes include largest-component size, degree-zero city population, components, and projected flow using removed roads. These exercises operationalize [[concepts/road-network-vulnerability|Road Network Vulnerability]].

## Experiments

### Migration and Exposure

| Reported comparison | Result | Source |
| --- | --- | --- |
| Road conflict versus projected movement | Spearman correlation 0.066 across 5,780 analyzed roads | Table S2 |
| Pooled corridor-conflict coefficient | -0.111, SE 0.030; 4,071 observations; $R^2=0.283$ | Table S3 |
| Annual conflict coefficients, 2019-2022 | -0.117, -0.109, -0.107, -0.099 | Table S3 |
| Across-region versus same-region routes | -0.095 (SE 0.041) versus 0.021 (SE 0.039) | Table S3 |
| Annual migration correlation | Radiation 0.51-0.54; gravity 0.47-0.50 | Figure S4 |
| Annual log RMSE | Radiation 1.30-1.32; gravity 1.12-1.19 | Figure S4 |

The authors interpret the main specification as approximately 7% lower migration for doubled corridor conflict and 22% lower migration for a tenfold increase. Radiation better orders migration corridors, while gravity better matches absolute scale. Separating endpoint and interior conflict leaves negative interior-path coefficients under both baselines, but adding prior-year migration attenuates conflict terms. Same-region routes are not significantly negative; Southern-origin routes have a positive coefficient in a small sample. These results support a suggestive corridor association rather than a separately identified deterrence mechanism.

### Network Disruption

The median cascade isolates 244,000 people. Across all simulations, 80.9% isolate at least one city, 18.6% isolate over one million people, 2.7% over five million, and 0.4% over ten million. The maximum isolates 13.3 million after 68 road removals. West Africa contributes the most nonzero cascades; East Africa has the highest mean impact among nonzero events, while Southern Africa has a wide upper tail (Figure 3; Table S4).

Percolation removes 1,163 roads at threshold 20 and 2,037 at threshold 10. Those 874 additional removals, 9.5% of the original roads, reduce mean largest-component share from 85.1% to 39.2%; this share counts nodes, not residents (Table S5). Among roads with finite substitutes, the median added route length is 142 km and the mean 323 km. Another 2,339 roads have no substitute, including 1,092 in North Africa (Figure S9 and main text).

Hard-radius sensitivity increases median damage with radius, while the upper tail of disrupted flow stabilizes around 100 km. Forward Knox tests find 9.2% excess event pairs within 100 km and 13 days relative to country-year date shuffling ($p=0.01$, 99 permutations). A separate check using 2024 West African GDELT reports finds excess nearby disruption mentions following intensity peaks. These diagnostics support spatial clustering assumptions, but do not validate the simulated road-failure probabilities directly (Figures S6 and S10).

## Limitations

- Migration data observe aggregate country-pair movement, not actual routes, canceled journeys, or road traffic. Origin and destination conditions and persistent corridor preferences are not fully separated from exposure.
- ACLED coverage depends on reporting. GDELT mentions are also noisy and source-clustered; neither is a census of physical road failures.
- Shortest-path allocation and the simplified major-road network omit local road quality, seasonal conditions, checkpoints, informal routes, and adaptive behavior. Network construction and redundancy assumptions affect fragmentation.
- Cascades and thresholds are conditional scenarios. The manuscript uses isolation language for several outputs; degree-zero cities, cities outside the largest component, and fragmented components are distinct quantities and should not be pooled.
- The supplied manuscript gives no explicit publication year, DOI, or arXiv identifier. Bibliographic dates and access dates do not establish its publication year.

## Related Concepts

- [[concepts/road-network-vulnerability|Road Network Vulnerability]]: consequences depend on exposure, route use, and substitutes.
- [[concepts/radiation-model-of-human-mobility|Radiation Model of Human Mobility]]: generates the latent flows assigned to roads.
- [[concepts/logistics-constrained-conflict-diffusion|Logistics-Constrained Conflict Diffusion]]: a complementary account of roads enabling conflict movement; here the main target is conflict disrupting connectivity.
- [[concepts/spatiotemporal-history-smoothing|Spatiotemporal History Smoothing]]: a related way to summarize conflict histories, using a fitted distance-lag surface rather than the specified exposure kernel.

## Related Papers

- Simini et al. (2012), "A Universal Model for Mobility and Migration Patterns": the cited radiation-model foundation (reference 74).
- Prieto-Curiel et al. (2022), "Constructing a simplified interurban road network based on crowdsourced geodata": the cited network-construction method (reference 18).
- Chi et al. (2025), "Measuring global migration flows using online data": the cited aggregate migration source (reference 84).
- [[papers/roads-and-the-diffusion-of-insurgent-violence-the-logistics-of-conflict-in-russias-north-caucasus|Roads and the diffusion of insurgent violence: The logistics of conflict in Russia's North Caucasus]]: a library comparison on road connectivity and conflict onset/persistence, not a benchmark in this manuscript.
- [[papers/capturing-the-spatio-temporal-diffusion-effects-of-armed-conflict-a-nonparametric-smoothing-approach|Capturing the spatio-temporal diffusion effects of armed conflict: A nonparametric smoothing approach]]: a library comparison estimating African conflict dependence with regularized historical exposure, rather than simulating transport fragmentation.

[[index|Library home]]
