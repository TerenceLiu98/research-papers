---
title: Two-Way Fixed Effects
type: concept
aliases:
  - TWFE
  - 2FE
definition: "Two-way fixed effects regression includes unit-specific and time-specific intercepts to absorb additive unit and period components in panel outcomes."
tags:
  - panel-data
  - causal-inference
  - fixed-effects
---

## Overview

Two-way fixed effects models relate a panel outcome to treatment while including separate intercepts for units and periods. In the basic specification, $Y_{it}=\alpha_i+\gamma_t+\beta X_{it}+\epsilon_{it}$. The regression coefficient requires identification assumptions to represent a causal effect.

## Key Ideas

- Unit and period intercepts accommodate arbitrary levels across units and periods, but impose additive separability of these components.
- A matching representation combines within-unit and within-time observations with an adjustment set sharing neither index. This reveals why two sets of intercepts alone do not nonparametrically eliminate both kinds of confounding.
- Ordinary 2FE equals the standard two-group, two-period DiD contrast in the familiar simple design. This numerical equivalence does not extend automatically to general multi-period comparisons.
- Imai and Kim's transition-based multi-period DiD admits a weighted regression representation that can contain negative observation weights. These regression weights should be distinguished from weights on heterogeneous causal effects in other decomposition results.

## Important Papers

- [[papers/on-the-use-of-two-way-fixed-effects-regression-models-for-causal-inference-with-panel-data|On the Use of Two-Way Fixed Effects Regression Models for Causal Inference with Panel Data]]: derives matching representations and clarifies the distinction between 2FE and multi-period DiD.

## Related Concepts

- [[concepts/fe-ldv-bracketing|FE–LDV Bracketing]]: examines a different identification issue involving fixed effects, outcome feedback, and lagged-outcome adjustment.
