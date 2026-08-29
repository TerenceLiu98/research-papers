---
title: "A modified Hegselmann–Krause model for interacting voters and political parties"
type: paper
authors:
  - Patrick H. Cahill
  - Georg A. Gottwald
year: 2025
doi: "10.1016/j.physa.2025.130490"
arxiv: "2410.13378"
journal: "Physica A: Statistical Mechanics and its Applications"
tags:
  - opinion-dynamics
  - bounded-confidence
  - interacting-particle-systems
  - political-parties
  - phase-transitions
---

## TL;DR

This paper extends the [[Hegselmann–Krause Model]] by making voters and political parties co-evolving agents in a continuous opinion space. Bounded-confidence attraction among voters, attraction in both directions between voters and parties, party-party repulsion, and stochastic motion generate party bases, swing-voter clusters, disaffected voters, and consensus-like states. The authors give a sufficient condition for deterministic unanimous consensus and, under a frozen-party mean-field approximation, estimate the noise threshold between clustered and nearly uniform voter distributions.

## Research Question

How do opinion clusters and consensus change when a noisy bounded-confidence model includes political parties that influence voters, respond to nearby voters, and differentiate themselves from competing parties?

## Motivation

The classical Hegselmann–Krause model represents only agents whose opinions move toward the local average of sufficiently similar peers. That structure is useful for analyzing collective opinion dynamics but omits a central feature of elections: parties shape voter positions while also adapting their own positions in response to voters and rival parties. Static spatial-election models include parties but do not describe this coupled temporal evolution. The paper therefore seeks a mathematically tractable model in which many voters and a small number of parties evolve together in the same multidimensional opinion space.

## Contributions

- Introduces coupled stochastic differential equations for voters and parties with four interactions: voter-voter attraction, party-voter attraction, voter-party attraction, and party-party repulsion.
- Demonstrates transient regimes interpretable as party bases, swing voters, political competition, disaffected voters, and voter consensus in two- and three-party examples.
- Approximates the width of an isolated voter cluster by reducing its local dynamics to an Ornstein-Uhlenbeck process.
- Proposes a consensus diagnostic based on normalized voter-voter, voter-party, and party-party distances because the standard voter-pair order parameter can misclassify clustered states when parties are present.
- Proves a sufficient condition for unanimous consensus in the deterministic model when attractive voter influence on parties dominates party-party repulsion and the interaction radii cover a suitable initial convex hull.
- Derives one- and higher-dimensional approximations to the critical voter-noise strength using a frozen-party mean-field equation and linear stability analysis.

## Method

Voters $v_i$ and parties $p_\alpha$ occupy the unit domain $[0,1]^d$. A compactly supported interaction kernel activates a force only when two agents fall within its specified radius. Voters are attracted to nearby voters with strength $\mu_{vv}$ and to nearby parties with strength $\mu_{pv}$. Parties are attracted to nearby voters with strength $\mu_{vp}$ and repelled by nearby parties with strength $\mu_{pp}$. Independent Brownian motions with amplitudes $\sigma_v$ and $\sigma_p$ represent unpredictable opinion changes. The four forces are normalized by the total number of the relevant source agents so that the voter population has a well-defined mean-field limit.

For a voter cluster containing $N_v^{(c)}$ voters and influenced by $N_p^{(c)}$ parties, the model becomes locally an Ornstein-Uhlenbeck process when the interaction radii cover the cluster. Its stationary standard deviation is approximated by

$$
\operatorname{std}_{\mathrm{OU}}=
\frac{\sigma_v}{\sqrt{2}}
\left(
\frac{N_v^{(c)}}{N_v}\mu_{vv}+
\frac{N_p^{(c)}}{N_p}\mu_{pv}
\right)^{-1/2},
$$

and the paper defines an approximate cluster diameter containing 95% of voters as $\delta_{\mathrm{cl}}=4\operatorname{std}_{\mathrm{OU}}$.

In the deterministic model, Proposition 5.1 gives sufficient conditions for unanimous consensus: $\mu_{pp}<\mu_{vp}$ and

$$
R>\tfrac{1}{2}\operatorname{diam}(E(0)),
$$

where $R$ is the smallest interaction radius and $E(0)$ is an augmented convex hull containing the initial agents and an auxiliary weighted mean of voter and party positions. These are sufficient rather than necessary conditions.

For the noisy phase transition, the authors assume parties move much more slowly than voters and freeze their positions over the analyzed time interval. Taking $N_v\to\infty$ gives an aggregation-diffusion equation for the conditional voter density. Linearizing around the uniform density, assuming all parties influence every voter, and expanding at small wave number yields in one dimension

$$
\sigma_c^2=
\frac{\mu_{pv}}{2\pi^2}+
\frac{4}{3}\mu_{vv}R_{vv}^3.
$$

For $d\geq2$, the approximation becomes

$$
\sigma_c^2=
d\frac{\mu_{pv}}{2\pi^2}+
\frac{4\pi^{d/2}}{d(d+2)\Gamma(d/2)}
\mu_{vv}R_{vv}^3.
$$

Here $d$ is the number of modeled opinion coordinates; unlike empirical work on [[Ideological Dimensionality]], the paper does not estimate an effective dimension from political data.

## Experiments

The study uses numerical simulations rather than empirical election data. One-dimensional examples with 1,000 voters show how parameter changes produce party-base clusters, swing-voter clusters, political competition, disaffected voters, and a voter-consensus state. The Ornstein-Uhlenbeck approximation closely tracks the simulated standard deviations of two-party and three-party base clusters for the reported parameter settings.

Consensus trajectories are illustrated with 500 voters and four parties in one dimension and 500 voters and five parties in two dimensions. Both runs pass through multiple local clusters before most or all agents merge. Increasing voter noise in the one-dimensional setup from the low-noise case to $\sigma_v=0.1$ instead leaves voters close to a uniform distribution. The proposed distance-based diagnostic records departures from uniformity and party convergence, while the standard voter-pair diagnostic is more sensitive to cluster formation and merger events.

For the stationary-party approximation, phase diagrams use 2,000 initially uniform voters and three fixed parties, simulate to $t=500$, and average the consensus diagnostic over $t=400$ to $500$. The analytical boundary matches the simulated transition well for small voter interaction radii, approximately $R_{vv}\lesssim0.15$. The predicted square-root dependence of $\sigma_c$ on party-to-voter attraction remains useful in the reported experiments up to roughly $\mu_{pv}=0.6$, although the derivation assumes small $\mu_{pv}$. The finite simulations show a gradual transition rather than the abrupt mean-field boundary.

## Limitations

The political interpretations are stylized. Positions evolve only through geometric proximity, interaction forces, and noise; the model omits media consumption, information constraints, electoral institutions, and other mechanisms of voter and party behavior. All voters and parties within each class share force strengths and interaction radii, excluding heterogeneity in openness, charisma, campaign effectiveness, and party identity.

The boundary conditions also matter. Periodic boundaries simplify the analysis but imply wraparound between extremes, while reflective boundaries change the geometry. In unbounded spaces of dimension three or higher, random motion need not return isolated agents to the main cluster, so eventual consensus is less plausible. Parties can wander freely unless the domain or additional memory constraints contain them.

The deterministic consensus criterion is sufficient, not necessary. The stochastic critical-noise result additionally relies on slow, effectively frozen parties, a near-uniform density, small party-to-voter attraction, sufficiently broad party influence, small wave numbers, and a mean-field voter limit despite a finite number of parties. It identifies an order-disorder transition in the frozen-party model, not necessarily unanimous voter-party consensus in the full finite system. The simulations demonstrate possible dynamics under selected parameters and are not calibrated or validated against election data.

## Related Concepts

- [[Hegselmann–Krause Model]]
- [[Opinion Dynamics]]
- [[Ideological Dimensionality]]
- Bounded confidence
- Consensus formation
- Interacting particle systems
- Mean-field theory

## Related Papers

- Hegselmann and Krause (2002), "Opinion dynamics and bounded confidence: Models, analysis and simulation."
- Wang, Li, E, and Chazelle (2017), "Noisy Hegselmann–Krause systems: Phase transition and the 2R-conjecture."
- Nugent, Gomes, and Wolfram (2024), "Bridging the gap between agent based models and continuous opinion dynamics."
- Motsch and Tadmor (2014), "Heterophilious dynamics enhances consensus."

Code and simulation data: <https://github.com/PatrickhCahill/ModifiedHegselmannKrauseModel>

[[index|Library home]]
