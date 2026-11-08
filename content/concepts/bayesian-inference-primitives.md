---
title: Bayesian Inference Primitives
type: concept
aliases:
  - Inference Primitives
tags:
  - bayesian-inference
  - sequence-models
  - model-architectures
---

## Overview

Bayesian inference primitives decompose sequential posterior computation into recurring operations that different model architectures may implement with different reliability. One proposed taxonomy consists of belief accumulation, belief transport, and random-access binding. It is an empirical framework for relating task demands to architectural mechanisms, not a general impossibility theorem about model classes.

## Key Ideas

- **Belief accumulation:** Integrate observations into a running posterior or sufficient statistic over fixed latent hypotheses. Bijection learning isolates this operation by progressively eliminating mappings.
- **Belief transport:** Propagate probability mass through latent dynamics before incorporating new evidence. HMM filtering requires repeated transition and emission updates rather than only retaining a static statistic.
- **Random-access binding:** Retrieve a stored hypothesis or observation by its content rather than by a fixed position. Associative recall tests this operation through query-cue matching.
- **Task-architecture matching:** Residual streams and recurrent states can accumulate evidence; selective state-space dynamics can transport it; attention supplies direct query-key retrieval. Whether these mechanisms are learned depends on task construction, capacity, optimization, and evaluation.
- **Qualified architectural claims:** Results from controlled experiments can show that a trained implementation realizes a primitive on the tested distribution. They do not prove that an architecture can never realize a missing primitive under another parameterization or training procedure.

## Important Papers

- [[papers/the-bayesian-geometry-of-transformer-attention|The Bayesian Geometry of Transformer Attention]]: proposes the three-part taxonomy and tests Transformers, Mamba, LSTMs, and MLPs on tasks aligned with the proposed primitives.

## Related Concepts

- [[concepts/bayesian-wind-tunnels|Bayesian Wind Tunnels]]
- [[concepts/in-context-learning|In-Context Learning]]
- [[concepts/semantic-associations-in-transformers|Semantic Associations in Transformers]]
