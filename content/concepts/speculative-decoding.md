---
title: Speculative Decoding
type: concept
aliases:
  - Speculative Sampling
tags:
  - llm-inference
  - decoding
  - inference-acceleration
---

## Overview

Speculative decoding accelerates autoregressive generation by pairing a fast draft model with a more expensive target model. The draft proposes several candidate tokens, and the target verifies them in parallel while preserving the target model's output distribution through an acceptance-and-correction procedure.

## Key Ideas

- A speculation window of size $\gamma$ trades fewer target invocations against more draft work and a greater risk that later candidates will be discarded after an early mismatch.
- Verification evaluates the proposed block in parallel but accepts candidates sequentially. At the first rejection, the target supplies a correction and the unused suffix is removed.
- Performance depends on the draft-to-target cost ratio and token acceptance probability. Larger windows help only when accepted progress compensates for draft and verification costs.
- Co-located implementations mainly balance compute. [[concepts/distributed-speculative-decoding|Distributed Speculative Decoding]] also exposes network delay, queueing, routing, and heterogeneous-device utilization.

## Important Papers

- Stern et al. (2018), "Blockwise Parallel Decoding for Deep Autoregressive Models": develops blockwise parallel generation with auxiliary prediction models.
- Leviathan et al. (2023), "Fast Inference from Transformers via Speculative Decoding": presents a draft-and-verify procedure that preserves the target distribution.
- Chen et al. (2023), "Accelerating Large Language Model Decoding with Speculative Sampling": independently develops speculative sampling for transformer decoding.
- [[papers/dsd-a-distributed-speculative-decoding-solution-for-edge-cloud-agile-large-model-serving|DSD: A Distributed Speculative Decoding Solution for Edge-Cloud Agile Large Model Serving]]: extends the method to many edge draft models and cloud target servers.

## Related Concepts

- [[concepts/distributed-speculative-decoding|Distributed Speculative Decoding]]: adds cross-device coordination and communication-aware control.
- [[concepts/adaptive-computation|Adaptive Computation]]: runtime policies can vary the speculation window as conditions change.
