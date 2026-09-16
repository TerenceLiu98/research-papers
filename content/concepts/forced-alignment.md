---
title: Forced Alignment
type: concept
aliases:
  - Audio-Text Alignment
tags:
  - speech-processing
  - multimodal-analysis
  - audio-as-data
---

## Overview

Forced alignment assigns time intervals in a recording to units of an existing transcript. It connects textual content to the corresponding sound, supporting utterance-level analysis of speakers, topics, and delivery. Unlike automatic speech recognition, the transcript is an input rather than the main prediction target.

## Key Ideas

- Transcript quality and coverage matter: omitted, interrupted, or very short utterances can make matching unreliable.
- One approach, demonstrated with Aeneas, synthesizes speech from the transcript and uses dynamic time warping to match its MFCC sequence to that of the recording. This is one implementation, not a definition of all forced alignment methods.
- Alignment may target sentences or finer units such as phonemes, depending on the method and research question.
- Human ratings of matched audio--text pairs provide a practical quality check. Agreement among raters should be distinguished from the accuracy of the alignment itself.
- Poor timing can compromise downstream attribution of acoustic features to sentences or speakers. Alignment quality therefore belongs in the measurement assessment of a multimodal study.

## Important Papers

- [[potential-and-pitfalls-of-audio-as-data-for-political-research-alignment-features-and-classification-models|Potential and Pitfalls of Audio as Data for Political Research: Alignment, Features, and Classification Models]]: evaluates Aeneas using five ratings per utterance on a 500-utterance sample, finding particular difficulty with short sentences.

## Related Concepts

- [[audio-as-data|Audio as Data]]
- [[speech-emotion-recognition|Speech Emotion Recognition]]
