---
title: Lattice Percolation
type: concept
aliases:
  - Site Percolation
tags:
  - percolation
  - phase-transitions
  - statistical-physics
---

## Overview

Lattice percolation studies how randomly occupied sites or bonds form connected clusters as the occupation probability changes. A spanning cluster first appears near a critical probability, making percolation a standard model of geometric phase transitions. The precise threshold and finite-size behavior depend on the lattice, boundary conditions, connectivity rule, and whether sites or bonds are occupied.

## Key Ideas

- **Connectivity is the physical observable.** Individual lattice entries are local occupation variables; macroscopic behavior is measured through connected clusters rather than occupation count alone.
- **Order parameters summarize spanning behavior.** Common finite-lattice quantities include the probability that a configuration spans the lattice and the fraction of sites belonging to a spanning cluster.
- **Critical thresholds are model-specific.** A threshold estimate is meaningful only with the lattice geometry, occupation rule, connectivity, system size, and estimation procedure stated.
- **Finite systems smooth the transition.** On a finite lattice, spanning probabilities vary continuously over a neighborhood of the infinite-system threshold, so sampling resolution and finite-size analysis constrain precision.
- **Statistical association is not physical identification.** A learned feature can correlate with occupation probability without being an order parameter. The interpretation must be checked against the relevant connectivity observable.

## Important Papers

- [[papers/machine-learning-percolation-model|Machine Learning Percolation Model]]: compares CNN, VAE/cVAE, PCA, and clustering-based threshold sweeps on two-dimensional configurations; its raw-data PCA component tracks occupation probability but not the two order parameters.

## Related Concepts

- [[concepts/induced-percolation|Induced Percolation]]: a thresholded support-and-pruning process on networks, distinct from random occupation on a lattice.
