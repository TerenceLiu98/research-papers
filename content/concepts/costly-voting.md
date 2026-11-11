---
title: Costly Voting
type: concept
aliases:
  - Voting Costs
tags:
  - voter-turnout
  - party-competition
---

## Overview

Costly voting treats participation as a decision whose benefits must outweigh the costs of voting. In spatial party models, abstention changes the electorate to which parties respond, creating feedback between participation and party positioning.

## Key Ideas

- A simplified calculus compares policy benefit with participation cost. Richer formulations also include pivotality and civic duty; these are omitted in Mustillo's implementation.
- Alienation describes abstention associated with distance from attractive alternatives; indifference concerns weak differentiation between alternatives. Both can matter as costs rise.
- Party strategies mediate the consequences of turnout changes. Vote hunters pursue marginal gains, whereas aggregators relocate toward current voters and can leave abstainers poorly represented.
- The direction of party movement need not be uniform: Mustillo reports outward movement in small hunter systems and inward movement in large ones.
- Representation of current voters and representation of the entire citizenry are different objectives. Removing abstainers from centroid updates changes the population represented by a Lloyd-style procedure.

## Important Papers

- [[papers/party-competition-with-costly-voting|Party Competition with Costly Voting]]: simulation evidence linking common participation costs, party adaptation, and citizen representation.
- Riker and Ordeshook (1968), “A Theory of the Calculus of Voting”: foundational participation framework, cited in Mustillo.

## Related Concepts

- [[concepts/party-system-polarization|Party-System Polarization]]
- [[concepts/k-means-clustering|K-Means Clustering]]
- [[concepts/effective-number-of-parties|Effective Number of Parties]]
