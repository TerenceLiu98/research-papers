---
title: "From Faces to Politics: Vision-Language Models (Sometimes) Link Visual Demographic Characteristics to Ideological Labels"
type: paper
authors:
  - Soyeon Jeon
  - Messi H. J. Lee
  - Jacob M. Montgomery
  - Calvin K. Lai
year: 2026
doi: "10.1017/pan.2026.10038"
tags:
  - political-methodology
  - vision-language-models
  - demographic-bias
---

## TL;DR

With campaign text held constant and ideologically neutral, three vision-language models attribute more liberal ideologies to women than men. Racial associations vary: strong in GPT-4o-mini, weaker in GPT-4o, and statistically insignificant in LLaVA. Explicit instructions to ignore demographics reduce but do not eliminate these associations in GPT-4o-mini.

## Research Question

Do visual race and gender cues influence ideological labels assigned by vision-language models, and how do these associations vary across models and prompting conditions?

## Motivation

Automated political coding can incorporate demographic shortcuts even when the substantive message supplies no ideological information. This concerns the validity of generated labels, distinct from the partisan slant of the image itself studied under [[concepts/visual-political-bias|Visual Political Bias]].

## Contributions

- Holds campaign wording and template constant while varying synthetic candidate faces across race, gender, and racial prototypicality.
- Compares generated labels with five reference distributions and separates distributional differences from average demographic effects.
- Tests cross-model replication and the sensitivity of GPT-4o-mini results to debiasing instructions, label ordering, and temperature.

## Method

The study uses 40 GAN Face Database images representing Black women, Black men, White women, and White men, with high and low racial prototypicality. Each appears in the same Facebook campaign template with neutral endorsement language. Four prompts and 50 completions per image–prompt combination produce 8,000 responses per model. GPT-4o codes generated responses onto a scale from −2 (very conservative) to 2 (very liberal); the authors report 100% agreement with human coding in a pilot. Refusals are excluded.

Benchmarks comprise no-picture outputs, uniform and moderate-centered Gaussian assignment, overall Weidenbaum Center Survey (WCS) ideology, and WCS demographic subgroup distributions. These are interpretive reference points, not ground truth for fictional candidates. Analyses use goodness-of-fit tests, differences between model and survey demographic gaps, and linear models with image random effects. WCS regressions use robust standard errors.

## Experiments

### Main results

GPT-4o-mini underassigns conservative categories and overassigns moderate and liberal categories relative to the benchmarks. Table 1 reports 7,809 usable model responses and 2,657 WCS observations.

| Single-predictor effect on ideology | GPT-4o-mini coefficient (SE) | WCS coefficient (SE) |
| --- | --- | --- |
| Women versus men | 0.41 (0.09) | 0.15 (0.07) |
| Black versus White | 0.44 (0.08) | 0.47 (0.06) |

All four coefficients are significant at p < 0.05. The gender coefficient is nearly three times the survey benchmark. The racial mean difference is similar to WCS, despite different category-level distributions: the model exaggerates liberal-category gaps and reverses the survey's Black–White moderate-category gap. Neither race-by-gender interaction is significant. Racial prototypicality has no significant effect.

### Replication and robustness

Gender associations replicate across GPT-4o-mini, GPT-4o-2024-11-20, and LLaVA. The racial coefficient falls to 0.18 in GPT-4o and is insignificant in LLaVA. The paper reports liberal overattribution across all three models.

In GPT-4o-mini, debiasing instructions reduce the gender and race coefficients to 0.30 and 0.35; changing label order reduces them to 0.26 and 0.24. At temperatures 0, 0.3, and 0.6, gender coefficients range from 0.28 to 0.39 and race coefficients from 0.37 to 0.46. All Table 2 effects remain significant at p < 0.05.

## Limitations

The design covers 40 synthetic faces, three models, one political construct, English prompts, and American ideology framing. Synthetic faces may omit cues present in real candidates, and repeated completions do not replace broader stimulus coverage. Small interaction effects may be underpowered. Null prototypicality effects do not establish a discrete internal representation of race.

Excluding refusals makes results conditional on answered queries. LLaVA's notably high refusal rate complicates interpreting its weaker racial association as superior overall performance. The supplied Markdown references supplementary analyses but does not include them; exact refusal rates and detailed replication specifications are therefore unavailable here. Section 2.4 describes randomized label ordering, whereas Table 2 and the results describe reversed ordering.

## Related Concepts

- [[concepts/visual-political-bias|Visual Political Bias]]: distinguish bias in political visual content from demographic associations introduced by its automated interpretation.
- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]]: direct ideological scoring likewise requires validation of what cues drive the assigned position.

## Related Papers

- [[papers/scaling-political-texts-with-large-language-models-asking-a-chatbot-might-be-all-you-need|Scaling Political Texts with Large Language Models: Asking a Chatbot Might Be All You Need]]: a library comparison on validating ideological scores from substantive text; not a citation in this paper.
- Knox, Lucas, and Cho (2022), “Testing Causal Theories with Learned Proxies”: cited motivation for concerns about downstream inference using automated measures.
- Liu et al. (2023), “Visual Instruction Tuning”: cited source for LLaVA.
