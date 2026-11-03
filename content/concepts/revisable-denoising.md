---
title: Revisable Denoising
type: concept
aliases:
  - Cross-Horizon Revision
tags:
  - diffusion-models
  - sequence-modeling
  - robot-learning
---

## Overview

Revisable denoising generates a sequence while allowing partially resolved regions to return to higher noise and be refined again. In contrast to a single monotonic denoising pass, selective re-noising keeps early and late horizon regions able to influence one another as additional context becomes available. The idea is useful when premature commitment in one region can make the full sequence inconsistent.

## Key Ideas

- **Revision is represented by noise-level transitions.** A token or region can denoise, remain unchanged, or move back to a higher noise level. Re-noised regions receive another opportunity to change rather than being treated as fixed context.
- **Per-token schedules control information flow.** Building on [[concepts/diffusion-forcing|Diffusion Forcing]], a schedule matrix assigns different denoising states across the horizon. Forward, backward, and endpoint-conditioned waves determine which resolved regions condition each revision.
- **Training must match structured deployment states.** Diffusion ReRoll trains on randomized piecewise-linear chunks of token noise levels. Its ablations indicate that a revision schedule alone is insufficient when the model was trained only with independently sampled token noise.
- **Revision has a confidence and cost tradeoff.** Resetting too early supplies weak context; resetting too late revisits an almost deterministic prediction. Additional resets can broaden revision but increase sampler updates, so the reset level and event count are deployment choices rather than universally optimal constants.
- **Revisability does not guarantee improvement.** It is most plausible when distant horizon regions carry useful mutual constraints. The reported RoboCasa and delayed-action results show weaker gains when tasks are atomic or actions have already been committed.

## Important Papers

- [[papers/diffusion-reroll-revisable-denoising-for-robotic-sequential-prediction|Diffusion ReRoll: Revisable Denoising for Robotic Sequential Prediction]] introduces selective ReRoll events, linear-chunk training, and programmable forward and bidirectional schedule matrices.
- Chen et al. (2024), "Diffusion Forcing: Next-Token Prediction Meets Full-Sequence Diffusion," provides the per-token noise-level interface used to express nonuniform sequence schedules.
- Lugmayr et al. (2022), "RePaint: Inpainting Using Denoising Diffusion Probabilistic Models," is a related use of repeated noising and denoising for image inpainting rather than cross-horizon robotic sequence revision.

## Related Concepts

- [[concepts/diffusion-forcing|Diffusion Forcing]]: represents different sequence elements at different noise levels.
- [[concepts/diffusion-models|Diffusion Models]]: supply the forward corruption and reverse denoising operations.
- [[concepts/hierarchical-diffusion-planning|Hierarchical Diffusion Planning]]: improves long-horizon generation through explicit temporal decomposition instead of revisiting virtual schedule regions.
- [[concepts/world-models|World Models]]: can use revisable joint schedules to coordinate predicted actions and future observations.
