---
title: Block-Recurrent Dynamics in ViTs
type: paper
authors:
  - Mozes Jacobs
  - Thomas Fel
  - Richard Hakim
  - Alessandra Brondetta
  - Demba Ba
  - T. Andy Keller
year: 2026
source_job_id: "e6b0c187-4316-4fe6-b45b-561a3a777ea2"
project_url: https://kempnerinstitute.github.io/raptor
tags:
  - vision-transformers
  - recurrent-depth
  - mechanistic-interpretability
  - knowledge-distillation
---

## TL;DR

The paper proposes the Block-Recurrent Hypothesis: a trained Vision Transformer's depth can be divided into a few contiguous phases, each approximated by repeated applications of one parameter-tied block. Its Raptor students reconstruct DINOv2's intermediate trajectory rather than only its output. A two-block Raptor reaches 81.2% ImageNet-1k top-1 accuracy against 84.5% for DINOv2 ViT-B, while three blocks reach 83.0%. The paper then interprets ViT depth as a dynamical system, reporting angular convergence, token-specific phase changes, and low-rank late-depth updates.

## Research Question

Do the contiguous regions visible in layer-to-layer similarity matrices of trained Vision Transformers reflect reusable computation, and can that structure support a dynamical account of how representations evolve with depth?

## Motivation

Representational similarity alone does not imply functional equivalence: different layers can produce similar states through different computations. [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]] makes a stronger claim by asking whether a small set of shared blocks can reproduce the full layerwise trajectory at approximately the original runtime. If so, the recurrent rewriting also provides a basis for [[concepts/dynamical-interpretability|Dynamical Interpretability]], where network depth is treated as discrete time.

## Contributions

- Formalizes the epsilon-Block-Recurrent Hypothesis (BRH) in terms of a small number of parameter-tied blocks that approximate all intermediate activations.
- Introduces Recurrent Approximations to Phase-structured TransfORmers (Raptor), trained by intermediate-state [[concepts/knowledge-distillation|knowledge distillation]].
- Uses contiguous max-cut segmentation of layer similarity matrices to choose recurrent phases and tests those phases against random partitions and layer-swap interventions.
- Studies how training, stochastic depth, residual structure, and overfitting relate to recurrent compressibility in controlled CIFAR-100 experiments.
- Analyzes normalized token trajectories using angular convergence, perturbations, update rank and coherence, and dynamic mode decomposition.

## Method

For a teacher with depth $L$, BRH posits $k\ll L$ blocks $B_1,\ldots,B_k$ and repetition counts summing to $L$. The recurrent composition should approximate the teacher activation at every depth, not just its final output. A dynamic-programming max-cut procedure partitions the layer similarity matrix into contiguous phases by favoring high within-phase and low across-phase cosine similarity.

Raptor instantiates each phase as a parameter-tied Transformer block. Training first combines teacher forcing, where a block receives the teacher activation, with autoregressive rollout, where it receives its own previous prediction. Teacher forcing is annealed away. A second stage connects all blocks and trains the complete trajectory autoregressively. The foundation-model experiments use a frozen DINOv2 ViT-B teacher, ImageNet-1k activations, and $k\in\{2,3,4\}$ phases; downstream linear heads are trained for ImageNet-1k, ADE20k, and NYUv2.

For the dynamical analysis, token states are normalized to the unit sphere because feature norms grow with depth. The paper measures cosine alignment with terminal states, angular speed, response to Gaussian perturbations, stable rank and coherence of layerwise updates, and rank-10 exact dynamic mode decompositions for class, register, and mean patch tokens.

## Experiments

| Setting | Reported result | Evidence boundary |
| --- | --- | --- |
| DINOv2 ViT-B teacher | 84.5% ImageNet-1k top-1, 47.5 ADE20k mIoU, 0.578 NYUv2 RMSE | Frozen backbone with trained linear heads. |
| Raptor, $k=2$ | 81.2 +/- 0.2 top-1, 39.6 +/- 0.6 mIoU, 0.648 +/- 0.003 RMSE | About 96% of teacher classification accuracy, but a larger gap on dense prediction. |
| Raptor, $k=3$ | 83.0 +/- 0.1 top-1, 43.0 +/- 0.3 mIoU, 0.618 +/- 0.006 RMSE | About 98% of teacher classification accuracy; three random seeds. |
| Raptor, $k=4$ | 83.2 +/- 0.1 top-1, 43.6 +/- 0.1 mIoU, 0.607 +/- 0.006 RMSE | Classification gains largely saturate after three blocks. |
| $k=3$ ablation | Teacher forcing alone: 3.9%; annealed autoregression: 72.7%; depth scaling: 75.2%; weighted class-token loss: 76.7%; joint second stage: 82.4%; classifier fine-tuning: 83.0% | Closed-loop training, iteration-dependent scaling, and end-to-end coordination all contribute. |

On CIFAR-100, max-cut partitions generally outperform random contiguous partitions and fragmented random assignments. Increasing stochastic-depth probability raises layer similarity and Raptor reconstruction fidelity, though models with probabilities 0.7-0.9 show aberrant training and are excluded from later analysis. Intra-phase layer substitutions preserve substantially more ImageNet accuracy than inter-phase substitutions. Reconstruction deteriorates after the controlled teacher begins to overfit.

The dynamical measurements report S-shaped directional convergence toward terminal states, class-dependent terminal basins in PCA projections, and partial recovery after small perturbations. Class tokens reorient sharply late in depth; register tokens change least; patch-token updates become increasingly coherent. Stable and effective update ranks fall to roughly six in the final phase. Exact-DMD eigenvalues lie near and just inside the unit circle, which the authors interpret as weak contraction and mostly angular motion.

## Limitations

- BRH is demonstrated through learned approximations, not exact recurrence. The formal zero-error Levin-complexity claim is conditional on exact 0-BRH and runtime parity, whereas the empirical models retain nonzero task and trajectory gaps.
- The strongest preservation is on ImageNet classification. The $k=3$ Raptor remains 4.5 mIoU below DINOv2 ViT-B on ADE20k and has higher error on NYUv2.
- The phase count is selected in advance and boundaries depend on cosine similarity plus a particular contiguous segmentation objective. The experiments do not establish a unique decomposition.
- Depth scaling makes the recurrent update iteration-dependent, so the fitted system is non-autonomous rather than one invariant map repeated without time information.
- Stochastic depth is associated with greater similarity and compressibility in controlled experiments, but the paper does not isolate a complete causal account of phase emergence at foundation-model scale.
- Angular attractors, mean-field-like behavior, and low-dimensional attractors are interpretations of finite-depth measurements. PCA basins, local perturbation recovery, rank collapse, and a linear DMD fit do not establish global asymptotic attractors.
- Dense-prediction and dynamics results center on DINOv2 and ImageNet-derived representations; generalization to other foundation-model families remains open.

## Related Concepts

- [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]]: the phase-wise parameter-tying hypothesis tested by Raptor.
- [[concepts/dynamical-interpretability|Dynamical Interpretability]]: analysis of layer depth as discrete-time representational flow.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: Raptor uses the teacher's full sequence of hidden activations as targets.
- [[concepts/feature-dynamics-distillation|Feature Dynamics Distillation]]: another method that supervises intermediate trajectories, developed for language models and a different comparison space.
- [[concepts/transformer-representation-trajectory-geometry|Transformer Representation Trajectory Geometry]]: observational geometry of hidden-state paths across layers.

## Related Papers

Works cited by the paper include:

- Dehghani et al. (2018), "Universal Transformers": parameter sharing across recurrent depth.
- Schwarzschild et al. (2021), "The Uncanny Similarity of Recurrence and Depth": recurrence and untied depth as related computational forms.
- Nguyen, Raghu, and Kornblith (2022), "On the Origins of the Block Structure Phenomenon in Neural Network Representations": prior analysis of block structure in representation similarity.
- Geiping et al. (2025), "Scaling up Test-Time Compute with Latent Reasoning: A Recurrent Depth Approach": recurrent depth in language models.
- Schmid (2022), "Dynamic Mode Decomposition and Its Variants": the linear dynamics method used for token-group trajectories.

As library comparisons, [[papers/trajectory-geometry-of-transformer-representations-across-layers|Trajectory Geometry of Transformer Representations Across Layers]] studies depthwise paths observationally, while [[papers/beyond-logits-aligning-feature-dynamics-for-effective-knowledge-distillation|Beyond Logits: Aligning Feature Dynamics for Effective Knowledge Distillation]] trains students to match intermediate predictive dynamics. These links do not imply citation by the source paper.

[[index|Library home]]
