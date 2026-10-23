---
title: "FM-TS: Flow Matching for Time Series Generation"
type: paper
authors:
  - Yang Hu
  - Xiao Wang
  - Lirong Wu
  - Huatian Zhang
  - Stan Z. Li
  - Sheng Wang
  - Tianlong Chen
year: null
tags:
  - time-series-generation
  - flow-matching
  - forecasting
  - imputation
---

## TL;DR

FM-TS applies rectified [[concepts/flow-matching|Flow Matching]] to unconditional time-series generation, then reuses the same trained model for forecasting and imputation through a masked inference procedure. Across six length-24 datasets, it reports the best discriminative score among the evaluated methods; conditional experiments also improve Solar forecasting and MuJoCo imputation over Diffusion-TS. Results for longer sequences are mixed, especially on Energy.

## Research Question

Can a rectified-flow model generate realistic time series more efficiently than diffusion baselines while supporting unconditional generation, forecasting, and imputation without task-specific retraining?

## Motivation

Time-series generators can supplement scarce or costly observations, but diffusion models typically require many iterative denoising steps. FM-TS replaces the noise-reversal process with an ODE velocity field trained along linear paths from Gaussian noise to data. The paper studies whether straighter transport paths reduce inference cost while retaining temporal structure.

## Contributions

- Adapts rectified flow matching to multivariate time-series generation with an encoder-decoder Transformer backbone.
- Trains one unconditional velocity model and introduces masked inference that incorporates observed values for forecasting and imputation without retraining.
- Uses logit-normal time sampling during training, a shifted schedule for unconditional inference, and $t^k$ power sampling for conditional inference.
- Evaluates short- and long-sequence unconditional generation, inference efficiency, forecasting, imputation, and selected sampling ablations.

## Method

For data $Z_1$ and Gaussian noise $Z_0$, FM-TS samples an interpolation time $t$ from a logit-normal distribution and forms

$$
Z_t=tZ_1+(1-t)Z_0.
$$

The network $G$ regresses the constant conditional displacement:

$$
\mathcal L=\mathbb E\left[\left\|(Z_1-Z_0)-G(Z_t,t)\right\|^2\right].
$$

The backbone follows Diffusion-TS's encoder-decoder Transformer and adds QK-RMSNorm, rotary position embeddings, attention registers, and sigmoid attention. Unconditional generation numerically integrates the learned field with a shifted timestep schedule controlled by $\alpha$; the reported default is $\alpha=3$.

For conditional generation, an observation mask identifies known entries. At every step, the algorithm resamples noise, constructs an interpolated state, replaces observed coordinates with noisy interpolations of their known values, evaluates the unconditional model, and takes one Euler update toward its endpoint estimate. It transforms each nominal time as $t^k$ to emphasize later portions of the path; the reported default is $k=0.0625$.

## Experiments

**Unconditional generation.** Length-24 experiments use Sines, Stocks, ETTh, MuJoCo, Energy, and fMRI. Baselines include Diffusion-TS, TimeGAN, TimeVAE, DiffWave, DiffTime, and COT-GAN. FM-TS reports discriminative scores of 0.005, 0.019, 0.011, 0.005, 0.053, and 0.106, respectively, improving on Diffusion-TS in all six cases. It also leads most Context-FID and correlational comparisons, but not every metric: Diffusion-TS has lower Context-FID on fMRI, lower correlational score on Stocks, and slightly lower predictive score on MuJoCo.

**Longer sequences.** On ETTh at lengths 64, 128, and 256, FM-TS is competitive across the four reported metrics, although Diffusion-TS has a lower discriminative score at length 256. Energy is less favorable: FM-TS improves Context-FID at lengths 64 and 256, while Diffusion-TS is better on many discriminative, predictive, and correlational comparisons. This qualifies the paper's broad short-sequence gains.

**Conditional generation.** Without conditional retraining, FM-TS reports Solar 168-to-24 forecasting MSE of $2.13\times10^2$, versus $3.75\times10^2$ for Diffusion-TS. On MuJoCo imputation, its MSE is 0.00007 at 70% missingness and 0.00014 at 80%, versus 0.00027 and 0.00032 for Diffusion-TS.

**Efficiency and ablations.** On Energy, the figures report better FID than Diffusion-TS over the evaluated training epochs and sampling budgets; performance begins to saturate near 32 function evaluations. The timing evidence is presented graphically rather than as a hardware-normalized table. Replacing logit-normal training times with uniform sampling changes Energy FID from 0.028 to 0.029, Context-FID from 0.721 to 0.676, discriminative score from 0.058 to 0.056, and predictive score remains 0.250, so the four reported metrics do not uniformly favor the default. Conditional sweeps indicate that smaller $k$ can improve results when more inference steps are used.

## Limitations

- Long-sequence results are dataset-dependent: several Energy metrics favor Diffusion-TS, and performance degrades as sequence length increases.
- The conditional evaluation covers only Solar forecasting and MuJoCo imputation, so zero-shot conditional transfer is not established broadly across domains or mask patterns.
- The unconditional model still uses iterative numerical inference; the main experiments select about 32 evaluations despite describing rectified flow as capable of one-step generation.
- Efficiency comparisons do not provide a complete hardware-normalized accounting of wall-clock time, memory, model size, or training compute.
- The logit-normal ablation is mixed rather than uniformly supportive, and the paper does not isolate all architectural additions or compare them at fixed compute.
- The supplied manuscript states no publication year, venue, or stable paper identifier. Code is linked at https://github.com/UNITES-Lab/FMTS.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: the velocity-regression objective and ODE sampling framework used by FM-TS.
- [[concepts/diffusion-models|Diffusion Models]]: the iterative generative baseline family against which FM-TS is primarily evaluated.
- [[concepts/continuous-time-series-generation|Continuous Time Series Generation]]: related trajectory generation in continuous time; FM-TS instead generates fixed-grid arrays through a continuous transport path.
- [[concepts/latent-space-time-series-forecasting|Latent-Space Time Series Forecasting]]: a related family of generative forecasting approaches, although FM-TS operates directly on the modeled time-series representation described in the paper.

## Related Papers

- Liu, Gong, and Liu, "Flow Straight and Fast: Learning to Generate and Transfer Data with Rectified Flow" (2022): supplies the rectified-flow formulation used by FM-TS.
- Yuan and Qiao, "Diffusion-TS: Interpretable Diffusion for General Time Series Generation" (2024): supplies the primary baseline and the encoder-decoder architecture adapted by FM-TS.
- Tashiro et al., "CSDI: Conditional Score-based Diffusion Models for Probabilistic Time Series Imputation" (2021): a conditional diffusion baseline for imputation.
- [[papers/protoflow-prototype-guided-flow-matching-for-multivariate-time-series-forecasting|ProtoFlow: Prototype-Guided Flow Matching for Multivariate Time Series Forecasting]]: later related work that initializes conditional latent transport from learned prototypes.

Source: supplied parsed manuscript, Cognitio job `f8441108-dca6-4d6c-b0bf-bf22a9a1dc55`. Publication year is unspecified in the source.

[[index|Library home]]
