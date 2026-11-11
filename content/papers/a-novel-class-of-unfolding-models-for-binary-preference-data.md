---
title: A Novel Class of Unfolding Models for Binary Preference Data
type: paper
authors:
  - Rayleigh Lei
  - Abel Rodríguez
year: 2024
date: "2024-09-30"
doi: "10.1017/pan.2024.11"
source_job_id: "1c022b00-48ac-4ae3-96dd-df76779c4e46"
tags:
  - ideal-point-estimation
  - bayesian-measurement
  - discrete-choice
---

## TL;DR

A random-utility unfolding model represents binary opposition as rejection from either side of a proposal. Its probit implementation improves reported complexity-adjusted fit over IDEAL in the 100th–117th U.S. Houses and over Bayesian GGUM in all but three Houses. A dynamic extension generally improves fit over Martin–Quinn scores for Supreme Court voting, with explicit exceptions.

## Research Question

Can binary preference models recover ends-against-the-middle voting through an explicit spatial utility construction, while supporting practical Bayesian estimation and preferences that evolve over time?

## Motivation

Monotonic response models can place extremists near the center when they oppose their own party alongside the opposite party. [[concepts/generalized-graded-unfolding-model|Generalized Graded Unfolding Model]] accommodates such responses, but the authors seek a clearer spatial foundation, more flexible response shapes, interpretable prior calibration, and simpler posterior computation.

## Contributions

- Constructs binary unfolding responses from three latent policy alternatives and random quadratic utilities.
- Develops a probit model with asymmetric response slopes and a data-augmented Gibbs sampler for the static specification.
- Extends the model with temporally correlated ideal points and evaluates both specifications on legislative and judicial votes.

## Method

For ideal point $\beta_i$ and three issue positions $\psi_{jk}$, utilities are $U_{ijk}=-(\beta_i-\psi_{jk})^2+\epsilon_{ijk}$. The middle alternative represents approval; the two outer alternatives represent opposition. Approval is observed only when the middle utility exceeds both others. This is the core of [[concepts/discrete-choice-unfolding-models|Discrete-Choice Unfolding Models]].

Independent standard Gaussian shocks yield a bivariate normal probability evaluated at $\alpha_{j1}(\beta_i-\delta_{j1})$ and $\alpha_{j2}(\beta_i-\delta_{j2})$, with covariance matrix $\left(\begin{smallmatrix}2&1\\1&2\end{smallmatrix}\right)$. Opposite-sign slopes permit two-sided disagreement; moving one negative alternative sufficiently far away yields a monotonic limiting response. Gumbel shocks give a logit alternative, but empirical estimation here uses probit.

Ideal points have standard normal priors. Item parameters receive a reflection-symmetric mixture of truncated Gaussian priors over the two opposite-sign slope regions. Hyperparameters are calibrated through implied vote probabilities, favoring probabilities near zero and one. Orientation is fixed by a selected legislator's sign. Three latent utility variables per observation produce Gaussian or truncated Gaussian full conditionals, avoiding proposal tuning in the static sampler (Sections 2.1–2.3).

The dynamic extension assigns each actor's ideal-point trajectory a zero-mean Gaussian prior with covariance $\operatorname{Cov}(\beta_{it},\beta_{is})=\rho^{|t-s|}$. It borrows information across time while preserving standard normal marginals. Unlike the static algorithm, estimation of $\rho$ uses a tuned Metropolis–Hastings step on its logit transform (Section 4).

## Experiments

**House, 1987–2022:** The analysis covers the 100th–117th Houses, excludes unanimous votes and legislators absent for more than 40% of votes, and treats remaining missingness as completely at random. Comparators are IDEAL and Bayesian GGUM. The probit model retains 20,000 draws after 200,000 burn-in iterations and thinning another 200,000 iterations by ten.

Blocked WAIC, on the conventional lower-is-better scale, favors probit unfolding over IDEAL throughout and over BGGUM except in the 110th, 111th, and 112th Houses, where BGGUM's advantage is small. About 64% of votes in the 107th House favor probit unfolding over BGGUM by vote-specific WAIC; two prominent exceptions are Approval of the Journal votes. The unfolding models place the Squad toward the liberal extreme in the 116th House, whereas IDEAL places them nearer the center. The authors interpret selected placements using public political records, rather than independently measured ideological ground truth (Section 3).

**Supreme Court:** Section 5 specifies 1937–2021, although the introduction says 1935–2021. The dynamic model retains 40,000 draws after 500,000 burn-in iterations and thinning 400,000 further iterations by ten. WAIC generally favors dynamic unfolding over Martin–Quinn, except in 1965, 1967, and 1975–1979. Rankings largely agree in recent decades, but differ substantially during 1949–1952 and 1967–1970. For 1949–1950, unfolding places Frankfurter and Jackson as the two most conservative justices; the authors argue this better matches historical interpretations.

## Limitations

- Applications assume one latent dimension and binary outcomes; higher-dimensional and ordinal extensions remain future work.
- Better WAIC and historically plausible rankings do not establish true ideology or motives for particular votes. Both unfolding models can confuse centrists and extremists.
- Missing-at-random assumptions exclude potentially strategic abstention. Prior sensitivity analyses are referenced in supplementary material, which is not included in the supplied Markdown.
- Dynamic estimation still requires proposal tuning, and long MCMC runs are used. Reported comparisons concern complexity-adjusted fit rather than a separate held-out prediction test.
- The parsed text contains malformed equations and inconsistent dates. Metadata uses its explicit online publication date; the existing logit-paper entry reports a later reference-list year of 2025.

## Related Concepts

- [[concepts/discrete-choice-unfolding-models|Discrete-Choice Unfolding Models]]
- [[concepts/generalized-graded-unfolding-model|Generalized Graded Unfolding Model]]
- [[concepts/dynamic-ideal-point-models|Dynamic Ideal-Point Models]]

## Related Papers

- [[papers/ends-against-the-middle-measuring-latent-traits-when-opposites-respond-the-same-way-for-antithetical-reasons|Ends Against the Middle]]: Bayesian GGUM comparator.
- [[papers/logit-unfolding-choice-models-for-binary-data|Logit unfolding choice models for binary data]]: the library's subsequent treatment of the Gumbel-shock formulation.

Source: [paper DOI](https://doi.org/10.1017/pan.2024.11). Replication data and code: [Dataverse](https://doi.org/10.7910/DVN/SVBF5T).

[[index|Library home]]
