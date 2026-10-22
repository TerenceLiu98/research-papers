---
title: Autoencoder Asset Pricing Models
type: paper
authors:
  - Shihao Gu
  - Bryan Kelly
  - Dacheng Xiu
year: 2020
tags:
  - asset-pricing
  - autoencoders
  - factor-models
  - machine-learning
---

## TL;DR

This paper develops a [[concepts/conditional-autoencoder-asset-pricing|Conditional Autoencoder Asset Pricing]] model in which firm characteristics enter a neural network for time-varying factor loadings, while latent factors remain portfolios of returns. On 1957-2016 US stock data, nonlinear conditional models improve out-of-sample return prediction and long-short portfolio Sharpe ratios relative to Fama-French, PCA, and linear IPCA benchmarks, although IPCA retains the highest total explanatory $R^2$ in the largest factor specifications.

## Research Question

Can a latent factor asset-pricing model learn nonlinear and interactive relationships between firm characteristics and conditional factor exposures while preserving a portfolio interpretation of factors and the no-arbitrage restriction?

## Motivation

Instrumented principal component analysis (IPCA) uses characteristics to estimate time-varying factor loadings but assumes that loadings are linear in those characteristics. Standard autoencoders allow nonlinear dimension reduction but do not use asset characteristics to guide it. The paper combines these ideas to model nonlinear conditional betas without abandoning a latent factor representation of returns.

## Contributions

- Introduces a two-sided architecture with a neural beta network mapping lagged firm characteristics to conditional loadings and a factor network extracting latent factors from returns.
- Keeps the factor network linear so that estimated factors remain portfolios, and replaces the unbalanced panel of individual returns with characteristic-managed portfolios to reduce dimensionality.
- Shows that PCA and IPCA arise as linear special cases of the autoencoder formulations.
- Omits an intercept so characteristic-based predictability must operate through compensated factor exposures, imposing the model's no-arbitrage restriction.
- Compares observable, static latent, linear conditional, and nonlinear conditional factor models using fully out-of-sample statistical and portfolio criteria.

## Method

The return model is

$$
r_{i,t}=\beta(z_{i,t-1})'f_t+u_{i,t},
$$

where a feedforward ReLU network maps lagged characteristics $z_{i,t-1}$ into $K$ conditional loadings. The factor side is restricted to one linear layer, making each $f_t$ a linear combination of portfolio returns rather than an unrestricted nonlinear code.

Instead of feeding roughly 30,000 individual-stock returns into the factor network, the model uses $P$ characteristic-managed portfolios. This reduces the parameter count, handles the unbalanced return panel, and connects the estimator to conditional factor models. Architectures $CA_0$ through $CA_3$ use zero through three hidden layers on the beta side, with one to six latent factors. The paper regularizes training with early stopping, dropout, batch normalization, ensembles, and Adam; hyperparameters are selected on a chronological validation sample.

The model is estimated on an expanding window. Initial training uses 1957-1974, validation uses 1975-1986, and testing begins in 1987 and ends in 2016. Models are refit annually, with the training window expanding and the 12-year validation window rolling forward.

## Experiments

The empirical panel contains monthly excess returns and 94 firm characteristics for nearly 30,000 US stocks over 60 years. Benchmarks include Fama-French observable-factor models, static latent factors estimated by PCA, and IPCA. Evaluation uses panel-level out-of-sample total $R^2$, predictive $R^2$, forecast-sorted decile spreads, factor tangency portfolios, pricing errors on 95 characteristic-managed portfolios, variable importance, and disjoint-stock robustness checks.

Key reported results include:

- Six-factor IPCA has the highest individual-stock total $R^2$ at 14.5%; one-hidden-layer $CA_1$ is close at 14.3%. Thus the nonlinear models do not dominate IPCA on contemporaneous fit.
- The best individual-stock predictive $R^2$ is 0.58% for six-factor $CA_2$, versus 0.30% for six-factor IPCA; PCA is negative for every factor count reported.
- Forecast-sorted $CA_2$ portfolios reach annualized Sharpe ratios of 2.63 equal-weighted and 1.53 value-weighted with six factors. The corresponding IPCA values are 2.25 and 0.96. These comparisons omit trading costs.
- With five factors, 8 of 95 managed portfolios have pricing-error t-statistics above 3 under $CA_2$, compared with 37 under Fama-French; the remaining significant $CA_2$ alphas are below seven basis points per month.
- Training $CA_2$ on stocks with odd versus even identifiers and testing on either disjoint half yields similar total and predictive $R^2$ and portfolio Sharpe ratios.
- In simulations, IPCA performs best when the true characteristic-loading map is sparse and linear. Shallow nonlinear autoencoders outperform it when the map contains squares, interactions, and sign effects, while deeper models can overfit.

## Limitations

- The main evidence comes from one US monthly-equity panel ending in 2016; it does not establish performance in other markets, frequencies, or later regimes.
- Portfolio Sharpe ratios do not account for turnover, transaction costs, shorting constraints, or other implementation frictions. The paper explicitly describes factor tangency portfolios as non-implementable comparisons.
- Results depend on a large architecture and tuning exercise, annual rather than monthly refitting, and the chosen characteristic-managed portfolio compression.
- Nonlinear models improve prediction but do not uniformly improve contemporaneous fit: IPCA leads total $R^2$, and simulations favor IPCA under a linear data-generating process.
- Variable-importance measures record the loss in total $R^2$ after zeroing one characteristic; correlated characteristics make these measures descriptive rather than causal.
- The supplied text reports an online date in 2020 but provides no DOI or other stable identifier.

## Related Concepts

- [[concepts/conditional-autoencoder-asset-pricing|Conditional Autoencoder Asset Pricing]]: the paper's combination of nonlinear characteristic-dependent betas and portfolio-valued latent factors.
- [[concepts/deep-neural-network-factor-models|Deep Neural Network Factor Models]]: a related family using neural nonlinearities with observed factors; this paper instead learns latent factors and conditions exposures on firm characteristics.
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]: another autoencoder family, aimed at sparse interpretable representations rather than conditional asset-pricing restrictions.

## Related Papers

- Kelly, Pruitt, and Su (2019), "Characteristics Are Covariances: A Unified Model of Risk and Return": supplies the linear IPCA benchmark that the conditional autoencoder generalizes.
- Gu, Kelly, and Xiu (2019), "Empirical Asset Pricing via Machine Learning": studies supervised stock-return prediction on the same data without imposing a factor risk-return structure.
- Kozak, Nagel, and Santosh (2018), "Interpreting Factor Models": extracts factors from anomaly-sorted portfolios and motivates comparison on individual stocks.
- [[papers/deep-learning-with-non-linear-factor-models-adaptability-and-avoidance-of-curse-of-dimensionality|Deep Learning with Non-Linear Factor Models: Adaptability and Avoidance of Curse of Dimensionality]]: estimates nonlinear responses to observed factors and focuses on covariance estimation rather than latent conditional exposures.

[[index|Library home]]
