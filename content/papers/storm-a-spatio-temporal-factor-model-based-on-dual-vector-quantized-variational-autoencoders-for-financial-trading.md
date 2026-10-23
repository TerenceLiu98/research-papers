---
title: "STORM: A Spatio-Temporal Factor Model Based on Dual Vector Quantized Variational Autoencoders for Financial Trading"
type: paper
authors:
  - Yilei Zhao
  - Yong Jiang
  - Wentao Zhang
  - Fei Huang
  - Tingran Yang
  - Wei Yang Bryan Lim
year: 2026
doi: 10.1145/3773966.3777972
tags:
  - factor-models
  - vector-quantization
  - financial-trading
  - time-series
---

## TL;DR

STORM is a [[concepts/vector-quantized-latent-factor-models|vector-quantized latent factor model]] that jointly encodes each stock's temporal history and same-day cross-sectional relations among stocks. Dual VQ-VAE streams, cross-attention, contrastive alignment, and a prior-posterior return model produce multidimensional factors for return prediction, portfolio construction, and single-stock trading. On the reported DJ30 and S&P 500 experiments, STORM leads the tested baselines on RankIC and RankICIR and on most portfolio and trading return measures, although it does not uniformly minimize drawdown or volatility.

## Research Question

Can a latent financial factor model combine time-series and cross-sectional market structure, use discrete representations to distinguish and select factors, and transfer the resulting embeddings across return prediction, portfolio management, and algorithmic trading?

## Motivation

Earlier VAE factor models mainly learn cross-sectional structure and commonly represent factors as scalar continuous latents. The authors argue that this misses the temporal evolution of individual stocks, leaves continuous representations vulnerable to market noise, and provides weak separation among correlated factors. STORM instead treats factors as vector embeddings and quantizes them against learned codebooks so that factor categories can be selected explicitly.

## Contributions

- Introduces parallel time-series and cross-sectional VQ-VAE branches with different patching directions over a stock-by-time feature tensor.
- Fuses the two views with cross-attention and aligns them semantically with contrastive learning before return prediction.
- Adds codebook diversity and orthogonality objectives intended to distribute usage across factor categories and reduce redundant representations.
- Uses the same learned representation for cross-sectional return prediction, TopK-Drop portfolio management, and PPO-based single-stock trading.
- Evaluates factor quality and investment outcomes on daily US equity data spanning April 2008 through March 2024.

## Method

The input is a window of open, high, low, and close prices plus Alpha158 technical indicators for multiple stocks. The time-series branch forms one patch per stock across the observation window; the cross-sectional branch forms one patch per day across stocks. Transformer encoders map both views to continuous features, which are replaced by their nearest entries in separate learned codebooks. Transformer decoders reconstruct the input.

Training combines reconstruction and VQ commitment terms with two codebook regularizers. An entropy-based diversity loss encourages balanced use of codebook entries, while a Frobenius-norm orthogonality loss penalizes similarity among normalized entries. Cross-attention exchanges information between the temporal and cross-sectional streams, and a contrastive objective aligns their representations of similar market conditions.

Quantized codebook embeddings are appended as class-like tokens to the continuous features. A posterior network uses the representation and realized future returns during training; a prior network predicts the factor-return distribution from the representation alone at inference. The return decoder follows a factor form with intercepts, factor exposures, vector factor returns, and residual noise. Predicted returns feed a TopK-Drop portfolio rule, while single-stock trading augments a PPO agent's state with the learned factor embeddings.

## Experiments

Daily DJ30 and S&P 500 data are split chronologically: April 2008-March 2021 for training and April 2021-March 2024 for testing. Return prediction is compared with LightGBM, LSTM, Transformer, CAFactor, FactorVAE, and HireVAE. Portfolio tests add a market index comparison; trading tests on AAPL, JPM, IBM, INTC, and MSFT compare buy-and-hold, supervised models, DQN, SAC, and PPO. Metrics cover RankIC and RankICIR, annualized return and volatility, cumulative wealth, maximum drawdown, Sharpe ratio, and Calmar ratio.

Reported results include:

- On S&P 500, STORM reports RankIC 0.062 and RankICIR 0.673; the strongest baseline values are 0.057 and 0.558. On DJ30, STORM reports 0.065 and 0.668 versus strongest baseline values of 0.058 and 0.563.
- Portfolio APY is 0.188 on S&P 500 and 0.148 on DJ30, compared with best baseline values of 0.079 and 0.076. STORM also reports the best values among tested methods for cumulative wealth, Calmar ratio, Sharpe ratio, maximum drawdown, and annualized volatility on both portfolio datasets.
- In single-stock trading, STORM reports the highest APY on all five stocks. It does not uniformly lead risk metrics: variants or baselines achieve lower maximum drawdown or volatility for some stocks, including INTC and MSFT.
- Removing either temporal or cross-sectional encoding reduces average RankIC by 16.50% and RankICIR by 23.79% relative to the full model, as reported by the authors.
- A codebook-size study over 128, 256, 512, 1024, and 2048 entries reports the best overall DJ30 prediction performance at 512. The index-frequency plot is described as relatively even, but no scalar utilization statistic is supplied.

## Limitations

- The evidence is limited to two overlapping US equity universes and five constituent stocks, with one chronological split ending in March 2024. It does not establish transfer to other countries or asset classes.
- Investment results come from backtests. The portfolio setup constrains turnover, but the supplied text does not report a full sensitivity analysis for transaction costs, slippage, market impact, or liquidity.
- Factors are high-dimensional learned vectors rather than economically named quantities. Codebook indices make selection explicit but do not by themselves provide an economic interpretation.
- Orthogonality and balanced code usage are optimization goals, not proof that the factors are statistically independent or causally distinct.
- STORM does not dominate every trading risk measure; the paper specifically notes weaker maximum-drawdown and volatility results for INTC and MSFT.
- The ablations establish that both branches help within this architecture, but they do not isolate the effects of quantization, contrastive alignment, cross-attention, diversity loss, and orthogonality loss individually.

## Related Concepts

- [[concepts/vector-quantized-latent-factor-models|Vector-Quantized Latent Factor Models]]: the model family formed by discretizing learned financial factor embeddings with a codebook.
- [[concepts/conditional-autoencoder-asset-pricing|Conditional Autoencoder Asset Pricing]]: an earlier neural latent-factor approach that conditions exposures on firm characteristics while retaining portfolio-valued factors.
- [[concepts/deep-neural-network-factor-models|Deep Neural Network Factor Models]]: a broader family using neural networks to model nonlinear relationships between factors and asset returns.
- [[concepts/latent-space-time-series-forecasting|Latent-Space Time-Series Forecasting]]: related representation learning that predicts in or through a learned temporal latent space.

## Related Papers

- [[papers/autoencoder-asset-pricing-models|Autoencoder Asset Pricing Models]]: the conditional autoencoder baseline cited as CAFactor; it learns characteristic-dependent exposures and latent portfolio factors.
- Van den Oord, Vinyals, et al. (2017), "Neural Discrete Representation Learning": introduces VQ-VAE and its learned discrete codebook.
- Duan et al. (2022), "FactorVAE: A Probabilistic Dynamic Factor Model Based on Variational Autoencoder for Predicting Cross-Sectional Stock Returns": the principal VAE factor-model baseline.
- Wei et al. (2023), "HireVAE: An Online and Adaptive Factor Model Based on Hierarchical and Regime-Switch VAE": an adaptive hierarchical VAE baseline.
- Talukder, Yue, and Gkioxari (2024), "TOTEM: Tokenized Time Series Embeddings for General Time Series Analysis": applies vector quantization to general time-series representations.

[[index|Library home]]
