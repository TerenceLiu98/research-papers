---
title: "Functional Nonlinear Learning"
type: paper
authors:
  - Haixu Wang
  - Jiguo Cao
year: 2024
repository: "https://github.com/caojiguo/FunNoL"
tags:
  - functional-data-analysis
  - nonlinear-representation-learning
  - functional-classification
  - multivariate-functional-data
  - recurrent-neural-networks
---

## TL;DR

Functional nonlinear learning (FunNoL) jointly learns a low-dimensional representation, a curve reconstruction map, and a classifier for univariate or multivariate functional data. Its recurrent encoder-decoder preserves sequential dependence, while training on inputs corrupted by missing values and Gaussian noise encourages representations that support denoising and classification. On the reported benchmarks, FunNoL is most clearly better than FPCA for multivariate curves and large training sets, but the corruption step is not uniformly beneficial.

## Research Question

Can a nonlinear, task-aware representation of functional data improve both curve reconstruction and classification over linear FPCA scores, while directly handling multivariate trajectories, missing observations, and local noise?

## Motivation

[[Functional Principal Component Analysis]] represents curves through linear projections chosen to explain covariance. Those leading directions need not retain class-relevant variation, and applying FPCA to multivariate trajectories commonly requires concatenation or a separate multivariate construction. A representation learned only for reconstruction can have a similar mismatch with downstream prediction. The paper instead learns one shared latent space under reconstruction and classification objectives so that it captures curve structure and label information together.

## Contributions

- Introduces FunNoL, a nonlinear encoder-classifier-decoder for low-dimensional representation learning from univariate and multivariate functional observations.
- Uses recurrent networks to process a trajectory in its observed order and reconstruct the complete sequence, rather than flattening multivariate curves into one vector or concatenated univariate curve.
- Trains the representation jointly for classification and reconstruction, making each task a source of regularization for the shared latent space.
- Adds a corruption layer that randomly masks observations and injects Gaussian noise, training the decoder to recover the original trajectory from the corrupted input.
- Gives a margin-based generalization bound for the classifier and discusses gradient clipping and LSTM gating as remedies for exploding or vanishing recurrent gradients.
- Evaluates classification under complete and increasingly sparse observations, including direct comparisons with FPCA and multivariate FPCA.

## Method

For a $D$-dimensional trajectory observed at $J$ ordered grid points, an RNN encoder updates a hidden state from each vector $\mathbf{x}_j$ and maps the final state to a latent representation $\mathbf{z}$. A recurrent decoder maps $\mathbf{z}$ back to the sequence $\widetilde{\mathbf{x}}_{1:J}$, while a feed-forward classifier maps the same representation to the class probabilities. The practical implementation uses LSTM units to control long-range dependence and recurrent gradient instability.

Training minimizes the sum of classification and reconstruction losses:

$$
\mathcal{L}
= \frac{1}{N}\sum_{i=1}^{N} l_c\!\left(y_i,f(\mathbf{z}_i)\right)
+ \frac{1}{N}\sum_{i=1}^{N} l_r\!\left(\mathbf{x}_{1:J}^{i},
\psi\!\left(\phi(\mathbf{x}_{1:J}^{i})\right)\right).
$$

For robust training, the encoder instead receives $\mathbf{x}_{1:J}^{i,*}$, formed by randomly deleting observations and adding independent Gaussian noise to those retained, while the reconstruction target remains the original trajectory. The authors interpret this denoising objective as an approximate roughness penalty on the learned encoder and decoder. Missing locations contribute zero reconstruction loss. The learned representation can then feed either the network classifier or a separate classifier such as logistic regression.

## Experiments

The real-data study uses repeated train-test splits from the UCR time-series archive and evaluates the learned coordinates with logistic regression. Each comparison uses the same number of FunNoL features and FPC scores and repeats splitting, estimation, and prediction 50 times.

For univariate data, corruption-trained FunNoL reaches accuracy $0.975\,(0.003)$ on Starlight and $0.995\,(0.002)$ on Wafer, versus $0.847\,(0.006)$ and $0.927\,(0.005)$ for FPCA. The advantage is not uniform at smaller sample sizes: on SwedishLeaf, FPCA scores $0.471\,(0.057)$ while corruption-trained FunNoL scores $0.398\,(0.052)$; on Earthquakes the corresponding values are $0.810\,(0.032)$ and $0.839\,(0.035)$.

The multivariate results show the clearest gains. On Gesture, corruption-trained FunNoL reaches $0.963\,(0.0044)$ accuracy, compared with $0.880\,(0.0080)$ for FPCA and $0.887\,(0.0076)$ for multivariate FPCA. On Cricket, FunNoL without corruption reaches $0.368\,(0.033)$, compared with $0.0791\,(0.023)$ for FPCA and $0.0842\,(0.021)$ for multivariate FPCA. These results also show that corrupting the training inputs can hurt: Cricket accuracy falls from $0.368$ without corruption to $0.316$ with it.

In sparsity simulations, the authors retain between 90% and 10% of each trajectory and repeat the evaluation 50 times per setting. FunNoL classification remains comparatively stable as observations disappear. For Starlight, extra corruption helps when more than 60% of points are observed but becomes counterproductive below that level, where the already sparse input is degraded too heavily.

## Limitations

The formulation assumes trajectories are observed on an equally spaced common grid, although the authors state that extensions to differing observation times are possible. The experiments focus on functions over a one-dimensional time domain; multidimensional domains require a different neural architecture. The neural approximation benefits from larger training samples, and the univariate benchmarks do not show uniform superiority over FPCA in smaller datasets.

The corruption layer is a regime-dependent regularizer rather than a guaranteed improvement. It helps on some large datasets but reduces accuracy for Cricket and for sufficiently sparse Starlight inputs. The generalization analysis prioritizes classification, while reconstruction comparisons are deferred to supplementary material. The empirical study covers selected archive datasets and fixed feature-count comparisons, so it does not establish dominance across architectures, tuning procedures, or functional-data regimes.

## Related Concepts

- [[Functional Data Classification]]
- [[Functional Principal Component Analysis]]
- [[Functional Neural Networks]]
- [[Function-Space Autoencoders]]

## Related Papers

- [[Functional Autoencoder for Smoothing and Representation Learning]]
- [[Functional Autoencoders for Functional Data Representation Learning]]
- [[Supervised Manifold Learning for Functional Data]]
- Bishop (1995), "Training with noise is equivalent to Tikhonov regularization."
- Happ and Greven (2018), "Multivariate functional principal component analysis for data observed on different (dimensional) domains."
- Yao, Mueller, and Wang (2005), "Functional data analysis for sparse longitudinal data."

[[index|Library home]]
