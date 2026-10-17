---
title: "ProtoFlow: Prototype-Guided Flow Matching for Multivariate Time Series Forecasting"
type: paper
authors:
  - Shibo Feng
  - Wanjin Feng
  - Yang Qiu
  - Deheng Ye
  - Peilin Zhao
  - Chunyan Miao
year: null
tags:
  - time-series-forecasting
  - flow-matching
  - vector-quantization
---

## TL;DR

ProtoFlow reuses a learned vector-quantization codebook to initialize conditional latent flow matching. It jointly generates future latent sequences with three Euler steps on four benchmarks and five on Wikipedia. The paper reports best or joint-best aggregate forecasting errors in 18 of 20 comparisons, with faster inference but substantially higher training memory than TSFlow.

## Research Question

Can learned latent prototypes, their frequencies, and local variability provide a better source distribution for few-step multivariate forecasting than generic Gaussian initialization?

## Motivation

Discrete time-series representations compress high-dimensional observations, but autoregressive token prediction introduces teacher-forcing [[concepts/exposure-bias|Exposure Bias]]. Joint [[concepts/flow-matching|Flow Matching]] avoids that sequential token-conditioning mismatch. ProtoFlow additionally uses the tokenizer's learned structure to inform where transport begins, rather than treating its codebook only as a quantizer.

## Contributions

- Combines a frozen vector-quantized tokenizer with non-autoregressive conditional generation of the entire future latent sequence.
- Constructs a [[concepts/prototype-priors-for-flow-matching|Prototype Prior for Flow Matching]] from codebook centers, empirical assignment frequencies, and low-rank local perturbations.
- Evaluates forecasting accuracy, sampling budgets, training stabilization, and the interaction between codebook size and prior weighting across five benchmarks.

## Method

**Tokenizer.** A convolutional encoder downsamples future targets into latent vectors. Unit-normalized encoder outputs select codebook entries by maximum cosine similarity. Reconstruction error and a cosine commitment loss train the encoder and decoder with straight-through gradients; exponential moving averages update the codebook, and inactive entries are reset. The encoder, decoder, and codebook are frozen before flow training (Section 3.1; Algorithm 1).

**Source prior.** Training-target encodings supply prototype weights $\pi_k$, centers $\mu_k$, local basis matrices $B_k$, and scales $\sigma_k$. At each latent position, independently sample

$$
k\sim\operatorname{Cat}(\pi),\qquad \epsilon\sim\mathcal N(0,I_r),\qquad
x_0=\operatorname{Norm}\left(\mu_k+\gamma B_k(\sigma_k\odot\epsilon)\right).
$$

Normalization makes this a mixture of normalized perturbed prototypes, not an ordinary Gaussian mixture. These prior parameters remain fixed during Stage 2. Source positions are sampled independently; temporal dependence is learned by the conditional vector field.

**Conditional transport.** For quantized future target $x_1$ and independently sampled source sequence $x_0$, interpolate $x_t=(1-t)x_0+tx_1$ and train

$$
\mathcal L_{\mathrm{FM}}=\mathbb E\left[\|v_\theta(x_t,t\mid c)-(x_1-x_0)\|_F^2\right].
$$

The DiT vector field conditions on encoded history and known future time features. The history encoder combines convolutions and Transformer-XL; flow time modulates adaptive LayerNorm. Euler integration jointly evolves all future latent positions, and the frozen decoder maps the continuous endpoint directly into forecasts (Section 3.2; Algorithms 2-3).

**Geometric motivation.** The minimum expected squared endpoint displacement over all source-target couplings equals $W_2^2$. A prototype prior therefore has lower *optimal* transport cost if it is closer to the target distribution in Wasserstein distance. This conditional statement does not prove lower cost under the independent coupling actually used for training (Section 3.3; Appendix A).

## Experiments

**Protocol.** Electricity, Solar, Traffic, Taxi, and Wikipedia contain 137 to 2,000 variables. History length is 96 and prediction horizons are 48 and 96. The paper reports averages over three runs, 100 forecast samples per window, and a single 40 GB NVIDIA A100. Evaluation uses CRPS and normalized RMSE on series aggregated across variables. Baselines include TimeGrad, CSDI, TSDiff, MG-TSD, DyDiff, NsDiff, FlowTime, TSFlow, and a Gaussian-prior variant, ProtoFlow-G.

The following 96-step results are from Table 1; lower values are better.

| Dataset | ProtoFlow CRPS-sum | ProtoFlow-G CRPS-sum | TSFlow CRPS-sum | ProtoFlow NRMSE-sum |
| --- | --- | --- | --- | --- |
| Electricity | 0.015 | 0.019 | 0.025 | 0.022 |
| Solar | 0.284 | 0.305 | 0.299 | 0.638 |
| Traffic | 0.034 | 0.036 | 0.044 | 0.054 |
| Taxi | 0.157 | 0.159 | 0.212 | 0.281 |
| Wikipedia | 0.092 | 0.096 | 0.103 | 0.101 |

Across both horizons, the authors report average relative error reductions of 13.6% in CRPS-sum and 17.4% in NRMSE-sum versus TSFlow. The exception to the 18/20 best-or-joint-best result is 48-step Traffic: ProtoFlow scores 0.041/0.066, versus ProtoFlow-G's 0.035/0.057.

**Representation and generation.** At horizon 96, Table 2's dataset-averaged CRPS-sum/NRMSE-sum changes from 0.153/0.283 for VQ plus autoregression to 0.123/0.243 for Gaussian-prior flow matching and 0.116/0.219 for ProtoFlow. VQ variants also outperform the corresponding VAE variants in this experiment.

**Efficiency.** Figure 2 reports 3.66-3.90 times faster inference than 16-step TSFlow on Electricity, Traffic, and Solar, accompanied by 4.08-7.49 times its training-memory footprint. Normalized loss curves reach their respective terminal levels earlier with prototype initialization; they do not compare equal absolute losses. ProtoFlow uses three sampling steps except on Wikipedia, which uses five; NsDiff uses 20.

**Prior ablations.** Frequency weighting yields average 96-step errors of 0.116/0.219 versus 0.133/0.249 with uniform weights (Table 3). Sampling budgets differ across these variants, so this is not a fixed-compute isolation of weighting alone. Codebook size 256 performs best in the three-dataset size sweep; increasing to 512 can improve reconstruction slightly while worsening forecasting. Local covariance rank is fixed at two (Section 4.4).

## Limitations

- Aggregate-series metrics do not by themselves establish per-variable accuracy or full joint-distribution calibration. The main tables report means without run-level uncertainty intervals.
- The Wasserstein argument concerns optimal couplings, whereas training samples endpoints independently. Figure 4's empirical forecast-to-observation distances do not directly verify the required source-to-target latent-distance inequality.
- Faster inference comes with higher training-memory requirements and two-stage representation learning. Results are limited to the reported benchmarks and horizons.
- Reproducibility details remain incomplete or ambiguous: the supplied text does not specify a publication year, venue, or stable identifier; code is promised upon acceptance. Appendix C.1 mentions both a general 60/20/20 chronological split and separate Taxi training/testing years, while Appendix C.2's NRMSE prose is less precise than its aggregate-metric description. The source ends at an empty "D LIMITATIONS" heading.

## Related Concepts

- [[concepts/prototype-priors-for-flow-matching|Prototype Priors for Flow Matching]]: reusing representation statistics to define transport initialization.
- [[concepts/flow-matching|Flow Matching]]: velocity regression followed by ODE sampling.
- [[concepts/latent-space-time-series-forecasting|Latent-Space Time Series Forecasting]]: forecasting through frozen learned representations and a decoder.
- [[concepts/exposure-bias|Exposure Bias]]: the teacher-forced token mismatch avoided by joint future generation.

## Related Papers

- Chen et al. (2024), "SDformer: Similarity-driven discrete transformer for time series generation," supplies the similarity-based quantization precedent (Sections 3.1 and B).
- Kollovieh et al. (2025), "Flow matching with Gaussian process priors for probabilistic time series forecasting," supplies TSFlow, a structured-prior baseline operating in observation space.
- Li et al. (2026), "SDFlow: Similarity-driven flow matching for time series generation," is discussed as frozen-VQ latent generation with categorical supervision; ProtoFlow emphasizes codebook-derived source initialization (Appendix B).
- [[papers/learning-from-predictions-fusing-training-and-autoregressive-inference-for-long-term-spatiotemporal-forecasts|Learning from Predictions]] addresses generated-history exposure through autoregressive training. This is a library comparison, not a claimed citation or experimental comparator in ProtoFlow.

Source: supplied parsed manuscript, Cognitio job `bec26ded-3f3e-46bf-a9b1-b0a8e3856556`. Publication year is unspecified in the source.

[[index|Library home]]
