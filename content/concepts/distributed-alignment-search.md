---
title: Distributed Alignment Search
type: concept
aliases:
  - DAS
tags:
  - mechanistic-interpretability
  - causal-abstraction
---

## Overview

Distributed Alignment Search (DAS) learns a correspondence between a variable in an interpretable causal model and a subspace of a neural network's activations. The network stays frozen while the alignment is optimized so that exchanging the subspace between prompts produces the output predicted by the corresponding causal intervention.

## Key Ideas

- **Intervene on a variable.** A source prompt supplies a counterfactual variable value; the target prompt supplies the remaining context. For an offset task, transferring the starting month should preserve the target's offset.
- **Learn a low-rank subspace.** With orthonormal basis columns in $R$, source activation $h_c$, and target activation $h_o$, the patched state is $h_o + RR^\top(h_c-h_o)$. Optimization changes the alignment, not the model weights.
- **Measure intervention agreement.** Interchange intervention accuracy is the fraction of prompt pairs for which the patched network agrees with the abstract model's counterfactual output. It differs from ordinary prediction accuracy and from observational probe accuracy.
- **Localize computational stages.** Comparing input-variable and output-variable intervention success across layers can identify where inputs combine. Cross-task transfer further tests whether distinct tasks use compatible intermediate representations.
- **Interpret within the protocol.** Results depend on the causal hypothesis, prompt-pair distribution, subspace rank, and intervention location. High agreement supports the tested abstraction without uniquely specifying every implementation detail.

## Important Papers

- [[papers/arithmetic-in-the-wild-llama-uses-base-10-addition-to-reason-about-cyclic-concepts|Arithmetic in the Wild: Llama uses Base-10 Addition to Reason About Cyclic Concepts]] uses DAS to localize a shared layer-18 addition mechanism and select causally relevant output subspaces. It attributes the method to Geiger et al. (2023).

## Related Concepts

- [[concepts/linear-probing|Linear Probing]]
- [[concepts/fourier-features-for-neural-arithmetic|Fourier Features for Neural Arithmetic]]
- [[concepts/irreducible-multidimensional-features|Irreducible Multidimensional Features]]
