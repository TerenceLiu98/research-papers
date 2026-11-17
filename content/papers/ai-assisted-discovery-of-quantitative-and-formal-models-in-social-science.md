---
title: AI-Assisted Discovery of Quantitative and Formal Models in Social Science
type: paper
authors:
  - Julia Balla
  - Sihao Huang
  - Owen Dugan
  - Rumen Dangovski
  - Marin Soljačić
year: 2023
tags:
  - symbolic-regression
  - computational-social-science
  - scientific-discovery
---

## TL;DR

The paper extends OccamNet to discover compact equations from noisy social-science data using complexity penalties and shared expression structures across panels with different constants. Case studies recover familiar functional relationships and expose accuracy–complexity trade-offs, supporting hypothesis generation rather than automatic causal identification.

## Research Question

Can neuro-symbolic regression systematically explore interpretable quantitative models while incorporating researcher-specified priors and pooling information across heterogeneous longitudinal datasets?

## Motivation

Theory-driven functional forms can obscure nonlinear relationships, while flexible predictors often lack interpretable structure. Small, noisy datasets make unconstrained equation discovery difficult. Searching a controlled expression space offers researchers explicit alternatives to familiar models.

## Contributions

- Activation, constant, and unit regularization to control expression complexity and dimensional consistency.
- Shared symbolic structures with separately fitted panel-specific constants.
- Static and dynamical case studies showing how basis restrictions and regularization change discovered models.

## Method

OccamNet represents a probability distribution over compositions of user-specified basis functions. It samples expressions, fits numerical constants, evaluates their fitness, and updates connection probabilities toward better candidates. Users specify variables, basis functions, and maximum expression depth (§I; Appendix A).

Activation and constant penalties count operators and fitted constants. A unit checker penalizes dimensionally inconsistent expressions. Sweeping penalties produces an empirical complexity–accuracy frontier; its meaning depends on the chosen operator library and complexity measure.

For panel data, the expression structure is shared while constants vary by panel. Each panel’s error is normalized by its sample count before aggregation. For dynamical discovery, centered numerical derivatives become regression targets; interpolation or filtering mitigates noise amplification. Shared structure is an assumption about the panels, not a consequence of allowing their constants to differ.

## Experiments

| Setting | Reported result |
|---|---|
| HEP-TH citation densification | Table II gives edges = 0.0117 × nodes^1.683, close to the reference power law. |
| Network degree distributions | Wikipedia yields a power law; HEP-TH favors a power law with an exponential correction in squared log degree. |
| US manufacturing, 1899–1922 | With 24 observations, unrestricted search finds alternatives outside the Cobb–Douglas baseline’s complexity–error point. Restricting bases recovers output = capital^0.249 × labor^0.754. |
| Predator–prey dynamics | Synthetic Lotka–Volterra structure is recovered. Interpolated 1900–1920 lynx–hare records recover growth, decay, and interaction terms, plus small constant corrections. |
| Measles cycles | Independent fits recover the susceptible–infected interaction in only one of five cycles; shared fitting recovers it together with infected-population decay and higher-order corrections. |
| Economic growth | Twenty synthetic panels recover the Solow–Swan structure. Across 18 OECD countries, stronger regularization moves from a less interpretable low-error expression to capital growth = savings × output − capital × population growth, then to savings × output alone. |

The OECD panels span 4–39 years. The regularized real-data expression omits the full Solow model’s depreciation and technological-growth term; it is a partial structural match. These case studies primarily compare fitted equations and errors, rather than establishing broad held-out predictive superiority.

## Limitations

Search depends on the basis library, depth, penalties, and preprocessing. Numerical differentiation amplifies noise; smoothing and interpolation affect inferred dynamics. Small correction terms may reflect overfitting. Algebraic compactness does not guarantee economic meaning, and fit does not establish causal mechanisms or external validity. Degree-distribution least-squares fits require further distribution-appropriate goodness-of-fit testing (§II.1).

The supplied text has internal inconsistencies: densification prose gives approximately 1.692 while Table II gives 1.683; the measles period described in the main text differs from the periods in Table X. Some SIR equations also omit factors present elsewhere in the text. The summary therefore avoids treating those inconsistent transcriptions as exact recovered equations. The manuscript is dated 16 August 2023; no stable identifier for this paper is established in the supplied Markdown.

## Related Concepts

- [[concepts/symbolic-regression|Symbolic Regression]]: searches both equation structure and constants; this work adds panel sharing and interpretable complexity controls.

## Related Papers

- Costa et al., *Fast Neural Models for Symbolic Regression at Scale* (reference 18): OccamNet backbone extended here.
- Brunton, Proctor, and Kutz (2016), *Discovering governing equations from data by sparse identification of nonlinear dynamical systems* (reference 13): sparse regression over a prescribed term library, contrasted with composing terms from bases.
- [[papers/symformer-end-to-end-symbolic-regression-using-transformer-based-architecture|SymFormer]]: a complementary library paper on joint expression and constant prediction with pretrained transformers, rather than panel-specific OccamNet search.
