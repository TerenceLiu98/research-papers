---
title: Modeling of Political Systems using Wasserstein Gradient Flows
type: paper
authors:
  - Nicolas Lanzetti
  - Joudi Hajar
  - Florian Doerfler
year: 2022
tags:
  - political-polarization
  - spatial-electoral-competition
  - optimal-transport
  - dynamical-systems
---

## TL;DR

Representing parties as ideological distributions makes party separation and internal homogeneity endogenous outcomes of electoral competition. Parties ascend expected vote counts through Wasserstein gradient flows; under a local support condition, their distributions converge to point masses that can occupy opposing positions despite a fixed centrist electorate. A fit to U.S. congressional ideology from 1861-2015 captures broad trends but misses historical oscillations.

## Research Question

Can vote-seeking competition explain the joint evolution of between-party polarization and within-party ideological dispersion, rather than only changes in average party positions?

## Motivation

The point-position model of [[papers/why-are-us-parties-so-polarized-a-satisficing-dynamical-model|Yang et al.]] explains separation through voter satisficing, but does not evolve a distribution of candidates within each party. This paper combines [[concepts/satisficing-spatial-competition|Satisficing Spatial Competition]] with [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]] to represent heterogeneous parties and explain changes in their internal breadth.

## Contributions

- Defines expected party support by integrating the two-candidate satisficing model over both parties' ideological distributions.
- Derives explicit transport velocity fields for coupled vote-maximizing dynamics.
- Identifies Dirac equilibria and proves convergence from distributions supported sufficiently close to them, assuming a sufficiently regular solution exists.
- Demonstrates polarization and homogenization in particle simulations and fits distributional trajectories to congressional data.

## Method

The electorate is a fixed zero-mean Gaussian distribution with standard deviation $\sigma_0$. A voter at $x$ accepts a candidate at $y_i$ with probability $s_i=\exp[-(x-y_i)^2/(2\sigma^2)]$, with equal tolerance $\sigma$ for both parties. Independent acceptance and equal splitting when both candidates are acceptable give

$$
p_i(x\mid y_i,y_j)=s_i(1-s_j)+\tfrac12s_is_j,
\qquad
\widetilde V_i(y_i,y_j)=\int p_i(x\mid y_i,y_j)\,d\rho(x).
$$

Party $i$ is a probability measure $\mu_i\in\mathcal P_2(\mathbb R)$, representing shares of candidates rather than absolute party size. Its objective is expected support among all potential voters:

$$
V_i(\mu_i,\mu_j)=\iint\widetilde V_i(y_i,y_j)\,d\mu_i(y_i)\,d\mu_j(y_j).
$$

This vote-count objective differs from the share of votes actually cast. Lemma 2 gives the transport field, yielding the continuity equation

$$
v_i(y_i)=k\int\partial_{y_i}\widetilde V_i(y_i,y_j)\,d\mu_j(y_j),
\qquad
\partial_t\mu_i+\partial_y(v_i\mu_i)=0.
$$

Each party follows gradient ascent in Wasserstein geometry, with speed $k>0$. Explicit Euler updates transport particles by $y\leftarrow y+\tau v_i(y)$ (Equation 8).

For $\sigma/\sigma_0<\sigma_c\approx0.807$, the model admits the central Dirac pair and two label-swapped polarized pairs $(\delta_{y^*},\delta_{-y^*})$. Their locations inherit the point-model formula (Equation 5):

$$
(y^*)^2=\sigma^2\frac{\sigma^2+\sigma_0^2}{\sigma^2+2\sigma_0^2}
\log\left[\frac{(\sigma^2+\sigma_0^2)^3}{4\sigma^4(\sigma^2+2\sigma_0^2)}\right].
$$

Theorem 4 establishes convergence to these point masses when initial supports lie in sufficiently small intervals around their respective locations. The paper states a corresponding central-convergence result when the tolerance condition fails. The appendix uses invariant supports and decay of summed squared Wasserstein distances. These results do not characterize every possible distributional equilibrium.

## Experiments

| Setting | Setup | Reported result |
| --- | --- | --- |
| Two-party simulation | 300 particles per distribution; $\sigma_0=0.93$, $k=0.5$, $\sigma=0.6$; truncated Gaussian initial parties | Parties narrow toward separated point masses; interparty Wasserstein distance tends to 0.67; 27% abstain at equilibrium (Section IV-A, Figures 3-4) |
| Congressional fit | Combined Democratic and Republican House/Senate ideology scores, 1861-2015; minimize squared Wasserstein trajectory errors | Fitted $k=0.0264$, $\sigma=0.389$; broad trends reproduced, oscillations missed (Section IV-B, Figure 5) |
| Third-party illustration | Add an initially centrist Gaussian party with standard deviation 0.15 | Reported outer-party distance 1.78, center-to-outer distance 0.89, and 43% abstention; the centrist party initially broadens before narrowing (Appendix B, Figure 6) |

Historical initialization uses Gaussian samples inferred from 1861 data. The source reports no numerical goodness-of-fit score or held-out forecast evaluation. The third-party figures concern the appendix's displayed extension and are not a general result about multiparty systems.

## Limitations

The theorem assumes a locally absolutely continuous solution to the coupled system; well-posedness is left for further study. Initial support containment is stronger than proximity in Wasserstein distance: a small amount of distant mass can violate the support condition while leaving that distance small. The authors explicitly distinguish their theorem from local asymptotic stability in the Wasserstein metric (Section III-B).

The electorate is fixed, one-dimensional, and Gaussian; parties share a tolerance parameter and maximize expected vote counts. Unregularized dynamics predict eventual complete homogeneity. Entropy regularization to preserve diversity is proposed but not analyzed. Historical context, election cycles, and campaigns are omitted; fitting congressional trajectories does not identify the mechanism causally.

The parsed Appendix B choice formula includes acceptance of party 1 alone and acceptance of all three parties, but omits cases where exactly two parties are acceptable. It therefore does not directly implement uniform choice among every possible accepted subset. The three-party numbers above are retained as reported, with this qualification.

The supplied Markdown contains no publication year, venue, DOI, or arXiv identifier for this paper. The year 2022 follows its citation in the existing Wiki page [[papers/a-dynamic-model-of-party-differentiation-under-electoral-competition|A Dynamic Model of Party Differentiation under Electoral Competition]]; no stable identifier is inferred.

## Related Concepts

- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]
- [[concepts/satisficing-spatial-competition|Satisficing Spatial Competition]]
- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/political-polarization|Political Polarization]]
- [[concepts/hotelling-downs-model|Hotelling-Downs Model]]

## Related Papers

- [[papers/why-are-us-parties-so-polarized-a-satisficing-dynamical-model|Why are U.S. Parties So Polarized? A 'Satisficing' Dynamical Model]]: the cited point-position model extended to probability distributions.
- [[papers/a-dynamic-model-of-party-differentiation-under-electoral-competition|A Dynamic Model of Party Differentiation under Electoral Competition]]: a later Wiki paper citing this work and studying internal diffusion, alternative objectives, and electoral institutions.
- Jordan, Kinderlehrer, and Otto (1998), "The Variational Formulation of the Fokker-Planck Equation": cited foundation for distributional evolution through Wasserstein geometry.

[[index|Library home]]
