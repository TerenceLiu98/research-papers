---
title: "Training Graph Neural Networks by Graphon Estimation"
type: paper
authors:
  - Ziqing Hu
  - Yihao Fang
  - Lizhen Lin
year: null
tags:
  - graph-neural-networks
  - graphon-estimation
  - graph-resampling
  - oversmoothing
  - node-classification
---

## TL;DR

The paper estimates a graph's link-probability matrix and samples a new adjacency matrix during GNN training, either once per epoch or independently at each layer. This graphon-based augmentation can perturb repeated [[concepts/neural-message-passing|Neural Message Passing]] enough to reduce overfitting and [[concepts/oversmoothing-in-graph-neural-networks|Oversmoothing in Graph Neural Networks]], although the reported gains vary substantially by architecture, depth, and dataset.

## Research Question

Can resampling training graphs from an estimated link-probability matrix improve deep graph neural network training by augmenting a single observed graph and preventing repeated propagation from collapsing node representations?

## Motivation

Standard GNNs treat the observed adjacency matrix as fixed, even when the graph is a noisy realization of an underlying network distribution. Reusing the same propagation operator across many layers can move node features toward a stationary subspace, while training a high-capacity model on one graph can overfit. The paper uses [[concepts/graphons|Graphons]] as a statistical model of edge uncertainty and as a source of additional graph realizations during training.

## Contributions

- Introduces a model-agnostic training procedure that estimates edge probabilities once and resamples the adjacency matrix at every training epoch.
- Defines a layer-wise variant that independently samples an adjacency matrix for each GNN layer.
- Interprets graphon resampling as both graph data augmentation and stochastic perturbation of the propagation dynamics associated with oversmoothing.
- Evaluates the procedure with GCN, GraphSAGE, and JK-Net models from 2 to 16 layers on Cora, CiteSeer, and PubMed.

## Method

Given an observed adjacency matrix $A$, the method first estimates an underlying link-probability matrix $\hat P$. The experiments use neighborhood smoothing, which estimates each edge probability by averaging connections from nodes with similar adjacency patterns; the paper notes that USVT or stochastic-block-model estimators could be substituted.

At each training epoch, the method samples edges independently,

$$
\hat A_{ij} \sim \operatorname{Bernoulli}(\hat P_{ij}),
$$

and uses the resulting normalized adjacency matrix for propagation. The standard variant shares one sampled graph across all layers in the epoch. The layer-wise variant draws a separate $\hat A^l$ for every layer, adding more variation to the propagation sequence. Validation and testing use the original observed adjacency matrix rather than a resampled graph.

## Experiments

The evaluation covers Cora, CiteSeer, and PubMed node classification under public, complete, and full splits, although the supplied paper reports detailed results only for the public split. It tests GCN, GraphSAGE, and JK-Net with 2, 4, 8, and 16 layers. Models use 64-dimensional hidden layers, ReLU, Adam, up to 1,000 epochs, learning-rate reductions at epochs 300 and 600, early stopping, and averages over 10 runs. Baselines are the original architecture, DropEdge tuned over rates from 0.2 to 0.8, and dropout at rate 0.2.

Results are heterogeneous rather than uniformly favorable. The clearest gains occur for JK-Net: on Cora, resampling raises reported mean accuracy from 47.83 to 65.32 at 2 layers and from 49.77 to 62.89 at 8 layers; on PubMed, the corresponding changes are 58.43 to 70.88 and 57.49 to 69.09. For 16-layer GCN, the layer-wise variant improves Cora from 59.36 to 65.31 and CiteSeer from 48.06 to 51.39, while epoch-wise resampling improves PubMed from 71.86 to 73.70. However, resampling is often weaker than dropout or the original model for GraphSAGE, and it lowers 8-layer GCN accuracy on CiteSeer and PubMed unless the layer-wise variant is used.

Training and validation loss plots for 8-layer GCNs show the original model developing low training loss but high or divergent validation loss on the three datasets. Under the displayed settings, resampling and its layer-wise variant produce more stable validation curves, with especially visible reductions for Cora and PubMed.

## Limitations

- The supplied text contains no publication year, venue, DOI, arXiv identifier, or code link.
- Detailed tables are provided only for the public split, despite experiments being described for three splitting protocols.
- Results do not show uniform improvement: the best method changes with dataset, architecture, and depth, and GraphSAGE frequently favors the original model or ordinary dropout.
- The comparison tunes DropEdge over several rates but reports a single fixed dropout rate, so the tuning budgets are not directly comparable.
- The proposed explanation for escaping a stationary subspace is qualitative; the paper does not provide a theorem showing that graphon resampling prevents oversmoothing.
- Neighborhood smoothing is precomputed from the full graph, and the study is limited to three citation networks with at most 19,717 nodes. Large-scale cost and behavior with other graphon estimators remain unevaluated.
- Sampling edges independently from $\hat P$ makes model quality depend on the graphon estimate and does not represent dependencies among edges beyond their estimated marginal probabilities.

## Related Concepts

- [[concepts/graphons|Graphons]]
- [[concepts/neural-message-passing|Neural Message Passing]]
- [[concepts/oversmoothing-in-graph-neural-networks|Oversmoothing in Graph Neural Networks]]

## Related Papers

- Zhang, Levina, and Zhu (2017), "Estimating Network Edge Probabilities by Neighborhood Smoothing": supplies the link-probability estimator used in the experiments.
- Chatterjee (2015), "Matrix Estimation by Universal Singular Value Thresholding": an alternative graphon estimator discussed by the paper.
- Rong et al. (2019), "DropEdge: Towards Deep Graph Convolutional Networks on Node Classification": a stochastic edge-removal baseline for deep GCNs.
- Hasanzadeh et al. (2020), "Bayesian Graph Neural Networks with Adaptive Connection Sampling": connection-sampling approach compared in the related-work discussion.
- Zhao et al. (2020), "Data Augmentation for Graph Neural Networks": related two-stage edge-probability estimation and graph augmentation using a graph autoencoder.
- Oono and Suzuki (2019), "On Asymptotic Behaviors of Graph CNNs from Dynamical Systems Perspective": stationary-subspace account used to motivate randomized propagation.

[[index|Library home]]
