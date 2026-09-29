---
title: Irreducible Multidimensional Features
type: concept
aliases:
  - Irreducible Multi-Dimensional Features
tags:
  - mechanistic-interpretability
  - representation-geometry
---

## Overview

An irreducible multidimensional feature is a vector-valued representation whose distribution cannot be separated into independent lower-dimensional features or a disjoint mixture containing a lower-dimensional component after rotation and translation. This statistical definition asks whether multiple coordinates jointly describe one feature, rather than merely coexisting in the same activation space.

## Key Ideas

- **Two kinds of reduction.** Independent coordinate blocks permit a product decomposition. Mutually exclusive components permit a mixture decomposition. Irreducibility rules out both under the specified transformations and input distribution.
- **Approximate diagnostics.** The separability index minimizes mutual information across coordinate splits and rotations. The epsilon-mixture index maximizes mass near an affine hyperplane. Higher separability and lower mixture scores favor irreducibility, but empirical scores are not exact certificates.
- **Dimension needs care.** A circle can be parameterized by one angle yet requires a two-dimensional linear embedding. Statistical irreducibility under rotations and translations is different from intrinsic manifold dimension or reducibility under arbitrary nonlinear transformations.
- **SAE latents need not be conceptual atoms.** Several [[concepts/sparse-autoencoders|Sparse Autoencoders]] dictionary directions can collectively reconstruct one circle. Clustering directions and reconstructing their joint activations can reveal structure fragmented across scalar latents.
- **Superposition can involve subspaces.** The associated hypothesis expresses a hidden state as a sum of sparse, low-dimensional vector features embedded in approximately orthogonal subspaces. It retains additive reconstruction while questioning universal scalar featurehood.
- **Geometry and causality require separate evidence.** A circular point cloud does not show that the model uses it. Calendar-subspace interventions support causal involvement in selected tasks, while statistical discovery alone does not establish computational necessity.

## Important Papers

- [[papers/not-all-language-model-features-are-one-dimensionally-linear|Not All Language Model Features Are One-Dimensionally Linear]] defines the concept, discovers calendar circles, and tests circular interventions in Mistral 7B and Llama 3 8B (Sections 3-5).

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/sparse-autoencoder-receptive-fields|Sparse Autoencoder Receptive Fields]]
- [[concepts/linear-probing|Linear Probing]]
- [[concepts/explanation-via-regression|Explanation via Regression]]
