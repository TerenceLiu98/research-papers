---
title: Nonlinear Aggregation in Group Influence
type: concept
tags:
  - social-influence
  - nonlinear-dynamics
  - aggregation
---

## Overview

Applying a nonlinear response function before averaging generally differs from applying it to an averaged input. In group-influence models, retaining meeting membership can therefore change predictions even when pairwise influence weights are identical.

## Key Ideas

For a member with meeting-conditional predicted logits $z_e$, the sigmoid aggregation gap is

$$
J=\mathbb{E}_e[\sigma(z_e)]-\sigma(\mathbb{E}_e[z_e]),
\qquad |J|\leq\frac{\sqrt{3}}{36}\operatorname{Var}_e(z_e).
$$

The expectation weights that member's meetings equally. Group prediction differences average these member-level gaps under person weighting.

- Low variance guarantees a small gap. It is not necessary: logits $-2$ and $2$ yield zero gap by sigmoid symmetry despite positive variance.
- Because sigmoid curvature changes sign, the gap can be positive or negative.
- Equal aggregate edge weights need not imply equal meeting-wise predictions. Co-attendance determines the distribution of inputs to the nonlinear readout.
- A small gap establishes agreement between two placements of a chosen rule, not agreement with observed behavior. Improving accuracy also requires the correction to align with the aggregate model's errors.
- A format effect does not alone prove an irreducible multibody influence rule: additive pairwise logits followed by nonlinear meeting-wise readout can already produce such effects.

## Important Papers

- [[papers/same-contacts-different-rooms|Same Contacts, Different Rooms]]: derives the sigmoid variance bound and tests aggregation placement under matched pairwise contacts; the gain in predictive accuracy is model-dependent.

## Related Concepts

- [[concepts/hypergraphs|Hypergraphs]]: encode the meeting membership lost by pairwise aggregation.
- [[concepts/higher-order-social-contagion|Higher-Order Social Contagion]]: related group-dependent dynamics; nonlinear readout effects should be distinguished from explicit multibody transmission rules.
