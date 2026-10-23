---
title: "Making Pre-trained Language Models Great on Tabular Prediction"
type: paper
authors:
  - Jiahuan Yan
  - Bo Zheng
  - Hongxia Xu
  - Yiheng Zhu
  - Danny Z. Chen
  - Jimeng Sun
  - Jian Wu
  - Jintai Chen
year: null
source_job_id: "326b181c-7165-4545-88fd-6b79f577c83d"
tags:
  - tabular-deep-learning
  - language-models
  - transfer-learning
  - numerical-embeddings
---

## TL;DR

TP-BERTa adapts RoBERTa for prediction across heterogeneous tables by representing continuous values with shared relative-magnitude tokens and compressing each feature name-value pair through intra-feature attention. After pretraining on 202 classification and regression datasets, task-specific pretrained variants rank ahead of the evaluated tabular neural networks and competitively with tuned gradient-boosted trees across 145 downstream datasets. The advantage is concentrated in tables with informative categorical semantics; purely numerical or semantically opaque tables remain a weak setting.

[[index|Library home]]

## Research Question

Can a pretrained language model transfer predictive knowledge across tables with different schemas while remaining sensitive to continuous numerical values and invariant to feature order?

## Motivation

Conventional tabular neural networks usually learn dataset-specific feature embeddings, which makes transfer difficult when columns change across tables. Language models offer a shared semantic space for feature names and categorical values, but ordinary text tokenization represents numbers poorly, full-row verbalization creates long sequences, and unrestricted attention can mix a feature name with unrelated values. TP-BERTa addresses these incompatibilities while targeting the medium-sized, low-dimensional regime where gradient-boosted decision trees are typically strong.

## Contributions

- Introduces relative magnitude tokenization (RMT), which uses target-aware, feature-specific C4.5 binning to map continuous values into shared magnitude tokens.
- Regularizes the magnitude-token embedding space with a triplet loss that places nearby bins closer than distant bins.
- Introduces intra-feature attention (IFA), a shared attention module that fuses each feature name and value before cross-feature processing.
- Removes positional encoding across the resulting feature vectors, yielding feature-order-invariant prediction with an input sequence proportional to the number of columns.
- Pretrains RoBERTa-based models across heterogeneous tables and evaluates transfer on 80 binary-classification and 65 regression datasets.

## Method

For every numerical column, TP-BERTa fits a C4.5-style supervised discretizer on the training split and maps a value to one of at most 256 feature-specific bins. Bin indices select embeddings from a vocabulary shared by all numerical features and datasets; the selected embedding is multiplied by the original scalar. A magnitude-aware triplet objective encourages embedding distance to reflect bin-index distance. Categorical and string values remain text tokens.

IFA prepends a `[CLS]` token to the tokens for one feature's name and value, applies a shared multi-head self-attention layer, and retains the resulting `[CLS]` vector as that feature's representation. Position information is used within the feature name but omitted from value vectors. The model then concatenates one vector per feature with a global `[CLS]` token and passes the sequence through RoBERTa without cross-feature positional encodings. This separates name-value matching from interactions among features and makes the latter insensitive to column order.

Pretraining begins from RoBERTa-base and shares the encoder, magnitude embeddings, and IFA across datasets while retaining dataset-specific prediction heads. The authors train separate binary-classification and regression models as well as a joint model. This is a supervised cross-table transfer approach related to [[concepts/tabular-foundation-models|Tabular Foundation Models]] and [[concepts/variable-column-tabular-learning|Variable-Column Tabular Learning]], rather than an in-context predictor.

## Experiments

The pretraining corpus contains 101 binary-classification and 101 regression datasets with about 10 million total rows. Pretraining datasets have at least 10,000 rows and at most 32 features; downstream datasets have fewer than 10,000 rows. Datasets with opaque feature names or categorical codes that could not be mapped to meaningful text were manually excluded. The downstream comparison covers 80 binary-classification and 65 regression datasets against XGBoost, CatBoost, MLP, AutoInt, DCNv2, TabNet, SAINT, FT-Transformer, TransTab, and XTab.

The separately pretrained TP-BERTa models achieve mean ranks of 5.8 for binary classification and 4.3 for regression, versus 6.2 and 4.5 for tuned XGBoost and 5.9 and 5.5 for tuned CatBoost. They rank more strongly as informative categorical features become more prominent, but on purely numerical datasets their mean ranks fall to 7.5 for classification and 4.8 for regression. The joint classification-regression model is consistently weaker than the task-specific variants.

Ablations use non-pretrained TP-BERTa initialized from RoBERTa and 80 binary-classification datasets. Replacing RMT with raw value strings lowers AUC by 12.45% on average over datasets changing by more than 0.5 percentage points; value-multiplied feature-name embeddings lower it by 3.44%. Removing IFA produces an average 4.17% AUC decline over significantly changed datasets and increases average training time by a factor of 1.32. Relative to the pretrained model, random and RoBERTa-only initialization are lower by 3.16% and 2.79% AUC, respectively, on significantly changed datasets. Reducing the maximum magnitude vocabulary from 256 to 128 or 32 also lowers average AUC, although some individual datasets prefer fewer bins.

## Limitations

- The method depends on meaningful feature names and categorical values. The evaluation excludes semantically opaque tables, limiting what it establishes for privacy-preserving encodings, specialized scientific descriptors, and poorly documented schemas.
- RMT uses supervised discretization, so each downstream numerical column still requires label-aware preprocessing and fitted bin boundaries.
- The reported advantage is weakest on purely numerical datasets, where numerical precision loss can favor gradient-boosted trees or FT-Transformer.
- The headline comparison mixes fixed default hyperparameters for TP-BERTa with tuned settings for many baselines. This reduces tuning cost for TP-BERTa but does not isolate architecture, pretraining, and search-budget effects.
- The numerical-encoding and IFA ablations use a non-pretrained model and only binary classification, so their measured effect sizes do not directly establish the contribution of each component after full cross-table pretraining or on regression.
- Pretraining is resource intensive: the classification, regression, and joint variants reportedly take 72, 98, and 143 hours on four A100 GPUs. The larger language-model parameter space also makes extensive downstream tuning costly.
- Joint pretraining underperforms task-specific pretraining, and the study does not resolve whether this follows from incompatible objectives, dataset-specific heads, or insufficient model capacity.
- The supplied manuscript does not provide a stable paper identifier, publication venue, or explicit publication year.

## Related Concepts

- [[concepts/tabular-foundation-models|Tabular Foundation Models]]: reusable predictors pretrained across many tabular tasks; TP-BERTa uses supervised cross-table fine-tuning rather than prior-fitted in-context inference.
- [[concepts/variable-column-tabular-learning|Variable-Column Tabular Learning]]: models that accept changing schemas by representing features through identities or semantic descriptions.
- Numerical feature embeddings: RMT represents relative, feature-local magnitude through a vocabulary shared across datasets.
- Permutation-invariant set modeling: TP-BERTa removes positional encoding between feature vectors after preserving token order within each feature name.

## Related Papers

- [[papers/transtab-learning-transferable-tabular-transformers-across-tables|TransTab: Learning Transferable Tabular Transformers Across Tables]]: transfers through semantic column representations and partially overlapping schemas, but scales numerical values through feature embeddings rather than dedicated magnitude tokens.
- [[papers/tabstar-a-tabular-foundation-model-for-tabular-data-with-text-fields|TabSTAR: A Tabular Foundation Model for Tabular Data with Text Fields]]: later combines semantic and numerical feature encoding with target-aware tokens and shared prediction heads.
- Zhu et al. (2023), "XTab: Cross-table Pretraining for Tabular Transformers": shares a transformer backbone while retaining dataset-specific featurizers.
- Gorishniy et al. (2021), "Revisiting Deep Learning Models for Tabular Data": introduces FT-Transformer, a principal deep tabular baseline and architectural reference point.
- Borisov et al. (2023), "Language Models Are Realistic Tabular Data Generators": verbalizes rows for language-model training and supplies the raw-number-string encoding compared in the ablation.
