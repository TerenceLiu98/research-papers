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
- **Cross-modal prediction without negatives:** LeVLJEPA applies separate image-to-text and text-to-image predictors to detached targets and regularizes each modality with SIGReg. In its matched ViT-B/16 comparisons, this recipe produces stronger frozen patch-token features than InfoNCE and SigLIP but weaker large-scale zero-shot alignment, separating dense representation quality from pooled image-text discrimination.

- **Hierarchies separate dynamics from goal scoring:** H-JEPA learns distinct latent spaces at coarser strides. Upper representations can improve goal costs even with fine-scale rollout dynamics fixed, while top-down subgoals additionally shorten planning problems. These benefits vary by environment.
- **Marginal diversity is not temporal informativeness:** An encoder can preserve scene identity across episodes while ignoring motion within each episode. H-JEPA's DROID ablations show high representation rank under SIGReg without useful planning fidelity; inverse-dynamics supervision restores action-relevant information in that recipe. Its population collapse construction assumes an observable, atomless episode background and does not establish that every predictive objective must collapse.
- **Non-collapse is not dynamics robustness:** SIGReg can maintain a diverse encoder distribution without constraining how an action-conditioned predictor responds to nuisance-induced latent shifts. [[papers/flow-jepa-robust-latent-dynamics-for-jepa-world-models-via-flow-matching|Flow-JEPA]] reports that replacing recursive one-step regression with trajectory-level conditional flow matching reduces degradation under localized visual noise, while leaving the responsible mechanism unresolved.
- **Positive views govern cross-modal alignment:** In a population model with injective modality renderings, rotation-invariant objectives, and minimizers unique up to rotation, JEPAs whose positive pairs induce the same relations between world states recover one shared embedding up to modality-specific rotations. With whitened squared-error objectives, the representation is the leading eigenspace of the positive-pair graph; mismatched positives and small eigengaps weaken the guarantee.
- **Predictors can transfer as completion operators:** A frozen JEPA predictor can accept another image encoder's patch features after a fitted linear bridge and supply classification-useful features at masked positions. The reported benefit grows under contiguous occlusion, but bridge cost can dominate at light masking and fine-grained classification; useful predicted features also need not reconstruct the donor encoder's feature frame in L2.
- **Latent prediction can condition continuous generation:** [[papers/denoising-with-a-joint-embedding-predictive-architecture|Denoising with a Joint-Embedding Predictive Architecture]] combines masked feature prediction with a token-wise diffusion or flow-matching head. Its ImageNet experiments support this joint recipe for generation and representation learning, while leaving collapse prevention as an empirical architectural claim.
- **Action supervision can shape a JEPA encoder jointly with dynamics:** [[papers/lewam-end-to-end-world-and-action-modeling-with-jepas|LeWAM]] trains latent dynamics and a flow-matching policy through one shared visual encoder. Its probes and ablations support retention of control-relevant information in the tested tasks, but SIGReg remains useful for planning and the physical-robot policy does not outperform Diffusion Policy on average.
- **Joint embedding prediction can mediate centralized multi-agent imagination.** [[papers/ma-jepa-joint-embedding-world-models-for-multi-agent-reinforcement-learning|MA-JEPA]] predicts each agent's next local observation embedding from synchronized agent states and the joint action. The local posterior then constructs the policy state, allowing centralized training signals without exposing the decentralized actor to a centralized latent state.
- **Encoder non-collapse does not prevent rollout contraction.** [[papers/lehami-symplectic-latent-dynamics-for-world-models|LeHami]] places an exactly symplectic constraint on the predictor, complementing distribution regularization of encoder outputs. Its guarantee excludes three contraction-related failure modes but does not imply accurate prediction or superior control.

## Important Papers

- [[papers/denoising-with-a-joint-embedding-predictive-architecture|Denoising with a Joint-Embedding Predictive Architecture]] uses predicted JEPA features to condition iterative generation of continuous tokens.
- [[papers/galileo-learning-global-and-local-features-of-many-remote-sensing-modalities|Galileo: Learning Global & Local Features of Many Remote Sensing Modalities]] adapts masked latent prediction to heterogeneous Earth-observation inputs, pairing deep EMA targets and structured masks for global features with shallow projected targets and random masks for local features.
- [[papers/jedi-joint-embedding-diffusion-world-model-for-online-model-based-reinforcement-learning|JEDI: Joint Embedding Diffusion World Model for Online Model-Based Reinforcement Learning]] extends predictive embedding learning to online latent diffusion world models with reward and termination supervision.
- [[papers/joint-embeddings-go-temporal|Joint Embeddings Go Temporal]] introduces TS-JEPA and evaluates frozen representations for classification and forecasting.
- [[papers/h-jepa-end-to-end-learning-of-hierarchical-world-models-for-visual-planning|H-JEPA: End-to-End Learning of Hierarchical World Models for Visual Planning]] tests learned temporal abstractions in simulation and offline robot planning, and distinguishes distributional collapse prevention from preservation of action-dependent motion.
- [[papers/when-does-lejepa-learn-a-world-model|When Does LeJEPA Learn a World Model?]] analyzes exact and approximate latent recovery for alignment with Gaussian regularization, with explicit limits on dynamics and planning claims.
- [[papers/levljepa-end-to-end-vision-language-pretraining-without-negatives|LeVLJEPA: End-to-End Vision-Language Pretraining Without Negatives]] extends predictive embedding learning to paired images and text using stop-gradient cross-modal targets and per-modality SIGReg.
- [[papers/flow-jepa-robust-latent-dynamics-for-jepa-world-models-via-flow-matching|Flow-JEPA: Robust Latent Dynamics for JEPA World Models via Flow Matching]] contrasts autoregressive and trajectory-level vector-field dynamics in a reconstruction-free visual planning model.
- [[papers/proving-and-improving-the-platonic-representation-hypothesis-with-jepas|Proving and Improving the Platonic Representation Hypothesis with JEPAs]] proves a shared-positive sufficient condition for cross-modal agreement up to rotation and tests view construction against next-token prediction.
- [[papers/the-jepa-predictor-a-transferable-operator-for-occluded-feature-completion|The JEPA Predictor: A Transferable Operator for Occluded Feature Completion]] connects frozen JEPA predictors to CLIP, DINOv3, DINOv2, and MAE through ridge-fitted feature bridges and evaluates completion under increasing contiguous occlusion.
- [[papers/lewam-end-to-end-world-and-action-modeling-with-jepas|LeWAM: End-to-End World and Action Modeling with JEPAs]] jointly learns action-conditioned latent dynamics and a stochastic action policy for direct control and proposal-guided planning.
- [[papers/ma-jepa-joint-embedding-world-models-for-multi-agent-reinforcement-learning|MA-JEPA: Joint-Embedding World Models for Multi-Agent Reinforcement Learning]] extends reconstruction-free latent prediction to centralized-training/decentralized-execution multi-agent control.
- [[papers/lehami-symplectic-latent-dynamics-for-world-models|LeHami: Symplectic Latent Dynamics for World Models]] structures a JEPA predictor as an action-conditioned Hamiltonian flow over position-like and momentum-like latents.
- Assran et al. (2023), "Self-supervised learning from images with a joint-embedding predictive architecture," is cited by TS-JEPA as an image-domain predecessor.
- Bardes et al. (2024), "V-JEPA: Latent video prediction for visual representation learning," is cited by TS-JEPA as a video-domain predecessor.

## Related Concepts

- [[concepts/hierarchical-latent-world-models|Hierarchical Latent World Models]] organize predictive representations and subgoal planning across timescales.
- [[concepts/linear-probing|Linear Probing]] assesses task information accessible through a linear readout; frozen-encoder evaluations with unspecified heads are a broader protocol.
- [[concepts/function-space-autoencoders|Function-Space Autoencoders]] learn representations of functional observations using reconstruction objectives, providing a useful comparison with latent-target prediction.
- [[concepts/slow-feature-analysis|Slow Feature Analysis]] connects alignment under whitening to persistent eigenfunctions of a temporal transition operator.
- [[concepts/structural-identifiability|Structural Identifiability]] asks whether a representation recovers the variables generating the observations.
- [[concepts/platonic-representation-hypothesis|Platonic Representation Hypothesis]] concerns convergence toward shared representations across separately trained models and modalities.
- [[concepts/symplectic-latent-dynamics|Symplectic Latent Dynamics]] constrains inference-time latent transitions rather than only the training-time embedding distribution.
