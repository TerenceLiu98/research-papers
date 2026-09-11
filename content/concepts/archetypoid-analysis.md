---
title: Archetypoid Analysis
type: concept
aliases:
  - ADA
tags:
  - archetypoid-analysis
  - interpretable-representations
  - multivariate-analysis
---

## Overview

Archetypoid analysis approximates multivariate observations as convex mixtures of a small set of observed reference cases. These archetypoids represent contrasting profiles in the data. Requiring each reference to be an actual observation makes the representation interpretable in terms of identifiable cases.

## Key Ideas

For observations $\mathbf{x}_i$, the method minimizes

$$
\sum_i\left\|\mathbf{x}_i-\sum_{h=1}^{k}\alpha_{ih}\mathbf{z}_h\right\|^2,
\qquad \alpha_{ih}\geq0,\quad \sum_h\alpha_{ih}=1,
\quad \mathbf{z}_h\in\{\mathbf{x}_1,\ldots,\mathbf{x}_n\}.
$$

The reference cases must be observed data points; archetypal analysis instead permits references formed as convex combinations of observations. Mixture coefficients describe approximate reconstruction, not probabilities of latent class membership. Assigning a case to its largest coefficient produces an optional hard partition but discards mixture information.

BUILD selects initial reference cases and SWAP improves them by substitutions that reduce reconstruction error. An RSS elbow can guide the choice of $k$, but that choice remains a modeling decision. Three references allow ternary visualization; their count is not interchangeable with [[concepts/ideological-dimensionality|effective ideological dimensionality]].

In political applications, seat-weighted averages of mixture coefficients summarize parliamentary orientation. They can conceal dispersion or opposing blocs, so they should be interpreted alongside party-level profiles and distinguished from [[concepts/party-system-polarization|Party-System Polarization]].

## Important Papers

- Vinué, Epifanio, and Alemany (2015), "Archetypoids: A new approach to define representative archetypal data": methodological foundation cited by the application below.
- [[papers/ideological-and-geographical-patterns-in-european-political-system-an-archetypoid-and-spatial-analysis|Ideological and geographical patterns in European political system: An Archetypoid and Spatial Analysis]]: represents CHES party profiles using observed left, liberal-centrist, and right reference parties, then aggregates them by seat share.

## Related Concepts

- [[concepts/ideological-dimensionality|Ideological Dimensionality]]
- [[concepts/party-system-polarization|Party-System Polarization]]
