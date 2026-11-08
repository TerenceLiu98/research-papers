---
title: "LoMo: Local Modality Substitution for Deeper Vision-Language Fusion"
type: paper
authors:
  - Feng Han
  - Zhixiong Zhang
  - Zheming Liang
  - Yibin Wang
  - Jiaqi Wang
year: null
url: https://maplebb.github.io/LoMo
tags:
  - vision-language-models
  - multimodal-fusion
  - supervised-fine-tuning
  - data-curation
---

## TL;DR

LoMo converts selected spans of text-only training prompts into rendered images, producing text-image-text sequences with unchanged answers. Across 13 multimodal benchmarks, it improves average standard-evaluation performance over matched supervised fine-tuning by 2.68 points on LLaVA-OneVision-1.5-8B and 2.82 points on Qwen3.5-9B. The gains are much larger when questions are rendered as images, and representation analyses report tighter text-image alignment. The evidence is limited to supervised fine-tuning of two 8B-9B backbones, however, and the span selection is a fixed middle-block heuristic.

## Research Question

Can a data-only intervention make vision-language models less sensitive to whether equivalent linguistic content arrives as text tokens or rendered pixels, while also improving ordinary multimodal performance?

## Motivation

Current multimodal corpora usually assign asymmetric roles to modalities: text supplies instructions or questions, while images supply referenced visual evidence. The authors argue that this regularity lets a model solve training tasks without learning carrier-invariant representations. In their diagnostic evaluation, replacing a text question with an image containing the same question sharply reduces accuracy, a failure mode they call [[concepts/carrier-sensitivity-in-vision-language-models|carrier sensitivity]]. Samples with greater cosine distance between text and rendered-image hidden states also show larger accuracy drops, from 7.75% in the closest-distance bin to 21.23% in the farthest.

## Contributions

- Defines and measures carrier sensitivity by comparing standard text-question evaluation with an otherwise matched rendered-question protocol.
- Introduces Local Modality Substitution (LoMo), an architecture-independent data-curation procedure that inserts a rendered text span between textual prefix and suffix context.
- Interprets ordinary answer supervision on the substituted prompt as an implicit pressure for agreement between predictive distributions under equivalent carriers.
- Evaluates two VLM backbones on 13 benchmarks and uses both Modality Integration Rate and paired hidden-state cosine distance to examine internal alignment.
- Ablates rewrite ratio, rendering position, perceptual distortion, data scale, and the ratio of image-bearing to text-only samples.

## Method

For a text-only question-answer pair $(x,a)$, LoMo decomposes the question into prefix, middle, and suffix spans. Questions of at most three sentences are rendered in full. Longer questions are split with formula-aware chunking, and the middle third is selected without cutting through mathematical expressions.

The selected span is routed to either a LaTeX renderer or a standard text renderer. Failed LaTeX rendering falls back to the text renderer, after which empty margins are trimmed. One sampled transformation then leaves the image clean or applies rotation, blur, a shadow or stain, or a wave deformation. Substituting this image back into the prompt yields a text-image-text input with the original answer target.

Training minimizes the usual answer likelihood conditioned on the transformed prompt. The paper rewrites this loss as the text-conditioned supervised objective plus a log probability ratio, whose expectation under the model's text-conditioned answer distribution is a KL divergence between predictions from the original and transformed carriers. This is an interpretation of the task loss rather than an independently optimized representation loss: LoMo adds neither a new objective nor a model component.

The main training pool contains two million multimodal and two million text-only examples sampled from LLaVA-OneVision-1.5 data. Half of the text-only examples are rewritten in the reported LoMo setting. Both LoMo and the baseline use matched data, optimization settings, steps, and compute. The method changes training inputs only, so it adds no inference-time operation.

## Experiments

**Main evaluation.** The authors fine-tune LLaVA-OneVision-1.5-8B-Base and Qwen3.5-9B-Base and evaluate 13 benchmarks covering general and mathematical reasoning, factuality, instruction following, document and OCR understanding, and visual perception. Under ordinary image-plus-text evaluation, LoMo raises the mean score from 40.88 to 43.56 on LLaVA and from 54.43 to 57.25 on Qwen. It improves 23 of 26 model-benchmark comparisons; the three regressions are 0.56 points on LLaVA MMMU, 0.60 on Qwen MathVista, and 0.30 on Qwen CC-OCR.

**Carrier-substitution evaluation.** When each question is rendered as an image, LoMo raises the average from 15.24 to 34.10 on LLaVA and from 43.26 to 55.18 on Qwen. For Qwen, the average gap between standard and rendered evaluation falls from 11.17 points after standard SFT to 2.07 after LoMo. These tests directly target carrier robustness, although they use the same general rendered-text intervention that LoMo exposes during training.

**Representation alignment.** At the four-million-example scale, LoMo reports a mean Modality Integration Rate 0.122 below standard SFT. Paired text/rendered-image cosine distance falls from the 0.52 initialization value to 0.49 with LoMo, whereas standard SFT increases it to 0.57. These metrics support closer internal distributions and paired representations, but they do not by themselves establish that alignment causes every downstream gain.

**Ablations.** Full-question rendering improves the LLaVA average by 1.19 points, local substitution without perceptual distortion by 2.22, and the full method by 2.68. Rendering the middle span performs better than prefix, suffix, and multi-span variants. A 50% rewrite ratio is best among the tested values; performance declines from 43.56 at 50% to 42.68 at 100%. Under a controlled 1:1 image-bearing/text-only ratio, LoMo retains a 2.45-point gain, arguing against increased image exposure as the sole explanation. Gains grow from 1.66 points at one million examples to 2.68 at four million.

**Text-only capabilities.** Across MMLU-Pro, GSM8K, HumanEval, LiveCodeBench V6, and IFEval, LoMo changes the five-task mean by +0.28 on LLaVA and +0.58 on Qwen. Individual regressions remain: LLaVA drops 0.31 on MMLU-Pro, and Qwen drops 0.84 on GSM8K.

## Limitations

- LoMo is tested only during supervised fine-tuning; its effect in pretraining or reinforcement-learning post-training is unknown.
- Evaluation covers two backbones at 8B-9B scale, so scaling to substantially larger or architecturally different models is not established.
- Span localization uses a fixed middle-block heuristic rather than learned, difficulty-aware, or curriculum-based selection.
- Rendered evaluation is closely matched to the training intervention and therefore does not establish robustness to every kind of modality change or naturally occurring document image.
- The paper reports associations between representation distance and performance, plus aligned movement under LoMo, but does not isolate a causal mediation path from representation alignment to task accuracy.
- Rendering the full prompt or rewriting every text-only example is worse than the selected local, 50% setting, so the benefit is not a generic consequence of adding rendered text.

## Related Concepts

- [[concepts/carrier-sensitivity-in-vision-language-models|Carrier Sensitivity in Vision-Language Models]]: the failure mode directly diagnosed and targeted by LoMo.
- [[concepts/visual-text-compression|Visual-Text Compression]]: also represents text as pixels, but primarily to increase context density rather than to align equivalent carriers.
- [[concepts/early-fusion-vision-language-models|Early Fusion Vision-Language Models]]: shares the goal of deeper cross-modal interaction but changes model architecture rather than only curating inputs.

## Related Papers

- Liang et al. (2022), "Mind the Gap: Understanding the Modality Gap in Multi-Modal Contrastive Representation Learning": studies separated image and text embedding distributions in contrastive models.
- Huang et al. (2024), "Deciphering Cross-Modal Alignment in Large Vision-Language Models with Modality Integration Rate": supplies the distribution-level alignment metric used in LoMo's analysis.
- Cheng et al. (2025), "Glyph: Scaling Context Windows via Visual-Text Compression": renders text for context compression rather than complementary within-instance carrier alignment.
- Jiang et al. (2024), "Mantis: Interleaved Multi-Image Instruction Tuning": reformats multimodal instructions into interleaved multi-image sequences without targeting semantic equivalence between carriers.

[[index|Library home]]
