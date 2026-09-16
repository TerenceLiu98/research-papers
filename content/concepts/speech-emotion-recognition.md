---
title: Speech Emotion Recognition
type: concept
aliases:
  - Audio Emotion Recognition
tags:
  - affective-computing
  - speech-processing
  - measurement-validity
---

## Overview

Speech emotion recognition predicts emotion categories or affective dimensions from recorded speech. Models can use acoustic features or learned audio embeddings, potentially capturing both delivery and linguistic information. Their predictions are operational measures whose relationship to perceived or experienced emotion must be established for the target population and context.

## Key Ideas

- Categorical models assign labels such as anger, happiness, sadness, and neutral speech. Dimensional models can estimate arousal, dominance, and valence, representing intensity, assertiveness or control, and positivity or negativity.
- Pretrained speech embeddings can be fine-tuned for these tasks. Good benchmark performance does not guarantee accurate interpretation of political debates or other new domains.
- Assertive or high-pitched speech may be labeled angry even when listeners interpret it differently. Speaker characteristics and gender-related expectations can affect errors.
- Comparisons with text classifiers reveal differences between modalities, but agreement or disagreement between models is not a human validity benchmark.
- Speaker-dependent human annotation, within-speaker comparisons, and contextual qualitative analysis help assess whether scores represent the intended construct. Recording conditions and language or cultural differences also require attention.

## Important Papers

- [[potential-and-pitfalls-of-audio-as-data-for-political-research-alignment-features-and-classification-models|Potential and Pitfalls of Audio as Data for Political Research: Alignment, Features, and Classification Models]]: applies categorical and dimensional models to debates while documenting reasons to avoid literal interpretations of predicted anger.
- Wagner et al. (2023), "Dawn of the Transformer Era in Speech Emotion Recognition: Closing the Valence Gap": the dimensional-model source discussed and applied by Mestre and Ryan.

## Related Concepts

- [[audio-as-data|Audio as Data]]
- [[forced-alignment|Forced Alignment]]
