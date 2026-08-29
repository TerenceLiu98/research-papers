---
title: "Polarization-induced stress in the noisy voter model"
type: paper
authors:
  - Miguel Aguilar-Janita
  - Andres Blanco-Alonso
  - Nagi Khalil
year: 2024
doi: "10.1016/j.physa.2024.129840"
arxiv: "2402.00516"
journal: "Physica A: Statistical Mechanics and its Applications"
tags:
  - noisy-voter-model
  - opinion-dynamics
  - sociophysics
  - phase-transitions
  - finite-size-effects
---

## TL;DR

This paper makes the intrinsic-change rate of the [[Noisy Voter Model]] depend on the current balance between two opinions. Positive feedback from this balance produces a finite-population W-shaped stationary distribution, while negative feedback produces an M-shaped distribution with two interior modes. Exact master-equation analysis and Gillespie simulations identify four phases; only the unimodal and M phases remain in the thermodynamic limit.

## Research Question

How robust is the linear noisy voter model when its intrinsic opinion-change mechanism responds to the population's current degree of polarization, and which stationary-distribution phases and transitions result from positive or negative responses?

## Motivation

The standard noisy voter model combines imitation with spontaneous opinion changes. In a well-mixed finite population, their competition produces bimodal stationary behavior near the two consensus states or unimodal behavior near equal coexistence. Many extensions modify the imitation mechanism, but this paper instead asks what happens when the intrinsic mechanism is state dependent.

The modification has both mathematical and social interpretations. Mathematically, it tests the robustness of the model's linear noise term. Socially, it represents agents who react to a more evenly divided population either by becoming more willing to change independently or by suppressing that tendency in favor of imitation. The paper uses the fraction of unlike pairs as its polarization measure, so this interpretation concerns balance between binary states rather than a direct empirical measure of ideological or affective polarization.

## Contributions

- Adds a polarization-dependent term to the intrinsic transition rate while preserving symmetry between the two opinions and leaving the linear herding term unchanged.
- Derives the exact recurrence and symmetry of the finite-population stationary distribution from the master equation.
- Identifies two phases beyond the standard unimodal and bimodal cases: a W phase with maxima at both consensus states and equal coexistence, and an M phase with two interior maxima.
- Obtains analytical critical lines from changes in the stationary distribution at coexistence and at the consensus boundaries.
- Shows that maxima and minima move between adjacent discrete states as parameters change, excluding discontinuous jumps in their locations under smooth parameter changes.
- Separates finite-size transitions from the thermodynamic transition: the bimodal and W phases disappear as population size grows, leaving the unimodal and M phases.
- Compares the analytical phase diagram and large-population order parameter with Gillespie simulations and checks the thermodynamic transition using the Binder cumulant.

## Method

The model has `N` well-mixed agents with binary states. Its macroscopic state is `n`, the number of agents in state 1. The transition rates for increasing or decreasing `n` are

$$
\pi^+(n)=(N-n)\left[a+4b\frac{n(N-n)}{N^2}+h\frac{n}{N}\right],
$$

$$
\pi^-(n)=n\left[a+4b\frac{n(N-n)}{N^2}+h\frac{N-n}{N}\right].
$$

Here `a` is the baseline intrinsic-change rate, `h` is the herding rate, and `b` controls the response to the unlike-pair fraction. Positive `b` strengthens intrinsic changes as the population approaches equal coexistence; negative `b` weakens them. Setting `b=0` recovers the noisy voter model, and additionally setting `a=0` recovers the voter model.

The authors restrict the parameters so both rates remain positive. Otherwise, replacing negative rates by zero creates absorbing regions or points. Under positive rates, the birth-death master equation has a unique stationary distribution satisfying

$$
P(n)=\frac{\pi^+(n-1)}{\pi^-(n)}P(n-1),
$$

with reflection symmetry `P(N-n)=P(n)`. Phase boundaries occur when the distribution changes curvature or monotonicity at equal coexistence and the consensus boundaries. The corresponding exact finite-`N` critical lines are

$$
b=\frac{N^2}{N^2-2N-4}\left(\frac{h}{N}-a\right)
$$

and

$$
b=\frac{N^2}{4}\left(a-\frac{h}{N}\right).
$$

For large populations, the magnitude of an off-center extremum is approximated by

$$
|m_0|\simeq\sqrt{\frac{a+b-h/N}{b}},
\qquad m=\frac{2n}{N}-1.
$$

The theoretical analysis is compared with continuous-time Gillespie simulations. A phase-detection procedure checks the behavior near the distribution's boundaries and fits a quadratic near its center. The authors also use the Binder cumulant of `m` to locate the continuous large-population transition.

## Experiments

The study is theoretical and computational and uses no empirical opinion data. The illustrative stationary distributions and simulated phase diagram use `N=50`; each reported simulation runs for $10^8$ Gillespie steps. The numerical phase map largely agrees with the two analytical critical lines. The authors attribute small discrepancies to finite sampling and to the local boundary and quadratic-fit criteria used by the phase detector.

For finite `N`, four stationary shapes appear. In the bimodal phase, probability is greatest at the two consensus states; in the unimodal phase, it is greatest at equal coexistence. With `b>0`, the W phase combines maxima at both consensus boundaries with a central maximum separated by two minima. With `b<0`, the M phase instead has minima at the boundaries and center, with two symmetric maxima at imperfect-coexistence states.

As `N` increases, the bimodal and W regions shrink and the standard noisy-voter critical point `(a/h, b/h)=(1/N,0)` approaches the origin. In the thermodynamic limit, only the unimodal and M phases survive, separated by `a+b=0`. The paper therefore classifies transitions involving the bimodal or W phase as finite-size effects. Binder-cumulant curves for different system sizes cross near the analytical infinite-population boundary, supporting a continuous unimodal-to-M transition. The order-parameter approximation also gives a qualitatively good account of the simulated extrema for `N=50`.

## Limitations

The model assumes a binary, well-mixed population, so the single count `n` fully specifies its state. Network topology, heterogeneous agents, more than two opinions, memory, and empirically grounded behavioral responses are outside the analysis. The polarization term measures the fraction of unlike pairs and is maximal at a 50-50 split; this is a stylized system-state measure, not a validated measure of political polarization or stress.

The negative-response regime is constrained by the requirement that all transition rates remain positive. The numerical validation uses finite simulations and a deliberately simple phase-classification algorithm, which the authors note produces small discrepancies near analytical boundaries. The study reports that data are available on request and does not provide an empirical calibration of `a`, `b`, or `h`.

## Related Concepts

- [[Noisy Voter Model]]
- [[Opinion Dynamics]]
- [[Political Polarization]]
- Finite-size scaling
- Birth-death processes
- Binder cumulant

## Related Papers

- [[Stochastic Thermodynamics of Social Imitation beyond Energetics]]
- Peralta, Carro, San Miguel, and Toral (2018), "Analytical and numerical study of the non-linear noisy voter model on complex networks."
- Caligiuri and Galla (2023), "Noisy voter models in switching environments."
- Llabrés, San Miguel, and Toral (2023), "Partisan voter model: Stochastic description and noise-induced transitions."
- Carro, Toral, and San Miguel (2016), "The noisy voter model on complex networks."

[[index|Library home]]
