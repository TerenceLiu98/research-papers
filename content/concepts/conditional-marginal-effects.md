---
title: Conditional Marginal Effects
type: concept
aliases:
  - Conditional Marginal Effect
  - CME
tags:
  - causal-inference
  - treatment-effect-heterogeneity
  - semiparametric-inference
---

## Overview

A conditional marginal effect summarizes how a treatment's effect varies along a prespecified pre-treatment moderator $X$, averaging over other covariates $Z$ within each moderator value. For binary treatment,

$$
\theta(x)=\mathbb E[Y(1)-Y(0)\mid X=x]
=\int\mathbb E[Y(1)-Y(0)\mid X=x,Z=z]\,dF_{Z\mid X=x}(z).
$$

It is a CATE indexed by a reduced covariate set. For continuous treatment, the analogous target averages the dose-response derivative over $(D,Z)\mid X=x$. Both definitions require an explicit target population and causal identification assumptions.

## Key Ideas

- **Marginalization uses the conditional population.** Averaging over $Z\mid X=x$ differs from evaluating a regression at mean covariates or averaging over a fixed, common distribution of $Z$.
- **Effect modification is not causal moderation.** A difference between $\theta(x_1)$ and $\theta(x_2)$ describes treatment-effect heterogeneity. It does not by itself establish what would happen if $X$ were changed by intervention.
- **Support must hold locally.** [[concepts/causal-overlap|Causal Overlap]] requires treatment variation among comparable covariate profiles near the moderator values being interpreted. A smooth regression curve can extend into regions with no credible comparison.
- **Signals separate adjustment from presentation.** For binary treatment, AIPW combines outcome regressions and propensity weighting into a signal whose conditional mean is the CME. Smoothing that signal over $X$ produces an interpretable curve while using richer covariates for adjustment.
- **Cross-fitting addresses nuisance overfitting.** [[concepts/double-machine-learning|Double Machine Learning]] forms orthogonal signals with held-out nuisance predictions. Basis approximation and smoothing still govern how accurately the final curve represents heterogeneity.
- **Continuous-treatment residualization imposes structure.** Regressing residualized $Y$ on residualized $D$ with a varying coefficient targets the CME under a partially linear dose-response model. Without that structure, the projection coefficient need not be the average derivative.
- **Curve-wide claims require simultaneous inference.** Pointwise intervals answer questions at fixed moderator values. Claims over a range require simultaneous bands and control of smoothing or approximation bias.

## Important Papers

- [[papers/a-practical-guide-to-estimating-conditional-marginal-effects-modern-approaches|A Practical Guide to Estimating Conditional Marginal Effects: Modern Approaches]]: connects estimands and identification to kernel, AIPW-Lasso, and cross-fitted DML estimation, with simulations and political-science reanalyses.
- Hainmueller, Mummolo, and Xu (2019), "How much should we trust estimates from multiplicative interaction models? Simple tools to improve empirical practice": foundational diagnostics and kernel methods discussed in the guide.

## Related Concepts

- [[concepts/double-machine-learning|Double Machine Learning]]
- [[concepts/causal-overlap|Causal Overlap]]
- [[concepts/causal-and-interpretable-heterogeneous-treatment-effects|Causal and Interpretable Heterogeneous Treatment Effects]]: distinguishes identifying direct causal modifiers from summarizing heterogeneity along an observed moderator.
