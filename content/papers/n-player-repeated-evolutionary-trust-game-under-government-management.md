---
title: N-player repeated evolutionary trust game under government management
type: paper
authors:
  - Yuyuan Liu
  - Linjie Liu
  - Ruqiang Guo
  - Liang Zhang
year: 2023
journal: Chaos, Solitons & Fractals
volume: 175
article_number: "114031"
tags:
  - evolutionary-game-theory
  - trust
  - institutional-punishment
---

## TL;DR

A repeated multiplayer trust game with fixed investor and trustee roles shows how reporting rewards and government fines can sustain trustworthy trustees and unconditional investment. With multiple trustees, increasing the incentive parameter produces transitions from no trustworthy trustees, to partial trust with cautious investors, to stable coexistence of all four strategies. With one trustee per interaction group, sufficiently strong incentives instead produce closed orbits around an interior center.

## Research Question

Can conditional participation and government-backed reporting sustain trust in repeated group interactions when investors and trustees cannot switch roles?

## Motivation

Earlier trust-game models often require investment, permit role switching that can eliminate investors, or consider only one-shot interactions. This model separates role-specific evolution and allows investors to delay participation until institutional protection becomes available.

## Contributions

- Combines repeated interactions, delayed investment, and rewarded reporting in two fixed-role populations.
- Derives equilibrium existence and stability thresholds using Jacobian and center-manifold analysis.
- Distinguishes asymptotically stable coexistence with multiple trustees from a center and periodic trajectories with one trustee per group.

## Method

An infinite well-mixed population contains separate investor and trustee populations. Groups contain $N_I$ investors and $N_T$ trustees. Repetition probability $\omega$ gives expected duration $R=1/(1-\omega)$. Unthinking investors invest throughout; cautious investors abstain for the initial $T$ rounds, then invest and report during the remaining $R-T$ rounds. Trustees either reciprocate or retain the investment, with relative prosocial productivity $0<r<1$.

The government announces the number of untrustworthy trustees. Each cautious investor randomly selects that many trustees to report. Each successful report earns reward $\delta$ and imposes a fine $\delta$ on its target, so multiple reports accumulate. The same parameter changes rewards and penalties together.

Let $x$ denote the unthinking-investor share and $y$ the trustworthy-trustee share. Within-role [[concepts/replicator-dynamics|Replicator Dynamics]] follows

$$
\dot x=x(1-x)(P_K-P_C),\qquad
\dot y=y(1-y)(P_T-P_U).
$$

For $N_T>1$, the critical values are

$$
\delta_0=\frac{1-r}{N_T},\qquad
\delta^*=\frac{(1-r)^2R+2r(1-r)T}{R(1-r)+rT(N_T+1)}.
$$

The reported stable states are $(0,0)$ for $0<\delta\leq\delta_0$, a boundary state $(0,y^*)$ for $\delta_0<\delta\leq\delta^*$, and interior coexistence for $\delta>\delta^*$. Here $y^*=(N_T\delta-1+r)/((N_T-1)\delta)$. Importantly, $x=0$ means all investors are cautious; they still invest after government entry. It does not mean investment is absent throughout the interaction.

## Experiments

Numerical phase portraits and time trajectories illustrate the analytical results; no empirical dataset is used. Figures 2–5 use $N_I=10$, $N_T=5$, $r=0.8$, $R=10$, and $T=5$, with $\delta=0.02,0.06,0.10,0.22$ to illustrate the successive regimes. These parameters imply $\delta_0=0.04$ and $\delta^*\approx0.0769$.

Figures 6–7 set $N_T=1$. At $\delta=1-r=0.2$, a segment of boundary equilibria is stable without asymptotic stability. At $\delta=0.3$, the interior equilibrium is a center surrounded by closed trajectories. These periodic solutions should not be read as convergence to an attracting limit cycle.

## Limitations

Results concern a deterministic, infinite, well-mixed model with fixed roles and specified strategies. Government entry is exogenous; reporting uses an announced count and random targeting. The model does not separately identify effects of rewards and fines, nor estimate enforcement costs or validate policy effects empirically. Cautious investment is tied to government entry rather than a general learned risk threshold.

The supplied Markdown contains corrupted mathematical characters. The summary uses recoverable notation and explicit results. It also includes a corrigendum, DOI `10.1016/j.chaos.2023.114251`, which acknowledges an omitted model inspiration: Lim and Masuda's asymmetric N-player trust game. That DOI identifies the correction, not the original article.

## Related Concepts

- [[concepts/replicator-dynamics|Replicator Dynamics]]: separate payoff-driven selection within each role generates the coupled system.

## Related Papers

- Liu and Chen (2022), “Conditional investment strategy in evolutionary trust games with repeated group interactions,” Information Sciences 609:1694–1705: cited antecedent for conditional investment.
- Lim and Masuda (2023), “To Trust or Not to Trust: Evolutionary Dynamics of an Asymmetric N-player Trust Game,” DOI `10.1109/TEVC.2023.3244537`: explicitly acknowledged as a model inspiration in the appended corrigendum.
- Fang and Chen (2021), “Evolutionary dynamics of trust in the N-player trust game with individual reward and punishment,” European Physical Journal B 94:176: cited incentive-based predecessor.
