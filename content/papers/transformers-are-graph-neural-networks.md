---
title: Transformers are Graph Neural Networks
type: paper
authors:
  - Chaitanya K. Joshi
year: null
tags:
  - transformers
  - graph-neural-networks
  - attention
  - representation-learning
---

## TL;DR

The article expresses Transformer self-attention as [[concepts/attention-as-message-passing|Attention as Message Passing]] on a fully connected graph of tokens. Global attention supplies learned edge weights, value vectors supply messages, summation aggregates them, and the token-wise feed-forward block updates node states. Positional encodings add ordering or structural information, while dense matrix operations make this complete-graph computation much more efficient on current accelerators than typical sparse graph message passing.

## Research Question

How can Transformers and graph neural networks be described within one message-passing framework, and why do Transformers scale more effectively on current hardware despite that mathematical connection?

## Motivation

Transformers and graph neural networks are often presented as separate architecture families for sequences and relational data. A common formulation clarifies what each architecture assumes about structure: graph neural networks restrict communication using a given sparse graph, whereas Transformers learn pairwise relevance over all tokens and receive structural hints through positional encodings. The comparison also separates mathematical expressivity from the efficiency of the kernels used to implement an architecture.

## Contributions

- Recasts Transformer self-attention as message construction and aggregation over a complete token graph.
- Shows the converse view that graph attention networks are Transformers whose attention is restricted to local graph neighborhoods.
- Interprets Transformers without positional information as permutation-equivariant set processors and positional encodings as soft structural hints.
- Connects graph Transformers to the combination of local message passing, global attention, and graph positional encodings.
- Attributes part of the practical scaling gap between Transformers and graph neural networks to dense matrix multiplication versus sparse gather-scatter execution on current accelerators.

## Method

The article first writes single-head and multi-head self-attention as weighted sums of linearly transformed token representations. For a receiving token $i$, query-key scores are softmax-normalized over every token $j$, and the corresponding value vectors are summed before a residual connection, normalization, and token-wise multilayer perceptron update.

It then presents the standard [[concepts/neural-message-passing|Neural Message Passing]] decomposition: construct a message from each neighboring sender, aggregate messages with a permutation-invariant operator, and update the receiving node. A graph attention layer instantiates the message function with attention scores normalized over the receiver's neighborhood.

The correspondence follows by taking the Transformer token set as the nodes of a complete graph. Each attention-weighted value is a message, summation is the permutation-invariant aggregator, and the feed-forward sublayer is the node update. Restricting the same normalization and aggregation to an adjacency-defined neighborhood yields local graph attention instead. Multi-head attention repeats this construction with separate learned projections and concatenates the resulting messages.

The systems comparison rewrites attention for all tokens as dense matrix multiplications. It contrasts those operations with sparse graph implementations that maintain neighbor indices and use gather-scatter operations. This distinction, rather than the message-passing abstraction alone, motivates the article's hardware-lottery argument.

## Experiments

The article is an expository and mathematical synthesis rather than an empirical study. Its evidence consists of an equation-level correspondence among Transformer attention, graph attention, and the general message-passing framework, followed by a qualitative systems argument about dense and sparse execution. It reports no new datasets, benchmarks, ablations, training runs, or hardware measurements.

## Limitations

- The equivalence is established at the level of message-passing update equations; it does not make Transformers and graph neural networks identical in their structural assumptions, implementations, or computational cost.
- The Transformer derivation intentionally simplifies practical attention and architecture details, so it is a conceptual correspondence rather than a complete specification of a modern model.
- The hardware discussion provides no controlled benchmark in the article for the claimed training-speed gap between dense attention and sparse message passing.
- Complete-graph attention has quadratic pairwise interactions in sequence length, while the discussion focuses primarily on accelerator efficiency rather than asymptotic scaling.
- Positional and structural encodings are described as hints, but the article does not experimentally isolate when learned attention recovers graph inductive biases or when explicit sparse structure remains preferable.
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier. Its references identify a 2020 Gradient article with the same title as an initial version, but they do not establish metadata for this manuscript.

## Related Concepts

- [[concepts/attention-as-message-passing|Attention as Message Passing]]
- [[concepts/neural-message-passing|Neural Message Passing]]
- Graph attention networks
- Graph Transformers
- Positional encodings
- Permutation equivariance
- Hardware lottery

## Related Papers

- Vaswani et al. (2017), "Attention Is All You Need": introduces the Transformer architecture used in the correspondence.
- Velickovic et al. (2018), "Graph Attention Networks": supplies the local, neighborhood-restricted attention comparison.
- Dwivedi and Bresson (2020), "A Generalization of Transformer Networks to Graphs": develops Transformer layers with graph structural information.
- Rampasek et al. (2022), "Recipe for a General, Powerful, Scalable Graph Transformer": combines local message passing with global attention in a graph Transformer.
- Hooker (2021), "The Hardware Lottery": provides the hardware-algorithm framing applied to dense attention and sparse graph computation.

[[index|Library home]]
