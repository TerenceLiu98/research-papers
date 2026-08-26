---
title: "TransTab: Learning Transferable Tabular Transformers Across Tables"
type: paper
authors:
  - Zifeng Wang
  - Jimeng Sun
year: 2022
arxiv: "2205.09328"
tags:
  - tabular-deep-learning
  - transfer-learning
  - transformers
  - contrastive-learning
---

## TL;DR

TransTab represents each row as a sequence built from column descriptions and cell values, allowing one transformer to accept tables with different column sets. Its [[Vertical-Partition Contrastive Learning]] objective supports self-supervised or label-aware pretraining across such tables. On five clinical-trial mortality datasets, the model ranked first among 12 methods in supervised and feature-incremental learning and averaged rank 1.78 in cross-table transfer; the gains were less consistent when pretraining across unrelated public datasets.

## Research Question

Can a tabular model learn a reusable row representation when training and test tables have only partially overlapping columns, and can that representation support incremental features, cross-table transfer, pretraining, and zero-shot inference without first forcing every table into a fixed schema?

## Motivation

Most tabular models bind features to fixed positions, so applying them across independently designed tables requires dropping unmatched columns, discarding samples, or rebuilding the model. This wastes data and prevents the kind of large-scale pretraining used in language and vision. The paper reframes a row as semantically described feature content rather than a vector whose meaning depends on a fixed column index, making [[Variable-Column Tabular Learning]] possible.

## Contributions

- Introduces an input processor that combines column descriptions with cell content and maps categorical, textual, binary, and numerical features into a shared token space.
- Adapts a transformer with token-wise gates so the model can select important feature tokens while encoding interactions among them.
- Proposes [[Vertical-Partition Contrastive Learning]] (VPCL), in both self-supervised and supervised forms, to learn representations from column subsets across heterogeneous tables.
- Evaluates four settings beyond conventional fixed-schema supervision: feature-incremental learning, transfer between partially overlapping tables, pretraining followed by fine-tuning, and zero-shot inference on unseen column subsets.

## Method

For categorical and textual features, TransTab concatenates the column name and cell value before tokenization. A true binary feature contributes its column description, while a false binary feature contributes no tokens, which is efficient for sparse inputs. A numerical value is multiplied by the token embedding of its column description rather than being represented as text. The resulting feature embeddings are normalized, projected into a shared space, concatenated with a `[CLS]` token, and passed to the encoder.

Each gated transformer layer applies multi-head self-attention followed by a learned sigmoid gate over tokens. The gated and linearly transformed attention outputs are combined, and the final `[CLS]` representation feeds either a prediction head or a contrastive projection head.

Self-supervised VPCL divides a row's columns into potentially overlapping vertical partitions. Partitions from the same row form positive pairs and partitions from other rows form negatives. Supervised VPCL instead treats partitions from rows with the same class label as positives. The partition construction exposes multiple feature subsets to the encoder and does not require task-specific pretraining heads.

## Experiments

The evaluation covers five de-identified oncology clinical-trial datasets and eight public binary-classification datasets. AUROC is averaged over 10 random seeds. Eleven baselines span linear and tree models, MLPs, tabular transformers, and self-supervised methods; TransTab is the twelfth method. The reported TransTab configuration uses two gated transformer layers, 128-dimensional embeddings, 256-dimensional intermediate layers, and eight attention heads.

In supervised learning on the five clinical-trial datasets, TransTab achieved the best AUROC on every dataset and an average rank of 1.00. Its public-dataset average rank was 3.00, showing competitive but not uniformly best conventional prediction. In feature-incremental learning, it used all three successive column sets and ranked 1.00 on the clinical datasets and 1.12 on the public datasets, whereas baselines had to retain only the original features or train only on the final subset.

For transfer between two subsets with 50% column overlap, TransTab averaged rank 1.78 on the clinical datasets and 2.33 on the public datasets. In the zero-shot protocol, the encoder trained on two column-disjoint subsets and predicted a third without adaptation; its average behavior exceeded training only on the smaller third subset, while fine-tuning on that subset remained strongest.

On the clinical datasets, self-supervised and supervised VPCL improved over the paper's supervised baseline in all five reported cases, while conventional supervised transfer reduced AUROC on two datasets. The abstract reports a 2.3% average AUC lift from pretraining over supervised learning. Results across unrelated public tables were much weaker: pretraining usually yielded few benefits, and several dataset-method combinations fell below the supervised baseline.

## Limitations

The evaluation is restricted to binary classification. Its zero-shot experiment uses synthetic, disjoint column partitions of the same source dataset, so it does not by itself establish zero-shot generalization between independently collected tables. The authors also find that pretraining on unrelated public tables often provides little benefit, leaving table relatedness and source selection unresolved.

Encoding descriptive column and category text can expose more semantic information than opaque indices, increasing privacy concerns; the paper suggests private machine-readable codebooks as a mitigation. TransTab also requires more computation than MLPs and trees because of tokenization and full self-attention. The proposed mitigations, pre-tokenization and replacing attention with cheaper gated blocks, are not evaluated in the reported experiments.

## Related Concepts

- [[Variable-Column Tabular Learning]]
- [[Vertical-Partition Contrastive Learning]]

## Related Papers

- Huang et al. (2020), "TabTransformer: Tabular Data Modeling Using Contextual Embeddings."
- Gorishniy et al. (2021), "Revisiting Deep Learning Models for Tabular Data."
- Ucar, Hajiramezanali, and Edwards (2021), "SubTab: Subsetting Features of Tabular Data for Self-Supervised Representation Learning."
- Bahri et al. (2022), "SCARF: Self-Supervised Contrastive Learning Using Random Feature Corruption."

[[index|Library home]]
