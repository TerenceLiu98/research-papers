---
title: "K2VAE: A Koopman-Kalman Enhanced Variational AutoEncoder for Probabilistic Time Series Forecasting"
type: paper
authors:
  - Xingjian Wu
  - Xiangfei Qiu
  - Hongfan Gao
  - Jilin Hu
  - Bin Yang
  - Chenjuan Guo
year: null
tags:
  - time-series
  - probabilistic-forecasting
  - koopman-operators
  - kalman-filtering
  - variational-autoencoders
---

[[index|Library home]]

## TL;DR

K2VAE combines a learned Koopman representation, a data-driven Kalman-style refinement network, and a variational decoder for probabilistic time-series forecasting. It maps patched multivariate histories into an approximately linear latent dynamical system, uses nonlinear residuals as control inputs while refining latent means and covariances, and generates the full forecast in one decoder pass. The reported experiments show stronger CRPS and normalized MAE than the selected point, flow, and diffusion baselines, especially at long horizons, while the ablations support using both KoopmanNet and KalmanNet.

## Research Question

Can long-horizon predictive distributions be modeled accurately and efficiently by linearizing nonlinear multivariate dynamics in a learned measurement space, then using Kalman-style updates to correct accumulated forecast error and represent uncertainty?

## Motivation

Autoregressive, diffusion, and normalizing-flow forecasters can become inaccurate or expensive as the forecast horizon grows. The paper attributes this to nonlinear dynamics, increasingly complex target distributions, and error accumulation. It therefore reframes [[concepts/probabilistic-time-series-forecasting|Probabilistic Time Series Forecasting]] as uncertainty modeling in a learned linear dynamical system: Koopman theory supplies the linearization principle, Kalman filtering supplies recursive correction, and a variational autoencoder supplies one-step generation.

## Contributions

- Introduces K2VAE, a VAE-based model for short- and long-horizon probabilistic forecasting.
- Develops KoopmanNet, which embeds multivariate patches and combines a sample-specific operator fitted by one-step extended dynamic mode decomposition with a globally learned operator.
- Develops KalmanNet, which incorporates residual nonlinear information as a control input and produces refined latent means and covariance matrices for the variational posterior.
- Reports comparisons with 11 point and generative forecasting baselines, component and connection ablations, horizon-specific results, and inference-time and memory measurements.

## Method

**Patch embedding.** A context sequence with $N$ variables and length $T$ is divided into non-overlapping multivariate patches. Each flattened patch is projected jointly across variables, unlike channel-independent patching. This produces a sequence of latent state candidates.

**KoopmanNet.** An MLP measurement function maps patch embeddings into a latent space. A local transition operator is fitted from adjacent latent patches using a Moore-Penrose inverse, while a learned global operator captures shared dynamics and provides robustness when the local fit is ill-conditioned. Their sum propagates the first latent patch through the context and forecast horizon. This is an instance of [[concepts/koopman-operator-learning|Koopman Operator Learning]].

**KalmanNet.** The difference between encoded context patches and their Koopman reconstruction is processed by a Transformer integrator. Its outputs enter a learned linear process model as control inputs. A Kalman-style predict-update recursion treats Koopman forecasts as observations, computes gains from learned process and observation covariances, and refines the forecast state and uncertainty. Lower-triangular factors parameterize positive-definite covariance matrices.

**Variational generation.** The refined latent mean and covariance define the posterior $Q(Z\mid X)$. Samples are passed through an MLP decoder that acts as an approximate inverse measurement function and outputs the forecast distribution. Training combines forecast reconstruction, latent reconstruction, KL divergence to a standard Gaussian prior, and a residual penalty intended to encourage linear latent dynamics. Relative to iterative diffusion or flow generation, decoding is a single-step operation.

## Experiments

**Protocol.** The evaluation uses eight short-term datasets and nine long-term datasets drawn from solar, electricity, traffic, weather, exchange-rate, influenza, and ETT benchmarks. The baselines comprise FITS, PatchTST, iTransformer, Koopa, TSDiff, D3VAE, GRU-NVP, GRU-MAF, Transformer-MAF, TimeGrad, and CSDI. Point forecasters receive Gaussian output heads. Lower CRPS and normalized MAE (NMAE) are better; the main comparison tables report means and standard errors over five independent runs.

**Main results.** The authors report that, averaged over the short-term setting, K2VAE reduces CRPS by 7.3% and NMAE by 14.5% relative to the second-best baseline, CSDI. In the long-term setting, they report improvements of 20.9% and 19.9% over PatchTST. At horizon 720, selected CRPS results include 0.057 on Electricity-L, 0.294 on ETTm1-L, and 0.069 on Exchange-L. The corresponding reported NMAE values are 0.117, 0.373, and 0.084.

**Ablations.** On Electricity-L at horizon 720, full K2VAE obtains CRPS 0.057, compared with 0.074 without KoopmanNet and 0.089 without KalmanNet. The mixed local-plus-global Koopman operator outperforms either component alone in the reported comparisons; the local-only variant fails numerically for the two displayed long-horizon cases. Removing the integrator, skip connection, or control input also worsens the four summarized CRPS and NMAE comparisons.

**Efficiency.** With batch size one, the paper reports one-sample inference time of 3.310 seconds and maximum GPU memory of 0.094 GB on Electricity-L with a 96-step horizon. For ETTm1-L at the same horizon, it reports 0.257 seconds and 0.013 GB. These measurements support efficiency relative to the implemented generative baselines in those configurations, but they do not establish hardware-independent latency.

## Limitations

- The source does not report statistical significance tests for the model comparisons; means and standard errors alone do not establish that every difference is reliable.
- Several baseline results are missing because of excessive time or memory use, and some local-operator results are missing because of numerical instability. Comparisons are therefore incomplete in those settings.
- Point forecasters are converted to probabilistic models with Gaussian heads, so their results reflect that added distributional assumption rather than their native deterministic objectives.
- The method assumes fixed-size, non-overlapping patches and an approximately linear learned measurement space. The experiments do not establish how robust this representation is under irregular sampling, missing context, distribution shift beyond the included datasets, or zero-shot transfer.
- Efficiency is reported for batch size one on selected datasets and horizons. The supplied text does not specify hardware in the efficiency table, limiting reproducibility and cross-system interpretation.
- The paper proposes foundation probabilistic forecasting as future work; it does not evaluate zero-shot forecasting.
- The supplied Markdown does not establish a publication venue, publication year, DOI, or arXiv identifier, so these metadata are left unspecified.

## Related Concepts

- [[concepts/probabilistic-time-series-forecasting|Probabilistic Time Series Forecasting]]: the task of predicting full future distributions rather than point values.
- [[concepts/koopman-operator-learning|Koopman Operator Learning]]: learning observables whose evolution is approximately linear.
- [[concepts/latent-space-time-series-forecasting|Latent-Space Time Series Forecasting]]: forecasting through learned representations before decoding to observation space.
- [[concepts/amortized-variational-inference|Amortized Variational Inference]]: the encoder-defined posterior and reparameterized latent sampling used by the VAE.

## Related Papers

- Liu et al. (2023), "Koopa: Learning Non-stationary Time Series Dynamics with Koopman Predictors": the principal Koopman-based deterministic forecasting baseline.
- Rasul et al. (2021), "Autoregressive Denoising Diffusion Models for Multivariate Probabilistic Time Series Forecasting": introduces TimeGrad, an iterative generative baseline.
- Rasul et al. (2021), "Multivariate Probabilistic Time Series Forecasting via Conditioned Normalizing Flows": supplies the flow-based GRU and Transformer comparisons.
- Kollovieh et al. (2023), "Predict, Refine, Synthesize: Self-Guiding Diffusion Models for Probabilistic Time Series Forecasting": introduces TSDiff.
- [[papers/flow-matching-with-gaussian-process-priors-for-probabilistic-time-series-forecasting|Flow Matching with Gaussian Process Priors for Probabilistic Time Series Forecasting]]: a complementary generative approach that places temporal structure in a flow model's source distribution rather than linearizing learned dynamics.
