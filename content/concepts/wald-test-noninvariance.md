---
title: Wald Test Noninvariance
type: concept
aliases:
  - Noninvariance of Nonlinear Wald Tests
definition: "The dependence of a nonlinear Wald statistic on the functional representation of a null restriction, even when alternative representations define the same admissible parameter set."
tags:
  - statistical-inference
  - specification-testing
---

## Overview

A nonlinear Wald test can give different finite-sample conclusions when the same null hypothesis is written in different algebraic forms. This matters when a specification decision determines whether observed dependence represents substantive effects or correlated disturbances.

## Key Ideas

For restriction vector $g(\eta)$, estimated parameter covariance $\widehat V$, and Jacobian $G$, the statistic is

$$
w=g(\hat\eta)'[G(\hat\eta)\widehat V G(\hat\eta)']^{-1}g(\hat\eta).
$$

The covariance approximation comes from a first-order Taylor expansion. Nonlinear reformulations alter this approximation away from the null, even if their zero sets coincide. Under appropriate regularity conditions they share an asymptotic reference distribution, but finite-sample size and power can differ. Ratio representations require particular care near zero denominators.

In a spatial Durbin model, $\rho\beta+\theta=0$ nests a spatial error model. Dividing this restriction by a nonzero coefficient preserves its null set but need not preserve its Wald statistic. Testing $\rho=0$ instead addresses a different, linear hypothesis.

Null-based bootstrap critical values can improve calibration separately for each representation; they do not guarantee invariance. A likelihood ratio test is invariant to equivalent descriptions of the same restricted model. Failure to reject a restriction remains compatibility with that model, not confirmation of its mechanism.

## Important Papers

- [[papers/the-wald-test-of-common-factors-in-spatial-model-specification-search-strategies|Juhl (2021)]]: analytical explanation, spatial Monte Carlo evidence, and an economic-voting reanalysis.
- Gregory and Veall (1985), “Formulating Wald Tests of Nonlinear Restrictions,” as cited by Juhl: foundational treatment of the representation problem.

## Related Concepts

- [[concepts/common-factor-restrictions-in-dynamic-regression|Common Factor Restrictions in Dynamic Regression]]: temporal model reductions also involve nonlinear parameter restrictions; the general warning motivates attention to test calibration without establishing a failure in every application.
