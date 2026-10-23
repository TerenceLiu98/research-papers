---
title: Soft Token Alignment
type: concept
aliases:
  - Soft-Token Representation Alignment
tags:
  - multilingual-reasoning
  - cross-lingual-alignment
  - soft-tokens
  - continuous-reasoning
---

## Overview

Soft-token alignment trains semantically equivalent sequences to have similar continuous summaries of their next-token distributions. Each soft token is an expectation over vocabulary embeddings rather than the embedding of one selected token. Alignment in the shared embedding space can therefore connect different scripts and lexical realizations while retaining uncertainty among plausible continuations.

## Key Ideas

- **A soft token is a continuous mixture.** A model's next-token probabilities weight vocabulary embeddings, optionally after top-$k$ truncation and renormalization. The result can aggregate related alternatives that hard decoding would collapse into one token.
- **The representation can be auxiliary.** Soft-token alignment need not replace ordinary generation. A teacher-forced model can continue learning from discrete targets while an additional loss aligns soft summaries.
- **Embedding space matters.** Equivalent multilingual responses may activate disjoint vocabulary items, making direct probability-vector comparison weak. Projecting distributions through the shared embedding matrix provides a space in which cross-script relationships can be expressed.
- **Pooling defines the alignment claim.** Full-response pooling aligns overall semantic trajectories but does not guarantee that individual reasoning steps correspond. Finer alignment requires reliable content-level segmentation or matching.
- **Pivot choice introduces asymmetry.** Stop-gradient toward a high-resource pivot can transfer a stronger representation to target languages, but results depend on the pivot's pretraining coverage and should not be generalized to all language pairs.
- **Alignment strength must remain subordinate to the task objective.** Excessive alignment can erase task-relevant distinctions and overwhelm cross-entropy learning; temperature and truncation also determine whether mixtures are informative or nearly discrete.
- **Language preservation requires direct measurement.** Better cross-lingual consistency could arise from switching into the pivot language, so token- and distribution-level script analyses are important controls.

## Important Papers

- [[papers/soft-token-alignment-for-cross-lingual-reasoning|Soft Token Alignment for Cross-Lingual Reasoning]]: introduces SOLAR, which aligns full-response soft-token summaries from parallel multilingual reasoning traces during supervised fine-tuning.
- Zhang et al. (2025), "Soft Thinking: Unlocking the Reasoning Potential of LLMs in Continuous Concept Space": uses probability-weighted vocabulary embeddings as an inference-time reasoning medium.
- Liu and Niehues (2025), "Middle-Layer Representation Alignment for Cross-Lingual Transfer in Fine-Tuned LLMs": aligns multilingual hidden representations rather than soft-token mixtures.

## Related Concepts

- [[concepts/latent-reasoning|Latent Reasoning]]
- Multilingual reasoning
- Cross-lingual representation alignment
- Continuous-space reasoning
- Chain-of-thought reasoning
- Knowledge distillation
