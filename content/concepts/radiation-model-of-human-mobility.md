---
title: Radiation Model of Human Mobility
type: concept
aliases:
  - Radiation Mobility Model
tags:
  - human-mobility
  - spatial-interaction
  - road-networks
---

## Overview

Radiation models estimate movement using origin and destination populations and intervening opportunities. They provide a parsimonious baseline when detailed flow observations are scarce. Defining opportunities geographically or along network paths changes the modeled interaction, so adaptations should state their geometry explicitly.

## Key Ideas

The network adaptation in the paper below uses

$$
R_{ij}\propto\frac{P_iP_j}{(P_i+s_{ij})(P_i+P_j+s_{ij})},
$$

where $s_{ij}$ counts population along the shortest road path excluding its endpoints. This path-based definition is specific to the application; it should not be silently generalized to every radiation model.

- **Intervening opportunities shape destination choice.** Nearby or intermediate opportunities can reduce expected interaction with a farther destination, beyond what endpoint size alone implies.
- **Flow normalization matters.** Proportional interaction scores require normalization or an origin-flow scale before they can be interpreted as movement quantities.
- **Route assignment is a second step.** Summing pair flows over chosen paths produces a road-use measure. Its interpretation depends on routing assumptions, path cutoffs, and network coverage.
- **Choose validation metrics deliberately.** Better ordering of high- and low-flow corridors can coexist with worse absolute prediction error. The cited application favors radiation on annual migration correlations while calibrated gravity has lower log RMSE.
- **Avoid equating movement types.** Validation against migration provides evidence about aggregate spatial interaction, not direct measurement of road traffic, freight, or individual itineraries.

## Important Papers

- Simini et al. (2012), "A Universal Model for Mobility and Migration Patterns": the foundational radiation-model paper cited by the application below.
- [[papers/conflict-mobility-and-fragmentation-in-the-african-interurban-network|Conflict, mobility and fragmentation in the African interurban network]]: routes a network adaptation through African roads and compares aggregated predictions with bilateral migration and calibrated gravity models.

## Related Concepts

- [[concepts/road-network-vulnerability|Road Network Vulnerability]]: uses projected flows to assess dependence on roads alongside failure exposure and alternative routes.
- [[concepts/logistics-constrained-conflict-diffusion|Logistics-Constrained Conflict Diffusion]]: also treats transport geometry as substantively important, but concerns the movement of conflict resources rather than a population-based mobility baseline.
