---
title: Factor-Augmented Sparse Regression
type: concept
aliases:
  - Sparse-Plus-Dense Regression
tags:
  - factor-models
  - sparse-regression
  - high-dimensional-statistics
---

## Overview

Factor-augmented sparse regression combines a small number of common factors with a sparse set of individual predictor effects. Factors summarize signals distributed across many variables, while sparse coefficients retain predictive information that a factor-only representation can miss.

## Key Ideas

For predictors with decomposition $x_t=Bf_t+u_t$, a regression containing $x_t^\top\beta+f_t^\top\gamma$ can be rewritten as

$$
u_t^\top\beta+f_t^\top(B^\top\beta+\gamma).
$$

This separates sparse idiosyncratic predictor effects from a common component. In practice, factors are latent and can be estimated by PCA, with sparse penalties applied to original predictor coefficients and factor coefficients left unpenalized.

- Dense refers to the factors' broad predictor loadings, not a large number of factors. Sparse refers to the selected regression coefficients, not necessarily sparse factor loadings.
- Sparse-group penalties exploit known predictor groups while allowing selection within groups. MIDAS basis coefficients belonging to one original series provide a natural example.
- Estimated factors introduce additional prediction error. Strong-factor assumptions and a sufficiently wide factor panel can make that contribution asymptotically negligible relative to sparse estimation error.
- Factor-only and sparse-only regressions are useful restricted comparisons. Their relative performance depends on the signal structure; adding factors need not improve every horizon or evaluation period.
- Good prediction from common and idiosyncratic components does not itself identify structural economic shocks or causal effects.

## Important Papers

- [[papers/factor-augmented-sparse-midas-regressions-with-an-application-to-nowcasting|Factor-Augmented Sparse MIDAS Regressions with an Application to Nowcasting]]: establishes prediction bounds under estimated factors, approximation error, polynomial tails, and $\tau$-mixing, and applies the approach to GDP nowcasting.
- Fan, Masini, and Medeiros (2023), "Bridging Factor and Sparse Models": general sparse-plus-dense framework cited by the MIDAS paper.
- Beyhum and Striaukas (2024), "Testing for Sparse Idiosyncratic Components in Factor-Augmented Regression Models": component-testing approach cited and used in its empirical analysis; validity in the MIDAS paper's precise dependence setting is left open.

## Related Concepts

- [[concepts/midas-regression|MIDAS Regression]]: reduces high-frequency lag dimension before sparse-plus-factor estimation.
- [[concepts/deep-neural-network-factor-models|Deep Neural Network Factor Models]]: a distinct extension using nonlinear responses to common factors; sparse regression coefficients here do not imply a neural factor model.
