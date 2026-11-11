---
title: Ranking Time Series using a Time Warping Ideal Point Model
type: paper
authors:
  - Lucas Zoroddu
  - Pierre Humbert
  - Laurent Oudre
year: null
tags:
  - time-series
  - preference-learning
  - pairwise-comparisons
---

## TL;DR

Learn an explicit ideal waveform from pairwise preferences and rank signals by elastic distance to it. DTW and TWED improve robustness to temporal deformation compared with Euclidean ideal-point models; a strong feature-based RankSVM remains better on Basic Motions.

## Research Question

Can pairwise comparisons identify an interpretable ideal time series and recover rankings despite temporal misalignment and noisy preferences?

## Motivation

Absolute expert labels can depend on inconsistent thresholds. Relative judgments provide an alternative supervision format, but vector distances can confuse temporal deformation with substantive differences. An ideal represented directly as a waveform makes the learned ranking criterion inspectable.

## Contributions

- Establishes Lipschitz bounds for DTW and TWED with norm-based local costs.
- Formulates empirical-risk learning of a time-series ideal, with excess-risk bounds and conditional recovery guarantees.
- Introduces soft-TWED and its backward dynamic-programming recursion for gradient optimization.
- Studies shorter ideals, multivariate signals, synthetic noise, and rankings constructed from real recordings.

## Method

For comparisons $(X_i,X'_i,y_i)$, with $y_i=-1$ indicating preference for the first signal, estimate

$$
\hat u\in\arg\min_{u\in E}\frac1n\sum_i\ell\bigl(y_i[d(X_i,u)-d(X'_i,u)]\bigr).
$$

Sort new signals by increasing distance to the learned ideal. The geometry uses [[concepts/dynamic-time-warping|Dynamic Time Warping]] or [[concepts/time-warp-edit-distance|Time Warp Edit Distance]]. Soft versions replace dynamic-programming minima with log-sum-exp soft minima. Experiments use hinge loss, Adam, and a zero-waveform initialization.

For univariate length-$T$ signals with absolute local costs, the reported Lipschitz constants are $\sqrt{T(T-1)}$ for DTW and $\sqrt{4T-3}$ for TWED. Under compactness, Lipschitz loss, and independent comparison sampling, these yield excess-risk bounds. Almost-sure ideal recovery additionally uses a correctly specified monotone-link noise model, its negative log-likelihood loss, and an identifiability condition distinguishing candidate ideals. These statistical results concern empirical minimizers, not a guarantee that Adam finds a global optimum of the smoothed hinge objective.

Shorter length-$r$ ideals reduce the parameter count. Standard equal-length computation costs $O(NT^2p)$ per epoch for $N$ signals with $p$ channels. Appendix G.7 sketches multiple ideals using nearest-prototype distance and soft assignments, with an illustrative two-ideal example.

## Experiments

Synthetic experiments warp and perturb length-30 bipolar pulses, use 50–4,000 comparisons, and repeat data generation ten times. A separate experiment orders signals by their injected noise level. At warp strength 3 and 2,000 comparisons, Table 1 reports Kendall tau of 0.73 for DTW, 0.68 for TWED, and 0.25 for Euclidean distance. TWED is not uniformly best despite the stronger wording in the surrounding source prose.

Basic Motions uses six-channel smartwatch recordings, 40 training and 40 test signals, and all 24 class-order permutations to construct preferences. Table 2 reports:

| Method | Mean Kendall tau |
| --- | ---: |
| DTW ideal | 0.69 |
| TWED ideal | 0.70 |
| Euclidean ideal | 0.42 |
| Catch22 + RankSVM | 0.66 |
| ROCKET (1,000) + RankSVM | 0.83 |

Appendix G.6 adds semi-synthetic handwriting and ECG comparisons generated using DTW distances to a selected ideal. Handwriting Kendall scores are 0.72 for DTW, 0.62 for TWED, and 0.59 for ROCKET (2,000) + RankSVM. ECG results are presented visually rather than as a numerical ranking score.

## Limitations

A single ideal may not capture multiple preference prototypes. Elastic alignment is computationally expensive for long sequences. Real recordings are evaluated with constructed preferences, so these experiments do not establish improved agreement among human clinical annotators. DTW-generated semi-synthetic labels favor the assumed distance geometry. Smoothing changes the objective, and ideal-recovery guarantees require stronger assumptions than merely observing good ranking performance.

The supplied Markdown does not establish a publication year, venue, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/dynamic-time-warping|Dynamic Time Warping]]
- [[concepts/time-warp-edit-distance|Time Warp Edit Distance]]
- [[concepts/preference-based-metric-learning|Preference-Based Metric Learning]]: related ideal-point supervision, while this paper fixes the elastic geometry and learns a waveform.

## Related Papers

- [[papers/metric-learning-from-limited-pairwise-preference-comparisons|Metric Learning from Limited Pairwise Preference Comparisons]]: a library connection concerning identifiability under pairwise supervision; it learns a shared Mahalanobis metric rather than an elastic waveform ideal.

[[index|Library home]]
