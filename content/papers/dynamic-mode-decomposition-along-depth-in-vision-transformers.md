---
title: Dynamic Mode Decomposition along Depth in Vision Transformers
type: paper
authors:
  - Nishant Suresh Aswani
  - Saif Eddin Jabari
year: null
source_job_id: "aee8862c-66fb-45d9-8d1c-40be2d2c88ba"
project_url: https://github.com/niniack/dmd_vit
tags:
  - vision-transformers
  - dynamic-mode-decomposition
  - depth-pruning
  - dynamical-systems
---

## TL;DR

This paper fits one linear operator to consecutive hidden-state pairs and applies it recurrently across a contiguous span of DINO Vision Transformer blocks. For short spans, dynamic mode decomposition (DMD) nearly matches an unconstrained endpoint map while also reconstructing intermediate states. Early layers admit low-rank operators and the class token is easier to approximate than patch tokens, but strong local reconstruction does not reliably survive the remaining blocks: at the final hidden state, an identity replacement can be competitive.

## Research Question

Can a contiguous span of Vision Transformer blocks be approximated by repeated application of a single time-invariant linear operator, rather than by distinct nonlinear blocks at each depth?

## Motivation

Two observations motivate the test. Linear depth-pruning methods can replace several transformer blocks with one map fitted between span endpoints, while the [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]] hypothesis describes ViT depth as a few phases of repeated computation. Their intersection would imply approximately autonomous linear dynamics within a phase. Unlike an endpoint-only fit, a recurrent operator must explain every transition and its errors can compound under repeated application.

## Contributions

- Introduces full and anchored DMD formulations for recurrent linear replacement of contiguous ViT blocks.
- Compares the constrained recurrent operator with ReplaceMe's unconstrained endpoint map and an identity baseline across four pretrained DINOv2 and DINOv3 architectures.
- Characterizes sensitivity to span length, cut depth, calibration-set size, regularization, operator rank, and token type.
- Separates local reconstruction at the cut endpoint from downstream fidelity after the remaining transformer blocks.
- Shows that early-depth dynamics are more compressible and that class-token trajectories are more amenable to joint linear approximation than patch-token trajectories.

## Method

For hidden states $X_i,\ldots,X_{i+p}$, full DMD pools consecutive snapshot pairs over calibration images, tokens, and steps into $Z$ and $Z'$. It fits a ridge-regularized operator

$$
K=\arg\min_K\lVert Z'-KZ\rVert_F^2+\alpha\lVert K\rVert_F^2
$$

and predicts every state in the span as $K^qX_i$. Anchored DMD instead holds the post-attention residual $A_i$ fixed and applies $K^q$ to the kept block's MLP residual, predicting $A_i+K^qM_i$. Both are finite-dimensional instances of [[concepts/koopman-operator-learning|Koopman Operator Learning]] on raw hidden states, without a learned observable space.

The main fits use ridge parameter $10^{-5}$ and 1,000 ImageNet-1K calibration images. Reduced-rank regression is the default rank-constrained estimator and is compared with principal component regression. Evaluation uses token-wise cosine similarity, relative L2 error, a centered $R^2$ score, and norm ratio. ReplaceMe provides a direct endpoint-map comparison, while identity represents deleting the span without learned compensation.

## Experiments

The study evaluates DINOv2 ViT-L/14 and ViT-G/14 and DINOv3 ViT-L/16 and ViT-H/16+, discarding their four register tokens when fitting operators. Operators are evaluated on 2,000 held-out ImageNet-1K validation images.

- On DINOv3-H/16+, full DMD reaches median cosine similarity 0.98, 0.97, 0.95, and 0.91 for prune lengths one through four. Over these short spans it remains within about 0.02 cosine similarity of ReplaceMe while additionally predicting intermediate activations.
- Approximation quality decreases as the recurrent horizon grows. At prune length ten, median cosine similarity is 0.68 for full DMD versus 0.74 for ReplaceMe on DINOv3-H/16+, and 0.35 versus 0.48 on DINOv2-L/14.
- Early DINOv3-H/16+ cut starts up to layer seven reach their full-rank cosine similarity at rank 64, far below the embedding dimension. Required rank increases with cut depth.
- Calibration error follows an empirical rate near $O(1/B)$; both DMD variants are within 5% of their 1,000-image baseline by 250 images in the aggregate analysis, although late cuts continue improving through the largest budget.
- Full DMD usually reconstructs the local endpoint slightly better than anchored DMD. Reduced-rank regression has a small overall advantage over principal component regression, generally below 0.01 in the reported metrics.
- Local gains do not imply downstream preservation. After passing the replacement output through the remaining blocks, full DMD can degrade sharply, and identity is competitive with or better than anchored DMD and ReplaceMe at the final hidden state in the reported DINO experiments.

## Limitations

- The experiments cover only four DINO Vision Transformers, so the findings do not establish the same behavior for language models or other vision architectures.
- The work characterizes representation reconstruction rather than demonstrating an actionable parameter-reduction method or downstream task preservation.
- It does not provide a principled joint rule for choosing cut start and prune length.
- The linear autonomous approximation is local and empirical. Repeated-operator fidelity over a short span does not establish globally autonomous dynamics, and errors compound over longer spans.
- The proposed explanation in terms of transformer-block coupling is consistent with the measurements but is not a direct test of shared Jacobian singular vectors.
- Fine-tuning after replacement and learned nonlinear observable spaces are discussed as possible remedies, but are not evaluated in the reported experiments.

## Related Concepts

- [[concepts/koopman-operator-learning|Koopman Operator Learning]]: DMD estimates the recurrent linear operator directly from paired hidden-state snapshots.
- [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]]: supplies the stronger recurrence hypothesis that motivates searching for one reusable operator within a depth span.
- [[concepts/dynamical-interpretability|Dynamical Interpretability]]: treats network depth as discrete time and studies hidden-state trajectories as a dynamical system.
- [[concepts/transformer-representation-trajectory-geometry|Transformer Representation Trajectory Geometry]]: provides a complementary geometric view of how representations move across layers.

## Related Papers

- [[papers/block-recurrent-dynamics-in-vits|Block-Recurrent Dynamics in ViTs]]: proposes phase-wise recurrent nonlinear blocks and uses DMD diagnostically; the present paper instead uses DMD for block replacement.
- Shopkhoev et al. (2025), "ReplaceMe: Network Simplification via Depth Pruning and Transformer Block Linearization": supplies the unconstrained endpoint-map baseline.
- Aubry et al. (2025), "Transformer Block Coupling and its Correlation with Generalization in LLMs": motivates a recurrent linear limit through residual-Jacobian alignment.
- Schmid (2010), "Dynamic Mode Decomposition of Numerical and Experimental Data": introduces the operator-estimation method used here.
- Kostic et al. (2022), "Learning Dynamical Systems via Koopman Operator Regression in Reproducing Kernel Hilbert Spaces": motivates the ridge and reduced-rank formulations.

[[index|Library home]]
