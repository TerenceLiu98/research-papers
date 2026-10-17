---
title: Besag-York-Mollié Model
type: concept
aliases:
  - BYM Model
  - Besag-York-Mollie Model
tags:
  - spatial-statistics
  - bayesian-modeling
  - disease-mapping
---

## Overview

The Besag-York-Mollié model estimates area-level disease risks by combining spatially structured variation with independent heterogeneity. A Poisson likelihood accounts for differences in expected case counts, while the two latent effects allow neighboring areas to resemble one another without requiring all excess variation to be spatially smooth.

## Key Ideas

For observed counts $y_i$ and expected counts $c_i$ under a reference risk,

$$
y_i\mid x_i\sim\operatorname{Poisson}(c_i e^{x_i}),
\qquad x_i=t_i+u_i+v_i.
$$

Here $t_i$ represents measured covariates, $u_i$ is spatially structured, and $v_i\sim N(0,\lambda)$ is independent heterogeneity. With the quadratic intrinsic autoregression in Besag, York, and Mollié, the spatial full conditional is

$$
u_i\mid u_{-i},\kappa\sim
N\left(\frac{1}{n_i}\sum_{j\in\partial i}u_j,\frac{\kappa}{n_i}\right).
$$

- The spatial prior penalizes differences between adjacent effects. It does not fix their common level, so it is improper as a standalone joint distribution. Posterior specification must account for this property.
- The independent effect captures extra-Poisson heterogeneity that need not follow the adjacency graph. The relative importance of the two components is learned rather than chosen in advance.
- Local conditional dependence applies to the spatial component $u$. The original paper notes that the induced prior conditional for the combined effect $u+v$ generally depends on all other areas.
- Posterior draws support intervals and prespecified regional contrasts as well as point estimates. A smooth-looking map does not by itself establish precise risk differences for individual areas.
- Hyperpriors matter: the original paper identifies posterior impropriety with inverse-scale hyperpriors and modifies its variance prior near zero. Its computational remedy should be understood in the context of that particular formulation.

## Important Papers

- [[papers/bayesian-image-restoration-with-two-applications-in-spatial-statistics|Bayesian Image Restoration, with Two Applications in Spatial Statistics]]: develops the structured-plus-independent disease-risk formulation and illustrates posterior sampling with French mortality and northern English cancer-incidence data.
- [[papers/bayesian-spatial-disaggregation-modeling-for-the-detection-of-disease-clusters|Bayesian spatial disaggregation modeling for the detection of disease clusters]]: uses a BYM areal model as a comparison for cluster detection based on a continuous risk surface.

## Related Concepts

- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: the neighborhood association represented by the structured effect.
- [[concepts/bayesian-spatial-disaggregation|Bayesian Spatial Disaggregation]]: extends the modeling target from area-level risks to a continuous surface informed by aggregated counts.
- [[concepts/posterior-exceedance-probabilities|Posterior Exceedance Probabilities]]: summarize the posterior probability that a risk exceeds a chosen threshold.
