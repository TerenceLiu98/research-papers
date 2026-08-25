---
title: Visual Counterfactual Explanations
type: concept
aliases:
  - VCEs
  - Visual Counterfactual Explanation
tags:
  - explainable-ai
  - computer-vision
  - counterfactual-reasoning
  - generative-models
---

## Overview

Visual counterfactual explanations are images constructed to answer what minimal, meaningful change would make a vision model produce a different prediction. A useful counterfactual must change the decision while remaining plausible and sufficiently close to the original image for the change to be interpretable.

## Key Ideas

- Validity requires the target prediction to be reached; proximity measures how much the image changed; plausibility asks whether the result remains on the data manifold and semantically credible.
- Generative models provide a way to constrain edits to realistic image distributions, unlike unconstrained pixel optimization, which can produce adversarial-looking perturbations.
- Semantic interventions, such as changing an attribute in a [[Concept Bottleneck Models|concept bottleneck]], make the requested change inspectable and controllable.
- Localization is important because a counterfactual should modify relevant regions while preserving identity and unrelated structure. Gradient masks, latent editing, and explicit distance regularization address this requirement in different ways.
- Evaluation typically combines flip rate with image distances, perceptual realism, detector failure rate, and identity preservation. High flip rate alone does not establish a useful explanation.

## Important Papers

- [[Concept-based Visual Counterfactual Explanations with Diffusion Models]]
- Goyal et al. (2019), "Counterfactual visual explanations."
- Augustin, Boreiko, Croce, and Hein (2022), "Diffusion visual counterfactual explanations."
- Jeanneret, Simon, and Jurie (2022), "Diffusion models for counterfactual explanations."
- Sauer and Geiger (2021), "Counterfactual generative networks."

## Related Concepts

- [[Diffusion Models]]
- [[Concept Bottleneck Models]]
- [[Model Steerability]]
- Explainable AI
- Generative modeling

