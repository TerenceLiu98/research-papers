---
title: "Diff-MN: Diffusion Parameterized MoE-NCDE for Continuous Time Series Generation with Irregular Observations"
type: paper
authors:
  - Xu Zhang
  - Junwei Deng
  - Chang Xu
  - Hao Li
  - Jiang Bian
year: null
source_job_id: b22bc713-9bcd-4dd2-a2be-0c006209888d
tags:
  - time-series-generation
  - irregular-time-series
  - neural-controlled-differential-equations
  - diffusion-models
  - mixture-of-experts
---

## TL;DR

Diff-MN learns continuous time-series generators from irregular observations by combining a frozen channel-wise autoencoder, mixture-of-experts neural CDE dynamics, and a diffusion model that jointly generates regular-grid samples and their dynamics mixture weights. It reports strong generation results and improved forecasting after temporal refinement, but evaluation uses artificially dropped observations, gains are not universal across metrics, and continuous-time realism is assessed through limited proxies.

## Research Question

Can a model trained on irregular observations generate new time series that can be evaluated at arbitrary timestamps within the learned interval, with dynamics adapted to each generated sample?

## Motivation

Generating a fixed regular grid from irregular inputs does not establish that additional intermediate values follow plausible dynamics. [[concepts/neural-controlled-differential-equations|Neural Controlled Differential Equations]] provide observation-conditioned continuous trajectories, but a single shared dynamics function and joint optimization of initialization, dynamics, and readout can limit reconstruction. Diff-MN also addresses a mismatch between dynamics weights learned for training samples and the dynamics needed by newly generated sequences.

## Contributions

- A dense mixture of dynamics experts inside an NCDE, with sample-specific softmax weights.
- Decoupled training that freezes a pretrained channel-wise encoder and decoder while optimizing the dynamics experts and router.
- Joint diffusion modeling of imputed time series and their mixture weights, allowing new samples to carry matched parameters for continuous generation.
- Evaluation of [[concepts/continuous-time-series-generation|Continuous Time Series Generation]] through refined-history forecasting and recovery of synthetic polynomial coefficient distributions, alongside fixed-grid generation benchmarks. The authors' priority claim is not independently established here.

## Method

**Learn a reconstruction space.** A channel-wise MLP autoencoder processes each time point's channel vector, flattening batch and time dimensions during training. Cubic interpolation fills missing inputs, while reconstruction loss uses only observed entries. The encoder and decoder then replace the NCDE state-initialization and readout networks and remain frozen (Section 3.3; Algorithm 1).

**Learn observation-driven dynamics.** A router receives the interpolated sequence and produces dense softmax weights $s_i$ over shared expert functions. The main-text model is

$$
f_s(z)=\sum_{i=1}^{N_e}s_i f_{\theta_i}(z),\qquad
z(t)=z(0)+\int_0^t f_s(z(u))\,dX(u),
$$

where $X$ is the interpolated control path. With initialization $z(0)=f_{CE}(X(0))$, the decoded trajectory is trained to reconstruct observations, updating only the experts and router. The default uses four experts. Solving the trained model on a regular grid yields imputed sequences paired with their learned mixture weights (Sections 3.2-3.4; Algorithm 2).

**Generate sequences and parameters together.** A Gaussian denoising diffusion model learns the joint distribution of $(\mathcal O_{\mathrm{reg}},s)$ using noise-prediction squared error. At inference it samples both a sequence and mixture weights. A control path built from that generated sequence drives the pretrained NCDE with the generated weights, and the frozen decoder returns values at requested times within $[0,T]$ (Algorithms 3-4). The generated parameters are mixture coefficients, not newly generated expert networks.

Appendix D.2 specifies an NCDE hidden dimension of 64, Adam with learning rate $10^{-3}$, and batch size 256. The diffusion denoiser is a one-dimensional U-Net with four down/up stages, residual blocks, and attention; it is trained for 600 epochs at learning rate $10^{-4}$ and batch size 256.

## Experiments

The ten datasets comprise Sines, Stocks, Energy, MuJoCo, four UCR ECG datasets (ECG200, ECG5000, ECGFiveDays, TwoLeadECG), synthetic mixed signals, and cubic-polynomial data. Irregularity is simulated by randomly dropping 30%, 50%, or 70% of observations. The public TSG results average sequence lengths 12, 24, and 36; ECG sequences retain their dataset-specific lengths. Baselines include KO-VAE, GT-GAN, ProFITi, HeT-VAE, and TimeGAN, TimeVAE, and diffusion models preceded by standard NCDE imputation.

**Irregular-to-regular generation.** Tables 1-2 report discriminative score (DS), marginal distribution difference (MDD), and KL divergence. Selected Table 1 results at 50% missingness are below; lower is better.

| Dataset and metric | Diff-MN | KO-VAE | Diffusion-NCDE | ProFITi |
| --- | ---: | ---: | ---: | ---: |
| Sines DS | 0.128 | 0.171 | 0.330 | 0.344 |
| Stocks MDD | 0.281 | 0.662 | 0.476 | 0.408 |
| Energy KL | 0.022 | 0.067 | 0.058 | 0.033 |
| MuJoCo KL | 0.009 | 0.198 | 0.058 | 0.015 |

The results favor Diff-MN broadly, but not in every cell. At 30% missingness, ProFITi has lower Energy MDD (0.255 versus 0.270) and MuJoCo MDD (0.295 versus 0.347). At 50% missingness, ProFITi has lower ECG200 KL (0.073 versus 0.090). These exceptions qualify the manuscript's blanket superiority claim.

**Continuous generation.** Section 4.3 inserts intermediate points into generated histories, roughly doubling their length, and trains a GRU to predict the same final step. Table 3 reports lower average MSE for refined Diff-MN than its unrefined version on all four datasets and missingness settings. At 50% missingness, MSE changes from 0.050 to 0.026 on Sines, 0.005 to 0.002 on Stocks, 0.014 to 0.013 on Energy, and 0.030 to 0.029 on MuJoCo. Standard NCDE refinement generally worsens KO-VAE and GT-GAN results. Averaging hides exceptions: at length 12 and 30% missingness, Diff-MN refinement increases MuJoCo MSE from 0.025 to 0.027 (Table 11).

For the polynomial experiment, coefficients of $y=ax^3+bx^2+cx+d$ are sampled from Gaussian distributions, with 2,500 samples per coefficient and 24 input positions in $[-1,1]$. The authors report that coefficient distributions recovered from generated curves resemble the originals, with refinement improving visual agreement. This is distributional recovery on a known synthetic family, rather than identification of real-world dynamics.

**Ablations and cost.** Removing the MoE or frozen-autoencoder design generally worsens reconstruction/generation metrics, with exceptions in Table 4. Four experts outperform one deeper expert with the same total number of linear layers in Table 5; this comparison does not by itself establish equal parameter counts. Dense routing is competitive with sparse routing, but more experts do not reliably help. The reported double-length generation time for 3,674 stock sequences of length 12 is 1.2 seconds for MoE-NCDE versus 0.81 seconds for standard NCDE (Section 4.5).

**Privacy proxy.** Table 10 reports the lowest average membership inference risk for Diff-MN: 0.6846 versus 0.7325 for KO-VAE and 0.7226 for Diffusion-NCDE. Diff-MN is not best in every cell, and this empirical attack metric supplies no formal privacy guarantee.

## Limitations

- Missingness is simulated on otherwise available observations. Evaluation on naturally irregular data without dense ground truth remains open, as the authors acknowledge.
- Generation depends on observation quality, the interpolation path, and NCDE solver cost. Increasing the number of experts can degrade performance when observations and pattern diversity are limited.
- Refined-history forecasting and polynomial coefficient recovery test useful consequences of generation, but do not establish full trajectory-distribution fidelity. The stated domain is interpolation within $[0,T]$, not unrestricted temporal extrapolation.
- Reported tables provide point estimates without uncertainty intervals. Main-text averages should be distinguished from individual sequence-length results; some aggregates also appear inconsistent with appendix entries. For example, the Stocks Diffusion-NCDE KL values at 30% missingness in Tables 7-9 are 0.012, 0.438, and 0.235, which do not average to the 0.085 listed in Table 1.
- Appendix B.2 writes state-dependent routing weights, whereas Section 3.2 and Algorithm 2 describe sequence-level weights. Its argument about rapidly varying trajectories should not be read as a general proof of mathematical nonsmoothness under smooth controls.
- The supplied Markdown does not establish the publication year, venue, DOI, or arXiv identifier. The source's code URL is recorded below; repository availability was not independently checked.

## Related Concepts

- [[concepts/neural-controlled-differential-equations|Neural Controlled Differential Equations]]: continuous latent dynamics driven by an interpolated observation path.
- [[concepts/continuous-time-series-generation|Continuous Time Series Generation]]: generating new trajectories with flexible sampling resolution.
- [[concepts/diffusion-models|Diffusion Models]]: jointly generating sequence values and sample-specific dynamics mixture coefficients.

## Related Papers

- Kidger et al. (2020), "Neural controlled differential equations for irregular time series": the observation-driven continuous-time foundation.
- Naiman et al. (2024), "Generative modeling of regular and irregular time series data via Koopman VAEs": KO-VAE comparator.
- Jeon et al. (2022), "GT-GAN: General purpose time series synthesis with generative adversarial networks": generative baseline and continuous-refinement comparator.
- Huang et al. (2025), "TimeDP: Learning to generate multi-domain time series with domain prompts": cited diffusion baseline.

Code URL supplied by the paper: [TimeCraft / Diff-MN](https://github.com/microsoft/TimeCraft/tree/main/Diff-MN).

[[index|Library home]]
