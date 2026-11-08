---
title: "LeWAM: End-to-End World and Action Modeling with JEPAs"
type: paper
authors:
  - Minghao Fu
  - Tavis Siebert
  - Eryk Halicki
  - Randall Balestriero
year: null
tags:
  - world-models
  - joint-embedding-predictive-architectures
  - flow-matching
  - visual-control
  - robot-learning
---

## TL;DR

LeWAM jointly trains a visual encoder, action-conditioned latent dynamics, and a flow-matching policy in one reconstruction-free JEPA. Its policy supplies direct actions and learned proposals that are refined through the latent dynamics for planning. Across ten simulated goal-reaching tasks it reports 93.5% mean success versus 50.9% for LeWM with CEM; across four 100-step tasks it reports 46.2% versus 10.9%, while averaging 32.3 times more planner calls per second. Physical-robot results are competitive rather than dominant: end-to-end LeWAM succeeds on 33.3% of trials, compared with 38.9% for Diffusion Policy and 28.9% for $\pi_{0.5}$.

## Research Question

Can a reconstruction-free [[concepts/joint-embedding-predictive-architectures|JEPA]] learn visual representations, action-conditioned dynamics, and a stochastic policy jointly, then use the same model for direct control and efficient test-time planning?

## Motivation

Latent [[concepts/world-models|World Models]] often learn representations and dynamics before attaching a policy or a broad-prior solver such as CEM. That separation leaves action supervision unable to shape the visual encoder, and broad action search becomes expensive as horizons and action dimensions grow. Contact transitions further make useful action sequences sparse and locally discontinuous. LeWAM instead learns a conditional action distribution alongside dynamics so that planning begins from behaviorally plausible proposals.

## Contributions

- A single approximately 16.9M-parameter model that jointly optimizes next-latent-state regression, action [[concepts/flow-matching|Flow Matching]], and SIGReg over a shared visual representation.
- A Mixture-of-Transformers predictor whose masked attention lets the dynamics branch read clean actions while the policy branch reads noisy causal action prefixes, history latents, and optional goal context without clean-action leakage.
- A planner that samples action sequences from the learned policy, rolls their consequences forward through latent dynamics, and refines each sequence by gradient descent on latent goal distance.
- Evaluation across ten simulated environments, longer-horizon planning, behavior cloning, three physical-robot tasks, representation probes, visual rollout diagnostics, and component ablations.

## Method

**Joint training.** A shared encoder maps image observations to 192-dimensional latents in the simulation model. The dynamics branch predicts the latent five environment steps ahead from two history latents and five clean actions. The policy branch uses conditional flow matching to map Gaussian noise to a ten-action chunk, conditioned on latent history and, for visual planning, a goal latent and normalized remaining horizon. Both branches occupy a four-block Mixture-of-Transformers with modality-specific projections and one masked self-attention operation.

The full loss adds mean-squared latent prediction, mean-squared action-velocity prediction, and SIGReg with weight 0.04. SIGReg encourages an isotropic Gaussian marginal latent distribution; it does not itself ensure that representations retain action-relevant temporal information.

**Direct control and planning.** Direct control integrates the learned action vector field and executes the first five actions of the sampled chunk. Planning alternates policy sampling with latent dynamics to form a population of candidate plans. Adam then updates normalized actions through the frozen dynamics to minimize terminal latent distance to the goal plus a small penalty for moving away from the sampled proposal. The lowest unpenalized-cost iterate is executed under receding-horizon replanning.

## Experiments

**Visual goal reaching.** The benchmark covers ten navigation and manipulation environments with action dimensions from 2 to 24 and datasets ranging from random interactions to expert demonstrations. LeWAM averages 93.5% success, versus 50.9% for LeWM with CEM, and exceeds that baseline on every task. Reported contact-rich gains include 94.7% versus 35.4% on ToolHang and 83.3% versus 2.8% on Transport. On four 100-step goal offsets, mean success is 46.2% versus 10.9% for LeWM.

**Planner efficiency.** Across Push-T, Cube, Scene, and Puzzle, LeWAM averages 52.50 planner calls per second versus 1.62 for the 300-by-30 CEM configuration, a 32.3x ratio on an H100. This comparison measures the specified planner configurations, not architecture-independent solver complexity. Push-T sensitivity experiments show no consistent benefit beyond eight sampled candidates, and success plateaus after five refinement steps while latency continues rising.

**Ablations and diagnostics.** On four goal-conditioned tasks, the end-to-end encoder averages 86.7% direct-control success versus 79.0% for frozen DINOv2 CLS features and 75.8% for frozen patch means. On Push-T, removing SIGReg reduces planning success from 97.3% to 72.0% at epoch 30. Flow-based proposals usually yield larger planning gains than the noisy deterministic MSE head, although the MSE variant has a larger planning gain on Cube and its planning reduces Puzzle success by 2.0 percentage points. A two-route navigation experiment shows the flow head using both demonstrated routes while the MSE head concentrates on one and sometimes collides.

Removing LeWAM's policy head and planning with CEM isolates its learned dynamics: it scores 84.0% on Push-T versus LeWM's 92.4%, but 86.0% on Cube versus 63.8%. Linear probes generally find more decodable proprioceptive and action information than LeWM, while LeWM has higher object-state probe scores on Push-T and Puzzle and ties LeWAM on Cube in the reported tables.

**Behavior cloning and robots.** On DrawerCleanup, Transport, and ToolHang, LeWAM averages 64.7% task completion versus 61.6% for Diffusion Policy, with per-task reversals in both directions. Across 90 physical trials, end-to-end LeWAM averages 33.3% success, the frozen V-JEPA 2.1 variant 35.6%, Diffusion Policy 38.9%, and $\pi_{0.5}$ 28.9%. LeWAM uses 270.2 GFLOPs per action chunk versus 3603.6 for $\pi_{0.5}$ under the authors' operation-count convention.

## Limitations

- Models are trained or adapted separately for each task and embodiment; the experiments do not establish multitask, cross-robot, or language-conditioned generalization.
- Offline data are limited-scale mixtures of expert, non-expert, and task-focused demonstrations. Coverage of unfamiliar objects, views, behaviors, and contact states remains untested.
- Physical evaluation covers three tasks and 30 trials per method per task. LeWAM is competitive but does not outperform Diffusion Policy on average.
- Planning still depends on candidate population size and iterative refinement. Larger models, datasets, populations, and refinement budgets are proposed rather than evaluated.
- The argument that learned proposals resolve contact-rich search is mechanistic and heuristic; the paper explicitly leaves rigorous verification for future work.
- The supplied manuscript identifies project website and code links only through corrupted extraction symbols, so no stable URL or paper identifier is recorded here.
- The supplied manuscript does not explicitly state its publication year or venue; the year is therefore left unspecified.

## Related Concepts

- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]
- [[concepts/world-models|World Models]]
- [[concepts/flow-matching|Flow Matching]]

## Related Papers

- Maes et al. (2026), "LeWorldModel: Stable End-to-End Joint-Embedding Predictive Architecture from Pixels": the principal latent-dynamics baseline and source of the SIGReg-based end-to-end recipe.
- [[papers/flow-jepa-robust-latent-dynamics-for-jepa-world-models-via-flow-matching|Flow-JEPA: Robust Latent Dynamics for JEPA World Models via Flow Matching]]: applies flow matching to future latent trajectories, whereas LeWAM uses it for the action policy and retains regression-based latent dynamics.
- [[papers/h-jepa-end-to-end-learning-of-hierarchical-world-models-for-visual-planning|H-JEPA: End-to-End Learning of Hierarchical World Models for Visual Planning]]: studies temporal hierarchy and inverse-dynamics supervision in reconstruction-free visual planning.
- Zhou et al. (2024), "DINO-WM: World Models on Pretrained Visual Features Enable Zero-Shot Planning": a frozen-feature world-model baseline using CEM.
- Chi et al. (2023), "Diffusion Policy: Visuomotor Policy Learning via Action Diffusion": the behavior-cloning comparator in simulation and physical-robot experiments.

Source: supplied parsed manuscript, Cognitio job `582fc17c-1229-4a68-9250-8bb51460b9fa`.

[[index|Library home]]
