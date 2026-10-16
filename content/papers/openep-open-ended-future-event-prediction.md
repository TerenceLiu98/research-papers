---
title: "OpenEP: Open-Ended Future Event Prediction"
type: paper
authors:
  - Yong Guan
  - Hao Peng
  - Xiaozhi Wang
  - Lei Hou
  - Juanzi Li
year: 2026
doi: "10.1145/3802922"
venue: "ACM Transactions on Information Systems, 44(4), Article 95"
source_job_id: "f2352bea-bab1-4782-93b8-087b8696fe39"
tags:
  - event-forecasting
  - large-language-models
  - retrieval
  - llm-evaluation
---

## TL;DR

OpenEP formulates future event prediction as free-form generation and introduces OpenEPBench, comprising 983 Chinese and English questions with 15-day prediction windows. Its StkFEP pipeline expands queries around stakeholders, retrieves current context and historical analogues, and summarizes clustered evidence. GPT-3.5 achieves reported overall scores of 46.95 on Chinese data and 46.03 on English data, versus 43.78 and 43.58 for query expansion plus summaries of summaries. These are aggregate evaluation scores on a percentage scale, not percentages of wholly correct forecasts; completeness remains a major weakness.

[Paper DOI](https://doi.org/10.1145/3802922) | [Code and data](https://github.com/ncepu-eai/OpenEP)

## Research Question

Can language models predict detailed future event outcomes without a fixed answer vocabulary, and does retrieval guided by stakeholders and historical analogues improve those predictions?

## Motivation

Binary questions, candidate-answer selection, and predefined event taxonomies constrain what a forecast can express. Real-world questions also concern how an event develops, its consequences, and different actors' responses. [[concepts/open-ended-event-forecasting|Open-Ended Event Forecasting]] makes these aspects explicit while introducing a harder evaluation problem: a plausible narrative can still omit, misstate, or fail to address the eventual outcome.

## Contributions

- Defines a generative forecasting task covering time, location, development, outcome, impact, response, and other questions.
- Constructs OpenEPBench through daily question annotation, immediate prediction, and later verification of outcome-bearing news passages.
- Introduces StkFEP, combining stakeholder-based query expansion, historical analogy retrieval, clustered summarization, and prediction aggregation.
- Evaluates several model backbones, component ablations, human agreement with automated judgments, and recurring prediction errors.

## Method

### Benchmark Construction

Each instance contains a question, its construction timestamp, a prediction window, background, and the eventual outcome. Chinese topics come from Zhihu and English topics from Google News. GPT-4 assists with background collection, topic filtering, and question generation; two NLP experts independently verify annotations and discuss disagreements. Predictions are made immediately after daily question construction, before outcomes are collected.

After the 15-day window, news is retrieved and ranked for outcome relevance. Annotators extract and verify outcome-bearing passages against accuracy, completeness, relevance, specificity, and reasonableness criteria. Section 3.4 reports retaining 983 of 1,269 outcome candidates after removing 286. The retained dataset contains 869 Chinese questions from 192 topics collected June 1-July 10, 2024, and 114 English questions from 27 topics collected July 1-10, 2024.

### StkFEP Pipeline

1. **Retrieve:** Search using the original question, filter news for relevance, extract salient entities as stakeholders, and generate additional questions. Retrieve directly relevant events with shared entities or context. Separately abstract stakeholders into roles, generate queries for historical analogues, score candidates using roles, descriptions, and context, and select the highest-scoring analogue. Bing supplies web retrieval.
2. **Integrate:** Extract informative segments, remove duplicates, embed text with models such as Sentence-BERT, and apply K-means with the Bayesian Information Criterion for cluster-count selection. Summarize each cluster. Relevant-event summaries emphasize current context; historical-analogue summaries emphasize known outcomes and their causes.
3. **Predict:** Generate and synthesize multiple candidate answers using the integrated evidence. Non-time questions receive free-form responses. Time questions are evaluated as four-way selection: three consecutive five-day periods and a no-outcome option.

### Evaluation

GPT-4 acts as an [[concepts/llm-as-a-judge|LLM-as-a-Judge]] on non-time questions. Accuracy indicates whether at least one core aspect is predicted correctly; completeness measures coverage in [0,1]; relevance, specificity, and reasonableness use ordinal 1-5 scales. The judge outputs confidence distributions over scores, from which normalized expectations are computed, $\hat{s}=\sum_k\sigma(k)p(k)$. Section 5.1 averages these values within question types and dimensions; later tables report aggregate scores across dimensions. The exact cross-dimension and overall weighting is not fully specified in the supplied text.

## Experiments

### Main Results

Baselines combine direct retrieval (DR) or generated-query retrieval (GQR) with per-document summarization (Summ) or summaries of summaries (SoS), keeping the prediction module shared. T5-800M and mT5-1.2B use StkFEP retrieval and integration, with prediction models fine-tuned on 4,000 additional event-pair samples from 2021-2023.

| Language | Backbone | DR + Summ | DR + SoS | GQR + SoS | StkFEP |
| --- | --- | ---: | ---: | ---: | ---: |
| Chinese | GPT-3.5 | 37.52 | 41.12 | 43.78 | 46.95 |
| Chinese | GLM-4 | 37.08 | 38.72 | 40.05 | 46.27 |
| Chinese | Llama3-8B | 32.84 | 34.64 | 37.54 | 39.26 |
| English | GPT-3.5 | 37.41 | 39.85 | 43.58 | 46.03 |
| English | GLM-4 | 35.86 | 39.54 | 42.62 | 43.11 |
| English | Llama3-8B | 31.34 | 32.51 | 35.16 | 38.77 |
| English | Mistral-7B | 34.12 | 36.70 | 38.94 | 41.24 |

Values are the reported Overall columns of Tables 2-3 on a percentage scale. StkFEP leads overall for each listed backbone, but does not lead every question category. The small-model baselines score 14.67 for Chinese and 18.74 for English. Table 2 reports GPT-3.5 time accuracy of 45.92; Table 3 reports 44.85 for English.

### Ablations and Diagnostics

| Variant, Table 4 | GPT-3.5 | GLM-4 |
| --- | ---: | ---: |
| StkFEP | 46.95 | 46.27 |
| Replace cluster summaries with SoS | 46.11 | 45.38 |
| Remove similar events | 45.65 | 44.79 |
| Remove stakeholders | 44.28 | 42.80 |

Removing stakeholders produces the largest reported decrease. Completeness is the lowest-scoring evaluation dimension, while reasonableness is comparatively high. Human evaluation of 50 GPT-3.5 predictions yields approximately 0.45 Spearman correlation with GPT-4 scores; this check covers completeness, relevance, specificity, and reasonableness, not accuracy. Daily evaluation of 22 questions suggests improvement as outcomes approach and new evidence becomes available (Sections 5.4-5.6).

Among 50 sampled incorrect predictions, the authors label 46% incomplete, 54% underspecified, 26% irrelevant, and 14% as common-sense misinterpretations. These percentages total more than 100% and should not be read as mutually exclusive shares. A separate balanced validity test uses 286 valid and 286 invalid questions; GPT-3.5 obtains 43.67% accuracy in predicting whether questions will eventually have answers (Sections 5.8-5.10).

The full pipeline averages about 24.8K tokens per instance. Preliminary offloading of intermediate steps to smaller local models reportedly reduces this below 7.8K without noticeable degradation; the paper does not provide a full comparative table for that configuration.

## Limitations

- **Coverage and selection:** The benchmark covers a short 2024 interval, newsworthy topics, and a 15-day horizon, with only 114 English questions. Excluding questions without verified outcomes conditions the main evaluation on eventual answerability. Similar trends across languages do not by themselves establish scale independence or broad linguistic robustness.
- **Evaluator validity:** GPT-4 assists both dataset construction and scoring. Human agreement is moderate and measured on only 50 predictions. The human study rates completeness on a 1-5 scale, whereas the automatic protocol describes it as a coverage ratio. A correct fragment can earn accuracy credit without yielding a complete forecast.
- **Temporal protocol:** Immediate prediction before outcome collection is the reported leakage safeguard. Re-running the released questions later with current models or unrestricted web retrieval would not reproduce that information boundary.
- **Reporting ambiguities:** Section 3.4 describes the 286 exclusions as outcome-quality failures or unresolved disagreements; Section 5.8 characterizes 286 invalid questions as lacking concrete answers. Their exact relationship is unclear. Section 5.2 calls 44.85 the best time result despite Table 2's 45.92; the table values are retained here. The overall aggregation weights and uncertainty estimates are not supplied.
- **Method and cost:** Abstract stakeholder roles can retrieve misleading analogues; the framework does not provide a unified account of event similarity or establish causal transfer between events. Multiple retrieval and LLM stages incur substantial cost. Time prediction remains multiple-choice despite the broader free-form task formulation.

## Related Concepts

- [[concepts/open-ended-event-forecasting|Open-Ended Event Forecasting]]: free-form outcomes with explicit temporal information boundaries.
- [[concepts/structured-complex-temporal-events|Structured Complex Temporal Events]]: a contrasting representation that conditions forecasting on structured event fields.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: rubric-based semantic evaluation and the need for human validation.

## Related Papers

- Halawi et al. (2024), "Approaching human-level forecasting with language models": cited precedent for query decomposition and retrieval-assisted forecasting (reference 19).
- Ye et al. (2024), "MIRAI: Evaluating LLM Agents for Event Forecasting": cited structured forecasting comparison (reference 62).
- [[papers/structured-complex-and-time-complete-temporal-event-forecasting|Structured, Complex and Time-complete Temporal Event Forecasting]]: related library work on conditional object ranking over event graphs, rather than free-form outcome generation; not a tested StkFEP baseline.

[[index|Library home]]
