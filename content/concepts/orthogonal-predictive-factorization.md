---
title: Orthogonal Predictive Factorization
type: concept
aliases:
  - OPF
tags:
  - latent-prediction
  - representation-learning
  - world-models
---

## Overview

Orthogonal predictive factorization divides a learned latent target into complementary subspaces, trains a predictor for each subspace, and recombines their outputs into a complete latent state. Introduced in JEPA-Anything, it organizes predictive capacity within [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]] while retaining an explicit synthesis map for state transitions and planning.

## Key Ideas

**Analysis, prediction, synthesis.** For a target $z\in\mathbb R^d$, learned blocks $P_k\in\mathbb R^{d\times r}$ satisfy $Kr=d$. Each factor target is $u_k=P_k^\top\operatorname{sg}(z)$ and has a dedicated predictor. With $P=[P_1,\ldots,P_K]$, the complete prediction is

$$
\widehat z=(P^\top)^\dagger[\widehat u_1;\ldots;\widehat u_K].
$$

**Complementary capacity.** Within-block penalties encourage orthonormal columns; cross-block penalties discourage repeated directions. Under exact orthogonality, the blocks form a full orthogonal decomposition, synthesis becomes $P\widehat u$, and factor-error norm is preserved. Multiple unconstrained heads can instead produce incomplete or poorly conditioned coordinates.

**Approximate stability.** If $\|P^\top P-I\|_2\leq\epsilon<1$, the matrix is invertible and synthesis amplifies a factor error $e$ by at most $1/\sqrt{1-\epsilon}$. This controls the coordinate transformation, not the accuracy of learned dynamics or accumulated rollout error. Pseudoinverse synthesis with exact coordinates is unbiased whenever this square matrix is invertible; transpose synthesis requires orthogonality for the same identity.

**Activity is separate from geometry.** Orthogonal bases alone do not ensure varying representations. JEPA-Anything adds a variance floor on projected targets to train projectors and a separate floor on online-encoder outputs to send anti-collapse gradients to the encoder. Factor regression and these regularizers supplement each application's inherited base objective.

**Two uses of the trained representation.** A downstream readout can use only the online encoder. Recursive prediction retains the projectors and predictors, and scientific diagnostics inspect factor coordinates. Good probe performance, good synthesis conditioning, and successful closed-loop control are distinct evidence.

**No automatic semantic identification.** Geometrically orthogonal subspaces can still contain statistically dependent or semantically mixed information. Factor activity, linear readout, and masking help characterize functional use, but do not prove [[concepts/disentangled-representations|Disentangled Representations]] or causal mechanisms. A shared objective across domains also does not imply aligned latent spaces.

## Important Papers

- [[papers/jepa-anything-learning-predictive-models-across-different-worlds|JEPA-Anything: Learning Predictive Models across Different Worlds]] introduces OPF, proves exact and approximate synthesis bounds, and tests representation readout, dynamics, planning, and scientific diagnostics across seven domains. Reported predictive gains coexist with a negative Hopper planning result.

## Related Concepts

- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]] supply the context/target latent-prediction framework.
- [[concepts/world-models|World Models]] use synthesized states for repeated transitions or planning.
- [[concepts/disentangled-representations|Disentangled Representations]] concern alignment with generative factors, a stronger and different property than orthogonal target subspaces.
