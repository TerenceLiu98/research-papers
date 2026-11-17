---
title: Efficient self-organization of informal public transport networks
type: paper
authors:
  - Kush Mohan Mittal
  - Marc Timme
  - Malte Schröder
year: 2024
doi: 10.1038/s41467-024-49193-1
tags:
  - public-transport
  - self-organization
  - urban-mobility
---

## TL;DR

Across more than 7,000 bus routes in 36 cities in 22 countries, informal services exhibit smaller and more uniformly distributed detours than formal services, with comparable route interconnectivity. This is evidence about spatial structure, not a demonstration of superior reliability, safety, or door-to-door travel time.

## Research Question

Can decentralized informal bus services organize route networks as structurally efficiently as centrally planned public transport?

## Motivation

Informal minibuses provide essential mobility in the Global South, yet limited digital records have restricted comparative analysis. Treating informality as structural inefficiency risks discarding useful route organization when formalizing services.

## Contributions

- Compares formal and informal bus-route geometry across geographically dispersed cities.
- Introduces spatial detour profiles and two summaries that distinguish detour magnitude from its distribution along routes.
- Shows that smaller detours in informal systems coexist with comparable route interconnectivity.

## Method

OpenStreetMap GPS tracks represent individual routes, including distinct trajectories sharing a bus or line ID. Cities are categorized using operator tags and contributor information. Selection emphasizes medium-sized, bus-dependent cities with comparable route densities, excluding very large cities with extensive metro or rail systems. Kontur population estimates on 400 m H3 hexagons support population-weighted comparisons.

For a segment of length $\ell_x\approx L/3$ at normalized position $x$, the detour fraction is

$$
d_x=(\ell_x-s_x)/\ell_x,
$$

where $s_x$ is the shortest distance between its endpoints through the street network. Profiles are evaluated at 50 approximately equally spaced positions. The summaries are

$$
\xi=(d_0-2d_{0.5}+d_1)/2,\qquad D=d_0+d_{0.5}+d_1.
$$

Positive $\xi$ indicates larger detours at route ends; $D$ measures their combined magnitude. It is a sum of segment fractions, not the whole-route excess-distance percentage. The quantities obey $-D\leq\xi\leq D/2$. City summaries use medians over individual routes.

Interconnectivity counts the intermediate routes needed between routes A and B: zero means a direct switch is possible. The city statistic $C$ is the median over routes of their mean intermediate-route count to other routes. It does not measure waiting time.

## Experiments

Table 1 reports medians across city medians and Mann–Whitney U comparisons:

| Observable | Informal | Formal | p-value |
| --- | --- | --- | --- |
| Detour heterogeneity $\xi$ | 0.011 | 0.070 | 0.0007 |
| Total detour $D$ | 0.12 | 0.45 | 0.00005 |
| Intermediate routes $C$ | 0.670 | 0.675 | 0.48 |

Informal systems have lower detour summaries; the interconnectivity comparison does not detect a difference. In Cochabamba, 431 tracked routes with 130 IDs illustrate stable corridors despite local variation, and route density resembles population density. The paper reports robustness to segment-length choices and population weighting, and reports that route counts, lengths, and densities do not explain the main pattern. These checks are described in the supplied article; its supplementary analyses are not separately supplied here.

## Limitations

The comparison is observational and spatial. Competition and adaptation are proposed explanations, not causally identified mechanisms. Temporal usage, waiting times, service frequency, availability, and safety are not evaluated. Population density is only a proxy for demand. Selection of bus-dependent cities limits generalization to large multimodal systems. The lack of a significant difference in $C$ does not establish equivalence of passenger experiences. The discussion of profitability and subsidies provides institutional context rather than a measured financial-efficiency comparison.

## Related Concepts

- [[concepts/informal-public-transport|Informal Public Transport]]: decentralized shared services whose corridor structure is the empirical focus.
- [[concepts/guided-self-organization|Guided Self-Organization]]: a related design perspective; this study observes emergent organization rather than testing a guiding intervention.

## Related Papers

- Cervero and Golub (2007), “Informal transport: A global perspective”: cited background on informal service organization (reference 23).
- Kerzhner (2023), “How are informal transport networks formed? bridging planning and political economy of labour”: cited account of corridor formation (reference 25).
- [[papers/conflict-mobility-and-fragmentation-in-the-african-interurban-network|Conflict, mobility and fragmentation in the African interurban network]]: a library comparison using road connectivity and detours to assess disruption vulnerability, rather than everyday bus-route efficiency.
