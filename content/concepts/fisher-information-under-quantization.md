---
title: Fisher Information under Quantization
type: concept
aliases:
  - Fisher Information from Quantized Samples
tags:
  - fisher-information
  - quantization
  - distributed-estimation
---

## Overview

Fisher information under quantization measures how much local information about a statistical parameter survives when an observation is encoded into a finite message. It provides a route from a communication budget to lower bounds on estimation error, including when multiple observing nodes interact.

## Key Ideas

For a regular dominated family with score $S_\theta(X)=\nabla_\theta\log f(X\mid\theta)$ and a parameter-independent randomized encoder $p(m\mid x)$,

$$
S_\theta(M)=\mathbb E_\theta[S_\theta(X)\mid M],\qquad
\operatorname{Tr}I_M(\theta)=\mathbb E_\theta\left\|\mathbb E_\theta[S_\theta(X)\mid M]\right\|_2^2.
$$

Thus a message retains the squared magnitude of its conditional score mean, averaged over messages. Deterministic quantization admits a score-space centroid interpretation. Data processing ensures that quantization cannot increase the trace above that of the raw sample.

- **Tail-sensitive bit dependence.** With at most $2^k$ messages and uniformly bounded directional score variance $I_0$, the trace is at most $2^kI_0$. A uniform directional squared $\Psi_p$ Orlicz norm bound $I_0$ improves this to $4k^{2/p}I_0$ for $p\geq1$ and positive integer $k$.
- **Model and parameter region both matter.** Gaussian location scores are sub-Gaussian, yielding a linear-in-$k$ bound. Diagonal Gaussian variance scores are sub-exponential, yielding a quadratic bound whose tightness is unresolved in the cited paper. Sparse Bernoulli scores illustrate how dimension-dependent norm constants can make the finite-variance bound more useful.
- **Risk conversion.** For $n$ independent samples distributed one per node, suitable transcript-information bounds extend to independent, sequential, and blackboard protocols. The van Trees inequality then turns an upper bound on information into a lower bound on worst-case squared parameter error without requiring an unbiased estimator.
- **Scope.** These are local-information bounds under differentiability and integrability conditions. A tight information upper bound or a minimax lower bound alone does not construct an estimator attaining it.

## Important Papers

- [[papers/lower-bounds-for-learning-distributions-under-communication-constraints-via-fisher-information|Lower Bounds for Learning Distributions under Communication Constraints via Fisher Information]]: develops the tail-sensitive bounds and their parametric and nonparametric applications.
- Barnes, Han, and Ozgur (2018), "A geometric characterization of Fisher information from quantized samples with applications to distributed statistical estimation": earlier geometric formulation cited by the paper.

## Related Concepts

- [[concepts/representative-points|Representative Points]]: finite representations of distributions; information-preserving quantization evaluates a different objective from reconstruction error.
- Score functions: derivatives of log likelihood, whose conditional means determine retained information.
- Van Trees inequality: incorporates prior information to bound integrated estimation risk, which also lower-bounds minimax risk.
