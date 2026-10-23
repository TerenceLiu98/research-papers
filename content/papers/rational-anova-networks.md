---
title: "Rational ANOVA Networks"
type: paper
authors:
  - Jusheng Zhang
  - Ningyuan Liu
  - Qinhan Lyu
  - Jing Yang
  - Keze Wang
year: null
tags:
  - rational-anova-networks
  - learnable-activations
  - functional-anova
  - efficient-neural-networks
---

## TL;DR

This paper introduces [[concepts/rational-anova-networks|Rational-ANOVA Networks]] (RANs), which combine low-degree rational units with a functional-ANOVA topology of per-feature main effects and selected pairwise interactions. Positive denominators prevent poles, while residual gates initialize the units near the identity for deep training. The reported experiments show competitive or improved accuracy under parameter-matched budgets, including 74.2% ImageNet-1K top-1 accuracy for a 5.7M-parameter ViT-Tiny versus 72.3% for its matched MLP baseline. The evidence is broad but mostly small- or medium-scale, and some claims about interpretability, extrapolation, and training stability rely on synthetic tasks, architectural bounds, or author-selected comparisons rather than independent large-scale validation.

## Research Question

Can a neural-network primitive make nonlinearities learnable and interactions explicit without the spline overhead and boundary instability associated with [[concepts/kolmogorov-arnold-networks|Kolmogorov-Arnold Networks]], while remaining stable and efficient in deep architectures?

## Motivation

Fixed activations such as ReLU and GELU leave most function-shaping capacity to network width and depth. Learnable spline activations offer more adaptable transformations, but their grids can be expensive and sensitive near boundaries. The paper seeks a budget-controlled alternative that can represent sharp transitions and rational or near-singular structure directly, while exposing which low-order feature interactions the model uses.

## Contributions

- Defines a functional-ANOVA architecture with univariate main effects and a controllable sparse set of bivariate interactions.
- Parameterizes both effect types with low-degree rational functions whose denominators are constrained by `1 + softplus(.) + epsilon`, making the units pole-free.
- Adds residual-style gates that begin near the identity and gradually activate the learned rational transformation.
- Derives an additive empirical neural tangent kernel decomposition aligned with the main and pairwise effects, plus bounded-derivative and near-identity Jacobian arguments for stability.
- Evaluates the architecture on image classification, ImageNet-1K, real-image denoising, tabular learning, synthetic extrapolation, and symbolic recovery of physics formulas.

## Method

For an input $\mathbf{x}\in\mathbb{R}^d$, RAN uses

$$
f(\mathbf{x})=\sum_{i=1}^{d}r_i(x_i)+\sum_{(i,j)\in\mathcal{S}}r_{ij}(x_i,x_j),
$$

where $\mathcal{S}$ is a fixed or selected interaction set. Increasing its size adds second-order capacity explicitly, allowing the interaction topology to be matched to a parameter budget. For classification, the main and pairwise outputs are concatenated and passed to a linear readout.

Each main-effect unit is a quotient of low-degree polynomials. Its denominator is $1+\operatorname{softplus}(q(x))+\varepsilon$, so it remains strictly positive. Pairwise units use the same construction over a small bivariate monomial basis. A gate wraps each transformation as $r(x)=x+\alpha(\tilde r(x)-x)$; initializing $\alpha$ near zero preserves an approximately identity Jacobian at the start of training. The default experiments sample the interaction set once with a fixed seed, while gradient- and correlation-based selection are treated as ablations.

The paper also proposes a RAN-FFN that replaces a Transformer or Vision Transformer FFN activation with feature-wise rational units while preserving the surrounding linear projections. An optional pairwise variant adds explicit channel interactions at greater computational cost.

## Experiments

The visual classification study follows the Kanbefair protocol on MNIST, EMNIST-Letters, Fashion-MNIST, SVHN, CIFAR-10, and CIFAR-100 across multiple parameter budgets. RAN is generally close to or above the MLP and kernel-activation baselines; at 1.0M parameters it reports 59.05% on CIFAR-10 versus 56.45% for MLP and 56.95% for KAF, and 28.12% on CIFAR-100 versus 27.10% and 26.75%, respectively. The unusually large Fashion-MNIST margins, such as 97.79% at 400k parameters versus 89.50% for KAF and 89.30% for MLP, warrant replication.

On ImageNet-1K, replacing the FFN in ViT-T/16 yields the following reported comparison:

| Model | Parameters | FLOPs | Top-1 accuracy |
| --- | ---: | ---: | ---: |
| MLP/GELU | 5.7M | 1.08G | 72.3% |
| KAF | 5.9M | 1.12G | 73.2% |
| RAN | 5.7M | 1.08G | 74.2% |

The KAN configuration exceeded 48GB of GPU memory and is reported as out of memory rather than as an accuracy result. On PolyU denoising, the paper presents RAN as lying on the PSNR-parameter Pareto frontier, but compares small RAN and MLP instances with larger CNN and KAN operating points rather than enforcing one matched budget.

A component ablation at roughly 1M parameters reports that rational activations improve a dense MLP, while sparse ANOVA connectivity with ReLU reduces CIFAR-10 accuracy. Combining sparse connectivity and rational units gives the best reported TabArena score and CIFAR-10 accuracy, supporting complementarity rather than a benefit from sparsity alone. Removing positive denominators can cause divergence, and removing residual gating lowers accuracy. Synthetic Lorentzian, Runge-function, and Feynman-equation studies report strong extrapolation and symbolic-recovery results when the target has rational structure.

## Limitations

- The authors state that limited compute restricts model scale and pretraining breadth; the work does not test large language or multimodal foundation models.
- No publication year, venue, DOI, or arXiv identifier is present in the supplied paper text.
- Several benchmark tables report striking gains without enough per-run variance, implementation detail, or independent replication to assess their robustness.
- The PolyU comparison is an efficiency frontier study, not a uniformly parameter-matched comparison across all model families.
- The ImageNet KAN result is an out-of-memory outcome on the authors' hardware, not evidence that every viable KAN implementation is infeasible.
- The formal results establish pole-freeness and bounds under bounded inputs and weights. They do not by themselves guarantee favorable optimization or generalization after training.
- Explicit low-order effects aid inspection, but a learned component or interaction is predictive rather than causal, and the paper does not provide a user study or quantitative interpretability evaluation.
- Strong symbolic and extrapolation results occur on targets aligned with the rational inductive bias; performance is less decisive for functions poorly represented by low-degree rational forms.

## Related Concepts

- [[concepts/rational-anova-networks|Rational-ANOVA Networks]]: the paper's combination of pole-free rational units, low-order interaction structure, and identity-safe gating.
- [[concepts/kolmogorov-arnold-networks|Kolmogorov-Arnold Networks]]: the spline-based learnable-function architecture used as a principal comparison.
- Functional ANOVA: the decomposition that separates main effects from controlled low-order interactions.
- Rational approximation: the function class used to represent sharp transitions and rational structure with low-degree numerators and denominators.
- Empirical neural tangent kernel: the paper's tool for decomposing cross-sample influence by main and pairwise parameter groups.

## Related Papers

- Liu et al. (2024), "KAN: Kolmogorov-Arnold Networks," arXiv:2404.19756: introduces the modern spline-based KAN architecture.
- Molina, Schramowski, and Kersting (2019), "Pade Activation Units: End-to-End Learning of Flexible Activation Functions in Deep Networks," arXiv:1907.06732: a precursor on learned rational activations.
- Boulle, Nakatsukasa, and Townsend (2020), "Rational Neural Networks," arXiv:2004.01902: studies neural networks built from rational functions.
- Hu et al. (2023), "Interpretable Machine Learning Based on Functional ANOVA Framework: Algorithms and Comparisons," arXiv:2305.15670: develops functional-ANOVA models for interpretable learning.
- Yang, Zhang, and Sudjianto (2021), "GAMI-Net: An Explainable Neural Network Based on Generalized Additive Models with Structured Interactions," arXiv:2003.07132: a related sparse interaction architecture.

[[index|Library home]]
