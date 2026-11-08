---
title: Canonical Representation Hypothesis
type: concept
aliases:
  - CRH
tags:
  - representation-learning
  - deep-learning-theory
  - optimization
---

## Overview

The Canonical Representation Hypothesis proposes that a trained fully connected layer organizes its activation, activation-gradient, and weight second moments into a shared geometry. For $h_b=Wh_a$, it compares activation moments $H_c$, gradient moments $G_c$, and weight Gram matrices $Z_c$ on both sides of the layer. Canonical alignment means $H_c\propto G_c\propto Z_c$ in both forward and backward coordinates.

## Key Ideas

- **Six relations:** Representation-gradient, representation-weight, and gradient-weight alignment each have a forward form after the linear map and a backward form before it.
- **Noise-regularization balance:** Under concentrated norms and approximate stationarity, finite-step stochastic-gradient noise expands moment matrices while weight decay contracts them. Their balance can produce alignment at a local minimum.
- **Compact representations:** Exact CRH makes the aligned matrices proportional to a projection on their supported subspace. Directions irrelevant to first-order loss variation then have vanishing representational variance under the paper's assumptions.
- **Restricted scope:** CRH is a hypothesis supported unevenly across layers. Its derivation concerns fully connected transformations and requires stationarity conditions that stochastic training need not satisfy.
- **Special cases:** Under perfect-classification and loss-gradient covariance assumptions, CRH at the penultimate layer is equivalent to [[concepts/neural-collapse|Neural Collapse]]. Its gradient-weight relation is also an equivariant reformulation of the neural feature ansatz.

## Important Papers

- [[papers/formation-of-representations-in-neural-networks|Formation of Representations in Neural Networks]] introduces CRH, derives its noise-regularization mechanism, and evaluates it across several architectures and tasks.
- Papyan, Han, and Donoho (2020), "Prevalence of neural collapse during the terminal phase of deep learning training": establishes the terminal classifier geometry treated as a CRH special case.
- Radhakrishnan et al. (2023), "Mechanism of feature learning in deep fully connected networks and kernel machines that recursively learn features": develops the neural feature ansatz connected to gradient-weight alignment.

## Related Concepts

- [[concepts/polynomial-alignment-hypothesis|Polynomial Alignment Hypothesis]]: describes structured power-law relations when canonical proportionality is incomplete.
- [[concepts/neural-collapse|Neural Collapse]]: a classification-specific terminal geometry related to CRH under additional assumptions.
- Fluctuation-dissipation relations: the physical analogy used for the balance between gradient noise and weight decay.
