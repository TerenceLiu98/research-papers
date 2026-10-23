---
title: Event-Level Extreme Time Series Generation
type: concept
aliases:
  - Extreme-Event Time Series Generation
tags:
  - time-series-generation
  - extreme-events
  - controllable-generation
---

## Overview

Event-level extreme time series generation aims to reproduce the temporal organization of extreme intervals as well as their values. A realistic generator must capture when events occur, how long they persist, how intense they become, and how their shapes relate to the surrounding signal. Matching a marginal tail distribution alone does not determine these properties.

## Key Ideas

- **Define the event unit.** Threshold exceedances or lower-tail crossings can be grouped into contiguous intervals. A short-gap tolerance can avoid fragmenting one event, but thresholds and merging rules change the target event distribution and must be specified.
- **Represent structure explicitly.** Location and duration, peak and prominence, deviation energy, and sparse temporal keypoints describe complementary event properties. They offer interpretable control variables, although compressed keypoints may miss fine detail.
- **Condition on context.** Event timing and shape can depend on background temporal patterns. Predicting semantics from each emerging sample preserves this dependence more directly than independently drawing event descriptions from an empirical distribution.
- **Time the intervention.** In E4GEN, background structure stabilizes before localized extremes fully emerge during diffusion. Diagnostics and validation select a late control window. This is an empirical design premise whose suitability can vary by dataset and denoiser.
- **Separate fidelity dimensions.** Compare event counts and distributions of durations, means, and peaks alongside pooled extreme values and event snippets. A pooled-value distance cannot by itself measure temporal ordering. Train-on-generated, test-on-real prediction or reconstruction adds a utility check but does not establish physical realism.
- **Distinguish training labels from generated semantics.** E4GEN learns from real-data event labels attached to partially denoised states, then predicts semantics on noise-initiated trajectories. The resulting distribution shift requires explicit assumptions and empirical checks.

## Important Papers

- [[papers/e4gen-event-level-explainable-extreme-enhanced-time-series-generation|E4GEN: Event-level Explainable Extreme-Enhanced Time-series Generation]]: develops structured event semantics, activation-step selection, contextual semantic prediction, and gated diffusion control; evaluates six short univariate benchmarks.
- Galib, Tan, and Luo (2024), "FIDE: Frequency-Inflated Conditional Diffusion Model for Extreme-Aware Time Series Generation": a contrasting approach using frequency enhancement and block-maximum conditioning, described in E4GEN's related work.
- Pandey et al. (2025), "Heavy-Tailed Diffusion Models": a contrasting value-distribution approach; E4GEN evaluates its own Student-t-noise adaptation rather than an official time-series implementation.

## Related Concepts

- [[concepts/diffusion-models|Diffusion Models]]: iterative denoising provides intermediate states and injection sites for event control.
- [[concepts/continuous-time-series-generation|Continuous Time Series Generation]]: addresses flexible temporal resolution, a separate objective from preserving extreme-event structure on a fixed grid.
