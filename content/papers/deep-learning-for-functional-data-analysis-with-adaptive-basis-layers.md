---
title: "Deep Learning for Functional Data Analysis with Adaptive Basis Layers"
type: paper
authors:
  - Junwen Yao
  - Jonas Mueller
  - Jane-Ling Wang
year: 2021
tags:
  - functional-data-analysis
  - adaptive-basis-layers
  - representation-learning
  - supervised-dimension-reduction
  - neural-networks
---

## TL;DR

This paper introduces the Adaptive Functional Neural Network (AdaFNN), whose first layer learns continuous basis functions jointly with a supervised prediction task. Each learned basis projects a functional input to one scalar score through numerical integration, allowing a small set of task-relevant features to replace raw discretization, fixed B-splines, or variance-oriented functional principal components. Across five simulations and nine real-data tasks, AdaFNN is reported to be more accurate and parsimonious than the neural baselines considered, although its guarantees and practical use depend on sufficiently dense observations and other regularity conditions.

## Research Question

Can a neural network learn a compact basis for functional covariates directly from a supervised objective, rather than selecting basis functions before training without reference to the response?

## Motivation

Functional observations are samples of intrinsically infinite-dimensional, often smooth processes, while standard neural networks expect finite-dimensional vectors. Direct discretization can preserve noise and create high-dimensional inputs. A conventional basis expansion or [[Functional Principal Component Analysis|FPCA]] reduces dimension and exploits smoothness, but its basis is chosen independently of the prediction target. In particular, FPCA preserves directions of high input variance even when a lower-variance direction contains the relevant predictive signal. The paper therefore seeks an end-to-end representation that retains the aspects of a function needed to predict the response.

## Contributions

- Introduces an [[Adaptive Basis Layers|adaptive Basis Layer]] in which every basis function is parameterized by a micro multilayer perceptron and trained jointly with the downstream network.
- Converts a discretely observed function into a compact vector of numerical inner products, accommodating uniform or non-uniform observation grids when suitable integration weights are supplied.
- Proposes cosine-similarity regularization to encourage orthogonal, nonredundant bases and an $L_1$ penalty to encourage bases that are zero outside task-relevant regions.
- Establishes a universal approximation result for targets that compose a finite-dimensional continuous linear map with a continuous nonlinear map, subject to accurate numerical integration and sufficient network capacity.
- Derives an algorithmic-stability generalization bound for stochastic-gradient training under bounded data, compact parameters, Lipschitz losses and gradients, and a decreasing learning-rate schedule.
- Reports simulation and real-data comparisons in which AdaFNN uses fewer basis functions and achieves the best predictive performance among the evaluated neural functional-data methods.

## Method

For a functional covariate $X(t)$, a Basis Layer with $d$ nodes learns continuous functions $\beta_i(t)$, each represented by a micro neural network. Node $i$ returns the projection

$$
c_i = \langle \beta_i, X \rangle = \int \beta_i(t)X(t)\,dt.
$$

With observations at grid points $t_j$, the layer approximates this integral as

$$
\tilde c_i = \sum_{j=1}^{J+1} \omega_j\,\mathrm{nn}_{\Theta_i}(t_j)X(t_j),
$$

where $\omega_j$ are numerical-integration weights, such as trapezoidal weights. The vector $(\tilde c_1,\ldots,\tilde c_d)$ is passed to an ordinary fully connected network for regression or classification. Prediction loss is backpropagated through both the downstream network and every basis micro-network, so dimension reduction and prediction are optimized together.

The orthogonality penalty averages the absolute cosine similarity between pairs of learned basis functions; for large layers, pairs can be sampled during mini-batch training. The sparsity penalty integrates $|\beta_i(t)|$ over the domain for selected bases. These penalties respectively discourage duplicated features and support domain selection, where only a subset of the functional domain affects the response.

The consistency theorem assumes the target can be written as $\mathcal T=h\circ g$, with $g$ a finite-dimensional continuous linear functional and $h$ continuous. It guarantees approximation of the mapping, not identification of each underlying basis: multiple sets of bases can parameterize the same predictor. The number of basis nodes must be sufficiently large relative to the dimension of $g$ and is selected in practice using validation performance and parsimony.

## Experiments

The study compares AdaFNN with three neural baselines: raw discretized observations, B-spline coefficients, and FPCA scores. All methods use matched downstream architectures and training settings. Five simulations isolate cases where predictive information has low marginal variance, requires a more complex basis, is contaminated by input and outcome noise, occupies only part of the functional domain, or tests the effect of basis regularization.

In simulation Cases 1-4, the best AdaFNN test MSEs are 0.001, 0.003, 0.127, and 0.193. The corresponding best baseline MSEs are 0.003, 0.019, 0.134, and 0.251. Learned bases recover the predictive signals through linear combinations and, in the domain-selection case, become zero over the irrelevant interval. In the noisier fifth case, two-basis AdaFNN variants with orthogonality or sparsity regularization obtain MSEs of 0.231 and 0.207, compared with 0.598 without regularization and 0.257 for the strongest listed baseline.

The real-data evaluation covers nine tasks from four datasets: four household-electricity tasks, three wearable-activity health classifications, and two fruit-fly lifetime-reproduction regressions. Regression is evaluated by MSE and classification by $1-\mathrm{AUC}$, so lower is better throughout the reported table. AdaFNN uses four bases for all nine tasks, versus 15 B-splines and an FPCA representation that often contains more than ten components. The authors describe AdaFNN as outperforming the baselines on all nine tasks, but the printed values are more qualified: taking the best tested configuration of each method, AdaFNN has the lowest error on seven tasks, ties B-spline plus NN at 0.477 on Task 6, and trails it slightly on the diabetes task (0.339 versus 0.335). The best regularization setting varies by dataset; sparsity yields the validation-selected AdaFNN result for one task and may also aid interpretation.

## Limitations

- Accurate Basis Layer projections require observations dense enough for reliable numerical integration. The authors identify sparsely observed functional data as an unresolved case requiring better integration and stronger inductive biases.
- The theoretical results assume a finite-dimensional linear first stage in the target map, sufficient network capacity, bounded observations and responses, compact parameter space, and Lipschitz losses and gradients.
- Consistency of the overall mapping does not make individual learned bases identifiable.
- The basis count and both regularization strengths require validation; orthogonality and sparsity can help or harm depending on the signal structure.
- The experiments compare a specific family of neural FDA baselines and do not establish superiority over every specialized functional regression, classification, or time-series method.

## Related Concepts

- [[Adaptive Basis Layers]]
- [[Functional Principal Component Analysis]]
- [[Function-Space Autoencoders]]
- Functional data analysis
- Basis expansion
- Supervised dimension reduction
- Domain selection

## Related Papers

- [[Functional Autoencoder for Smoothing and Representation Learning]]
- [[Functional Autoencoders for Functional Data Representation Learning]]
- Rossi and Conan-Guez (2005), "Functional multi-layer perceptron: A non-linear tool for functional data analysis."
- Rossi, Delannay, Conan-Guez, and Verleysen (2005), "Representation of functional data in neural networks."
- Guss and Salakhutdinov (2019), "On universal approximation by neural networks with uniform guarantees on approximation of infinite dimensional maps."

[[index|Library home]]
