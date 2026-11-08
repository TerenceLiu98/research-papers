---
title: "Scaling Multilingual Pretraining of Pixel Language Models"
type: paper
authors:
  - Ilker Kesen
  - Jenny Kunz
  - Kasra Malihi
  - Desmond Elliott
year: null
tags:
  - pixel-language-models
  - multilingual-pretraining
  - cross-lingual-transfer
  - writing-systems
  - representation-analysis
---

## TL;DR

This paper scales [[concepts/pixel-language-models|Pixel Language Models]] along language diversity, script diversity, and model capacity while holding per-language exposure approximately fixed. Across five tasks and 83 languages, adding languages or scripts mainly helps the newly covered languages and writing systems; multilingual training enables transfer to unseen scripts, but further scaling does not improve that transfer consistently. Increasing capacity from 86M to 307M parameters mitigates the curse of multilinguality and extends the layers devoted to visual processing, while cross-lingual alignment weakens as more languages are added.

## Research Question

How do language coverage, script coverage, and model capacity separately affect cross-lingual transfer in pixel language models, including transfer to languages written in scripts absent from pretraining?

## Motivation

Pixel language models render text as images instead of mapping it through a finite token vocabulary. This avoids unknown-token and segmentation failures on unfamiliar writing systems, but earlier work did not establish whether their transfer improves by adding languages in known scripts, adding new scripts, or increasing capacity. The paper constructs controlled model variants to distinguish these effects and to test whether pixel models exhibit the same multilingual capacity trade-off observed in token-based models.

## Contributions

- Introduces MPIXEL variants pretrained on 4, 8, or 16 languages, with 86M- and 307M-parameter versions of the 16-language model.
- Separates language diversity within Latin script from the addition of four previously unseen scripts at the eight-language scale.
- Introduces an ADAPTIVE rendering strategy using grapheme-aware bigrams by default, single characters for CJK text, and contiguous logical-order words for Arabic and Hebrew.
- Evaluates sentence classification, named entity recognition, dependency parsing, natural language inference, and GLUE across 83 languages.
- Uses ABX discrimination and layer-wise sentence and word probes to study cross-lingual alignment and the transition from visual to linguistic processing.

## Method

All variants follow the ViT-MAE encoder architecture used by earlier PIXEL models. The 4-language model is pretrained on English, Hindi, Traditional Chinese, and Ukrainian. One 8-language variant adds Spanish, Danish, Finnish, and Turkish while retaining the already seen Latin script; the other adds Korean, Thai, Greek, and Standard Arabic in new scripts. The 16-language model combines these sets and adds Vietnamese, Persian, Bengali, and Hebrew. Each language contributes about 7.5 billion image patches, and batch size grows with the number of languages so that per-language exposure remains about 4.3 epochs over one million steps. The large model changes capacity from 86M to 307M parameters on the same 16-language data.

ADAPTIVE rendering groups graphemes into bigrams for most languages, uses one character per patch for CJK languages, and keeps Arabic and Hebrew words contiguous and in logical order. Checkpoints are selected through zero-shot bitext mining on FLORES-200 after removing examples overlapping SIB-200.

## Experiments

### Downstream Evaluation

The study evaluates SIB-200 classification in 77 languages, named entity recognition in 12, dependency parsing in 30, XNLI in 15, and English GLUE. Results are grouped into pretraining languages, unseen languages using pretraining scripts, and languages using unseen scripts. Baselines include XLM-R, mBERT, CANINE-S, a matched English-only PIXEL model, and the four-language multilingual PIXEL model.

XLM-R has the highest overall average on every downstream task, while the 307M MPIXEL is second overall. The 86M MPIXEL outperforms CANINE-S on all tasks except XNLI. On typologically distant low-resource SIB-200 languages unseen by all compared models, MPIXEL outperforms XLM-R across the examined writing systems and outperforms CANINE-S on Latin and Bengali scripts. The paper cautions that MPIXEL's unseen-script dependency-parsing advantage over XLM-R is largely driven by Coptic.

### Scaling Effects

Adding languages or scripts primarily improves the added languages and other languages sharing their scripts. Effects on wholly unseen scripts are small and task-dependent. Expanding to 16 languages improves aggregate performance for seen languages and partly for seen scripts, but it does not produce consistent unseen-script gains. Increasing capacity to 307M improves every task for pretraining languages and most evaluations for seen scripts, while unseen-script results remain mixed and dependency parsing decreases.

On the four languages shared by all multilingual variants, the 86M models lose performance as language count grows despite fixed per-language data. This is evidence of a capacity-driven curse of multilinguality rather than reduced exposure. The 307M model recovers much of that loss and exceeds the smaller variants on the shared languages.

### Representation Analysis

ABX probes distinguish language identity from meaning across layers. Cross-lingual meaning discrimination improves with depth, but adding languages weakens alignment among the original four languages. Alignment transfers most clearly to unseen languages that share scripts and language families with pretraining languages; simply including both languages in pretraining does not by itself increase alignment.

Sentence- and word-level probes show that pixel models begin with a visual-processing phase before linguistic information emerges. The 307M model devotes more layers to this phase and reaches stronger deeper-layer syntax and surface-semantic representations. It remains behind the English-only PIXEL model on the complex-semantic SOMO probe, and Arabic word-level probing remains weaker than XLM-R.

## Limitations

MPIXEL is encoder-only and cannot generate language. The scaling study has only four language counts and two model sizes, with one pretraining run per variant, so small differences may reflect unmeasured run-to-run variance. Per-language compute is fixed rather than total compute, meaning models with more languages also receive more total data. Each axis uses one particular language set, and the first multilingual step changes language and script diversity together. The models use substantially less pretraining data than XLM-R. ADAPTIVE rendering is motivated by efficiency and correct right-to-left rendering but is not empirically compared with alternatives such as BIGRAMS. The evaluations cover relatively few seen-script languages for NER and XNLI, and claims about unseen-script transfer vary by task. Web-crawled pretraining data may also transmit social bias, offensive content, and personal information.

The supplied Markdown does not state a stable paper identifier or publication year; these metadata are left unasserted.

## Related Concepts

- [[concepts/pixel-language-models|Pixel Language Models]]
- Cross-lingual representation alignment
- Multilingual pretraining
- Curse of multilinguality
- Tokenization-free language modeling
- Writing-system transfer
- Linguistic probing

## Related Papers

- Kesen et al. (2025), "Multilingual Pretraining for Pixel Language Models": introduces the four-language PIXEL-M4 starting point and reports transfer to unseen scripts.
- Rust et al. (2023), "Language Modelling with Pixels": introduces PIXEL, an encoder trained on rendered English text.
- Lotz et al. (2023), "Text Rendering Strategies for Pixel Language Models": studies structured rendering and patch-input efficiency.
- Salesky et al. (2023), "Multilingual Pixel Representations for Translation and Effective Cross-lingual Transfer": applies multilingual visual text representations to translation.
- Clark et al. (2022), "CANINE: Pre-training an Efficient Tokenization-Free Encoder for Language Representation": provides a character-level, tokenization-free comparison without visual glyph information.

[[index|Library home]]
