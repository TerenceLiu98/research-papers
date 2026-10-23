---
title: "DeepFRC: An End-to-End Deep Learning Model for Functional Registration and Classification"
type: paper
authors:
  - Siyuan Jiang
  - Yihan Hu
  - Wenjie Li
  - Pengcheng Zeng
year: 2025
tags:
  - functional-data-analysis
  - functional-registration
  - functional-data-classification
  - deep-learning
  - time-warping
---

## TL;DR

DeepFRC jointly learns [[Functional Registration|functional registration]] and [[Functional Data Classification|classification]] instead of aligning curves in a separate preprocessing stage. A convolutional deformation network produces monotone time warpings, a Fourier basis encodes the aligned curves, and a class-aware elastic loss couples alignment to prediction. Across five real-data tasks, the paper reports better alignment than joint and sequential baselines and classification accuracy between 89.8% and 96.4%, but performance deteriorates for highly volatile or very sparsely sampled trajectories.

## Research Question

Can a single end-to-end model align functional observations while learning a classifier, so that the alignment removes phase variation without erasing class-discriminative structure?

## Motivation

Functional observations can differ because their underlying events occur at different rates or times. A conventional pipeline registers curves first and classifies them second, but an unsupervised registration objective has no reason to preserve distinctions useful for the downstream label. DeepFRC treats the warping and prediction modules as one learning problem, while retaining smooth functional structure through elastic geometry and basis expansion.

## Contributions

- Introduces an end-to-end architecture that combines a neural deformation operator, smooth spectral representation, and classifier.
- Defines a class-aware alignment objective in square-root velocity function space that contracts curves within each class while separating class means.
- Gives an approximation result for the learned warpings and a stability-based generalization bound under boundedness, separation, compactness, and learning-rate assumptions.
- Evaluates alignment, reconstruction, and classification on simulated data and five real-data cases, with ablations for each architectural component and analyses of noise, missingness, basis choice, and data scale.

## Method

For each sampled trajectory, a four-block one-dimensional CNN predicts nonnegative deformation features. Normalized cumulative sums convert those features into a monotone, boundary-preserving warping function. Linear interpolation evaluates the registered curve on the warped grid, after which the curve is represented by 100 Fourier coefficients and passed to a three-layer MLP classifier.

The alignment loss uses the square-root velocity function representation. Its within-class term pulls warped curves toward their class-specific mean, while an inverse-distance term encourages separation between different class means. Cross-entropy supplies the classification loss, and a coefficient $\beta$ balances the two objectives. The full network is optimized jointly with AdamW.

The paper states that the deformation network can approximate the optimal elastic warpings and bounds the resulting registration discrepancy. Its generalization analysis adapts algorithmic-stability results to obtain a bound proportional to $T_0^{1-1/c_0}/N$ under the stated assumptions, where $T_0$ is the number of optimization steps and $N$ is sample size. These are conditional theoretical guarantees rather than claims that globally optimal warpings are observable on real data.

## Experiments

The synthetic study uses 6,000 two-class curves with known nonlinear warpings. On the held-out test set, the paper reports coefficient correlation 0.976, registration error 0.056, adjusted total variance (ATV) 0.504, and perfect accuracy and macro-$F_1$. Under Gaussian noise with standard deviation 0.20, coefficient correlation remains 0.969, compared with 0.950 for SrvfRegNet and 0.490 for TTN.

Real-data experiments cover Wave, Yoga, binary and three-class Symbol, and three-channel MotionSense. DeepFRC reports ATV values of 5.6, 16.2, 4.8, 3.2, and 25.0, respectively, all lower than the compared TTN and SrvfRegNet pipelines. Its corresponding accuracies are 96.4%, 89.8%, 96.0%, 96.3%, and 95.0%. Classification is sometimes tied or narrowly exceeded by a sequential TSLANet pipeline, but DeepFRC combines comparable classification with substantially lower ATV.

Ablations support coupling the tasks: removing the deformation operator lowers accuracy on every dataset, while removing the classifier worsens ATV on every dataset. Removing the spectral representation generally harms both outcomes. Performance is reported as stable across Fourier, B-spline, and polynomial bases and plateaus around 100 basis functions. Missing-data experiments first impute observations, so they test robustness of the combined imputation-and-model pipeline rather than native missing-value handling.

## Limitations

- The objective is sensitive to rapid directional changes, and the authors report reduced performance on highly volatile trajectories.
- Registration becomes unreliable at very short sequence lengths; in the sparse simulation, the paper indicates that roughly 100 or more time points are needed for reliable alignment.
- Multidimensional inputs assume a shared warping process across channels, which may not fit signals whose components have distinct phase variation.
- Real-data warpings have no ground truth. ATV and visual separation are useful proxies, but they do not establish recovery of the true temporal transformation.
- The theoretical guarantees depend on conditions including bounded functions, separated class means, a probability floor, compact parameters, and a decaying learning rate; the approximation result does not make globally optimal real-data warpings directly observable.
- Missing values are handled through external smoothing or imputation before training rather than by the architecture itself.

## Related Concepts

- [[Functional Registration]]
- [[Functional Data Classification]]
- [[Functional Neural Networks]]
- [[Functional Principal Component Analysis]]
- [[Dynamic Time Warping]]

## Related Papers

- Chen and Srivastava (2021), "SrvfRegNet: Elastic Function Registration Using Deep Neural Networks."
- Lohit, Wang, and Turaga (2019), "Temporal Transformer Networks: Joint Learning of Invariant and Discriminative Time Warping."
- Tang et al. (2022), "Model-Based Joint Curve Registration and Classification."
- [[Deep Learning with Functional Inputs]]
- [[Deep Learning for Functional Data Analysis with Adaptive Basis Layers]]

[[index|Library home]]
