---
title: "A Test for Treatment Heterogeneity under a Distributional Difference-in-Difference Framework"
type: paper
authors:
  - Satarupa Bhattacharjee
  - Bing Li
  - Lingzhou Xue
year: null
tags:
  - causal-inference
  - difference-in-differences
  - optimal-transport
  - kernel-methods
  - distributional-treatment-effects
---

## TL;DR

The paper combines an optimal-transport counterfactual with a maximum mean discrepancy (MMD) test to detect distributional treatment effects in a two-group, two-period design. Calibration accounts for estimation of the untreated drift from controls. The authors report high power in three simulations and reject distributional compatibility in the Card-Krueger minimum-wage data, conditional on a shared untreated transport map. The null concerns equality of marginal outcome distributions, so rejection alone does not establish variation in individual treatment effects.

## Research Question

Can a global test detect differences between observed treated post-treatment outcomes and their transported counterfactual distribution, including changes in spread, shape, or tails that an average treatment effect may miss?

## Motivation

Mean-based difference-in-differences summarizes treatment through an average contrast. Changes-in-Changes and optimal-transport formulations instead construct an entire untreated counterfactual distribution. This paper adds an inferential procedure to that construction, with uncertainty from both treated observations and the estimated control-group drift.

## Contributions

- Formulates the distributional null as equality between the observed treated post-period law and the push-forward of its baseline law through the control-implied transport map.
- Uses a characteristic-kernel MMD V-statistic to test that equality without selecting particular moments or quantiles.
- Derives a weighted chi-square null limit through a second-order von Mises expansion and estimates its spectrum with an empirical covariance operator incorporating transport estimation.
- Studies local additive-shift alternatives, deriving a noncentral Gaussian quadratic-form limit and consistency for larger detectable shifts. A separate finite-sample bound decomposes sampling and transport errors.
- Illustrates the procedure with heavy-tailed, mixture, and shape-changing simulations and restaurant employment data.

## Method

### Counterfactual Construction

Let $\mu_0,\mu_1$ be control-group pre- and post-period laws, and $\mu_0^*,\mu_1^*$ the corresponding treated-group laws. For scalar outcomes, the monotone map is

$$
d=F_{\mu_1}^{-1}\circ F_{\mu_0},\qquad
\widetilde\mu_1=d_{\#}\mu_0^*.
$$

The identifying restriction is that this control-implied map also describes the treated group's untreated distributional evolution. The test targets $H_0:\mu_1^*=\widetilde\mu_1$. Section 2 observes $m$ paired control units and $n$ paired treated units, with independence between groups. Empirical control CDFs and quantiles give $\hat d$.

### Statistic and Calibration

For kernel $\kappa$ with reproducing kernel Hilbert space $\mathcal H$, define

$$
V_{n,m}^2=
\left\|\frac1n\sum_{i=1}^n
\left[\kappa(\cdot,\hat d(Y_0^{*i}))-\kappa(\cdot,Y_1^{*i})\right]
\right\|_{\mathcal H}^2,
\qquad S_{n,m}=2\frac{nm}{n+m}V_{n,m}^2.
$$

With a characteristic kernel, the population squared discrepancy is zero exactly when the two laws agree. Under the stated smoothness and density conditions, Theorem 3.5 gives

$$
S_{n,m}\Rightarrow 2\sum_{k\ge1}\lambda_k\chi_{1,k}^2.
$$

The eigenvalues come from $\mathcal C_\gamma=(1-\gamma)\mathcal C^{(F)}+\gamma\mathcal C^{(G)}$, where $\gamma=\lim n/(n+m)$. The first term captures paired treated-sample variation; the second captures the estimated transport map's influence. Section 3.4 estimates this operator using kernel derivatives and a positive density estimate for the control post-period law. A combined block Gram matrix supplies the spectrum for critical values and p-values, evaluated through a truncated chi-square mixture and Imhof inversion.

### Theoretical Scope

For the additive shifts analyzed in Section 3.5, $c_n=C/\sqrt n$ yields a noncentral Gaussian quadratic-form limit. Theorem 3.10 states consistency when $\rho_{n,m}c_n^2\to\infty$, where $\rho_{n,m}=nm/(n+m)$, and the kernel mean's directional derivative is nonzero. These local results concern the specified shift family, whereas the characteristic-kernel population discrepancy can distinguish broader distributional changes. Section 3.6 separately bounds treated-sample fluctuation and error propagated from quantile-map estimation.

## Experiments

### Simulations

Section 4 reports nominal level 0.05 and 200 Monte Carlo replications. Scenario I transports a Student-$t_3$ baseline to a lognormal law; Scenario II uses Gaussian and lognormal mixtures; Scenario III transports $N(0,1)$ to $N(3,1)$ and adds a shape-changing perturbation with population mean preservation. Alternatives use $\delta_n\operatorname{sign}(Z)$ with $\delta_n=Cn^{-r}$ and $0<r<1/2$.

Selected values reproduced from Table 1:

| Scenario | Treated sample $n$ | Distributional size | Distributional power | DiD power |
| --- | --- | --- | --- | --- |
| I | 50 | 0.0362 | 0.9975 | 0.0576 |
| II | 50 | 0.0500 | 0.7500 | 0.0495 |
| III | 50 | 0.05745 | 0.9825 | 0.0450 |
| I | 1000 | 0.0323 | 1.0000 | 0.0510 |
| II | 1000 | 0.0500 | 1.0000 | 0.0498 |
| III | 1000 | 0.0350 | 1.0000 | 0.0400 |

The DiD benchmark uses a separate simulated sample with group labels independent of outcomes, so its group-specific mean contrast is zero under both null and alternative. These results illustrate sensitivity to the constructed distributional departures, but do not establish comparative power on a common treatment-assignment design.

### Minimum-Wage Application

Section 5 describes 331 New Jersey and 79 eastern Pennsylvania fast-food restaurants surveyed before and after New Jersey's 1992 minimum-wage increase. For total restaurant employment, the reported statistic is **0.4913**, the critical value is **0.1535**, and the asymptotic p-value is **$1.7\times10^{-4}$**, with reported Monte Carlo standard error **$4.1\times10^{-5}$**. The authors interpret the observed and counterfactual distributions as having similar centers but different dispersion and tails. This rejects compatibility with the control-implied distributional drift under the identifying assumptions; it does not determine which restaurants benefited or lost employment.

## Limitations

- **Identification:** A common untreated transport map is a substantive restriction. Distributional rejection can reflect failure of that restriction as well as a treatment effect. Marginal equality also does not imply zero effects for every individual.
- **Scope and regularity:** The developed map, theory, and experiments use scalar outcomes and two periods. Calibration requires smooth kernels, differentiable transport and embedding functionals, positive control density on the relevant range, consistent nuisance estimates, and both groups growing at comparable rates. The introduction's multivariate motivation is broader than the demonstrated procedure.
- **Finite-sample assumption:** As supplied, Assumption 7 requires a density bounded below by a positive constant on all of $\mathbb R$. Such a density cannot integrate to one. The finite-sample guarantee therefore needs a clarified domain restriction before being applied literally.
- **Simulation evidence:** Null treated post-period outcomes are generated using the same estimated control map used by the test. This conditional construction is narrower than validating size with an independently fixed population drift. Several Table 1 frequencies are not multiples of $1/200$, despite the stated 200 replications; they are retained as reported, with the discrepancy unresolved.
- **Source completeness:** The supplied Markdown has corrupted mathematical notation and refers to supplementary proofs and implementation details that are not included. Its title and author block provide no publication year, venue, DOI, or identifier for this paper; the year is left unspecified.

## Related Concepts

- [[concepts/distributional-difference-in-differences|Distributional Difference-in-Differences]]
- [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]]
- [[concepts/optimal-transport|Optimal Transport]]

## Related Papers

- Athey and Imbens (2006), "Identification and inference in nonlinear difference-in-differences models." Changes-in-Changes is the univariate counterfactual-construction precedent discussed in Section 1.
- Torous, Gunsilius, and Rigollet (2024), "An optimal transport approach to estimating causal effects via nonlinear difference-in-differences." The paper builds its testing layer on this transport-based identification perspective.
- Gretton et al. (2012), "A kernel two-sample test." Supplies the RKHS discrepancy framework adapted to the estimated causal counterfactual.
- [[papers/causal-inference-with-unstructured-outcomes|Causal Inference with Unstructured Outcomes]]: A thematic library connection, rather than a citation in this paper; it learns outcome features for causal contrasts under covariate adjustment, while this paper tests a transport-based distributional counterfactual in a DiD design.

[[index|Library home]]
