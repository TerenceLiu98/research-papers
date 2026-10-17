---
title: "Next-Generation Conflict Forecasting: Unleashing Predictive Patterns through Spatiotemporal Learning"
type: paper
authors:
  - Simon Polichinel von der Maase
year: 2025
tags:
  - conflict-forecasting
  - spatiotemporal-learning
  - multi-task-learning
  - monte-carlo-dropout
---

## TL;DR

HydraNet combines a convolutional U-Net, recurrent LSTM memory, and six task-specific decoders to forecast the occurrence and log-fatality magnitude of three forms of political violence up to 36 months ahead. Using only historical fatalities, it improves average precision over the reported VIEWS 2020 benchmarks for all three violence types. Its Brier scores are worse, and AUC improves only for non-state violence. Monte Carlo Dropout supplies approximate model-uncertainty samples, whose distributional calibration is not evaluated in the supplied paper.

Working paper dated June 19, 2025, based on the author's 2023 doctoral dissertation and under revision as a standalone article. No DOI or arXiv identifier is supplied.

## Research Question

Can a jointly trained spatial and temporal neural architecture extract more predictive information from conflict histories than manually engineered features, while forecasting both occurrence and magnitude across multiple violence types?

## Motivation

Conflict histories contain fine-grained signals that slow-moving structural covariates often lack. Handcrafted lags and decay functions may incompletely represent persistence, diffusion, and unmeasured changing conditions. HydraNet learns representations directly from gridded histories. Predictive usefulness does not establish which causal mechanisms generate those patterns.

## Contributions

- Integrates spatial convolutions, U-Net skip connections, and LSTM memory to learn cell-level forecasting representations.
- Shares an encoder across state-based, non-state, and one-sided violence, with separate classification and regression decoders for each.
- Combines curriculum patch sampling and imbalance-sensitive losses with stochastic dropout forecasts.
- Reports higher average precision than VIEWS 2020 using only three historical fatality channels.

## Method

**Data and targets (Sections 3.2-3.3).** UCDP GED fatalities accessed through VIEWSER are aggregated to monthly PRIO-GRID cells of 0.5 by 0.5 degrees. Africa and the Middle East occupy a 180 by 180 grid. Each violence type contributes an input channel, transformed as $\log(1+\text{fatalities})$. Regression predicts future values on this transformed scale; classification predicts whether fatalities are positive. Binary presence is a target, not an additional input. Monthly spatial grids form a time-ordered tensor.

**Architecture (Section 3.4).** Convolutions share spatial filters, U-Net skip connections preserve local detail, and recurrent hidden and cell states retain temporal information. A shared encoder feeds six distinct decoders, jointly optimized for the six targets. [[concepts/monte-carlo-dropout|Monte Carlo Dropout]] remains active during inference to approximate variability across models.

**Training (Section 3.5).** Spatial patches of 32 by 32 cells span the training months. A predefined curriculum initially favors areas with observed fatalities and gradually broadens sampling. Focal loss handles the classification tasks, shrinkage loss handles regression, and a multi-task objective combines the six losses following Kendall et al. (2018). Detailed hyperparameters and sampling rules are referred to an external appendix rather than specified in the supplied text.

**Forecasting.** The trained network processes observed history to initialize its memory, then recursively feeds predictions back as inputs over 36 months. Section 4.2 states that the long-term cell state is frozen during forecasting, anchoring forecasts to historical patterns while potentially limiting adaptation. Means of 128 dropout samples provide the point predictions used in evaluation. These regression outputs estimate transformed magnitude, not directly expected raw fatality counts.

## Experiments

Table 1 specifies calibration training in January 1990-December 2012 with testing in 2013-2015, followed by validation training in January 1990-December 2015 with final testing in 2016-2018. Hyperparameters are selected during calibration. Twelve independently trained HydraNet instances use the fixed configuration; the author reports the instance whose performance is closest to their sample mean, rather than an ensemble of the twelve.

Table 2 excludes the Middle East for comparability with VIEWS 2020. VIEWS values are the best reported configurations for the respective metrics, so they need not describe one common comparator model. Scores are averaged over the 36 test months; higher AP and AUC are better, while lower Brier and MSE are better.

| Violence type | AP: VIEWS / HydraNet | AUC: VIEWS / HydraNet | Brier: VIEWS / HydraNet | Log-magnitude MSE: no-change / HydraNet |
| --- | --- | --- | --- | --- |
| State-based | 0.272 / 0.304 | 0.921 / 0.907 | 0.005 / 0.009 | 0.010 / 0.004 |
| Non-state | 0.047 / 0.134 | 0.894 / 0.929 | 0.002 / 0.004 | 0.010 / 0.002 |
| One-sided | 0.138 / 0.162 | 0.900 / 0.884 | 0.003 / 0.007 | 0.010 / 0.003 |

AP, the primary optimization and comparison metric, improves across all three violence types. Regression improves over the no-change baseline, but VIEWS regression scores are unavailable in Table 2. The Brier values above follow the rounded table entries; the narrative gives 0.0046 for the VIEWS state-based score.

With the Middle East included, Table 3 reports AP of 0.447, 0.357, and 0.191 for state-based, non-state, and one-sided violence. These scores are not comparable to the VIEWS values above. That table also shows state-based MSE of 0.024 versus 0.020 for no-change, and worse Brier scores than no-change for state-based and one-sided violence, qualifying the prose's claim of improvement across all metrics.

The paper describes deteriorating long-horizon performance for state-based violence, later deterioration for non-state violence, and substantial volatility for one-sided violence. It reports training in under two hours without a controlled hardware comparison in the supplied text.

## Limitations

- **Metric-specific gains:** Higher AP does not imply better probability accuracy. HydraNet has worse Brier scores than VIEWS in all three categories, and lower AUC in two.
- **Uncertainty evidence:** Evaluation uses sample means and point-based metrics. The paper does not report interval coverage or distributional scoring that would establish calibrated predictive uncertainty; dropout captures only some model uncertainty.
- **Recursive forecasts:** Frozen long-term memory promotes inertia, while recursive prediction can accumulate error. The paper acknowledges uncertainty that its current posterior approximation does not capture.
- **Scope and attribution:** The study evaluates one regional historical setting. The supplied text gives no component ablation establishing how much each architectural element contributes to the gains.
- **Selection transparency:** The reported run is chosen by proximity to mean performance across twelve runs. The text does not fully specify the selection metric or provide their performance dispersion, limiting assessment of training variability.
- **Source inconsistencies:** The introduction describes data through December 2019, whereas Section 3.2 and Table 1 end validation in December 2018. This summary follows the explicit split table. The source also refers to an extended appendix for implementation details and promises a static data snapshot upon publication.

## Related Concepts

- [[concepts/monte-carlo-dropout|Monte Carlo Dropout]]: stochastic inference approximates model uncertainty.
- [[concepts/spatiotemporal-history-smoothing|Spatiotemporal History Smoothing]]: a complementary approach that fits a regularized distance-lag response to historical outcomes.
- [[concepts/spatiotemporal-analog-forecasting|Spatiotemporal Analog Forecasting]]: transfers continuations of similar historical patterns instead of learning a recurrent forecasting network.

## Related Papers

- Hegre et al. (2021), "ViEWS2020: Revising and evaluating the ViEWS political violence early-warning system," *Journal of Peace Research* 58(3): 599-611: source of the benchmark classification scores and evaluation framework.
- Radford (2022), "High resolution conflict forecasting with spatial convolutions and long short-term memory": cited related work on spatial and recurrent neural forecasting.
- [[papers/accounting-for-variability-in-conflict-dynamics-a-pattern-based-predictive-model|Accounting for variability in conflict dynamics: A pattern-based predictive model]]: a library comparison using historical temporal analogs and clustering at country-month resolution; this is a thematic connection, not a citation in HydraNet's bibliography.
- [[papers/learning-from-predictions-fusing-training-and-autoregressive-inference-for-long-term-spatiotemporal-forecasts|Learning from Predictions: Fusing Training and Autoregressive Inference for Long-Term Spatiotemporal Forecasts]]: a methodological connection on recursive forecast error and training on generated inputs, not an evaluated HydraNet extension.

[[index|Library home]]
