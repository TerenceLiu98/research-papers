---
title: Bayesian Item Response Modeling in R with brms and Stan
type: paper
authors:
  - Paul-Christian Bürkner
year: null
source_job_id: "9f459ae1-55a8-466a-a196-f78d9e6a2a9f"
tags:
  - item-response-theory
  - bayesian-measurement
  - brms
  - stan
  - multilevel-modeling
---

## TL;DR

Bürkner presents a general Bayesian [[concepts/item-response-theory|Item Response Theory]] framework in `brms` and Stan. A common multilevel formula interface expresses binary, ordinal, count, proportion, and response-time models; nonlinear formulas support discrimination and guessing parameters, while distributional formulas let item and person properties predict more than a response distribution's location. Worked examples demonstrate model specification, Hamiltonian Monte Carlo estimation, posterior processing, and model comparison. The framework's flexibility does not determine a substantively valid model, remove identification constraints, or make general-purpose software the easiest choice for standard IRT analyses.

## Research Question

Can a single Bayesian multilevel framework specify, estimate, and post-process a broad range of IRT models without switching among model-specific software packages?

## Motivation

Dedicated R packages provide strong support for particular IRT families, but their interfaces and supported response types differ. Generalized linear multilevel formulations unify some binary response models yet do not directly cover arbitrary nonlinear relations, multiple predicted distributional parameters, or joint response-and-time processes. The paper develops `brms` as a consistent interface to these models while retaining Stan's full Bayesian inference.

## Contributions

- Expresses person and item parameters, covariates, multidimensional structure, and partial pooling through multilevel formulas on long-format data.
- Combines nonlinear parameters with distributional regression, enabling 1PL, 2PL, and 3PL binary models, graded-response and partial-credit models, and response-time models within one interface.
- Shows how hierarchical priors can correlate parameters belonging to the same person or item across model components.
- Connects estimation to a Bayesian workflow including convergence diagnostics, posterior predictive checks, parameter contrasts, cross-validation, and bridge-sampling Bayes factors.
- Compares the framework's coverage and tradeoffs with nine IRT-specific or general-purpose R packages.

## Method

### Distributional Multilevel Formulation

For observation $n$, the response follows $y_n \sim D(\psi_{1n},\ldots,\psi_{Kn})$. Each distributional parameter can depend on person parameters $\theta_{kp_n}$ and item parameters $\xi_{ki_n}$. Additive formulas cover generalized linear IRT models and covariates; nonlinear formulas represent products or transformations such as item-specific discrimination. Multiple formulas can predict location, scale, shape, or other family-specific parameters.

The data are represented in long form, with person and item identifiers acting as grouping variables. Item and person parameters may use independent priors or hierarchical Normal priors. Shared grouping identifiers in `brms` correlate varying effects across distributional or nonlinear parameters, allowing, for example, item easiness and discrimination to share a multivariate hierarchical prior.

### Identification and Estimation

Proper priors can yield a posterior even when likelihood parameters are not strongly identified, but this does not guarantee a useful or computationally stable model. The examples retain conventional constraints, such as fixing the person-parameter standard deviation to one in a 2PL model and constraining discrimination to be positive. Priors must be chosen in the context of the response scale and model.

`brms` converts family, formula, and prior specifications into Stan code. Stan estimates the posterior with adaptive Hamiltonian Monte Carlo and noncentered parameterizations for group-level effects. The paper recommends checking trace behavior, rank-normalized $\widehat R$, effective sample sizes, and sampler-specific warnings before interpreting results. Posterior predictions, approximate leave-one-out cross-validation, exact $k$-fold cross-validation, and marginal-likelihood methods support model checking and comparison.

## Experiments

### Binary and Ordinal Verbal-Aggression Models

The VerbAgg example contains 7,584 responses from 316 participants to 24 items. A binary 1PL model estimates substantial person and item variation. Allowing item-specific discrimination produces values concentrated roughly between 1.2 and 1.5; person estimates correlate at approximately 1 with those from the 1PL model. Approximate LOO favors the 2PL model by 5.97 LOOIC units with standard error 4.78, which the paper treats as little practical evidence for the more complex model.

Covariate models indicate that participants report wanting verbal aggression more often than enacting it: the reported `do` versus `want` coefficient is -0.78 with 95% credible interval [-1.20, -0.38]. The posterior probability that between-person variation is larger for `do` is 0.97, although the expected standard-deviation difference is only 0.20 on the logit scale. A gender-by-item interaction used as a uniform differential-item-functioning term is estimated at -0.94 with 95% credible interval [-1.22, -0.66]. These are conditional associations in this dataset, not general behavioral effects.

Retaining the original `no`/`perhaps`/`yes` ordering increases information for respondents with larger trait estimates. A graded-response model with item-specific threshold vectors does not improve approximate LOO over the shifted-threshold model: the reported difference is -4.7 with standard error 14.1 in favor of the simpler specification. A partial-credit model permits category-specific anger effects, estimated as 0.03 [0, 0.05] for the first transition and 0.10 [0.07, 0.13] for the second.

### Response-Time Models

The rotation example has 121 participants and 10 mental-rotation items. An ex-Gaussian distributional model predicts its mean, Gaussian-component scale, and exponential-component mean from rotation degree, persons, and items. The fitted mean and variation increase with rotation while skewness remains approximately stable.

A Wiener diffusion model jointly represents binary correctness and response time through drift rate, boundary separation, and non-decision time, with initial bias fixed at 0.5. Increasing rotation from 50 to 100 degrees is associated with lower drift rate and higher non-decision time; boundary separation appears stable. The residual item standard deviation for boundary separation is reported as 0.05 with 95% credible interval [0, 0.16]. These small-data examples demonstrate the interface rather than benchmark recovery or predictive superiority.

### Software Comparison

The feature comparison covers `eRm`, `ltm`, `TAM`, `mirt`, `sirt`, `(b)lavaan`, `lme4`, `MCMCglmm`, and `brms`. The paper characterizes `brms` by its combination of nonlinear multilevel formulas, many built-in and custom response distributions, and prediction of all distributional parameters. It also emphasizes the costs: MCMC can be orders of magnitude slower than point estimation, general interfaces require more initial learning, and specialized software may be faster and more direct for standard models.

## Limitations

- The empirical sections are tutorials and case studies, not simulations establishing parameter recovery, calibration, or computational superiority across data-generating conditions.
- The 2PL example finds little gain from varying discrimination, and several more flexible specifications are introduced syntactically without being fitted to appropriate data.
- Identification remains model-specific. Proper priors, successful sampling, or the ability to compile a formula do not establish substantive validity or strong identification.
- Bayesian computation is slower than optimization-based alternatives and can require initialization or sampler tuning, particularly for diffusion models.
- Cross-validation and Bayes factors can compare specified models but cannot replace theory or subject-matter judgment. Bayes factors also require carefully specified priors.
- The package comparison is a high-level feature inventory. It does not benchmark runtime, estimator accuracy, usability, or every specialized IRT implementation.
- Exact replication depends on software, compiler, and operating-system details. The source reports R 4.0.4, rstan 2.19.3, StanHeaders 2.19.2, and a Windows 10 toolchain.
- The supplied Markdown gives no publication year, venue, DOI, or identifier for this paper; those fields are not inferred from references or external knowledge.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: the common latent-response framework underlying the model families and examples.
- [[concepts/bifactor-item-response-models|Bifactor Item Response Models]]: a structured multidimensional IRT family that illustrates how response models and latent structure can be combined.

## Related Papers

- De Boeck et al. (2011), "The Estimation of Item Response Models with the lmer Function from the lme4 Package in R": cited multilevel formulation that this paper extends beyond generalized linear binary models.
- Bürkner (2017), "brms: An R Package for Bayesian Multilevel Models Using Stan": cited software foundation.
- Bürkner (2018), "Advanced Bayesian Multilevel Modeling with the R Package brms": cited foundation for nonlinear and distributional modeling.
- [[papers/modeling-item-response-theory-with-stochastic-variational-inference|Modeling Item Response Theory with Stochastic Variational Inference]]: a library comparison between HMC-based Bayesian IRT and scalable approximate inference; not cited in this manuscript.
- [[papers/multidimensional-item-response-theory-under-general-latent-distributions|Multidimensional Item Response Theory under General Latent Distributions]]: a library connection that shifts flexibility from the response family toward latent-density and posterior approximations; not cited in this manuscript.

[[index|Library home]]
