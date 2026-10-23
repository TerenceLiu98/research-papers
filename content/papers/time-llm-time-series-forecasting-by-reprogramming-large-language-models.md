---
title: "TIME-LLM: Time Series Forecasting by Reprogramming Large Language Models"
type: paper
authors:
  - Ming Jin
  - Shiyu Wang
  - Lintao Ma
  - Zhixuan Chu
  - James Y. Zhang
  - Xiaoming Shi
  - Pin-Yu Chen
  - Yuxuan Liang
  - Yuan-Fang Li
  - Shirui Pan
  - Qingsong Wen
year: null
repository: "https://github.com/KimMeen/Time-LLM"
tags:
  - time-series-forecasting
  - large-language-models
  - model-reprogramming
  - few-shot-learning
  - zero-shot-learning
---

## TL;DR

TIME-LLM adapts a frozen language model to forecasting by mapping numerical time-series patches into combinations of learned text-embedding prototypes and prepending natural-language dataset, task, and statistical context. Only the input transformation and forecast head are trained. The reported experiments show competitive or leading aggregate errors in standard, few-shot, and cross-dataset zero-shot benchmarks, while ablations support contributions from both patch reprogramming and Prompt-as-Prefix. The results do not isolate whether gains arise from linguistic reasoning, pretrained sequence computation, prompts, or the surrounding learned modules.

## Research Question

Can an intact, frozen large language model be adapted to general time-series forecasting by aligning numerical patches with its embedding space and guiding their transformation with natural-language prompts?

## Motivation

Forecasting models are commonly trained for particular datasets or domains, while language models transfer across tasks with limited examples. Directly applying an LLM is difficult because time series are continuous and high-precision numerical sequences, whereas language models consume discrete tokens and are not pretrained explicitly for forecasting. TIME-LLM studies [[concepts/model-reprogramming|Model Reprogramming]] as an alternative to training a time-series foundation model from scratch or fine-tuning an LLM backbone.

## Contributions

- Introduces patch reprogramming, which maps embedded time-series patches through cross-attention over a compact learned set of prototypes derived from the frozen LLM word-embedding matrix.
- Introduces Prompt-as-Prefix, which places dataset context, task instructions, and input statistics before the reprogrammed patches.
- Trains only the input-side reprogramming modules and output projection while keeping the Llama or GPT-2 backbone fixed.
- Evaluates long- and short-horizon forecasting, limited-data training, cross-dataset transfer, backbone variants, component ablations, and efficiency relative to QLoRA.

## Method

**Channel-independent patching.** Each variable of a multivariate series is normalized separately with RevIN, divided into patches, and linearly embedded. Variables are processed as separate univariate sequences. This reduces the token sequence and preserves local temporal structure, but does not directly model cross-variable interactions.

**Patch reprogramming.** A learned linear probe condenses the frozen LLM vocabulary embeddings into a smaller bank of text prototypes. Multi-head cross-attention uses each numerical patch embedding as a query and the prototypes as keys and values. A projection maps the result to the LLM hidden dimension. The intended effect is to express patches inside the source representation space without converting precise values into generated text.

**Prompt-as-Prefix.** A text prefix supplies three forms of context: a dataset description, the forecasting instruction, and statistics calculated from the input. The statistics include minimum, maximum, median, a trend determined from the sum of first differences, and five lags selected by FFT-based autocorrelation. The prefix and reprogrammed patch embeddings pass through the frozen LLM together.

**Forecast head.** Prefix outputs are discarded. Patch outputs are flattened and linearly projected to the requested horizon, after which normalization is reversed. Training updates the lightweight input transformation and output projection, not the backbone. The default experiments use all 32 layers of Llama-7B; the paper reports fewer than 6.6 million trainable reprogramming parameters, approximately 0.2% of the backbone's parameter count.

## Experiments

**Standard forecasting.** Long-horizon tests cover ETTh1, ETTh2, ETTm1, ETTm2, Weather, Electricity, Traffic, and ILI, generally with horizons 96, 192, 336, and 720. TIME-LLM reports the best MSE on seven of eight dataset averages in Table 1; PatchTST is slightly lower on ETTh2 (0.330 versus 0.334), and some MAE comparisons also favor PatchTST. On M4 short-term forecasting, TIME-LLM reports weighted averages of 11.983 SMAPE, 1.595 MASE, and 0.859 OWA, compared with 12.035, 1.625, and 0.869 for N-HiTS.

**Limited-data and transfer settings.** With the first 10% of training time steps, the reported dataset-average table gives TIME-LLM the lowest MSE on all seven benchmarks. At 5%, it leads four of seven average-MSE comparisons; DLinear is lower on ETTm1 and Electricity, while PatchTST is lower on Traffic. The paper's "zero-shot" protocol trains on one ETT dataset and evaluates on another without target-dataset samples. Across the eight listed source-target pairs, TIME-LLM has the lowest average MSE in every case. This is cross-dataset transfer after source training, not inference from a universally pretrained forecasting model with no forecasting-task optimization.

**Ablations.** On ETTh1 and ETTm1 at horizons 96 and 192, removing patch reprogramming or Prompt-as-Prefix worsens every reported MSE. Removing dataset context, task instructions, or statistical context also degrades the corresponding default. Full Llama-7B outperforms an eight-layer variant and the tested GPT-2 variants. The QLoRA comparison is worse than reprogramming on every reported standard and few-shot cell.

**Efficiency.** For Llama-7B at ETTh1 horizons 96 and 336, reprogramming uses 6.39/6.48 million trainable parameters versus 50.29/50.37 million for QLoRA, with lower reported GPU memory and iteration time. The frozen backbone still dominates total parameters, memory, and runtime: the 32-layer configuration uses roughly 32-38 GiB and 0.52-0.63 seconds per iteration in those two settings.

## Limitations

- Treating channels independently omits explicit cross-variable dependencies, despite evaluation on multivariate datasets.
- A frozen backbone reduces trainable parameters but not storage or inference cost; the default Llama configuration remains substantially more expensive than the reprogramming network alone.
- The ablations establish that the learned alignment and prompt components help within this design, but they do not demonstrate that the LLM performs linguistic reasoning or identify which pretrained capabilities cause the gains.
- "Zero-shot" denotes transfer between ETT datasets after optimization on a source dataset. It should not be conflated with a forecasting model used without any forecasting-task training.
- Results are not uniformly best. Several dataset-metric combinations favor PatchTST or other baselines, and the M3-Quarterly comparison favors TimesNet on SMAPE and MAPE and PatchTST on MRAE.
- The source reports a unified pipeline and three repetitions, but some headline baseline values are cited from prior work. Broader domain transfer and comparisons controlling total inference compute remain open.
- The supplied Markdown gives no explicit publication year, venue, DOI, or arXiv identifier. Those fields are not inferred. This page summarizes the supplied source for Cognitio job `e1850bb3-832d-4fc4-95d4-450ed0043d6f`.

## Related Concepts

- [[concepts/model-reprogramming|Model Reprogramming]]: adapting a fixed source model through learned input and output transformations.
- [[concepts/time-series-foundation-models|Time Series Foundation Models]]: broadly transferable temporal models, including approaches pretrained directly on time series.
- [[concepts/text-conditioned-time-series-forecasting|Text-Conditioned Time Series Forecasting]]: using natural-language context to influence numerical forecasts; TIME-LLM's prompt describes the dataset, task, and observed input rather than independent future information.
- [[concepts/frozen-language-model-blocks-as-modality-encoders|Frozen Language-Model Blocks as Modality Encoders]]: a related strategy that inserts selected frozen transformer blocks rather than passing reprogrammed inputs through an intact prompted LLM.

## Related Papers

- Gruver et al. (2023), "Large Language Models Are Zero-Shot Time Series Forecasters": the cited LLMTime baseline, which serializes numerical values for autoregressive language-model forecasting.
- Zhou et al. (2023), "One Fits All: Power General Time Series Analysis by Pretrained LM": the cited GPT4TS baseline, which adapts pretrained language-model components rather than using TIME-LLM's prototype reprogramming.
- Nie et al. (2023), "A Time Series Is Worth 64 Words: Long-Term Forecasting with Transformers": supplies PatchTST, the patching precedent and a principal task-specific baseline.
- Yang, Tsai, and Chen (2021), "Voice2Series: Reprogramming Acoustic Models for Time Series Classification": a cited cross-modal reprogramming predecessor.
- [[papers/a-decoder-only-foundation-model-for-time-series-forecasting|A Decoder-Only Foundation Model for Time-Series Forecasting]]: a library comparison that pretrains a causal transformer directly on numerical patches rather than repurposing language-model weights.

[[index|Library home]]
