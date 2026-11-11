---
title: Temporal-aware Flow Matching for Video Generation with Temporally Coherent Motion
type: paper
authors:
  - Zirui Pan
  - Xin Wang
  - Yipeng Zhang
  - Yuwei Zhou
  - Wenwu Zhu
year: null
source_job_id: "96c2379d-eb07-490f-b8c2-00afa2d1965f"
tags:
  - flow-matching
  - video-generation
  - temporal-coherence
---

[[index|Library home]]

## TL;DR

Temporal-aware Flow Matching (TFM) couples adjacent video frames in the training probability path and uses a residual loss to learn the resulting velocities. Fine-tuning Wan2.1-T2V-14B improves the reported motion aggregate from 0.888 to 0.961 on VideoJam-Bench and from 0.805 to 0.858 on Movie-Gen, with unchanged inference procedures and 2.3% higher measured training-step time.

## Research Question

Can explicit temporal constraints in [[concepts/flow-matching|Flow Matching]] improve motion generation without external motion supervision or additional inference computation?

## Motivation

Standard straight conditional paths interpolate each frame independently, even when the prediction network uses spatiotemporal attention. The authors argue that this objective leaves temporal dependencies implicit. TFM instead makes neighboring frames affect the training velocities; it does not assume that existing video networks lack temporal attention.

## Contributions

- A probability-path formulation combining distance to each clean frame with distances between adjacent intermediate frames.
- A magnitude residual loss and a separate direction-alignment objective.
- Endpoint and temporal-sensitivity analyses, plus video benchmarks, component ablations, and preliminary audio experiments.

## Method

The governing equation balances an intra-frame distance weighted by $\rho$ with distances to the previous and next frames. Its right-hand side interpolates the corresponding noise and data distances to preserve boundary conditions (Section 3.2). The practical formulation uses Euclidean distances, $\tau(t)=1-t$, and velocity directions aligned with each noise-to-data displacement. Neighboring frames therefore couple velocity magnitudes rather than change these prescribed directions.

Differentiation yields a tridiagonal system $\bar M\bar u=C$. With $\rho=4$, the authors solve it using the Thomas algorithm and integrate the latent trajectory with Euler steps of 0.002 during training. The magnitude objective minimizes $\|\bar M\bar u_\theta-C\|_2^2$; negative cosine similarity supplies direction supervision. Unlike direct velocity regression, this loss ranks predictions by equation residual. Increasing $\rho$ weakens temporal coupling and approaches standard FM.

The temporal-perception analysis compares target distributions before and after an adjacent-frame swap. Under shared frame marginals and assumptions about distinct lag-one and lag-two difference distributions, the authors report positive KL divergence for TFM versus zero for FM. This concerns their distributional sensitivity criterion, not a guarantee that every generated video obeys physical laws.

## Experiments

Wan2.1-T2V-14B is fine-tuned for one epoch on roughly 40,000 ShareGPT4Video clips using rank-32 LoRA, AdamW, and four 80 GB A100 GPUs, taking approximately one week. Videos contain 81 frames at 832 × 480 and 15 fps. Evaluation uses 50 inference steps, guidance scale 5.0, a fixed seed, 128 VideoJam-Bench prompts, and 500 sampled MovieGen Bench prompts.

| Benchmark | Wan2.1 motion | TFM motion | Wan2.1 appearance | TFM appearance | Human motion preference for TFM over Wan2.1 |
| --- | ---: | ---: | ---: | ---: | ---: |
| VideoJam-Bench | 0.888 | 0.961 | 0.780 | 0.783 | 74.3% |
| Movie-Gen | 0.805 | 0.858 | 0.791 | 0.795 | 64.6% |

These are the paper's normalized VBench aggregates (Tables 1–2), not direct physical-correctness measurements. Human percentages are preference shares, not percentage improvements. The study recruits 40 computer-science-related university students, each judging 10 video pairs.

Matched-data FM fine-tuning and TFM with a solution-type loss both underperform full TFM in the ablations. VideoJam motion scores are 0.815, 0.894, and 0.961 respectively. Overall optimization-step time rises from 60.51 to 61.92 seconds for 14B and from 18.71 to 19.66 seconds for 1.3B (Table 3). Inference architecture and computation are unchanged.

Appendix E reports motion gains for Wan2.1-1.3B and HunyuanVideo-13B. A preliminary TangoFlux audio experiment improves FD from 75.88 to 68.24 and CLAP from 0.202 to 0.226 on validation data after training on 50,000 WavCaps samples.

## Limitations

TFM still fails on object fracture and long chain reactions such as domino cascades. Its constraints encode adjacent-frame relationships rather than explicit physical laws. Fine-tuning data and compute are limited, and the authors note that the more difficult objective can benefit from higher-capacity models. Benchmark results use one fixed-seed run; the human study has a narrow participant population. Appearance aggregates improve slightly, but individual aesthetic scores do not uniformly improve. Table 11 reports Movie-Gen motion as 0.857 whereas Tables 2 and 9 give 0.858; the main comparison above follows Tables 2 and 9.

The supplied Markdown does not explicitly identify the paper's publication year or its own DOI/arXiv identifier, so these are not inferred from cited works. The source lists a [project page](https://pzrain.github.io/tfm).

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: TFM changes the conditional path and regression objective.
- [[concepts/riemannian-flow-matching|Riemannian Flow Matching]]: provides the generalized distance-based flow formulation used as a starting point.

## Related Papers

- [[papers/flow-matching-on-general-geometries|Flow Matching on General Geometries]]: cited foundation for defining flows through distance constraints; TFM adds temporal coupling across video frames.
