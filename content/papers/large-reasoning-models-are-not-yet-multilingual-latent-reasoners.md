---
title: "Large Reasoning Models Are (Not Yet) Multilingual Latent Reasoners"
type: paper
authors:
  - Yihong Liu
  - Raoyuan Zhao
  - Hinrich Schütze
  - Michael A. Hedderich
year: null
tags:
  - latent-reasoning
  - multilingual-reasoning
  - chain-of-thought
  - mechanistic-interpretability
  - mathematical-reasoning
---

## TL;DR

Across 11 languages, large reasoning models can often predict answers before their explicit reasoning traces reveal them, but this [[concepts/latent-reasoning|Latent Reasoning]] signal is strongest for high-resource languages and easier mathematics. Reasoning-trace truncation, intermediate-layer decoding, and hidden-state comparisons indicate broadly shared cross-language dynamics with stronger English alignment in high-resource languages. The evidence is diagnostic and model-specific: difficult AIME problems largely suppress early correct predictions, low-resource languages lag, and the probes do not establish a language-independent reasoning mechanism.

## Research Question

Do large reasoning models form correct answers internally before verbalizing them across multiple languages, and do different languages follow distinct internal reasoning pathways or a shared one?

## Motivation

Explicit chain-of-thought quality and task accuracy vary sharply by language, while most prior work on hidden or implicit computation studies English. Comparing only final answers cannot show when a solution becomes available internally or whether cross-language performance gaps reflect different computational trajectories. This paper therefore connects partial reasoning traces to answer accuracy and examines how answer evidence evolves through model layers.

## Contributions

- Evaluates multilingual latent reasoning across 11 languages, three DeepSeek-R1-Distill-Qwen sizes, and two mathematical benchmarks with different difficulty.
- Introduces aggregate truncation measures: area under the truncation accuracy curve (AUTC), area under the gold-in-trace curve (AUGC), and a latent reasoning score (LRS) that discounts correctness after the gold answer appears explicitly.
- Uses a logit lens and cross-language hidden-state cosine similarity to compare layer-wise answer formation and representational alignment.
- Tests whether the main behavioral pattern generalizes beyond distilled models and probes memorization with number edits and meaning-preserving paraphrases.

## Method

The study generates a target-language reasoning trace for each problem, truncates it at multiple step-level ratios, and prompts the same model to return only a numerical answer from the problem and visible prefix. For pass@$k$ accuracy $a_k(r)$ and the gold-in-trace rate $g_k(r)$ at retained fraction $r$, it summarizes behavior as

$$
\mathrm{AUTC}_k=\int_0^1 a_k(r)\,dr,\qquad
\mathrm{AUGC}_k=\int_0^1 g_k(r)\,dr,
$$

and

$$
\mathrm{LRS}_k=\int_0^1 a_k(r)(1-g_k(r))\,dr.
$$

High early accuracy with low gold-in-trace is treated as evidence that the answer is available before its explicit articulation. The integrals are approximated by the trapezoidal rule. A causal decomposition also separates newly correct predictions according to whether the gold answer first appears in the newly exposed steps, was already visible, or remains absent.

For internal dynamics, the logit lens projects residual-stream states through layer normalization and the unembedding matrix, then tracks the gold answer's rank across layers. Cosine similarity compares the final-token hidden state of each truncated target-language trace with the corresponding English trace across layers and reasoning steps. Correct and incorrect MGSM cases are separated to test whether English alignment merely follows successful answers.

## Experiments

### Setup

The main models are DeepSeek-R1-Distill-Qwen-7B, 14B, and 32B. MGSM supplies 250 parallel grade-school problems in English and ten translations; translated AIME 2024 and 2025 problems provide a harder competition-level benchmark in the same 11 languages. The authors group English, Spanish, German, French, Russian, and Chinese as high-resource; Bengali, Japanese, and Thai as mid-resource; and Swahili and Telugu as low-resource. Language-specific prompt prefixes constrain the explicit trace and final-answer elicitation to the target language.

### Truncation results

On MGSM, correctness frequently precedes explicit answer articulation. For English, R1-Qwen-7B has AUTC 0.52 and LRS 0.38; R1-Qwen-32B reaches 0.75 and 0.53. The corresponding 32B LRS values are 0.30 for both Swahili and Telugu, showing improvement with scale without closing the resource gap. Early and intermediate accuracy gains are commonly dominated by cases where the gold answer is still absent from the visible trace.

Task difficulty changes the pattern substantially. On multilingual AIME, English LRS is 0.03, 0.04, and 0.06 for the 7B, 14B, and 32B models, respectively, and most languages are at or below 0.04. The authors therefore characterize latent reasoning as observable but fragile rather than a general substitute for explicit multi-step computation.

### Internal dynamics

Gold-answer rank trajectories have similar shapes across languages within a model, although their accuracy differs. Hidden states from high-resource languages are more similar to English than those from mid- and low-resource languages. For high-resource languages, English alignment changes relatively little between correct and incorrect cases; for some mid-resource languages it is stronger on correct cases. These observations motivate an English-centered pathway interpretation, but cosine similarity alone does not identify a causal mechanism or prove that reasoning occurs in English.

### Post-training and memorization checks

Qwen2.5-32B-Instruct and RL-trained Nemotron-32B preserve multilingual asymmetry. Nemotron has high AUTC but also high AUGC and low LRS, consistent with early explicit answer articulation followed by additional reasoning rather than stronger hidden-only computation.

For zero-trace MGSM cases already solved under pass@10, changing one number leaves the original answer in roughly 30% of outputs in many settings, indicating partial memorization. Allowing a new trace usually lowers this match rate. Meaning-preserving paraphrases retain substantially higher accuracy, especially with a generated trace and larger models. These tests argue against pure surface-form recall, but they do not exclude contamination or memorization as contributors.

## Limitations

Truncation occurs at reasoning-step rather than token granularity. Gold-in-trace uses string matching and can count an unrelated intermediate number as the answer. The experiments cover mathematical tasks and models no larger than 32B, so the conclusions may not transfer to other reasoning domains or scales. Language-resource groupings are coarse, language-control prompts may affect behavior, and logit-lens projections and cosine similarity are descriptive probes rather than faithful decoders of computation. The paper is diagnostic and proposes no new inference method.

The supplied Markdown does not state a stable paper identifier or publication year; these metadata are left unasserted.

## Related Concepts

- [[concepts/latent-reasoning|Latent Reasoning]]
- Chain-of-thought reasoning
- Logit lens
- Multilingual reasoning
- Test-time scaling
- Benchmark contamination

## Related Papers

The following works are cited by the supplied paper; no matching Paper pages were found in the library.

- Lanham et al. (2023), "Measuring faithfulness in chain-of-thought reasoning": motivates testing whether explicit reasoning reflects the computation producing an answer.
- Pfau, Merrill, and Bowman (2024), "Let's Think Dot by Dot: Hidden Computation in Transformer Language Models": demonstrates computation through non-semantic intermediate tokens.
- Yang et al. (2024), "Do Large Language Models Latently Perform Multi-Hop Reasoning?": studies latent intermediate computation in factual recall.
- Mao et al. (2025), "Early Stopping Chain-of-Thoughts in Large Language Models": closely related stepwise answer prediction and early stopping.
- Wendler et al. (2024), "Do Llamas Work in English? On the Latent Language of Multilingual Transformers": examines English-centered representations in multilingual models.
- Qi et al. (2025), "When Models Reason in Your Language: Controlling Thinking Language Comes at the Cost of Accuracy": provides multilingual reasoning-language controls used by this study.

[[index|Library home]]
