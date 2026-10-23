---
title: Multimodal Intent Recognition
type: concept
aliases:
  - Multimodal Intent Classification
tags:
  - multimodal-learning
  - intent-recognition
  - conversational-ai
---

## Overview

Multimodal intent recognition assigns communicative intentions to behavior using two or more signals, commonly language, facial or bodily cues, and speech acoustics. In conversation, the task may also use dialogue history and speaker identity. Nonverbal evidence can disambiguate utterances whose words alone do not reveal whether a speaker is joking, refusing, warning, doubting, or expressing another fine-grained intent.

## Key Ideas

- **Modality-specific representation:** Text, video, and audio usually require encoders suited to tokens, visual regions or frames, and waveforms.
- **Cross-modal fusion:** Fusion models align or gate complementary evidence while retaining the dominant semantic contribution of language.
- **Conversational context:** Previous turns and speaker identity can clarify intent, but naive concatenation and temporal modeling may add noise or amplify class imbalance.
- **Open-world evaluation:** Real conversations include turns outside a fixed label inventory, connecting the task to [[concepts/out-of-scope-intent-detection|Out-of-Scope Intent Detection]].
- **Annotation dependence:** Fine-grained intent labels reflect a chosen taxonomy and may conceal secondary intentions, cultural variation, and annotator uncertainty.

## Important Papers

- [[papers/mintrec2-0-a-large-scale-benchmark-dataset-for-multimodal-intent-recognition-and-out-of-scope-detection-in-conversations|MIntRec2.0: A Large-Scale Benchmark Dataset for Multimodal Intent Recognition and Out-of-Scope Detection in Conversations]]: extends multimodal intent benchmarking to multi-party context and explicit OOS examples.
- Zhang et al. (2022), "MIntRec: A New Dataset for Multimodal Intent Recognition": establishes a 20-class text-video-audio benchmark for single-turn dialogue.
- Rahman et al. (2020), "Integrating Multimodal Information in Large Pretrained Transformers": introduces MAG-BERT for adapting language representations with nonverbal signals.
- Tsai et al. (2019), "Multimodal Transformer for Unaligned Multimodal Language Sequences": models cross-modal interactions in unaligned sequences.

## Related Concepts

- [[concepts/out-of-scope-intent-detection|Out-of-Scope Intent Detection]]
- Multimodal fusion
- Dialogue understanding
- Speaker-aware context modeling
