---
title: Nowcasting economic activity in European regions using a mixed-frequency dynamic factor model
type: paper
authors:
  - Luca Barbaglia
  - Lorenzo Frattarolo
  - Niko Hauzenberger
  - Dominik Hirschbühl
  - Florian Huber
  - Luca Onorante
  - Michael Pfarrhofer
  - Luca Tiozzo Pezzoli
year: 2025
doi: 10.1016/j.ijforecast.2025.09.006
tags:
  - nowcasting
  - mixed-frequency-data
  - macroeconomics
  - dynamic-factor-models
---

## TL;DR

A Bayesian mixed-frequency dynamic factor model combines annual regional gross value added (GVA) with quarterly national GVA to estimate quarterly regional activity and nowcast delayed annual releases. Across 161 NUTS2 regions in 13 European countries, the selected country-specific models outperform a historical-mean density benchmark in 98% of regions, with a reported average CRPS gain of about 46%. Evaluation covers 2016-2023 and reproduces publication delays, but not data revisions; specifications are selected on this same holdout period.

## Research Question

Can a small set of shared dynamic factors recover useful quarterly regional activity estimates and accurate annual density nowcasts when regional series are short, annual, and released two years late?

## Motivation

Regional policies require timely local economic information, but European regional accounts offer few annual observations. Modeling each region separately at quarterly frequency creates a large latent state relative to the available history. Shared factors exploit within-country co-movement, while national quarterly output constrains the aggregate regional trajectory.

## Contributions

- Combines a regional factor structure with temporal aggregation and approximate national-regional consistency restrictions.
- Uses horseshoe shrinkage and equation-by-equation Bayesian estimation to regularize factor dynamics and loadings in short samples.
- Evaluates factor counts, measurement-error priors, aggregation restrictions, and stochastic volatility across countries with different numbers of regions.
- Produces quarterly regional reconstructions and examines heterogeneous pandemic contractions and recoveries.

## Method

Each country has its own [[concepts/mixed-frequency-dynamic-factor-models|Mixed-Frequency Dynamic Factor Model]]. Regional quarterly growth is represented by factor loadings applied to latent quarterly factors, plus region-specific error. The annual observation equation applies the Mariano-Murasawa triangular weights

$$
a=(1/4,2/4,3/4,1,3/4,2/4,1/4),\qquad
y^*_{it}=\lambda_i^\top\sum_{k=0}^{6}a_k f_{t-k}+\epsilon_{it}.
$$

This approximate log-growth aggregation implements [[concepts/temporal-disaggregation|Temporal Disaggregation]]. A separate measurement equation links national quarter-on-quarter GVA growth to the weighted regional common components:

$$
z_{\mathrm{GVA},t}=\omega^\top\Lambda f_t+\varepsilon_t.
$$

Weights reflect regional shares in national GVA. The cross-sectional restriction is stochastic because growth-rate aggregation is approximate and regional accounts need not fully cover national activity. Regional measurement errors also absorb deviations from the factor structure; their sources are not separately identified (Section 2.1).

Factors follow a VAR; the implementation specifies at least seven lags. Horseshoe priors shrink lag coefficients, contemporaneous coefficients, and loadings, with a stationarity restriction on the dynamics. Innovations are either homoskedastic or have stochastic volatility. Tight and loose inverse-gamma priors control temporal measurement errors and cross-sectional discrepancies; a variant removes the national restriction. Gibbs sampling alternates state filtering/smoothing with conditional updates of coefficients, loadings, and variances (Sections 2.2-2.3).

The general model permits additional observed factors, but the empirical application uses none: quarterly national GVA enters through the cross-sectional restriction. Latent quarter-on-quarter growth and annualized quarterly growth are distinct outputs; only the latter at year-end can be evaluated against observed annual regional growth.

## Experiments

### Data and Evaluation

Eurostat annual GVA covers 161 NUTS2 regions from 2001 through 2023 in Austria, Belgium, Germany, Greece, Spain, Finland, France, Ireland, Italy, Lithuania, the Netherlands, Slovenia, and Slovakia. Extra-regional entities and French overseas territories are excluded.

An expanding-window exercise produces annual nowcasts for 2016-2023. At each origin, national quarterly data extend through the target year's fourth quarter, while regional annual observations end two years earlier. The model also backcasts the intervening year. These are pseudo-real-time information sets, without historical revision vintages.

Factor counts range from one to the smaller of 12 and the country's number of regions. Continuous ranked probability score (CRPS; lower is better) evaluates predictive distributions; country summaries weight regional scores by historical GVA shares. Historical-mean, random-walk, and autoregressive benchmarks are considered, with reported ratios using the most competitive benchmark, the historical mean. The eight annual holdout observations are too few for the authors to conduct formal significance tests.

### Results

- The selected models improve on the historical mean in 158 of 161 regions, reported as 98%, with an average regional gain of about 46% (Section 3.2, Figure 2).
- Every country's best specification uses a tight cross-sectional restriction. Ten countries prefer homoskedastic innovations with loose regional measurement-error priors; Ireland, Lithuania, and Slovenia prefer stochastic volatility (Section 3.2).
- Performance is often U-shaped in the number of factors. Additional factors initially improve regional fit, but too many can worsen prediction. Slovakia's best specification uses one factor; all other countries prefer multiple factors.
- Illustrative Table 1 CRPS ratios for the homoskedastic, loose-measurement-error specification with tight cross-sectional restriction are 0.54 for Germany at seven factors, 0.42 for Spain at ten, and 0.41 for Italy at nine. These are ratios to the historical mean, not point-forecast errors.
- Absolute losses rise during the pandemic, particularly the 2021 rebound. Relative performance is generally stronger than the benchmark, with Austria and Spain exceptions in 2021. Losses return toward pre-pandemic levels by 2022 in most countries.
- Full-sample quarterly reconstructions show especially deep 2020 Q2 contractions in tourism-dependent coastal and island regions. Selected pseudo-real-time examples underestimate some 2020 downturns and most 2021 rebounds; new annual regional observations revise earlier estimates (Section 3.3).

## Limitations

- Release delays are reproduced, but data revisions are not. The experiment is not a test using genuine historical data vintages.
- Model specification and factor count are selected by average holdout CRPS. The resulting best-model summaries are not a separate test of a selection rule fixed before the holdout.
- Annual predictive accuracy does not directly validate the never-observed quarterly regional paths. Pandemic maps are full-sample reconstructions rather than contemporaneous observations or causal policy estimates.
- Countries are modeled independently, leaving cross-country co-movement unused. Time-varying coefficients are proposed as an extension.
- Temporal and cross-sectional restrictions are approximate; measurement errors conflate regional idiosyncrasies with aggregation error. Short annual histories constrain identification and formal predictive comparisons.
- The supplied Markdown has damaged table group labels and mathematical typography. Model-family conclusions above follow the accompanying prose; the referenced supplementary appendix is not supplied.

## Related Concepts

- [[concepts/mixed-frequency-dynamic-factor-models|Mixed-Frequency Dynamic Factor Models]]: shared latent dynamics with frequency-specific observation equations.
- [[concepts/temporal-disaggregation|Temporal Disaggregation]]: annual-to-quarterly reconstruction under aggregation restrictions.

## Related Papers

- Koop et al. (2020), "Regional output growth in the United Kingdom: More timely and higher frequency estimates from 1970": cited regional mixed-frequency VAR predecessor with temporal and cross-sectional restrictions.
- Mariano and Murasawa (2003), "A new coincident index of business cycles based on monthly and quarterly series," and Mariano and Murasawa (2010), "A coincident index, common factors, and monthly real GDP": cited foundations for mixed-frequency factor modeling and aggregation.
- [[papers/predictor-preselection-for-mixed-frequency-dynamic-factor-models|Predictor Preselection for Mixed-Frequency Dynamic Factor Models]]: library comparison focused on selecting indicators for GDP nowcasts, whereas this paper compresses a large cross-section of regional targets.
- [[papers/nowcasting-monthly-gdp-with-big-data-a-model-averaging-approach|Nowcasting monthly GDP with big data: A model averaging approach]]: library comparison using pooled bivariate models for temporal disaggregation. These library comparisons are not asserted to be citations in the source.

Source: International Journal of Forecasting, 2025 copyright year; [DOI](https://doi.org/10.1016/j.ijforecast.2025.09.006). The source provides a [data and code repository](https://github.com/lucabarbaglia/RegionalNowcasting_replication_package_IJoF).

[[index|Library home]]
