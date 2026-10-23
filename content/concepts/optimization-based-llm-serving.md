---
title: Optimization-Based LLM Serving
type: concept
aliases:
  - Algorithmic Foundations for LLM Serving
  - Mathematical Optimization for LLM Serving
tags:
  - llm-serving
  - mathematical-optimization
  - online-algorithms
  - systems
---

## Overview

Optimization-based LLM serving models routing, batching, scheduling, cache eviction, capacity planning, and resource allocation as explicit decision problems. Its defining premise is that inference-specific structure should enter the objective and constraints: prefill and decode have different resource profiles, KV-cache memory grows over time, output lengths are initially unknown, request assignments can be sticky, continuous batches change composition, and synchronization makes the slowest worker determine progress.

The goal is not necessarily to place a general-purpose solver on every serving path. A formal program can instead expose bottlenecks, establish limits, or yield a simpler deployable rule with a guarantee or an interpretable approximation target.

## Key Ideas

- **Structure-aware objectives:** Optimize quantities such as maximum synchronized-worker load, latency under KV-cache limits, recomputation cost, or queue stability instead of generic queue length or recency proxies.
- **Online and uncertain decisions:** Routing and admission occur before decode lengths are known. Algorithms therefore use competitive analysis, short-horizon predictions, adaptive estimates, or regret bounds to remain useful under uncertainty.
- **Growing resource footprints:** Each decode step expands a request's KV cache, turning familiar scheduling and bin-packing problems into variants with dynamically increasing item sizes.
- **Phase-aware allocation:** Compute-bound prefill and memory-bandwidth-bound decode can justify specialized resource pools and require models for deciding when disaggregation is beneficial.
- **Theory as an engineering instrument:** Lower bounds and stability regions support capacity planning; primal or dual structure can suggest low-overhead policies; offline optima help quantify remaining headroom.
- **Model fidelity matters:** A formally optimal solution is only optimal for its stated model. Communication, nonlinear kernels, prediction error, fairness, energy, and solver overhead may need explicit treatment before guarantees translate into production gains.

## Important Papers

- [[papers/position-llm-serving-needs-mathematical-optimization-and-algorithmic-foundations-not-just-heuristics|Position: LLM Serving Needs Mathematical Optimization and Algorithmic Foundations, Not Just Heuristics]]: synthesizes the research agenda and representative results across routing, scheduling, capacity planning, and caching.
- Jaillet et al. (2025), "Online Scheduling for LLM Inference with KV Cache Constraints": gives combinatorial formulations, hindsight benchmarks, and online scheduling results.
- Chen, Ye, and Zhou (2025), "Adaptively Robust LLM Inference Optimization under Prediction Uncertainty": develops prediction-aware scheduling with robustness to inaccurate estimates.
- Chen et al. (2026), "A Universal Load Balancing Principle and Its Application to Large Language Model Serving": treats decode-worker assignment as an online, barrier-aware load-balancing problem.
- Zhu et al. (2023), "Towards Optimal Caching and Model Selection for Large Model Inference": optimizes heterogeneous cache costs with online-learning guarantees.

## Related Concepts

- [[concepts/sparse-mixture-of-experts|Sparse Mixture of Experts]]: expert parallelism introduces constrained token assignment and straggler mitigation problems.
- [[concepts/neural-combinatorial-optimization|Neural Combinatorial Optimization]]: uses learned models for combinatorial decisions, complementing explicit formulations and analytical guarantees.
- [[concepts/adaptive-test-time-reasoning-routing|Adaptive Test-Time Reasoning Routing]]: allocates inference effort across requests or reasoning paths according to expected value and cost.
- [[concepts/cost-aware-model-selection|Cost-Aware Model Selection]]: chooses among inference options while accounting for operational cost and quality.

