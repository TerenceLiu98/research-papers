---
title: "Improving Language and Modality Transfer in Translation by Character-level Modeling"
type: paper
authors:
  - Ioannis Tsiamas
  - David Dale
  - Marta R. Costa-jussà
year: null
tags:
  - machine-translation
  - cross-lingual-transfer
  - speech-translation
---

## TL;DR

charSONAR replaces SONAR’s subword encoder input with characters and distills multilingual sentence embeddings. A small adapter then connects a frozen MMS speech recognizer to the frozen character encoder using transcriptions. On the reported 33-language FLEURS-to-English benchmark, the best adapter reaches 0.889 COMET versus 0.873 for SeamlessM4T-Large-v2, without training on paired speech translations.

## Research Question

Can character-level encoder inputs improve both transfer to low-resource languages and adaptation from text translation to speech translation?

## Motivation

Subword vocabularies can impede transfer to unseen languages and mismatch the character-level predictions of CTC speech recognizers. A shared character interface offers a way to reuse text semantics with little speech supervision, while SONAR’s sentence bottleneck keeps decoding independent of source length.

## Contributions

- Character-level adaptation of a multilingual sentence encoder through teacher–student embedding matching.
- An interpolated translation-pair target and language-family tokens for cross-lingual transfer.
- Pretrained and dual cross-modal adapters connecting MMS to charSONAR.
- Translation and retrieval evaluations separating known languages, unseen languages, and speech adaptation.

## Method

charSONAR initializes from SONAR, retaining single-character vocabulary entries (about 8K instead of 256K). Reconstruction pretraining matches the original encoder’s embedding of the same sentence. Subsequent training minimizes mean squared error to the average teacher embedding of a parallel pair. For languages unsupported by SONAR, it instead matches the translated sentence’s teacher embedding. Normalization and character noise simulate ASR errors. Language-family tokens replace language tokens with 20% probability during training and support unseen-language inference.

For speech, frozen MMS produces acoustic features and CTC predictions. Consecutive features with the same prediction are averaged and blank segments removed. The pretrained adapter computes a soft character embedding through the MMS classification layer and charSONAR embedding table. A dual variant gates between this branch and a randomly initialized two-layer adapter. Only the adapter is trained, matching the resulting sentence embedding to SONAR’s embedding of the transcription; the SONAR decoder generates translations. The pretrained adapter has roughly 200K parameters, the dual adapter 2.5M.

## Experiments

Text training covers 63 SONAR-supported languages and 12 new languages, using filtered parallel data; evaluation uses FLORES+ dev/devtest. Speech adapters use Common Voice 17.0, optionally augmented with approximately 2K FLEURS training transcriptions per language. Speech evaluation covers 33 source languages into English. COMET denotes the paper’s xCOMET-XL evaluation; xSIM++ measures retrieval error.

| Evaluation | Character model | Comparison |
| --- | ---: | ---: |
| Known 63 languages, COMET, 75-language training | 0.917 | SONAR-75: 0.913 |
| Low-resource 21-language subset, COMET | 0.889 | SONAR-75: 0.882 |
| New 12 languages, supervised COMET | 0.863 | SONAR-75: 0.859 |
| New 12 languages, zero-shot COMET | 0.530 | SONAR-63: 0.517 |
| Known 63 languages, xSIM++ error | 7.0 | SONAR-75: 7.5 |

These are Table 3 results; zero-shot models train only on the 63 known languages. English-only training does not favor characters (15.8 versus 15.9 BLEU), supporting the authors’ transfer interpretation rather than a general compute advantage. Input sequences are 3.2 times longer, but measured single-example inference rises from 0.84 to 0.94 seconds (Tables 4–5).

On FLEURS test (Table 7), the pretrained speech adapter scores 0.812 without adapter training, 0.875 after Common Voice training, and 0.884 with additional FLEURS transcriptions. The dual adapter reaches 0.889 with both datasets, but only 0.805 with Common Voice alone; its low-resource subset falls to 0.615, versus 0.837 for the smaller pretrained adapter. More capacity therefore depends on sufficient supervision. With additional FLEURS data, the dual model also reduces 33-language retrieval error to 10.2 versus 11.5 for the MMS–charSONAR cascade (Table 8).

## Limitations

The experiments concern source-side transfer and a specific sentence-bottleneck architecture. They do not demonstrate translation across all 1,000+ MMS languages. Speech adapters are language-specific and require corresponding ASR support; “zero-shot” speech translation means no paired speech-translation training, not no transcription supervision or no prior text translation training. Attempts using a unified zero-shot MMS model yielded poorer translation because of lower ASR quality. Retrieval improvements are not uniform across new-language subgroups. Target-side character decoding and alternative encoder architectures remain untested.

The supplied Markdown does not establish this paper’s publication year or identifier; year is left unset.

## Related Concepts

- [[concepts/character-level-cross-modal-transfer|Character-Level Cross-Modal Transfer]]
- [[concepts/knowledge-distillation|Knowledge Distillation]]
- [[concepts/text-embedding-models|Text Embedding Models]]

## Related Papers

- SONAR (Duquenne et al., 2023) supplies the multilingual embedding space and decoder; MMS (Pratap et al., 2023) supplies the CTC acoustic encoder.
- ZeroSwot (Tsiamas et al., 2024), cited by the paper, also learns speech translation from transcription supervision, using Wasserstein alignment rather than a sentence-level MSE target.
- [[papers/mexma-token-level-objectives-improve-sentence-representations|MEXMA]] provides a related library treatment of multilingual sentence representations and retrieval. Its token-reconstruction objective differs from charSONAR’s teacher embedding matching; benchmark aggregates are not directly comparable.

[[index|Library home]]
