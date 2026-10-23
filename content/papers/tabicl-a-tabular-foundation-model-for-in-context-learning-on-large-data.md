---
title: "TabICL: A Tabular Foundation Model for In-Context Learning on Large Data"
type: paper
authors:
  - Jingang Qu
  - David Holzmuller
  - Gael Varoquaux
  - Marine Le Morvan
year: null
source_job_id: "67c5e553-7556-47e9-b50e-7ee7fb14d47c"
tags:
  - tabular-foundation-models
  - in-context-learning
  - tabular-classification
  - synthetic-data
---

## TL;DR

TabICL scales [[concepts/in-context-learning|In-Context Learning]] for tabular classification by first compressing every row into a fixed-dimensional representation and then applying dataset-wise attention over those row tokens. On the TALENT benchmark, it matches TabPFNv2 on medium-sized datasets while running faster, and it ranks ahead of TabPFNv2 and CatBoost on the 53 datasets with more than 10,000 samples. The design handles up to 500,000 samples and 500 features in the paper's memory experiments, but remains classification-only and sacrifices exact column-permutation invariance.

## Research Question

Can a [[concepts/tabular-foundation-models|Tabular Foundation Model]] preserve the predictive advantages of in-context learning while scaling beyond the small and medium tables supported by alternating row-column attention?

## Motivation

TabPFN-style models predict a new table in one forward pass without task-specific parameter updates, but alternating attention over both samples and features incurs a term proportional to the product of the number of features and squared sample count. This becomes costly on industrial-scale tables. TabICL seeks a transferable representation that removes the feature dimension before dataset-level in-context learning while retaining information about feature distributions and within-row interactions.

## Contributions

- Introduces a column-then-row encoder that maps variable-size tables to fixed-dimensional row tokens before dataset-wise in-context learning.
- Treats numerical feature embedding as a set-input problem and uses induced attention to derive cell-specific weights and biases from each column's empirical distribution.
- Extends synthetic pretraining with tree-based structural causal models, a broader family of nonlinear mechanisms, and a three-stage curriculum reaching 60,000 samples per synthetic dataset.
- Adds memory-aware batching, optional activation offloading, and hierarchical decomposition for classification problems with more than ten classes.
- Evaluates the model across 200 TALENT classification datasets, including 53 datasets with more than 10,000 samples.

## Method

### Column-Then-Row Encoding

For each feature, a shared Set Transformer processes its values as a permutation-invariant set. Induced self-attention with 128 learned inducing vectors has linear complexity in the sample count and produces a weight and bias for every cell. Only training samples supply keys and values when constructing the induced representations, preventing test values from leaking into the learned column summary.

A three-layer row transformer then models interactions among the embedded features. Four learned `[CLS]` tokens aggregate each row into a 512-dimensional vector. Rotary positional encoding distinguishes columns with similar distributions and mitigates representation collapse, but introduces sensitivity to column order. At inference, an ensemble over shuffled columns approximately restores permutation invariance.

### Dataset-Wise In-Context Learning

Labels enter only after row encoding. One-hot training labels are embedded and added to the corresponding row vectors; a 12-layer transformer lets training rows attend to one another while test rows attend only to training rows. A two-layer MLP maps test outputs to class probabilities. This late label fusion lets hierarchical classification subtasks reuse the same row representations.

For a table with $n$ rows and $m$ features, the stated complexity is

$$
O(m^2n+n^2),
$$

compared with $O(m^2n+n^2m)$ for TabPFNv2. The reduction comes from collapsing the feature dimension before the quadratic dataset-level attention.

### Synthetic Pretraining and Inference

Seventy percent of synthetic tasks use neural structural causal models and 30% use tree-based models built with XGBoost mappings. The neural prior expands the activation family with nonmonotone, discontinuous, and random Fourier-feature functions. Curriculum learning progresses from 160,000 steps at 1,024 samples, through 2,000 steps with 1,000-40,000 samples, to 50 steps with 40,000-60,000 samples while updating only the ICL transformer in the last stage. Each step contains 512 datasets, with at most 100 features and ten classes.

Inference estimates the memory required by each transformer as a function of batch size and sequence length, adjusts batches accordingly, and can offload intermediate activations to CPU or disk. For more than ten classes, a tree recursively partitions classes into groups of at most ten and multiplies conditional probabilities along each root-to-leaf path.

## Experiments

The TALENT evaluation contains 200 binary and multiclass datasets. Fifteen datasets used during TabPFNv2 development are excluded from the main comparison, and the primary analysis covers 171 datasets with at most ten classes. Splits are 64% training, 16% validation, and 20% test. TabICL and TabPFNv2 train on the training split only and average 32 predictions over feature and class permutations and preprocessing variants; TabPFNv2 training context is capped at 30,000 samples, whereas TabICL uses the full training sets.

- TabICL and TabPFNv2 have statistically indistinguishable accuracy ranks on the primary benchmark and both rank well ahead of the other evaluated methods. TabICL also obtains the best median accuracy improvement relative to the tuned MLP baseline.
- Geometric-mean TabICL training-plus-inference time is 1.1 seconds per 1,000 samples. On a 10,000-sample, 100-feature table, the reported times are about 20 seconds for TabICL and 100 seconds for TabPFNv2; speedups rise from about 1.5 times on small datasets to 3-10 times on large ones.
- On the 53 datasets above 10,000 samples, TabICL ranks ahead of TabPFNv2 and CatBoost. Its performance remains strong as sample size grows, while TabPFNv2 can run out of memory above 30,000 samples without subsampling.
- TabICL and TabPFNv2 significantly outperform the accuracy-tuned competitors on log loss, with no significant difference between the two foundation models.
- On 12 datasets with more than ten classes, hierarchical classification gives TabICL the second-best mean normalized accuracy; TabPFNv2 does not natively support this setting.
- The pretraining curriculum improves TabICL's reported average rank from 11.4 after stage one to 7.46 after stage two and 6.95 after stage three, although some small datasets lose accuracy. Adding tree-based synthetic tasks also improves the ablation results.
- Memory experiments report about 5 GB of GPU memory for 100,000 samples and 500 features, and less than 14 GB for 500,000 samples and 500 features. The latter uses about 120 GB of CPU memory before optional disk offloading.

## Limitations

- TabICL supports classification only. The hierarchical extension broadens the number of classes but does not add regression.
- Rotary positional encoding prevents exact invariance to column permutations; prediction ensembling only approximates that property and adds inference cost.
- The architecture still has quadratic dataset-wise attention in the number of rows. Its practical scale depends on memory-aware batching and CPU or disk offloading, and foundation-model inference remains slower than a single conventional fitted model.
- The TALENT comparison is asymmetric: TabICL and TabPFNv2 use 32-member ensembles, while most baselines are single tuned models. Conversely, the foundation models do not use the validation split, and TabPFNv2 is subsampled on large datasets.
- Benchmark preprocessing uses mean imputation and does not explicitly provide categorical indicators to TabPFNv2. These choices may affect model rankings.
- Curriculum learning slightly reduces performance on some small datasets, and the three-class subset shows unexplained degradation that may reflect another correlated dataset property.
- Large-scale evidence is limited to the benchmark's datasets, which reach roughly 150,000 samples; the 500,000-sample claim is a resource demonstration rather than a predictive benchmark at that size.

## Related Concepts

- [[concepts/tabular-foundation-models|Tabular Foundation Models]]
- [[concepts/in-context-learning|In-Context Learning]]
- [[concepts/variable-column-tabular-learning|Variable-Column Tabular Learning]]
- Set Transformers
- Curriculum learning
- Hierarchical classification

## Related Papers

- Hollmann et al. (2022), "TabPFN: A Transformer That Solves Small Tabular Classification Problems in a Second": introduces prior-data fitted tabular classification through in-context learning.
- Hollmann et al. (2025), "Accurate Predictions on Small Data with a Tabular Foundation Model": presents TabPFNv2, the principal foundation-model comparator.
- Lee et al. (2019), "Set Transformer: A Framework for Attention-based Permutation-Invariant Neural Networks": supplies the induced set-attention mechanism used for column embedding.
- Ye et al. (2025), "A Closer Look at Deep Learning Methods on Tabular Datasets": introduces the TALENT benchmark used for evaluation.
- [[papers/transtab-learning-transferable-tabular-transformers-across-tables|TransTab: Learning Transferable Tabular Transformers Across Tables]]: learns transferable row representations across heterogeneous schemas using column semantics rather than distribution-aware cell embeddings.

[[index|Library home]]
