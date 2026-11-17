---
title: Creating and Comparing Dictionary, Word Embedding, and Transformer-Based Models to Measure Discrete Emotions in German Political Text
type: paper
authors:
  - Tobias Widmann
  - Maximilian Wich
year: 2023
doi: 10.1017/pan.2022.15
tags:
  - political-text-analysis
  - emotion-classification
  - transformers
---

## TL;DR

A German ELECTRA classifier outperforms a purpose-built political emotion dictionary and averaged-word-embedding classifiers across eight emotions. Domain-specific tools also outperform German LIWC and NRC dictionaries, but performance falls on a separate randomly sampled dataset, making target-corpus validation essential.

## Research Question

How accurately can dictionaries, static word embeddings, and contextual transformer models identify discrete emotional appeals in German political communication?

## Motivation

Positive–negative sentiment obscures distinctions between emotions with different political consequences. Existing lexicons often transfer vocabulary across domains or languages and ignore sentence context. The target is emotional appeals in language, rather than direct measurement of speakers’ feelings or audience responses.

## Contributions

- Introduces ed8, a German political dictionary covering anger, fear, disgust, sadness, joy, enthusiasm, pride, and hope.
- Compares ed8 with supervised word-embedding classifiers and a joint multilabel ELECTRA model using crowd-coded sentences.
- Evaluates off-the-shelf dictionaries, source differences, additional random-sample annotations, and sensitivity to the number of coders.

## Method

The ed8 dictionary assigns 19,091 word forms from an existing sentiment dictionary to emotion categories and adds 1,491 manually selected embedding-derived terms, yielding 20,582 terms. Scores count matched words and normalize by document length excluding stop words; the main classification comparison binarizes these scores.

Nearly two million political documents from Germany, Austria, and Switzerland provide the corpus for 100-dimensional skip-gram word2vec embeddings. Averaging matched word vectors yields sentence representations for separate neural-network emotion classifiers.

Crowd workers annotated 10,000 sentences from German parliamentary speeches and party Facebook accounts, with five judgments per sentence. Removing incomprehensible items leaves 9,898 sentences, split 90% for training and 10% for testing. The main evaluation treats an emotion as present when at least one coder identifies it. Initial sampling used ed8, potentially favoring that dictionary.

The German ELECTRA model has 12 layers, hidden size 768, and 110 million parameters. A single model predicts all emotions. It uses the same train/test split, reserves 10% of training data for validation, and trains for four epochs at learning rate 5e-5, selecting the best epoch.

## Experiments

Table 1 reports emotion-specific F1 on the original held-out test set:

| Emotion | ed8 | Word embeddings + neural network | ELECTRA |
| --- | ---: | ---: | ---: |
| Anger | 0.59 | 0.79 | 0.84 |
| Fear | 0.52 | 0.55 | 0.64 |
| Disgust | 0.40 | 0.52 | 0.62 |
| Sadness | 0.48 | 0.53 | 0.60 |
| Joy | 0.52 | 0.54 | 0.64 |
| Enthusiasm | 0.47 | 0.57 | 0.65 |
| Pride | 0.38 | 0.46 | 0.60 |
| Hope | 0.53 | 0.64 | 0.73 |

The authors report average gains of approximately 18 F1 points over ed8 and nine over the embedding classifiers. LIWC reaches at most 0.40 F1 across its three evaluated emotions; NRC reaches at most 0.25 across five. These lexicons do not cover identical category sets.

A second, randomly sampled set of approximately 10,000 sentences retains the advantage of the customized approaches but reduces dictionary performance substantially. ELECTRA’s relative advantage strengthens. Advanced pretrained word embeddings perform comparably to locally trained embeddings. Performance generally favors Facebook over legislative text, with anger under ELECTRA an exception. A coder-count bootstrap suggests diminishing gains beyond five judgments. An application to more than 12,000 party press releases illustrates hypothesis testing; detailed application results are in the supplementary material, not reproduced here.

## Limitations

Presampling with ed8 affects the original benchmark. The additional sample comes from the same sources, so it does not establish transfer across domains; average classification performance also declines on that sample. Some emotions have few positive examples. Sentence-level annotation misses appeals requiring wider discourse context. Accuracy varies by emotion and communication channel, and the annotation aggregation rule defines a permissive operational target.

## Related Concepts

- [[concepts/discrete-emotion-classification-in-text|Discrete Emotion Classification in Text]] — the measurement task compared across all three model families.
- [[concepts/emotion-appraisal|Emotion Appraisal]] — situational interpretation motivates detecting emotional appeals beyond explicit emotion adjectives.

## Related Papers

- Rudkowsky et al. (2018), *More than Bags of Words: Sentiment Analysis with Word Embeddings* — methodological basis for averaged embeddings and neural classification.
- Clark et al. (2020), *ELECTRA: Pre-Training Text Encoders as Discriminators Rather than Generators* — pretrained encoder architecture used here.
- Grimmer and Stewart (2013), *Text as Data: The Promise and Pitfalls of Automatic Content Analysis Methods for Political Texts* — motivates application-specific validation.

Published in *Political Analysis* 31, 626–641 (2023); first published online 29 June 2022. [Article](https://doi.org/10.1017/pan.2022.15). [Replication data](https://doi.org/10.7910/DVN/C9SAIX).
