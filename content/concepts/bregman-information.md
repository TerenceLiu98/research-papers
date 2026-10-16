---
title: Bregman Information
type: concept
tags:
  - information-theory
  - bregman-divergences
  - quantization
---

## Overview

Bregman information is the minimum expected loss incurred by representing a random variable with one constant under a chosen [[concepts/bregman-divergences|Bregman Divergence]]. When the mean lies in the admissible relative interior and the expectations are finite,

$$
I_\phi(X)=\min_s\mathbb E[d_\phi(X,s)]
=\mathbb E[d_\phi(X,\mathbb EX)]
=\mathbb E[\phi(X)]-\phi(\mathbb EX).
$$

It is the Jensen gap of the convex potential. Its value depends on both the representation of the data and the chosen loss.

## Key Ideas

- **Variance:** For $\phi(x)=\|x\|^2$, Bregman information is $\mathbb E\|X-\mathbb EX\|^2$, the trace of the covariance matrix.
- **Mutual information:** Let $Z=p(V\mid U)$ be a random probability vector weighted by $p(U)$. With negative entropy as potential, $I_\phi(Z)=I(U;V)$. This identification depends on representing observations as conditional distributions; arbitrary KL-based Bregman information is not an unspecified mutual information.
- **Quantization decomposition:** If a cluster label $C$ has representative $M=\mathbb E[X\mid C]$, then $I_\phi(X)=\mathbb E[d_\phi(X,M)]+I_\phi(M)$. The terms correspond to within-cluster distortion and between-cluster information. Arbitrary representatives do not satisfy this identity.
- **Hard clustering:** Minimizing the information lost by replacing observations with conditional means is equivalent to minimizing expected Bregman distortion. The squared-error instance connects directly to [[concepts/representative-points|Representative Points]].
- **Compression:** For conditional-mean reproductions, $I(Z;\hat Z)+\beta\mathbb E[d_\phi(Z,\hat Z)]$ differs from $I(Z;\hat Z)-\beta I_\phi(\hat Z)$ by a fixed source term. Shannon mutual information measures encoding rate; Bregman information measures retained structure under the selected loss.
- **Information bottleneck:** KL distortion on $p(Y\mid X)$ recovers the trade-off between compression of $X$ and preservation of information about $Y$, under the corresponding conditional-expectation and Markov assumptions.

## Important Papers

- [[papers/clustering-with-bregman-divergences|Clustering with Bregman Divergences]]: defines Bregman information, proves the clustering decomposition, and develops its compression interpretation.
- Banerjee, Guo, and Wang (2004), "Optimal Bregman prediction and Jensen's equality": cited by that paper for the Jensen-gap connection.
- Tishby, Pereira, and Bialek (1999), "The information bottleneck method": the conditional-distribution/KL special case discussed in the clustering paper.

## Related Concepts

- [[concepts/bregman-divergences|Bregman Divergences]]: determines the loss and its optimal constant representative.
- [[concepts/representative-points|Representative Points]]: finite quantization with conditional-mean support points.
- [[concepts/curved-bregman-divergences|Curved Bregman Divergences]]: restricting representatives can introduce an additional projection cost beyond divergence to the mean.
