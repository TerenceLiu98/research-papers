---
title: "Knowledge Vector of Logical Reasoning in Large Language Models"
type: paper
authors:
  - Zixuan Wang
  - Yuanyuan Lei
year: null
source_job_id: "6896bdbb-470f-4639-bde4-82db9589530b"
tags:
  - logical-reasoning
  - activation-steering
  - mechanistic-interpretability
  - sparse-autoencoders
  - representation-geometry
---

## TL;DR

This paper extracts separate linear activation directions for deductive, inductive, and abductive reasoning, then refines them so they share complementary information while remaining inside reasoning-specific subspaces induced by [[concepts/sparse-autoencoders|Sparse Autoencoders]]. The resulting [[concepts/reasoning-knowledge-vectors|Reasoning Knowledge Vectors]] improve benchmark scores over both unsteered models and independently trained steering vectors across Llama-3.1-8B-it, Gemma-2-9B-it, and GPT-OSS-20B. The experiments support controllable, type-specific reasoning directions on the three studied datasets, but do not establish transfer to other reasoning forms or domains.

## Research Question

Can deductive, inductive, and abductive reasoning be represented and controlled as linear directions in a language model's activation space, and can those directions be improved by sharing complementary information without erasing what distinguishes each reasoning type?

## Motivation

Activation steering has identified linear directions for behaviors such as truthfulness and instruction following, but general forms of logical reasoning have received less attention. Naively extracted directions for the three reasoning types in this study have pairwise cosine similarities near zero. The authors interpret this geometry as a missed opportunity for interaction: cognitive accounts describe deduction, induction, and abduction as distinct but complementary processes, while unconstrained alignment of their vectors could collapse their useful differences.

## Contributions

- Extracts reasoning-specific directions from contrastive successful and failed generations for deductive, inductive, and abductive tasks.
- Shows that adding each independently learned direction during generation improves its corresponding task over the unsteered model.
- Introduces a complementary refinement objective that aligns directions across reasoning types while constraining each direction to an SAE-derived reasoning subspace.
- Evaluates the intervention on three model families and under greedy and sampled decoding.
- Analyzes the refined directions through SAE feature changes, feature co-activation, attention-head patching, and token-span likelihood shifts.

## Method

For each reasoning type, the authors pair a stronger task prompt with a weaker prompt and retain examples where the stronger prompt succeeds while the weaker one fails. Residual-stream activations are averaged over generated tokens, and a linear probe separates successful from failed generations. Its weight vector becomes the initial reasoning direction. Steering adds the corresponding direction to every generated token after the prompt; layer 13 is used for Llama-3.1-8B-it and Gemma-2-9B-it.

Refinement jointly optimizes the three directions. A cosine-similarity loss encourages each direction to incorporate information from the other two. To prevent all directions from collapsing toward one shared vector, the method encodes positive and negative activations with pretrained SAEs, ranks latent features by their successful-to-failed activation ratio and magnitude, and converts selected decoder directions into orthonormal reasoning-specific bases through QR decomposition. A projection penalty keeps each refined direction near its own SAE-induced subspace. The full objective combines the original probe loss, complementary loss, and subspace constraint.

## Experiments

The deductive task is JustLogic, evaluated by accuracy; the inductive task is DEER, evaluated by the best METEOR score among the last three generated sentences; and the abductive task is ART, evaluated by accuracy. Experiments use Llama-3.1-8B-it, Gemma-2-9B-it, and the mixture-of-experts GPT-OSS-20B. The paper compares unsteered generation, mono steering with the independently extracted vector, and complementary steering with the refined vector under greedy decoding and Sampling@5.

Complementary steering is best in every model-task cell reported in the main table. Under greedy decoding, Llama-3.1-8B-it scores 56.46, 27.55, and 40.95 on deductive, inductive, and abductive reasoning, versus 55.22, 27.13, and 39.19 for mono steering and 48.95, 26.36, and 32.27 without steering. Gemma-2-9B-it reaches 59.05, 27.03, and 58.20, while GPT-OSS-20B reaches 58.43, 18.52, and 50.50. Sampling@5 preserves the same ordering across all nine cells. A sensitivity analysis over the two refinement-loss weights reports only small performance variation on Llama-3.1-8B-it.

The interpretability analyses suggest that refinement changes both shared and specialized structure. Top boosted SAE features for one reasoning type have descriptions resembling features associated with the other types. Across broader top-feature distributions, deductive-inductive co-activation rises from 0.600 to 0.655, while abductive-deductive and abductive-inductive similarities decline. Attention patching reports preserved core heads, more concentrated influential heads, and some newly salient heads after refinement. Likelihood-shift spans emphasize conclusion markers for deduction, generalization language for induction, and plausibility language for abduction.

## Limitations

- Evaluation covers one dataset for each of three reasoning types, so dataset effects are confounded with reasoning-type effects.
- The paper does not test other forms such as analogical or counterfactual reasoning, cross-domain transfer, or whether a vector learned on one benchmark transfers to another benchmark of the same reasoning type.
- Positive and negative activation sets depend on prompt pairs and on retaining only examples with the desired success-failure contrast; the resulting direction may partly encode prompt or dataset differences.
- Different tasks use different metrics, so scores and gains are not directly comparable across reasoning types.
- SAE feature descriptions and selected subspaces depend on the pretrained SAE, feature-selection thresholds, and interpretation tooling.
- The causal analyses localize changes under the authors' intervention and metrics, but do not establish a complete or unique circuit for logical reasoning.
- The supplied manuscript gives no publication year or stable identifier, so those metadata remain unset.

## Related Concepts

- [[concepts/reasoning-knowledge-vectors|Reasoning Knowledge Vectors]]
- [[concepts/model-steerability|Model Steerability]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/attribution-patching|Attribution Patching]]
- [[concepts/linear-probing|Linear Probing]]

## Related Papers

References discussed in the supplied paper:

- Rimsky et al. (2024), "Steering Llama 2 via Contrastive Activation Addition": supplies the contrastive activation-steering foundation.
- Zou et al. (2023), "Representation Engineering: A Top-Down Approach to AI Transparency": motivates linear concept directions in activation space.
- Venhoff et al. (2025), "Understanding Reasoning in Thinking Language Models via Steering Vectors": studies steering directions for more specific reasoning patterns.
- Heimersheim and Nanda (2024), "How to Use and Interpret Activation Patching": provides the causal tracing technique used in the analysis.

Related library reading, without implying citation by this paper:

- [[papers/truth-as-a-trajectory-what-internal-representations-reveal-about-large-language-model-reasoning|Truth as a Trajectory: What Internal Representations Reveal About Large Language Model Reasoning]]: replaces a single static direction with ordered residual-stream trajectories for reasoning-validity prediction.
- [[papers/manifold-steering-reveals-the-shared-geometry-of-neural-network-representation-and-behavior|Manifold Steering Reveals the Shared Geometry of Neural Network Representation and Behavior]]: examines nonlinear rather than linear representation steering.

[[index|Library home]]
