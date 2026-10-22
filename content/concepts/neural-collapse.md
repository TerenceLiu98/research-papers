---
title: Neural Collapse
type: concept
aliases:
  - Terminal-phase neural collapse
tags:
  - neural-collapse
  - representation-learning
  - deep-learning-theory
  - classification
---

## Overview

Neural collapse is a geometric regularity observed in deep classifiers trained beyond zero training error. In the terminal phase of training, examples from the same class concentrate around a class mean, the centered class means approach a maximally symmetric simplex, the final classifier aligns with that simplex, and its decisions approach nearest-class-mean classification. The phenomenon describes the organization of learned training representations; it does not by itself guarantee performance on unseen data or new tasks.

## Key Ideas

- **NC1, variability collapse:** Penultimate-layer features within each training class converge toward their class mean, shrinking within-class covariance relative to between-class covariance.
- **NC2, simplex geometry:** For $K$ classes, centered class means approach equal norm and pairwise cosine $-1/(K-1)$. They therefore form a simplex equiangular tight frame when the feature dimension permits it.
- **NC3, self-duality:** The rows of the final linear classifier align with the centered class means up to scaling. The representation geometry and decision geometry become dual descriptions of the same configuration.
- **NC4, nearest-class-center decisions:** The network's final classifier increasingly agrees with assigning each feature to its nearest training class mean.
- **Terminal-phase scope:** The standard definition concerns training after interpolation. Similar-looking test geometry must be evaluated separately because a test point can approach the wrong class center, and train collapse can coexist with different test errors.
- **Modeling approaches:** Unconstrained-feature analyses optimize penultimate features directly and characterize collapsed minimizers or gradient-flow limits. Locally elastic models approximate how updates to one example move representations of similar and dissimilar examples.
- **Not uniformly beneficial:** Symmetric separation can support classification, robustness, parameter-efficient fixed classifiers, and transfer under matched source-target assumptions. Strong collapse can also erase within-class variation needed under distribution shift, while class imbalance can produce minority collapse rather than a balanced simplex.

## Important Papers

- Papyan, Han, and Donoho (2020), "Prevalence of neural collapse during the terminal phase of deep learning training": formulates the four canonical properties and documents them across architectures and datasets.
- [[papers/neural-collapse-a-review-on-modelling-principles-and-generalization|Neural Collapse: A Review on Modelling Principles and Generalization]]: synthesizes unconstrained-feature and locally elastic explanations and evaluates claims about generalization and transfer.
- Zhu et al. (2021), "A geometric analysis of neural collapse with unconstrained features": connects regularized cross-entropy minima and loss landscapes to collapse.
- Galanti et al. (2021), "On the generalization of representations in supervised learning": relates normalized within-class variation to unseen-sample and unseen-class performance under stated assumptions.
- Kornblith et al. (2021), "Why do better loss functions lead to less transferable features?": shows why stronger source-task class separation need not improve transfer under dataset shift.

## Related Concepts

- [[concepts/transferability-evaluation|Transferability Evaluation]]: distinguishes source-task geometry from target-task utility under explicit adaptation protocols.
- Equiangular tight frames: the maximally symmetric arrangement used to characterize centered class means and classifier vectors in NC2 and NC3.
- Nearest-class-mean classification: the decision rule approached under NC4.
- Class-distance-normalized variance: a pairwise ratio of within-class feature variance to squared separation between class means, used in proposed generalization and transfer bounds.
- Minority collapse: an imbalanced-class failure mode in which underrepresented classifier vectors become indistinguishable.
