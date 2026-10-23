---
title: "Predicting Multi-View Rashomon Representation: Can We Learn Where Models Disagree?"
type: paper
authors:
  - Mingyue Ma
  - Zongbo Han
  - Changqing Zhang
  - Guangyu Wang
year: null
tags:
  - representational-disagreement
  - representational-similarity
  - vision-foundation-models
  - reliability-estimation
---

## TL;DR

The paper defines [[concepts/cross-model-representational-disagreement|Cross-Model Representational Disagreement]] at the sample level through overlap between nearest-neighbor sets in different frozen foundation-model representation spaces. A small residual feed-forward network learns to predict this agreement score from one model's representation alone. Across the reported vision experiments, predicted and measured agreement are consistently correlated, including under moderate distribution shift, while prediction is substantially cheaper than repeating multi-model neighborhood search.

## Research Question

Can the input-specific disagreement among several foundation models' representations be predicted from the representation produced by only one model?

## Motivation

Global measures such as RSA, SVCCA, and CKA summarize how two representation spaces relate over a dataset, but they do not directly expose which individual inputs are organized differently. Existing pointwise measures can quantify such differences, yet require representations from multiple models and a reference set at inference time. If disagreement has a learnable signature in one model's representation, it could provide a cheaper reliability signal for new inputs.

## Contributions

- Formalizes “Rashomon Representation” as input-dependent disagreement in how foundation models organize the same sample.
- Defines neighborhood agreement, an alignment-free target based on overlap between each model's top-$k$ reference neighbors.
- Trains a lightweight predictor to estimate cross-model agreement using only a normalized anchor-model representation.
- Tests predictability across six vision encoders, different comparison panels and predictor architectures, distribution shifts, and a target that excludes the anchor model.
- Evaluates computational cost, reference-set size, and association with downstream classification risk.

## Method

For a query $x$, each frozen model retrieves its $k$ nearest examples from a shared reference dataset using cosine similarity. With anchor model $h_0$ and comparison models $h_1,\ldots,h_{M-1}$, neighborhood agreement is

$$
\mathrm{NA}_k(x)=\frac{1}{M-1}\sum_{m=1}^{M-1}\frac{|\mathcal N_k^{(0)}(x)\cap\mathcal N_k^{(m)}(x)|}{k}.
$$

The score lies in $[0,1]$: lower values mean stronger disagreement. Because neighborhoods contain indices from the same reference set, models need neither equal representation dimensions nor an explicit cross-space alignment.

Measured agreement supplies offline regression targets. The default predictor receives the normalized anchor representation and uses a 512-dimensional projection, two residual feed-forward blocks, and a sigmoid scalar head. It is trained with scaled mean squared error while every foundation model remains frozen. At inference, comparison-model representations and reference-neighborhood searches are no longer needed.

## Experiments

The default setup uses CLIP ViT-B/32 as anchor, DINOv2 ViT-B/14 and supervised ViT-B/16 as comparison models, ImageNet-1K training images as the reference set, and $k=50$. Predictor training, validation, and testing use disjoint splits of 1,281,167, 50,000, and 100,000 samples.

Using CLIP, DINOv2, and ViT-21K in turn as anchors yields Pearson correlations between predicted and measured agreement from 0.708 to 0.746. Across six anchor choices the range is 0.701 to 0.770; varying comparison-panel composition gives 0.751 to 0.762, and using two through five comparison models gives 0.727 to 0.750. A leave-anchor-out target based only on DINOv2, ViT-21K, and Swin-B remains predictable from CLIP features at $r=0.578$.

Without retraining, the ImageNet-trained predictor obtains correlations from 0.405 to 0.661 on nine external datasets, 0.710 to 0.720 on three ImageNet-V2 variants, and 0.512 on ImageNet-R. Gaussian-noise performance falls from 0.726 at severity 1 to 0.394 at severity 5, showing that severe corruption weakens the learned relationship. The residual FFN outperforms the tested two-layer MLP and slightly outperforms the tested transformer encoder for all three anchors.

Starting from precomputed embeddings, prediction takes 5.34 ms per sample, versus 20.54 ms for FAISS measurement and 49.54 ms for PyTorch measurement. Reported peak memory is 9 MiB rather than 29,729 or 20,643 MiB, and required storage is 5 MiB rather than 10,009 MiB. Across nine downstream datasets, Kendall's $\tau_b$ between disagreement and multiclass Brier risk averages 0.18 for measured disagreement and 0.21 for predicted disagreement. Training with 100,000 reference examples retains 82.3% of the full-reference predictive correlation; 500,000 retain 90.6%.

## Limitations

- The study is confined to image encoders and mostly ImageNet-centered representations; predictability in language, audio, multimodal generation, or other domains is not established.
- Neighborhood agreement is a proxy tied to the reference dataset, similarity metric, and $k$, rather than a direct measure of semantic correctness or uncertainty.
- Correlation with measured agreement does not establish calibrated prediction, causal reliability, or guaranteed error detection.
- Generalization weakens on some external datasets and under severe Gaussian corruption, reaching $r=0.394$ at severity 5.
- The downstream risk analysis uses fixed linear probes and reports association rather than selective-prediction performance or a decision-theoretic guarantee.
- The source does not provide a publication year, venue, stable paper identifier, code release, or uncertainty estimates across repeated predictor training runs.

## Related Concepts

- [[concepts/cross-model-representational-disagreement|Cross-Model Representational Disagreement]]
- Representational similarity
- Vision foundation models
- Nearest-neighbor consistency
- Distribution shift

## Related Papers

- [[papers/logit-distance-bounds-representational-similarity|Logit Distance Bounds Representational Similarity]] studies when closeness of model outputs controls linear representational similarity.
- [[papers/accessing-vision-foundation-models-via-imagenet-1k|Accessing Vision Foundation Models via ImageNet-1K]] transfers representations from frozen vision foundation models through intermediate-feature matching.
- Park et al. (2024), “Quantifying Representation Reliability in Self-Supervised Learning Models”: a cited neighborhood-based measurement approach.
- Kornblith et al. (2019), “Similarity of Neural Network Representations Revisited”: introduces CKA as a dataset-level representation comparison method.
- Kolling et al. (2025), “Investigating the Effects of Fairness Interventions Using Pointwise Representational Similarity”: a cited pointwise representation-comparison method.

[[index|Library home]]
