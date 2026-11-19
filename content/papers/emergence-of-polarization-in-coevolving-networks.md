---
title: Emergence of Polarization in Coevolving Networks
type: paper
authors:
  - Jiazhen Liu
  - Shengda Huang
  - Nathaniel M. Aden
  - Neil F. Johnson
  - Chaoming Song
year: 2023
journal: Physical Review Letters
doi: 10.1103/PhysRevLett.130.037401
tags:
  - opinion-dynamics
  - adaptive-networks
  - political-polarization
  - phase-transitions
---

## TL;DR

Neighbors can draw each other's opinions closer while the population sustains two opposing camps. Liu and colleagues derive this outcome for a network whose ties adjust rapidly to opinion similarity. Facebook hard-content domains and political blogs show peaks at the extremes of political leaning. Facebook soft-content domains peak near the center. The model also predicts an intermediate regime with two peaks away from the extremes.

## Research Question

Under what conditions can local agreement and selective tie formation sustain bipolarization, and what signatures would those mechanisms leave in opinion scores and network links?

## Motivation

An opinion distribution with a mean near zero can describe either a population concentrated near neutrality or two camps concentrated at opposite extremes. Earlier reinforcement models could produce two camps transiently. The authors seek a stationary explanation that also accounts for which agents become highly connected.

## Contributions

- The stationary opinion density follows endpoint power laws, $P(s)\sim(1-s)^{\delta_+}$ near $+1$ and $P(s)\sim(1+s)^{\delta_-}$ near $-1$. Negative exponents indicate that density rises toward the respective extremes.
- For the symmetric minimal model, the authors distinguish three phases by the location of the density maxima. The first transition occurs as the endpoint exponent crosses zero and the peaks move inward. At the second, the curvature at the center changes sign and the two peaks merge.

## Method

Each agent holds a continuous opinion $s\in[-1,1]$. In the minimal model, a neighbor with opinion $s'$ contributes drift $\lambda(s'-s)$, and opinion diffusion decreases to zero at the boundaries. Ties form at rate $\gamma_+(s,s')/N$ and dissolve at rate $\gamma_-(s,s')$, where $N$ is the number of agents. Opinion similarity affects how long two agents remain exposed to one another.

When ties adjust much faster than opinions, the stationary density of linked opinion pairs $Q(s,s')$ satisfies $Q(s,s')/[P(s)P(s')]=\gamma_+(s,s')/\gamma_-(s,s')$. This connects two observables. The ratio measures the excess of links between particular opinions after accounting for how common they are. Averaging that ratio over potential neighbors' opinions gives expected degree at a given opinion.

## Experiments

The authors examine mean political-leaning scores for the 500 most-shared Facebook domains, divided into hard and soft content, and for 1,490 political blogs with 19,090 references. The hard-content and blog distributions are U-shaped, and the soft-content distribution is highest near neutrality. Links between similarly leaning blogs are overrepresented, and blogs near either extreme generally have higher mean degree (Fig. 2).

In the symmetric minimal model, $g=(\lambda/\sigma_0^2)(r_+/r_-)$ combines the strength of neighbor influence relative to opinion noise with the baseline edge birth-to-death ratio. With homophily parameters fixed at $J_+=0.7$ and $J_-=-0.8$, the peaks leave the endpoints near $g=1.3$ and merge at zero near $g=1.78$ (Fig. 3). The intervening M-shaped distribution is a model prediction. The fitted empirical cases occupy the two outer phases (Fig. 4).

## Limitations

The analytical solution assumes a separation of tie and opinion timescales, and the three-phase diagram assumes a symmetric opinion distribution. The empirical scores describe domains and blogs. They provide a comparison of distribution shapes, while individual opinion changes and tie turnover are modeled processes. The model also misses a small degree peak among politically neutral blogs.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]] supplies the neighbor-influence rule that couples individual opinion change to the network.
- [[concepts/echo-chambers|Echo Chambers]] connects selective ties to the excess of links between similarly leaning blogs.
- [[concepts/political-polarization|Political Polarization]] includes the separation of political leanings measured here by the locations of the density peaks.

## Related Papers

- [[papers/emergence-of-polarized-ideological-opinions-in-multidimensional-topic-spaces|Emergence of Polarized Ideological Opinions in Multidimensional Topic Spaces]] studies how reinforcement and homophilic contact align positions across several issues. Liu and colleagues cite it as a precursor and study stationary peak locations on a single opinion axis.
- [[papers/generic-absorbing-transition-in-coevolution-dynamics|Generic Absorbing Transition in Coevolution Dynamics]] studies how homophilic rewiring and binary opinion copying can freeze a network into disconnected components. The continuous-opinion model here characterizes polarization through a stationary density while ties continue to change.
