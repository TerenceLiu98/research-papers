---
title: Three-Pass Regression Filter
type: concept
definition: "A supervised factor forecasting procedure that estimates predictor loadings using proxies, extracts factors through cross-sectional regressions, and regresses the target on those factors."
aliases:
  - 3PRF
tags:
  - factor-models
  - supervised-dimension-reduction
  - forecasting
---

## Overview

The three-pass regression filter uses target-relevant proxies to guide dimension reduction in a large predictor panel. It aims to retain predictive factors even when other common factors account for substantial predictor variance.

## Key Ideas

- First-pass time-series regressions on proxies estimate loading directions. Second-pass cross-sectional regressions recover factor scores. A third-pass regression maps these scores to the target.
- Supervision acts on factor directions; it need not select a sparse subset of original predictors.
- Mixed-frequency variants estimate high-frequency factors and aggregate them for a lower-frequency target regression.
- Kernel variants perform the procedure in nonlinear feature space. Nonlinear mapping and temporal aggregation generally do not commute, so their order must remain explicit.
- Predictive recovery depends on informative proxies and identification conditions. Estimated factors are recovered up to transformations; prediction can remain identified without uniquely identifying individual factors.

## Important Papers

- Kelly and Pruitt (2015), “The Three-Pass Regression Filter: A New Approach to Forecasting Using Many Predictors”: original framework, as described in the paper below.
- Hepenstrick and Marcellino (2019), “Forecasting Gross Domestic Product Growth With Large Unbalanced Data Sets: The Mixed Frequency Three-Pass Regression Filter”: mixed-frequency extension.
- [[papers/forecasting-macroeconomic-variables-with-high-frequency-predictors-a-supervised-nonlinear-mixed-frequency-factor-approach|Forecasting Macroeconomic Variables With High-Frequency Predictors]]: kernel extension with explicit aggregation algebra, conditional consistency results, and US forecasting evidence.

## Related Concepts

- [[concepts/targeted-predictors-for-factor-models|Targeted Predictors for Factor Models]]: screens indicators before factor extraction, a distinct route to supervised dimension reduction.
- [[concepts/mixed-frequency-dynamic-factor-models|Mixed-Frequency Dynamic Factor Models]]: shares latent-factor compression and aggregation, while modeling dynamics through a state-space system.
