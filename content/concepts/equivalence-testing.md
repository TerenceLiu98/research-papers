---
title: Equivalence Testing
type: concept
aliases:
  - Tests of Equivalence
definition: "Hypothesis testing that assesses whether a parameter lies within a substantively negligible range by rejecting a null of a meaningful discrepancy."
tags:
  - statistical-inference
  - equivalence-testing
---

## Overview

Equivalence tests distinguish evidence of a negligible difference from failure to detect a difference. For a tolerance $\epsilon>0$, a symmetric test contrasts $H_0: |\theta|\geq\epsilon$ with $H_A: |\theta|<\epsilon$. The tolerance requires substantive justification.

## Key Ideas

- Low power in a conventional equality test does not establish equivalence. An equivalence test needs enough precision to rule out consequential discrepancies.
- Two one-sided tests reject both components of the nonequivalence null. Under the corresponding interval construction, this requires the $100(1-2\alpha)\%$ confidence interval to lie inside the equivalence bounds.
- Ratio parameters can use reciprocal bounds around one rather than additive bounds around zero.
- An equivalence confidence interval, as used by Hartman, reports the smallest equivalence range supported at a specified significance level. It removes dependence on a prespecified tolerance from the reported range, but cannot decide which discrepancies matter substantively.
- In causal-design diagnostics, equivalence supports observable implications of assumptions; it does not establish unobservable identifying assumptions or automatically bound causal bias.

## Important Papers

- [[papers/the-impact-of-media-framing-in-complex-information-environments|The Impact of Media Framing in Complex Information Environments]]: uses a 0.15-point substantive threshold to assess a near-zero framing effect on a seven-point attitude scale.

- [[papers/equivalence-testing-for-regression-discontinuity-designs|Equivalence Testing for Regression Discontinuity Designs]]: adapts equivalence inference to local covariate discontinuities and running-variable density ratios.
- Hartman and Hidalgo (2018), *An Equivalence Approach to Balance and Placebo Tests*: antecedent for causal-design diagnostics discussed in Hartman's RD paper.

## Related Concepts

- [[concepts/regression-discontinuity-design|Regression Discontinuity Design]]: equivalence tests assess whether cutoff discrepancies are small enough to support design credibility.
