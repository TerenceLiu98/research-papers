---
title: "PsychAdapter: Adapting LLM Transformers to Reflect Traits, Personality and Mental Health"
type: paper
authors:
  - Huy Vu
  - Huy Anh Nguyen
  - Adithya V Ganesan
  - Swanie Juhng
  - Oscar N. E. Kjell
  - Joao Sedoc
  - Margaret L. Kern
  - Ryan L. Boyd
  - Lyle Ungar
  - H. Andrew Schwartz
  - Johannes C. Eichstaedt
year: 2025
source_job_id: "db2b27cb-840c-44cf-8c5c-06eeeff036e8"
tags:
  - controllable-generation
  - personality
  - mental-health
  - parameter-efficient-fine-tuning
  - computational-social-science
---

## TL;DR

PsychAdapter conditions autoregressive transformers on continuous psychological or demographic scores by projecting a trait vector into the hidden state of a dummy first token at nearly every layer. Adapters trained on score-labeled tweets and blog posts steer Gemma-2B, GPT-2 Large, and Llama3-8B toward intended Big Five, depression, life-satisfaction, and age levels with less than 0.1% added transformation parameters. Human and Claude-based evaluations find substantial alignment with intended levels, but the labels themselves come from language-based psychological estimators, and the evaluation establishes recognizable trait expression rather than psychological authenticity or safety.

## Research Question

Can a lightweight transformer modification learn empirically estimated trait-language associations and generate text under continuous, simultaneous control of personality, mental-health, and demographic variables without encoding those controls as prompt tokens?

## Motivation

General language models tend toward common language patterns, while personality-oriented prompting represents traits with discrete words or descriptions and consumes context. Earlier personalized generation also commonly uses categorical personas or recurrent architectures. The paper seeks a continuous control interface grounded in observed language-trait associations, allowing a generator to vary one or several psychological dimensions and to combine those controls with ordinary topical prompts.

## Contributions

- Introduces PsychAdapter, which projects a continuous trait vector separately at each transformer layer and uses the projected vector as the hidden state of a dummy first token.
- Builds message-level training pairs by applying participant-level language assessment models to tweets and blog posts, then reconstructing each message conditioned on its estimated scores.
- Demonstrates joint and fine-grained control over Big Five traits, depression, life satisfaction, and age, including mappings onto warmth and dominance in the interpersonal circumplex.
- Evaluates the method with expert personality psychologists and Claude 3.5 Sonnet, and tests transfer across Gemma-2B, GPT-2 Large, and Llama3-8B and across Twitter/X and blog text.

## Method

### Trait-conditioned transformer

For a trait vector $p$, PsychAdapter learns a layer-specific linear map $W_l^{trans}$ and computes $h_l = pW_l^{trans}$. The resulting vector replaces the hidden state of a dummy first token at each transformer layer except the last, allowing continuous controls to affect generation throughout the network. Given text $s_i$ and associated scores $\psi_i$, training maximizes the autoregressive likelihood $p(s_i\mid\psi_i)$.

The base model is adapted with LoRA while the original weights remain frozen. The projection alone adds 55,296 parameters to Gemma-2B, 552,960 to GPT-2 Large, and 393,216 to Llama3-8B, reported as less than 0.1% of each base model. Including LoRA, total trainable shares are 0.39%, 0.33%, and 0.26%, respectively.

### Constructing conditioning labels

The training corpus contains 500,000 sampled tweets and 681,288 blog posts. The blog data cover 19,320 authors, are concentrated in younger age groups, and are truncated to roughly the first 30 words; tweets come from a county-mapped U.S. corpus and lack participant metadata. Existing language-based assessment models estimate Big Five, depression, life satisfaction, or age scores for each message. For Big Five traits, a participant-level model based on 2,000 LDA topic features is applied at message level, making its predictions teacher labels rather than direct message-level survey measurements.

At generation time, normalized scores can be varied continuously. A single trait is isolated by setting it between $-3$ and $+3$ standard deviations while holding other dimensions at their means, or several dimensions can be varied together. Text prompts remain available to select a topic or life domain independently of the trait vector.

## Experiments

### Three-level recognition

Two blinded PhD-level personality psychologists classified groups of five generated messages as low, neutral, or high across ten trials per dimension. Averaged across Big Five dimensions, intended-level accuracy was 87.3%, compared with a 33.3% chance baseline, and rose to 91.0% with the prompt "I like to." Weighted inter-rater kappa was 0.76 overall, 0.67 without the prompt, and 0.85 with it. The paper reports 96.7% average human accuracy for depression and life satisfaction.

Claude 3.5 Sonnet produced judgments similar to the expert raters in the reported comparison and was then used for larger evaluations. This makes the scale-up practical, but its scores are automated semantic judgments rather than an independent psychological measurement; this is an instance of the validity concerns summarized by [[concepts/llm-as-a-judge|LLM-as-a-Judge]].

### Fine-grained and joint controls

The authors generate five levels per trait at $-3$, $-1.5$, $0$, $1.5$, and $3$ standard deviations, using ten samples at each level across ten random seeds. Claude annotations track the intended ordering, though adjacent high life-satisfaction levels are less distinguishable. Prompting improves separation for several Big Five extremes. Combined extraversion and agreeableness settings also produce language aligned with warmth-dominance regions of the interpersonal circumplex.

### Models and domains

On the three-level Claude evaluation, GPT-2 Large reaches 98.7% without a prompt and 89.3% with "I like to"; Llama3-8B reaches 97.3% and 92.0%; Gemma-2 reaches 98.7% and 88.0%. On the harder five-level evaluation, corresponding unprompted/prompted accuracies are 74.4%/73.2% for GPT-2, 67.6%/71.6% for Llama3, and 73.0%/77.0% for Gemma-2. Outputs trained on tweets and blogs also retain domain-specific differences in length and expression.

## Limitations

- Psychological conditioning values are estimated from language, not directly measured for each message. The generator can therefore reproduce the teacher model's lexical associations and errors without establishing that it models an author's underlying psychological state.
- Human and Claude evaluations test whether outputs are recognizable as intended levels. They do not establish construct validity, fidelity to individual people, or suitability for clinical use.
- Fine-grained accuracy is well below the three-level results, and high life-satisfaction levels are comparatively difficult to distinguish.
- The blog corpus is heavily concentrated in younger authors, and both source corpora represent online populations. Learned expressions may encode demographic, platform, temporal, and urban biases.
- Trait-conditioned language can amplify stereotypes or supply subtle group markers for targeted persuasion and misinformation. The paper discusses these risks but does not provide a mitigation evaluation.
- Evidence comes from three autoregressive model families and short social-media-style text. Generalization to longer discourse, other languages, current platforms, or downstream interaction is not demonstrated.

## Related Concepts

- [[concepts/model-steerability|Model Steerability]]: PsychAdapter steers generation through continuous internal control variables rather than only through prompt text.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: Claude supplies most annotations in the larger fine-grained and cross-model evaluations.
- [[concepts/semantic-associations-in-transformers|Semantic Associations in Transformers]]: layer-specific projections are motivated by the different kinds of information represented across transformer depth.

## Related Papers

- Hu et al. (2022), "LoRA: Low-Rank Adaptation of Large Language Models," supplies the parameter-efficient fine-tuning mechanism used alongside the trait projections.
- Jiang et al. (2023), "PersonaLLM: Investigating the Ability of Large Language Models to Express Personality Traits," represents the prompt-based personality control that PsychAdapter contrasts with continuous architectural conditioning.
- Mairesse and Walker (2011), "Controlling User Perceptions of Linguistic Style: Trainable Generation of Personality Traits," is an earlier data-driven approach to personality-conditioned generation.
- Park et al. (2015), "Automatic Personality Assessment through Social Media Language," motivates the language-based personality assessment used to construct conditioning labels.

[[index|Library home]]
