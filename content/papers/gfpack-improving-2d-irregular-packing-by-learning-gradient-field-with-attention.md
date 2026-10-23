---
title: "GFPack++: Improving 2D Irregular Packing by Learning Gradient Field with Attention"
type: paper
authors:
  - Tianyang Xue
  - Lin Lu
  - Yang Liu
  - Mingdong Wu
  - Hao Dong
  - Yanbin Zhang
  - Renmin Han
  - Baoquan Chen
tags:
  - irregular-packing
  - score-based-diffusion
  - geometric-deep-learning
  - combinatorial-optimization
---

## TL;DR

GFPack++ learns a score-based gradient field that simultaneously translates and continuously rotates irregular polygons. Attention-based geometry and relation encoders represent polygon shape, pose, inter-polygon relations, and container boundaries; a utilization-weighted training loss and geometric post-processing improve compactness and feasibility. Across Garment, Dental, Puzzle, and UV-atlas data, the method generally improves utilization over XAtlas, no-fit-polygon placement, and SVGnest while running substantially faster than the earlier GFPack model.

## Research Question

Can a learned gradient field encode enough polygon geometry, pose, and boundary context to produce fast, compact 2D irregular packings with continuous rotation and generalization to unseen polygon counts and boundary shapes?

## Motivation

Classical irregular packing methods combine placement heuristics, geometric search, and sequence optimization, but can be computationally expensive. Earlier diffusion-based GFPack moves all objects together and balances packing quality with runtime, yet it does not model orientation, frequently leaves collisions, and has limited support for arbitrary boundaries. The paper argues that these failures arise from incomplete representations of local polygon geometry and the relations among shapes, poses, and containers.

## Contributions

- An attention-based polygon encoder that applies a residual graph convolutional network to ordered contour vertices and their internal angles, then pools local features into polygon-level geometry features.
- A Transformer relation encoder that separately attends to geometric, spatial, and polygon-boundary relations and predicts linear and angular velocities.
- A variance-exploding score-based diffusion formulation for simultaneous polygon motion, with a sigmoid loss weight that emphasizes higher-utilization teacher layouts.
- A geometric utilization-enhancement stage that uses separating-axis displacement vectors to resolve small overlaps, followed by directional compaction to remove gaps.
- Experiments on manufacturing, puzzle, and atlas datasets covering packing quality, runtime, encoder ablations, continuous rotation, arbitrary boundaries, and polygon-count scaling.

## Method

**State and geometry encoding.** A state contains polygon rigid transformations, diffusion time, polygon contours, and the container boundary. Each contour becomes a cycle graph whose vertex features contain coordinates and internal angle. Four residual graph-convolution layers aggregate local contour structure, and attention pooling produces a fixed-dimensional representation for each polygon and the boundary.

**Relation encoding.** Polygon geometry, SE(2) pose features, boundary features, and a Gaussian Fourier embedding of diffusion time enter an eight-layer Transformer encoder-decoder. Three attention modules represent relations among polygon geometries, among geometry-pose pairs, and between polygons and the boundary. The decoder outputs translation and rotation velocities for every polygon.

**Gradient-field learning.** The model uses a variance-exploding stochastic differential equation and denoising score matching to approximate the conditional score of high-quality transformations. At inference, Euler-Maruyama sampling follows the reverse-time SDE for 128 steps. Several solutions can be generated in parallel, after which the highest-utilization collision-free result is selected.

**Training emphasis and post-processing.** Teacher examples come primarily from SVGnest. A sigmoid weight derived from each example's utilization relative to the teacher-set minimum, average, and maximum prioritizes tighter layouts without discarding lower-utilization examples. For regular strip boundaries, a post-processing algorithm resolves residual pairwise overlaps and boundary violations, then compacts polygons along the negative coordinate directions.

## Experiments

The evaluation uses Garment and Dental manufacturing shapes, a Dental variant with alphabetical boundaries, two synthetically fragmented Puzzle datasets, and Building and Object UV-atlas patches. Each training dataset contains about 100,000 non-colliding teacher packings. GFPack++ has roughly 40 million parameters and was trained on four RTX 4090 GPUs; the authors report convergence after 50 hours, compared with 168 hours for GFPack.

With batch size 512 and utilization enhancement, GFPack++ reports the following average utilization and time against the strongest listed baseline average in each row:

| Dataset | GFPack++ average | GFPack++ time | Strongest baseline average | Baseline |
| --- | ---: | ---: | ---: | --- |
| Garment | 77.04% | 10.5 s | 72.75% | SVGnest |
| Dental | 77.53% | 14.5 s | 73.64% | SVGnest |
| Puzzle (square) | 95.12% | 32.1 s | 67.22% | SVGnest |
| Atlas (building) | 80.16% | 25.3 s | 74.51% | SVGnest |
| Atlas (object) | 67.47% | 65.4 s | 63.87% | SVGnest |

Against GFPack, enhanced GFPack++ reaches 77.04% versus 72.17% utilization on Garment and 73.93% versus 70.11% on Dental without arbitrary-rotation training. Its corresponding runtimes are 10.5 versus 124.0 seconds and 12.1 versus 132.1 seconds. With rotation training and enhancement, Dental utilization rises to 77.53%. The reported feasible-solution rates are 100% on Garment, 98.4% on Dental, and 96.3% on rotation-inclusive Dental; GFPack produces no feasible solutions in the rotation-inclusive setting.

The encoder ablation isolates the relation encoder as the larger contributor to collision reduction: replacing only GFPack's geometry encoder leaves 8.38% overlap, while replacing only its relation encoder reduces overlap to 1.89% and yields 72.84% utilization. The full encoders reduce overlap to 0.08% and reach 74.25%; substituting average pooling for attention pooling gives 0.85% overlap and 73.11% utilization.

For unseen alphabetical Dental boundaries, batch sizes 128 and 512 produce valid-solution rates of 38.53% and 67.54%. On unseen arbitrary Puzzle boundaries, the corresponding mean IoUs are 93.75% and 94.91%. On UV-atlas data, GFPack++ is comparable rather than uniformly superior to [[papers/learning-based-2d-irregular-shape-packing|Learning based 2D Irregular Shape Packing]]: its mean ratio is lower on Building (80.2% versus 82.7%) and lower on Object (67.5% versus 68.7%), although its reported maxima are slightly higher.

## Limitations

- Diffusion sampling does not strictly enforce collision or containment constraints. The utilization-enhancement stage is needed for regular boundaries, and the paper notes small overlaps in some arbitrary-boundary puzzle results.
- Generalization is incomplete: only 67.54% of alphabetical-boundary Dental cases are valid even with batch size 512, and increasing the batch trades additional runtime for a better chance of finding a valid result.
- Training depends on approximately 100,000 teacher examples per dataset and substantial compute. The evidence does not establish a single model that handles all 2D irregular-packing domains.
- The learned method has no global optimality guarantee. Selecting the best result from a generated batch and applying local compaction can improve outcomes but does not certify an optimum.
- Comparisons mix learned generation with method-specific post-processing and parallel batch sizes. The reported results therefore characterize complete pipelines rather than the neural model alone.
- The parsed manuscript contains damaged mathematical glyphs and does not expose a reliable publication year or identifier. This page omits uncertain metadata and reconstructs no corrupted notation.

## Related Concepts

- [[concepts/strip-packing|Strip Packing]]
- [[concepts/uv-atlas-packing|UV Atlas Packing]]
- [[concepts/diffusion-models|Diffusion Models]]
- Score matching
- Graph convolutional networks
- Attention pooling
- No-fit polygons

## Related Papers

- Xue et al. (2023), "Learning Gradient Fields for Scalable and Generalizable Irregular Packing": the GFPack predecessor, which predicts simultaneous polygon translations but does not support continuous rotation.
- [[papers/learning-based-2d-irregular-shape-packing|Learning based 2D Irregular Shape Packing]]: a reinforcement-learning and geometric-optimization pipeline evaluated directly on the same Building and Object atlas datasets.
- Hosseini et al. (2023), "PuzzleFusion: Unleashing the Power of Diffusion Models for Spatial Puzzle Solving": applies diffusion to pairwise spatial puzzle relations and motivates the arbitrary-boundary evaluation.
- Song et al. (2021), "Score-Based Generative Modeling through Stochastic Differential Equations": supplies the variance-exploding SDE framework used for gradient-field learning.

[[index|Library home]]
