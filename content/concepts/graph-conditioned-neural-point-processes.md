---
title: Graph-Conditioned Neural Point Processes
type: concept
aliases:
  - Graph Neural Point Processes
definition: "Neural temporal point processes that condition event intensities on graph-derived representations as well as event histories."
tags:
  - temporal-point-processes
  - graph-neural-networks
---

## Overview

Graph-conditioned neural point processes incorporate relationships among event streams or entities into a learned representation used to predict when events occur and which types occur. A graph encoder supplies relational context, while a temporal encoder summarizes the observed history.

## Key Ideas

- Graphs may represent observed relationships or constructed similarities. These have different interpretations: nearest-neighbor similarity is not evidence of causal transmission.
- Graph convolution aggregates neighboring features; its output can augment timestamp and marker embeddings before temporal modeling.
- Recurrence and causal attention provide alternative history encoders. Future-event masking is necessary for attention-based forecasting, and graph preprocessing must also respect the prediction information boundary.
- Improvements in event-time prediction, event-type prediction, and likelihood need separate assessment. Better performance on one does not imply improvement on all three.

## Important Papers

- [[papers/hgthp-a-novel-hyperbolic-geometric-transformer-hawkes-process-for-event-prediction|HGTHP]]: combines graph embeddings with Lorentz-distance attention and Klein-model aggregation; time-prediction ablations favor both components, while event-type gains vary by dataset.

- [[papers/gthp-a-novel-graph-transformer-hawkes-process-for-spatiotemporal-event-prediction|GTHP: a novel graph transformer Hawkes process for spatiotemporal event prediction]]: combines graph convolution with causal self-attention; its experiments show consistent RMSE improvements but mixed event-type gains.
- Du et al. (2021), *Astrologer*, cited and compared in GTHP: combines graph convolution and recurrent temporal encoding.

## Related Concepts

- [[concepts/graphon-hawkes-processes|Graphon Hawkes Processes]]: directly parameterizes a continuously indexed excitation network, a distinct construction from graph-conditioned neural embeddings.
- [[concepts/dynamic-hawkes-processes|Dynamic Hawkes Processes]]: introduces explicit time-varying modulation of excitation instead of graph neural conditioning.
