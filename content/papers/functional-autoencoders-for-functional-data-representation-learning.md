---
title: "Functional Autoencoders for Functional Data Representation Learning"
type: paper
authors:
  - Tsung-Yu Hsieh
  - Yiwei Sun
  - Suhang Wang
  - Vasant Honavar
year: 2021
tags:
  - functional-data-analysis
  - functional-autoencoders
  - representation-learning
  - functional-gradient-methods
  - unsupervised-learning
---

## TL;DR

This paper introduces functional autoencoders (FAEs), neural autoencoders that map multidimensional functional data to finite-dimensional vectors and reconstruct the input in function space. FAEs replace scalar input and output weights with functional weights and use functional inner products, allowing hidden layers to model nonlinear variation and interactions among curves. The paper derives functional-gradient backpropagation and a functional extension of Adam for training the model.

## Research Question

Can a neural autoencoder learn compact, nonlinear representations of multidimensional functional data, and can its functional parameters be trained effectively with gradient-based optimization?

## Motivation

Functional observations vary over a continuum but are intrinsically infinite-dimensional, while downstream clustering, classification, and regression methods usually require finite-dimensional vectors. Functional principal component analysis (FPCA) provides a useful linear representation, but it may miss nonlinear structure within feature curves and across functional dimensions. The paper therefore seeks a representation learner that preserves the functional input-output structure while supporting nonlinear embeddings.

## Contributions

- Defines unsupervised nonlinear representation learning for multidimensional functional data.
- Introduces an FAE whose encoder maps a vector of functions to a finite-dimensional representation and whose decoder maps that representation back to functions.
- Replaces scalar first-layer weights and dot products with functional weights and $L^2$ inner products; the decoder uses functional weights to reconstruct each output curve.
- Derives functional gradients using calculus of variations and extends Adam by maintaining pointwise first- and second-moment estimates of functional gradients.
- Shows that an FAE with linear hidden activation and orthonormal functional weights recovers FPCA as a special case.

## Method

For a $P$-dimensional functional observation $\mathbf{x}(t) = [x_1(t),\ldots,x_P(t)]$, the first hidden layer computes a scalar activation from sums of functional inner products:

$$
O_k^{(1)} = \sigma\left(\sum_{j=1}^{P}\langle x_j,w_{k,j}^{(1)}\rangle\right).
$$

Additional hidden layers operate in vector space. The decoder maps the finite-dimensional hidden representation back to each function using functional output weights, with linear activation at the output. Training minimizes the integrated squared reconstruction error over the sample and feature dimensions. Functional weights are initialized as expansions in a chosen basis, such as B-splines or Fourier functions.

The learning algorithm alternates feed-forward evaluation, functional-gradient backpropagation, functional Adam moment updates, and functional-weight updates until convergence. The same framework can be extended with additional vector-space hidden layers or stacked autoencoders.

## Experiments

The experiments compare FAE with parallel autoencoders (parAE), a convolutional autoencoder (CONVAE), an LSTM autoencoder (LSTMAE), and FPCA on synthetic data and four real-world datasets: AWR, CharTraj, PM2.5, and UWave. The datasets contain between 300 and 1,571 samples, with 3 to 10 functional features and 5 to 25 clusters.

Both functional gradient descent and functional Adam reduce the training objective, while functional Adam converges more efficiently in the reported experiments. With 20-dimensional representations and K-means evaluated over 20 independent trials, FAE has the highest reported clustering accuracy, normalized mutual information, and purity for every dataset and metric in Table 2. For example, on Synthetic data its accuracy is $0.9555 \pm 0.1087$, compared with $0.8703 \pm 0.1472$ for FPCA; on UWave, its accuracy is $0.7208 \pm 0.0698$, compared with $0.6870 \pm 0.0607$ for FPCA.

The parameter analysis finds that clustering performance can decline when the embedding dimension becomes unnecessarily large, consistent with overfitting. Performance improves from one to two hidden layers in the reported settings and then decreases with additional layers. A full-batch functional Adam update takes 0.16 to 0.86 seconds across the five datasets in the reported MATLAB implementation, and convergence generally occurs after a few hundred iterations.

## Limitations

The results are based on selected synthetic and benchmark datasets and clustering as the downstream task; they do not establish that FAEs dominate for all functional-data applications. Performance depends on the basis functions, embedding dimension, hidden-layer configuration, and optimizer settings, with the parameter study showing sensitivity to excess model capacity. The paper also leaves regularization for functional-weight updates, functional attention mechanisms, and functional extensions of other neural architectures as future work.

## Related Concepts

- [[Function-Space Autoencoders]]
- [[Functional Principal Component Analysis]]
- Functional data analysis
- Representation learning
- Functional gradient methods

## Related Papers

- [[Functional Autoencoder for Smoothing and Representation Learning]]
- [[Autoencoders in Function Space]]
- Hinton and Salakhutdinov (2006), "Reducing the dimensionality of data with neural networks."
- Kingma and Ba (2014), "Adam: A method for stochastic optimization."
- Wang, Chiou, and Müller (2016), "Functional data analysis."

[[index|Library home]]
