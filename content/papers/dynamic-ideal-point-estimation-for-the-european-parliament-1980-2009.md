---
title: Dynamic Ideal Point Estimation for the European Parliament, 1980-2009
type: paper
authors:
  - James Lo
year: 2018
source_job_id: "c9f3fa0b-910d-4046-ae2a-a83eb2587bdf"
tags:
  - ideal-point-estimation
  - european-parliament
  - roll-call-analysis
  - variational-inference
---

## TL;DR

Lo estimates comparable six-monthly ideal points for 2,710 Members of the European Parliament across 1980-2009 using a dynamic probit item-response model and variational EM. The estimates closely track static W-NOMINATE scores within individual parliaments while revealing heterogeneous movement over time, changing party-group dispersion, and voting shifts associated with party-group changes. These patterns support longitudinal analysis but do not by themselves identify party-group effects.

## Research Question

Can a scalable [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Model]] produce ideologically comparable positions across the first six directly elected European Parliaments, and what do those trajectories show about individual movement, European Party Group influence, and group cohesion?

## Motivation

Static W-NOMINATE estimates had established a largely left-right voting structure in the European Parliament, but scores fitted separately by parliament do not support direct comparisons over time. This limits analysis of whether individual MEPs move, whether changes in European Party Group membership coincide with voting changes, and whether party-group ideological heterogeneity evolves within and across parliamentary terms. Standard MCMC estimation of dynamic models was also impractical at the scale of the full EP roll-call record.

## Contributions

- Produces 35,693 ideal-point estimates for 2,710 MEPs in 59 six-month periods from 1980 through 2009.
- Applies the structured variational approximation of Imai, Lo, and Olmsted to a random-walk dynamic IRT model, reducing estimation from an otherwise prohibitive MCMC task to minutes.
- Validates cross-sectional estimates against published W-NOMINATE scores and uses the common temporal scale to revisit claims about position stability and party-group convergence.
- Demonstrates longitudinal applications involving individual trajectories, the 1989 Green/Rainbow Group split, and within-group ideological heterogeneity.
- Makes the estimates and, according to the paper, the code needed to re-estimate tailored dynamic models available upon publication.

## Method

### Dynamic Response Model

For MEP $i$, roll call $j$, and period $t$, the one-dimensional probit model is

$$
\Pr(y_{ijt}=1)=\Phi(\alpha_{jt}+\beta_{jt}x_{it}),
$$

where $x_{it}$ is the MEP's ideal point and $\alpha_{jt}$ and $\beta_{jt}$ are roll-call intercept and discrimination parameters. The model is an [[concepts/item-response-theory|Item Response Theory]] representation of spatial voting under quadratic deterministic utility and Normal errors.

Each MEP's position follows a Gaussian random walk,

$$
x_{it}\mid x_{i,t-1}\sim N(x_{i,t-1},\omega_x^2),
$$

with innovation variance fixed at 0.01. The temporal prior smooths trajectories, so estimates in a period depend on both that period's votes and adjacent positions. This differs from DW-NOMINATE's legislator-specific linear movement constraint.

The initial-position priors orient the scale using European Party Group membership: means are 1.5 for EPP and UEN, 1.0 for ALDE, -1.5 for Greens and GUE-NGL, and 0 for other MEPs, including PES; all initial-position prior variances are 1. Roll-call coefficients receive diffuse, uncorrelated bivariate Normal priors with variance 25. These restrictions fix polarity and can influence trajectories, especially where data are sparse.

### Estimation and Uncertainty

The paper uses the variational EM algorithm developed in [[papers/fast-estimation-of-ideal-points-with-massive-data|Fast Estimation of Ideal Points with Massive Data]] instead of MCMC. The structured approximation preserves dependence across each MEP's trajectory while making large-scale estimation practical. Standard errors come from 100 parametric-bootstrap replications; the median standard error across estimated ideal points is 0.058.

The data combine 21,438 roll calls from the first six European Parliaments and 2,710 unique MEPs. Positions are estimated every six months. The second half of 1979 is excluded because it contains only ten recorded roll calls, leaving 59 periods from 1980 through 2009.

## Experiments

### Measurement Checks

The fitted one-dimensional model correctly classifies 88.7% of votes and has an Aggregate Proportional Reduction in Error of 0.342. Estimated positions range from -2.47 to 2.81. MEPs receive an average of 13.2 estimates, although about 1,800 have fewer than ten.

Average dynamic positions within each parliament correlate strongly with first-dimension W-NOMINATE estimates:

| European Parliament | Pearson correlation |
| --- | ---: |
| First | 0.951 |
| Second | 0.974 |
| Third | 0.965 |
| Fourth | 0.960 |
| Fifth | 0.983 |

The broad party-group ordering is similar across methods, but several neighboring groups reverse order. The paper attributes these discrepancies to temporal smoothing and advises against strong cross-sectional conclusions where the models disagree.

### Longitudinal Applications

- **MEP movement:** Several of the nine longest-serving MEPs have stable trajectories, while others move substantially, sometimes alongside party-group changes and sometimes without them. Across all MEPs, the median within-career standard deviation is 0.09, with a strongly skewed distribution reaching 0.8.
- **Party-group convergence:** The mean ALDE-EPP distance falls from 1.06 in the fifth Parliament to 0.91 in the sixth, supporting an earlier qualitative claim based on static maps. The corresponding gap was only 0.40 in the second Parliament, showing the value of the longer common scale.
- **Green/Rainbow split:** Six continuing MEPs who left the Rainbow Group to found the Green group in 1989 subsequently track the Greens rather than the remaining Rainbow Group. Holding their identities and national parties fixed makes this pattern consistent with an EPG influence, but the design is an informal difference-in-differences comparison rather than a complete causal analysis.
- **Ideological heterogeneity:** The standard deviation of member ideal points varies substantially both across and within party-group terms. In 23 of 34 group-terms, dispersion is greater in the first six months than over the remainder of the term; under a binomial null with probability 0.5, the paper reports $p=0.012$.

## Limitations

- The model is one-dimensional even though prior EP research finds a second voting dimension. Its 88.7% classification rate does not show that omitted dimensions are substantively unimportant.
- Random-walk smoothing, a fixed innovation variance, initial party-group priors, and the six-month time grid shape the estimated amount and timing of movement. Cross-sectional differences from W-NOMINATE illustrate this model dependence.
- Agreement with static estimates is convergent evidence, not independent validation that the common scale measures stable ideological meaning across three decades.
- The Green/Rainbow comparison has six selected continuing MEPs and no formal parallel-trends or alternative-explanation analysis. It provides suggestive evidence of group influence rather than an identified causal effect.
- Group dispersion is calculated from estimated positions. Changes may reflect composition, vote availability, measurement precision, or model smoothing as well as substantive cohesion.
- Missing votes are not modeled as an informative selection process, and uncertainty is based on a parametric bootstrap under the fitted response model.

## Related Concepts

- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: combines a response model with temporal dependence to estimate comparable latent trajectories.
- [[concepts/item-response-theory|Item Response Theory]]: supplies the probit actor-item measurement model.
- [[concepts/political-polarization|Political Polarization]]: a principal application of ideologically comparable positions over time.
- [[concepts/conditional-party-government|Conditional Party Government]]: motivates the paper's discussion of party heterogeneity and agenda control.

## Related Papers

- [[papers/fast-estimation-of-ideal-points-with-massive-data|Fast Estimation of Ideal Points with Massive Data]]: provides the variational algorithm used for the dynamic estimates.
- [[papers/the-statistical-analysis-of-roll-call-data|The Statistical Analysis of Roll Call Data]]: develops the Bayesian ideal-point response model underlying the measurement strategy.
- Martin and Quinn (2002), "Dynamic Ideal Point Estimation via Markov Chain Monte Carlo for the U.S. Supreme Court, 1953-1999": the cited random-walk dynamic model that this paper estimates variationally.
- [[papers/power-to-the-parties-cohesion-and-competition-in-the-european-parliament-1979-2001|Power to the Parties: Cohesion and Competition in the European Parliament, 1979-2001]]: cited EP research on party-group cohesion and influence.
- [[papers/generalized-ideal-point-models-for-noisy-dynamic-measures-in-the-social-sciences|Generalized Ideal Point Models for Noisy Dynamic Measures in the Social Sciences]]: a later library comparison that adds flexible temporal structures and informative-missingness modeling; it is not cited by this 2018 paper.

[[index|Library home]]
