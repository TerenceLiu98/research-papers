---
title: "MEXMA: Token-level objectives improve sentence representations"
type: paper
authors:
  - João Maria Janeiro
  - Benjamin Piwowarski
  - Patrick Gallinari
  - Loïc Barrault
year: null
tags:
  - sentence-embeddings
  - cross-lingual-alignment
  - masked-language-modeling
---

## TL;DR

MEXMA trains multilingual sentence embeddings by reconstructing masked tokens using a translation’s sentence vector, with gradients flowing through both sentence and token representations. Combined with sentence alignment and a spreading regularizer, this improves mining and classification over the evaluated pretrained baselines. On the 81-language FLORES200 evaluation, xsim++ error is 9.60%, versus SONAR’s 12.08%; LaBSE remains stronger on average semantic textual similarity.

## Research Question

Does retaining direct token-level supervision during cross-lingual sentence-encoder training improve the information retained in sentence vectors and their alignment across languages?

## Motivation

Sentence-only training can weaken lexical information in contextual token representations. Since sentence vectors are constructed from those tokens, the authors argue that training should supervise both levels together. Reconstruction through a sentence bottleneck alone does not directly update the encoder’s individual token outputs.

## Contributions

- A symmetric cross-lingual reconstruction architecture combining token and sentence supervision.
- Ablations isolating direct token gradients, clean-sentence alignment, cross-language context, and embedding-space regularization.
- Evaluation on bitext mining, classification, pair classification, and similarity, with token-neighbor and attention analyses.
- A contrastive alignment variant showing that reconstruction can complement alternative sentence objectives.

## Method

A shared XLM-RoBERTa encoder processes clean and 40%-masked versions of both sentences in a parallel pair. The clean final-layer CLS vector from one language is concatenated with the masked token representations of the other language. A six-layer transformer head reconstructs the masked tokens in both directions. Reconstruction gradients update the encoder through both routes.

Training combines mean-squared error between clean sentence vectors, symmetric reconstruction cross-entropy, and symmetric KoLeo regularization. Their weights are 1, 0.5, and 0.005. KoLeo penalizes small nearest-neighbor distances within a batch to encourage a more spread-out embedding distribution. Inference uses the clean encoder’s final CLS vector.

The primary model has 559M parameters; a base variant has 277M. Training uses English paired with 80 other languages from publicly available OPUS/NLLB resources, targeting 15–25 million sentence pairs per language where possible. Appendix A reports 300,000 steps on eight A100 GPUs, batch size 1,200 and gradient accumulation giving an effective batch of 2,400.

## Experiments

Reported aggregate results (Tables 2 and 17):

| Measure | MEXMA | SONAR | LaBSE |
| --- | ---: | ---: | ---: |
| xsim error, 81 languages ↓ | 0.06 | 0.09 | 0.92 |
| xsim++ error, 81 languages ↓ | 9.60 | 12.08 | 18.65 |
| BUCC F1, four language pairs ↑ | 98.93 | 98.25 | 98.75 |
| MTEB classification ↑ | 65.35 | 63.02 | 62.77 |
| SentEval ↑ | 86.38 | 85.82 | 85.63 |
| Pair classification AP ↑ | 71.55 | 69.70 | 68.47 |
| STS Spearman correlation ↑ | 63.99 | 58.04 | 64.65 |

Scores use the paper’s percentage-scale reporting. The common 34-language subset gives different xsim++ errors: 8.26 for MEXMA, 10.55 for SONAR, and 14.51 for LaBSE; these should not be mixed with the 81-language results.

In Table 3, enabling direct token gradients reduces xsim++ error from 11.37 to 9.67 and raises SentEval from 85.06 to 85.98. Adding KoLeo gives 9.60 and 86.38. Same-language reconstruction performs much worse than cross-language reconstruction in Table 10 (73.78 versus 9.60 xsim++ error). The contrastive variant also benefits from direct token gradients (12.78 to 10.93 xsim++ error).

Token analyses suggest that MEXMA preserves lexical distinctions alongside translation alignment. SimAlign word-alignment F1 averages 73.03 across three language pairs, versus SONAR’s 70.66. Its CLS attention is less uniform than LaBSE’s; replacing CLS with mean pooling increases MEXMA’s xsim++ error from 9.60 to 18.21. These analyses support, but do not independently prove, the proposed mechanism.

## Limitations

Language coverage is narrower than SONAR’s, training is data-intensive, and the source corpus receives no additional cleaning. Main baseline comparisons differ in backbone and training data. Appendix B.4 partially addresses this with matched-data variants, but changing MEXMA to an NLLB backbone worsens results. Gains are task-dependent: LaBSE leads on aggregate STS. Attention analysis also identifies an EOS attention sink, so attention concentration is not solely evidence of useful lexical focus.

The supplied Markdown does not establish a publication year or paper identifier; these are not inferred from cited works. Its setup specifies 81 languages including English, while its limitations section says 80.

## Related Concepts

- [[concepts/text-embedding-models|Text Embedding Models]]
- [[concepts/cross-lingual-masked-reconstruction|Cross-Lingual Masked Reconstruction]]

## Related Papers

The source compares LaBSE (Feng et al., 2022), SONAR (Duquenne et al., 2023), DAP (Li et al., 2023), and RetroMAE (Xiao et al., 2022). DAP does not directly train sentence vectors through its reconstruction objective; RetroMAE’s heavy reconstruction does not directly update encoder token outputs.

## Resources

- [Code](https://github.com/facebookresearch/mexma)
- [Model](https://huggingface.co/facebook/MEXMA)

[[index|Library home]]
