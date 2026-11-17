---
title: Change-Point Confidence Curves
type: concept
aliases:
  - Confidence Curves for Change Points
definition: Frequentist summaries that encode confidence sets across levels for a structural break's location or the associated change in model parameters.
tags:
  - change-point-detection
  - statistical-inference
---

## Overview

Change-point confidence curves summarize uncertainty about a structural break without committing to a single confidence level. They distinguish the best-fitting break date from how precisely it is located and from the magnitude of the associated parameter change.

## Key Ideas

- Profile out nuisance parameters at each candidate date, compare profile likelihoods through a deviance, and calibrate the deviance distribution by simulation.
- Under the convention used by Hermansen and colleagues, dates whose curve values fall below a chosen confidence level form the corresponding confidence set. These are frequentist confidence sets, not posterior probabilities over dates.
- Construct a separate curve for a smooth parameter contrast, such as the pre-break coefficient minus the post-break coefficient. Inclusion of zero indicates uncertainty about whether the target relationship changed.
- A model fitted under a break assumption always supplies a best date. Wide sets and model-homogeneity diagnostics help avoid treating that date as proof of change.
- Independent curves can combine information from groups with different break dates. Multiple or gradual breaks can broaden or distort the inferred location under a single-break specification.

## Important Papers

- [[papers/characterizing-and-assessing-temporal-heterogeneity-introducing-a-change-point-framework-with-applications-on-the-study-of-democratization|Hermansen, Knutsen, and Nygård (2021)]]: adapts confidence-curve inference to panel regressions and demonstrates uncertainty in democratization applications.
- Cunen, Hermansen, and Hjort (2018), “Confidence Distributions for Change-Points and Regime Shifts”: foundational framework cited by the panel application.

## Related Concepts

- [[concepts/asynchronous-change-point-detection|Asynchronous Change-Point Detection]]: addresses variation in break timing across series.
- [[concepts/regularized-change-point-regression|Regularized Change-Point Regression]]: stabilizes segmented coefficient estimates through shrinkage, a different objective from confidence-curve calibration.
