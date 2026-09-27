---
title: Redistricting Ensembles
type: concept
aliases:
  - Simulated Redistricting Plans
tags:
  - redistricting
  - gerrymandering
  - monte-carlo-methods
---

## Overview

Redistricting ensembles are collections of simulated districting plans used to compare an enacted map with alternatives subject to specified geographic and institutional constraints. They provide a distribution of possible electoral outcomes rather than a single ideal map. A nonpartisan map-generation procedure can still produce a partisan seat advantage because voters are unevenly distributed geographically.

## Key Ideas

- **Specify the reference distribution:** Population balance, contiguity, compactness, subdivision boundaries, minority representation, and state-specific criteria determine which alternatives the ensemble represents. Imprecise criteria require modeling choices.
- **Separate geography from map deviation:** Expected seats under simulated maps describe the conditional geographic baseline. An enacted-minus-simulated seat difference measures deviation from that baseline; its sign requires an explicit party convention.
- **Standardize electoral conditions:** Comparisons across cycles should hold the assumed national vote environment fixed while allowing local voting patterns to change. Otherwise national electoral swings can be mistaken for changes in geographic or redistricting bias.
- **Keep two sources of variation distinct:** Variation across maps describes alternative boundaries. A probabilistic election model adds national and district-level electoral variation within each map; expected seats sum district win probabilities.
- **Evaluate more than seat bias:** State-level advantages can cancel nationally while enacted maps still eliminate competitive districts. National partisan balance and electoral competition are separate evaluation targets.
- **Respect the counterfactual's scope:** An ensemble deviation is evidence relative to the specified constraints and election model. It does not by itself establish partisan intent, legal invalidity, or how voters and candidates would respond to a different map.

## Important Papers

- [[papers/gerrymandering-and-geographic-polarization-have-reduced-electoral-competition|Gerrymandering and geographic polarization have reduced electoral competition]]: compares 2010 and 2020 ensembles and separates changes in expected seats from changes in competition.
- McCartan and Imai (2023), "Sequential Monte Carlo for Sampling Balanced and Compact Redistricting Plans": algorithmic foundation cited by the ingested paper.
- McCartan et al. (2022), "Simulated Redistricting Plans for the Analysis and Evaluation of Redistricting in the United States": state-specific ensemble framework cited by the ingested paper.

## Related Concepts

- [[concepts/geographic-polarization|Geographic Polarization]]: changes the geographic baseline against which enacted maps are evaluated.
- [[concepts/partisan-alignment|Partisan Alignment]]: relates district partisan composition to individual voters, a different outcome from aggregate seat bias.
