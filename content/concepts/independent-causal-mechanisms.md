---
title: Independent Causal Mechanisms
type: concept
aliases:
  - ICM Principle
  - Sparse Mechanism Shift
  - SMS Hypothesis
tags:
  - causality
  - independent-causal-mechanisms
  - causal-representation-learning
  - domain-generalization
  - modularity
---

## Overview

The independent causal mechanisms (ICM) principle describes a causal generative process as a collection of autonomous modules. Each mechanism maps a variable's causes to that variable, and changing one mechanism should not directly change or reveal information about the others. This modular view links causal structure to invariance, transfer, and robustness under distribution shifts.

## Key Ideas

- In a causal factorization $P(X_1,\ldots,X_n)=\prod_i P(X_i\mid\mathbf{PA}_i)$, the factors represent mechanisms associated with the structural assignments rather than an arbitrary statistical decomposition.
- ICM has two aspects: intervening on one mechanism should leave the others unchanged, and knowing one mechanism should not provide information about another. This is different from statistical independence of the observed variables, which may be dependent even when their mechanisms are independent.
- The sparse mechanism shift (SMS) hypothesis predicts that a small change of distribution is usually local in the causal factorization: only a sparse subset of mechanisms changes.
- Multiple environments, interventions, nonstationary time series, and multiple views can expose invariances and mechanism changes that are invisible in one observational distribution. These signals can support causal discovery and representation learning.
- Mechanism modularity suggests reusing and recombining learned components across tasks and domains. It also motivates causal representations whose changes are sparse under interventions even when the corresponding pixel-space changes are distributed.
- Algorithmic formulations connect ICM to Kolmogorov complexity: mechanisms are independent when jointly compressing them does not provide a shorter description than compressing them separately.
- ICM is an assumption or inductive bias, not a universal law. Its usefulness depends on the intervention set, the representation, confounding, and whether the relevant mechanisms are actually stable across environments.

## Important Papers

- [[Toward Causal Representation Learning]]
- Parascandolo, Kilbertus, Rojas-Carulla, and Schölkopf (2018), "Learning Independent Causal Mechanisms."
- Schölkopf, Janzing, Peters, Sgouritsa, Zhang, and Mooij (2012), "On Causal and Anticausal Learning."
- Peters, Bühlmann, and Meinshausen (2016), "Causal Inference by Using Invariant Prediction: Identification and Confidence Intervals."
- Peters, Janzing, and Schölkopf (2017), "Elements of Causal Inference—Foundations and Learning Algorithms."
- Ke et al. (2019), "Learning Neural Causal Models from Unknown Interventions."

## Related Concepts

- [[Causal Representation Learning]]
- [[Disentangled Representations]]
- [[Structural Identifiability]]
- Causal discovery
- Invariance
- Modularity
- Domain generalization
