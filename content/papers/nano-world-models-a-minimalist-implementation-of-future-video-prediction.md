---
title: "Nano World Models: A Minimalist Implementation of Future Video Prediction"
type: paper
authors:
  - Siqiao Huang
  - Partha Kaushik
  - Michael Chen
  - Hengkai Pan
  - Kaiwen Geng
  - Omar Chehab
  - Fernando Moreno-Pino
  - Max Simchowitz
year: null
tags:
  - world-models
  - video-prediction
  - diffusion-forcing
  - model-based-control
---

## TL;DR

Nano World Models is a modular implementation of future video prediction that uses diffusion forcing to compare objectives, architectures, action conditioning, latent spaces, and rollout procedures. RT-1 experiments favor x- and v-prediction over the tested noise-prediction configuration and improve with model size. Action conditioning is task-dependent: FiLM performs best on RT-1, while additive conditioning offers a strong quality-cost tradeoff on PushT. In PushT planning, the tested VAE checkpoint achieves 25% success, but Web-DINO and V-JEPA 2.1 checkpoints achieve 0% and barely respond to changes in actions. These findings concern the tested training recipe, not a general ranking of representation families.

## Research Question

How do prediction targets, model scale, action injection, latent representations, and sampling budgets affect future video prediction and goal-conditioned planning when studied through a shared implementation?

## Motivation

World-model research spans incompatible datasets, training recipes, evaluations, and downstream interfaces. This fragmentation makes it difficult to distinguish algorithmic effects from implementation differences. Nano World Models uses [[concepts/diffusion-forcing|Diffusion Forcing]] as a shared interface for studying [[concepts/world-models|World Models]] across simulated control, game footage, and real-robot observations.

## Contributions

- A configurable PyTorch framework sharing data loading, conditioning, training, sampling, and evaluation across diffusion and flow-matching objectives.
- Support for multiple transformer sizes, five action-injection mechanisms, and VAE, Web-DINO, and V-JEPA 2.1 observation spaces.
- Controlled ablations on RT-1 and PushT, including diagnostics of action-insensitive prediction in semantic latent spaces.
- Sliding-window generation, batched rollouts for model predictive control, and an export interface for downstream 3D reconstruction. The manuscript also describes released configurations, evaluation scripts, data, and checkpoints.

## Method

**Prediction interface.** Observations are encoded as latent frames. Diffusion forcing assigns each frame its own noise index, allowing clean or nearly clean context and noisier future frames in the same trajectory. Varying the noise schedule expresses teacher-forced prediction, masked future prediction, and autoregressive generation. Diffusion supports clean-data ($x$), noise ($\epsilon$), and velocity ($v$) targets; flow matching predicts the vector field of an interpolant between data and noise (Sections 3.1-3.2).

**Architecture and actions.** A transformer processes spatial patches of latent frames with interleaved spatial and temporal attention. Model families are S, B, L, and XL; the suffix in B/2 denotes latent patch size. Actions enter through element-wise addition, adaptive layer normalization (adaLN), adaLN fused with timestep conditioning, FiLM, or cross-attention (Section 3.3).

**Representation and rollout.** VAE latents decode to RGB, whereas Web-DINO and V-JEPA features support representation-space prediction without a native RGB decoder. Generated frames become context in a sliding temporal window, extending generation beyond the training window. This extension does not prevent accumulated prediction error (Sections 3.4 and 3.6).

**Planning and 3D export.** A cross-entropy-method (CEM) planner samples action sequences, evaluates batched predicted futures against a goal, updates its candidate distribution, executes the first selected action, and replans. Video export supplies decoded frames and metadata to separate depth and camera-estimation systems for point-cloud reconstruction; the world model itself does not estimate that geometry (Section 3.8).

## Experiments

**Evaluation protocol.** Unless otherwise stated, evaluation uses 256 validation clips with seed 42, sequential autoregressive scheduling, and 250 DDIM steps. Standard 256-resolution models condition on one frame and generate three; PSNR, SSIM, LPIPS, and FID exclude the context frame. RT-1 target, scale, and action-conditioning ablations train for 50K steps on eight GPUs with effective batch size 64. These short ablations differ from the final released-checkpoint evaluation (Section 4.1).

**Prediction target, RT-1 (Table 1).** All rows use NanoWM-B/2, additive action conditioning, and Stable Diffusion VAE latents. Higher PSNR/SSIM and lower LPIPS/FID are better.

| Target | Noise schedule | PSNR | SSIM | LPIPS | FID |
| --- | --- | --- | --- | --- | --- |
| v | Cosine, zero-terminal SNR | 23.07 | 0.760 | 0.207 | 42.27 |
| x | Cosine, zero-terminal SNR | 23.37 | 0.783 | 0.184 | 42.99 |
| Noise | Linear | 21.89 | 0.739 | 0.225 | 48.86 |

x-prediction gives the best reconstruction metrics; v-prediction gives the best FID and is the default. Noise prediction uses a different schedule because the cosine plus zero-terminal-SNR configuration is numerically degenerate at its terminal timestep. This is a comparison of target-schedule combinations.

**Scale and action injection (Tables 2-3).** Scaling S/2 to B/2 to L/2 improves every reported RT-1 fidelity metric: FID decreases from 54.95 to 42.27 to 36.31. Table 2 lists 39.8M, 158.6M, and approximately 460M parameters. For RT-1 conditioning, FiLM gives PSNR 23.20, SSIM 0.763, LPIPS 0.203, and FID 40.62; cross-attention gives 20.82, 0.721, 0.242, and 51.12 despite having more parameters. In a separate 30K-step PushT sweep, additive conditioning has the best PSNR (26.20), SSIM (0.962), and FID (23.89), and adds no parameters. Fused adaLN has slightly better LPIPS (0.051 versus 0.053).

**Latent spaces and planning (Tables 4-6).** PushT models train for 100K steps with v-prediction, cosine noise, zero-terminal SNR, additive actions, and causal masking. AdamW uses learning rate $10^{-4}$ and weight decay 0.01. Five 2D relative actions form each 10-dimensional action chunk at a frame interval of five. The VAE uses a B/2 backbone with latents shaped [4, 32, 32]; Web-DINO and V-JEPA 2.1 use B/1 with [1024, 16, 16] latents, matching token counts. Web-DINO encodes individual frames at resolution 224 with patch size 14; V-JEPA 2.1 uses its EMA encoder at resolution 256 with patch size 16 (Section 4.4). Planning uses horizon 3, 64 CEM samples, and five CEM iterations.

| Latent space | Planning success | Action embedding RMS |
| --- | --- | --- |
| SD-VAE | 25.0% | 0.1119 |
| Web-DINO | 0.0% | 0.00214 |
| V-JEPA 2.1 | 0.0% | 0.00129 |

A separate diagnostic evaluates 32 goal-reaching episodes with horizon 3 and 20 DDIM steps. VAE final-latent MSE to the goal is 0.014015 under ground-truth actions, versus 0.074830 with zero actions and 0.081412 with random actions. Web-DINO values are 0.834037, 0.834044, and 0.834066; V-JEPA values are 0.584029, 0.584056, and 0.584150. Within each semantic representation, changing actions barely changes the outcome. Initial-observation MSE to the goal is 0.077714 for VAE, 0.311649 for Web-DINO, and 0.206433 for V-JEPA: ground-truth-action rollouts improve on this baseline for VAE but worsen it for both semantic-latent checkpoints. Together with the small action embeddings, this supports action neglect as a failure mechanism in these checkpoints. Absolute latent distances should not be ranked across encoders. The authors report that additional sampling and planning budget did not restore semantic-latent success, without quantifying that budget sweep.

**Long rollouts (Section 4.5).** A CSGO-specific L/2 checkpoint trains on 16-frame windows with four context frames. Evaluation produces 50-frame videos from four real history frames plus 46 sequential predictions, using a sliding four-frame history and 50 DDIM steps per predicted frame. The authors report preserved coarse geometry and camera motion but increasing errors in weapon appearance and textures. Their LPIPS curves indicate that additional denoising steps reduce error, without eliminating accumulation; numerical curve values are not supplied in the Markdown text.

**Released checkpoints (Table 7).** Under the standard 256-clip protocol, results vary substantially by domain. Different training durations and domains make this descriptive evidence rather than an isolated test of task complexity.

| Dataset | Training steps | PSNR | SSIM | LPIPS | FID |
| --- | --- | --- | --- | --- | --- |
| Point Maze | 30K | 36.74 | 0.984 | 0.019 | 9.66 |
| Wall | 15K | 34.05 | 0.994 | 0.010 | 2.64 |
| Rope | 15K | 31.63 | 0.953 | 0.056 | 35.20 |
| Granular | 15K | 26.08 | 0.917 | 0.073 | 40.05 |
| PushT | 100K | 33.19 | 0.982 | 0.016 | 13.63 |
| RT-1 | 300K | 24.36 | 0.787 | 0.180 | 35.08 |

## Limitations

- Target and noise schedule change together, so the objective ablation does not identify the effect of prediction target alone. Flow matching is supported but lacks a corresponding numerical comparison in the reported findings.
- Planning evidence covers one PushT setup. The 32 episodes explicitly describe the action diagnostic; the supplied text does not clearly state the episode count for Table 4's success rates. Confidence intervals and variability across training seeds are not reported.
- The semantic-latent failures concern particular checkpoints trained with additive actions and a shared diffusion recipe. The diagnostics support action insensitivity, but do not isolate why it arose or establish that pretrained semantic encoders or [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]] generally cannot support planning.
- Visual fidelity does not establish useful action-conditioned control. Short three-frame evaluations, qualitative long rollouts, and a 3D export demonstration do not establish persistent physical consistency or accurate recovered geometry. The supplied findings include no quantitative real-time throughput or reconstruction benchmark.
- Model-size descriptions conflict: Section 1.1 lists L as 600M, whereas Table 2 gives approximately 460M for L/2. The introduction claims generation at four times the training horizon; the detailed CSGO experiment reports 50 total frames against a 16-frame training window. The quantitative summary above follows the detailed experiment.
- The supplied Markdown does not state the paper's publication year, venue, DOI, or arXiv identifier. These remain unspecified. Source-listed resources are the [project page](https://simchowitzlabpublic.github.io/nano-world-model), [code repository](https://github.com/simchowitzlabpublic/nano-world-model), and [model collection](https://huggingface.co/collections/knightnemo/nano-world-model); their current contents were not checked for this ingest.

## Related Concepts

- [[concepts/diffusion-forcing|Diffusion Forcing]]: different noise levels across frames unify prediction and generation schedules.
- [[concepts/world-models|World Models]]: learned future prediction used for simulation and candidate-action evaluation.
- [[concepts/diffusion-models|Diffusion Models]]: denoising objectives and latent-space generative backbones.
- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]: predictive representations, including the video-pretrained V-JEPA feature space tested here.

## Related Papers

- Chen et al. (2024), "Diffusion forcing: Next-token prediction meets full-sequence diffusion": the central sequence-modeling interface adopted by NanoWM.
- Zhou et al. (2024), "DINO-WM: World models on pre-trained visual features enable zero-shot planning": a cited feature-space world model and source of the simulated-domain datasets used here. NanoWM's failed semantic-latent checkpoints are not a reproduction of DINO-WM's own training method.
- Jha et al. (2026), "Reconstruction or semantics? What makes a latent space useful for robotic world models": cited motivation for comparing representation choices.
- Maes et al. (2026), "stable-worldmodel-v1: Reproducible world modeling research and evaluation": related open world-model infrastructure.
- Mur-Labadia et al. (2026), "V-JEPA 2.1: Unlocking dense features in video self-supervised learning": source of one tested pretrained representation.

[[index|Library home]]
