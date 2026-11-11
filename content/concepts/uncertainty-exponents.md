---
title: Uncertainty Exponents
type: concept
tags:
  - dynamical-systems
  - reproducibility
---

## Overview

An uncertainty exponent measures how rapidly outcome disagreement decreases as uncertainty in initial conditions shrinks. For destination mismatch probability, the scaling is $f(\varepsilon) \propto \varepsilon^{\phi_p}$.

## Key Ideas

- Small positive exponents mean that large improvements in precision yield modest reductions in disagreement. A near-zero empirical estimate need not be exactly zero.
- Functional exponents replace destination labels with a functional difference measure such as prediction churn. They diagnose behavioral sensitivity, not basin geometry.
- Interpret slope together with disagreement magnitude: an almost constant but negligible difference is not substantial irreproducibility.
- Report the sampled neighborhood, perturbation distribution, training horizon, destination thresholds, fitting range and numerical precision.

## Important Papers

- [[papers/fractal-basin-geometry-and-the-limits-to-predictability-and-reproducibility-in-deep-learning|Fractal basin geometry and the limits to predictability and reproducibility in deep learning]] connects these ideas to neural-network training through a minimal model and empirical deep-network diagnostics.

## Related Concepts

- [[concepts/riddled-basins|Riddled Basins]]
