---
title: Performance analysis of nowcasting of GDP growth when allowing for conditional heteroscedasticity and non-Gaussianity
type: paper
authors:
  - Farrukh Javed
  - Tamás Kiss
  - Pär Österholm
year: 2022
doi: 10.1080/00036846.2022.2075823
tags:
  - nowcasting
  - density-forecasting
  - time-series
---

## TL;DR

Across six developed economies, allowing GDP-growth volatility to change over time generally improves density nowcasts, while point-nowcast differences are small. Student-t innovations add less once GARCH dynamics are included; France is the main exception to the volatility result.

## Research Question

Do heavy tails in GDP growth require non-Gaussian innovations, or can conditional heteroscedasticity explain them, and which modeling choice improves nowcasts?

## Motivation

Policy decisions require probabilities of poor growth outcomes as well as conditional means. Heavy unconditional tails can arise from changing volatility even when conditional innovations are Gaussian, so unconditional nonnormality alone does not identify the appropriate error distribution.

## Contributions

- Compares constant and dynamic volatility crossed with Gaussian and Student-t innovations in a common AR(1) mean model.
- Separates in-sample tail evidence from out-of-sample point and density performance across six countries.
- Evaluates density calibration using probability integral transforms (PITs), histogram-based KL divergence, and KS and AD tests.

## Method

Conditional maximum likelihood estimates four specifications. The dynamic versions use [[concepts/garch-models|GARCH Models]]:

$$
g_t=\gamma_0+\gamma_1g_{t-1}+\varepsilon_t,\qquad
\varepsilon_t=\sigma_t\nu_t,\qquad
\sigma_t^2=\omega+\alpha\varepsilon_{t-1}^2+\beta\sigma_{t-1}^2.
$$

Innovations are Gaussian or Student-t; the other two specifications replace dynamic scale with a constant. Point predictions are evaluated using RMSE and Diebold–Mariano comparisons against the constant-variance Gaussian benchmark. For density predictions, the realized outcome is transformed through its predictive CDF, $z_t=F_t(g_t)$. Correct conditional densities imply iid uniform PITs. The reported KL, KS, and AD measures assess deviations from uniformity; marginal uniformity alone does not establish temporal independence.

## Experiments

Quarterly seasonally adjusted GDP growth comes from Australia, Canada, France, Japan, the United Kingdom, and the United States through Macrobond. Most samples span 1979Q3–2019Q3; Japan has a shorter sample. Expanding-window evaluation produces 100 nowcasts from 1994Q4 through 2019Q3, re-estimating each quarter. The models use lagged GDP rather than incoming monthly indicators.

In-sample Student-t degrees of freedom are between two and seven under constant volatility. Adding GARCH substantially weakens this tail evidence except in the United Kingdom and United States, whose estimated degrees of freedom remain 3.520 and 4.987. Japan's GARCH coefficient on lagged variance binds at zero, yielding an ARCH specification (Table 2).

Table 3 reports the following density-calibration KL divergences; smaller means a PIT histogram closer to uniform:

| Country | Constant Gaussian | Constant t | GARCH Gaussian | GARCH t |
| --- | ---: | ---: | ---: | ---: |
| Australia | 0.131 | 0.131 | 0.078 | 0.078 |
| Canada | 0.067 | 0.094 | 0.010 | 0.015 |
| France | 0.048 | 0.023 | 0.054 | 0.044 |
| Japan | 0.133 | 0.152 | 0.126 | 0.134 |
| United Kingdom | 0.267 | 0.273 | 0.081 | 0.073 |
| United States | 0.111 | 0.065 | 0.077 | 0.066 |

The clearest calibration improvements occur in Australia and the United Kingdom, where both GARCH variants pass the reported KS and AD thresholds while constant-volatility variants fail. Gains are not universal: Japan's GARCH-t KL slightly exceeds the Gaussian benchmark, and the U.S. constant-t model has the lowest KL. Japan still fails both uniformity tests under every model.

Point RMSE changes are small: Australian RMSE falls from 0.574 to 0.567 with GARCH, whereas U.S. RMSE rises from 0.552 to 0.561–0.564. The prose calls differences statistically insignificant, but Table 3 includes absolute DM statistics above 1.96, including 2.573 for Australia's constant-t model and −2.181 for the U.S. Gaussian GARCH model. Thus a blanket claim of statistical insignificance is not supported by the displayed statistics under the paper's stated standard-normal reference.

## Limitations

- Evidence concerns parsimonious univariate models, six developed economies, and a sample ending before COVID-19; it does not establish performance of richer real-time indicator systems.
- Predictive densities use estimated parameter values rather than integrating parameter uncertainty. Only 100 evaluation periods limit calibration-test power.
- Several footnotes and equations are damaged or absent in the supplied Markdown; Japan's precise sample start and data-vintage qualifications are not reconstructed.
- The prose also states that every U.S. model rejects both uniformity tests, but Table 3 gives Gaussian-GARCH AD = 2.282, below its stated 5% threshold of 2.492. The numerical table supports improvement without uniform failure or uniform success.

## Related Concepts

- [[concepts/garch-models|GARCH Models]]: observation-driven conditional scale dynamics can generate heavy unconditional tails.
- [[concepts/stochastic-volatility|Stochastic Volatility]]: a distinct approach introducing a latent random volatility process.

## Related Papers

- [[papers/asymmetric-uncertainty-nowcasting-using-skewness-in-real-time-data|Asymmetric uncertainty: Nowcasting using skewness in real-time data]]: a library comparison extending density nowcasting to time-varying asymmetry and mixed-frequency information; not asserted to be cited by this paper.
- Engle (1982), “Autoregressive Conditional Heteroscedasticity with Estimates of the Variance of United Kingdom Inflation”: cited ARCH foundation.
- Bollerslev (1986), “Generalized Autoregressive Conditional Heteroskedasticity”: cited GARCH foundation.

Published in *Applied Economics* 54(58), 6669–6686. [Article DOI](https://doi.org/10.1080/00036846.2022.2075823).
