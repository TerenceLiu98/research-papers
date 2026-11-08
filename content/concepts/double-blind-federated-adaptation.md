---
title: Double-Blind Federated Adaptation
type: concept
aliases:
  - Double-Blind Federated Learning
tags:
  - federated-learning
  - foundation-model-adaptation
  - data-privacy
  - model-privacy
---

## Overview

Double-blind federated adaptation is collaborative model adaptation in which data owners do not reveal their local training data and the model provider does not reveal its proprietary backbone. It strengthens the usual federated-learning setting: distributing a model to clients may preserve data locality, but it does not preserve model confidentiality.

## Key Ideas

- **Two privacy directions:** The server must not learn client examples or individual updates, while clients must not learn the server's model parameters or other clients' data.
- **Private forward computation:** Cryptographic inference can let a server transform encrypted inputs without seeing plaintext. Fully homomorphic encryption supports arithmetic on ciphertexts, but nonlinear networks require approximations and careful management of multiplicative depth.
- **Separated trainable components:** A client-side head or parallel adapter can be updated without differentiating through the protected backbone. This limits the trainable surface while retaining more adaptation capacity than linear probing.
- **Secure aggregation:** Local trainable components can be combined without exposing individual updates. This protects update confidentiality but does not by itself hide the backbone from clients.
- **Intermediate-representation leakage:** Interactive or split execution may expose activations even when weights and inputs remain encrypted. Adjacent representations can supply input-output pairs for model extraction, so protocols must analyze what clients observe across layers and rounds.
- **System trade-offs:** Stronger bilateral privacy can shift computation to the server and multiply communication. Accuracy alone is therefore insufficient; evaluation should report cryptographic latency, ciphertext size, memory use, interaction frequency, threat assumptions, and attack coverage.

## Important Papers

- [[papers/a-framework-for-double-blind-federated-adaptation-of-foundation-models|A Framework for Double-Blind Federated Adaptation of Foundation Models]] introduces BlindFed, combining FHE-compatible transformer blocks, offline distillation, parallel adapters, secure aggregation, sample permutation, and stochastic block sampling.
- Bonawitz et al. (2017), "Practical Secure Aggregation for Privacy-Preserving Machine Learning": establishes a widely used protocol for hiding individual federated updates during aggregation.
- Poirot et al. (2019), "Split Learning for Collaborative Deep Learning in Healthcare": cited split-learning approach for collaborative training without colocating the full model and data.

## Related Concepts

- [[concepts/knowledge-distillation|Knowledge Distillation]]: can transfer a protected model into a cryptography-compatible approximation before private collaboration.
- Federated learning: preserves data locality but normally distributes model parameters to participating clients.
- Private inference: protects inputs and model execution during prediction; adaptation additionally requires a training protocol and protected update aggregation.
- Fully homomorphic encryption: enables arithmetic over ciphertexts while imposing substantial circuit-depth and systems costs.
- Parameter-efficient fine-tuning: restricts training to small modules such as adapters, reducing the state that must be learned and aggregated.
