---
title: "Spectral Superposition: A Theory of Feature Geometry"
type: paper
authors:
  - Georgi Ivanov
  - Narmeen Oozeer
  - Shivam Raval
  - Tasana Pejovic
  - Shriyash Upadhyay
  - Amir Abdullah
year: null
source_job_id: "1fc36c04-7115-45f7-a985-a2d9f98a7c77"
tags:
  - mechanistic-interpretability
  - superposition
  - representation-geometry
  - spectral-theory
  - tight-frames
---

## TL;DR

The paper studies feature geometry through the frame operator $F=WW^\top$ and a per-feature spectral measure that records how a feature's norm is distributed across its eigenspaces. For the canonical toy model of superposition, exact saturation of the fractional-dimensionality capacity bound forces every feature into one eigenspace; the resulting clusters form tight frames whose geometries can be classified using association schemes. A sweep of 3,200 toy-model runs reports approximate capacity saturation and a relationship between spectral localization and the predicted norm-dimensionality scaling. The complete characterization depends on localization and capacity saturation, which the paper does not establish for realistic networks.

## Research Question

Can basis-invariant spectral properties of weight-derived operators recover the global geometry of superposed features, and what geometry is forced when a toy model saturates its representational capacity?

## Motivation

Sparse feature extraction treats representation directions individually and can discard meaningful relations among them. The paper distinguishes incidental sharing, where unrelated sparse features reuse dimensions, from structural sharing, where related features occupy a common subspace. It therefore seeks a description that survives feature relabeling and captures which features share subspaces, how those subspaces interact, and what symmetric arrangements occur within them.

## Contributions

- Introduces [[concepts/spectral-superposition|Spectral Superposition]], using the activation-space frame operator and per-feature spectral measures to describe feature interference and localization.
- Establishes a spectral bridge between the Gram matrix $M=W^\top W$ and $F=WW^\top$: they share nonzero eigenvalues, and Gram eigenspaces induce activation-space projectors.
- Proves that exact saturation of the fractional-dimensionality capacity bound implies spectral localization, projective linearity between squared feature norm and fractional dimensionality, and a decomposition into orthogonal tight-frame clusters.
- Connects localized cluster geometry to association schemes, recovering the simplex, polygon, and square-antiprism configurations discussed in prior toy-model work.
- Gives perturbative diagnostics for near-saturation and analyzes eigenvalue drift and spectral-mass transport under the toy model's Gram-matrix gradient flow.

## Method

For columns $W_i$ of a weight matrix, the frame operator is $F=WW^\top$. If $P_e$ projects onto the eigenspace with positive eigenvalue $\lambda_e$, the paper assigns feature $i$ the atomic spectral measure

$$
\mu_i=\sum_e \frac{\lVert P_eW_i\rVert^2}{\lVert W_i\rVert^2}\,\delta_{\lambda_e}.
$$

This measure is localized when its mass lies on one eigenvalue and delocalized when it spans several. Its first moment is the Rayleigh quotient of $F$ at $W_i$. The feature's fractional dimensionality is

$$
D_i=\frac{\lVert W_i\rVert^4}{W_i^\top F W_i}
   =\frac{\lVert W_i\rVert^2}{\mathbb E_{\mu_i}[\lambda]}.
$$

Using leverage scores $\ell_i=W_i^\top F^+W_i$, the paper proves $D_i\leq\ell_i$ and $\sum_i\ell_i=\operatorname{rank}(W)$. Equality of the summed capacity bound therefore forces equality feature by feature, which occurs exactly when each $W_i$ is an eigenvector of $F$. Features sharing an eigenvalue form a tight frame in their common eigenspace. The local Gram matrix is then compared with the canonical strata of association-scheme algebras to identify discrete geometries.

## Experiments

The empirical study trains the standard ReLU toy autoencoder on 1,024 input features with uniform importance. It sweeps 32 hidden widths from 16 to 512 and 50 sparsity values from 0 to 0.99, using two seeds per setting, for 3,200 runs and 3,276,800 feature vectors.

- Across the sweep, the reported sum of fractional dimensionalities is close to the hidden dimension, motivating the exact capacity-saturation analysis.
- For each learned feature, the authors compute its spectral-measure weights. Cluster localization is summarized by mean maximum spectral mass and compared with the $R^2$ of the predicted relation $D_i=\lambda_e^{-1}\lVert W_i\rVert^2$.
- Lower-sparsity settings show tighter localization and closer agreement with the predicted eigenvalue slope. In higher-sparsity settings, small aggregate capacity slack can coexist with a delocalized minority of features.
- The theory classifies previously observed simplices, polygons, and the square antiprism after assuming spectral localization. Tight-frame structure alone is not unique for geometries other than the simplex, so the association-scheme signature supplies the finer classification.

## Limitations

- Complete characterization of interference by the spectral measure requires spectral localization. The paper notes suggestive connections to heavy-tailed self-regularization but does not directly establish localization in realistic networks.
- The capacity-saturation premise is empirically checked only in toy models. The main localization theorem assumes exact saturation, whereas the experiments are approximately saturated.
- The especially clean gradient-flow analysis relies on the toy autoencoder's loss being mediated through its Gram matrix; it does not directly transfer to arbitrary architectures or objectives.
- A tight-frame decomposition does not uniquely identify nonsimplex geometry without additional symmetry information.
- The supplied Markdown does not state a publication year or stable paper identifier, so the year is unset and no identifier is added.

## Related Concepts

- [[concepts/spectral-superposition|Spectral Superposition]]
- [[concepts/irreducible-multidimensional-features|Irreducible Multidimensional Features]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/neural-collapse|Neural Collapse]]

## Related Papers

References discussed in the supplied paper include:

- Elhage et al. (2022), "Toy Models of Superposition": supplies the canonical toy autoencoder, fractional dimensionality, and the feature geometries classified here.
- Engels et al. (2024), "Not All Language Model Features Are One-Dimensionally Linear": provides evidence that model features can have meaningful multidimensional geometry; see [[papers/not-all-language-model-features-are-one-dimensionally-linear|Not All Language Model Features Are One-Dimensionally Linear]].
- Klindt et al. (2025), "From Superposition to Sparse Codes: Interpretable Representations in Neural Networks": develops sparse recovery of superposed representations.
- Martin and Mahoney (2021), "Implicit Self-Regularization in Deep Neural Networks": motivates comparison with global empirical spectral-density analysis.

Related library reading, without implying citation by this paper:

- [[papers/projecting-assumptions-the-duality-between-sparse-autoencoders-and-concept-geometry|Projecting Assumptions: The Duality Between Sparse Autoencoders and Concept Geometry]] examines how SAE architectures constrain recoverable concept geometry.
- [[papers/neural-collapse-a-review-on-modelling-principles-and-generalization|Neural Collapse: A Review on Modelling Principles and Generalization]] surveys another setting in which learned representations approach simplex tight-frame geometry.

[[index|Library home]]
