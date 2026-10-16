---
title: "Accounting for variability in conflict dynamics: A pattern-based predictive model"
type: paper
authors:
  - Thomas Schincariol
  - Hannah Frank
  - Thomas Chadefaux
year: 2025
doi: "10.1177/00223433251330790"
tags:
  - conflict-forecasting
  - analog-forecasting
  - time-series
  - dynamic-time-warping
---

## TL;DR

Shape finder forecasts monthly conflict fatalities by retrieving similar historical trajectories with Dynamic Time Warping and averaging the future trajectories in the largest cluster of matches. In tests for 2022 and 2023, it captures temporal variation better than the VIEWS ensemble, while VIEWS has better overall accuracy. A compound that selects between them reports improvements on both mean squared error and temporal variation. Shape finder cannot predict onsets following all-zero histories and can overpredict isolated-peak cases.

Published in *Journal of Peace Research* 62(6), 2052-2069. [Article DOI](https://doi.org/10.1177/00223433251330790). The paper identifies [ShapeFinder_conflict](https://github.com/ThomasSchinca/ShapeFinder_conflict) as its replication repository.

## Research Question

Can recurring patterns in past conflict fatalities anticipate escalation and de-escalation while maintaining prediction error comparable to conservative forecasting models?

## Motivation

Sparse, skewed fatality data make flat forecasts competitive under average-error metrics even when they miss consequential changes. The authors argue that strategic adaptation, feedback, and resource replenishment can produce recurring fatality trajectories. Shape similarity is used as a predictive signal; these proposed mechanisms are theoretical motivation rather than separately identified causal effects.

## Contributions

- Refines an earlier shape-based forecaster with distance-filtered historical matches, variable-length retrieval windows, and clustering of matched futures.
- Introduces Difference Explained (DE) to assess predicted changes alongside mean squared error (MSE).
- Combines Shape finder with VIEWS using historical-match confidence and violence severity, and examines where each approach succeeds or fails.

## Method

### Historical Retrieval

The model uses only UCDP GED best-estimate state-based conflict fatalities, aggregated by country-month. Each input is the final 10 months before the test year. Rolling historical subsequences span 8-12 months, allowing analogous patterns to develop at different speeds. [[concepts/dynamic-time-warping|Dynamic Time Warping]] aligns these sequences and supplies a retrieval distance. The threshold starts at 0.1 and increases in increments of 0.1 until at least five references are retained. References whose subsequent outcomes overlap the test period are discarded.

### Forecast Construction

For each match, the following 12 months form a candidate future. Agglomerative hierarchical clustering groups these futures; the largest cluster's mean supplies the forecast. The clustering cut is 4, selected using 2021 validation outcomes. When no cluster stands out under uniform cluster probabilities, the method averages all candidate futures. All-zero inputs receive 12 zero predictions without retrieval. The paper reports an average majority-cluster size of 66, with standard deviation 97.

### Compound and Evaluation

The compound selects Shape finder when historical support and agreement are sufficient, while also considering violence severity to limit costly overpredictions. The text describes support exceeding three historical occurrences and at least 50% of matched futures in the majority cluster, alongside a confidence measure using the logarithm of match count. It reports approximately 66% Shape finder and 33% VIEWS predictions. The complete severity decision rule is referred to an appendix figure absent from the supplied Markdown.

MSE evaluates fatality levels. DE rewards agreement between predicted and observed month-to-month changes through an exponential score with balancing factor 5. It also allows a one-month early or late prediction with a 50% penalty, choosing the best of the contemporaneous and adjacent-month scores. Higher DE is better. The extracted equation has an ambiguous signed denominator and does not specify handling of zero changes, so it is not reproduced as an implementation-ready formula.

## Experiments

The data cover 1989-2023. Separate 12-month test periods are 2022 and 2023. The historical training periods end in 2020 and 2021 respectively, with input sequences taken from March-December of the immediately preceding year. Hyperparameter validation uses 2021 outcomes, 2020 inputs, and training data through 2019. VIEWS forecasts use information through the year before each test period; the downloaded data version is April 2024.

Comparisons include VIEWS, an always-zero model, and the paper's previous-history baseline, labeled the t-1 model.

| Comparison | Reported finding | Evidence |
| --- | --- | --- |
| Shape finder versus VIEWS | Better capture of variability for Shape finder; better overall accuracy for VIEWS | Results, Figure 4 |
| Compound versus both constituents and technical baselines | Lower MSE and higher DE in the reported mean log-ratio comparisons | Figure 4 |
| Repeated fluctuations and substantial violence | Shape finder often improves on VIEWS, which can overpredict or flatten the trajectory | Figures 5-6 |
| Isolated peaks amid zeros | Shape finder can substantially overpredict; VIEWS performs better | Figures 5-6 |
| Retrieval and clustering alternatives | Random references, top-one/three/five-match forecasts, and non-dominant clusters perform worse | Robustness section's account of appendix figures |

The authors report robustness to modest window changes, alternative DE balancing factors, and DTW-based evaluation. Their calibration exercise finds greater realized cluster membership when the majority cluster has a larger share, but calibration is imperfect. Numerical effect sizes cannot be recovered from Figure 4's textual caption alone. The discussion reports under two hours for 12-month forecasts across all countries on a regular desktop, without a controlled hardware benchmark.

## Limitations

- **Onsets:** All-zero histories force zero forecasts. The reported 86% rate of continued flat futures does not eliminate the remaining onset failures.
- **Scale and context:** Similar temporal shapes can correspond to different fatality magnitudes and conflict processes. Isolated-peak inputs are especially vulnerable to inappropriate analogs and overprediction.
- **Evidence scope:** Tests cover two years of country-level state-based fatalities. Proposed extensions to protests, riots, and violence against civilians are not evaluated here.
- **Uncertainty:** Cluster membership provides a confidence signal with imperfect reported calibration, not a demonstrated full predictive distribution.
- **Source precision:** The supplied text omits the online appendix itself and contains damaged mathematical notation. Exact compound selection and DE implementation require those additional materials; appendix findings above are the main article's reports.

## Related Concepts

- [[concepts/dynamic-time-warping|Dynamic Time Warping]]: aligns histories that evolve at different speeds.
- [[concepts/spatiotemporal-analog-forecasting|Spatiotemporal Analog Forecasting]]: extends the same retrieval-and-continuation principle to spatial as well as temporal configurations.

## Related Papers

- Chadefaux (2022), "A shape-based approach to conflict forecasting," *International Interactions* 48(4): 633-648: cited predecessor using weighted historical sequences rather than the filtered, clustered procedure.
- Hegre et al. (2022), "Forecasting fatalities": cited source for the VIEWS benchmark.
- [[papers/the-geometry-of-conflict-3d-spatio-temporal-patterns-in-fatalities-prediction|The geometry of conflict: 3D Spatio-temporal patterns in fatalities prediction]]: the library's spatial extension of ShapeFinder, which cites this paper and replaces temporal DTW matching with three-dimensional distribution matching.

[[index|Library home]]
