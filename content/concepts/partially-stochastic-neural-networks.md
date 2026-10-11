---
title: Partially Stochastic Neural Networks
type: concept
aliases:
  - Partial Stochasticity
tags:
  - bayesian-neural-networks
  - approximate-inference
  - uncertainty-quantification
---

## Overview

A partially stochastic neural network learns a distribution over a subset of its parameters while estimating the rest as fixed values. Prediction averages over the stochastic subset. This supports uncertainty-aware prediction with less distributional state than making every parameter stochastic, but changes the predictive model and does not automatically approximate the full-network posterior predictive.

## Key Ideas

- **Two training routes.** Two-stage methods first fit a deterministic network, then infer a distribution over selected parameters while holding the remainder fixed. Joint methods optimize point estimates and a variational distribution together.
- **Placement matters.** Stochastic input layers, output layers, residual blocks, and individual selected weights produce different predictive families and computational costs. The best choice can depend on inference method, data shift, and evaluation metric.
- **Few random variables can be expressive.** Under suitable continuity and architectural conditions, randomness before a sufficiently expressive deterministic subnetwork supports [[concepts/universal-conditional-distribution-approximation|Universal Conditional Distribution Approximation]]. Randomness restricted to a Gaussian linear output layer generally cannot express arbitrary regression distributions.
- **Memory and compute are distinct.** Reducing stochastic parameters lowers distribution-storage costs. A stochastic output layer allows deterministic feature reuse; a stochastic input layer still requires repeated downstream computation.
- **Evaluate the predictive target.** Accuracy, likelihood, calibration, and mixing diagnose different properties. Strong predictions do not establish exact Bayesian inference, and additional stochastic parameters do not guarantee improvements on any of these measures.

## Important Papers

- [[papers/do-bayesian-neural-networks-need-to-be-fully-stochastic|Do Bayesian Neural Networks Need To Be Fully Stochastic?]]: proves sufficient limited-randomness constructions and compares partial and full stochasticity across HMC, MFVI, Laplace, and SWAG. Successful subsets vary across settings.
- Daxberger et al. (2021), "Bayesian deep learning via subnetwork inference": cited in that paper as a method for expressive inference over selected weights.

## Related Concepts

- [[concepts/universal-conditional-distribution-approximation|Universal Conditional Distribution Approximation]]: the representational question underlying limited-randomness predictors.
- [[concepts/probability-calibration|Probability Calibration]]: assesses the meaning of reported probabilities, independently of how many parameters are stochastic.
