---
title: Distributed Speculative Decoding
type: concept
tags:
  - speculative-decoding
  - distributed-inference
  - edge-cloud-computing
  - llm-serving
---

## Overview

Distributed speculative decoding places [[concepts/speculative-decoding|Speculative Decoding]] draft and target models on different devices or across device pools. Resource-constrained edge models can draft tokens while large cloud models verify them, but each speculative iteration then couples inference efficiency to communication and shared-server scheduling.

## Key Ideas

- Draft-target separation introduces round-trip delay, queueing, routing, and batch formation into a decoding loop whose stages depend on one another.
- A longer speculation window amortizes communication and verification frequency but increases draft latency and discarded work when acceptance is low.
- Distributed execution is not always preferable. When network or edge computation is slow, cloud-only generation can outperform remote drafting, motivating runtime mode selection.
- Routing and batching affect different bottlenecks: load-aware routing can reduce latency before saturation, while length-aware batching reduces padding and head-of-line blocking without necessarily raising the compute-limited throughput ceiling.
- Evaluating these systems requires both model-level acceptance traces and systems-level latency, utilization, and network models.

## Important Papers

- [[papers/dsd-a-distributed-speculative-decoding-solution-for-edge-cloud-agile-large-model-serving|DSD: A Distributed Speculative Decoding Solution for Edge-Cloud Agile Large Model Serving]]: proposes a many-drafter, many-target edge-cloud framework, a discrete-event simulator, and learned speculation-window control.
- Liu et al. (2024), "PEARL: Parallel Speculative Decoding with Adaptive Draft Length": a cited adaptive approach operating across a smaller node configuration.

## Related Concepts

- [[concepts/speculative-decoding|Speculative Decoding]]: supplies the underlying lossless draft-and-verify mechanism.
- [[concepts/adaptive-computation|Adaptive Computation]]: window sizing and fused-versus-distributed switching allocate work according to current conditions.
