---
title: Formation of Representations in Neural Networks
type: paper
authors:
  - Liu Ziyin
  - Isaac Chuang
  - Tomer Galanti
  - Tomaso Poggio
year: 2024
arxiv: "2410.03006v2"
tags:
  - representation-learning
  - deep-learning-theory
  - neural-collapse
  - optimization
---

## TL;DR

The paper proposes the [[concepts/canonical-representation-hypothesis|Canonical Representation Hypothesis]] (CRH): within a trained fully connected layer, second-moment matrices of activations, activation gradients, and weights tend to align in both forward and backward coordinates. A stationarity analysis attributes this organization to a balance among learning, finite-step gradient noise, and weight decay. When exact alignment fails, the [[concepts/polynomial-alignment-hypothesis|Polynomial Alignment Hypothesis]] (PAH) predicts reciprocal power-law relations among their spectra.

## Research Question

Can a common set of relations explain how hidden representations become structured during neural-network training, when those relations should hold, and what replaces them when exact alignment fails?

## Motivation

Empirical phenomena such as [[concepts/neural-collapse|Neural Collapse]] and the neural feature ansatz connect features, gradients, or weights in particular settings. The paper seeks a layer-local framework that treats all three objects symmetrically and applies beyond the penultimate layer of classifiers.

## Contributions

- Defines six forward and backward alignments among activation moments, gradient moments, and weight Gram matrices.
- Derives approximate canonical alignment from mean-field norm assumptions and stationarity under stochastic optimization with weight decay.
- Proves algebraic redundancy among alignment relations and derives a finite family of reciprocal polynomial relations when only subsets hold.
- Connects CRH to compact, task-invariant representations and shows equivalence to neural collapse under stated perfect-classification and loss-covariance assumptions.
- Tests alignment across fully connected networks, ResNet-18 classifiers, self-supervised ResNet-18 models, and a 100M-parameter transformer.

## Method

For a linear map $h_b=Wh_a$, the paper defines activation moments $H_c=\mathbb{E}[h_ch_c^\top]$, gradient moments $G_c=\mathbb{E}[g_cg_c^\top]$, and weight Gram matrices $Z_a=W^\top W$ and $Z_b=WW^\top$. CRH consists of representation-gradient, representation-weight, and gradient-weight proportionalities for both $c=a$ and $c=b$.

The theory expands one-step changes under SGD with weight decay. Under concentrated activation and gradient norms, approximate stationarity of feature, gradient, and weight moments makes finite-step gradient noise balance regularization. At a local minimum, this yields mutual proportionality of $H_c$, $G_c$, and $Z_c$. A separate master theorem uses matrix identities and projected pseudoinverses to show that partial forward and backward alignment implies polynomial relations among the six matrices, with exponents between $-1$ and $3$ before equivalent reciprocal forms are considered.

Alignment is measured by a Pearson-style correlation between normalized covariance matrices. The experiments subtract means and normalize activation and gradient vectors before estimating covariance.

## Experiments

- In the final fully connected layers of ResNet-18 on CIFAR-10, all six relations show substantial alignment; reported alignment exceeds 0.7 early and strengthens later.
- In a six-layer, eight-head, 100M-parameter transformer trained on OpenWebText, activation-gradient spectral relations progress from exponents 3 and 2 in early layers to exponent 1 in later layers, matching PAH’s predicted range.
- Self-supervised ResNet-18 experiments show stronger representation-gradient alignment in fully connected layers than convolutional layers.
- Controlled fully connected networks show stronger alignment in deeper layers and with larger weight decay. Batch size and width affect early and late layers differently.
- Across fully connected layers, stronger alignment correlates with lower-rank representations, but this correlation does not establish that alignment causes compactness.

## Limitations

- The formal alignment claims apply to fully connected linear transformations; convolutional and attention components are evaluated through selected representations rather than covered directly by the theorem.
- The derivation assumes concentrated norms and approximate stationarity of several moments. These conditions can fail, especially when stochastic updates retain nonzero variance.
- The work primarily characterizes late training and does not provide a full theory of representation dynamics or identify which PAH phase a training setup will select.
- Empirical support varies by layer and task: convolutional layers in self-supervised models align less strongly, and activation norm-direction dependence provides an observed source of CRH breaking.
- The experiments use finite covariance estimates and a chosen normalization-and-centering procedure; the reported regularities are not evidence that exact proportionality holds universally.

## Related Concepts

- [[concepts/canonical-representation-hypothesis|Canonical Representation Hypothesis]]: the six proposed layerwise alignment relations.
- [[concepts/polynomial-alignment-hypothesis|Polynomial Alignment Hypothesis]]: reciprocal spectral power laws arising from partial alignment.
- [[concepts/neural-collapse|Neural Collapse]]: recovered as a special case under restrictive interpolation and covariance assumptions.

## Related Papers

- Papyan, Han, and Donoho (2020), "Prevalence of neural collapse during the terminal phase of deep learning training": establishes the classifier geometry generalized by CRH.
- Radhakrishnan et al. (2023), "Mechanism of feature learning in deep fully connected networks and kernel machines that recursively learn features": introduces the neural feature ansatz related to gradient-weight alignment.
- Huh et al. (2024), "The Platonic Representation Hypothesis": documents cross-model similarity of learned representations rather than within-layer activation-gradient-weight alignment.
- [[papers/neural-collapse-a-review-on-modelling-principles-and-generalization|Neural Collapse: A Review on Modelling Principles and Generalization]]: reviews the scope and generalization limits of the principal special case.

[[index|Library home]]
