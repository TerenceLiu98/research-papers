---
title: Fractal Nodes
type: concept
tags:
  - graph-neural-networks
  - message-passing
  - long-range-dependencies
---

## Overview

Fractal nodes are learned partition-level representatives added to a graph neural network while retaining the original graph. They collect information from nodes in a partition and return a shared representation, shortening communication paths within that partition.

## Key Ideas

- Partition the graph and associate one auxiliary node with each partition; this differs from coarsening that replaces original nodes.
- Combine partition means with learnably weighted local residual information to preserve variation beyond a mean-only summary.
- Apply ordinary message passing, update partition representatives, and broadcast their features back to original nodes.
- Optionally mix partition representatives at the final layer to capture inter-partition dependencies without attention over every original-node pair.
- Added connections reduce effective resistance in the paper's analysis. This motivates mitigation of oversquashing, which concerns compressed distant information rather than feature homogenization.
- Partition quality and partition count affect the method. Fractal self-similarity is the motivating interpretation, not a guarantee for arbitrary partitions.

## Important Papers

- [[papers/are-graph-transformers-necessary-efficient-long-range-message-passing-with-fractal-nodes-in-mpnns|Are Graph Transformers Necessary? Efficient Long-Range Message Passing with Fractal Nodes in MPNNs]] — introduces FN and its final-layer mixer variant FN_M.

## Related Concepts

- [[concepts/neural-message-passing|Neural Message Passing]]
- [[concepts/oversmoothing-in-graph-neural-networks|Oversmoothing in Graph Neural Networks]]
