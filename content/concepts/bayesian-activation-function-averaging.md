---
title: Bayesian Activation-Function Averaging
type: concept
tags:
  - bayesian-neural-networks
  - model-averaging
---

## Overview

Bayesian activation-function averaging treats the choice of a neural-network activation as uncertain and integrates over candidate functions in posterior prediction. It lets data inform the shape of nonlinearities while retaining uncertainty over that choice.

## Key Ideas

- An activation indicator selects a function from a finite candidate set. Its prior probabilities express initial preferences; posterior frequencies reflect support conditional on the model and data.
- Choices may be shared across a network, shared within layers, or specific to neurons. Greater granularity increases flexibility and the space of configurations to explore.
- Averaging complete predictions across categorical activation draws is generally different from substituting a weighted-average activation into a multilayer network. Nonlinear composition prevents treating these operations as interchangeable.
- The macroeconomic application uses leaky ReLU, sigmoid, ReLU, and tanh. Flexible activation choices offer modest forecast improvements with stochastic volatility and larger differences in some homoskedastic comparisons.
- Averaging reduces the need to choose a single activation manually; it does not remove choices about candidate functions, priors, width, depth, or computation.

## Important Papers

- [[papers/bayesian-neural-networks-for-macroeconomic-analysis|Bayesian neural networks for macroeconomic analysis]]: develops activation mixtures and categorical posterior updates for shallow neuron-specific and deep layer-specific specifications (Sections 2.3 and 2.6).

## Related Concepts

- [[concepts/sampling-based-inference-for-bayesian-neural-networks|Sampling-Based Inference for Bayesian Neural Networks]]: averages predictions over activation and weight draws.
- [[concepts/horseshoe-shrinkage-in-neural-networks|Horseshoe Shrinkage in Neural Networks]]: controls network complexity alongside activation uncertainty.
