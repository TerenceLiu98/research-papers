---
title: "What if Tomorrow is the World Cup Final? Counterfactual Time Series Forecasting with Textual Conditions"
type: paper
authors:
  - Shuqi Gu
  - Yongxiang Zhao
  - Baoyu Jing
  - Kan Ren
year: 2026
source_job_id: 20cd848a-6120-4aab-82bb-5ea0df590657
project: "https://seqml.github.io/TADiff/"
tags:
  - time-series-forecasting
  - counterfactual-forecasting
  - multimodal-learning
  - diffusion-models
---

## TL;DR

TADIFF forecasts time series under natural-language descriptions of factual or hypothetical future conditions. It uses a condition-aware diffusion inversion to derive a history-dependent initial state, then denoises from that state under the future text. A separate contrastive model, DTTC, scores preservation of historical features and alignment with future text when no counterfactual outcome is observable. Experiments report strong factual and counterfactual scores, but counterfactual evaluation remains model-based rather than ground-truth validation.

[[index|Library home]]

## Research Question

How can a forecaster generate plausible time-series futures for complex textual scenarios that did not occur, while preserving relevant historical structure and evaluating the result when the counterfactual ground truth is unavailable?

## Motivation

Historical trajectories alone cannot specify how an unseen event would alter a future series. Existing context-aided forecasters commonly use observed or deterministic information, while counterfactual forecasting methods often encode interventions as fixed categories. Natural language can describe richer conditions, but creates two problems: a forecast must balance the supplied scenario against persistent historical properties, and real-world counterfactuals have no observed target against which to compute MAE or MSE.

## Contributions

- Formalizes counterfactual [[concepts/text-conditioned-time-series-forecasting|Text-Conditioned Time Series Forecasting]] with historical series and text plus factual or counterfactual future text.
- Proposes TADIFF, a conditional [[concepts/diffusion-models|Diffusion Model]] whose text-attribution stage converts the historical sequence into a history-derived diffusion state before scenario-conditioned forecasting.
- Constructs counterfactual training pairs by recombining histories with future conditions and fine-tunes generated forecasts against semantic consistency objectives.
- Introduces Disentangled Time Series and Text Consistency (DTTC), with separate scores for historical intrinsic-feature consistency and future-text alignment.
- Evaluates factual and counterfactual settings on one synthetic and four real-world datasets, including component ablations and retrieval checks for DTTC.

## Method

### Task and Data

The model receives a historical series $x_h$, historical text $c_h$, and future text $c_f$. In factual forecasting, the history-condition combination and future target are observed. In real-world counterfactual forecasting, the future condition is paired with a history for which that combination did not occur, so the target series is absent. The datasets are Synth, ETTm1, Traffic, Exchange, and Weather. Text for the originally unimodal ETTm1, Traffic, and Exchange data is generated from extracted statistical attributes; Weather captions are standardized into seven attributes; Synth is generated from controlled intrinsic and extrinsic attributes.

### Text-Attributive Diffusion

TADIFF is based on DDIM. During attribution, it applies condition-aware inverse diffusion to the clear historical sequence under $c_h$, producing $x_{h,T}$. The method treats this state as retaining intrinsic properties while removing historical extrinsic effects. During forecasting, $x_{h,T}$ initializes the future portion of the trajectory, and the model denoises it while conditioning on the observed history and $c_f$. Training combines a standard forecasting denoising loss with an attribution loss that reconstructs historical data from random noise under historical text.

For counterfactual adaptation, the authors recombine historical samples and future conditions to create unseen pairs. Because these pairs have no real target series, fine-tuning starts from Gaussian noise, estimates a clean forecast, and maximizes DTTC alignment with the historical intrinsic representation and future-text representation.

### Evaluation Without Counterfactual Targets

DTTC uses a PatchTST time-series encoder and a text encoder trained from scratch with a Long-CLIP tokenizer. The series encoder separates intrinsic and extrinsic representations. Contrastive objectives align intrinsic representations across paired historical and future sequences and align extrinsic representations with their text. DTTC-I scores forecast-history intrinsic similarity; DTTC-E scores forecast-future-text similarity. These learned scores supplement MAE and MSE where targets exist and replace them for real-world counterfactual evaluation.

## Experiments

All reported experiments use three random seeds. Under factual conditions, TADIFF has the best reported MAE, DTTC-I, and DTTC-E on Synth, though CT has lower MSE (0.34 versus 0.51). It leads all four reported metrics on ETTm1 and Traffic, and both consistency metrics on Exchange while several methods tie or improve on its numerical errors. On Weather, TADIFF ties IATSF for MAE at 0.18 and leads DTTC-E, while IATSF has lower MSE (0.09 versus 0.11) and TimeCMA has slightly higher DTTC-I.

For the four real-world counterfactual tests, TADIFF has the highest reported DTTC-I and DTTC-E in every dataset. Examples include Traffic scores of 18.08 and 78.58, compared with the next-highest 16.32 and 64.79. These are learned semantic-consistency scores, not accuracy against unobserved outcomes.

Removing text attribution worsens every displayed factual and counterfactual metric on ETTm1 and Traffic. Counterfactual fine-tuning improves both DTTC scores in those tables, but its effect on point accuracy is mixed: on Traffic, the model without that fine-tuning has lower MAE and MSE (0.31/0.24 versus 0.35/0.27). DTTC three-way retrieval accuracy ranges from 55.06% to 91.90% for intrinsic matching and from 77.91% to 98.44% for text matching across datasets. A separate retrieval test finds that the attributed state retrieves historical text near chance more often than the clear history does, supporting reduced condition information but not proving complete statistical independence.

## Limitations

- Real-world counterfactual outcomes are unobserved, so the main counterfactual comparison is evaluated by DTTC, a learned model trained on factual pairs. High DTTC scores do not establish numerical counterfactual accuracy or causal validity.
- DTTC-I retrieval is uneven, reaching only 55.06% on ETTm1 in the three-candidate test, and the authors identify evaluation of varying forecast lengths with model-based metrics as a remaining limitation.
- Most real-world text is synthetic or standardized from extracted attributes. The experiments therefore do not establish behavior under open-ended, ambiguous, misleading, or genuinely prospective event descriptions.
- Counterfactual fine-tuning optimizes the same DTTC representations used for evaluation, which makes independent validation especially important. Its numerical effect is not uniformly positive in the reported ablation.
- The attribution mechanism assumes a meaningful separation between invariant intrinsic features and text-described extrinsic conditions. The chosen split is controlled in Synth but is less directly verifiable in observational datasets.
- Diffusion inference costs 340 ms per Weather sample in the reported batch-size-one comparison, versus 17 ms for TimeMMD, although model and hardware settings may limit direct generalization.
- The supplied manuscript identifies ICML 2026 peer-review ethics and contains 2026 references, but provides no DOI, arXiv identifier, or confirmed publication status.

## Related Concepts

- [[concepts/text-conditioned-time-series-forecasting|Text-Conditioned Time Series Forecasting]]: conditions a numerical forecast on natural-language context, including hypothetical future scenarios.
- [[concepts/probabilistic-time-series-forecasting|Probabilistic Time Series Forecasting]]: represents uncertainty over future trajectories rather than only a point estimate.
- [[concepts/diffusion-models|Diffusion Models]]: provide TADIFF's iterative conditional generation mechanism.

## Related Papers

- [[papers/aurora-towards-universal-generative-multimodal-time-series-forecasting|Aurora: Towards Universal Generative Multimodal Time Series Forecasting]]: another generative multimodal forecaster, using history-derived images, text, and prototype-guided flow matching rather than counterfactual text attribution.
- [[papers/time-llm-time-series-forecasting-by-reprogramming-large-language-models|TIME-LLM: Time Series Forecasting by Reprogramming Large Language Models]]: uses textual dataset, task, and observed-history prompts rather than descriptions of alternative future conditions.
- Melnychuk, Frauen, and Feuerriegel (2022), "Causal Transformer for Estimating Counterfactual Outcomes": a cited structured-treatment counterfactual forecasting baseline.
- Xu, Wang, and Xu (2024), "Intervention-Aware Forecasting: Breaking Historical Limits from a System Perspective": a cited future-intervention forecasting method and source of the Weather data protocol.

