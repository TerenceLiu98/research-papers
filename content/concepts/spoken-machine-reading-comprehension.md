---
title: Spoken Machine Reading Comprehension
type: concept
aliases:
  - Spoken-Language Question Answering
  - Transcript-Based Reading Comprehension
tags:
  - machine-reading-comprehension
  - spoken-language
  - question-answering
---

## Overview

Spoken machine reading comprehension asks a system to answer questions from speech transcripts rather than edited written documents. The task may use extractive answers copied from a transcript or other answer formats, but its defining challenge is that the evidence retains properties of spoken communication and speech recognition.

## Key Ideas

- **Speech differs from edited text.** Informal grammar, filler words, repetition, dialects, and variable word order change both the evidence and the form of plausible answers.
- **Transcription creates an additional noise channel.** Automatic speech recognition can introduce substitutions and malformed words, while omitting punctuation, capitalization, and speaker identity.
- **Real and simulated speech test different conditions.** Text-to-speech versions of written passages isolate some recognition effects, whereas transcripts of natural conversations or vlogs also contain spontaneous-language variation and environmental noise.
- **Long contexts make evidence retrieval central.** Full recordings can yield transcripts much longer than standard reading-comprehension passages, increasing irrelevant content and creating tension with model context limits.
- **Exact match is sensitive to answer boundaries.** Multiple spans may convey essentially the same answer while differing in optional particles or modifiers. Token F1, semantic measures, and carefully collected alternative references can complement exact match.
- **Written-domain transfer is not guaranteed.** A model fine-tuned on formal prose may lose substantial accuracy on speech transcripts even within the same language, so domain-specific evaluation is necessary.

## Important Papers

- [[papers/vlogqa-task-dataset-and-baseline-models-for-vietnamese-spoken-based-machine-reading-comprehension|VlogQA: Task, Dataset, and Baseline Models for Vietnamese Spoken-Based Machine Reading Comprehension]]: constructs a Vietnamese benchmark from real food and travel vlog transcripts and evaluates multilingual and Vietnamese pretrained models.
- Lee et al. (2018), "Spoken SQuAD: A study of mitigating the impact of speech recognition errors on listening comprehension": studies English listening comprehension using spoken versions of SQuAD contexts.
- Lee et al. (2018), "ODSQA: Open-domain spoken question answering dataset": provides a Chinese spoken-QA benchmark with human-generated audio.

## Related Concepts

- [[concepts/question-conditioned-sentence-selection|Question-Conditioned Sentence Selection]]: selects compact question-relevant evidence, which can help manage long transcript contexts.
- Automatic speech recognition: converts audio into the transcript consumed by many spoken-comprehension systems and determines part of the task's noise profile.
- Extractive question answering: constrains answers to continuous spans from the supplied context.
