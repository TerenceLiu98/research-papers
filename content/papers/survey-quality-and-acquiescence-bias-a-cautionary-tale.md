---
title: "Survey Quality and Acquiescence Bias: A Cautionary Tale"
type: paper
authors:
  - Andrés Cruz
  - Adam Bouyamourn
  - Joseph T. Ornstein
year: 2026
tags:
  - survey-methodology
  - replication
---

## TL;DR

Correcting an education coding error reverses the original education gradient in acquiescence bias. Two preregistered replications reproduce a positive gradient on Lucid/Cint but find no education association on Bovitz–Forthright, supporting a response-quality explanation. Attention checks do not fully remove the Lucid/Cint pattern.

## Research Question

Why do respondents reporting postgraduate degrees exhibit unusually large wording effects, and does this pattern survive replication across survey panels?

## Motivation

Fourteen of 2,055 respondents in the original 2020 survey had education coded −3105 (“None of the above”). These values exerted disproportionate influence when education was continuous. Removing them reversed the association, prompting a corrigendum and further investigation.

## Contributions

- Preserves the original finding of substantial wording effects while correcting its education interpretation.
- Compares two preregistered panel replications.
- Tests political knowledge, recent claims, uncertainty options, and attention-check performance as explanations or diagnostics.

## Method

Positive- and negative-keyed versions of claims are randomized and responses recoded toward the same substantive belief. Linear-probability models estimate the positive-key gap and education interactions, clustering standard errors by respondent. This wording gap differs from the half-gap bias parameter in the original paper’s symmetric correction model. The reanalysis drops invalid education values and examines categorical education; Table 1 also reports numeric education interactions.

Replications add eight 2024-election questions and a four-item political knowledge scale, randomize whether “Not sure” is available, and retain mock-vignette attention-check failures for analysis.

## Experiments

August 2025 replications recruited 2,193 Lucid/Cint and 3,036 Bovitz–Forthright respondents.

| Table 1 estimate | Original reanalysis | Lucid/Cint | Bovitz |
| --- | --- | --- | --- |
| Positive-key gap (SE) | 0.147 (0.008) | 0.117 (0.007) | 0.049 (0.005) |
| Key × education (SE) | 0.022 (0.004) | 0.012 (0.004) | −0.003 (0.003) |
| Baseline-model respondents | 1,400 | 2,193 | 3,036 |

Education-interaction models use 1,388, 2,185, and 3,000 respondents respectively. The first two interactions are significant at p < 0.01; the Bovitz interaction is not significant. The original wave size therefore differs from the analyzed sample.

Among Lucid/Cint respondents passing all attention checks, the education interaction remains positive (0.008, SE 0.005), significant only at p < 0.1. Bovitz attention subgroups show no positive gradient. A recent Springfield misinformation item yields an approximately 25-percentage-point wording gap among Lucid/Cint respondents reporting postgraduate degrees, but no significant wording differences across Bovitz education groups. The authors report no correlation with political knowledge. “Not sure” increases wording effects in Bovitz without producing a positive education gradient.

## Limitations

Panel membership and education are not randomized. Cross-panel differences support the authors’ low-quality/fraudulent-response interpretation but do not separately identify fraud, inattention, and composition effects. Null interactions do not establish exact equality. Supplementary findings are summarized as reported in the supplied main text, without independent access to the supplement.

## Related Concepts

- [[concepts/acquiescence-response-bias|Acquiescence-Response Bias]] — wording effects distort both belief prevalence and demographic associations.

## Related Papers

- [[papers/acquiescence-bias-inflates-estimates-of-conspiratorial-beliefs-and-political-misperceptions|Hill and Roberts (2023)]] — original experiment reanalyzed and replicated; overall wording effects survive while the education interpretation changes.

## Source

Published online 12 January 2026. Based on supplied parsed Markdown for job `ce9a0c00-5001-4514-93e9-fde09db2d238`. [Replication materials](https://doi.org/10.7910/DVN/ZF32UF).
