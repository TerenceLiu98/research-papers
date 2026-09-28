---
title: "The geometry of conflict: 3D Spatio-temporal patterns in fatalities prediction"
type: paper
authors:
  - Thomas Schincariol
year: null
tags:
  - conflict-forecasting
  - spatiotemporal-patterns
  - optimal-transport
  - analog-forecasting
---

## TL;DR

Schincariol adapts ShapeFinder to forecast conflict fatalities by matching normalized three-dimensional histories of longitude, latitude, and time, then clustering the subsequent outcomes of historical matches. Across four six-month periods in 2022-2023 in Africa and the Middle East, the manuscript reports lower errors than the ViEWS ensemble at grid and active-zone levels. Gains mainly reduce overprediction; sudden escalations remain difficult, and the model cannot forecast onsets outside recently active zones. ViEWS was optimized for a longer horizon, limiting the comparison.

## Research Question

Can recurring spatiotemporal shapes in past conflict fatalities improve subnational forecasts while making the historical sources of each prediction traceable?

## Motivation

Fixed spatial lags can conflate different geographic processes and miss patterns that recur at different scales or speeds. Fine-grained conflict data are also sparse and skewed. ShapeFinder uses historical analogs to retain spatial and temporal structure without requiring additional covariates. The relevant transparency is primarily the ability to inspect matched historical cases, rather than an easily interpretable three-dimensional shape.

## Contributions

- Extends country-level ShapeFinder to three-dimensional conflict sequences on PRIO-GRID.
- Combines Earth Mover's Distance (EMD), an active-cell count filter, and spatial rotations to retrieve comparable histories.
- Constructs forecasts from clusters of historical continuations and evaluates both exact cell-month accuracy and broader zone-level outcomes.
- Examines active-zone coverage, performance during escalation and decline, and a limited comparison with the original non-spatial ShapeFinder.

## Method

### Zones and Representations

The study uses UCDP GED state-based fatalities obtained through the ViEWS API, with historical data beginning in 1989. PRIO-GRID cells measure 0.5 by 0.5 degrees. For each forecast origin, the preceding 12 months are aggregated spatially. Connected-component grouping links active cells within a two-grid-unit radius; isolated single-cell zones are excluded. Entirely overlapping zones are merged, and predictions for shared cells are averaged.

Each retained zone becomes a longitude-latitude-month sequence. All three coordinate axes are normalized to [0, 1], including the extent of inactive cells, and fatalities are normalized to sum to one. This separates shape matching from absolute intensity and geographic size.

### Historical Matching

Using [[concepts/optimal-transport|Optimal Transport]], the model compares normalized distributions with

$$
\operatorname{EMD}(P,Q)=\min_{\gamma\in\Gamma(P,Q)}\sum_{i,j}\gamma_{ij}\lVert x_i-y_j\rVert_2,
$$

where the nonnegative transport plan has marginals P and Q. It takes the minimum distance over four spatial orientations, separated by 90-degree rotations around the unchanged time axis. A second filter compares the counts of nonzero cell-months:

$$
R=\left|\tanh\left(\log\frac{N_1}{N_2}\right)\right|.
$$

A rolling historical search advances by half the window size and also considers dimensions varying by plus or minus one quarter. Matches must meet both distance thresholds. Their subsequent observations, called "past futures," provide the forecast analogs.

### Scenarios and Tuning

Historical continuations are resized to the target dimensions and mapped to grid cells, summing values that land in the same cell. Euclidean distances between longitude, latitude, and time projections support clustering. Each cluster's cellwise mean defines a scenario; its share of matched cases supplies an empirical scenario frequency. The largest cluster's mean becomes the point forecast. These frequencies are not demonstrated to be calibrated predictive probabilities.

Grid search minimizes PRIO-GRID MSE for January-June 2021 using training data through December 2020. Selected thresholds are EMD = 0.15, R = 0.05, and clustering distance = 0.0054 times the number of forecast cell-month elements. This implements [[concepts/spatiotemporal-analog-forecasting|Spatiotemporal Analog Forecasting]].

## Experiments

The four test windows are January-June and July-December in both 2022 and 2023, each using data available through the preceding month. They contain 28, 26, 27, and 30 active zones respectively, totaling 111 zone-period cases. Corresponding grid-cell counts are 1,505, 1,535, 1,577, and 1,676. Forecasts extend six months from a 12-month input history.

| Evaluation | Reported result | Source |
| --- | --- | --- |
| Grid-level six-month MSE comparison | Mean log error ratio of ViEWS to ShapeFinder = 0.05; ShapeFinder improves in over 62% of cases | Section 7, Figure 11 |
| Zone cumulative-fatality error | Mean log ratio = 0.708 in ShapeFinder's favor | Section 7, Figure 12 |
| Zone EMD | Mean log ratio = 0.120 in ShapeFinder's favor | Section 7, Figure 12 |
| Cell-month absolute error | Mean log((AE_Views + 1)/(AE_SF + 1)) = 0.2204, reported SE 0.0039 | Appendix F, Table F.1 |
| Cell-month squared error | Mean log((SE_Views + 1)/(SE_SF + 1)) = 0.2708, reported SE 0.0074 | Appendix F, Table F.2 |

The appendix's observation-level, plus-one log ratios differ from the main text's six-month MSE summary; these values should not be treated as interchangeable percentage improvements. Figure 12's caption calls its magnitude metric "Raw Error," while the prose calls it MAE, so the zone result is retained as a cumulative-fatality error comparison.

Performance analysis attributes much of the improvement to cases in which ViEWS overpredicts. Both models underpredict large sudden increases, especially where future fatalities exceed three times input fatalities. Smaller pattern EMD is associated with more similar subsequent shapes and fatality-increase ratios, supporting predictive association rather than a causal diffusion mechanism.

Zone selection retains 99% of fatalities and 94% of active cells in the input coverage reported in Section 4. A separate rolling future-coverage exercise in Appendix H captures over 90% of subsequent fatalities and about 75% of subsequent active cells on average. These are different coverage quantities. Appendix I reports that the three-dimensional model outperforms the original ShapeFinder applied independently to grid cells for January-June 2023; the latter takes more than a day, while the conclusion reports about an hour per period for the adapted model. This is not a controlled hardware benchmark.

## Limitations

- **Benchmark alignment:** ViEWS supplies live forecasts and is optimized for 36-month horizons; the study evaluates six-month forecasts. A horizon-matched refit could change the comparison.
- **Onsets and escalation:** Predictions outside selected active zones are zero. Previously inactive cells inside a zone can receive nonzero forecasts, but genuinely new zones and abrupt escalations remain major weaknesses.
- **Invariance assumptions:** Geographic rescaling, intensity normalization, and spatial rotation assume comparability across contexts. Roads, population, and social networks can make diffusion strongly directional or nonlocal.
- **Measurement and scope:** Evidence concerns state-based fatalities in Africa and the Middle East. Geolocation uncertainty and large imprecisely located events can distort shapes; wider geographic transfer is untested.
- **Interpretability and uncertainty:** Historical cases are traceable, but three-dimensional shapes are difficult to interpret. Full predictive distributions and their calibration are proposed extensions, not evaluated outputs.
- **Reporting precision:** Several figure captions describe confidence intervals using "standard error divided by the square root" of the sample size, whereas Appendix F describes the conventional standard-deviation calculation for standard errors. The supplied text does not resolve those interval claims. Appendix J also has damaged formulas and labels a sum of absolute differences "Euclidean Distance"; those calculations are not reconstructed here.
- **Metadata:** The supplied Markdown gives no explicit publication year, venue, DOI, or arXiv identifier for this manuscript. The year is therefore left null; dates in cited references do not establish its publication year.

## Related Concepts

- [[concepts/spatiotemporal-analog-forecasting|Spatiotemporal Analog Forecasting]]: transfers continuations from similar historical configurations.
- [[concepts/optimal-transport|Optimal Transport]]: compares the normalized spatial and temporal distributions.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: provides the neighboring-value perspective motivating more flexible pattern comparison; association alone does not identify diffusion.

## Related Papers

- Schincariol, Frank, and Chadefaux (2025), "Accounting for variability in conflict dynamics: A pattern-based predictive model." The cited country-level ShapeFinder predecessor.
- Hegre et al. (2022), "Forecasting fatalities in armed conflict: Forecasts for April 2022-March 2025." The cited ViEWS benchmark.
- Racek, Thurner, and Kauermann (2025), "Capturing the spatiotemporal diffusion effects of armed conflict: A nonparametric smoothing approach." A cited alternative for modeling spatial and temporal dependence.
- [[papers/the-earth-moves-but-so-does-the-bias-systematic-upward-bias-of-the-wasserstein-earth-movers-distance-and-permutation-based-null-calibration|The Earth Moves, But So Does the Bias]]: a thematic library connection, not a citation in this manuscript. It concerns finite-sample inference for distributional EMD, whereas ShapeFinder uses EMD for retrieval and forecast evaluation.

[[index|Library home]]
