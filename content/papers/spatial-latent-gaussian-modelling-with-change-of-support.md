---
title: "Spatial Latent Gaussian Modelling with Change of Support"
type: paper
authors:
  - E. A. Chacon-Montalvan
  - P. M. Atkinson
  - C. Nemeth
  - B. M. Taylor
  - P. Moraga
year: 2024
date: "2024-03-13"
source_job_id: 69d7e9f1-894b-4b05-8943-78ce0466f308
tags:
  - spatial-statistics
  - change-of-support
  - bayesian-modeling
  - data-fusion
---

## TL;DR

A Bayesian spatial model jointly represents responses and predictors observed on different spatial supports. Continuous latent fields use tensor-product B-splines with Gaussian Markov random field (GMRF) coefficients; integrating the basis functions projects the same field onto rectangular observation units. Simulations show improved recovery and uncertainty relative to centroid-based models, and a Welsh grassland application combines 25 m land cover with 1 km environmental predictors.

## Research Question

How can spatial regression combine misaligned responses and predictors while propagating uncertainty from change of support, measurement error, and source-specific bias into parameter estimates and predictions?

## Motivation

Interpolating every dataset to a common grid before fitting a spatial regression treats estimated inputs as known. This can distort both the inferred surface and its uncertainty. [[concepts/change-of-spatial-support|Change of Spatial Support]] instead belongs inside the statistical model: equal nominal resolution does not imply aligned sampling units, and observations over a region are not point measurements at its centroid.

## Contributions

- Separates the continuous latent model, support projection, and observation mechanism into three linked layers for both responses and predictors.
- Uses analytically integrated B-splines to change rectangular support without changing the latent GMRF coefficients or requiring Monte Carlo integration of the basis functions.
- Develops Gaussian and binary observation models with source-specific offsets and potentially support-dependent measurement variances, together with Gibbs inference and posterior prediction.
- Demonstrates the approach on regular, irregularly spaced, sparse, and overlapping sampling configurations, then applies it to land suitability in Rhondda Cynon Taf, Wales.

## Method

### Latent Fields and Support Projection

At continuous location $\mathbf{s}$, the latent regression is

$$
\eta(\mathbf{s})=\beta_0+\sum_{j=1}^{p}\beta_j V_j(\mathbf{s})+W(\mathbf{s}),
\qquad W(\mathbf{s})=\mathbf{b}(\mathbf{s})^\top\boldsymbol{\delta}.
$$

The $V_j$ are latent predictor fields, $W$ captures residual spatial variation, and $\boldsymbol{\delta}$ has a GMRF prior. The predictor fields also use basis expansions. For an areal mean over region $c$, define

$$
\overline{W}(c)=\frac{1}{|c|}\int_c W(\mathbf{s})\,d\mathbf{s}
=\left[\frac{1}{|c|}\int_c\mathbf{b}(\mathbf{s})\,d\mathbf{s}\right]^\top\boldsymbol{\delta}.
$$

An areal total omits the normalization. For rectangular regions, tensor-product basis integrals factor into one-dimensional B-spline integrals. Point evaluations and areal observations therefore use different known design matrices multiplying the same latent coefficients (Section 3.1; Supplement A). Exact integration here concerns the chosen spline representation, not exact recovery of an arbitrary underlying surface.

The general framework also allows transformations before integration. Averaging a nonlinear transformation of a field generally differs from transforming its average, so the observation mechanism determines the appropriate order (Section 3.2).

### Observation Models and Inference

Gaussian responses are noisy observations of projected latent responses, with an offset for each source. Predictors have their own latent fields, intercepts, and measurement errors. One response-source offset is fixed to zero to identify relative source biases; variances may depend on sampling-unit size.

For binary data, the model thresholds a noisy projected Gaussian latent variable at zero. This models a binary label for an aggregate unit; it is not the proportion of point-level positive outcomes within that unit. The paper fixes the threshold and the point-level residual field variance to address location and scale indeterminacy. The resulting aggregate field variance follows from projection.

Gibbs sampling uses truncated-normal auxiliary variables for binary observations, Gaussian conditional updates for coefficients and latent fields, inverse-gamma error-variance updates, and gamma updates for predictor-field precision parameters (Supplement C). Prediction applies new point or region design matrices to posterior samples, carrying parameter and latent-field uncertainty to the requested support.

## Experiments

### Synthetic Spatial Fields

Section 4.1 and Supplement D compare centroid-based models with models that integrate the latent field over observed units. Regular grids use a naive model and a support-aware model. Unequal-size, sparse, and overlapping configurations additionally include a centroid model with heteroscedastic errors, separating the effects of support and measurement variance.

The two-dimensional experiments use 400 quadratic basis functions for regular, irregular, and sparse configurations and 225 for overlapping units. Gibbs runs use 10,000 iterations, discard 2,000, and retain every fifth sample. The reported comparisons inspect predicted surfaces and the posterior probability that the predicted process exceeds the known simulated truth.

Centroid-based models tend to underestimate peaks and overestimate valleys; allowing heteroscedasticity alone does not remove this distortion. Support-aware models better recover the simulated patterns and produce fewer posterior overprediction probabilities near zero or one. Supplement D also shows that uncertainty errors are configuration-dependent: the naive one-dimensional irregular-grid model can overestimate uncertainty, while other settings show underestimation near centroids. These are illustrated simulation findings, not a reported aggregate RMSE or repeated-simulation coverage benchmark.

### Binary Data with Misaligned Predictors

Section 4.2 combines two binary response sources, one with an added bias of 0.3, with two predictors observed at different aggregate resolutions. Inference uses 10,000 Gibbs iterations, a 2,000-iteration burn-in, and thinning by ten. Posterior draws recover the main latent response pattern. A mean shift in the second latent predictor is absorbed through intercept terms without inducing the same shift in the main latent response prediction. The example demonstrates feasibility rather than a numerical comparison against competing fusion methods.

### Improved-Grassland Suitability

The input description lists 884,196 land-cover cells at 25 m, 884,642 elevation cells at a misaligned 25 m support, and growing degree days (GDD) and soil moisture surplus (SMS) on 549 cells at 1 km. The final fitted model in Section 5.3 uses GDD and SMS: elevation is excluded because of its strong correlation with GDD, and urban cells are masked. The land-cover counts describe the input data before this masking.

| Parameter | Reported 95% credible interval |
| --- | --- |
| Intercept | (-0.784, -0.647) |
| Latent GDD coefficient | (0.881, 1.04) |
| Latent SMS coefficient | (0.12, 0.274) |

Land suitability is defined as the predictor contribution $LS(\mathbf{s})=\mathbf{V}(\mathbf{s})^\top\boldsymbol{\beta}$, distinct from the intercept and residual spatial field. Section 5.3 and Figures 5-6 report predictions at 100 m, 500 m, and 1 km. Suitability is higher in the south and lower in western areas; latent land-cover prediction uncertainty decreases at coarser resolution. These surfaces are model-derived estimates, not independently observed suitability measurements.

## Limitations

- Exact spline projection is developed for rectangular supports. Irregular polygon integration by quadtree approximation or Monte Carlo methods is proposed as future work.
- The demonstrations rely on the assumed latent fields and observation mechanisms. Fine-resolution output does not itself validate fine-resolution accuracy, and the application does not report independent suitability ground truth or held-out predictive scores.
- Several latent fields make posterior sampling demanding; the discussion proposes marginalization to improve efficiency. No numerical runtime comparison is supplied.
- Count and spatial point-process extensions require suitable relationships between transformed continuous fields and aggregate observations and remain future work.
- The supplied Markdown has damaged equations and internal inconsistencies. This summary follows Section 5.3 and Figures 5-6 for the fitted predictors and 500 m output, rather than the discussion's elevation claim and 250 m reference. No DOI, arXiv identifier, or publication venue is supplied for this manuscript.

## Related Concepts

- [[concepts/change-of-spatial-support|Change of Spatial Support]]: Joint inference accounts for the actual observation geometry and its uncertainty.
- [[concepts/bayesian-spatial-disaggregation|Bayesian Spatial Disaggregation]]: Inferring a continuous surface from aggregates is one use of the support-projection framework.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: GMRF priors encode spatial structure in the basis coefficients.

## Related Papers

- Gelfand, Zhu, and Carlin (2001), "On the change of support problem for spatio-temporal data." Cited Gaussian-process treatment of support changes.
- Moraga et al. (2017), "A geostatistical model for combined analysis of point-level and area-level data using INLA and SPDE." Cited alternative using SPDE projections to integrate point and areal data.
- [[papers/integrating-data-across-misaligned-spatial-units|Integrating Data Across Misaligned Spatial Units]]: Complementary library reading on geometric diagnostics and downstream regression error. This is a thematic connection, not a citation in the supplied manuscript.

[[index|Library home]]
