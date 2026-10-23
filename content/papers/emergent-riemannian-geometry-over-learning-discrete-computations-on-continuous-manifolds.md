---
title: "Emergent Riemannian Geometry over Learning Discrete Computations on Continuous Manifolds"
type: paper
authors:
  - Julian Brandon
  - Angus Chadwick
  - Arthur Pellegrino
year: null
source_job_id: "496b017b-92a7-400f-9cbc-4b53e2ce3387"
tags:
  - riemannian-geometry
  - representation-geometry
  - feature-learning
  - neural-networks
---

## TL;DR

The paper uses layerwise Riemannian pullback metrics to study how multilayer perceptrons map continuous input manifolds to discrete Boolean outputs. In its torus and plane experiments, early hidden layers stretch decision-boundary neighborhoods and compress class interiors, while later layers implement the logical operation. Small-initialization rich learning produces structured, low-dimensional geometry and generalizes to held-out manifold regions; large-initialization lazy learning does not. Training with tangent noise smooths the learned metric and output posterior.

## Research Question

How does the intrinsic geometry of neural representations change while a network learns a discrete computation on a continuous input manifold, and how do learning regime and input noise affect that geometry?

## Motivation

The manifold hypothesis treats data as continuous and low-dimensional, but classification and action selection often require discrete outputs. Existing work on representational geometry commonly describes trained activations, while learning-dynamics analyses often use unstructured inputs or continuous teacher targets. This paper connects the two by tracking how a task-specific [[concepts/riemannian-representation-learning|Riemannian representation geometry]] emerges during learning.

## Contributions

- Formulates layerwise pullback metrics for continuous task variables and uses them to characterize discrete computation in neural networks.
- Shows analytically for a deep linear AND model that a task-aligned low-rank mode grows during training and makes an initially uniform hidden metric task-specific.
- Finds in nonlinear AND, OR, and XOR models that hidden layers geometrically discretize continuous inputs, while output-layer geometry reflects the Boolean operation.
- Relates rich and lazy learning to different dimensionality, curvature, generalization, and off-manifold noise robustness.
- Shows that tangent input noise smooths the representation and yields outputs close to an analytic posterior for noisy circular classification.

## Method

Inputs are parameterized by two angles and embedded either on a flat torus,

$$
x(\theta_1,\theta_2)=(\cos\theta_1,\sin\theta_1,\cos\theta_2,\sin\theta_2)^\top,
$$

or on a plane. Each angle is thresholded into a binary variable, and networks learn AND, OR, or XOR of the two variables.

For a layer representation $z(\theta)$, the authors compute the pullback metric $G_z=J_z^\top J_z$, where $J_z$ is the Jacobian with respect to the task coordinates. Its entries measure local sensitivity to each variable and correlations between their represented directions. Gaussian curvature characterizes intrinsic warping.

For a linear AND network, the input-output correlation has one nonzero singular mode proportional to $\sin\theta_1+\sin\theta_2$. Under balanced initialization, its effective weight follows a sigmoidal learning trajectory. The resulting metric decomposes into a growing task-aligned component plus an initialization-dependent orthogonal component.

Nonlinear experiments use tanh multilayer perceptrons trained with binary cross-entropy. Initialization variance controls the rich-to-lazy regime. Additional experiments hold out a rectangular region of the torus, vary network depth, inject wrapped-normal angular noise during training, and compare learned one-dimensional outputs with an analytic Bayesian posterior.

## Experiments

**Layerwise computation.** On toroidal XOR, trained input weights suppress task-irrelevant cosine directions. Hidden metrics stretch regions near input class boundaries and compress regions away from them, effectively discretizing each angle. Output metrics instead follow Boolean decision boundaries. AND and OR experiments, on torus and plane inputs, reproduce this division between input-manifold-dependent hidden geometry and task-dependent output geometry. A two-hidden-layer XOR network separates discretization from logic across layers; a one-hidden-layer model combines them in a more complex geometry.

**Learning regimes.** A width-100 rich network trained with part of the torus held out learns a sparse, low-rank input Gram matrix and generalizes to the unseen region. The lazy network retains near-orthogonal random projections and fails on the held-out region. Across 10 initialization seeds, rich representations have lower participation ratio and structured curvature peaks near class centers; lazy representations remain high-dimensional and mostly flat with irregular curvature. Rich networks are also more robust to isotropic noise in the ambient embedding space, with the difference increasing as embedding dimension grows. Noise applied directly to the task coordinates produces no reported robustness difference.

**Training noise.** Increasing wrapped-normal angular noise smooths outputs near class boundaries, lowers metric magnitude and variation there, and decreases curvature near class centers; curvature becomes negative beyond a noise threshold. For a circular binary classification reduction, learned outputs closely match the analytic posterior and flatten as noise increases.

## Limitations

- The evidence comes from small multilayer perceptrons, handcrafted torus or plane inputs, and Boolean tasks; the paper does not test whether the same decomposition appears in large models or real data.
- The link between geometry and generalization is observational within the initialization regimes. Geometry is not directly manipulated to establish that it causes the generalization difference.
- The linear analysis applies to the AND setup under stated assumptions, including balanced initialization, and does not solve nonlinear XOR dynamics.
- The Bayesian comparison is derived for a simpler one-dimensional circular classification problem, not the full two-variable XOR setting.
- Curvature can diverge where the learned metric becomes degenerate, so the geometric interpretation requires care at collapsed directions.
- The supplied manuscript does not state a publication year or stable paper identifier.

## Related Concepts

- [[concepts/riemannian-representation-learning|Riemannian Representation Learning]]
- [[concepts/supervised-manifold-learning|Supervised Manifold Learning]]
- [[concepts/geometry-aware-regularization|Geometry-Aware Regularization]]

## Related Papers

- Saxe, McClelland, and Ganguli (2013), "Exact Solutions to the Nonlinear Dynamics of Learning in Deep Linear Neural Networks": supplies the learning-dynamics framework and rich/lazy distinction extended here to manifold inputs.
- Hauser and Ray (2017), "Principles of Riemannian Geometry in Neural Networks": develops Riemannian tools for intrinsic neural representation geometry.
- Paccolat et al. (2021), "Geometric Compression of Invariant Manifolds in Neural Networks": connects feature learning with compression of task-irrelevant manifold directions.
- [[papers/manifold-steering-reveals-the-shared-geometry-of-neural-network-representation-and-behavior|Manifold Steering Reveals the Shared Geometry of Neural Network Representation and Behavior]]: studies how curved activation geometry constrains behavior and interventions in more complex trained systems.

[[index|Library home]]
