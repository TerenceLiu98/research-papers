---
title: "Evaluating the statistical realism of LLM-generated social science data"
type: paper
authors:
  - Yueqi Xie
  - Lemeng Liang
  - Shuzhen Li
  - Yifu Lu
  - Zhiwen Xiao
  - Mengdi Shi
  - Junming Huang
  - Mengdi Wang
  - Yu Xie
year: 2026
tags:
  - social-simulation
  - synthetic-data
  - simulation-validity
---

## TL;DR

SSDataBench tests whether LLM-generated populations preserve survey distributions, associations, and life-course patterns. Across 15 models and seven surveys, sparse demographic conditioning produces reduced heterogeneity and exaggerated relationships. Preliminary survey-data fine-tuning improves realism across three held-out settings.

## Research Question

Can LLMs reproduce population-level statistics when generating respondents from limited demographic information and historical and regional context?

## Motivation

Plausible responses and individual predictive accuracy do not establish that synthetic data support population inference. Survey substitutes must preserve variation and relationships, including event ordering. This extends [[concepts/algorithmic-fidelity|Algorithmic Fidelity]] beyond attitudes to multiple social domains.

## Contributions

- Introduces five complementary statistical evaluation types, including longitudinal event sequences.
- Evaluates 15 models across seven surveys and six social domains.
- Documents concentration around typical profiles, inflated associations, and compressed life-course diversity.
- Tests preliminary transfer from fine-tuning on quantitative survey records.

## Method

For each dataset, 1,000 real respondents supply demographic inputs. Each model generates one counterpart per respondent using survey context, variable descriptions, and allowed values, following a procedure resembling [[concepts/silicon-sampling|Silicon Sampling]]. Default temperature and top-p are both 1.

| Pattern | Statistical comparison |
| --- | --- |
| Univariate distributions | Kolmogorov–Smirnov for numerical variables; chi-square for categorical variables |
| Bivariate associations | Fisher z for Pearson correlation; delta-method z for Cramér’s V and eta-squared |
| Multivariate prediction | Delta-method comparison of regression R-squared |
| Life event sequence distributions | Chi-square comparison of event-order categories |
| Sequence–covariate associations | Delta-method comparison of Cramér’s V or eta-squared |

Each question uses 100 bootstrap iterations, drawing 500 records with replacement from each source and excluding missing observations. A pass means no significant difference at 0.05. Pass rates are comparative diagnostics; non-rejection does not prove equivalence.

## Experiments

Longitudinal datasets are NLSY79, CFPS, Add Health, and Understanding Society. Cross-sectional datasets are the 1980 U.S. Census, 1980 CPS-ASEC, and 2018 GSS. Domains cover demographics, socioeconomic status, marriage, health, abilities, and attitudes in the United States, China, and United Kingdom.

Pass rates are typically below 0.5. Marginal and sequence distributions are hardest to reproduce, with sequence-distribution pass rates near zero. Generated categorical variables and event sequences have lower entropy. Associations and regression predictive power are often inflated: the NLSY Gemini-2.5-Flash example gives logged mean income at ages 30–40 an R-squared approaching 0.6 versus below 0.1 in real data (Fig. 3). Sequence–covariate relationships are distorted without equally systematic inflation.

Newer model generations and general capability rankings show no consistent realism advantage. Temperature changes do not reliably improve realism. Removing Gender and Race from inputs generally worsens performance in an auxiliary analysis.

Llama-3.1 8B is fine-tuned on 1,000 CPS-ASEC 1970 records for 20 epochs, with learning rate 0.0002 and LoRA rank 32. Table 1 reports average pass rates:

| Held-out dataset | Before | After fine-tuning |
| --- | --- | --- |
| CPS-ASEC 1980 | 0.258 | 0.534 |
| U.S. Census 1980 | 0.270 | 0.442 |
| GSS 2018 | 0.325 | 0.402 |

These support preliminary transfer across years and datasets, not demonstrated longitudinal improvement. The source links [benchmark code](https://github.com/lszshu/SSDataBench) and [data resources](https://github.com/LemengLiang/SSDataBench-Data).

## Limitations

Results concern sparse conditioning with entirely unobserved targets, rather than all simulation or imputation settings. Pass rates depend on sample size, statistics, tests, and thresholds. Surveys contain coverage, nonresponse, attrition, and measurement errors. Prior model exposure to survey data is unknown. Full supplementary variable and model-version tables are absent from the supplied Markdown.

Qualitative contextual conditioning is proposed rather than experimentally demonstrated here. Suggested benefits for counterfactual inference remain conjectural: reproducing observational patterns does not establish causal identification.

## Related Concepts

- [[concepts/algorithmic-fidelity|Algorithmic Fidelity]]: preserving variation and relationships is essential to population inference.
- [[concepts/silicon-sampling|Silicon Sampling]]: matched demographic inputs do not guarantee faithful conditional outputs.

## Related Papers

- [[papers/synthetic-replacements-for-human-survey-data-the-perils-of-large-language-models|Synthetic Replacements for Human Survey Data? The Perils of Large Language Models]] reports reduced variation and distorted associations in synthetic opinion data; SSDataBench extends these concerns across domains and longitudinal patterns.
