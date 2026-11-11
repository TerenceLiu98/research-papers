---
title: "Natural Image Pretraining Improves Abstract Reasoning"
type: paper
authors:
  - Xiaoman Delores Ding
  - Keya Hu
  - Katelyn Gan
  - Victor Yin
  - Kaiming He
year: null
source_job_id: "036e5f41-cd04-446c-9d6c-f4855429ae9a"
tags:
  - visual-reasoning
  - self-supervised-learning
  - arc-agi
---

## TL;DR

Nat-ARC transfers ImageNet Masked Autoencoder (MAE) encoder weights into a VARC-style visual grid solver. Natural-image pretraining improves ARC-1 pass@2 over matched random initializations at base, large, and huge scales; the best single model reaches 63.4 ± 0.7%. Pooling predictions from scratch, ImageNet-pretrained, and ARC-grid-pretrained models reaches 70.2 ± 0.6%.

## Research Question

Can representations learned without labels from natural images improve few-shot abstract grid reasoning after offline ARC training and per-task adaptation?

## Motivation

ARC provides only a few demonstrations of an unknown transformation. Vision-centric solvers preserve spatial structure but often lack the extensive pretraining used by language-centric systems. [[concepts/visual-pretraining-for-abstract-reasoning|Visual Pretraining for Abstract Reasoning]] tests whether visual knowledge transfers across this substantial domain gap.

## Contributions

- Adds visual pretraining to a controlled VARC-based pipeline, comparing pretrained and random initializations across three encoder sizes.
- Separates natural-image transfer from auxiliary ARC-style grid pretraining and prediction-level ensemble gains.
- Analyzes attention and task-level improvements to investigate possible visual priors.

## Method

The three stages are encoder initialization, offline ARC training, and task-specific test-time training. Public ImageNet-1K MAE checkpoints supply encoder backbone weights; their patch and absolute positional embeddings are discarded. The ARC model uses a 64 × 64 canvas, 2 × 2 patches, learned color and task embeddings, bidirectional encoder–decoder Transformers, and 2D rotary positional embeddings. Total model sizes are 114M, 334M, and 664M parameters, with a fixed lightweight decoder trained from scratch.

Offline training runs for 200 epochs on ARC-1 training demonstrations and 400k RE-ARC examples, reserving the original training tasks' inference pairs for offline evaluation. At evaluation, encoder and decoder weights are frozen while fresh task embeddings and LoRA adapters in attention and MLP layers are optimized on each task's augmented demonstrations. Reversible flips, rotations, and color permutations produce auxiliary tasks.

Predictions from augmented views are mapped back to the original grid and grouped by exact output agreement. The two most-supported output modes define pass@2. Ensembles pool candidates across checkpoints before voting. Auxiliary grid MAE pretraining uses original ARC-1 training grids, roughly 400k RE-ARC pairs, and 1.5M NVARC pairs for 500 epochs with 75% masking.

## Experiments

The main evaluation uses 400 unseen ARC-1 tasks. For ImageNet and scratch comparisons, each scale/configuration has five independent offline checkpoints, each evaluated with two independent test-time training runs. Reported means and standard deviations are over five checkpoint scores after averaging each checkpoint's two runs. Ensemble variability is measured across ensemble combinations; grid-pretrained single models have only one offline checkpoint per scale.

| Configuration | ARC-1 pass@2 (%) | ARC-2 reported score (%) |
| --- | --- | --- |
| Best ImageNet-pretrained single model | 63.4 ± 0.7 | 8.6 ± 0.8 |
| Ensemble across three training regimes | 70.2 ± 0.6 | 13.1 ± 0.7 |

ImageNet pretraining improves final ARC-1 performance at every tested scale and accelerates offline convergence. Scratch performance improves from base to large but slightly declines at huge scale; pretrained scaling is more consistent. Two-ImageNet and mixed scratch–ImageNet ensembles perform similarly, both exceeding scratch-only ensembles. Grid pretraining provides additional gains, but its single-checkpoint results do not improve further from large to huge.

A solve-rate criterion selects 15 tasks with large ImageNet gains: six involve matching and copying, six connected components, and three other patterns. Attention visualizations suggest earlier foreground sensitivity. A separate toy demonstration applies rotation and border addition to a natural-image discrete latent grid. These analyses suggest useful spatial priors without establishing a causal mechanism.

## Limitations

- Grid-pretraining results lack checkpoint-level replication, limiting comparisons of variability with ImageNet initialization.
- Attention maps, manually labeled task groups, and the natural-image toy example are qualitative evidence, not a comprehensive account of reasoning or transfer.
- Cross-system scores involve different training data, model sizes, and inference computation; they are contextual comparisons rather than controlled rankings. ARC-2 performance remains much lower than ARC-1 performance.
- Supplementary ablations are referenced but not included in the supplied Markdown. Exact per-scale values appearing only inside figures are not transcribed here.
- The supplied manuscript does not identify its own publication year, venue, DOI, or arXiv identifier; year is left unset.

## Related Concepts

- [[concepts/visual-pretraining-for-abstract-reasoning|Visual Pretraining for Abstract Reasoning]]: transfer of visual representations into few-shot grid solving.

## Related Papers

- [[papers/loopvit-scaling-visual-arc-with-looped-transformers|LoopViT: Scaling Visual ARC with Looped Transformers]] explores recurrent computation within the visual ARC paradigm; Nat-ARC instead isolates encoder initialization as its main intervention.
- Hu et al. (2025), *ARC Is a Vision Problem!* (reference 27), supplies the VARC formulation and adaptation pipeline.
- He et al. (2022), *Masked Autoencoders Are Scalable Vision Learners* (reference 22), supplies the ImageNet encoder checkpoints and reconstruction objective.

[[index|Library home]]
