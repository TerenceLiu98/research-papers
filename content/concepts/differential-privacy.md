---
title: Differential Privacy
type: concept
aliases:
  - DP
tags:
  - differential-privacy
  - data-privacy
  - randomized-mechanisms
---

## Overview

Differential privacy limits how much the distribution of a randomized mechanism's output can change when one protected record changes. The guarantee is defined relative to an explicit neighboring-dataset relation and must hold for every output event, rather than only for selected observed outputs.

## Key Ideas

For every neighboring pair $D\sim D'$ and output event $S$, a mechanism $M$ satisfies $(\varepsilon,\delta)$-DP when

$$
\Pr(M(D)\in S)\leq e^\varepsilon\Pr(M(D')\in S)+\delta.
$$

- **Protection unit:** Adjacency determines what is protected. A record-level guarantee for an enterprise database does not automatically protect an entire organization, conversation, or model training corpus.
- **Pure and approximate privacy:** Pure DP has $\delta=0$. With positive $\delta$, a bound on each individual output is insufficient to establish the same bound on every output set.
- **Sequential composition:** If every conditional mechanism satisfies event-level $(\varepsilon_k,\delta_k)$-DP for all possible prior histories, basic composition gives budgets $\sum_k\varepsilon_k$ and $\sum_k\delta_k$ for the joint output.
- **Generation as a mechanism:** An LLM's sampled response can be analyzed conditional on a prompt and context. Token guarantees can accumulate across a fixed or bounded response length; additional interactions need further accounting.
- **Evidence versus guarantee:** Lower empirical divergence between two sampled distributions is a diagnostic. It does not establish a uniform privacy bound across all neighboring datasets and possible outputs.

## Important Papers

- [[papers/differential-privacy-in-generative-ai-agents-analysis-and-optimal-tradeoffs|Differential Privacy in Generative AI Agents: Analysis and Optimal Tradeoffs]]: applies record-level privacy to agent-accessible data and derives conditional token and message bounds from logit sensitivity (Section IV).

## Related Concepts

- [[concepts/differentially-private-decoding|Differentially Private Decoding]]
