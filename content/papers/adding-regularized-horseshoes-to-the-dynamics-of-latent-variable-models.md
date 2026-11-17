---
title: Adding Regularized Horseshoes to the Dynamics of Latent Variable Models
type: paper
authors:
  - Garret Binding
  - Piotr Koc
year: 2025
venue: Political Analysis
doi: "10.1017/pan.2024.30"
source_job_id: "51d5c71e-0424-4c53-bc1d-3cd83dbe03df"
tags:
  - bayesian-measurement
  - shrinkage-priors
  - dynamic-latent-variable-models
---

## TL;DR

Regularized horseshoe priors let dynamic latent traits remain nearly constant while permitting abrupt changes. Replicating Reuning, Kenwick, and Fariss (2019), Binding and Koc report better recovery, predictive fit, and precision than normal or Student-t innovations in simulations and a democracy-measurement application.

## Research Question

Can a sparsity-inducing innovation prior improve dynamic latent-variable estimates when stability is interrupted by sudden change?

## Motivation

Normal and Student-t random-walk innovations allow change but place appreciable probability on small departures from zero. A [[concepts/regularized-horseshoe-prior|Regularized Horseshoe Prior]] concentrates more strongly near zero while allowing large innovations, matching a substantive expectation of stasis punctuated by shocks.

## Contributions

- Applies an existing regularized horseshoe prior to dynamic latent-variable innovations.
- Replicates a 225-dataset simulation comparing normal, Student-t, and regularized horseshoe specifications.
- Re-estimates democracy trajectories with an ordered-logit measurement model and compares predictive fit and uncertainty.

## Method

The simulation uses unidimensional binary logistic IRT with response probability given by the logistic transformation of an item intercept minus discrimination times the latent position. Positive discriminations and location/scale constraints identify the latent dimension. Item intercepts and initial positions receive standard normal priors; discriminations receive standard half-normal priors.

Temporal dependence follows

$$
\theta_{i,t}=\theta_{i,t-1}+\sigma\gamma_{i,t},\qquad \sigma\sim N^+(0,1).
$$

The comparison varies the innovation prior: standard normal, Student-t with four degrees of freedom, or regularized horseshoe. For the latter,

$$
\gamma_{i,t}\sim N(0,\tau^2\tilde\lambda_{i,t}^2),\qquad
\tilde\lambda_{i,t}^2=\frac{c^2\lambda_{i,t}^2}{c^2+\tau^2\lambda_{i,t}^2}.
$$

Global and local scales have standard half-Cauchy priors, and $c^2\sim\operatorname{InvGamma}(0.5,0.5)$. Stan approximates the posterior. The empirical democracy application uses an ordered-logit likelihood, following the prior replication study.

## Experiments

### Simulation recovery

The study uses 50 units, 50 periods, and five items. Latent states either follow normal random-walk increments or reset to a new standard normal draw. Varying smoothing and break probability yields 225 datasets, with 25 per condition. Across the reported comparisons, regularized horseshoe innovations improve correlation and LOO expected log predictive density while reducing RMSE and standard errors. Reported median relative improvements range from 2.3%–7.3% for RMSE/standard errors and 0.2%–2.3% for correlation/model fit. Gains are larger with more frequent shocks and smaller smoothing scale (Section 4.1).

### Democracy trajectories

| Metric | Regularized horseshoe | Student-t | Normal |
| --- | ---: | ---: | ---: |
| Predictive accuracy | 62.9% | 61.7% | 58.5% |
| 95% credible interval for accuracy | 62.6%–63.2% | 61.4%–62.0% | 58.2%–58.8% |

LOO ELPD favors the horseshoe by 1,781 units (SE 58) over Student-t and 6,023 (SE 125) over normal. Philippines and Afghanistan trajectories illustrate recovery of abrupt shifts. Across country-years, year-over-year mean changes show little systematic difference, while horseshoe credible intervals average 44% of normal-prior interval widths and 73% of Student-t widths (Section 4.2).

## Limitations

The evidence covers one simulation design family and one democracy application. Extensions to party positions, public opinion, budgets, and differential item functioning are proposed rather than tested. Narrower intervals demonstrate precision, not independently verified coverage or construct validity. The supplied Markdown lacks the supplementary analyses and contains damaged equation typography; this summary uses the clearly stated model components and main-text results.

## Related Concepts

- [[concepts/regularized-horseshoe-prior|Regularized Horseshoe Prior]]: global-local shrinkage with regularized large deviations.
- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: temporal innovation assumptions shape inferred political trajectories.
- [[concepts/dynamic-item-response-models|Dynamic Item Response Models]]: combines longitudinal transitions with item measurement.

## Related Papers

- Reuning, Kenwick, and Fariss (2019), “Exploring the Dynamics of Latent Variable Models”: supplies the replicated simulation and democracy application.
- Piironen and Vehtari (2017), “Sparsity Information and Regularization in the Horseshoe and Other Shrinkage Priors”: develops the prior used here.
- [[papers/dynamic-estimation-of-latent-opinion-using-a-hierarchical-group-level-irt-model|Dynamic Estimation of Latent Opinion Using a Hierarchical Group-Level IRT Model]]: cited application of temporal pooling to political measurement.

Replication data identifier supplied in the paper: `10.7910/DVN/G2VRQH`.
