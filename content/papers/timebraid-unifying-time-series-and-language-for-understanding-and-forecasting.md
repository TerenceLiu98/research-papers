---
title: "TimeBraid: Unifying Time Series and Language for Understanding and Forecasting"
type: paper
authors:
  - Xinyue Wang
  - Jiacheng Pang
  - Kun Zhou
  - Kexin Zhang
  - Defu Cao
  - Fan Feng
  - Faisal
  - Songyao Jin
  - Yan Liu
  - Biwei Huang
year: null
tags:
  - time-series-forecasting
  - multimodal-learning
  - foundation-models
  - instruction-tuning
---

## TL;DR

TimeBraid joins pretrained language and time-series towers through interleaved global residual attention, allowing one model to answer questions about numerical series and generate text-conditioned forecasts. Its 1.2B, 2.5B, and 6.7B variants train on 2.23M alignment examples and a 4.88M-sample instruction mixture. The largest model reaches 80.65% TSAQA accuracy and 0.225 normalized CRPS on CAF, while precise numerical description, control against historical dynamics, and retention of general language ability remain weaker points.

## Research Question

Can pretrained language and temporal representations be aligned into a bidirectional series-text interface that supports understanding and forecasting while retaining useful capabilities from both pretrained models?

## Motivation

Numeric [[concepts/time-series-foundation-models|Time Series Foundation Models]] capture temporal regularities but lack a natural interface for instructions, domain context, and explanations. Conversely, projecting numerical patches into a language model can lose temporal information. TimeBraid keeps modality-specific processing and learns a shared attention space in which both streams exchange information. This supports [[concepts/text-conditioned-time-series-forecasting|Text-Conditioned Time Series Forecasting]] alongside series-to-language tasks.

## Contributions

- A mixture-of-Transformers architecture with perception, reasoning, and forecasting roles; perception and forecasting share a time-series tower in the final dual-tower design.
- A common prompting format for interleaved text and numerical segments, with causal continuous-valued forecasting and language generation.
- A two-stage data recipe and stabilized joint optimization combining language cross-entropy with point and quantile forecasting losses.
- Evaluation across understanding, contextual forecasting, controlled forecasting, and numeric-only forecasting, including the constructed Ctrl-F test set and architecture, optimization, and alignment ablations.

## Method

**Representation and fusion (Section 3.2; Appendix C).** Text uses a Qwen3 language tower; numerical segments use TimesFM-derived blocks and patches of 32 values. Context segments carry textual length, mean, and standard-deviation information. Target segments reuse history statistics and causal rolling normalization, without receiving future-derived input statistics. Multivariate inputs use one segment per variable.

At paired depths, each tower first runs its native transformer block. Stream-specific projections map its hidden states into shared queries, keys, and values. These are merged in segment-sequence order for causal global attention, then routed back through residual output projections. Zero-initialized output projections make fusion initially an identity map. Language positions, segment-local temporal positions, and global fusion positions are handled separately. The two smaller variants interleave 20 temporal/fusion blocks across 28 language layers; the largest pairs all 36 layers.

**Data (Section 3.1; Appendices A-B).** Alignment contains 2,229,500 examples, with a 3:7 understanding-to-forecasting ratio. Understanding supervision includes morphology, contextual captions, programmed series, and structural-causal-model-generated relationships. Forecast supervision includes annotations of realized futures and controlled sibling futures generated from a shared history. Future-aware annotations supply the textual conditions; future numerical values are prediction targets. Such supervision teaches conditional generation and does not by itself establish that equivalent information is available prospectively.

The SFT inventory contains 4,881,583 examples. Training-time shares are 54.49% forecasting, 22.49% QA/reasoning, 3.34% captioning, 11.69% unimodal replay, and 8.00% alignment retention; these shares differ from raw inventory proportions.

**Objective and stability (Section 3.3).** Training updates both towers and fusion blocks using

$$
\mathcal L=\mathcal L_{\mathrm{CE}}+0.5\mathcal L_{\mathrm{TS}},
$$

where the temporal term combines squared error and pinball losses at quantiles 0.1 through 0.9. An inverse-hyperbolic-sine transform compresses extreme causal-normalized targets. A detached multiplier $\min(1,2/\operatorname{stopgrad}(\ell))$ caps each response's temporal-loss contribution. The transform compresses tails but is not mathematically bounded. Both stages use AdamW at $2\times10^{-5}$, batch size 128, and BF16; alignment runs approximately one epoch and SFT runs 30,000 steps.

At inference, the model can blend numeric-only and text-conditioned point predictions:

$$
\hat y_\lambda=(1-\lambda)\hat y_{\mathrm{ts}}+\lambda\hat y_{\mathrm{text+ts}},\qquad 0\leq\lambda\leq1.
$$

TimeMMD uses one validation-selected weight, $\lambda=0.3$, fixed across domains. Domain-specific sweeps are sensitivity analyses rather than the reported selection procedure.

## Experiments

**Training exposure matters (Appendix B.3).** TSAQA, CaTS-Bench, TimeMMD, CGTSF, and part of CAF contribute training splits. TSExam and Ctrl-F share generation procedures with alignment data, using separately generated evaluation examples. TB-MCQ, CiK, ETT, and Weather are classified as out-of-domain. GIFT-Eval training data also seed part of data generation. The authors report split-level separation; these are different transfer settings, not uniformly unseen benchmark families.

| Evaluation | Reported result | Comparison and scope |
| --- | --- | --- |
| TSAQA, overall accuracy | 6.7B: 80.65%; 2.5B: 78.31%; 1.2B: 76.61% | Benchmark-specific LLaMA3.1-8B SFT: 85.26%; zero-shot GPT-5.4 reference: 63.10% (Tables 1, 13) |
| TB-MCQ, 16-task macro accuracy | 6.7B: 36.58% | GPT-5.4: 38.50%; out-of-domain suite (Tables 1, 16) |
| CaTS-Bench captioning | 6.7B: SimCSE 0.886; Numeric Fidelity 0.684 | Strong semantic alignment, but numeric fidelity below GPT-5.4's 0.778 and Idefics 2 finetuned's 0.748 (Tables 2, 14) |
| CAF, normalized CRPS | 6.7B: 0.225 with standard error 0.012 | Lowest reported pooled mean across 904 correct-context cases; GPT-5.4: 0.233 with standard error 0.011 (Table 19) |
| Ctrl-F, sibling retrieval | 6.7B: 43.33% Top-1; MSE 6.232 | Chance: 33.33%; GPT-4o: 60.00%; scored on 150 original-condition windows from 50 histories (Table 20) |
| CiK, weighted RCRPS | 2.5B: 0.289; 6.7B: 0.294 | Moirai-2: 0.288; Gemini-2.5-Flash: 0.110; lower is better (Table 15) |
| CGTSF, macro errors | 6.7B: MSE 0.413, MAE 0.338 | Best reported macro MSE; MAE tied with 2.5B across twelve dataset/history settings (Table 18) |
| GIFT-Eval, aggregate errors | TimeBraid: MASE 0.763, CRPS 0.546 | TimesFM 2.5: 0.705, 0.490; numeric forecasting remains competitive but below stronger dedicated models (Table 5) |

TimeMMD reports the best average MSE rank for TimeBraid-6.7B across nine domains. Its 128-step history differs from the official 8/36/96 lookbacks used by several multimodal baselines, ChatTime, and Aurora, so this comparison does not isolate text fusion under equal history access (Tables 3, 17). On ETT and Weather, TimeBraid-2.5B ranks second by average MSE rank and third by MAE rank over twenty dataset-horizon settings (Table 21).

**Ablations (Section 4.3).** Shared residual attention achieves substantially lower language loss than an MLP projector in the tested 10,000-step alignment runs. Separate perception and forecasting towers produce nearly identical loss trajectories to the shared temporal tower. Robust normalization and loss capping suppress regression spikes that otherwise disrupt language learning. Alignment gives persistent benefits on understanding and CAF but little final improvement on TimeMMD. Stronger text conditioning helps some domains and harms others; Security favors numeric-only prediction in the sensitivity analysis.

## Limitations

- **Language retention is incomplete.** Five-shot MMLU for TimeBraid-2.5B falls from 60.30% for the original Qwen3-1.7B tower to 40.88% after alignment and recovers to 50.68% after SFT. Unimodal replay during alignment improves intermediate retention but does not improve final MMLU in the reported comparison (Appendix F.3).
- **Patch compression loses local detail.** Exact point values can be hallucinated, complex waveforms misread, and answers inconsistent across paraphrases. Semantic caption similarity is not a substitute for numeric fidelity (Section 6; Appendix G).
- **Control is partial.** Abrupt shifts that contradict historical dynamics are difficult to enforce. Ctrl-F tests constructed alternatives rather than observed counterfactual outcomes, and stronger LLMs remain ahead on Ctrl-F and CiK.
- **Context availability limits prospective interpretation.** TimeMMD text is not certified as available at each forecast origin. Its text-weight sweeps therefore describe sensitivity, not validated deployment gains. Training with future-aware conditions also differs from forecasting with naturally available reports.
- **Evidence and data coverage.** There is no large-scale continued-pretraining stage between alignment and SFT. High-quality real multivariate series-text data remain scarce. Close pooled means such as CAF's do not establish a statistically significant advantage by themselves.
- **Source metadata.** The supplied Markdown does not establish this paper's publication year, venue, DOI, or arXiv identifier. The year is left null. Some appendix table headers and mathematical symbols are corrupted; this summary uses legible prose and clearly aligned entries without reconstructing missing identifiers or cells.

## Related Concepts

- [[concepts/text-conditioned-time-series-forecasting|Text-Conditioned Time Series Forecasting]]: using context or explicit future conditions to guide numeric predictions.
- [[concepts/time-series-foundation-models|Time Series Foundation Models]]: the temporal pretraining inherited by the numerical tower.
- [[concepts/transferability-evaluation|Transferability Evaluation]]: separating benchmark training exposure, held-out families, input access, and retained pretrained capabilities.
- [[concepts/forecast-combination|Forecast Combination]]: the inference-time interpolation of numeric-only and text-conditioned forecasts.

## Related Papers

- [[papers/a-decoder-only-foundation-model-for-time-series-forecasting|A Decoder-Only Foundation Model for Time-Series Forecasting]]: the cited TimesFM lineage underlying the temporal tower; this earlier library paper describes a different version from the TimesFM 2.5 baseline.
- [[papers/aurora-towards-universal-generative-multimodal-time-series-forecasting|Aurora: Towards Universal Generative Multimodal Time Series Forecasting]]: an evaluated multimodal forecaster using text and rendered history images; TimeBraid additionally supports series-to-language generation.
- Wang et al. (2025), "ChatTime: A Unified Multimodal Time Series Foundation Model Bridging Numerical and Textual Data": a cited bidirectional baseline using discrete value tokens.
- Xie et al. (2024), "ChatTS: Aligning Time Series with LLMs via Synthetic Data for Enhanced Understanding and Reasoning": a cited understanding baseline and source of attribute-programmed alignment data.

[[index|Library home]]
