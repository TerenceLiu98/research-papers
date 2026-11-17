---
title: Bias from Network Misspecification Under Spatial Dependence
type: paper
authors:
  - Timm Betz
  - Scott J. Cook
  - Florian M. Hollenbach
year: 2021
doi: 10.1017/pan.2020.26
tags:
  - spatial-econometrics
  - measurement-error
  - omitted-variable-bias
---

## TL;DR

Under nondifferential measurement error, including a noisy spatial lag weakly reduces asymptotic bias in the own-unit predictor coefficient relative to omitting spatial dependence. Betz, Cook, and Hollenbach derive bias bounds for predictor spillovers and outcome interdependence and illustrate the comparison with SAR simulations. This is a conditional bias result, not a guarantee for arbitrary network errors or every measure of estimator performance.

## Research Question

When the network is uncertain, how much bias follows from ignoring spatial dependence, and can an imperfect weights matrix improve estimation?

## Motivation

Researchers often lack enough theory or data to specify cross-unit ties confidently. Abandoning spatial modeling also imposes a consequential restriction: it omits predictor spillovers or outcome feedback that may confound the coefficient of interest.

## Contributions

- Derives bounds for omitted spatial terms using the relationship between a variable and its spatial lag.
- Expresses bias with a noisy spatial lag as a fraction of the corresponding omission bias under nondifferential error.
- Compares nonspatial OLS and misspecified SAR maximum likelihood estimates in finite samples.

## Method

For the spatial lag of X (SLX) process,

$$y=\alpha+x\beta+Wx\theta+\epsilon,$$

omitting $Wx$ produces asymptotic bias $\theta\operatorname{cov}(Wx,x)/\operatorname{var}(x)$. For the class of weights satisfying $|\operatorname{cov}(Wx,x)/\operatorname{var}(x)|\leq1$, its magnitude is at most $|\theta|$. With $|\theta|\leq|\beta|$, the limiting estimate lies between $0$ and $2\beta$ (ordering endpoints according to the sign of $\beta$). Thus omission alone does not reverse its sign under these conditions.

If the observed spatial lag is $\widetilde W x=Wx+e$ with classical nondifferential error, the residual reliability ratio is

$$\lambda=\frac{\sigma^2_{Wx\mid x}}{\sigma^2_{Wx\mid x}+\sigma_e^2}.$$

The spatial coefficient is attenuated to $\theta\lambda$, while the own-unit coefficient's bias becomes

$$\operatorname{plim}\hat\beta_{SLX}-\beta=(1-\lambda)\theta\frac{\operatorname{cov}(Wx,x)}{\operatorname{var}(x)}.$$

Since $0\leq\lambda\leq1$, omission is the limiting case of an uninformative noisy lag.

For the SAR process $y=\alpha+x\beta+\rho Wy+\epsilon$, omission bias is $\rho\operatorname{cov}(Wy,x)/\operatorname{var}(x)$. The paper gives the upper bound $\beta\rho/(1-\rho)$ in its positive-effect setting; stronger restrictions on dependence tighten it. A just-identified IV estimator using $Wx$ to instrument $Wy$ yields an analogous $(1-\lambda)$ scaling under the stated measurement-error assumptions. Instruments constructed with the same erroneous weights inherit measurement error, so IV does not automatically remove the bias.

## Experiments

The main simulation fixes $N=150$ and $\beta=2$, generating both $x$ and $y$ through SAR processes. Each spatial parameter takes values 0, 0.3, or 0.6, with 2,000 datasets for each of nine configurations. A true 10-nearest-neighbor network is mixed elementwise with an independently generated network at error probabilities from 0 to 1 in increments of 0.05. Estimation matrices use min–max normalization.

Reported SAR maximum likelihood estimates become more biased as network error increases but weakly outperform nonspatial OLS in the displayed bias comparison. At $\rho_x=\rho_y=0.6$, the reported covariance ratio is 1.45, implying an OLS mean of $2+0.6(1.45)=2.87$, matching the simulation average. The analytical upper bound on bias is 3 in this setting.

An economic-voting illustration reports growth coefficients 0.530 without the spatial predictor and 0.577 with trade-weighted global growth. The latter's coefficient is −0.173 and the covariance ratio is 0.270. Treating that network as correct illustrates the SLX calculation and gives the conservative positive-effect lower bound $0.530/2=0.265$.

## Limitations

The dominance argument excludes differential measurement error and does not justify endogenous network ties. Bounds depend on restrictions on weights and effect magnitudes; they are not universal properties of every normalized matrix. Analytical SAR results use just-identified IV, whereas the main simulations use maximum likelihood. The supplied Markdown omits the referenced footnote details and appendix, so exact normalization qualifications and supplementary derivations cannot be recovered from this source. Numerical results above are reported findings, not a replication.

## Related Concepts

- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: dependence in predictors and outcomes determines how omitted spatial terms bias regression coefficients.

## Related Papers

- [[papers/the-wald-test-of-common-factors-in-spatial-model-specification-search-strategies|The Wald Test of Common Factors in Spatial Model Specification Search Strategies]]: complementary analysis of spatial specification uncertainty, focused on testing restrictions rather than network measurement error.
- Betz, Cook, and Hollenbach (2020), “Spatial Interdependence and Instrumental Variable Models”: cited foundation for the SAR bias derivation.
- Juhl (2020), “The Sensitivity of Spatial Regression Models to Network Misspecification”: cited work on assessing network uncertainty.

Published in *Political Analysis* 29:260–266 (2021), online November 23, 2020. [Paper DOI](https://doi.org/10.1017/pan.2020.26). Reported replication resources: [Code Ocean](https://codeocean.com/capsule/7618094/tree) and [Dataverse](https://doi.org/10.7910/DVN/ADIFOV).
