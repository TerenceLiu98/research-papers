---
title: Q-Voter Model
type: concept
tags:
  - voter-model
  - opinion-dynamics
  - interacting-particle-systems
---

## Overview

The q-voter model considered by Cox and Perkins is a binary spin-flip process whose rate of adopting the opposite state is $f^q$, where $f$ is the fraction of neighbours in that state. The parameter $q$ is a nonnegative real exponent. The model reduces to the [[Voter Model]] at $q=1$; at $q=0$, with $0^0$ defined as zero for this rate, it becomes the threshold voter model. Specific update rules matter when comparing papers using the q-voter name.

## Key Ideas

- For $0<q<1$, the factor $f^{q-1}$ increases the rate relative to neutral copying most strongly when the opposite type is locally rare. Both uniform configurations remain absorbing.
- For $q=1-\varepsilon$, the first-order correction is $\varepsilon f\log(1/f)$. On a finite neighbourhood, its set-valued version is strictly subadditive, giving positive drift in the two-dimensional [[Super-Brownian Motion]] limit.
- [[Complete Convergence with Coexistence]] is proved for $q<1$ sufficiently close to 1 on admissible lattice neighbourhoods of at most eight sites in dimensions two through four. The stationary coexistence law is symmetric with density $1/2$; convergence from configurations containing infinitely many sites of each type does not preserve their initial density.
- The bound on neighbourhood size arises from the cancellativity proof. The two-dimensional q-voter scaling limit itself holds for any admissible finite neighbourhood.
- At $q>1$, locally dominant types receive a relative advantage. In the source paper, takeover is a long-time expectation rather than a proved convergence theorem.
- Coexistence without spontaneous flips differs from the mechanism in the [[Noisy Voter Model]], where independent state changes remove absorbing consensus states.

## Important Papers

- [[A complete convergence theorem for the q-voter model and other voter model perturbations in two dimensions]]: proves perturbative complete convergence and a two-dimensional scaling limit.
- Agarwal, Simper, and Durrett (2021), "The q-voter model on the torus": earlier higher-dimensional perturbative analysis, as discussed by Cox and Perkins.

## Related Concepts

- [[Voter Model]]
- [[Complete Convergence with Coexistence]]
- [[Super-Brownian Motion]]
- [[Noisy Voter Model]]
- [[Opinion Dynamics]]
