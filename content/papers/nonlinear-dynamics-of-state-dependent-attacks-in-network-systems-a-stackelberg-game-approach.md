---
title: "Nonlinear dynamics of state-dependent attacks in network systems: A Stackelberg game approach"
type: paper
authors:
  - Shiyang Xu
  - Yongqiang Guan
  - Ziqi Xu
  - Xuechao Duan
year: null
tags:
  - network-security
  - bilinear-systems
  - game-theory
---

## TL;DR

The paper models state-dependent network attacks with bilinear dynamics and formulates attacker-led observer selection as a Stackelberg game. Sparse attack channels permit reduced-dimensional Gramian reconstruction; a further localization approximation enables a sorting-based strategy on degree-disassortative networks.

## Research Question

How can resource-constrained attackers and defenders select nodes when disturbances couple multiplicatively with network states, and how can the resulting performance and equilibrium computations be made tractable?

## Motivation

Additive disturbance models omit changes in effective dynamics caused by state-input coupling. Direct generalized Lyapunov solves and exhaustive attack-set searches are expensive, motivating separate reductions in payoff evaluation and strategy search.

## Contributions

- A bilinear attack model with a squared H2 performance objective derived through Volterra kernels.
- Exact Gramian reconstruction using sparse diagonal attack matrices and an attacked-node-sized linear system.
- A best-response formulation, a general greedy heuristic, symmetry-based special cases, and a topology-dependent sorting approximation.

## Method

The dynamics are $\dot x=Ax+\sum_k u_{i_k}N_kx+Bu$, with output $y=Cx$. Under the assumed convergence conditions, the Gramian satisfies

$$
AQ+QA^\top+\sum_k N_kQN_k^\top+BB^\top=0,
\qquad J=\operatorname{tr}(CQC^\top).
$$

For $B=I$ and $N_k=e_{i_k}e_{i_k}^\top$, define $\mathcal L(X)=AX+XA^\top$, $Q_0=-\mathcal L^{-1}(I)$, and $R_j=\mathcal L^{-1}(e_je_j^\top)$. The paper reconstructs $Q=Q_0+\sum_k w_kR_{i_k}$ after solving $(I+T_S)w=d_S$, where $[T_S]_{mn}=[R_{i_n}]_{i_mi_m}$ and $[d_S]_m=-[Q_0]_{i_mi_m}$ (Eqs. 14–20). It reports cost $O(pn^3)$ versus a dense vectorized $O(n^6)$ solve.

In the [[concepts/stackelberg-games|Stackelberg game]], the attacker selects $p$ nodes first; the defender activates $q$ observation channels with the smallest Gramian diagonal entries. The attacker maximizes their sum. Enumerating attack sets gives the exact discrete solution; Algorithm 1 instead greedily adds the largest marginal gain and is a heuristic, with reported cost $O(n^4+np^4)$ including precomputation.

Section 4 neglects nonlocal responses using effective degrees and spatial decay. Algorithm 2 sorts approximate node scores and updates them after attack selection, with reported $O(n\log n)$ cost. These results concern the localized surrogate, rather than an unconditional exact solver for arbitrary networks.

## Experiments

- **Five-generator system:** Table 2 identifies attack on G3 and observation at G2 as the equilibrium, with payoff 0.6311. Observing G3 under the same attack gives 1.9260. The reported frequency-deviation ranges are approximately ±0.1 Hz and ±0.2 Hz, respectively.
- **18-node connected-star example:** the approximate and reconstructed single-node equilibria both select node 1 for attack and observation.
- **20-node multi-hub network:** three hubs and 17 terminals provide a comparison with exhaustive search. The greedy curve closely follows the optimum; the approximate curve lies below the exact values in the plotted experiment. No numerical approximation-error or wall-clock benchmark is supplied in the prose.

## Limitations

The game assumes complete information and adaptive activation of available observation channels. Changing $C$ changes measured output energy; the formulation alone does not establish an improvement in every physical state through feedback control. The power-system example also simplifies voltage cross-coupling.

The reduced reconstruction exploits diagonal attack channels. The sorting approximation requires localized responses and degree disassortativity, and the paper recommends the general reconstruction when localization is insufficient. Its supermodularity claim should not be read as a general guarantee that greedy maximization is exact.

The supplied extraction contains corrupted symbols and apparent sign inconsistencies, including positive inverse-Lyapunov response approximations despite the earlier signed definition of $R_j$. It also prints a positive assortativity coefficient while describing strong disassortativity. These details require checking against the original typeset source before reproducing the approximation. The supplied text does not establish a publication year or stable identifier; year is left null.

## Related Concepts

- [[concepts/stackelberg-games|Stackelberg Games]]: sequential commitment and best-response reasoning organize node selection.

## Related Papers

- Xu, Guan, and Shen, “A Stackelberg game for optimal control energy of multi-agent networks under cyber-attacks” (2026), cited as reference 18: a related network-security game using control energy.
- De Oliveira, Siami, and Sontag, “Edge selections in bilinear dynamic networks” (2023 as listed in reference 28): a related basis for marginal node-selection reasoning.
