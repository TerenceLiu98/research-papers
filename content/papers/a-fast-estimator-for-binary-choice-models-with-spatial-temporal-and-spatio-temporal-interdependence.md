---
title: "A Fast Estimator for Binary Choice Models with Spatial, Temporal, and Spatio-Temporal Interdependence"
type: paper
authors:
  - Julian Wucherpfennig
  - Aya Kachi
  - Nils-Christian Bormann
  - Philipp Hunziker
year: 2021
doi: "10.1017/pan.2020.54"
tags:
  - spatial-econometrics
  - binary-outcomes
  - likelihood-estimation
---

## TL;DR

A pseudo maximum likelihood estimator (PMLE) makes latent binary choice models with spatial and temporal dependence computationally practical by approximating propagated random shocks and avoiding direct matrix inversion. Simulations show substantial speed gains over recursive importance sampling (RIS), but Hessian standard errors can be too small and coefficient recovery is imperfect in stronger-dependence settings.

## Research Question

Can binary spatio-temporal autoregressive models be estimated quickly while retaining useful parameter recovery?

## Motivation

Dependence among latent outcomes makes the joint binary likelihood require high-dimensional integration. Simulation-based estimators become expensive as the number of units and time periods grows, limiting applications such as fine-grained conflict analysis.

## Contributions

- Extends Smirnov’s spatial PMLE to temporal and combined spatio-temporal dependence.
- Provides a computational strategy based on iterative gradient procedures and approximations instead of explicit inversion of large dependence matrices.
- Compares parameter recovery, uncertainty, convergence, and runtime across simulation designs, identifying unresolved inference problems.

## Method

The latent model is

$$
y^*=\rho Wy^*+\gamma Ty^*+X\beta+u,\qquad y_{it}=\mathbf{1}(y^*_{it}>0).
$$

Here $W$ links units within periods and $T$ links each unit to its preceding period. Define $Z=(I-\rho W-\gamma T)^{-1}$ and $D=\operatorname{diag}(Z)$. The reduced form decomposes into $ZX\beta+(Z-D)u+Du$.

The approximation drops the off-diagonal propagated shocks $(Z-D)u$, while retaining dependence in the systematic predictor. It constructs probabilities $p_{it}=F_u([ZX\beta]_{it}/d_{it})$ and maximizes the Bernoulli product $\prod_{it}p_{it}^{y_{it}}(1-p_{it})^{1-y_{it}}$. Normal and logistic links are discussed; the reported simulations use probit. Mean stationarity supplies an approximation to the unobserved initial latent outcomes using sample covariate means (Section 3).

The authors motivate neglecting propagated shocks using zero-mean independent disturbances. This is an approximation to choice probabilities, rather than an exact evaluation of the joint likelihood. Section 4 reports almost linear complexity in the number of units for its implementation; detailed algorithms and derivations are assigned to the online appendix, which is not included in the supplied Markdown.

## Experiments

The main Monte Carlo study uses 500 repetitions per setting, a standard-normal covariate, coefficients $\beta_0=-0.5$ and $\beta_1=1$, and row-standardized queen-neighborhood weights on a square lattice. Sample sizes are $64\times4$, $64\times16$, and $256\times16$. Dependence settings $(\rho,\gamma)$ are $(0.25,0.25)$, $(0.5,0.25)$, and $(0.25,0.5)$.

| Evidence | Reported result |
| --- | --- |
| Runtime at 64 units × 16 periods | PMLE takes 7 seconds versus nearly 3 hours for RIS. |
| Runtime at 256 units × 16 periods | PMLE takes 9 seconds. The almost-two-week RIS figure is an extrapolation, not an executed benchmark. |
| Weak dependence, largest sample | Mean estimates are −0.483, 0.964, 0.249, and 0.249 for intercept, slope, temporal dependence, and spatial dependence. |
| Stronger temporal dependence, largest sample | Mean slope is 0.860 despite a true value of 1; temporal and spatial estimates are 0.499 and 0.246. |
| Uncertainty calibration | For spatial dependence 0.5 at the smallest sample, intercept overconfidence is 2.027 and spatial-parameter overconfidence is 1.474. |
| Convergence | Fewer than 1% of PMLE runs fail to converge, according to the appendix results summarized in the main text. |

Overconfidence is the empirical standard deviation of estimates divided by the mean estimated standard error. Values above one indicate underestimated uncertainty. The authors report that RIS performance depends on the data-generating process. For purely spatial models, they prefer the Bayesian comparator; PMLE may instead provide fast starting values. Purely temporal comparisons favor PMLE over RIS in the studied settings (Section 5).

## Limitations

- Hessian-based standard errors can be underestimated. Parametric bootstrap and Godambe sandwich corrections are proposed remedies, not validated solutions in this paper.
- Parameter recovery is design-dependent; Table 1 shows persistent slope attenuation in stronger temporal-dependence settings.
- Initial latent outcomes rely on a mean-stationarity approximation.
- The supplied source contains the main article, not the appendix; detailed computational procedures and supplementary comparisons cannot be reconstructed from it alone.
- Runtime claims for the largest RIS case are extrapolated, and superiority does not extend to the purely spatial Bayesian comparison.

## Related Concepts

- [[concepts/composite-likelihood|Composite Likelihood]]: provides the broader framework for understanding why a tractable surrogate objective needs dependence-aware uncertainty calculations. Here, probabilities additionally approximate propagated shocks.
- [[concepts/multivariate-probit-models|Multivariate Probit Models]]: shares the challenge of high-dimensional latent Gaussian probabilities, while this paper imposes dependence through spatial and temporal autoregression.

## Related Papers

- Smirnov (2010), *Modeling Spatial Discrete Choice*: spatial PMLE extended by this paper.
- Franzese, Hays, and Cook (2016), *Spatial-and Spatiotemporal-Autoregressive Probit Models of Interdependent Binary Outcomes*: RIS comparator for combined spatial and temporal dependence.
- Varin, Reid, and Firth (2011), *An Overview of Composite Likelihood Methods*: framework cited for uncertainty corrections.
- [[papers/fast-multivariate-probit-estimation-via-a-two-stage-composite-likelihood|Fast Multivariate Probit Estimation via a Two-Stage Composite Likelihood]]: related library approach to fast correlated-binary estimation using marginal likelihoods and explicit variance correction; its dependence model and approximation differ.

Published in *Political Analysis* 29, 570–576. [Article](https://doi.org/10.1017/pan.2020.54). [Replication materials](https://doi.org/10.7910/DVN/9SKYLD).
