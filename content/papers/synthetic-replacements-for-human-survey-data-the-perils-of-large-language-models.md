---
title: "Synthetic Replacements for Human Survey Data? The Perils of Large Language Models"
type: paper
authors:
  - James Bisbee
  - Joshua D. Clinton
  - Cassy Dorf
  - Brenton Kenkel
  - Jennifer M. Larson
year: 2024
doi: 10.1017/pan.2024.5
tags:
  - public-opinion
  - social-simulation
  - simulation-validity
---

## TL;DR

ChatGPT-generated survey responses approximate aggregate American public opinion while understating variation and frequently misrepresenting conditional relationships. Matching means therefore does not establish that synthetic respondents can replace human survey data for inference; prompt composition and model changes also affect results.

## Research Question

Can a pretrained language model reproduce the distribution and correlates of human political attitudes when given personas matching real survey respondents?

## Motivation

Rising survey costs and declining participation make synthetic respondents attractive. Their usefulness depends on preserving subgroup differences, uncertainty, and associations, rather than merely producing plausible answers or population averages.

## Contributions

- Tests synthetic responses against matched respondents from the 2016 and 2020 American National Election Studies (ANES).
- Separates aggregate agreement from distributional and regression-based evidence of [[concepts/algorithmic-fidelity|Algorithmic Fidelity]].
- Demonstrates consequences for power analysis and sensitivity to persona information and data-collection timing.

## Method

The primary model is ChatGPT 3.5 Turbo. Personas encode survey year, age, race/ethnicity, gender, marital status, education, income, ideology, registration, party identification, and political interest. The authors generate 30 synthetic respondents for each of 7,530 ANES respondents. The elicitation prompt contains 16 targets, producing a reported 3,614,400 scores; the main comparisons use 11 target groups shared with the survey analysis.

Responses include 0–100 feeling thermometer scores, explanations, and self-reported confidence. Main analyses average the 30 synthetic responses per human respondent, but uncertainty calculations use the first synthetic response. Source-indicator interactions with respondent characteristics test whether regression coefficients differ between ANES and synthetic data across 11 thermometers and two years, yielding 22 regressions. These are comparisons of conditional associations, not causal effects.

## Experiments

| Test | Reported evidence |
| --- | --- |
| Aggregate means | Every synthetic mean lies within one ANES standard deviation of its corresponding mean; target rankings are broadly preserved. |
| Subgroup distributions | Some partisan subgroup differences reach 10–20 thermometer points, approximately 0.5–1 ANES standard deviations; synthetic responses exaggerate polarization and show too little variation. |
| Regression agreement | 48% of coefficients differ significantly between sources; among those differences, 32% have opposite signs. |
| Power analysis | Table 1 implies 16 respondents using synthetic estimates versus 129 using ANES estimates for 80% power. Both estimated effect size and dispersion differ. |
| Persona information | Politics-only and combined prompts have similar mean absolute error; omitting politics worsens errors especially for politically salient groups. |
| Temporal reproducibility | Identical simpler prompts rerun in April, June, and July 2023 do not reproduce identical responses. June's slope against April is 0.93 and is not distinguishable from a resampling placebo; July shows substantial mean reversion after a model update. |

The paper also reports supplementary comparisons involving GPT-4, Falcon-40B-Instruct, other surveys, and non-U.S. contexts. The supplied main text does not provide their full numerical results.

## Limitations

The primary evidence concerns historical U.S. attitudes and particular 2023 model versions. It does not establish that all future or survey-tuned models must fail. ANES is an empirical benchmark rather than error-free access to individual opinions. Proprietary model changes prevent identifying why temporal drift occurred; suggested explanations involving training or alignment remain hypotheses.

The parsed source has an internal discrepancy at 99% power: prose says 33 synthetic respondents while Table 1 says 35. The 80% comparison above avoids that discrepancy. Supplementary analyses are described but their full contents are not supplied.

## Related Concepts

- [[concepts/algorithmic-fidelity|Algorithmic Fidelity]]: aggregate agreement can coexist with incorrect subgroup associations.
- [[concepts/silicon-sampling|Silicon Sampling]]: externally matched persona composition does not guarantee faithful conditional responses.

## Related Papers

- [[papers/out-of-one-many-using-language-models-to-simulate-human-samples|Out of One, Many: Using Language Models to Simulate Human Samples]] motivates persona-conditioned samples and algorithmic fidelity. This paper tests related aspirations using ChatGPT thermometer responses and finds substantial failures; differences in models and tasks preclude treating it as an identical replication.
