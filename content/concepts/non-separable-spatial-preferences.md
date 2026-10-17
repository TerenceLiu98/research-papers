---
title: Non-Separable Spatial Preferences
type: concept
aliases:
  - Non-Separable Preferences
  - Nonseparable Spatial Preferences
tags:
  - spatial-voting
  - ideal-point-estimation
  - legislative-behavior
---

## Overview

Spatial preferences are non-separable when utility depends on combinations of deviations across policy dimensions, beyond the sum of dimension-specific losses. An actor can therefore prefer one policy package to another with equal coordinate-wise absolute deviations because the directions of those deviations differ. This is a property of utility, distinct from correlation between actors' ideal points.

## Key Ideas

- **Quadratic representation:** With $d=p-\theta$, utility $v(p)=-d^\top Ad$ uses a symmetric positive-definite weight matrix. Diagonal entries encode salience. Nonzero off-diagonal entries encode interactions; a diagonal matrix gives additive separability.
- **Substitution and complementarity:** In two dimensions, the loss is $A_{11}d_1^2+2A_{12}d_1d_2+A_{22}d_2^2$. Positive $A_{12}$ favors opposite-sign deviations, while negative $A_{12}$ favors same-sign deviations, holding their absolute sizes fixed. These labels require fixed substantive axes and refer to deviations from the actor's ideal point.
- **A roll-call response model:** Comparing yea and nay utilities with Normal difference errors gives $\Pr(y_{ij}=1)=\Phi(\beta_j^\top A\theta_i+\alpha_j)$. An interaction allows a position on one dimension to combine with a proposal's discrimination on another.
- **Identification is substantive:** Because $A=R^\top R$ can be absorbed into transformed ideal points and discriminations, the response likelihood does not by itself recover a unique utility interaction. Binding and Stoetzer use constraints and covariate-based ideal-point means to orient the dimensions.
- **Omitted interactions can alter the map:** Their simulations show that imposing separability can induce estimated ideal-point correlations and excessive salience for a dominant dimension. Similar in-sample prediction does not imply equivalent substantive recovery.
- **Effective dimension can fall:** As dimensions approach perfect substitutes or complements, indifference contours approach a degenerate geometry. The limiting one-dimensional decision space can mix two substantively distinct axes; exact degeneracy lies outside the positive-definite interior.
- **Detection need not imply large practical changes:** In the European Parliament application, four of five sessions show positive interactions with 95% credible intervals excluding zero, yet other parameters change little because interaction magnitudes are comparatively small.

## Important Papers

- [[papers/non-separable-preferences-in-the-statistical-analysis-of-roll-call-votes|Non-Separable Preferences in the Statistical Analysis of Roll Call Votes]]: develops the weighted probit model, demonstrates separability-induced distortions, and applies it to the U.S. Senate and European Parliament.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: connects actor positions and proposal parameters to voting probabilities.
- [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]]: clarifies the identification problem behind coordinate-dependent interpretations.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: distinguishes substantive axes from effective decision dimensions.
- [[concepts/hierarchical-ideal-point-estimation|Hierarchical Ideal-Point Estimation]]: the existing allyset/voteset formulation models group dependence and correlated positions, a different object from cross-dimensional interactions in utility.
