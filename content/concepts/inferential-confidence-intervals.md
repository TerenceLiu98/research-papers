---
title: Inferential Confidence Intervals
type: concept
aliases:
  - Inferential Confidence Interval
definition: "Intervals chosen so that their overlap or nonoverlap represents decisions about differences between estimates at a specified inferential threshold."
tags:
  - statistical-inference
  - visualization
---

## Overview

Inferential confidence intervals support visual comparison: overlapping intervals represent nonsignificant differences, while nonoverlapping intervals represent significant differences. Their confidence level generally differs from the level of the tests being represented. Ordinary 95% interval overlap alone is insufficient to classify pairwise differences reliably.

## Key Ideas

- Pair-specific calibration depends on relative standard errors, covariance, and the reference distribution. A single calibrated level may therefore fail across multiple pairs.
- An alternative is to perform the tests first and select a display level maximizing agreement with their decisions. Residual disagreements must be explicitly flagged.
- Multiplicity adjustment belongs to the upstream inference procedure; selecting a display level does not supply it.
- A level such as 84% can work in particular settings but is not a general solution.
- Failure to reject a difference is not evidence of substantive equivalence.

## Important Papers

- [[papers/decoupling-visualization-and-testing-when-presenting-confidence-intervals|Decoupling Visualization and Testing when Presenting Confidence Intervals]]: optimizes overlap agreement with precomputed tests and illustrates exact agreement for 30 comparisons in one application.

## Related Concepts

- [[concepts/predicted-probability-contrasts|Predicted Probability Contrasts]]: one class of model-based comparisons that inferential intervals can display.
- [[concepts/equivalence-testing|Equivalence Testing]]: tests negligible differences explicitly, a distinct aim from displaying nonsignificant equality tests.
