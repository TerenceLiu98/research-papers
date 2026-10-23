---
title: "Evaluating LLM-Driven Summarisation of Parliamentary Debates with Computational Argumentation"
type: paper
authors:
  - Eoghan Cunningham
  - James Cross
  - Derek Greene
  - Antonio Rago
tags:
  - parliamentary-debates
  - summarization-evaluation
  - computational-argumentation
  - argument-mining
  - large-language-models
---

## TL;DR

This paper evaluates whether LLM summaries preserve the argumentative structure of parliamentary debates, not merely their wording or broad meaning. It represents a source debate and its summary as [[Quantitative Bipolar Argumentation Frameworks]] anchored on the same policy provisions, then compares their relevance, pro-con balance, acceptance status, directional balance, and argument-strength accuracy. In a European Parliament proof of concept, conventional text metrics distinguish summaries weakly, whereas the argument-based metrics reveal that summaries can turn contested provisions into apparently well-supported ones.

## Research Question

How can an automated evaluation determine whether a parliamentary debate summary faithfully preserves the reasoning offered for and against the policy outcomes under debate?

## Motivation

Summaries can make lengthy parliamentary proceedings accessible, but fluent or semantically similar text need not preserve who supported or opposed a proposal, why they did so, or how balanced the debate was. Human consistency judgments are difficult to scale, while lexical-overlap and embedding-based metrics can reward a summary even when its argument structure is distorted. This matters when an LLM mediates between citizens and their representatives.

The paper therefore treats contested policy provisions as shared anchors between the debate and its summary. This avoids requiring every speech argument to have an exact cross-text match while focusing evaluation on reasoning that bears on policy outcomes.

## Contributions

- Defines a provision-anchored QBAF representation in which policy provisions are proposal arguments and statements from the debate are speech arguments connected by attack or support relations.
- Introduces five metrics for [[Argumentative Summary Faithfulness]]: argument relevance, pro-con ratio, d-preferability consistency, balance consistency, and epsilon-accuracy of proposal strengths.
- Demonstrates how [[Argument Relation Classification]] can construct the required graphs from European Parliament debates.
- Shows that argument-based metrics expose distortions that ROUGE, BERTScore, and sentence-level natural-language-inference scores do not localize.

## Method

A debate on a proposal with multiple provisions is represented as a quantitative bipolar argumentation framework. Each provision becomes a proposal argument with base score 0.5. Speech arguments may attack or support proposal arguments or earlier speech arguments; the experiments assign speech arguments a base score of 0.2. DF-QuAD gradual semantics recursively combines attackers and supporters into argument strengths. For source debates, a temporal constraint permits a speech argument to relate only to preceding speech arguments; summary graphs may contain cycles and use approximate convergence.

Two metrics describe one graph. **Argument relevance** is the share of speech arguments connected by a path to at least one proposal. **Pro-con ratio** measures the fraction of arguments bearing on a proposal that support it, accounting for the parity of attacks along a path.

Three metrics compare a summary graph with its source graph. **D-preferability consistency** checks whether proposal arguments retain their credulous acceptance status under d-preferred semantics. **Balance consistency** checks whether proposal strengths remain on the same side of the neutral value 0.5. **Epsilon-accuracy** reports the fraction whose summary strength remains within a chosen tolerance of the source strength; the case study uses an epsilon of 0.1.

The authors also define supplementary speech-argument precision, recall, and pro-con consistency metrics. These require reliable matching of speech arguments across the source and summary, which the main evaluation does not attempt.

## Experiments

The study begins with 511 arguments from three European Parliament debates held between 2006 and 2008, with 107 to 198 arguments per debate. Its relation-classification benchmark contains 481 argument pairs involving 377 arguments. Two expert coders label each pair as attack, support, or neither, with a third resolving disagreements. Pairwise Cohen's kappa ranges from 0.30 to 0.54, while raw agreement is 76.6%, indicating substantial task ambiguity.

Among the tested classifiers, zero-shot Claude Sonnet 4.5 obtains 0.74 accuracy and 0.78 F1. Zero-shot Claude Haiku 4.5 reaches 0.68 accuracy and 0.73 F1, zero-shot Qwen3 30B reaches 0.64 and 0.72, and a Llama 3.1 8B model fine-tuned on eight existing argument-relation datasets reaches 0.21 and 0.27. The case study uses Haiku to construct QBAFs as a cost-performance compromise.

The summary evaluation compares Sonnet- and Haiku-generated summaries for two debates. ROUGE-2 is low, from 0.04 to 0.24, while BERTScore is uniformly high at 0.82 to 0.84 and sentence-NLI ranges from 0.56 to 0.69. These scores provide little separation between summaries with different argument structures. The proposed metrics show balance-consistency values of 0.19 to 0.53 and epsilon-accuracy values of 0.00 to 0.52. For the second debate, none of the Haiku summary's proposal strengths are within 0.1 of the source strengths. D-preferability consistency is 1.0 in all four comparisons only because no proposal argument belongs to a d-preferred extension, making this binary metric uninformative in the sampled cases.

A provision-level example shows the practical meaning of the discrepancy. One contested proposal has source strength 0.47, Sonnet-summary strength 0.54, and Haiku-summary strength 0.89. The Haiku summary retains several supporting arguments but compresses the opposition to one attack; Sonnet preserves a richer set of attacks and remains closer to the source balance.

## Limitations

The empirical evaluation is a proof of concept based on three European Parliament debates, with summary comparisons reported for two of them. Argument-relation annotation is subjective, as reflected in only fair-to-moderate kappa values, and automatically constructed QBAFs inherit classification errors. The constant speech-argument base score of 0.2 is a modeling choice, although supplementary sensitivity checks at 0.15, 0.20, and 0.25 leave the qualitative conclusions unchanged.

The main metrics compare policy-provision nodes rather than matching individual speech arguments, so they cannot yet directly measure omitted or hallucinated arguments. The study also does not validate metric alignment with human judgments or downstream usefulness. Its d-preferability metric is insufficiently discriminative in the sampled debates, while the stronger gradual-semantics results depend on graph construction, base scores, and the selected epsilon tolerance.

## Related Concepts

- [[Quantitative Bipolar Argumentation Frameworks]]
- [[Argument Relation Classification]]
- [[Argumentative Summary Faithfulness]]
- Computational argumentation
- Parliamentary debate summarization
- Gradual argumentation semantics

## Related Papers

- Fabbri et al. (2021), "SummEval: Re-evaluating Summarization Evaluation."
- Lawrence and Reed (2019), "Argument Mining: A Survey."
- Li et al. (2024), "Which Side Are You On? A Multi-task Dataset for End-to-End Argument Summarisation and Evaluation."
- Rago, Toni, Aurisicchio, and Baroni (2016), "Discontinuity-Free Decision Support with Quantitative Argumentation Debates."
- Roush et al. (2024), "OpenDebateEvidence: A Massive-Scale Argument Mining and Summarization Dataset."

[[index|Library home]]
