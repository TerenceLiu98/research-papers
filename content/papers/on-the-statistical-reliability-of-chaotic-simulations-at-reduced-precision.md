---
title: On the Statistical Reliability of Chaotic Simulations at Reduced Precision
type: paper
authors:
  - Ross Ah-Weng
  - Peter Coveney
year: 2026
tags:
  - numerical-analysis
  - chaotic-dynamics
  - reduced-precision
---

## TL;DR

Finite-precision chaotic simulations can converge toward incorrect statistics as trajectories merge or enter artificial trapping sets. Exhaustive experiments on four maps show that shorter averages can substantially outperform the computer's infinite-time average; stochastic rounding helps in some regimes but does not guarantee statistical reliability.

## Research Question

How do floating-point precision, rounding rules, and averaging duration affect the statistical accuracy of chaotic simulations, even when individual arithmetic operations are locally accurate?

## Motivation

Ergodic guarantees for continuum dynamics do not automatically apply to the finite set of representable computer states. Longer trajectories can reduce sampling uncertainty while increasing systematic distributional bias. Reduced precision makes assessing this trade-off particularly relevant.

## Contributions

- Represents deterministic computer dynamics as functional graphs and stochastic rounding as finite Markov chains, connecting mergers and closed classes to statistical bias.
- Establishes a nondecreasing lower bound on distributional error, a necessary upper limit on accurate averaging duration, and an upper bound separating relaxation, initial representation error, and arithmetic defects.
- Exhaustively evaluates four chaotic maps across 24 significand precisions, comparing ensemble distributions without Monte Carlo sampling uncertainty.

## Method

Round-to-nearest produces a graph with one outgoing edge per state; each component feeds a periodic cycle. Stochastic rounding instead produces probabilistic transitions and closed communicating classes. The limiting Cesàro distribution weights these invariant components according to the initial ensemble and entry probabilities, creating possible initialization dependence absent from the intended continuum equilibrium.

Statistical discrepancy is measured by Wasserstein-1 distance, an [[concepts/optimal-transport|Optimal Transport]] metric equal to the largest expected bias over unit-Lipschitz observables. For target measure μ and computer invariant set S∞, the paper constructs a nondecreasing error floor converging to the mean distance from μ to S∞. A separate bound uses the expected first-entry time into S∞ to constrain how long an average can stay below a tolerance smaller than this limiting floor. This is a necessary horizon bound, not a guarantee that earlier averages are accurate.

The experiments enumerate representable states in [0,1] using MPFR/GMP, with 1–24 significand bits and fixed exponent settings. The 24-bit case matches FP32; 11- and 4-bit cases match FP16 and FP8 E4M3 significand precision but retain additional states near zero. Each rounded elementary operation is modeled. Stochastic-rounding outcomes outside [0,1] are clamped to the boundaries. Transition probabilities and diagnostics use FP64.

## Experiments

The benchmarks are the logistic map 4x(1−x), the doubling map, and generalized Bernoulli maps with multipliers equal to the golden ratio and 4/3. Projected invariant and projected uniform initial laws are propagated for 10,000 updates; a separate equal-state law measures effective occupation.

| Finding | Reported result |
| --- | --- |
| Rapid state loss | Logistic round-to-nearest at 24 bits removes over 99.9% of initially reachable states within 100 updates. |
| Earlier statistical drift | From the projected invariant law, logistic round-to-nearest first reaches projected-reference Wasserstein error 0.01 after 381, 12, and 2 updates at 24, 11, and 4 bits. |
| Finite-time advantage | From projected uniform initialization, logistic round-to-nearest at 24 bits attains its best recorded error, approximately 4.78 × 10⁻⁴, after 95 updates, versus limiting error 0.09687. |
| Nonmonotone precision effect | Logistic round-to-nearest limiting error is 0.01636 at 23 bits but 0.09686 at 24 bits in the invariant-initialization experiment. |
| Conditional stochastic-rounding benefit | Both noninteger Bernoulli maps stay below 0.01 through the tested horizon at 24 bits under stochastic rounding; at 11 bits the golden-ratio and 4/3 cases cross after 214 and 580 updates. |
| Exact-arithmetic failure | Doubling reaches zero after at most 149 updates at every tested precision under either rounding rule. |

Reported numerical distances use the projected invariant reference; their difference from continuum-reference distances is bounded by 2⁻q. Independent short trajectories can reduce sampling uncertainty without extending all trajectories into increasingly biased regimes.

## Limitations

The numerical evidence concerns one-dimensional maps with known invariant densities, not direct experiments on atmospheric or molecular simulations. Operation order, exponent range, parameter representation, and boundary clamping affect the implemented dynamics. Lower significand settings are not full emulations of FP16 or FP8 formats. The global-Lipschitz assumption of the finite-time upper bound restricts its applicability, and the bound may be conservative. A rising lower bound does not imply that actual error increases monotonically. Stochastic rounding and higher precision offer no universal ordering of statistical accuracy; practical averaging horizons remain problem dependent.

## Related Concepts

- [[concepts/finite-precision-statistical-bias|Finite-Precision Statistical Bias]]: the central mechanism linking finite computer states to erroneous long-run statistics.
- [[concepts/optimal-transport|Optimal Transport]]: Wasserstein-1 translates distributional discrepancy into worst-case Lipschitz-observable bias.

## Related Papers

- Boghosian, Coveney, and Wang (2019), *A New Pathology in the Simulation of Chaotic Dynamical Systems on Digital Computers*: cited antecedent on finite-state pathologies.
- Guihéneuf and Monge (2024), *Cramér distance and discretizations of circle expanding maps II: Simulations*: cited work on discretization and statistical inference.
- Connolly, Higham, and Mary (2021), *Stochastic Rounding and Its Probabilistic Backward Error Analysis*: arithmetic-error background for the stochastic rounding comparison.
