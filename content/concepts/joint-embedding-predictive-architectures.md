---
title: Joint-Embedding Predictive Architectures
type: concept
aliases:
  - JEPA
  - Joint-Embedding Predictive Architecture
tags:
  - self-supervised-learning
  - representation-learning
  - latent-prediction
---

## Overview

Joint-embedding predictive architectures learn representations by predicting a target region's embedding from a context region. The prediction objective operates in a learned latent space, allowing the target representation to abstract away some input detail. Whether this yields useful invariance or robustness must be established by downstream evidence.

## Key Ideas

- **Context, predictor, and target:** A context encoder processes observed portions of an input, a predictor estimates representations of held-out portions, and a target encoder supplies the embeddings to match. This differs from reconstructing missing raw values.
- **Iterative stochastic prediction:** JEDI uses conditional diffusion to predict future embeddings from past embeddings and actions. Stop-gradient future targets allow denoising gradients to train the encoder through context representations; the default uses no EMA target encoder. Its information-bottleneck decomposition motivates the loss, while the full context-prior regularizer remains outside the implemented objective.
- **Moving targets and collapse:** A target encoder updated by an exponential moving average supplies slowly changing targets. TS-JEPA uses this mechanism to stabilize training and discourage constant representations; its results do not establish that EMA alone guarantees avoidance of collapse.
- **Temporal adaptation:** TS-JEPA embeds non-overlapping time-series patches with a 1D convolution and positional encodings, then minimizes an L1 discrepancy between predicted and target embeddings at masked positions.
- **Evaluation matters:** Classification and forecasting test different properties of a representation. TS-JEPA's mixed results show that latent prediction need not dominate raw-value autoregression, and transfer between related datasets can still fail to improve on competing objectives.
- **Pretraining scope:** A dataset-specific JEPA experiment is evidence about an objective and architecture. Establishing a foundation model requires additional evidence about scale and transfer.
- **Explicit distribution regularization:** LeJEPA pairs alignment with SIGReg, which encourages an isotropic Gaussian embedding distribution. In the matched-dimensional, isotropic Gaussian OU setting, optimal alignment and centered whitening suffice to recover the true latents up to an orthogonal map. This is a population result about the specified world and objective, not a guarantee for every JEPA architecture or training distribution.

- **Hierarchies separate dynamics from goal scoring:** H-JEPA learns distinct latent spaces at coarser strides. Upper representations can improve goal costs even with fine-scale rollout dynamics fixed, while top-down subgoals additionally shorten planning problems. These benefits vary by environment.
- **Marginal diversity is not temporal informativeness:** An encoder can preserve scene identity across episodes while ignoring motion within each episode. H-JEPA's DROID ablations show high representation rank under SIGReg without useful planning fidelity; inverse-dynamics supervision restores action-relevant information in that recipe. Its population collapse construction assumes an observable, atomless episode background and does not establish that every predictive objective must collapse.

## Important Papers

- [[papers/jedi-joint-embedding-diffusion-world-model-for-online-model-based-reinforcement-learning|JEDI: Joint Embedding Diffusion World Model for Online Model-Based Reinforcement Learning]] extends predictive embedding learning to online latent diffusion world models with reward and termination supervision.
- [[papers/joint-embeddings-go-temporal|Joint Embeddings Go Temporal]] introduces TS-JEPA and evaluates frozen representations for classification and forecasting.
- [[papers/h-jepa-end-to-end-learning-of-hierarchical-world-models-for-visual-planning|H-JEPA: End-to-End Learning of Hierarchical World Models for Visual Planning]] tests learned temporal abstractions in simulation and offline robot planning, and distinguishes distributional collapse prevention from preservation of action-dependent motion.
- [[papers/when-does-lejepa-learn-a-world-model|When Does LeJEPA Learn a World Model?]] analyzes exact and approximate latent recovery for alignment with Gaussian regularization, with explicit limits on dynamics and planning claims.
- Assran et al. (2023), "Self-supervised learning from images with a joint-embedding predictive architecture," is cited by TS-JEPA as an image-domain predecessor.
- Bardes et al. (2024), "V-JEPA: Latent video prediction for visual representation learning," is cited by TS-JEPA as a video-domain predecessor.

## Related Concepts

- [[concepts/hierarchical-latent-world-models|Hierarchical Latent World Models]] organize predictive representations and subgoal planning across timescales.
- [[concepts/linear-probing|Linear Probing]] assesses task information accessible through a linear readout; frozen-encoder evaluations with unspecified heads are a broader protocol.
- [[concepts/function-space-autoencoders|Function-Space Autoencoders]] learn representations of functional observations using reconstruction objectives, providing a useful comparison with latent-target prediction.
- [[concepts/slow-feature-analysis|Slow Feature Analysis]] connects alignment under whitening to persistent eigenfunctions of a temporal transition operator.
- [[concepts/structural-identifiability|Structural Identifiability]] asks whether a representation recovers the variables generating the observations.
