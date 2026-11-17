---
title: Network-Specific Spillover Effects
type: concept
aliases:
  - Average Network-Specific Spillover Effect
  - ANSE
definition: "Network-specific spillover effects contrast treatment exposure through one network while holding own treatment and exposure through other networks fixed, then average those contrasts over a specified reference distribution."
tags:
  - causal-inference
  - network-experiments
  - interference
---

## Overview

Network-specific spillover effects quantify the contribution of a particular interaction channel when people belong to multiple overlapping networks. They distinguish influence through, for example, online contacts from influence through face-to-face relationships.

## Key Ideas

- A channel-specific contrast holds other-network exposure fixed before averaging. A total spillover contrast can instead include changes transmitted through several channels.
- Random assignment of individual treatment need not make network exposures independent: overlapping networks share treated neighbors.
- Observing the target network alone is insufficient for unbiased channel attribution when omitted networks affect outcomes and their exposures covary with observed exposure.
- Under linear additive omitted-network effects and Bernoulli assignment, bias scales with the omitted-network effect slope, average overlap fraction, and observed exposure contrast. More general sensitivity bounds trade precision for weaker outcome-model assumptions.
- Exposure mappings and common support are substantive requirements. Aggregating to treated-neighbor proportions rules out within-network neighbor identity effects unless the mapping represents them.

## Important Papers

- [[papers/spillover-effects-in-the-presence-of-unobserved-networks|Spillover Effects in the Presence of Unobserved Networks]] (Egami, 2021): defines ANSE, derives omitted-network bias, and supplies parametric and nonparametric sensitivity analyses.

## Related Concepts

- [[concepts/spatial-causal-inference|Spatial Causal Inference]]: geographic settings also require explicit treatment of cross-unit dependence, although spatial confounding and network-channel attribution are distinct identification problems.
