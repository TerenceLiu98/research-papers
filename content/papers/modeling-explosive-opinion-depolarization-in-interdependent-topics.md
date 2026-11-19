---
title: Modeling Explosive Opinion Depolarization in Interdependent Topics
type: paper
authors:
  - Jaume Ojer
  - Michele Starnini
  - Romualdo Pastor-Satorras
year: 2023
journal: Physical Review Letters
doi: 10.1103/PhysRevLett.130.207401
tags:
  - opinion-dynamics
  - issue-alignment
  - phase-transitions
---

## TL;DR

In the social compass model, stronger peer influence gradually draws two opposing camps toward a shared orientation. When a population occupies four equally spaced positions across two issues and enough agents hold strong convictions, alignment jumps at a threshold. Once formed, consensus persists even as influence falls below the level needed to produce it.

## Research Question

When does increasing social influence produce a sudden shift toward consensus on two polarized issues, and how does that threshold depend on initial opinions?

## Motivation

Two issues can each divide a population evenly. If the same people take corresponding sides on both issues, two camps form. If positions on the issues vary independently, all four combinations can be equally common. Separate counts for each issue conceal this difference in the starting conditions for depolarization.

## Contributions

The authors represent each person's pair of opinions by an angle and a radius. This lets them distinguish a change in orientation from a loss of conviction. They derive the influence threshold at which a balanced polarized state loses stability and identify when the transition changes from continuous to discontinuous.

## Method

Agent $i$ starts at angle $\varphi_i$ with fixed conviction $\rho_i=\sqrt{x_i^2+y_i^2}$. Its orientation $\theta_i$ evolves under a pull toward its starting angle and a pull toward its peers on a complete network,

$$
\dot\theta_i=\rho_i\sin(\varphi_i-\theta_i)+\frac{\lambda}{N}\sum_{j=1}^N\sin(\theta_j-\theta_i).
$$

Higher conviction strengthens the pull toward the initial position. The coupling $\lambda$ controls peer influence. The authors measure steady-state alignment by $r=\left|\sum_j e^{i\theta_j}/N\right|$. Equally balanced opposing directions cancel at $r=0$, while nearly parallel directions give $r\approx1$. Consensus here means agreement in direction, even when agents retain different radii.

For two equally sized opposing camps with conviction density $P(\rho)=(\alpha+1)\rho^\alpha$ on $[0,1]$, alignment grows continuously above $\lambda_c=\alpha/(\alpha+1)$. For four equal groups at angles $\pm\varphi_0$ and their opposites, fixing everyone's conviction at one gives $\lambda_c=1/\cos^2\varphi_0$. The transition is continuous below $\varphi_0=\arcsin(1/\sqrt5)$ and discontinuous above it (Eqs. 8–9 and Fig. 3).

## Experiments

Simulations with one million agents reproduce the mean-field alignment curves (Fig. 2). Even with four equally spaced groups, the transition is continuous for small $\alpha$. As conviction becomes concentrated near its maximum, increasing influence produces a jump in alignment. Decreasing influence from consensus produces a jump back at a lower threshold.

Figure 4 initializes simulations with American National Election Studies responses, retaining respondents at or above the median conviction. Views on religious guidance and religious objections to serving same-sex couples form two main camps and yield gradual simulated depolarization. Views on birthright citizenship and sending U.S. troops to fight Islamic militants form four main groups and yield a simulated jump with hysteresis.

## Limitations

All agents interact equally, and each agent's conviction stays fixed as its orientation changes. The mean-field derivation also assumes independently distributed initial orientations and convictions. The survey supplies initial opinions. The subsequent changes in influence and alignment occur in the simulation, so the study leaves open whether respondents would follow the same trajectories.

## Related Concepts

- [[concepts/issue-alignment|Issue Alignment]] distinguishes two correlated camps from four combinations of polarized stances.
- [[concepts/bistability-and-hysteresis|Bistability and Hysteresis]] explains how the polarized and aligned states can persist over the same interval of influence strengths.
- [[concepts/opinion-dynamics|Opinion Dynamics]] provides the framework for relating an individual's response to peers to population-level consensus.

## Related Papers

- [[papers/emergence-of-polarized-ideological-opinions-in-multidimensional-topic-spaces|Emergence of Polarized Ideological Opinions in Multidimensional Topic Spaces]] studies how correlated camps can form through selective contact and reinforcement across issues. Ojer et al. take the camp structure as an initial condition and study how it dissolves.
