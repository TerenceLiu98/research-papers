---
title: Electoral Closeness in Proportional Representation
type: concept
aliases:
  - Candidate Vote Margins in Proportional Representation
definition: "A signed vote distance to a candidate's election boundary under proportional representation, accounting for party seat allocation and, in open lists, within-party ranking."
tags:
  - electoral-systems
  - proportional-representation
  - causal-inference
---

## Overview

Electoral closeness in proportional representation measures how far a candidate lies from winning or losing a seat under the applicable allocation rules. A meaningful distance must specify which votes can change and which remain fixed. Raw differences between candidates generally do not capture the relevant seat boundary.

## Key Ideas

- **Party margin:** Votes required to reach each potential party seat depend on the allocation rule. Highest-average methods compare transformed vote quotients; largest-remainder methods must account for changing quotas and remainder rankings.
- **Candidate margin:** Open lists additionally require a sufficiently high rank among copartisans. Closed-list positions are fixed, so the relevant party-seat threshold determines the distance.
- **Joint requirements:** Under the fixed-other-votes construction, taking the minimum of party and candidate margins for each possible seat count and then the maximum across those counts gives a signed overall margin. Positive values indicate electoral surpluses, negative values shortfalls.
- **Identification versus measurement:** A zero cutoff can define an RD running variable, but continuity assumptions remain necessary. Fixed seat totals also complicate interpreting density-based manipulation checks.
- **Counterfactual dependence:** Adding or subtracting focal votes differs from redistributing a fixed vote total. Neither distance should be presented without its counterfactual convention.

## Important Papers

- [[papers/measuring-closeness-in-proportional-representation-systems|Measuring Closeness in Proportional Representation Systems]]: derives analytical margins across list structures and allocation families, with incumbency applications.

## Related Concepts

- [[concepts/expressive-voting|Expressive Voting]]: concerns motivations for participation; electoral closeness can describe the competitive context but does not itself identify those motivations.
