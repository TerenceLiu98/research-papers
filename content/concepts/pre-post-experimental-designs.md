---
title: Pre-Post Experimental Designs
type: concept
aliases:
  - Pretest–Posttest Experimental Designs
  - Repeated Measures Experimental Designs
definition: "Pre-post experimental designs measure outcomes before and after randomized treatment and use baseline measurements in treatment-effect estimation."
tags:
  - experimental-design
  - causal-inference
---

## Overview

Baseline outcomes provide information about later outcomes that can increase the precision of randomized treatment comparisons. The benefit depends on baseline predictiveness and the cost of obtaining those measurements.

## Key Ideas

- Strong pre/post correlation can support meaningful precision gains even with fewer participants.
- A proxy or quasi-baseline measure may be much less predictive than the actual baseline outcome.
- Extra questions and waves can increase costs or attrition; these must be considered alongside variance reduction.
- Measurement timing can also introduce priming, a distinct issue from precision.

## Important Papers

- [[papers/balancing-precision-and-retention-in-experimental-design|Balancing Precision and Retention in Experimental Design]]: two replications show large gains robust to sample reduction, while a weak quasi-baseline yields no observed gain.
- Clifford, Sheagley, and Piston (2021), “Increasing Precision Without Altering Treatment Effects: Repeated Measures Designs in Survey Experiments”: methodological motivation cited by that paper.

## Related Concepts

- [[concepts/block-randomized-designs|Block-Randomized Designs]]: uses pretreatment information during assignment.
- [[concepts/randomized-moderator-placement|Randomized Moderator Placement]]: investigates measurement-timing effects for moderators rather than baseline outcome precision.
