---
title: Partial-Step Expectation-Maximization
type: concept
aliases:
  - Partial-step EM
  - Partial E-step EM
tags:
  - expectation-maximization
  - stochastic-optimization
  - convergence-acceleration
  - large-scale-estimation
---

## Overview

Partial-step expectation-maximization replaces some full-data E-steps with expectations computed on data subsets and updates parameters after each subset. More frequent, cheaper updates can accelerate late-stage estimation when a full E-step dominates runtime. The subset estimates are noisy, so practical schemes need a transition rule, update damping or gain control, and a stabilization mechanism such as iterate averaging.

## Key Ideas

- **Sequential rather than fork-and-join updates:** Each subset's E-step is followed by a parameter update that affects how the next subset is processed. This differs from computing subset statistics in parallel and aggregating them before one global M-step.
- **Full-data warm start:** Full-data EM can efficiently traverse the early, steep part of the objective surface. Switching to partial steps near the optimum reserves subset processing for the phase in which full-data updates become expensive relative to their progress.
- **Generalized M-steps:** A partial update need only improve the expected complete-data objective rather than maximize it exactly. Newton-style updates can use subset gradients and Hessians with a fixed damping factor.
- **Noise control:** Smaller subsets reduce per-update work but increase variability. Running averages can estimate the center of iterates that fluctuate near the optimum, while delayed averaging avoids mixing in the initial trend.
- **Problem structure governs speedup:** Subsetting is most useful when full-data sufficient-statistic computation is large. If response-pattern compression already makes the full E-step cheap, subset creation and stochastic variability can increase runtime.
- **Uncertainty requires additional accounting:** Score outer products can be accumulated over disjoint subsets to approximate the observed information, but point-estimate convergence alone does not establish accurate standard errors.

## Important Papers

- [[papers/a-modified-expectation-maximization-algorithm-for-accelerated-item-response-theory-model-estimation-with-large-datasets|A Modified Expectation-Maximization Algorithm for Accelerated Item Response Theory Model Estimation with Large Datasets]]: combines a full-data warm start, sequential partial E-steps, damped Newton updates, iterate averaging, and incremental cross-product information for unidimensional 2PL estimation.
- Neal and Hinton (1998), "A View of the EM Algorithm That Justifies Incremental, Sparse, and Other Variants": develops a variational view supporting incremental EM updates.
- Cappe and Moulines (2009), "Online EM Algorithm for Latent Data Models": develops online stochastic-approximation EM with weighted sufficient-statistic updates.
- Thiesson, Meek, and Heckerman (2001), "Accelerating EM for Large Databases": an early large-database partial-update approach cited by Feng and Cai.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: a latent-variable setting in which large E-steps motivate partial updates.
- [[concepts/mixed-stochastic-approximation-em|Mixed Stochastic Approximation EM]]: uses stochastic approximation and conditional expectations, but is not identical to sequential fixed-step partial E-step estimation.
