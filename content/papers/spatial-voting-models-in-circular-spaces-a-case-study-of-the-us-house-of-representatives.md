---
title: "Spatial voting models in circular spaces: A case study of the U.S. House of Representatives"
type: paper
authors:
  - Xingchen Yu
  - Abel Rodriguez
year: null
source_job_id: "f9c8956f-b9da-4896-8f01-f7c3b344dce4"
last_processed_job_id: "2fa730d2-07e3-4c87-b746-28da2c92d1ef"
tags:
  - ideal-point-estimation
  - legislative-behavior
  - bayesian-measurement
  - circular-policy-spaces
---

## TL;DR

A Bayesian spatial voting model places legislators and vote outcomes on a circle, allowing ideological extremes to vote together without placing them near the political center. In the 100th-116th U.S. Houses, grouped WAIC favors the circular model over a one-dimensional Euclidean model consistently from the 112th House onward. The circular model also places the Squad and several conservative insurgents closer to the ideological extremes, in better agreement with the authors' substantive assessments.

## Research Question

Can a circular policy space explain coalitions between ideological opposites while retaining interpretable legislator rankings and approximating conventional linear scaling when the data support it?

## Motivation

Under conventional squared Euclidean utility, cross-party voting can pull party rebels toward the center. Adding a second Euclidean dimension leaves the Squad relatively moderate on the leading axis in the paper's motivating example. Clustering can identify voting blocs but cannot rank legislators within a bloc. [[concepts/circular-voting-models|Circular Voting Models]] offer a different geometry for the same scaling problem (Sections 1-2).

## Contributions

- Defines a binary voting likelihood from squared geodesic utilities on the unit circle, with a bounded-support link and vote-specific precision.
- Develops Bayesian priors, identification conventions, posterior ranking, and a hybrid sampler using geodesic Hamiltonian Monte Carlo.
- Connects concentrated circular configurations to a one-dimensional Euclidean probit model and proposes circular variance as a chamber-level summary.
- Examines individual rankings, historical chamber patterns, prior sensitivity, and two simulated data-generating geometries.

## Method

Let $\beta_i$ be legislator $i$'s ideal angle and $\psi_j,\zeta_j$ the Yea and Nay angles for vote $j$. Using [[concepts/geodesic-distance|Geodesic Distance]] on the unit circle,

$$
\rho(a,b)=\arccos\{\cos(a-b)\},\qquad
e_{ij}=\rho(\zeta_j,\beta_i)^2-\rho(\psi_j,\beta_i)^2,
$$

$$
\Pr(y_{ij}=1\mid\beta_i,\psi_j,\zeta_j,\kappa_j)=G_{\kappa_j}(e_{ij}).
$$

Here $G_{\kappa_j}$ is the CDF of a symmetric Beta$(\kappa_j,\kappa_j)$ distribution rescaled to $[-\pi^2,\pi^2]$. Larger $\kappa_j$ means smaller utility-shock variance, $\pi^4/(2\kappa_j+1)$. Votes are conditionally independent. Different bill positions can generate partisan splits or coalitions of extremes with the same legislator positions (Sections 4-4.1).

Legislator angles have a zero-centered von Mises prior with learned concentration; bill positions have uniform circular priors. The centered prior weakly fixes location, angles are mapped to a single period, and one legislator's sign fixes reflection. Unlike Euclidean scaling, the circular likelihood is not invariant to rescaling. With suitable joint concentration of positions and the link, the model approximates a Euclidean probit model on the tangent space (Sections 4.2-4.4).

Rankings unwind the circle onto $(-\pi,\pi]$. This agrees with tangent-space ordering when positions lie in the upper semicircle, but ranks near the cut can be unstable. Circular variance summarizes the dispersion of fitted positions:

$$
\chi_0=1-\sqrt{\left(I^{-1}\sum_i\cos\beta_i\right)^2+
\left(I^{-1}\sum_i\sin\beta_i\right)^2}.
$$

Small values indicate approximately linear configurations. The authors compare this summary across Houses and within parties; it is distinct from selecting [[concepts/ideological-dimensionality|Ideological Dimensionality]].

Inference combines Gibbs updates, log-scale random-walk Metropolis-Hastings, and geodesic Hamiltonian Monte Carlo for angular positions. Empirical summaries use 20,000 post-convergence draws after burn-in periods of 20,000-80,000 iterations (Section 5-6).

## Experiments

### Data and Comparisons

Voteview roll calls cover the 100th House (1987-1988) through the first session of the 116th (2019). Legislators absent for more than 40% of votes are excluded; remaining missing votes are treated as missing completely at random. The 112th dataset has 428 legislators and 1,602 votes; the 116th has 432 legislators and 700 votes. Historical comparisons use grouped WAIC, treating each legislator's complete vote vector as one observation. These are model-fit comparisons rather than a held-out prediction experiment (Section 6, Table 4).

### Reported Findings

Tables 1-2 give the following posterior median ranks and 95% credible intervals for the Squad in the first session of the 116th House. Lower ranks mean more liberal positions.

| Legislator | Euclidean 1D | Euclidean 2D, first axis | Circular |
| --- | --- | --- | --- |
| Pressley | 172 (131, 196) | 168 (113, 200) | 5 (1, 21) |
| Omar | 176 (135, 198) | 160 (98, 195) | 2 (1, 8) |
| Tlaib | 180 (146, 200) | 169 (108, 200) | 2 (1, 9) |
| Ocasio-Cortez | 203 (185, 215) | 197 (172, 213) | 3 (1, 11) |

The 2D comparison ranks legislators along the highest-variability axis, rather than imposing a total order on the entire plane. Table 3 also reports conservative shifts for Amash (249 to 432), Massie (356 to 431), and Gaetz (314 to 418) under circular versus 1D Euclidean scaling. These are posterior median ranks among 432 legislators, with higher ranks indicating more conservative positions.

In the 112th House, Kucinich moves from median rank 76 to 2. Among the 15 Republicans with the largest rank changes, 12 belonged to the Tea Party or Liberty caucuses or later joined the Freedom Caucus. The circular model places all 15 farther toward the conservative extreme (Section 6.2).

The one-dimensional Euclidean model is preferred in most Houses before the 112th, with exceptions in the 107th and 109th. The circular model is preferred in each of the 112th-116th Houses. Table 4 reports scores of -33,131 versus -31,403 for the Euclidean and circular models in the 116th. The paper calls these grouped WAIC and interprets the larger, less negative values as preferable; these numbers should not be read using the usual lower-is-better deviance-scale WAIC convention.

Estimated chamber circular variance rises notably from the 112th House onward. Within-party variance generally decreases for Democrats and increases for Republicans, particularly after the 112th. The authors associate this divergence with party consolidation and conservative insurgency; the analysis does not identify their causal effects (Figures 9-10).

### Supplementary Results Retained from the Earlier Ingest

The following details were recorded by the earlier ingest identified in `source_job_id`. The Markdown supplied for the current job refers readers to Supplementary Material A but does not contain these supplementary analyses, so their numerical results were not revalidated in this update.

Appendix B.3 simulates 100 legislators and 700 votes under each of two geometries. For data generated by a 2D Euclidean model, the reported scores for fitted 1D Euclidean, circular, and 2D Euclidean models are -34,610, -34,733, and -27,161. For circular data, they are -29,400, -15,958, and -17,331. Thus the reported criterion selects the generating geometry in both examples, including against a more flexible 2D Euclidean alternative.

Three alternative prior settings yield nearly unchanged rankings in the 112th and 116th Houses. Two-chain log-likelihood diagnostics report potential scale reduction factors of 1.006 and 1.012 respectively; 75% of rank effective sample sizes exceed 1,200 and 2,000 (Appendix B).

## Limitations

- Better fit and more plausible selected rankings do not uniquely establish horseshoe theory. Heavy-tailed shocks and non-monotonic utilities are acknowledged alternative explanations that are not resolved by this comparison.
- The historical model comparison is against 1D Euclidean scaling; the 2D comparisons concern the motivating rankings and simulations, not a full historical benchmark.
- Ranking depends on where the circle is cut. Positions near $-\pi$ or $\pi$ can produce sensitive or misleading ranks.
- Missing-at-random treatment does not model strategic abstention. The model also does not track individual preference evolution within or across Houses.
- The circular model can assign more extreme ranks to legislators not generally regarded as ideological firebrands, illustrated by John Campbell. Its positions summarize voting behavior under the specified geometry.
- The supplied Markdown contains damaged mathematical notation and no explicit publication year, venue, or main-article identifier. It does identify Supplementary Material A as `10.1214/21-AOAS1454SUPPA` and the code/data supplement as `10.1214/21-AOAS1454SUPPB`; neither is used as the main article's DOI. The year is left unknown; the empirical period follows Section 6 and Table 4 rather than the abstract's 1988 starting date.

## Related Concepts

- [[concepts/circular-voting-models|Circular Voting Models]]: circular utilities, identification, and rankings.
- [[concepts/geodesic-distance|Geodesic Distance]]: the intrinsic metric underlying policy utility.
- [[concepts/item-response-theory|Item Response Theory]]: the latent binary-response framework shared with conventional ideal-point models.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: separates latent dimension from the choice of geometry.

## Related Papers

- [[papers/multiple-ideal-points-revealed-preferences-in-different-domains|Multiple Ideal Points: Revealed Preferences in Different Domains]]: cited work on domain-specific preferences; the present paper instead changes policy-space geometry.
- Clinton, Jackman, and Rivers (2004), "The statistical analysis of roll call data": the cited Bayesian Euclidean scaling framework.
- [[papers/identifying-intraparty-voting-blocs-in-the-uk-house-of-commons|Identifying Intraparty Voting Blocs in the U.K. House of Commons]] (Spirling and Quinn, 2010): the cited clustering alternative, which does not order legislators within blocs.
- Duck-Mayr and Montgomery (2020), "Ends against the middle: Scaling votes when ideological opposites behave the same for antithetical reasons": cited alternative based on non-monotonic utilities.

[[index|Library home]]
