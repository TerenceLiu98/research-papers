---
title: Local Randomization Regression Discontinuity
type: concept
aliases:
  - Local Randomization RD
definition: "An approach to regression discontinuity that treats treatment assignment within a finite window around a cutoff as if randomized, supporting within-window causal comparisons and randomization-based inference."
tags:
  - causal-inference
  - regression-discontinuity
---

## Overview

Local randomization RD uses a finite neighborhood of a treatment threshold as an approximate experiment. Its identifying assumption is stronger than continuity alone: within the chosen window, potential outcomes must not systematically depend on the running variable in the formulation used here.

## Key Ideas

- The estimand concerns units inside the window; a difference in treated and control means estimates the effect under the identifying assumptions.
- Discrete scores cannot supply observations arbitrarily close to the threshold. A finite-window design can be useful when its randomization assumption is substantively credible.
- Nested tests of predetermined covariates can guide selection of the largest window passing the criterion in every smaller window. Nonrejection is a diagnostic, not proof of random assignment.
- Placebo cutoffs and window sensitivity assess implications of the design; they cannot establish unobserved balance.
- Assignment after an event need not imply actual exposure to it. The causal interpretation must distinguish assignment from receipt of information.

## Important Papers

- [[papers/the-causal-effect-of-polls-on-turnout-intention-a-local-randomization-regression-discontinuity-approach|The Causal Effect of Polls on Turnout Intention]]: applies finite-window comparisons to discrete survey timing around a Spanish poll release.
- Cattaneo, Frandsen, and Titiunik (2015), *Randomization Inference in the Regression Discontinuity Design*: methodological foundation cited by that application.

## Related Concepts

- [[concepts/regression-discontinuity-design|Regression Discontinuity Design]]: parent design; continuity-based identification targets a cutoff limit rather than assuming a finite local experiment.
- [[concepts/equivalence-testing|Equivalence Testing]]: distinguishes evidence of small discrepancies from failure to reject exact equality in design diagnostics.
