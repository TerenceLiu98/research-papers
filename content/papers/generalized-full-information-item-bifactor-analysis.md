---
title: Generalized Full-Information Item Bifactor Analysis
type: paper
authors:
  - Li Cai
  - Ji Seung Yang
  - Mark Hansen
year: 2011
doi: 10.1037/a0023350
source_job_id: "ebf12138-e952-4e8a-8bf5-d072b77f1b03"
tags:
  - item-response-theory
  - bifactor-models
  - marginal-maximum-likelihood
  - differential-item-functioning
---

## TL;DR

The paper generalizes full-information bifactor IRT to mixed dichotomous, ordinal, and nominal items across multiple groups. Its loading structure permits marginal likelihood evaluation through repeated two-dimensional integrations, regardless of the number of specific factors. Two simulation studies recover parameters with all 500 replications converging in each study; a five-country PISA application illustrates group comparisons and differential item functioning (DIF).

## Research Question

Can bifactor estimation support mixed response formats, group-specific latent means and variances, and user-defined parameter restrictions while retaining the computational efficiency of analytical dimension reduction?

## Motivation

Items sharing a passage, task, or content domain can remain dependent after conditioning on a general trait. Specific factors represent this residual dependence. Earlier full-information bifactor methods emphasized normal-ogive binary or graded responses and single-group analysis, limiting applications to mixed-format assessments, cross-group linking, and DIF detection.

## Contributions

- Combines logistic binary models with estimated lower asymptotes, graded response models, generalized partial credit models, and nominal response models in one framework.
- Estimates latent means and variances across groups, with fixing and equality constraints on item and population parameters.
- Extends bifactor dimension reduction to this broader model family and implements marginal likelihood estimation in IRTPRO.
- Demonstrates parameter recovery, tests of parameter restrictions, and a multiple-group bifactor DIF procedure.

## Method

### Measurement Structure

Each item loads on the general factor and at most one specific factor, as described in [[concepts/bifactor-item-response-models|Bifactor Item Response Models]]. Factors are mutually orthogonal and jointly Gaussian within each group; item responses are conditionally independent given all factors. An item may load only on the general factor.

For a binary item, the response model is

$$
P(Y_j=1\mid\theta_0,\theta_s)
=c_j+(1-c_j)\sigma(d_j+a_{j0}\theta_0+a_{js}\theta_s),
$$

where $c_j$ is the lower asymptote, $d_j$ the intercept, and the two slopes measure general and specific discrimination. Graded models use cumulative category probabilities; generalized partial credit models use fixed category scores; nominal models estimate category scores subject to identification constraints (Equations 3, 6-9).

A reference group fixes latent locations and scales. Invariant anchor-item parameters connect other groups to that reference, allowing estimation of their factor means and variances. Two-item specific factors require additional restrictions, such as equal specific slopes. Arbitrary restrictions still require identification checks.

### Dimension Reduction and Inference

Let $I_s$ contain items loading on specific factor $s$, and $I_0$ contain general-only items. Suppressing respondent and group indices, the marginal response probability can be written as

$$
p(y)=\int f_0(t)\prod_{j\in I_0}p_j(y_j\mid t)
\prod_{s=1}^{S}\left[\int f_s(u)\prod_{j\in I_s}p_j(y_j\mid t,u)\,du\right]dt.
$$

Each specific factor is integrated separately conditional on the general factor, followed by integration over the general factor. With $Q$ nodes per dimension, quadrature uses a number of evaluations proportional to $S Q^2$, rather than the $Q^{S+1}$ grid of direct integration. The reduction follows from the dependency structure, not from a particular response link (Equations 15-16 and Appendix C).

An EM algorithm optimizes the resulting marginal likelihood. Supplemented EM supplies parameter covariance estimates for Wald tests; likelihood-ratio tests compare nested restrictions. Missing item responses contribute a factor of one to the response likelihood, with the missing-data treatment relying on missing-at-random assumptions. A normal penalty on the logit of guessing stabilizes lower-asymptote estimation in the examples (Appendix A).

## Experiments

### Parameter Recovery

Both studies fit the generating model, use 21 quadrature nodes per dimension, and run 500 replications. Timings are reported CPU times on the authors' Windows XP workstation with dual 3 GHz Xeon CPUs and 3 GB RAM.

| Study | Design | Reported results |
| --- | --- | --- |
| Two-group model | 1,000 respondents per group; 16 binary items and four specific factors in group 1; 12 shared items and three specific factors in group 2 | All replications converged; maximum absolute bias 0.06; maximum discrepancy between average standard errors and empirical standard deviations 0.05; average 28 CPU seconds and 113 EM cycles. |
| Mixed-format model | 3,000 respondents; nine binary multiple-choice items, one four-category nominal item, five four-category partial-credit items; two specific factors | All replications converged; average 13 CPU seconds and 48 EM cycles; a four-restriction likelihood-ratio statistic had empirical mean 4.07 and variance 7.50, compared with chi-square expectations of 4 and 8. |

In the mixed-format study, estimated nominal category scores recovered the distinction between two response patterns with identical number-correct scores. Multiple-choice slopes and intercepts showed larger biases than the other formats; the largest multiple-choice slope bias was 0.09. Guessing estimates used a penalty centered on the generating guessing probability, and their uncertainty was less well informed by easy items (Tables 1-4).

### PISA 2000 Application

The analysis uses 15 mathematics items from Booklet 1 and students who attempted every selected item: Australia (464), Germany (409), Japan (445), UK (889), and US (358). Fourteen items are constructed-response and one is multiple-choice. Five content clusters define specific factors in addition to general mathematics literacy; the US supplies the reference scale.

Under item invariance, the six-factor model has 64 parameters versus 44 for the unidimensional model. The authors report a likelihood-ratio statistic of 570 on 20 degrees of freedom and approximately two CPU minutes for the bifactor fit. The multiple-choice guessing estimate is 0.09 under the bifactor model versus 0.15 under the unidimensional model, illustrating sensitivity to dimensionality.

For DIF analysis, the remaining 13 items anchor the scales while the two Farms items have group-specific intercepts and general-factor slopes; Farms factor variances also vary across nonreference groups. Overall Wald statistics are 57.96 and 63.95, each on eight degrees of freedom, rejecting no DIF for both items. Japan's estimated general-factor mean relative to the US changes from 0.75 under full invariance to 0.66 after allowing Farms DIF (Tables 7-11). These are results for the selected sample and fitted measurement models.

## Limitations

- Efficient integration relies on the bifactor loading pattern and factor independence. The paper discusses conditional independence of specific factors given the general factor as a possible relaxation, subject to identification; arbitrary cross-loadings are outside this derivation.
- The implemented framework assumes Gaussian latent factors. Flexible nonnormal latent densities are proposed future work.
- The simulations assess recovery under correctly specified models. They do not establish robustness to misspecified factor structure or validate the bifactor DIF procedure's multidimensional Type I error and power; the authors explicitly call for such research.
- Lower-asymptote estimates require stabilization and can be weakly informed by easy items. Cross-group comparisons depend on valid anchors, while specific factors need sufficiently broad content for substantive interpretation.
- Comprehensive model-fit diagnostics are not developed. Limited-information methods remain useful alternatives depending on the problem.
- The supplied text has some inconsistent table entries and formulas. For example, Japan's invariant-model general-factor variance is 0.58 in the prose and 0.59 in Table 7; no exact variance claim is used here.

## Related Concepts

- [[concepts/bifactor-item-response-models|Bifactor Item Response Models]]: general and specific factors jointly represent item dependence and permit analytical integration reduction.
- [[concepts/item-response-theory|Item Response Theory]]: response models, latent scales, and identification.
- [[concepts/structure-aware-second-order-laplace-approximation|Structure-Aware Second-Order Laplace Approximation]]: a different approach to reducing integration costs in latent measurement models.

## Related Papers

- Gibbons and Hedeker (1992), "Full-information item bifactor analysis": cited foundation for bifactor dimension reduction.
- Gibbons et al. (2007), "Full-information item bifactor analysis of graded response data": cited extension to graded responses.
- Cai (2010), "A two-tier full-information item factor analysis model with applications": cited source for broader estimation and scoring details.
- [[papers/fast-estimation-of-multiple-group-generalized-linear-latent-variable-models-for-categorical-observed-variables|Fast estimation of multiple group generalized linear latent variable models for categorical observed variables]]: library comparison using second-order Laplace approximation with more general loading structures; not cited by this 2011 paper.
- [[papers/multidimensional-item-response-theory-under-general-latent-distributions|Multidimensional Item Response Theory under General Latent Distributions]]: library comparison that learns non-Gaussian latent distributions; not cited by this paper.

[[index|Library home]]
