---
title: Fast estimation of multiple group generalized linear latent variable models for categorical observed variables
type: paper
authors:
  - Björn Andersson
  - Shaobo Jin
  - Maoxin Zhang
year: 2023
doi: 10.1016/j.csda.2023.107710
source_job_id: "55c034e5-08c9-4247-b880-815f76f346f5"
tags:
  - latent-variable-models
  - item-response-theory
  - laplace-approximation
  - marginal-maximum-likelihood
---

## TL;DR

A second-order Laplace estimator for multiple-group categorical latent variable models exploits zero derivatives and repeated terms to accelerate marginal maximum likelihood. In four-dimensional simulations, it converged in every replication and produced bias close to adaptive Gauss-Hermite quadrature with five points per dimension (AGHQ5), at much shorter runtimes. In a three-dimensional PISA application, estimation took 608.5 seconds versus 6,031.8 for AGHQ5, with a maximum parameter difference of 0.0027 from the higher-accuracy AGHQ13 reference.

## Research Question

Can second-order Laplace approximation make multiple-group categorical latent variable estimation computationally practical while retaining accuracy comparable to adaptive quadrature?

## Motivation

Marginal maximum likelihood integrates over each respondent's latent traits. Tensor-product quadrature requires exponentially more points as dimensionality increases, while first-order Laplace approximation can be biased with binary items and few indicators. Higher-order Laplace methods can improve accuracy, but their naive implementation involves large sums of derivatives. The paper treats model structure as a source of computational savings.

## Contributions

- Develops a second-order approximation for categorical generalized linear latent variable models with general loading structures, including cross-loadings.
- Supports multiple groups, invariant measurement parameters, and estimation of group-specific latent means and covariances.
- Filters structurally zero and repeated derivative products, retaining all nonzero contributions with their multiplicities.
- Compares Laplace and adaptive quadrature estimators within the same C++ code base, exposed through the R package `lamle`.

## Method

Responses are conditionally independent given a latent vector with a group-specific multivariate Gaussian distribution. The framework includes graded response, generalized partial credit, and nominal response models used in [[concepts/item-response-theory|Item Response Theory]]. Group comparisons require identifying restrictions and invariant indicators.

For respondent $f$ in group $g$, define

$$
h_{fg}(z)=-\log\{P(y_{fg}\mid z)\phi(z;\mu_g,\Sigma_g)\}.
$$

With posterior mode $\hat z_{fg}$ and Hessian $H_{fg}$ evaluated there, the approximation is

$$
\ell^{\mathrm{Lap2}}_{fg}
=\frac p2\log(2\pi)-\frac12\log|H_{fg}|
-h_{fg}(\hat z_{fg})+\log(1+\epsilon_{fg}).
$$

The correction $\epsilon_{fg}$ contracts third and fourth derivatives with entries of the inverse Hessian. [[concepts/structure-aware-second-order-laplace-approximation|Structure-Aware Second-Order Laplace Approximation]] precomputes which terms are unique and nonzero, then weights them by multiplicity. The Gaussian log density has no derivatives above order two, allowing higher derivatives to be assembled from item contributions. Item loading patterns provide further zeros and symmetries (Section 2.2).

The algorithm directly maximizes the approximated marginal likelihood using a quasi-Newton update. Gradients account for the dependence of posterior modes on model parameters and require derivatives up to order five for Lap2. Standard errors use the inverse observed information, numerically approximated from the gradient with modes recomputed at perturbed parameters (Sections 2.3-2.4).

AGHQ uses $Q^p$ points for $p$ dimensions and $Q$ points per dimension. The paper gives its error order as $O(I^{-\lfloor(Q+2)/3\rfloor})$, where $I$ is the number of observed variables; four to six points have the same theoretical order as Lap2. Equal asymptotic order does not imply identical finite-sample estimates.

## Experiments

### Four-Dimensional Simulation

Four groups contain 500 respondents each. The design crosses independent-clusters versus cross-loading structures with 12 versus 16 binary items, using 1,000 replications per condition. Comparators are first-order Laplace (Lap1), Lap2, AGHQ3, and AGHQ5. Parameter-recovery summaries exclude nonconverged replications (Section 3, Table 1).

| Structure | Items | Lap2 absolute bias | AGHQ5 absolute bias | Lap2 time (s) | AGHQ5 time (s) |
| --- | ---: | ---: | ---: | ---: | ---: |
| Independent clusters | 12 | 0.013 | 0.011 | 31.64 | 2182.70 |
| Independent clusters | 16 | 0.010 | 0.009 | 40.17 | 2987.91 |
| Cross-loadings | 12 | 0.015 | 0.012 | 88.22 | 2437.80 |
| Cross-loadings | 16 | 0.010 | 0.009 | 164.52 | 3365.19 |

Lap2 achieved 100% convergence in every condition and average 95% confidence-interval coverage of 94.6-95.0%. With 12 cross-loading items, convergence was 67.6% for Lap1, 98.9% for AGHQ3, and 99.3% for AGHQ5. AGHQ3 had greater average absolute bias than Lap2 but slightly smaller reported average RMSE in all four conditions, so Lap2 did not dominate every recovery metric.

The computational mechanism is visible in Table 2: the three correction sums have 256, 4,096, and 4,096 unfiltered entries in four dimensions. Independent-clusters models need only 4, 10, and 10 unique nonzero entries; the 16-item cross-loading model needs 28, 322, and 214.

### PISA 2009 Application

The analysis retains 21,672 respondents from Hong Kong, Macao, Shanghai, and Chinese Taipei after excluding 18 respondents. It fits three correlated dimensions (mathematics, reading, and science) using 188 items, including 176 binary and 12 three-category items. Respondents answer an average of 54.55 items; missing responses are assumed missing at random. Item parameters are invariant across regions, Hong Kong supplies the reference scale, and 418 parameters are estimated (Section 4).

| Estimator | Approximated log likelihood | Time (s) | Maximum absolute parameter difference from AGHQ13 |
| --- | ---: | ---: | ---: |
| Lap1 | -627557.7 | 532.3 | 0.0408 |
| Lap2 | -627402.9 | 608.5 | 0.0027 |
| AGHQ3 | -627426.6 | 1800.7 | 0.0144 |
| AGHQ5 | -627405.3 | 6031.8 | 0.0009 |
| AGHQ13 | -627404.7 | 99081.1 | Reference |

All methods converged after 36 iterations. AGHQ5 was closest to the AGHQ13 parameter estimates, while Lap2 offered substantially shorter runtime. These are method-specific approximated likelihood values, not exact likelihoods evaluated on a common numerical basis. The authors attribute small parameter discrepancies even for Lap1 to the relatively large number of responses per student (Table 4 and Section 4.3.2).

## Limitations

- Runtime gains depend on loading structure. Dense, unrestricted models provide fewer exploitable zeros and symmetries; gains also diminish with fewer latent dimensions.
- Implementing analytic derivatives through order five requires model-specific work. The approach is not automatically transferable to arbitrary measurement models.
- The simulations cover four dimensions, Gaussian latent distributions, four groups, and a fixed group sample size. Discussion of feasibility up to twelve correlated dimensions refers to earlier work, not a new experiment here.
- High-point quadrature can achieve greater accuracy when computationally feasible. Lap2 provides a fixed-order approximation.
- The application assumes measurement invariance and missing-at-random responses. Its numerical comparison does not test these substantive assumptions.
- Mixtures, non-Gaussian latent distributions, and combinations of categorical, continuous, and count outcomes are proposed extensions. The supplied Markdown references supplementary material but does not include it.

## Related Concepts

- [[concepts/structure-aware-second-order-laplace-approximation|Structure-Aware Second-Order Laplace Approximation]]: higher-order integration with exact elimination of redundant derivative computations.
- [[concepts/item-response-theory|Item Response Theory]]: categorical measurement models and latent trait estimation.
- [[concepts/amortized-variational-inference|Amortized Variational Inference]]: a different strategy for reducing repeated latent inference costs.

## Related Papers

- Andersson and Xin (2021), "Estimation of latent regression item response theory models using a second-order Laplace approximation": cited precursor for independent-clusters models.
- Jin and Andersson (2020), "A note on the accuracy of adaptive Gauss-Hermite quadrature": cited analysis of quadrature error rates and derivative symmetries.
- [[papers/modeling-item-response-theory-with-stochastic-variational-inference|Modeling Item Response Theory with Stochastic Variational Inference]]: library comparison using amortized Bayesian inference; not a cited paper in this source.
- [[papers/multidimensional-item-response-theory-under-general-latent-distributions|Multidimensional Item Response Theory under General Latent Distributions]]: library comparison that relaxes the Gaussian population assumption through normalizing flows; not a cited paper in this source.

[[index|Library home]]
