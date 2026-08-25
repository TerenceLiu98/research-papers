---
title: Generalized Functional Additive Nonlinear Models
type: concept
aliases:
  - FANMI
  - Functional Additive Nonlinear Models with Multimodal Interactions
tags:
  - functional-data-analysis
  - functional-regression
  - additive-models
  - multimodal-interactions
  - hypothesis-testing
---

## Overview

Generalized functional additive nonlinear models represent a scalar response as a generalized additive function of functional predictors and scalar covariates. The FANMI formulation uses functional principal component scores as finite-dimensional coordinates, then models each score and scalar covariate jointly with a smooth bivariate component. This makes nonlinear functional-scalar interactions estimable while retaining an additive structure across components.

## Key Ideas

- A functional predictor $X(t)$ is represented by a finite number of functional principal component scores. The scores are scaled to $[0,1]$ so that the bivariate component functions have a bounded domain.
- The core model is $g\{E(Y \mid \boldsymbol{\zeta}, Z)\} = f_0(Z) + \sum_{j=1}^{K} f_j(\zeta_j, Z)$, where $g$ is a known link, $f_0$ is univariate, and each $f_j$ is a smooth interaction surface.
- Tensor-product B-splines approximate the univariate and bivariate functions. Quasi-likelihood estimation supports responses from a general exponential-family setting when the conditional variance function is specified.
- A global goodness-of-fit test checks whether the centered univariate and bivariate components are jointly zero. An interaction test checks whether selected $f_j(\zeta_j,Z)$ can be reduced to functions of the functional score alone.
- The interaction test uses an integrated squared difference and a bootstrap procedure for finite-sample calibration. The paper establishes consistency, asymptotic normality, confidence-band results, and asymptotic distributions for the tests under regularity conditions.
- The same principal-component construction can express functional-functional interactions by replacing the scalar covariate with scores from a second functional predictor, although the paper studies the functional-scalar case.

## Important Papers

- [[Generalized Functional Additive Nonlinear Models with Multimodal Interaction Effects]]
- Müller and Yao (2008), "Functional additive models."
- Müller and Stadtmüller (2005), "Generalized functional linear models."
- James (2002), "Generalized linear models with functional predictors."

## Related Concepts

- [[Functional Principal Component Analysis]]
- Functional data analysis
- Functional regression
- Generalized additive models
- Quasi-likelihood estimation
- B-spline approximation
