---
title: Consensus and diversity in multistate noisy voter models
type: paper
authors:
  - Francisco Herrerías-Azcué
  - Tobias Galla
year: 2019
doi: 10.1103/PhysRevE.100.022304
source_job_id: 7e46e810-c0fe-4366-8ed3-ca17ae9fc42c
tags:
  - opinion-dynamics
  - stochastic-processes
  - noise-induced-transitions
---

## TL;DR

A multistate [[concepts/noisy-voter-model|Noisy Voter Model]] switches between consensus-dominated and diverse regimes as population size changes. Lumping all other opinions together gives exact single-opinion stationary marginals for homogeneous rates and an approximation for heterogeneous rates. Two boundary thresholds replace the binary model's single flat-distribution criterion; consensus-switching times are shortest at intermediate mutation rates.

## Research Question

How do multiple opinions and unequal imitation or mutation rates change finite-population consensus, stationary diversity, and switching between consensus states?

## Motivation

Spontaneous changes remove the absorbing consensus states of the [[concepts/voter-model|Voter Model]]. With more than two opinions, single-opinion marginals need not be symmetric or become flat at a transition, so binary-state diagnostics do not directly generalize.

## Contributions

- Derives a discrete birth-death reduction with exact homogeneous stationary marginals, without requiring a diffusion approximation.
- Characterizes marginal shape using separate extinction-side and consensus-side thresholds.
- Extends the reduction approximately to heterogeneous rates using deterministic fixed-point averages.
- Estimates switching times from first-passage calculations and tests the theory using Gillespie simulations.

## Method

There are $N$ individuals and $m$ opinions with all-to-all interactions. The population rate for conversion from $j$ to $i$ is

$$
T_{j\to i}(\mathbf n)=r_{ji}\frac{n_i n_j}{N}+\varepsilon_{ji}n_j.
$$

For homogeneous imitation rate $r$ and per-destination mutation rate $\varepsilon$, the count $n$ of one opinion has exact rates (Section IV)

$$
T^+(n)=r\frac{n(N-n)}N+\varepsilon(N-n),\qquad
T^-(n)=r\frac{n(N-n)}N+(m-1)\varepsilon n.
$$

Its stationary law satisfies $P(n)\propto\prod_{k=1}^{n}T^+(k-1)/T^-(k)$, with normalization over $0,\ldots,N$. The conditions $P(0)=P(1)$ and $P(N-1)=P(N)$ define $N_L$ and $N_R$. At small $\varepsilon/r$,

$$
N_L\approx r/\varepsilon,\qquad N_R\approx r/[(m-1)\varepsilon].
$$

Small populations below $N_R$ have two boundary peaks in each marginal; intermediate populations have monotonically decreasing marginals; above $N_L$, marginals peak in the interior. For $m=2$, the thresholds coincide at $r/\varepsilon$.

For heterogeneous rates, the other opinions' weighted rates depend on the full population state. Replacing these averages with values at the deterministic fixed point closes an approximate single-opinion process (Section V; Appendix B extends to pair-dependent rates).

A switching event is an arrival at a consensus different from the last consensus visited; returning to the same consensus does not count. Single-opinion hitting times from zero to $N$ follow birth-death formulas. Combining them as independent constant-rate clocks is an additional approximation, even when homogeneous marginal dynamics are exact. In the homogeneous case it gives $\tau\approx t^{0\to N}/(m-1)$.

## Experiments

Evidence consists of analytical calculations and Gillespie simulations, without empirical voter data.

- Figure 3 compares homogeneous stationary marginals for $m=2$ and $5$, $N=50$ through $900$, $r=1$, and total mutation rate $(m-1)\varepsilon=0.01$. Simulations agree with the exact marginals.
- Figure 4 checks the two transition boundaries while varying the number of opinions, comparing discrete theory and diffusion approximations.
- Figure 5 uses $N=100$ and $r=1$ to show a minimum in switching time at intermediate mutation rates: weak mutation delays departure from consensus, whereas strong mutation makes consensus visits rare.
- Figures 6–7 examine heterogeneous rates, including $m=5$, a relative spread $\delta=0.05$, and population sizes $50$, $250$, and $900$. Boundary thresholds become opinion-specific; simulations support the predicted changes of marginal shape.
- Figure 8 finds that heterogeneous hitting-time estimates capture qualitative shape and opinion ordering but are not quantitatively accurate. Stronger opinions, with smaller outgoing imitation and mutation rates, reach consensus more quickly.

## Limitations

The reduction assumes all-to-all interaction and does not recover inter-opinion correlations. Heterogeneous closure and the independent-clock switching approximation are distinct sources of error. Numerical tests emphasize modest heterogeneity because strong dominance makes stationary distributions and switching times difficult to sample.

The supplied text's description of Figure 4(b) contains an inconsistent sentence about which threshold varies with $m$. The equations and subsequent rate argument imply that, at fixed total mutation rate, $N_L$ grows approximately with $m-1$ while $N_R$ is approximately constant. The formulas above retain the distinction between per-destination and total mutation rates.

## Related Concepts

- [[concepts/noisy-voter-model|Noisy Voter Model]]: spontaneous changes sustain a stationary distribution and permit repeated consensus switching.
- [[concepts/voter-model|Voter Model]]: the underlying copying mechanism, generalized to multiple states.

## Related Papers

- [[papers/partisan-voter-model-stochastic-description-and-noise-induced-transitions|Partisan Voter Model: Stochastic description and noise-induced transitions]]: a library comparison using fixed binary preferences rather than multiple opinion types to change stationary modality.
- Granovsky and Madras (1995), “The noisy voter model”: foundational noisy-voter work cited by the source.
- Houchmandzadeh and Vallade (2015), “Exact results for a noise-induced bistable system”: cited discrete two-state analysis underlying the switching-time generalization.
