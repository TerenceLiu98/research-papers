---
title: Spectral Superposition
type: concept
aliases:
  - Spectral Feature Geometry
  - Feature Spectral Localization
tags:
  - mechanistic-interpretability
  - superposition
  - representation-geometry
  - spectral-theory
---

## Overview

Spectral superposition describes a representation by how its feature vectors occupy the eigenspaces of the frame operator $F=WW^\top$. This operator is invariant to permutations of feature indices, so its eigenspaces provide a basis-independent view of shared representational subspaces. A per-feature spectral measure records how much of each feature lies in every eigenspace, distinguishing localized features from features spread across several interaction modes.

## Key Ideas

- **Frame and Gram operators carry matching nonzero spectra.** The Gram matrix $M=W^\top W$ describes pairwise feature overlap in index space, while $F=WW^\top$ acts in activation space and is unchanged when feature columns are relabeled. Their nonzero eigenspaces are connected by $W$.
- **Spectral measures are feature-specific.** For eigenspace projectors $P_e$, the weights $\lVert P_eW_i\rVert^2/\lVert W_i\rVert^2$ form a probability distribution over positive eigenvalues. This supplements a global spectral density by showing how individual features use spectral capacity.
- **Localization confines interaction.** A spectrally localized feature lies entirely in one eigenspace and is an eigenvector of $F$. Features in distinct eigenspaces are orthogonal; features sharing an eigenspace can interfere and form a joint geometry.
- **Capacity saturation forces localization in the analyzed setting.** Fractional dimensionality is bounded by a leverage score, and the leverage scores sum to $\operatorname{rank}(W)$. Exact saturation of the summed bound makes every feature saturate its individual bound, forcing each spectral measure to be a point mass.
- **Localized clusters form tight frames.** Features assigned to one eigenvalue collectively act as a scaled identity on their span. Their Gram eigenspaces can then be matched with association-scheme strata to classify symmetric arrangements such as simplices and polygons.
- **The scope is conditional.** Approximate saturation controls aggregate delocalization only through a weighted slack bound. Spectral localization and saturation must be measured rather than assumed in realistic networks, and tight-frame structure need not uniquely determine nonsimplex geometry.
- **Geometry complements feature extraction.** [[concepts/sparse-autoencoders|Sparse Autoencoders]] seek sparse directions, while spectral analysis retains relations among directions. This is compatible with [[concepts/irreducible-multidimensional-features|Irreducible Multidimensional Features]], which likewise treats subspace structure as potentially meaningful rather than automatically reducible to scalar atoms.

## Important Papers

- [[papers/spectral-superposition-a-theory-of-feature-geometry|Spectral Superposition: A Theory of Feature Geometry]] introduces the frame-operator and per-feature spectral-measure formalism and proves localization and tight-frame decomposition under exact capacity saturation in toy models.
- Elhage et al. (2022), "Toy Models of Superposition": introduces the toy setting and fractional-dimensionality measure to which the spectral theory is applied.
- [[papers/not-all-language-model-features-are-one-dimensionally-linear|Not All Language Model Features Are One-Dimensionally Linear]] gives empirical and intervention-based evidence for multidimensional feature geometry in language models.

## Related Concepts

- [[concepts/irreducible-multidimensional-features|Irreducible Multidimensional Features]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/neural-collapse|Neural Collapse]]
- Tight frames
- Association schemes
- Feature superposition
