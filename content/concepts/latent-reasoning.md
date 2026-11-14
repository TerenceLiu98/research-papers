---
title: Latent Reasoning
type: concept
aliases:
  - Implicit Reasoning
  - Latent Chain-of-Thought
tags:
  - large-language-models
  - reasoning
  - chain-of-thought
  - mechanistic-interpretability
---

## Overview

Latent reasoning is task-relevant computation carried by a model's hidden representations rather than fully expressed as intermediate natural-language steps. Evidence for it can include correct predictions recoverable before an explicit reasoning trace states the answer, intermediate representations that increasingly favor the correct solution, or successful computation through non-semantic latent tokens. It is broader than any single architecture: some work diagnoses latent computation in ordinary autoregressive models, while other work trains models to reason directly in continuous or recurrent latent spaces.

## Key Ideas

- **Iterative refinement benefits from intermediate supervision.** SpiralThinker aligns prefix-conditioned latent-step summaries with an explicit teacher across iterations, emphasizing later updates. Its ablations show that iteration alone can reduce accuracy; fewer textual tokens also need not mean fewer forward passes.

- **Behavioral evidence is indirect.** Producing a correct answer from a short or empty reasoning trace is consistent with latent computation, but it can also reflect memorization, shortcuts, or answer leakage. Controlled perturbations and trace inspection help separate these explanations.
- **Reasoning-trace truncation localizes answer availability.** A model is asked for an answer after progressively longer prefixes of its original trace. Accuracy that rises before the gold answer is written suggests that explicit text is not the sole carrier of computation.
- **Explicit and latent reasoning can coexist.** Hidden states may accumulate partial evidence while generated text externalizes, revises, or validates it. A model can also state the answer early and continue generating, so early correctness alone does not imply hidden-only reasoning.
- **Internal probes require caution.** Logit or tuned lenses decode intermediate states into token distributions, and similarity measures compare representational trajectories. Both can reveal relative dynamics without proving a unique causal algorithm or a human-interpretable internal language.
- **Difficulty and model capacity matter.** Latent answer signals may emerge on short or familiar tasks but disappear when a problem requires extended computation. Larger models can make such signals easier to observe without eliminating language or task disparities.
- **Discrete latent traces offer a controllable middle ground.** A model can generate a bounded sequence from a reserved nonverbal vocabulary before answering. Unlike continuous hidden-state methods, this preserves an explicit token-level interface for budget control and perturbation tests, but token sequences are not automatically interpretable.
- **Reconstruction targets shape compressed reasoning traces.** A discrete latent sequence learned by reconstructing a spatial rendering can emphasize step layout and dependencies instead of exact wording. Hybrid methods can pair that global representation with a small number of explicit, low-confidence textual steps, although reconstruction evidence alone does not identify the model's internal reasoning mechanism.
- **Multilingual behavior tests universality.** Similar layer-wise trajectories across languages can coexist with unequal accuracy and unequal alignment to English. Shared geometry does not by itself establish language-independent reasoning, while English alignment does not prove that the model literally translates every problem internally.
- **Local objectives can organize recurrent computation.** [[papers/thinking-with-looped-flows|Thinking with Looped Flows]] orders denoising problems from high to low noise and carries hidden features between them while stopping gradients across steps. The visible probability-flow state and recurrent state then evolve together at inference, providing separate channels for probabilistic transport and accumulated computation.
- **Latent thoughts need behavioral requirements beyond answer accuracy.** [[papers/what-matters-for-latent-reasoning-with-flow-matching|What Matters for Latent Reasoning with Flow Matching]] tests whether thoughts are causally useful, diverse under resampling, decodable and faithful, refinable with more compute, and efficient relative to explicit CoT. Its interventions also show that decodability and answer control remain incomplete.
- **Generatable codes differ from reconstructible codes.** FLaRe compresses symbolic CoTs into a corrupted VAE space and trains a conditional flow mostly near noise. Its ablations find that larger, more exactly reconstructible codes can be harder for a flow to generate, while training the reader on the model's imperfect endpoints reduces the train-inference mismatch.
- **Latent recurrence can refine actions as well as answers.** [[papers/looped-language-models-improve-compositional-tool-calling|Looped Language Models Improve Compositional Tool Calling]] varies recurrent depth while holding model parameters fixed and reports the clearest gains on multi-call and dependency-aware workflows. Its qualitative examples show corrections to functions, arguments, call structure, and intermediate references, without identifying the internal algorithm that produces those corrections.

## Important Papers

- [[papers/imgcot-compressing-long-chain-of-thought-into-compact-visual-tokens-for-efficient-reasoning-of-large-language-model|ImgCoT: Compressing Long Chain of Thought into Compact Visual Tokens for Efficient Reasoning of Large Language Model]]: compresses structured visual renderings of rationales into discrete tokens and optionally retains low-likelihood textual steps.
- [[papers/thinking-without-words-efficient-latent-reasoning-with-abstract-chain-of-thought|Thinking Without Words: Efficient Latent Reasoning with Abstract Chain-of-Thought]]: trains a reserved discrete codebook through a verbal-rationale bottleneck, self-distillation, and warm-started reinforcement learning.
- [[papers/soft-token-alignment-for-cross-lingual-reasoning|Soft Token Alignment for Cross-Lingual Reasoning]]: repurposes probability-weighted vocabulary embeddings as an auxiliary cross-lingual alignment signal during supervised fine-tuning.
- [[papers/large-reasoning-models-are-not-yet-multilingual-latent-reasoners|Large Reasoning Models Are (Not Yet) Multilingual Latent Reasoners]]: measures answer emergence under trace truncation across 11 languages and compares cross-language hidden-state trajectories.
- Lanham et al. (2023), "Measuring Faithfulness in Chain-of-Thought Reasoning": evaluates whether generated reasoning causally relates to model answers.
- Pfau, Merrill, and Bowman (2024), "Let's Think Dot by Dot: Hidden Computation in Transformer Language Models": shows that transformers can use filler tokens as a computational medium.
- Yang et al. (2024), "Do Large Language Models Latently Perform Multi-Hop Reasoning?": probes whether intermediate factual answers are represented internally.
- Hao et al. (2025), "Training Large Language Models to Reason in a Continuous Latent Space": trains recurrent latent computation rather than requiring every step to be verbalized.
- [[papers/thinking-with-looped-flows|Thinking with Looped Flows]]: trains recurrent hidden states through temporally aligned local denoising losses and scales structured reasoning with additional flow-integration steps.
- [[papers/what-matters-for-latent-reasoning-with-flow-matching|What Matters for Latent Reasoning with Flow Matching]]: develops FLaRe and evaluates latent thoughts through causal, diversity, decoding, refinement, and efficiency probes.
- [[papers/looped-language-models-improve-compositional-tool-calling|Looped Language Models Improve Compositional Tool Calling]]: tests recurrent latent refinement on API grounding, independent multi-call generation, and nested tool workflows.

## Related Concepts

- [[concepts/soft-token-alignment|Soft Token Alignment]]
- Chain-of-thought reasoning
- Mechanistic interpretability
- Logit lens and tuned lens
- Test-time computation
- Recurrent depth
- [[concepts/flow-matching|Flow Matching]]
- [[concepts/compositional-tool-calling|Compositional Tool Calling]]
- Benchmark contamination
