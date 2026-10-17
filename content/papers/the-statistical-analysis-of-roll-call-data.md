---
title: The Statistical Analysis of Roll Call Data
type: paper
authors:
  - Joshua Clinton
  - Simon Jackman
  - Douglas Rivers
year: 2004
source_job_id: "7f48ff99-164a-42a0-a622-640a7c5863b8"
tags:
  - ideal-point-estimation
  - roll-call-analysis
  - bayesian-measurement
  - political-methodology
---

## TL;DR

Clinton, Jackman, and Rivers develop Bayesian estimation of spatial voting models that jointly represents uncertainty in legislator ideal points and bill parameters. Posterior simulation supports inference about ranks, legislative pivots, changes around party switches, and party-specific voting inducements. Congressional applications produce point estimates close to W-NOMINATE while showing how uncertainty and behavioral extensions change substantive conclusions.

## Research Question

How can roll-call analysis combine the measurement of legislative preferences with tests of legislative behavior while propagating uncertainty across the many unobserved actor and bill parameters?

## Motivation

Ideal points are estimates under a behavioral model, not model-free measures of preferences. Using positions estimated under sincere voting to test party pressure can therefore build the tested assumption into the measurement. Conventional uncertainty calculations also face a growing number of parameters and can condition on estimated bill parameters as if they were known. The paper develops a joint Bayesian framework in which measurement and substantive hypotheses are estimated together.

## Contributions

- Derives a probit spatial voting model from quadratic utilities with normally distributed utility differences, connecting roll-call scaling to [[concepts/item-response-theory|Item Response Theory]].
- Uses latent-utility augmentation and MCMC to jointly estimate ideal points and bill parameters, including actors with short records and highly lopsided votes.
- Computes posterior distributions of derived quantities such as ranks, pivot identities, pivot locations, and changes in positions.
- Extends the model to party switching and party-specific inducements, making the identifying assumptions explicit.

## Method

### Spatial Response Model

For legislator $i$ and roll call $j$, the baseline model is

$$
\Pr(y_{ij}=1)=\Phi(\boldsymbol\beta_j^\top\mathbf x_i-\alpha_j),
$$

where $\mathbf x_i$ is an ideal point, $\boldsymbol\beta_j$ is the signed discrimination vector, and $\alpha_j$ is a bill intercept in the paper's negative-intercept convention. The model assumes conditional independence across legislators and roll calls. It is a normal-ogive two-parameter response model; the paper also implements a logistic alternative.

The likelihood alone does not fix the latent coordinate system. In one dimension, fixing two distinct legislator positions identifies location, scale, and orientation. Centering positions at zero with unit variance leaves a reflection ambiguity. For $d$ dimensions, the paper describes $d(d+1)$ independent restrictions, such as fixing $d+1$ suitably positioned legislators. See [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]].

### Posterior Simulation

Introduce $y^*_{ij}=\boldsymbol\beta_j^\top\mathbf x_i-\alpha_j+\epsilon_{ij}$ with standard Normal errors and observe whether $y^*_{ij}>0$. Normal priors make the conditional updates for positions and bill coefficients Gaussian. Each iteration samples latent utilities from Normals truncated according to the observed votes, then updates bill coefficients and ideal points through Bayesian regressions. Missing votes receive untruncated latent-utility draws; this does not model the decision to abstain.

Derived quantities are computed separately for each joint posterior draw. Ranking a draw yields probabilities of occupying particular ranks; taking its relevant order statistic yields uncertainty in a pivot's location. This preserves dependence among positions instead of ranking posterior means alone. Longer chains reduce simulation error when they adequately explore the posterior; they do not remove substantive model uncertainty.

### Behavioral Extensions

For party switching, pre- and post-switch positions are centered and scaled separately. Estimated changes therefore describe movement relative to the chamber, not identified absolute ideological shifts. A common shift in preferences is observationally confounded with a shift in the agenda without further anchors.

The two-cutpoint extension uses

$$
\Pr(y_{ij}=1)=\operatorname{logit}^{-1}(x_i\beta_j-\alpha_j+\delta_jD_i),
$$

where $D_i$ marks Democratic affiliation and $\delta_j$ is the net difference in party-specific inducements. Separate inducements for both parties cannot be identified alongside the intercept. Cross-party comparisons also require votes assumed free of these effects: the application fixes $\delta_j=0$ for votes with majorities of at least 65%. Proper Normal priors regularize coefficients for perfect party-line votes. Joint estimation propagates uncertainty between inducements and ideal points.

## Experiments

The evidence consists of congressional applications and computational demonstrations, rather than a held-out prediction benchmark.

| Application | Data | Reported finding |
| --- | --- | --- |
| Baseline scaling, 106th House | 440 legislators, 1,073 nonunanimous roll calls, 444,326 observed decisions | Correctly classifies 89.9% of observed votes at a 0.5 threshold. Positions correlate 0.996 with W-NOMINATE; 1,007 roll calls discriminate on the fitted dimension. W-NOMINATE uses a smaller set of 871 roll calls. |
| Pivotal legislators, 106th Senate | 102 senators, 596 nonunanimous roll calls; replacement senators omitted from rank calculations | Collins occupies rank 50 with posterior probability 0.98. Twenty-two senators have discernible probability of being the rank-33 veto pivot. Stevens has probability 0.41 of being the rank-60 filibuster pivot. Pivot locations can be relatively precise despite uncertain identities. |
| Jeffords party switch, 107th Senate | 148 nonunanimous votes before the switch and 349 after | Jeffords moves relatively left, but does not exhibit the largest change. His probability of the largest spatial change is 0.068 versus Wellstone's 0.284; his probability of the largest rank change is 0.01 versus Daschle's 0.786. |
| Two-cutpoint model, 105th Senate | 534 nonunanimous votes; 257 constrained lopsided votes and 277 close votes | 93 close votes (33.6%) have inducement intervals excluding zero at the 95% level. Allowing inducements produces some overlap between party ideal points, unlike the complete separation under the baseline model. |

The appendix reports 500,000 MCMC iterations for the 106th Senate taking just over three hours on a 3.0 GHz Dell PC, and 150,000 iterations for the 106th House taking 6.4 hours. These are historical implementation-specific timings. Trace plots and autocorrelation summaries assess simulation behavior; the paper emphasizes checking convergence.

## Limitations

- Posterior inference is conditional on utility shape, dimensionality, priors, identification restrictions, and the voting model. Similar point estimates across methods do not establish equivalent uncertainty or substantive validity.
- Short or extreme voting records can be included, but inclusion does not guarantee precise or prior-insensitive positions. The baseline missing-vote treatment supplies no selection model for strategic abstention.
- Party-specific inducements can reflect mechanisms other than party whipping, including targeted lobbying. Their identification depends on the assumption of zero inducements for lopsided votes.
- The Jeffords comparison identifies relative changes within one Congress, during a switch that also changed Senate control. It does not isolate a general causal effect of changing parties.
- MCMC has computational and convergence costs. Additional draws improve numerical approximation only when the sampler explores the relevant posterior distribution.
- The supplied Markdown contains corrupted symbols and indices in several derivations. The summary retains the clearly stated model and algorithm rather than reproducing damaged update equations. The publication year is corroborated by existing library references; no DOI is supplied in the parsed text.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: common latent actor-item measurement framework.
- [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]]: identification of scale and coordinate orientation.
- [[concepts/hierarchical-ideal-point-estimation|Hierarchical Ideal-Point Estimation]]: related group-specific thresholds for structured voting dependence.
- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: generalizes the treatment of changing positions through temporal models.
- [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]]: extends measurement to selective participation.

## Related Papers

- Albert (1992), "Bayesian Estimation of Normal Ogive Item Response Curves Using Gibbs Sampling": cited computational foundation for latent-utility augmentation.
- Jackman (2001), "Multidimensional Analysis of Roll Call Data via Bayesian Simulation: Identification, Estimation, Inference and Model Checking": cited treatment of multidimensional Bayesian roll-call analysis.
- Snyder and Groseclose (2000), "Estimating Party Influence in Congressional Roll-Call Voting": cited two-stage approach contrasted with joint estimation of positions and inducements.
- [[papers/fast-estimation-of-ideal-points-with-massive-data|Fast Estimation of Ideal Points with Massive Data]]: later library paper that accelerates estimation of the Bayesian binary model with EM and variational extensions.
- [[papers/generalized-ideal-point-models-for-noisy-dynamic-measures-in-the-social-sciences|Generalized Ideal Point Models for Noisy Dynamic Measures in the Social Sciences]]: later library connection extending temporal modeling and informative missingness; not a citation in this paper.

[[index|Library home]]
