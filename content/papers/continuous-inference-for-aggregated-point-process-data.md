---
title: Continuous inference for aggregated point process data
type: paper
authors:
  - Benjamin M. Taylor
  - Ricardo Andrade-Pacheco
  - Hugh J. W. Sturrock
year: 2018
venue: Journal of the Royal Statistical Society, Series A
volume: 181
issue: 4
pages: "1125-1150"
source_job_id: 02d9f134-d5f0-4570-b6ff-3a8c5e18430d
tags:
  - spatial-statistics
  - point-processes
  - spatial-disaggregation
  - change-of-support
---

## TL;DR

Taylor, Andrade-Pacheco, and Sturrock extend log-Gaussian Cox process data augmentation to aggregated counts with overlapping, uncertain, or time-varying observation regions. Alternating latent fine-grid counts with continuous-process parameter updates permits risk mapping and prediction on new geographic partitions. A cirrhosis overlap study, Namibian malaria analysis, and illustrative English electoral-boundary forecast demonstrate the approach; fine-scale accuracy remains conditional on covariates, allocation assumptions, and spatial priors.

## Research Question

How can a continuous spatial or spatiotemporal event process be inferred from regional counts when observation boundaries overlap, are uncertain, or differ from the boundaries on which predictions are needed?

## Motivation

Confidentiality and routine reporting often preserve regional counts but conceal event locations. Discrete areal models encode dependence through region adjacency, which need not represent population distribution, region geometry, or the underlying event process. Modeling that process directly allows subregional information to enter inference and supports [[concepts/change-of-spatial-support|Change of Spatial Support]] without treating regional centroids as observed event locations.

## Contributions

- Extends existing aggregated spatial LGCP methods to overlapping catchments through adjusted multinomial allocation probabilities (Section 3).
- Incorporates stochastic boundaries with a specified boundary distribution and extends the approach to a common spatiotemporal grid (Sections 4-5).
- Demonstrates posterior risk surfaces, exceedance probabilities, and reaggregation of predictive counts onto proposed electoral boundaries (Sections 6-8).

## Method

### Latent Process and Data Augmentation

The underlying intensity is

$$
R(s,t)=P(s,t)\exp\{Z(s,t)\beta+\mathcal Y(s,t)\},
$$

where $P$ is a known population or exposure offset, $Z$ contains subregional covariates, and $\mathcal Y$ is a Gaussian field with covariance parameters $\eta$. Conditional on the intensity, events follow a Poisson process. The implementation discretizes the field and covariates onto a fine grid.

Regional totals $T$ are observed; grid-cell counts $N$ are latent. A Gibbs scheme alternates process updates from $\pi(\beta,\eta,Y\mid N)$ with multinomial reallocations from $\pi(N\mid\beta,\eta,Y,T)$. Allocation uses current intensity and polygon-cell intersection geometry, preserving the observed regional totals. Geometry for fixed regions can be computed once and reused (Section 2; Algorithm 1).

### Overlap, Uncertainty, and Time

When catchments overlap, an event in a shared area contributes to one reporting region according to specified allocation probabilities. Independently allocating every region's counts without this adjustment would inflate inferred intensity in shared areas. The correction accounts for multiway intersections and relative sampling effort; Monte Carlo integration approximates the geometric weights. These reporting probabilities are assumed known, with equal preference offered as a substantive fallback assumption (Section 3).

For uncertain boundaries, the algorithm samples a boundary configuration from a specified distribution, recomputes intersections, and reallocates counts consistently with that configuration. Boundary-distribution hyperparameters are assumed known, and boundary randomness is assumed independent of the latent field and process parameters (Section 4; Algorithm 2).

A common grid supports different observation geometries at different times. Separable or nonseparable temporal-spatial covariance models can be used. The applications employ Metropolis-adjusted Langevin updates and fast Fourier transforms for Gaussian-field computations; this sampler is an implementation choice rather than a requirement of the augmentation scheme (Sections 5 and 7).

## Experiments

### Controlled Overlap Using Cirrhosis Cases

Section 6 aggregates 415 georeferenced primary biliary cirrhosis cases into regions expanded by buffers of 0, 150, 300, 450, and 600 m. Cases in overlaps are randomly assigned to one region. Each fit uses 500,000 MCMC iterations, 10,000 burn-in iterations, and thinning by 490.

Posterior mean fields and relative-risk exceedance maps remain visually similar across these five allocations. However, the income-deprivation coefficient declines from 5.03 (interval 2.59-7.30) without overlap to 1.51 (-1.53 to 4.82) at 600 m (Table 3). The authors suggest allocation-specific variation as a possible explanation. The spatial-range posterior provides little information beyond its prior. This is an illustrative sensitivity analysis, not a repeated-simulation accuracy benchmark.

### Malaria in Northern Namibia

Section 7 models 24 monthly panels of counts reported to 16 health facilities in Engela district. Population offsets come from WorldPop; environmental predictors are one-month-lagged vegetation index (EVI), land-surface temperature (LST), and normalized water difference index (NDWI). A travel-time Huff model defines attendance probabilities, with a 20% cutoff used to construct overlapping catchments. A $128\times64$ computational grid, extended to manage Fourier wraparound, yields output on a $64\times32$ grid.

Table 4 reports multiplicative effects as posterior medians and 95% credible intervals:

| Predictor | Median | 95% credible interval |
| --- | ---: | --- |
| EVI | 2.16 | 1.37-3.60 |
| LST | 1.61 | 1.13-2.30 |
| NDWI | 0.972 | 0.57-1.56 |

EVI and LST are positively associated with modeled malaria risk; NDWI is inconclusive. Monthly maps show posterior probabilities that residual relative risk exceeds 1.5. The authors report little temporal dependence between the monthly latent fields.

### Illustrative Electoral-Boundary Forecast

Section 8 fits separate models to Conservative, Labour, and Liberal Democrat votes from the 2010 and 2015 elections in an area around Manchester extending to York and Uttoxeter. Predictors include deprivation domains and 2015 Green and UK Independence Party vote shares. Votes are divided by 100 to improve mixing. Each model uses a $128\times128$ grid and one million iterations, discarding 50,000 and retaining every 950th draw.

For each of 1,000 retained draws, simulated cell counts are aggregated to proposed boundaries using cell-intersection fractions. Winners are assigned by the largest party-specific predictive median; separate win probabilities use the fraction of simulated victories. Table 6 reports 28 Conservative seats (27%) and 74 Labour seats (73%) under the proposed configuration, compared with 33 (28%) and 82 (69%) in 2015. These are the paper's scenario predictions for a proposed 2020 election, not observed election results; the supplied table leaves the Liberal Democrat forecast cell blank.

Fit plots are strongest for the Conservatives and more dispersed for Labour. Liberal Democrat votes are underestimated in 2010 and overestimated in 2015, showing difficulty accommodating their change between elections. No held-out election forecast evaluation is reported.

## Limitations

- "Continuous" inference is implemented on a finite grid; covariate resolution and computational capacity constrain useful refinement. Subregional information reduces neither ecological bias nor uncertainty automatically.
- Allocation probabilities and boundary-distribution hyperparameters are supplied assumptions. Learning boundary uncertainty jointly with spatial correlation raises identification problems that are not fully investigated.
- Changing historical boundaries are supported by the framework but not demonstrated in the applications. The election example predicts onto a new partition; the authors lacked a reliable 2005 boundary file for a historical-change example.
- Covariance-range priors influence smoothing when the data weakly identify range. The cirrhosis example explicitly exhibits this dependence.
- Separate election models assume independent predicted party counts and do not model competition for votes. Vote rescaling and poor Liberal Democrat fit further qualify the illustrative win probabilities.
- Computation is expensive, especially when uncertain boundaries require repeated intersections. The discussion's reported 10-30-fold GPU speedup concerns earlier point-referenced spatial LGCP code, not a benchmark of the complete method presented here.
- The supplied Markdown contains damaged notation and some table entries. Numerical summaries above use readable tables and prose; no DOI is supplied and none is inferred.

## Related Concepts

- [[concepts/log-gaussian-cox-processes|Log-Gaussian Cox Processes]]: the latent event-intensity model.
- [[concepts/bayesian-spatial-disaggregation|Bayesian Spatial Disaggregation]]: posterior allocation of aggregate counts to finer spatial units.
- [[concepts/change-of-spatial-support|Change of Spatial Support]]: inference across observation and prediction boundaries.
- [[concepts/posterior-exceedance-probabilities|Posterior Exceedance Probabilities]]: uncertainty-aware identification of elevated risk.

## Related Papers

- Li et al. (2012), "Log Gaussian Cox processes and spatially aggregated disease incidence data": cited foundation for aggregated spatial LGCP inference.
- Taylor et al. (2015), "Bayesian inference and data augmentation schemes for spatial, spatiotemporal and multivariate log-Gaussian Cox processes in R": cited augmentation and computational foundation.
- [[papers/spatial-latent-gaussian-modelling-with-change-of-support|Spatial Latent Gaussian Modelling with Change of Support]]: related library work on joint support-aware response and predictor modeling with spline fields; a thematic connection, not a citation in this 2018 paper.
- [[papers/bayesian-spatial-disaggregation-modeling-for-the-detection-of-disease-clusters|Bayesian spatial disaggregation modeling for the detection of disease clusters]]: related library application using INLA-SPDE and exceedance-based cluster detection rather than multinomial count augmentation.

[[index|Library home]]
