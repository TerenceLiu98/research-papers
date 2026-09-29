---
title: Random Effects Distribution Misspecification
type: concept
tags:
  - mixed-models
  - model-misspecification
  - statistical-inference
---

## Overview

Random effects distribution misspecification occurs when a mixed model integrates over a latent-effects distribution whose shape differs from the generating distribution. Assuming normal random intercepts for skewed latent heterogeneity is a common example. Its consequences depend on the inferential target, model link, cluster design, and magnitude of the random effects.

## Key Ideas

- **Target-specific robustness:** Evidence synthesized by McCulloch and Neuhaus (2011) supports strong robustness for within-cluster covariate effects in many random-intercept settings. Between-cluster effects and variance estimates are often reasonably stable, while nonlinear-model intercepts can be biased. These are qualified findings, not guarantees for every mixed model.
- **Fair comparisons:** Hold the true distribution fixed and compare correctly and incorrectly specified fits. Comparing different generating distributions under one fitting method does not isolate the cost of misspecification.
- **Likelihood limits:** Under regularity conditions, misspecified maximum likelihood converges to a Kullback-Leibler minimizing parameter. Agreement of that parameter with the intended coefficient must be established for the model and target; it is not automatic.
- **Prediction versus shape recovery:** Individual random-effect predictions can retain low mean squared error while their histogram reflects the assumed distribution. Histograms and Q-Q plots of these predictions are therefore unreliable as direct estimates of the latent distribution's shape.
- **Distinct assumption failures:** Dependence of random effects on covariates is more than a change of distributional shape. Informative cluster size can be represented through a conditional mixing distribution under suitable assumptions, but robustness conclusions remain model-specific.
- **Flexible fitting has costs:** Estimating extra shape parameters may introduce instability when each cluster contains little information. Greater distributional flexibility need not improve finite-sample estimation or prediction.

## Important Papers

- [[papers/misspecifying-the-shape-of-a-random-effects-distribution-why-getting-it-wrong-may-not-matter|Misspecifying the Shape of a Random Effects Distribution: Why Getting It Wrong May Not Matter]]: McCulloch and Neuhaus (2011) organize robustness evidence by target and demonstrate both stability and exceptions through simulations and HERS data.

## Related Concepts

- [[concepts/within-and-between-cluster-covariate-effects|Within- and Between-Cluster Covariate Effects]]: separates contrasts that can have different sensitivity to the latent mixing distribution.
