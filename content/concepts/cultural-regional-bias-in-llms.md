---
title: Cultural Regional Bias in LLMs
type: concept
aliases:
  - Regional Cultural Bias in LLMs
  - Geographic Cultural Priors
tags:
  - cultural-bias
  - llm-evaluation
  - multilingual-nlp
---

## Overview

Cultural regional bias in LLMs is a systematic imbalance in the places a model selects when an open cultural prompt admits many geographically plausible answers. It concerns the distribution of spontaneously chosen cultural reference points rather than whether an answer about a named culture is factually correct. A model can therefore possess broad cultural knowledge while repeatedly defaulting to a narrow set of regions when the prompt leaves location unspecified.

## Key Ideas

- **Open prompts reveal priors.** Removing the location from a culturally grounded question and requiring a model to choose one exposes which regional frame it supplies without an explicit geographic cue.
- **Prompt language is part of the treatment.** Models may anchor answers to countries where the input language is official. This makes multilingual comparison a study of both language-conditioned self-reference and external regional salience.
- **Self-reference and global salience should be separated.** Own-language-country choices can dominate totals and obscure which countries models prefer when they look elsewhere. Reporting both distributions avoids conflating the two effects.
- **Coverage and balance are different.** The number of distinct regions can rise while outputs become more concentrated on a few countries. Diversity counts should therefore be paired with an evenness measure such as normalized entropy.
- **Training stages can reshape the distribution.** Matched base, SFT, and instruction-aligned checkpoints can help locate when concentration appears, although interaction format and response compliance remain potential confounds.
- **The construct has a narrow claim boundary.** Regional-choice distributions do not directly measure cultural knowledge, answer quality, user harm, or an internal causal mechanism. Country-level labels are also imperfect proxies for culture.

## Important Papers

- [[papers/why-are-all-llms-obsessed-with-japanese-culture|Why are all LLMs Obsessed with Japanese Culture? On the Hidden Cultural and Regional Biases of LLMs]] introduces CROQ and reports language-conditioned self-reference, strong external salience for Japan and the United States, and increased concentration after supervised fine-tuning.
- Shi et al. (2024), *CultureBank: An Online Community-Driven Knowledge Base Towards Culturally Aware Language Technologies*, provides community-grounded cultural descriptors and a complementary knowledge-oriented view of cultural representation.
- Myung et al. (2024), *BLEnD: A Benchmark for LLMs on Everyday Knowledge in Diverse Cultures and Languages*, evaluates everyday cultural knowledge across languages and countries rather than unconstrained regional selection.

## Related Concepts

- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]
- [[concepts/instruction-tuning-data-diversity|Instruction-Tuning Data Diversity]]
- Multilingual evaluation
- Cultural knowledge benchmarks
- Distributional bias measurement
