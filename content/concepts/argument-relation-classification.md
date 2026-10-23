---
title: Argument Relation Classification
type: concept
aliases:
  - ARC
  - Relation-Based Argument Mining
tags:
  - argument-mining
  - text-classification
  - computational-argumentation
---

## Overview

Argument relation classification identifies whether one textual argument attacks, supports, or has no argumentative relation to another. It is a relation-based form of argument mining: argument relevance emerges from connections between statements rather than from classifying each sentence independently.

## Key Ideas

- The basic prediction unit is an ordered source-target pair. Direction matters because a later statement may respond to an earlier one without the reverse relation holding.
- Attack and support labels recover the signed edges needed for bipolar argument graphs; a no-relation label prevents every semantically similar pair from becoming an argumentative edge.
- Domain structure can constrain predictions. In a live parliamentary debate, temporal order permits later speech arguments to target earlier ones, whereas a synthesized summary may not preserve that ordering.
- Annotation is interpretive. In the European Parliament benchmark reported by Cunningham et al., raw agreement is 76.6% but Cohen's kappa ranges from 0.30 to 0.54 across annotator pairs, indicating a limited and topic-dependent performance ceiling.
- Out-of-domain transfer is not guaranteed. On that benchmark, a larger zero-shot model substantially outperforms a smaller model fine-tuned on eight existing relation datasets, consistent with concern that classifiers can learn dataset-specific cues rather than general argumentative relations.
- Downstream graph metrics inherit edge-classification errors. Evaluating the classifier is therefore part of validating any analysis based on the resulting argument graph.

## Important Papers

- [[Evaluating LLM-Driven Summarisation of Parliamentary Debates with Computational Argumentation]]: benchmarks attack, support, and no-relation prediction before constructing debate QBAFs.
- Carstens and Toni (2015), "Towards Relation Based Argumentation Mining."
- Lawrence and Reed (2019), "Argument Mining: A Survey."
- Gorur, Rago, and Toni (2025), "Can Large Language Models Perform Relation-Based Argument Mining?"

## Related Concepts

- [[Quantitative Bipolar Argumentation Frameworks]]
- [[Argumentative Summary Faithfulness]]
- Argument mining
- Natural language inference
