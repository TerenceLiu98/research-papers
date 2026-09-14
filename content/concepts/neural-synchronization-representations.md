---
title: Neural Synchronization Representations
type: concept
aliases:
  - Synchronization as a Latent Representation
tags:
  - neural-dynamics
  - representation-learning
  - recurrent-neural-networks
---

## Overview

Neural synchronization representations encode relationships between neurons' activity histories for use in prediction or input selection. In [[papers/continuous-thought-machines|Continuous Thought Machines]], the representation consists of weighted temporal inner products of selected neuron pairs. Temporal interactions therefore directly drive outputs and attention queries.

## Key Ideas

- Each neuron has a private model of its rolling pre-activation history. A shared recurrent network couples these neurons, producing evolving post-activation traces over internal ticks.
- Pairwise history products expose temporal relationships that a single activation snapshot does not explicitly contain. CTM's quantity is an uncentered weighted inner product, not a Pearson correlation or a direct measurement of biological phase locking.
- Learned exponential decay rates allow each pair to emphasize recent activity or retain a longer history. Output and attention representations use selected pairs, avoiding the full quadratic matrix.
- A decayed numerator accumulator and a normalization accumulator permit constant work per pair per tick during forward computation. This bounds synchronization storage independently of trace length while leaving other memory and training requirements intact.
- Maze ablations support combining private neuron models with synchronization: adding synchronization to an LSTM or removing either CTM component performs worse in the reported setting. This is task-specific empirical evidence, not a general theorem.
- Activity plots can reveal learned dynamics, but interpreting those dynamics as particular cognitive mechanisms requires additional evidence.

## Important Papers

- [[papers/continuous-thought-machines|Continuous Thought Machines]]: defines synchronization-based attention and prediction, efficient recursive updates, and component ablations (Sections 3.3-3.4; Appendices G.3 and H).
- Reichert and Serre (2013), "Neuronal synchrony in complex-valued deep networks": prior work discussed in CTM's related work for emergent synchronization and grouping rather than direct synchronization-based output representations.

## Related Concepts

- [[concepts/adaptive-computation|Adaptive Computation]]: CTM's dynamics support prediction at multiple internal ticks, enabling certainty-based stopping.
