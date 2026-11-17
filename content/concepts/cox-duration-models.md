---
title: "Cox Duration Models"
type: concept
aliases:
  - Cox Proportional Hazards Model
  - Cox Regression
definition: "Semiparametric event-history models that estimate covariate effects on event hazards without specifying a parametric baseline hazard."
tags:
  - survival-analysis
  - political-methodology
---

## Overview

Cox models describe the hazard of an event using an unspecified baseline hazard multiplied by a covariate-dependent component. They connect event-history analysis to binary panel data when observations record whether transitions occurred within time intervals.

## Key Ideas

- A flexible baseline hazard and time-varying covariate effects address different problems. The standard proportionality assumption still requires assessment.
- Interactions with elapsed time can represent effects that change with duration. Their functional form remains a modeling choice.
- Multistate extensions distinguish transitions such as event onset and termination, allowing different baseline hazards and effects for each.
- Grouped observation times create ties; the tie correction is part of the estimation specification.
- Transition probabilities express model implications on a probability scale. A hazard ratio alone is not an event probability.

## Important Papers

- [[papers/getting-time-right-using-cox-models-and-probabilities-to-interpret-binary-panel-data|Getting Time Right]] — compares Cox and logit for binary panel data, emphasizing time-varying effects and distinct event transitions.

## Related Concepts

- [[concepts/schoenfeld-residual-proportional-hazards-tests|Schoenfeld Residual Proportional Hazards Tests]] — diagnostics for departures from constant hazard ratios over time.
