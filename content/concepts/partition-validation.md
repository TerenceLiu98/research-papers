---
title: Partition Validation
type: concept
definition: "Partition validation evaluates a masked survey measure separately within groups defined by known true status to estimate true-positive and false-positive rates."
tags:
  - survey-methodology
  - measurement-error
---

## Overview

When individual sensitive responses are masked, aggregate prevalence agreement can hide offsetting errors. Partitioning respondents by credible externally observed true status reveals error rates without decoding their individual survey answers.

## Key Ideas

- In the true-positive-status partition, the estimated prevalence is the true-positive rate; its complement is the false-negative rate.
- In the true-negative-status partition, the estimated prevalence is the false-positive rate; its complement is the true-negative rate.
- Weighting partition rates by their sizes yields implied confusion matrices and overall accuracy.
- For list experiments, each partition uses its own treatment–control difference in means. Small partitions can make estimates imprecise.
- Valid true scores and usable experimental comparisons are essential. Error rates alone do not identify every behavioral mechanism.

## Important Papers

- [[papers/the-misreporting-trade-off-between-list-experiments-and-direct-questions-in-practice|Kuhn and Vivyan (2022)]]: official turnout records reveal errors hidden by conventional prevalence validation.

## Related Concepts

- [[concepts/list-experiments|List Experiments]]
- [[concepts/social-desirability-bias|Social Desirability Bias]]: strategic concealment motivates indirect measurement.
