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
- **Moving targets and collapse:** A target encoder updated by an exponential moving average supplies slowly changing targets. TS-JEPA uses this mechanism to stabilize training and discourage constant representations; its results do not establish that EMA alone guarantees avoidance of collapse.
- **Temporal adaptation:** TS-JEPA embeds non-overlapping time-series patches with a 1D convolution and positional encodings, then minimizes an L1 discrepancy between predicted and target embeddings at masked positions.
- **Evaluation matters:** Classification and forecasting test different properties of a representation. TS-JEPA's mixed results show that latent prediction need not dominate raw-value autoregression, and transfer between related datasets can still fail to improve on competing objectives.
- **Pretraining scope:** A dataset-specific JEPA experiment is evidence about an objective and architecture. Establishing a foundation model requires additional evidence about scale and transfer.
- **Explicit distribution regularization:** LeJEPA pairs alignment with SIGReg, which encourages an isotropic Gaussian embedding distribution. In the matched-dimensional, isotropic Gaussian OU setting, optimal alignment and centered whitening suffice to recover the true latents up to an orthogonal map. This is a population result about the specified world and objective, not a guarantee for every JEPA architecture or training distribution.

## Important Papers

- [[papers/joint-embeddings-go-temporal|Joint Embeddings Go Temporal]] introduces TS-JEPA and evaluates frozen representations for classification and forecasting.
- [[papers/when-does-lejepa-learn-a-world-model|When Does LeJEPA Learn a World Model?]] analyzes exact and approximate latent recovery for alignment with Gaussian regularization, with explicit limits on dynamics and planning claims.
- Assran et al. (2023), "Self-supervised learning from images with a joint-embedding predictive architecture," is cited by TS-JEPA as an image-domain predecessor.
- Bardes et al. (2024), "V-JEPA: Latent video prediction for visual representation learning," is cited by TS-JEPA as a video-domain predecessor.

## Related Concepts

- [[concepts/linear-probing|Linear Probing]] assesses task information accessible through a linear readout; frozen-encoder evaluations with unspecified heads are a broader protocol.
- [[concepts/function-space-autoencoders|Function-Space Autoencoders]] learn representations of functional observations using reconstruction objectives, providing a useful comparison with latent-target prediction.
- [[concepts/slow-feature-analysis|Slow Feature Analysis]] connects alignment under whitening to persistent eigenfunctions of a temporal transition operator.
- [[concepts/structural-identifiability|Structural Identifiability]] asks whether a representation recovers the variables generating the observations.
