---
title: Partisan Dislocation
type: concept
aliases:
  - Average Absolute Partisan Dislocation
  - AAPD
definition: "Partisan dislocation is the difference between a voter's assigned district's partisan composition and that of a district-sized geographic neighborhood around the voter."
tags:
  - redistricting
  - political-representation
  - spatial-analysis
---

## Overview

Partisan dislocation measures how district boundaries place voters in partisan environments different from those of their nearby neighbors. It uses geographic partisan composition as a baseline, allowing naturally concentrated partisan communities to be distinguished from communities joined or split by boundaries.

## Key Ideas

- **Local comparison:** Subtract the Democratic two-party share among a point's nearest neighbors from its assigned district's Democratic share. Neighborhood size corresponds to the average district size at the relevant legislative scale.
- **Interpret the sign:** Positive means a more Democratic district than neighborhood; negative means a more Republican district. Neither sign reveals the individual's party or automatically identifies a legal violation.
- **Aggregate magnitudes:** Average absolute partisan dislocation (AAPD) averages absolute local differences, preserving disruption that signed averages could cancel.
- **Separate objectives:** Low dislocation preserves local partisan environments but can retain geographic sources of statewide asymmetry. Minority-representation goals can justify some dislocation.
- **Respect measurement scale:** Precinct-level returns and uniformly distributed representative points approximate voter locations. Spatial error becomes more consequential for smaller districts.

## Important Papers

- [[papers/partisan-dislocation-a-precinct-level-measure-of-representation-and-gerrymandering|Partisan Dislocation: A Precinct-Level Measure of Representation and Gerrymandering]]: introduces the measure, illustrates local packing and cracking, and evaluates its relationship with ensemble benchmarks and partisan fairness.

## Related Concepts

- [[concepts/redistricting-ensembles|Redistricting Ensembles]]: contextualize dislocation against feasible alternative boundaries within the same state.
- [[concepts/partisan-symmetry|Partisan Symmetry]]: evaluates equal treatment in the seats–votes relationship, a different normative criterion.
- [[concepts/electoral-district-compactness|Electoral District Compactness]]: measures geometry; districts with different shapes can have identical dislocation in a spatially uniform electorate.
