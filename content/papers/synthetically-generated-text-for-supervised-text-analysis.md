---
title: Synthetically generated text for supervised text analysis
type: paper
authors:
  - Andrew Halterman
year: 2025
doi: 10.1017/pan.2024.31
tags:
  - synthetic-data
  - text-as-data
  - political-methodology
---

## TL;DR

LLMs can generate training text for smaller supervised classifiers, reducing annotation requirements while retaining locally reproducible prediction. Three political-text validations show benefits from synthetic augmentation and synthetic-only training, but also show that synthetic examples can be less informative than real ones. Evaluation on real, expert-labeled text remains necessary.

## Research Question

When can generated text replace or supplement annotated training data for supervised political-text analysis, and how should researchers control and validate its quality?

## Motivation

Direct LLM annotation can be expensive, opaque, and difficult to reproduce after commercial models change. Conventional classifiers are inexpensive to run and tune but need labeled examples, particularly costly for rare events. Generating reusable training text separates the generative model from the deployed measurement tool.

## Contributions

- Organizes generation control into prompting, model adaptation, and sampling-parameter selection.
- Distinguishes augmentation, synthetic-only task distillation, and manual annotation of synthetic examples.
- Proposes discriminator-based sampling selection and embedding-space coverage checks.
- Demonstrates these choices on police-event classification, sentence-level populism, and weapons named-entity recognition.

## Method

Researchers first control content through prompts or domain adaptation and style through decoding settings. They then inspect label fidelity and coverage before fitting a supervised model. Labels may be inherited from generation prompts, or manually supplied when token spans are required.

For sampling selection, generate equal-sized real and synthetic samples for each parameter configuration and train a real-versus-synthetic discriminator. Prefer configurations with lower discrimination accuracy. This is a realism diagnostic, not proof of correct labels or substantive validity. A complementary check overlays real and synthetic document embeddings in a two-dimensional projection; uncovered regions motivate additional prompts.

Synthetic text can augment real annotations or transfer an LLM's task knowledge into a smaller classifier through [[concepts/knowledge-distillation|Knowledge Distillation]]. Tune augmentation and classifier settings on development data and evaluate on held-out real text. The resulting classifier, rather than the synthetic corpus, is applied to real documents for substantive analysis.

## Experiments

| Validation | Training design | Reported finding |
| --- | --- | --- |
| Police actions during the 2002 Gujarat violence | About 1,600 GPT-2-xl stories generated from headlines; frozen sentence embeddings and balanced logistic regression | Synthetic augmentation outperforms real-only, traditional augmentation, and synthetic-only alternatives. With 100–500 human annotations it can exceed performance from 1,000 human annotations alone; gains diminish at larger real-data sizes. |
| Populist manifesto sentences | GPT-3.5-turbo generates 5,357 positive and 36,509 negative sentences; multilingual SetFit classifier | On 450 hand-annotated English statements, accuracy is 0.87 and macro F1 is 0.76. Training targets 22 languages, but cross-lingual validity remains untested. |
| Weapons in Ukraine-war tweets | GPT-2-large adapted on roughly 20,000 tweets; manually labeled synthetic tweets train a spaCy NER model | Matching performance from 200 real training tweets requires 300 non-optimized synthetic tweets, or 200 synthetic tweets with optimized sampling. Evaluation uses 200 separate real tweets. |

The police corpus contains 21,391 sentences from 1,257 articles; arrests appear in only 0.45% of sentences. Embedding checks exposed missing political and temple-related coverage, addressed with additional generation prompts (§3.1).

A separate manifesto-code validation compares classifiers trained on 1,136 synthetic versus 1,136 real examples. Real-data F1 exceeds synthetic-data F1 for all ten reported codes: for example, 0.66 versus 0.60 for freedom and human rights, and 0.67 versus 0.44 for underprivileged minority groups. This supports usefulness, not equivalence (§3.2, Table 4).

For the tweet experiment, discriminator accuracy ranges from 0.99 to 0.67 across 56 sampling configurations. Improved realism narrows the downstream training gap without making synthetic text indistinguishable from real text (§3.3).

## Limitations

Prompt-inherited labels assume that generation follows the requested concept. Synthetic text may omit important linguistic variation, reproduce biases, or contain invented facts. More synthetic examples do not consistently improve performance. Manually annotating real text is generally more informative per example, so synthetic annotation needs a specific access or sharing justification.

English-only populism evaluation does not establish performance across the other training languages. Prediction errors can bias downstream estimates; expert-labeled calibration and evaluation remain relevant even when training uses no human labels. Synthetic documents should be visibly marked and must not serve as factual evidence about political events. Adaptation also requires an existing corpus and computational resources.

## Related Concepts

- [[concepts/synthetic-text-for-supervised-learning|Synthetic Text for Supervised Learning]]: generation, quality checks, and downstream use.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: transfers task knowledge through generated examples.
- [[concepts/weakly-supervised-learning|Weakly Supervised Learning]]: prompt-derived labels are indirect supervision.
- [[concepts/text-embedding-models|Text Embedding Models]]: support classifiers and semantic-coverage diagnostics.

## Related Papers

- [[papers/codebook-llms-evaluating-llms-as-measurement-tools-for-political-science-concepts|Codebook LLMs: Evaluating LLMs as Measurement Tools for Political Science Concepts]]: complementary treatment of direct LLM measurement and codebook fidelity.
- He et al. (2022), “Generate, Annotate, and Learn: NLP with Synthetic Text”: cited antecedent for synthetic-text training.

Replication data and code: [Harvard Dataverse](https://doi.org/10.7910/DVN/JJ5BBX).
