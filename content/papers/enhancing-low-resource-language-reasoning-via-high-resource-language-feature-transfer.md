---
title: "Enhancing Low-Resource Language Reasoning via High-Resource Language Feature Transfer"
type: paper
authors:
  - Minju Song
  - Hyeon Hwang
  - Junhyun Lee
  - Jaewoo Kang
year: null
source_job_id: "8c19a414-6e1d-43d4-a551-6b858b27576a"
tags:
  - multilingual-reasoning
  - sparse-autoencoders
  - activation-steering
  - mechanistic-interpretability
  - low-resource-languages
---

## TL;DR

The paper tests whether multilingual reasoning gaps partly arise because low-resource-language prompts under-activate computations that a model already uses in high-resource languages. It selects [[concepts/sparse-autoencoders|Sparse Autoencoder]] features that occur in successful high-resource-language traces but not in paired low-resource-language failures, then adds their decoder directions during target-language generation. Across two models, three benchmarks, and four target languages, the reported intervention closes an average 25–33% of the reference-language gap while largely preserving the output language. Activation, suppression, and control interventions support functional involvement, but the feature discovery procedure uses benchmark correctness labels and the evidence remains model-, task-, and SAE-dependent.

## Research Question

Can sparse latent features associated with successful reasoning in a high-resource language be identified and causally reused to improve the same model's reasoning in a low-resource language without translation, fine-tuning, or changing the response language?

## Motivation

Multilingual language models often solve semantically equivalent problems more accurately in high-resource languages. Data imbalance explains part of this disparity, but final-answer comparisons do not reveal whether a low-resource prompt fails to elicit an internal computation that the trained model already possesses. The paper turns that possibility into an intervention question: identify features associated with high-resource-language success, activate them during low-resource-language inference, and test the same features with source-side suppression and matched controls.

## Contributions

- Introduces [[concepts/cross-lingual-feature-steering|Cross-Lingual Feature Steering]], a contrastive procedure that extracts candidate reasoning features from paired reference-correct and target-incorrect traces.
- Builds a steering vector from high-resource versus low-resource mean activations of the selected SAE features and injects it only during generation.
- Separates observational feature discovery from causal evaluation through target-side activation, reference-side suppression, random and excluded-feature controls, and sign reversal.
- Evaluates Gemma-2-9B-it and Qwen2.5-7B-Instruct on MATH500, MGSM, and the psychology subset of MMLU-ProX across English or Spanish references and Korean, Thai, Swahili, or Vietnamese targets.
- Inspects English–Korean features and reports that 25 of 28 selected features activate in both languages, including latents associated with quantity, requirement, aggregation, rate, and equality.

## Method

For a reference language $b$ and target language $a$, the method first keeps paired problems that the model answers correctly in $b$ and incorrectly in $a$. At each generated token, it records the maximally active SAE feature. A candidate survives only if it occurs in at least one reference trace and in no paired target trace. Candidates are ranked by reference-side response frequency; the implementation discards the top 50% and retains features between the 50th and 90th percentiles to reduce generic generation features.

For each selected feature $f$, the steering coefficient is the difference between its mean activation over correct reference- and target-language traces:

$$
w_f=\bar z_f^{(b)}-\bar z_f^{(a)}.
$$

At each generation step, the layer-20 residual stream receives

$$
\Delta h=\alpha\sum_{f\in\mathcal C}w_f W_{\mathrm{dec}}[f],
$$

where $W_{\mathrm{dec}}[f]$ is the selected feature's SAE decoder direction. Prompt-prefill activations are unchanged. The authors describe improvement under activation as partial sufficiency, degradation under suppression as functional necessity on the evaluated distribution, and divergence from matched controls as specificity; they explicitly do not claim logical necessity, logical sufficiency, or a formal natural indirect effect.

## Experiments

Gemma-2-9B-it uses the 16,384-feature layer-20 Gemma Scope JumpReLU SAE, while Qwen2.5-7B-Instruct uses a 65,536-feature layer-20 Matryoshka JumpReLU SAE. The study evaluates 311 MATH500 problems, 250 MGSM problems, and 798 MMLU-ProX psychology questions with native-language chain-of-thought prompts and greedy decoding.

Steering improves every target-language cell in the main result table. Recovery varies substantially by model, benchmark, language pair, and reference language: examples include 42% of the English-to-Korean MATH500 gap for Gemma, 36% of the English-to-Thai MGSM gap for Gemma, and 35% of the English-to-Vietnamese MMLU-ProX gap for Qwen. The paper summarizes recovery as 25–33% when aggregated over the four Gemma MATH500/MGSM reference settings.

On English-reference MATH500 with Gemma, top-frequency features, a negative steering vector, and random steering do not reproduce the selected set's consistent gains. Suppressing each pair-specific selected set during English inference reduces accuracy from 56.91% to 54.02%, 50.16%, or 52.09%, depending on the target language used to construct the set; matched random suppression yields 55.16–55.52%. Random positive steering is not uniformly worse, however: it reaches 52.30% on Vietnamese, slightly above the proposed method's 51.77%, so the specificity evidence is about the overall pattern rather than universal per-cell dominance.

Automatic language identification shows an average absolute segment-level change of 0.8 percentage points, with changes below 1.5 points in 37 of 40 settings. There are notable exceptions for Spanish-referenced Gemma steering on Vietnamese and Thai MATH500, where target-language proportions decline. Layer tests on Gemma MGSM find gains at several intervention layers, with layer 20 strongest overall. On unseen Bengali and Telugu MGSM targets, pair-specific features improve Gemma accuracy from 75.6% to 81.2% and from 74.4% to 75.6%; reusing English-to-Korean or English-to-Thai features gives smaller gains. The SAE method also exceeds Contrastive Activation Addition in 11 of 12 reported Gemma MATH500/MGSM comparisons.

## Limitations

- The evaluation covers two instruction-tuned models, three benchmarks, and mainly mathematical reasoning plus one psychology subset; other architectures, scales, domains, and extremely low-resource languages remain untested.
- Feature discovery depends on labeled benchmark correctness and paired reference/target traces, even though inference itself requires neither training nor translation.
- Both feature identity and steering effectiveness depend on pretrained SAEs at a chosen residual-stream layer. Polysemantic, missing, or poorly trained features can limit the method.
- Most experiments transfer features across languages within the same task. Cross-task transfer is not established.
- The causal claims concern interventions in a fixed model on the evaluated distributions. They do not identify a unique reasoning mechanism or establish counterfactual necessity and sufficiency.
- Target-language preservation is strong on average but has several larger regressions, and one random-steering control outperforms the proposed intervention in an individual result cell.
- The supplied Markdown states neither a stable paper identifier nor a publication year, so those metadata are not asserted here.

## Related Concepts

- [[concepts/cross-lingual-feature-steering|Cross-Lingual Feature Steering]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/model-steerability|Model Steerability]]
- [[concepts/latent-reasoning|Latent Reasoning]]
- [[concepts/reasoning-knowledge-vectors|Reasoning Knowledge Vectors]]

## Related Papers

- [[papers/large-reasoning-models-are-not-yet-multilingual-latent-reasoners|Large Reasoning Models Are (Not Yet) Multilingual Latent Reasoners]]: diagnoses multilingual differences in latent answer formation but does not introduce a causal transfer intervention.
- [[papers/knowledge-vector-of-logical-reasoning-in-large-language-models|Knowledge Vector of Logical Reasoning in Large Language Models]]: intervenes on activation directions associated with reasoning behavior, but does not select sparse features through paired cross-lingual successes and failures.
- [[papers/interpretable-and-steerable-concept-bottleneck-sparse-autoencoders|Interpretable and Steerable Concept Bottleneck Sparse Autoencoders]]: separates feature interpretability from causal steerability and modifies SAE representations for more reliable concept control.
- [[papers/manifold-steering-reveals-the-shared-geometry-of-neural-network-representation-and-behavior|Manifold Steering Reveals the Shared Geometry of Neural Network Representation and Behavior]]: studies geometry-aware activation interventions rather than language-conditioned sparse feature transfer.

[[index|Library home]]
