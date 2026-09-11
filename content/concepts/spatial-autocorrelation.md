---
title: Spatial Autocorrelation
type: concept
aliases:
  - Geographic Autocorrelation
tags:
  - spatial-statistics
  - spatial-autocorrelation
  - comparative-politics
---

## Overview

Spatial autocorrelation describes whether values observed at geographically related locations resemble or contrast with one another. Its measurement depends on a spatial weights matrix defining which locations are neighbors and how strongly each neighbor contributes. Geographic association alone does not establish a causal spillover.

## Key Ideas

- A row-standardized weights matrix makes the spatial lag $Wy$ a weighted average of neighboring values. Contiguity, nearest-neighbor, and distance rules encode different geographic relationships, making sensitivity to the weights part of the substantive analysis.
- Global Moran diagnostics summarize association between a variable and its spatial lag. Positive association can coexist with few significant local clusters; a global pattern does not imply that every location belongs to a hotspot or coldspot.
- Local Moran analysis examines individual locations and their neighborhoods. High-high and low-low clusters indicate local similarity. Significance depends on the testing procedure, and reporting many local tests calls for attention to multiplicity.
- Residual diagnostics assess whether geographic structure remains after modeling observed predictors. A nonsignificant residual test does not establish a particular causal mechanism or prove that all dependence has been eliminated.
- A spatial autoregressive model $y=\rho Wy+X\beta+\epsilon$ represents simultaneous dependence among locations. A positive fitted $\rho$ supports modeled spatial association; interpreting it as causal diffusion requires additional identifying assumptions.

## Important Papers

- [[papers/ideological-and-geographical-patterns-in-european-political-system-an-archetypoid-and-spatial-analysis|Ideological and geographical patterns in European political system: An Archetypoid and Spatial Analysis]]: applies Moran diagnostics and a spatial autoregressive model to European parliamentary orientations, finding robust spatial clustering of a social conservative authoritarian policy component but weaker evidence for left-wing intensity.

## Related Concepts

- [[concepts/archetypoid-analysis|Archetypoid Analysis]]: supplies the party representations aggregated into national outcomes in the application above.
- [[concepts/party-system-polarization|Party-System Polarization]]: within-system ideological dispersion differs from geographic similarity between systems.
