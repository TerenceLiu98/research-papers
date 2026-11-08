---
title: Adaptive Computation
type: concept
aliases:
  - Adaptive Compute
tags:
  - adaptive-computation
  - recurrent-neural-networks
  - inference-efficiency
---

## Overview

Adaptive computation varies the amount of model processing across inputs. In recurrent architectures, internal iterations can refine a prediction independently of how many elements the input contains. A deployment rule decides when the available prediction is sufficient to stop.

## Key Ideas

- Early-exit classifiers and learned halting mechanisms are approaches to allocating computation. CTM's related work distinguishes these from selecting predictions using certainty across internal ticks.
- In [[papers/continuous-thought-machines|Continuous Thought Machines]], training averages losses at an example's minimum-loss and maximum-certainty ticks. Certainty is one minus normalized entropy. This objective permits useful predictions at different times without a separate halting module or a direct computation penalty.
- Ground-truth-dependent minimum loss is available during training; inference must use an observable criterion such as prediction certainty. A certainty threshold and maximum tick budget define an operational stopping rule.
- The CTM ImageNet analysis suggests that a threshold of 0.8 could stop most examples before 10 of 50 ticks. Fewer ticks alone do not establish wall-clock savings because per-tick cost, feature extraction, and execution overhead also matter.
- Additional computation can hurt an individual prediction. Calibration and the choice between instantaneous, most-certain, and averaged predictions must be assessed with the intended stopping procedure.
- [[papers/diffusion-as-a-training-curriculum-for-timestep-free-iterative-reasoning|Diffusion as a Training Curriculum for Timestep-Free Iterative Reasoning]] provides a different anytime mechanism: a shared timestep-free update improves with recurrent depth far beyond its training rollouts, and inference can stop after the decoded output remains stable for a patience window. Its strongest Sudoku result uses 10,000 steps, so accuracy scaling does not by itself establish compute efficiency.
- [[papers/looping-back-to-move-forward-recursive-transformers-for-efficient-and-flexible-large-multimodal-models|RecursiveVLM]] supervises every full-backbone pass and penalizes token losses that worsen relative to the preceding pass. This makes intermediate predictions useful at one- and two-pass budgets, but the model has no learned stopping rule and a third pass does not improve every benchmark.
- [[papers/loopvit-scaling-visual-arc-with-looped-transformers|LoopViT]] repeatedly applies a weight-tied vision core and stops when mean pixelwise predictive entropy falls below 0.05. This rule adds no halting parameters and improves the paper's reported accuracy-compute frontier over fixed-step variants, but low entropy is not a correctness guarantee and the evaluation does not report matched-hardware latency.
- [[papers/elt-elastic-looped-transformers-for-visual-generation|ELT]] uses [[concepts/intra-loop-self-distillation|Intra-Loop Self Distillation]] to make a visual generator usable at several recurrent depths. Its loop budget is selected externally rather than by an input-dependent halting rule, and quality can deteriorate beyond the trained depth range.
- [[papers/looped-language-models-improve-compositional-tool-calling|Looped Language Models Improve Compositional Tool Calling]] evaluates Ouro's learned per-token exit gate on BFCL and NESTful. Adaptive stopping matches or slightly exceeds the best fixed-depth operating point with fewer average recurrent iterations, although average depth is not a direct latency measurement.

## Important Papers

- Graves (2016), "Adaptive computation time for recurrent neural networks": explicit adaptive computation in recurrent models, cited as reference 18 in CTM.
- Banino, Balaguer, and Blundell (2021), "Pondernet: Learning to ponder": learned halting, cited as reference 17 in CTM.
- [[papers/continuous-thought-machines|Continuous Thought Machines]]: internal dynamics and certainty-based prediction selection, with ImageNet early-stopping analysis (Sections 3.5 and 5.1; Appendix E.3).
- [[papers/diffusion-as-a-training-curriculum-for-timestep-free-iterative-reasoning|Diffusion as a Training Curriculum for Timestep-Free Iterative Reasoning]]: timestep-free recurrence with a persistent hidden state and stability-based stopping on structured reasoning tasks.
- [[papers/looping-back-to-move-forward-recursive-transformers-for-efficient-and-flexible-large-multimodal-models|Looping Back to Move Forward]]: full-backbone multimodal recursion with stepwise supervision and outputs at different pass budgets.
- [[papers/loopvit-scaling-visual-arc-with-looped-transformers|LoopViT: Scaling Visual ARC with Looped Transformers]]: entropy-based early exit for a weight-tied hybrid Vision Transformer on ARC-AGI.
- [[papers/elt-elastic-looped-transformers-for-visual-generation|ELT: Elastic Looped Transformers for Visual Generation]]: variable-loop image and video generation from one weight-shared checkpoint, with intermediate depths trained by self-distillation.
- [[papers/looped-language-models-improve-compositional-tool-calling|Looped Language Models Improve Compositional Tool Calling]]: learned token-level stopping for independent multi-call and dependency-aware tool workflows.

## Related Concepts

- [[concepts/neural-synchronization-representations|Neural Synchronization Representations]]: CTM uses temporal pairwise activity to construct predictions and attention queries across internal ticks.
- [[concepts/diffusion-models|Diffusion Models]]: ordered corruption can provide local supervision for an iterative solver even when annealing is unnecessary at inference.
- [[concepts/compositional-tool-calling|Compositional Tool Calling]]: adaptive recurrent depth can allocate more refinement to structured tool-call generation when needed.
