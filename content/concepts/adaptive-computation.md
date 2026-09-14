---
title: Adaptive Computation
type: concept
aliases:
  - Adaptive Compute
tags:
  - adaptive-computation
  - recurrent-neural-networks
  - inference-efficiency
---

## Overview

Adaptive computation varies the amount of model processing across inputs. In recurrent architectures, internal iterations can refine a prediction independently of how many elements the input contains. A deployment rule decides when the available prediction is sufficient to stop.

## Key Ideas

- Early-exit classifiers and learned halting mechanisms are approaches to allocating computation. CTM's related work distinguishes these from selecting predictions using certainty across internal ticks.
- In [[papers/continuous-thought-machines|Continuous Thought Machines]], training averages losses at an example's minimum-loss and maximum-certainty ticks. Certainty is one minus normalized entropy. This objective permits useful predictions at different times without a separate halting module or a direct computation penalty.
- Ground-truth-dependent minimum loss is available during training; inference must use an observable criterion such as prediction certainty. A certainty threshold and maximum tick budget define an operational stopping rule.
- The CTM ImageNet analysis suggests that a threshold of 0.8 could stop most examples before 10 of 50 ticks. Fewer ticks alone do not establish wall-clock savings because per-tick cost, feature extraction, and execution overhead also matter.
- Additional computation can hurt an individual prediction. Calibration and the choice between instantaneous, most-certain, and averaged predictions must be assessed with the intended stopping procedure.

## Important Papers

- Graves (2016), "Adaptive computation time for recurrent neural networks": explicit adaptive computation in recurrent models, cited as reference 18 in CTM.
- Banino, Balaguer, and Blundell (2021), "Pondernet: Learning to ponder": learned halting, cited as reference 17 in CTM.
- [[papers/continuous-thought-machines|Continuous Thought Machines]]: internal dynamics and certainty-based prediction selection, with ImageNet early-stopping analysis (Sections 3.5 and 5.1; Appendix E.3).

## Related Concepts

- [[concepts/neural-synchronization-representations|Neural Synchronization Representations]]: CTM uses temporal pairwise activity to construct predictions and attention queries across internal ticks.
