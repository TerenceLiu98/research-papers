---
title: "Generalizing toward Nonrespondents: Effect Estimates in Survey Experiments Are Broadly Similar for Eager and Reluctant Participants"
type: paper
authors:
  - Philip Moniz
  - Rodrigo Ramirez-Perez
  - Erin Hartman
  - Stephen Jessee
year: 2024
doi: 10.1017/pan.2024.8
tags:
  - survey-experiments
  - generalizability
  - survey-nonresponse
---

## TL;DR

Across 50 TESS survey experiments, treatment effects are broadly similar for respondents recruited through ordinary contacts and those recruited through intensive nonresponse follow-up. This supports generalization to a deeper pool of reachable respondents, while leaving effects among persistent nonrespondents unidentified.

## Research Question

Does willingness to participate moderate survey-experimental treatment effects, overall or within demographic groups commonly used for weighting?

## Motivation

Probability and convenience samples can both overrepresent eager respondents. Agreement between them therefore offers limited evidence about people who are harder to recruit. Nonresponse biases population treatment-effect estimates when participation propensity covaries with treatment effects; demographic imbalance alone does not establish such bias.

## Contributions

- Uses recorded recruitment histories to distinguish eager and reluctant participants across a broad collection of experiments.
- Compares standardized effects overall and within 20 demographic subgroups.
- Combines causal forests and response-propensity prediction to investigate whether observable effect heterogeneity aligns with recruitment reluctance.

## Method

The 50 unembargoed TESS studies were fielded on NORC’s AmeriSpeak panel between May 2017 and April 2020. Initial recruitment used ordinary contacts and incentives. A random subset of initial nonrespondents received intensive nonresponse follow-up (NRFU), including larger incentives and often door knocks. NRFU recruits constitute about 38% of the experimental samples. Recruitment status concerns joining the panel, not randomized assignment to the substantive experimental treatments.

For each study, the authors select a main treatment contrast and divide the outcome by its control-group standard deviation. They estimate effects separately by recruitment group, then fit Deming regressions accounting for uncertainty in both estimates. Subgroup comparisons use block bootstrapping for studies sharing respondents and multiplicity-adjusted intervals.

The bias decomposition in Section 3 expresses population-effect bias as the correlation between normalized inclusion probability and individual treatment effect multiplied by their standard deviations. Bias thus requires both heterogeneous effects and selection aligned with those effects. Causal forests include demographics and NRFU status; a separate random forest predicts recruitment reluctance from observed characteristics.

## Experiments

| Analysis | Reported result |
| --- | --- |
| Cross-study Deming regression | Intercept −0.02 (SE 0.01); slope 1.05 (SE 0.07) |
| 20 demographic subgroups | No slope significantly differs from 1; only the age-60+ intercept narrowly differs from 0 |
| Neither heterogeneity test significant | 38 of 50 studies |
| Omnibus test only | 8 of 50 |
| NRFU-specific test only | 2 of 50 |
| Both tests | 2 of 50 |
| Reluctance prediction on held-out data | 84.3% accuracy; AUROC 0.817 |

The heterogeneity counts follow Table 1: ten studies have significant omnibus tests and four have significant NRFU-specific tests at the 0.05 level. The supplied text contains inconsistent descriptions of these counts in the caption and Section 4.2. Estimated effect–reluctance propensity correlations are generally small; only three exceed 0.3. Restricting attention to 29 political science studies produces a similar broad pattern.

The pooled reluctance model uses 34,799 observations after removing demographic duplicates because cross-study respondent identifiers cannot identify repeat participants. Income, religious attendance, party identification, and age are important predictors. Predictive accuracy is evidence about observed recruitment differences, not a direct estimate of explained variance or proof against hidden selection.

## Limitations

Persistent nonrespondents remain unobserved, and reluctant recruits who subsequently answer experiments may differ from other reluctant panelists. Individual studies can lack power to detect small differences; aggregate agreement does not guarantee generalization for a specific experiment. Forest analyses detect heterogeneity captured by available predictors, rather than observing individual causal effects. Unmeasured moderators and imperfect duplicate removal remain concerns. The analysis addresses generalization across people, not the realism of treatments, outcome measurement, or all other dimensions of external validity.

## Related Concepts

- [[concepts/generalizability-of-survey-experiments|Generalizability of Survey Experiments]]: participation-related effect heterogeneity determines the relevance of respondent selection for population effects.
- [[concepts/randomized-response-instruments|Randomized Response Instruments]]: a distinct use of recruitment variation to identify outcome-dependent nonresponse; this paper compares experimental effects across recruitment groups.

## Related Papers

- [[papers/countering-non-ignorable-nonresponse-in-survey-models-with-randomized-response-instruments-and-doubly-robust-estimation|Countering Non-Ignorable Nonresponse in Survey Models with Randomized Response Instruments and Doubly Robust Estimation]]: estimates population outcomes under non-ignorable selection, a different target from comparing treatment effects among observed recruitment groups.
- Coppock, Leeper, and Mullinix (2018), “Generalizability of Heterogeneous Treatment Effect Estimates across Samples”: cited evidence comparing effects across samples; the present study extends the comparison toward harder-to-recruit participants.
- Miratrix et al. (2018), “Worth Weighting? How to Think about and Use Weights in Survey Experiments”: source for the selection–effect heterogeneity bias decomposition.

Replication data and code: [Harvard Dataverse](https://doi.org/10.7910/DVN/N15MSX).
