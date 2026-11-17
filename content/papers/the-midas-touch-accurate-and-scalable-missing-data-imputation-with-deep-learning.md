---
title: "The MIDAS Touch: Accurate and Scalable Missing-Data Imputation with Deep Learning"
type: paper
authors:
  - Ranjit Lall
  - Thomas Robinson
year: 2022
doi: 10.1017/pan.2020.49
tags:
  - missing-data
  - multiple-imputation
  - deep-learning
---

## TL;DR

MIDAS uses denoising autoencoders with an observed-value reconstruction loss and stochastic dropout to generate multiple completed datasets from one trained network. The paper reports competitive statistical accuracy and substantial runtime gains on wide survey data, without eliminating the assumptions required for valid missing-data inference.

## Research Question

Can neural networks make multiple imputation accurate and computationally practical for large, mixed-type datasets with nonlinear relationships?

## Motivation

Conventional joint-normal and conditional imputation procedures can become slow or unstable as data grow wider and more complex. Restricting the imputation model or discarding incomplete observations can sacrifice information and distort substantive estimates.

## Contributions

- Repurposes denoising reconstruction for missing data while excluding genuinely missing entries from the training loss.
- Generates multiple imputations by sampling dropout-thinned versions of a single fitted network.
- Evaluates imputation accuracy, downstream regression estimates, and row- and column-wise scalability, and supplies MIDASpy and rMIDAS software.

## Method

Categorical variables are one-hot encoded, continuous variables rescaled to [0, 1], and missing values temporarily set to zero while their locations are retained in a mask. Training repeatedly corrupts inputs and applies hidden-layer dropout. The loss measures reconstruction only where original values are observed, so placeholder zeros are not treated as ground truth. Continuous outputs use identity activation and RMSE; binary and categorical outputs use logistic or softmax activation and cross-entropy.

After training, repeated stochastic passes generate predictions for missing entries; observed values remain intact. Each completed dataset can be analyzed separately and estimates pooled using [[concepts/multiple-imputation|Multiple Imputation]]. The paper motivates dropout through a Bayesian variational interpretation, rather than proving universally calibrated uncertainty for every application. Its core representation is a [[concepts/denoising-autoencoders|Denoising Autoencoder]] (§2).

## Experiments

- **Gaussian simulations (§3.1–3.2):** In the MAR-1 experiment, 100 datasets have 500 rows and five variables. MIDAS and Amelia recover similar coefficient densities, whereas listwise deletion is biased. A second experiment uses 1,000 datasets of 1,000 rows and eight variables; MIDAS performs favorably on imputation RMSE, coefficient distance, and fitted-value accuracy under moderate and strong correlations.
- **Adult census data (§3.3):** Tests use 48,842 individuals and 15 characteristics with induced MCAR, MAR, and MNAR missingness. Continuous-variable RMSE is approximately 30% lower than the next best method, mi. Categorical gains are smaller; Amelia and mi perform best under MNAR. Amelia requires a ridge prior, and mi uses reduced iteration limits, which qualify comparisons.
- **Width scaling (§4.1):** CCES samples contain 30,421 rows and 25–400 effective columns, with 50% MCAR missingness in treated columns. For ten completed datasets, MIDAS is about three times faster than Amelia at 200 columns and twelve times faster at 400. Fitted runtime trends are linear for MIDAS and quadratic for Amelia; the full-survey runtime comparison is an extrapolation.
- **Row scaling (§4.2):** Samples span 5,000–500,000 rows and 22 variables with 30% MCAR missingness in treated columns. At 500,000 rows, MIDAS is about three times faster than norm and 25% faster than Amelia. Amelia requires a ridge prior and still fails in 16 of 60 iterations.
- **Ideology application (§5):** Imputation with 163 demographic and socioeconomic variables recovers ideology estimates for over 10,000 additional CCES respondents. The estimated distribution peaks near the center rather than the liberal end. Presidential-approval regressions have adjusted R² of 0.616 using MIDAS-based latent ideology versus 0.506 using self-reports; the samples also differ (60,000 versus 48,713), so this is not an isolated comparison of imputation methods.

## Limitations

MNAR missingness can still induce bias. Hyperparameter misspecification, overfitting, sparse observations, and very small datasets can impair performance. Multilevel, spatial, and nonexchangeable structures are not automatically handled correctly. Overimputation diagnostics and an optional variational-autoencoder comparison can reveal some problems but cannot guarantee validity (§6). The supplied text references online appendices; their additional results were not independently inspected.

## Related Concepts

- [[concepts/multiple-imputation|Multiple Imputation]]: separates completion, substantive analysis, and uncertainty pooling.
- [[concepts/denoising-autoencoders|Denoising Autoencoders]]: learns reconstruction from artificial corruption; MIDAS adapts the objective to genuine missingness.

## Related Papers

- Gondara and Wang (2018), *Mida: Multiple Imputation Using Denoising Autoencoders*: earlier approach discussed by the authors; MIDAS distinguishes observed targets from initial fills and samples one trained network.
- Gal and Ghahramani (2016), *Dropout as a Bayesian Approximation*: theoretical motivation for stochastic dropout draws.
- [[papers/transport-analysis-of-infinitely-deep-neural-network|Transport Analysis of Infinitely Deep Neural Network]]: a complementary theoretical treatment of denoising reconstruction, rather than a missing-data benchmark.

Published in *Political Analysis* 30, 179–196 (2022); first published online February 26, 2021. [Article](https://doi.org/10.1017/pan.2020.49). [Replication materials](https://doi.org/10.7910/DVN/UPL4TT).
