---
title: Neural Operators
type: concept
aliases:
  - Neural Operator Learning
  - Mesh-Independent Operator Learning
tags:
  - neural-operators
  - operator-learning
  - scientific-machine-learning
  - partial-differential-equations
---

## Overview

Neural operators learn maps between function spaces rather than maps tied to one fixed-dimensional vector representation. Their discretizations can be trained or evaluated across resolutions, making them useful for surrogate modeling, reduction, and generation of scientific fields governed by differential equations.

## Key Ideas

- An operator model receives sampled function values together with coordinates and produces another function or a finite-dimensional representation. DeepONet, Fourier neural operators, point-based models, and coordinate networks use different mechanisms to represent this map.
- Resolution independence is a modeling property that must be tested under mesh changes. A model may evaluate on a finer mesh while still failing to recover frequencies or structures absent from its training data.
- Integral aggregation over coordinates can produce a mesh-independent encoder, while a coordinate network can decode a latent vector at any requested set of points. This separates the learned map from the discretization used for one training example.
- Arbitrary-mesh evaluation enables tasks such as inpainting, data-driven superresolution, and superresolution restricted to a region of interest. It also supports heterogeneous or irregularly sampled observations.
- Masked training can reduce the number of points processed per step and can regularize representations, but the best encoder point ratio depends on how sparse the evaluation input is.
- Mesh independence can trade off against fixed-grid inductive biases. In the reported Navier-Stokes experiment, a comparable CNN has lower reconstruction MSE, while the neural-operator architecture supports broader mesh and task changes.

## Important Papers

- [[Autoencoders in Function Space]]
- Kovachki, Li, Liu, Azizzadenesheli, Bhattacharya, Stuart, and Anandkumar (2023), "Neural operator: Learning maps between function spaces with applications to PDEs."
- Li, Kovachki, Azizzadenesheli, Liu, Bhattacharya, Stuart, and Anandkumar (2021), "Fourier neural operator for parametric partial differential equations."
- Lu, Jin, Pang, Zhang, and Karniadakis (2021), "Learning nonlinear operators via DeepONet based on the universal approximation theorem of operators."
- Seidman, Kissas, Pappas, and Perdikaris (2023), "Variational autoencoding neural operators."

## Related Concepts

- [[Function-Space Autoencoders]]
- Inpainting
- Superresolution
- Scientific machine learning
- Partial differential equations
- Functional data
