---
title: "On the Design Fundamentals of Pixel Text Representation Learning"
type: paper
authors:
  - Chaohao Yuan
  - Ruifeng Yuan
  - Zhuoxu Huang
  - Yu Rong
  - Hong Cheng
  - Hou Pong Chan
  - Chenghao Xiao
year: null
url: https://github.com/Pixel-Linguist/Pixel-Linguist-II
tags:
  - pixel-language-models
  - visual-document-retrieval
  - multilingual-representations
  - visual-text-compression
---

## TL;DR

PIXEL LINGUIST II learns text semantics directly from rendered images using a native-resolution vision encoder. Controlled ablations motivate variable spatial scales, natural-image grounding, diverse rendering, and multilingual pretraining before semantic alignment. The model improves Visual STS and selected document-retrieval benchmarks, with useful but task-dependent tolerance to visual token compression.

## Research Question

Which rendering, architecture, grounding, and curriculum choices let efficient pixel-text pretraining transfer to dense documents and multilingual semantic matching?

## Motivation

[[concepts/pixel-language-models|Pixel Language Models]] can encode text without a lexical tokenizer, but synthetic snippets differ from real documents in resolution, layout, and visual context. Fixed rendering can encourage appearance-based shortcuts, and semantic pairs alone may provide insufficient exposure to diverse scripts.

## Contributions

- Uses a compact 13M-example ablation setup to study spatial variation and grounding, supplemented by curriculum and larger-scale grounding comparisons.
- Instantiates these findings in a unified encoder for natural images, rendered queries, and rendered text pairs.
- Evaluates English and multilingual Visual STS, ViDoRe retrieval, downstream multimodal models, and visual token compression.

## Method

The encoder initializes from Qwen2.5-VL’s ViT and uses a NaViT-style architecture supporting variable resolutions and aspect ratios, with adjacent visual tokens pooled in 2 × 2 groups. On-the-fly rendering samples 393 fonts and diverse backgrounds, including DTD textures, with visual perturbations. In the small-scale spatial ablation, text uses 224 × 224 canvases and font sizes 12–22; Appendix B separately lists 16–28 for its rendering configuration.

Training applies InfoNCE to both natural image–rendered text pairs and rendered text–text pairs. Stage 1 combines 62M multilingual Wikipedia documents with 26M natural image–text pairs; two independently sampled 25–50% document crops provide positive text pairs. Stage 2 combines 26M curated semantic pairs with 26M image–text pairs. Two epochs per stage yield 280M examples seen, rather than 280M unique examples. The reported global batch size is 32,768 across 64 GPUs, with temperature 0.03.

Retrieval embeds rendered queries and document images in the same visual space. Some English and retrieval results use only semantic mid-training, optionally followed by AllNLI fine-tuning on 270K examples; these should not be conflated with the complete multilingual curriculum.

## Experiments

| Evaluation | Reported result | Scope |
| --- | --- | --- |
| Spatial ablation, nDCG@5 | 37.83 full; 33.45 fixed image size; 30.97 fixed font size | Four ViDoRe tasks, Table 1 |
| Text-only fixed-template ablation | 1.65 nDCG@5 | Removes multiple components together |
| English Visual STS | 74.72 mid-training; 79.80 after fine-tuning | Average Spearman score, Table 3 |
| Cross-lingual Visual STS | 53.83 → 57.16 with prior pretraining | Table 5 |
| Multilingual Visual STS | 61.79 → 65.27 with prior pretraining | Before fine-tuning, Table 13 |
| Six-task ViDoRe subset | 50.94 fine-tuned vs. 46.94 SigLIP | nDCG@5, Table 4 |
| Full ten-task ViDoRe table | 55.25 fine-tuned vs. 56.38 SigLIP | nDCG@5, Table 11 |

The full retrieval table does not establish an overall lead over the strongest SigLIP baseline, despite the paper’s broader state-of-the-art wording. SigLIP uses a dedicated text encoder in its standard evaluation; forcing rendered queries through its vision encoder reduces its full-table average to 23.58.

For downstream evaluation, both vision encoders are paired with Qwen2.5-7B-Instruct and receive LLaVA-style training. Table 8 reports improvements on all nine listed tasks. Under compression, Table 9 gives a mean of 60.04 with 40% of visual tokens retained, compared with 59.67 for uncompressed Qwen2.5-ViT. At 20% retained, the mean falls to 56.61. The separate claim of outperforming uncompressed CLIP with 80% token removal concerns ViDoRe representation evaluation, not all downstream tasks.

## Limitations

Performance is weaker on diagram-heavy scientific documents such as ArxivQA, and synthetic rendering may not cover handwriting, occlusion, scans, and camera noise. English–Arabic alignment remains weak: Table 5 reports 1.44 for the full curriculum despite a higher overall cross-lingual average. TextVQA is particularly sensitive to compression.

The near-collapse ablation removes grounding and rendering variation together, so it does not isolate their individual contributions. The source’s Visual STS compression sentence also calls retaining 118 of 196 tokens a 60% discard rate; those counts instead imply approximately 60% retention. Its precise percentage is therefore ambiguous. Publication year and a stable paper identifier are not stated in the supplied Markdown and are left unasserted.

## Related Concepts

- [[concepts/pixel-language-models|Pixel Language Models]]
- [[concepts/visual-text-compression|Visual-Text Compression]]

## Related Papers

- [[papers/scaling-multilingual-pretraining-of-pixel-language-models|Scaling Multilingual Pretraining of Pixel Language Models]]: complementary study separating script, language, and capacity effects in pixel encoders.
- [[papers/glyph-scaling-context-windows-via-visual-text-compression|Glyph: Scaling Context Windows via Visual-Text Compression]]: cited application of rendered text to longer effective contexts.
- Xiao et al. (2024), “Pixel Sentence Representation Learning”: preceding work on semantic pixel representations.
- Tschannen et al. (2023), “CLIPPO: Image-and-Language Understanding from Pixels Only”: related unified pixel-based encoding.

[[index|Library home]]
