---
title: "An Improved Method of Automated Nonparametric Content Analysis for Social Science"
type: paper
authors:
  - Connor T. Jerzak
  - Gary King
  - Anton Strezhnev
year: 2023
doi: "10.1017/pan.2021.36"
tags:
  - text-as-data
  - quantification
  - political-methodology
---

## TL;DR

Readme2 estimates document category proportions directly using continuous text features optimized for quantification and matching of labeled to unlabeled documents. Across 73 corpora and 18 evaluation protocols, the authors report substantial improvements over readme and other baselines; in the empirical chronological design, mean sum of absolute error falls by 34.3%, or 8.6 percentage points.

Published online on 7 January 2022; published in *Political Analysis* 31 (2023), 42–58. [Paper DOI](https://doi.org/10.1017/pan.2021.36).

## Research Question

How can nonparametric estimation of document category proportions remain accurate when language and category prevalence differ between labeled and unlabeled collections?

## Motivation

Individual classification accuracy does not guarantee accurate aggregate proportions: asymmetric classification errors need not cancel. Direct estimation targets the population quantity of interest, but the original readme method is sensitive to changes in category-conditional language, poorly distinguished categories, and finite-sample measurement error in textual features.

## Contributions

- Analyzes readme's consistency and approximate finite-sample bias, distinguishing category separation, feature distinctiveness, and proportion divergence.
- Learns low-dimensional continuous features for direct multicategory estimation.
- Adapts matching to prune labeled documents unlike the target collection, addressing vanishing discourse and reducing proportion divergence.
- Evaluates readme2 against 32 alternatives across 73 corpora and 18 designs.

## Method

Let $S^U$ contain mean features in the unlabeled set and $X^L$ contain labeled category-conditional feature means. The mixture identity is $S^U=X^U\pi^U$. Readme substitutes $X^L$ for the unobserved $X^U$ and estimates proportions by least squares, with a simplex-preserving modification available. Identification requires adequate rank and transportable conditional feature means; equality of category proportions across sets is unnecessary.

Readme2 summarizes 200-dimensional Twitter GloVe vectors using each document's 10th, 50th, and 90th percentiles, producing 600 features. It learns a linear projection to 20 features by jointly maximizing category distinctiveness and feature distinctiveness. The former separates category means; the latter encourages different patterns of category separation across features. Normalization and regularization control optimization.

Matching in the transformed feature space holds the unlabeled set fixed and prunes distant labeled documents. The method recomputes the representation and conditional feature matrix for estimation after matching. Its transportability condition concerns expected category-conditional features in the matched labeled subset, rather than the entire original labeled set. Matching is an adaptation of causal-inference preprocessing, not a causal effect estimator here.

## Experiments

The 73 corpora include Enron emails, immigration editorials, Clinton campaign blogs, Stanford Sentiment Treebank sentences, and 69 social-media collections. Baselines include classify-and-count, averaged classifier probabilities, readme, and other quantification methods adapted to multiple categories. The primary metric is sum of absolute category-proportion errors (SAE).

The paper reports 19,710 evaluations as $73\times15\times18$. Its empirical chronological analysis separately describes 50 repetitions per corpus, using 300 preceding documents for labeling and 300 following documents for evaluation. These counts describe different reported evaluation summaries and should not be conflated.

In that empirical design, readme2 lowers mean SAE relative to readme in every corpus, averaging a 34.3% relative reduction and an 8.6-percentage-point absolute reduction. Across evaluation designs, the reported average rank is 3.11, compared with 5.94 for the next-best algorithm. The paper reports outperforming its best classifier, a continuous-feature SVM, in 98.6% of corpora. These aggregate findings do not imply superiority on every individual split.

An embedding sensitivity analysis on the Clinton blogs finds corresponding learned features across alternative GloVe dimensions and training sources, with maximum absolute correlations above 0.60. This is a representation comparison on one corpus, not a comprehensive accuracy benchmark across embeddings.

## Limitations

Matching cannot recover entirely vanished category-specific discourse or reliably resolve emergent discourse without relevant labeled support. Pruning can itself introduce an emergent-discourse problem. Substantial language change may require new hand coding. Uninformative features, unreliable labels, incoherent categories, or embeddings trained on inappropriate text can destabilize estimation. Categories must be mutually exclusive and exhaustive. Raw text for the 69 additional collections is withheld for privacy; numerical representations are supplied instead.

## Related Concepts

- [[concepts/text-quantification|Text Quantification]]: the aggregate estimation task targeted directly by readme2.
- [[concepts/concept-drift-in-time-series|Concept Drift in Time Series]]: a related temporal-change problem; this paper focuses specifically on category-conditional language and changing discourse support.

## Related Papers

- Hopkins and King (2010), “A Method of Automated Nonparametric Content Analysis for Social Science”: the readme estimator extended here.
- King and Lu (2008), “Verbal Autopsy Methods with Multiple Causes of Death”: an earlier application of direct category-proportion estimation.
- [[papers/validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]: complementary attention to semantic validity in political text measurement, with latent positions rather than category prevalence as the target.

Software: [readme-software](https://github.com/iqss-research/readme-software). Replication data: [Harvard Dataverse](https://doi.org/10.7910/DVN/AVNZR6).
