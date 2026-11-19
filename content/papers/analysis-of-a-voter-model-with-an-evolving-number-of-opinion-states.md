---
title: Analysis of a voter model with an evolving number of opinion states
type: paper
authors:
  - Jeehye Choi
  - Byungjoon Min
  - Tobias Galla
year: 2025
doi: 10.1103/382x-g9xk
source_job_id: 7c981978-e66b-45c8-a940-e3d3714b96fe
tags:
  - opinion-dynamics
  - stochastic-processes
  - network-science
---

## TL;DR

When agents copy neighbors and occasionally invent an opinion nobody currently holds, even unanimous populations eventually leave consensus. On a complete graph, consensus is frequent when copying usually eliminates a new minority before the next innovation arrives. At the same innovation rate, simulations on more heterogeneous scale-free networks sustain fewer distinct opinions.

## Research Question

How many opinions coexist when imitation can eliminate the last holder of an opinion and innovation can introduce a new one? How do population size and network structure affect the answer?

## Motivation

A fixed set of opinion labels lets agents switch among alternatives specified in advance. Allowing an agent to introduce an absent opinion makes the number of represented alternatives an outcome of the dynamics. A population can then maintain a stable distribution of opinion counts even as individual opinions disappear.

## Contributions

- By mapping neutral copying and innovation to reproduction and mutation in a model of mating types, the authors obtain the stationary distribution of the number of opinions $M$ on a complete graph. Its value at $M=1$ gives the fraction of time spent in consensus.
- Two scales distinguish frequent consensus from occasional returns and from effectively unobserved consensus. Starting with a single dissenter, copying alone takes about $\log N$ generations on average to restore unanimity. The mean wait for innovation is $1/(\alpha N)$ generations. The two waits match at $\alpha N \approx 1/\log N$, where the mean opinion count is about two. By $\alpha N \gtrsim 1$, consensus is practically absent in the simulations.
- For a complete graph, the predicted stationary fraction of links joining agents with different opinions is $\rho^*=\alpha(N-1)/[1+\alpha(N-1)]$. This pairwise measure gives greater weight to widely held opinions than a count that weights each distinct opinion equally.

## Method

At each microscopic step, a uniformly selected agent copies a uniformly selected neighbor. Then, with probability $\alpha$, an independently selected agent adopts an opinion absent from the population. If the innovator was the sole holder of the previous opinion, the opinion count stays the same. One generation consists of $N$ microscopic steps.

The authors model the number of holders of one opinion as a birth-death process and condition on at least one holder to estimate the size distribution $Q(s)$ of opinions present. They separately count how copying and innovation change the number of disagreeing pairs to derive the active-link density.

## Experiments

Complete-graph simulations with $N=4096$ agree with predictions for the opinion count and size distributions (Figs. 2–3). Among small opinion groups, $Q(s)$ decays approximately as $1/s$. For $\alpha N<1$, peaks at one holder and at $N$ holders reflect the prevalence of singletons and visits to unanimity. Above the crossover near $\alpha N=1$, only the singleton peak remains.

At $N=4096$, Erdős–Rényi graphs with mean degrees 2, 4, and 8 show similar mean opinion counts to the complete graph. On scale-free configuration-model networks, decreasing the degree exponent from 3 to 2 reduces the mean count at a given innovation rate (Fig. 7). The authors attribute this to shorter copying-driven consensus times on networks with more heterogeneous degrees.

## Limitations

The stationary formulas concern all-to-all interaction. The random-network comparison uses simulations at one population size. Agents share an innovation probability, and their ties remain fixed. The study tests the predictions against simulated opinion turnover, leaving their fit to observed human opinion histories open.

## Related Concepts

- [[concepts/voter-model|Voter Model]] supplies the neutral copying rule and the consensus time against which innovation is measured.
- In the [[concepts/noisy-voter-model|Noisy Voter Model]], spontaneous switching can select an already represented opinion. Restricting innovation to absent opinions changes how such events contribute to diversity.

## Related Papers

- [[papers/consensus-and-diversity-in-multistate-noisy-voter-models|Consensus and diversity in multistate noisy voter models]] also tracks one opinion by grouping all other states together. Its fixed repertoire provides a comparison for the present paper's distribution of sizes among surviving opinions.
