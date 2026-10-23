---
title: "Modifiable Areal Unit Problem"
type: concept
aliases:
  - MAUP
tags:
  - spatial-statistics
  - geographic-aggregation
  - political-methodology
---

## Overview

The modifiable areal unit problem (MAUP) is the sensitivity of descriptive and model-based inferences to how individual or point-level observations are grouped into geographic units. Alternative, defensible mappings of the same underlying observations can change unit values, covariation, coefficient estimates, signs, and statistical significance. Because these changes need not follow a predictable direction, selecting a geography is part of theory and measurement rather than a neutral preprocessing choice.

MAUP is related to [[concepts/change-of-spatial-support|Change of Spatial Support]], but the emphasis differs. Change of support covers the broader task of measuring or transferring quantities across spatial representations; MAUP concerns how the choice among modifiable aggregate representations changes inference.

## Key Ideas

- **Scale:** Results can change when the size or level of aggregation changes, such as moving from precincts to counties.
- **Zoning:** Results can change when boundaries move while the general scale remains similar.
- **Relational consequences:** The main concern is often altered covariance among variables, not merely changed means or variances.
- **Modeling dependence is insufficient:** Accounting for [[concepts/spatial-autocorrelation|Spatial Autocorrelation]] can address dependence conditional on a mapping, but it does not establish that the mapping itself is valid.
- **Validity first:** A strong design links its unit to the theory, level of treatment assignment, substantive concept, or causal mechanism and explains why alternatives are inappropriate.
- **Reliability second:** If several mappings remain theoretically plausible, repeating the analysis across that bounded set can reveal sensitivity. Consistency across one arbitrarily chosen alternative provides limited assurance when many alternatives exist.
- **Finer is not inherently better:** Units below the theoretically relevant scale may introduce variation, dependence, or location error rather than solve aggregation bias.

## Important Papers

- [[papers/crossing-the-boundaries-an-implementation-of-two-methods-for-projecting-data-across-boundary-changes|Crossing the Boundaries: An Implementation of Two Methods for Projecting Data across Boundary Changes]]: Treats boundary changes as an interpolation problem and tests when uniform within-unit allocation assumptions produce larger errors.
- [[papers/the-modifiable-areal-unit-problem-in-political-science|The Modifiable Areal Unit Problem in Political Science]]: Demonstrates MAUP through simulations and reanalyses, measures its prevalence in political science, and develops a validity-first response.
- Openshaw (1984), "Ecological Fallacies and the Analysis of Areal Census Data." Early foundational treatment of inference under modifiable census units.
- Fotheringham and Wong (1991), "The Modifiable Areal Unit Problem in Multivariate Statistical Analysis." Shows that multivariate results can vary substantially and unpredictably across aggregations.
- Amrhein (1995), "Searching for the Elusive Aggregation Effect." Clarifies how aggregation changes relationships among variables.
- Jelinski and Wu (1996), "The Modifiable Areal Unit Problem and Implications for Landscape Ecology." Connects MAUP to cross-scale reliability and ecological analysis.

## Related Concepts

- [[concepts/change-of-spatial-support|Change of Spatial Support]]
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]
- [[concepts/relative-nesting-and-relative-scale|Relative Nesting and Relative Scale]]
