---
title: "KAN: Kolmogorov-Arnold Networks"
type: paper
authors:
  - Ziming Liu
  - Yixuan Wang
  - Sachin Vaidya
  - Fabian Ruehle
  - James Halverson
  - Marin Soljacic
  - Thomas Y. Hou
  - Max Tegmark
year: 2024
arxiv: 2404.19756
tags:
  - kolmogorov-arnold-networks
  - spline-models
  - interpretable-machine-learning
  - scientific-machine-learning
  - symbolic-regression
---

## TL;DR

KAN replaces each scalar weight in a multilayer perceptron with a learnable univariate function, usually a B-spline, and makes each node sum its incoming edge outputs. Across the paper's small-scale function-fitting, PDE, knot-theory, and localization studies, compact [[concepts/kolmogorov-arnold-networks|Kolmogorov-Arnold Networks]] often match or outperform tested MLPs while exposing edge functions that can be pruned or approximated symbolically. These results are demonstrations rather than a general dominance result: several tasks favor known compositional or symbolic structure, Feynman-equation performance is comparable on average, training is reported to be about ten times slower per parameter, and scalability to larger tasks remains open.

## Research Question

Can neural networks built from learnable univariate functions on edges provide a more accurate and interpretable alternative to MLPs for small scientific learning tasks, while supporting depth, grid refinement, sparsification, and interaction with human domain knowledge?

## Motivation

MLPs combine linear maps with fixed node activations. They are expressive but do not directly optimize individual univariate transformations, and their learned representations generally require post hoc interpretation. The Kolmogorov-Arnold representation theorem instead expresses bounded-domain multivariate continuous functions through sums and compositions of univariate functions. Its classical inner functions may be nonsmooth, so the theorem alone does not yield a practical learner. The paper asks whether arbitrary-depth networks of smooth, trainable edge functions can exploit compositional scientific structure without inheriting the theorem's rigid two-layer form.

## Contributions

- Defines a KAN layer as a matrix of learnable univariate edge functions and obtains deeper models by composing these functional matrices.
- Parameterizes each edge as a residual SiLU basis plus a trainable B-spline and updates spline grids with observed activations.
- Gives an approximation bound for functions that already admit a smooth KAN representation: order-$k$ splines on grid size $G$ have $C^m$ error of order $G^{-k-1+m}$, with a representation-dependent constant.
- Introduces grid extension, activation-magnitude and entropy regularization, node pruning, visualization, and symbolic snapping for refining and interpreting trained networks.
- Evaluates accuracy and interpretability on synthetic functions, special functions, Feynman equations, a Poisson equation, continual learning, knot invariants, and quasiperiodic localization models.

## Method

A KAN layer maps input coordinate $x_i$ to output coordinate $j$ through an edge function $\phi_{j,i}$, then sums over incoming edges:

$$
x'_j=\sum_i \phi_{j,i}(x_i).
$$

Layers are composed to form arbitrary-depth networks. In the implementation, an edge function combines a weighted SiLU basis with a weighted B-spline expansion. For width $N$, depth $L$, grid size $G$, and fixed spline order, the parameter count scales as $O(N^2LG)$, compared with $O(N^2L)$ for an MLP; the intended tradeoff is that KANs may use narrower computation graphs.

Grid extension initializes a finer spline by least-squares matching to a trained coarse spline. For interpretation, the training objective adds layerwise activation-magnitude and entropy penalties, then removes nodes whose incoming or outgoing activation scores fall below a threshold. Learned edge functions can be fitted to affine transformations of candidate symbolic functions, fixed, and retrained. The paper also presents a contrastive unsupervised construction: real feature vectors are positive examples, independently permuted features form negative examples, and a final Gaussian edge encourages discovery of a nonzero relation among the original variables.

## Experiments

**Function fitting and scaling.** On five synthetic functions chosen to have smooth compact KAN representations, cubic-spline KANs exhibit substantially steeper parameter-error curves than the tested MLPs and approach the predicted exponent of four in several cases. In the grid-refinement example, mean test RMSE scales closer to $G^{-3}$ than the theoretical $G^{-4}$, while a median-based error is closer to $G^{-4}$; the paper attributes the gap to boundary and optimization effects. Across 15 multivariate special functions, KANs produce better reported parameter-RMSE Pareto frontiers. On the selected Feynman equations, however, KANs and MLPs are comparable on average, although pruning often discovers compact KAN graphs.

**PDE and continual learning.** For one two-dimensional Poisson problem whose solution is a symbolic composition, a two-layer width-10 KAN reports MSE near $10^{-7}$ with about $10^2$ parameters, versus near $10^{-5}$ and about $10^4$ parameters for a four-layer width-100 MLP. The authors note that the symbolic ground truth favors KANs and that their implementation trains about ten times more slowly at equal parameter count. In a one-dimensional sequence of five Gaussian regression peaks, local spline support preserves earlier peaks while the tested MLP forgets them; this is a toy demonstration, not evidence for high-dimensional continual learning.

**Knot invariants.** A $[17,1,14]$ KAN with roughly 200 parameters reaches 81.6% signature-classification accuracy, compared with 78.0% for the cited four-layer width-300 MLP with roughly 300,000 parameters. Visualization emphasizes the real and imaginary meridional translations and longitude. Symbolic approximations recover formulas correlated with the known slope relation, but require added structural assumptions to approach its compact form. In unsupervised mode, repeated runs rediscover three known relations; they do not produce a new theorem.

**Localization models.** On Mosaic, generalized Aubry-Andre, and modified Aubry-Andre models, KAN visualizations and symbolic snapping approximate mobility-edge relations. The automatically extracted generalized-model formula attains 99.0% classification accuracy versus 99.2% for the theoretical formula. For the harder modified model, human choices progressively simplify the learned expression while reducing accuracy from 97.7% to 96.6% or 95.4%, illustrating an explicit simplicity-accuracy tradeoff.

## Limitations

- The empirical scope is small-scale and science-oriented; the paper does not establish that KANs scale to language modeling, large vision systems, or other broad tasks.
- The approximation theorem assumes that the target already has a smooth KAN representation, and its constant depends on that representation and therefore on dimension. It does not guarantee that optimization will find such a representation.
- Several headline comparisons use synthetic or symbolic targets whose known compositional form favors edge-wise univariate functions. The PDE study contains one problem, and the Feynman study finds comparable average performance rather than uniform KAN superiority.
- KAN training is reported to be roughly ten times slower than MLP training at equal parameter count because heterogeneous edge functions do not benefit from the same batching as dense matrix operations.
- Pruning and symbolic recovery depend on regularization, grid size, architecture, and random seed. A compact symbolic graph may encode an unfamiliar representation rather than a uniquely meaningful scientific decomposition.
- Very fine grids can worsen optimization or produce sudden loss increases, especially when grid resolution approaches the number of sampled points along a coordinate.
- The continual-learning result is one-dimensional, while locality is difficult to define in high-dimensional learned representations. The unsupervised knot experiments rediscover known relationships and use repeated seeds rather than a systematic procedure for enumerating relations.

## Related Concepts

- [[concepts/kolmogorov-arnold-networks|Kolmogorov-Arnold Networks]]: the learnable edge-function architecture introduced and evaluated here.
- [[concepts/continual-learning|Continual Learning]]: KANs use local spline support to limit interference in a toy sequential regression task.
- [[concepts/bayesian-symbolic-regression|Bayesian Symbolic Regression]]: a related route to mathematical expressions; KAN symbolic snapping instead starts from continuously learned edge functions.
- [[concepts/adaptive-basis-layers|Adaptive Basis Layers]]: a broader view of trainable basis expansions related to KAN spline edges.
- [[concepts/functional-neural-networks|Functional Neural Networks]]: connects KANs to architectures whose transformations or parameters are functions rather than scalars.

## Related Papers

- Kolmogorov (1957), "On the representation of continuous functions of many variables by superposition of continuous functions of one variable and addition": the representation theorem motivating the architecture.
- Lai and Shen (2021), "The Kolmogorov Superposition Theorem Can Break the Curse of Dimensionality When Approximating High Dimensional Functions": cited approximation-theoretic precursor.
- Fakhoury, Fakhoury, and Speleers (2022), "ExSpliNet: An Interpretable and Expressive Spline-Based Neural Network": cited spline-network predecessor.
- Udrescu and Tegmark (2020), "AI Feynman: A Physics-Inspired Method for Symbolic Regression": supplies the symbolic-regression benchmark tradition and equation data used in later experiments.
- Davies et al. (2021), "Advancing Mathematics by Guiding Human Intuition with AI": supplies the knot-invariant task and known slope relationship revisited by KANs.
- [[papers/rational-anova-networks|Rational ANOVA Networks]]: later compares KAN-style spline units with rational main-effect and interaction units.
- [[papers/kolmogorov-arnold-network-autoencoders|Kolmogorov-Arnold Network Autoencoders]]: applies KAN layers to image reconstruction and latent representations.
- [[papers/kolmogorov-arnold-networks-for-time-series-bridging-predictive-power-and-interpretability|Kolmogorov-Arnold Networks for Time Series: Bridging Predictive Power and Interpretability]]: adapts KAN edge functions to forecasting and reports a similar training-speed limitation.

Source: arXiv:2404.19756.

[[index|Library home]]
