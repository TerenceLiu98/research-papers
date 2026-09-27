---
title: Heteroskedastic Ideal Point Estimation
type: concept
aliases:
  - Heteroskedastic Spatial Voting Models
  - Legislator-Specific Voting Error
tags:
  - ideal-point-estimation
  - legislative-behavior
  - bayesian-measurement
---

## Overview

Heteroskedastic ideal point estimation allows political actors to differ in how predictably they vote given their positions on common latent dimensions. A legislator receives both an ideal point and a latent error scale. This separates location on the modeled axes from responsiveness to them: deviations from a party's voting pattern can arise from unusual concerns rather than a moderate position.

## Key Ideas

- **Position and responsiveness:** In Lauderdale's probit specification, $\Pr(y_{ij}=1)=\Phi((\boldsymbol\beta_j^\top\mathbf{x}_i-\alpha_j)/\sigma_i)$. The position $\mathbf{x}_i$ describes where actor $i$ lies; the positive standard deviation $\sigma_i$ describes how weakly that location predicts responses. At a fixed spatial predictor, larger $\sigma_i$ moves the probability toward one-half.
- **Relative scale:** Lauderdale normalizes $n^{-1}\sum_i\sigma_i^{-1}=1$. This fixes mean inverse standard deviation, not mean variance or mean standard deviation. Comparisons depend on the actors, period, and dimensions included in the fit; the scale is not an absolute measure of independence.
- **Weighted inference:** The Gibbs sampler gives a legislator's latent responses weight $1/\sigma_i^2$ in estimating bill parameters. Unpredictable legislators also provide weaker evidence about their own spatial positions. A flexible error scale can change both rank estimates and their uncertainty.
- **Idiosyncrasy versus omitted structure:** Constituency concerns affecting a few actors or votes may remain in the error term. If many high-error actors share a substantive characteristic, an omitted common dimension becomes plausible. Adding dimensions is informative when they describe recurring shared variation, not merely because fit improves.
- **Temporal misspecification:** A constant ideal point can average across a genuine political shift and produce a large error scale. Such a scale is a reason to investigate temporal change, not an estimate of when that change occurred.
- **Evidence requirements:** Recovering individual error-scale rankings is harder than recovering position rankings. Lauderdale's simulations favor hundreds of votes for useful scale comparisons and caution against short surveys; uncertainty must accompany individual comparisons.
- **Interpretation ceiling:** High error does not identify irrationality, strategic independence, or a particular motivation. It describes residual unpredictability under a chosen model. A media reputation for being a maverick is a possible external comparison, not the definition of the parameter.

## Important Papers

- [[papers/unpredictable-voters-in-ideal-point-estimation|Unpredictable Voters in Ideal Point Estimation]]: Lauderdale (2010) develops Bayesian estimation and substantive interpretation, compares recovery in simulations, and demonstrates congressional, European Parliament, and UN General Assembly applications.
- Poole (2001), "The geometry of multidimensional quadratic utility in models of parliamentary roll call voting": identified by Lauderdale as a predecessor that estimates legislator-specific variances by conditional maximum likelihood.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: provides the broader respondent-item measurement framework; respondent-specific error scales complement item discrimination.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: common residual patterns can motivate additional axes, but error scales alone do not identify their number.
- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: explicitly represents position changes that static heteroskedastic models can absorb as unexplained variation.
- [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]]: models systematic issue-associated deviations using bill content, offering a different account of departures from general positions.
- [[concepts/nonparametric-ideal-point-inference|Nonparametric Ideal-Point Inference]]: Tahk's ordinal approach relaxes parametric functional forms while retaining errors identically distributed across voters within each bill, a restriction relaxed by legislator-specific scales.
