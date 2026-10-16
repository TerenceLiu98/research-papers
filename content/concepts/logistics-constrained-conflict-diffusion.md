---
title: Logistics-Constrained Conflict Diffusion
type: concept
tags:
  - conflict-diffusion
  - road-networks
  - spatiotemporal-modeling
---

## Overview

Logistics-constrained conflict diffusion explains the movement and persistence of violence through the transport of personnel and material over physical connections. It requires specifying what moves, which routes permit movement, and how limited resources are allocated between locations. Geographic closeness alone does not establish such a transmission mechanism.

## Key Ideas

- **Represent feasible connections.** Road-path distance can approximate logistical access better than geodesic distance when terrain forces circuitous travel. Its relevance depends on the mode of movement, road coverage, and actual accessibility.
- **Separate onset and persistence.** A peaceful location becoming violent and a violent location remaining violent need not respond to proximity in the same way. Transition models allow these relationships to differ.
- **Connectivity can facilitate relocation.** Nearby fronts may compete for the same personnel and supplies. Easier movement can then increase new attacks while reducing persistence elsewhere, rather than producing sustained expansion everywhere.
- **Interpret joint transition patterns.** High transmission with slow recovery suggests expansion; high transmission with fast recovery suggests relocation. Low transmission with slow recovery suggests isolated hotspots, while low transmission with fast recovery suggests sporadic violence.
- **Distinguish geometry from identification.** A better network representation can improve prediction without demonstrating that particular attacks caused later attacks. Evidence about actual resource flows or an identification strategy is needed to establish the proposed mechanism.
- **Keep simulations conditional.** Secondary-case counts from a fitted outbreak simulation depend on the initial location, covariates, distance definition, and transition model. They are not directly observed transmission chains.

## Important Papers

- [[papers/roads-and-the-diffusion-of-insurgent-violence-the-logistics-of-conflict-in-russias-north-caucasus|Roads and the diffusion of insurgent violence: The logistics of conflict in Russia's North Caucasus]]: compares road, geodesic, and independent-location models. Shorter distance to recent violence predicts more onset but less recurrence; a resource-competition mechanism is proposed to explain this pattern.

## Related Concepts

- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: descriptive dependence depends on the definition of neighbors and does not itself establish diffusion.
- [[concepts/effective-distance-in-network-contagion|Effective Distance in Network Contagion]]: uses movement probabilities to construct a different network geometry; it should not be equated with road length.
- [[concepts/spatiotemporal-history-smoothing|Spatiotemporal History Smoothing]]: represents many distances and lags jointly, offering a complementary approach to measuring historical exposure.
