---
title: "PANDA: A Pretrained Forecast Model for Chaotic Dynamics"
type: paper
authors:
  - Jeffrey Lai
  - Anthony Bao
  - William Gilpin
year: null
tags:
  - dynamical-systems
  - time-series-forecasting
  - zero-shot-learning
  - synthetic-data
---

## TL;DR

Panda (Patched Attention for Nonlinear DynAmics) combines synthetic chaotic-system pretraining with temporal and cross-channel attention. A roughly 21M-parameter model forecasts unseen systems, experimental recordings, and two PDE benchmarks without target-system fine-tuning. Its main contribution is evidence that diversity of governing dynamics improves transfer even at fixed training-data volume. Strong short-term accuracy coexists with eventual mean regression, and long-term reconstruction rankings depend on horizon and metric implementation.

## Research Question

Can a model pretrained entirely on simulated low-dimensional chaotic dynamics forecast previously unseen governing systems, including experimental data and higher-dimensional PDEs?

## Motivation

Training and testing on different trajectories of the same equations primarily tests an in-domain propagator. Panda instead targets transfer across equations. Within [[concepts/time-series-foundation-models|Time Series Foundation Models]], it emphasizes deterministic coupling between variables and dynamical diversity in pretraining. [[concepts/dynamical-systems-reconstruction|Dynamical Systems Reconstruction]] supplies a complementary criterion: forecasts should preserve attractor structure as well as near-term trajectories.

## Contributions

- Generates approximately 20,000 chaotic ODE systems through parameter mutation, skew-product recombination, and dynamical screening.
- Introduces a patch-based encoder with alternating temporal and channel attention, dynamics-inspired feature embeddings, and optional masked-patch pretraining.
- Evaluates transfer to held-out equation families, experimental recordings, and PDE dynamics.
- Separates the effect of system diversity from total training timepoints and probes learned attention with frequency mixtures.

## Method

**Synthetic systems.** Starting from 129 curated chaotic systems, the authors perturb parameters and couple driver and response flows through

$$
\dot{x}=f_a(x,t),\qquad
\dot{y}=\kappa_b f_b(y,t)+\kappa_a f_a(x,t).
$$

Scale factors normalize flow magnitudes. Numerical integration and screening reject divergence, fixed points, periodic behavior, and nonstationarity; tests include the chaos 0-1 test, recurrence and spectral diagnostics, and an estimated positive maximum Lyapunov exponent. Trajectories contain 4,096 observations, with integration timescales standardized to dominant spectral periods. Augmentations include delay coordinates, linear combinations, and affine transformations.

**Transfer split.** Twenty founder systems and their descendants are excluded from training, producing approximately 9,300 held-out systems (9,347 in Table 10). This tests generalization beyond new initial conditions of familiar equations, although training and evaluation share the generation procedure.

**Architecture.** The default model uses a 512-step context, nonoverlapping patches of length 16, eight encoder layers, eight heads, and width 512. Patch embeddings incorporate polynomial and random Fourier features motivated by extended dynamic mode decomposition. Temporal attention uses partial rotary positional encoding; channel attention treats variables as a set without positional encoding. Mean pooling over patch positions and a linear head generate 128 future observations. Longer forecasts use window autoregression.

**Training.** Appendix B clarifies that batches sample three channels from multivariate trajectories; the underlying training systems are not all intrinsically three-dimensional. Inference processes the full channel set. Forecast training uses MSE and AdamW for 100,000 iterations. Optional masked pretraining reconstructs 50% of patches, masked independently across channels, for 200,000 iterations. The masked model also supports completion rather than forecasting.

The source provides [code](https://github.com/abao1999/panda), [original weights](https://huggingface.co/GilpinLab/panda), and [72M forecast weights](https://huggingface.co/GilpinLab/panda-72M).

## Experiments

**Held-out forecasting.** Tables 8 and 9 report medians across held-out systems; lower is better. The table below selects deterministic forecast baselines. Chronos-SFT is fine-tuned on Panda's chaotic-system training data, not on the held-out target systems.

| Model | sMAPE, 128 steps | sMAPE, 512 steps | MAE, 128 steps | MAE, 512 steps |
| --- | --- | --- | --- | --- |
| Panda | 27.6 | 46.3 | 0.35 | 0.65 |
| Chronos 20M SFT | 30.3 | 48.8 | 0.56 | 1.25 |
| Chronos 200M | 36.0 | 53.5 | 0.61 | 1.07 |
| DynaMix | 47.1 | 60.8 | 0.79 | 1.02 |

The authors caution that DynaMix benefits from longer contexts than this 512-step setup. Table 6 supports many statistically significant improvements, but its 512-step sMAPE comparison against probabilistic Chronos 20M SFT has adjusted $p=0.326$, so significance is not universal.

**Ablations and diversity.** Channel attention improves forecasts. Masked pretraining helps near-term prediction but degrades autoregressive rollout; its combination with dynamics embeddings is not uniformly beneficial. Polynomial embeddings favor longer horizons. Across eight nested training subsets, increasing unique systems from approximately 156 to 20,000 improves transfer while the number of initial conditions per system decreases from 128 to one and total timepoints remain fixed (Section 5.3). This is diversity scaling, not an isolated model-size scaling law.

**Experimental and PDE transfer.** The paper reports improvements over Chronos-SFT on double-pendulum recordings, C. elegans posture components, and coupled electrical oscillators. The relative advantage increases with oscillator coupling strength. Zero-shot PDE demonstrations cover Kuramoto-Sivashinsky dynamics with 64 Fourier modes and a von Karman vortex street represented by 512 principal components of vorticity. The FNO and DeepONet baselines train for one-step prediction on target contexts; their context and rollout protocols differ from foundation-model forecasting, and Appendix H explicitly disclaims a general superiority claim over operator learning.

**Long-term fidelity.** At 512 forecast steps, Table 1 reports GMM-based KL divergence of 3.93 for Panda versus 4.72 for Chronos 20M SFT, and spectral Hellinger distance of 0.25 versus 0.29. At 3,584 steps, KL reverses to 6.39 versus 6.05. The alternative geometric-misalignment KL implementation already favors Chronos-SFT at 512 steps, 2.52 versus Panda's 2.82 (Table 15). Evaluating only the last 2,048 steps of a 3,584-step rollout exposes mean regression: Panda has geometric-misalignment KL 15.25 and spectral distance 0.49, versus 7.00 and 0.34 for Chronos-SFT (Table 17).

**Completion, scale, and efficiency.** With half the patches erased in 4,096-step contexts, Table 10 reports $R^2$ between estimated completed-trajectory and ground-truth correlation dimensions of 0.78 for Panda MLM, 0.91 for MLM-66M, and 0.71 for cubic splines; these are not pointwise reconstruction $R^2$ scores. Panda 72M reaches median sMAPE 20.6 at 128 steps and 39.9 at 512 steps, but changes model size, training duration, and data together. Table 7 measures 512-step forecast latency of 0.031 seconds for Panda versus 1.880 seconds for Chronos 20M over 1,000 calls on one H100.

**Representation probes.** Two-tone inputs produce multiscale attention-entropy patterns absent in a univariate ablation. The authors interpret these as nonlinear resonance; recurrence-like and banded attention maps suggest use of global context. These probes do not establish recovery of the true governing equations.

## Limitations

- Low-dimensional synthetic pretraining and two PDE demonstrations leave broader high-dimensional transfer unresolved. Shared generation rules also constrain the scope of equation-family generalization.
- Long rollouts can collapse toward the mean. Full-rollout averages, tail-only evaluation, and alternative divergence implementations give materially different assessments.
- Masked completion pretraining and forecast rollout have conflicting effects. Longer-context completion success does not imply longer-context forecasting success.
- DynaMix comparisons use a different context regime from its original evaluation; operator-learning baselines also have unmatched prediction protocols. Some baseline forecasts contain NaNs.
- The supplied Markdown gives no explicit publication year, venue, DOI, or arXiv identifier. It also contains inconsistencies, including 129 founders in the main text versus 135 in Appendix A.5. The main-text count is retained here without resolving the discrepancy.

## Related Concepts

- [[concepts/time-series-foundation-models|Time Series Foundation Models]]: synthetic pretraining and transfer across systems.
- [[concepts/dynamical-systems-reconstruction|Dynamical Systems Reconstruction]]: attractor fidelity beyond short-term forecast accuracy.

## Related Papers

- [[papers/true-zero-shot-inference-of-dynamical-systems-preserving-long-term-statistics|True Zero-Shot Inference of Dynamical Systems Preserving Long-Term Statistics]]: DynaMix uses recurrent experts and prioritizes long-term dynamical statistics; comparisons require attention to context and horizon.
- [[papers/a-decoder-only-foundation-model-for-time-series-forecasting|A Decoder-Only Foundation Model for Time-Series Forecasting]]: introduces TimesFM, a patch-based univariate baseline evaluated by Panda.
- Ansari et al. (2024), "Chronos: Learning the Language of Time Series": tokenized forecasting baseline, including supervised fine-tuning on Panda's synthetic data.
- Gilpin (2021), "Chaos as an Interpretable Benchmark for Forecasting and Data-Driven Modelling": source of the curated founder systems.

[[index|Library home]]
