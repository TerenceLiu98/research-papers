---
title: Maximum Mean Discrepancy
type: concept
aliases:
  - MMD
tags:
  - kernel-methods
  - distribution-testing
  - probability
---

## Overview

Maximum mean discrepancy (MMD) compares distributions through their mean embeddings in a reproducing kernel Hilbert space (RKHS). For kernel $\kappa$ and embedding $m_P=\mathbb E_{X\sim P}\kappa(\cdot,X)$, it is the distance $\|m_P-m_Q\|_{\mathcal H}$. Its squared form is often used as a test statistic.

## Key Ideas

- MMD is the largest expectation contrast over the RKHS unit ball. The kernel determines the function class and hence the geometry of the comparison.
- For a characteristic kernel, the mean embedding is injective: population MMD is zero exactly when the distributions agree. Gaussian kernels provide an example. This population property does not guarantee high finite-sample power against every alternative.
- Squared MMD expands into expectations of within-distribution and cross-distribution kernel evaluations. Empirical V-statistics include diagonal terms; U-statistics omit them and can be unbiased in suitable sampling settings with fixed distributions or transformations.
- Under an equality null, the squared discrepancy has a vanishing first derivative. Its leading fluctuation can therefore have a weighted chi-square limit rather than an ordinary Gaussian limit.
- Estimated counterfactuals require additional uncertainty accounting. In [[concepts/distributional-difference-in-differences|Distributional Difference-in-Differences]], an estimated transport map contributes to the covariance spectrum used for calibration; ordinary independent two-sample calibration is not automatically valid.
- The discrepancy measures distributional separation. A causal interpretation requires an independently justified identification design, and the scalar discrepancy alone does not identify affected individuals or the direction of a policy's effect.

## Important Papers

- Gretton et al. (2012), "A kernel two-sample test," the foundational testing reference cited by the ingested paper.
- Sriperumbudur et al. (2010), "Hilbert space embeddings and metrics on probability measures," cited there for characteristic mean embeddings.
- [[papers/a-test-for-treatment-heterogeneity-under-a-distributional-difference-in-difference-framework|A Test for Treatment Heterogeneity under a Distributional Difference-in-Difference Framework]]: Applies squared MMD to an observed and a transported counterfactual law, accounting for the estimated map.

## Related Concepts

- [[concepts/distributional-difference-in-differences|Distributional Difference-in-Differences]]
- [[concepts/optimal-transport|Optimal Transport]]: Constructs the counterfactual in this application; MMD supplies the subsequent discrepancy test.
