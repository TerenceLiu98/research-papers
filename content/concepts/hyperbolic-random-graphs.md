---
title: Hyperbolic Random Graphs
type: concept
aliases:
  - Random Hyperbolic Graphs
definition: "Hyperbolic random graphs place vertices randomly in hyperbolic space and connect pairs within a distance threshold, combining spatial structure with heterogeneous degrees."
tags:
  - network-science
  - probability
---

## Overview

Hyperbolic random graphs encode proximity through hyperbolic distance. In the disk model studied here, angular coordinates specify spatial separation while radial position controls typical degree: points nearer the centre tend to have more neighbours.

## Key Ideas

- A Poissonised construction uses mean vertex count $n$, disk radius $R=2\log(n/\nu)$, uniform angles, radial density proportional to $\sinh(\alpha r)$, and connection threshold $R$.
- For fixed $1/2<\alpha<1$ and $\nu>0$, the graph is sparse and has a linear-sized giant component. Its degree-tail exponent is $2\alpha+1$.
- Degree heterogeneity and spatial bottlenecks coexist. Consequently, random-walk mixing and collective consensus need separate analysis.
- On the giant component, degree moments $M_s$ have order $n$ for $s<2\alpha$, $n\log n$ at $s=2\alpha$, and $n^{s/(2\alpha)}$ for $s>2\alpha$. The first two hold with high probability; the last is an order-in-probability statement. This moment transition controls the degree-dependent voter model's consensus regimes.

## Important Papers

- [[papers/the-voter-model-on-the-hyperbolic-graph|The voter model on the hyperbolic graph]] — proves consensus-time orders using geometry-sensitive meeting-time bounds and degree moments.

## Related Concepts

- [[concepts/voter-model|Voter Model]] — a copying process whose consensus time depends on the network's geometry and degree distribution.
