---
title: "DSD: A Distributed Speculative Decoding Solution for Edge-Cloud Agile Large Model Serving"
type: paper
authors:
  - Fengze Yu
  - Leshu Li
  - Brad McDanel
  - Sai Qian Zhang
year: null
source_job_id: "44ebafa7-9b5f-44a5-9df3-879199c1809b"
tags:
  - speculative-decoding
  - distributed-inference
  - edge-cloud-computing
  - llm-serving
---

## TL;DR

DSD coordinates many edge-hosted draft models with cloud-hosted target models for [[concepts/distributed-speculative-decoding|Distributed Speculative Decoding]]. Its DSD-Sim discrete-event simulator models routing, batching, network delay, and draft verification, while Adaptive Window Control (AWC) selects the speculation window and can switch to cloud-only execution. Across GSM8K, CNN/DailyMail, and HumanEval traces, AWC improves throughput by up to 9.7% over a fixed-window baseline and usually reduces time per output token by 6-10%. The evidence is simulation-led, with component calibration against GPU measurements rather than an end-to-end production deployment.

## Research Question

How can [[concepts/speculative-decoding|Speculative Decoding]] scale from a co-located draft-target pair to heterogeneous edge-cloud deployments while adapting to network delay, queueing, hardware load, and changing token acceptance rates?

## Motivation

Conventional speculative decoding reduces autoregressive latency by asking a small draft model to propose tokens for parallel verification by a larger target model. Existing designs generally keep the pair on one device or a small number of nodes. Large serving workloads instead require many clients, while target models may be too large for edge hardware. Separating drafting at the edge from verification in the cloud introduces routing, batching, communication, and utilization trade-offs that single-node models do not capture.

## Contributions

- Introduces DSD, an edge-cloud architecture in which multiple draft devices share pools of cloud target servers.
- Develops DSD-Sim, a request-level discrete-event simulator for routing, batch formation, speculation and verification iterations, network delays, and service-level metrics.
- Proposes Adaptive Window Control, a learned policy that selects the speculation window from recent queue depth, acceptance rate, round-trip time, time per output token, and the previous window.
- Evaluates routing, batching, execution mode, and window-control choices across three workload traces and heterogeneous model and GPU configurations.

## Method

### Distributed Execution and Simulation

An edge draft model proposes $\gamma$ tokens and sends them to a cloud target model. The target verifies the candidates in parallel but accepts them sequentially; after the first mismatch, it supplies a corrected token and discards the remaining candidates. DSD-Sim represents draft and target servers as concurrent SimPy processes with explicit queues and network-delay events. A YAML configuration defines model and device types, links, and runtime policies, while trace records supply prompt length, output length, arrival time, drafter identity, and acceptance sequences measured from hardware.

The simulator delegates prefill and decode latency estimates to VIDUR predictors extended with profiles for A40 GPUs and edge-oriented 7B models. It reports time to first token (TTFT), time per output token (TPOT), end-to-end latency, acceptance ratios, routing and window decisions, throughput, target utilization, and network queueing delay.

Routing policies include random, round-robin, and join-shortest-queue (JSQ). Batching can use FIFO or length-aware batching (LAB). Execution can be fused, with the cloud target generating locally, or distributed, with an edge draft model sending speculative tokens.

### Adaptive Window Control

AWC uses a residual multilayer perceptron with SiLU activations to regress a speculation window from five features: target queue utilization, recent acceptance rate, per-link RTT, recent TPOT, and the preceding window size. Labels come from exhaustive simulation sweeps over windows 2-12 and fused execution in more than 2,000 scenarios, selecting the configuration that minimizes a weighted service-level objective. Training uses $L_1$ loss and AdamW for 100 epochs.

At runtime, predictions are clamped, exponentially smoothed with factor 0.4, and quantized. Hysteresis requires a near-one prediction for two consecutive steps before switching from distributed to fused mode; a window at or below one selects fused execution.

## Experiments

Workload traces come from GSM8K, CNN/DailyMail, and HumanEval. Edge configurations use Qwen-7B and Llama2-7B on A40 GPUs; cloud configurations include Llama2-70B and Qwen-72B on A100 and H100 GPUs. The broader system study uses 20 cloud servers and 600 edge GPUs at 10 ms RTT, with additional AWC comparisons at 600 or 1,000 draft clients and 10 or 30 ms RTT.

### Calibration

Against 100-request measurements for Qwen and Llama models on A40, A100, and H100 hardware, VIDUR-based predictions have reported mean absolute errors of 7.4% for prefill and 5.2% for decode. Predictions are systematically low because the model omits NCCL communication and other non-kernel overheads. The network study uses 10 and 30 ms RTT settings motivated by cited cloud-latency measurements rather than calibration of a deployed DSD system.

### Main Results

- On GSM8K, successively adding JSQ, LAB, dynamic control, and AWC raises throughput from 25.1 to 28.1 requests/s, lowers TTFT from 351 to 345 ms, and lowers TPOT from 45 to 37 ms.
- Distributed execution outperforms cloud-only execution at low RTT, but their reported crossover occurs around 50-60 ms as repeated communication dominates.
- Across twelve dataset/configuration combinations, AWC has the highest throughput, improving 0.9-9.7% over the static $\gamma=4$ policy. It beats the heuristic dynamic baseline in eleven of twelve throughput comparisons.
- Relative to the static baseline, AWC's TPOT changes range from a 6.0% to 10.7% reduction in Table 2. TTFT remains within roughly 0.5-4% of the best baseline rather than uniformly attaining the best value.
- JSQ gives lower TPOT before saturation, but round-robin catches up as the fastest target becomes overloaded. LAB improves TPOT by 1-2 ms but does not change the eventual throughput ceiling.

## Limitations

- The system-level results come primarily from a simulator. Only its single-node latency predictor is calibrated against hardware; the complete distributed scheduler, queueing behavior, and adaptive controller are not validated against an end-to-end edge-cloud deployment.
- The latency model omits NCCL communication and other non-kernel overheads and therefore systematically underpredicts measured GPU latency.
- Network conditions use fixed representative RTT values. The evaluation does not establish behavior under packet loss, bandwidth contention, correlated jitter, failures, or wide-area client heterogeneity.
- AWC labels are generated by the same simulator used for evaluation, and the supplied text does not specify the weighted objective, train-validation split, prediction error, controller overhead, or generalization to unseen models and workloads in enough detail for independent reproduction.
- The workload evidence covers three benchmarks and a limited set of Qwen and Llama draft-target pairs. Acceptance sequences are hardware-derived for given pairs, but broader model, sampling, and conversational workload coverage is not demonstrated.
- LAB improves latency but not peak throughput, and JSQ degrades near saturation. These negative findings limit claims that any one policy remains optimal across all offered loads.
- The supplied Markdown gives no publication year, venue, DOI, arXiv identifier, or code repository, so none is inferred here.

## Related Concepts

- [[concepts/speculative-decoding|Speculative Decoding]]: the draft-and-verify inference method that DSD distributes.
- [[concepts/distributed-speculative-decoding|Distributed Speculative Decoding]]: coordinates drafting, verification, routing, batching, and network-aware execution across devices.
- [[concepts/adaptive-computation|Adaptive Computation]]: AWC varies computation and execution mode in response to runtime conditions.

## Related Papers

- Stern et al. (2018), "Blockwise Parallel Decoding for Deep Autoregressive Models": an early blockwise parallel decoding method cited as a foundation for speculative decoding.
- Leviathan et al. (2023), "Fast Inference from Transformers via Speculative Decoding": establishes lossless draft-and-verify acceleration for transformer inference.
- Chen et al. (2023), "Accelerating Large Language Model Decoding with Speculative Sampling": a cited speculative sampling baseline.
- Liu et al. (2024), "PEARL: Parallel Speculative Decoding with Adaptive Draft Length": a cited two-node adaptive draft-length approach.
- Agrawal et al. (2024), "VIDUR: A Large-Scale Simulation Framework for LLM Inference": supplies DSD-Sim's single-node latency predictors.
- Zhong et al. (2024), "DistServe: Disaggregating Prefill and Decoding for Goodput-optimized Large Language Model Serving": a related distributed serving architecture that separates inference phases rather than draft and verification models.

[[index|Library home]]
