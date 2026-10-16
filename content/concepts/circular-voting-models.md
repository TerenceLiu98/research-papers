---
title: Circular Voting Models
type: concept
aliases:
  - Circular Policy Spaces
tags:
  - ideal-point-estimation
  - legislative-behavior
  - circular-policy-spaces
  - bayesian-measurement
---

## Overview

Circular voting models place ideal points and policy outcomes on a circle. They can represent legislators at opposing ideological extremes voting together against the center while retaining a single intrinsic latent dimension. This changes the geometry of spatial utility rather than simply adding an independent ideological axis.

## Key Ideas

- **Intrinsic distance:** On the unit circle, $\rho(a,b)=\arccos\{\cos(a-b)\}$. Squared-distance utilities compare a legislator's proximity to the Yea and Nay positions. Moving the bill positions changes the coalition pattern without moving legislators.
- **Bounded link:** Yu and Rodriguez map the difference of squared distances, bounded by $[-\pi^2,\pi^2]$, through a rescaled symmetric beta CDF. Vote-specific concentration controls uncertainty and helps accommodate both contested and unanimous votes.
- **Local linear behavior:** Concentrated circular positions and a suitably concentrated link approximate conventional one-dimensional probit scaling on a tangent space. Circular variance measures dispersion of the angular positions and supplies a model-based circularity summary.
- **Identification:** Periodicity, rotation, and reflection require conventions. The cited model uses a single angular interval, a centered von Mises prior, and a sign constraint. Its likelihood is not invariant to arbitrary rescaling of the policy space.
- **Ordering is additional structure:** A circle has no natural total order. Unwinding it yields rankings, but those near the chosen cut can be unstable. Reliable voting predictions alone do not validate every rank interpretation.
- **Interpretation:** Coalitions between extremes need not imply identical beliefs or motivations. Empirical support for circular fit does not rule out non-monotonic utility or other explanations of the same voting patterns.

## Important Papers

- [[papers/spatial-voting-models-in-circular-spaces-a-case-study-of-the-us-house-of-representatives|Spatial voting models in circular spaces: A case study of the U.S. House of Representatives]]: develops Bayesian circular scaling and reports a grouped-WAIC advantage over 1D Euclidean scaling from the 112th through the first session of the 116th House, with earlier Houses mostly favoring the Euclidean model.

## Related Concepts

- [[concepts/geodesic-distance|Geodesic Distance]]: intrinsic distance replaces straight-line distance in spatial utility.
- [[concepts/item-response-theory|Item Response Theory]]: latent positions and item parameters explain binary observations.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: a circular space is intrinsically one-dimensional despite its usual 2D embedding.
