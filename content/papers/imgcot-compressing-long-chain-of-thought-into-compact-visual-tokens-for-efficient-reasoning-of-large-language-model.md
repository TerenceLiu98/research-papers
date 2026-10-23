---
title: "ImgCoT: Compressing Long Chain of Thought into Compact Visual Tokens for Efficient Reasoning of Large Language Model"
type: paper
authors:
  - Xiaoshu Chen
  - Sihang Zhou
  - Ke Liang
  - Taichun Zhou
  - Xinwang Liu
year: null
source_job_id: "b9223b88-5280-4fce-bbdb-597a1b015b10"
tags:
  - latent-reasoning
  - chain-of-thought
  - visual-tokenization
  - reasoning-efficiency
  - vector-quantization
---

## TL;DR

ImgCoT renders a textual chain of thought as a structured image and compresses it into eight discrete visual tokens, shifting the reconstruction objective from linguistic form toward spatial reasoning structure. Its hybrid extension, L-ImgCoT, adds only reasoning steps whose token log-likelihood indicates that the base model is relatively uncertain. Across three language-model backbones and four benchmarks, ImgCoT is much shorter than full textual CoT and usually more accurate than comparable latent-reasoning baselines; L-ImgCoT consistently exceeds the authors' Full-CoT baseline while using roughly 30% fewer inference tokens.

## Research Question

Can chain-of-thought compression preserve reasoning structure more effectively by reconstructing a spatial rendering rather than the original text, and can selectively retained textual steps recover details lost by aggressive visual compression?

## Motivation

Text-reconstruction autoencoders must preserve word choice, syntax, and style as well as logical content. The paper argues that this linguistic reconstruction target can allocate limited latent capacity to surface realization rather than the organization of a solution. A visual rendering instead makes step boundaries, hierarchy, and dependencies spatially explicit, but strong compression may blur domain-specific operations. ImgCoT and L-ImgCoT address these two sides of the efficiency-detail tradeoff.

## Contributions

- Introduces ImgCoT, which renders reasoning traces with segmented steps and dependency arrows before compressing them with a one-dimensional TiTok-style vector-quantized autoencoder.
- Trains an autoregressive language model to predict the visual latent sequence and final answer, while discarding the visual encoder at inference time.
- Introduces L-ImgCoT, which combines the latent sequence with low-likelihood textual reasoning steps selected relative to a model-specific threshold estimated on general pretraining text.
- Compares visual and textual reconstruction targets, explicit and omitted layout cues, latent-token budgets, and out-of-domain transfer.

## Method

ImgCoT first renders each chain of thought into a 512 x 512 image. Delimited reasoning steps receive bounding boxes, and directed arrows represent dependencies. A vector-quantized autoencoder based on TiTok maps the image to a one-dimensional sequence of discrete codes; the default configuration uses 8 latent tokens and a 4,096-entry codebook whose embedding dimension matches the downstream language model.

The language model receives the question, a beginning marker, the visual latent sequence, an ending marker, and the answer. Training applies mean-squared error to latent-token predictions and cross-entropy to textual output. At inference, the model generates latent representations autoregressively without running the image encoder, then produces the final answer.

L-ImgCoT estimates a confidence threshold from average token log-likelihood on a general pretraining corpus. Within each training rationale, steps whose average log-likelihood exceeds the threshold are replaced by ellipses, while relatively low-likelihood steps remain explicit. The output target then contains the filtered textual trace followed by the answer, letting latent tokens carry the global plan while selected text carries difficult operations.

## Experiments

### Setup

The experiments cover mathematical reasoning on MATH and GSM8K, scientific question answering on GPQA-Extended, and logical reasoning on ProsQA. The backbones are Qwen2.5-0.5B-Instruct, Qwen2.5-1.5B-Instruct, and Llama-3.2-3B-Instruct. Models below 1B parameters receive full fine-tuning; larger models use LoRA. Baselines include Full-CoT, Coconut, ICoT, CODI, and CoLaR. The visual tokenizer is trained on MathPile, and all reported training and evaluation use eight NVIDIA A100 GPUs.

### Main Results

With a fixed eight-token latent trace, ImgCoT generally approaches the Full-CoT accuracy while sharply reducing generated reasoning tokens. For Qwen2.5-1.5B, for example, ImgCoT reports 19.5, 38.7, 41.8, and 100.0 accuracy on MATH, GSM8K, GPQA, and ProsQA, respectively, versus 19.4, 44.1, 40.0, and 99.6 for Full-CoT. The corresponding Full-CoT traces average 238.7, 126.6, 229.5, and 46.2 tokens, while ImgCoT uses eight on every task.

L-ImgCoT exceeds Full-CoT in every model-task cell reported in Table 1, sometimes narrowly. On Qwen2.5-1.5B it obtains 19.9, 45.2, 43.6, and 100.0 accuracy with 127.4, 71.3, 130.8, and 21.7 tokens. The paper summarizes this as approximately 30% lower inference-token use than Full-CoT across settings.

### Ablations and Analysis

At the same eight-token budget, visual reconstruction outperforms textual reconstruction in every reported cell, although margins vary. Removing dependency-layout cues also usually lowers accuracy; several ProsQA settings are tied. As the latent budget shrinks, the reported visual-over-textual advantage grows. Performance is non-monotonic at larger token counts, which the authors hypothesize reflects underfitting as the latent combinatorial space expands; this explanation is not independently isolated.

In a MetaMathQA transfer experiment with Qwen2.5-0.5B, ImgCoT scores 3.1, 9.6, 12.0, and 5.8 on Gaokao, SVAMP, SingleEq, and MultiArith, compared with 1.8, 5.6, 8.4, and 4.2 for the textual-token variant. For L-ImgCoT on the same backbone, removing visual latent tokens reduces MATH/GSM8K/GPQA/ProsQA accuracy from 10.1/17.5/38.1/98.6 to 9.1/15.8/29.1/94.2, supporting the empirical value of combining global latent structure with explicit details.

## Limitations

- The central account that visual latents encode reasoning structure rather than linguistic form is supported by reconstructions, ablations, and transfer results, but remains an interpretation rather than a direct mechanistic identification.
- Evaluation covers three relatively small backbones, four principal benchmarks, and one visual-tokenizer design; the evidence does not establish scaling behavior for larger models or longer and less regular reasoning traces.
- The reported token counts do not directly measure wall-clock latency, memory, tokenizer-training cost, or end-to-end energy use. Training itself uses eight A100 GPUs.
- The visual tokenizer requires rendered training rationales and dynamic font sizing. The test sets did not trigger the documented multi-image fallback, leaving extreme trace lengths untested.
- Selecting explicit steps depends on a threshold estimated from a general corpus and on the model's token likelihood. The supplied text reports threshold values for two Qwen models but leaves the Llama value missing.
- Accuracy declines at some larger latent-token counts. The proposed underfitting explanation and the effect of increasing training data are left for future study.
- The supplied Markdown does not state a stable paper identifier or publication year, so those metadata are left unasserted.

## Related Concepts

- [[concepts/latent-reasoning|Latent Reasoning]]
- Chain-of-thought reasoning
- Vector-quantized autoencoders
- Visual tokenization
- Inductive bias
- Test-time computation

## Related Papers

- [[papers/thinking-without-words-efficient-latent-reasoning-with-abstract-chain-of-thought|Thinking Without Words: Efficient Latent Reasoning with Abstract Chain-of-Thought]]: learns a compact discrete reasoning vocabulary through distillation and reinforcement learning rather than compressing visualized rationales.
- Hao et al. (2024), "Training Large Language Models to Reason in a Continuous Latent Space": Coconut recurrently feeds hidden states back as continuous thoughts.
- Su et al. (2025), "Token Assorted: Mixing Latent and Text Tokens for Improved Language Model Reasoning": provides the autoencoder-based textual compression approach that most directly motivates ImgCoT's change of reconstruction target.
- Yu et al. (2024), "An Image Is Worth 32 Tokens for Reconstruction and Generation": introduces TiTok, the one-dimensional image tokenizer adapted for ImgCoT.
- Cheng et al. (2025), "Glyph: Scaling Context Windows via Visual-Text Compression": supplies the visual text-rendering strategy used by ImgCoT.

[[index|Library home]]
