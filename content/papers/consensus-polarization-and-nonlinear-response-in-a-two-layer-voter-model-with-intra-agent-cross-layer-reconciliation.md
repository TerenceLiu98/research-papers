---
title: "Consensus, polarization, and nonlinear response in a two-layer voter model with intra-agent cross-layer reconciliation"
type: paper
authors:
  - Huilin Wang
  - Shanshan Wang
  - Weibing Deng
year: null
tags:
  - opinion-dynamics
  - voter-model
  - multilayer-networks
  - dynamic-hysteresis
  - network-science
---

## TL;DR

This paper studies a two-layer [[Voter Model]] in which each agent holds online and offline binary opinions. Same-layer imitation competes with symmetric cross-layer reconciliation: with probability $p$, one of an agent's opinions copies the other. Simulations show an observation-window-dependent crossover from rapid consensus to long-lived population-level polarization as $p$ approaches one, with Barabasi-Albert networks appearing more stable than Erdos-Renyi networks. Under sinusoidal forcing, the hysteresis-loop area scales as $A\sim f^{1/2}$; in the leading mean-field equation, the reconciliation terms cancel exactly from total magnetization.

## Research Question

How do intra-agent reconciliation between online and offline opinions, same-layer social imitation, network topology, and periodic external forcing jointly affect finite-time consensus and nonlinear response in a coupled binary-opinion system?

## Motivation

Standard voter models assign one opinion to each agent, while public/private and online/offline settings allow the same person to hold different context-dependent states. Multilayer work often models influence between different agents across layers. This paper instead isolates symmetric reconciliation within an agent and asks whether making the two personal states agree promotes or impedes population-wide ordering.

The model is deliberately stylized. Its purpose is to distinguish the dynamics of internal consistency from the dynamics of collective consensus, then examine how both interact with homogeneous and heterogeneous network structures and recurring external influence.

## Contributions

- Defines a coupled two-layer voter process with symmetric, non-directed reconciliation between an agent's online and offline states.
- Separates high within-agent alignment from population-level consensus, showing that frequent reconciliation can coexist with long-lived collective polarization because it reduces opportunities for same-layer imitation.
- Measures a finite-time consensus crossover on Erdos-Renyi (ER) and Barabasi-Albert (BA) networks and compares its dependence on system size and mean degree.
- Develops simple mean-field, heterogeneous mean-field, and heuristic pair-level arguments for the different ER and BA connectivity trends.
- Derives a driven mean-field equation in which reconciliation cancels from total magnetization, and attributes the reported $A\sim f^{1/2}$ hysteresis scaling to a relaxation-rate bottleneck at field zero-crossings.

## Method

Each of $N$ agents has online and offline spins $s_i^{\mathrm{on}},s_i^{\mathrm{off}}\in\{-1,+1\}$ on identical static network layers. An asynchronous elementary update selects an agent and target layer. With probability $|h(t)|$, the selected spin aligns with the sign of the external field. Otherwise, it either copies the same agent's other-layer spin with conditional probability $p$, or copies a randomly selected same-layer neighbor with probability $1-p$. One Monte Carlo step contains $2N$ update attempts for the coupled model.

The collective magnetization is

$$
M(t)=\frac{1}{2N}\sum_{i=1}^{N}\left(s_i^{\mathrm{on}}(t)+s_i^{\mathrm{off}}(t)\right).
$$

In unforced runs, consensus probability $P_c$ is the fraction of realizations reaching $|M|=1$ within $T_{\mathrm{obs}}=2\times10^5$ Monte Carlo steps. A hyperbolic-tangent fit to $P_c(p)$ defines the effective crossover midpoint $p_c$. This is explicitly a finite-window statistic, not a thermodynamic order parameter.

For periodic driving, $h(t)=h_0\sin(2\pi f t)$. The loop area is estimated as $A=|\oint M\,dh|$. Adding the two layer-level mean-field equations gives

$$
\frac{dM}{dt}=|h(t)|\left[\operatorname{sgn}(h(t))-M\right],
$$

so the symmetric reconciliation terms cancel. Near a zero-crossing, the relaxation rate vanishes linearly and produces a response width proportional to $f^{-1/2}$, yielding the low-frequency prediction $A\propto f^{1/2}$.

## Experiments

The main simulations use $N=5{,}000$, mean degree $\langle k\rangle=8$, balanced random initial opinions, and 100 stochastic realizations per parameter value; the single-layer baseline uses 200 realizations. At $p=0$, the reported BA consensus-time distribution is shorter and more concentrated than the ER distribution.

For the representative coupled networks, the fitted crossover centers are approximately $p_c=0.986$ for BA and $p_c=0.967$ for ER. High-$p$ trajectories remain close to zero total magnetization during the observation window even though agents are usually aligned across their own two layers. Empirical linear extrapolations against $1/N$ over $N=500$ to $20{,}000$ give $p_c(\infty)\approx0.97$ for BA and $0.92$ for ER, but the authors treat these as finite-window trends rather than precise thermodynamic limits.

Varying connectivity produces an approximately positive linear relation between $1-p_c$ and $1/\langle k\rangle$ for ER networks. BA networks show a much weaker, scattered, and slightly negative fitted trend. The paper interprets the contrast using hub-enhanced restoration and a heuristic pair correction, while stating that the BA slope is suggestive rather than statistically definitive.

With driving amplitude $h_0=0.3$ and frequencies from $10^{-5}$ to $10^{-3}$, the fitted loop-area exponents are about $0.498$ for BA and $0.499$ for ER. These values agree with the mean-field square-root prediction over the two simulated frequency decades.

## Limitations

The consensus crossover depends on the fixed observation window, simulation protocol, and finite ensemble. The $1/N$ extrapolation is an empirical guide, and the BA connectivity trend lacks uncertainty estimates and has appreciable scatter. The simple and heterogeneous mean-field rate balances contain phenomenological coefficients; the pair-level correction is a qualitative post-hoc interpretation rather than a parameter-free prediction.

The model uses binary opinions, identical static layers, homogeneous reconciliation strength, and stylized field-alignment rules. It is not calibrated to empirical online/offline behavior, and the reported polarization is a population-level binary-state configuration rather than a validated measure of ideological or affective polarization. The square-root derivation is a leading mean-field, quasi-adiabatic result and does not establish topology independence beyond the simulated range.

## Related Concepts

- [[Voter Model]]
- [[Opinion Dynamics]]
- [[Dynamic Hysteresis]]
- [[Noisy Voter Model]]
- Multilayer networks
- Pair approximation

## Related Papers

- [[Polarization-induced stress in the noisy voter model]]
- [[Stochastic Thermodynamics of Social Imitation beyond Energetics]]
- Diakonova, Nicosia, Latora, and San Miguel (2016), "Irreducibility of multilayer network dynamics: the case of the voter model."
- Min and San Miguel (2019), "Multilayer coevolution dynamics of the nonlinear voter model."
- Gastner, Oborny, and Gulyas (2018), "Consensus time in a voter model with concealed and publicly expressed opinions."

[[index|Library home]]
