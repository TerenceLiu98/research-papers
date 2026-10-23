---
title: "A Unified View on Neural Message Passing with Opinion Dynamics for Social Networks"
type: paper
authors:
  - Outongyi Lv
  - Bingxin Zhou
  - Xiang Xiao
  - Weishu Zhao
  - Jing Wang
  - Lirong Zheng
year: null
tags:
  - graph-neural-networks
  - message-passing
  - opinion-dynamics
  - bounded-confidence
  - oversmoothing
---

## TL;DR

ODNET turns bounded-confidence opinion dynamics into a continuous [[concepts/neural-message-passing|Neural Message Passing]] rule. A piecewise influence function amplifies, suppresses, or reverses messages according to node similarity, improving node-classification accuracy on the graph and hypergraph benchmarks reported by the authors while slowing the collapse of Dirichlet energy associated with [[concepts/oversmoothing-in-graph-neural-networks|Oversmoothing in Graph Neural Networks]].

## Research Question

Can the attraction, indifference, and repulsion mechanisms of [[concepts/bounded-confidence-models|Bounded Confidence Models]] provide a unified message-passing rule for homophilic graphs, heterophilic graphs, and [[concepts/hypergraphs|Hypergraphs]], while preserving feature separation in deep propagation?

## Motivation

Repeated averaging in strongly connected networks drives the French-DeGroot model toward consensus. The paper interprets this as analogous to feature homogenization in graph neural networks: both processes can converge exponentially under strong connectivity. The [[concepts/hegselmann-krause-model|Hegselmann-Krause Model]] instead restricts interaction by opinion distance and can retain multiple clusters. ODNET imports that bounded-confidence principle into graph representation learning.

## Contributions

- Relates consensus in French-DeGroot opinion dynamics to oversmoothing under diffusion-like neural message passing.
- Defines a piecewise influence function that strengthens messages between highly similar nodes, preserves intermediate interactions, and either removes or reverses low-similarity interactions.
- Gives discrete and continuous-time formulations for graphs and extends the interaction rule to hypergraphs.
- Evaluates the method on homophilic, heterophilic, and hypergraph node-classification benchmarks and tracks Dirichlet energy across depth.
- Applies learned influence weights to simplify two metabolic-gene co-occurrence networks from Mount Everest and the Mariana Trench.

## Method

For node state $x_i$, ODNET uses an interaction dynamic of the form

$$
\frac{\partial x_i}{\partial t}
= \sum_j \phi(s_{ij})(x_j-x_i) + u(x_i),
$$

where $s_{ij}$ is a node-pair similarity or graph weight, $\phi$ converts similarity into influence, and $u$ is a stabilizing control term. A numerical ODE solver turns the continuous dynamic into network propagation.

The influence function partitions similarities with cutoffs $\epsilon_1$ and $\epsilon_2$. For homophilic graphs, low-similarity messages are removed, intermediate messages retain their original weight, and high-similarity messages are scaled by $\mu>0$. For heterophilic graphs, the low-similarity region instead receives $\nu(1-s)$ with $\nu<0$, creating repulsion. The hypergraph form sums pairwise influence within every hyperedge incident to a node.

The paper uses DOPRI5 for graph experiments and reports a simple forward-Euler hypergraph implementation based on HGNN weights. Dirichlet energy measures how much neighboring node features differ as propagation depth increases.

## Experiments

### Node classification

| Setting | Datasets | Reported ODNET results |
| --- | --- | --- |
| Homophilic graphs | Cora, CiteSeer, PubMed, Coauthor CS, Computer, Photo | Best reported mean accuracy in the table on all six datasets: 85.7, 75.5, 80.6, 93.1, 83.9, and 92.7, respectively. |
| Heterophilic graphs | Texas, Wisconsin, Cornell | 88.3, 89.1, and 86.5 mean accuracy, exceeding the listed baselines on all three datasets. |
| Hypergraphs | Cora-coauthor and Cora/CiteSeer/PubMed cocitation | 84.5, 80.7, 74.0, and 89.0 mean accuracy; PubMed-cocitation ties ED-HNN in the reported table. |

Graph results use ten random initializations and splits for homophilic datasets and fixed ten-split protocols for heterophilic data. Hypergraph experiments use fixed ten-split data. The paper attributes the larger heterophilic gains to negative influence between dissimilar nodes. An ablation over $\mu$, $\nu$, and the two cutoffs shows different preferred regimes for Cora and Texas. DOPRI5 performs best overall among DOPRI5, RK4, and Euler, although no solver has a consistent advantage on every dataset.

### Oversmoothing

On Texas with randomly initialized parameters, GCN and GAT show rapid Dirichlet-energy decay. GRAND delays the collapse, while ODNET reaches a stable nonzero profile under the plotted settings. The paper interprets this as bounded confidence preserving feature-cluster separation rather than allowing uniform consensus.

### Metabolic-gene networks

The application uses two 96-node, 2,517-edge co-occurrence networks for Mount Everest and the Mariana Trench. Nodes receive 20-dimensional unit pseudo-features, and degree cutoffs at 20 and 60 define weak, medium, and strong influencer labels. Independent ODNET models reach 96.9% and 75.0% accuracy on the two networks. After pruning learned weights below 0.05, the authors report clearer pathway structure and identify `nos` as a carbon-nitrogen bridge in the Mariana Trench network and `sat` and `aprA` as carbon-sulfur bridges in the Mount Everest network.

## Limitations

- The paper does not supply a publication year or stable identifier in the provided text, and says that code will be released upon acceptance.
- Most evidence is predictive accuracy on established node-classification datasets. The biological study uses degree-derived labels and pseudo-features, so it does not independently validate the inferred biological roles.
- The metabolic-network interpretation is based on two networks, a selected edge cutoff, and qualitative pathway inspection; no comparison with alternative network-simplification criteria is reported.
- Baseline graph results are partly taken from prior studies, which can weaken comparability when implementation and tuning budgets differ.
- The hypergraph version uses HGNN weights and a first-order Euler step. Its results therefore do not isolate how ODNET behaves with more expressive hypergraph operators.
- The oversmoothing evidence combines an analytical argument for diffusion-type hypergraphs with a plotted Texas example; it does not establish a general lower bound for every learned ODNET configuration.

## Related Concepts

- [[concepts/neural-message-passing|Neural Message Passing]]
- [[concepts/oversmoothing-in-graph-neural-networks|Oversmoothing in Graph Neural Networks]]
- [[concepts/opinion-dynamics|Opinion Dynamics]]
- [[concepts/bounded-confidence-models|Bounded Confidence Models]]
- [[concepts/hegselmann-krause-model|Hegselmann-Krause Model]]
- [[concepts/hypergraphs|Hypergraphs]]

## Related Papers

- French (1956), "A Formal Theory of Social Power," and DeGroot (1974), "Reaching a Consensus": foundations for the consensus dynamic connected to message passing.
- Hegselmann and Krause (2002), "Opinion Dynamics and Bounded Confidence: Models, Analysis and Simulation": source of the bounded-confidence mechanism.
- Gilmer et al. (2017), "Neural Message Passing for Quantum Chemistry": general message-passing framework.
- Chamberlain et al. (2021), "GRAND: Graph Neural Diffusion": continuous graph diffusion baseline and the closest continuous-time comparison.
- Rusch et al. (2022), "Graph-Coupled Oscillator Networks": heterophilic graph baseline and related dynamical treatment of oversmoothing.

[[index|Library home]]
