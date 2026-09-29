---
title: Distributional Reward Modeling
type: concept
aliases:
  - Diffusion Reward Modeling
  - Distributional Reward Models
tags:
  - reward-modeling
  - reinforcement-learning-from-human-feedback
  - uncertainty
  - large-language-models
---

## Overview

Distributional reward modeling predicts a conditional distribution of rewards for a prompt-response pair instead of a single scalar. The distribution can represent annotator disagreement, multiple plausible judgments, and uncertainty about a decision. It can later be summarized as a mean, quantile, variance, or risk-sensitive score depending on the downstream use.

## Key Ideas

- **Model the reward distribution conditionally.** A reward model learns $p(\mathbf{r}\mid x,y)$, preserving input-specific variation rather than applying one global uncertainty pattern or collapsing every example to its expected value.
- **Use flexible output parameterizations.** Diffusion reward heads learn the distribution implicitly through iterative denoising, avoiding the Gaussian, categorical, or fixed-quantile assumptions of several earlier distributional heads.
- **Share a reward space across supervision regimes.** Masked denoising can use partially labeled multi-attribute data, while a Bradley-Terry objective on reconstructed rewards can use chosen/rejected pairs.
- **Treat sampling as an interface.** Independent reverse-process samples approximate the reward distribution. Their mean remains compatible with ordinary RLHF and Best-of-$N$ evaluation, while dispersion and quantiles expose additional decision signals.
- **Separate response and reward scaling.** Best-of-$N$ varies the number of candidate responses. A distributional reward model also permits increasing the number of reward samples for one fixed response, trading inference compute for a more precise score estimate.
- **Use uncertainty for decisions, not only reporting.** DRM experiments use uncertainty to reject unstable judgments and use a lower-confidence bound to penalize high-variance candidates when abstention is unavailable.
- **Keep evidence boundaries explicit.** A multimodal learned output indicates representational capacity, not proof that each mode is a distinct human preference. More samples and diffusion steps also increase inference cost, and the learned reward can still inherit data bias.

## Important Papers

- [[papers/difusion-reward-models|Difusion Reward Models]]: introduces a frozen-encoder diffusion reward head for multi-attribute and pairwise preference supervision, with empirical validation against repeated human ratings and downstream RLHF.
- Siththaranjan et al. (2024), “Distributional preference learning”: a parametric distributional reward-modeling approach discussed as a contrast to diffusion-based density estimation.
- Lou et al. (2024), “Uncertainty-aware reward modeling”: models reward uncertainty with a Gaussian-style parametric head, another comparison point for non-parametric reward distributions.
- Dorka (2024), “Quantile regression for distributional reward models in RLHF”: represents rewards with a fixed quantile grid.
- [[concepts/bradley-terry-scaling|Bradley-Terry Scaling]]: the pairwise comparison model used as an auxiliary objective for preference-only training.

## Related Concepts

- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/bradley-terry-scaling|Bradley-Terry Scaling]]
- [[concepts/confidence-based-judge-cascades|Confidence-Based Judge Cascades]]
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]
