---
title: Fourier Features for Neural Arithmetic
tags:
  - mechanistic-interpretability
  - neural-arithmetic
  - representation-geometry
type: concept
---

## Overview

Fourier features encode a number through periodic coordinates such as $\sin(2\pi n/T)$ and $\cos(2\pi n/T)$. In a language model, learned activation directions can represent these coordinates, and groups of neurons can contribute to arithmetic computations in the corresponding planes. Recovering the coordinates with a probe and showing that the model uses them are separate empirical questions.

## Key Ideas

- **Multiple periods encode numerical structure.** A sine/cosine pair identifies phase modulo its period. Several periods supply complementary information, although a finite collection can still leave larger numbers ambiguous.
- **Periodicity can follow numerical conventions.** The Llama-3.1-8B case study identifies periods 2, 5, 10, 20, 50, and 100 in addition representations, and finds overlapping features in calendar arithmetic despite cycle lengths of 7, 12, and 24.
- **Probe transfer tests shared representations.** Probes trained on addition recover periodic structure in cyclic-task activations. Steering those directions toward a different sum adds causal evidence beyond recoverability alone.
- **Neuron groups implement phase updates.** In the studied layer-18 MLP, neurons with similar activation periodicity write to matching Fourier planes. Their activation-weighted output vectors combine to approximate the phase of the sum.
- **Short periods sharpen predictions.** Ablating two parity neurons in the case study shifts probability toward neighboring outputs of the wrong parity. Smaller periods can therefore matter even alongside larger-period features.
- **Concept geometry need not be computation geometry.** A circular month representation can coexist with intermediate base-10 arithmetic and a later conversion back to month space. The final conversion and the generality of this mechanism require separate analysis.

## Important Papers

- [[papers/arithmetic-in-the-wild-llama-uses-base-10-addition-to-reason-about-cyclic-concepts|Arithmetic in the Wild: Llama uses Base-10 Addition to Reason About Cyclic Concepts]] connects Fourier probes, cross-task interventions, and a sparse neuron set. Its steering requires amplification and its neuron set does not retain all performance, so it is not a complete account of the network.

## Related Concepts

- [[concepts/distributed-alignment-search|Distributed Alignment Search]]
- [[concepts/irreducible-multidimensional-features|Irreducible Multidimensional Features]]
- [[concepts/linear-probing|Linear Probing]]
