---
title: Bin-Conditional Conformal Prediction
type: concept
aliases:
  - BCCP
definition: "Conformal prediction that calibrates candidate outcomes separately within predefined outcome bins to target coverage conditional on each bin."
tags:
  - conformal-prediction
  - uncertainty-quantification
---

## Overview

Bin-conditional conformal prediction extends label-conditional calibration to ranges of numerical outcomes. It addresses situations where marginal coverage hides systematic undercoverage of rare or extreme outcomes.

## Key Ideas

- Partition calibration scores by observed outcome bin. Test each hypothetical outcome against the scores in its own bin, then unite accepted candidates across bins.
- Within-bin exchangeability supports bin-conditional validity. This conditions on an outcome range, not on a fixed feature vector, and does not guarantee uniform coverage inside each bin.
- One bin recovers standard conformal prediction. Finer bins need adequate calibration data and can increase prediction-set width.
- The union can be discontiguous. Taking its outer endpoints yields a contiguous superset, potentially increasing coverage beyond the target.
- Bins should reflect meaningful outcome ranges, such as zero versus positive counts, rather than being treated as a guarantee of pointwise tail calibration.

## Important Papers

- [[papers/bin-conditional-conformal-prediction-of-fatalities-from-armed-conflict|Bin-Conditional Conformal Prediction of Fatalities from Armed Conflict]]: introduces the construction and evaluates its coverage–width tradeoff on simulated and conflict-fatality data.

## Related Concepts

- [[concepts/conformal-prediction|Conformal Prediction]]: parent calibration framework.
- [[concepts/conditional-prediction-coverage|Conditional Prediction Coverage]]: distinguishes bin-level validity from feature-conditional coverage.
