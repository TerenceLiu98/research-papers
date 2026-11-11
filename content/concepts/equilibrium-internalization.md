---
title: Equilibrium Internalization
type: concept
tags:
  - equilibrium-models
  - latent-reasoning
  - inference-efficiency
---

## Overview

Equilibrium internalization is the observed tendency of a predictor trained through equilibrium refinement to produce an initial proposal close to the refined solution. Iterative computation shapes training, while the learned proposal can require little additional refinement at inference.

## Key Ideas

- A backbone proposal and its refined equilibrium occupy the same decodable output-embedding space. This enables direct comparison of backbone-only and refined predictions.
- Persistent proposal conditioning lets the equilibrium loss train the backbone through the refinement map. In Attractor Models, no separate distillation loss is required.
- Declining solver iterations and strong zero-step readout provide complementary evidence. A low residual alone does not establish accurate predictions.
- The moving-teacher interpretation is a proposed explanation for the empirical behavior, not a general theorem that equilibrium training eliminates recurrence.
- Solver removal must be tested for each architecture and task. Evidence from a language-model backbone does not automatically transfer to a backbone-free puzzle reasoner.

## Important Papers

- [[papers/solve-the-loop-attractor-models-for-language-and-reasoning|Solve the Loop: Attractor Models for Language and Reasoning]] names the phenomenon and reports near-converged backbone-only predictions across three language-model scales (Section 4.3).

## Related Concepts

- [[concepts/cyclic-fixed-points-in-looped-transformers|Cyclic Fixed Points in Looped Transformers]] describes convergence of recurrent dynamics; internalization additionally concerns the learned initial proposal.
- [[concepts/adaptive-computation|Adaptive Computation]] concerns how inference effort is allocated and stopped.
- [[concepts/latent-reasoning|Latent Reasoning]] places refinement in continuous representations.
