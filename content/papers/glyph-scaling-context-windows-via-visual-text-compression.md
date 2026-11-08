---
title: "Glyph: Scaling Context Windows via Visual-Text Compression"
type: paper
authors:
  - Jiale Cheng
  - Yusen Liu
  - Xinyu Zhang
  - Yulin Fei
  - Wenyi Hong
  - Ruiliang Lyu
  - Weihan Wang
  - Zhe Su
  - Xiaotao Gu
  - Xiao Liu
  - Yushi Bai
  - Jie Tang
  - Hongning Wang
  - Minlie Huang
year: 2025
source_job_id: "378b3938-79c9-46ea-8c9d-2dac6c71075c"
tags:
  - long-context-modeling
  - visual-text-compression
  - vision-language-models
  - context-efficiency
  - optical-character-recognition
---

## TL;DR

Glyph renders long text as page images and trains a vision-language model to process the resulting visual tokens. Continual pre-training transfers long-context abilities to rendered inputs, an LLM-guided genetic search selects rendering parameters, and SFT, GRPO, and auxiliary OCR objectives refine the model. The paper reports roughly 3-4x token compression with competitive long-context accuracy, up to 4.8x faster prefilling, 4.4x faster decoding, and about 2x faster SFT training, while identifying OCR fidelity and sensitivity to rendering settings as important limits.

## Research Question

Can [[concepts/visual-text-compression|Visual-Text Compression]] increase the effective context capacity of a fixed-window vision-language model while preserving long-context task performance and reducing training and inference cost?

## Motivation

Extending positional encodings or changing attention can make longer sequences tractable, but these approaches still process large numbers of tokens. Retrieval reduces the sequence itself but can omit relevant evidence and add latency. Glyph instead raises the amount of source text represented by each model token: a rendered page can encode multiple textual tokens per visual token, potentially extending usable context without enlarging the model's nominal context window.

## Contributions

- Introduces a long-context pipeline that renders text into page images and processes them with a vision-language model.
- Uses continual pre-training on diverse rendered layouts and OCR, interleaved language modeling, and generation tasks to transfer textual long-context ability into the visual modality.
- Searches over typography, layout, resolution, and related rendering parameters with an LLM-guided genetic algorithm that jointly considers task accuracy and compression.
- Combines supervised fine-tuning, GRPO, and auxiliary OCR alignment for post-training under the selected rendering configuration.
- Evaluates long-context accuracy, effective compression, training and inference efficiency, extreme context expansion, and transfer to multimodal document understanding.

## Method

Glyph converts a textual context into a sequence of rendered pages. Its compression ratio divides the original text-token count by the visual-token count consumed by those pages. The rendering configuration controls page size, DPI, font, line height, margins, alignment, spacing, colors, horizontal scaling, borders, and cropping, creating a direct tradeoff between information density and visual readability.

Continual pre-training starts from GLM-4.1V-9B-Base and exposes the model to varied rendering styles. The training mixture includes page-level OCR, interleaved visual and textual language modeling, and completion from partially rendered pages. A genetic search then evaluates candidate renderings on validation accuracy and compression; an LLM proposes mutations and crossovers until the population stops improving.

Post-training fixes the selected configuration and applies SFT followed by GRPO. The reward combines answer correctness judged against the reference with output-format compliance. OCR reconstruction remains an auxiliary task during SFT and RL, with Levenshtein distance supplying its RL reward, to reinforce fine-grained recognition under compression.

## Experiments

The principal long-context evaluations use LongBench, MRCR, and Ruler, with text models of similar scale as baselines. Glyph scores 50.56 on the reported LongBench average, compared with 47.46 for Qwen3-8B and 49.27 for GLM-4-9B-Chat-1M. On MRCR's 4-needle and 8-needle settings it averages 25.81 and 18.14, respectively, while preserving about 3x compression. On Ruler, performance varies strongly with rendering resolution: the reported average rises from 72.17 at the most compressed setting to 94.67 at the highest-DPI setting, while average compression declines from 3.6x to 1.2x.

Across LongBench tasks the effective compression ratio averages 3.3x and reaches about 5x on some tasks; MRCR averages 3.0x. Efficiency measurements against the text backbone report up to 4.8x faster prefilling, 4.4x faster decoding, about 2x faster SFT, and an estimated 67% KV-cache memory reduction at roughly 3x compression. Under an aggressive 8x configuration, a 128K-window model is evaluated on MRCR inputs extending to 1M tokens and performs comparably to the listed 1M-context baselines, although absolute accuracy is low.

The searched rendering configuration outperforms random and manually designed configurations under the paper's SFT ablation. Removing OCR from SFT causes the largest reported component drop, followed by removing RL and then removing OCR during RL. On MMLongBench-Doc, Glyph improves overall accuracy from 29.18 for the base VLM to 45.57, suggesting that rendered-text training can also benefit documents containing native layouts and images.

## Limitations

- Accuracy is sensitive to DPI, font, spacing, and other rendering choices; higher visual clarity reduces the compression advantage.
- Fine-grained OCR remains a bottleneck. UUID-like strings are especially difficult and are excluded from the main Ruler comparison.
- Evaluation emphasizes long-context understanding benchmarks and does not establish robustness on agentic or reasoning-heavy workloads.
- The authors report weaker cross-task generalization for the visual-text model than for text-only models.
- Extreme-compression results demonstrate feasibility rather than uniformly strong 1M-token understanding: the reported MRCR scores remain low in absolute terms.
- Rendering, visual encoding, and specialized training introduce preprocessing and model requirements that are not compared against every alternative long-context technique end to end.

## Related Concepts

- [[concepts/visual-text-compression|Visual-Text Compression]]
- [[concepts/early-fusion-vision-language-models|Early Fusion Vision-Language Models]]

## Related Papers

- [[papers/imgcot-compressing-long-chain-of-thought-into-compact-visual-tokens-for-efficient-reasoning-of-large-language-model|ImgCoT: Compressing Long Chain of Thought into Compact Visual Tokens for Efficient Reasoning of Large Language Model]]: applies visual rendering and compression to reasoning traces rather than input context.
- Bai et al. (2024), *LongBench: A Bilingual, Multitask Benchmark for Long Context Understanding*: supplies one of Glyph's principal evaluations.
- Vodrahalli et al. (2024), *Michelangelo: Long Context Evaluations Beyond Haystacks via Latent Structure Queries*: introduces MRCR, used to test recall across long conversational histories.
- Chen et al. (2024), *LongLoRA: Efficient Fine-tuning of Long-Context Large Language Models*: extends long-context training through sparse attention and parameter-efficient fine-tuning rather than input representation compression.

Source note: Synthesized from the supplied parsed Markdown for Cognitio job `378b3938-79c9-46ea-8c9d-2dac6c71075c`. The source provides the project URL `https://github.com/thu-coai/Glyph` but does not state a DOI, arXiv identifier, or publication venue.

[[index|Library home]]
