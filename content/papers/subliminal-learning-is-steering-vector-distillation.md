---
title: "Subliminal Learning Is Steering Vector Distillation"
type: paper
authors:
  - Camila Blank
  - Agam Bhatia
  - Senthooran Rajamanoharan
  - Arthur Conmy
  - Neel Nanda
year: 2026
source_job_id: "03ccc5b6-a744-41d4-a4ec-f6eacebdf9f8"
tags:
  - subliminal-learning
  - steering-vectors
  - knowledge-distillation
  - mechanistic-interpretability
  - low-rank-adaptation
---

## TL;DR

The paper argues that [[concepts/subliminal-learning|Subliminal Learning]] is a special case of [[concepts/steering-vector-distillation|Steering Vector Distillation]]. A trait-inducing system prompt shifts a teacher model along a residual-stream direction; fine-tuning a same-model student on the teacher's semantically unrelated outputs installs an aligned direction. Necessity and sufficiency interventions support this account across number sequences, code, and paraphrased text. General vector distillation also occurs for random directions, but behavioral trait transfer requires a semantically effective vector and is strongest with low-rank training and adaptive optimization in the tested language models.

## Research Question

How can semantically unrelated teacher outputs transmit a specific behavioral trait to a student model, and what explains why transfer depends on the trait, model family, training parameterization, and optimizer?

## Motivation

Prior work found that a teacher prompted to prefer an animal could generate filtered number sequences that made a fine-tuned student acquire the same preference. Token entanglement and divergence-token analyses locate signals in the generated data, but do not explain how fine-tuning reconstructs a semantic behavior from those signals. The paper tests whether one activation-space direction links the prompted teacher, its outputs, and the trained student's behavior.

## Contributions

- Defines teacher and student residual-stream shifts and tracks their alignment with empirical activation similarity (EAS).
- Uses activation interventions to test whether the teacher and student directions are necessary and sufficient for the observed behavioral transfer.
- Generalizes the mechanism from prompted traits to semantic, weak-semantic, random, and sparse-autoencoder steering directions.
- Connects trait transferability to inference-time steerability and connects failed cross-model transfer to model-specific effects of activation directions.
- Provides evidence that the relevant gradient signal is weak and that adaptive per-parameter scaling prevents a small set of large gradients from dominating LoRA updates.

## Method

### Teacher and Student Directions

For prompts $x$ from training distribution $\mathcal D$, the teacher direction is the mean activation difference between trait and neutral system prompts in the reference model:

$$
v_{\mathrm{teacher}}=\mathbb E_{x\sim\mathcal D}[h_{\mathrm{reference}}(s_{\mathrm{trait}}\oplus x)-h_{\mathrm{reference}}(s_{\mathrm{neutral}}\oplus x)].
$$

The student direction is the mean difference between the fine-tuned student and its reference model under the neutral prompt:

$$
v_{\mathrm{student}}=\mathbb E_{x\sim\mathcal D}[h_{\mathrm{student}}(s_{\mathrm{neutral}}\oplus x)-h_{\mathrm{reference}}(s_{\mathrm{neutral}}\oplus x)].
$$

EAS is the cosine similarity between $v_{\mathrm{teacher}}$ and the student's mean activation shift at a training checkpoint. The main classical setup uses Qwen2.5-7B-Instruct or Gemma-3-4B-it, 10,000 filtered teacher examples, and rank-8 LoRA with scaling factor 32.

### Causal Interventions

To test sufficiency, the authors add an extracted vector to reference-model activations and measure target-trait expression. To test necessity, they remove the teacher direction during data generation or replace the student's component along its learned direction with the reference model's component. These interventions are evaluated separately because alignment alone would not show that the direction mediates behavior.

### General Steering Vector Distillation

Teachers are also constructed by directly steering the reference model with difference-of-means semantic vectors, weak semantic vectors, random vectors, or randomly selected SAE decoder directions. Students train on 100,000 steered number completions. Behavioral shift, cross-entropy on steered completions, activation-difference cosine similarity, and EAS distinguish internal vector acquisition from semantic trait expression.

## Experiments

### Mediation and Robustness

During student training, EAS rises while neutral-data controls remain near 0.1. Steering with $v_{\mathrm{student}}$ raises trait expression, while replacing its student-specific component removes more than half of the trait-aligned behavior. Removing $v_{\mathrm{teacher}}$ during teacher generation nearly eliminates transfer; using the vector without the trait system prompt induces it. The same qualitative necessity-and-sufficiency pattern appears with code, paraphrased Alpaca data, five alternative LoRA configurations, and a fine-tuned rather than prompted teacher.

### Trait and Model Specificity

Across Qwen2.5-7B-Instruct, Llama-3.1-8B-Instruct, and OLMo-3-7B-Instruct, traits that cannot be induced by their extracted direction at inference time generally are not learned subliminally. Cross-family directions are less reliable at reducing loss on another model's trait-conditioned generations, whereas transfer remains positive between OLMo Instruct and Think variants. This supports, but does not isolate, a role for model-specific non-semantic effects.

### Vector Distillation Beyond Subliminal Traits

Students learn all tested steering directions according to activation alignment and loss on steered sequences, including random and semantically weak vectors. Only semantically effective directions reliably change student behavior. Full fine-tuning still produces weaker vector distillation, with EAS above 0.3 for the reported traits, but does not yield trait affinity above the reference baseline in the classical three-model comparison.

### Optimization Mechanism

Teacher-versus-clean activation-gradient differences have a small positive component along $v_{\mathrm{teacher}}$. In the tested LoRA setting, Adam and RMSProp transmit the behavioral preference while plain SGD and momentum SGD do not. Frozen Adam-derived per-parameter scales recover the effect, and scale ablations indicate that suppressing a small set of outsized gradients is important. A loss-matched comparison still leaves SGD without the effect, so final training loss alone does not explain the optimizer difference.

As an additional carrier test, applying $v_{\mathrm{teacher}}$ at the assistant tag reduces negative log-likelihood per token on the teacher's number completions from 0.7273 to 0.6823, closing about 32% of the gap to scoring with the actual cat system prompt.

## Limitations

- The causal evidence identifies a mediating direction under selected extraction layers, token positions, and steering strengths; it does not show that the direction is unique or that all effects of the prompt and fine-tuning are one-dimensional.
- Trait prediction is evaluated mainly through prompted preferences and personas. Semantic filtering and autoraters reduce obvious leakage but cannot prove the absence of every human-interpretable correlation in generated data.
- Cross-model evidence covers a small set of open models. Weaker cross-family loss reduction supports model specificity but does not fully explain which representational differences prevent transfer.
- The optimizer account is preliminary. Gradient alignment is measured at activations, while the proposed dominance mechanism concerns LoRA parameter gradients and adaptive coordinate scaling.
- Behavioral subliminal learning and internal vector distillation must be separated: random vectors can be distilled without semantic behavior, and full fine-tuning exhibits weaker activation alignment without the classical preference-transfer effect.
- Reported intervention settings are selected per model and experiment. Their effectiveness does not establish a universal layer, scale, or token-position prescription.

## Related Concepts

- [[concepts/subliminal-learning|Subliminal Learning]]
- [[concepts/steering-vector-distillation|Steering Vector Distillation]]
- [[concepts/model-steerability|Model Steerability]]
- [[concepts/knowledge-distillation|Knowledge Distillation]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]

## Related Papers

- Cloud et al. (2025), "Subliminal Learning: Language Models Transmit Behavioral Traits via Hidden Signals in Data": establishes the teacher-student phenomenon analyzed here.
- Zur et al. (2025), "Token Entanglement in Subliminal Learning": proposes token entanglement as a source of hidden signal.
- Schrodi et al. (2026), "Towards Understanding Subliminal Learning: When and How Hidden Biases Transfer": localizes signal to divergence tokens after controlling for entangled tokens.
- Turner et al. (2023), "Steering Language Models with Activation Engineering": provides the activation-addition framework used to interpret and intervene on residual-stream directions.
- Panickssery et al. (2023), "Steering Llama 2 via Contrastive Activation Addition": develops contrastive difference-of-means steering vectors.

## Source

Processed from the complete supplied Markdown for Cognitio job `03ccc5b6-a744-41d4-a4ec-f6eacebdf9f8`. The manuscript provides code at [agu18dec/steering-vector-distillation](https://github.com/agu18dec/steering-vector-distillation); availability was not independently checked.

[[index|Library home]]
