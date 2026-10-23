---
title: Euclidean Preferences
type: concept
aliases:
  - Euclidean Preference Model
  - d-Euclidean Preferences
tags:
  - preference-modeling
  - social-choice
  - spatial-models
---

## Overview

Euclidean preferences represent alternatives and individuals as points in a shared Euclidean space. Each individual's ideal point induces a strict ranking in which nearer alternatives are preferred. The model turns ordinal preferences into geometric proximity, but a fixed low-dimensional configuration cannot necessarily express every possible collection of rankings.

## Key Ideas

- **Ordinal representation:** A profile is $d$-Euclidean when points $x^a,w^i\in\mathbb R^d$ exist such that $a>_i b$ exactly when $\lVert x^a-w^i\rVert_2<\lVert x^b-w^i\rVert_2$. The definition concerns ranking order, not the cardinal size of utility differences.
- **Dimension controls expressiveness:** More dimensions permit more ranking arrangements. When dimension is low relative to the numbers of individuals and alternatives, some profiles are impossible to represent exactly.
- **Local rankings share one geometry:** Alternative locations are common to all individuals. A model cannot choose a separate coordinate system for each ranking, which creates cross-individual compatibility constraints.
- **Circulant pathologies certify failure:** Cyclically shifted subrankings over $k$ alternatives cannot coexist in a $d$-Euclidean profile when $d\leq k-2$. Such a pattern is sufficient evidence of non-Euclidean structure, not a complete characterization of it.
- **Approximation differs from recognition:** Determining whether a general profile is $d$-Euclidean is computationally hard. Approximation error can instead be studied through bounds on representational capacity and distance between rankings.
- **Embedding relevance is conditional:** Euclidean distance and cosine similarity on normalized vectors induce the same ordinal comparisons. Expressiveness limits therefore matter for proximity-based ranking, but need not transfer unchanged to a downstream nonlinear network that can compensate for the embedding geometry.
- **Known alternative coordinates enable preference disaggregation:** In multi-criteria decision aiding, alternatives may already be located by their observed attributes. Pairwise judgments can then identify an individual's ideal point and attribute-specific distance weights, including when preferences peak at intermediate attribute values.

## Important Papers

- Bogomolnaia and Laslier (2007), "Euclidean preferences": characterizes dimensional sufficiency and develops obstructions to Euclidean representation.
- Peters (2017), "Recognising multidimensional Euclidean preferences": establishes computational and representation-complexity results.
- [[papers/error-in-the-euclidean-preference-model|Error in the Euclidean Preference Model]]: bounds the prevalence of non-Euclidean profiles and expected approximation error under uniformly random rankings.
- [[papers/a-multidimensional-spatial-model-for-preference-representation-in-multi-criteria-group-decision-aiding|A Multidimensional Spatial Model for Preference Representation in Multi-Criteria Group Decision Aiding]]: learns weighted Euclidean ideal points from holistic comparisons and links them for group decision support.

## Related Concepts

- [[concepts/kendall-tau-distance|Kendall Tau Distance]]: measures ordinal approximation error through pairwise disagreements or adjacent swaps.
- [[concepts/euclidean-latent-space-item-response-models|Euclidean Latent Space Item Response Models]]: uses shared Euclidean proximity in a probabilistic response model.
- [[concepts/circular-voting-models|Circular Voting Models]]: changes the topology of the policy space to represent coalition patterns unavailable on a line.
- [[concepts/non-separable-spatial-preferences|Non-Separable Spatial Preferences]]: changes how deviations across dimensions combine in utility.
- [[concepts/text-embedding-models|Text Embedding Models]]: often use vector proximity to operationalize semantic ordering.
- [[concepts/multi-criteria-decision-making|Multi-Criteria Decision Making]]: supplies the known attribute space in which weighted spatial preferences can be elicited.
