---
title: Grid-Based Posterior Inference
type: concept
aliases:
  - Grid Posterior Approximation
tags:
  - bayesian-inference
  - uncertainty-quantification
  - latent-variable-models
---

## Overview

Grid-based posterior inference approximates a continuous latent distribution by evaluating its prior and likelihood on a finite collection of positions and normalizing the resulting weights. It is useful for bounded, low-dimensional latent spaces where the entire distribution can be represented directly, including sparse-response political maps.

## Key Ideas

For an equally spaced grid $\mathcal G$ and fixed model parameters $\theta$,

$$
q(g)=\frac{p(Y^{\mathrm{obs}}\mid g,\theta)p(g)}
{\sum_{h\in\mathcal G}p(Y^{\mathrm{obs}}\mid h,\theta)p(h)}.
$$

The common cell-volume factor cancels on a uniform grid. This is a discrete approximation to the continuous posterior; the choice of support and resolution remains part of the approximation.

- **Sparse evidence:** A conditionally independent item likelihood can multiply terms only over observed answers. Omitting missing terms permits inference without filling answers, but does not model the mechanism causing nonresponse.
- **Posterior summaries differ:** The mean $\sum_g gq(g)$ need not lie on a grid node, whereas the MAP does. Predicting from the mean, $f(\sum_g gq(g))$, generally differs from posterior predictive averaging, $\sum_g f(g)q(g)$, for nonlinear $f$.
- **Shape and conditioning:** Grid weights can represent asymmetric or multimodal distributions without a Gaussian posterior approximation. Uncertainty is conditional on any parameters held fixed; a grid over positions alone does not account for uncertainty in fitted item parameters.
- **Geometry matters:** A bounded domain prevents positions from leaving the plotting frame. Prior concentration and support shape also affect shrinkage, boundary mass, and rotational symmetry.
- **Scaling limits:** With $R$ positions per axis, the grid has $R^d$ points. Vectorization makes evaluation efficient at small $d$ but does not remove exponential growth with dimension.

## Important Papers

- [[papers/ixplore-bounded-ideal-point-estimation-with-grid-based-uncertainty-quantification|IXPLORE: Bounded Ideal Point Estimation with Grid-Based Uncertainty Quantification]]: alternates conditional grid posteriors for respondents with logistic item fitting, comparing posterior means, MAP positions, and posterior-averaged predictions in sparse political response data.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: provides item likelihoods for latent respondent positions.
- [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]]: a square grid restricts rotational symmetry even when a response likelihood admits joint rotations.
- [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]]: distinguishes ignoring absent likelihood terms from modeling selective nonresponse.
