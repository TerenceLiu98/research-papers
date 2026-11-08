---
title: Continuous Spatiotemporal Transformer
type: paper
authors:
  - Antonio Henrique de Oliveira Fonseca
  - Emanuele Zappala
  - Josue Ortega Caro
  - David van Dijk
year: null
tags:
  - continuous-modeling
  - spatiotemporal-dynamics
  - transformers
  - operator-learning
  - sobolev-regularization
---

## TL;DR

The Continuous Spatiotemporal Transformer (CST) adapts a Transformer to noisy, irregular samples of continuous dynamical systems. It inserts interpolated dummy coordinates, perturbs the combined sequence during training, and penalizes output derivatives through a Sobolev objective. Across spiral interpolation, KITTI video inpainting, Navier-Stokes dynamics, and widefield calcium imaging, the reported results favor CST over the selected interpolation, recurrent, Transformer, and neural-operator baselines; its attention representations also predict visual-stimulus contrast better than the tested latent representations.

## Research Question

Can a Transformer learn a smooth, continuously queryable map from discretely sampled spatiotemporal data while retaining self-attention's ability to model nonlocal dependencies?

## Motivation

Standard Transformers operate on discrete tokens and can produce step-like behavior when queried between observed coordinates. Classical interpolation after model inference can amplify noise or overshoot, while continuous-time solver models do not directly provide the same nonlocal attention mechanism. The paper seeks a data-driven operator whose output and attention can be evaluated at arbitrary coordinates and whose derivatives are controlled without requiring derivative labels.

## Contributions

- Introduces CST, a Transformer framework for continuous spatiotemporal data that mixes observed samples with randomly located dummy points.
- Trains the model in a Sobolev space by combining data-fitting error with norms of higher output derivatives.
- Shows how querying CST at new coordinates provides interpolated predictions and up-sampled attention weights without applying a separate interpolation method to the final output.
- Evaluates the framework on synthetic integral-equation spirals, KITTI video inpainting, Navier-Stokes trajectories, and widefield calcium-imaging recordings.
- Reports that attention-derived calcium-imaging representations encode visual-stimulus contrast more accurately than raw data and the tested recurrent, latent-ODE, LFADS, ConvLSTM, and ViViT representations.

## Method

CST represents each sampled value and its coordinate as a token. During training, it samples additional in-between coordinates, initializes their values by linear interpolation from observed data, and adds Gaussian noise to the resulting sequence. A linear encoder maps tokens into a latent space, a multi-head module uses the linear-attention approximation from Nyströmformer, and a linear decoder predicts values at every supplied coordinate. During inference, the augmentation is removed and the model can be queried at arbitrary coordinates inside the data domain.

The training loss combines a data term at observed coordinates with derivative penalties evaluated over observed and dummy coordinates:

$$
\mathcal L(\mathbf y,\mathcal D)^p
=\lVert \mathbf y-\mathcal D\rVert_p^p
+\mu\sum_{1\leq |\mathbf q|\leq k}\lVert D^{\mathbf q}\mathbf y\rVert_p^p.
$$

The coefficient $\mu$, derivative order $k$, and norm order $p$ control the accuracy-smoothness trade-off. Unlike derivative-matching forms of Sobolev training, the higher-order terms do not require target derivatives, so the model can evaluate them at arbitrarily sampled dummy coordinates. This connects [[concepts/sobolev-regularization|Sobolev Regularization]] with [[concepts/neural-operators|Neural Operators]] and coordinate-conditioned continuous representations.

## Experiments

**Integral-equation spirals.** The study uses 500 two-dimensional spirals with 100 time points each, training on 10 sampled points per curve and reserving the remainder for interpolation. CST has lower interpolation error than a matched four-layer Transformer ($0.03859\pm0.01013$ versus $0.04329\pm0.007511$) and is reported to outperform it significantly over 150 validation spirals. Under added Gaussian noise, CST also outperforms linear and cubic-spline interpolation. Its attention up-sampling error is lower than linear interpolation of attention weights.

**KITTI video inpainting.** Ten-frame clips are corrupted with Gaussian noise over 40-60% of each frame. CST obtains validation MSE 0.1138, compared with 0.2505 for 3D-ViT, 0.363 for ConvGRU, and 0.3651 for ViViT. The compared architectures differ substantially in parameter count and training procedure.

**Navier-Stokes dynamics.** CST is trained on 10 time points from 1,000 dynamics and evaluated on 20 points from 300 unseen noisy dynamics, combining new initial conditions with unseen time coordinates. Its reported MSE is $(4.88\pm0.21)\times10^{-3}$, versus $(5.12\pm0.27)\times10^{-3}$ for linear interpolation, $(5.54\pm0.31)\times10^{-3}$ for splines, $(1.88\pm0.11)\times10^{-2}$ for FNO2D, and $(1.38\pm0.08)\times10^0$ for FNO3D.

**Calcium imaging.** Widefield recordings are split into 104 spatial patches per frame and modeled in 10-frame segments. A 3-nearest-neighbor regressor predicts stimulus contrast from 10 PCA components of the learned attention distribution. Over 10 train/test repetitions, CST-base obtains MSE $0.063\pm0.019$ and $R^2=0.774\pm0.057$; CST-small obtains MSE $0.090\pm0.025$ and $R^2=0.676\pm0.064$. The raw-data baseline reaches MSE $0.112\pm0.020$ and $R^2=0.595\pm0.053$, while ViViT is the strongest listed non-CST model at MSE $0.101\pm0.025$ and $R^2=0.637\pm0.045$.

## Limitations

- The supplied manuscript does not state a publication year, venue, DOI, arXiv identifier, or usable repository URL, so no stable identifier is recorded here.
- The experiments use different CST sizes, baselines, training objectives, and parameter counts across tasks; they do not isolate the contribution of every architectural and training component.
- The reported continuity and smoothness behavior is demonstrated empirically and encouraged by finite-order derivative penalties. The paper does not establish a general approximation or out-of-distribution guarantee for arbitrary continuous systems.
- Dummy values begin from linear interpolation, making that initialization and its sampling density part of the method's inductive bias.
- The Navier-Stokes comparison reports that FNO3D fits training data but interpolates poorly under noise and irregular sampling; this evaluation does not establish a general ranking over neural operators.
- Calcium-imaging evidence comes from the described visual-stimulation setting. Attention patterns and stimulus-decoding accuracy do not by themselves establish a causal or universally interpretable account of brain dynamics.
- Several significance claims are reported without full test definitions, effect sizes, or multiple-comparison procedures in the supplied text.

## Related Concepts

- [[concepts/sobolev-regularization|Sobolev Regularization]] controls derivatives of the learned output without requiring derivative targets in CST.
- [[concepts/neural-operators|Neural Operators]] learn mappings between function spaces and provide the paper's operator-learning context.
- [[concepts/implicit-neural-representations|Implicit Neural Representations]] share the ability to query learned functions at continuous coordinates, although CST learns across system instances rather than fitting one signal.
- [[concepts/dynamical-systems-reconstruction|Dynamical Systems Reconstruction]] distinguishes pointwise prediction from recovery of broader dynamical behavior.

## Related Papers

- Vaswani et al. (2017), "Attention Is All You Need": supplies the Transformer and self-attention foundation.
- Chen et al. (2018), "Neural Ordinary Differential Equations": represents the continuous-time solver approach contrasted with CST.
- Li et al. (2020), "Fourier Neural Operator for Parametric Partial Differential Equations": supplies the FNO2D and FNO3D baselines in the Navier-Stokes experiment.
- Xiong et al. (2021), "Nyströmformer: A Nyström-Based Algorithm for Approximating Self-Attention": supplies CST's linear-attention mechanism.
- Czarnecki et al. (2017), "Sobolev Training for Neural Networks": provides a derivative-aware training precedent; CST differs by penalizing output derivatives without matching them to target derivatives.
- [[papers/time-series-continuous-modeling-for-imputation-and-forecasting-with-implicit-neural-representations|Time Series Continuous Modeling for Imputation and Forecasting with Implicit Neural Representations]] offers another coordinate-based approach to irregular temporal observations.

[[index|Library home]]
