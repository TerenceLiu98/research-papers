---
title: "TabSTAR: A Tabular Foundation Model for Tabular Data with Text Fields"
type: paper
authors:
  - Alan Arazi
  - Eilam Shapira
  - Roi Reichart
year: null
source_job_id: "eef5c9a8-3562-4d42-8c9e-e9f210fedb33"
tags:
  - tabular-foundation-models
  - multimodal-learning
  - transfer-learning
  - text-embeddings
---

## TL;DR

TabSTAR is a [[concepts/tabular-foundation-models|Tabular Foundation Model]] for tables that mix numerical, categorical, and free-text fields. It jointly adapts a pretrained text encoder, represents the target variable with input tokens, and shares its prediction heads across datasets. On a 50-dataset text-rich benchmark, it reports the best normalized classification score among the evaluated models, while gradient-boosted trees remain stronger for regression. Its gains depend on encoder adaptation and cross-dataset pretraining, but training is slower than the principal baselines and wide or highly multiclass tables can create memory bottlenecks.

## Research Question

Can one model transfer across heterogeneous tabular datasets while learning task-specific representations of textual fields, using target semantics to avoid dataset-specific parameters?

## Motivation

Gradient-boosted decision trees remain strong on conventional tabular tasks, but they cannot directly adapt a text encoder to a prediction target. Existing tabular foundation models commonly use fixed text embeddings, ignore column or target semantics, or attach dataset-specific output layers. These choices are especially limiting when free text or high-cardinality categories contain information whose relevance changes with the target variable.

## Contributions

- Introduces target-aware tokens that encode a regression target name or every possible classification label alongside the predictive features.
- Combines an adapted e5-small-v2 encoder with separate numerical encoding, per-feature semantic-numerical fusion, and order-invariant cross-feature attention.
- Uses shared classification and regression heads, eliminating dataset-specific parameters and supporting varying schemas and class counts.
- Pretrains jointly on classification and regression datasets, then adapts to each downstream dataset with LoRA.
- Curates a 350-dataset pretraining corpus and a 50-dataset benchmark drawn from three sources, with explicit deduplication and held-out benchmark folds intended to reduce leakage.

## Method

### Verbalization and Encoding

Each feature becomes an independent text element containing its column name and value. Numerical features additionally retain a clipped z-score and are verbalized through ten quantile bins that include both value ranges and quantile ranges. A pretrained e5-small-v2 model encodes the text; its upper six layers are unfrozen during pretraining. A two-layer MLP maps each numerical value to the same 384-dimensional space.

A one-layer transformer fuses the semantic and numerical vectors for each feature independently. A six-layer transformer without positional encodings then models interactions among all feature and target tokens, making this stage invariant to column order.

### Target-Aware Prediction

For classification, every possible class value is verbalized as a target token and included for every row without revealing the true class. The same classification head maps each contextualized target token to one logit, followed by a softmax across classes. Regression uses one token carrying the target name and a shared head that predicts a standardized value. Because the heads operate on target tokens rather than fixed output positions, their parameters are shared across datasets and class vocabularies.

### Pretraining and Adaptation

Supervised multitask pretraining mixes regression, binary classification, and multiclass classification. The reported corpus contains 350 datasets, including 49 with text or high-cardinality features. Five model variants each add 40 benchmark datasets to this corpus and reserve a disjoint set of 10 benchmark datasets for evaluation. The paper reports training the resulting 390-dataset models for under 48 hours on one NVIDIA A40 GPU.

Downstream adaptation uses LoRA with rank 32 across the trainable architecture, updating about 1.60 million of 47.26 million parameters. Hyperparameters are selected on 25 downstream tasks disjoint from the reported benchmark.

## Experiments

The benchmark contains 50 datasets from the AutoML Multimodal Benchmark, CARTE, and a study of text and high-cardinality table features. It includes 14 classification and 36 regression tasks; 29 regression datasets come from CARTE and emphasize high-cardinality values more than long text. Each dataset uses ten random 90/10 train-test splits. AUROC measures classification and $R^2$ measures regression, with scores normalized within each split using the best and worst evaluated model as anchors.

Models are evaluated with at most 10,000 training examples and, for 30 larger datasets, in an unlimited-data condition. Baselines include four tree ensembles, RealMLP, TabM, CARTE, TabDPT, TabPFN-v2, and TabICL. Models without native text handling receive fixed e5-small-v2 embeddings; several conventional baselines receive up to four hours of per-task hyperparameter search.

- In the 10K classification condition, TabSTAR reports a normalized score of 0.83, compared with 0.73 for tuned TabM, 0.69 for tuned CatBoost, and 0.67 for TabPFN-v2. It wins 8 of 11 head-to-head datasets against TabPFN-v2, 10 of 14 against tuned TabM, and 12 of 14 against tuned CatBoost.
- In unlimited classification, TabSTAR scores 0.84 and tuned TabM scores 0.79. The improvement of unlimited variants over 10K variants supports using all available examples when the model scales to them.
- Regression is not state of the art: TabSTAR is competitive at 10K and scales beyond several other foundation models, but gradient-boosted trees remain clearly stronger.
- Median training time at 10K is 493.2 seconds for TabSTAR, versus 19.1 seconds for TabM, 39.1 for LightGBM, and 68.5 for GPU CatBoost. Median inference time is 3.0 seconds, close to the GPU tree baselines and much lower than TabICL's 13.4 and TabDPT's 161.4 seconds.
- Unfreezing even one text-encoder layer substantially improves downstream performance over frozen embeddings; six unfrozen layers perform best in the reported study, while nine are worse.
- Scaling pretraining from 0 to 16, 64, and 256 datasets increases normalized classification scores from 0.352 to 0.450, 0.558, and 0.786, and regression scores from 0.338 to 0.395, 0.642, and 0.811 in the 20-dataset analysis subset.
- Adding numerical ranges and quantiles to feature-name verbalizations improves normalized scores over names alone. Adding quantile information beyond value-range bins yields only a small average gain.

## Limitations

- The benchmark is imbalanced toward regression and high-cardinality fields, while the model and motivating claim emphasize classification with free text. The classification result covers only 14 datasets.
- Normalized scores depend on the set of successfully executed models. TabPFN-v2, CARTE, and TabDPT fail or cannot scale on some datasets, so their reported averages use incomplete subsets.
- TabSTAR does not lead on regression, and it has not been extensively evaluated in few-shot or purely numerical settings.
- Training is considerably slower than untuned tree and MLP baselines. The comparison changes when conventional models receive extensive tuning, but that does not remove TabSTAR's absolute training cost.
- Cross-feature attention grows quadratically with the number of feature and target tokens. GPU use rises sharply on wide tables, and classification memory also grows with the number of classes.
- The model truncates individual text fields beyond the encoder's 512-token context window. Column-type detection and feature subsampling also rely on heuristics rather than learned task-aware selection.
- The source reports careful deduplication and benchmark-specific withheld variants, but semantic leakage from the pretrained language encoder remains possible and is not fully measurable.

## Related Concepts

- [[concepts/tabular-foundation-models|Tabular Foundation Models]]
- [[concepts/variable-column-tabular-learning|Variable-Column Tabular Learning]]
- Transfer learning
- Multimodal tabular learning
- Parameter-efficient fine-tuning

## Related Papers

- [[papers/transtab-learning-transferable-tabular-transformers-across-tables|TransTab: Learning Transferable Tabular Transformers Across Tables]]: uses column descriptions to transfer across schemas, but does not jointly adapt rich textual representations to each downstream target.
- [[papers/tabicl-a-tabular-foundation-model-for-in-context-learning-on-large-data|TabICL: A Tabular Foundation Model for In-Context Learning on Large Data]]: scales prior-data-fitted in-context classification by compressing columns before dataset-wise attention.
- Hollmann et al. (2025), "Accurate Predictions on Small Data with a Tabular Foundation Model": presents TabPFN-v2, the principal prior-data-fitted comparator.
- Kim, Grinsztajn, and Varoquaux (2024), "CARTE: Pretraining and Transfer for Tabular Learning": represents tables as star-shaped graphs and transfers through semantic feature representations.
- Yan et al. (2023), "Making Pre-trained Language Models Great on Tabular Prediction": introduces TP-BERTa and relative-magnitude tokenization for numerical features.

[[index|Library home]]
