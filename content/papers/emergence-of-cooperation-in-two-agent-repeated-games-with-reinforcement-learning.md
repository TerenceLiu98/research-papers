---
title: "Emergence of cooperation in two-agent repeated games with reinforcement learning"
type: paper
authors:
  - Zhen-Wei Ding
  - Guo-Zhong Zheng
  - Chao-Ran Cai
  - Wei-Ran Cai
  - Li Chen
  - Ji-Qiang Zhang
  - Xu-Ming Wang
year: 2023
doi: "10.1016/j.chaos.2023.114032"
tags:
  - reinforcement-learning
  - repeated-games
  - cooperation
---

## TL;DR

Two tabular Q-learning agents can sustain cooperation in a strict repeated Prisoner's Dilemma when value estimates retain past experience and future rewards receive substantial weight. Their learned policies resemble [[concepts/win-stay-lose-shift|Win-Stay, Lose-Shift]]. Cooperation breaks down through competing cyclic behaviors, and exploration can help, hurt, or barely affect cooperation depending on which cycles coexist.

## Research Question

How do learning rate, discounting, and exploration determine the emergence and stability of cooperation between two independently learning agents?

## Motivation

Population-level cooperation studies can obscure the individual learning dynamics that sustain reciprocity. A two-player model permits direct examination of learned policies, state transitions, and the loss of cooperative stability without imposing a fixed strategy on either player.

## Contributions

- Maps high-cooperation, near-total-defection, and low-cooperation regimes over learning rate and discount factor.
- Explains behavior through coordinated optimal policies (COPs) and their recurring state-transition cycles, termed coordinated optimal modes (COMs).
- Derives boundaries of the high-cooperation region from competition between retaliation and tolerance of exploitation.
- Shows that exploration has a regime-dependent effect rather than uniformly promoting cooperation.

## Method

Each agent observes the previous joint action from its own perspective, giving states $CC,CD,DC,DD$, and chooses cooperation or defection. With probability $1-\epsilon$ it selects a maximizing Q-value; otherwise it chooses a random action. The update is

$$Q(s,a)\leftarrow(1-\alpha)Q(s,a)+\alpha[r+\gamma\max_{a'}Q(s',a')].$$

Small $\alpha$ preserves past value estimates; this is the paper's sense of strong memory, distinct from increasing the one-round state-history length. Large $\gamma$ emphasizes future rewards. Payoffs are $R=1$, $S=-b$, $T=1+b$, and $P=0$, with $0<b<1$.

A COP pairs policies that are optimal conditional on each other. With exploration absent and policies unchanged, joint actions follow deterministic cycles. The authors classify 12 cycles and emphasize seven short modes. State frequencies, transition probabilities, temporal correlations, and mutual information characterize their empirical stability.

Section 4.4 compares converged Q-values for retaliation and tolerance and obtains the boundary curves

$$\gamma=\frac{-1-b+\sqrt{5-2b+b^2}}{2},\qquad
\alpha=\frac{b}{1+b-\gamma^2}.$$

These are model-specific predictions based on competing modes and converged values, not general convergence guarantees for independent Q-learning.

## Experiments

The main parameter sweep fixes $b=0.2$ and $\epsilon=0.01$, averaging 50 initializations. Figure 1 reports an averaging window of $6\times10^6$ rounds and a discarded transient of $4\times10^6$ rounds; exploration is initially 0.1 before decreasing to 0.01. Cooperation is measured as the fraction of cooperative actions across both agents. Reward differences assess asymmetric exploitation.

| Regime | Reported behavior | Mechanistic interpretation |
| --- | --- | --- |
| Small learning rate, large discount factor | High cooperation | Both policies behave like WSLS; unilateral defection is followed by mutual defection and then restored cooperation. |
| Weak retention of past values | Near-total defection | All-D behavior dominates and recovery from mutual defection becomes unlikely. |
| Strong retention, small discount factor | Low but nonzero cooperation | WSLS-like recovery coexists with predominantly defective behavior. |
| Boundary of high cooperation | Exploitation and elevated transition mutual information | Tolerance of unilateral defection competes with retaliation. |

The boundary predictions agree with the reported phase diagram at $b=0.2$. For exploration comparisons, Figure 8 switches exploration off after $4\times10^6$ rounds and estimates final mode probabilities over 2,000 runs. Continuing exploration can increase, decrease, or leave cooperation approximately unchanged as dilemma strength and learning parameters vary. Appendix A.3 offers additional simulations supporting a conjectured tipping point at a mutual-defection-mode probability of 0.5; it is not presented as a general theorem.

## Limitations

Evidence concerns two symmetric tabular learners in one game family, not human participants or larger social networks. The authors leave a formal connection between COPs and dynamical attractors open, as well as extensions involving fixed memory-based opponents. Tolerance is an observed precursor in this model, not a validated general social early-warning signal. Data are available on request.

The supplied Markdown contains corrupted symbols and inconsistent mode-level cooperation values in Section 4.5; those numerical assignments are not used here. Quantitative results available only in plot images are not reconstructed.

## Related Concepts

- [[concepts/win-stay-lose-shift|Win-Stay, Lose-Shift]] — the conditional response pattern supporting the high-cooperation regime.

## Related Papers

- [[papers/solving-repeated-games-with-large-language-model|Solving Repeated Games with Large Language Model]] studies explicit opponent hypotheses and policy adaptation in LLM agents. It provides a comparison in learning architecture and time horizon, not a baseline evaluated here.
- Barfuss and Meylahn (2023), “Intrinsic fluctuations of reinforcement learning promote cooperation,” is the paper's cited comparison for a positive exploration effect; the present study instead finds dependence on mode composition.
