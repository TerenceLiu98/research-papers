---
title: Bilevel Simulator Construction
type: concept
aliases:
  - Bi-Level Simulator Construction
  - Structure-Parameter Decoupling for Simulator Construction
tags:
  - simulator-construction
  - simulation-calibration
  - program-search
  - llm-agents
---

## Overview

Bilevel simulator construction separates the search for executable modeling rules from the calibration of numerical parameters within those rules. An outer process changes program structure; an inner optimizer evaluates each candidate structure after tuning its allowed parameters. The aim is to reduce unnecessary code rewrites caused by parameter miscalibration and make feedback more informative about missing or incorrect mechanisms.

## Key Ideas

- **Separate structure from parameters.** Interaction topology, state transitions, and conditioning logic belong to the structural search. Rates, mixture weights, and other bounded coefficients can be calibrated while structure remains fixed.
- **Make calibration part of the specification.** SOCIA-EVO's Blueprint defines parameter domains, objective metrics, and data splits before generating the simulator and its calibrator. A fixed empirical contract constrains both levels of search.
- **Judge structures after a defined calibration budget.** A calibrated candidate is more informative than an arbitrarily parameterized one, but finite random or Bayesian search does not guarantee a global optimum. Residual error can still reflect insufficient calibration rather than structural misspecification.
- **Preserve measurement consistency.** Representation errors, missing-coordinate handling, and incorrect evaluators can distort the loss. SOCIA-EVO's mobility example first repairs parts of this measurement layer before revising behavioral mechanisms; such repairs must be distinguished from gains under an unchanged evaluator.
- **Separate selection from final evaluation.** Calibration and structural selection should use their designated evidence, with final held-out targets excluded from selection. A regime-shift experiment that calibrates on target-regime data measures adaptation under that access protocol.
- **Bound mechanistic claims.** Multiple programs can reproduce selected observational summaries. Better prediction or lower distributional distance does not alone prove causal recovery or justify counterfactual use.
- **Track repair hypotheses across revisions.** Metric-linked memory can prioritize successful changes and reduce repeated failures. When multiple changes share metrics, attribution remains uncertain and needs stronger tests for causal interpretation.

## Important Papers

- [[papers/socia-evo-automated-simulator-construction-via-dual-anchored-bi-level-optimization|SOCIA-EVO]] combines a fixed Blueprint, generated numerical calibrators, and an evolving repair Playbook. Sections 3.2-3.4 define the method; Appendix D gives a bounded random-search example.
- Holt et al. (2025), "G-Sim: Generative Simulations with Large Language Models and Gradient-Free Calibration" (arXiv:2506.09272), is described and evaluated in SOCIA-EVO as a related approach combining structural generation with parameter estimation.

## Related Concepts

- [[concepts/experience-guided-program-evolution|Experience-Guided Program Evolution]] uses execution history to guide subsequent program revisions.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]] connects simulation evidence to the scope of defensible claims.
