---
title: "Decide, Don't Generate: Competitive Dimensional ABSA with Jev's Typed Decisions"
type: paper
authors:
  - Yiqun Zhang
  - Peidong Wang
  - Zihan Wang
  - Shi Feng
year: 2026
source_job_id: "ddaf3a9b-38ff-407f-96ef-2872579df9d5"
tags:
  - dimensional-aspect-based-sentiment-analysis
  - aspect-based-sentiment-analysis
  - structured-prediction
  - typed-decision-interfaces
  - valence-arousal
---

## TL;DR

This paper shows that competitive dimensional aspect-based sentiment analysis (ABSA) can be built from typed decisions rather than text generation. A frozen Jev model supplies rubric scores, label probabilities, and yes/no judgments; lightweight CPU-fitted postprocessors align those decisions with the SemEval-2026 DimABSA annotation scheme. Across ten corpora and six languages, the system obtains 1.0645 micro RMSE for valence-arousal regression, 52.09 continuous F1 (cF1) for triplet extraction, and 44.06 cF1 for categorized quadruplet prediction, without generating text or tuning the backbone.

## Research Question

Can a frozen model with typed decision outputs support competitive dimensional ABSA across regression, span-and-relation extraction, and category assignment without text generation or backbone tuning?

## Motivation

Recent ABSA systems often serialize sentiment structures as generated text. That unifies output formats, but it also introduces decoding, validation, and backbone-adaptation costs for tasks whose answers are labels, spans, or numeric ratings. The paper tests whether direct structured decisions, calibrated and combined with corpus statistics, better match the benchmark's annotation scheme.

## Contributions

- Decomposes all three SemEval-2026 Task III Track A tasks into Jev's SCORE, CHOICE, and NOUL decisions.
- Uses 488 CPU-fitted coefficients for calibration, pair reranking, valence-arousal mapping, and category fusion; no component generates text and no backbone weights are updated.
- Reports the lowest aggregate Task 1 RMSE among participating systems with complete ten-corpus coverage, while exceeding fine-tuned Llama-3.3-70B and GPT-OSS-120B baselines on Tasks 2 and 3.
- Shows through ablations that supervised calibration drives regression gains and that a learned combination of span-boundary evidence, rather than one pair signal, drives extraction.

## Method

The benchmark covers given-aspect valence-arousal regression (Task 1), aspect-opinion triplet extraction (Task 2), and categorized quadruplet prediction (Task 3). The model receives typed questions over a review and returns SCORE distributions over nine valence or arousal levels, CHOICE probabilities for BIO labels or categories, and NOUL judgments for binary propositions. The returned score expectations are mapped to the benchmark's 1-9 scale.

Task 1 uses nine fixed training demonstrations per corpus and a corpus-specific ridge calibration with valence, arousal, extremity, and interaction features. Task 2 builds aspect and opinion candidates from token-level BIO probabilities and a span lattice, checks candidate boundaries and relations using retrieved training examples, and selects pairs with a language-group logistic reranker. Task 3 assigns categories with model probabilities combined with training-derived aspect and opinion lookups and category priors. Pair-conditioned SCORE calls provide valence-arousal estimates for selected pairs.

## Experiments

The official Track A data contain 9,658 Task 1 test reviews with 16,186 aspect annotations and 6,690 shared Task 2/3 reviews with 14,262 triplets and 14,263 quadruplets. Task 1 is scored with micro RMSE over ten corpora; Tasks 2 and 3 use macro cF1 over eight non-finance corpora.

The full system reaches 1.0645 RMSE on Task 1, 52.09 cF1 on Task 2, and 44.06 cF1 on Task 3. The Task 1 aggregate is 0.0018 below PAI's published 1.0663, although the paper notes that the rounded participant predictions do not support a significance test. The extraction scores exceed the reported fine-tuned Llama-3.3-70B baselines of 46.40 and 38.62 and GPT-OSS-120B baselines of 45.71 and 37.27, respectively.

Calibration reduces Task 1 RMSE from 2.0731 for raw scores to 1.0645; removing joint calibration terms raises it to 1.1203, and removing demonstrations raises it to 1.1015. For Task 2, replacing the learned reranker with the lattice pair judgment loses 15.31 exact-match F1 points, while using only argmax BIO spans loses 6.09 points. For Task 3, removing model category probabilities lowers cF1 by 6.03 points, whereas removing training lookups leaves the score essentially unchanged (44.08 versus 44.06).

The remaining extraction error is mainly structural. Gold valence-arousal values would add only 4.46 cF1 to Task 2; on average, 21.7% of gold pairs are never proposed and 26.8% are proposed but not selected. Adding categories reduces the system's cF1 by 8.03 points, the smallest category penalty among the compared systems.

## Limitations

- The evaluation covers single-turn reviews, two benchmark tasks and one fixed Jev version, with one greedy-decoded response per item and no matched-compute comparison to generative systems.
- Task 2 reranking and design choices use development labels, so the out-of-fold development scores are not nested estimates of the complete selection procedure; parallel Russian, Tatar, and Ukrainian translations are not grouped in those folds.
- The Task 1 audit finds 23 train-test text overlaps in Japanese hotel, and Task 2 retains full-training lexicon and boundary counts, so overlap removal is incomplete for that task.
- The paper's controlled evidence and retrieval settings do not establish robustness to combined failures in a deployed system. Category accuracy and exact-valence diagnostics are conditional on matched or extracted pairs and do not measure missing or spurious predictions.
- The literature audit is title-filtered and venue-bounded, and its model-use coding was assisted by targeted checks without independent double annotation.

## Related Concepts

- [[concepts/dimensional-aspect-based-sentiment-analysis|Dimensional Aspect-Based Sentiment Analysis]]
- [[concepts/typed-probabilistic-decision-interfaces|Typed Probabilistic Decision Interfaces]]
- [[concepts/probability-calibration|Probability Calibration]]
- [[concepts/speech-emotion-recognition|Speech Emotion Recognition]]

## Related Papers

- Lee et al. (2026), "DimABSA: Building multilingual and multidomain datasets for dimensional aspect-based sentiment analysis": introduces the benchmark and data used here.
- Yu et al. (2026), "SemEval-2026 task 3: Dimensional aspect-based sentiment analysis (DimABSA)": defines the competition tasks and official scorer.
- Yan et al. (2021), "A unified generative framework for aspect-based sentiment analysis": representative generative ABSA formulation discussed by the paper.
- Zhang et al. (2021), "Aspect sentiment quad prediction as paraphrase generation": generates sentiment quadruples as paraphrases.
- [[papers/jev-as-a-judge-accept-when-confident-escalate-when-unsure|JEV-as-a-Judge: Accept When Confident, Escalate When Unsure]]: evaluates the same decision-only model family on judgment accuracy, confidence, and escalation.

[[index|Library home]]
