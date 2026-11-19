---
title: Shockwavelike Behavior across Social Media
type: paper
authors:
  - Pedro D. Manrique
  - Frank Yingjie Huo
  - Sara El Oud
  - Minzhang Zheng
  - Lucia Illari
  - Neil F. Johnson
year: 2023
doi: 10.1103/PhysRevLett.130.237401
tags:
  - social-media
  - aggregation-fragmentation
  - network-dynamics
---

## TL;DR

An extremist community can accumulate members gradually in small groups before a series of mergers makes one group large enough to stand out. Manrique and colleagues derive the onset of this rapid growth from a model of group mergers and shutdowns. Its solutions reproduce membership trajectories on VKontakte and Facebook. The same model also describes how entire communities cluster across platforms.

## Research Question

Can interactions between individuals explain both the abrupt appearance of large online communities and the distribution of group sizes that persists as moderators close communities?

## Motivation

The observations track groups and pages that users explicitly join. Membership can jump when a group gains members together and drop abruptly when the platform removes the group. A model of these trajectories must account for what happens to the smaller groups before a large one becomes visible.

## Contributions

- The authors derive a nonlinear equation for group growth that incorporates variation in individual traits, changes in the population, and group shutdowns.
- They apply the equations at two scales. Group size counts members at the first scale and linked communities at the second.
- They derive conditions under which an influx of newcomers delays or suppresses the emergence of a macroscopic group.

## Method

Two sampled individuals can bring their groups together with a probability that depends on their traits. Sampling individuals gives larger groups more opportunities to meet, so the encounter rate for two groups is proportional to the product of their sizes. A shutdown breaks the selected group into single members. The authors average the probability of fusion over the population to obtain $F(t)$ and allow the pool of potential members $N(t)$ to change.

Equation 2 tracks the size-weighted generating function $u(x,t)=\sum_s s n_s(t)e^{-xs}$, where $n_s(t)$ counts groups of size $s$. Between shutdowns, $S(t)=N(t)-u(0,t)$ measures the population in the emerging macroscopic group. With constant $N$ and $F$ and negligible shutdowns, the equation reduces to an inviscid Burgers equation. Its shock gives an onset time of $N/(2F)$ in model time steps.

## Experiments

- **Membership trajectories.** The authors fit the growth between shutdowns for foreign anti-U.S. groups on VKontakte and domestic U.S. antigovernment communities on Facebook. The generalized solutions follow the observed growth curves more closely than the constant-parameter Burgers solutions (Fig. 2).
- **Size distributions.** The observed sizes of individual communities and of clusters of linked communities are consistent with a predicted exponent of $5/2$ for the size frequency. Figure 2 plots the complementary cumulative distributions. Repeated fragmentation sustains this scaling in the model's steady state.
- **Cross-platform dynamics.** Approximate coupled solutions reproduce the timing and shapes of several community growth trajectories around the U.S. Capitol riot (Fig. 4b).
- **Modeled interventions.** With a constant influx $q$ of heterogeneous newcomers and small fluctuations in $F(t)$, the predicted onset time diverges at $q \geq 8\overline{F}$. Microscopic simulations also support predicted shifts in onset when the trait distribution changes (Fig. 3).

## Limitations

The empirical comparisons cover selected communities. Agreement with their trajectories leaves open which other movements follow the same dynamics. The mean-field treatment assumes that population size and average fusion probability change slowly relative to individual mergers and averages over platform differences. The mitigation results come from equations and simulations. The authors found no empirical turbulence scaling.

## Related Concepts

- [[concepts/aggregation-fragmentation-dynamics|Aggregation-Fragmentation Dynamics]] explains how mergers and shutdowns redistribute members among group sizes.
- [[concepts/network-percolation|Network Percolation]] provides the giant-component interpretation of the model's onset.

## Related Papers

- [[papers/non-consensus-opinion-models-on-complex-networks|Non-consensus Opinion Models on Complex Networks]] reports a similar cluster-size exponent at a critical minority fraction. Here the exponent characterizes a steady state maintained by group breakup.
