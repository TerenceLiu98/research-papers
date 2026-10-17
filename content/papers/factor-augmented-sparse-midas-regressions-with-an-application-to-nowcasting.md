---
title: Factor-Augmented Sparse MIDAS Regressions with an Application to Nowcasting
type: paper
authors:
  - Jad Beyhum
  - Jonas Striaukas
year: 2026
doi: 10.1080/07350015.2026.2649055
venue: Journal of Business & Economic Statistics
tags:
  - nowcasting
  - mixed-frequency-data
  - factor-models
  - sparse-regression
---

## TL;DR

Combining polynomial MIDAS features, PCA factors, and sparse-group LASSO improves U.S. GDP nowcasts when both common and predictor-specific signals matter. Over 2008 Q1-2022 Q2, quarter-end RMSE relative to AR(4) is 0.251, versus 0.559 for sparse-only MIDAS and 0.580 for factor-only MIDAS. Gains concentrate in the pandemic-inclusive sample and later horizons; factor augmentation does not consistently improve pre-COVID accuracy.

## Research Question

Can a high-dimensional mixed-frequency regression jointly exploit sparse predictor effects and dense common factors, with prediction guarantees that accommodate estimated factors, temporal dependence, heavy tails, and approximation error?

## Motivation

Weekly financial and monthly macroeconomic indicators can inform quarterly GDP before its release, but their many lag coefficients create a dimensionality problem. Pure sparsity can miss broad common movements, while factor-only regression can discard useful individual predictors. The paper combines both signals after compressing high-frequency lag profiles.

## Contributions

- Introduces sg-LASSO-FAMIDAS: linear MIDAS weighting, PCA of the weighted macroeconomic panel, and sparse-group penalization of original predictors with unpenalized factors.
- Establishes PCA error rates and prediction-error bounds under polynomial-tail moment conditions and $\tau$-mixing, allowing MIDAS and approximate-sparsity errors.
- Evaluates sparse, dense, and combined specifications in simulations and a real-time U.S. GDP application, distinguishing pandemic-inclusive and pre-pandemic performance.

## Method

For each high-frequency predictor, [[concepts/midas-regression|MIDAS Regression]] replaces its unrestricted lag coefficients with a short basis expansion. The baseline uses Legendre polynomials through degree 3, giving four weighted features per series. PCA is applied to the resulting monthly macroeconomic feature matrix $X$, rather than to the raw high-frequency panel. The weekly financial panel enters through sparse coefficients without an imposed factor structure.

The regression is

$$
Y=W\delta+F\gamma+A+\mathcal E,
$$

where $W$ contains an intercept, outcome lags, and weighted financial and macroeconomic predictors; $F$ contains latent factors; and $A$ is approximation error. The columns of $\widehat F/\sqrt T$ are leading eigenvectors of $XX^\top$. Estimation minimizes

$$
\|Y-Wd-\widehat F c\|_2^2+
\lambda\left[\mu\|d\|_1+(1-\mu)\sum_{G\in\mathcal G}\|d_G\|_2\right].
$$

Groups collect the basis coefficients belonging to each original series, with a separate autoregressive block. The penalty selects both groups and coefficients within groups; factor coefficients $c$ are unpenalized. This is [[concepts/factor-augmented-sparse-regression|Factor-Augmented Sparse Regression]]. Setting the sparse component to zero gives FAMIDAS; omitting the factors gives sg-LASSO-MIDAS. The application selects factor dimension using the Ahn-Horenstein growth ratio and penalty parameters using five-fold cross-validation on data available at each origin and horizon; the paper refers to its appendix for dependence adjustments. Implementation is reported in the R package `midasml`.

### Theoretical Scope

Section 3 assumes strong factors, a fixed factor count, more than four finite moments, stationary polynomially decaying $\tau$-mixing, and restrictions on dimensional growth, effective sparsity, and the residualized population Gram matrix. Lemma 3.1 gives the factor-estimation Frobenius error rate $O_P(\sqrt{T/p_x}+1)$ up to rotation. Theorem 3.1 separates penalization, approximation, and factor-estimation contributions to prediction error.

Writing $\sqrt{s_\mu}=\mu\sqrt{|S_0|}+(1-\mu)\sqrt{|\mathcal G_0|}$ and

$$
h_T=\left(\frac{p}{T^{\kappa-1}}\right)^{1/\kappa}
\vee\sqrt{\frac{\log(2p)}{T}},
\qquad \kappa=\frac{(a+1)q-1}{a+q-1},
$$

the paper identifies $s_\mu h_T^2$ as the sparse-estimation contribution and $1/p_x$ as the additional factor-estimation contribution. The latter is negligible when $s_\mu h_T^2p_x\to\infty$. Here $a$ controls mixing decay and $2q>4$ the moment condition. These are conditional prediction guarantees, not guarantees for unrestricted nonlinear regression or arbitrary heavy-tailed data.

## Experiments

### Monte Carlo

Section 4 studies sample sizes 50, 100, and 200, Gaussian and Student-$t(5)$ innovations, and weaker or stronger cross-sectional dependence. The main design includes weekly sparse signals and monthly sparse-plus-factor signals. The combined estimator has the lowest reported out-of-sample MSE across these settings; the prose gives a Gaussian baseline MSE decrease from 1.1760 at $T=50$ to 0.6133 at $T=200$. Additional purely dense and purely sparse designs reportedly show little cost from combining components. Detailed simulation tables are in the unavailable Online Appendix.

### Real-Time GDP Nowcasting

The target is the advance release of U.S. real GDP growth using ALFRED vintages. Training begins with 1984 Q1-2007 Q4 and expands from 2008 Q1 onward. Predictors comprise 76 monthly FRED-MD macroeconomic series and 36 weekly financial series, largely NFCI components. Nuclear-norm matrix completion fills missing weekly histories. Four GDP lags are included. Horizons are two months before quarter-end, one month before quarter-end, and quarter-end.

Section 5 uses observations from the current and previous quarters, with the lag window expanding as the quarter progresses:

| Months remaining in quarter | Monthly observations per macro series | Weekly observations per financial series |
| --- | ---: | ---: |
| 2 | 4 | 17 |
| 1 | 5 | 21 |
| 0 | 6 | 26 |

These are high-frequency observation counts before compression into four polynomial features per series. The advance GDP release usually arrives near the end of the following month's reporting cycle, so even the quarter-end prediction precedes the target release.

Table 1 reports the following RMSE ratios to AR(4); lower is better. The benchmark's absolute RMSE is 9.553 in the full sample and 1.934 before COVID, at each horizon.

| Evaluation period | Method | 2-month | 1-month | Quarter-end |
| --- | --- | ---: | ---: | ---: |
| 2008 Q1-2022 Q2 | FAMIDAS | 0.590 | 0.495 | 0.580 |
| 2008 Q1-2022 Q2 | sg-LASSO-MIDAS | 0.572 | 0.435 | 0.559 |
| 2008 Q1-2022 Q2 | sg-LASSO-FAMIDAS | 0.580 | 0.340 | 0.251 |
| 2008 Q1-2019 Q4 | FAMIDAS | 0.962 | 0.911 | 0.851 |
| 2008 Q1-2019 Q4 | sg-LASSO-MIDAS | 0.827 | 0.837 | 0.733 |
| 2008 Q1-2019 Q4 | sg-LASSO-FAMIDAS | 0.842 | 0.827 | 0.756 |

The combined model wins the full-sample one-month and quarter-end comparisons, but the sparse-only model is slightly better at two months. Before COVID, sparse-only wins at two months and quarter-end, while the combined model wins narrowly at one month. Section 5.2 reports significance using an average superior predictive ability test, without supplying the detailed test table in this Markdown.

Section 5.3 reports sparse-component test p-values of 0.002 for the full sample and 0.037 before COVID; corresponding macro-factor p-values are 0.003 and 0.668. The authors interpret this as evidence that common macroeconomic information became more useful during the pandemic. This is a predictive interpretation, not identification of the pandemic's causal shock decomposition. They explicitly leave theoretical validation of these tests in the present $\tau$-mixing setting to future work.

Reported robustness exercises vary factor selection, sparse/weak factor specifications, observed activity indices, rolling windows, financial factors, and polynomial degree. The main text reports qualitatively similar conclusions and better accuracy from PCA on MIDAS-weighted macro predictors than from PCA on the raw high-frequency panel; the underlying appendix tables are not supplied.

## Limitations

- Benefits vary by horizon and period. The real-time evidence is one U.S. GDP application, with especially large pandemic-related errors influencing full-sample RMSE.
- The main theoretical results impose strong factors and stationarity, as well as dimension and sparsity restrictions. Empirical weak-factor or rolling-window checks do not extend those theorems.
- Component-significance tests lack theoretical validation for the exact dependence and estimated-factor setting used here.
- The supplied text excludes the Online Appendix containing proofs, detailed tuning and data procedures, and most robustness results; those results are summarized only as reported in the main article.
- The parsed source has damaged mathematical notation. In particular, Corollary 1 displays an unnormalized approximation-error term despite Theorem 3.1's explicit sample-size scaling; the summary therefore describes its components without silently repairing that formula. Table 1's caption mentions Panel C, but only Panels A and B are present, so no separate pandemic-only numbers are inferred.

## Related Concepts

- [[concepts/midas-regression|MIDAS Regression]]: compressing high-frequency lag information for a low-frequency target.
- [[concepts/factor-augmented-sparse-regression|Factor-Augmented Sparse Regression]]: retaining common factors alongside selected individual predictors.

## Related Papers

- Babii, Ghysels, and Striaukas (2022), "Machine Learning Time Series Regressions with an Application to Nowcasting": sparse-group MIDAS theory extended here to estimated factors.
- Fan, Masini, and Medeiros (2023), "Bridging Factor and Sparse Models": related sparse-plus-dense framework outside the mixed-frequency setting.
- Marcellino and Schumacher (2010), "Factor Midas for Nowcasting and Forecasting with Ragged-Edge Data: A Model Comparison for German GDP": factor-MIDAS predecessor using factors extracted before MIDAS regression.
- [[papers/nowcasting-monthly-gdp-with-big-data-a-model-averaging-approach|Nowcasting monthly GDP with big data: A model averaging approach]]: a related library paper that pools bivariate mixed-frequency models to reconstruct monthly GDP. It is a thematic comparison, not a citation asserted to appear in this article.

[[index|Library home]]
