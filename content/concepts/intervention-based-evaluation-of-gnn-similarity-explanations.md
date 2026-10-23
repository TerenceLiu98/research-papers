---
title: Intervention-Based Evaluation of GNN Similarity Explanations
type: concept
aliases:
  - Intervention-Based Evaluation of Node-Similarity Explanations
  - GNN Similarity Explanation Evaluation
tags:
  - graph-neural-networks
  - explainable-ai
  - node-similarity
  - intervention-based-evaluation
---

## Overview

Intervention-based evaluation tests an explanation of a GNN node-similarity score by modifying the graph according to its edge attributions and recomputing the score. It is useful when embeddings and similarities are learned without labels, so neither a correct class nor a ground-truth explanatory subgraph is available. The evaluation asks whether attributed edges support controllable changes in the model, whether different attribution groups have distinct effects, and whether a small subset preserves those effects.

## Key Ideas

- **Actionability is directional fidelity.** Retaining an attribution-defined edge set should change similarity in a predictable direction. The score difference before and after intervention measures the strength and sign of that effect.
- **Consistency separates attribution groups.** Edges above and below a threshold should not induce indistinguishable sign distributions. Effect overlap compares those distributions; lower values indicate better separation.
- **Metrics must be interpreted jointly.** Low effect overlap is uninformative when both interventions have negligible fidelity. Conversely, large but same-direction changes may be actionable without distinguishing positive from negative evidence.
- **Sparsity means effect preservation.** An explanation is compressible when progressively removing its least influential edges leaves fidelity direction and effect overlap stable. Merely returning a small mask does not establish this property.
- **Attribution semantics determine the intervention.** A nonnegative importance mask divides retained from discarded edges, while a signed gradient naturally separates similarity-increasing from similarity-decreasing edges.
- **The target is model behavior, not causal truth about the domain.** Masking edges measures how a trained GNN responds to altered inputs. Distribution shift, graph normalization, and correlated edges can complicate a causal or human-semantic interpretation.

## Important Papers

- [[papers/explaining-graph-neural-networks-for-node-similarity-on-graphs|Explaining Graph Neural Networks for Node Similarity on Graphs]] formulates the framework and introduces fidelity-change, effect-overlap, and pruning evaluations.
- Ying et al. (2019), "GNNExplainer: Generating Explanations for Graph Neural Networks," provides a mutual-information mask whose intervention behavior motivates distinguishing relevance from signed influence.
- Sundararajan, Taly, and Yan (2017), "Axiomatic Attribution for Deep Networks," provides Integrated Gradients, a signed attribution method evaluated within this framework.

## Related Concepts

- [[concepts/neural-message-passing|Neural Message Passing]]
- [[concepts/llm-based-gnn-explanation|LLM-Based GNN Explanation]]
- Explanation fidelity
- Gradient attribution
- Graph representation learning
- Node similarity search
