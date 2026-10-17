---
title: "Bayesian Image Restoration, with Two Applications in Spatial Statistics"
type: paper
authors:
  - Julian Besag
  - Jeremy York
  - Annie Mollié
year: null
source_job_id: 26813c10-511d-4d9a-9ddf-f38bceaecca4
tags:
  - spatial-statistics
  - bayesian-modeling
  - disease-mapping
  - image-restoration
---

## TL;DR

Spatial classification and disease-risk estimation can be treated as Bayesian image restoration on regular grids or irregular administrative areas. Neighborhood priors and Gibbs sampling recover latent patterns while quantifying uncertainty. The disease model combines spatially structured and independent heterogeneity in the [[concepts/besag-york-mollie-model|Besag-York-Mollié Model]]. A thyroid-cancer simulation reports log-risk mean squared error of 1.4 after smoothing versus 5.1 for raw estimates; the empirical maps illustrate patterns rather than establish their causes.

## Research Question

Can Bayesian image-restoration methods recover spatial signals and useful uncertainty estimates from noisy archaeological measurements and disease counts?

## Motivation

Raw measurements can obscure local structure, especially when disease counts are small and populations at risk differ across areas. The paper treats a "pixel" as any spatial unit with an underlying latent state. Its applications have sufficiently few units to make repeated posterior sampling practical with the computing resources considered in the paper. Posterior samples support marginal probabilities, intervals, and aggregate functionals that a single maximum a posteriori estimate cannot supply.

## Contributions

- Connects pixel-based Bayesian restoration to binary archaeological classification and continuous disease-risk mapping.
- Demonstrates posterior marginal classification with a neighborhood model and missing observations.
- Combines a spatial intrinsic autoregression with independent extra-Poisson heterogeneity for disease counts.
- Uses Gibbs sampling for uncertainty assessment and iterated conditional modes for conditional posterior modes, while identifying difficulties caused by hyperpriors near zero variance.

## Method

### Restoration and Classification

Section 2 combines a spatial prior and an observation likelihood as $p(x\mid y)\propto p(y\mid x)p(x)$. Gibbs sampling updates each latent state from its full conditional. Under conditionally independent local observations, an update depends on the local likelihood and the prior conditional.

For archaeology, $x_i\in\{0,1\}$ indicates past activity and the prior is $p(x;\beta)\propto\exp(\beta v)$, where $v$ counts equal-label horizontal, vertical, and diagonal neighbor pairs. Observed log phosphate concentrations follow Gaussian distributions with means 4.0 and 4.5 for the two classes and common variance $\kappa$. Missing measurements contribute no likelihood term. The authors alternate 1,000 Gibbs cycles, marginal-majority classification, and plug-in re-estimation of $\beta$ and $\kappa$ for fifteen rounds. This is an ad hoc parameter procedure, not joint posterior inference for all unknowns.

### Disease Mapping

Section 4 models counts using expected cases $c_i$ under constant risk:

$$
y_i\mid x_i\sim\operatorname{Poisson}(c_i e^{x_i}),
\qquad x_i=t_i+u_i+v_i,
\qquad v_i\sim N(0,\lambda).
$$

The covariate term $t_i$ is omitted in the worked exposition. The spatial effect uses a pairwise-difference prior with kernel

$$
p(u\mid\kappa)\propto
\exp\left[-\frac{1}{2\kappa}\sum_{i\sim j}(u_i-u_j)^2\right]
$$

for fixed $\kappa$, yielding $u_i\mid u_{-i},\kappa\sim N(\bar u_i,\kappa/n_i)$ when there are $n_i$ neighbors. Because differences do not fix the overall level, this intrinsic prior is improper. An alternative absolute-difference penalty centers conditional modes at neighborhood medians and accommodates discontinuities.

The paper finds that a hyperprior proportional to $\kappa^{-1}\lambda^{-1}$ makes its posterior improper near zero. Its implemented modification uses $p(\kappa,\lambda)\propto\exp[-\epsilon/(2\kappa)-\epsilon/(2\lambda)]$ with $\epsilon=0.01$, addressing the origin singularity discussed in Section 4. Typical runs use 1,000 initial cycles and 10,000 subsequent cycles, storing every tenth or twentieth for interval estimation. Conditional modes at estimated hyperparameters are computed by iterated conditional modes; their fitted total count equals the observed total.

## Experiments

| Application | Data | Reported finding |
| --- | --- | --- |
| Archaeological activity | Laconia, Greece; a $16\times16$ grid at 10 m spacing, with nine missing measurements | Posterior activity probabilities supplement classifications; final plug-in estimates are $\hat\kappa=0.438$ and $\hat\beta=1.04$ after 15,000 Gibbs cycles. |
| Thyroid-cancer mortality | 2,588 deaths among women across 94 mainland French departments, 1971–1978 | Spatial variation remains after smoothing; $\hat\kappa=0.129$ and $\hat\lambda=0.011$. |
| Multiple-myeloma mortality | 4,340 deaths among men across the same departments and period | Estimated risk is nearly uniform, with a possible exception in Moselle; $\hat\kappa=\hat\lambda=0.009$. |
| Cancer incidence excluding leukemias | 1,904 cases among ages 0–24 across 216 Greater Manchester wards, 1968–1985 | Smoothing reveals a northwest-versus-remainder pattern, but every ward's 90% interval includes unit relative risk. |

In the thyroid simulation, the authors generate Poisson counts using fitted log risks as truth. Reported mean squared errors are 5.1 for raw log relative risks and 1.4 for restored estimates. Of 94 true log risks, 81 lie within nominal 80% intervals and 89 within nominal 90% intervals. Two further simulations are described as producing similar error comparisons. This is a small simulation exercise under the assumed Poisson observation model.

A second exercise fixes $\kappa$ and $\lambda$ at their estimated values. Although doing so generally omits hyperparameter uncertainty, the authors find no systematic interval effect in this example. They also report nearly identical estimated risks for the Greater Manchester application when replacing the quadratic spatial penalty with the absolute-difference alternative.

## Limitations

- Archaeological classification uses a simple neighborhood prior, fixed class means, and plug-in hyperparameter estimates. Border locations and missing observations weaken the spatial evidence.
- Disease-risk patterns require further epidemiological investigation and residual analysis. The proposed pollution explanation for the Manchester pattern is an interpretation, not a causal estimate.
- The Manchester regional contrast was discovered from the map. The authors distinguish this exploratory finding from a contrast specified before inspecting the data.
- Intrinsic-prior impropriety, hyperprior behavior, and sampler singularities require explicit treatment. The reported sampling schedule is not a general convergence guarantee.
- Simulation results concern a few realizations based on one fitted risk surface; they do not establish uniform accuracy or interval calibration across settings.
- The supplied Markdown records receipt in 1989 and revision in 1990 but does not state the publication year or a stable identifier. Those bibliographic fields are not inferred from manuscript dates.

## Related Concepts

- [[concepts/besag-york-mollie-model|Besag-York-Mollié Model]]: structured and independent latent effects for areal disease counts.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: neighborhood similarity motivates spatial regularization.
- [[concepts/bayesian-spatial-disaggregation|Bayesian Spatial Disaggregation]]: models spatial variation within areas, whereas this paper assigns latent risk to each area.
- [[concepts/posterior-exceedance-probabilities|Posterior Exceedance Probabilities]]: another posterior summary for interpreting uncertain risk estimates.

## Related Papers

- Geman and Geman (1984), "Stochastic relaxation, Gibbs distributions and the Bayesian restoration of images": cited foundation for Bayesian image analysis and Gibbs sampling.
- Clayton and Kaldor (1987), "Empirical Bayes estimates of age-standardized relative risks for use in disease mapping": cited predecessor in spatial risk estimation.
- Künsch (1987), "Intrinsic autoregressions and related models on the two-dimensional lattice": cited background for the intrinsic spatial prior.
- [[papers/bayesian-spatial-disaggregation-modeling-for-the-detection-of-disease-clusters|Bayesian spatial disaggregation modeling for the detection of disease clusters]]: a related library paper that uses the structured-plus-independent areal model as a reference for continuous spatial disaggregation.

[[index|Library home]]
