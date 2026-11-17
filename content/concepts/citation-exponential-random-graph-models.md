---
title: Citation Exponential Random Graph Models
type: concept
aliases:
  - cERGM
  - Citation ERGM
definition: "Citation exponential random graph models describe new citation ties conditional on a fixed historical network while restricting possible ties according to document timing and network growth."
tags:
  - citation-networks
  - network-inference
---

## Overview

Citation exponential random graph models adapt exponential-family network inference to growing collections of documents. Each period introduces documents whose citation choices depend jointly on attributes, existing citations, and other newly forming citations. The sample space respects which documents can cite which others.

## Key Ideas

- Historical citations remain fixed; new nodes introduce the new random ties. Earlier documents cannot cite documents introduced in later periods.
- Same-period reciprocity can be permitted when the application allows it, as with Supreme Court opinions written within one term. This differs from imposing complete acyclicity.
- A conditional exponential-family distribution combines attribute statistics with reciprocity, transitivity, and degree concentration. Tie coefficients act through change statistics, conditional on the rest of the network.
- Geometrically weighted statistics can reduce degeneracy relative to raw triangle or star counts. Their coefficient signs depend on the statistic: a negative weighted-indegree coefficient can represent concentrated popularity.
- Term-specific fits accommodate changing parameters as the network expands. These conditional associations do not alone identify causal mechanisms.

## Important Papers

- [[papers/generative-dynamics-of-supreme-court-citations|Generative Dynamics of Supreme Court Citations]]: develops cERGM and applies it to Supreme Court citations, finding substantial dependence beyond case attributes.

## Related Concepts

- [[concepts/signed-political-networks|Signed Political Networks]]: a distinct setting for dependent-network inference that retains tie valence; citation cERGM in the Supreme Court application does not distinguish positive from negative citations.
