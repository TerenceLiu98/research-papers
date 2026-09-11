---
title: Bistability and Hysteresis
type: concept
tags:
  - nonlinear-dynamics
  - critical-transitions
  - path-dependence
---

## Overview

Bistability is the coexistence of two stable states under the same parameter values. When gradual parameter changes cause a system to follow one stable branch until it loses stability, forward and reverse transitions can occur at different thresholds. This equilibrium mechanism produces hysteresis: current conditions alone do not determine the observed state, because the system's history and basin of attraction also matter.

## Key Ideas

- **Coexisting attractors.** Within a bistable interval, initial conditions or sufficiently large disturbances can determine which stable state is reached. An unstable equilibrium can separate their basins.
- **Different switching thresholds.** Reversing a control parameter to its value before a transition may leave the system on its new stable branch. Restoration can require a larger parameter change or a perturbation across the basin boundary.
- **Physical admissibility.** Algebraic equilibrium roots must lie in the model's allowed state space. A formal bifurcation outside a population simplex does not establish realizable coexistence.
- **LLM adoption example.** In [[papers/large-language-models-as-a-cognitive-virus|Large-Language Models as a Cognitive Virus]], collective restoration strength $\kappa$ and baseline return rate $\rho$ permit physical bistability only for $\kappa>\rho$. Transmission thresholds are $2\sqrt{\kappa\rho}$ and $\rho+\kappa$, with width $(\sqrt{\kappa}-\sqrt{\rho})^2$. These expressions belong to that model, not to bistable systems in general.
- **Equilibrium versus timing.** A discontinuity between equilibrium branches does not determine how rapidly an observed transition unfolds. This mechanism also differs from [[concepts/dynamic-hysteresis|Dynamic Hysteresis]], where finite relaxation time under periodic driving can create loops even without static bistability.

## Important Papers

- [[papers/large-language-models-as-a-cognitive-virus|Large-Language Models as a Cognitive Virus]]: derives distinct prevention and reversal thresholds for a model of LLM coupling and dependence.

## Related Concepts

- [[concepts/dynamic-hysteresis|Dynamic Hysteresis]]: response lag under time-dependent forcing, which must be distinguished from coexistence of equilibrium attractors.
- [[concepts/cognitive-offloading|Cognitive Offloading]]: the application domain of the adoption example; losses of competence require additional assumptions beyond the bifurcation structure.
