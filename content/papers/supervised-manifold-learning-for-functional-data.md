---
title: "Supervised Manifold Learning for Functional Data"
type: paper
authors:
  - Ruoxu Tan
  - Yiming Zang
year: null
repository: "https://github.com/ruoxut/FunctionalManifoldLearning"
tags:
  - functional-data-analysis
  - functional-classification
  - supervised-manifold-learning
  - geodesic-distance
  - nonlinear-dimension-reduction
---

## TL;DR

This paper proposes functional supervised manifold learning (FSML), a classifier for functional observations assumed to lie on an unknown low-dimensional manifold. FSML estimates geodesic distances, enlarges distances between observations with different labels through a distance-dependent penalty, applies multidimensional scaling (MDS), and interpolates the resulting coordinates for new curves. Across simulated and real functional datasets, FSML is especially competitive when the intrinsic dimension is low, while high-dimensional Gaussian settings favor some existing functional classifiers.

## Research Question

Can functional classification improve by learning a low-dimensional manifold representation that simultaneously preserves the geometry of the curves and separates observations by class? Can the resulting coordinate map be interpolated to new functional observations with theoretical guarantees?

## Motivation

Many functional classifiers use functional principal component analysis (FPCA), functional regression, or distances in the ambient function space. These approaches can be inefficient when curves vary along a nonlinear, low-dimensional manifold. Phase variation is one example: it can inflate ambient variance and make leading PC scores entangle classes even when the underlying variation is governed by few parameters.

The paper argues that label separation alone is insufficient. A representation that pulls different classes apart without preserving local manifold geometry may be impossible to interpolate for a nearby, unlabeled curve. FSML therefore balances class separation with preservation of geodesic structure.

## Contributions

- Defines a supervised proximity measure that adds a decreasing, distance-dependent penalty to pairs from different classes.
- Combines functional curve recovery, functional parallel transport unfolding (FPTU), MDS, and local tangent-space regression into an out-of-sample functional classifier.
- Provides with-in-sample and out-of-sample convergence rates for the estimated coordinate map under regularity conditions.
- Proves that the FSML classifier coupled with the vanilla k-nearest-neighbor (k-NN) rule is asymptotically optimal under the paper's assumptions.
- Shows highly competitive results across time-warping, Swiss-roll, torus, low-dimensional Gaussian, and high-dimensional Gaussian simulations, as well as yeast gene, diffusion tensor imaging (DTI), and wine spectra data.

## Method

Let $X$ be a second-order random function in $L^2(\mathcal{T})$ and let $Y$ be its class label. The method assumes that the support of $X$ lies on an unknown $d$-dimensional functional manifold $\mathcal{M}$. For pairwise observations, it defines

$$
\mathbb{D}_{\xi}(i,j) = d_{\mathcal{M}}(X_i,X_j) + \frac{\xi\,\mathbb{1}\{Y_i\neq Y_j\}}{d_{\mathcal{M}}(X_i,X_j)+\sqrt{\xi}},
$$

where $d_{\mathcal{M}}$ is geodesic distance and $\xi>0$ controls class separation. The penalty is largest for close observations from different classes, while the ordering of different-class pairs by geodesic distance is preserved.

For discrete noisy measurements, FSML first recovers each curve with a ridged local linear estimator. It estimates geodesic distances with FPTU: a connected graph is built from local neighborhoods and a minimum spanning tree, tangent spaces are estimated with local PCA, and graph edges are parallel transported and aggregated along shortest paths. The two directed unfolded-path lengths are averaged. MDS applied to the estimated proximity matrix gives low-dimensional coordinates $\widehat{Z}_i$.

For a new curve $x$, FSML estimates its tangent space and regresses the training coordinates on local tangent-space coordinates using local linear regression. A multivariate classifier, such as k-NN, a support vector machine, or linear discriminant analysis, is then trained on $(\widehat{Z}_i,Y_i)$ and composed with the interpolated coordinate map. The tuning parameters $\xi$ and the regression bandwidth are selected with nested $L$-fold cross-validation.

## Experiments

The simulations use five binary-classification models with training settings $(n,J)=(200,50)$ and $(500,100)$, an independent test sample of size 500, and 200 repetitions. FSML is combined with k-NN, SVM, and LDA and compared with the centroid classifier (CC), functional quadratic discriminant analysis (FQDA), a nonparametric Bayesian classifier (NB), and a functional deep neural network (FDNN).

At $n=500$, FSML misclassification errors are 17.0%--17.1% for time warping, 1.1%--1.2% for two Swiss rolls, 5.0%--5.1% for the torus, 13.2%--13.4% for low-dimensional Gaussian data, and 27.6%--27.8% for high-dimensional Gaussian data. FSML is particularly strong on the Swiss-roll and torus manifolds, while CC/NB are slightly better on time warping and FQDA/NB are better on the high-dimensional Gaussian model.

For visualization, FSML unfolds the two Swiss rolls and separates the torus classes in low-dimensional coordinates where the first two FPCA scores do not linearly separate the classes. In the sensitivity study, the Swiss-roll and torus simulations have well-separated error minima near $\sqrt{\xi}=20$; for the other models, performance changes little after the penalty exceeds a threshold.

The real-data evaluation repeats five-fold cross-validation 100 times. FSML errors are 5.7%--6.9% on the yeast gene data, 23.6%--24.1% on DTI, and 7.0%--7.1% on wine spectra. CC is best on yeast at 5.5%, FSML is best on DTI, and FSML is best on wine. The results support competitive performance rather than uniform dominance across all datasets.

## Limitations

The method assumes that functional observations lie on a low-dimensional manifold that can be represented by a single coordinate chart. Its advantages are therefore less compelling when the intrinsic dimension is high or when the manifold assumption is a poor approximation. Discrete noisy observations require enough coverage for curve smoothing; large noise can inflate the estimated intrinsic dimension, making presmoothing important.

The theoretical results depend on regularity conditions for curve recovery, geodesic estimation, tangent-space estimation, MDS, interpolation, and classification. The coordinate map is not intrinsically unique, and the paper imposes an identifiability assumption for its convergence analysis. The reported evaluations are limited to binary classification and selected synthetic and real datasets. Extension to multidimensional or multivariate functional data is left for future work.

## Related Concepts

- [[Supervised Manifold Learning]]
- [[Functional Data Classification]]
- [[Geodesic Distance]]
- [[Functional Principal Component Analysis]]
- [[Riemannian Representation Learning]]

## Related Papers

- Chen and Muller (2012), "Nonlinear manifold representations for functional data."
- Tan, Zang, and Yin (2024), "Nonlinear dimension reduction for functional data with application to clustering."
- Tenenbaum, De Silva, and Langford (2000), "A global geometric framework for nonlinear dimensionality reduction."
- Delaigle and Hall (2012), "Achieving near perfect classification for functional data."
- Dai, Muller, and Yao (2017), "Optimal Bayes classifiers for functional data and density ratios."
- Budninskiy, Yin, Feng, Tong, and Desbrun (2019), "Parallel transport unfolding: A connection-based manifold learning approach."

[[index|Library home]]
