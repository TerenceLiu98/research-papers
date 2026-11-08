---
title: "LoopViT: Scaling Visual ARC with Looped Transformers"
type: paper
authors:
  - Wen-Jie Shu
  - Xuerui Qiu
  - Rui-Jie Zhu
  - Harold Haodong Chen
  - Yexin Liu
  - Harry Yang
year: null
source_job_id: "97d11984-81fc-4b03-8d74-98aed17b0cab"
tags:
  - visual-reasoning
  - recurrent-transformers
  - adaptive-computation
  - arc-agi
  - vision-transformers
---

## TL;DR

LoopViT applies a weight-tied hybrid Vision Transformer core repeatedly to ARC grids, separating reasoning depth from parameter count, and exits when mean pixelwise predictive entropy falls below a fixed threshold. The reported 18M-parameter model reaches 65.8% pass@2 on ARC-AGI-1 and 14.2% on ARC-AGI-2; its 3.8M-parameter variant reaches 60.1% on ARC-AGI-1, compared with 54.5% for the cited 18M-parameter feed-forward VARC baseline. Ablations support both recurrent depth and the convolution-attention hybrid, while dynamic exit improves the reported accuracy-compute trade-off over fixed-step variants.

## Research Question

Can a vision model solve abstract grid transformations more efficiently by reusing a spatially aware Transformer core for iterative latent reasoning and allocating a different number of iterations to each problem?

## Motivation

ARC tasks require inferring and executing transformations from a few demonstrations, with reasoning depth varying across problems. Text serialization can discard two-dimensional structure, while a feed-forward Vision Transformer ties additional depth to additional parameters. LoopViT instead treats computation as repeated state refinement: parameter sharing supplies more reasoning steps without enlarging the model, and [[concepts/adaptive-computation|Adaptive Computation]] can stop easy examples before the maximum iteration budget.

## Contributions

- Introduces a looped Vision Transformer that repeatedly applies one weight-tied core and uses learned step embeddings to distinguish iterations.
- Combines global self-attention with a heterogeneous ConvGLU that applies depthwise convolution to image tokens while leaving task tokens on a non-spatial path.
- Defines a parameter-free inference-time exit rule using mean pixelwise Shannon entropy, with a threshold of 0.05 and a hard maximum iteration count.
- Evaluates three model sizes on ARC-AGI-1 and ARC-AGI-2 and studies recurrent depth, hybrid spatial processing, adaptive exit, prediction convergence, and attention dynamics.

## Method

The model embeds the visual grid and task context into an initial state $z_0$. At iteration $t$, it adds a learned step embedding $e_t$ and applies the same Transformer trunk:

$$
z_{t+1}=\mathcal{M}_\theta(z_t+e_t).
$$

The trunk contains hybrid encoder layers with RMSNorm, rotary-position self-attention, and ConvGLU feed-forward blocks. ConvGLU separates task and image-token gates, reshapes image tokens to a grid, applies a $3\times3$ depthwise convolution, and then recombines the token groups. This assigns global relation induction to attention and local spatial updates to convolution.

During inference, the output head produces a categorical distribution for each grid cell. The model halts when average pixelwise entropy is below $\tau=0.05$, or at $T_{\max}$ otherwise. Training does not use this exit rule: the recurrent core is unrolled for a fixed number of steps and optimized with final-output pixelwise cross-entropy. Evaluation additionally performs task-specific test-time training on augmented demonstrations using rotations, flips, and color permutations.

## Experiments

The primary metric is pass@2 accuracy on ARC-AGI-1, with ARC-AGI-2 used for out-of-distribution evaluation. Training combines ARC with synthetic RE-ARC examples. The Small, Medium, and Large configurations contain 3.8M, 11.2M, and 18M parameters. Small uses maximum inference depths in the range 20--28, while Medium and Large use 4--8, depending on the configuration.

LoopViT reports 60.1%, 63.8%, and 65.8% on ARC-AGI-1 for Small, Medium, and Large, respectively, and 10.0%, 11.5%, and 14.2% on ARC-AGI-2. The paper's VARC comparison reports 54.5%/8.3% for one 18M model and 60.4%/11.1% for a 73M ensemble. Thus the 3.8M Small model nearly matches the ensemble on ARC-AGI-1, while Medium and Large exceed it on both reported benchmarks.

Increasing recurrent iterations improves accuracy across tested core depths, with the largest relative gain for shallow cores. Hybrid convolution-attention cores consistently outperform vanilla Transformer cores in the reported depth sweep. Against a fixed six-step baseline, entropy-based exit produces higher accuracy with lower average inference compute across model scales. For a roughly 5M-parameter, two-block variant, examples exiting at step 5 have 83.33% accuracy, compared with 45.80% for examples reaching step 8; this is correlational evidence that the exit criterion tracks difficulty, not proof that extra steps cause lower accuracy.

Across iterations, prediction differences and entropy decline together. Attention visualizations shift from broad patterns in early iterations to sparse, localized patterns later. These diagnostics are consistent with iterative refinement, although they do not establish a unique reasoning algorithm or guarantee convergence.

## Limitations

- The main evidence comes from ARC grid tasks, so it does not establish benefits for natural images, language reasoning, or broader multimodal settings.
- Test-time training specializes the model separately for each task; reported results therefore combine recurrent architecture, synthetic pretraining, data augmentation, and per-task adaptation rather than isolating recurrence alone.
- The paper reports GFLOPs and parameter counts but not matched-hardware latency, memory traffic, energy, or end-to-end cost. Weight tying reduces parameters but does not make repeated computation free.
- The entropy threshold is confidence-based rather than a correctness guarantee. Low entropy can accompany a confidently wrong prediction, and the reported early/late-exit accuracy comparison is confounded by task difficulty.
- Training uses fixed-depth final-output supervision even though inference exits dynamically. The supplied experiments do not establish calibration across datasets or robustness to threshold changes.
- Attention maps and declining output volatility are suggestive mechanistic diagnostics, not causal evidence for the claimed exploration-to-execution interpretation.
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier, so those metadata are left unset.

## Related Concepts

- [[concepts/adaptive-computation|Adaptive Computation]]: predictive entropy determines how many recurrent iterations an input receives.
- [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]]: LoopViT directly ties a Transformer core across depth, exchanging distinct parameters for repeated applications.

## Related Papers

- Hu et al. (2025), *ARC Is a Vision Problem!*, supplies the feed-forward visual ARC formulation and VARC baselines used by LoopViT.
- Dehghani et al. (2018), *Universal Transformers*, and Liu et al. (2024), *Looped Transformers Are Better at Learning Learning Algorithms*, motivate weight-tied depth and iterative algorithm learning.
- Graves (2017), *Adaptive Computation Time for Recurrent Neural Networks*, and Banino et al. (2021), *PonderNet: Learning to Ponder*, provide learned halting alternatives discussed by the paper.
- [[papers/thinking-with-looped-flows|Thinking with Looped Flows]] is related library reading: both scale recurrent computation on ARC, but looped flows use a denoising trajectory and optional stochastic sampling rather than a recurrent Vision Transformer with entropy-based exit.
- [[papers/diffusion-as-a-training-curriculum-for-timestep-free-iterative-reasoning|Diffusion as a Training Curriculum for Timestep-Free Iterative Reasoning]] is related library reading: it trains a shared recurrent solver with local denoising objectives and uses output stability rather than entropy for stopping.

Source code stated in the manuscript: `https://github.com/WenjieShu/LoopViT`.

[[index|Library home]]
