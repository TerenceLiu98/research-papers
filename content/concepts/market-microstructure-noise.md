---
title: Market Microstructure Noise
type: concept
aliases:
  - High-Frequency Price Noise
  - Transaction Price Noise
tags:
  - financial-econometrics
  - high-frequency-finance
  - market-microstructure
  - measurement-error
---

## Overview

Market microstructure noise is the discrepancy between an observed transaction price and a latent efficient price caused by mechanisms such as bid-ask bounce, price discreteness, and trading frictions. In high-frequency volatility estimation it is commonly represented as measurement error, $Y_{t_i}=X_{t_i}+\epsilon_{t_i}$. Even small price-level noise can dominate very short-horizon returns because latent price increments shrink as sampling becomes finer while the noise scale need not.

## Key Ideas

- **Noise is differenced in returns:** An observed return contains $\epsilon_{t_{i+1}}-\epsilon_{t_i}$. Under iid noise with variance $E\epsilon^2$, summing squared returns introduces a leading bias of approximately $2nE\epsilon^2$.
- **More data can worsen a naive estimator:** Fine sampling reduces latent-price discretization error but accumulates additional noise terms. This reverses the noiseless prescription to sample as frequently as possible.
- **Sparse sampling is a bias-variance trade-off:** Coarser returns reduce noise bias but increase discretization variance and discard observations. The preferred frequency depends on noise magnitude and integrated quarticity.
- **The additive iid model is an approximation:** Actual microstructure effects can be serially dependent, endogenous to efficient-price innovations, irregularly timed, or heteroskedastic. Results derived under iid independent noise should not be transferred unchanged to those settings.
- **Noise variance is estimable at high frequency:** In the fixed-noise asymptotic model, full-grid [[concepts/realized-volatility|Realized Volatility]] divided by $2n$ consistently estimates $E\epsilon^2$, even though it fails to estimate integrated volatility.

## Important Papers

- Zhou (1996), "High-Frequency Data and Volatility in Foreign-Exchange Rates": proposes an autocovariance-based correction for high-frequency noise.
- Aït-Sahalia, Mykland, and Zhang (2005), "How Often to Sample a Continuous-Time Process in the Presence of Market Microstructure Noise": analyzes optimal sampling under noisy observations.
- [[papers/a-tale-of-two-time-scales-determining-integrated-volatility-with-noisy-high-frequency-data|A Tale of Two Time Scales]]: quantifies how additive noise swamps naive realized volatility and uses the full-grid statistic as a bias estimate.

## Related Concepts

- [[concepts/realized-volatility|Realized Volatility]]: the high-frequency estimator whose bias exposes the effect of microstructure noise.
- [[concepts/two-scale-realized-volatility|Two-Scale Realized Volatility]]: uses separate slow and fast grids to retain observations while correcting the leading noise bias.
- [[concepts/financial-market-stylized-facts|Financial Market Stylized Facts]]: recurring return patterns whose measurement can depend on sampling and trading mechanisms.
