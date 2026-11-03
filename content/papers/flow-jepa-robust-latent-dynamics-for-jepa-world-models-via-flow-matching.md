---
title: "Flow-JEPA: Robust Latent Dynamics for JEPA World Models via Flow Matching"
type: paper
authors:
  - Yanchen Huo
  - Ziying Song
  - Yadan Luo
year: null
code: https://github.com/HuoYanchen/Flow-JEPA
tags:
  - world-models
  - joint-embedding-predictive-architectures
  - flow-matching
  - latent-dynamics
  - model-predictive-control
---

## TL;DR

Flow-JEPA replaces one-step autoregressive latent regression in a reconstruction-free JEPA world model with conditional flow matching over an entire future latent trajectory. Across four control environments, it raises mean planning success from 86% to 92% under clean observations and from 67% to 86% under localized background noise relative to LeWorldModel. The evidence shows a robust empirical difference between the tested formulations, but does not isolate joint trajectory prediction from stochastic flow training; inference also requires multiple vector-field evaluations.

## Research Question

Does jointly evolving a future latent trajectory with a conditional vector field make a JEPA world model's latent-space planning more robust than recursively applying a deterministic one-step transition model?

## Motivation

[[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]] avoid pixel reconstruction and can regularize encoder representations against collapse, but these properties do not guarantee robust action-conditioned dynamics. In the tested LeWorldModel baseline, adding task-irrelevant Gaussian noise to background pixels lowers mean planning success from 86% to 67%. Recursive prediction can propagate early latent errors through a rollout, while one-step regression directly supervises only observed transitions rather than perturbed intermediate latent states.

## Contributions

- Formulates JEPA latent dynamics as conditional flow matching over a complete future trajectory rather than autoregressive one-step prediction.
- Separates the role of SIGReg, which regularizes the encoder's marginal embedding distribution, from flow matching, which trains the dynamics predictor on stochastic source-target interpolation states.
- Evaluates clean and perturbed planning on Two-Room, Reacher, Push-T, and OGBench-Cube, with sweeps over perturbation radius, noise magnitude, flow integration steps, and CEM iterations.
- Quantifies the inference trade-off: flow integration is slower per planning cycle, although the measured end-to-end rollout gap is smaller because F-JEPA replans fewer times in the reported Two-Room comparison.

## Method

**Trajectory-level flow objective.** A visual encoder maps the current observation and the next five observations to 192-dimensional latent states. Five aligned action blocks, each containing five low-level actions, are encoded to the same dimension. The clean target is the complete future trajectory $Z=[z_{t+1},\ldots,z_{t+5}]$. A Gaussian source trajectory $Z_0$ is linearly interpolated with that target as $Z_\tau=(1-\tau)Z_0+\tau Z$, where $\tau\sim U[0,1]$. The predictor learns the displacement $Z-Z_0$ while conditioning on $Z_\tau$, flow time, the current latent $z_t$, and the encoded action sequence:

$$
\mathcal L_{\mathrm{FM}}=
\mathbb E\left[\left\|v_\theta(Z_\tau,\tau,z_t,E^a)-(Z-Z_0)\right\|^2\right].
$$

SIGReg is applied to current and future observation embeddings to discourage representation collapse, yielding $\mathcal L=\mathcal L_{\mathrm{FM}}+\lambda_{\mathrm{SIG}}\mathcal L_{\mathrm{SIG}}$. Thus, Gaussian embedding regularization and the Gaussian flow source serve different parts of the model.

**Architecture and inference.** The visual encoder is a ViT-Tiny with $14\times14$ patches. A six-block Transformer predicts the vector field over all future tokens; sinusoidal flow-time embeddings enter through adaptive layer normalization, and the current latent plus action embeddings provide cross-attention context. Action conditioning is temporally causal even when future-token self-attention is bidirectional. At inference, explicit Euler integration transports a sampled source trajectory to the predicted future latents. The main experiments use eight flow steps.

**Planning.** Model-predictive control uses the cross-entropy method (CEM) to optimize five action blocks. Each refinement evaluates 300 candidate sequences and retains the best 30; the terminal predicted latent determines planning cost. The selected five-block sequence is executed before replanning.

## Experiments

**Protocol.** Evaluation covers Two-Room navigation, Reacher control, Push-T manipulation, and OGBench-Cube manipulation. Success is measured over 50 rollouts per condition. The main perturbation adds spatially localized Gaussian RGB noise in task-irrelevant background regions while leaving the physical state unchanged. LeWM is the direct robustness baseline because results under this new perturbation are unavailable for PLDM and DINO-WM.

| Condition | Method | Two-Room | Reacher | Push-T | OGBench-Cube | Mean |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Clean | LeWM | 87 | 86 | 96 | 74 | 86 |
| Clean | F-JEPA | 100 | 90 | 96 | 82 | 92 |
| Noisy | LeWM | 76 | 74 | 58 | 58 | 67 |
| Noisy | F-JEPA | 96 | 90 | 90 | 66 | 86 |

F-JEPA improves noisy-condition success in every environment, by 8 to 32 percentage points. Mean success falls by 19 points from clean to noisy for LeWM and by 6 points for F-JEPA. Under clean observations, F-JEPA matches or exceeds LeWM in all four tasks.

**Stress tests.** On Reacher, F-JEPA exceeds LeWM at every tested Gaussian-patch radius and noise standard deviation. Across the other environments, it matches or exceeds LeWM at every tested radius; across noise magnitudes, the only reported reversal is OGBench-Cube at standard deviation 150, where F-JEPA scores 60% and LeWM 62%. Eight Euler steps give the strongest or tied-strongest overall performance; additional steps increase runtime without consistent control gains. On Push-T, F-JEPA remains at 96% clean success across 10, 20, and 30 CEM iterations and scores 90%, 88%, and 84% under noise, versus LeWM's 60%, 56%, and 58%.

**Inference cost.** In the matched 10-iteration Two-Room comparison, a vector-field step takes 5.0 ms and a LeWM prediction takes 2.1 ms. Eight flow steps make an F-JEPA planning cycle 400 ms, versus 105 ms for five autoregressive predictions, a 3.8x difference. Over 50 complete rollouts, reported times are 34.4 s and 21.7 s, respectively, a 1.6x difference attributed to fewer replanning cycles for F-JEPA.

## Limitations

- The comparison does not disentangle joint trajectory prediction, stochastic flow-path supervision, and their interaction. It therefore supports the tested formulation as a whole, not a causal claim about which component produces robustness.
- Evaluation is limited to four relatively short-horizon tasks and primarily localized Gaussian background perturbations. It does not establish robustness to broader distribution shifts or longer rollouts.
- The selected configurations vary by environment. Two tasks use a standard Gaussian source and bidirectional future-token attention, while two use a state-centered source and causal attention. Reacher and Push-T initialize from autoregressive checkpoints, and Push-T freezes the initialized visual encoder and projector.
- The main Push-T comparison uses 10 CEM iterations for F-JEPA and the baseline's original 30 iterations, although the matched-budget sweep still favors F-JEPA under noise.
- Flow inference is iterative and substantially slower per planning cycle. The proposed longer-horizon computational advantage is a hypothesis rather than an evaluated result.
- Results use 50 rollouts per setting, but the supplied manuscript reports neither uncertainty intervals nor variation across training seeds.
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier; these metadata remain unspecified.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: trains the conditional trajectory-level vector field from Gaussian source-target interpolations.
- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]: provide the reconstruction-free representation-prediction framework used by F-JEPA.
- [[concepts/world-models|World Models]]: learn action-conditioned future representations for planning.

## Related Papers

- Maes et al. (2026), "LeWorldModel: Stable End-to-End Joint-Embedding Predictive Architecture from Pixels": the autoregressive JEPA baseline and source of the SIGReg-based encoder recipe.
- [[papers/nano-world-models-a-minimalist-implementation-of-future-video-prediction|Nano World Models: A Minimalist Implementation of Future Video Prediction]]: compares objectives and latent spaces under a modular future-prediction interface and highlights that representation choice alone does not guarantee action-sensitive planning.
- [[papers/jedi-joint-embedding-diffusion-world-model-for-online-model-based-reinforcement-learning|JEDI: Joint Embedding Diffusion World Model for Online Model-Based Reinforcement Learning]]: another stochastic latent-dynamics formulation within a JEPA-style world model, using diffusion and online actor-critic learning rather than trajectory-level flow matching and MPC.
- [[papers/h-jepa-end-to-end-learning-of-hierarchical-world-models-for-visual-planning|H-JEPA: End-to-End Learning of Hierarchical World Models for Visual Planning]]: studies temporal abstraction and the distinction between non-collapsed representations and action-relevant dynamics.
- [[papers/when-does-lejepa-learn-a-world-model|When Does LeJEPA Learn a World Model?]]: formalizes representation recovery under Gaussian regularization and separates encoder identifiability from correct learned dynamics and planning.

Source: supplied parsed manuscript, Cognitio job `a4433e7d-7c9d-44c9-a4f7-18f90ac84107`.

[[index|Library home]]
