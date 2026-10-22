---
title: Causal Concept Effects
type: concept
aliases:
  - Causal Concept Effect
  - CaCE
  - Individual Causal Concept Effect
  - ICaCE
tags:
  - causal-machine-learning
  - concept-based-explanations
  - interpretable-machine-learning
  - causal-effects
---

## Overview

A causal concept effect measures how an outcome or model prediction changes under an intervention on a human-interpretable concept. For a binary concept $C_i$, the population effect is $\mathbb E[Y\mid\mathrm{do}(C_i=1)]-\mathbb E[Y\mid\mathrm{do}(C_i=0)]$. Its image-conditional counterpart, ICaCE, conditions the contrast on a particular input image before averaging across images.

## Key Ideas

- CaCE is an interventional estimand, not merely a difference in predictions between observations with and without a concept.
- A concept-only regression identifies the effect only when the relevant backdoor paths are closed. Missing common causes can make $p(Y\mid C)$ differ systematically from $p(Y\mid\mathrm{do}(C))$.
- When concepts causally affect one another, an intervention on one concept should propagate through its descendants according to the concept DAG while leaving parents and non-descendants unchanged.
- Counterfactual image generation can estimate effects by changing a concept and reevaluating a classifier, but its causal interpretation depends on assumptions about confounding and whether the generated change implements the intended intervention.
- [[concepts/visual-latent-confounding|Visual Latent Confounding]] motivates learning adjustment variables from images when omitted common causes have observable visual signatures.
- Effect estimation and the design of a [[concepts/concept-bottleneck-models|Concept Bottleneck Model]] are distinct: an interpretable bottleneck does not by itself establish that interventions on its coordinates recover causal effects.

## Important Papers

- Goyal et al. (2020), "Explaining Classifiers with Causal Concept Effect (CaCE)": formalizes the estimand and estimates it using concept-conditioned counterfactual images.
- [[papers/identifiable-estimation-of-causal-concept-effects-under-visual-latent-confounding|Identifiable Estimation of Causal Concept Effects under Visual Latent Confounding]]: learns an identifiable adjustment representation for CaCE estimation when visual common causes are unannotated.
- [[papers/causally-reliable-concept-bottleneck-models|Causally Reliable Concept Bottleneck Models]]: uses causal concept effects to evaluate and block a specified pathway in a graph-structured concept model.

## Related Concepts

- [[concepts/visual-latent-confounding|Visual Latent Confounding]]
- [[concepts/causal-concept-bottlenecks|Causal Concept Bottlenecks]]
- [[concepts/concept-bottleneck-models|Concept Bottleneck Models]]
- [[concepts/causal-representation-learning|Causal Representation Learning]]
- [[concepts/causal-overlap|Causal Overlap]]
- Backdoor adjustment
- Counterfactual explanations
