---
title: Treatment-Confounder Separability
type: concept
aliases:
  - Separability of Treatment and Confounding Features
tags:
  - causal-inference
  - text-as-treatment
  - causal-overlap
  - disentanglement
---

## Overview

Treatment-confounder separability concerns whether a feature of a complex treatment object can be changed while preserving the other features that influence the outcome. In text experiments, the object is a document, the treatment might be military background or a linguistic property, and confounders include other consequential content. A feature-specific causal effect requires a meaningful comparison between treatment states at fixed confounding features.

## Key Ideas

- **Separability permits association.** In Imai and Nakamura's formulation, $T=g_T(X)$ and $U=g_U(X)$ may be statistically associated. The substantive requirements exclude deterministic treatment prediction from $U$ and require that changing $T$ can leave $U$ unchanged. Statistical independence is not the definition.
- **The outcome decomposition defines the intervention.** Writing $Y(X)=Y(T,U)$ specifies which features matter for the outcome. The target $\mathbb{E}[Y(1,U)-Y(0,U)]$ compares treatment values at the same $U$, rather than comparing arbitrary document pools.
- **Coherent edits reveal what preservation requires.** The source's toy example changes a pronoun while preserving an occupation. In contrast, an honorific change that also requires changing a subject's pronouns fails separability when those pronouns belong to the confounding features (Appendix S2). These examples depend on the chosen feature definitions and admissible texts.
- **Overlap depends on the representation.** The GPI framework derives overlap conditional on confounding features under its separability assumptions. Conditioning on the full generating representation instead makes the coded treatment deterministic. A suitable learned deconfounder must preserve outcome information while remaining separable from treatment.
- **Diagnostics test implications.** Extreme propensities and gaps in joint support can flag problems. Their absence does not establish that a representation includes every confounder or that a feature intervention preserves the rest of the text. The proposed editing diagnostic requires collecting outcomes for altered texts as well as assessing the edits.
- **Prediction and identification are distinct.** GPI fits its deconfounder through treatment-specific outcome prediction and estimates propensity scores afterward. This choice is motivated by the risk that a treatment-prediction objective retains treatment itself. The architecture does not remove the substantive assumptions; simulations with nonseparable topics show failure even with access to model internals.

## Important Papers

- [[papers/causal-inference-with-generative-artificial-intelligence-application-to-texts-as-treatments|Causal Inference with Generative Artificial Intelligence: Application to Texts as Treatments]]: formalizes separability for generated treatment objects and evaluates its role in identification, estimation, and diagnostics.
- [[papers/a-design-based-solution-for-causal-inference-with-text-can-a-language-model-be-too-large|A Design-based Solution for Causal Inference with Text: Can a Language Model Be Too Large?]]: a related experimental approach requiring paired edits to preserve all other outcome-relevant features.
- Wang and Jordan (2024), "Desiderata for Representation Learning: A Causal Perspective": cited by the GPI paper for disentanglement and independence of support.

## Related Concepts

- [[concepts/text-as-treatment|Text as Treatment]]: the feature-intervention setting motivating the assumption.
- [[concepts/causal-overlap|Causal Overlap]]: support for comparing both treatment states in an adjustment space.
- [[concepts/disentangled-representations|Disentangled Representations]]: related factor-separation goals whose interpretation depends on structural assumptions.
- [[concepts/causal-representation-learning|Causal Representation Learning]]: representations designed to support intervention-specific causal questions.
- [[concepts/double-machine-learning|Double Machine Learning]]: an inference framework that still requires valid identification and overlap.
