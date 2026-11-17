---
title: Prevalence of neural collapse during the terminal phase of deep learning training
type: paper
authors:
  - Vardan Papyan
  - X. Y. Han
  - David L. Donoho
year: 2020
tags:
  - neural-collapse
  - representation-learning
  - deep-learning-theory
---

## TL;DR

Deep image classifiers trained beyond effectively zero training error develop a shared last-layer geometry: within-class features concentrate, centered class means form a simplex equiangular tight frame, classifier weights align with those means, and decisions approach nearest-class-center classification. The paper names these four properties [[concepts/neural-collapse|Neural Collapse]] and documents them across seven datasets and three architecture families. Test accuracy and measured adversarial robustness generally improve during this terminal phase, although accuracy gains are not universal.

## Research Question

Does continued training after interpolation impose a reproducible geometry on learned features and classifiers, and what does that geometry imply for prediction and robustness?

## Motivation

Zero classification error does not imply zero cross-entropy loss. Continued optimization can therefore reshape representations even after training labels are memorized. Earlier fixed-feature analyses establish max-margin or discriminant structure but leave the geometry of learned features unspecified.

## Contributions

- Introduces the four-part NC1–NC4 characterization of terminal-phase training.
- Measures its prevalence across 21 dataset–architecture combinations, selected from 480 fully trained models.
- Shows that idealized variability collapse and simplex geometry imply classifier self-duality and nearest-center decisions in the stated least-squares and max-margin settings.
- Derives simplex geometry as optimal feature design for a vanishing Gaussian-noise classification problem.

## Method

For class means $\mu_c$ and global mean $\mu_G$, let $M$ contain the centered means and let $W$ be the final classifier. The diagnostics are:

1. **NC1:** declining normalized within-class variation, measured by $\operatorname{Tr}(\Sigma_W\Sigma_B^\dagger)/C$.
2. **NC2:** equal class-mean norms and pairwise normalized inner products approaching $-1/(C-1)$, with corresponding measurements for classifier vectors.
3. **NC3:** vanishing Frobenius distance between $W^\top/\|W\|_F$ and $M/\|M\|_F$.
4. **NC4:** decreasing test-set disagreement between the network and the nearest training class mean in feature space.

The theoretical analysis conditions on exact NC1 and NC2 to obtain NC3 and NC4 under the respective classifier assumptions. A separate ideal-design model uses uniformly likely classes, unit-bounded class means, isotropic Gaussian noise, and a linear decoder. As noise variance vanishes, simplex codewords maximize the error exponent at $C/[4(C-1)]$. This characterizes an optimal geometry rather than proving convergence of nonlinear-network SGD to it.

## Experiments

The datasets are MNIST, FashionMNIST, SVHN, CIFAR10, CIFAR100, STL10, and ImageNet; the architectures are VGG, ResNet, and DenseNet, with depth adapted to dataset difficulty. Training uses balanced data, no augmentation, cross-entropy, momentum SGD, and weight decay. ImageNet runs for 300 epochs and other datasets for 350. Learning-rate sweeps train 480 models; the displayed model for each combination is selected by final test error.

The effective terminal-phase threshold is 99.6% training accuracy for ImageNet and 99.9% elsewhere, accommodating mislabeled or inconsistent examples. Figures 2–7 document continued geometric convergence after this threshold.

Selected Table 1 results (accuracy in percent):

| Dataset / architecture | At effective zero error | Final epoch |
| --- | ---: | ---: |
| MNIST / ResNet | 99.32 | 99.71 |
| STL10 / DenseNet | 67.79 | 70.81 |
| CIFAR100 / DenseNet | 77.19 | 76.56 |
| ImageNet / ResNet | 65.41 | 64.45 |
| ImageNet / DenseNet | 65.04 | 62.38 |

Across all combinations, reported median and mean accuracy changes are +0.3495 and +0.4984 percentage points. Three combinations decline. DeepFool attacks on 100 sampled test images per combination measure relative perturbation norm; Figure 8 reports median and mean terminal-phase improvements of 0.0252 and 0.2452 in that measure.

## Limitations

- The evidence concerns balanced image classification with a specific training recipe, not arbitrary architectures, tasks, or class imbalance.
- Selecting learning rates by final test error limits interpretation as an independently held-out generalization evaluation.
- Co-occurring collapse and performance improvements do not isolate a causal effect of collapse; the accuracy declines show that terminal training is not uniformly beneficial.
- DeepFool measurements are attack-specific empirical robustness evidence, not certified input-space guarantees.
- The Gaussian feature-design theorem and conditional classifier theorems do not explain the full nonlinear training dynamics. The authors identify that explanation as future work.

## Related Concepts

- [[concepts/neural-collapse|Neural Collapse]]: the canonical four-property geometry introduced and measured here.

## Related Papers

- [[papers/neural-collapse-a-review-on-modelling-principles-and-generalization|Neural Collapse: A Review on Modelling Principles and Generalization]]: subsequent synthesis of explanations and generalization implications.
- Soudry et al. (2018), “The implicit bias of gradient descent on separable data”: fixed-feature max-margin behavior sharpened here by imposing collapsed feature geometry.
- Webb and Lowe (1990), “The optimised internal representation of multilayer classifier networks performs nonlinear discriminant analysis”: least-squares classifier characterization used in the conditional NC derivation.
