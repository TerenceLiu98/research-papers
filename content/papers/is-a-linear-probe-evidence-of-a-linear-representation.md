---
title: "Is a Linear Probe Evidence of a Linear Representation?"
type: paper
authors:
  - Nadir Kutluozen
  - Christian Internò
  - David Klindt
year: null
tags:
  - representation-learning
  - linear-probing
  - vision-transformers
---

## TL;DR

Accurate linear decoding does not establish that the decoded factors dominate representation geometry. Random features can support accurate readouts while retaining substantial nonlinear variation. The paper combines reverse predictivity, spectral concentration, and transfer tests to show that pretrained vision encoders acquire latent-aligned structure without approaching a strict, variance-dominant linear world model of the tested factors.

## Research Question

When does successful [[concepts/linear-probing|Linear Probing]] indicate that a representation is approximately an affine image of specified generative factors, rather than a rich feature map from which those factors can be decoded?

## Motivation

A probe observes only the directions needed for its readout. Variation in its null space can remain large and curved. Under bounded random-feature assumptions and targets in the associated reproducing kernel Hilbert space, sufficiently many random features admit an accurate linear readout even without encoder training. This is an asymptotic existence result, not a guarantee for every finite encoder or fitted probe.

## Contributions

- Defines a linear world model relative to a specified factor set through a bound on residual versus latent-aligned variance.
- Develops complementary geometric diagnostics and a rank-dependent upper bound for reverse predictivity.
- Validates the distinction in a controlled simulation and introduces SVG-World, a deterministic scene benchmark with two rendering styles.
- Tests six pretrained vision transformers, matched random controls, standard disentanglement benchmarks, and CelebA.

## Method

For whitened factors $\tilde z$, the strict model is $f(x)=W\tilde z(x)+\mu+\varepsilon(x)$, with residual uncorrelated with the factors and $\mathbb E\|\varepsilon\|^2\leq\sigma^2\|W\|_F^2$. Small $\sigma^2$ requires the factors to explain most feature variance.

1. **Reverse predictivity:** regress features on factors and measure aggregate explained feature variance. Unlike forward decoding, this penalizes variation orthogonal to the factor-aligned component.
2. **Spectral concentration:** whiten the top $r$ feature principal components, fitted on training data, and measure reverse predictivity there, where $r=\operatorname{rank}\operatorname{Cov}(z)$.
3. **Transfer:** train probes in one condition and test in another, checking whether decoding directions survive changes of rendering or factor support.

The population ceiling is $C_r=(\sum_{i\leq r}\lambda_i)/(\sum_i\lambda_i)$ for feature covariance eigenvalues. Reporting $R^2_{\mathrm{rev}}/C_r$ alongside the raw score adjusts for the spectrum; the ceiling need not be attainable for the chosen factors. High diagnostic scores alone do not establish a general world model.

## Experiments

**Simulation (§4, Appendix B).** Two latent variables generate 256 frozen Fourier features, followed by a random or supervised two-layer ReLU MLP. At width 1,024, Table 1 reports forward $R^2=1.000$ for all three conditions. Reverse scores are 0.996 with weight decay, 0.786 without it, and 0.213 at random initialization. The whitened spectral scores are 1.000, 0.983, and 0.713. Figure 3 instead plots an unwhitened top-two variance statistic; these measures must not be conflated.

**SVG-World (Table 5).** AquaWorld and WestWorld each contain 10,000 scenes, split equally for training and testing. The stored layout has 32 coordinates, 20 active; the main probes use 12 position factors. With cross-validated probe penalties, DINOv3-B/16 CLS features achieve forward $R^2=0.91$ versus 0.66 for random initialization, reverse $R^2=0.188$ versus 0.023, and spectral concentration 0.26 versus 0.03. Across DINOv3 sizes, better forward decoding does not imply more latent-aligned variance. Cross-style correlations exceed random controls, but uncalibrated transfer $R^2$ can be strongly negative because feature scales differ across styles.

**Controlled benchmarks (Tables 6–7).** On dSprites, pretrained DINOv3 improves forward decoding (0.42 versus 0.16) while reducing reverse predictivity (0.09 versus 0.61). On 3D Shapes both forward scores are 0.96, while reverse scores are 0.11 versus 0.67. Two of six transformer–benchmark comparisons change the sign of their reverse-predictivity gap under alternative factor encodings.

**CelebA (Table 9).** On 20,000 images with 40 binary attributes, DINOv3 CLS reverse predictivity is 0.170 versus 0.067 for random controls; CLIP reaches 0.192 versus 0.106. Both pretrained readouts reach about 0.28 of their respective ceilings. These attributes explain only part of natural-image variation.

## Limitations

The diagnostics concern specified factors and their encoding, not overall encoder quality. Sparse, low-variance, superposed, or curved representations can receive low scores despite carrying useful information. SVG-World fixes objects to lanes, simplifying binding; the two-face supplementary experiment finds weak attribute binding. Some main-text probes use fixed ridge penalties while comparison tables cross-validate them, so their numerical results are not interchangeable. The simulation uses supervised training rather than the encoders' pretraining objectives. Open scenes without specified factors and language-model applications remain untested.

The supplied Markdown does not identify a publication year or a stable identifier for this paper; the year is left unspecified.

## Related Concepts

- [[concepts/linear-probing|Linear Probing]] — distinguishes accessible information from dominant representation geometry.

## Related Papers

- Rahimi and Recht, *Random Features for Large-Scale Kernel Machines* (2007): provides the random-feature foundation for the forward-decoding argument.
- Muzellec and Kar, *Reverse Predictivity: Going Beyond One-Way Mapping to Compare Artificial Neural Network Models and Brains* (2025): prior reverse-predictivity methodology cited by this paper.
- Schott et al., *Visual Representation Learning Does Not Generalize Strongly Within the Same Domain* (2022): motivates evaluating generalization beyond within-support decoding.
