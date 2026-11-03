---
title: "ODE-ViT: Plug & Play Attention Layer from the Generalization of the ViT as an Ordinary Differential Equation"
type: paper
authors:
  - Carlos Boned Riera
  - David Romero Sanchez
  - Oriol Ramos Terrades
year: null
source_job_id: "58bf7219-01b9-4788-b6e4-e7b4a5097a3f"
tags:
  - vision-transformers
  - neural-ordinary-differential-equations
  - knowledge-distillation
  - dynamical-systems
---

## TL;DR

ODE-ViT replaces a Vision Transformer's sequence of distinct attention blocks with an autonomous continuous-depth block whose parameters are shared across Euler evaluations. Spectral initialization, centered normalization, and an attention-distribution penalty are intended to support locally stable dynamics. A DINO teacher then supplies intermediate class-token targets along the student's trajectory. The reported base student improves top-1 accuracy over the corresponding from-scratch ODE-ViT from 80.9% to 88.5% on CIFAR-10, 57.9% to 72.1% on CIFAR-100, and 51.3% to 68.4% on ImageNet-100, while remaining below the 85M-parameter teacher. These results support trajectory supervision in the tested settings, but do not establish global Lipschitz continuity, solver-independent behavior, or faster inference.

## Research Question

Can a Vision Transformer attention encoder be represented by a well-posed autonomous ordinary differential equation, and can intermediate states from a discrete pretrained ViT guide that continuous trajectory without requiring ordinary label supervision in every setting?

## Motivation

Residual updates resemble numerical steps of an ordinary differential equation, which makes network depth available to dynamical-systems analysis. Standard self-attention is not globally Lipschitz, however, and simply tying parameters can leave a compact model well below a pretrained ViT. The paper combines [[concepts/continuous-depth-transformers|Continuous-Depth Transformers]] with intermediate-representation [[concepts/knowledge-distillation|Knowledge Distillation]] to pursue parameter sharing, stable trajectories, and a more explicit account of how class-token representations evolve.

## Contributions

- Formulates a ViT attention encoder as an autonomous ODE whose vector field reuses one parameter set across all evaluation steps.
- Combines maximum-singular-value-based initialization, centered normalization, and the JaSMin attention penalty to encourage local smoothness and stable trajectories.
- Introduces a plug-and-play teacher-student procedure that positions DINO hidden representations as checkpoints along the ODE-ViT trajectory and aligns class tokens with mean squared error.
- Evaluates from-scratch and teacher-guided models on CIFAR-10, CIFAR-100, and ImageNet-100, with parameter counts, step-count studies, Lyapunov analyses, and an approximation-bound-based stopping experiment.

## Method

Patch embeddings and a class token initialize the hidden state. The attention encoder is treated as a vector field $\psi$ and split into an MLP subflow $F$ and attention subflow $G$ using a Lie-Trotter construction. Explicit Euler evaluations advance the state, while sharing $\theta$ across every evaluation makes the learned system autonomous. The experiments use 24 evaluation steps for the reported best models.

Because dot-product attention is not globally Lipschitz, the architecture does not claim an unconditional global guarantee. Instead, it initializes projection matrices according to their maximum singular values, replaces LayerNorm with centered normalization, and applies JaSMin, which penalizes ratios between the largest and $k$-th-largest attention entries. The paper uses these mechanisms to motivate local Lipschitz behavior and invokes Picard-Lindelof conditions for existence and uniqueness when the required regularity holds.

For teacher-guided training, a pretrained DINO ViT supplies hidden states. The patch embedder and classification head are inherited, and the discrete attention encoder is replaced by ODE-ViT. Mean pairwise distances between consecutive teacher states are softmax-normalized to place teacher checkpoints at nonuniform locations along the student trajectory. The student minimizes class-token MSE at these checkpoints together with JaSMin; Table 1 also includes cross-entropy for the CIFAR-100 base configuration. This resembles [[concepts/feature-dynamics-distillation|Feature Dynamics Distillation]], but aligns raw class-token states and uses an actual parameter-shared ODE rollout rather than vocabulary-space predictions from selected discrete layers.

The analysis tracks a residual-network-to-ODE approximation bound, maximal Lyapunov exponents, and class-token distances. The supplement uses a parameter-dependent version of the bound as an early-stopping threshold and varies integration steps at test time.

## Experiments

All reported training uses an NVIDIA A40, batch size 64, AdamW, an initial learning rate of $10^{-4}$, weight decay $5\times10^{-2}$, and 300 epochs unless bound-based early stopping intervenes.

| Model | Parameters | CIFAR-10 top-1 | CIFAR-100 top-1 | ImageNet-100 top-1 |
| --- | ---: | ---: | ---: | ---: |
| DINO-Base teacher, trained head only | 85M | 92.3% | 88.1% | 92.3% |
| ODE-ViT from scratch | 0.5M / 4.2M / 7M | 80.9% | 57.9% | 51.3% |
| ODE-ViT teacher-student base | 7M | 88.5% | 72.1% | 68.4% |
| ODE-ViT teacher-student small | 3.8M | 86.7% | 65.7% in Table 1 | not reported |

The base teacher-student gains over from-scratch ODE-ViT are 7.6, 14.2, and 17.1 percentage points from the table values. The discussion rounds these as 8%, 14%, and 16%, so the tabulated values are the clearer basis for comparison. The teacher remains ahead by 3.8, 16.0, and 23.9 points respectively.

A separate same-training comparison reports a 6.8M-parameter ViT from scratch at 90.9% on CIFAR-10 and 66.5% on CIFAR-100, versus 80.9% and 57.9% for the corresponding ODE-ViT models. The supplement reports that reducing test-time evaluation by six steps has negligible accuracy loss in its plots, but supplies no exact values in the parsed text. Approximation-bound early stopping is reported to save almost 15 training hours. Lyapunov plots show only a mild class-level association between lower exponents and higher accuracy, without numerical correlation estimates.

## Limitations

- Local stabilization mechanisms do not prove that dot-product attention is globally Lipschitz. Existence, uniqueness, and approximation statements remain conditional on the stated smoothness and Lipschitz assumptions.
- Parameter sharing reduces distinct weights but retains repeated attention evaluations. The paper does not report wall-clock inference, FLOPs, throughput, or measured memory against the discrete ViT.
- The teacher-student models remain substantially below the DINO teacher, especially on CIFAR-100 and ImageNet-100. The from-scratch ODE-ViT also trails the similarly sized ViT baselines by 8.6-10.0 percentage points in the reported comparison.
- The claim of self-supervised replacement is configuration-dependent: Table 1 lists MSE plus JaSMin for CIFAR-10 and ImageNet-100 base students, but adds cross-entropy for CIFAR-100.
- The small teacher-student CIFAR-100 result is inconsistent: Table 1 reports 65.7% top-1, whereas supplementary Table 4 reports 62.9% for the listed best hyperparameters.
- Stability evidence is descriptive. The source provides plots but no uncertainty estimates for the Lyapunov-accuracy relationship, no numerical correlations, and no direct intervention showing that the proposed contraction region causes correct classification.
- The parsed source supplies no publication year, venue, DOI, arXiv identifier, code URL, confidence intervals, or multi-seed variability, so `year` remains null and reproducibility metadata are limited.

## Related Concepts

- [[concepts/continuous-depth-transformers|Continuous-Depth Transformers]]: interprets Transformer depth as numerical integration of a hidden-state vector field.
- [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]]: also exchanges distinct layer parameters for repeated computation, but can use multiple phases and need not define a continuous-time system.
- [[concepts/dynamical-interpretability|Dynamical Interpretability]]: provides the stability, convergence, and perturbation vocabulary used to analyze hidden-state trajectories.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: supplies teacher checkpoints and a frozen classification interface.
- [[concepts/feature-dynamics-distillation|Feature Dynamics Distillation]]: offers a related trajectory-supervision view for discrete language-model layers.

## Related Papers

- [[papers/ot-transformer-a-continuous-time-transformer-architecture-with-optimal-transport-regularization|OT-Transformer: A Continuous-time Transformer Architecture with Optimal Transport Regularization]] learns a continuous-time Transformer with shared vector-field parameters and kinetic-energy regularization; it is a library comparison rather than a citation established by the parsed source.
- [[papers/block-recurrent-dynamics-in-vits|Block-Recurrent Dynamics in ViTs]] distills a DINOv2 teacher into phase-wise recurrent blocks and analyzes token trajectories in discrete depth; it is a library comparison rather than a citation established by the parsed source.
- [[papers/beyond-logits-aligning-feature-dynamics-for-effective-knowledge-distillation|Beyond Logits: Aligning Feature Dynamics for Effective Knowledge Distillation]] aligns intermediate predictive trajectories and deltas in language-model distillation; it is a library comparison rather than a citation established by the parsed source.
- Chen et al. (2018), "Neural Ordinary Differential Equations": foundational continuous-depth formulation cited by the paper.
- Sander et al. (2022), "Do Residual Neural Networks Discretize Neural Ordinary Differential Equations?": source of the discrete-to-continuous approximation bound used by ODE-ViT.
- Zhong et al. (2022), "A Neural ODE Interpretation of Transformer Layers": the autonomous Transformer-ODE baseline emphasized by the paper.
- Qi et al. (2023), "LipsFormer: Introducing Lipschitz Continuity to Vision Transformers," and Yudin et al. (2025), "Pay Attention to Attention Distribution": motivate the stabilization mechanisms and JaSMin loss.

[[index|Library home]]
