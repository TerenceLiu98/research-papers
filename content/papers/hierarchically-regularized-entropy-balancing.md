---
title: Hierarchically Regularized Entropy Balancing
type: paper
authors:
  - Yiqing Xu
  - Eddie Yang
year: 2023
doi: 10.1017/pan.2022.12
tags:
  - causal-inference
  - weighting
  - regularization
---

## TL;DR

Hierarchically regularized entropy balancing (hbal) expands covariates into polynomial and interaction terms, then uses group-specific ridge penalties to balance those features approximately while balancing original covariate means exactly by default. Simulations report lower bias and variance than several alternatives and faster computation than kernel balancing. Outcome augmentation (hbal+) addresses residual imbalance when its outcome model is correctly specified.

## Research Question

Can entropy balancing accommodate many nonlinear covariate functions without infeasible constraints, concentrated weights, or discretionary selection of moments?

## Motivation

Exact balance on a small feature set can leave nonlinear confounding unaddressed. Expanding that set can make exact balancing fail or yield high-variance estimates. The paper seeks a data-driven compromise between these problems for the average treatment effect on the treated (ATT).

## Contributions

- Extends [[concepts/entropy-balancing|Entropy Balancing]] through group-specific ridge regularization of dual multipliers.
- Selects regularization using held-out covariate balance and combines weighting with an optional outcome model.
- Demonstrates the approach in Monte Carlo experiments and a judicial-voting reanalysis; provides the R package hbal.

## Method

Let $X_i$ contain expanded pretreatment covariates, $m$ their treated-group means, and $q_i$ normalized positive control base weights. The dual objective is

$$
\min_\lambda\;\log\sum_{i\in C}q_i\exp(-X_i^\top\lambda)+m^\top\lambda
+\sum_{k=1}^K\alpha_k\sum_{t\in P_k}\lambda_t^2.
$$

The resulting control weights are proportional to $q_i\exp(-X_i^\top\lambda)$ and normalized to sum to one. The ATT estimate subtracts the weighted control outcome mean from the treated mean.

Six feature groups contain levels, two-way interactions, squares, three-way interactions, square-by-level interactions, and cubes. Setting the level penalty to zero preserves exact mean balance by default; higher-order groups receive separately tuned penalties. Setting all penalties to zero recovers entropy balancing on the expanded feature set. Trust-region optimization and V-fold cross-validation select penalties to minimize mean absolute expanded-feature imbalance between held-out controls and treated units (Section 2.1).

For hbal+, fit an untreated-outcome model using the expanded features and compute the same weighted contrast on outcome residuals. This can correct bias from remaining imbalance. Nonzero penalties on features needed for treatment assignment can prevent the weighting model from being consistent, so consistency must not be inferred from the label of double robustness alone (Section 2.2).

## Experiments

**Simulation design:** Six original covariates expand to 69 third-degree features. Treatment assignment depends on levels and randomly selected higher-order terms. Outcomes follow linear, polynomial nonlinear, or trigonometric designs, with zero treatment effects. The main comparison uses $N=900$ and a 5:1 control-to-treated ratio. Comparators include raw mean differences, propensity weighting, CBPS, CEM, ordinary entropy balancing, expanded-feature exact entropy balancing, and kernel balancing.

**Reported findings:** Expanded-feature exact balancing suffers from nonconvergence. In the nonlinear and trigonometric designs, hbal and hbal+ yield less bias and smaller variance than ordinary entropy balancing, its expanded exact variant, and kernel balancing. Timing comparisons average over 500 samples at varying sample sizes and favor hbal over kernel balancing, increasingly at larger sizes. The supplied text does not give numerical bias, variance, or timing values.

**Judicial voting:** The application revisits Black and Owens (2016), treating Supreme Court vacancy periods as treatment and presidentially aligned circuit-court votes as the outcome. Seven original covariates are expanded for hbal+. Weighted regressions use judge-clustered standard errors. hbal+ indicates increased alignment among promotion contenders and no significant vacancy-period difference among noncontenders. Ordinary entropy balancing plus regression is sensitive to feature specification; the paper compares 500 randomly varied higher-moment specifications. These results broadly support the original study in this analysis.

## Limitations

Identification still requires assumptions about confounding and overlap. Regularizing higher moments does not guarantee removal of nonlinear imbalance, and exact balance on unpenalized levels can remain demanding. A correctly specified outcome model is particularly important when regularization prevents the weighting model from recovering the treatment mechanism. The reported advantage is demonstrated in the studied designs, particularly when a polynomial expansion approximates the data-generating process. Supplementary theoretical details, inference procedures, and the Lalonde application are referenced but absent from the supplied Markdown.

## Related Concepts

- [[concepts/entropy-balancing|Entropy Balancing]]: the exact-balancing foundation and its regularized extension.
- [[concepts/weighting-diagnostics-for-causal-estimation|Weighting Diagnostics for Causal Estimation]]: checks for residual distributional imbalance and information concentration remain relevant after fitting weights.

## Related Papers

- Hainmueller (2012), “Entropy Balancing for Causal Effects”: foundational exact moment balancing.
- Zhao and Percival (2017), “Entropy Balancing Is Doubly Robust”: model-based consistency properties underlying the discussion.
- Hazlett (2020), “Kernel Balancing”: flexible balancing comparator.
- [[papers/what-to-observe-when-assuming-selection-on-observables|What to Observe When Assuming Selection on Observables]]: a separate diagnostic reanalysis of the same judicial study reaches different substantive conclusions with other estimators and specifications; the two analyses should not be conflated.

Published in *Political Analysis* 31, 457–464 (2023); first published online June 20, 2022. [Replication data and code](https://doi.org/10.7910/DVN/QI2WP9).
