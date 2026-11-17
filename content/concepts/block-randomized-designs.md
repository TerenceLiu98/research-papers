---
title: Block-Randomized Designs
type: concept
aliases:
  - Block Randomization
  - Randomized Block Designs
definition: "Block-randomized designs assign treatment within groups formed using pretreatment information to improve comparability and statistical precision."
tags:
  - experimental-design
  - causal-inference
---

## Overview

Blocking creates smaller randomized experiments within groups of comparable units. Its precision benefit depends on whether blocking variables predict outcomes.

## Key Ideas

- Baseline information can reduce within-block outcome variation.
- Collecting covariates consumes resources; smaller attainable samples can offset variance reduction.
- Missing blocking variables can require implementation decisions that exclude units before assignment and change the represented sample.
- Blocking changes assignment; baseline adjustment changes estimation. They can be combined.

Pairwise randomization is the special case with two units per block. When outcomes are missing, keeping only complete pairs preserves the paired comparison but can change the causal target. Under assignment-invariant complete-pair membership, it identifies the effect among always-reporting pairs; it need not identify the full-population effect. The paired difference variance estimator respects this assignment structure.

## Important Papers

- [[papers/balancing-precision-and-retention-in-experimental-design|Balancing Precision and Retention in Experimental Design]]: tests whether blocking gains withstand observed and simulated sample loss in three survey replications.
- Moore (2012), “Multivariate Continuous Blocking to Improve Political Science Experiments”: continuous multivariate blocking method used in that study.

- [[papers/nonignorable-attrition-in-pairwise-randomized-experiments|Nonignorable Attrition in Pairwise Randomized Experiments]]: derives selection bias and paired variance properties under explicit matched-attrition assumptions.

## Related Concepts

- [[concepts/pre-post-experimental-designs|Pre-Post Experimental Designs]]: a complementary use of baseline information in estimation.
