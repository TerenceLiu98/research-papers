---
title: "Measuring the Rural Continuum in Political Science"
type: paper
authors:
  - Zoe Nemerever
  - Melissa Rogers
year: 2021
doi: "10.1017/pan.2020.47"
tags:
  - political-geography
  - rurality
  - measurement
---

## TL;DR

Rurality requires two explicit measurement choices: a theoretically appropriate geographic unit and a classification matching the substantive concept. Nemerever and Rogers show that these choices can change descriptive comparisons and regression conclusions, introduce rural classifications for state legislative districts, and demonstrate that rural self-identification cannot be inferred reliably from residence.

## Research Question

How should political scientists operationalize rural location and rural identity, and how sensitive are empirical conclusions to the geographic units and classification rules used?

## Motivation

Counties contain urban, suburban, and rural populations; a metropolitan designation can conceal substantial rural territory. Population density, commuting connections, economic structure, and identity capture different dimensions. Treating these as interchangeable threatens construct validity even when rurality enters only as a control variable.

## Contributions

- Separates geographic aggregation from substantive classification and connects both decisions to theory.
- Reviews county, ZCTA, tract, block, and precinct units alongside available rural classifiers.
- Introduces state legislative district RUCA assignments for boundaries in 2007, 2010, 2012, 2014, and 2016.
- Uses replications and survey comparisons to demonstrate measurement sensitivity and the distinction between rural residence and self-identification.

## Method

The framework addresses the scale and zoning dimensions of the [[concepts/modifiable-areal-unit-problem|Modifiable Areal Unit Problem]]. Select the unit implied by the question; where several units remain plausible, examine robustness across scales and boundaries. Smaller units can reduce heterogeneity without eliminating MAUP.

For [[concepts/rurality-measurement|Rurality Measurement]], the paper distinguishes tract-level Rural–Urban Commuting Area (RUCA) codes and their ZCTA approximations from county-level Rural–Urban Continuum Codes (RUCC) and Urban Influence Codes. RUCA combines settlement and commuting information; county typologies can instead target economic structure or persistent poverty. These are descriptions of the schemes used in the article, not current availability guidance.

The district dataset uses Missouri Census Data Center Geocorr relationships to map tract RUCA categories to legislative districts. Three assignments are supplied: a random category drawn according to district population shares, a population-weighted average, and the plurality category. Random assignment can select a minority category; averages impose numerical meaning on ordinal categories; plurality assignment suppresses within-district diversity.

## Experiments

- **Descriptive comparisons:** Using CCES geography from 2006–2018, the reported rural household-income shortfall is $4,168 under county RUCC classification versus $6,938 under ZCTA RUCA classification. Unit and classifier change together, so this is a comparison of measurement strategies.
- **Flavin and Franko (2020):** Replaces the original rural binary with RUCA ≥ 7 and a 1–10 RUCA measure. The positive rural association with opinion–vote congruence loses statistical significance. The Rich Insulation Index also has confidence intervals including zero under the alternatives, although its intervals overlap those from the original model. A change in significance does not establish a significant difference between estimates.
- **Other replications:** District RUCA substitutions retain Broockman's substantive experimental conclusion while changing controls and sample sizes. Hersh and Nall's results remain similar across indicators; Urban and Niebler's remain broadly consistent, with smaller main-effect estimates and somewhat larger standard errors.
- **Residence and identification:** In Mummolo and Nall's survey, only 15% of respondents describing their neighborhood as rural live in RUCA category 10; including small towns raises this to 28%, and including the paper's suburban grouping raises it to 52%. Conversely, most residents of RUCA-defined rural areas identify as rural. The mismatch is asymmetric (Section 7, Figure 3).

## Limitations

No classifier is universally correct. Alternative regression specifications demonstrate sensitivity rather than identify the true rural effect. ZCTA boundaries can still misrepresent experienced neighborhoods, and classification thresholds change both population composition and sample size. Rural neighborhood self-description is distinct from the richer concept of rural consciousness, including perceived neglect, unfair resource allocation, and cultural difference. The tools and dataset concern U.S. geography and require adaptation elsewhere.

The parsed Table 3 contains formatting artifacts, and its displayed estimates do not straightforwardly substantiate every significance statement in the surrounding prose. Exact significance improvements are therefore not reproduced here.

## Related Concepts

- [[concepts/rurality-measurement|Rurality Measurement]]: distinguishes location, connectivity, economic structure, and identification.
- [[concepts/modifiable-areal-unit-problem|Modifiable Areal Unit Problem]]: explains why geographic aggregation is a substantive measurement choice.
- [[concepts/geographic-polarization|Geographic Polarization]]: urban–rural political comparisons depend on how places are classified.

## Related Papers

- Flavin and Franko (2020), “Economic Segregation and Unequal Policy Responsiveness”: principal replication illustrating sensitivity to a rural control.
- Mummolo and Nall (2017), “Why Partisans Do Not Sort: The Constraints on Political Segregation”: supplies the survey used to compare residence and self-identification.
- Broockman (2013), “Black Politicians Are More Intrinsically Motivated to Advance Blacks’ Interests: A Field Experiment Manipulating Political Incentives”: application of the new district dataset.

Published in *Political Analysis* 29:267–286. [Article DOI](https://doi.org/10.1017/pan.2020.47). [Replication data](https://doi.org/10.7910/DVN/EACMTV).
