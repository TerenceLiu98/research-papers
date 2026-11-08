---
title: "System 1 Sufficient Representations"
type: concept
aliases:
  - System 1 sufficiency
tags:
  - system-1-reasoning
  - representation-learning
  - sufficient-dimension-reduction
---

## Overview

A System 1 sufficient representation is a compressed input that preserves the information needed for a prediction and presents that information in a form a direct-decision model can use without generating intermediate reasoning. The concept distinguishes statistical sufficiency from interface compatibility: retaining predictive evidence is not enough when the model cannot reliably interpret its encoding.

## Key Ideas

- **Predictive sufficiency:** replacing the original observation $X$ with a representation $T$ should preserve the conditional answer distribution given context $C$. The information lost by compression can be measured by the conditional mutual information $I(X;Y\mid C,T)$, equivalently an expected KL divergence.
- **Realizability:** an encoder must map the context and representation into an input on which the fixed model can reproduce the optimal answer distribution available from $T$.
- **Loss decomposition:** excess optimal log loss relative to using the full observation separates into a sufficiency divergence and a realizability divergence. This makes representation construction and model-interface alignment distinct design problems.
- **Budget trade-off:** a very small representation can discard predictive information, while an unnecessarily large one can be harder for a constrained model to use. The best dimensionality need not be the largest available.
- **Inspectable evidence:** when compression selects named features, those features can expose which measurements support a direct decision even though the model does not emit a reasoning trace.

## Important Papers

- [[papers/timesjev-thinking-fast-on-time-series-with-system-1-sufficiency|TimesJev: Thinking Fast on Time Series with System 1 Sufficiency]] formalizes the concept for fixed-choice time-series questions and implements it with stochastic feature gates and learned value-token embeddings.
- Lee, Li, and Chiaromonte (2013), "A General Theory for Nonlinear Sufficient Dimension Reduction": provides the broader statistical foundation for nonlinear sufficient representations.
- Yu et al. (2024), "Distilling System 2 into System 1": studies direct-answer models produced from explicit reasoning systems, a complementary approach to reducing test-time reasoning.

## Related Concepts

- [[concepts/time-series-reasoning|Time Series Reasoning]]
- [[concepts/adaptive-test-time-reasoning-routing|Adaptive Test-Time Reasoning Routing]]
- [[concepts/numerical-decoding-through-structured-choices|Numerical Decoding Through Structured Choices]]
- [[concepts/adaptive-sparse-embeddings|Adaptive Sparse Embeddings]]
