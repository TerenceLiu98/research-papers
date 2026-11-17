---
title: Chain-of-Thought Computational Complexity
type: concept
aliases:
  - CoT Complexity Classes
definition: "The study of how bounds on autoregressive intermediate decoding steps constrain the decision problems solvable by a specified transformer model."
tags:
  - computational-complexity
  - chain-of-thought
  - transformers
---

## Overview

Chain-of-thought computational complexity treats intermediate decoding as a formal computational resource. A transformer repeatedly appends an output token to its prefix and eventually emits an acceptance or rejection decision. The class $\operatorname{CoT}(r(n))$ contains languages decidable with $O(r(n))$ generated steps on inputs of length $n$.

## Key Ideas

- **Model assumptions define the class.** Attention type, precision, normalization, and positional encodings determine which simulations and lower bounds apply.
- **Step count differs from runtime.** Each decoding step can attend to an expanding prefix. In the log-precision saturated-attention setting discussed by Le, Pavan, and Vinodchandran, known Turing-machine simulation costs are roughly quadratic up to logarithmic factors.
- **Hierarchy means existential separation.** A strict inclusion establishes that some languages need larger asymptotic budgets; it does not guarantee that any particular trained model improves when asked to generate more text.
- **Padding transfers resource bounds.** Appending a dummy suffix changes input length while preserving the underlying decision problem. Transformer constructions must control attention to that suffix and align the original and padded decoding boundaries.
- **Regularity and regime matter.** The hierarchy in the cited paper applies to regular time-constructible bounds at least linear in input length and separates $r$ from $r^{1+\varepsilon}$; sublinear and polylogarithmic-gap hierarchies remain open there.

## Important Papers

- [[papers/a-tight-hierarchy-for-chain-of-thought|A Tight Hierarchy for Chain of Thought]]: uses transformer-compatible padding to prove strict constant-exponent budget separations.
- Merrill and Sabharwal (2023), *The expressive power of transformers with chain of thought*: cited by that paper for simulations between time-bounded Turing machines and CoT transformers.

## Related Concepts

- [[concepts/latent-reasoning|Latent Reasoning]] concerns where computation is represented. CoT complexity instead counts generated steps under a formal model; those tokens need not be natural-language explanations.
