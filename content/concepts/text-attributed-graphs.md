---
title: Text-Attributed Graphs
type: concept
aliases:
  - Text-Attributed Graph
  - TAGs
tags:
  - graph-learning
  - natural-language-processing
  - graph-neural-networks
  - multimodal-learning
---

## Overview

A text-attributed graph is a graph whose nodes, and sometimes edges, carry natural-language documents or sequences. Citation networks can attach abstracts or keywords to papers, product networks can attach descriptions to items, and knowledge or social graphs can attach statements and profiles to entities. Learning on these graphs combines semantic evidence from text with relational evidence from topology.

## Key Ideas

- A node-attributed formulation can be written as $G=(V,E,T)$, where $T(v)$ assigns text to node $v$. Practical systems usually convert that text into vectors before or during graph learning.
- Text and topology need not agree. Homophilous neighborhoods often reinforce textual labels, while heterophilous links, noisy relations, and weak text can make their contributions conflict.
- A GNN propagates information through local neighborhoods, so a prediction may depend on both the target text and texts associated with several message-passing hops. This complicates attribution to a compact, human-readable cause.
- LLMs can encode node text, reason over serialized neighborhoods, generate graph-derived features, or consume graph representations through learned projection layers. Each integration makes different assumptions about which structural information survives.
- Explanation evaluation should distinguish semantic plausibility from model fidelity. A fluent account of related node texts may be useful yet fail to describe why the trained graph model retained its prediction.
- [[papers/from-nodes-to-narratives-explaining-graph-neural-networks-with-llms-and-graph-context|From Nodes to Narratives]] studies local GNN explanations on four text-attributed graph datasets by interleaving projected GNN node embeddings with language-model instructions.

## Important Papers

- Sen et al. (2008), "Collective Classification in Network Data."
- Mernyei and Cangea (2022), "Wiki-CS: A Wikipedia-Based Benchmark for Graph Neural Networks."
- Feng et al. (2024), "TAGLAS: An Atlas of Text-Attributed Graph Datasets in the Era of Large Graph and Language Models."
- [[papers/from-nodes-to-narratives-explaining-graph-neural-networks-with-llms-and-graph-context|From Nodes to Narratives: Explaining Graph Neural Networks with LLMs and Graph Context]]

## Related Concepts

- [[concepts/llm-based-gnn-explanation|LLM-Based GNN Explanation]]
- [[concepts/neural-message-passing|Neural Message Passing]]
- [[concepts/oversmoothing-in-graph-neural-networks|Oversmoothing in Graph Neural Networks]]
- Graph neural networks
- Node classification
- Graph-language model alignment
