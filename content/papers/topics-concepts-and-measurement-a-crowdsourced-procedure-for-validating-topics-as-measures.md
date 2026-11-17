---
title: "Topics, Concepts, and Measurement: A Crowdsourced Procedure for Validating Topics as Measures"
type: paper
authors:
  - Luwei Ying
  - Jacob M. Montgomery
  - Brandon M. Stewart
year: 2022
doi: 10.1017/pan.2021.33
tags:
  - topic-modeling
  - measurement
  - human-validation
---

## TL;DR

Crowdsourced intrusion and label-selection tasks test two distinct requirements for using topics as measures: coherent word groupings and defensible conceptual labels. On U.S. senators’ Facebook posts, the tasks distinguish flawed topic models and favor labels informed by document reading. They supplement substantive validation without establishing interval-scale measurement.

## Research Question

How can researchers transparently validate both topic coherence and researcher-assigned conceptual labels using inexpensive, repeatable human judgments?

## Motivation

Topic models discover themes and assign documents simultaneously; fitting them does not establish what their dimensions measure. A review of 20 articles in three leading political science journals from January 2018 to January 2021 found 19 reporting word lists, four reporting fit statistics, and five reporting bespoke validation of topic meaning. These counts describe reported practices, not all validation authors may have performed.

## Contributions

- Separates coherence evaluation from validation of conceptual labels.
- Refines existing intrusion designs and introduces Random 4 Word Set Intrusion (R4WSI).
- Develops Label Intrusion (LI) and Optimal Label (OL), with comparisons within and across substantive categories.
- Provides software and implementation guidance, including worker training, repeated batches, and gold-standard tasks.

## Method

For coherence tasks, probabilities of words sharing a root are combined, and probability-weighted sampling retains readable words while avoiding repeated roots. Word Intrusion asks workers to find one unrelated word among five. Top 8 Word Set Intrusion presents a document and four topic word lists, one unrelated. R4WSI presents four sets of four words: three sampled from one topic’s top 20 words and one from another topic. Its larger context makes common themes easier to recognize.

LI presents a document and four labels, asking for the unrelated label among three associated with its highest-probability topics. OL asks for the best label, comparing the highest-probability topic’s label against three alternatives. Distractors can come from nearby topics or broader, distinct categories. LI requires mixed membership; OL also works for single-membership models. Accuracy is agreement with the model-derived task answer, rather than independently observed conceptual ground truth.

## Experiments

The corpus comprises 163,642 Facebook documents from U.S. senators in the 115th Congress. Five structural topic models include a deliberately unconverged 10-topic baseline, converged 10-, 50-, and 100-topic models, and a 500-topic model intended to expose overfitting.

Each coherence task/model combination used 500 tasks repeated in a second batch, with gold-standard checks. All three designs identified the unconverged model as worst and scored the 500-topic model below the 100-topic model. Repeated batches produced similar estimates. R4WSI reached nearly 85% accuracy for the 100-topic model and matched the held-out likelihood ordering; the authors recommend it for applied use. These coherence evaluations comprised 16,500 tasks including checks.

Label experiments used 20 selected topics from the 100-topic model: ten domestic and ten international/military. Careful labels used word lists and 50 representative documents per topic; cursory labels used only high-probability and FREX words. Repeated 500-task batches, plus checks, totaled 8,800 tasks. Both designs favored careful labels overall.

Table 4 disaggregates the across-category condition: when distractors were all domestic, OL accuracy was 78.8% for careful labels and 71.7% for cursory labels; with three international distractors it rose to 96.4% and 91.8%. LI with domestic intruders scored 70.3% versus 49.0%, but international intruders scored 92.8% versus 93.9%. Thus broad category separation can conceal weaknesses in fine-grained labels and does not uniformly favor careful labels in every subgroup.

## Limitations

These tasks complement close reading and theory-driven, application-specific validation. They lack an unambiguous conceptual ground truth and do not establish that topic proportions form interval scales suitable for interpreting means. English-language, short social-media documents are a comparatively easy setting; long, specialized, or non-English texts require further evaluation. Sparse topic distributions and preprocessing affect word-set quality. Accuracy depends on distractor difficulty and corpus context, so the paper rejects universal adequacy cutoffs.

## Related Concepts

- [[concepts/topic-model-evaluation|Topic Model Evaluation]]: coherence, document relevance, and label validity require separate evidence.

## Related Papers

- Chang et al. (2009), “Reading Tea Leaves: How Humans Interpret Topic Models”: the intrusion-task foundation extended here.
- [[papers/validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]: a related human-judgment benchmark for text-derived latent measures.

Published in *Political Analysis* 30, 570–589 (2022); first published online September 27, 2021. Replication data: https://doi.org/10.7910/DVN/S02EBF.
