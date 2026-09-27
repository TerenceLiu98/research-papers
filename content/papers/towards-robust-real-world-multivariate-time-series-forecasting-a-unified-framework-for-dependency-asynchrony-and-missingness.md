---
title: "Towards Robust Real-World Multivariate Time Series Forecasting: A Unified Framework for Dependency, Asynchrony, and Missingness"
type: paper
authors:
  - Jinkwan Jang
  - Hyungjin Park
  - Jinmyeong Choi
  - Taesup Kim
year: null
source_job_id: "067b8f5c-7de6-4c46-9e75-4bad23bf82c0"
aliases:
  - ChannelTokenFormer
tags:
  - time-series-forecasting
  - multivariate-time-series
  - asynchronous-sampling
  - missing-data
---

## TL;DR

ChannelTokenFormer (CTF) combines channel-specific patches, compact channel tokens, and structured attention to forecast multivariate signals sampled at different fixed rates with missing input blocks. It excludes fully missing patches and predicts from channel summaries rather than fixed-length patch sequences. Reported results are competitive across six dataset groups, with stronger robustness under the tested missing-block conditions. Gains are not uniform, attention remains quadratic, and damaged tables and inconsistent reporting in the supplied Markdown limit detailed numerical interpretation.

## Research Question

Can one forecasting architecture exploit cross-channel dependencies while preserving each channel's sampling resolution and tolerating contiguous missing observations at inference?

## Motivation

Industrial and environmental sensors often measure related processes at different rates. Interpolating all streams onto a common grid can alter their temporal and spectral structure, while channel-independent models forgo potentially useful observations from other streams. Missing blocks create a further problem for decoders that require a fixed number of input patches. The paper targets these three conditions jointly rather than treating asynchrony and missingness as separate preprocessing tasks.

## Contributions

- A practical forecasting setup with distinct fixed sampling periods, common physical input/output windows, and channel-balanced evaluation at valid target positions.
- Frequency-guided channel-wise patching and a fixed number of learned channel tokens, decoupling the forecast decoder from the number of available local patches.
- A unified attention mask that separates within-channel temporal processing from cross-channel summary exchange, together with training-time patch dropout and test-time removal of fully missing patches.
- Experiments on adapted public benchmarks, air monitoring, and a private LNG carrier dataset, including missingness, attention, patching, and scalability ablations.

## Method

**Observation model and objective.** In [[concepts/channel-wise-asynchronous-forecasting|Channel-Wise Asynchronous Forecasting]], channel $i$ has relative sampling period $s_i$, normalized so the smallest is one. For common windows of $L$ input steps and $H$ forecast steps at the finest resolution, it supplies $L_i=\lfloor L/s_i\rfloor$ observations and $H_i=\lfloor H/s_i\rfloor$ targets. The channel-aggregated error is

$$
\operatorname{CMSE}=\frac{1}{N}\sum_{i=1}^{N}\frac{1}{H_i}
\sum_{j=1}^{H_i}(y_j^{(i)}-\hat y_j^{(i)})^2.
$$

CMAE substitutes absolute errors. Every channel receives equal aggregate weight despite differing target counts. Future targets are assumed observed; missingness is injected into the history (Section 3).

**Tokenization.** FFT-based dominant-period estimation determines non-overlapping patch lengths, with a sampling-aware fallback for weak periodicity. Linear projections are shared among channels with equal patch lengths. Local tokens receive fixed positional embeddings and learned channel embeddings; a small number of learned channel tokens receive channel identity without a local position. Forward-filled arrays are used for implementation convenience, but those filled entries are excluded when extracting valid observations for CTF's patch embeddings (Appendix A.2).

**Missing inputs.** [[concepts/patch-masking-for-missing-time-series-inputs|Patch Masking for Missing Time-Series Inputs]] randomly discards local patches during training. At inference, fully unobserved patches are removed, while retained tokens preserve their original positional encodings. Partial-patch missingness is not removed by this rule; the paper separately studies robustness to short zero-filled gaps. Decoding only channel tokens permits a variable number of remaining local tokens.

**Attention and decoding.** Local tokens attend to local tokens within their own channel. In the read-only channel-dependent variant, channel tokens read their own local tokens and channel tokens from other channels, while local tokens cannot read channel tokens. Self-attention by an individual channel token is blocked; same-channel channel-token interactions may also be blocked. Indexed variants restrict cross-channel exchange to channel tokens with matching indices (Section 4; Appendix C.2). Only channel tokens feed the output decoders, which are shared among channels with equal sampling periods. Structural masking does not itself replace dense quadratic attention with a sparse implementation.

## Experiments

The six groups are ETT1-practical, ETT2-practical, SolarWind, Weather-practical, EPA-Air across four regions, and private LNG Cargo Handling System (CHS) data. CHS uses 10 selected channels from 52 available channels. Regular baselines receive linearly interpolated inputs; irregular and missingness-aware baselines use observed values and masks. All models are evaluated at valid target positions. Training uses Adam, validation early stopping, up to 10 epochs, and an RTX 3090 with 24 GB memory (Appendix A.2).

Selected horizon-averaged results from **Table 1**; lower is better:

| Dataset | CTF CMSE | CTF CMAE | Best baseline CMSE |
| --- | --- | --- | --- |
| ETT1 | 0.399 | 0.410 | 0.411 (PatchTST) |
| ETT2 | 0.377 | 0.383 | 0.380 (TimeXer) |
| SolarWind | 0.403 | 0.452 | 0.404 (TimeFilter) |
| Weather | 0.275 | 0.296 | 0.273 (TimeFilter) |
| EPA | 0.776 | 0.586 | 0.782 (DUET) |
| CHS | 0.285 | 0.126 | 0.294 (t-PatchGNN) |

CTF has the lowest listed average CMSE in five groups. It does not lead every metric: TimeFilter has lower SolarWind CMAE (0.449), DUET lower EPA CMAE (0.579), and t-PatchGNN lower CHS CMAE (0.125). Weather also ties PatchTST on CMSE.

**Missing blocks.** Table 2 reports SolarWind CTF CMSE/CMAE of 0.409/0.463, 0.429/0.482, 0.452/0.507, and 0.475/0.533 at missing fractions 0.125, 0.250, 0.375, and 0.500. TimeFilter has lower CMAE at 0.250 and 0.375 (0.477 and 0.498). Appendix A.2 constructs randomly positioned blocks with one-patch lengths, ensuring fully unobserved patches for the masking mechanism. This is controlled missingness, not an evaluation of arbitrary operational failure processes.

**Ablations.** At missing fraction 0.375, Table 3 reports CMSE 0.452 for the full model, 0.474 without channel dependence, 0.494 without dynamic patching, and 0.458 without patch masking. The last ablation ties the full model's CMAE at 0.508. At missing fraction 0.125, removing channel dependence ties the full model in both metrics (Table 11). Component benefits therefore depend on the evaluated condition.

**Interpolation-free comparator.** Modified TimeXer improves upon its regular version, but results remain mixed: Table 15 gives ETT2 CMSE/CMAE 0.374/0.382 for modified TimeXer versus 0.377/0.383 for CTF, while CTF performs better on ETT1 and SolarWind. These comparisons support the value of accommodating asynchrony without attributing every difference solely to interpolation.

**Input length and scale.** A SolarWind model trained with input length 576 obtains CMSE 0.409 at that length and 0.429 at 288; intermediate lengths yield 0.461 at 360 and 0.448 at 432 (Table 5). In the reported channel-scaling configuration, CTF reaches 275 channels and runs out of memory at 280. Training time rises from 0.7173 seconds per iteration at 100 channels to 2.6912 at 200 (Table 13). These measurements do not establish linear scaling.

## Limitations

- **Sampling and missingness scope:** Channels have fixed, known sampling periods. This is narrower than arbitrary within-channel irregular event times. Fully missing patches can be dropped, but this does not recover their values, identify missing-not-at-random mechanisms, or guarantee robustness to partial patches and unseen failure patterns.
- **Comparison conditions:** Regular baselines train on interpolated grids whereas CTF uses valid observations. The modified TimeXer experiment helps examine this difference but does not isolate every architectural and training-objective effect. The short-gap ContiFormer comparator uses an approximated ODE implementation on interpolated inputs, not the unmodified method (Appendix C.6).
- **Scale and forecast fidelity:** Unified attention remains quadratic in total token count. The authors leave thousands-of-channels settings to future sparsification or grouping. They also acknowledge residual amplitude attenuation under MSE, especially at longer horizons (Appendix G).
- **Reproducibility:** Appendix E describes error bars from five seeds; the reproducibility statement says three. CHS raw data cannot be released. Code availability is described inconsistently as provided/released and as forthcoming upon publication; the supplied Markdown contains no usable repository address.
- **Source and reporting quality:** Tables 20-21 contain truncated cells, repeated suspicious values, and incomplete rows; Table 19 is only an image reference. Fine-grained results and uncertainty from those tables are not reconstructed here. Table 2 and Tables 3/11 differ slightly in some CTF averages, so each value above retains its table context. The supplied text does not identify a publication year, confirmed venue, DOI, or arXiv ID for this paper.

## Related Concepts

- [[concepts/channel-wise-asynchronous-forecasting|Channel-Wise Asynchronous Forecasting]]: preserves distinct sampling rates while comparing forecasts over common physical windows.
- [[concepts/patch-masking-for-missing-time-series-inputs|Patch Masking for Missing Time-Series Inputs]]: trains with variable observed histories and excludes fully missing local tokens at inference.
- [[concepts/channel-permutation-equivariance|Channel Permutation Equivariance]]: a separate robustness property concerning channel reordering. CTF's learned channel identities and asynchronous-input handling do not establish this property.

## Related Papers

- Wang et al. (2024), "TimeXer: Empowering Transformers for Time Series Forecasting with Exogenous Variables": cited channel-summary architecture and baseline, including an interpolation-free modification.
- Liu et al. (2024), "iTransformer: Inverted Transformers Are Effective for Time Series Forecasting": cited channel-token precedent and baseline.
- Zhang et al. (2024), "Irregular Multivariate Time Series Forecasting: A Transformable Patching Graph Neural Networks Approach": cited irregular-sampling baseline, t-PatchGNN.
- [[papers/cpiri-channel-permutation-invariant-relational-interaction-for-multivariate-time-series-forecasting|CPiRi: Channel Permutation-Invariant Relational Interaction for Multivariate Time Series Forecasting]]: library comparison addressing channel reordering and partial channel coverage, rather than differing sampling rates. It is not cited or evaluated here.
- [[papers/multivariate-time-series-forecasting-needs-cross-variable-loss|Multivariate Time Series Forecasting needs Cross Variable Loss]]: library comparison that changes residual supervision to preserve inter-variable structure. CTF instead changes input representation and attention; the methods are not jointly evaluated in this paper.

[[index|Library home]]
