---
title: Non-Negative Bregman Divergence Minimization for Deep Direct Density Ratio Estimation
type: paper
authors:
  - Masahiro Kato
  - Takeshi Teshima
year: null
tags:
  - density-ratio-estimation
  - bregman-divergences
  - anomaly-detection
---

## TL;DR

Kato and Teshima stabilize deep [[concepts/density-ratio-estimation|Density Ratio Estimation]] by correcting a component of the empirical Bregman objective that must be nonnegative in the population. Their deep direct DRE (D3RE) framework reduces the reported overfitting of neural ratio models and improves inlier-based outlier detection. Its statistical guarantees require bounded ratios and controlled model classes; the experiments also show sensitivity to the correction parameter.

[[index|Library home]]

## Research Question

How can Bregman-based direct density ratio estimation exploit flexible neural networks without letting the empirical objective reward extreme predictions on numerator training samples?

## Motivation

For a convex generator, the numerator contribution to an empirical Bregman objective decreases as predicted ratios increase. A flexible network can fit numerator and denominator samples separately, driving training loss down without estimating their population ratio. The authors call this train-loss hacking. Bounding the output alone can leave the model stuck at its upper limit.

## Contributions

- Rewrites a family of Bregman objectives to expose a population-nonnegative component and applies [[concepts/non-negative-risk-correction|Non-Negative Risk Correction]] to its empirical estimate (Section 3).
- Instantiates the correction for least-squares importance fitting (LSIF), unnormalized KL, binary KL, and positive-unlabeled log-loss objectives.
- Reports a Rademacher-based excess-risk bound and a stronger-assumption ratio-estimation bound (Section 4).
- Tests training stability, synthetic ratio estimation, and image-based inlier/outlier ranking (Sections 5-6).

## Method

Given independent samples from $p_{\mathrm{nu}}$ and $p_{\mathrm{de}}$, estimate $r^*=p_{\mathrm{nu}}/p_{\mathrm{de}}$, with numerator support contained in denominator support. Minimizing expected [[concepts/bregman-divergences|Bregman Divergence]] from $r^*$ to $r$ is equivalent, up to a model-independent constant, to minimizing

$$
J_f(r)=\mathbb E_{\mathrm{de}}[f'(r)r-f(r)]-\mathbb E_{\mathrm{nu}}[f'(r)].
$$

Assume $\bar R=\sup_x r^*(x)<\infty$ and choose $0<C<1/\bar R$. Write $f'(t)=C[f'(t)t-f(t)]+\tilde f(t)$, with $\tilde f$ bounded above, and choose $A$ so that $\ell_1(t)=f'(t)t-f(t)+A\geq0$. With $\ell_2=-\tilde f$,

$$
J_f(r)=(\mathbb E_{\mathrm{de}}-C\mathbb E_{\mathrm{nu}})\ell_1(r)
+\mathbb E_{\mathrm{nu}}\ell_2(r)-(1-C)A.
$$

The first term is nonnegative because $p_{\mathrm{de}}-Cp_{\mathrm{nu}}\geq0$. D3RE clips its sample estimate at zero, dropping the constant:

$$
\widehat J_f^+(r)=
\max\{0,(\widehat{\mathbb E}_{\mathrm{de}}-C\widehat{\mathbb E}_{\mathrm{nu}})\ell_1(r)\}
+\widehat{\mathbb E}_{\mathrm{nu}}\ell_2(r).
$$

For LSIF this becomes

$$
\max\left\{0,\tfrac12\widehat{\mathbb E}_{\mathrm{de}}r^2-\tfrac C2\widehat{\mathbb E}_{\mathrm{nu}}r^2\right\}
-\widehat{\mathbb E}_{\mathrm{nu}}r+\tfrac C2\widehat{\mathbb E}_{\mathrm{nu}}r^2.
$$

The algorithm uses minibatches and optionally takes an ascent step on the corrected component when it becomes negative. The authors distinguish this practical heuristic from plain minimization of the corrected objective. In the PU-log-loss formulation, the output estimates the scaled ratio $Cr^*$ rather than $r^*$ itself.

### Reported Guarantees

Theorem 1 bounds excess population BD risk relative to the best model in the hypothesis class by terms of order $n_{\mathrm{de}}^{-1/2}+n_{\mathrm{nu}}^{-1/2}$, a confidence term, and an exponentially decaying correction-bias term. Conditions include bounded Lipschitz losses, existence of minimizers, a strictly positive population margin for the corrected component, bounded input support, and neural-network norm and activation restrictions.

Theorem 2 reports $\|\hat r-r^*\|_{L^2(p_{\mathrm{de}})}=O_{\mathbb P}(\min\{n_{\mathrm{de}},n_{\mathrm{nu}}\}^{-1/(2+\gamma)})$ for $0<\gamma<2$, with strong convexity, realizability, and further conditions referenced to the unavailable appendix. These results concern statistical minimizers, not convergence of the stochastic optimizer.

## Experiments

**Training stability (Section 5.1).** CIFAR-10 is split into vehicle positives and animal negatives. Training uses 1,000 positive and 1,000 unlabeled samples; evaluation uses 10,000 samples. Across 10 trials and two learning rates, the authors report better AUROC for corrected LSIF and PU losses than uncorrected neural losses or naively capped uLSIF. The ratio-normalization diagnostic is also tracked. Sensitivity experiments favor $1/C$ near the ratio bound of 2, with some tolerance to misspecification.

**Synthetic estimation (Section 5.2, Table 2).** Two identity-covariance Gaussian distributions differ by one unit in the first mean coordinate. Each supplies 1,000 samples; results average 50 trials. The table below compares Gaussian-kernel uLSIF, uncorrected neural LSIF, and the lowest reported D3RE MSE across the parameter sweep. Selecting the best value retrospectively is not a held-out tuning result.

| Dimension | Kernel uLSIF MSE | Neural LSIF MSE | Best D3RE MSE | Reported C |
| --- | --- | --- | --- | --- |
| 10 | 2.378 | 1.272 | 0.833 | 5 |
| 20 | 1.684 | 2.694 | 1.272 | 3 |
| 30 | 1.786 | 3.724 | 1.488 | 2 |
| 50 | 1.791 | 8.717 | 1.609 | 2 |
| 100 | 1.723 | 4.849 | 1.626 | 2 |

**Inlier-based outlier detection (Section 6, Table 3).** MNIST, CIFAR-10, and Fashion-MNIST use one inlier class against the remaining classes, with LeNet and Wide ResNet models and five trials. For the CIFAR-10 airplane class with LeNet, AUROC is $0.745\pm0.056$ for uLSIF-NN, $0.934\pm0.002$ for nnBD-LSIF, and $0.943\pm0.001$ for nnBD-PU. The authors report an average CIFAR-10 gain of 0.157 from uLSIF-NN to nnBD-LSIF; the supplied table shows only part of the class results. Gains are not universal: MNIST class 0 has 0.999 for uLSIF-NN versus 0.997 for nnBD-LSIF with LeNet.

## Limitations

- The formal correction relies on a finite ratio bound and a compatible $C$. The shifted Gaussian experiment has $r^*(x)=\exp(x_1-1/2)$, which is unbounded; analytically, that experiment lies outside the bounded-ratio assumption and should be read as empirical evidence only.
- Parameter choice matters: at dimension 100, the reported D3RE MSE rises from 1.626 at $C=2$ to 11.557 at $C=20$.
- The outlier-detection setting uses unlabeled mixture data. DeepSAD and geometric-transformation baselines were designed for different information settings, as the authors acknowledge.
- The supplied Markdown contains damaged notation and lacks the referenced appendices, full result table, publication year, venue, and stable paper identifier. The year is left null; appendix proofs and implementation details cannot be checked from this source.

## Related Concepts

- [[concepts/density-ratio-estimation|Density Ratio Estimation]]: learns a ratio directly from samples of two distributions.
- [[concepts/non-negative-risk-correction|Non-Negative Risk Correction]]: enforces a population sign constraint on an empirical risk component.
- [[concepts/bregman-divergences|Bregman Divergences]]: supplies the loss family being rewritten and corrected.

## Related Papers

- Sugiyama, Suzuki, and Kanamori, "Density ratio matching under the Bregman divergence: A unified framework of density ratio estimation": the framework extended here.
- Kiryo et al. (2017), "Positive-unlabeled learning with non-negative risk estimator": the methodological inspiration for correcting a population-nonnegative risk component.
- Kanamori, Hido, and Sugiyama (2009), "A least-squares approach to direct importance estimation": the LSIF foundation and kernel baseline.
- Rhodes, Xu, and Gutmann (2020), "Telescoping density-ratio estimation": discusses a related density-chasm difficulty; this paper distinguishes train-loss hacking as possible even when true ratios are not large.
