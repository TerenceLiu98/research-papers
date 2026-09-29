---
title: Variational Louis' Method
type: concept
aliases:
  - Variational Louis Information Approximation
tags:
  - variational-inference
  - uncertainty-quantification
  - likelihood-inference
---

## Overview

Variational Louis' method approximates the observed Fisher information of a latent-variable model by evaluating Louis' identity under a fitted variational distribution. It supplies approximate likelihood-based standard errors when the marginal likelihood is difficult to differentiate or integrate but complete-data derivatives are tractable.

## Key Ideas

- **Missing information:** For complete-data log-likelihood $\ell_c$ and its score $s=\nabla\ell_c$, the exact identity is $\mathcal I_{\mathrm{obs}}=-\mathbb E[\nabla^2\ell_c\mid y]-\operatorname{Var}(s\mid y)$. Latent-variable uncertainty subtracts information from the expected complete-data curvature.
- **Variational substitution:** Replacing the exact conditional distribution with $q$ makes the moments computable, but the resulting information and standard errors remain approximate. This is not simply the variance of a variational posterior over the parameters of interest.
- **Augmentation and surrogate curvature:** In Seo et al.'s logistic ideal-point model, Polya-Gamma augmentation exactly represents the likelihood before mean-field approximation. Applying Louis' identity to a Jaakkola-Jordan lower-bound surrogate instead uses a different complete-data objective. Good agreement in point estimates need not imply agreement in information estimates.
- **Nuisance adjustment:** If $\nu$ denotes nuisance parameters and $\Theta$ the target, the target covariance uses the inverse Schur complement $(\widetilde I_{\Theta}-\widetilde I_{\Theta,\nu}\widetilde I_{\nu}^{-1}\widetilde I_{\nu,\Theta})^{-1}$. Ignoring the correction is an additional approximation requiring justification.
- **Practical computation:** Complete-data Hessian moments may be analytic, while higher score moments can be evaluated by Monte Carlo under $q$. This avoids repeated bootstrap model fitting without necessarily eliminating sampling from the calculation.
- **Validation:** Agreement with a parametric bootstrap is useful evidence within a fitted model family. It does not by itself establish interval coverage under misspecification, informative missingness, or other identification conventions.

## Important Papers

- [[papers/uncertainty-aware-ideal-point-estimation-via-variational-em|Uncertainty-Aware Ideal Point Estimation via Variational EM]]: combines Polya-Gamma VEM with the information approximation and reports close bootstrap agreement in roll-call studies. Its practical implementation omits the nuisance correction and approximates some moments by Monte Carlo.
- Louis (1982), "Finding the observed information matrix when using the EM algorithm": the exact identity cited as the foundation by Seo et al.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: logistic latent-trait models provide the paper's application, with ideal points treated as fixed parameters and bill coefficients as random effects.
- [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]]: uncertainty calculations depend on the observation model; they do not substitute for modeling selective participation.
