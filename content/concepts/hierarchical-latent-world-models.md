---
title: Hierarchical Latent World Models
type: concept
tags:
  - world-models
  - hierarchical-planning
  - representation-learning
---

## Overview

Hierarchical latent world models predict environment transitions at several temporal resolutions. A hierarchy may reuse one state space across horizons or learn a separate representation at each level. In the latter case, coarse predictors can retain different information from fine predictors, and their imagined states can serve as subgoals for lower-level control.

## Key Ideas

- **Temporal and representational hierarchy are separate choices.** Shorter subproblems can reduce rollout length and action-search complexity even when all levels share a representation. Distinct upper-level spaces additionally change the geometry used to judge progress toward goals.
- **Subgoals require alignment.** A lower-level prediction must be mapped into the upper-level representation and matched at the corresponding time before it can be compared with an upper-level subgoal. H-JEPA implements this with compositional encoders and explicit temporal strides.
- **Predictability can induce abstraction.** Longer-horizon prediction may discard fast details while retaining slower variables. H-JEPA finds this in navigation environments with separated timescales, but not consistently in manipulation. Fast periodic motion can still be predictable, so temporal frequency alone does not establish what an encoder should discard.
- **Abstract costs can help without hierarchical search.** Projecting a fine-scale rollout into a higher representation can improve goal scoring even when no upper planner runs. H-JEPA's cost-only ablations isolate this effect from the additional benefit of subgoal decomposition.
- **Slow is not necessarily useful.** Episode-constant backgrounds are easy prediction targets. Marginally diverse embeddings can still ignore action-dependent motion; inverse-dynamics supervision provides one way to retain action-relevant information when action labels are available.
- **Depth interacts with data and evaluation.** Coarser levels need longer clips and temporally coherent trajectories. Planning success, planner compute, training cost, and offline path fidelity measure different properties and should be reported separately.

## Important Papers

- [[papers/h-jepa-end-to-end-learning-of-hierarchical-world-models-for-visual-planning|H-JEPA: End-to-End Learning of Hierarchical World Models for Visual Planning]] learns distinct action-conditioned latent spaces jointly and separates abstract-cost benefits from temporal decomposition.
- Zhang et al. (2026), "Hierarchical Planning with Latent World Models," is H-JEPA's shared-space hierarchical baseline (reference [92]).
- Saxena, Ba, and Hafner (2021), "Clockwork Variational Autoencoders," is discussed by H-JEPA as a hierarchy of latent video representations with reconstruction, rather than an action-conditioned planning model (reference [68]).

## Related Concepts

- [[concepts/world-models|World Models]] provide predictive transitions used by planners.
- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]] support latent prediction without reconstructing observations.
- [[concepts/slow-feature-analysis|Slow Feature Analysis]] connects temporal persistence with representation selection, including cases where persistence preserves irrelevant content.
- [[concepts/hierarchical-diffusion-planning|Hierarchical Diffusion Planning]] generates coarse and fine trajectories through diffusion, offering a different implementation of temporal decomposition.
