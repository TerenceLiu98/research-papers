---
title: Parallel Trends-in-Trends
type: concept
aliases:
  - Parallel Changes in Trends
definition: "An identifying restriction requiring equal changes in untreated outcome trends across treatment and control groups, allowing a linearly changing untreated mean gap."
tags:
  - causal-inference
  - difference-in-differences
---

## Overview

Parallel trends-in-trends equates the change in untreated outcome slopes across treatment and control groups. With equally spaced periods 0, 1, and 2, their untreated mean gap $g_t^0$ satisfies $g_2^0-g_1^0=g_1^0-g_0^0$. The gap may drift linearly rather than remaining constant.

## Key Ideas

- Sequential DID subtracts the pretreatment DID from the post-versus-pre DID: $(g_2-g_1)-(g_1-g_0)$. Under this restriction and the design's remaining assumptions, it identifies the ATT.
- Extended parallel trends implies this restriction, but the converse does not hold. The relaxation accommodates linear differential trends, not arbitrary time-varying confounding.
- Two pretreatment periods identify the slope adjustment; they do not establish its validity after treatment. Additional pretreatment periods permit analogous diagnostics of changes in trends.
- When extended parallel trends holds, sequential DID can sacrifice precision. Double DID pools it with standard DID using efficient GMM weights; when only trends-in-trends is credible, it retains only the sequential moment.

## Important Papers

- [[papers/using-multiple-pretreatment-periods-to-improve-difference-in-differences-and-staggered-adoption-designs|Egami and Yamauchi (2023)]]: formalizes the restriction and integrates sequential DID into a GMM framework for basic and staggered-adoption designs.

## Related Concepts

- [[concepts/honest-event-study-inference|Honest Event Study Inference]]: evaluates inference against explicit plausible-bias restrictions instead of assuming trend extrapolation is established by insignificant pretrends.
- [[concepts/stacked-event-studies|Stacked Event Studies]]: concerns cohort comparison construction; trend restrictions remain a separate identification requirement.
