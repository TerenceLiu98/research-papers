---
title: Parliamentary-Mean Model
type: concept
aliases:
  - Parliamentary Mean Model
tags:
  - spatial-electoral-competition
  - policy-motivated-parties
  - political-representation
---

## Overview

The parliamentary-mean model represents implemented policy as a weighted average of the platforms announced by competing parties. Parliamentary seat shares determine the weights, so the election affects policy through the balance of legislative influence.

## Key Ideas

For committed platforms $t_j$ and seat shares $S_j$ summing to one,

$$
\hat t=\sum_j S_jt_j.
$$

- A policy-motivated party evaluates the implemented compromise against its ideal policy. Moving its platform toward voters can gain seats while moving the announced position away from that ideal; equilibrium balances these effects.
- [[concepts/electoral-rule-disproportionality|Electoral Rule Disproportionality]] changes the weights even for fixed vote shares. Under the power-law mapping, stronger rewards for electoral support can induce less extreme platforms.
- Platform polarization and policy extremity can move independently. In the uniform-voter two-party model of Matakos, Troumpounis, and Xefteris, platform distance is $1/n$ while implemented policy remains at $1/2$ for every $n\geq1$.
- Policy at the median does not imply convergence of announced platforms. Similarly, adding a centrist party can widen the extreme-platform distance while preserving the same implemented compromise under the paper's symmetric equilibrium assumptions.
- Seat-weighted averaging is an assumption about post-election compromise. It does not explicitly model coalition bargaining, agenda control, or the exclusion of opposition parties from policymaking; those institutional details can change the connection between seats and policy influence.

## Important Papers

- [[papers/electoral-rule-disproportionality-and-platform-polarization|Electoral Rule Disproportionality and Platform Polarization]] integrates a continuous vote-to-seat transformation and costly party entry into this framework.
- Llavador (2006), "Electoral platforms, implemented policies, and abstention," and Merrill and Adams (2007), "The effects of alternative power-sharing arrangements: Do moderating institutions moderate party strategies and government policy outputs?" are related foundations cited in the manuscript.

## Related Concepts

- [[concepts/electoral-rule-disproportionality|Electoral Rule Disproportionality]]
- [[concepts/party-system-polarization|Party-System Polarization]]
- [[concepts/hotelling-downs-model|Hotelling-Downs Model]]
