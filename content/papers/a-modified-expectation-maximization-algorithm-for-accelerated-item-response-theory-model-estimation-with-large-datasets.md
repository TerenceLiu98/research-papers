---
title: "A Modified Expectation-Maximization Algorithm for Accelerated Item Response Theory Model Estimation with Large Datasets"
type: paper
authors:
  - Tianying Feng
  - Li Cai
year: 2026
doi: "10.3758/s13428-026-02996-0"
source_job_id: "5dcca103-7318-42c0-82e6-bba9f886db3f"
tags:
  - expectation-maximization
  - item-response-theory
  - convergence-acceleration
  - large-scale-estimation
  - standard-errors
---

## TL;DR

Feng and Cai accelerate marginal maximum-likelihood estimation for unidimensional two-parameter logistic item response models with a two-stage EM procedure. Full-data EM first moves the parameters toward the maximum-likelihood neighborhood; sequential partial E-steps and damped Newton-style M-steps then update parameters on shuffled respondent subsets, with running averages stabilizing the iterates. Simulations report comparable recovery with suitable subset sizes and up to a 60.78% runtime reduction in a one-million-respondent form-design scenario. The advantage depends on scale: the modified method was slower than standard EM for 18 items, and its cross-product standard errors were least accurate with 10% subsets.

## Research Question

Can [[concepts/partial-step-expectation-maximization|Partial-Step Expectation-Maximization]] reduce the cost of fitting large unidimensional 2PL [[concepts/item-response-theory|Item Response Theory]] models while retaining parameter and standard-error accuracy close to full-data EM?

## Motivation

In large IRT datasets, each full E-step must evaluate posterior latent-trait weights across respondents or response patterns before parameters can be updated. Early EM iterations often make substantial progress, but later full-data passes become expensive while producing diminishing changes. The paper targets this late-stage cost without restructuring the item data or replacing an existing EM implementation wholesale.

## Contributions

- Introduces a two-stage estimator that switches adaptively from full-data EM to sequential subset updates using a normalized log-likelihood-change rule.
- Combines partial E-steps with fixed-step Newton-style generalized M-steps, then averages iterates after a warm-up period to control subset-induced oscillation near the maximum-likelihood estimate.
- Accumulates an empirical cross-product information matrix across disjoint subsets so standard errors can be obtained within the same subset-processing loop.
- Evaluates runtime, parameter recovery, uncertainty estimation, million-respondent form calibration, and robustness to testlet-induced departures from unidimensionality.

## Method

For dichotomous item $i$, the model is

$$
P(y_{ip}=1\mid\eta_p)=\frac{1}{1+\exp[-(a_i\eta_p+c_i)]},
$$

where $a_i$ is discrimination and $c_i=-a_i b_i$ is the intercept associated with difficulty $b_i$. Marginal likelihood integration uses quadrature over a standard-normal latent trait.

Stage 1 runs ordinary full-data EM. A normalized exponential transformation of the change in observed log likelihood triggers Stage 2 when it exceeds a threshold in $(0,1)$; the implementation uses 0.90 as a conservative default for samples above 10,000. If ordinary convergence occurs first, Stage 1 returns its estimates directly.

Stage 2 shuffles respondents, partitions them without replacement, compresses each subset into response patterns and frequencies, and processes the subsets sequentially. Each partial E-step produces subset expected counts. A modified M-step then applies a damped Newton update,

$$
\boldsymbol\phi_i^{(t+1)}=\boldsymbol\phi_i^{(t)}+
\gamma\left(\boldsymbol H_i^{(t+1)}\right)^{-1}
\nabla_i^{(t+1)},
$$

with fixed step size $\gamma=0.5$ by default. After a 30-update warm-up, running averages track the center of the noisy iterates and are fed into later E-steps. Convergence is based on changes in averaged slope and intercept estimates, with $10^{-6}$ used as the default tolerance.

For uncertainty, the algorithm sums outer products of response-pattern score vectors across subsets. Inverting the accumulated empirical cross-product (XPD) information matrix yields an error covariance estimate; diagonal square roots are the standard errors. Fisher expected-information standard errors serve only as the simulation benchmark because enumerating all $2^I$ binary response patterns becomes prohibitive as item count grows.

## Experiments

### Parameter Recovery and Runtime

Study 1 simulated 60,000 respondents under unidimensional 2PL models with 18, 36, or 54 items. It crossed 10%, 20%, 30%, and 50% subset sizes with transition thresholds of 0.10, 0.50, and 0.90, and compared them with full-data EM over 100 replications. The modified method reduced runtime for 36 and 54 items, and every reported 54-item condition was faster. At 54 items, reductions ranged from 16.47% for the 50% subset and 0.90 threshold to 55.41% for the 10% subset and 0.10 threshold. For 18 items, all modified conditions were slower, from 114.71% to 389.27%, because compact response-pattern aggregation made standard EM inexpensive relative to subset overhead. Parameter bias and RMSE became closer to standard EM at subset sizes of at least 20%; slopes and moderate-valued parameters were recovered better than intercepts and extreme parameters.

### Standard Errors

Study 2 used 1,000 replications of 60,000 responses to 12 items and compared XPD standard errors with Fisher expected-information values. The 10% subset condition showed the clearest upward bias and RMSE increase. For subset sizes of 20% or more, both absolute bias and RMSE stayed close to or below 0.01 in the detailed results; the paper's overall summary reports absolute bias below 0.01 and RMSE below 0.02 across conditions.

### Million-Respondent Form Design

Study 3 assigned one million respondents to ten 40-item forms assembled from five repeated 20-item blocks in a 100-item pool. One run was conducted per subset-size and transition-threshold condition. Standard EM took 988.97 seconds. Modified runs ranged from 387.89 seconds for a 10% subset and 0.10 threshold, a 60.78% reduction, to 838.97 seconds for a 50% subset and 0.90 threshold, a 15.17% reduction. The design demonstrates scalability but provides no replication-based estimate of timing variability.

### Departures from Unidimensionality

Study 4 generated 60,000 responses from a three-testlet 2PL model, varied common testlet variance from 0.05 to 1.00, and fitted a misspecified unidimensional model over 100 replications. The modified algorithm remained comparable to standard EM rather than adding sensitivity to multidimensionality. Bias nevertheless rose with testlet variance, especially for slopes above 2.0 and for items in a high-slope testlet cluster.

## Limitations

- The main method and switching logic were developed for unidimensional 2PL estimation; extension to multidimensional IRT is proposed rather than demonstrated.
- Evidence comes from simulated data under selected item counts, parameter grids, thresholds, subset sizes, and implementation defaults. Operational empirical validation remains future work.
- Runtime gains are conditional on problem structure. The method lost substantially to standard EM with 18 items, where full-data response-pattern compression was already efficient.
- Smaller subsets trade computation for noise. The 10% condition showed the weakest standard-error performance, while larger subsets and later transitions more closely matched standard EM.
- Study 3 uses repeated item blocks, reports a single run per condition, and therefore does not quantify runtime or recovery variability for the million-person scenario.
- Under model misspecification, the estimator does not correct multidimensionality-induced bias; it only avoids adding appreciable bias relative to the same misspecified standard EM fit.

## Related Concepts

- [[concepts/partial-step-expectation-maximization|Partial-Step Expectation-Maximization]]: sequential subset E-steps, incremental generalized M-steps, and iterate averaging used by the proposed estimator.
- [[concepts/item-response-theory|Item Response Theory]]: the latent-response framework and 2PL model being estimated.
- [[concepts/mixed-stochastic-approximation-em|Mixed Stochastic Approximation EM]]: a related but distinct stochastic EM family that smooths sufficient statistics with a gain sequence and may simulate latent variables.
- [[concepts/bifactor-item-response-models|Bifactor Item Response Models]]: related multidimensional structures; the paper's robustness study instead uses a testlet model to generate local dependence.

## Related Papers

- Dempster, Laird, and Rubin (1977), "Maximum Likelihood from Incomplete Data via the EM Algorithm": foundational EM formulation cited by the paper.
- Neal and Hinton (1998), "A View of the EM Algorithm That Justifies Incremental, Sparse, and Other Variants": cited partial-update foundation.
- Cappe and Moulines (2009), "Online EM Algorithm for Latent Data Models": cited stochastic-approximation alternative based on weighted sufficient-statistic updates.
- von Davier (2016), "High-Performance Psychometrics: The Parallel-E Parallel-M Algorithm for Generalized Latent Variable Models": cited fork-and-join alternative to the paper's sequential updates.
- [[papers/squarem-an-r-package-for-off-the-shelf-acceleration-of-em-mm-and-other-em-like-monotone-algorithms|SQUAREM: An R Package for Off-the-Shelf Acceleration of EM, MM and Other EM-Like Monotone Algorithms]]: a library comparison that accelerates EM-like fixed-point maps by extrapolation rather than by respondent subsets; it is not cited in the supplied manuscript.

Source: Feng and Cai (2026), supplied manuscript. DOI: 10.3758/s13428-026-02996-0.

[[index|Library home]]
