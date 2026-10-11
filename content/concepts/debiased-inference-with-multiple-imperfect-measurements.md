---
title: Debiased Inference with Multiple Imperfect Measurements
type: concept
aliases:
  - DMM
tags:
  - measurement-error
  - semiparametric-inference
  - orthogonal-scores
---

## Overview

Debiased inference with multiple imperfect measurements (DMM) estimates downstream parameters involving a latent categorical variable using multiple noisy proxies instead of gold-standard labels. It combines [[concepts/multiple-imperfect-measurement-identification|Multiple Imperfect Measurement Identification]] with a bridge whose conditional expectation reproduces the latent label and whose first-order sensitivity to estimated error rates vanishes.

## Key Ideas

For a binary latent variable $X^*$, write $\eta_{j,a}(d)=P(X^{(j)}=1\mid X^*=a,D=d)$, where $D$ collects the required observed conditioning information. The single-proxy bridge is

$$
M_j=\frac{X^{(j)}-\eta_{j,0}(D)}{\eta_{j,1}(D)-\eta_{j,0}(D)}.
$$

Under conditional independence, products over distinct proxies also have conditional expectation $X^*$. For at least three proxies, averaging pair and triple products gives the robust bridge

$$
H^R=3\binom{J}{2}^{-1}\sum_{j<k}M_jM_k
-2\binom{J}{3}^{-1}\sum_{j<k<\ell}M_jM_kM_\ell.
$$

- **Correct the moment, not just the label.** Replace a binary full-data moment with $(1-H^R)\psi^F(Y,0,W;\beta)+H^R\psi^F(Y,1,W;\beta)$. Its expectation matches the oracle moment. Bridge values need not be probabilities.
- **Orthogonality limits nuisance bias.** The weights 3 and -2 cancel first-order nuisance errors. Cross-fitting and suitable product-rate and regularity conditions support root-$n$ inference, connecting the method to [[concepts/double-machine-learning|Double Machine Learning]]. A sufficient rate in the binary theorem is maximum nuisance $L_2$ error $o_p(n^{-1/4})$.
- **Robustness has a specific scope.** Consistency can tolerate one misspecified proxy-specific nuisance model if all others are consistent and the remaining assumptions hold. This is not robustness to arbitrary dependence among proxies, nor an automatic confidence-interval guarantee under misspecification.
- **Additional proxies have a quality threshold.** The symmetric bridge can lose precision when weak proxies have small class contrasts. Under equal conditional single-bridge variances, its measurement-noise variance falls at order $J^{-2}$; this comparison does not itself prove growing-$J$ asymptotics.
- **Outcome and multicategory extensions require appropriate bridges.** A latent predictor requires conditioning that includes the observed downstream outcome in the general formulation. Multicategory variables require class-specific inverse measurement constructions, sufficient rank, and semantic anchoring.
- **Validation restores a different route to validity.** With a gold-standard sample drawn under known probabilities, a DSL correction can use DMM moments as imputations and correct their remaining error even when the conditional-independence model is wrong.

## Important Papers

- [[papers/debiased-inference-for-ai-generated-data-without-gold-standard-labels-identification-via-multiple-imperfect-measurements|Debiased Inference for AI-Generated Data without Gold-Standard Labels: Identification via Multiple Imperfect Measurements]]: general downstream formulation, multiple-proxy bridge, efficiency analysis, and diagnostics.
- Guo et al. (2026), "Proximal Causal Inference for Hidden Outcomes": antecedent three-proxy robust bridge in the latent-outcome setting, as discussed in the DMM manuscript.
- Zhou and Tchetgen Tchetgen (2024), "Causal inference for a hidden treatment": related semiparametric inference with latent treatments.

## Related Concepts

- [[concepts/multiple-imperfect-measurement-identification|Multiple Imperfect Measurement Identification]]
- [[concepts/double-machine-learning|Double Machine Learning]]
