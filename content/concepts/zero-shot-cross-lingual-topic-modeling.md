---
title: Zero-shot Cross-lingual Topic Modeling
type: concept
aliases:
  - Cross-lingual Zero-shot Topic Modeling
tags:
  - topic-modeling
  - cross-lingual-nlp
  - zero-shot-learning
  - document-embeddings
---

## Overview

Zero-shot cross-lingual topic modeling trains a topic model in one language and infers topic distributions for documents in languages absent from topic-model training. A shared multilingual representation bridges the languages, avoiding a joint multilingual vocabulary, translation pipeline, parallel training corpus, or bilingual dictionary. The resulting topic labels may still remain in the training language.

## Key Ideas

- **Representation transfer:** A multilingual encoder maps documents from supported languages into a shared vector space. The topic model learns a mapping from source-language vectors to topic proportions and reuses it for unseen languages.
- **Training and inference can require different views:** A model may use source-language bag-of-words targets to learn interpretable topic-word distributions during training while accepting only dense document embeddings at inference time.
- **Zero-shot has two scopes:** The test language is unseen by the topic model, but not necessarily by the pretrained multilingual encoder. Claims of language independence are therefore conditional on the encoder's language coverage and cross-lingual alignment.
- **Descriptors and assignments are separate:** Shared embeddings can yield language-agnostic document-topic assignments even when topic descriptors are words from the source-language vocabulary.
- **Evaluation needs matched documents:** Parallel or comparable documents allow direct comparison of topic assignments across languages using exact matches, distribution divergence, or descriptor similarity. Such consistency does not alone prove that the inferred topics are substantively valid.
- **Translation is a useful operational baseline:** Translating test documents into the training language tests whether direct embedding transfer can match a practical alternative, while introducing translation cost and possible representational bias.

## Important Papers

- [[papers/cross-lingual-contextualized-topic-models-with-zero-shot-learning|Cross-lingual Contextualized Topic Models with Zero-shot Learning]] introduces ZeroShotTM, using multilingual Sentence-BERT inputs with an English Neural-ProdLDA reconstruction target.
- Mimno et al. (2009), "Polylingual Topic Models," aligns topic mixtures across parallel multilingual documents but requires multilingual data during topic-model training.
- Boyd-Graber and Blei (2009), "Multilingual Topic Models for Unaligned Text," uses multilingual lexical resources rather than zero-shot inference through contextualized document representations.

## Related Concepts

- [[concepts/text-embedding-models|Text Embedding Models]]
- [[concepts/amortized-variational-inference|Amortized Variational Inference]]
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]
- [[concepts/embedded-topic-models|Embedded Topic Models]]
