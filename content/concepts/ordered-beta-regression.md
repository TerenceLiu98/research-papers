---
title: Ordered Beta Regression
type: concept
aliases:
  - Ordered Beta Model
definition: "A regression model for bounded continuous responses that combines endpoint masses and an interior beta distribution through a shared linear predictor and ordered cut points."
tags:
  - bounded-outcomes
  - regression
---

## Overview

Ordered beta regression models a response on the closed unit interval, including exact zeros and ones. It treats endpoints and interior observations as manifestations of a common underlying scale, while allowing endpoint masses to differ qualitatively from the interior density.

## Key Ideas

For an inverse-logit function $g$, predictor $\eta$, and thresholds $k_1<k_2$, the zero, interior, and one probabilities are $1-g(\eta-k_1)$, $g(\eta-k_1)-g(\eta-k_2)$, and $g(\eta-k_2)$. Interior values follow a beta distribution with mean $g(\eta)$ and a precision parameter.

The shared predictor reduces parameter count relative to a zero-and-one-inflated beta model with separate coefficient vectors. Increasing it shifts probability away from zero and toward one; interior probability can rise or fall depending on location. Effects on the full response combine changes in regime probabilities with changes in the interior mean.

This restriction is useful when endpoints represent extremes of one construct. Separate selection or inflated models may be more appropriate when endpoint outcomes arise from distinct mechanisms. Ordinary beta regression instead models only the open interval, and nudging endpoint observations inward is not equivalent to fitting a joint endpoint/interior likelihood.

## Important Papers

- [[papers/ordered-beta-regression|Kubinec (2023), Ordered Beta Regression]]: introduces the model, evaluates simulation performance, and applies it to European suffrage expansion.

## Related Concepts

- Ordered logistic regression supplies the ordered-cut-point construction, but does not itself model a continuous interior density.
- Zero-and-one-inflated beta regression permits separate endpoint mechanisms, trading parsimony for flexibility.
