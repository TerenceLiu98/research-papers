---
title: "Growing Up in a Polarized Party System: Ideological Divergence and Partisan Sorting Across Generations"
type: paper
authors:
  - Thomas Jocker
  - Wouter van der Brug
  - Roderik Rekker
year: 2024
doi: "10.1007/s11109-024-09917-x"
tags:
  - political-polarization
  - partisan-sorting
  - age-period-cohort
  - generational-replacement
  - survey-research
---

[[index|Library home]]

## TL;DR

Using GSS and ANES surveys spanning 1972-2021, Jocker and colleagues find that increasing [[concepts/partisan-sorting|Partisan Sorting]] is primarily associated with period changes shared across generations. Newer generations are not consistently more sorted than older ones; Baby Boomers generally show the highest sorting, while Millennials are among the least ideologically dispersed. Ideological divergence increases more modestly and unevenly across issues. Under the study's age-period-cohort assumptions, generational replacement may dampen polarization, rather than explain its overall rise.

## Research Question

Do Americans become more polarized because newer generations grew up amid greater elite polarization, because people change as they age, or because historical developments affect generations together? Do the answers differ for population-wide ideological dispersion and alignment between party identification and issue positions?

## Motivation

Differences between younger and older respondents can combine lifecycle and cohort differences. Moreover, greater separation between Democrats and Republicans can reflect either broader ideological dispersion or stronger party-issue alignment. Distinguishing these processes matters for whether generational replacement is likely to amplify future polarization.

## Contributions

- Separates ideological divergence from partisan sorting within an [[concepts/age-period-cohort-analysis|Age-Period-Cohort Analysis]] of five issue dimensions.
- Examines established and emerging issues using two long-running US survey programs, with and without demographic controls.
- Finds no consistent progression toward greater sorting among successive generations, contrary to the proposed cohort hypothesis.
- Locates the strongest increases in sorting in period differences, while showing smaller and issue-dependent cohort and age differences.

## Method

**Data and outcomes.** The study uses cumulative General Social Survey (GSS) and American National Election Studies (ANES) data spanning 1972-2021. GSS supplies the main results except immigration, which uses ANES; overlapping outcomes are also examined with alternative ANES indices. Outcomes are social welfare, race and gender, culture and morality, ideological self-placement, and immigration. Multi-item indices average responses; all outcomes and party identification are scaled to 0-1 and oriented toward Republican identification.

**Identification.** Because age equals survey year minus birth year, unrestricted age, period, and cohort trends cannot be separately identified. The authors use survey-year indicators while constraining age and cohort through grouped categories. Cohorts are Greatest (1910-1927), Silent (1928-1945), Baby Boomer (1946-1964), Generation X (1965-1980), and Millennial (1981-1996); Gen Z and pre-1910 cohorts are excluded. Age groups represent adolescence, early adulthood, middle adulthood, and late adulthood. The text describes these approximately as 17-21, 22-29, 30-64, and 65+, although its earlier prose gives an overlapping 30-65 boundary. These restrictions make estimation possible but remain substantive assumptions.

**Divergence and sorting (Eqs. 1-5).** First, regress each orientation on age, period, and cohort indicators to obtain its expected mean, $\hat y_i$. Define individual deviation as $d_i=|y_i-\hat y_i|$, then regress these absolute residuals on the same predictors to estimate $\hat d_i$. Standardize orientations as

$$
z_i=\frac{y_i-\hat y_i}{\hat d_i}.
$$

Apply the same procedure to party identification. Regress standardized orientations on standardized party identification and its interactions with age, year, and cohort indicators. The party-identification slope and interactions summarize sorting after adjusting for modeled mean and dispersion differences. This uses predicted absolute deviation, not conventional standard-deviation scaling, and does not identify whether opinions change party identities or vice versa.

**Composition and uncertainty.** Models are repeated with indicators for White versus non-White ethnicity/race, no college versus at least one year of college, and active Protestantism (at least monthly attendance). Sorting models interact these controls with standardized party identification. The multistep estimation uses 1,000 bootstrap resamples per model; reported estimates are bootstrap means and standard errors are bootstrap standard deviations.

## Experiments

The evidence consists of observational survey analyses and a reported cross-dataset replication.

| Analysis | Reported finding |
| --- | --- |
| Period sorting, ideological self-placement | Increases from 0.25 in 1974 to 0.78 in 2021 |
| Period sorting, immigration | Increases from 0.00 in 2008 to 0.49 in 2020; corresponding controlled estimates are -0.15 and 0.29 |
| Cohort sorting | Baby Boomers have the highest sorting on most scales; Millennials are second least sorted on social welfare, with a reported significant comparison ($p<0.01$) |
| Cohort divergence | Differences are small; Millennials are among the least dispersed generations overall |
| ANES replication | Broadly similar patterns; Millennials rank highest on race and gender sorting, but not by a significant margin |

The sorting values above are estimates from the standardized regression procedure, not proportions of respondents.

**Period patterns (Fig. 2).** Sorting increases on all five outcomes, including cultural issues and immigration as they become politicized. Divergence rises on ideological self-placement and social welfare, although some trends stagnate. Earlier increases on cultural issues and immigration weaken in recent years, and race and gender show no clear divergence pattern. Demographic adjustment changes these broad conclusions little.

**Age patterns (Fig. 3).** Sorting on ideological self-placement and social welfare is higher after early adulthood, but these differences disappear with demographic controls. Emerging issues show no consistent aging pattern. Divergence increases slightly with age on some issues, offering little support for a general trajectory from radical youth toward ideological moderation.

**Interpretation.** The authors reject the hypothesis that newer generations are consistently more sorted and support the hypothesis of rising sorting over time. Their interpretation that generational replacement could moderate polarization depends on the estimated cohort differences persisting. More liberal average positions among younger cohorts are a separate finding from lower dispersion or sorting.

## Limitations

- The age-period-cohort decomposition depends on grouped age and generation restrictions; it is not an assumption-free separation of three independently varying quantities.
- Survey associations do not identify causal pathways through political learning, formative experiences, elite cues, or demographic change. Estimated age differences do not directly track the same people throughout life.
- Generational contrasts are often small or statistically indistinguishable. Findings exclude Gen Z and cannot establish a monotonic progression across every generation or issue.
- The abstract describes no increase in divergence, whereas the detailed results and conclusion report modest increases on some dimensions. The summary here follows the issue-specific results rather than treating divergence as universally unchanged.
- The supplied Markdown references supplementary item lists, regression tables, and robustness analyses without including them. Exact sample sizes and the full comparison underlying the reported Millennial significance statement cannot be recovered from this text alone.

## Related Concepts

- [[concepts/partisan-sorting|Partisan Sorting]]: party-issue alignment can increase without comparable growth in population dispersion.
- [[concepts/age-period-cohort-analysis|Age-Period-Cohort Analysis]]: distinguishes lifecycle, historical-period, and birth-cohort patterns under identifying restrictions.
- [[concepts/political-polarization|Political Polarization]]: the broader phenomenon includes dimensions beyond those measured here, such as affective hostility.

## Related Papers

- [[papers/charting-multidimensional-ideological-polarization-across-demographic-groups-in-the-usa|Charting multidimensional ideological polarization across demographic groups in the USA]]: related library reading, not cited by this paper; distinguishes partisan separation and within-party diversity in ANES embeddings. Its homogeneity-based sorting measure differs from this paper's standardized party-issue association.
- Stoker and Jennings (2008), "Of time and the development of partisan polarization": cited evidence motivating stronger sorting among younger generations, particularly on emerging issues.
- Phillips (2022), "Affective polarization: Over time, through the generations, and during the lifespan": cited for limited generational differences in the association between party identification and ideological self-placement.
- Lelkes (2016), "Mass polarization: Manifestations and measurements": cited conceptual foundation for distinguishing divergence and sorting.

## Source and Resources

Published online February 21, 2024 in *Political Behavior*. [Article DOI](https://doi.org/10.1007/s11109-024-09917-x).

Based on the supplied parsed Markdown for Cognitio job `7ddc8c16-b137-4959-9085-6244ab8dc770`. Supplementary materials were not supplied or independently examined.
