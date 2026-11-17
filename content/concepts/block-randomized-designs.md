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

## Important Papers

- [[papers/balancing-precision-and-retention-in-experimental-design|Balancing Precision and Retention in Experimental Design]]: tests whether blocking gains withstand observed and simulated sample loss in three survey replications.
- Moore (2012), “Multivariate Continuous Blocking to Improve Political Science Experiments”: continuous multivariate blocking method used in that study.

## Related Concepts

- [[concepts/pre-post-experimental-designs|Pre-Post Experimental Designs]]: a complementary use of baseline information in estimation.
