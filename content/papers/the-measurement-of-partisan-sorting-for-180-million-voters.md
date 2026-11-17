---
title: The measurement of partisan sorting for 180 million voters
type: paper
authors:
  - Jacob R. Brown
  - Ryan D. Enos
year: 2021
doi: 10.1038/s41562-021-01066-z
tags:
  - political-geography
  - segregation
  - political-measurement
---

## TL;DR

Individual residential locations reveal substantial partisan segregation among US registered voters, including within census tracts. Distance-weighted exposure to the opposing party averages 0.30 for Democrats and 0.36 for Republicans. These are measures of potential residential exposure, not observed interactions or causal effects of segregation.

## Research Question

How isolated are US voters from opposing partisans, and does segregation persist within cities and neighbourhoods rather than merely between urban and rural areas?

## Motivation

Aggregate partisan shares assign a common context to residents who may have very different immediate neighbours. Such measures conceal within-area clustering and are sensitive to geographic boundaries. Individual spatial measures reveal differences hidden by these summaries.

## Contributions

- Constructs distance-weighted partisan exposure for 180,660,202 geocoded registered voters.
- Documents isolation across residential densities and sorting within small geographic units.
- Separates partisan segregation empirically from racial and ethnic segregation.

## Method

The June 2018 L2 voter file contains 180,735,645 voters; 75,443 could not be geocoded. Geohashing and PostGIS support identification of each remaining voter's 1,000 nearest neighbours by geodesic distance, yielding over 180 billion neighbour relationships.

For a focal party, exposure is the weighted average of neighbours' probabilities of belonging to the opposing party; isolation uses probabilities of belonging to the same party. A neighbour at distance $d$ metres receives weight $1/(d+1)$, normalized by the sum of neighbour weights. Genuine independents mean exposure and isolation need not sum to one.

Missing major-party affiliation is imputed sequentially from partisan primary participation, ideologically aligned minor-party registration, and Bayesian estimates using 2016 precinct presidential results and individual demographics. Aggregate summaries also use posterior party probabilities as weights.

Relative exposure compares one party's average exposure to the opposing party with the opposing party's average isolation within the same geographic unit. Negative values indicate different residential environments even within that unit.

## Experiments

This is an observational measurement study, with survey validation rather than randomized treatment.

| Analysis | Reported finding |
| --- | --- |
| National exposure | Democratic exposure to Republicans is 0.30; Republican exposure to Democrats is 0.36, compared with national party shares of 0.43 and 0.51 respectively. |
| Extreme isolation | Ten percent of Democrats have opposing-party exposure below 0.05. |
| Within-neighbourhood sorting | Within census tracts, the relative-exposure gap is approximately 11 percentage points. |
| Spatial weighting | Ignoring distance distorts exposure by at least 22% for half of voters and at least 40% for one quarter. |
| Imputation validation | A survey of 12,221 voters yields reported accuracy of 77% under the authors' Brier-score-based assessment. |

Democratic isolation is especially pronounced in dense urban environments; Republican exposure is lowest in very-low-density areas. Restricting neighbours to the same racial or ethnic group shows that partisan segregation is not simply racial segregation. The authors report supplementary sensitivity analyses for neighbour counts, distance weights, imputation, and exclusion of same-household neighbours.

## Limitations

The cross-sectional design cannot establish increasing segregation, residential choice mechanisms, or effects on political attitudes. Residential proximity is only potential exposure: workplaces, online interaction, nonregistered residents, built-environment barriers, and road networks are not measured. Stale voter records and imputed affiliations introduce uncertainty. The validation survey had a 1.3% response rate. Individual measurement avoids dependence on administrative boundaries when defining exposure, but neighbour counts and distance weights remain substantive choices.

## Related Concepts

- [[concepts/partisan-residential-segregation|Partisan Residential Segregation]]: the central substantive quantity.
- [[concepts/modifiable-areal-unit-problem|Modifiable Areal Unit Problem]]: motivates defining local exposure at individual locations.
- [[concepts/partisan-sorting|Partisan Sorting]]: ideological alignment is distinct from the residential sorting measured here.

## Related Papers

- Reardon and O’Sullivan (2004), “Measures of spatial segregation”: methodological foundation for spatially weighted exposure.
- Martin and Webster (2020), “Does residential sorting explain geographic polarization?”: cited work on residential sorting mechanisms.
- Mummolo and Nall (2017), “Why partisans do not sort: the constraints on political segregation”: contextualizes limits on explicitly partisan residential preferences.

Replication data and code: https://doi.org/10.7910/DVN/A40X5L. The supplied article identifies publication on 8 March 2021 and carries a corrected-publication notice for 2025 without describing the correction.
