---
title: "Looping Back to Move Forward: Recursive Transformers for Efficient and Flexible Large Multimodal Models"
type: paper
authors:
  - Ruihan Xu
  - Yuting Gao
  - Lan Wang
  - Jianing Li
  - Weihao Chen
  - Qingpei Guo
  - Ming Yang
  - Shiliang Zhang
year: null
tags:
  - large-multimodal-models
  - recursive-transformers
  - adaptive-computation
  - parameter-sharing
  - multimodal-reasoning
---

## TL;DR

RecursiveVLM reuses one large multimodal Transformer across inference steps while inserting a modality-specific connector between passes. The connector normalizes and projects uniformly sampled hidden layers back into the input space; a token-level monotonic loss supervises every pass and penalizes regressions. On eight vision-language benchmarks, its general-instruction model raises mean accuracy from 55.31 for a non-recursive baseline to 58.86 after two passes, whereas direct hidden-state recursion reaches 50.15. The evidence supports two-pass refinement on the tested Ming-Lite-Omni setup, but not a general guarantee that more recursion always helps.

## Research Question

Can an LMM reuse the same backbone parameters for iterative refinement without the cross-pass feature mismatch and unreliable intermediate predictions produced by naive recursive Transformers?

## Motivation

Parameter sharing across depth can increase effective computation without increasing model size, but multimodal recursion has an additional interface problem. Deep visual and language states differ from input embeddings in scale and distribution, and the two modalities themselves follow different statistics. Feeding a final hidden state directly into the next pass therefore degrades the tested LMM. Fixed-depth training also leaves early outputs unreliable, limiting deployment under variable compute budgets.

## Contributions

- Introduces RecursiveVLM, which repeatedly applies an unchanged LMM backbone and constructs each new input through a learned Recursive Connector.
- Separates visual and textual connector parameters, combines states from uniformly spaced layers, and preserves the original input embeddings in every recursive update.
- Zero-initializes the connector's residual scales and MLP down-projections so the initial recursive model reproduces the pretrained backbone.
- Defines Monotonic Recursion Loss, which supervises every pass and multiplies a token's current loss by 1.5 when it exceeds the preceding pass's loss.
- Evaluates recursion depth, connector components, layer selection, modality-specific processing, and training objectives across eight multimodal benchmarks.

## Method

For each pass, RecursiveVLM runs the same 28-layer Ming-Lite-Omni Transformer. It samples layers 7, 14, 21, and 28 and splits each hidden state into visual and textual tokens. Separate per-modality connectors apply RMSNorm, an MLP, and a learnable scaled residual branch. Their outputs are summed with the original visual or textual embeddings, concatenated, and used as the next pass's input. This is a discrete parameter-sharing design related to [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]], although it repeats the whole backbone rather than replacing a phase with one tied block.

Training computes a language-modeling loss at every recursion step. From the second step onward, the objective upweights any token whose cross-entropy is worse than at the previous step, then sums losses over all steps. This encourages usable intermediate predictions and supports [[concepts/adaptive-computation|Adaptive Computation]] by exposing outputs at different pass budgets. It does not implement a learned stopping rule.

The model is continued-pretrained on 6 million multimodal and 3 million text-only examples. Supervised fine-tuning uses either Data1, with 9 million multimodal question-answer pairs and 3 million text instructions, or Data2, with 8 million long chain-of-thought examples and 2.6 million NLP instances. Training uses two recursion steps and $\beta=1.5$.

## Experiments

Evaluation covers AI2D, MMStar, MM-Vet, MMMU, MMBench, MathVista, OCRBench, and HallusionBench. Under Data1, the standard one-pass Transformer averages **55.31**. Vanilla recursion averages **50.66** at its first evaluation step and **50.15** at its second; adding RMSNorm reaches **51.64** and **50.10**. RecursiveVLM reaches **57.46** after one pass and **58.86** after two. Under reasoning-intensive Data2, the corresponding baseline is **58.60**, while RecursiveVLM reaches **59.52** and **62.60**.

Connector ablations show that RMSNorm alone improves substantially over direct recursion, while the complete RMSNorm, MLP, and zero-initialized scaled-residual connector performs best across the four reported benchmarks. Uniformly sampling layers 7, 14, 21, and 28 also outperforms using only layer 28, two layers, the first four layers, or the last four layers on the five reported metrics.

Modality-specific connectors improve AI2D from 73.19 to 74.64, MMStar from 49.80 to 52.10, MMBench from 71.05 to 76.63, and MathVista from 52.90 to 53.83 relative to shared parameters; MM-Vet instead changes from 60.18 to 59.95. Monotonic loss produces the strongest reported first- and second-pass results compared with final-step-only and ordinary per-step supervision.

Two passes give the best overall depth tradeoff in the reported sweep. A third pass lowers MMStar from 52.10 to 51.07 and MM-Vet from 59.95 to 55.14, leaves MMBench at 76.63, and raises MathVista from 53.83 to 54.07. HallusionBench rises from 37.56 at one pass to 38.69 at two and 45.12 at three, a result the authors identify as a direction for further study rather than a targeted hallucination experiment.

## Limitations

- The architecture is evaluated from one 16B-parameter omni-modal checkpoint, with 3B parameters activated per forward pass. Transfer to other LMM families and scales is untested.
- The supplied text names Data1 and Data2 only by purpose and size; it does not provide dataset composition details sufficient to assess contamination or reproduce the training mixture.
- Reusing parameters holds model size fixed but multiplies backbone computation. The paper does not report latency, energy, memory, or matched-compute comparisons, so deployment-efficiency claims remain incomplete.
- The training loss penalizes token-level regressions but does not mathematically guarantee monotonic benchmark accuracy or monotonic improvement beyond the trained depth. The three-pass sweep contains regressions on general benchmarks.
- Modality-independent connectors do not win every metric: the shared connector is slightly better on MM-Vet in the reported ablation.
- The hallucination-depth result comes from one benchmark without a targeted objective or causal analysis; it does not establish general hallucination suppression.
- The supplied Markdown states no publication year, venue, DOI, or arXiv identifier, so those metadata are left unspecified.

## Related Concepts

- [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]]: provides the broader parameter-sharing view of repeatedly applying Transformer computation while separating parameter count from evaluation cost.
- [[concepts/adaptive-computation|Adaptive Computation]]: RecursiveVLM exposes predictions at multiple pass budgets, although it does not learn when to halt.
- [[concepts/early-fusion-vision-language-models|Early Fusion Vision-Language Models]]: helps situate the joint processing of visual and language tokens whose different feature distributions motivate separate connector parameters.
- [[concepts/representational-functional-dissociation|Representational-Functional Dissociation]]: the paper uses CKA as a geometric diagnostic of mismatch between deep states and input embeddings, rather than as direct evidence of functional equivalence.

## Related Papers

- Bae et al. (2025), "Relaxed Recursive Transformers: Effective Parameter Sharing with Layer-wise LoRA": adds step-specific low-rank adapters to recursive language models.
- Bae et al. (2025), "Mixture-of-Recursions: Learning Dynamic Recursive Depths for Adaptive Token-Level Computation": routes language-model tokens through different recursion depths.
- Saunshi et al. (2025), "Reasoning with Latent Thoughts: On the Power of Looped Transformers": studies repeated latent computation and supplies a vanilla-recursion baseline.
- Zhu et al. (2025), "Scaling Latent Reasoning via Looped Language Models": studies looped language models with dynamic token-level computation.
- [[papers/recurrent-looped-transformer|Recurrent Looped Transformer]]: uses feedback across token positions rather than repeated full-backbone passes at the same position.

[[index|Library home]]
