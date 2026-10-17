---
title: "Point and Risk estImation Using an enSemble of Models for Nowcasting: PRISM-Now"
type: paper
authors:
  - Beomseok Seo
  - Hyungbae Cho
  - Dongjae Lee
year: 2026
tags:
  - nowcasting
  - forecast-combination
  - macroeconomics
  - ensemble-learning
---

## TL;DR

PRISM-Now combines heterogeneous Korean GDP forecasts by fitting their cross-model distribution and dynamically choosing a quantile. Changes in the ensemble mean determine the adjustment direction, rising dispersion activates it, and asymmetry modulates its strength. It lowers full-sample MAE and RMSE relative to the tested ensemble alternatives, with especially large COVID-period gains; stable-period performance and financial-crisis forecasts one quarter ahead are less favorable.

## Research Question

Can contemporaneous disagreement among models reveal changing information relevance and improve GDP forecast aggregation when historically successful models become slow to adapt?

## Motivation

Official production indicators, text, sentiment, and nonlinear interactions become useful at different horizons and economic phases. Consequently, historical forecast accuracy may be a poor guide to which models currently contain the relevant information. [[concepts/forecast-combination|Forecast Combination]] can exploit this diversity, but simple averages can remain biased when many models miss a structural change.

## Contributions

- Proposes a latent mixture of relatively accurate, responsive forecasts and less accurate forecasts as a rationale for adapting the aggregation quantile.
- Introduces Model Ensemble Growth at Risk (ME-GaR), a skew-t approximation to the cross-sectional distribution of model predictions.
- Develops [[concepts/dynamic-quantile-selection|Dynamic Quantile Selection]] (DQS), a transparent rule using changes in location and dispersion plus mean-median asymmetry.
- Compares conventional, text-based, and machine-learning GDP models across horizons and crisis regimes, with a common ensemble comparison and an earlier-period extension.

## Method

### Ensemble Construction

The target is seasonally adjusted quarter-on-quarter Korean GDP growth. Candidate forecasts include ARIMA, linear quantile regression, VAR, bridge equations, dynamic and text-enhanced factor models, a text-only model, SVR with KNN imputation, random forests with dynamic variable selection, sentiment-based XGBoost, and Conv-LSTM. The authors screen poorly performing and redundant models, excluding LBVAR and BEM2 in the main ensemble. Models use distinct information sets and ragged-edge treatments; merely multiplying similar models would distort the forecast distribution (Sections 3.1.3 and 3.2).

The latent good/bad mixture is an interpretation, not an observed classification. Its variance combines within-group uncertainty and between-group mean separation. The same skewness can have different implications depending on which component drives dispersion. The rule therefore adds the heuristic assumption that good forecasts respond more strongly to economic changes than bad forecasts (Section 3.1).

### Density and Quantile Selection

ME-GaR fits a skewed Student-t family to current model forecasts. Equations (19)-(20) plug in the ensemble sample mean and standard deviation and estimate shape and tail parameters by matching the 0.10, 0.25, 0.75, and 0.90 empirical quantiles. This describes model disagreement; it does not itself establish calibrated probabilities for realized GDP.

DQS produces $\widehat y^*_{t|s}=\widehat Q_{t|s}(\tau^*_{t|s})$. With $\widehat\mu$, $\widehat\nu$, and $\widehat\sigma$ denoting ensemble mean, median, and standard deviation, respectively, Equation (14) uses

$$
\tau^*_{t|s}=\frac12+\operatorname{clip}_{[-1/2,1/2]}\!\left[
\lambda\,\operatorname{sgn}(\Delta\widehat\mu_{t|s})
\max(\Delta\widehat\sigma_{t|s},0)\widehat\sigma_{t|s}^{2}
\exp\!\left\{\operatorname{sgn}(\Delta\widehat\mu_{t|s})(\widehat\mu_{t|s}-\widehat\nu_{t|s})\right\}
\right].
$$

Here $\Delta\widehat\mu_{t|s}=\widehat\mu_{t|s}-\widehat\mu_{t-1|s}$, with the analogous definition for dispersion: these compare target quarters at the same information date $s$. Nonincreasing dispersion selects the median. Increasing dispersion shifts the quantile in the mean-change direction, with stronger adjustment when asymmetry aligns with that direction. The magnitude parameter $\lambda$ is learned using the preceding three years, so the procedure still uses historical training information even though its adjustment signals come from current forecast distributions (Sections 3.1.1 and 4.3).

## Experiments

### Design

The authors impose pseudo-vintage information availability and evaluate forecasts made at quarter-end. Figure 6 covers current-quarter targets from 2016Q1 to 2022Q4 and one-quarter-ahead targets from 2016Q2 to 2023Q1. Subsamples separate pre-COVID, 2020, and post-COVID periods. An extension begins in 2008 and uses fewer available base models before 2016. Evaluation measures MAE, RMSE, and maximum absolute error (MAXAE).

Comparators use the same main ensemble: mean, median, adaptive selection of the preceding four quarters' best three models (AdaMSM), exponential reweighting (AFTER), inverse historical squared-error weighting (LOP), and Bayesian model averaging (BMA). Appendix B supplies illustrative Gaussian-mixture simulations; Figure 5 examines sensitivity to $\lambda$.

### Results

Full-sample errors from Figure 6, in GDP-growth percentage points; lower is better:

| Method | t+0 MAE | t+0 RMSE | t+0 MAXAE | t+1 MAE | t+1 RMSE | t+1 MAXAE |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| DQS | 0.343 | 0.458 | 1.332 | 0.479 | 0.648 | 1.868 |
| Mean | 0.402 | 0.589 | 1.926 | 0.569 | 0.839 | 2.750 |
| Median | 0.416 | 0.605 | 2.067 | 0.561 | 0.856 | 3.041 |
| AdaMSM | 0.409 | 0.609 | 1.986 | 0.513 | 0.732 | 2.073 |
| AFTER | 0.379 | 0.566 | 1.798 | 0.595 | 0.913 | 3.458 |
| LOP | 0.411 | 0.620 | 2.067 | 0.558 | 0.838 | 2.789 |
| BMA | 0.422 | 0.546 | 1.466 | 0.621 | 0.922 | 3.287 |

DQS has the lowest full-sample errors among these ensemble methods at both horizons. It also improves full-sample MAE and RMSE over the individual models in Figure 3. During 2020, its RMSE is 0.770 versus 1.242 for the mean at t+0, and 1.159 versus 1.879 at t+1. Text and sentiment models provide useful early signals during that episode.

Gains are not uniform. Pre-COVID t+0 MAE favors AFTER (0.248 versus DQS's 0.291). Post-COVID t+1 MAE favors the median (0.410 versus 0.474). During 2008Q1-2009Q4, DQS improves t+0 MAE over the mean (0.988 versus 1.014), but its t+1 MAE is worse (0.960 versus 0.939; Figure 7).

Table 4's one-tailed Diebold-Mariano tests for t+0 MSE give p-values of 0.095-0.175 against DQS. None rejects equal predictive accuracy at 5%; the BMA comparison reaches 10%. The short evaluation sample limits statistical precision.

## Limitations

- The quantile adjustment is heuristic and depends on informative model diversity and the assumed responsiveness of good forecasts. Outliers or many similarly misspecified models can make adaptation harmful.
- Cross-model dispersion and skewness do not identify uncertainty and directional risk without extra assumptions. The reported point-error improvements do not establish predictive-density calibration.
- Evidence centers on Korean GDP and a short main sample containing four COVID quarters. Quarter-end evaluation does not comprehensively test every within-quarter update, and the earlier extension changes ensemble composition.
- The supplied source says the main ensemble contains 12 models, but its enumerated candidates leave 11 after excluding LBVAR and BEM2. Section 4.1 includes BEM2 in the early-period set, whereas Figure 7's note omits it. These counts are not silently reconciled here.
- Data are available from the corresponding author on reasonable request. The supplied Markdown gives an acceptance date of 4 April 2026, used for the year, but no stable identifier for this article; none is inferred.

## Related Concepts

- [[concepts/dynamic-quantile-selection|Dynamic Quantile Selection]]: the distribution-responsive aggregation rule.
- [[concepts/forecast-combination|Forecast Combination]]: pooling forecasts with complementary information and errors.
- [[concepts/mixed-frequency-dynamic-factor-models|Mixed-Frequency Dynamic Factor Models]]: one family of base models handling delayed and mixed-frequency indicators.
- [[concepts/probability-calibration|Probability Calibration]]: distinguishes a distribution of model forecasts from validated outcome probabilities.

## Related Papers

- Bates and Granger (1969), "The Combination of Forecasts": cited foundation for forecast pooling.
- Gneiting et al. (2005), "Calibrated Probabilistic Forecasting Using Ensemble Model Output Statistics and Minimum CRPS Estimation": cited precedent for parametric ensemble postprocessing.
- Seo (2025), "Econometric Forecasting Using Ubiquitous News Text: Text-Enhanced Factor Model": cited basis for the text-enhanced model.
- [[papers/nowcasting-monthly-gdp-with-big-data-a-model-averaging-approach|Nowcasting monthly GDP with big data: A model averaging approach]]: library comparison using error-covariance weights for pooled mixed-frequency models.
- [[papers/asymmetric-uncertainty-nowcasting-using-skewness-in-real-time-data|Asymmetric uncertainty: Nowcasting using skewness in real-time data]]: library comparison modeling time-varying distributional shape in macroeconomic indicators. These two library comparisons are thematic relationships, not citations asserted to occur in PRISM-Now.

[[index|Library home]]
