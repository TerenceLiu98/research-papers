---
title: "Shape-Informed Clustering of Multi-Dimensional Functional Data via Deep Functional Autoencoders"
type: paper
authors:
  - Samuel Singh
  - Shirley Coyle
  - Mimi Zhang
tags:
  - functional-data-analysis
  - functional-autoencoders
  - clustering
  - phase-variation
  - manifold-learning
---

## TL;DR

FAEclust jointly learns nonlinear representations and clusters of multidimensional functional data. It combines a deep [[Function-Space Autoencoders|functional autoencoder]], regularized functional weights, a latent-space clustering loss, and a shape-informed convex clustering objective that is insensitive to translation and time reparameterization. The decoder has a universal-approximation guarantee for Euclidean function-valued outputs and a patchwise guarantee for compact connected Riemannian manifolds.

## Research Question

Can one model cluster multidimensional functional observations while learning nonlinear, discretization-independent representations, accommodating Euclidean and manifold-valued curves, and remaining robust when phase variation is a nuisance?

## Motivation

Common functional-data clustering pipelines either cluster multivariate functional principal-component scores or apply a chosen dissimilarity to the original curves. The former is limited to linear representations, while fixed-grid neural autoencoders can depend on the discretization used during training. Existing functional autoencoders preserve function-valued inputs and outputs but use a linear final reconstruction map and typically separate representation learning from downstream clustering. FAEclust is designed to learn the representation and partition together while accounting for nonlinear geometry and time warping.

## Contributions

- Extends the functional autoencoder decoder with multiple function-valued nonlinear layers and proves universal approximation for Euclidean outputs, plus patchwise approximation after a readout map for compact connected Riemannian manifolds.
- Trains the network and partition jointly: reconstruction, functional-parameter regularization, and a compactness-versus-separation clustering loss update the representation, while a separate convex clustering objective updates the partition.
- Introduces orthogonality regularization for encoder functional weights and sparsity penalties for decoder functional weights and biases.
- Uses a shape-informed similarity based on translation- and reparameterization-invariant curve distance, with fast DTW approximations available when exact pairwise computation is too expensive.
- Derives a path-following homotopy procedure that produces a clustering hierarchy in reported $\mathcal{O}(n\log n)$ time, with the partition selected along the path by internal validation.

## Method

The encoder maps a $p$-dimensional function to a finite latent vector. Its first layer integrates each input component against learned functional weights; conventional multilayer-perceptron layers then produce the bottleneck representation. The decoder maps this vector through ordinary layers and then through three function-valued layers, allowing a nonlinear map back to function space rather than restricting reconstruction to a finite-dimensional linear subspace.

Training begins with reconstruction pretraining when no initial partition is available. Fine-tuning minimizes

$$
\mathcal{L}=\mathcal{L}_r+\lambda_w\mathcal{L}_w+\lambda_c\mathcal{L}_c,
$$

where $\mathcal{L}_r$ is integrated reconstruction error, $\mathcal{L}_w$ regularizes functional parameters, and $\mathcal{L}_c$ rewards compact and separated latent clusters. Encoder weights are encouraged to be orthogonal; decoder weights and biases receive sparsity penalties.

Given current latent codes, the forward clustering step solves a convex fusion objective. Pairwise penalties are weighted by a local-neighborhood graph and by shape similarity between the original functions. The shape distance compares square-root velocity representations after optimizing over translation and time reparameterization, connecting the method to [[Functional Registration]]. A homotopy parameter traces partitions from separate points toward a single cluster, and an internal index chooses a point on this path.

## Experiments

The evaluation compares FAEclust with funHDDC, funclust, two FADP variants, a functional neural network, a functional autoencoder, and VANO. On 17 Euclidean datasets from the UEA/UCR archive, FAEclust reports the best adjusted mutual information on 12 datasets and a top-two result on 15.

Five manifold-valued simulations were repeated 100 times. FAEclust has the highest reported mean AMI on all five: 0.737 on hypersphere, 0.798 on hyperbolic, 0.432 on Swiss roll, 0.457 on Lorenz, and 0.986 on pendulum data. Corresponding mean ARI values are 0.696, 0.744, 0.205, 0.416, and 0.985; Swiss roll remains difficult despite the relative lead.

Across 12 simulations with random time warping, the paper reports an average AMI/ARI change of 0.013 between original and warped data. FAEclust leads the seven baselines on both metrics in 11 scenarios; in scenario L, FNN has higher AMI (0.728 versus 0.699), while FAEclust retains higher ARI (0.709 versus 0.667). These results support robustness to the tested phase perturbations rather than general invariance under every form of temporal distortion.

## Limitations

FAEclust is sensitive to hyperparameters and has substantial computational cost. On the Plane dataset, it takes 220 seconds, compared with 18-24 seconds for the fastest listed baselines and 31 seconds for the simpler FAE. Exact shape-distance computation is quadratic in the number of grid points for each pair and therefore expensive at moderate or large scale; faster [[Dynamic Time Warping|DTW]] variants are approximations. Optional Bayesian hyperparameter optimization adds further runtime. The manifold guarantee is patchwise, with the admissible latent-region diameter depending on curvature, rather than a global guarantee for arbitrary manifolds.

## Related Concepts

- [[Function-Space Autoencoders]]
- [[Functional Neural Networks]]
- [[Functional Registration]]
- [[Dynamic Time Warping]]
- [[Functional Principal Component Analysis]]
- [[Neural Operators]]

## Related Papers

- [[Functional Autoencoders for Functional Data Representation Learning]]
- [[Deep Learning with Functional Inputs]]
- [[Deep Learning for Functional Data Analysis with Adaptive Basis Layers]]
- [[Autoencoders in Function Space]]
- Seidman et al. (2023), "Variational autoencoding neural operators."
- Srivastava et al. (2011), "Shape analysis of elastic curves in Euclidean spaces."

[[index|Library home]]
