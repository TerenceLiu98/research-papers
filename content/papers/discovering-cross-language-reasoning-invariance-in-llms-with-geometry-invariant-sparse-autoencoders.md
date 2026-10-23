---
title: "Discovering Cross-Language Reasoning Invariance in LLMs with Geometry-Invariant Sparse Autoencoders"
type: paper
authors:
  - Igor Bogdanov
  - Changcheng Huang
year: null
source_job_id: "b349ef29-f2af-4dd1-a91b-26bde51f20f9"
tags:
  - sparse-autoencoders
  - multilingual-reasoning
  - mechanistic-interpretability
  - representation-alignment
---

## TL;DR

Geometry-Invariant Sparse Autoencoders (GI-SAEs) add a problem-level contrastive objective to TopK SAE training so that reasoning traces for the same math problem activate more similar features across languages. Across five language models and six languages, this reliably improves geometric alignment, but not functional interchangeability: feature-value swaps help most when baseline sharing is moderate, show no systematic benefit when sharing is low, and are usually harmful when sharing is already saturated.

## Research Question

When multilingual language models solve the same reasoning problem in different languages, do they use internal SAE features that are merely geometrically aligned, or features whose values can be exchanged across languages without disrupting downstream behavior?

## Motivation

Behavioral consistency and representation-similarity scores do not establish that two languages use a feature in the same way. If shared features are functionally interchangeable, one interpretability analysis may transfer across languages; otherwise, similar outputs or high alignment may conceal language-specific computation. The paper therefore separates matrix geometry, overlap of active SAE indices, and the causal effect of swapping feature values.

## Contributions

- Introduces [[concepts/geometry-invariant-sparse-autoencoders|Geometry-Invariant Sparse Autoencoders]], which combine TopK reconstruction with an InfoNCE objective over activations labeled by problem identity.
- Defines a feature-level causal patching protocol that swaps values only at SAE indices active in both languages, preserves the target reconstruction error, and measures downstream KL divergence per shared feature.
- Compares baseline and GI-SAE representations across 78 model-layer observations from Qwen3-1.7B, Qwen3-4B, Llama-3.2-3B, Gemma-3-4B, and Phi-3-mini.
- Shows that improved CKA and Jaccard similarity do not reliably imply functional interchangeability, and proposes baseline shared fraction as a descriptive diagnostic for when contrastive alignment helps.

## Method

Each model independently solves MGSM problems in English, German, French, Spanish, Russian, and Chinese. The study retains a problem only when the model produces a correct answer and an extractable reasoning trace in all six languages. Residual-stream activations are collected by replaying those traces at layers selected through a preliminary linear CKA survey.

At each selected layer, the authors train a reconstruction-only TopK [[concepts/sparse-autoencoders|Sparse Autoencoder]] and a GI-SAE with the same architecture. Both use a fourfold dictionary expansion and $K=128$. GI-SAE adds an InfoNCE term with temperature $0.1$ and weight $1.0$; activations from the same problem are positives regardless of language or token position. SAE training and geometric evaluation use z-scored activations.

Evaluation distinguishes three levels. Linear CKA compares encoded matrix geometry. Jaccard similarity and shared fraction compare active feature indices at positions aligned backward from the final reasoning token. Causal feature patching replaces the target values at shared active indices with donor-language values, decodes the result, restores the target SAE reconstruction error, and injects the patched residual into the model. Functional disruption is measured by next-token KL divergence, corrected by a same-language control and divided by the mean number of shared features; lower KL per feature indicates greater interchangeability.

## Experiments

The common sweep covers 78 layers across five checkpoints from four model families. Valid-problem counts are 202 for Qwen3-4B, 151 for Qwen3-1.7B, 137 for Gemma-3-4B, 63 for Phi-3-mini, and 60 for Llama-3.2-3B.

GI-SAE improves CKA at nearly every observation, but causal outcomes differ sharply. Both Qwen models improve at every tested layer: 11/11 layers for Qwen3-1.7B and 14/14 for Qwen3-4B. Gemma improves at 0/16 layers despite CKA gains of 0.25--0.41. Llama improves at 7/17 layers, concentrated mainly at the deepest tested layers, while Phi improves early and degrades from layer 7 onward.

Stratifying observations by baseline shared fraction yields a descriptive phase diagram. In the convergent range of 15--60% sharing, GI-SAE wins at 83% of layers (95% Wilson interval 64--93%). The win rate is 49% (33--64%) below 15% sharing and 6% (1--27%) above 60% sharing. In aggregate, the convergent profile both raises sharing from 41.5% to 60.1% and lowers raw KL from 0.426 to 0.249. In the saturated profile, sharing remains near 89% while raw KL more than doubles from 1.581 to 3.516.

Controls compare same-problem donors with different-problem and random-value donors. The controls are more disruptive in 86% and 93% of tested condition-variant pairs, respectively. A qualitative audit finds shared features associated mainly with answer boundaries, answer-transition phrases, and step or format markers.

## Limitations

- Results are conditional on problems solved correctly in all six languages and do not estimate feature sharing over the full MGSM distribution.
- Each non-Qwen family is represented by one checkpoint, and all models are at most 4B parameters, so the proposed profiles are descriptive rather than established architectural properties.
- Llama and Phi have substantially fewer valid problems than the Qwen models, reducing statistical power.
- The study uses one benchmark and one sampled trace per problem-language pair.
- Hyperparameters are fixed across models, while the contrastive weight was selected on one Qwen3-1.7B layer.
- Problem-level positives are not aligned by reasoning step, so the objective may favor answer-level or discourse-level structure.
- The main causal sweep encodes native-scale residuals although training uses standardized activations. Normalized-space checks preserve the Qwen conclusion but reverse some low- and mixed-sharing layer verdicts.
- Shared features cluster near the transition to the answer, so the evidence is stronger for shared discourse and output-boundary structure than for invariant intermediate reasoning computations.

## Related Concepts

- [[concepts/geometry-invariant-sparse-autoencoders|Geometry-Invariant Sparse Autoencoders]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/cross-lingual-feature-steering|Cross-Lingual Feature Steering]]
- [[concepts/attribution-patching|Attribution Patching]]
- Multilingual reasoning
- Centered Kernel Alignment
- Causal activation patching

## Related Papers

- [[papers/enhancing-low-resource-language-reasoning-via-high-resource-language-feature-transfer|Enhancing Low-Resource Language Reasoning via High-Resource Language Feature Transfer]] intervenes on SAE features to transfer reasoning behavior across languages rather than testing whether naturally shared feature values are interchangeable.
- [[papers/universal-sparse-autoencoders-interpretable-cross-model-concept-alignment|Universal Sparse Autoencoders: Interpretable Cross-Model Concept Alignment]] learns one sparse code across vision models and evaluates cross-model reconstruction, but does not perform the paper's feature-level cross-language causal swaps.
- Brinkmann et al. (2025), "Large language models share representations of latent grammatical concepts across typologically diverse languages."
- Davari et al. (2023), "Reliability of CKA as a similarity measure in deep learning."
- Gao et al. (2025), "Scaling and evaluating sparse autoencoders."

[[index|Library home]]
