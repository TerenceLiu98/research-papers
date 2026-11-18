---
title: "PEIRA: Learning Predictive Encoders through Inter-View Regressor Alignment"
type: paper
authors:
  - Michael Arbel
  - Basile Terver
  - Jean Ponce
year: null
source_job_id: "f264cc0f-8d51-4c02-893a-77ec081ad232"
tags:
  - self-supervised-learning
  - representation-learning
  - canonical-correlation
---

## TL;DR

PEIRA replaces JEPA-style self-distillation with an explicit objective that rewards the trace of an optimal regularized inter-view linear predictor while controlling feature scale. In the analyzed population setting, its only stable equilibria recover the leading nonlinear canonical correlation subspace selected by regularization. ImageNet-1K linear-probe accuracy reaches 69.17% with a 1024-dimensional projector; the practical neural-network algorithm does not inherit an unconditional non-collapse guarantee.

## Research Question

Which predictive features do nonlinear encoders learn under fast linear-predictor self-distillation, and can an explicit objective preserve that spectral target while removing stable collapsed equilibria?

## Motivation

Stop-gradient and moving-target updates need not minimize a single objective. Their empirical success therefore leaves both their statistical target and collapse behavior unclear. A tractable nonlinear-encoder analysis can connect predictive representation learning to canonical correlation analysis without assuming linear encoders or isotropic data.

## Contributions

- Characterizes convergence and stable equilibria of a symmetric JEPA-style system with an optimal ridge predictor, including stable zero and partially collapsed representations.
- Introduces PEIRA and proves that, under its stated assumptions and regularization range, stable equilibria are global minima spanning a maximal leading canonical subspace; other critical points are strict saddles.
- Derives an auxiliary gradient objective and a stochastic algorithm using running second moments without backpropagating through the predictor solve.
- Evaluates classification, eight-dataset transfer, spectral alignment, initialization sensitivity, and computational cost.

## Method

For paired views and square-integrable encoders U and V, form the symmetric cross-view second moment Σ and the sum N of within-view second moments. The optimal ridge predictor is P = Σ(N + λI)⁻¹. PEIRA maximizes its trace with a feature-scale penalty, replacing the detached-target regression dynamics with gradient flow of an explicit objective.

The population analysis assumes a density-ratio integrability condition supporting a compact canonical-correlation operator and distinct canonical correlations. For 0 < λ < √c₁, stable solutions retain up to k leading modes satisfying √cᵢ > λ, with amplitudes proportional to (√cᵢ − λ)¹ᐟ² (Propositions 4.3–4.4). If λ ≥ √c₁, every mode is filtered out and the zero solution is stable. Thus regularization selects the attainable dimension rather than guaranteeing full output rank.

SC-PEIRA estimates Σ and N with exponential moving averages, solves for the predictor and inverse regularized moment matrix, and holds these estimates fixed while differentiating an auxiliary loss. At exact population estimates this partial gradient equals the PEIRA gradient. The EMA rate in Algorithm 1 weights the current batch, rather than denoting the usual historical momentum. Symmetric views can share an encoder.

## Experiments

Table 1 reports mean ± sample standard deviation over three seeds for the controlled classification experiments. ImageNet-1K uses ResNet-50 for 100 epochs; CIFAR-10 uses ResNet-18 for 1000 epochs. Augmentations and budgets are standardized, while projectors and optimization settings remain method-specific.

| Method | ImageNet-1K top-1 (%) | CIFAR-10 top-1 (%) | Eight-task transfer mean (%) |
| --- | --- | --- | --- |
| VICReg | 68.81 ± 0.09 | 90.92 ± 0.14 | 72.07 |
| SIGReg | 66.26 ± 0.28 | 92.34 ± 0.21 | 68.27 |
| PEIRA, k=256 | 66.45 ± 0.11 | 91.36 ± 0.12 | 70.89 ± 0.18 |
| PEIRA, k=1024 | 69.17 ± 0.06 | 91.68 ± 0.18 | 71.09 ± 0.24 |

Transfer averages top-1 accuracy on three datasets and mean per-class recall on five; baseline transfer results use one seed. PEIRA leads the controlled ImageNet comparison at k=1024 but trails SIGReg on CIFAR-10 and VICReg on mean transfer. Published BYOL, SimSiam, and SimCLR numbers are indicative comparisons from different recipes.

Synthetic Gaussian pairs support the predicted rank thresholds and canonical-direction recovery. On CIFAR-10, PEIRA resists severe dimensional collapse across initialization multipliers 0.01, 0.1, and 1, while the compared self-distillation system is more sensitive. At multiplier 10, PEIRA remains near rank one with one covariance-EMA configuration (Appendix G.12).

The k=256 ablation recipe remains about 2.3–2.4 percentage points behind VICReg when training extends from 100 to 300 epochs; these are not the stronger k=1024 main results. On eight H200 GPUs, the reported k=256 recipe takes 626 seconds per epoch, compared with 822 for VICReg and 809 for SIGReg, with different projector sizes. Negative objective values correlate with probe accuracy, but this does not establish a universal label-free model-selection rule.

## Limitations

Population, continuous-time, nonparametric guarantees do not jointly control finite batches, EMA bias, matrix-inverse perturbations, discretization, and neural-network optimization. Repeated canonical correlations require additional stability analysis: Appendix B.6 leaves that extension conjectural. Initialization tests use method-specific optimization settings, and the large-initialization failure prevents an unconditional practical collapse claim. Experiments emphasize image classification and transfer, leaving video and action-conditioned planning to future work. The supplied Markdown does not establish a publication year or stable paper identifier.

## Related Concepts

- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]] — PEIRA analyzes a specific symmetric fast-predictor variant and replaces its self-distillation dynamics with an explicit objective.
- [[concepts/linear-probing|Linear Probing]] — frozen representation quality is assessed through linear classification readouts.

## Related Papers

- [[papers/when-does-lejepa-learn-a-world-model|When Does LeJEPA Learn a World Model?]] — complementary population analysis of alignment with Gaussian regularization; its latent-identifiability question differs from PEIRA's canonical-subspace and stability characterization.

Source-provided resources: [project](https://peira-ssl.github.io), [loss implementation](https://github.com/MichaelArbel/peira-loss), and [experiments](https://github.com/Basile-Terv/PEIRA).
