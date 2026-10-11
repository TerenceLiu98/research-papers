---
title: Modeling of Rumor Propagation in Large Populations with Network via Graphon Games
type: paper
authors:
  - Huaning Liu
  - Gokce Dayanikli
year: null
source_job_id: "2f24317a-92ac-4593-a2d7-65f0b2cb70a6"
tags:
  - rumor-propagation
  - graphon-games
  - network-games
  - stochastic-control
---

## TL;DR

The paper models rumor and truth spreading as a non-cooperative game in which individuals choose communication rates on a heterogeneous network. A controlled four-state SKIR process becomes a [[concepts/finite-state-graphon-games|finite-state graphon game]] in the continuum limit. The authors characterize equilibrium through coupled forward-backward ordinary differential equations and establish existence under a stated smallness condition. Block-graphon simulations illustrate policy and initial-seeding effects; they do not establish real-world intervention effectiveness.

## Research Question

How do individually chosen communication rates, heterogeneous network interactions, and incentives to spread truth or restrict rumors jointly determine rumor propagation at Nash equilibrium in a large population?

## Motivation

Compartmental rumor models describe population flows but often take behavior as fixed or optimize control from a regulator's perspective. This paper instead lets individuals trade off communication effort, rewards for truth spreading, and costs associated with rumor spreading. [[concepts/graphons|Graphons]] preserve heterogeneous interaction strengths while replacing a large finite network with a continuum population.

## Contributions

- Defines finite-player and continuum games extending the susceptible-known-infected-removed (SKIR) model with individual communication controls and network-weighted exposure.
- Characterizes graphon Nash equilibrium using backward Hamilton-Jacobi-Bellman equations for individual values, forward Kolmogorov equations for state probabilities, and two self-consistent exposure aggregates.
- Gives an equilibrium existence result under boundedness, continuity, and a horizon-dependent smallness condition (Theorem 3.3; Appendix I).
- Provides an iterative numerical method for piecewise constant graphons and illustrates age-based policy comparisons and platform-based initial-seeding scenarios.

## Method

An agent occupies one of four states: uninformed ($S$), actively spreading truth ($K$), actively spreading fake news ($I$), or uninterested ($R$). Contact with $K$ or $I$ agents moves susceptible agents into the corresponding state; contact also permits switching between $K$ and $I$. Both active states have spontaneous transitions to $R$ with rates $\mu_K$ and $\mu_I$.

An agent chooses a bounded communication rate $\alpha\in[0,\bar A]$, with natural rate one. In the finite model, exposure is a normalized weighted sum of other agents' communication rates and state indicators. In the continuum model, a symmetric measurable kernel $w:[0,1]^2\to[0,1]$ determines interactions. Under a Markov control $\phi$, the two aggregates are

$$
Z_{t,e}^{x}=\int_0^1 w(x,y)\phi^y(t,e)p^y(t,e)\,dy,
\qquad e\in\{K,I\}.
$$

For example, the transition rate from $K$ to $I$ is $\beta_K\alpha Z_{t,I}^x$. Exposure thus depends on the receiving agent's control and on the controls of those spreading information.

Each agent minimizes expected running costs plus a terminal cost. The running cost is

$$
f(t,e,\alpha)=\frac12(\lambda_I(t)-\alpha)^2\mathbf{1}_{\{e=I\}}
-\lambda_K(t)\mathbf{1}_{\{e=K\}}
+\frac12(1-\alpha)^2,
$$

and the terminal cost is $c^x\mathbf{1}_{\{e=I\}}$. Here $\lambda_K$ rewards occupying the truth-spreading state; $\lambda_I$ is a target communication rate in a quadratic penalty for rumor spreaders, not a penalty multiplier. In the examples, lowering this target represents stronger restraint on rumor communication.

Hamiltonian minimization supplies state-dependent optimal controls. The resulting value functions evolve backward from terminal costs, state probabilities evolve forward from initial distributions, and both must agree with the graphon aggregates. Theorem 3.3 states existence when

$$
T\bar\beta\left[
\max\left\{\frac12(\bar\lambda_I+\bar A)^2,\bar\lambda_K\right\}
+\frac12(1+\bar A)^2
\right]<1,
$$

under Assumption 3.1. The proof uses a Banach fixed point for the aggregates conditional on candidate flows, followed by a Schauder fixed point for the coupled system. Conditional aggregate uniqueness does not establish uniqueness of the full Nash equilibrium.

For a piecewise constant graphon, agents within each group have identical parameters and interaction profiles, reducing the continuum equations to a finite system. Algorithm 1 alternates aggregate and control updates with forward probability and backward value solves until successive flows differ by less than a tolerance.

## Experiments

Section IV reports illustrative simulations with parameters informed partly by published social-media usage and overlap statistics. It does not fit the model to observed rumor trajectories or evaluate actual interventions.

**Age groups.** Four groups (18-29, 30-49, 50-64, and 65+) have distinct meeting and forgetting rates and block interaction weights. Initial state probabilities are $(p_S,p_K,p_I,p_R)=(0.95,0.02,0.03,0)$, and terminal rumor costs are zero. The tested policy settings are:

| Policy | Truth reward $\lambda_K$ | Rumor communication target $\lambda_I$ |
| --- | --- | --- |
| 0: baseline | 1.0 | 0.25 |
| 1: stronger reward | 1.5 | 0.25 |
| 2: stronger restraint | 1.0 | 0.20 |

The authors report that Policy 2 reduces the probability of the fake-news state relative to baseline, while Policy 1 increases middle-aged agents' communication rates in the truth-spreading state (Figures 2-3). The text supplies no numerical effect sizes or uncertainty estimates, and the comparisons do not equalize policy costs.

**Platforms.** The second example assigns each individual to a primary platform: Instagram, Facebook, TikTok, or Twitter. Block weights reflect reported platform overlap and news consumption. It compares dispersed initial promotion across platforms with concentration on a single platform, and adds an $R\to S$ transition at rate $\gamma=0.1$. Facebook, which is more connected to other groups in this setup, remains more active in both $K$ and $I$. The authors report that concentrated rumor outbreaks do not destabilize the simulated system (Figures 4-5); this is an observation for the examples, not a general stability theorem.

## Limitations

- The existence theorem is conditional on its smallness and regularity assumptions. The paper supplies neither a general equilibrium uniqueness result nor a convergence guarantee for the numerical iteration.
- Although the continuum game is motivated as an approximation to finite-player equilibrium, the supplied text does not give a finite-population approximation error or an explicit epsilon-Nash bound.
- The network framework concerns dense, symmetric interactions. Numerical results use block-constant graphons; general-graphon computation and estimation of network structure are future work.
- Behavioral costs, state transitions, and truth labels are model assumptions. Usage-informed parameters do not constitute empirical validation of individual behavior or policy effects. Assigning multi-platform users to one primary platform further simplifies overlap.
- Policy parameters are externally specified. Optimizing a regulator's objective through a Stackelberg game is proposed as future work, so the reported comparisons do not identify an optimal policy.
- The supplied Markdown has damaged mathematical notation, especially in the transition matrix. Its displayed feedback formulas also omit explicit projection onto the assumed bounded control interval. The summary uses the stated constrained minimization formulation without treating the displayed formulas as globally admissible controls.
- Publication year, venue, and stable paper identifier are absent from the supplied source. Author names are transliterated from the extracted heading; no year or identifier is inferred from the references.

## Related Concepts

- [[concepts/finite-state-graphon-games|Finite-State Graphon Games]]: heterogeneous strategic controls coupled through network-weighted state distributions.
- [[concepts/graphons|Graphons]]: continuum representations of dense network interactions.
- [[concepts/misinformation-spreading-models|Misinformation Spreading Models]]: the compartmental setting extended here with endogenous communication.
- [[concepts/rumor-refutation-on-social-media|Rumor Refutation on Social Media]]: truth spreading and correction incentives.
- [[concepts/network-games|Network Games]]: individual best responses depend on others through network structure.

## Related Papers

- Aurell, Carmona, Dayanikli, and Lauriere (2022), "Finite state graphon games with applications to epidemics": the cited finite-state framework and existence argument adapted to two information aggregates (reference 17).
- Xiao et al. (2019), "Rumor propagation dynamic model based on evolutionary game and antirumor": the cited SKIR antecedent (reference 18).
- Parise and Ozdaglar (2023), "Graphon games: A statistical framework for network games and interventions": a cited foundation for heterogeneous continuum network games (reference 12).
- [[papers/contagion-in-graphons|Contagion in graphons]]: a library comparison using graphon-based threshold diffusion and seeding rather than controlled SKIR transitions; not cited in this paper.
- [[papers/minimizing-the-misinformation-concern-over-social-networks|Minimizing the Misinformation Concern over Social Networks]]: a library comparison optimizing correction-agent selection and concern-weighted outcomes rather than individual communication equilibria; not cited in this paper.

[[index|Library home]]
