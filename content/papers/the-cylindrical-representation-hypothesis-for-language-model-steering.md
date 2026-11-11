---
title: "The Cylindrical Representation Hypothesis for Language Model Steering"
type: paper
authors:
  - Lang Gao
  - Jinghui Zhang
  - Wei Liu
  - Fengxian Ji
  - Chenxi Wang
  - Zirui Song
  - Akash Ghosh
  - Youssef Mohamed
  - Preslav Nakov
  - Xiuying Chen
year: 2026
source_job_id: "9da3925e-55d1-4996-814d-cff8a121b39c"
tags:
  - activation-steering
  - representation-geometry
  - mechanistic-interpretability
  - steering-vectors
---

## TL;DR

The paper proposes the [[concepts/cylindrical-representation-hypothesis|Cylindrical Representation Hypothesis]] (CRH) to explain why language-model steering varies across samples even when steering vectors are similarly aligned. CRH retains linear concept directions but allows them to overlap. For each sample, their combination induces a central semantic axis, an orthogonal normal plane, and phase-dependent sectors that can promote or suppress target-concept activation. The paper argues that normal-plane magnitude is approximately predictable from observable difference vectors, whereas sector sensitivity is not. Probing and intervention experiments across 100 concepts, several steering methods, and three model families report the predicted activation-stability trade-off and sample-specific sector behavior.

## Research Question

Can a geometric model of overlapping concept directions explain the instability and limited predictability of activation steering more faithfully than the idealized assumption that causally separable concepts can be represented orthogonally?

## Motivation

The Linear Representation Hypothesis motivates steering by treating concepts as linear directions and, in its idealized causal-separability account, assumes that independently manipulable concepts can be made orthogonal. Practical steering is nevertheless sensitive to the target behavior, construction data, and individual input, while representation separability does not consistently predict intervention success. The paper argues that overlap is unavoidable when the number of concept directions exceeds the representation dimension, so interference should be modeled as part of the geometry rather than only as estimation noise.

## Contributions

- Introduces CRH, which preserves linear concept representations while relaxing orthogonality between semantically independent concepts.
- Derives a sample-specific axis, normal plane, and sensitive-sector decomposition from overlapping concept contributions.
- Separates a predictable quantity, normal-plane magnitude, from phase-dependent sector sensitivity that is not identifiable from the steering vector and sample difference vector alone under the model.
- Probes the proposed cylindrical geometry through optimized steering vectors and derives three observable implications for intervention experiments.
- Tests those implications across 100 text, code, and mathematics concepts, multiple steering-vector constructions, intervention locations, layers, and model families.

## Method

### Cylindrical Geometry

CRH assumes that a representation difference is a linear combination of potentially nonorthogonal concept directions. For a sample and target concept, the difference vector to a fluent target-concept output defines the central axis. Concept components orthogonal to this axis balance in aggregate. The paper summarizes their most relevant variation with a two-dimensional normal plane spanning the target concept's orthogonal component and the leading direction of the remaining concepts.

A practical steering vector is decomposed into an axis-aligned component, a normal-plane component, and a residual. The axis component drives the primary semantic transition. The magnitude of the normal-plane component modulates how quickly the target concept appears and how readily coherence degrades. Its phase determines whether the intervention falls in a sector that facilitates or inhibits the target concept.

### Predictability Analysis

The paper treats the norm of a steering vector's component orthogonal to the sample axis as an observable proxy for its latent normal-plane effect. Its proof uses nested projection subspaces to show aligned variation between the proxy and latent effect. By contrast, when more concept directions exist than representation dimensions, multiple latent concept mixtures can produce the same difference vector. The paper uses this non-injectivity to construct configurations with identical observables but opposite sector effects, ruling out deterministic sector prediction from those observables under CRH.

### Geometry Probe

For each sample, the authors optimize one-shot steering vectors under 20 norm budgets from $0.1\lVert v_d\rVert$ to $2\lVert v_d\rVert$. PCA on the optimized vectors defines an empirical axis and two-dimensional normal plane. Sweeps over axial position, radius, and 30 phases map the target loss and generated outputs. The top three components explain a reported mean of 95.14% of optimized-vector variance over 2,451 cylinders from 99 concepts on Gemma-2B-IT layer 9.

### Observable Tests

The verification experiments use Gemma-2B-IT, LLaMA2-7B-Chat, and an additional Qwen2.5-14B-Instruct evaluation. Steering directions are built with DiffMean, PCA, mean-centering, or a linear probe and applied at several token scopes. An LLM judge labels outputs as normal, target-related, or corrupted; a 102-item human check reports 94% accuracy and weighted F1 of 0.94 for those labels.

## Experiments

### Axis-Plane Trade-off

Scaling down the component orthogonal to the sample difference vector delays target-concept activation but also delays corrupted output. Across the reported model, layer, method, and token-position settings, target activation generally rises and then falls with steering strength while corruption increases toward saturation. The authors interpret this as the axis initially promoting the target and a growing normal-plane component eventually destabilizing generation.

### Plane Predictability

The paper predicts that, if the normal plane is determined by the sample difference vector, normalized steerability should correlate with a mixed power of the sine and cosine of the angle between the steering and difference vectors. Sweeping the total exponent produces the reported single-peaked correlation pattern, with the smallest p-value near the peak, across the evaluated steering methods.

### Sector Non-predictability

For pairs of samples, cosine similarity between their difference vectors does not meaningfully predict similarity in the steering strength at which the target first appears. The main Gemma result reports Pearson correlation $-0.034$ with $p>0.05$; the Qwen2.5-14B-Instruct layer-24 check reports Pearson $0.019$ with $p=0.297$. These null associations are consistent with, but do not by themselves prove, the proposed non-identifiability of sensitive sectors.

### Probe Controls and Scale

Optimized probe directions yield more structured loss landscapes than matched random directions: the reported axis-wise loss range is 6.05 versus 1.59 and phase-wise range is 0.51 versus 0.07. The larger Qwen model reproduces the three qualitative implications at layers 24 and 36, extending the reported pattern beyond the two smaller main models.

## Limitations

- CRH is a conceptual model defined in an idealized steering-aligned output space, not a directly observed decomposition of a model's representations.
- The theory assumes fixed linear concept directions and that sample difference vectors combine them; these assumptions require further mechanistic validation.
- The normal plane used in theory is defined from latent concept components, while the empirical probe constructs a three-dimensional coordinate system from PCA of optimized steering vectors. Agreement in qualitative geometry does not establish that these are the same object.
- The non-predictability result is conditional on latent concept non-identifiability and the paper's sector model. Empirical absence of linear correlation is supporting evidence, not a general impossibility theorem for every richer predictor or added observation.
- The evaluation covers a finite concept set concentrated in text, code, and mathematics and does not test long-horizon reasoning, multi-step derivations, or agentic tool use.
- Steering effects are classified by an LLM judge with a small human-validation sample. High measured agreement does not remove possible systematic judge errors across all concepts and strengths.
- Reference difference vectors for test samples are used for geometric analysis even though they are not used to construct the generic steering vectors; practical deployment would need a way to estimate or avoid this sample-specific information.

## Related Concepts

- [[concepts/cylindrical-representation-hypothesis|Cylindrical Representation Hypothesis]]
- [[concepts/model-steerability|Model Steerability]]
- [[concepts/manifold-steering|Manifold Steering]]
- [[concepts/spectral-superposition|Spectral Superposition]]
- [[concepts/irreducible-multidimensional-features|Irreducible Multidimensional Features]]

## Related Papers

- Park, Choe, and Veitch (2024), "The Linear Representation Hypothesis and the Geometry of Large Language Models": provides the linear and causal-separability framework that CRH relaxes.
- Rimsky et al. (2024), "Steering Llama 2 via Contrastive Activation Addition": supplies the contrastive activation-steering setup used throughout the paper.
- [[papers/not-all-language-model-features-are-one-dimensionally-linear|Not All Language Model Features Are One-Dimensionally Linear]]: gives evidence for circular and multidimensional feature geometry beyond single directions.
- [[papers/manifold-steering-reveals-the-shared-geometry-of-neural-network-representation-and-behavior|Manifold Steering Reveals the Shared Geometry of Neural Network Representation and Behavior]]: studies geometry-aware interventions along fitted activation manifolds.
- [[papers/spectral-superposition-a-theory-of-feature-geometry|Spectral Superposition: A Theory of Feature Geometry]]: analyzes overlap and shared subspaces among feature directions.

## Source

Processed from the complete supplied Markdown for Cognitio job `9da3925e-55d1-4996-814d-cff8a121b39c`. The manuscript states that code is available at [mbzuai-nlp/CRH](https://github.com/mbzuai-nlp/CRH); availability was not independently checked.

[[index|Library home]]
