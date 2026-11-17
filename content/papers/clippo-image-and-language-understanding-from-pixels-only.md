---
title: "CLIPPO: Image-and-Language Understanding from Pixels Only"
type: paper
authors:
  - Michael Tschannen
  - Basil Mustafa
  - Neil Houlsby
year: null
tags:
  - pixel-language-models
  - multimodal-learning
  - contrastive-learning
---

## TL;DR

CLIPPO encodes natural images and rendered text with one fully shared Vision Transformer trained contrastively. It removes the lexical tokenizer and text embedding table while retaining competitive image–text retrieval and enabling supervised language and visual-question-answering transfer. Adding consecutive-sentence pairs improves language understanding but reduces image classification and retrieval performance.

## Research Question

Can a single pixel-input encoder learn image, language, and joint image–language representations using contrastive pretraining alone?

## Motivation

Shared Transformer backbones still often retain modality-specific input embeddings. Rendering text as images extends parameter sharing to the input interface and avoids choosing a multilingual lexical vocabulary. The challenge is preserving visual performance while learning linguistic structure from noisy alt-text.

## Contributions

- Fully shares patch embedding, Transformer, and pooling head across natural images and rendered text.
- Integrates image–alt-text and consecutive-sentence contrastive learning in one batch and objective.
- Evaluates classification, retrieval, GLUE, multilingual retrieval, and supervised VQA transfer, with analyses of weight sharing and modality separation.

## Method

Text is rendered with GNU Unifont onto images and processed by a ViT-B/16 or ViT-L/16. At 224 × 224 resolution, the encoder receives 196 patches. Image and text are encoded in separate forward passes during contrastive pretraining, sharing all parameters; their 768-dimensional pooled representations enter the CLIP-style contrastive loss.

The main data source is WebLI, with English or multilingual alt-text; additional experiments use LAION-400M and YFCC-100M. C4 provides consecutive-sentence positive pairs. The batch size is 10,240, with 250k steps for the main image–text models. B/16 co-training increases steps to preserve image-pair exposure, reaching 500k steps at 50% C4. The L/16 mixed-data runs instead continue a 150k-step image–text checkpoint for another 350k steps.

For VQA, the question is rendered above the image and a classification head is fine-tuned on VQAv2. This is supervised answer classification, not zero-shot or generative VQA. GLUE likewise uses task-specific supervised fine-tuning. CLIP* denotes the authors’ retrained dual-tower baseline; 1T-CLIP shares its backbone but retains separate modality embeddings.

## Experiments

Main English B/16 results (Tables 1–2); retrieval is MS-COCO recall@1 and GLUE is the reported development-set average excluding WNLI:

| Model / training mix | Parameters | ImageNet zero-shot accuracy | COCO image → text | COCO text → image | GLUE |
| --- | --- | --- | --- | --- | --- |
| CLIP*, WebLI | 203M | 65.1 | 48.5 | 31.3 | 65.9 |
| 1T-CLIP, WebLI | 118M | 62.3 | 48.0 | 30.3 | 68.3 |
| CLIPPO, WebLI | 93M | 61.4 | 47.3 | 30.1 | 68.6 |
| CLIPPO, WebLI + 25% C4 | 93M | 57.4 | 40.7 | 26.7 | 74.4 |
| CLIPPO, WebLI + 50% C4 | 93M | 53.1 | 35.2 | 23.4 | 76.6 |

C4-only B/16 reaches 78.4 GLUE, versus the cited PIXEL score of 76.3 and BERT-Base score of 83.1; training data and exposure differ. L/16 with 50% C4 reaches 80.0. On VQAv2 test-dev at 224px, B/16 CLIPPO scores 66.29 versus 63.31 for CLIP* and 61.36 for 1T-CLIP; 25% C4 raises this to 66.74 (Table 7).

On Crossmodal3600, multilingual CLIPPO broadly matches or exceeds comparable 1T-CLIP variants, but the specialized mT5 vocabulary can outperform it. Separate patch embeddings or heads do not consistently improve results. Shared weights alone do not eliminate the modality gap; C4 co-training reduces it, while paired image/text embeddings remain distinct (Appendix D).

## Limitations

Language improvement trades off against visual performance even when image-pair exposure is preserved; fixed total batch size reduces image-pair negatives during co-training. Clean synthetic text does not establish robust document or webpage understanding. Rendering direction and font coverage remain design choices, including the paper’s left-to-right handling of Arabic. The encoder cannot generate text. Comparisons with PIXEL use different pretraining exposure. Publication year and a stable identifier are not explicitly established in the supplied Markdown, so they are not inferred here.

## Related Concepts

- [[concepts/pixel-language-models|Pixel Language Models]]: rendered patches replace lexical input tokens.
- [[concepts/multimodal-embedding-models|Multimodal Embedding Models]]: contrastive alignment supports cross-modal retrieval with a shared encoder.

## Related Papers

- Radford et al. (2021), *Learning Transferable Visual Models From Natural Language Supervision*: supplies the dual-tower contrastive paradigm.
- Rust et al. (2023), *Language Modelling with Pixels*: PIXEL learns rendered-text representations through masked reconstruction, rather than CLIPPO’s contrastive objective.
- [[papers/on-the-design-fundamentals-of-pixel-text-representation-learning|On the Design Fundamentals of Pixel Text Representation Learning]]: studies rendering diversity and spatial variation for unified pixel-text representations and document retrieval.
