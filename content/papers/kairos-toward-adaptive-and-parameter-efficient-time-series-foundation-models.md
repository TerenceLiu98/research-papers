---
title: "KAIROS: Toward Adaptive and Parameter-Efficient Time Series Foundation Models"
type: paper
authors:
  - Kun Feng
  - Shaocheng Lan
  - Yuchen Fang
  - Wenchao He
  - Sihan Lu
  - Shuqi Gu
  - Xingyu Lu
  - Lintao Ma
  - Kan Ren
year: null
tags:
  - time-series-forecasting
  - foundation-models
  - adaptive-tokenization
---

## TL;DR

KAIROS adapts patch granularity locally and rotary positional frequencies per input series. Its 53M-parameter Base model achieves normalized MASE 0.738 on GIFT-Eval versus 0.750 for Sundial (128M) and Toto (151M). The advantage concerns aggregate point forecasting: Toto has better CRPS, and gains vary across datasets.

## Research Question

Can adaptive tokenization and temporal positional encoding improve zero-shot forecasting across heterogeneous time series with fewer model parameters?

## Motivation

Fixed patches allocate the same temporal resolution to smooth and volatile segments. Fixed positional frequencies also impose a shared temporal scale across series with different periodic structures. KAIROS moves this adaptation into the encoder and positional representation rather than relying solely on larger backbones.

## Contributions

- A Mixture-of-Size Encoder with segment-specific granularity routing and computation-free null experts.
- Dynamic Rotary Position Embedding (DRoPE), combining spectral conditioning with patch-duration-aware positions.
- Parallel prediction of multiple future patches within each autoregressive round.
- PreSTS, a predictability-stratified pretraining corpus, and evaluations separating architectural and data contributions.

## Method

**Tokenization.** Fixed coarse segments are routed to a top-K subset of patch-size experts and null experts. Each active real expert patchifies its segment and embeds patches with an MLP. Coarser embeddings are repeated to match the finest active resolution and combined with normalized routing weights. Concatenating segments yields a variable-length token sequence. Base uses patch sizes {32, 64, 128, 256}, four selected experts from four real and two null experts, and auxiliary-loss-free load balancing (Sections 3.2 and H.3).

**Temporal attention.** Low-frequency FFT magnitudes feed an MLP that predicts layer-specific affine transformations of log RoPE frequencies. Token positions are replaced by cumulative patch durations divided by the globally smallest patch size. Thus attention reflects both the input spectrum and unequal durations represented by tokens. DRoPE supplies a frequency profile, not an estimate of one true period (Sections 3.3 and H.4).

**Forecasting.** Learnable forecast queries cross-attend to encoded history. The default two queries each predict 64 points, yielding 128 points per round. Longer horizons append median predictions and repeat. Training predicts nine quantiles, 0.1 through 0.9, with a time-weighted pinball loss emphasizing earlier steps. Multivariate series are handled independently by channel.

**Pretraining.** PreSTS contains over 300B real observations plus 15B synthetic points; batches sample 80% real and 20% synthetic data. Real datasets receive five predictability tiers, favoring more predictable data. The authors state that all GIFT-Eval and TSLib splits are excluded. Mini, Small, and Base have 10M, 23M, and 53M parameters. Base training is reported as 300,000 steps, batch size 512, and 15 hours on four A100 GPUs.

## Experiments

GIFT-Eval covers 97 tasks from 28 source datasets. MASE and CRPS are normalized against Seasonal Naïve per task and geometrically aggregated (Table 1).

| Model | Parameters | Normalized MASE | Normalized CRPS |
| --- | --- | --- | --- |
| KAIROS-Small | 23M | 0.748 | 0.554 |
| KAIROS-Base | 53M | 0.738 | 0.548 |
| Sundial | 128M | 0.750 | 0.559 |
| Toto | 151M | 0.750 | 0.517 |

**Mechanism tests.** Fixed patching raises MASE to 0.761; removing null experts gives 0.748; standard RoPE gives 0.767; single-patch decoding gives 0.753. Sequence-level routing gives 0.759. Inference-time uniform granularity weights and shuffled routing give 0.831 and 1.205, respectively. Shuffling DRoPE modulation within datasets gives 0.751 and across datasets 0.947. These interventions support input-dependent routing and positional adaptation (Tables 2, 3, and 8).

**Data and capacity controls.** Removing tier sampling gives 0.748, and also removing synthetic data gives 0.755. On the Chronos corpus, KAIROS achieves 0.761 versus ChronosBolt's 0.808; on PreSTS, ChronosBolt achieves 0.781. A 53M parameter-matched conventional Transformer trained under the same settings obtains 0.797 (Tables 12–14).

**Other evaluations.** TSLib covers four ETT datasets, Weather, and daily/weekly Saugeen, primarily with context 2048 and horizons {96, 192, 336, 720}; evaluation stride is 96. Fine-tuning Base on 1% of training windows improves both metrics on the five ETT/Weather datasets and beats the listed full-shot PatchTST and DLinear averages. Frozen-encoder classification on 91 UCR datasets gives accuracy 0.818 versus MOMENT's 0.794. Single-batch latency on a TITAN RTX is 0.061 seconds for Base versus Sundial's 0.099 at input 2048/output 96 (Appendices C, F, I, and L).

**Statistical qualification.** Base wins against Sundial on 64/97 tasks and 20/28 source datasets. Its overall MASE reduction is 1.6%; losses average 12.3% worsening within the losing task group. Dataset-level Holm-adjusted p-values are 0.0714 for the sign test and 0.0402 for Wilcoxon. Fixed-patch comparisons likewise pass Wilcoxon but not the sign test. Three independent Small runs give 0.747 ± 0.001 MASE (Appendix K).

## Limitations

- Channel-independent modeling does not explicitly capture inter-variable dependencies.
- Aggregate advantages do not imply superiority on every dataset or metric; Toto leads CRPS in the principal table.
- Multi-patch decoding reduces autoregressive rounds but does not eliminate rollout error. On ETTh1, later rounds incur roughly 9.79–14.85% MAE penalties against a teacher-forced oracle.
- TSLib context lengths differ for models with shorter supported histories, and full-shot baselines undergo context selection. Latency results describe one hardware and shape configuration.
- The supplied Markdown does not explicitly establish the paper's publication year or a stable paper identifier; the year is left unspecified. The project URL provided by the authors is https://foundation-model-research.github.io/Kairos.

## Related Concepts

- [[concepts/time-series-foundation-models|Time Series Foundation Models]]: reusable forecasting through cross-domain pretraining.
- [[concepts/sparse-mixture-of-experts|Sparse Mixture of Experts]]: selective activation, here used to choose patch granularities.
- [[concepts/probabilistic-time-series-forecasting|Probabilistic Time Series Forecasting]]: quantile outputs and CRPS evaluation.

## Related Papers

- [[papers/a-decoder-only-foundation-model-for-time-series-forecasting|A Decoder-Only Foundation Model for Time-Series Forecasting]]: the cited TimesFM predecessor uses fixed input patches and larger output patches.
- [[papers/moirai-moe-empowering-time-series-foundation-models-with-sparse-mixture-of-experts|MOIRAI-MOE]]: cited sparse-expert time-series modeling; KAIROS places adaptive expert selection in granularity encoding.
- Pathformer (Chen et al., 2024): the cited sequence-level multiscale routing comparison; KAIROS routes within individual segments.

[[index|Library home]]
