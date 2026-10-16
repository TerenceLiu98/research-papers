---
title: Logit unfolding choice models for binary data
type: paper
authors:
  - Rayleigh Lei
  - Abel Rodriguez
year: 2025
date: "2025-01-31"
doi: "10.1007/s11222-025-10570-5"
source_job_id: "c2fbf020-ecf7-4b93-b72d-85deaac81a80"
tags:
  - ideal-point-estimation
  - discrete-choice
  - bayesian-measurement
  - mcmc
---

## TL;DR

Lei and Rodriguez develop a logit unfolding model for binary choices with one affirmative and two opposing latent alternatives. Gumbel utility shocks allow larger deviations than Gaussian shocks, while a Gaussian-mixture approximation supports an augmented MCMC sampler that crosses disconnected parameter regions. Across four U.S. Houses, the model improves reported complexity-adjusted fit over probit unfolding and monotonic IDEAL, while producing very similar rankings to probit unfolding. Sampling remains slow, and ideal-point convergence is uneven across datasets.

## Research Question

Can a utility-based unfolding model accommodate both ends-against-the-middle voting and unusually large utility shocks, with posterior computation that explores the model's separated parameter regions?

## Motivation

Opposition to a proposal can come from legislators who regard it as either too extreme or insufficiently extreme. Monotonic vote models can consequently place ideological extremists near the center. However, occasional unusual votes need not imply a systematically nonmonotonic response: larger random shocks offer another explanation. [[concepts/discrete-choice-unfolding-models|Discrete-Choice Unfolding Models]] separate the latent alternatives underlying a binary answer, while the shock distribution controls how strongly exceptional votes affect the fitted response.

## Contributions

- Extends the earlier probit discrete-choice unfolding formulation to independent standard Gumbel utility shocks, yielding a logit response function.
- Develops Gaussian-mixture data augmentation and explicit moves between opposite-sign parameter regions, addressing failures of the tested RStan implementation.
- Compares fitted responses, ideological ranks, WAIC, and sampling diagnostics across the 103rd, 107th, 110th, and 116th U.S. Houses.
- Provides a computational basis for future hypothesis tests involving discrete latent indicators; those extensions are motivations rather than completed empirical applications.

## Method

### Binary Outcomes from Three Alternatives

For legislator position $\beta_i$, the model begins with quadratic utilities $U_{ijk}=-(\beta_i-\psi_{jk})^2+\epsilon_{ijk}$. Alternative 2 represents an affirmative vote, while alternatives 1 and 3 represent negative votes on opposite sides. Independent standard Gumbel shocks imply

$$
\Pr(y_{ij}=1)=\frac{\exp\{-(\beta_i-\psi_{j2})^2\}}{\sum_{k=1}^{3}\exp\{-(\beta_i-\psi_{jk})^2\}}.
$$

The fitted parameterization uses

$$
\Pr(y_{ij}=1)=\frac{1}{1+\exp\{-\alpha_{j1}(\beta_i-\delta_{j1})\}+\exp\{-\alpha_{j2}(\beta_i-\delta_{j2})\}},
$$

with opposite signs for the two slopes. The $\delta$ parameters approximately locate the two transition regions when well separated, and the $\alpha$ parameters control their slopes. Moving one transition beyond the observed latent range approximates a monotonic logistic response (Section 2).

The authors place priors directly on four response parameters rather than restricting them to the three-dimensional manifold implied by three policy locations. This enlarges the model while retaining sign constraints motivated by the utility construction. Standard normal priors on $\beta_i$ weakly identify location and scale; fixing one selected legislator's sign addresses reflection. Item priors mix truncated Gaussian distributions across the two admissible slope orthants. Application hyperparameters are $\vartheta=(-2,10)^\top$, $\omega^2=25$, and $\kappa^2=10$.

### Posterior Computation

The sampler approximates Gumbel shocks using a fixed mixture of six Gaussians selected by numerical KL minimization. Three augmentations introduce latent utilities, Gaussian component labels, and an indicator for the slope orthant. Most updates then use standard conditional distributions. Joint updates of slopes and the orthant indicator are supplemented by Metropolis-Hastings sign-flip and opposite-orthant prior proposals (Section 3.3). Thus, the algorithm is not exclusively Gibbs sampling, and its utility augmentation uses a finite-mixture approximation.

The constrained support prevents ordinary continuous Hamiltonian trajectories from crossing between the two orthants. Figure 2 shows the tested RStan chains remaining separated, whereas the specialized sampler crosses regions. Conditional Gaussian structure also makes integrating ideal points feasible in prospective extensions with point-mass hypotheses.

## Experiments

### Data and Comparisons

The application uses Voteview roll calls for the 103rd (1993-1994), 107th (2001-2002), 110th (2007-2008), and 116th (2019-2020) Houses. Unanimous votes and legislators missing more than 40% of nonunanimous votes are removed. Remaining missing votes are treated as missing completely at random. Comparators are the probit unfolding model (PUM) and monotonic IDEAL; BGGUM is discussed as prior work but is not a direct comparator in Table 3.

All three models retain 20,000 posterior draws. The logit unfolding model (LUM) uses 500,000 burn-in iterations and thinning every 50 iterations; PUM uses 200,000 burn-in iterations and thinning every 10, and IDEAL uses 10,000 burn-in iterations without thinning. The authors report slower mixing for LUM than PUM, and slower mixing for both than IDEAL.

### Fit and Rankings

Table 3 reports the following differences and posterior mean Spearman rank correlations:

| House | WAIC(LUM) - WAIC(IDEAL) | WAIC(LUM) - WAIC(PUM) | Rank correlation: LUM, IDEAL | Rank correlation: LUM, PUM |
| --- | ---: | ---: | ---: | ---: |
| 103rd | 2752.388 | 359.697 | 0.994 | 0.998 |
| 107th | 3866.190 | 404.722 | 0.959 | 0.993 |
| 110th | 3748.697 | 1176.145 | 0.984 | 0.996 |
| 116th | 2675.145 | 349.273 | 0.960 | 0.990 |

The paper defines WAIC on a **higher-is-better log predictive scale**, grouping likelihood contributions by legislator (Equation 10). Positive differences therefore favor LUM; these are not differences on the conventional negative-twice-log scale. They measure reported complexity-adjusted fit, not a separate held-out prediction experiment.

LUM and PUM produce closely aligned rankings. Fit differences concentrate on relatively few legislators, often centrists or extremists. In the 116th House examples, LUM avoids PUM's small dip for extreme Democrats on the strictly partisan HRES5 vote and gives a gentler decline on the ends-against-the-middle HRES6 vote. The authors interpret these patterns as consistent with larger shocks accounting for some unusual votes, rather than every such vote requiring a strong nonmonotonic response.

### Sampling Diagnostics

Median effective sample sizes for ideological ranks are approximately 1,000-1,500 from 20,000 retained draws. Aggregate diagnostics reported in Section 4.3 are favorable, but individual ideal points give a more qualified picture: virtually all have $\hat R<1.1$ in the 103rd and 116th Houses, whereas only approximately 50%-65% do in the 107th and 110th. Over 90% are below 1.2 in those latter datasets. The authors attribute slower convergence partly to weak identification of ideal-point magnitudes relative to ranks.

## Limitations

- The empirical evidence covers four U.S. Houses and a static, unidimensional binary-response model. Dynamic, multidimensional, ordinal, and cross-domain hypothesis-testing extensions remain future work.
- Improved fit and plausible placements do not independently identify true ideology or establish whether a particular dissent reflects random shocks, strategic behavior, or substantive disagreement.
- Gaussian-mixture augmentation approximates the shock distribution, introduces many auxiliary variables, and mixes slowly. Movement between orthants does not establish convergence of every parameter.
- Remaining absences are assumed missing completely at random despite possible strategic abstention. Reported prior robustness concerns alternatives inducing similar response-probability priors.
- The supplied Markdown contains malformed equations, an optimization expression inconsistent with the prose's KL minimization, and an ambiguous post-burn-in iteration count. This summary follows the explicit prose and reported retained sample sizes; supplementary derivations were not supplied.

## Related Concepts

- [[concepts/discrete-choice-unfolding-models|Discrete-Choice Unfolding Models]]: binary responses pool distinct latent alternatives on opposite sides.
- [[concepts/generalized-graded-unfolding-model|Generalized Graded Unfolding Model]]: a related proximity-response model with a different construction and estimator.
- [[concepts/item-response-theory|Item Response Theory]]: broader latent respondent-item measurement framework.
- [[concepts/multiple-ideal-points|Multiple Ideal Points]]: motivates prospective tests of equality across voting domains.

## Related Papers

- Lei and Rodriguez, "A novel class of unfolding models for binary preference data": the preceding probit formulation, cited as 2023 in the body and listed as 2025 in the references, DOI 10.1017/pan.2024.11.
- [[papers/ends-against-the-middle-measuring-latent-traits-when-opposites-respond-the-same-way-for-antithetical-reasons|Ends Against the Middle]]: introduces Bayesian GGUM to political measurement using Metropolis-coupled MCMC.
- [[papers/spatial-voting-models-in-circular-spaces-a-case-study-of-the-us-house-of-representatives|Spatial Voting Models in Circular Spaces]]: cited alternative geometry for legislative preferences.
- [[papers/multiple-ideal-points-revealed-preferences-in-different-domains|Multiple Ideal Points: Revealed Preferences in Different Domains]]: cited cross-domain preference model motivating further extensions.

Paper: [DOI](https://doi.org/10.1007/s11222-025-10570-5). Code and processed data, as cited in the paper: [logit_unfolding_model](https://github.com/rayleigh/logit_unfolding_model/).

[[index|Library home]]
