---
title: "Truth as a Trajectory: What Internal Representations Reveal About Large Language Model Reasoning"
type: paper
authors:
  - Hamed Damirchi
  - Ignacio Meza De la Jara
  - Ehsan Abbasnejad
  - Afshar Shamsi
  - Zhen Zhang
  - Javen Shi
year: null
source_job_id: "fba087f7-e801-4b27-91af-be16b380be12"
tags:
  - mechanistic-interpretability
  - transformer-dynamics
  - representation-geometry
  - reasoning-evaluation
  - toxicity-detection
---

## TL;DR

Truth as a Trajectory (TaT) predicts whether a candidate continuation is valid from the ordered layer-wise displacements of residual-stream activations across every token and layer. An LSTM trained on these trajectories generally transfers across reasoning benchmarks better than a middle-layer [[concepts/linear-probing|linear probe]], and displacement trajectories improve out-of-distribution toxicity detection. The evidence also qualifies the displacement argument: raw activation trajectories have higher average accuracy for seven of eight reasoning training datasets in the full ablation, while displacement is clearly better for OpenBookQA.

## Research Question

Does the evolution of transformer representations across tokens and layers contain a transferable signature of valid reasoning or behavior that is more robust to task-specific lexical cues than a representation from one layer?

## Motivation

Static probes can exploit token identity, prompt format, and other polysemantic content in a hidden state, and their results depend strongly on the selected layer. Viewing residual updates as a trajectory shifts attention from what is present at one layer to how the model changes its representation during a forward pass. The paper asks whether that dynamic signal transfers across tasks and architectures.

## Contributions

- Defines TaT, a supervised classifier over the full token-by-layer sequence of residual-stream displacements.
- Compares learned trajectories with fixed kinematic descriptors such as velocity, acceleration, jerk, curvature, and arc length; these descriptors carry signal but do not consistently match the base model.
- Evaluates cross-dataset validity classification on nine reasoning benchmarks using dense and mixture-of-experts language models.
- Extends the approach to toxicity detection and compares displacement trajectories with raw trajectories and static probes.
- Ablates raw versus displacement inputs, token versus layer coverage, sequence ordering, single-layer probe selection, and an order-invariant set MLP.

## Method

For each prompt and candidate continuation, the authors collect residual-stream states $h_{t,\ell}$ for token $t$ and layer $\ell$. They replace each state with its layer-wise displacement

$$
d_{t,\ell}=h_{t,\ell+1}-h_{t,\ell},
$$

then flatten the token-by-layer grid in token-major, layer-minor order. A one- to three-layer LSTM with a hidden size selected from 128 to 512 processes this sequence, and a linear head on its final hidden state predicts candidate validity. The stated rationale is that differencing attenuates persistent token and prompt content while retaining the updates written by transformer blocks.

Reasoning experiments train a classifier on one dataset and evaluate it on the other datasets without adaptation. The main static baseline is a linear probe on the candidate's final-token activation at the model's middle layer. Additional comparisons include zero- and few-shot model answers, LoRA trained on ARC-Easy, raw activation trajectories, restricted trajectory grids, an order-invariant set MLP, and probes selected from multiple layers.

## Experiments

The reasoning suite contains ARC-Challenge, ARC-Easy, BoolQ, HellaSwag, OpenBookQA, StoryCloze, CommonsenseQA, CosmosQA, and SocialIQA. Models include Llama-3.1-8B and Qwen dense and mixture-of-experts variants. Toxicity experiments train on RealToxicityPrompts and test out of distribution on ToxiGen.

Across the eight Llama-3.1-8B source datasets reported in the main table, TaT has higher out-of-distribution average accuracy than the middle-layer linear probe in every row. For example, training on ARC-Challenge yields 79.31% OOD average for TaT versus 70.49% for the probe; training on OpenBookQA yields 76.83% versus 65.11%. Against a hindsight-selected oracle probe, the paper reports mean accuracy of 71.76% for TaT, 68.17% for the oracle, and 66.42% for the default probe, with BoolQ as the exception where the oracle exceeds TaT.

When trained on ARC-Easy, TaT beats rank-16 LoRA on five of six listed transfer tasks; on StoryCloze the reported accuracies are 94.98% and 83.76%, respectively. These comparisons test predictive transfer, not whether TaT identifies a causal reasoning mechanism.

For ToxiGen, displacement TaT scores 84.23% on Llama-3.1-8B, compared with 81.99% for raw trajectories and 79.62% for a linear probe. It also leads on the two reported Qwen3 models, but raw trajectories score higher on Qwen2.5-14B. In-distribution RealToxicity results often favor raw trajectories.

The reasoning ablation is mixed. Raw trajectories achieve the best average accuracy in seven of eight source-dataset comparisons. Displacement is strongest on OpenBookQA, where its OOD average is 76.83% versus 69.85% for raw trajectories. Full token-by-layer trajectories lead the restricted grid variants on five of eight source datasets; a middle-layer row wins for SocialIQA and CommonsenseQA, and a final-token column slightly leads for CosmosQA. Shuffling trajectory order degrades performance, and the LSTM generally exceeds an order-invariant set MLP, supporting the value of sequence structure without isolating which ordering relations matter.

The LSTM has 4.76 million parameters, reported as 0.06% of Llama-3.1-8B, and 18.1 MB of memory. The separately evaluated implementation adds 10.5 ms to a 64.0 ms base forward pass, or 16%; the paper argues that pipelining could reduce deployment overhead but does not benchmark that integrated design.

## Limitations

- TaT is a supervised validity detector, not an explanation of which heads, circuits, or geometric features implement reasoning.
- Extracting every token's state across every layer is substantially heavier than reading one activation, despite the classifier itself being small.
- The constrained candidate-choice setup provides unambiguous labels but does not establish performance on self-generated, open-ended reasoning chains.
- Cross-dataset transfer can still reflect shared benchmark structure. The experiments do not establish a universal, task-independent geometry of truth.
- The displacement rationale is not uniformly supported by the reasoning ablations: raw trajectories obtain higher mean accuracy in most source-dataset comparisons.
- Reported robustness varies by source dataset, prompt structure, model, and target domain; BoolQ and several grid ablations are notable exceptions to the broad pattern.
- The supplied manuscript gives no stable identifier or publication year, so those metadata remain unset.

## Related Concepts

- [[concepts/transformer-representation-trajectory-geometry|Transformer Representation Trajectory Geometry]]
- [[concepts/dynamical-interpretability|Dynamical Interpretability]]
- [[concepts/linear-probing|Linear Probing]]
- [[concepts/sparse-mixture-of-experts|Sparse Mixture of Experts]]

## Related Papers

References discussed in the supplied paper:

- Zhou et al. (2025), "The Geometry of Reasoning: Flowing Logics in Representation Space": motivates velocity-field analysis of logical validity in more controlled settings.
- Manson (2025), "Curved Inference: Concern-Sensitive Geometry in Large Language Model Residual Streams": studies curvature induced by semantic framing.
- Park, Choe, and Veitch (2023), "The Linear Representation Hypothesis and the Geometry of Large Language Models": provides the static linear-representation view that TaT tests against.
- Zou et al. (2023), "Representation Engineering: A Top-Down Approach to AI Transparency": uses static concept directions for analysis and control.

Related library reading, without implying citation by this paper:

- [[papers/trajectory-geometry-of-transformer-representations-across-layers|Trajectory Geometry of Transformer Representations Across Layers]]: measures untrained depthwise path descriptors rather than learning a supervised validity classifier.
- [[papers/block-recurrent-dynamics-in-vits|Block-Recurrent Dynamics in ViTs]]: studies convergence, stability, and collective token motion in repeated vision-transformer blocks.

[[index|Library home]]
