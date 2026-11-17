---
title: "Advanced Data Augmentation Methods in Neural Network for Functional Data Classification"
type: paper
authors:
  - Sixuan Meng
  - Zhixia Yang
  - Junyou Ye
  - Xue Yang
  - Jieyu Yang
year: 2026
doi: "10.1080/10618600.2025.2610387"
venue: "Journal of Computational and Graphical Statistics"
tags:
  - functional-data-analysis
  - functional-neural-networks
  - classification
  - basis-expansion
---

## TL;DR

Two input transformations improve functional basis neural networks on selected binary classification datasets: D-FBNN combines curves with their derivatives, while AD-FBNN selects trend, seasonal, and residual components. Across six small datasets, each method has the highest reported accuracy on three tasks; derivative augmentation does not consistently improve on the original FBNN.

## Research Question

Can derivative information and additive decomposition expose discriminative structure that a functional basis neural network misses when trained on original curves?

## Motivation

Functional observations contain variation in level, rate of change, curvature, and periodic structure. A classifier operating on raw curves may underuse these signals. The paper changes the input representation while retaining the continuous hidden layers of [[concepts/functional-neural-networks|Functional Neural Networks]]. Here, augmentation principally means transforming features, rather than generating additional independent training observations.

## Contributions

- D-FBNN permits individual derivatives or a weighted combination of the original curve and its first two derivatives.
- AD-FBNN decomposes curves into trend, seasonal, and residual terms and evaluates subsets of those components.
- Six binary classification benchmarks compare these representations with FBNN, NN, CNN, LSTM, and bidirectional LSTM.

## Method

Curves are smoothed through finite basis expansions, with Fourier bases used in the experiments. FBNN represents functional biases and bivariate connection weights by basis coefficients and propagates function-valued hidden states through integral operators before producing a scalar classification output.

D-FBNN uses $\hat X(t)=a_0X(t)+a_1X'(t)+a_2X''(t)$, with nonnegative weights summing to one. Although the introduction calls the combination trainable, the method and experiments treat its weights as hyperparameters selected by grid search in increments of 1/12. Network coefficients are learned by backpropagation.

AD-FBNN uses the additive representation $X(t)=T(t)+S(t)+R(t)$. Classical moving-average decomposition estimates the trend and seasonal structure; the remainder includes noise and decomposition error. Binary selectors determine which components enter the combined input. This assumes a specified constant seasonal period. Sigmoid activations are used in both models.

## Experiments

The datasets are weather (35 curves), BeetleFly (40), GunPoint (200), ECG (200), ham (214), and tecator (215). Metrics are accuracy, precision, recall, and F1, with CPU training and testing times. Experiments use R on an Intel Core i5-6200U.

Section 4.2 describes a 70/30 training/test split with 10-fold cross-validation restricted to training for tuning. Section 4.3 instead describes comparison by 10-fold cross-validation and selection of the best proposed-model results from earlier tables. The precise relationship between these protocols and the reported means and standard deviations is unclear.

Table 5 reports the following accuracies (mean ± standard deviation):

| Dataset | FBNN | D-FBNN | AD-FBNN |
| --- | --- | --- | --- |
| weather | 0.949 ± 0.077 | 0.911 ± 0.107 | 0.972 ± 0.083 |
| BeetleFly | 0.889 ± 0.146 | 0.944 ± 0.047 | 0.903 ± 0.083 |
| GunPoint | 0.972 ± 0.026 | 0.965 ± 0.041 | 0.997 ± 0.008 |
| ECG | 0.853 ± 0.078 | 0.880 ± 0.089 | 0.945 ± 0.027 |
| ham | 0.877 ± 0.055 | 0.906 ± 0.041 | 0.899 ± 0.034 |
| tecator | 0.891 ± 0.078 | 0.989 ± 0.025 | 0.980 ± 0.027 |

AD-FBNN has the highest listed accuracy on weather, GunPoint, and ECG; D-FBNN leads on BeetleFly, ham, and tecator. D-FBNN falls below FBNN on weather and GunPoint. The tecator first derivative alone reaches 0.989 accuracy, exceeding the reported weighted derivative mixture (0.986). In the decomposition ablation, tecator seasonal input reaches 0.980, while trend alone reaches 0.700. These results favor choosing the representation per dataset rather than assuming every combination helps.

## Limitations

- Evidence covers small binary classification datasets; multiclass, large-scale, and more irregular functional settings remain untested here.
- Fixed bases constrain representation of localized or multiscale patterns; extensive grid search adds optimization cost.
- Evaluation descriptions differ across sections, and the prose search ranges differ from Table 2. Exact reproduction requires resolving those details.
- Original-only D-FBNN results in Table 3 differ from FBNN results in Table 5, so the comparison does not cleanly isolate augmentation under demonstrably identical settings.
- Classical functional discriminant and logistic classifiers are deferred to future comparisons. The tables support dataset-dependent improvements, not universal superiority or established statistical significance.

## Related Concepts

- [[concepts/functional-neural-networks|Functional Neural Networks]] — the basis-expanded continuous-layer architecture being augmented.
- [[concepts/functional-data-classification|Functional Data Classification]] — prediction of binary labels from curves and spectra.
- [[concepts/adaptive-basis-layers|Adaptive Basis Layers]] — an alternative that learns the basis itself; this paper uses fixed Fourier bases.

## Related Papers

- [[papers/non-linear-functional-modeling-using-neural-networks|Nonlinear Functional Modeling Using Neural Networks]] — Rao and Reimherr's FBNN is the architectural foundation and baseline.
