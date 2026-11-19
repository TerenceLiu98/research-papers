---
title: Aggregation-Fragmentation Dynamics
type: concept
aliases:
  - Coagulation-Fragmentation Dynamics
  - Fusion-Fission Dynamics
definition: Aggregation-fragmentation dynamics describe how a population is distributed among groups of different sizes as groups merge and break apart.
tags:
  - statistical-physics
  - aggregation-fragmentation
---

## Overview

The basic observable is the number of groups of each size. A merger of two groups of sizes $i$ and $j$ produces one of size $i+j$. A breakup transfers members back to smaller groups. These events can conserve the total population while substantially changing the number of groups and the size of the largest one.

## Key Ideas

- The aggregation kernel specifies how often groups of given sizes merge. When encounters occur by sampling pairs of individuals uniformly, groups of sizes $i$ and $j$ offer $ij$ possible cross-group pairs. This gives a product kernel when the mean chance of fusion per encounter is independent of group size.
- The fragmentation rule specifies the breakup rate and fragment sizes. Total fragmentation returns every member of a selected group to the singleton population.
- A stationary size distribution can coexist with continual turnover of individual groups. In the product-kernel model with size-dependent total fragmentation studied by Manrique and colleagues, the size frequency has a power-law regime with exponent $5/2$.

## Important Papers

- [[papers/shockwavelike-behavior-across-social-media|Shockwavelike Behavior across Social Media]] derives a shock equation from merger and breakup rates and tests its predictions at the scales of online groups and clusters of groups.

## Related Concepts

- [[concepts/network-percolation|Network Percolation]] supplies a comparison for the emergence of a group containing a finite fraction of the population. In mean-field percolation, the $5/2$ size-frequency exponent occurs at criticality.
