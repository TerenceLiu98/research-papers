---
title: "Circle Packing and Riemann Uniformization of Random Planar Maps in an Ergodic Scale-Free Environment"
type: paper
authors:
  - Nina Holden
  - Pu Yu
year: 2026
tags:
  - random-planar-maps
  - circle-packing
  - Riemann-uniformization
  - conformal-embeddings
  - random-environments
---

## TL;DR

This paper proves that broad classes of random planar maps in ergodic scale-free environments are asymptotically close to two discrete conformal embeddings: circle packing and Riemann uniformization. Under moment, ergodicity, and macroscopic connectivity assumptions, cell centers and embedded vertices differ by a sublinear amount at large scales. The results cover infinite triangulations and extend to more general planar maps.

## Research Question

When does a random planar map embedded as a cell configuration agree, on large scales, with its circle packing or Riemann uniformization embedding? In particular, can the two conformal embeddings be compared through the Brownian scaling limit of random walks on the map?

## Motivation

Planar maps arise in probability, combinatorics, geometry, and Liouville quantum gravity, but their abstract graph structure does not specify a canonical Euclidean drawing. Circle packing and Riemann uniformization provide natural discrete conformal embeddings, while ergodic scale-free cell configurations provide a flexible model for random maps with cells of varying size and degree.

Earlier invariance principles show that random walks in suitable cell configurations converge to planar Brownian motion. The paper uses that probabilistic input to establish macroscopic agreement between the original cells and conformal embeddings, including settings beyond triangulations and a weaker connectivity condition intended for later finite-volume applications.

## Contributions

- Proves that simple infinite plane triangulations satisfying the stated ergodicity, line-connectivity, and moment assumptions are circle packing parabolic and have circle packings that approximate cell centers up to a deterministic area-preserving linear map with sublinear error.
- Proves the analogous result for the Riemann surface obtained by gluing regular polygons to the faces: the surface is parabolic, and a conformal map approximates cell centers and has sublinear edge diameters after the same type of linear normalization.
- Extends both conclusions to 2-connected planar maps with whole-plane topology and to general whole-plane planar maps under the paper's stronger moment condition.
- Develops a polynomial three-circle estimate based on Descartes' theorem to replace the exponential degree dependence supplied by the usual Ring Lemma when controlling Dubejko conductances.
- Establishes the needed circle-packing random-walk convergence using vertex extremal length and proves a weaker macroscopic line-connectivity variant for future applications.

## Method

The basic object is a random cell configuration on the complex plane: a locally finite collection of connected cells, an associated planar map, and positive edge conductances. The assumptions include translation invariance modulo scaling, ergodicity modulo scaling, connectivity along long horizontal and vertical line segments, and an integrability condition involving cell area, diameter, degree, and, where needed, conductance.

For triangulations, the proof assigns Dubejko weights to the circle packing and applies an invariance principle for random walks. A variant of the Ring Lemma bounds ratios of neighboring radii polynomially in the degree, allowing difficult edges to be replaced by paths with controlled inverse conductance. The paper then uses extremal-length estimates to rule out macroscopic circles and identify the circle-packing walk with Brownian motion.

For Riemann uniformization, the authors glue regular polygons along map edges and partition the resulting surface into semi-flowers around vertices. Koebe distortion and length-area estimates control the conformal images of these regions. A harmonic corrector is constructed on the surface; its sublinear growth and ergodic Dirichlet-energy limits force its large-scale behavior to be linear. Rotation invariance makes the remaining deterministic linear map a rotation, so the normalization can be chosen as the identity.

## Experiments

This is a theoretical paper and reports no computational experiments. Two examples verify the assumptions and illustrate the scope of the results. For a homogeneous Poisson-Voronoi tessellation, tail bounds for cell area, diameter, and degree yield the required moment condition. For subcritical percolation clusters on a shifted hexagonal lattice, exponential cluster-radius decay gives the moment bounds and the resulting Riemann uniformization is close to the cells at large scale.

## Limitations

The conclusions require strong structural assumptions: ergodicity modulo scaling, macroscopic line connectivity or its stated replacement, whole-plane topology, and moment bounds that depend on the map class. The results are asymptotic and qualitative, giving sublinear errors rather than explicit convergence rates. The main theorems concern infinite-volume objects; finite-volume convergence is described as a future application. Alternative constructions of the Riemann surface are expected to work with modifications, but are not proved here.

## Related Concepts

- [[Circle Packing]]
- [[Riemann Uniformization of Planar Maps]]
- [[Ergodic Scale-Free Random Environments]]
- Random planar maps
- Discrete conformal embeddings
- Planar Brownian motion

## Related Papers

- Gwynne, Miller, and Sheffield (2022), "An invariance principle for ergodic scale-free random environments."
- Rodin and Sullivan (1987), "The convergence of circle packings to the Riemann mapping."
- He and Schramm (1996), "On the convergence of circle packings to the Riemann map."
- Gurel-Gurevich, Jerison, and Nachmias (2019), "A combinatorial criterion for macroscopic circles in planar triangulations."
- Bou-Rabee and Gwynne (2024), "Random walk on sphere packings and Delaunay triangulations in arbitrary dimension."
- Gwynne, Miller, and Sheffield (2020, 2021), work on Tutte embeddings and Liouville quantum gravity.
