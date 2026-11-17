---
title: Hierarchical Spatial Probit
type: concept
aliases:
  - HSAR Probit
definition: "Hierarchical spatial probit models binary outcomes through a latent Gaussian response with spatial dependence among observations and a separate spatial process among group intercepts."
tags:
  - spatial-statistics
  - hierarchical-modeling
---

## Overview

Hierarchical spatial probit combines a binary response model with two distinct sources of dependence: interactions among lower-level observations and spatially correlated higher-level baseline propensities. It is useful when observations are nested in groups that can themselves influence one another.

## Key Ideas

- A lower-level spatial coefficient governs dependence among latent responses; a separate group-level coefficient governs dependence among random intercepts.
- Independent group intercepts remain necessary when group variation exists but group-level spatial dependence does not. This restriction produces SAR probit with random effects (SAR-RE).
- Omitting group variation can cause lower-level spatial dependence to absorb that variation, inflating estimated indirect effects in the studied simulation settings.
- Probability effects must account for spatial feedback and the nonlinear response mapping. Regression coefficients alone are not direct or indirect effects.
- A more general model permits assessment of group-level dependence but pays a precision cost when additional parameters are unnecessary. Causal interpretation requires assumptions beyond fitting spatial dependence.

## Important Papers

- [[papers/modeling-hierarchical-spatial-interdependence-for-limited-dependent-variables|Modeling Hierarchical Spatial Interdependence for Limited Dependent Variables]]: develops Bayesian HSAR probit and SAR-RE, compares their effect recovery, and applies them to county-level civil rights protests.

## Related Concepts

- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: the broader phenomenon of association across connected locations; hierarchical spatial probit specifies how this dependence enters two levels of a binary response model.
