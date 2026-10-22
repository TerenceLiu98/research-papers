---
title: Conditional Autoencoder Asset Pricing
type: concept
aliases:
  - Conditional Autoencoder Factor Models
  - Autoencoder Asset Pricing Models
tags:
  - asset-pricing
  - autoencoders
  - factor-models
  - conditional-models
---

## Overview

Conditional autoencoder asset pricing models use asset characteristics to learn time-varying factor exposures while jointly extracting latent factors from returns. Their distinguishing structure is asymmetric: a nonlinear network maps lagged characteristics into conditional betas, while the factor representation is constrained so its latent factors remain portfolios. The result extends linear conditional factor models such as IPCA without reducing the problem to unrestricted return prediction.

## Key Ideas

- **Condition exposures on characteristics.** A beta network represents $\beta(z_{i,t-1})$, allowing nonlinearities and interactions among firm characteristics rather than imposing a linear characteristic-loading map.
- **Keep factors economically interpretable.** A linear factor-side encoder makes each latent factor a portfolio return. Characteristic-managed portfolios can compress an unbalanced stock panel before factor extraction.
- **Nest linear models.** A one-layer linear autoencoder spans the same factor and loading spaces as PCA. With linear characteristic-dependent betas and managed-portfolio inputs, the conditional architecture connects to IPCA.
- **Separate risk explanation from unrestricted prediction.** Omitting an intercept forces predicted expected returns to operate through factor exposures and risk premia. Predictive performance can therefore be evaluated alongside pricing errors and contemporaneous return fit.
- **Use distinct out-of-sample criteria.** Total $R^2$ measures contemporaneous factor fit, while predictive $R^2$ uses lagged betas and historical factor premia. Better prediction need not imply better total fit.
- **Control flexibility chronologically.** Deeper beta networks can capture nonlinear loading functions but can also overfit. Training, validation, and test periods must respect time ordering, and simulation evidence should include both linear and nonlinear loading designs.

## Important Papers

- [[papers/autoencoder-asset-pricing-models|Autoencoder Asset Pricing Models]]: introduces the conditional autoencoder architecture and compares it with Fama-French models, PCA, and IPCA on individual US equities.
- Kelly, Pruitt, and Su (2019), "Characteristics Are Covariances: A Unified Model of Risk and Return": develops the linear characteristic-conditioned latent factor model and IPCA benchmark.
- Gu, Kelly, and Xiu (2019), "Empirical Asset Pricing via Machine Learning": provides a supervised return-prediction comparison without the same factor-pricing restriction.

## Related Concepts

- [[concepts/deep-neural-network-factor-models|Deep Neural Network Factor Models]]: models nonlinear responses to observed factors; conditional autoencoder asset pricing instead estimates latent portfolio factors and characteristic-dependent exposures jointly.
- Principal component analysis: the linear autoencoder special case for static latent factor estimation.
- Instrumented principal component analysis: the linear conditional-loading benchmark nested by the conditional autoencoder formulation under additional conditions.
- Characteristic-managed portfolios: dynamic portfolios used to compress the return panel and supply the factor-side inputs.
- No-arbitrage factor pricing: motivates excluding an intercept so expected-return differences are attributed to compensated factor exposures.
