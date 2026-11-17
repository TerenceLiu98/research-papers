---
title: À La Carte Embeddings
type: concept
aliases:
  - A La Carte Embeddings
  - ALC Embeddings
definition: "À la carte embeddings estimate a target representation by applying a learned linear transformation to the average pretrained embeddings of its context words."
tags:
  - word-embeddings
  - text-as-data
  - representation-learning
---

## Overview

À la carte embeddings reuse pretrained word vectors to represent a term from its observed contexts. A learned transformation adjusts the context average, reducing the influence of common directions such as those associated with function words. This supports estimation from scarce local text, including individual occurrences when sufficient context and suitable pretrained resources exist.

## Key Ideas

- Pretraining and local estimation are separate: large corpora supply vectors and a transformation, while a smaller analysis corpus supplies contexts.
- Context-specific vectors permit comparisons of how different groups use the same term. Embedding regression supplies the additional machinery for coefficient estimation and uncertainty; averaging and transformation alone do not constitute a statistical test.
- Transfer depends on domain fit. A Wikipedia-trained transformation needs validation on parliamentary speeches or other specialized text; estimating a local transformation requires enough suitable data.
- Reconstruction, human preference, and substantive usefulness are distinct criteria. In Wirsching et al., fastText-based ALC reconstructs pretrained vectors well, but crowdworkers generally do not prefer its neighbors to ordinary fastText neighbors.
- ALC may expose contextual associations beyond the morphological relatives emphasized by subword models. Whether that is useful depends on the research question.

## Important Papers

- Khodak et al. (2018), “A La Carte Embedding: Cheap but Effective Induction of Semantic Feature Vectors”: foundational method, cited by the resource paper.
- Rodriguez, Spirling, and Stewart (2023), “Embedding Regression: Models for Context-Specific Description and Inference”: regression-based comparisons using context-specific embeddings.
- [[papers/multilanguage-word-embeddings-for-social-scientists|Multilanguage Word Embeddings for Social Scientists]]: multilingual Wikipedia resources and validation, with ready-made products for 40 non-English languages and pipeline coverage of 157 languages.

- [[papers/measuring-media-criticism-with-alc-word-embeddings|Measuring Media Criticism with ALC Word Embeddings]]: induces weekly leader vectors in a shared Arabic news embedding space and compares them with a support–opposition axis. Sparse-context robustness supports granular measurement, but criticism remains distinct from press autonomy.

## Related Concepts

- [[concepts/text-embedding-models|Text Embedding Models]]: ALC is a context-based induction method within the broader family of vector representations of text.
