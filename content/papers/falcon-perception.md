---
title: Falcon Perception
type: paper
authors:
  - Falcon Vision Team, TII
year: null
repository: https://github.com/tiiuae/Falcon-Perception
tags:
  - vision-language-models
  - instance-segmentation
  - optical-character-recognition
  - autoregressive-models
---

## TL;DR

Falcon Perception uses a 600M-parameter shared Transformer for image patches, text, and structured instance generation. Its [[concepts/early-fusion-vision-language-models|early-fusion]] backbone emits coordinates, size, and a segmentation token for each object; lightweight heads produce geometry and dense masks. On SA-Co, it reports higher macro-F1 than SAM 3 (68.0 versus 62.3), but lower positive micro-F1 and presence MCC. A separate 300M FalconOCR recognizer, paired with an external layout detector, scores 80.3% on the English-only olmOCR evaluation and 88.64 on English-only OmniDocBench 1.5.

## Research Question

Can a single shared Transformer replace the vision-encoder/task-decoder split for language-grounded dense perception while supporting compositional prompts and variable numbers of instances?

## Motivation

Dense grounding requires both deciding whether a requested concept is present and localizing its instances. Modular systems separate visual features from task decoding, while fully tokenized masks make autoregressive output expensive. The paper investigates sharing the backbone while retaining specialized output heads. It also argues that standard referring-expression benchmarks obscure distinct weaknesses in text recognition, spatial grounding, relations, and crowded scenes.

## Contributions

- A shared image/text Transformer with bidirectional image attention and causal text/task attention.
- A coordinate-to-size-to-mask interface for [[concepts/autoregressive-dense-perception|autoregressive dense perception]], with Fourier geometry embeddings and parallel pixel-level mask decoding.
- PBench, an internally constructed capability benchmark with roughly 5,000 samples across five prompt categories and roughly 400 crowded-scene samples.
- A training recipe combining multi-teacher initialization, curated positive and negative expressions, feature regularization, and long-context adaptation.
- FalconOCR, a separately trained compact recognizer applying the backbone design to document elements.

## Method

### Backbone and Outputs

Raw image patches and text embeddings enter the same stack from the first layer. Image tokens attend bidirectionally within the visual prefix; text and task tokens attend to all image tokens and causally to preceding text/task tokens. Thus, shared parameters do not imply that image tokens attend back to the subsequent prompt. The architecture combines sequence and spatial rotary position embeddings, preserves aspect ratio within a resolution budget, and packs valid patches with attention isolated across samples (Sections 2.1-2.3).

Each query first predicts presence or absence. Positive queries emit repeated `<coord>`, `<size>`, and `<seg>` tokens, with instances ordered in raster order. Coordinate and size heads classify 1,024 bins per axis; size bins use a logarithmic scale. Decoded geometry is reintroduced through Fourier features to condition later predictions. A content-aware AnyUp feature upsampler supplies dense visual features, and their dot product with the projected segmentation-token state produces a mask. Pixels are decoded in parallel, although instances are generated sequentially. Detection can skip the segmentation head.

### Training

Multi-teacher [[concepts/knowledge-distillation|knowledge distillation]] transfers DINOv3 local visual features and SigLIP2 language-aligned features into the backbone. Perception training then uses a curated collection reported as 54M images, 195M positive expressions, 488M negative expressions, and 570M masks, supplemented with public datasets and text-only data. Annotation uses model consensus, box-to-mask conversion, and human review of disagreements; Hungarian matching appears in data curation and evaluation, even though instance prediction avoids a matching-based decoder.

The objective adds language cross-entropy, coordinate/size classification, focal and Dice mask losses, and Gram-matrix feature alignment with weight 0.1. Loss normalization accounts for unequal valid-target counts across distributed ranks. Positive and negative samples are balanced 1:1 during three perception stages (Sections 4.4-4.5):

| Stage | Training tokens | Main change |
| --- | ---: | --- |
| In-context listing | 450 billion | Predict expressions and instances; cap at 100 masks per expression |
| Task alignment | 225 billion | Isolate query attention and remove expression-token loss; cap at 150 masks |
| Long-context adaptation | 10 billion | Raise cap to 600 masks with a small constant learning rate |

### OCR Extension

FalconOCR trains the 22-layer, 300M variant from scratch, without perception distillation. PP-DocLayoutV3 detects page elements; FalconOCR reads crops using element-type prompts and emits text, LaTeX formulas, or HTML tables. The pipeline assembles outputs using the detector's reading order. Training uses English-focused OCR data and next-token cross-entropy for 250,000 pretraining steps plus 20,000 decay steps. The shared-backbone claim concerns the recognizer's architecture; full-page processing remains a two-stage pipeline (Section 6).

## Experiments

### Dense Perception

SA-Co Table 6 reports the following averages. Macro-F1 averages per-sample scores, including a score of one for correct negatives. Positive micro-F1 aggregates instance matches on positive samples across IoU thresholds 0.50-0.95. IL_MCC measures binary presence decisions. These metrics capture different behavior; macro-F1 is not a pure measure of mask boundary quality (Appendix A).

| Model | Macro-F1 | Positive micro-F1 | IL_MCC |
| --- | ---: | ---: | ---: |
| SAM 3 | 62.3 | 66.1 | 0.82 |
| Falcon Perception | 68.0 | 62.1 | 0.64 |

Section 5.1 reports PBench macro-F1 gains over SAM 3 of 9.2 points for attributes, 13.4 for OCR-guided queries, and 21.9 for spatial prompts. Its Dense split reaches 72.6 versus 8.9 for Qwen3-VL-30B. Detection-only comparison models receive masks from SAM using predicted boxes. PBench separates simple classes, attributes, OCR identifiers, spatial constraints, and relations; crowdedness is an additional axis rather than a sixth semantic skill.

Most design ablations use detection, not segmentation. Raster ordering improves PBench/SaCo detection scores to 59.3/56.2 versus 52.2/46.3 for random ordering. Gram regularization improves the segmentation ablation from 52.7/51.1 to 53.8/52.6. A 300M detection model initialized randomly remains behind its distilled counterpart after 230,000 steps; the reported segmentation run from random initialization diverges early (Sections 4.3 and 5.3).

Sampling experiments select the highest-scoring prediction using the task metric for each example. In this separate detection evaluation, SA-Co classification-gated F1 rises from 34.7 for deterministic decoding to 54.3 at best-of-eight, and PBench OCR-guided F1 rises from 38.1 to 50.1 (Tables 8-9). These are oracle selection results, not the performance of a deployed selector, and their deterministic baselines differ from the main segmentation table.

### OCR

| Evaluation | FalconOCR result | Context |
| --- | ---: | --- |
| olmOCR, English-only | 80.3% accuracy | Chandra: 82.0%; Mistral OCR 3: 81.7% |
| olmOCR multi-column / tables | 87.1% / 90.3% | Highest values among the listed systems for these categories |
| olmOCR old scans / tiny text | 43.5% / 78.5% | Chandra: 49.2% / 91.9% |
| OmniDocBench 1.5, English-only | 88.64 overall | PaddleOCR VL 1.5: 94.37; Chandra: 88.97 |
| OmniDocBench components | 0.055 edit distance; 86.8 CDM; 84.6 TEDS | Lower edit distance is better; higher CDM/TEDS is better |

These are the paper's reported comparisons, not independently reproduced results (Tables 10-11).

## Limitations

- **Calibration and computation:** Falcon Perception trails SAM 3 on SA-Co presence MCC and positive micro-F1. Training is expensive and sequential instance decoding can be slower than fully parallel detection. High instance counts also require sufficient image resolution.
- **Benchmark independence:** PBench was curated by contributors to model training, and training expressions use the same capability taxonomy. This limits independence of the diagnostic evidence; it does not itself establish sample leakage. Most ablations do not isolate the backbone against a matched modular alternative at equal data and compute.
- **Sampling and future work:** Best-of-k requires metric-based selection. Preliminary reinforcement-learning gains mentioned in the discussion do not establish a complete evaluated deployment method.
- **OCR scope:** Evaluations exclude non-English documents. Old scans and tiny text remain weaknesses, and layout detection and element matching affect full-page scores. The authors' explanations involving HTML equivalence and formula matching are hypotheses about score losses, not corrected benchmark results.
- **Reporting and extraction:** Section 6.4 reports about 3,000 output tokens/s on one GPU, whereas Section 6.7 states about 6,000 tokens/s and 2.8 images/s without reconciling settings. No unified throughput claim is adopted here. Table 7's model header is embedded as an image in the supplied Markdown; comparisons above use explicitly identified prose results. Appendix D includes example documents and OCR outputs, which are not additional contributions or papers to ingest.
- **Metadata:** The supplied text gives the collective byline and repository, but no explicit publication year, venue, DOI, or arXiv identifier for Falcon Perception. The year remains null rather than being inferred from cited works.

## Related Concepts

- [[concepts/early-fusion-vision-language-models|Early Fusion Vision-Language Models]]
- [[concepts/autoregressive-dense-perception|Autoregressive Dense Perception]]
- [[concepts/knowledge-distillation|Knowledge Distillation]]

## Related Papers

- Carion et al. (2025), *SAM 3: Segment Anything with Concepts*: the main promptable-segmentation comparator and source of the SA-Co evaluation framework.
- Chen et al. (2022), *Pix2Seq: A Language Modeling Framework for Object Detection*: the token-interface precedent discussed in the introduction.
- Kolesnikov et al. (2022), *UViM: A Unified Modeling Approach for Vision with Learned Guiding Codes*: a related approach to efficient structured vision output.
- Chaybouti et al. (2025), *AMoE: Agglomerative Mixture-of-Experts Vision Foundation Model*: the cited multi-teacher initialization pipeline.
- [[papers/beyond-logits-aligning-feature-dynamics-for-effective-knowledge-distillation|Beyond Logits: Aligning Feature Dynamics for Effective Knowledge Distillation]]: a Wiki comparison, not a citation in Falcon Perception. Both transfer internal representations, but FDD aligns layerwise vocabulary predictions in LLMs, whereas Falcon initializes visual features from multiple teachers.

[[index|Library home]]
