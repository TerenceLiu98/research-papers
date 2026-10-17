---
title: "Nowcasting monthly GDP with big data: A model averaging approach"
type: paper
authors:
  - Tommaso Proietti
  - Alessandro Giovannelli
year: null
tags:
  - nowcasting
  - model-averaging
  - mixed-frequency-data
  - macroeconomics
---

## TL;DR

Monthly GDP is estimated by pooling bivariate models, each pairing quarterly GDP with one monthly indicator. Weights based on a shrinkage estimate of out-of-sample forecast-error covariance improve quarterly prediction over equal weighting and autoregressive benchmarks in a euro-area pseudo-real-time experiment with 554 indicators. Timely surveys receive more weight early in a quarter and during crises; industrial production becomes more informative as releases accumulate.

## Research Question

Can many small mixed-frequency models jointly recover monthly GDP while respecting observed quarterly totals, and how should their weights adapt to publication delays and forecast horizons?

## Motivation

Quarterly GDP arrives too late and too infrequently for timely economic monitoring. Monthly indicators differ in coverage, starting dates, and release schedules. A single large factor model requires decisions about factor dimension, while equal averaging can overrepresent groups with many redundant indicators. Pairwise modeling offers a tractable way to extract shared variation and assess each indicator's predictive contribution.

## Contributions

- Combines bivariate dynamic factor models to estimate monthly GDP under quarterly aggregation constraints and ragged-edge observations.
- Distinguishes likelihood-based weighting for historical reconstruction from forecast-error-based weighting for nowcasting and forecasting.
- Regularizes the high-dimensional error covariance matrix with Ledoit-Wolf shrinkage to obtain feasible minimum-variance combination weights.
- Documents changes in indicator weights across information sets and business-cycle phases in the euro area.

## Method

The framework assumes GDP variation lies in the span of the indicators' common components. Each bivariate model represents changes in GDP and one indicator using drifts, a shared ARMA(1,1) component, and mutually independent white-noise residuals. The GDP residual captures variation shared with other indicators but orthogonal to the selected indicator. Serial independence of residuals is imposed for identification (Section 3).

A state-space representation enforces $Y_{3\tau}=y_{3\tau}+y_{3\tau-1}+y_{3\tau-2}$. Sequential Kalman filtering evaluates the likelihood, quasi-Newton optimization estimates parameters, and filtering or smoothing supplies current or historical monthly estimates. This is [[concepts/temporal-disaggregation|Temporal Disaggregation]] with mixed frequencies and missing observations.

The pooled estimate is $\widehat y_t=\sum_i w_i\widehat y_{it}$. Historical reconstruction uses conditional-likelihood weights; the recursive comparison also screens to the best 10, 30, or 50 models. For prediction, [[concepts/forecast-combination|Forecast Combination]] uses quarterly forecast errors to estimate

$$
\widehat{\mathbf w}=
\frac{\widehat\Omega^{-1}\mathbf 1}
{\mathbf 1^\top\widehat\Omega^{-1}\mathbf 1},
\qquad
\widehat\Omega=(1-\lambda)S+\lambda F.
$$

Here $S$ is the sample error covariance and $F$ preserves individual error variances while using a common average correlation for off-diagonal entries (Equations 8-9). Shrinkage is needed because the number of indicators exceeds the number of quarterly errors. Weights sum to one; the formula does not impose nonnegativity. Covariances use errors from the preceding three years, with shrinkage assessed by a grid and the Ledoit-Wolf closed-form estimator. Common weights across the months of an observed quarter preserve its total when combining individually consistent estimates.

## Experiments

### Data and Design

The dataset contains 554 monthly indicators for the euro area and France, Germany, Italy, and Spain, covering production, sales, surveys, prices, labor, and monetary/financial conditions. Most series start in January 1996; quarterly GDP covers 1996:Q1-2018:Q4. Data were downloaded on April 30, 2019 (Section 2).

Recursive predictions run from January 2006 through December 2018; Table 2 evaluates 2008:Q1-2018:Q4 after accumulating errors for weighting. Small, medium, and large information sets correspond to the end of months 1, 2, and 3 of each quarter. Surveys arrive promptly, whereas hard indicators enter with delays. Current-quarter nowcasts and next-quarter forecasts are evaluated after aggregation to quarterly GDP levels.

### Results

Selected Table 2 RMSE ratios relative to the recursively BIC-selected univariate AR benchmark are below; smaller is better.

| Method | Nowcast m=1 | m=2 | m=3 | Next-quarter forecast m=1 | m=2 | m=3 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Ledoit-Wolf, closed-form shrinkage | 0.731 | 0.725 | 0.678 | 0.761 | 0.701 | 0.689 |
| Likelihood weights, all indicators | 0.867 | 0.843 | 0.814 | 0.958 | 0.935 | 0.906 |
| Likelihood weights, best 10 | 0.871 | 0.791 | 0.671 | 0.973 | 0.920 | 0.816 |
| Equal weights | 0.864 | 0.849 | 0.824 | 0.953 | 0.937 | 0.911 |
| DFM, modified factor criterion | 1.053 | 0.775 | 0.656 | 0.836 | 0.737 | 0.754 |
| MIDAS, BIC weights | 0.915 | 0.898 | 0.881 | 0.979 | 0.971 | 0.963 |

Closed-form shrinkage reduces nowcast RMSE by 26.9%, 27.5%, and 32.2% relative to AR, and next-quarter forecast RMSE by 23.9%, 29.9%, and 31.1% (calculated from Table 2). It does not win every nowcast comparison: at month 3, the modified-criterion DFM reaches 0.656 and the best-10 likelihood combination reaches 0.671. Fixed shrinkage values also outperform the closed-form choice in some columns.

Section 7 reports significant gains at the 10% level against AR and MIDAS, and against DFM for first-month nowcasts. It does not establish significant gains against every comparator at every horizon. Likelihood and equal-weight combinations do not significantly improve next-quarter forecasts over AR.

Weight analyses show that surveys matter most early in the quarter and during the financial and sovereign-debt crises. Industrial production gains weight when current-quarter releases arrive. Historical likelihood weights remain more concentrated on production indicators and respond less to the changing information set (Figures 9-10).

## Limitations

- The experiment is pseudo-real-time: it reproduces release delays using final GDP and indicator estimates rather than historical vintages. First-month information substitutes final previous-quarter GDP for flash estimates unavailable before April 2016.
- Quarterly prediction performance does not directly validate the unobserved monthly path. Monthly estimates depend on the common-component and dynamic-model assumptions.
- The indicator panel is uneven across countries and measurement domains. Some bivariate fits fail to converge, potentially because of short histories or outliers, and receive zero historical weight.
- Evidence comes from one euro-area application through 2018; it does not establish universal superiority of estimated weights over equal averaging.
- The supplied Markdown contains inconsistent expressions for deviance weights and damaged significance markers. The description follows Section 7 and figure captions for likelihood weighting, and the prose for significance. The covariance target is described using Equation 9, which retains individual variances despite nearby prose referring to equal variances.
- Publication year, venue, and a stable paper identifier are not stated in the supplied text. The year is left null; the referenced supplement is not included.

## Related Concepts

- [[concepts/temporal-disaggregation|Temporal Disaggregation]]: reconstructing monthly values consistent with observed quarterly totals.
- [[concepts/forecast-combination|Forecast Combination]]: pooling predictions using their joint error structure.

## Related Papers

The manuscript positions its approach relative to these cited works:

- Frale et al. (2011), "EuroMInd: A Monthly Indicator of the Euro Area Economic Conditions": predecessor using mixed-frequency dynamic factor modeling and aggregation consistency.
- Kuzin, Marcellino, and Schumacher (2013), "Pooling versus Model Selection for Nowcasting GDP with Many Predictors": comparison of pooling and selection for GDP prediction.
- Foroni and Marcellino (2014), "A Comparison of Mixed Frequency Approaches for Nowcasting Euro Area Macroeconomic Aggregates": related comparison of prediction pooling and factor approaches.
- Ledoit and Wolf (2004), "Honey, I Shrunk the Sample Covariance Matrix": shrinkage method underlying the combination weights.

[[index|Library home]]
