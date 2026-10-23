---
title: "FS_GPlib: Breaking the Web-Scale Barrier - A Unified Acceleration Framework for Graph Propagation Models"
type: paper
authors:
  - Chang Guo
  - Juyuan Zhang
  - Chang Su
  - Tianlong Fan
  - Linyuan Lü
year: 2026
doi: "10.1145/3774904.3792385"
venue: "The Web Conference 2026"
source_job_id: "019ba485-82ed-4d8b-9d12-4e9f69ef66fb"
tags:
  - graph-propagation
  - network-simulation
  - message-passing
  - monte-carlo
  - distributed-computing
---

## TL;DR

FS_GPlib accelerates [[concepts/graph-propagation-simulation|Graph Propagation Simulation]] by expressing each propagation step as synchronous tensorized message passing, batching independent Monte Carlo runs, and partitioning distributed graphs by target node. The library implements 29 epidemic, opinion-dynamics, and dynamic-network models. On the authors' hardware, its GPU implementations match the aggregate outcomes of comparison implementations and scale from small citation graphs to a 992.8-million-edge Web graph, although the constant-time results require ideal parallel capacity and negligible overhead.

## Research Question

Can a common tensor and distributed-computing architecture make mechanism-based graph propagation models fast enough for billion-edge networks without replacing their node-level transition rules with lower-fidelity approximations?

## Motivation

Epidemic, information-cascade, and [[concepts/opinion-dynamics|Opinion Dynamics]] models often nest Monte Carlo trials, time steps, node updates, and neighbor traversals. Existing Python libraries provide convenient model interfaces but become slow on large graphs, while mean-field and accelerated stochastic approximations can change the simulated process. General graph-processing systems scale graph computation but do not directly supply propagation-model implementations and simulation interfaces.

## Contributions

- Recasts local propagation rules as synchronous [[concepts/neural-message-passing|Neural Message Passing]] operations so all edge messages, node aggregations, and state updates at a time step can be tensorized.
- Stacks independent node-state vectors into a batch, allowing multiple Monte Carlo trajectories to share one sequence of tensor operations.
- Introduces target-node partitioning that assigns every receiving node and all of its incoming edges to one partition, followed by an `all_reduce` of updated node states.
- Provides 29 built-in models spanning epidemics, opinion dynamics, and dynamic graphs, along with CPU/GPU execution and four simulation interfaces.
- Benchmarks fidelity, runtime, batching behavior, hardware portability, and a distributed SIR simulation on the Webbase graph.

## Method

### Dual acceleration

At each discrete time step, an edge function constructs messages from source state, target state, edge information, and random variables. A permutation-invariant reducer aggregates incoming messages for each target, and an update function produces the next node state. Implementing these stages as tensor operations removes explicit Python loops over nodes and edges while retaining model-specific transition logic. The appendices instantiate this pattern for discrete SIR states and continuous Hegselmann-Krause opinions.

For Monte Carlo estimation, FS_GPlib stacks `B` independent node-state vectors into a tensor of shape `B x |V|`. Each trajectory samples its own randomness, but all trajectories execute through batched operators. Larger batches amortize invocation overhead and can improve accelerator utilization until memory bandwidth, capacity, or scheduling overhead becomes limiting.

### Distributed partitioning

Nodes are sorted by non-increasing in-degree and assigned to partitions using cumulative incoming-edge weight. All incoming edges for a target remain together, so message aggregation and the target update are local. Processes synchronize the resulting node states after each step. The paper bounds each partition's deviation from the average edge load by the maximum in-degree and states per-step communication in terms of node states rather than edge messages.

### Complexity claim

For sparse graphs, the paper derives constant time per synchronous step only under an ideal machine with a number of processing units proportional to the edge count and negligible overhead. Its batched Monte Carlo corollary likewise assumes capacity proportional to the number of simulations and a constant number of propagation steps. These results characterize an ideal parallel regime, not fixed-hardware asymptotic complexity.

## Experiments

The evaluation uses Cora, PubMed, Flickr, Yelp, Pokec, and Webbase, ranging from 2,708 nodes and 10,556 edges to 118,142,143 nodes and 992,844,891 edges. IC uses propagation probability 0.5 until convergence; SIR uses infection probability 0.01, recovery rate 0.005, and 100 steps. Seeds are the top 10% of nodes by degree centrality. The principal server has eight RTX 4090 GPUs, with single-GPU execution unless otherwise noted.

### Fidelity

IC and SIR outcome trajectories are reported as close to NetworkX and NDlib results. Appendix results for additional models similarly report close expected activated or infected counts where comparable. The comparison uses different trial counts for expensive baselines: typically 10 NDlib, 100 NetworkX, and 1,000 FS_GPlib runs in the main fidelity plots. Threshold, HK, and weighted HK receive only one simulation in the appendix table.

### Runtime and batching

For 1,000 IC simulations on Yelp, FS-IC takes 10.75 seconds on one GPU, versus an extrapolated 376,977.50 seconds for NDlib, yielding the paper's headline speedup above 35,000 times. For 1,000 SIR simulations on Yelp, FS-SIR takes 99.21 seconds, compared with an extrapolated 271,245.34 seconds for NDlib and 1,546.66 seconds for graph-tool. Small graphs do not uniformly favor the GPU implementation: CND-IC is fastest on Cora and PubMed, and graph-tool is fastest for Cora SIR.

Batching reduces Cora IC runtime from 3.01 to 0.53 seconds as batch size rises from 1 to 1,000, and Cora SIR from 27.06 to 0.66 seconds. The benefit reverses or saturates earlier on larger graphs: Flickr IC rises from 0.61 seconds at batch 10 to 1.30 seconds at batch 1,000, while Yelp and Pokec cannot fit the largest reported batches.

### Web-scale simulation

Using six GPUs on one machine, target-node partitioning of Webbase takes 42.08 seconds. One thousand distributed SIR trials take approximately 11,500 seconds in total, or 11.5 seconds per trial on average, and produce a reported expected infection rate of 29.63%.

## Limitations

- The constant-time theorems assume processing and memory capacity that grow with graph edges and batch size, a constant number of time steps, ideal parallel execution, and negligible overhead. They do not imply constant runtime on fixed hardware as problem size grows.
- Several baseline runtimes are extrapolated from 10 or 100 runs, and fidelity comparisons use unequal Monte Carlo sample counts. This weakens direct uncertainty and runtime comparisons.
- The Web-scale result covers one graph, one SIR configuration, and a six-GPU single-machine setup; it does not establish scaling across clusters, graph structures, or all 29 models.
- Larger batches sometimes increase runtime or exceed memory, especially for Flickr, Yelp, and Pokec, so macro-level acceleration depends on graph size and hardware-specific tuning.
- The library supplies graph partitioning but, according to the paper, not a built-in distributed-simulation workflow; a reference implementation is provided separately.
- Some models differ from their NDlib counterparts and are omitted from direct comparisons. Three appendix models are evaluated with only one run, which cannot assess stochastic agreement.

## Related Concepts

- [[concepts/graph-propagation-simulation|Graph Propagation Simulation]]
- [[concepts/neural-message-passing|Neural Message Passing]]
- [[concepts/opinion-dynamics|Opinion Dynamics]]
- [[concepts/bounded-confidence-models|Bounded Confidence Models]]

## Related Papers

- Rossetti, Milli, and Rinzivillo (2018), "NDlib: a Python Library to Model and Analyze Diffusion Processes over Complex Networks": the principal general-purpose propagation-library baseline.
- Robson, Reddy, and Umrawal (2024), "CyNetDif: A Python Library for Accelerated Implementation of Network Diffusion Models": accelerated IC baseline.
- Su et al. (2025), "GPIC: a GPU-based Parallel Independent Cascade Algorithm in Complex Networks": GPU IC baseline.
- Miller and Ting (2020), "EoN (Epidemics on Networks)": epidemic-simulation baseline.
- [[papers/a-unified-view-on-neural-message-passing-with-opinion-dynamics-for-social-networks|A Unified View on Neural Message Passing with Opinion Dynamics for Social Networks]]: another connection between graph message passing and mechanistic opinion updates, aimed at representation learning rather than simulation throughput.

[[index|Library home]]
