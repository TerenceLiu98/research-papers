---
title: Character-Level Cross-Modal Transfer
type: concept
tags:
  - speech-translation
  - representation-learning
---

## Overview

Character-level cross-modal transfer aligns a speech recognizer’s character predictions with a text encoder’s character inputs, allowing translation knowledge learned from text to support speech translation with transcription supervision.

## Key Ideas

A CTC recognizer can compress acoustic features by merging repeated predictions and removing blanks. Its character probabilities can then weight the text encoder’s character embeddings, providing an initialized bridge between the modalities. Matching final sentence embeddings trains this bridge without requiring translated speech pairs.

The character interface reduces tokenization mismatch, but still depends on compatible vocabularies and robust text representations. ASR-like normalization and character noise prepare the text encoder for imperfect speech inputs. Small pretrained adapters may outperform larger randomly initialized branches when transcription data are scarce. Language-specific recognizer heads also constrain generalization to additional languages.

## Important Papers

- [[papers/improving-language-and-modality-transfer-in-translation-by-character-level-modeling|Improving Language and Modality Transfer in Translation by Character-level Modeling]] implements this interface with MMS and charSONAR, comparing pretrained and dual adapters under varying data availability.

## Related Concepts

- [[concepts/knowledge-distillation|Knowledge Distillation]]: sentence-level teacher targets train the text encoder and speech adapter.
- [[concepts/text-embedding-models|Text Embedding Models]]: a common sentence space supports both decoding and cross-modal retrieval.
