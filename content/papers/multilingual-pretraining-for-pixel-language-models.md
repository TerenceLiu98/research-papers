---
title: "Multilingual Pretraining for Pixel Language Models"
type: paper
authors:
  - Ilker Kesen
  - Jonas F. Lotz
  - Ingo Ziegler
  - Phillip Rust
  - Desmond Elliott
year: null
tags:
  - pixel-language-models
  - multilingual-pretraining
  - cross-lingual-transfer
---

## TL;DR

PIXEL-M4 pretrains a rendered-text encoder on English, Hindi, Ukrainian, and Simplified Chinese. It improves over English-only PIXEL-BIGRAMS on most non-Latin languages, with particularly useful gains under limited downstream supervision. The comparison also changes corpus and unique-data exposure, so it does not isolate multilinguality alone.

## Research Question

Can pretraining on four visually and linguistically diverse languages improve pixel-model transfer to languages using the same, related, or unrelated scripts?

## Motivation

[[concepts/pixel-language-models|Pixel Language Models]] avoid a fixed subword vocabulary by processing rendered text. This enables unfamiliar scripts to enter the model, but English-only pretraining leaves open whether their visual and linguistic structure can be learned effectively. Selecting one language per script tests broader coverage without massive language counts.

## Contributions

- Introduces PIXEL-M4, a general-purpose multilingual pixel encoder.
- Evaluates classification, dependency parsing, and named entity recognition across 27 languages and 15 scripts overall.
- Examines low-resource adaptation, word-level linguistic probing, and layer-wise cross-lingual sentence alignment.

## Method

Equal amounts of four mC4 language subsets are rendered using bigrams, PangoCairo, and Noto Sans fonts. Each sequence contains 529 patches of 16 × 16 pixels. Training uses batches of 256 for one million steps, approximately 135 billion patch exposures. Languages are mixed within batches, while individual examples are monolingual.

The PIXEL masked-autoencoder recipe masks 25% of patches in spans of up to six. A Vision Transformer encodes visible patches, and a lightweight decoder reconstructs masked pixels. Downstream training removes the decoder and masking and attaches task-specific heads. Architecture, rendering, and hyperparameters match PIXEL-BIGRAMS; unique examples and corpus do not. PIXEL-M4 sees its mC4 subset once, while the baseline repeats English Wikipedia and BookCorpus about ten times.

## Experiments

Baselines include PIXEL-BIGRAMS, script-dependent monolingual BERT models, and CANINE-S, which was pretrained on 104 languages. The following averages are reported in Tables 1–3:

| Benchmark / metric | PIXEL-BIGRAMS | PIXEL-M4 | CANINE-S |
| --- | ---: | ---: | ---: |
| SIB-200 subset, macro F1 | 46.0 | 58.7 | 63.7 |
| UD dependency parsing, LAS | 76.7 | 79.3 | 73.9 |
| NER, macro F1 | 73.9 | 76.6 | 76.8 |

Classification gains include Hindi (+46.0 points), Ukrainian (+36.1), Chinese (+27.0), and Korean (+26.9). Gains are not universal: Egyptian Arabic classification declines from 38.3 to 37.5, while Arabic parsing falls by 3.5 points and English parsing by 2.0. Latin-script classification remains broadly similar.

NER gains are largest in Chinese (+13.5); Telugu is tied. Table 3 and its caption give average PIXEL-M4 F1 as 76.6, whereas the accompanying prose says 75.9; this summary uses the table. Naamapadam subsets of 1,024–8,192 examples, sampled with eight seeds, show larger advantages when labeled data are scarce.

LINSPECTOR probes cover 15 languages and 14 tasks in the appendix, with selected analyses in the main text. Multilingual pretraining improves linguistic features for Cyrillic languages and often for unseen Arabic, Armenian, and Greek scripts. Sentence retrieval uses normalized mean-pooled embeddings and cosine-similarity recall@5 on aligned SIB-200 examples. Deeper layers align English–Ukrainian and English–Hindi strongly; other pretraining-language pairs remain less aligned. Script clustering in early-layer t-SNE plots is therefore complemented by a direct retrieval test, rather than establishing universal semantic alignment.

## Limitations

Only one four-language pretraining configuration is studied. More unique data and a different corpus confound attribution to multilingual coverage. CANINE-S also differs in language coverage and training data. Gains are limited for Latin scripts and high-resource downstream settings. Bigram rendering can expand sequences when characters do not fit a patch, and the encoder cannot generate text. Cross-lingual alignment is strongest for a subset of language pairs.

The supplied Markdown does not explicitly state the publication year or a stable identifier; these remain unasserted here.

## Related Concepts

- [[concepts/pixel-language-models|Pixel Language Models]]
- Multilingual representation learning
- Script-aware cross-lingual transfer
- Masked image reconstruction

## Related Papers

- Rust et al. (2023), “Language Modelling with Pixels”: introduces the underlying PIXEL encoder.
- Lotz et al. (2023), “Text Rendering Strategies for Pixel Language Models”: supplies the bigram rendering baseline.
- Salesky et al. (2023), “Multilingual Pixel Representations for Translation and Effective Cross-lingual Transfer”: studies multilingual visual encoders for translation rather than general-purpose representation learning.
- [[papers/scaling-multilingual-pretraining-of-pixel-language-models|Scaling Multilingual Pretraining of Pixel Language Models]]: the library's related study separates language, script, and capacity scaling.

[[index|Library home]]
