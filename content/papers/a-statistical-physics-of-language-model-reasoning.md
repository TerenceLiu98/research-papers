---
title: A Statistical Physics of Language Model Reasoning
type: paper
authors:
  - Jack David Carson
  - Amir Reisizadeh
year: 2025
source_job_id: "698ff567-5b56-4cc1-b2ee-ef29f1a91932"
tags:
  - transformer-dynamics
  - reasoning
  - dynamical-systems
---

## TL;DR

The paper fits low-rank, regime-switching models to sentence-boundary language-model hidden states. A four-regime model reports one-step predictive $R^2$ of approximately 0.68 versus 0.51 for a global linear model; a separate three-regime case study models adversarial misinformation acceptance. These are surrogate models of representation dynamics, with limited cross-model transfer and unresolved reporting inconsistencies.

## Research Question

Can sentence-level reasoning trajectories be approximated by a tractable stochastic dynamical system with persistent latent regimes?

## Motivation

Individual attention heads and token updates do not directly summarize changes across extended reasoning chains. A coarse temporal representation could support inexpensive simulation and analysis of transitions between different reasoning behaviors.

## Contributions

- Proposes a continuous-time drift–diffusion interpretation of sentence-boundary hidden states.
- Uses rank-40 projection and multimodal residuals to motivate discrete latent regimes.
- Fits a switching linear surrogate and evaluates prediction, transfer, ablations, and adversarial belief shifts.

## Method

Final-layer residual states are extracted at sentence boundaries. Transitions with normalized jump norm at most 10 are filtered. PCA supplies a rank-40 basis, reported to retain about half the variance in the main corpus. A global ridge fit exposes multimodal residuals; Gaussian-mixture information criteria motivate four regimes.

The fitted [[concepts/switching-linear-dynamical-systems|Switching Linear Dynamical System]] combines a Markov regime sequence with regime-specific affine drift and Gaussian noise. Equation 8 expresses the update as

$$
h_{t+1}=h_t+V_k(M_{z_t}V_k^\top h_t+b_{z_t})+\varepsilon_t.
$$

Expectation-maximization alternates regime inference with weighted regression and covariance updates. The continuous-time switching SDE provides an interpretation; the fitted predictive surrogate is discrete. Regime names such as decomposition or failure loops are proposed interpretations rather than independently established cognitive mechanisms.

## Experiments

The main corpus contains roughly 9,800 trajectories and 40,000 transitions from eight models, including Mistral, Phi-3, DeepSeek, Llama-2, Gemma, and Qwen variants. Section 3 lists eight benchmarks, although the abstract says seven.

Section 5 reports held-out $R^2\approx0.68$, compared with 0.51 for global linear prediction. Table 2 separately reports:

| Model | $R^2$ | NLL |
| --- | ---: | ---: |
| Full SLDS | 0.74 | 78 |
| Single regime | 0.58 | 155 |
| No projection | 0.60 | 210 |
| No state-dependent drift | 0.35 | 290 |
| Global linear | 0.51 | 180 |

Transfer is stronger within a model: a Llama-2-70B surrogate trained on GSM-8K scores 0.73 on the source setting, 0.65 on StrategyQA with the same model, and 0.48 on Mistral-7B GSM-8K (Table 1).

The adversarial study uses about 3,000 trajectories of roughly 50 sentences from Llama-2-70B and Gemma-7B-IT. Rank 40 retains about 87% variance in this separate dataset. Three regimes represent factual, transitional, and misinformation-adherent states. A two-layer MLP maps projected states to a diagnostic True/False probability score. Table 3 reports SLDS next-state $R^2$ of 0.72 and 0.69, and final belief classification accuracy of 0.88 and 0.85, respectively. Simulations include perturbations estimated from poisoned trajectories; they are not predictions of arbitrary unseen attacks without such inputs.

## Limitations

- Half the main-corpus variance lies outside the selected projection. Approximate closure is an assumption, not a consequence of variance capture alone.
- Cross-family transfer deteriorates substantially, and hidden-state prediction does not establish improved task-answer accuracy or a causal account of reasoning.
- The main text's 0.68 and ablation table's 0.74 are distinct reported results whose evaluation relationship is not fully specified.
- Adversarial baseline numbers conflict: Table 3 gives linear $R^2$ of 0.35/0.33 and GRU values of 0.48/0.46, whereas the prose gives approximately 0.45 and 0.57–0.58. Baseline belief accuracies likewise differ. The SLDS values agree.
- Appendix A equates 50% retained variance with a residual Frobenius-norm ratio of 0.50; its displayed square-root formula would instead give approximately 0.71. This does not establish small projection leakage.
- Appendix D describes evaluation on all available target trajectories, leaving source-setting train/test separation unclear there. Trained surrogate weights are withheld, limiting reproduction.
- A diagnostic probability score operationalizes misinformation acceptance; it does not directly measure human-like beliefs or general alignment.

## Related Concepts

- [[concepts/switching-linear-dynamical-systems|Switching Linear Dynamical Systems]]
- [[concepts/dynamical-interpretability|Dynamical Interpretability]]
- [[concepts/dynamical-systems-reconstruction|Dynamical Systems Reconstruction]]

## Related Papers

The manuscript cites Ghahramani and Hinton (2000), “Variational Learning for Switching State-Space Models,” as a foundation for switching dynamics.

Related library reading, without implying citation by this manuscript:

- [[papers/truth-as-a-trajectory-what-internal-representations-reveal-about-large-language-model-reasoning|Truth as a Trajectory]] learns validity classification from token-by-layer displacements, whereas this paper predicts sentence-to-sentence state evolution.

[[index|Library home]]
