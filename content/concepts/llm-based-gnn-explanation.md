---
title: LLM-Based GNN Explanation
type: concept
aliases:
  - LLM-Based Graph Neural Network Explanation
  - Language-Model-Based GNN Explanation
tags:
  - graph-neural-networks
  - explainable-ai
  - large-language-models
  - graph-explanations
---

## Overview

LLM-based GNN explanation uses a language model to express or construct explanations for predictions made by a graph neural network. The LLM may narrate a subgraph selected by another explainer, evaluate candidate explanations, generate counterfactual graph content, or interpret representations taken directly from the GNN. The approach is particularly relevant to [[concepts/text-attributed-graphs|Text-Attributed Graphs]], where the evidence associated with nodes is already natural language.

## Key Ideas

- **The LLM can occupy different roles.** It may translate an existing structural explanation into prose, supervise another explainer, or participate in selecting the explanatory subgraph itself. These designs expose the result to different sources of error.
- **Model access matters.** Text-only prompts can describe observable node attributes, while projected hidden states attempt to condition the LLM on how the GNN represents those nodes. A projected representation is still an information bottleneck, not a direct causal trace.
- **Narrative and structural outputs answer different needs.** A natural-language rationale can improve accessibility; a sparse subgraph identifies the graph context retained as evidence. Producing both does not guarantee they agree.
- **Fidelity and comprehensibility are separate criteria.** Prediction preservation on a selected subgraph measures behavioral agreement with the GNN. Human ratings measure how useful or convincing an explanation appears. Either can be high while the other is low.
- **Grounding controls have limited scope.** Constraining outputs to supplied node identifiers and filtering invalid references can reduce hallucinated entities, but cannot verify that the language model's reasoning matches the GNN's internal decision rule.
- [[papers/from-nodes-to-narratives-explaining-graph-neural-networks-with-llms-and-graph-context|From Nodes to Narratives]] projects GNN embeddings into a frozen LLM, asks it for node-level support judgments and rationales, and builds an explanation subgraph from those judgments.

## Important Papers

- Pan et al. (2024), "TAGExplainer: Narrating Graph Explanations for Text-Attributed Graph Learning Models."
- Zhang et al. (2024), "LLMExplainer: Large Language Model Based Bayesian Inference for Graph Explanation Generation."
- Cedro and Martens (2025), "GraphXAIN: Narratives to Explain Graph Neural Networks."
- [[papers/from-nodes-to-narratives-explaining-graph-neural-networks-with-llms-and-graph-context|From Nodes to Narratives: Explaining Graph Neural Networks with LLMs and Graph Context]]

## Related Concepts

- [[concepts/text-attributed-graphs|Text-Attributed Graphs]]
- [[concepts/neural-message-passing|Neural Message Passing]]
- Soft prompting
- Local factual explanations
- Explanation fidelity
- Counterfactual graph explanations
