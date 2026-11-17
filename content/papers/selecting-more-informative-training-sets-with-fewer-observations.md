---
title: Selecting More Informative Training Sets with Fewer Observations
type: paper
authors:
  - Aaron R. Kaufman
year: 2024
doi: 10.1017/pan.2023.19
tags:
  - text-as-data
  - training-set-selection
  - annotation-efficiency
---

## TL;DR

Selecting documents using their unlabeled representations can improve supervised text classification at a fixed annotation budget. Across executive orders and financial social-media posts, the strongest methods match random sampling with roughly one-third as many labels; no single method consistently wins.

## Research Question

Can unsupervised selection of documents for annotation improve predictive performance relative to random sampling and topic-model-based experimental design?

## Motivation

Human annotation is a major expense in supervised political text analysis. Random samples can devote scarce labels to redundant documents; selecting a more informative subset may improve coverage before any labels are collected.

## Contributions

- Evaluates 57 training-set selection approaches using alternative representations and subset-selection criteria.
- Measures both performance at fixed sample sizes and the sample sizes required for comparable performance.
- Provides replication resources and proposes unsupervised selection as an initialization for future active-learning workflows.

## Method

[[concepts/unsupervised-training-set-selection|Unsupervised Training Set Selection]] separates document representation from subset optimization. The study considers eight low-dimensional representations and seven selection methods, plus baselines. Representations include topic models, bag-of-words reductions, and neural embeddings. Selection seeks informative coverage of representation space without consulting outcome labels.

For each corpus, the experiment constructs ten 80/20 train/test splits and selects 50, 100, 250, 500, 750, 1,000, 1,500, 2,000, 2,500, or 3,000 training documents. Multinomial Naive Bayes models are evaluated using ROC AUC. Comparators are simple random sampling and Taddy's (2013) topic-model-based space-filling D-optimal design. Figure 1 reports mean AUC with bars of two standard errors.

## Experiments

| Application | Corpus | Main reported result |
| --- | --- | --- |
| Executive-order significance | 10,746 documents, binary significance labels | At 3,000 labels, the best method reaches 0.69 AUC versus 0.66 for random sampling and 0.67 for Taddy. A leading embedding approach exceeds 0.66 with fewer than 1,000 labels. |
| StockTwits sentiment | 6,264 posts, bullish/bearish labels | Leading methods with 1,000 labels match random sampling with 3,000; absolute gains are smaller than for executive orders. |

Method performance correlates at 0.88 across applications. Reconstruction loss is the strongest selection metric and BERT the strongest representation in the paper's aggregate comparisons, while a bag-of-words combination yields the greatest accuracy improvements. These rankings do not establish a universal best pairing.

The headline gain of up to 50% concerns improvement above a chance baseline, not a 50-percentage-point increase in AUC. The text calls the executive-order increase from 0.66 to 0.69 a 16% improvement above baseline; the displayed rounded values imply 18.75%, so the raw AUC values are the more reliable summary.

## Limitations

Evidence covers two binary classification applications and one downstream classifier. Improvements are strongest for longer, more formal executive orders. Extensions to multiclass outcomes, regression, audio, and images are proposals rather than demonstrated results. Label-count reductions translate into equivalent cost savings only under comparable per-document coding costs.

The supplied main text refers to supplementary tables for all method definitions, detailed scores, and runtimes; these are not included in the supplied Markdown. Its class-percentage strings are malformed and are not reproduced here. The study does not establish a single dominant selection method.

## Related Concepts

- [[concepts/unsupervised-training-set-selection|Unsupervised Training Set Selection]]: choosing informative examples before annotation.
- [[concepts/text-embedding-models|Text Embedding Models]]: representations supply the geometry used for selection.
- [[concepts/uniform-design-subsampling|Uniform Design Subsampling]]: related space-coverage objective, with distinct algorithms and theoretical scope.

## Related Papers

- [[papers/less-annotating-more-classifying|Less Annotating, More Classifying]]: addresses annotation scarcity through entailment-based transfer learning, complementing this paper’s selection of documents before labeling.

- Taddy (2013), “Measuring Political Sentiment on Twitter: Factor Optimal Design for Multinomial Inverse Regression”: the topic-model-based selection baseline.
- Miller, Linder, and Mebane (2020), “Active Learning Approaches for Labeling Text”: label-adaptive selection that the author proposes combining with unsupervised initialization.
- [[papers/multi-label-prediction-for-political-text-as-data|Multi-Label Prediction for Political Text-as-Data]]: a complementary approach that exploits label dependencies rather than changing which documents receive annotation.

Published in *Political Analysis* 32, 133–139 (2024); first published online 8 June 2023. [Article](https://doi.org/10.1017/pan.2023.19). [Replication resources](https://doi.org/10.7910/DVN/4ROL8S).
