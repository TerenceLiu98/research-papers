---
title: Detecting and Correcting for Separation in Strategic Choice Models
type: paper
authors:
  - Casey Crisman-Cox
  - Olga Gasparyan
  - Curtis S. Signorino
year: 2023
doi: 10.1017/pan.2022.36
tags:
  - political-methodology
  - strategic-models
  - statistical-estimation
---

## TL;DR

Separation can inflate estimates and uncertainty throughout a strategic choice model even when numerical optimization reports convergence. Linear-programming diagnostics and penalized likelihood substantially improve estimation in the paper's simulations and change several inferences in a deterrence replication.

## Research Question

How can researchers detect and correct perfect prediction in extensive-form strategic models whose endogenous choice probabilities connect different players' utility estimates?

## Motivation

A separating regressor can push a likelihood optimum toward infinity. Numerical optimizers return tolerance-dependent finite values, potentially concealing the problem. In strategic models, distortion in one player's response probability propagates into the other player's estimated utilities; variable scale parameters also make visual checks for large coefficients unreliable.

## Contributions

- Develops bias-reduced statistical backward induction (BR-SBI) and full-information maximum likelihood (BR-FIML) estimators.
- Adapts a binary-outcome linear-programming diagnostic to five checks in a two-player deterrence model.
- Compares Jeffreys, Cauchy, and log-F penalties through simulations and a substantive replication; provides BR-FIML software in the games2 R package.

## Method

Player A chooses between the status quo and challenging B. Conditional on a challenge, B backs down or stands firm. Private action-specific payoff shocks produce probabilistic choices. B's response probability enters A's expected utility.

SBI first estimates B's binary response among observed challenges, then uses predicted response probabilities to construct A's regressors. BR-SBI penalizes both binary likelihoods. FIML jointly estimates the probabilities of all three terminal outcomes; BR-FIML maximizes the joint log-likelihood plus a penalty. The Jeffreys penalty is half the log determinant of the estimated information matrix. Cauchy(0, 2.5) and log-F(1, 1) density penalties avoid its dependence on likelihood curvature.

The diagnostic checks B's response against B's covariates, A's decision against SBI-transformed covariates, and each of the three outcome indicators against the combined transformed design after estimation. Endogenous response probabilities prevent a direct, fully ex ante FIML diagnostic (Section 2.2).

## Experiments

The main experiment generates 5,000 samples of 500 observations, reporting results for samples where separation is detected for B's back-down outcome. Approximately 90% of observations end at the status quo, leaving about 50 observations for SBI's first step. True coefficients are 1.5, −2.5, −1, and 4.

| Estimator | Mean estimate of B's slope (truth: 4) | Multivariate parameter RMSE |
| --- | ---: | ---: |
| Ordinary SBI | 9.28 | 5.73 |
| BR-SBI, Firth | 3.90 | 1.37 |
| Ordinary FIML | 7.04 | 4.33 |
| BR-FIML, Firth | 3.90 | 0.99 |
| BR-FIML, Cauchy | 4.27 | 0.93 |
| BR-FIML, log-F | 4.03 | 0.76 |

Table 1 reports zero power for testing B's slope against zero with either uncorrected estimator, versus 1.00 for the corrected estimators. All six attain 100% coverage for that coefficient, illustrating why coverage alone can conceal uninformatively wide intervals. Probability estimation improves in combined RMSE with BR-FIML, although bias increases when B's binary covariate equals zero (Table 2).

The replication examines 58 interstate crises from 1885–1983 using a 21-parameter model. Four of five diagnostic checks indicate separation. An undefined Jeffreys penalty at some optimization steps motivates log-F BR-FIML. Corrected estimators largely agree in sign and magnitude for 18 of 21 coefficients, and several previously significant findings lose significance. This is evidence of sensitivity to separation correction, not proof that the underlying substantive effects are absent.

## Limitations

The principal experiment conditions on detected separation and uses a simple binary-covariate design. Improvements should not be interpreted as universal rankings across strategic games. Unpenalized-likelihood Hessians yield conservative uncertainty for some corrected estimates, while BR-SBI undercovers another coefficient. Parameter bias reduction can increase probability bias. Small-sample sign reversals remain unexplained; collinearity is a possible rather than established explanation. Strong penalty sensitivity can indicate insufficient information for a demanding model. Extensions to signaling games and performance without separation remain open.

## Related Concepts

- [[concepts/separation-in-discrete-choice-models|Separation in Discrete Choice Models]] — the finite-sample estimation failure diagnosed and corrected here.

## Related Papers

- Firth (1993), “Bias Reduction of Maximum Likelihood Estimates”: foundational bias-reduction approach.
- Bas, Signorino, and Walker (2008), “Statistical Backwards Induction”: the two-step strategic estimator extended here.
- Signorino and Tarar (2006), “A Unified Theory and Test of Extended Immediate Deterrence”: the replicated application.

Published in *Political Analysis* 31: 414–429. [Article](https://doi.org/10.1017/pan.2022.36). Replication materials: [Code Ocean](https://doi.org/10.24433/CO.2467196.v1) and [Dataverse](https://doi.org/10.7910/DVN/BYO6KX).
