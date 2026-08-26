---
title: "Causal Inference with Unstructured Outcomes"
type: paper
authors:
  - Kevin Christian Wibisono
  - Yixin Wang
year: null
tags:
  - causal-inference
  - unstructured-data
  - text-outcomes
  - image-outcomes
  - treatment-effect-heterogeneity
---

## TL;DR

This paper proposes the maximally contrasting feature (MCF), a learned bounded score for identifying which represented aspect of an unstructured outcome changes most under treatment. It estimates the score with an inverse-propensity-weighted objective, extends it to covariate-dependent effects, and develops a paired maximally influential treatment feature (MIF) and MCF when both treatment and outcome are unstructured. Text and image experiments recover treatment-induced formality, non-toxicity, punctuation, and blur, while paired experiments recover linked treatment and outcome directions after covariate adjustment.

## Research Question

How can causal inference characterize treatment effects when the outcome is a text, image, or other unstructured object for which subtraction and a natural average treatment effect are not meaningful? When treatment is also unstructured, which treatment-side feature is associated with which outcome-side feature after adjustment for observed context?

## Motivation

For scalar outcomes, the average treatment effect compares mean potential outcomes by subtraction. That operation has no canonical interpretation for clinical notes, survey responses, images, or other rich objects. Reducing an object to a prespecified scalar or codebook can also miss the treatment-induced feature of interest. The paper treats a numerical representation of the raw object as the working outcome and makes feature selection part of the causal query.

## Contributions

- Defines the [[Maximally Contrasting Feature]] (MCF) as the bounded outcome-scoring function with the largest average contrast between treated and control potential outcomes.
- Establishes identification under SUTVA, overlap, and unconfoundedness, and proposes inverse-propensity-weighted estimation with sample splitting or cross-fitting.
- Develops heterogeneous and budgeted MCFs for effects that vary across covariate profiles and for inspecting only the most treatment-enriched part of the outcome population.
- Extends the framework to a paired [[Maximally Influential Treatment Features]] (MIF) and MCF objective when both treatment and outcome are unstructured, using matched negative-control outcomes to remove the covariate baseline.
- Shows through text, image, and text-to-text experiments that the learned scores recover treatment-relevant directions and can be interpreted through high- and low-scoring examples.

## Method

Let $X$ be pre-treatment covariates, $A$ a binary treatment, and $Y$ a numerical representation of the raw unstructured outcome. For a bounded feature-scoring function $g(Y)$, the feature-specific causal contrast is

$$
\theta(g) = \mathbb{E}\{g(Y(1)) - g(Y(0))\}.
$$

The MCF maximizes this contrast over a prespecified function class. In the population oracle class $0 \leq g \leq 1$, it selects represented outcomes where the treated potential-outcome density exceeds the control density. A parameterized score is fitted by maximizing the observed-data inverse-propensity-weighted contrast, with a learned propensity score held fixed while the outcome feature is optimized. Sample splitting or cross-fitting separates propensity estimation from feature learning.

The heterogeneous version uses $g(Y,X)$, allowing the treatment-induced direction to differ by context. A budgeted version ranks outcomes by treatment enrichment relative to a reference distribution and changes the selection threshold without changing the underlying direction. For unstructured treatments, the paper learns bounded treatment and outcome scores $f(A)$ and $g(Y)$ by maximizing their covariate-adjusted association. Matched negative-control outcomes approximate $\mathbb{E}\{g(Y)\mid X\}$ without fitting a new regression for every update of $g$.

## Experiments

The text experiments use semi-synthetic GYAFC and ParaDetox outcomes. With context-invariant treatment effects, the MCF recovers formality and non-toxicity: in the formality study, mean scores for informal and formal entertainment sentences are approximately 0.19 and 0.86, and the corresponding family scores are 0.21 and 0.86. In the non-toxicity study, high-conflict toxic and non-toxic sentences score approximately 0.05 and 0.92, while moderated-support scores are 0.03 and 0.91. Context-adaptive scenarios reverse the learned direction across contexts, rather than producing a misleading global classifier. A multi-attribute study recovers joint formality and punctuation when both shift, and isolates punctuation or formality when only one shifts. An LDA comparison produced a larger selected-topic contrast at eight topics, but the topic summaries did not map clearly to formality or another interpretable stylistic dimension.

For images, an adversarial autoencoder represents synthetic cell images from BBBC005v1 using a 32-dimensional style representation while cell count supplies content. After adjustment for cell count, test images with learned scores below 0.2 have mean blur 10.0, compared with 34.6 for scores above 0.8. Embedding-based nudging increases blur while holding cell-count content approximately fixed.

When both sides are unstructured, a synthetic three-coordinate treatment-outcome experiment recovers the only informative pair, $A_1$ and $Y_1$, while ignoring the other coordinates. In a headline-generation experiment using Qwen2.5-1.5B-Instruct and all-MiniLM-L6-v2 embeddings, the paired scores recover prompt formality and generated-headline formality after adjusting for topic.

## Limitations

The causal interpretation requires consistency/SUTVA, overlap, and unconfoundedness relative to the chosen covariates and representation. The MCF is exploratory and class-dependent: its interpretation comes from inspecting examples and may combine several correlated attributes rather than identify one named feature. The representation function determines which information from the raw object is available, and arbitrary embedding points may not correspond to coherent objects.

The estimation results rely on regularity conditions for uniform convergence, propensity estimation, sample splitting or cross-fitting, and asymptotic expansions. Practical optimization uses bounded parameterized scores and can be sensitive to the chosen architecture. The paired MIF-MCF procedure relies on matched negative-control outcomes or comparable covariate neighborhoods. The empirical studies are synthetic or semi-synthetic, and the image and headline examples do not establish performance on downstream real-world decisions. The paper also reports instability for implemented bi-level plug-in alternatives, rather than resolving the broader nested-learning problem in all settings.

## Related Concepts

- [[Unstructured Outcome Causal Inference]]
- [[Maximally Contrasting Feature]]
- [[Maximally Influential Treatment Features]]
- Potential outcomes
- Propensity scores
- Text and image embeddings
- Negative control outcomes

## Related Papers

- Egami, Fong, Grimmer, Roberts, and Stewart (2022), "How to make causal inferences using texts."
- Feder et al. (2022), "Causal inference in natural language processing: Estimation, prediction, interpretation and beyond."
- Veitch, Sridhar, and Blei (2020), "Adapting text embeddings for causal inference."
- Wibisono and Wang (2026), "Causal inference with unstructured treatments," arXiv:2608.00657.
- Modarressi, Spiess, and Venugopal (2025), "Causal inference on outcomes learned from text," arXiv:2503.00725.

[[index|Library home]]
