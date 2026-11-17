---
title: Randomized Moderator Placement
type: concept
aliases:
  - Randomized Placement Design
  - Randomized Pretest–Posttest Placement
definition: "Randomized moderator placement assigns respondents to have a moderator measured before or after an experimental treatment, alongside randomized treatment assignment, to study priming and post-treatment measurement effects."
tags:
  - causal-inference
  - experimental-design
  - sensitivity-analysis
---

## Overview

Randomizing when a moderator is measured exposes the trade-off between pre-treatment questions that prime outcomes and post-treatment questions whose answers may be changed by treatment. The target can remain the unprimed treatment effect within groups defined by their baseline moderator.

## Key Ideas

- The pre-test arm measures the baseline moderator distribution; the post-test arm measures outcomes without pre-test priming.
- Neither arm observes the baseline moderator and unprimed outcome together for the same respondent. Combining arms does not automatically identify their joint distribution or the sign of effect heterogeneity.
- Principal-stratum restrictions, monotonicity, and stability under control can tighten identification bounds.
- Joint sensitivity analysis can cap both moderator changes and outcome changes induced by placement. Population bounds and confidence intervals answer different questions.
- Small average placement effects do not rule out offsetting individual changes.

## Important Papers

- [[papers/priming-bias-versus-post-treatment-bias-in-experimental-designs|Priming Bias Versus Post-Treatment Bias in Experimental Designs]] (Blackwell et al., 2025): derives bounds and joint sensitivity analyses for this design.
- Horowitz and Klaus (2020), “Can Politicians Exploit Ethnic Grievances? An Experimental Study of Land Appeals in Kenya”: application with randomized land-security question placement, reanalyzed by Blackwell et al.

## Related Concepts

- [[concepts/conditional-marginal-effects|Conditional Marginal Effects]]: summarizes effects within baseline moderator groups.
- [[concepts/text-as-treatment|Text as Treatment]]: survey messages can change both outcomes and subsequent moderator reports.
