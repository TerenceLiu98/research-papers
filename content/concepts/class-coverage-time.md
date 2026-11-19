---
title: Class Coverage Time
type: concept
definition: The expected number of random-walk steps from a given starting node until the walk has visited a specified fraction of the distinct node labels in a network.
tags:
  - random-walks
  - network-segregation
---

## Overview

Class coverage time measures how readily a walk through a labeled network encounters different groups. With three political leanings and full coverage as the stopping rule, a walk starting at a left-leaning node has already encountered one class. It stops when it has also visited a center-leaning and a right-leaning node, in either order.

## Key Ideas

- A walk can revisit many nodes in the same group before it reaches another group. Sparse connections between groups can therefore lengthen coverage time even when the groups are similar in size.
- A rare label can also take many steps to reach. Shuffling labels across a fixed network preserves group sizes and provides a baseline for assessing whether their arrangement makes coverage unusually slow.
- Averaging over repeated walks from one node describes access from that position. Comparing these averages across nodes reveals whether some starting positions are especially isolated.

## Important Papers

- Sousa and Nicosia (2022), “Quantifying ethnic segregation in cities through random walks,” applies the approach to residential segregation.
- [[papers/polarization-in-social-media|Polarization in social media]] measures the time to reach all inferred political leanings in networks of users who comment on the same posts.

## Related Concepts

- [[concepts/political-polarization|Political Polarization]] can manifest as slow movement between political groups along the ties in a discussion network.
