---
title: "Bayesian spatial disaggregation modeling for the detection of disease clusters"
type: paper
authors:
  - Paula Moraga
  - Hanan Alahmadi
year: null
tags:
  - spatial-statistics
  - bayesian-modeling
  - spatial-disaggregation
  - disease-cluster-detection
---

## TL;DR

The paper combines [[bayesian-spatial-disaggregation|Bayesian Spatial Disaggregation]] with [[posterior-exceedance-probabilities|Posterior Exceedance Probabilities]] to detect high-risk locations within administrative areas from aggregated disease counts. Simulations show the highest or tied-highest sensitivity across the tested scenarios, but the disaggregation method detects a cluster in 18% of no-cluster simulations, compared with 5% for either scan-statistic baseline. A Pennsylvania lung cancer application illustrates finer cluster boundaries without independently establishing their accuracy.

## Research Question

Can disease clusters be delineated within administrative areas using only aggregated case counts, while retaining uncertainty estimates and accommodating risk covariates?

## Motivation

Confidentiality often restricts disease counts to administrative areas. Circular and flexible spatial scans, as implemented here, and Bayesian areal risk models classify entire areas as inside or outside a cluster. This restricts boundary resolution even when disease risk varies within an area. A spatially continuous latent risk surface permits cluster boundaries that cross those administrative boundaries.

## Contributions

- Applies exceedance-based cluster detection to a continuous risk surface inferred through Bayesian spatial disaggregation.
- Uses an INLA-SPDE implementation with a modified projection matrix for areal observations, building on Moraga et al. (2017).
- Compares cell-level sensitivity and specificity and dataset-level type I error against circular scans, flexible scans, and a Bayesian areal model.
- Demonstrates within-county cluster delineation for Pennsylvania lung cancer counts with nitrogen dioxide as a covariate.

## Method

The areal reference model uses observed counts $Y_i$, expected counts $E_i$, and relative risks $\lambda_i$:

$$
Y_i \mid \lambda_i \sim \operatorname{Poisson}(E_i\lambda_i),
\qquad
\log\lambda_i=\mathbf z_i^T\beta+u_i+v_i.
$$

Expected counts use indirect standardization when population strata are available. The Besag-York-Mollie specification combines a spatially structured conditional autoregressive effect $u_i$ with independent heterogeneity $v_i$.

The disaggregation approach instead represents risk through a continuous Gaussian random field. Section 3 describes Bayesian melding, relating areal quantities to integrals of an inverse-link-transformed spatial predictor over each observation region. INLA provides approximate Bayesian inference; the SPDE representation approximates the field with piecewise linear basis functions on a triangular mesh. A modified projection matrix accommodates areal observations, following Moraga et al. (2017).

Clusters are locations satisfying

$$
\Pr\{\theta(\mathbf x)>c\mid Y\}>d,
$$

where $\theta(\mathbf x)$ denotes relative risk. Both the simulation and application use $c=1$ and $d=0.7$; the areal baseline applies the same rule to area-specific risks. These posterior thresholds are distinct from the scan tests' significance level.

## Experiments

### Simulation Design

Section 4 generates Poisson counts on a $32\times32$ grid with population 100 per cell and baseline disease rate 0.10. Counts are aggregated into 50 irregular Voronoi areas before fitting. True clusters are three circles, an ellipse, or a rectangle with a hole, with relative risk 1.5, 3, or 8 inside clusters and 1 outside. The study uses 100 repetitions and a no-cluster scenario. Scan methods use `rflexscan`, maximum cluster size $K=15$, and significance level 0.05; Bayesian models use R-INLA.

### Reported Results

Table 1 reports the following mean sensitivity/specificity pairs for disaggregation:

| Cluster relative risk | Three circles | Ellipse | Rectangle with a hole |
| --- | --- | --- | --- |
| 1.5 | 0.89 / 0.88 | 0.95 / 0.89 | 0.93 / 0.81 |
| 3 | 0.97 / 0.88 | 1.00 / 0.90 | 0.99 / 0.81 |
| 8 | 0.99 / 0.90 | 1.00 / 0.90 | 0.97 / 0.85 |

Disaggregation has the highest sensitivity in eight of nine scenarios and ties both scan methods for the remaining scenario. Specificity does not uniformly favor it: for the ellipse at risk 1.5, flexible scans achieve 0.96 specificity versus 0.89 for disaggregation, with sensitivity 0.74 versus 0.95. For the rectangle with a hole at risk 8, disaggregation and circular scans both reach 0.97 sensitivity, but specificity is 0.85 versus 0.62.

The probability of detecting any cluster when none exists is 0.18 for disaggregation, 0.10 for the areal model, and 0.05 for each scan method (Section 4.4). High cell-level specificity therefore does not imply comparable control of dataset-level false positives.

### Pennsylvania Application

Section 5 analyzes 2002 lung cancer cases in Pennsylvania's 67 counties using `SpatialEpi`, with population from the 2000 census and age, gender, and race strata for standardization. Bayesian models include nitrogen dioxide ($\mathrm{NO}_2$). The continuous model uses a Matern covariance, a mesh extending 100 km beyond the region, maximum edges of 5 km inside and 50 km outside, and priors $\Pr(\sigma>1)=0.01$ and $\Pr(\rho<10\text{ km})=0.01$.

All methods identify predominant eastern and western clusters. Areal and disaggregation models yield similar broad patterns, with disaggregation permitting partial-county membership. The paper reports a positive $\mathrm{NO}_2$ coefficient of 0.006 with 95% credible interval (0.003, 0.009); the supplied text does not separately tabulate coefficients for the two Bayesian models. This is a model-based association, not an identified causal effect.

## Limitations

- At the chosen exceedance threshold, disaggregation has a substantially higher no-cluster false-positive rate than the scan tests. The reported evidence does not support unqualified superiority or nominal 5% error control.
- Simulations cover three shapes, three elevated risks, a constant population per fine cell, and one specified aggregation setup. Generalization to other population distributions, resolutions, and threshold choices is not established by these experiments.
- Fine-scale boundaries are inferred from aggregate observations under spatial-model assumptions. The Pennsylvania example lacks observed fine-scale cluster truth, so greater map resolution alone does not validate boundary accuracy.
- Covariance, mesh, priors, and exceedance thresholds affect inference; the paper specifies application settings but does not report a systematic sensitivity analysis of those choices. Its discussion of scan-method computational burdens is not accompanied by a runtime benchmark.
- The supplied Markdown contains damaged prose, notation, and figure captions. This page relies on readable sections and Table 1; the publication year and a stable identifier for this paper are absent and are left unspecified.

## Related Concepts

- [[bayesian-spatial-disaggregation|Bayesian Spatial Disaggregation]]
- [[posterior-exceedance-probabilities|Posterior Exceedance Probabilities]]

## Related Papers

The following works are cited in the supplied paper:

- Moraga, Cramb, Mengersen, and Pagano (2017), "A geostatistical model for combined analysis of point-level and area-level data using INLA and SPDE." Provides the spatial integration framework used here.
- Richardson, Thomson, Best, and Elliott (2004), "Interpreting posterior relative risk estimates in disease-mapping studies." Provides background for exceedance-based interpretation.
- Kulldorff (1997), "A spatial scan statistic." Circular-scan baseline.
- Tango and Takahashi (2005), "A flexibly shaped spatial scan statistic for detecting clusters." Flexible-scan baseline.
- Nandi et al. (2023), "disaggregation: An R package for Bayesian spatial disaggregation modeling." Related disaggregation implementation using TMB.

[[index|Library home]]
