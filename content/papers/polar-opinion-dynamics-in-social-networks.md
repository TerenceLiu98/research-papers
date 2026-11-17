---
title: Polar Opinion Dynamics in Social Networks
type: paper
authors:
  - Victor Amelkin
  - Francesco Bullo
  - Ambuj K. Singh
year: null
tags:
  - opinion-dynamics
  - nonlinear-dynamics
  - consensus
  - social-networks
---

## TL;DR

Making susceptibility to persuasion depend on current opinion produces nonlinear social-influence dynamics with provable consensus or persistent disagreement. On a strongly connected directed network, three polynomial susceptibility models converge; the stubborn-extremists model sustains disagreement when agents fixed at both opposing extremes are present. Nonsmooth max–min Lyapunov functions establish the convergence results.

## Research Question

When does state-dependent resistance to persuasion preserve disagreement, and when does network averaging still drive all agents to consensus?

## Motivation

DeGroot averaging does not capture changes in conviction as opinions evolve. Friedkin–Johnsen dynamics incorporate fixed susceptibility and attachment to initial opinions, but current attitudes can alter resistance to persuasion. Different social-psychological accounts predict either resilient extremes or resilient neutrality, motivating several susceptibility functions rather than one universal behavioral rule.

## Contributions

- Defines a general continuous-time model with locally Lipschitz, potentially agent-specific susceptibility functions.
- Establishes well-posedness and contraction of the interval containing all opinions.
- Gives a sufficient consensus condition based on agreement among zero-susceptibility agents throughout a compact forward-invariant set.
- Characterizes equilibria and convergence for stubborn-positive, stubborn-neutral, and stubborn-extremist specializations, including an explicit disagreement equilibrium.
- Applies generalized gradients, set-valued Lie derivatives, and the generalized invariance principle to nonsmooth Lyapunov functions on directed networks.

## Method

For scalar opinions $x\in[-1,1]^n$, the model is

$$
\dot x=-A(x)Lx,\qquad L=I-W,
$$

where $W$ is a fixed nonnegative row-stochastic matrix and $W_{ij}$ measures agent $j$'s influence on agent $i$. The diagonal entries of $A(x)$ lie in $[0,1]$ and are locally Lipschitz. Averaging supplies the direction of change; susceptibility scales its speed. Zero susceptibility makes an agent locally unresponsive.

The maximum opinion cannot increase and the minimum cannot decrease (Lemma 3). Theorem 3 assumes strong connectivity and a nonempty compact forward-invariant set $S$ containing consensus states. If, for every $x\in S$, $A_{ii}(x)=A_{jj}(x)=0$ implies $x_i=x_j$, all trajectories starting in $S$ approach consensus. This is a condition throughout $S$, not merely at initialization. The proof uses $V(x)=\max_i x_i-\min_i x_i$ and nonsmooth invariance arguments.

Under strong connectivity, the specialized models have the following limits (Theorems 4–6):

| Model | Susceptibility $A_{ii}$ | Limiting behavior |
|---|---|---|
| Stubborn positives | $(1-x_i)/2$ | Any agent initially at $+1$ induces consensus at $+1$; otherwise consensus is below $+1$. |
| Stubborn neutrals | $x_i^2$ | Strictly positive initial opinions yield positive consensus; strictly negative ones yield negative consensus. A zero opinion or mixed signs yields zero consensus. |
| Stubborn extremists | $1-x_i^2$ | Interior initial opinions yield interior consensus. Extremists at only one pole induce consensus there; extremists at both poles sustain disagreement. |

In the last case, order closed agents before open agents and partition $W$ accordingly. Closed opinions remain $x_1^*=x_1(0)$, while, if open agents exist,

$$
x_2^*=(I-W_{22})^{-1}W_{21}x_1^*.
$$

The limit depends on the network and closed agents' locations and opinions, but not on open agents' initial opinions. If everyone is closed, the initial state is stationary. The disagreement proof uses max–min functions of deviations from $x^*$.

## Experiments

Appendix B illustrates trajectories on an Erdős–Rényi network with 200 nodes and 10,326 edges (edge probability 0.25), a scale-free network with 200 nodes and 944 edges (reported exponent −2.3), and Zachary's Karate Club network with 34 nodes and 156 edges. Edge weights are selected uniformly at random. Each model is simulated from qualitatively different randomly selected initial states until convergence, or long enough to reveal slow convergence and the limiting state.

These simulations illustrate the theoretical consensus and disagreement regimes. They are not fits to longitudinal opinion measurements or predictive comparisons against competing models. Phase portraits also depict the specialized models' low-dimensional convergence behavior.

## Limitations

- The convergence characterizations rely on a fixed strongly connected network with nonnegative averaging weights; they do not establish the same conclusions for changing or antagonistic ties.
- The polynomial susceptibility functions reflect qualitative psychological hypotheses, not empirically identified response curves. The authors emphasize that the underlying theories do not specify a unique functional form.
- Exact zero susceptibility matters: near-extremists with positive susceptibility can converge slowly without producing the persistent disagreement guaranteed for opposing fully closed agents.
- The general consensus theorem is sufficient, not a full classification of every admissible susceptibility function.
- Simulations support mathematical illustration rather than behavioral validation. General consensus values without closed agents are not explicitly characterized, apart from the mixed-sign stubborn-neutral case.
- Publication year and stable identifier are not supplied in the parsed source.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]]: current opinion changes the agent's responsiveness to network averaging.
- [[concepts/bounded-confidence-models|Bounded Confidence Models]]: another form of state-dependent influence, typically gating interaction by opinion distance rather than scaling each agent's susceptibility.

## Related Papers

- [[papers/behavior-of-nonlinear-opinion-dynamics-over-large-networks|Behavior of Nonlinear Opinion Dynamics over Large Networks]]: a complementary nonlinear model based on saturating response and graphon approximations; the present paper studies susceptibility zeros and finite directed-network convergence.
- DeGroot (1974), “Reaching a consensus”: the weighted-averaging baseline discussed in the source.
- Friedkin and Johnsen (1999), “Social influence networks and opinion change”: the fixed-susceptibility, initial-opinion-anchoring comparison.
- Sobkowicz (2015), “Extremism without extremists: Deffuant model with emotions”: related opinion-resilience mechanisms within bounded-confidence dynamics, as discussed by the authors.
