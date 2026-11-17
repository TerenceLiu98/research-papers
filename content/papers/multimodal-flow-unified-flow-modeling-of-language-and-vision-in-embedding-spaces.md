---
title: "Multimodal Flow: Unified Flow Modeling of Language and Vision in Embedding Spaces"
type: paper
authors:
  - Hongyuan Tao
  - Xinggang Wang
  - Lianghui Zhu
  - Yongkang Li
  - Yunchao Wei
  - Bin Feng
  - Shaoyu Chen
  - Qian Zhang
  - Chang Huang
  - Kai Yu
year: null
source_job_id: cc7c17b3-80c3-4a7b-91c8-db15a7338efe
tags:
  - flow-matching
  - multimodal-learning
  - continuous-generative-models
---

## TL;DR

Multimodal Flow models continuous text and image embeddings with one chunk-causal flow objective. Its 1.6B-parameter MF-1 backbone, trained on 150B tokens and jointly finetuned for 5B more, reports GenEval 0.821, DPG-Bench 83.44, and MMBench 67.2. Matched architecture experiments favor it over the tested discrete and hybrid implementations.

## Research Question

Can a shared continuous generative process learn language and vision while preserving text order and image spatial structure, supporting both understanding and generation?

## Motivation

Discrete image tokenization limits retained visual information. Hybrid systems preserve continuous images but use different language and image objectives. Continuous embeddings offer a common flow objective without requiring identical representations or codecs across modalities.

## Contributions

- Ordered text and image chunks define a common conditional generation interface.
- A chunk-causal transformer combines shared attention with modality-specific feed-forward networks.
- Mixed pretraining uses the same flow loss for text-only, image-only, image-to-text, and text-to-image tasks.
- Scaling, matched architecture comparisons, transfer experiments, and representation ablations assess the formulation.

## Method

Frozen T5-small encodes independent eight-token text blocks into 512-dimensional embeddings. Frozen SigLIP2-so400m encodes each 224 × 224 image as a single 16 × 16 grid of 1152-dimensional features. Normalization and modality-specific projections map these states into a common backbone space. Separate frozen decoders recover tokens or pixels; the text decoder is trained separately before flow training.

The model factorizes the chunk sequence as $p(C)=\prod_k p(c_k\mid c_{<k})$. Each target follows $z_t=tx+(1-t)\epsilon$ with Gaussian noise. The network predicts clean embeddings and converts them to velocity, $(\hat x-z_t)/\max(1-t,0.05)$ in the implementation, before minimizing masked velocity squared error. Independent target timesteps and a mask exposing preceding clean chunks, but never a target's clean counterpart, permit parallel training predictions.

At inference, chunks are generated sequentially with iterative flow sampling and cached prefix keys and values. Classifier-free guidance applies to either output modality. Evaluation uses 16 SDE steps per text chunk with guidance 3, or 64 ODE steps per image with guidance 5. Shared objectives do not imply identical numerical sampling settings.

The pretraining mixture is 70% text-only, 20% image understanding, 9% text-to-image, and 1% image-only. GPIC, LLaVA-OneVision-1.5, and Ultra-FineWeb-L3 supply pretraining data (Appendix C).

## Experiments

The main 1.6B model reports POPE 86.1, MMBench 67.2, SEED-Bench 62.4, VQAv2 72.6, GQA 58.3, and OK-VQA 39.1. GenEval is 0.821 in the text and transfer table, rounded to 0.82 in Table 1; DPG-Bench is 83.44. Published-model comparisons use heterogeneous training regimes.

The controlled comparison instead matches data, optimization, and trainable parameters at 1.6B, with 50B pretraining and 5B finetuning tokens (Table 4):

| Architecture | GenEval | GQA | VQAv2 | MMBench | SEED-Bench |
| --- | ---: | ---: | ---: | ---: | ---: |
| Multimodal Flow | 0.7134 | 55.60 | 69.03 | 46.74 | 51.85 |
| Transfusion-style | 0.6693 | 52.81 | 68.49 | 33.68 | 31.31 |
| Chameleon-style | 0.3744 | 45.83 | 56.37 | 38.40 | 42.40 |

With 155B total training tokens in both transfer conditions, mixed pretraining followed by finetuning improves GenEval from 0.527 to 0.821 and SEED-Bench from 31.6 to 62.4 compared with training a random backbone directly on downstream data (Table 5).

Scaling studies cover 0.6B, 1.2B, and 1.6B backbones. At 0.6B and 50B pretraining tokens, semantic visual features outperform the tested VAE and pixel representations; DINOv2 favors generation while SigLIP2 balances generation and captioning. Modality-specific FFNs help captioning, but the chosen shared-attention configuration is not best on every metric: modality-specific attention and FFNs obtain GenEval 0.255 versus 0.226 for shared attention and specific FFNs (Table 6).

## Limitations

Longer interleaved sequences, video, and other modalities remain future work. Frozen pretrained codecs remain necessary despite random backbone initialization. Controlled parameter budgets exclude these codecs and do not establish equal end-to-end computational cost. GPT-2-large perplexity measures generated-text fluency, not the flow model's likelihood. The supplied Markdown does not explicitly identify the paper's publication year, venue, or stable identifier; these are left unspecified.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]] supplies the shared continuous transport objective.
- [[concepts/representation-autoencoders|Representation Autoencoders]] provide decodable semantic image representations.

## Related Papers

- [[papers/elf-embedded-language-flows|ELF: Embedded Language Flows]] motivates continuous contextual text modeling; MF-1 instead uses a separately trained frozen text decoder and chunk-causal multimodal pretraining.
