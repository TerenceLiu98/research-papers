---
title: "MIntRec2.0: A Large-Scale Benchmark Dataset for Multimodal Intent Recognition and Out-of-Scope Detection in Conversations"
type: paper
authors:
  - Hanlei Zhang
  - Xin Wang
  - Hua Xu
  - Qianrui Zhou
  - Kai Gao
  - Jianhua Su
  - Jinyue Zhao
  - Wenrui Li
  - Yanting Chen
year: null
source_job_id: "4f1871eb-de0a-4688-8cb9-07e9a5818c87"
tags:
  - multimodal-intent-recognition
  - out-of-scope-detection
  - conversational-ai
  - benchmark-datasets
  - multi-party-dialogue
---

## TL;DR

MIntRec2.0 is a benchmark for [[concepts/multimodal-intent-recognition|multimodal intent recognition]] and [[concepts/out-of-scope-intent-detection|out-of-scope intent detection]] in multi-party conversations. It contains 1,245 dialogues and 15,040 text-video-audio utterances: 9,304 examples from 30 intent classes and 5,736 out-of-scope examples. Multimodal fusion improves most single-turn baselines, but contextual multimodal gains are small or negative on some open-set metrics, cross-source OOD performance is near chance, and human evaluators substantially outperform ChatGPT in the reported few-shot comparison.

## Research Question

How can a benchmark represent fine-grained intents, speaker-aware context, and naturally occurring out-of-scope utterances in multimodal, multi-party conversations, and how well do text, multimodal fusion, large language model, and human baselines perform on that setting?

## Motivation

Earlier multimodal intent resources were small, restricted to isolated utterances, or omitted out-of-scope examples. Those restrictions leave out two central properties of open conversations: an utterance may depend on prior turns and speaker identity, and many turns do not belong to a fixed intent taxonomy. MIntRec2.0 is designed to study both conditions using aligned text, video, and audio.

## Contributions

- Provides 1,245 dialogues from three television series, totaling 15,040 utterances and 12.3 hours, with text, video, audio, speaker identity, and intent annotations.
- Extends the 20-class MIntRec taxonomy with 10 frequent conversational intents and includes an out-of-scope label, yielding 30 in-scope classes, 9,304 in-scope utterances, and 5,736 out-of-scope utterances.
- Defines single-turn and multi-turn benchmark pipelines combining pretrained modality encoders, MAG-BERT or MulT fusion, outlier exposure, and class-specific rejection thresholds.
- Compares text and multimodal baselines with ChatGPT and human evaluators, while also reporting negative results for DialogueRNN, K+1 classification, and cross-source OOD detection.

## Method

The authors segment videos from *Superstore*, *The Big Bang Theory*, and *Friends* into utterances and group them into scene-level dialogues. Six annotators use all three modalities to select one of 30 intents or OOS. Each item receives three judgments, majority vote determines the label, and items with three different votes are removed. Fleiss's kappa ranges from 0.66 to 0.70, with a mean of 0.69.

Text features come from BERT-LARGE, speaker-region video features from a Swin Transformer and RoIAlign pipeline, and audio features from WavLM. For multi-turn input, the system retrieves prior turns from the current speaker and concatenates their modality features to the current utterance. MAG-BERT and MulT provide the fusion baselines.

In-scope examples use cross-entropy loss. Out-of-scope examples use outlier exposure with a uniform soft target over known classes. At inference, DOC-style class thresholds reject samples whose scores are low for every known class. The main data split contains 871 training, 125 validation, and 249 test dialogues; reported neural results are averaged over five random seeds.

## Experiments

Without OOS training examples, MAG-BERT raises in-scope accuracy from 59.30 to 60.58 and MulT raises it to 60.66. Their combined in-scope/OOS macro F1 scores are 46.08 and 45.42, versus 42.96 for text; MulT improves OOS F1 from 30.40 to 38.57. With outlier exposure, OOS F1 rises above 61 for all three single-turn systems, while multimodal improvements over text become much smaller.

Speaker-specific context raises in-scope macro F1 from 52.08 for single-turn text to 53.61 for Context TEXT. In the contextual setting, however, multimodal fusion offers only small in-scope improvements and slightly reduces OOS F1 relative to Context TEXT: 62.52 for Context MAG-BERT and 62.93 for Context MulT versus 63.56 for text. DialogueRNN performs poorly and tends toward predicting OOS, indicating that temporal modeling over already fused representations is not an effective baseline here.

The few-shot comparison uses 10 dialogues containing 227 labeled utterances. ChatGPT-0 obtains 35.27% in-scope accuracy and ChatGPT-10 obtains 34.53%, while humans given the same 10 dialogues reach 64.34%. Humans given 100 dialogues reach 71.03% in-scope accuracy and 71.86% accuracy on the combined in-scope/OOS evaluation. These conditions differ in available modality and supervision, so they are evidence of a large performance gap under the paper's protocol rather than a modality-controlled model-human comparison.

Additional experiments expose difficult generalization regimes. Treating OOS as a $(K+1)$th class lowers in-scope performance by roughly 10 points relative to outlier exposure in the authors' comparison. For cross-source OOD detection, text and MAG-BERT AUROC values are approximately 51--56, and MAG-BERT is usually worse than the text baseline.

## Limitations

- All dialogues come from three English-language television series. The resulting acted speech, source imbalance, and cultural coverage may not transfer to spontaneous conversation or other populations.
- The single-intent assumption suppresses secondary intentions. A follow-up annotation finds a second plausible intent for 136 of 3,230 test utterances (4.2%), so the simplification is usually but not universally appropriate.
- Context is limited to concatenated prior turns from the current speaker; it does not fully model interactions among all participants. More elaborate temporal fusion with DialogueRNN fails badly in the reported experiment.
- The paper's contextual multimodal baselines do not consistently improve open-set metrics, and the cross-source OOD results remain near chance.
- The human and ChatGPT comparison is not fully modality matched: humans can use multimodal examples, whereas ChatGPT is evaluated through text prompts.
- Automatic utterance boundary estimation remains weak, with an average Speaker Boundary Error Rate of 0.59.
- Facial, vocal, and textual signals create privacy and liability risks in real deployments. The authors also identify potential cultural bias, misuse, and over-reliance on automated intent judgments.
- The source material is television dialogue released under a noncommercial share-alike dataset license, which constrains downstream use.
- The supplied Markdown does not state a publication year, venue, DOI, or arXiv identifier; those metadata are therefore left unset.

## Related Concepts

- [[concepts/multimodal-intent-recognition|Multimodal Intent Recognition]]
- [[concepts/out-of-scope-intent-detection|Out-of-Scope Intent Detection]]

## Related Papers

- Zhang et al. (2022), "MIntRec: A New Dataset for Multimodal Intent Recognition": the predecessor dataset with 20 intent classes and 2,224 single-turn utterances.
- Larson et al. (2019), "An Evaluation Dataset for Intent Classification and Out-of-Scope Prediction": motivates explicit evaluation of utterances outside a known intent inventory.
- Rahman et al. (2020), "Integrating Multimodal Information in Large Pretrained Transformers": introduces MAG-BERT, one of the fusion baselines.
- Tsai et al. (2019), "Multimodal Transformer for Unaligned Multimodal Language Sequences": introduces MulT, the other principal fusion baseline.
- Majumder et al. (2019), "DialogueRNN: An Attentive RNN for Emotion Detection in Conversations": supplies the temporal conversational model evaluated in the appendix.

[[index|Library home]]
