---
title: "Autoregressive One-Step Generative Modeling for Dynamical System Forecasting"
type: paper
authors:
  - Tianyue Yang
  - Xiao Xue
year: null
source_job_id: e7e7a08c-90dd-4497-ae62-26830140334b
tags:
  - dynamical-systems
  - generative-forecasting
  - mean-flow
  - autoregressive-modeling
  - turbulence
---

## TL;DR

MeLISA is a latent-free stochastic surrogate that generates a future block of a physical trajectory with one pixel-space MeanFlow evaluation. Masked-window conditioning makes the one-step task nontrivial, while a finite-lag increment loss targets temporal covariance and mixing behavior. On 192 x 192 turbulent channel-flow slices and 256 x 256 Kolmogorov flow, its reported rollouts are competitive with or better than autoregressive neural operators in short-term accuracy and preserve long-horizon physical statistics more faithfully, at comparable inference time.

## Research Question

Can a generative surrogate forecast high-resolution turbulent dynamics with one model evaluation per block while preserving the temporal and spectral statistics that usually degrade during long autoregressive rollouts?

## Motivation

Autoregressive [[concepts/neural-operators|Neural Operators]] are fast but can accumulate errors and drift away from the invariant statistics of chaotic systems. Diffusion and flow-based forecasters model conditional uncertainty, but commonly require iterative sampling, progressive noise schedules, or latent encoders. The paper seeks a pixel-space alternative that retains stochastic forecasting without those inference-time components.

## Contributions

- MeLISA, a stochastic blockwise transition kernel requiring one network evaluation per forecast block and no latent encoder.
- Window-Consistency MeanFlow (WinC-MF), which extends pixel MeanFlow to partially observed temporal windows and trains the model to infer masked frames from noisy and clean context.
- Time Increment Consistency (TIC), an anchored multi-lag loss that matches predicted and observed finite-time increments and thereby constrains temporal covariance decay.
- UNet and diffusion-transformer implementations evaluated at resolutions up to 256 x 256, including compact 3.68M- and 5.65M-parameter variants and a 150M-parameter model.

## Method

MeLISA samples a clean temporal window, corrupts it along a shared linear flow path, and exposes a masked subset of clean frames as guidance. WinC-MF applies the improved MeanFlow identity to this window-valued target. Because future frames remain hidden, the denoiser learns a conditional distribution rather than a copy operation.

TIC supplements this objective by comparing increments from a common anchor frame across several lags. For a stationary process, expected squared lagged increments equal twice the difference between zero-lag and lagged covariance, so this loss directly constrains second-order temporal structure. At short lags it approximates tendency matching. For the projected channel-flow observable, the paper interprets it as constraining finite-lag effects that include unresolved dynamics and memory rather than imposing a closed two-dimensional PDE.

At inference, Gaussian noise is concatenated with the observed context and a mask. One denoiser call produces the complete window, its future tail is appended to the forecast, and the newest frames become context for the next block. This supports arbitrary forecast horizons through repeated blockwise rollout.

## Experiments

The study uses KF256, 70 trajectories of 256 x 256 vorticity from forced two-dimensional Kolmogorov flow, and TCF192, 192 x 192 slices of a three-dimensional turbulent channel-flow simulation. FNO, UNO, and Local-FNO baselines receive the same two input frames and predict four output frames. Short-term metrics cover the first 40 frames; long-term metrics cover all 320 KF256 or 625 TCF192 frames.

On TCF192, the 10.5M-parameter MeLISA-Delta-S reports the best relative L2 error (0.0396) and SSIM (0.956), while the compact MeLISA-Upsilon variants give the strongest MeLISA spectral or mixing results and recover near-boundary turbulent kinetic energy more accurately than the neural operators. On KF256, every MeLISA variant beats the three baselines in relative L2 error; MeLISA-Upsilon-XS reaches 0.130 versus 0.187 for the best neural-operator baseline. The MeLISA models also substantially reduce power-spectrum discrepancy, while Local-FNO fails to complete the full rollout.

Wall-clock inference on one RTX 4090 is comparable to the baselines: reported KF256 trajectory times range from 6.4 to 11 seconds for MeLISA and 7.4 to 9.1 seconds for stable neural operators. The scaling results are mixed: larger transformer variants generally improve some long-horizon statistics, but short-term accuracy does not improve monotonically.

## Limitations

- Evaluation covers only two fluid-dynamics benchmarks and two-dimensional learned fields; fully three-dimensional, multiscale, and broader dynamical systems remain future work.
- The closest rolling generative methods are discussed conceptually rather than evaluated directly, so the experiments establish advantages over deterministic neural operators, not over contemporary iterative generative forecasters.
- Training is expensive: the MeLISA runs use 32 GH200 nodes with four GPUs each for four hours, reported as roughly five days on four GH200 GPUs.
- Model scaling is not monotonic under the cost-matched training setup and limited dataset size.
- WinC-MF is the mechanism that defines the forecasting formulation and therefore cannot be removed in a conventional component ablation.
- The supplied manuscript does not state a publication year, venue, DOI, or paper-level arXiv identifier.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: MeLISA builds on average-velocity transport but replaces iterative ODE integration with a one-step MeanFlow map.
- [[concepts/functional-mean-flow|Functional Mean Flow]]: a related one-step transport formulation for function-valued data; MeLISA instead constructs a masked autoregressive kernel for temporal physical fields.
- [[concepts/neural-operators|Neural Operators]]: the deterministic surrogate family used as the main experimental baseline.
- [[concepts/diffusion-models|Diffusion Models]]: related stochastic forecasters usually trade iterative denoising for conditional-distribution modeling.

## Related Papers

- [[papers/mean-flows-for-one-step-generative-modeling|Mean Flows for One-step Generative Modeling]]: introduces the average-velocity identity underlying one-step transport.
- Lu et al. (2026), "One-step latent-free image generation with pixel mean flows": supplies the pixel-space MeanFlow parameterization adapted by MeLISA.
- Cachay et al. (2025), "Elucidated rolling diffusion models for probabilistic forecasting of complex dynamics": a solver-based rolling generative approach discussed as a close methodological family.
- McCabe et al. (2023), "Towards stability of autoregressive neural operators": studies the rollout-instability problem that motivates long-horizon regularization.

[[index|Library home]]
