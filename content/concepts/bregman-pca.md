---
title: Bregman PCA
type: concept
aliases:
  - Bregman Principal Component Analysis
tags:
  - dimensionality-reduction
  - representation-learning
  - information-geometry
---

## Overview

Bregman PCA generalizes principal component analysis by replacing squared Euclidean reconstruction error with a Bregman divergence. It represents observations through a low-dimensional code and a link function appropriate to the data geometry. For neural activations, choosing the layer's transfer function as the link makes reconstruction sensitive to the nonlinearity that generated the representation.

## Key Ideas

- **Divergence and link:** A differentiable convex potential $F$ defines $D_F(u,v)=F(u)-F(v)-\nabla F(v)^\top(u-v)$. In the activation-aware formulation, $f=\nabla F$ and observations are reconstructed as $\hat y=f(m+Vc)$ using the dual divergence $D_{F^*}(y,\hat y)$.
- **Dual centering:** The extension by Amid and colleagues sets $m=f^{-1}(n^{-1}\sum_i y_i)$. The mean lives in pre-activation coordinates, while its image under $f$ equals the arithmetic mean of observations.
- **Local normalization:** Directions satisfy $V^\top H_F(m)V=I_k$ when the Hessian supplies a positive-definite metric. Orthogonality is defined at the mean, not independently at every data point. An identity link recovers ordinary PCA.
- **Metric-aware QR:** Factoring $M^{1/2}V=\widetilde Q R$ and setting $Q=M^{-1/2}\widetilde Q$ gives $Q^\top M Q=I_k$. Transforming coefficients by $R$ preserves $Vc$. The general nonlinear objective still requires iterative optimization.
- **Probability data:** Softmax reconstruction yields valid probability vectors and a KL reconstruction loss. Its invariance to constant logit shifts needs explicit treatment; the unrestricted invertible-link derivation cannot simply be applied unchanged.
- **Teacher-derived decoder:** A fixed $m,V,f$ can decode coefficients predicted by a student, creating an intermediate supervision target for [[concepts/knowledge-distillation|knowledge distillation]]. The code dimension trades compression against reconstruction quality; the best choice is data- and layer-dependent.

## Important Papers

- Collins, Dasgupta, and Schapire (2001), "A generalization of principal component analysis to the exponential family": foundational generalized-PCA work cited by the paper below.
- [[papers/layerwise-bregman-representation-learning-of-neural-networks-with-applications-to-knowledge-distillation|Layerwise Bregman Representation Learning of Neural Networks with Applications to Knowledge Distillation]] adds dual centering and local metric normalization, and evaluates fixed-decoder transfer on CIFAR and ImageNet.

## Related Concepts

- [[concepts/knowledge-distillation|Knowledge Distillation]]: the teacher/student application of compressed representation transfer.
- [[concepts/low-rank-knowledge-distillation|Low-Rank Knowledge Distillation]]: a related capacity restriction, often applied to student weights or projections; Bregman PCA instead specifies a nonlinear reconstruction geometry for activations.
