---
title: Price of Anarchy
type: concept
aliases:
  - PoA
definition: "The price of anarchy is the ratio of the worst equilibrium social cost to the minimum feasible social cost in a cost-minimization game."
tags:
  - game-theory
  - network-design
---

## Overview

The price of anarchy quantifies inefficiency from decentralized incentives. It compares equilibrium behavior with a coordinated optimum under the same social-cost function. When equilibrium is unique, there is no additional maximization over equilibria; worst-case analysis may still vary the instance or its parameters.

## Key Ideas

- The objective and feasible comparison matter: disagreement cost, collective accuracy, and individual influence are different welfare criteria.
- Externalities create inefficiency when a player's best response ignores costs imposed on others.
- Network direction can matter more than size or degree. Quadratic opinion games have a tight 9/8 bound under reciprocal influence but no universal constant bound under directed influence.
- Spectral cost representations turn worst-case analysis over internal opinions into a generalized Rayleigh quotient.
- If adding edges only adds nonnegative cost terms, the original price of anarchy bounds the possible multiplicative improvement in equilibrium cost from edge additions.

## Important Papers

- [[papers/how-bad-is-forming-your-own-opinion|How Bad is Forming Your Own Opinion?]] proves the reciprocal-influence bound and directed counterexamples, and connects equilibrium inefficiency to network design.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]] supplies anchored averaging games in which equilibrium disagreement can be compared with a social optimum.
