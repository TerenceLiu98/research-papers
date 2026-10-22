---
title: "Dynamic factor models for binary data in circular spaces: an application to the US Supreme Court"
type: paper
authors:
  - Rayleigh Lei
  - Abel Rodriguez
year: null
source_job_id: "6a9ef452-1f18-4155-8ac6-d7f9cdc2e029"
tags:
  - ideal-point-estimation
  - judicial-politics
  - circular-policy-spaces
  - bayesian-measurement
  - dynamic-models
---

## TL;DR

Lei and Rodriguez extend circular spatial voting models to time-varying binary data by giving each actor's angular ideal points a projected Gaussian autoregressive prior. Applied to nonunanimous U.S. Supreme Court decisions from 1937 through 2020, the circular model has better WAIC fit than the Martin-Quinn model for most terms and recovers historically meaningful coalition structures that a single Euclidean line obscures. The estimates remain sensitive to the assumption that the distribution of case positions is stable over time.

## Research Question

Can a dynamic [[concepts/circular-voting-models|Circular Voting Model]] represent evolving judicial preferences when actors at opposite ends of a conventional ideological scale sometimes vote together, while reducing to familiar linear rankings when the fitted positions occupy a semicircle?

## Motivation

Standard [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]] place judicial preferences on a Euclidean line. This geometry handles ordinary liberal-conservative divisions but can pull ideologically distinct justices toward the center when they join the same coalition for different reasons. Such end-against-the-middle votes occur in the Supreme Court, and static circular models cannot describe how the justices' positions change across terms.

## Contributions

- Develops a Bayesian dynamic factor model for binary responses on a circular latent policy space.
- Uses a projected Gaussian AR(1) process for each justice's angular trajectory, allowing a flexible and potentially bimodal stationary distribution.
- Provides MCMC computation combining elliptical slice sampling, Riemannian manifold Hamiltonian Monte Carlo, Metropolis-Hastings updates, and Gibbs sampling.
- Shows how circular positions can still support linear ideological rankings when they lie within a suitable semicircle, while identifying periods where that ordering is inadequate.
- Reinterprets Supreme Court voting in the late 1940s and late 1960s through coalition structures that align more closely with the historical account presented in the paper.

## Method

For justice $i$, case $j$, and term $t$, a vote to reverse is more likely when the justice's angular ideal point $\beta_{it}$ is closer to the case's reverse position $\psi_{jt}$ than to its affirm position $\zeta_{jt}$. With unit-circle [[concepts/geodesic-distance|Geodesic Distance]]

$$
d(a,b)=\arccos\{\cos(a-b)\},
$$

the response probability is

$$
\Pr(y_{ijt}=1)=G_{\kappa_{jt}}\!\left[d^2(\zeta_{jt},\beta_{it})-d^2(\psi_{jt},\beta_{it})\right],
$$

where $G_{\kappa_{jt}}$ is a rescaled symmetric beta CDF and $\kappa_{jt}$ controls case-specific precision. Reverse and affirm positions have independent uniform priors on the circle.

Each angular trajectory is induced by projecting two latent Gaussian AR(1) processes onto the circle with `atan2`. The shared autocorrelation $\rho$ controls temporal persistence; location and variance hyperparameters determine the stationary angular distribution and permit unimodality or bimodality. The prior is a special case of a projected Gaussian process. The authors center the prior to weakly identify rotations, map angles to $[-\pi,\pi]$, and orient posterior draws by fixing the signs of selected justices in different historical periods. Circular scale is intrinsically bounded, so there is no Euclidean rescaling invariance.

The posterior is sampled in blocks. Elliptical slice sampling updates each full latent Gaussian trajectory, circular Riemannian Hamiltonian Monte Carlo updates case positions, and Metropolis-Hastings or Gibbs steps update remaining parameters. Missing votes, including recusals, are treated as missing completely at random.

## Experiments

### Data and Comparison

The analysis uses the Martin-Quinn dataset for Supreme Court terms from 1937 through 2020. It includes nonunanimous formally decided cases and equally divided votes; a reversal is coded 1 and an affirmance 0. Across the period, 48 justices served, and participating justices voted in an average of 97.5% of nonunanimous cases apart from four who left in 1937 or 1938.

The circular model uses 40,000 retained posterior draws after 250,000 burn-in iterations and thinning by 25. The Martin-Quinn comparison also uses 40,000 retained draws after 20,000 burn-in iterations. Model fit is compared term by term with WAIC, grouping each justice's votes within a term in the criterion.

### Reported Findings

- The circular model has better WAIC fit for most terms. The principal exceptions occur during the Burger Court and the first terms of the Rehnquist Court.
- From the early 1970s onward, circular ideal points generally occupy an arc of about $\pi$ and form two clusters. Unfolding that arc produces rankings broadly aligned with Martin-Quinn scores, while still accommodating increasingly common end-against-the-middle votes in later courts.
- Before the early 1970s, positions sometimes span wider arcs or form three clusters, and circular and Martin-Quinn rankings disagree more substantially.
- For 1948-1950, the circular estimates suggest three groups: Truman appointees plus Stanley Reed; William Douglas and Hugo Black; and Felix Frankfurter and Robert Jackson. This avoids interpreting Frankfurter and Jackson as centrists merely because they sometimes joined Douglas and Black.
- For 1967-1970, the circular model indicates a marked change in Hugo Black's position between 1968 and 1969, coinciding with the transition from the Warren to Burger Court, while making William Douglas less extreme than the Martin-Quinn scores do.
- The posterior mean of the shared temporal correlation rises from a prior mean of 0.9 to 0.976. The posterior predictive ideal-point distribution is bimodal, illustrating flexibility unavailable from a single von Mises distribution.
- Alternative, more concentrated hyperpriors slightly smooth some trajectories and shift two hyperparameter posteriors downward, but do not change the main substantive conclusions reported by the authors.

## Limitations

- Case-specific positions are assumed to arise from a time-invariant distribution. Because the Court chooses its docket, apparent movement in justices' ideal points may instead reflect changes in the cases heard; the sharp decline in caseload from the mid-1990s makes this concern especially relevant.
- Recusals and other missing votes are treated as missing completely at random. The paper argues that recusals are rare, but the model does not test the assumption.
- A circle has no natural total order. Rankings obtained by unfolding are unstable near the chosen $-\pi/\pi$ cut and can be substantively inappropriate when positions cover more than a semicircle.
- Better WAIC fit does not identify why ideological opposites vote together or establish that the latent angle is ideology rather than another behavioral dimension.
- The analysis compares the circular model mainly with the one-dimensional Martin-Quinn model, not a dynamic unfolding model or a systematic set of higher-dimensional geometries.
- The supplied Markdown does not state the publication year, article DOI, volume, or page range, so those identifiers are not inferred here.

## Related Concepts

- [[concepts/circular-voting-models|Circular Voting Models]]: changes the latent geometry so opposing extremes can form a coalition without becoming centrists.
- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: connects each justice's latent positions across Court terms.
- [[concepts/item-response-theory|Item Response Theory]]: the broader binary latent-trait framework.
- [[concepts/geodesic-distance|Geodesic Distance]]: supplies the intrinsic distance used in the random-utility model.
- [[concepts/discrete-choice-unfolding-models|Discrete-Choice Unfolding Models]]: an alternative way to represent two-sided responses on a linear latent space.

## Related Papers

- [[papers/spatial-voting-models-in-circular-spaces-a-case-study-of-the-us-house-of-representatives|Spatial voting models in circular spaces: A case study of the U.S. House of Representatives]]: the static circular model that this paper extends with time-varying projected Gaussian trajectories.
- [[papers/ends-against-the-middle-measuring-latent-traits-when-opposites-respond-the-same-way-for-antithetical-reasons|Ends Against the Middle: Measuring Latent Traits when Opposites Respond the Same Way for Antithetical Reasons]]: a static unfolding alternative for responses shared by ideological opposites.
- Martin and Quinn (2002), "Dynamic Ideal Point Estimation via Markov Chain Monte Carlo for the U.S. Supreme Court, 1953-1999": the principal dynamic Euclidean comparison.
- Wang and Gelfand (2014), "Modeling Space and Space-Time Directional Data Using Projected Gaussian Processes": supplies the projected-process construction used for angular trajectories.

[[index|Library home]]
