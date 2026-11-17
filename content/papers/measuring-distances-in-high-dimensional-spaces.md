---
title: "Measuring Distances in High Dimensional Spaces: Why Average Group Vector Comparisons Exhibit Bias, And What to Do about It"
type: paper
authors:
  - Breanna Green
  - William Hobbs
  - Sofia Avila
  - Pedro L. Rodriguez
  - Arthur Spirling
  - Brandon M. Stewart
year: 2025
doi: 10.1017/pan.2024.22
tags:
  - political-methodology
  - word-embeddings
  - finite-sample-bias
  - statistical-inference
---

## TL;DR

Distances between estimated group vectors confound substantive differences with estimation uncertainty. Subtracting the sum of coordinate estimation variances yields an unbiased squared Euclidean distance when both coefficient and variance estimators are unbiased. Group imbalance can distort relative comparisons even in large samples; correcting point estimates does not solve confidence-interval coverage.

## Research Question

How can researchers compare group-average embeddings without mistaking unequal estimation uncertainty for substantive distance?

## Motivation

Squaring noisy coordinate differences produces positive expected distances even when population vectors coincide. Small groups and imbalanced comparisons have greater uncertainty, making their apparent differences larger. Increasing total sample size reduces absolute bias but need not eliminate its relative distortion across balanced and imbalanced comparisons.

## Contributions

- Derives the additive variance bias in squared Euclidean distances between estimated vectors.
- Provides a variance-subtraction estimator for group differences and embedding-regression coefficients.
- Demonstrates correction in simulations and Twitter data with clustering and covariates.
- Separates unbiased point estimation, permutation testing, and the unresolved difficulty of interval coverage near zero.

## Method

For an unbiased estimate of a vector difference or regression coefficient $\beta$, the identity is

$$
E\|\hat\beta\|_2^2=\|\beta\|_2^2+\sum_{k=1}^K\operatorname{Var}(\hat\beta_k).
$$

The [[concepts/variance-corrected-squared-euclidean-distance|Variance-Corrected Squared Euclidean Distance]] estimator is

$$
\hat Q=\sum_{k=1}^K\left(\hat\beta_k^2-\widehat{\operatorname{Var}}(\hat\beta_k)\right).
$$

For embedding regression, fit one linear regression per embedding coordinate and subtract squared standard errors from squared coefficients before summing. Variances concern the sampling distribution of estimates, not the raw dispersion of embeddings. Sandwich-style estimators accommodate clustering and complex designs when appropriate to the sampling structure.

A signed square root, $\operatorname{sgn}(\hat Q)\sqrt{|\hat Q|}$, reduces ordinary Euclidean-distance bias but is not unbiased and can be strongly bimodal near zero. The paper reports that related cosine-similarity corrections also retain bias and problematic near-null distributions. Negative corrected squared estimates are possible despite a nonnegative population target.

## Experiments

- **Random-group Twitter comparison (Figure 1):** Embeddings of “children,” with one tweet per sampled user and one occurrence per tweet, compare 50:50 and 90:10 random splits. Total samples range from 200 to 10,000 occurrences. True group differences are zero by random assignment; imbalance inflates apparent distances, with relative distortion persisting as absolute distances shrink.
- **Synthetic embeddings (Figure 2):** Multivariate-normal vectors have 50 dimensions, offsets in 25 dimensions, and heterogeneous coordinate variances drawn from a noncentral chi-squared distribution with one degree of freedom and noncentrality 1. Balanced and 10:90 comparisons show corrected squared norms recovering the target on average. The reported ordinary-norm correction has small negative bias.
- **Clustering and controls (Figure 3):** The “people” analysis covers 72,389 users and 5.5 million tweets from January 2019 to February 2023. For each sample size, 500 user subsamples fit embedding regressions with party, age group, gender, and race, weighting users equally. Corrected party distances track the full-sample benchmark, but sampling distributions remain wide.
- **Supplementary findings reported in the main text:** Clustered and residual permutation methods control Type I error in the studied clustering and covariate settings. Jackknife intervals outperform bootstrap intervals, but still over-cover near zero. The supplied Markdown does not include the supplementary analyses themselves.

## Limitations

Unbiasedness depends on unbiased coefficient and variance estimates; incorrect treatment of dependence undermines the correction. Corrected distances can remain imprecise, requiring substantial samples or effects. Ordinary distance and cosine corrections are not exactly unbiased. Bootstrap confidence intervals over-cover, particularly for small effects, and the recommended jackknife does not fully resolve this problem. Raw Twitter text cannot be redistributed, limiting replication to available materials and aggregated outputs. The text describes conText integration but uses mixed present and future wording about software availability.

## Related Concepts

- [[concepts/variance-corrected-squared-euclidean-distance|Variance-Corrected Squared Euclidean Distance]]: The paper's central point-estimation correction.
- [[concepts/text-embedding-models|Text Embedding Models]]: Group-average word representations supply the applied vectors.
- [[concepts/permutation-based-null-calibration|Permutation-Based Null Calibration]]: Design-aware null testing addresses a different question from estimating population distance.

## Related Papers

- Rodriguez, Spirling, and Stewart (2023), “Embedding Regression: Models for Context-Specific Description and Inference”: The cited embedding-regression framework used in the application.
- Dodd and Korn (2007), “The Bootstrap Variance of the Square of a Sample Mean”: The cited explanation for bootstrap difficulties with squared estimates.
- [[papers/the-earth-moves-but-so-does-the-bias-systematic-upward-bias-of-the-wasserstein-earth-movers-distance-and-permutation-based-null-calibration|The Earth Moves, But So Does the Bias]]: A thematic library connection on sampling-induced distance inflation. Its Wasserstein permutation calibration has a different target from unbiased estimation of a squared vector norm; it is not a citation in this paper.
