---
title: Simultaneous Confidence Bands
type: concept
aliases:
  - SCBs
tags:
  - statistical-inference
  - functional-data-analysis
  - multiple-testing
  - uncertainty-quantification
---

## Overview

Simultaneous confidence bands quantify uncertainty for an entire function over a specified domain. Unlike pointwise intervals, their coverage statement concerns all indexed values together. They are therefore suited to event studies, functional parameters, and other settings where conclusions depend on scanning a curve across many locations.

## Key Ideas

- **Uniform rather than pointwise coverage:** A nominal simultaneous band controls the probability that the true function leaves the band anywhere in the domain. A collection of nominal pointwise intervals generally lacks that guarantee.
- **Dependence improves on generic corrections:** Critical values based on a Gaussian process or bootstrap can use correlation across the function's domain. Bonferroni correction ignores that structure and can be unnecessarily conservative.
- **Supremum bands detect departures:** A supremum-based statistic is natural when the alternative requires the function to depart from a reference value or band somewhere.
- **Infimum bands establish containment:** Infimum-based one-sided bands support equivalence claims that require the function to remain strictly within specified bounds everywhere.
- **The indexed domain matters:** Coverage applies only to the event-time interval, spatial region, or other domain used to construct the band.
- **Estimation must include covariance structure:** Functional bands require an estimate of dependence across index values, not only a separate standard error at every point.

## Important Papers

- [[papers/making-event-study-plots-honest|Making Event Study Plots Honest: A Functional Data Approach to Causal Inference]] (Fang and Liebl, 2025): uses supremum bands for post-treatment relevance and infimum bands for pre-treatment equivalence in DiD event studies.
- Liebl and Reimherr (2023), "Fast and Fair Simultaneous Confidence Bands for Functional Parameters": develops computational methods and finite-sample corrections used by Fang and Liebl.
- Degras (2011), "Simultaneous Confidence Bands for Nonparametric Regression with Functional Data": an earlier functional-data treatment of simultaneous bands.

## Related Concepts

- [[concepts/honest-event-study-inference|Honest Event Study Inference]]: combines simultaneous bands with explicit reference bands for identifying bias.
- [[concepts/functional-data-classification|Functional Data Classification]]: another setting where observations are treated as functions, though its target is prediction rather than confidence-band construction.
