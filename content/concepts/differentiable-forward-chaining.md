---
title: Differentiable Forward Chaining
type: concept
tags:
  - neuro-symbolic-learning
  - logical-reasoning
---

## Overview

Differentiable forward chaining propagates graded evidence through logical rules using continuous operations suitable for gradient-based learning. For a rule whose head follows from a conjunction of body predicates, a soft conjunction estimates body support and a soft disjunction combines rules supporting the same head.

## Key Ideas

- Classical forward chaining repeatedly adds derivable facts until closure. Continuous, finite-hop variants approximate this process and need not inherit its exact closure guarantees.
- Multiple hops allow evidence to traverse chains of rules. Fixed depth controls cost; adaptive stopping can trade additional computation for improved predictions.
- Predicate anchors give latent dimensions semantic interpretations. Learned rule embeddings connect symbolic structure to statistical objectives.
- Rule-guided generation uses the refined predicate state to parameterize future outputs. This creates a control interface, but soft activations do not guarantee valid samples.
- Semantically wrong rules can hurt more than absent rules. Rule scrambling helps distinguish useful domain structure from generic architectural bias.

## Important Papers

- [[papers/forward-chaining-temporal-point-process|Forward-Chaining Temporal Point Process]] applies soft multi-hop reasoning to latent predicate states before sampling event times and marks. Its oracle study shows both the benefit of correct rules and the cost of scrambled ones.

## Related Concepts

- [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]] evaluates distributional similarity of generated samples; this is distinct from checking logical rule satisfaction.
