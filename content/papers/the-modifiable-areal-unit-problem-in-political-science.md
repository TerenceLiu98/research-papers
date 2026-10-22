---
title: "The Modifiable Areal Unit Problem in Political Science"
type: paper
authors:
  - Dong Wook Lee
  - Melissa Rogers
  - Hillel David Soifer
year: 2025
doi: "10.1017/pan.2025.2"
journal: "Political Analysis"
source_job_id: f6eb9550-8f47-4260-aa2c-ad80299f91f1
tags:
  - political-methodology
  - spatial-statistics
  - modifiable-areal-unit-problem
  - research-design
---

## TL;DR

Changing the size or boundaries of aggregate geographic units can alter correlations, coefficient signs, and statistical significance in unpredictable ways. Simulations, reanalyses, and a review of political science research show that this [[concepts/modifiable-areal-unit-problem|Modifiable Areal Unit Problem]] is widespread and is not resolved merely by modeling spatial dependence. The strongest response is to justify spatial units from theory and concepts; robustness across alternative plausible mappings is a useful but secondary response.

## Research Question

How does the choice of aggregate spatial units threaten inference in political science, how widespread is that threat, and what theoretical and empirical practices can address it?

## Motivation

Political scientists increasingly use geospatial data, but many analyses can operationalize context, treatment, outcomes, or moderators at several plausible geographic scales. The same underlying observations may therefore yield different relationships after aggregation. Treating the unit choice as a convenience or data constraint obscures a consequential research-design decision.

## Contributions

- Distinguishes the scale subproblem, in which unit size changes, from the zoning subproblem, in which boundaries change.
- Demonstrates through regular-grid and irregular-lattice simulations that alternative mappings can change regression estimates in substantively important and unpredictable ways.
- Shows through two reanalyses that published conclusions can change under plausible alternative spatial units.
- Documents the prevalence of potentially modifiable units in five years of *APSR* and *AJPS* articles.
- Reframes the primary response as a validity argument about why a spatial unit matches the theory, treatment assignment, concept, or causal mechanism, with cross-mapping reliability checks used when several units remain plausible.

## Method

### Simulations

The regular-lattice exercise draws 10,000 observations on a 100-by-100 grid. Three variables take binary values or are unobserved under uniform and non-uniform sampling. The authors aggregate cells into units ranging from 2-by-2 to 10-by-10 and shift their borders east or south, then compare correlations and fractional logistic regression estimates across scales and zonings.

The irregular-lattice exercises use California counties and congressional districts. They simulate Democratic presidential vote share as a function of median household income and the share working from home, then estimate ordinary, spatial-lag, and spatial-error models under alternative connectivity structures. This tests whether explicitly modeling [[concepts/spatial-autocorrelation|Spatial Autocorrelation]] removes mapping sensitivity.

### Reanalysis and Journal Review

The paper reanalyzes a Brexit study using NUTS-2 rather than NUTS-3 measures and a study of neighborhood effects using an alternative contextual unit. It also codes empirical articles published in *American Political Science Review* and *American Journal of Political Science* from 2016 through 2020 for their use of aggregate spatial units, plausible alternatives, and responses to MAUP concerns.

### Validity and Reliability Framework

Validity requires an argument that the selected geography represents the relevant context, level of treatment assignment, concept, or causal mechanism. When theory leaves several mappings plausible, reliability can be assessed by repeating the analysis across that bounded set. A single robustness check is less informative when the plausible set is large or poorly specified.

## Experiments

- In the grid simulations, changing scale and zoning alters bivariate relationships and multivariate estimates without a systematic direction. Under non-uniform sampling, estimates can change sign and significance; aggregation alone does not explain the pattern.
- County- and congressional-district analyses differ in many simulations even after spatial-lag or spatial-error adjustment, indicating that MAUP is not simply an artifact of unmodeled spatial dependence.
- In the Brexit reanalysis, substituting NUTS-2 for NUTS-3 changes some interpretations: import share is not significant in some models, while immigrant arrivals become negatively and significantly associated with Brexit support.
- The neighborhood-effects reanalysis shows that changing the spatial unit of a moderator can also change results, so exposure is not limited to spatial outcome or treatment variables.
- Of 221 empirical *APSR* articles reviewed, 124 (56%) use aggregate spatial units and 53 of those 124 (43%) have a plausible alternative unit. In *AJPS*, 114 of 251 articles (45%) use aggregate spatial units and 59 of those 114 (52%) have a plausible alternative.
- Pairwise reliability in the simulated data is often limited. In one reported non-uniform zoning comparison for IV2, nearly one-third of mapping pairs disagree in statistical significance; even the best reported setting for the other simulated predictor has disagreement above 10%.

## Limitations

- The simulations illustrate sensitivity but do not provide a general distribution for MAUP effects or predict the direction of change under a new mapping.
- The article develops practical responses rather than a universal statistical correction; several proposed methods require disaggregated or ancillary data that researchers may not possess.
- Reliability checks cannot establish which mapping is substantively valid, and testing one alternative is weak evidence when many plausible mappings exist.
- Smaller units are not automatically better: they may introduce artificial variation or spatial dependence and can amplify location measurement error.
- The supplied Markdown reports several analyses through descriptions of supplementary material rather than including all supplementary tables and figures.

## Related Concepts

- [[concepts/modifiable-areal-unit-problem|Modifiable Areal Unit Problem]]
- [[concepts/change-of-spatial-support|Change of Spatial Support]]
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]

## Related Papers

- Openshaw (1984), "Ecological Fallacies and the Analysis of Areal Census Data." Foundational account of how areal aggregation affects inference.
- Fotheringham and Wong (1991), "The Modifiable Areal Unit Problem in Multivariate Statistical Analysis." Establishes unpredictable MAUP effects in multivariate models.
- Amrhein (1995), "Searching for the Elusive Aggregation Effect." Develops the argument that aggregation most consequentially changes relationships among variables.
- [[papers/integrating-data-across-misaligned-spatial-units|Integrating Data Across Misaligned Spatial Units]]: Cited work on matching data across incompatible geographic units and diagnosing transformation difficulty.

[[index|Library home]]
