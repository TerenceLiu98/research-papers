---
title: "AlphaCast: A Human Wisdom-LLM Intelligence Co-Reasoning Framework for Interactive Time Series Forecasting"
type: paper
authors:
  - Xiaohan Zhang
  - Tian Gao
  - Mingyue Cheng
  - Bokai Pan
  - Ze Guo
  - Yaguo Liu
  - Xiaoyu Tao
  - Qi Liu
year: null
tags:
  - time-series-forecasting
  - large-language-models
  - agentic-reasoning
  - retrieval-augmented-generation
  - reflective-refinement
---

## TL;DR

AlphaCast uses a training-free LLM to revise forecasts produced by conventional models through a three-stage Investigator-Generator-Reflector workflow. It combines temporal features, retrieved cases, domain knowledge, known exogenous variables, and supplementary context, then checks the generated trajectory for evidential and physical consistency. Across ten electricity-price, transformer, renewable-power, and hydrology benchmarks, it reports the lowest MSE and MAE on nine of ten datasets among twelve baselines. Its ablations also show that unconstrained LLM reasoning can hurt: on Sunny Power, removing reflection raises MSE from 13.294 to 40.184, worse than the 17.956 non-reasoning baseline.

## Research Question

Can time-series forecasting be treated as an interactive reasoning process in which a training-free LLM gathers context, adjusts case-based forecasts, and reflectively corrects unsupported or physically implausible predictions?

## Motivation

Most statistical, neural, and foundation-model forecasters map historical observations directly to a future trajectory. The authors argue that this omits how human experts use known future covariates, calendar context, domain rules, analogous cases, and iterative review. AlphaCast frames this alternative as [[concepts/agentic-time-series-forecasting|Agentic Time Series Forecasting]], with the LLM orchestrating evidence and forecast revision rather than replacing the numerical forecasting models in its case library.

## Contributions

- Defines a multi-stage forecasting workflow that separates context preparation, reasoning-based generation, and reflective evaluation.
- Builds a four-part toolkit containing 20 temporal features, practical and theoretical domain knowledge, a clustered case library, and textual contextual attributes.
- Uses candidate statistical, deep-learning, and foundation models to provide case-based starting forecasts, which the LLM modifies only when contextual evidence supports an adjustment.
- Evaluates the framework against twelve baselines on five short-horizon and five long-horizon datasets, with component, context, toolkit, backbone, clustering, and generation-strategy analyses.

## Method

The input contains a task description, variable profile, timestamps, an endogenous look-back sequence, and exogenous variables spanning the look-back and forecast horizon. Future information is restricted to covariates assumed known at forecast time.

The **Investigator** selects relevant statistics from a fixed 20-feature library and retrieves domain knowledge, contextual attributes, and historical analogues. For the case library, each training instance is associated with its best candidate forecasting model. K-means groups similar input windows; the case forecast averages candidate-model outputs associated with the nearest cluster, while a nearest-neighbor input and prediction provide a specific historical reference.

The **Generator** begins from the case forecast and uses the consolidated evidence to make targeted trajectory-level adjustments. It can shift or reshape the forecast to account for distribution changes, temporal features, known covariates, timestamps, and domain constraints. The default generates the entire horizon holistically rather than in segments.

The **Reflector** checks output length, numerical validity, timestamp alignment, support for each adjustment, and consistency with retrieved domain knowledge. It either accepts the intermediate forecast or supplies feedback for another generation step, up to a fixed iteration limit. The paper's hydrology example delays rainfall-induced discharge peaks to respect travel time; its transformer-temperature example smooths the response to load changes to reflect thermal inertia.

## Experiments

### Setup

Short-term experiments use five hourly electricity-price datasets (BE, DE, FR, NP, and PJM), with 168 input steps and a 24-step horizon. Long-term experiments use hourly ETTh1, 15-minute ETTm1, 15-minute Windy Power and Sunny Power, and daily MOPEX, with 96 input and 96 forecast steps. Baselines include Prophet, Seasonal Naive, ARIMA, CES, DLinear, PatchTST, TimesNet, TimeXer, iTransformer, Autoformer, Sundial, and Chronos. MSE and MAE are reported.

### Main Results

AlphaCast has the lowest MSE on every dataset except NP, where Chronos scores 22.180 versus AlphaCast's 27.113. It also has the lowest MAE on every dataset except MOPEX, where Chronos scores 1.307 versus AlphaCast's 1.353. Thus the tabulated results give AlphaCast nine MSE wins and nine MAE wins. Selected gains are substantial: on Windy Power its MSE is 1548.825, compared with 1930.876 for the strongest listed baseline, and on Sunny Power it scores 13.294, compared with 17.956.

### Ablations and Analysis

Removing the toolkit, reasoning, or reflection worsens the full model on all six datasets in the framework ablation. Reflection is especially consequential on Sunny Power: omitting it increases MSE from 13.294 to 40.184, indicating that reasoning without validation can be less reliable than the candidate-model baseline. Separate toolkit ablations report higher MSE whenever the feature library, knowledge base, case library, or contextual pool is removed.

Holistic generation outperforms step-wise generation on BE, PJM, and Windy Power; for Windy Power, MSE rises from 1548.825 to 2164.368 under segmented generation. A cluster-count sweep shows an intermediate optimum rather than monotonic improvement. The backbone comparison covers DeepSeek-V3, DeepSeek-R1, GPT-4o, Gemini-2.5 Pro, and GPT-5; the paper reports GPT-5 as best on the displayed datasets but does not provide the figure's exact values in the parsed text.

## Limitations

- AlphaCast is not training-free as a complete forecasting system: its LLM requires no parameter updates, but its case library depends on training samples, clustering, and candidate forecasters trained or pretrained elsewhere.
- The system assumes access to future exogenous covariates and externally assembled knowledge and context. Results do not isolate the cost, provenance, coverage, or forecast-time availability of those resources beyond the stated no-leakage rule.
- The comparison reports point errors without uncertainty intervals, significance tests, latency, token use, or energy measurements. The impact statement acknowledges higher inference latency and energy use than single-pass regression.
- The strongest claims come from ten benchmarks with fixed 24- or 96-step horizons. Generalization to other domains, horizons, missing-covariate settings, and prospective deployments is not established.
- Reflection is not uniformly beneficial: Appendix B.5 reports that a more elaborate iterative-reflection variant performs worse on PJM and Sunny Power, attributed to disrupted temporal continuity, mismatched timestamp retrieval, and accumulated corrections.
- Case studies illustrate plausible physical corrections but do not independently establish that the generated rationale caused the numerical improvement.
- The supplied Markdown provides no publication venue, DOI, arXiv identifier, or explicit manuscript year. These fields are therefore not inferred. Source: Cognitio job `6ba8e228-0e99-4400-8564-1e2dded9925c`.

## Related Concepts

- [[concepts/agentic-time-series-forecasting|Agentic Time Series Forecasting]]
- [[concepts/text-conditioned-time-series-forecasting|Text-Conditioned Time Series Forecasting]]
- [[concepts/time-series-foundation-models|Time Series Foundation Models]]
- [[concepts/in-context-learning|In-Context Learning]]

## Related Papers

- [[papers/time-llm-time-series-forecasting-by-reprogramming-large-language-models|TIME-LLM: Time Series Forecasting by Reprogramming Large Language Models]]: a cited approach that adapts a frozen LLM through learned numerical reprogramming and textual prompts; AlphaCast instead uses the LLM as a training-free reasoner over forecasts and retrieved context.
- [[papers/timebraid-unifying-time-series-and-language-for-understanding-and-forecasting|TimeBraid: Unifying Time Series and Language for Understanding and Forecasting]]: a library comparison that fuses text and numerical representations inside a forecasting model; it is a thematic connection rather than a citation in the supplied AlphaCast manuscript.
- Ansari et al. (2024), "Chronos: Learning the Language of Time Series": a cited zero-shot foundation-model baseline.
- Liu et al. (2025), "Sundial: A Family of Highly Capable Time Series Foundation Models": a cited foundation-model baseline.
- Cheng et al. (2026), "Position: Beyond Model-Centric Prediction-Agentic Time Series Forecasting": the cited position paper motivating the agentic formulation.
- Tao et al. (2026), "Cast-R1: Learning Tool-Augmented Sequential Decision Policies for Time Series Forecasting": a cited related agentic forecasting system.

[[index|Library home]]
