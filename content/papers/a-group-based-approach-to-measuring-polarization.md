---
title: "A Group-Based Approach to Measuring Polarization"
type: paper
authors:
  - Isaac D. Mehlhaff
year: 2023
doi: "10.1017/S0003055423001041"
source_job_id: "f84b8d83-922a-4487-b23c-434d2f1d6d4e"
tags:
  - political-polarization
  - political-measurement
  - comparative-politics
  - legislative-behavior
---

## TL;DR

The cluster-polarization coefficient (CPC) measures the share of total variation attributable to differences between groups, capturing both between-group separation and within-group cohesion. Mehlhaff develops an adjusted version for settings with different numbers of observations, dimensions, and groups. Applications to congressional ideal points, elite ideology in six countries, and comparative party affect generally align more closely with external benchmarks than difference-in-means or variance. Performance is uneven: the two-dimensional Senate CPC correlates only 0.089 with party unity.

## Research Question

How can polarization measurement jointly capture intergroup heterogeneity and intragroup homogeneity while accommodating multiple dimensions and varying numbers of political groups?

## Motivation

Group-based theories of [[concepts/political-polarization|Political Polarization]] concern both distance from opponents and similarity among allies. Difference-in-means misses changes in within-group cohesion; total variance can decline when groups become more internally homogeneous. The paper reports that these measures appear in 57% and 14%, respectively, of 322 polarization articles surveyed across eight political science journals. Their prevalence motivates a measure more closely aligned with the group-based definition.

## Contributions

- Defines the [[concepts/cluster-polarization-coefficient|Cluster-Polarization Coefficient]] through a decomposition of total variation into between- and within-group components.
- Supplies a degrees-of-freedom adjustment intended to improve comparisons across samples, dimensions, and group counts.
- Demonstrates the measure in stylized distributions and three empirical applications covering ideological and affective polarization.
- Provides the R package CPC, supporting researcher-specified groups and clustering methods for assigning observations to groups.

## Method

For observations with positions on one or more dimensions and a specified group assignment, decompose total sum of squares as

$$
TSS=BSS+WSS,\qquad CPC=1-\frac{WSS}{TSS}=\frac{BSS}{TSS}.
$$

Here, WSS sums squared deviations from each observation's group mean across dimensions, and TSS sums squared deviations from the overall mean. With positive TSS, the unadjusted coefficient lies between 0 and 1. It rises with greater between-group separation or lower within-group dispersion, conditional on the other component. Its interpretation resembles the variance explained by group membership in an ANOVA or regression.

Using $N$ observations, $J$ dimensions, and $K$ groups, the paper's Equation 3 gives

$$
CPC_{adj}=1-(1-CPC)\frac{N-J}{N-JK}.
$$

This is the author's stated adjustment, intended to address upward bias in small samples. The unadjusted coefficient's range should not be automatically attributed to the adjusted expression: algebraically, the latter can be negative, and its denominator vanishes when $N=JK$. Comparability also requires substantively meaningful input dimensions and group assignments.

The supplied rendering of Equation 2 does not visibly include group-size weights in its between-group numerator. The summary therefore uses the decomposition in Equation 1 and the WSS/TSS formulation rather than reproducing that expanded numerator as an implementation recipe.

## Experiments

**Stylized distributions.** Four Gaussian-mixture examples vary group separation and cohesion independently. Difference-in-means cannot distinguish cases with identical group means but different cohesion. Variance can rank a more cohesive distribution as less polarized. CPC orders the examples consistently with the paper's two-feature definition.

**U.S. Congress.** The analysis uses DW-NOMINATE ideal points from 1975 onward, comparing the first dimension alone with both dimensions. Table 1 reports correlations with chamber party-unity scores:

| Chamber and dimensions | Difference-in-means | Variance | CPC |
| --- | ---: | ---: | ---: |
| House, first dimension | 0.959 | 0.952 | 0.960 |
| Senate, first dimension | 0.779 | 0.685 | 0.951 |
| House, both dimensions | 0.949 | -0.833 | 0.954 |
| Senate, both dimensions | -0.797 | -0.925 | 0.089 |

CPC has the highest correlation in each comparison, but its positive two-dimensional Senate correlation is weak. These results support relative performance against the selected alternatives, not uniformly strong benchmark agreement.

**Comparative elite ideology.** Ideal points from six Western countries are benchmarked against Dalton's party-system polarization measure applied to expert-coded party positions. CPC places Germany and Italy lowest, the United States, United Kingdom, and Netherlands higher, and Spain highest. It does not recover the large Spain-Netherlands gap in the expert benchmark. Difference-in-means and variance instead place the United States lowest and Italy second highest, diverging from that benchmark.

**Comparative party affect.** CSES module-four feeling thermometers provide multiple dimensions whose number varies with the party system. CPC correlates positively with all four theoretically related indicators: believing who holds power matters, believing one's vote matters, feeling very close to a party, and ideological extremity. The alternatives show less consistent signs, including negative associations with party closeness. Numerical coefficients for this figure are not transcribed in the supplied text.

The article also reports supplementary simulations with two to four groups and one or two dimensions, sensitivity exercises, and a human-annotation benchmark. The supplied Markdown does not contain those supplementary analyses.

## Limitations

- CPC measures polarization under a group-based definition. Aggregate party-system research concerned primarily with distances between party positions may reasonably use another measure, especially with few observations per case.
- The article reports sensitivity to outliers and large group-size differences; scaling input data ameliorates outlier sensitivity in the reported supplementary exercises. Adjustment does not establish immunity to these problems.
- Group assignments and the dimensions included determine the measured structure. Supporting multiple dimensions does not establish that their units, weights, or substantive meanings are comparable across contexts.
- Party unity, expert-coded polarization, and attitude correlates are validation benchmarks rather than direct observations of a uniquely defined true polarization level. The empirical comparisons are not causal tests.
- Footnote text and supplementary details are absent from the supplied Markdown. Precise clustering choices and some application details cannot be recovered from this source alone. The year records the source's 2023 publication/copyright information; no later issue metadata is inferred.

## Related Concepts

- [[concepts/cluster-polarization-coefficient|Cluster-Polarization Coefficient]]: the variance-decomposition measure introduced here.
- [[concepts/political-polarization|Political Polarization]]: the broader construct with multiple distinct operationalizations.
- [[concepts/party-system-polarization|Party-System Polarization]]: aggregate party dispersion is a related but distinct measurement target.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: the number and interpretation of axes retained in political-position data.
- [[concepts/group-preference-distribution-estimation|Group Preference Distribution Estimation]]: estimating group locations and dispersions supplies a related view of within- and between-group variation.

## Related Papers

- [[papers/polarization-and-ideology-partisan-sources-of-low-dimensionality-in-scaled-roll-call-analyses|Polarization and Ideology: Partisan Sources of Low Dimensionality in Scaled Roll Call Analyses]]: cited to motivate preserving higher-dimensional information in ideal-point analysis.
- Dalton (2008), "The Quantity and the Quality of Party Systems: Party System Polarization, Its Measurement, and Its Consequences": supplies the comparative elite benchmark.
- Esteban and Ray (1994), "On the Measurement of Polarization": a cited alternative discussed in the conclusion.
- Wagner (2021), "Affective Polarization in Multiparty Systems": cited background for comparative party-affect measurement.
- [[papers/party-system-polarization-and-the-effective-number-of-parties|Party system polarization and the effective number of parties]]: a library comparison studying party counts and weighted dispersion; it is not cited in the supplied paper.

Source: [Article DOI](https://doi.org/10.1017/S0003055423001041). The source identifies [replication data](https://doi.org/10.7910/DVN/ZTWRSQ) and the [CPC R package](https://cran.r-project.org/package=CPC).

[[index|Library home]]
