---
title: "Spatio-Temporal Disaggregation with Changing Areal Boundaries"
type: paper
authors:
  - Noah Ripstein
  - Patrick Brown
  - Jamie Staford
year: null
source_job_id: 40fcb0bd-96cf-4c5f-9dec-2af68304b238
tags:
  - spatial-statistics
  - spatial-disaggregation
  - change-of-support
  - disease-mapping
  - approximate-bayesian-inference
---

## TL;DR

The paper extends spatially aggregated log-Gaussian Cox process disaggregation to repeated areal counts whose reporting boundaries change over time. A shared latent spatial field connects all map configurations, while gamma mixing converts polygon-level Poisson overdispersion into a marginal negative binomial likelihood and removes one latent variable per polygon-time observation. The DAST R package fits the resulting extended latent Gaussian model with Laplace approximation and adaptive Gauss-Hermite quadrature. Applications map under-five mortality across changing NUTS-3 boundaries in Belgium and the Netherlands and changing LSOA boundaries in Manchester.

The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier.

## Research Question

How can a fine-scale spatial risk surface be inferred efficiently from counts observed repeatedly on different administrative partitions of the same region?

## Motivation

Administrative boundaries can change between censuses or reporting periods, making repeated areal counts spatially misaligned. Fitting each map separately discards their common spatial information, while conventional aggregated [[concepts/log-gaussian-cox-processes|Log-Gaussian Cox Processes]] often require slow bespoke MCMC and introduce an overdispersion effect for every polygon-time observation. The paper treats changing boundaries as a longitudinal [[concepts/change-of-spatial-support|Change of Spatial Support]] problem and seeks inference whose latent dimension does not grow with the number of reported polygons.

## Contributions

- Extends an aggregated LGCP to an arbitrary sequence of changing maps by sharing one latent spatial field across time while allowing offsets and covariates to vary.
- Uses gamma-distributed multiplicative overdispersion and analytically integrates it out, producing a negative binomial likelihood without polygon-specific latent effects.
- Represents the shared Matern field with piecewise-linear basis functions on a triangular mesh, reducing the latent dimension from grid cells to mesh vertices.
- Implements approximate Bayesian inference with Template Model Builder, trust-region optimization, Laplace approximation, and adaptive Gauss-Hermite quadrature in the open-source DAST package.
- Demonstrates the framework on early-childhood mortality under three NUTS-3 map configurations and presents a separate Manchester workflow assembled with AI assistance.

## Method

### Aggregated Process Across Changing Maps

At time $i$, the observed count $Y_{ij}$ belongs to region $S_{ij}$. The model uses a population offset $\mathcal O_i(\mathbf s)$ and a log-risk surface

$$
\log \lambda_i(\mathbf s)=\mathbf x_i(\mathbf s)^\top\boldsymbol\beta+u(\mathbf s),
$$

where covariates and offsets may vary over time but the Gaussian spatial field $u(\mathbf s)$ is common to every map. Discretizing the domain into fine cells makes the expected count for a polygon a weighted sum of cell risks over the cells intersecting that polygon. Because one observation depends on multiple latent cell values, this is an extended latent Gaussian model rather than an ordinary latent Gaussian model.

Sharing $u(\mathbf s)$ makes observations from different partitions inform a spatially consistent surface. It does not model temporal evolution in residual risk: time variation enters only through observed covariates and offsets in the presented formulation.

### Marginal Overdispersion and Basis Reduction

For a multiplicative effect $\nu_{ij}\sim\operatorname{Gamma}(\tau^{-2},\tau^{-2})$, the mean is one and the standard deviation is $\tau$. Integrating $\nu_{ij}$ out of the Poisson model yields

$$
Y_{ij}\mid\lambda_i,\tau\sim\operatorname{NegBin}
\left(\sum_{\ell\in\mathcal L_{ij}}\mathcal O_{ij\ell}\lambda_i(q_\ell),\tau^2\right).
$$

This removes the collection of polygon-time effects from the latent vector. The field is further approximated as $u(q_\ell)\approx\sum_{m=1}^{d}\phi_m(q_\ell)\gamma_m$ using finite-element basis functions, so inference operates on $d$ mesh weights rather than all $L$ grid values.

Penalized-complexity priors shrink spatial variation toward a flat field, favor longer spatial ranges, and shrink negative-binomial overdispersion toward the Poisson model. The appendix motivates an exponential prior on $\tau$ through the Poisson-gamma representation.

### Approximate Bayesian Inference

Template Model Builder supplies automatic derivatives of the joint log density. Inner trust-region optimization finds the conditional latent mode for fixed hyperparameters, and outer optimization locates the hyperparameter mode. A Gaussian approximation handles the latent conditional posterior, a Laplace approximation handles the hyperparameters, and adaptive Gauss-Hermite quadrature numerically integrates over selected hyperparameter values. One quadrature point reduces to a Laplace fit; additional points provide the paper's fuller Bayesian approximation.

## Experiments

### Belgium and the Netherlands

The application uses annual deaths among females under age five from 2018 through 2023, reported at NUTS-3 level, with 1 km WorldPop population offsets. NUTS-3 boundaries changed in 2020 and 2023, giving three map configurations. The negative binomial model uses two quadrature points and exponential priors for observation overdispersion, spatial standard deviation, and spatial range parameterization.

The posterior median risk surface and [[concepts/posterior-exceedance-probabilities|Posterior Exceedance Probabilities]] identify elevated modeled risk near Antwerp at the Belgium-Netherlands border. The paper describes risk there as about 30% above average and reports a 95% posterior probability that risk is above the baseline. This is a model-based spatial estimate; the manuscript provides no held-out fine-resolution mortality data with which to validate the localized surface.

### Manchester Practitioner Workflow

A second example analyzes under-five mortality in Manchester from 2008 through 2012, with LSOA boundaries changing in 2010. The authors prompted Codex to adapt the Belgium-Netherlands analysis and data pipeline. They report that the generated code required moderate debugging and modification before producing log-relative-risk and exceedance maps. This section demonstrates a practitioner workflow, not a controlled evaluation of AI-generated analysis or a quantitative comparison of estimators.

The paper argues that marginalizing polygon effects improves scalability, but the supplied experiments do not report runtime, memory, approximation error, or comparisons against MCMC, INLA, lognormal overdispersion, or separate-map fits.

## Limitations

- The shared latent field is static. Unobserved spatial risk cannot evolve over time except through observed time-varying covariates; temporal correlation and time-varying covariance parameters are proposed extensions.
- Gamma mixing imposes a specific form of extra-Poisson variation. Heavier-tailed, asymmetric, or zero-inflated counts may require different likelihoods or mixing distributions.
- Fine-scale output remains conditional on population offsets, covariates, mesh resolution, priors, and the assumption that all map configurations observe one common field. Neither application supplies independent fine-scale ground truth.
- The paper does not isolate the benefit of combining changing maps through simulation, ablation, predictive validation, or comparison with alternative disaggregation methods.
- Computational efficiency is motivated by latent-dimension reduction but not established by reported timing or scaling measurements.
- The Manchester analysis required manual debugging, and the manuscript does not evaluate reproducibility or failure rates of its AI-assisted workflow.
- The supplied Markdown contains typographical and notation inconsistencies. In particular, the main text describes the gamma-effect variance inconsistently; the appendix clearly parameterizes $\tau$ as its standard deviation and $\tau^2$ as the negative-binomial dispersion.

## Related Concepts

- [[concepts/bayesian-spatial-disaggregation|Bayesian Spatial Disaggregation]]: inferring fine-scale risk from aggregated counts while retaining posterior uncertainty.
- [[concepts/log-gaussian-cox-processes|Log-Gaussian Cox Processes]]: the continuous latent intensity model aggregated over each reporting polygon.
- [[concepts/change-of-spatial-support|Change of Spatial Support]]: the changing administrative partitions that motivate the multiple-map model.
- [[concepts/posterior-exceedance-probabilities|Posterior Exceedance Probabilities]]: the paper's uncertainty-aware maps of above-baseline risk.

## Related Papers

- Stringer, Brown, and Staford (2023), "Fast, scalable approximations to posterior distributions in extended latent Gaussian models." Supplies the approximate-inference framework extended here.
- Nandi et al. (2023), "disaggregation: An R package for Bayesian spatial disaggregation modeling." Supplies mesh and SPDE infrastructure adapted by DAST.
- Li et al. (2012), "Log Gaussian Cox processes and spatially aggregated disease incidence data." Establishes the aggregated LGCP comparison motivating this model class.
- Lindgren, Rue, and Lindstrom (2011), "An explicit link between Gaussian fields and Gaussian Markov random fields: the stochastic partial differential equation approach." Supplies the finite-element representation of the Matern field.
- [[papers/continuous-inference-for-aggregated-point-process-data|Continuous Inference for Aggregated Point Process Data]]: related MCMC augmentation for time-varying, overlapping, and uncertain observation regions.
- [[papers/spatial-latent-gaussian-modelling-with-change-of-support|Spatial Latent Gaussian Modelling with Change of Support]]: related basis-projection approach for responses and predictors observed on mismatched supports.

[[index|Library home]]
