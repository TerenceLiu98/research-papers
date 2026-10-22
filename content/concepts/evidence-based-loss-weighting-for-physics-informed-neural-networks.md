---
title: Evidence-Based Loss Weighting for Physics-Informed Neural Networks
type: concept
aliases:
  - Bayesian PINN Loss Weighting
  - Evidence-Driven PINN Loss Balancing
tags:
  - physics-informed-neural-networks
  - bayesian-neural-networks
  - loss-balancing
  - model-evidence
---

## Overview

Evidence-based loss weighting treats the coefficients on a physics-informed neural network's equation residuals, boundary conditions, observations, and parameter regularizers as probabilistic hyperparameters. A marginal-likelihood approximation then chooses their relative scale from the supplied constraints while penalizing unnecessary model complexity. This provides a statistical alternative to fixed weights, gradient-balancing heuristics, and neural-tangent-kernel conditioning.

## Key Ideas

- **Loss terms become likelihood factors.** Squared residual, boundary, and observation errors are modeled as Gaussian likelihood contributions. Their positive weights act as inverse noise variances rather than arbitrary importance coefficients.
- **Regularization is a prior.** Weight-decay coefficients specify Gaussian prior precision, connecting overfitting control to the same evidence objective used for the data terms.
- **Evidence balances fit and complexity.** A Laplace approximation around a maximum-posterior network produces fitted-error, Hessian-determinant, and normalization terms. Optimizing this objective can tune loss weights; comparing its value can rank network configurations.
- **Training is bilevel.** Network parameters minimize a weighted posterior loss, while hyperparameters minimize negative approximate evidence. Practical implementations may delay and interleave hyperparameter updates because the local approximation is unreliable far from a weight optimum.
- **Uncertainty is local.** The inverse Hessian can propagate weight uncertainty to predictions, but it describes a neighborhood of one mode. It does not automatically capture distant modes, architecture uncertainty, or calibrated predictive coverage.
- **Applicability depends on curvature cost.** Explicit Hessians are tractable for small, shallow PINNs and become expensive for deep architectures. The local Gaussian assumption is also weakest for strongly non-Gaussian or multimodal posteriors.
- **Evidence selection is not predictive validation.** Higher approximate evidence offers a principled within-framework ranking, but accuracy, robustness, and uncertainty calibration still require direct evaluation.

## Important Papers

- [[papers/bayesian-reasoning-for-physics-informed-neural-networks|Bayesian Reasoning for Physics-Informed Neural Networks]]: optimizes regularization and PINN component weights with a Laplace evidence objective, ranks 100 independently trained models, and evaluates heat, wave, and Burgers equations.
- MacKay (1992), "A practical Bayesian framework for backpropagation networks": develops the classical evidence treatment of neural-network weights and hyperparameters on which the PINN formulation builds.
- Xiang et al. (2022), "Self-adaptive loss balanced physics-informed neural networks": a likelihood-motivated alternative that estimates loss weights without the same model-evidence construction.

## Related Concepts

- [[concepts/sampling-based-inference-for-bayesian-neural-networks|Sampling-Based Inference for Bayesian Neural Networks]]: avoids a fixed local Gaussian posterior form but generally makes inference and hyperparameter selection more expensive.
- [[concepts/probability-calibration|Probability Calibration]]: tests whether predictive uncertainty is reliable, a question not settled by evidence maximization alone.

