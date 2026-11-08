---
title: "A Mechanistic Analysis of Looped Reasoning Language Models"
type: paper
authors:
  - Hugh Blayney
  - Alvaro Arroyo
  - Johan Obando-Ceron
  - Pablo Samuel Castro
  - Aaron Courville
  - Michael Bronstein
  - Xiaowen Dong
year: 2026
source_job_id: "661b7c08-80a8-425e-bcc9-fd794cd4e029"
tags:
  - looped-transformers
  - recurrent-depth
  - mechanistic-interpretability
  - attention-dynamics
---

## TL;DR

The paper analyzes hidden-state and attention dynamics in looped language models. In several architectures, each layer in a recurrent block approaches its own fixed point, so the full block traces a stable cycle rather than collapsing every layer to one state. Attention patterns stabilize with these states, and the repeated block often reproduces the mixing stages found across the depth of feedforward Transformers. Input injection and normalization strongly affect convergence; models that do not reach stable fixed points can lose their learned stages when run for more recurrences than seen during training.

## Research Question

How do looped language models organize computation across recurrent depth, and when do their hidden states and attention patterns converge to stable behavior that remains reliable beyond the training recurrence budget?

## Motivation

Looped Transformers reuse layers to increase effective depth without increasing the number of distinct parameters, making them a prominent architecture for [[concepts/latent-reasoning|Latent Reasoning]] and test-time computation. Their internal dynamics are less understood than those of feedforward models. The paper asks whether repeated computation converges, what convergence means inside a multi-layer cycle, and whether feedforward "stages of inference" survive weight tying and recurrence.

## Contributions

- Formalizes [[concepts/cyclic-fixed-points-in-looped-transformers|Cyclic Fixed Points in Looped Transformers]]: if a recurrent block reaches a fixed point, cyclic permutations of its component layers also have fixed points, which need not coincide.
- Proves a bound showing that attention matrices change slowly when the corresponding recurrent hidden states converge and remain bounded.
- Compares Ouro 1.4B, Huginn-0125, and retrofitted recurrent Llama models, with additional results for Ouro 2.6B, retrofitted OLMo-2, and retrofitted TinyLlama.
- Shows that recurrent blocks often repeat feedforward-like mixing stages, measured primarily through attention column-sum concentration and supplemented by sink rate, attention entropy, and residual-stream entropy.
- Isolates architectural effects using randomly initialized models and small models trained from scratch, focusing on input injection, normalization, recurrent-block size, and prelude/coda layers.

## Method

A looped model is represented as a feedforward prelude, a stack of $k$ Transformer blocks repeated for $l$ recurrences, and a feedforward coda. Some models inject the original recurrent input at every pass. The analysis tracks the residual stream and realized attention matrix after each distinct layer and recurrence.

The paper compares successive recurrent states with an approximate fixed point obtained at the 128th recurrence, using norms and cosine similarity. Pairwise residual-state and attention-matrix comparisons test whether the same layer returns to a layer-specific state on later cycles. A Lipschitz argument connects convergence of bounded attention inputs to convergence of their softmax attention matrices.

Stages of inference are studied through ColSum concentration, the normalized concentration of attention mass across key positions. The appendix adds attention-sink rate, row-entropy mixing scores, residual entropy, and prediction/suppression-neuron measurements. Most pretrained-model experiments average over 256 examples from GSM8K; HellaSwag supplies a non-reasoning comparison. Separate randomly initialized and 3.7-billion-token small-model experiments probe architectural and training explanations.

## Experiments

| Setting | Reported observation | Evidence boundary |
| --- | --- | --- |
| Huginn-0125 and retrofitted Llama, 128 recurrences | Layer states rapidly approach layer-specific fixed points; attention behavior becomes constant across later recurrences. | Convergence is empirical on the tested prompts and metrics, with the final recurrence used as an approximate fixed point. |
| Ouro 1.4B, 128 recurrences | Successive states become similar, but the trajectory does not converge to the 128th-recurrence state and its stages drift at unseen recurrence depths. | Small step-to-step changes do not establish a fixed point. |
| Pretrained recurrent blocks | Ouro and retrofitted models reproduce feedforward-like attention-mixing stages within each recurrence; Huginn-0125 is a negative case. | The claim concerns measured mixing patterns, not identical computations or task performance. |
| Randomly initialized 12-layer blocks | Input injection yields stable fixed points for tested norm structures except Ouro's; without injection, only pre-norm converges, to a degenerate common state. | Mean over three random initializations; these experiments isolate architecture rather than learned reasoning. |
| Small models trained from scratch with four fixed recurrences | Models with 4, 8, or 12 recurrent layers show initial evidence of self-organized feedforward-like mixing stages. | Small-scale experiments trained for 3.7B tokens; the authors explicitly treat the evidence cautiously. |
| GSM8K limiting-behavior audit | Non-fixed-point orbits and sliders are rare: about 0.02% of Huginn tokens without a system prompt, with rates sensitive to prompt and classifier settings. | The heuristic thresholds were selected by visual inspection, so exact rates are not robust estimates. |

The architectural comparisons suggest that input injection promotes fixed-point convergence, while repeated residual-stream normalization can suppress the activation-magnitude changes associated with attention sinks and mixing stages. In the small trained models, sandwich layers and the absence of input injection most closely reproduce the feedforward profiles; adding injection makes the last recurrence more feedforward-like at the expense of earlier ones.

## Limitations

- The analysis covers cyclic recurrence with one repeated multi-layer block, not sequential architectures containing several separate recurrent blocks.
- The paper establishes consequences of convergence but does not analytically explain why particular normalization and injection choices converge.
- Stable fixed-point behavior is correlated with recurrence-depth extrapolation in the studied models; the experiments do not establish that convergence is necessary or universally desirable for reasoning.
- The main pretrained-model evaluation uses 256 GSM8K examples. HellaSwag supports task robustness for the measured stages, but the model and data coverage remains limited.
- Several mechanistic conclusions rely on observational similarities in hidden states and attention metrics rather than causal interventions on the inferred stages.
- The self-organization evidence comes from small models and should not be taken as proof that the same mechanism governs large recurrent language models.

## Related Concepts

- [[concepts/cyclic-fixed-points-in-looped-transformers|Cyclic Fixed Points in Looped Transformers]]: the layer-specific limiting cycle studied throughout the paper.
- [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]]: repeated parameter-tied blocks separate effective depth from the number of distinct parameters.
- [[concepts/latent-reasoning|Latent Reasoning]]: recurrent hidden-state computation is the architectural setting motivating the analysis.
- [[concepts/mechanistic-interpretability|Mechanistic Interpretability]]: the work characterizes internal state and attention dynamics rather than introducing a new reasoning model.
- [[concepts/transformer-representation-trajectory-geometry|Transformer Representation Trajectory Geometry]]: provides the broader geometric view of hidden-state paths across depth.
- [[concepts/adaptive-computation|Adaptive Computation]]: recurrence can vary test-time computation, although the paper mainly studies fixed recurrence counts and extrapolation.

## Related Papers

- Geiping et al. (2025), "Scaling Up Test-Time Compute with Latent Reasoning": introduces Huginn-0125 and reports recurrent-depth scaling and limiting behaviors examined here.
- Zhu et al. (2025), "Scaling Latent Reasoning via Looped Language Models": introduces the Ouro models and their looped training design.
- McLeish et al. (2025), "Teaching Pretrained Language Models to Think Deeper with Retrofitted Recurrence": supplies the recurrent Llama, OLMo-2, and TinyLlama models.
- Lad et al. (2024), "The Remarkable Robustness of LLMs: Stages of Inference?": introduces the stages-of-inference framing.
- Queipo-de Llano et al. (2025), "Attention Sinks and Compression Valleys in LLMs Are Two Sides of the Same Coin": motivates the attention-mixing measurements and activation-based interpretation.
- [[papers/block-recurrent-dynamics-in-vits|Block-Recurrent Dynamics in ViTs]] studies recurrent approximations and depthwise dynamics in vision models rather than native looped language models.

[[index|Library home]]
