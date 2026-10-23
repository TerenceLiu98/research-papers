---
title: Valence-Arousal-Dominance Model
type: concept
aliases:
  - VAD Model
  - Valence-Arousal-Dominance Framework
tags:
  - affective-computing
  - emotion-measurement
  - text-as-data
---

## Overview

The Valence-Arousal-Dominance (VAD) model represents affect along three dimensions: valence describes pleasantness, arousal describes activation or intensity, and dominance describes perceived control or power. Lexicons that assign VAD ratings to words support continuous, multidimensional analysis of emotional language beyond positive-versus-negative sentiment.

## Key Ideas

- **The dimensions separate different affective properties.** Words with similarly negative valence can differ in arousal, distinguishing high-intensity anger-like language from lower-intensity sadness-like language. Dominance further separates language associated with control from language associated with submission.
- **Aggregation requires an explicit rule.** Document scores depend on which words are selected, how their ratings are combined, and whether neutral-valence words are excluded. These choices define the estimand and should be reported alongside results.
- **Lexicon scores are contextual proxies.** A word's fixed rating does not capture negation, composition, quotation, sarcasm, topic, or the attitude holder. Context-aware extraction may improve relevance but introduces model-dependent judgment.
- **Affective intensity is not identical to political bias.** VAD can characterize how a stance is expressed, but low emotional scores do not by themselves prove factual balance or ideological neutrality.
- **Interpretability does not guarantee validity.** Showing the words that contribute to a score supports inspection, while reliability still depends on the lexicon, extraction procedure, language, domain, and validation design.

## Important Papers

- Mohammad (2018), "Obtaining Reliable Human Ratings of Valence, Arousal, and Dominance for 20,000 English Words": develops the NRC VAD lexicon used widely for word-level affect ratings.
- [[papers/tracing-partisan-bias-to-its-emotional-fingerprints-a-computational-approach-to-mitigation|Tracing Partisan Bias to Its Emotional Fingerprints: A Computational Approach to Mitigation]]: uses VAD to characterize partisan news language and evaluate neutral multi-document summaries.
- Russell and Mehrabian (1977), "Evidence for a Three-Factor Theory of Emotions": an early formulation of pleasure, arousal, and dominance as dimensions of affective response.

## Related Concepts

- [[concepts/emotion-appraisal|Emotion Appraisal]]: explains how contextual evaluations can produce different emotions even when surface situations or words are similar.
- [[concepts/dimensional-aspect-based-sentiment-analysis|Dimensional Aspect-Based Sentiment Analysis]]: predicts continuous valence and arousal for sentiment attached to specific aspects.
- [[concepts/microframe-bias-and-intensity|Microframe Bias and Intensity]]: measures semantic direction and emphasis using embedding axes rather than affective lexicon dimensions.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: can provide context-sensitive word selection, while adding evaluator bias and instability to a VAD pipeline.
