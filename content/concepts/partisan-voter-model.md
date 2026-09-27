---
title: Partisan Voter Model
type: concept
aliases:
  - PVM
  - Noisy Partisan Voter Model
  - NPVM
tags:
  - voter-model
  - opinion-dynamics
  - stochastic-processes
  - finite-size-effects
---

## Overview

The partisan voter model extends the [[concepts/voter-model|Voter Model]] by giving each agent a fixed preference distinct from its current binary state. Imitation favors changes toward that preference and suppresses changes away from it. The noisy extension adds spontaneous flips, combining preference-dependent imitation with the independent changes of the [[concepts/noisy-voter-model|Noisy Voter Model]].

## Key Ideas

- **Preference is not current opinion.** Agents can temporarily hold a state they do not prefer. In the homogeneous version, adoption probabilities are $(1+\varepsilon)/2$ toward the preferred state and $(1-\varepsilon)/2$ away from it, conditional on selecting a disagreeing neighbor.
- **Preference balance controls deterministic coexistence.** On a complete graph without spontaneous flips, a fraction $q$ preferring $+1$ yields stable interior coexistence when $(1-\varepsilon)/2<q<(1+\varepsilon)/2$. Outside this interval, the favored consensus is stable. Here $q$ is a preference fraction, not the response exponent of the [[concepts/q-voter-model|Q-Voter Model]].
- **Finite coexistence can be metastable.** For $0<\varepsilon<1$, a finite complete graph eventually reaches an absorbing consensus even when the deterministic equations favor coexistence. Consensus times grow exponentially with population size in the interior coexistence regime. A quasi-stationary distribution describes the population conditional on not yet reaching consensus.
- **Order of limits matters.** Taking infinite population size before infinite observation time can preserve coexistence; taking infinite time first yields absorption. A persistent balanced trajectory does not establish permanent coexistence in a finite system.
- **Spontaneous flips change the stationary law.** Positive independent noise removes absorption. Balanced preferences can produce three stationary peaks, with a discontinuous switch from boundary-dominant to center-dominant probability followed by the loss of boundary peaks. Preference imbalance allows additional asymmetric regimes and continuous shifts of the dominant mode.
- **Distributional transitions differ from deterministic bifurcations.** In the noisy complete-graph analysis, multiple stationary peaks coexist with one stable deterministic fixed point. The additional noisy regimes disappear at fixed positive noise as population size tends to infinity. Small-preference adiabatic reductions require particular caution when estimating consensus times.

## Important Papers

- [[papers/partisan-voter-model-stochastic-description-and-noise-induced-transitions|Partisan Voter Model: Stochastic description and noise-induced transitions]]: analyzes exit probabilities, fixation times, quasi-stationarity, and finite-size transitions with spontaneous flips.
- Masuda, Gibert, and Redner (2010), "Heterogeneous voter models": earlier work identified by the stochastic-analysis paper.
- Masuda and Redner (2011), "Can partisan voting lead to truth?": earlier partisan-model analysis cited there.

## Related Concepts

- [[concepts/voter-model|Voter Model]]
- [[concepts/noisy-voter-model|Noisy Voter Model]]
- [[concepts/opinion-dynamics|Opinion Dynamics]]
- [[concepts/q-voter-model|Q-Voter Model]]
