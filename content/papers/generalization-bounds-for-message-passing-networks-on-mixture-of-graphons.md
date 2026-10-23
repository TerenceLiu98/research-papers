---
title: Generalization Bounds for Message Passing Networks on Mixture of Graphons
type: paper
authors:
  - Sohir Maskey
  - Gitta Kutyniok
  - Ron Levie
year: null
source_job_id: bd277be8-b50d-4100-ad39-2ccc34fd4c4c
tags:
  - graph-neural-networks
  - generalization-bounds
  - graphons
  - sparse-random-graphs
---

## TL;DR

This paper derives uniform generalization bounds for [[concepts/neural-message-passing|Message Passing Neural Networks]] used for graph classification when examples are noisy, simple random graph-signals sampled from a finite mixture of [[concepts/graphons|Graphons]]. For mean or normalized-sum aggregation, the bound improves with graph size when sparsity is not too severe, despite covering a Lipschitz-bounded MPNN class rather than one fixed trained network. Synthetic Erdös-Rényi and stochastic-block experiments report bounds several orders of magnitude tighter than the compared PAC-Bayes and Rademacher bounds, with a one-layer setting below 1.

[[index|Library home]]

## Research Question

Can one obtain non-vacuous, architecture-agnostic uniform generalization bounds for MPNNs on simple, sparse, and noisy random graphs, and can those bounds explain why larger graphs may compensate for a small number of training graphs?

## Motivation

Earlier MPNN bounds are often tied to particular architectures or remain vacuous in simple settings. The authors' preceding graphon analysis permits general MPNNs but assumes clean, dense, weighted graph samples. Real graph-classification data more naturally involve random Bernoulli edges, structural and signal perturbations, and sparsity. The paper therefore asks whether graphon-based convergence can survive these changes and still yield a useful learning bound.

## Contributions

- Defines a graph-classification distribution as a finite mixture of template graphon-signals, with random graph size, bounded graphon and signal perturbations, Bernoulli edge sampling, and a sparsity factor $N^{-\alpha}$.
- Proves uniform convergence from discrete graph MPNNs to corresponding continuous graphon MPNNs for Lipschitz-bounded hypothesis classes, rather than only for a fixed network.
- Converts the high-probability convergence result into an expected uniform generalization bound that decays with both the training-set size and, under a sparsity condition, graph size.
- Extends the authors' earlier analysis from clean dense weighted graphs to noisy sparse simple graphs, adding a Bernoulli-edge error term that is asymptotically smaller than the graphon sampling term in the stated regime.
- Numerically compares the resulting bounds with PAC-Bayes and Rademacher-complexity bounds for GraphSAGE on synthetic graphon mixtures.

## Method

### Data model

Each class corresponds to one template graphon-signal $(W^j,f^j)$ on a compact metric-probability space with finite covering dimension. Sampling first chooses a class and node count $N$, perturbs the graphon and signal within an $L^\infty$ radius $\varepsilon$, samples latent node positions independently, and draws each edge as a Bernoulli variable with probability scaled by $N^{-\alpha}$. The admissibility assumptions require Lipschitz graphons and signals, bounded diameter and covering numbers, and, for mean aggregation, a uniformly positive graphon degree.

The hypothesis class contains depth-$T$ MPNNs whose message and update maps have bounded Lipschitz constants and biases, followed by a Lipschitz post-pooling classifier. The analysis covers mean aggregation and normalized sum aggregation.

### Proof strategy

The authors define a continuous MPNN in which graph neighbor aggregation is replaced by graphon integration. They first control, uniformly over Lipschitz messages and signals, the discrepancy between sampled Bernoulli aggregation and its graphon integral. A layer-wise recurrence then propagates this error through the network and pooling layer.

For a graph with $N$ nodes, underlying metric-space dimension $D$, and sparsity exponent $\alpha$, the squared discrete-to-continuous output discrepancy has leading graph-size behavior

$$
\frac{\log(N/p)N^{2\alpha}}{N^{1/(D+1)}}
$$

up to constants, a faster $\log(N)N^{2\alpha}/N$ term, and an additive perturbation term proportional to $\varepsilon$. Integrating the high-probability statement gives an expectation bound valid for arbitrary graph sizes. A multinomial concentration argument then separates class-count fluctuations from within-class graph sampling to produce the final uniform generalization bound, whose squared-gap scale is $1/m$ times the graph-size and noise terms.

The graph-size contribution decreases only when

$$
\alpha < \frac{1}{2(D+1)}.
$$

Thus the result supports larger-graph gains in a moderately sparse regime, not for arbitrary sparse graph sequences.

## Experiments

The numerical study generates four binary-classification datasets of 100,000 graphs, each with 50 nodes and sparsity $\alpha\in\{0,0.1,0.2,0.3\}$. One class is an Erdös-Rényi graphon and the other is a continuous relaxation of a two-block stochastic block model. GraphSAGE models use either mean or normalized-sum aggregation, depths of one to three layers, and training with or without weight decay. Measured network Lipschitz constants are inserted into the theoretical expressions.

Across the reported configurations, the proposed bounds are several orders of magnitude smaller than the PAC-Bayes bound of Liao et al. (2021) and the Rademacher-complexity bound of Garg et al. (2020). The paper highlights that its one-layer bound falls below 1. The experiment evaluates bound magnitude on synthetic models matching the theory; it does not report an empirical generalization-gap comparison on real graph datasets.

## Limitations

- The data distribution is restricted to a finite mixture of Lipschitz graphons on compact metric spaces with finite covering dimension; this may not represent heterogeneous real graph datasets.
- Mean aggregation requires a positive minimum graphon degree, and the benefit from increasing graph size disappears once $\alpha\geq 1/[2(D+1)]$.
- The analysis covers mean and normalized-sum aggregation, not max or other nonlinear aggregation schemes.
- Constants depend polynomially on network depth and Lipschitz parameters and on graphon regularity, so complex or weakly regularized networks can still produce large bounds.
- The experiments use synthetic 50-node graphs drawn from the same Erdös-Rényi/SBM family assumed by the analysis; they do not establish tightness or usefulness under model misspecification.
- The supplied Markdown states no publication year, venue, DOI, or arXiv identifier, so none is inferred here.

## Related Concepts

- [[concepts/graphons|Graphons]]: template kernels define the class-conditional random graph distributions and the continuous comparison networks.
- [[concepts/neural-message-passing|Neural Message Passing]]: the analyzed hypothesis class alternates Lipschitz message, permutation-invariant aggregation, and update maps.
- [[concepts/stochastic-block-models-with-covariates|Stochastic Block Models with Covariates]]: a related block-structured random-graph family; the experiments use a continuous two-block graphon without covariates.
- [[concepts/oversmoothing-in-graph-neural-networks|Oversmoothing in Graph Neural Networks]]: another theoretical property of deep message passing, distinct from the generalization question studied here.

## Related Papers

- Maskey, Levie, Lee, and Kutyniok (2022), "Generalization Analysis of Message Passing Neural Networks on Large Random Graphs": the direct predecessor, limited to clean dense weighted graph-signals.
- Levie (2024), "A Graphon-Signal Analysis of Graph Neural Networks": gives generalization bounds for arbitrary graph-signal distributions through graphon-signal cut distance, with a slower rate under its broader distributional assumptions.
- Garg, Jegelka, and Jaakkola (2020), "Generalization and Representational Limits of Graph Neural Networks": provides the Rademacher-complexity comparator used in the experiments.
- Liao, Urtasun, and Zemel (2021), "A PAC-Bayesian Approach to Generalization Bounds for Graph Neural Networks": provides the PAC-Bayes comparator used in the experiments.
- Le and Jegelka (2024), "Limits, Approximation and Size Transferability for GNNs on Sparse Graphs via Graphops": studies sparse-graph transferability through a limit object more general than graphons.
