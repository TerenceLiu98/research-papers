---
title: Audio as Data
type: concept
aliases:
  - Audio-as-Data
tags:
  - audio-as-data
  - political-methodology
  - political-communication
---

## Overview

Audio as data treats recorded sound as a source of quantitative evidence about communication. In political speech, vocal delivery adds information about pitch, intensity, timing, and speaker identity that transcripts alone omit. Mapping those measurements to substantive constructs requires validation in the setting being studied.

## Key Ideas

- Low-level descriptors such as pitch and root-mean-squared energy are interpretable acoustic measurements, but neither directly measures emotion or intent.
- Mel-frequency cepstral coefficients summarize the spectral envelope using a perceptually motivated frequency scale. They support alignment and classification without requiring a large pretrained representation model.
- Learned embeddings such as Wav2Vec 2.0 encode richer acoustic context and can support simple downstream classifiers, with additional computational costs and dependence on training languages and domains.
- [[forced-alignment|Forced Alignment]] connects existing transcripts to audio intervals, enabling joint analysis of what was said and how it was delivered.
- Recording equipment, microphone placement, compression, and speaker baselines affect observed features. Within-speaker normalization can improve comparisons but does not remove all confounding.
- Strong speaker-identification performance does not establish valid emotion measurement. [[speech-emotion-recognition|Speech Emotion Recognition]] needs separate checks against context-sensitive human interpretations.

## Important Papers

- [[potential-and-pitfalls-of-audio-as-data-for-political-research-alignment-features-and-classification-models|Potential and Pitfalls of Audio as Data for Political Research: Alignment, Features, and Classification Models]]: demonstrates alignment, acoustic characterization, speaker identification, and emotion classification in U.S. debates.

## Related Concepts

- [[forced-alignment|Forced Alignment]]
- [[speech-emotion-recognition|Speech Emotion Recognition]]
- [[text-scaling-models|Text Scaling Models]]: an analogous measurement setting where automated features require substantive interpretation and validation.
