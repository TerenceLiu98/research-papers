---
title: "Position: LLM Serving Needs Mathematical Optimization and Algorithmic Foundations, Not Just Heuristics"
type: paper
authors:
  - Zijie Zhou
year: null
source_job_id: dda28f4d-64c6-4341-88e2-f39cd45f0ac5
tags:
  - llm-serving
  - mathematical-optimization
  - online-algorithms
  - scheduling
  - load-balancing
---

## TL;DR

This position paper argues that [[concepts/optimization-based-llm-serving|Optimization-Based LLM Serving]] should replace generic routing, scheduling, and cache-management heuristics with models tailored to prefill-decode asymmetry, growing KV caches, unknown output lengths, continuous batching, and synchronization barriers. It surveys early examples in load balancing, scheduling, capacity planning, and caching to argue that formal models can supply worst-case guarantees, capacity limits, and useful engineering structure without requiring a general-purpose optimizer in every runtime decision.

[[index|Library home]]

## Research Question

Why does LLM inference serving require dedicated mathematical optimization and algorithmic foundations, and which serving decisions are most likely to benefit from them?

## Motivation

Modern serving systems have introduced continuous batching, paged attention, prefill-decode disaggregation, and expert parallelism, but their decision policies often remain general-purpose: round-robin or join-shortest-queue routing, first-come-first-served scheduling, and least-recently-used eviction. The paper argues that these policies ignore distinctive properties of inference workloads: requests alternate between compute-bound prefill and memory-bandwidth-bound decode, KV-cache demand grows during execution, output length is unknown at admission, assignments can be expensive to reverse, and synchronized workers progress at the speed of the most heavily loaded participant.

## Contributions

- Frames expert routing, decode-worker assignment, request admission, capacity planning, and multimodal embedding eviction as optimization problems with LLM-specific state and constraints.
- Explains four benefits of formal analysis: robustness guarantees, capacity-planning limits, structural guidance for practical policies, and optimality baselines that reveal whether further engineering is worthwhile.
- Connects emerging systems work to linear and integer programming, queueing theory, online scheduling, competitive analysis, and regret-minimizing caching.
- Uses airline revenue management as a precedent for deriving simple deployed policies from richer mathematical programs rather than necessarily solving those programs for every request.
- Identifies open directions in prediction-aware scheduling, multi-objective optimization, prefill-decode disaggregation, and agentic-inference scheduling.

## Method

The paper is an analytical position and literature-synthesis article, not a new system or theorem. It first decomposes LLM serving into four decision domains.

### Expert and Request Routing

For [[concepts/sparse-mixture-of-experts|Sparse Mixture of Experts]], token concentration produces straggler GPUs during expert-parallel synchronization. The paper presents DeepSeek's LPLB as an example of representing redundant expert replicas as a capacity-constrained graph and solving a linear program that minimizes maximum per-GPU token load. At the request level, it casts sticky assignment to data-parallel decode workers as online integer optimization under barrier synchronization, predictable KV-cache growth, and uncertain completion times. The cited Balance-Future approach uses short-horizon completion predictions rather than estimates of full decode length.

### Scheduling and Capacity Planning

Continuous batching makes admission a scheduling problem in which serving a request changes both latency and future memory occupancy. The paper discusses queueing models that incorporate compute and KV-cache constraints to derive stability conditions, fluid approximations for throughput-oriented batching, hindsight integer programs that lower-bound achievable latency, and prediction-aware shortest-job-first variants. These formulations provide explicit benchmarks for online policies and proactive fleet sizing.

### Cost-Aware Caching

Multimodal embeddings vary in size and recomputation cost, so maximizing cache hit rate can differ from minimizing inference cost. The surveyed Least Expected Cost policy scores objects using estimated access probability and cost per unit size, connecting eviction to online learning and regret analysis rather than recency alone.

### Formulation-to-Policy Pipeline

The proposed workflow is to formulate the relevant optimization problem, analyze it for binding constraints and structural properties, and then deploy either the optimization itself or a low-overhead policy derived from it. The paper compares this process with airline bid-price control, where linear-program dual variables yield constant-time admission decisions.

## Experiments

The paper reports no original experiments, implementation, dataset, or benchmark. Its evidence consists of results attributed to cited work:

- DeepSeek's LPLB reportedly solves its intra-node token-balancing linear program in approximately 100 microseconds and is optimal for its stated token-count objective, although it does not model nonlinear grouped-matrix-multiplication costs.
- Chen et al. (2026) are reported to prove an asymptotic reduction in long-run average imbalance over the default policy by a factor of $\Omega(\sqrt{B\log G})$ under adversarial arrivals, where $B$ is per-worker batch size and $G$ the worker count.
- Zhu et al. (2023) are reported to obtain up to 50x cost reduction in high cost-ratio settings, plus 4.3x lower FLOPs and 1.8x lower latency on real LLM workloads using cost-aware caching with learned model selection.
- Other cited scheduling work supplies stability conditions, fluid benchmarks, hindsight-optimal integer programs, and competitive guarantees under uncertain output-length predictions.

These findings illustrate feasibility and potential value, but they are not evaluated together under a shared workload or reproduced by this paper.

## Limitations

- This is an advocacy and synthesis paper; it does not validate a unified optimization framework or compare principled methods with production heuristics in controlled experiments.
- The worked examples optimize different objectives under different assumptions, so they do not establish that optimization uniformly improves end-to-end serving performance.
- Guarantees inherit the abstractions of their mathematical models. The paper explicitly notes, for example, that token-count balance omits nonlinear grouped-matrix-multiplication costs.
- Runtime overhead, solver failure modes, observability requirements, and integration costs receive less treatment than the benefits of formalization.
- Several examples rely on predicted completion or workload information whose quality may drift, while robustness-consistency trade-offs remain an open problem.
- Hardware, architectures, and workloads evolve quickly; the paper argues that structural insights transfer, but does not empirically test that claim.
- The supplied manuscript gives no publication venue, stable identifier, or explicit publication year; the page therefore leaves the year unset.

## Related Concepts

- [[concepts/optimization-based-llm-serving|Optimization-Based LLM Serving]]: the paper's central program of exploiting inference-specific structure through formal models and algorithms.
- [[concepts/sparse-mixture-of-experts|Sparse Mixture of Experts]]: creates token-routing and expert-load-balancing problems under synchronized execution.
- [[concepts/neural-combinatorial-optimization|Neural Combinatorial Optimization]]: a related family of methods for structured decision problems, though this paper emphasizes explicit optimization and provable guarantees rather than learned solvers.

## Related Papers

- Kwon et al. (2023), "Efficient Memory Management for Large Language Model Serving with PagedAttention": establishes the vLLM memory-management and continuous-batching context.
- Zhong et al. (2024), "DistServe: Disaggregating Prefill and Decoding for Goodput-Optimized Large Language Model Serving": motivates phase-specialized serving architectures.
- Jaillet et al. (2025), "Online Scheduling for LLM Inference with KV Cache Constraints": formalizes latency-aware scheduling and hindsight benchmarks under memory constraints.
- Chen, Ye, and Zhou (2025), "Adaptively Robust LLM Inference Optimization under Prediction Uncertainty": studies scheduling when output-length predictions are unreliable.
- Chen et al. (2026), "A Universal Load Balancing Principle and Its Application to Large Language Model Serving": develops online optimization for barrier-synchronized decode workers.
- Zhu et al. (2023), "Towards Optimal Caching and Model Selection for Large Model Inference": develops cost-aware caching with regret guarantees.

