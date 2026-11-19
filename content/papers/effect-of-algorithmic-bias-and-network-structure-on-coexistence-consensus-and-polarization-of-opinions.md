---
title: Effect of algorithmic bias and network structure on coexistence, consensus, and polarization of opinions
type: paper
authors:
  - Antonio F. Peralta
  - Matteo Neri
  - János Kertész
  - Gerardo Iñiguez
year: 2021
journal: Physical Review E
doi: 10.1103/PhysRevE.104.044312
tags:
  - opinion-dynamics
  - content-filtering
  - network-polarization
---

## TL;DR

Hiding disagreeing neighbors can stabilize opposite majorities in two loosely connected communities when people copy one neighbor at a time. When switching requires a visible majority, the same filter makes an opposing majority harder to see. Spontaneous changes then carry more weight, and strong filtering can restore coexistence within communities.

## Research Question

How do the rule for changing an opinion and the density of ties between communities determine whether selective exposure produces consensus, coexistence, or polarization?

## Motivation

A population split evenly between two opinions could have two internally mixed communities or two communities that agree internally and oppose each other. Tracking the opinion share in each community distinguishes these outcomes even when the population-wide share is identical.

## Contributions

Peralta and colleagues derive a way to apply the same exposure filter to different binary opinion models. For pairwise copying, filtering can stabilize a shared majority in a homogeneous network or opposing majorities in a modular one. Under majority voting, opposing majorities can already persist without filtering. Strong bias can destabilize them or support a partially polarized state in which one community has a clear majority and the other stays mixed.

## Method

At each update, the filter independently hides each neighbor who disagrees with the focal individual with probability $b$. Agreeing neighbors stay visible and the underlying ties persist. If $m$ neighbors disagree, the visible number of dissenters follows a binomial distribution with parameters $m$ and $1-b$. Averaging the original switching rate over this distribution gives the effective switching rate under filtering (Section II.B).

The authors compare noisy voter dynamics, majority voting, and a language-competition model whose switching rate depends on a power of the visible fraction of dissenters. Varying the exponent changes how much support an opposing opinion needs to induce a switch. Mean-field equations track opinion shares in two communities. Stability analysis identifies which states persist after a small perturbation as noise, filtering, and between-community connectivity vary.

## Experiments

On synthetic modular networks, finite connectivity narrows the range of parameters supporting polarization relative to the dense-network prediction. For the language-competition model with exponent 2 on regular modular networks, transition estimates from the pair approximation fall within simulation error bars. The approximation loses accuracy on very sparse networks and for majority voting under strong filtering (Section V.A).

The authors also simulate noisy voter dynamics on the hyperlink network of 973 US political blogs from the 2004 election. At noise $Q=0.01$ and filtering probability $b=0.8$, mean-field theory predicts a stable state with opinion-1 shares of 0.09 among liberal blogs and 0.92 among conservative blogs, or the complementary state with the opinions reversed. Simulations initialized in the corresponding basin converge close to the prediction. The overall share in the first state is 0.54, concealing the division between communities (Figure 8).

## Limitations

The blog data supply ties and community labels. The filtering probabilities and opinion changes are simulated, so the comparison tests the dynamical approximation on an observed network. Estimating an effect on actual opinions would require exposure and behavioral data. The analysis also holds ties fixed and applies the same filtering probability to both opinions.

## Related Concepts

- [[concepts/noisy-voter-model|Noisy Voter Model]] supplies the pairwise copying rule and spontaneous opinion changes.
- [[concepts/echo-chambers|Echo Chambers]] describes an exposure pattern that filtering can produce even when cross-community ties persist.
- [[concepts/opinion-dynamics|Opinion Dynamics]] connects the individual switching rule to community-level outcomes.

## Related Papers

[[papers/modeling-echo-chambers-and-polarization-dynamics-in-social-networks|Modeling Echo Chambers and Polarization Dynamics in Social Networks]] studies selective exposure through a different mechanism. Agents preferentially choose like-minded contacts over time, and repeated contact can strengthen conviction on a continuous opinion scale.
