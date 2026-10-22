---
title: "Competing Activists–Political Polarization"
type: paper
authors:
  - Lucas Böttcher
  - Pedro Montealegre
  - Eric Goles
  - Hans Gersbach
year: 2019
tags:
  - opinion-dynamics
  - political-polarization
  - location-games
  - activist-competition
  - microtargeting
---

## TL;DR

This paper couples a finite-state [[concepts/opinion-dynamics|opinion-dynamics]] model to a location game between two activists who locally bias movement along a one-dimensional political spectrum. Equal-strength activists share a central pure-strategy Nash equilibrium, but sufficient asymmetry makes the stronger activist differentiate while the weaker one imitates, producing a four-step best-response cycle and an abrupt thinning of the political center. The result is a mechanism for [[concepts/political-polarization|political polarization]] within a stylized model, not an empirical estimate of activist or microtargeting effects.

## Research Question

Can competition between influential actors over where to inject political ideas generate or amplify polarization even when baseline opinion dynamics would converge to a uniform, unpolarized distribution?

## Motivation

Activists, parties, and interest groups can target particular constituencies through follower networks and data-driven campaigning. Models that treat media or political influence as an external force miss the strategic interaction between rival persuaders: each actor's most attractive audience may depend on where and how strongly the opponent intervenes. The paper isolates this endogenous positioning mechanism in a tractable opinion chain.

## Contributions

- Introduces local activist influence into a discrete nearest-neighbor opinion process by shifting transition probabilities toward one side of the spectrum at a targeted state.
- Derives the stationary opinion distribution analytically for a general tridiagonal transition matrix.
- Formulates activist targeting as a location game in which each activist maximizes the stationary share of its affiliated side.
- Shows that equal-strength activists have a central Nash equilibrium, whereas moderate strength asymmetry can eliminate pure-strategy equilibrium and create alternating best-response cycles.
- Identifies a threshold at which the stronger activist moves away from the shared center, causing an abrupt reduction in the neutral share, and reports qualitatively similar behavior under initially polarized or center-concentrated baselines.

## Method

The population is distributed across $N$ ordered opinion states. With nearest-neighbor transition probabilities $p_i$ to the right and $q_i$ to the left, the stationary shares satisfy

$$
X_{i+1}=\left(\prod_{j=1}^{i}\frac{p_j}{q_{j+1}}\right)X_1,
$$

followed by normalization. When all transition probabilities equal $p$, the unique stationary distribution is uniform. An activist targeting state $j$ changes the two outward probabilities there by an influence parameter $\epsilon$: one direction becomes $p+\epsilon$ and the other $p-\epsilon$.

The main strategic analysis uses $N=9$, with four states assigned to group A, a central neutral state, and four states assigned to group B. Activists $A^+$ and $B^+$ choose target locations $j_A$ and $j_B$ to maximize their respective stationary group shares. Mutual best responses define a pure-strategy Nash equilibrium; when none exists, the paper studies alternating best-response dynamics.

For a stronger activist A facing activist B at the central state, the switch between co-location and moving one state away occurs at

$$
\epsilon_A^c=\frac{p^2+7\epsilon_B^2}{p+7\epsilon_B}.
$$

## Experiments

Analytical stationary distributions are compared with stochastic simulations averaged over $10^3$ samples, using $p=0.2$, $T=2\times10^6$ transitions, and $10^5$ initial equilibration steps. Without activists, even a polarized initial distribution approaches the uniform stationary distribution. Placing opposing activists near the boundaries of the neutral region instead thins the center and yields a polarized stationary profile.

With equal influence, $\epsilon_A=\epsilon_B=0.1$, both activists' best-response curves intersect at the center. Setting $\epsilon_B=0.1$ and increasing $\epsilon_A$ changes the strategic regime. At $p=0.2$, the analytical threshold is $\epsilon_A^c\approx0.122$; above it, activist A's best response to B at state 5 moves to state 4. Alternating responses then cycle through target pairs $(5,3)$, $(5,5)$, $(4,5)$, and $(4,4)$, creating a period-four oscillation between more and less polarized stationary distributions.

Appendix analyses introduce exogenous probability gradients that favor either the center or the extremes. Both retain the qualitative transition from a stable equilibrium to cycling as activist-strength asymmetry grows. With an even number of states ($N=12$), the absence of a unique center creates four equilibria for equal-strength activists; asymmetry again removes the pure equilibria and produces dynamic targeting patterns.

## Limitations

The model has a one-dimensional, discretized opinion space, fixed group boundaries, nearest-neighbor transitions, and activists whose influence is local and disappears when they move. Activists are assumed to know stationary outcomes and to optimize only their affiliated group's aggregate share. Alternating exact best responses impose a particular adjustment process; the paper notes mixed strategies as an alternative but does not characterize them in detail.

The numerical examples use small opinion chains and selected parameter values. The analytical threshold is specific to the nine-state partition and payoff definition. The simulations validate the model's stationary calculation, not its behavioral assumptions. No observed campaign, voter panel, or microtargeting intervention is used to estimate transition probabilities, persuasion strength, target choices, or real-world polarization effects.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]]
- [[concepts/political-polarization|Political Polarization]]
- [[concepts/co-adaptive-political-polarization|Co-Adaptive Political Polarization]]
- [[concepts/satisficing-spatial-competition|Satisficing Spatial Competition]]

## Related Papers

- [[papers/political-polarization-as-a-co-adaptive-process|Political Polarization as a Co-Adaptive Process]]
- [[papers/why-are-us-parties-so-polarized-a-satisficing-dynamical-model|Why are U.S. parties so polarized? A satisficing dynamical model]]
- [[papers/a-modified-hegselmann-krause-model-for-interacting-voters-and-political-parties|A modified Hegselmann-Krause model for interacting voters and political parties]]
- [[papers/polarization-abstention-and-the-median-voter-theorem|Polarization, Abstention, and the Median Voter Theorem]]

[[index|Library home]]
