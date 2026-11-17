---
title: "Measurement Uncertainty in Spatial Models: A Bayesian Dynamic Measurement Model"
type: paper
authors:
  - Sebastian Juhl
year: 2019
doi: 10.1017/pan.2018.35
tags:
  - political-methodology
  - spatial-econometrics
  - ideal-point-estimation
  - measurement-uncertainty
---

## TL;DR

Jointly estimating dynamic party positions and spatial dependencies propagates uncertainty from roll-call measurement into models of party competition. In German state legislatures, the model finds moderate dependence among ideological family members but no support for positive responses to ideological neighbors. Treating estimated positions as observed understates uncertainty and the family-dependence coefficient in this application.

## Research Question

How does uncertainty in latent party positions change inferences about temporal and spatial dependencies in multiparty competition?

## Motivation

Estimated positions enter spatial regressions both as outcomes and as temporal and spatial lags. Their uncertainty also affects distances and the identity of ideological neighbors. Plugging in point estimates therefore discards uncertainty in several components of the model. Legislative votes provide a setting for testing party competition beyond election manifestos, but government–opposition incentives must be separated from ideology.

## Contributions

- Combines a dynamic item response measurement model with a theoretically specified spatio-temporal evolution equation.
- Incorporates tactical voting incentives associated with government status and proposal origin.
- Compares joint estimation against separate measurement and spatial regression, showing substantive consequences of ignoring latent-position uncertainty.

## Method

The observation model is a two-parameter probit IRT model, augmented by interactions between whether a proposal originates in government or opposition and whether the voting party belongs to government or opposition. These terms distinguish institutional incentives from ideological proximity.

The latent position vector has a Gaussian transition with mean

$$
\mu_t=\gamma+\varphi\theta_{t-1}+\rho_1 W^N_{t-1}\theta_{t-1}+\rho_2 W^F_{t-1}\theta_{t-1}.
$$

The two matrices connect ideological neighbors and members of the same ideological family. Nonzero weights depend on proximity in the latent space; binary, linear, and quadratic weighting specifications are considered. Matrices are not row-standardized. Spatial signals are temporally lagged to allow delayed responses. Joint posterior estimation carries position uncertainty into these signals and the spatial coefficients.

Initial-period normalization sets the latent scale; a tighter prior on the Socialist party's initial position fixes orientation. Priors for measurement parameters use static-model estimates. A common evolution variance controls temporal smoothing and supports prediction for periods without votes. MCMC uses three chains, 30,000 adaptation/burn-in iterations, and 100,000 sampling iterations per chain, thinned every fifth draw. Reported potential scale reduction factors differ from one by at most 0.001.

## Experiments

**Data and comparison.** The application covers sixteen German state legislatures during 1988–2016: six parties, 7,799 party votes, and 2,254 roll calls. Neighbor-only, family-only, and combined evolution specifications are compared with two-stage models that treat separately estimated positions as fixed.

**Ideological mobility.** The baseline dynamic model estimates evolution variance at 0.365, with a 95% highest posterior density interval of [0.202, 0.601]. Position uncertainty varies across parties and years. Government and opposition tactical-incentive parameters increase relative to the static model.

**Spatial dependence.** In the combined specification, the posterior probability of a negative neighbor coefficient is 83.53% under joint estimation versus 77.09% under the no-error comparison. The negative pattern disappears in the neighbor-only model; the hypothesized positive neighbor response is unsupported. For family dependence, the probability of a positive coefficient increases from approximately 91.7% to 97.76%, and the reported coefficient mean increases from 0.011 to 0.043. Joint-model posteriors are more dispersed.

**Substantive interpretation.** A five-party counterfactual illustrates that a common spatial coefficient produces heterogeneous responses according to party distances and family membership. Coefficients alone are not effect sizes. The paper characterizes the family effects as moderate.

## Limitations

The application concerns legislative behavior in German states; it does not establish that electoral competition follows the same dynamics. Results depend on a unidimensional policy space, the transition specification, shared evolution variance, institutional controls, and the chosen connectivity functions. Joint estimation addresses measurement uncertainty but does not by itself establish causal strategic influence. Measurement error need not always attenuate coefficients; its direction cannot generally be known in advance.

The supplied Markdown contains inconsistent family-coefficient HPD intervals and damaged signs in the counterfactual description. Those intervals and the exact counterfactual displacement are not reproduced here. The point estimates and posterior sign probabilities above follow Section 5.2. Publication metadata identifies the journal issue as 2019, with online publication on 9 November 2018.

## Related Concepts

- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: adds spatially coupled evolution to latent political trajectories.
- [[concepts/dynamic-item-response-models|Dynamic Item Response Models]]: combines response measurement and a transition process for changing latent traits.

## Related Papers

- [[papers/parameterizing-spatial-weight-matrices-in-spatial-econometric-models|Parameterizing Spatial Weight Matrices in Spatial Econometric Models]]: a methodological comparison concerning uncertainty in spatial weights; it estimates distance-decay parameters rather than latent ideological positions.
- Martin and Quinn (2002), *Dynamic Ideal Point Estimation via Markov Chain Monte Carlo for the U.S. Supreme Court, 1953–1999*: dynamic IRT predecessor.
- Bräuninger, Müller, and Stecker (2016), *Modeling Preferences Using Roll Call Votes in Parliamentary Systems*: supplies the institutional voting model and original application data.
