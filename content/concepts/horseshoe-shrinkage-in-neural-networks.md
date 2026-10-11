---
title: Horseshoe Shrinkage in Neural Networks
type: concept
tags:
  - bayesian-neural-networks
  - shrinkage-priors
---

## Overview

Horseshoe shrinkage regularizes neural-network weights with global and local scale parameters. A shared scale can suppress a neuron's incoming weights, while individual local scales allow supported connections to escape strong shrinkage. This is useful when a wide network is fitted to a short sample.

## Key Ideas

For incoming weight $w_{\ell,ij}$, a neuron-level hierarchy is

$$
w_{\ell,ij}\mid\lambda_{\ell,i},\tau_{\ell,ij}
\sim\mathcal N(0,\lambda_{\ell,i}^2\tau_{\ell,ij}^2),
\qquad \lambda_{\ell,i},\tau_{\ell,ij}\sim C^+(0,1).
$$

- The shared scale $\lambda_{\ell,i}$ shrinks a row of weights together. Local scales $\tau_{\ell,ij}$ permit individual departures.
- The prior is continuous: effective pruning means small weights, not automatically exact zeros or a physically smaller network.
- Shrinkage can reduce sensitivity to an overcomplete width, but does not determine network depth or guarantee avoidance of overfitting.
- Bayesian inference propagates scale and weight uncertainty into predictions. Its reliability still depends on the likelihood, prior, and numerical inference.

## Important Papers

- [[papers/bayesian-neural-networks-for-macroeconomic-analysis|Bayesian neural networks for macroeconomic analysis]]: uses neuron-specific global scales and connection-specific local scales, along with horseshoe regularization of the linear component (Section 2.5).
- Ghosh, Yao, and Doshi-Velez (2019), "Model selection in Bayesian neural networks via horseshoe priors": prior application identified in that paper's discussion.

## Related Concepts

- [[concepts/bayesian-activation-function-averaging|Bayesian Activation-Function Averaging]]: learns activation choices alongside regularized weights.
- [[concepts/sampling-based-inference-for-bayesian-neural-networks|Sampling-Based Inference for Bayesian Neural Networks]]: integrates uncertainty over weights and shrinkage scales.
