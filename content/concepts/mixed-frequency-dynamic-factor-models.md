---
title: Mixed-Frequency Dynamic Factor Models
type: concept
aliases:
  - MF-DFM
tags:
  - dynamic-factor-models
  - mixed-frequency-data
  - nowcasting
---

## Overview

Mixed-frequency dynamic factor models represent co-movement across observed series through a smaller set of evolving latent factors. Observation equations connect those factors to series measured at different frequencies, while a state-space representation handles missing observations and delayed releases. They can support both nowcasting observed aggregates and reconstructing unobserved higher-frequency activity.

## Key Ideas

- **Separate dynamics from observation frequency.** Factors evolve at a common high frequency; aggregation weights translate their paths into the frequency and transformation of each observed variable. Log-growth approximations require different weights from simple sums of levels.
- **Use factors for different kinds of compression.** A large indicator panel can inform a single target, or many regional targets can share a small set of latent dynamics. These are distinct applications of the same dimension-reduction principle.
- **Add aggregate information explicitly.** In regional models, national quarterly output can constrain the weighted regional common components. A stochastic restriction allows discrepancies from approximate aggregation and incomplete regional coverage.
- **Balance fit and dimension.** Too few factors can force heterogeneous series onto nearly proportional paths; too many can overfit short histories. Shrinkage helps regularize dynamics and loadings but does not remove the factor-selection problem.
- **Match evaluation to observable quantities.** Accuracy at the low frequency does not directly establish the accuracy of latent high-frequency paths. Release-delay simulations also differ from historical-vintage tests that include revisions.

## Important Papers

- [[papers/nowcasting-gdp-with-a-pool-of-factor-models-and-a-fast-estimation-algorithm|Nowcasting GDP with a Pool of Factor Models and a Fast Estimation Algorithm]]: combines mixed-frequency aggregation with time-varying parameters, variance discounting, and dynamic averaging over 49,152 U.S. GDP models.
- [[papers/nowcasting-economic-activity-in-european-regions-using-a-mixed-frequency-dynamic-factor-model|Nowcasting economic activity in European regions using a mixed-frequency dynamic factor model]]: combines annual regional GVA and quarterly national GVA with factor dynamics, horseshoe shrinkage, and stochastic aggregation restrictions.
- [[papers/predictor-preselection-for-mixed-frequency-dynamic-factor-models|Predictor Preselection for Mixed-Frequency Dynamic Factor Models]]: studies how screening indicators changes downstream factor-model nowcast accuracy.
- Mariano and Murasawa (2003), "A new coincident index of business cycles based on monthly and quarterly series": aggregation foundation cited by the regional nowcasting paper.

## Related Concepts

- [[concepts/temporal-disaggregation|Temporal Disaggregation]]: reconstructing a high-frequency path from lower-frequency observations.
- [[concepts/targeted-predictors-for-factor-models|Targeted Predictors for Factor Models]]: selecting informative indicators before factor estimation.
- [[concepts/midas-regression|MIDAS Regression]]: a related regression approach to using predictors sampled at different frequencies.
- [[concepts/stochastic-volatility|Stochastic Volatility]]: allows state-space shock variances to change across calm and disrupted periods.
- [[concepts/forecast-combination|Forecast Combination]]: pools alternative predictor sets and factor dimensions when their usefulness changes over time.
