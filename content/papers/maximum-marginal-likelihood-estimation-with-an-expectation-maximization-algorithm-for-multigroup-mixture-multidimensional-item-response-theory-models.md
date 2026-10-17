---
title: Maximum Marginal Likelihood Estimation With an Expectation-Maximization Algorithm for Multigroup/Mixture Multidimensional Item Response Theory Models
type: paper
authors:
  - Jianbin Fu
year: 2019
doi: 10.1002/ets2.12272
report_number: ETS RR-19-35
source_job_id: "d286a226-a235-4342-9070-0eb810ad2c02"
tags:
  - item-response-theory
  - marginal-maximum-likelihood
  - expectation-maximization
  - mixture-models
---

## TL;DR

Fu presents explicit EM estimation and derivative formulas for multidimensional IRT with observed or latent groups, covering generalized partial credit, graded response, and three-parameter logistic response functions. An R implementation recovers parameters in nine GPCM-related simulation conditions; recovery generally worsens with additional dimensions and latent groups. The contribution is a detailed estimation framework, with computation constrained by exponentially growing quadrature grids.

## Research Question

How can one specify the full marginal maximum likelihood EM procedure, including numerical maximization and respondent scoring, for IRT models with multiple continuous traits and observed or latent groups?

## Motivation

Assessments can measure several skills and include groups with different item sets, latent distributions, or response parameters. Existing software supported many such models, but the report identifies incomplete published descriptions of their EM maximization steps. Explicit gradients and Hessians make the estimation procedure accessible for implementation and extension.

## Contributions

- Unifies multigroup and mixture versions of GPCM, GRM, and 3PL under a common quadrature-based EM framework.
- Provides first and second derivatives for item parameters and first derivatives for Gaussian population parameters, alongside their updates.
- Describes MAP and EAP trait scoring, latent-group assignment, and posterior uncertainty summaries.
- Implements the procedure in R and evaluates parameter recovery for nine GPCM-related models.

## Method

### Measurement and Group Structure

An item-by-attribute incidence matrix specifies which continuous traits affect each item. Responses are conditionally independent given the trait vector, whose distribution is multivariate Gaussian within each group. Observed groups can have different item and attribute sets; latent groups share those sets. Item and population parameters may be fixed, freely estimated, or equated across groups, subject to identification.

The three response families use category-score softmax probabilities (GPCM), differences of cumulative logistic probabilities (GRM), or a logistic success probability with a guessing lower asymptote (3PL). The guessing parameter is estimated on a logit scale.

### EM Estimation and Scoring

[[concepts/marginal-maximum-likelihood-em-for-irt|Marginal Maximum Likelihood EM for IRT]] approximates each group's Gaussian integral with $D^{J_g}$ Gauss-Hermite nodes for $J_g$ traits and $D$ nodes per trait. For a latent-group model, a response pattern's marginal probability has the form

$$
p(x_p)\approx\sum_g\alpha_g\sum_l\pi_{gl}
\prod_i p(x_{pi}\mid\omega_{gl},\eta_{gi}),
$$

where $\alpha_g$ is the group proportion and $\pi_{gl}$ is the within-group quadrature weight. For observed groups, estimation conditions on the known group and sums only over its nodes.

The E step computes posterior node probabilities, jointly with group membership for mixtures, and aggregates them into expected counts by node, item, and response category (Equations 3-7). The M step updates item parameters by Newton-Raphson using these counts and analytic derivatives. Population means and covariances are updated from posterior moments; estimated population parameters determine the next quadrature approximation. Mixture proportions use posterior expected group counts. The expected complete-data objective used for the M step is distinct from the observed marginal likelihood monitored for convergence.

After calibration, EAP scores average quadrature nodes under the respondent's posterior; grid-based MAP scoring selects a posterior-maximizing node. Latent-group assignment uses posterior group probabilities summed across nodes. Posterior covariance summarizes trait uncertainty conditional on fitted parameters.

## Experiments

The parameter-recovery study uses 30 simulated datasets per model, each with 3,000 respondents and 10 items. Items are binary or have three categories; models have one or two traits and one or two groups. Two-group samples split evenly. Multigroup conditions equate all item parameters except those of one item; mixture conditions do not equate item parameters across groups.

Identification fixes reference-group means and standard deviations. In the mixture simulations, population parameters are fixed to their true values except the two-dimensional correlations, which are estimated. One-dimensional models use 40 quadrature points; two-dimensional models use a $30\times30$ grid. Each M step permits one iteration. Both the largest item-parameter change and change in $-2\log L_{\mathrm{obs}}$ must be below .001 for convergence.

Table 1 reports RMSE across replications:

| Model | Discrimination | Intercept | Population mean | Population SD/correlation |
| --- | ---: | ---: | ---: | ---: |
| 1PL | NA | .047 | NA | NA |
| 2PL | .078 | .057 | NA | NA |
| GPCM | .052 | .076 | NA | NA |
| Two-dimensional GPCM | .102 | .083 | NA | .051 |
| Two-group GPCM | .084 | .088 | .161 | .064 |
| Two-group two-dimensional GPCM | .114 | .094 | .067 | .051 |
| Two-group mixture 1PL | NA | .094 | NA | NA |
| Two-group mixture GPCM | .091 | .117 | NA | NA |
| Two-group two-dimensional mixture GPCM | .177 | .130 | NA | .058 |

NA denotes not applicable. The author characterizes recovery as reasonable overall, with more difficult recovery for more complex models and mixtures. These are recovery results for the generating models, not comparisons against competing estimators.

## Limitations

- Empirical evaluation covers GPCM and its binary submodels, not GRM or guessing-parameter recovery in 3PL. It includes at most two traits, two groups, and 30 replications per condition.
- Fixing most mixture population parameters to their true values limits what the simulations establish about joint estimation of unknown mixture distributions.
- Tensor-product quadrature scales exponentially. The author describes computation beyond three traits as burdensome and suggests 20 or 30 nodes per dimension depending on whether population parameters are known; these are experience-based recommendations.
- The report acknowledges bias in its inverse-negative-Hessian approximation to parameter covariance. Itemwise M-step curvature should not be treated as a validated observed-information standard-error estimator.
- The framework assumes within-group Gaussian traits and conditional response independence. The study does not test robustness to violations, report a runtime benchmark, or provide a real-data application.
- The supplied Markdown contains corrupted mathematical symbols and some ambiguous formulas. This summary retains the identifiable algorithm and reported table rather than reproducing the full derivative catalogue.

## Related Concepts

- [[concepts/marginal-maximum-likelihood-em-for-irt|Marginal Maximum Likelihood EM for IRT]]: posterior expected counts connect integration and calibration.
- [[concepts/item-response-theory|Item Response Theory]]: the measurement framework and latent-scale identification.
- [[concepts/gaussian-mixture-item-response-theory|Gaussian Mixture Item Response Theory]]: related population-mixture modeling; its shared-item formulation differs from allowing class-specific item parameters here.
- [[concepts/bifactor-item-response-models|Bifactor Item Response Models]]: structured loadings can reduce integration dimensionality.

## Related Papers

- Bock and Aitkin (1981), "Marginal maximum likelihood estimation of item parameters: Application of an EM algorithm": cited foundation for MML-EM in IRT.
- von Davier and Yamamoto (2004), "Partially observed mixtures of IRT models: An extension of the generalized partial credit model": cited precursor extended by this report.
- [[papers/generalized-full-information-item-bifactor-analysis|Generalized Full-Information Item Bifactor Analysis]]: library comparison using bifactor structure to reduce integration costs; not a cited work in this report.
- [[papers/fast-estimation-of-multiple-group-generalized-linear-latent-variable-models-for-categorical-observed-variables|Fast estimation of multiple group generalized linear latent variable models for categorical observed variables]]: later library comparison using second-order Laplace approximation for multigroup estimation, not cited by this 2019 report.

[[index|Library home]]
