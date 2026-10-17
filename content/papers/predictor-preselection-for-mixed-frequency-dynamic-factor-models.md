---
title: "Predictor Preselection for Mixed-Frequency Dynamic Factor Models: A Simulation Study With an Empirical Application to GDP Nowcasting"
type: paper
authors:
  - Domenic Franjic
  - Karsten Schweikert
year: null
tags:
  - nowcasting
  - mixed-frequency-data
  - factor-models
  - variable-selection
---

## TL;DR

Elastic-net preselection can improve mixed-frequency dynamic factor model nowcasts, but its tuning matters. Selecting candidate predictor sets by their previous-quarter nowcast error connects selection to the final prediction task. The skip-sampled version improves on the all-variable factor model in all three GDP applications, with relative RMSFEs of 0.98 for the United States, 0.84 for Germany, and 0.87 for Baden-Wuerttemberg. No specification dominates every setting, and some preselection methods substantially worsen accuracy.

## Research Question

How should elastic-net predictor selection be tuned and supplied with mixed-frequency data to improve dynamic factor model GDP nowcasts?

## Motivation

Large indicator panels can introduce irrelevant variables and correlated idiosyncratic noise into factor estimation. The [[concepts/targeted-predictors-for-factor-models|Targeted Predictors for Factor Models]] approach screens indicators before extracting factors, but the conventional choice of 30 predictors need not suit the data. Moreover, a predictor set that fits a linear elastic-net regression well need not be the best input to a factor-based nowcast.

## Contributions

- Compares fixed-size selection, time-series cross-validation of elastic-net parameters, and validation using the downstream nowcast error.
- Separately examines coordinate descent versus LARS-EN and aggregation versus skip-sampling of monthly indicators.
- Evaluates four simulation processes under two noise levels and three relevant/irrelevant variable mixes, followed by national and regional GDP applications.

## Method

The final estimator is a mixed-frequency dynamic factor model (DFM), using principal-component initialization and Kalman smoothing in the two-step framework of Giannone, Reichlin, and Small (2008) and Doz, Giannone, and Reichlin (2011). Monthly latent GDP growth is linked to quarterly growth through the Mariano-Murasawa aggregation weights $(1/3,2/3,1,2/3,1/3)$. Missing releases are accommodated in the state-space observation system.

Preselection uses the balanced historical portion of each information set. Monthly indicators are either aggregated into quarterly indicators (A) or split into three quarterly series representing the three months of each quarter (S, skip-sampling). Skip-sampling preserves within-quarter timing but triples the monthly predictor block. This is related to the blocking approach used in [[concepts/midas-regression|MIDAS Regression]]; the final prediction model here remains a DFM.

Eight targeted-predictor nowcast (TPN) specifications combine these frequency treatments with three selection strategies:

| Selection strategy | Specifications | Tuning criterion |
| --- | --- | --- |
| Elastic-net validation | A-CD-TPN, S-CD-TPN, A-LE-TPN, S-LE-TPN | Expanding-window, one-step-ahead validation; CD denotes coordinate descent and LE denotes LARS-EN |
| Fixed selection | A-F-TPN, S-F-TPN | LARS-EN with ridge parameter 0.25 and a target of 30 predictors |
| Nowcast validation | A-N-TPN, S-N-TPN | Candidate sets from coordinate descent, ranked by the preceding period's DFM nowcast error |

For nowcast validation, elastic net generates 100 candidate sets over a grid of mixing parameters, with penalty strength cross-validated. Each distinct set is passed through the DFM. Historical validation imposes the release pattern observed at the current origin, so selection accounts for indicator timeliness as well as fit. The set with the smallest validation error is used for the current nowcast. Selection is repeated with an expanding window before each nowcast (Section 2.4).

The final validation uses a single previous-quarter nowcast error. Endnote 12 reports that using more errors did not improve performance in preliminary work and increased computational cost. This differs from the expanding-window validation used within the elastic-net stage.

## Experiments

### Simulation

The four processes are paired five-factor models, paired single-factor white-noise models, paired VARMA(1,1) models, and dynamic factor models with lagged loadings and moving-average factors. Each combines relevant and irrelevant blocks with cross-correlated errors. Panels have 200 variables, with relevant/irrelevant counts of 150/50, 100/100, or 50/150, under high and low signal-to-noise ratios. One-quarter of each block is converted to quarterly observations.

The initial training sample spans 100 quarters, followed by 100 expanding-window nowcasts; each interval corresponds to 300 monthly observations (endnote 17). Only the target receives a 90-day publication lag in the simulations. Benchmarks are the crowded DFM using all variables (CDFM), an oracle DFM using the relevant block, AR(1), ARMA, and a naive mean model.

Tables 1-2 and Section 3.2 report:

- S-N-TPN beats CDFM in 9 of 12 high-signal configurations and 10 of 12 low-signal configurations, according to the authors' counts; rounding in the tables can conceal small improvements.
- In the balanced VARMA design, A-N-TPN has relative RMSFE 0.65 under high signal and 0.68 under low signal, corresponding to reductions of 35% and 32%.
- Fixed aggregation selection is best in 5 of 12 high-signal configurations but raises RMSFE by as much as 81% in another configuration.
- The complex moving-average factor process is difficult for preselection, and lower signal generally reduces gains. Variable selection is unstable over time, with reliable recovery reported mainly for the VARMA process.

Predictive improvement can exceed that of the oracle DFM: selecting the generating block is not necessarily the finite-sample subset that minimizes forecast error.

### GDP Applications

All three applications evaluate 2012 Q1-2019 Q3. The US panel has 87 monthly predictors after exclusions from FRED-MD; the German panel has 443 monthly predictors. The Baden-Wuerttemberg source panel contains 18 quarterly and 78 monthly indicators, with eight excluded for missing data and three more for proprietary-data restrictions. It combines regional, national, and international indicators.

Table 3 reports RMSFE relative to CDFM; lower is better. A dash denotes a specification not evaluated because of computational cost.

| Specification | US | Germany | Baden-Wuerttemberg |
| --- | ---: | ---: | ---: |
| CDFM | 1.00 | 1.00 | 1.00 |
| A-CD-TPN | 1.06 | 2.16 | 0.84 |
| A-LE-TPN | 1.31 | 0.85 | 0.79 |
| S-CD-TPN | 0.90 | 0.84 | 0.89 |
| S-LE-TPN | 1.02 | - | 1.04 |
| A-F-TPN | 1.14 | 1.24 | 1.01 |
| S-F-TPN | 1.06 | 1.04 | 0.87 |
| A-N-TPN | 0.90 | 1.55 | 0.80 |
| S-N-TPN | 0.98 | 0.84 | 0.87 |

S-CD-TPN and S-N-TPN improve on CDFM in every application. The best reductions across specifications are 10%, 16%, and 21%, respectively. Fixed selection improves only for skip-sampling in Baden-Wuerttemberg. Aggregated nowcast validation performs poorly for Germany, where the authors attribute much of its error to an outlying 2013 prediction.

Diebold-Mariano tests do not establish significance for every numerical gain. For S-N-TPN, only the Baden-Wuerttemberg improvement is marked significant at 5%; the US and German gains are unmarked. S-CD-TPN is marked at 5% for the US and 10% for Germany. The lowest Baden-Wuerttemberg ratio, 0.79 from A-LE-TPN, is unmarked.

## Limitations

- Benefits depend on signal strength, dynamics, and the indicator panel. Adding irrelevant indicators can worsen selection and prediction; preselection does not replace economically informed panel construction.
- Linear screening can poorly approximate complex factor dynamics. The VARMA simulation also fixes the fitted factor count to one after the information criterion tends to select the maximum (endnote 15).
- Simulated publication delays are simplified. Empirical evaluation deliberately excludes the global financial crisis and COVID-19 period, limiting evidence about stressed regimes.
- Single-error nowcast validation may be sensitive to unusual quarters. The reported results do not establish a universal advantage for aggregation, skip-sampling, or either elastic-net solver.
- Skip-sampled LARS-EN is computationally infeasible for the German application. The authors favor aggregation with coordinate descent for large panels on computational grounds, despite the more consistent empirical results of skip-sampled methods here.
- The supplied Markdown has damaged equations and table captions. The summary uses readable prose and table entries rather than reconstructing corrupted optimization formulas. It supplies an acceptance date of 20 August 2024, but no explicit publication year, venue, DOI, or other stable identifier; publication year is therefore left null.

## Related Concepts

- [[concepts/targeted-predictors-for-factor-models|Targeted Predictors for Factor Models]]: supervised screening before factor extraction, with tuning evaluated against the final prediction task.
- [[concepts/midas-regression|MIDAS Regression]]: related mixed-frequency treatment that preserves higher-frequency timing.
- [[concepts/factor-augmented-sparse-regression|Factor-Augmented Sparse Regression]]: combines individual predictor effects with factors, whereas this paper screens the input panel before factor estimation.

## Related Papers

- Bai and Ng (2008), "Forecasting Economic Time Series Using Targeted Predictors": foundation for elastic-net screening before factor forecasting.
- Bessec (2013), "Short-Term Forecasts of French GDP: A Dynamic Factor Model With Targeted Predictors": mixed-frequency preselection using aggregation.
- Siliverstovs (2017), "Short-Term Forecasting With Mixed-Frequency Data: A MIDASSO Approach": skip-sampling precedent discussed in the article.
- [[papers/factor-augmented-sparse-midas-regressions-with-an-application-to-nowcasting|Factor-Augmented Sparse MIDAS Regressions with an Application to Nowcasting]]: a library comparison combining sparse coefficients and common factors in the final regression; not a citation claimed to appear in this paper.
- [[papers/nowcasting-monthly-gdp-with-big-data-a-model-averaging-approach|Nowcasting monthly GDP with big data: A model averaging approach]]: a library comparison that pools small mixed-frequency models rather than screening one large factor model.

[[index|Library home]]
