---
title: Cross-Domain Topic Classification for Political Texts
type: paper
authors:
  - Moritz Osnabrügge
  - Elliott Ash
  - Massimo Morelli
year: 2023
doi: "10.1017/pan.2021.37"
source_job_id: "85dbd8d2-87a7-45fd-b8a7-3d7b6e1e0d0e"
tags:
  - political-text-analysis
  - topic-classification
  - transfer-learning
---

## TL;DR

A classifier trained on annotated party manifestos transfers topic labels to parliamentary speeches, reducing training annotation costs but retaining a need for target-domain validation. New Zealand speech accuracy is 41.0% for 44 topics and 50.7% for eight broad topics; substantial topic-level variation makes aggregate accuracy insufficient for choosing substantive measures.

## Research Question

When can existing manifesto annotations support reliable topic measurement in parliamentary speeches, and how can researchers diagnose which topics transfer?

## Motivation

Within-domain classifiers require new training labels, while unsupervised topics need not match a researcher's theoretical categories. Reusing a labeled political corpus provides interpretable categories at lower annotation cost, provided those categories and their linguistic expression remain appropriate in the target domain.

## Contributions

- Evaluates manifesto-to-speech transfer with an independently annotated target sample and topic-specific metrics.
- Introduces feature congruence and source-domain accuracy as preliminary diagnostics for transfer quality.
- Illustrates substantive applications to electoral reform and gender differences in parliamentary speech topics.

## Method

The source comprises 115,410 English-language manifesto statements from six countries. Opposite directional codes are merged into 44 topic categories; a second specification uses eight broad categories. Stopwords, punctuation, and capitalization are removed, and unigram through trigram TF-IDF features produce 19,734 columns. Terms occurring in fewer than ten documents or more than 40% of documents are excluded.

Regularized multinomial logistic regression uses a 75/25 train/test split and threefold training-set cross-validation. Both specifications select inverse regularization strength 2 and no class weighting. For target prediction, the classifiers are retrained on all source statements, retaining the source vocabulary and document frequencies.

The target contains 290,456 New Zealand parliamentary speeches from 1987–2002. An expert annotates 4,165 randomly sampled speeches using manifesto categories, without speaker or date metadata. Three additional coders label a common 250-speech subsample; a US coder labels 150 congressional speeches for an additional transfer check.

Feature congruence is the Pearson correlation across phrases between source- and target-corpus feature-importance t-statistics. These come from bivariate regressions relating predicted topic probabilities to phrase frequencies. It diagnoses whether predictions rely on similar language across corpora, without requiring target labels.

## Experiments

Table 2 reports:

| Metric | Source: 44 topics | Target: 44 topics | Source: 8 topics | Target: 8 topics |
| --- | --- | --- | --- | --- |
| Top-1 accuracy | 0.538 | 0.410 | 0.641 | 0.507 |
| Top-3 accuracy | 0.766 | 0.650 | 0.909 | 0.816 |
| Top-5 accuracy | 0.841 | 0.747 | 0.975 | 0.916 |
| Balanced accuracy | 0.388 | 0.265 | 0.504 | 0.451 |
| Macro-F1 | 0.417 | 0.261 | 0.523 | 0.450 |

Education transfers well (recall 0.746), as do law and order (0.715) and welfare state expansion (0.685). Constitutionalism reaches only 0.012; ten represented narrow topics have zero recall. Source and target topic accuracies correlate at 0.79. Feature congruence correlates with target top-3 accuracy at 0.70. Restricting analysis to topics above the median on both source top-3 accuracy and congruence raises target top-3 balanced accuracy from 0.47 to 0.68, changing the set of measured topics rather than improving all classes.

US speech top-1 accuracy is 0.440 for 44 topics and 0.520 for eight topics. Additional coder checks yield broadly similar classifier performance across coders.

In the electoral-reform application, average predicted political-authority probability rises by about 0.03 from a prereform baseline of 0.13. Gender comparisons associate women's speeches more with welfare and men's more with external relations. These are applications of the inferred measures, not separate tests of their validity.

## Limitations

Transfer quality varies sharply by topic, particularly for rare or semantically overlapping categories. Source labels constrain which research questions can be measured. Feature congruence is a diagnostic based on model outputs, not independent ground truth; the authors recommend hand-labeling a target subset. The classifier does not explicitly adapt to source–target distribution differences. Speech-level annotations also differ in granularity from source statements. Multilingual transfer is proposed but not evaluated. The supplied Markdown references an Online Appendix whose contents are not included.

## Related Concepts

- [[concepts/cross-domain-topic-classification|Cross-Domain Topic Classification]]: transfers an existing topic taxonomy across document genres while requiring target-specific validation.

## Related Papers

- [[papers/topic-classification-for-political-texts-with-pretrained-language-models|Topic Classification for Political Texts with Pretrained Language Models]]: subsequently uses labeled target speeches to fine-tune RoBERTa and compares it with this cross-domain baseline; its test allocation differs.

Published in *Political Analysis* 31: 59–80 (2023); first published online 21 October 2021. [Article](https://doi.org/10.1017/pan.2021.37). Replication: [Code Ocean](https://doi.org/10.24433/CO.2554396.v1) and [Harvard Dataverse](https://doi.org/10.7910/DVN/CHTWUB).
