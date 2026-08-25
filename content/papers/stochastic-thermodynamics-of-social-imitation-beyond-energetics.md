---
title: "Stochastic Thermodynamics of Social Imitation beyond Energetics"
type: paper
authors:
  - Luis Irisarri
  - Lucas Trigal
  - Raúl Toral
  - Gonzalo Manzano
year: 2026
doi: "10.1038/s41467-026-76212-0"
journal: Nature Communications
tags:
  - stochastic-thermodynamics
  - opinion-dynamics
  - sociophysics
  - nonequilibrium-statistical-mechanics
  - phase-transitions
  - fluctuation-theorems
---

## TL;DR

This paper develops a stochastic-thermodynamic framework for social imitation that does not assign agents an energy or temperature. It treats reaction-resolved changes in opinions or other social attributes as currents and combines them with information-theoretic entropy. In a reversible binary imitation model with herding and anticonformity, the framework yields fluctuation theorems, second-law-like inequalities, thermodynamic and kinetic uncertainty relations, and an inference method for estimating the model's herding-versus-anticonformity bias.

## Research Question

Can stochastic thermodynamics provide meaningful laws and inference tools for social dynamics whose mechanisms have no physical energy, heat, or temperature interpretation?

## Motivation

Earlier applications of stochastic thermodynamics to opinion models often imposed an effective energy function and thermal reservoirs. The authors instead ask whether the mathematical structure can arise directly from a careful decomposition of social update mechanisms into microscopically reversible reactions. This would extend nonequilibrium methods to sociophysics without adding ad hoc thermodynamic entities.

## Contributions

- Defines a generalized local detailed-balance relation for reversible social-update reactions. The ratio of forward and reverse rates separates a combinatorial internal-entropy change from a reaction-specific bias.
- Derives trajectory-level entropy production, an integral fluctuation theorem, and second-law-like inequalities in which opinion currents replace conventional energy or particle currents.
- Applies the framework to a binary, all-to-all imitation model with herding and anticonformity, including nonlinear group interactions of the q-voter type.
- Shows how the thermodynamic uncertainty relation (TUR) and kinetic uncertainty relation (KUR) constrain the precision of opinion currents.
- Derives a stationary current fluctuation theorem that can estimate the difference in reaction potentials, `mu_1 - mu_2 = 2 ln(lambda)`, from observed reaction-resolved opinion changes.
- Extends the construction conceptually to multiple opinions, complex networks, aging, zealotry, and variable populations.

## Method

The illustrative model has `N` agents with binary attributes `A` and `B` on an all-to-all network. A selected agent changes opinion through one of two reversible reactions: herding occurs when it encounters `q` agents with the opposite opinion, while anticonformity occurs when it encounters `q` agents with the same opinion. The state variable `n` is the number of agents holding opinion `A`. The nonlinear interaction factor `g(n)` can represent sampling with or without repetition, threshold rules, or other group influences.

The authors keep the two reactions separate in the continuous-time Markov process. For each reaction, the ratio of forward and reverse rates has the form `exp(S_int(m) - S_int(n) + (m-n) mu_r)`, where `S_int(n) = ln binomial(N,n)` is the internal combinatorial entropy and `mu_r` is the reaction-specific bias. The dimensionless parameters are `lambda`, which compares herding with anticonformity, `chi`, which captures opinion asymmetry, and `theta`, which controls the relative frequency of the two reactions.

At the trajectory level, each jump is labeled by its direction, reaction, and time. The entropy production is the log ratio between forward and time-reversed trajectory probabilities. At the ensemble level, the analysis uses probability currents, dynamical activity, stationary distributions, and entropy production rates. The stationary state is obtained exactly from the one-step process; the phase diagram is analyzed with a large-`N` Fokker-Planck approximation and mean-field equations. Gillespie simulations and Full Counting Statistics provide current moments and fluctuation estimates.

## Experiments

The study is computational and theoretical; it uses no external or experimental data. The generated datasets and simulation code are reported as deposited in CORA under DOI `10.34810/DATA3484`.

At equilibrium, all reaction currents vanish only when `lambda = 1`, equivalently `h_1 h_2 = a_1 a_2`. The stationary distribution then becomes a binomial distribution with parameter `p = chi/(chi+1)`, independent of the nonlinear interaction function and of `theta`. Away from equilibrium, the aggregate stationary current is zero but the reaction-resolved currents generally cancel one another, so the model is a nonequilibrium steady state rather than thermodynamic equilibrium.

For symmetric opinions and reactions (`chi = theta = 1`) with `q = 2`, anti-conformity dominates for `lambda < 1` and herding dominates for `lambda > 1`. The stationary distribution changes from polarized and unimodal to consensus-seeking and bimodal at the second-order critical point `lambda_c = 3`. In the asymmetric phase diagram, a first-order transition can exchange which of two consensus states is more probable, while the critical point marks the second-order symmetry-breaking transition. In the frozen-consensus limit, both opinion currents and dynamical activity vanish; in the strong anti-conformity limit, activity and current magnitudes diverge in the model's scaling.

The stationary entropy production is `(mu_1 - mu_2) <dot I_1>`, with `mu_1 - mu_2 = 2 ln(lambda)`. The TUR bounds current precision using entropy production, while the KUR bounds it using dynamical activity. The paper finds the TUR tight near equilibrium and the KUR more informative far from equilibrium, especially in the strong anti-conformity regime. Around the critical point, current and entropy production show pronounced changes associated with the reorganization from polarization to consensus.

In the stationary state, the current distribution obeys `P(I_1)/P(-I_1) = exp((mu_1-mu_2) I_1)`. Linear fits of log current-probability ratios therefore recover the reaction-potential difference from simulated trajectories. The authors also drive `lambda` across the critical point. For large populations, trajectories become trapped in one of the two consensus basins, and conditioning on the selected basin gives a refined second-law bound with a `ln(p_i)` term; in the symmetric case the selection probability is `1/2`.

## Limitations

The main model is a binary, well-mixed toy system. Exact closure at the opinion-count level generally fails on complex networks, where microscopic node placement affects transition rates; the proposed network extensions therefore require microscopic or approximate mesoscopic descriptions. The framework also assumes reaction-level microscopic reversibility, so strictly one-way transitions require other methods.

The inference result presumes that observations can distinguish herding-generated from anticonformity-generated changes. The study does not validate the framework against empirical opinion data, and its phase-transition results rely on large-population approximations for the macroscopic limit. The authors present the model as an exploratory demonstration rather than a complete account of social behavior.

## Related Concepts

- [[Stochastic Thermodynamics]]
- [[Opinion Dynamics]]
- [[Thermodynamic Uncertainty Relations]]
- Microscopic reversibility
- Nonequilibrium steady states
- Symmetry breaking

## Related Papers

- Seifert (2012), "Stochastic thermodynamics, fluctuation theorems and molecular machines."
- Tomé, Fiore, and de Oliveira (2023), "Stochastic thermodynamics of opinion dynamics models."
- Hawthorne, Harunari, de Oliveira, and Fiore (2023), "Nonequilibrium Thermodynamics of the Majority Vote Model."
- Castellano, Munoz, and Pastor-Satorras (2009), "Nonlinear q-voter model."
- Herpich, Cossetto, Falasco, and Esposito (2020), "Stochastic thermodynamics of all-to-all interacting many-body systems."
- Llabrés, San Miguel, and Toral (2026), "Universality of noise-induced transitions in nonlinear voter models."
