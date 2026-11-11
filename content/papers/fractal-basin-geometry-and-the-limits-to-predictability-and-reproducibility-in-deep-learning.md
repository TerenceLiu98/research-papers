---
title: Fractal basin geometry and the limits to predictability and reproducibility in deep learning
type: paper
authors:
  - Andrew Ly
  - Pulin Gong
year: 2026
doi: 10.1038/s42256-026-01336-3
tags:
  - deep-learning
  - dynamical-systems
  - reproducibility
---

[[index|Library home]]

## TL;DR

Riddled attraction basins offer a mechanism for training outcomes that remain sensitive to tiny initialization changes even under deterministic computation. A minimal neural network supports the classical dynamical route to riddling; experiments on deeper networks show compatible parameter-space signatures and persistent prediction disagreement, rather than a general proof of riddling.

## Research Question

Why can minute initialization perturbations change the destination and learned function of training when other randomness is controlled, and how much does greater initialization precision improve reproducibility?

## Motivation

Seed control addresses sources of perturbations but does not explain their amplification. Chaos concerns divergence of trajectories; competing, intricately interwoven basins additionally make their eventual destinations sensitive. Parameter differences alone are insufficient evidence of predictive differences because neural-network symmetries can preserve the represented function.

## Contributions

- Connects symmetry-induced invariant subspaces, chaotic dynamics, weakened transverse stability and competing attractors to riddling in a minimal network.
- Uses parameter-space uncertainty exponents to quantify the improvement in outcome predictability as perturbations shrink.
- Introduces functional uncertainty exponents and combines them with disagreement magnitude as a practical diagnostic when explicit destination identification is infeasible.

## Method

The minimal model has two tanh hidden neurons, four weights and eight Gaussian input–target samples, trained by deterministic gradient descent on mean squared error. Permutation and sign symmetries define invariant planes. Longitudinal and transverse Lyapunov analysis characterizes attraction and instability; positive finite-time transverse fluctuations provide indirect evidence for embedded unstable periodic points.

For pairs of nearby initializations, the fraction reaching different destinations scales as $f(\varepsilon) \propto \varepsilon^{\phi_p}$. Smaller positive exponents imply slower gains from precision. Destination maps and exponent fits probe this geometry. Deep-network experiments fix mini-batch order and compare deterministic CPU computation with GPU execution.

Functional analysis fits $m_\varepsilon \propto \varepsilon^{\phi_f}$, where the principal measure is churn: the fraction of test inputs receiving different predicted labels. A near-zero exponent must coincide with substantial disagreement to diagnose meaningful irreproducibility; it does not itself establish basin geometry.

## Experiments

The paper reports approximately 500,000 trained networks across VGGNet, ResNet and BERT configurations, MNIST, CIFAR-10 and IMDB, and several optimizers, regularizers and activations.

| Setting | Reported finding |
| --- | --- |
| Minimal model | $\phi_p=0.0126\pm0.0002$; nearly 24 orders of magnitude less initialization uncertainty would be needed to halve destination disagreement under the fitted scaling (Fig. 3). |
| Tapered VGG-12 on MNIST with 50% label noise | 12,036 parameters; destination map distinguishes 1,772 parity-invariant subspaces. CPU and GPU fits give $\phi_p=0.000\pm0.002$ over ten orders of magnitude (Figs. 4–5). |
| Same VGG-12, functional comparison | Churn approximately 2.9%, with $\phi_f=0.00\pm0.01$ from 250 CPU-trained pairs per scale (Fig. 5). |
| VGG-12 without label noise | Mean churn approximately 3.5%, $\phi_f=0.02\pm0.01$ across six orders of magnitude; no performance–reproducibility trade-off in this configuration (Extended Data Fig. 5). |
| BERT fine-tuning on IMDB | At learning rate $5\times10^{-5}$, mean churn approximately 27%, with exponent $-0.001\pm0.004$ across ten orders of magnitude; at $10^{-7}$, churn approximately 0.1% (Extended Data Fig. 6). |

The authors also report consistent qualitative behavior across 32 functional and representational measures. Performance–reproducibility trade-offs occur in most tested configurations, not all.

## Limitations

Deep-network evidence is finite-scale and finite-horizon, consistent with riddling rather than an analytic demonstration. Destination labels depend on thresholds and training duration; the principal VGG analysis uses 30 epochs and a vanishing-neuron norm threshold of $10^{-2}$. The small, tapered architecture and deliberately noisy primary task permit extensive sampling but do not establish universality at full modern model scale.

The minimal-model trajectory diverges after approximately 94,000 of 100,000 epochs; the authors exclude the final 6,000 and use the preceding long chaotic transient to approximate the attractor. Machine precision eventually makes sufficiently close initializations identical. A near-zero fitted exponent does not prove a strictly nonzero disagreement limit at arbitrarily small mathematical scales, and these experiments do not establish undecidability of neural-network training.

## Related Concepts

- [[concepts/riddled-basins|Riddled Basins]]: positive-measure basins perforated by competing destinations at every neighborhood scale.
- [[concepts/uncertainty-exponents|Uncertainty Exponents]]: scaling diagnostics separating destination sensitivity from functional disagreement.

## Related Papers

The supplied article relates its mechanism to Alexander et al., *Riddled basins* (1992; reference 14), and Chen et al., *Stochastic collapse: how gradient noise attracts SGD dynamics towards simpler subnetworks* (2023; reference 21). It distinguishes its basin analysis from Sohl-Dickstein, *The boundary of neural network trainability is fractal* (2024; reference 15), which examines trainability boundaries. These are source-cited relationships; no separate library pages were identified for them.

## Source

[Article DOI](https://doi.org/10.1038/s42256-026-01336-3). Summary based on the supplied parsed article, including Methods and Extended Data. The source carries a 2026 copyright and acceptance date but leaves the online publication date as a placeholder.
