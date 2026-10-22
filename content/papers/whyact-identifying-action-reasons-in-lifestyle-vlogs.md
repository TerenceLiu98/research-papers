---
title: "WHYACT: Identifying Action Reasons in Lifestyle Vlogs"
type: paper
authors:
  - Oana Ignat
  - Santiago Castro
  - Hanwen Miao
  - Weiji Li
  - Rada Mihalcea
year: 2021
acl_anthology: "2021.emnlp-main.392"
source_job_id: "c855a5ec-1b9d-4edb-a976-dae838c3f2c9"
code: "https://github.com/MichiganNLP/vlog_action_reason"
tags:
  - action-reason-identification
  - video-understanding
  - multimodal-learning
  - commonsense-reasoning
---

## TL;DR

WHYACT formulates [[concepts/multimodal-action-reason-identification|Multimodal Action Reason Identification]] for everyday videos and introduces 1,077 annotated lifestyle-vlog clips spanning 24 actions and 166 candidate reasons. Its strongest reported test F1 is 43.59 for a transcript-only fill-in-the-blanks model; adding video features raises recall but lowers precision and F1 to 41.11, showing that this dataset does not establish a multimodal advantage.

## Research Question

Given a lifestyle-vlog clip, its transcript, a target action, and candidate reasons, can a system identify which reasons are mentioned verbally or shown visually?

## Motivation

Action labels alone do not explain why an everyday action occurs. The same visible action can have different motivations depending on surrounding objects, speech, and social context. Lifestyle vlogs provide naturally occurring paired video and narration, but their unscripted language, figurative action mentions, and uneven visual evidence make semantic parsing and conventional action-recognition pipelines unreliable.

## Contributions

- Formalizes action-reason identification as a multilabel prediction task over video, transcript, action, and candidate reasons.
- Introduces WHYACT, with 1,077 clips, 107.3 hours of video, 109,711 transcript words, 24 actions, and 166 reasons derived from ConceptNet and repeated crowdworker additions.
- Compares transcript similarity, zero-shot natural language inference over textual or derived visual representations, and text-only and multimodal fill-in-the-blanks models.
- Analyzes modality use, reason specificity, action-object diversity, and annotation difficulties in unscripted vlogs.

## Method

### Data Construction

The authors collect videos and automatically generated transcripts from five YouTube lifestyle-vlog channels. Candidate actions and reasons begin with ConceptNet's `motivated by` relations. Actions must have at least three reasons and at least 25 video occurrences; similar reasons are agglomeratively clustered and manually consolidated.

Transcript sentences are selected when an action and a causal marker occur within 15 words, with neighboring sentences retained as context. Temporally aligned clips are removed when they are shorter than 10 seconds, longer than 3 minutes, or have low estimated movement. Three master Amazon Mechanical Turk workers label applicable reasons, whether the evidence is verbal, visual, or both, additional reasons, and confidence. Majority selections form the gold labels. Fleiss' kappa averaged over reasons is 0.6, and 890 of 1,077 clips receive majority high-confidence judgments.

### Models

Sentence-BERT embeds transcripts and candidate reasons for cosine-similarity baselines. A zero-shot NLI model treats the transcript, detected object labels, dense video captions, or their visual combination as a premise and statements such as "The reason for cleaning is declutter" as hypotheses.

The proposed fill-in-the-blanks model inserts `because` after the target action and uses T5 to score each candidate completion. Its multimodal variant appends Kinetics-pretrained I3D video features to the T5 encoder after projecting them through a linear layer. The model is first adapted on unlabeled source-domain data that excludes examples containing `because`, then tuned on the development split. Despite the paper's description of the systems as unsupervised, thresholds and the multimodal model are tuned on labeled development data.

## Experiments

The dataset is split by clip into 224 development examples and 853 test examples; all 24 actions and 166 reasons appear in both sets. Evaluation averages per-instance accuracy, precision, recall, and F1 across actions. Because roughly two of six candidate reasons are positive per instance, the paper treats F1 as the primary metric.

| Method | Input | Accuracy | Precision | Recall | F1 |
| --- | --- | ---: | ---: | ---: | ---: |
| Cosine similarity | Transcript | 57.70 | 31.39 | 55.94 | 37.64 |
| Cosine similarity | Causal transcript context | 50.85 | 30.40 | 68.91 | 39.73 |
| NLI | Transcript | 68.41 | 41.90 | 48.01 | 40.78 |
| NLI | Object labels and dense captions | 36.93 | 27.34 | 87.97 | 39.11 |
| Fill-in-the-blanks | Transcript | 44.04 | 30.70 | 87.10 | **43.59** |
| Fill-in-the-blanks | Video and transcript | 32.60 | 27.56 | **94.76** | 41.11 |

The multimodal model produces the highest recall but trails its text-only counterpart by 2.48 F1 points. Annotation analysis helps contextualize this result: workers attribute the reason to narration alone in 496 clips, visual evidence alone in 55, both modalities in 423, and no agreed modality in 103. A test-set most-frequent-reason reference reaches 40.64 F1 but uses test distribution information unavailable to the proposed systems.

## Limitations

- The corpus comes from five selected YouTube channels and mainly depicts idealized routines of middle-class Americans, limiting demographic, cultural, and behavioral coverage.
- Candidate discovery favors explicit causal markers close to action words, which can exclude implicit reasons and biases the benchmark toward particular transcript forms.
- Visual-only evidence is rare: only 55 clips receive majority visual-only judgments. This imbalance limits conclusions about multimodal fusion.
- Action words can be figurative or polysemous. The authors remove `jump` because it frequently means `start`; `fall` still includes seasonal and idiomatic uses.
- Agreement is moderate rather than high, reasons may overlap semantically, and the specificity of candidate reasons varies by action.
- The strongest proposed result is 43.59 F1, and the multimodal model does not outperform the text-only version. Results therefore establish the task's difficulty and a benchmark, not robust recovery of everyday motivations.
- Public-video URLs can disappear, and releasing URLs rather than video files makes long-term reconstruction dependent on platform availability.

## Related Concepts

- [[concepts/multimodal-action-reason-identification|Multimodal Action Reason Identification]]: the paper's core task, distinguishing an action's reason from its identity.
- [[concepts/causal-text-mining|Causal Text Mining]]: related extraction of causal statements from language; WHYACT additionally grounds candidate reasons in video.
- [[concepts/weakly-supervised-learning|Weakly Supervised Learning]]: the collection pipeline uses heuristic causal markers and source-domain adaptation before human annotation and evaluation.

## Related Papers

- Vondrick et al. (2016), "Predicting Motivations of Actions by Leveraging Text": the closest cited predecessor, predicting motivations for actions in COCO images rather than YouTube videos.
- Park et al. (2020), "VisualCOMET: Reasoning about the Dynamic Context of a Still Image": predicts prior events, subsequent events, and intentions from images.
- Fang et al. (2020), "Video2Commonsense: Generating Commonsense Descriptions to Enrich Video Captioning": uses ATOMIC-derived intentions to support video captioning and commonsense generation.
- Ignat et al. (2019), "Identifying Visible Actions in Lifestyle Vlogs": studies action detection in the same broad video genre rather than reasons for actions.
- Jia et al. (2021), "Intentonomy: A Dataset and Study Towards Human Intent Understanding": studies human intent in Instagram images under a different task definition.

[[index|Library home]]
