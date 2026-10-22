---
title: Continuous-Time Poisson Change-Point Detection
type: concept
aliases:
  - Poisson process segmentation
  - Continuous-time event segmentation
tags:
  - change-point-detection
  - poisson-processes
  - point-processes
  - dynamic-programming
---

## Overview

Continuous-time Poisson change-point detection partitions an event stream into intervals with different constant arrival intensities. Unlike binned count segmentation, it works directly with event times. The central computational difficulty is that candidate boundaries range over continuous time while the likelihood changes discontinuously when a boundary crosses an event.

## Key Ideas

- **Event times define a sufficient optimization grid under suitable contrasts.** If a segmentation contrast is additive over segments and strictly concave in each segment duration, its minimum within every inter-event cell lies on the boundary. Candidate change-points can therefore be restricted to event times and their left limits.
- **Dynamic programming gives exact fixed-dimension segmentation.** Once the continuous problem is reduced to a finite grid, segment additivity permits an $O(n^2K)$ dynamic program for $n$ events and $K$ segments.
- **Likelihood regularization prevents collapsed segments.** Unregularized Poisson maximum likelihood can isolate one event inside a zero-length interval. Integrating segment intensities under Gamma distributions yields a finite Poisson-Gamma contrast and posterior-mean intensity estimates.
- **Poisson thinning enables held-out model selection.** Independent random assignment of events produces independent learning and test Poisson processes with proportional intensities and shared change-points. This supports cross-validation over the number of segments without removing observation times from a fixed discrete grid.
- **Extensions require their own structural assumptions.** Marks can contribute a second segment-additive likelihood term. A self-exciting process can be reduced to this problem by time rescaling only when regime changes have a compatible multiplicative form.

## Important Papers

- [[papers/multiple-change-point-detection-for-poisson-processes|Multiple Change-Point Detection for Poisson Processes]]: proves the finite-grid reduction, introduces the Poisson-Gamma contrast and thinning-based cross-validation, and develops marked-Poisson and piecewise-Hawkes extensions.
- Yan and Kuo (2001), "Bayesian binary segmentation procedure for a Poisson process with multiple change points": earlier continuous-time Poisson work cited for the concavity observation in the single-change setting.
- Fromont, Grela, and Le Guevel (2023), "Minimax and adaptive tests for detecting abrupt and possibly transitory changes in a Poisson process": a testing-based alternative cited by the paper.

## Related Concepts

- [[concepts/dynamic-hawkes-processes|Dynamic Hawkes Processes]]: another use of time transformation in Hawkes modeling, but with learned temporal responsiveness rather than piecewise multiplicative regimes.
- [[concepts/synchronization-noise-in-temporal-point-processes|Synchronization Noise in Temporal Point Processes]]: concerns observation-time distortion rather than changes in the underlying event intensity.
