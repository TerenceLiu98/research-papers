---
title: Polynomial Alignment Hypothesis
type: concept
aliases:
  - PAH
tags:
  - representation-learning
  - deep-learning-theory
  - spectral-analysis
---

## Overview

The Polynomial Alignment Hypothesis describes layerwise regimes in which activation, activation-gradient, and weight moment matrices are not directly proportional but become powers of one another on a shared supported subspace. It extends the [[concepts/canonical-representation-hypothesis|Canonical Representation Hypothesis]] by treating broken canonical alignment as structured rather than arbitrary.

## Key Ideas

- **Partial alignment implies structure:** The CRH master theorem shows that one forward and one backward alignment constrain all six moment matrices through reciprocal polynomial relations after projection onto an appropriate subspace.
- **Spectral phases:** Different exponent combinations define proposed layerwise phases. Positive eigenvalue-scaling exponents observed in the paper lie largely between $1/3$ and $3$, the reciprocal form of the theorem's exponent bounds.
- **Layer dependence:** A transformer experiment reports activation-gradient spectral exponents of 3 in the first layer, 2 in the second, and 1 in later layers, illustrating phase changes across depth.
- **Possible mechanisms:** Persistent stochastic update variance, high-rank updates, finite training time, small weight decay, and dependence between vector norms and directions can prevent exact CRH.
- **Open interpretation:** PAH classifies compatible algebraic relations; it does not yet predict from data, architecture, or optimizer which phase will occur or establish how a phase affects generalization.

## Important Papers

- [[papers/formation-of-representations-in-neural-networks|Formation of Representations in Neural Networks]] introduces PAH, proves the projected polynomial relations, and reports spectral evidence in transformers and fully connected networks.
- Pelissetto and Vicari (2002), "Critical phenomena and renormalization-group theory": supplies the analogy between scaling exponents and phases, not a neural-network derivation.

## Related Concepts

- [[concepts/canonical-representation-hypothesis|Canonical Representation Hypothesis]]: the exact-alignment regime from which PAH is derived.
- [[concepts/neural-collapse|Neural Collapse]]: compatible with a canonical phase under the paper's classification assumptions.
- Spectral scaling: the eigenvalue power laws used to identify proposed PAH phases empirically.
