---
title: Causal and Interpretable Heterogeneous Treatment Effects
type: concept
aliases:
  - Causal HTE Identification
  - Direct Effect Modifier Identification
tags:
  - causal-inference
  - treatment-effect-heterogeneity
  - causal-representation-learning
  - policy-evaluation
---

## Overview

Causal and interpretable heterogeneous treatment effect identification seeks the pre-treatment factors that directly change an intervention's effect, rather than merely predicting which units respond differently. The target is a minimal, sufficient characterization of the CATE that can support policy comparisons and interventions on the identified effect modifiers.

## Key Ideas

- Direct effect modifiers interact with treatment itself. Indirect modifiers, proxies, and common-cause modifiers may predict heterogeneous effects but do not necessarily provide a causal handle for changing them.
- The target can be latent in multimodal measurements such as survey data and satellite imagery. Measurement Sufficiency requires those observations to retain the relevant heterogeneity information, while Representation Sufficiency requires a learned representation to preserve it.
- Principal Alignment posits a distinct dominant coordinate for each direct modifier in the learned representation. This turns a latent causal target into a search problem over interpretable proxy features without claiming that every coordinate is disentangled.
- Marginal effect-modification screens are structurally vulnerable to entangled proxies. Conditioning on already-selected features is needed to find a minimal and sufficient set, motivating [[Neural EXposure Interaction Search|NEXIS]].
- The strongest causal reading is joint and interventional: the selected representation can identify effects for bundled configurations of direct modifiers. A single-coordinate marginal effect may remain population- or subpopulation-specific when direct modifiers interact or are dependent.
- Assumptions about measurement, representation, alignment, faithfulness, and test validity are substantive and partly untestable. Discovered modifiers should be validated in new data or experiments before guiding policy.

## Important Papers

- [[From Tokens to Policy: Causal and Interpretable Heterogeneous Treatment Effects Identification]]
- [[Toward Causal Representation Learning]]
- VanderWeele and Robins (2007), "Four types of effect modification: a classification based on directed acyclic graphs."
- Wager and Athey (2018), "Estimation and inference of heterogeneous treatment effects using random forests."

## Related Concepts

- [[Neural EXposure Interaction Search|NEXIS]]
- [[Causal Representation Learning]]
- [[Sparse Autoencoders]]
- [[Statistical Identifiability]]
- [[Exploratory Causal Inference]]
- [[Structured Treatments]]
- Conditional average treatment effects
- Markov blanket discovery
