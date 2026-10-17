---
title: Prototype Priors for Flow Matching
type: concept
aliases:
  - Codebook-Prior Initialization
tags:
  - flow-matching
  - vector-quantization
  - generative-models
---

## Overview

A prototype prior initializes generative transport using learned representation centers and their empirical statistics. A codebook can thus serve two purposes: quantizing targets and defining a structured source distribution for [[concepts/flow-matching|Flow Matching]]. ProtoFlow applies this construction to multivariate time-series forecasting.

## Key Ideas

For a prototype index $k\sim\operatorname{Cat}(\pi)$ and local noise $\epsilon\sim\mathcal N(0,I_r)$, ProtoFlow samples

$$
x_0=\operatorname{Norm}\left(\mu_k+\gamma B_k(\sigma_k\odot\epsilon)\right).
$$

Here $\pi_k$ encodes empirical assignment frequency, $\mu_k$ is a prototype center, and $B_k,\sigma_k$ describe low-rank local variability before normalization. The resulting component distribution is not an ordinary Gaussian.

- **Representation informs initialization.** Prior statistics are estimated from training encodings after tokenizer training and then fixed during flow learning. They provide data-informed source samples without conditioning their selection on the particular future target.
- **Dependence can be learned during transport.** ProtoFlow independently samples initial latent positions and jointly transports the sequence using history-conditioned velocity predictions. Its source prior alone does not encode temporal ordering.
- **Source choice and coupling differ.** Smaller source-to-target Wasserstein distance implies smaller optimal squared transport cost. It does not establish a smaller cost for independent source-target pairs or guarantee faster optimization.
- **Capacity and probability allocation interact.** More prototypes may improve reconstruction without improving forecasts. ProtoFlow's size sweep shows that reconstruction quality alone does not select the best source prior; frequency weighting and available samples per prototype also matter.
- **Few-step benefits require measurement.** ProtoFlow reports accurate forecasts with three or five Euler steps, but its prior variants use different budgets in the main weighting comparison. Step-matched comparisons are needed to isolate prior effects at fixed compute.

## Important Papers

- [[papers/protoflow-prototype-guided-flow-matching-for-multivariate-time-series-forecasting|ProtoFlow: Prototype-Guided Flow Matching for Multivariate Time Series Forecasting]] constructs normalized prototype mixtures for conditional latent transport and evaluates frequency weighting, codebook size, and sampling-step sensitivity.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]] supplies the conditional velocity-regression objective and ODE generation procedure.
- [[concepts/latent-space-time-series-forecasting|Latent-Space Time Series Forecasting]] provides the representation-and-decoder setting used by ProtoFlow.
- [[concepts/soft-codebook-bottlenecks|Soft Codebook Bottlenecks]] use weighted prototype embeddings as representations; sampling a prototype-informed transport source serves a different role from a soft assignment bottleneck.
