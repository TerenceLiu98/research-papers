---
title: Neural Effect Search
type: concept
aliases:
  - NES
  - Neural Effect Test
tags:
  - causal-inference
  - exploratory-causal-inference
  - multiple-hypothesis-testing
  - sparse-autoencoders
---

## Overview

Neural Effect Search (NES) is a recursive procedure for finding treatment-responsive channels in a high-dimensional learned representation. It is designed for [[Exploratory Causal Inference]], where a randomized treatment is known but the affected outcome is not. The procedure addresses leakage between sparse representation channels by removing the contribution of already selected effects before testing the remainder.

## Key Ideas

- NES tests each remaining code for a treatment-control contrast and applies a multiple-testing threshold, typically Bonferroni correction.
- It selects the significant code with the largest absolute estimated effect, then repeats the test after conditioning on the selected codes.
- Neural Effect Test can form pooled, treatment-agnostic strata from selected codes and optionally residualize the tested code separately within each treatment arm. Arm-wise residualization reduces predictable variance without treating pooled post-treatment codes as ordinary controls.
- The recursion halts when no remaining code is significant. Under randomization, SUTVA, sufficient and principally aligned representations, and bounded stratification bias, the paper proves asymptotic recovery of one principal code for each affected outcome.
- NES controls false discoveries at the testing stages but does not guarantee that a selected code is a coherent scientific concept. Representation failure, weak principal alignment, small samples, and design artifacts remain interpretation risks.

## Important Papers

- [[Exploratory Causal Inference in Science]]
- Movva et al. (2025), "Sparse autoencoders for hypothesis generation."
- Bricken et al. (2023), "Towards monosemanticity: Decomposing language models with dictionary learning."

## Related Concepts

- [[Exploratory Causal Inference]]
- [[Unstructured Outcome Causal Inference]]
- Sparse autoencoders
- Multiple hypothesis testing
- Treatment-effect estimation

