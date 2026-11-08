---
title: "Sequential Bayesian Registration for Functional Data"
type: paper
authors:
  - Yoonji Kim
  - Oksana A. Chkrebtii
  - Sebastian A. Kurtek
year: 2022
arxiv: "2203.12005"
tags:
  - functional-data-analysis
  - functional-registration
  - bayesian-inference
  - sequential-monte-carlo
  - online-learning
---

## TL;DR

This paper turns Bayesian [[Functional Registration|functional registration]] into a sequential learning problem. Starting from posterior particles for an initial set of curves, its [[Sequential Monte Carlo]] algorithm assimilates each new function by adding and initializing its phase component, reweighting and perturbing particles, and updating the shared template and noise variance. Simulations and three real-data studies report accurate alignment, support for multimodal phase posteriors, and substantially lower computation than repeatedly refitting the full model with MCMC.

## Research Question

How can Bayesian functional registration update its posterior over a shared template, observation-specific phase variation, and noise as new functions arrive, without rerunning batch MCMC on the complete dataset?

## Motivation

Functional observations often arrive sequentially in environmental monitoring and biomedical signals. Their variability mixes amplitude, which changes feature magnitude, with phase, which changes feature timing. Existing Bayesian registration methods separate these components and quantify uncertainty, but their batch MCMC inference must be repeated after every arrival. A sequential method should preserve that uncertainty while expanding the state space to include the phase of each new curve.

## Contributions

- Formulates Bayesian elastic registration as sequential posterior inference over a template SRVF, piecewise-linear phase functions, and observation noise.
- Develops an SMC update for a state space whose dimension grows whenever a new function introduces another phase component.
- Initializes each new phase near a high-posterior region by optimally aligning the incoming curve to each particle's template, then perturbing that alignment with a Dirichlet-distributed warping.
- Combines particle reweighting, ESS-triggered resampling, Metropolis-Hastings rejuvenation, identifiability centering, and a Gibbs update for noise variance.
- Demonstrates the approach on simulations, including a bimodal phase posterior, and on drought intensity, sea-surface salinity, and ECG PQRST complexes.

## Method

The observation model operates in square-root velocity function (SRVF) space. Each observed SRVF is modeled as a warped version of a latent template plus Gaussian white noise. The template is a basis expansion, using cubic B-splines in the reported experiments. Each monotone phase function is represented by piecewise-linear increments on a fixed partition and given a Dirichlet prior centered on the identity warping.

Inference begins with equally weighted MCMC draws from the posterior for an initial batch. When a new function arrives, every particle is augmented with a new phase. Dynamic programming first aligns the new function to that particle's current template; a Dirichlet perturbation around this alignment supplies a stochastic initialization. The particle weight is then updated using the incoming function's likelihood, the phase prior, and the initialization density.

Particles are resampled when effective sample size falls below half the particle count. Metropolis-Hastings moves diversify template coefficients and phase increments, a centering transformation makes the mean phase the identity for identifiability, and a conjugate Gibbs step updates the noise variance. The method uses an approximate backward-kernel argument for otherwise intractable transition densities, so its posterior updates are approximate rather than exact.

## Experiments

In the first simulation, the method starts from 10,000 MCMC particles for 30 curves and sequentially assimilates 70 more. The posterior mean template has extended Fisher-Rao distance 0.1080 from ground truth, phase posterior variances are below $10^{-4}$, and the true noise variance lies in the 99% central credible region. Across 100 replications, SMC has lower reported mean-squared error than batch MCMC for posterior means and modes of both template coefficients and phase increments.

For the same sequence of posteriors, repeated batch MCMC takes 322,906 seconds, while initialization plus all sequential updates takes 58,568 seconds, an average reduction above 80%. The second simulation gives one single-peak curve alongside six two-peak curves; the particles recover both phase modes corresponding to aligning the single peak with either template peak.

The real-data studies assimilate annual drought-intensity curves from 1970-2019, annual sea-surface-salinity curves from 2000-2017 grouped by ENSO state, and 50 segmented ECG PQRST complexes. The reported results separate timing from magnitude variation, expose a multimodal drought phase for 2017, distinguish the El Nino salinity template from neutral and La Nina templates, and align the prominent PQRST features with low timing uncertainty around the QRS complex.

## Limitations

- The transition-density approximation assumes adjacent posterior marginals are similar. With fewer than about five previously registered functions and a newly arriving curve of very different shape, weights may be unrepresentative; the authors suggest intermediate annealing steps.
- Initial particles still require batch inference, and the suitable initial batch size depends on how much the template posterior may change as data arrive.
- The model requires functions whose derivatives exist almost everywhere because inference is performed in SRVF space.
- Piecewise-linear phase functions and their fixed partition trade flexibility for a lower-dimensional state space; a partition that is too small degrades registration.
- Curves are conditionally independent given template and phase, limiting forecasting and excluding temporal dependence between arrivals.
- The reported implementation assumes a common noise variance and focuses on univariate functions. Multivariate curves with cross-component phase variation require more elaborate, identifiable priors.
- Comparisons use the authors' implementations and simulation settings; the large runtime advantage reflects repeated full MCMC refits as the batch baseline.

## Related Concepts

- [[Functional Registration]]
- [[Sequential Monte Carlo]]
- [[Functional Principal Component Analysis]]
- Bayesian hierarchical modeling
- Square-root velocity function

## Related Papers

- Lu, Herbei, and Kurtek (2017), "Bayesian Registration of Functions with a Gaussian Process Prior."
- Bharath and Kurtek (2020), "Distribution on Warp Maps for Alignment of Open and Closed Curves."
- Matuk et al. (2021), "Bayesian Framework for Simultaneous Registration and Estimation of Noisy, Sparse, and Fragmented Functional Data."
- [[DeepFRC: An End-to-End Deep Learning Model for Functional Registration and Classification]]

[[index|Library home]]
