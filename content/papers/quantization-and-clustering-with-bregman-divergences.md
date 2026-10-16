---
title: Quantization and Clustering with Bregman Divergences
type: paper
authors:
  - Aurélie Fischer
year: 2010
tags:
  - bregman-divergences
  - quantization
  - functional-data-analysis
  - statistical-learning-theory
---

## TL;DR

Fischer studies finite-codebook quantization under [[concepts/bregman-divergences|Bregman Divergences]] for random variables in separable reflexive Banach spaces. The paper gives sufficient conditions for population and empirical minimizers to exist, establishes consistency of empirical optimal distortion, and reports dimension-free expected excess-distortion bounds of order $k/\sqrt n$ under additional boundedness assumptions. These are guarantees for global empirical minimizers; practical Bregman k-means supplies local solutions.

[[index|Library home]]

## Research Question

When do optimal Bregman quantizers exist for vector-valued or functional observations, and when does minimizing distortion on an independent sample recover the optimal population distortion as sample size increases?

## Motivation

Squared Euclidean quantization represents observations by a small set of centers. Functional data and probability distributions motivate other losses and potentially infinite-dimensional spaces. Earlier Bregman clustering work emphasizes finite-dimensional algorithms; this paper investigates the existence and statistical performance of the optimization targets themselves.

## Contributions

- Extends the conditional-mean characterization of Bregman representatives to functional divergences, assuming finite expectations and an admissible conditional mean (Proposition 2.1).
- Gives separate existence arguments for finite-dimensional domains and bounded convex subsets of reflexive Banach spaces (Theorems 3.1-3.2), with an empirical counterpart (Corollary 3.2).
- Establishes almost-sure distortion consistency under finite-dimensional continuity, boundary growth, and convexity conditions; the general-space result adds bounded support and bounded derivatives and also gives convergence in expectation (Theorems 4.1-4.2).
- Uses Rademacher averages to report expected excess-distortion bounds without an explicit dimension factor (Theorem 4.3 and Corollary 4.1).

## Method

Let $X$ take values in a convex subset $C$ of a separable reflexive Banach space. For a strictly convex potential $\phi$, twice continuously differentiable on $\operatorname{ri}(C)$, define

$$
d_\phi(x,c)=\phi(x)-\phi(c)-D_c\phi(x-c),
$$

where $D_c\phi$ is a continuous linear functional. The standing assumptions include $\mathbb E\|X\|<\infty$, $\mathbb EX\in\operatorname{ri}(C)$, and integrability of $\phi(X)$ and $D_c\phi(X)$ for admissible centers.

For a codebook $\mathbf c=(c_1,\ldots,c_k)$, the population and empirical objectives are

$$
W(\mu,\mathbf c)=\mathbb E\min_{j\leq k}d_\phi(X,c_j),
\qquad
W(\mu_n,\mathbf c)=\frac1n\sum_{i=1}^n\min_{j\leq k}d_\phi(X_i,c_j).
$$

Nearest-center assignment is optimal for a fixed codebook. For a fixed positive-probability cell $S$, its unique optimal representative is $m_S=\mathbb E[X\mid X\in S]$ when this mean lies in the admissible relative interior. The proof uses

$$
\mathbb E[d_\phi(X,c)\mid S]-\mathbb E[d_\phi(X,m_S)\mid S]
=d_\phi(m_S,c).
$$

This supports alternating assignment and sample-mean updates, but does not establish global optimality of the resulting algorithm.

### Existence and Consistency

In finite dimensions, Theorem 3.1 combines lower semicontinuity with conditions preventing boundary or escaping centers from improving the infimum. The proof uses one-point compactification. Theorem 4.1 strengthens the conditions to continuity, divergence to infinity at the relevant boundary and at infinity, and convexity in the center argument, obtaining almost-sure consistency.

For the general-space result, assume the data lie almost surely in a closed bounded convex set $C_R\subset\operatorname{ri}(C)$. Reflexivity supplies weak compactness, and weak lower semicontinuity in the center yields existence (Theorem 3.2). A uniform bound on $\|D_c\phi\|$ over $C_R$ gives almost-sure and expected convergence of $W(\mu,\mathbf c_n^*)$ to $W^*(\mu)$ (Theorem 4.2). The squared Hilbert-norm case also has an existence corollary under the standing integrability assumptions without requiring bounded data support.

### Reported Rate

Subtracting the codebook-independent term $\mathbb E\phi(X)$ leaves a minimum of affine functions of $X$. Symmetrization and Rademacher contraction control this class. Under the support and semicontinuity assumptions, and uniform bounds

$$
| -\phi(c)+D_c\phi(c)|\leq M_1,
\qquad \|D_c\phi\|\leq M_2,
$$

Corollary 4.1 reports

$$
\mathbb E W(\mu,\mathbf c_n^*)-W^*(\mu)
\leq \frac{4k}{\sqrt n}
\left(M_1+M_2(\mathbb E\|X\|^2)^{1/2}\right).
$$

The constants depend on the potential and admissible region. With $\|X\|\leq R$, the paper gives $12kR^2/\sqrt n$ for squared Euclidean and squared $L^2$ distortion, and $12k\|A\|R^2/\sqrt n$ for a positive-definite Mahalanobis matrix $A$ (Example 4.7).

## Experiments

There are no datasets, numerical experiments, or runtime comparisons. The evidence consists of proofs and analytical examples covering squared losses, exponential loss, I-divergence, KL divergence, and functional losses. Example 4.7 specializes the reported rate bounds; Remark 4.1 discusses extra logarithmic-envelope conditions for KL-type losses.

## Limitations

- The statistical results concern global empirical minimizers at fixed $k$. They do not bound the optimization error of a local k-means solution or establish convergence of the center locations.
- Bregman divergences need not be convex in their second argument. The paper explicitly identifies Itakura-Saito divergence as failing that hypothesis of Theorem 4.1.
- Bounded support alone does not bound logarithmic derivatives near zero. KL-type rate applications require further restrictions on the data and admissible codebooks.
- The displayed rates are reported results, not independently verified guarantees for every reflexive Banach space. In the supplied text, Lemma 5.2(iii) passes from a squared norm of a Rademacher sum to a sum of squared norms without stating an additional geometric assumption; the displayed argument does not justify that step for a general Banach norm.
- The supplied Markdown contains damaged equations and prose. No DOI or journal bibliographic details for this article are supplied, so none are inferred here.

## Related Concepts

- [[concepts/bregman-divergences|Bregman Divergences]]: the loss geometry and its extension through a Fréchet derivative.
- [[concepts/bregman-information|Bregman Information]]: expected distortion to a mean and the associated quantization decomposition.
- [[concepts/representative-points|Representative Points]]: squared-error quantization is a special case; this paper studies sample-size consistency at fixed codebook size.

## Related Papers

- [[papers/clustering-with-bregman-divergences|Clustering with Bregman Divergences]]: Banerjee et al. (2005), reference 4, supplies the finite-dimensional clustering framework that Fischer extends toward functional observations and statistical guarantees.
- Banerjee, Guo, and Wang (2005), "On the optimality of conditional expectation as a Bregman predictor" (reference 3): antecedent to the conditional-mean result.
- Biau, Devroye, and Lugosi (2008), "On the performance of clustering in Hilbert spaces" (reference 7): prior Hilbert-space clustering theory.
- Frigyik, Srivastava, and Gupta (2008), "Functional Bregman divergence and Bayesian estimation of distributions" (reference 15): functional-divergence background.
