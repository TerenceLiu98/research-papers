---
title: "MOIRAI-MOE: Empowering Time Series Foundation Models with Sparse Mixture of Experts"
type: paper
authors:
  - Xu Liu
  - Juncheng Liu
  - Gerald Woo
  - Taha Aksu
  - Yuxuan Liang
  - Roger Zimmermann
  - Chenghao Liu
  - Silvio Savarese
  - Caiming Xiong
  - Doyen Sahoo
year: null
tags:
  - time-series-forecasting
  - foundation-models
  - mixture-of-experts
  - zero-shot-learning
---

## TL;DR

MOIRAI-MOE replaces frequency-specific input/output projections with shared projections and sparse experts that specialize at the time-series token level. Across 29 in-distribution and 10 held-out datasets, it improves aggregate forecasting accuracy over dense MOIRAI at similar activated parameter counts. The small model reduces Monash aggregate MAE by a reported 17%; the base model achieves the best aggregate CRPS and MASE in the held-out comparison. Total parameter counts remain substantially larger than those of the corresponding dense models.

## Research Question

Can data-driven specialization at the patch-token level model heterogeneous time series more effectively than specialization based on sampling frequency, while retaining low computation per token?

## Motivation

Sampling frequency does not uniquely identify temporal patterns: different frequencies can share structure, while series at the same frequency can differ substantially. Nonstationarity also creates changing patterns within one context window. The paper therefore moves specialization from frequency-specific projections into conditional expert computation within a transformer.

## Contributions

- Combines shared input/output projections, a decoder-only objective, and [[concepts/sparse-mixture-of-experts|Sparse Mixture of Experts]] for automatic token-level specialization.
- Introduces expert routing based on clusters of a pretrained MOIRAI model's token representations.
- Evaluates point and probabilistic forecasting across 39 datasets, with architecture, routing, patch-size, and normalization ablations.
- Analyzes representations and expert allocations across layers, frequencies, and positions within time series.

## Method

**Tokens and prediction.** Non-overlapping patches of 16 observations pass through a shared residual MLP projection. A masking ratio of 0.3 reserves part of the sequence for robust normalization and excludes that portion from prediction loss. The decoder uses causal attention; flattening variates into a sequence allows attention to preceding tokens from other variates as well as the same one. A shared output projection predicts mixture-distribution parameters for the next patch, trained by negative log-likelihood (Sections 3.1-3.3).

**Experts and routing.** Each transformer FFN is replaced with 32 expert FFNs, of which two are activated per token. Their outputs are combined using sparse gating weights. The proposed gate uses Euclidean distances to centroids obtained by mini-batch k-means on pretrained MOIRAI self-attention outputs. Appendix B.3 describes extracting representations from LOTSA data corresponding to 100 epochs. Comparisons use a learned linear gate with or without an auxiliary load-balancing loss. Equation 6 does not explicitly specify how distance is converted into an affinity that favors a centroid; the summary does not infer a sign convention.

**Training and capacity.** Both models train on LOTSA with batch size 1,024, bfloat16, and 16 A100 GPUs with 40 GB each. Small/base runs use 50,000/250,000 steps. AdamW uses learning rate 0.001, weight decay 0.1, and 10,000 warmup steps followed by cosine annealing (Section 4.1).

| Model | Layers | Activated parameters per token | Total parameters |
| --- | --- | --- | --- |
| MOIRAI small | 6 | 14M | 14M |
| MOIRAI-MOE small | 6 | 11M | 117M |
| MOIRAI base | 12 | 91M | 91M |
| MOIRAI-MOE base | 12 | 86M | 935M |

## Experiments

**In-distribution forecasting.** The 29 Monash datasets have training portions in LOTSA and held-out test portions. Dataset MAEs are divided by seasonal-naive MAEs, then combined with a geometric mean. Section 4.2 reports a 17% reduction for MOIRAI-MOE small relative to MOIRAI small and a further 3% improvement for the base MoE model. These are aggregate results, not wins on every dataset: on FRED-MD, for example, Chronos large has MAE 863.99 versus 2,273.61 for MOIRAI-MOE base (Table 6).

**Zero-shot forecasting.** Ten datasets excluded from LOTSA cover energy, transport, sales, nature, and Web/CloudOps. Evaluation uses non-overlapping rolling windows; horizon and window count vary by dataset (Appendix A). Table 2 aggregates seasonal-naive-normalized CRPS and MASE geometrically; lower is better.

| Model | Aggregate CRPS | Aggregate MASE |
| --- | --- | --- |
| Seasonal naive | 1.000 | 1.000 |
| iTransformer, trained per dataset | 0.540 | 0.767 |
| TimesFM | 0.488 | 0.689 |
| Chronos base | 0.499 | 0.656 |
| MOIRAI small | 0.578 | 0.798 |
| MOIRAI base | 0.520 | 0.736 |
| MOIRAI large | 0.514 | 0.729 |
| MOIRAI-MOE small | 0.497 | 0.670 |
| MOIRAI-MOE base | 0.478 | 0.651 |

TimesFM had seen Electricity in pretraining, and Chronos had seen Electricity and Solar, so their rows mix zero-shot and previously seen datasets. TiDE, PatchTST, and iTransformer are full-shot comparisons, each tuned with 15 random-search runs and selected by validation CRPS.

**Ablations.** Table 3 reports Monash aggregate MAE of 0.78 for multiple projections with a masked encoder, 0.75 after switching to decoder-only training, and 0.65 for shared projections plus MoE with decoder-only training. This supports a gain beyond the objective change, while jointly changing projections and experts. Figure 4 reports that decoder-only training at 50k steps matches masked-encoder performance at 100k steps, and that clustering-based routing performs best across tested expert counts. Appendix B finds patch size 16 and masking ratio 0.3 best among the tested choices.

**Routing analysis.** Visualizations show related patterns receiving similar representations across frequencies, periodic expert choices in shallow layers, and increasingly concentrated routing deeper in the model. Only three of 32 experts are selected in the final layer of the analyzed small model. The authors interpret this as frequency-invariant abstraction and progressive denoising; the evidence consists of embedding and routing visualizations rather than a direct causal test of denoising (Section 4.4).

**Inference timing.** On a Monash subset requiring one output patch of 16 time steps, with context 512 and 20 samples, small/base MOIRAI-MOE takes 273/370 seconds versus 264/358 seconds for dense MOIRAI. Chronos small/base/large takes 551/1,177/2,780 seconds (Table 4). The restricted horizon controls for the difference between masked parallel prediction and autoregressive rollout.

## Limitations

- Similar activated parameter counts do not imply similar storage requirements: the MoE models contain 117M and 935M total parameters. A large MoE variant is omitted for resource reasons; pruning rarely used experts remains future work.
- Timing results cover one output patch and do not establish equal latency for longer autoregressive forecasts. The reported comparison also does not quantify the full cost of pretrained-token clustering.
- Aggregate improvements coexist with dataset-level losses. Comparators differ in pretraining coverage, and the main design ablation does not isolate shared projections from MoE independently.
- Routing concentration and t-SNE plots support the authors' interpretation but do not establish a general mechanism or prove that low expert diversity is universally beneficial.
- The supplied Markdown contains no publication year, venue, or identifier for this paper. The year is left null rather than inferred from bibliography dates. This page summarizes only the supplied source for Cognitio job `90618f5b-d174-4eb0-86c4-534947332421`.

## Related Concepts

- [[concepts/time-series-foundation-models|Time Series Foundation Models]]: reusable pretraining across domains and temporal frequencies.
- [[concepts/sparse-mixture-of-experts|Sparse Mixture of Experts]]: conditional token computation and pattern-specific parameter sharing.
- [[concepts/transferability-evaluation|Transferability Evaluation]]: distinguishing in-distribution performance, zero-shot transfer, and target-trained comparisons.

## Related Papers

- Woo et al. (2024), "Unified Training of Universal Time Series Forecasting Transformers": the cited MOIRAI predecessor supplying LOTSA, architectural components, and representations for clustering.
- [[papers/a-decoder-only-foundation-model-for-time-series-forecasting|A Decoder-Only Foundation Model for Time-Series Forecasting]]: the cited TimesFM baseline and a related patch-based causal forecasting design.
- Ansari et al. (2024), "Chronos: Learning the Language of Time Series": the cited quantized-token forecasting baseline, listed as arXiv:2403.07815 in the supplied bibliography.
- Shazeer et al. (2017), "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer": a cited foundation for sparse expert routing.

[[index|Library home]]
