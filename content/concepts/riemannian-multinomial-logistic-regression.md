---
title: Riemannian Multinomial Logistic Regression
type: concept
aliases:
  - RMLR
tags:
  - riemannian-geometry
  - classification
  - geometric-deep-learning
---

## Overview

Riemannian multinomial logistic regression classifies manifold-valued features using a metric inner product between a logarithmic displacement and a class-specific tangent normal. In the RMLR construction, each class has a learned reference point, so its score is evaluated in the tangent space at that point rather than after a single shared flattening at a fixed origin.

## Key Ideas

- **Intrinsic logits.** For $P_k\in\mathcal M$ and $\widetilde A_k\in T_{P_k}\mathcal M$, define $z_k(S)=g_{P_k}(\operatorname{Log}_{P_k}S,\widetilde A_k)$ and normalize the exponentials across classes. The logarithm must be well-defined on the inputs used.
- **Euclidean recovery.** With the Euclidean metric, $\operatorname{Log}_{p_k}x=x-p_k$, giving $z_k(x)=a_k^\top x-a_k^\top p_k$. This recovers a linear logit with bias.
- **Margin interpretation.** The angular margin $|z_k(S)|/\|\widetilde A_k\|_{P_k}$ measures the normal component of the logarithmic displacement. It is not generally the shortest geodesic distance to the zero-score set.
- **Trainable tangent normals.** Parameters can live in a fixed tangent space and be mapped to the learned reference point by parallel transport or an available group translation differential. The choice affects formulas and numerical behavior.
- **Metric-dependent classifiers.** On SPD matrices, log-Euclidean, affine-invariant, power-Euclidean, log-Cholesky, and Bures-Wasserstein metrics produce different logits. Power deformation and trace weighting provide additional choices; normalized power deformation leaves the log-Euclidean metric unchanged.
- **Numerical and scaling costs.** A point and normal per class can be expensive for many classes. Matrix decompositions, logarithm domains, and stable differentiation matter alongside predictive accuracy. Bures-Wasserstein classifiers illustrate the usefulness of differentiating a Lyapunov equation implicitly.

## Important Papers

- [[papers/rmlr-extending-multinomial-logistic-regression-into-general-geometries|RMLR: Extending Multinomial Logistic Regression into General Geometries]]: develops the common logarithm-based construction, five SPD metric families, and rotation-group classifiers.
- Chen et al. (2024), "Riemannian multinomial logistics regression for SPD neural networks": earlier flat-metric SPD construction discussed and generalized by RMLR.
- Nguyen and Yang (2023), "Building neural networks on matrix manifolds: A Gyrovector space approach": gyrogroup-based SPD classification serving as another special-case connection in RMLR.

## Related Concepts

- [[concepts/riemannian-representation-learning|Riemannian Representation Learning]]: learns the manifold-valued features on which these classifiers operate.
- [[concepts/geodesic-distance|Geodesic Distance]]: the underlying metric distance, distinct from a tangent-projection margin.
