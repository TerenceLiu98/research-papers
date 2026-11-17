---
title: Information Propagation in Multilayer Systems with Higher-Order Interactions across Timescales
type: paper
authors:
  - Giorgio Nicoletti
  - Daniel Maria Busiello
year: 2024
doi: 10.1103/PhysRevX.14.021007
journal: Physical Review X
tags:
  - complex-systems
  - information-theory
  - stochastic-processes
---

## TL;DR

In the strong timescale-separation limit, slow regulation generates statistical dependence between layers, while fast-to-slow influences alone do not generate equal-time mutual information. A factorization of the joint distribution identifies which paths can propagate dependence and distinguishes signaling circuits with similar average responses.

## Research Question

How do the timescales and topology of interlayer regulation determine statistical dependence in multilayer stochastic systems?

## Motivation

A causal influence need not produce equal-time dependence, and disconnected processes can share information through a common environment. Understanding functional coupling therefore requires both interaction structure and temporal ordering.

## Contributions

- Derives a hierarchical factorization of the joint distribution for strongly separated layer timescales (Section III; Appendix C).
- Identifies distinct roles for slow-to-fast feedback and fast-to-slow direct interactions, including a graph criterion for information propagation.
- Introduces the mutual information matrix for multiscale observables (MIMMO) and illustrates its use in environmental modulation and biochemical signaling.

## Method

Each layer supports a stochastic process. Triadic regulation lets the state of one layer modify transition rates within another, without transitions between layers. Order characteristic times as $\tau_1<\cdots<\tau_N$. In the separation limit, recursively average over faster variables to obtain effective generators and their conditional stationary distributions:

$$
p(x_1,\ldots,x_N;t)=p_N^{\mathrm{eff}}(x_N;t)\prod_{\mu=1}^{N-1}p_{\mu\mid\rho(\mu)}^{\mathrm{st,eff}}.
$$

The conditioning set $\rho(\mu)$ contains slower layers connected by a feedback edge or a minimal propagation path. Such a path contains at least one fast-to-slow edge and survives removal of every layer slower than the destination except the source. This is a structural criterion, not a shortest-path criterion.

MIMMO collects $I_{\mu\nu}=\sum p_{\mu\nu}\log_2[p_{\mu\nu}/(p_\mu p_\nu)]$. It is symmetric; the directional interpretation comes from the model and timescale hierarchy, not from mutual information itself. Direct interactions can propagate slow-source dependence through faster intermediate layers, but cannot independently create it in this limit.

## Experiments

These are analytical examples and stochastic simulations, not empirical biological experiments.

- **Two binary layers (Figure 1):** exact master-equation solutions and Gillespie simulations show mutual information vanishing when the regulator is much faster than its target and saturating at a nonzero value when it is much slower.
- **Five binary layers (Figure 3):** simulated joint probabilities approach the factorized solution; the authors report good agreement already with adjacent timescales separated by one order of magnitude.
- **Three- and four-layer motifs (Figure 4):** changing the placement of direct links changes which pairs share information, in agreement with the minimal propagation path criterion.
- **Shared environment (Figure 5):** two disconnected components become marginally dependent under slow common modulation despite conditional independence given the environment. The illustrated strong-coupling limit reaches the environment's entropy.
- **Signaling circuits (Figure 6):** receptor, storage, and readout populations have maxima 15, 10, and 20. Both architectures show declining readout responses under repeated stimulation. Storage inhibition of the readout yields zero receptor–storage mutual information in the analyzed limit; inhibition of the receptor yields nonzero information across all pairs.

## Limitations

The exact factorization concerns the timescale-separation limit; finite-separation agreement is demonstrated on selected examples. The interaction topology determines allowed conditional dependencies, while numerical information values still depend on dynamics and parameters. Applying MIMMO to observations requires accurate temporal data and reliable identification of characteristic timescales. Equal-time mutual information does not by itself establish causal direction.

The supplied Markdown contains inconsistent ratio directions in some passages. The summary uses the explicit fast/slow ordering and describes the numerical separation in words rather than reproducing those inconsistent ratios.

## Related Concepts

- [[concepts/timescale-separation-in-stochastic-systems|Timescale Separation in Stochastic Systems]]: recursive averaging provides the effective generators and conditional factorization.
- [[concepts/transfer-entropy|Transfer Entropy]]: a distinct, history-conditioned directional statistic; MIMMO measures equal-time dependence instead.

## Related Papers

- Nicoletti and Busiello (2021), “Mutual information disentangles interactions from changing environments,” Physical Review Letters 127, 228301: cited as prior work on dependence induced by a switching environment.
- Bo and Celani (2017), “Multiple-scale stochastic processes: Decimation, averaging and beyond,” Physics Reports 670, 1: cited background for stochastic timescale separation.
