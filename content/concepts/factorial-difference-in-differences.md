---
title: Factorial Difference-in-Differences
type: concept
aliases:
  - FDID
tags:
  - causal-inference
  - difference-in-differences
  - treatment-effect-heterogeneity
  - panel-data
---

## Overview

Factorial difference-in-differences (FDID) uses variation in a baseline factor across units and variation over time around an event that exposes all units. Its factorial formulation indexes potential outcomes by both baseline factor and exposure. This distinguishes the numerical DID contrast from the assumptions needed to interpret it as effect modification, causal moderation, or a conditional causal effect.

## Key Ideas

- **Universal exposure changes the comparison.** The baseline groups both experience the event. Their difference in outcome changes need not estimate the event's average effect on either group.
- **Effect modification compares observed groups.** With no anticipation and canonical parallel trends, DID identifies the difference in average exposure effects between groups at their observed baseline-factor levels. It does not establish that intervening on the factor would change the event's effect.
- **Causal moderation compares interventions.** For potential outcomes $Y_{\mathrm{post}}(g,z)$, the target is $E[Y_{\mathrm{post}}(1,1)-Y_{\mathrm{post}}(1,0)-Y_{\mathrm{post}}(0,1)+Y_{\mathrm{post}}(0,0)]$. It is symmetric in the two factors and requires coherent interventions on the baseline factor.
- **Factorial parallel trends adds identification.** In addition to no anticipation and canonical parallel trends, equal mean potential outcome changes across observed groups at every fixed $(g,z)$ identify causal moderation. Pre-event trend checks cannot establish this restriction.
- **Exclusion restrictions determine further interpretations.** Zero average exposure effect in the observed baseline-zero group recovers the canonical DID ATT analog. Zero average baseline-factor effect absent the event instead makes causal moderation equal the baseline factor's average effect given exposure.
- **Adjustment changes weighting.** Under overlap and conditional trend assumptions, conditional contrasts can be averaged over a chosen covariate distribution. Marginally standardized effect modification generally differs from an unadjusted comparison of observed groups.
- **Regression requires specification assumptions.** Regressing outcome changes on the baseline factor, centered covariates, and their interactions has a corresponding two-period TWFE implementation. Bootstrap replicates must recenter covariates to account for estimation of their mean.

## Important Papers

- [[papers/factorial-difference-in-differences|Factorial Difference-in-Differences]] (Xu, Zhao, and Ding, 2026): formalizes the identification map and illustrates it with social capital and famine mortality.
- VanderWeele (2009), "On the Distinction between Interaction and Effect Modification," as discussed in the paper above: conceptual foundation for distinguishing effect modification from causal interaction.

## Related Concepts

- [[concepts/causal-and-interpretable-heterogeneous-treatment-effects|Causal and Interpretable Heterogeneous Treatment Effects]]: shares the distinction between predictive modifiers and interventions on effect-modifying factors.
- [[concepts/distributional-difference-in-differences|Distributional Difference-in-Differences]]: studies changes in outcome laws under a different counterfactual restriction; distributional and factorial extensions address different questions.
