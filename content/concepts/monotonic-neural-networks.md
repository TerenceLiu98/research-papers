---
title: Monotonic Neural Networks
type: concept
aliases:
  - Monotonic Networks
tags:
  - neural-networks
  - monotonicity
  - temporal-point-processes
---

## Overview

A monotonic neural network constrains its output to be nondecreasing in specified inputs. In the scalar-time construction used by Dynamic Hawkes Processes, nonnegative weights and nondecreasing activation functions make a learned function $F(t)$ nondecreasing. Its derivative $f(t)=F'(t)$ can then represent nonnegative latent dynamics while $F$ supplies their antiderivative.

## Key Ideas

- **Composition preserves monotonicity:** Layers $h^{(l)}=\sigma(W^{(l)}h^{(l-1)}+b^{(l)})$ with elementwise nonnegative weights and nondecreasing activations preserve ordering. A nonnegative output weight matrix preserves that property; additive biases need not be nonnegative to preserve monotonicity.
- **Differentiate a cumulative function:** Parameterizing $F$ directly makes $f=F'$ available through automatic differentiation and makes integrals of $f$ endpoint differences. Monotonicity of $F$ does not require monotonicity of $f$.
- **Mixtures remain monotonic:** $F(t)=\sum_c\pi_c\Phi^c(t)+b_0t$ is nondecreasing when every $\Phi^c$ is nondecreasing and $\pi_c,b_0\geq0$. These are nonnegative mixture coefficients; the DHP description does not impose a probability-simplex normalization.
- **Application-specific integration:** DHP multiplies a base kernel evaluated at $F(t)-F(t_j)$ by $F'(t)$. The chain rule then provides an analytic integral when the base kernel has a known antiderivative. Monotonicity alone does not make every neural intensity analytically integrable.
- **Constraint versus interpretation:** A nonnegative derivative guarantees a valid sign for latent modulation. It does not establish that the learned function is an observed community state or a uniquely identified mechanism.

## Important Papers

- [[papers/dynamic-hawkes-processes-for-discovering-time-evolving-communities-states-behind-diffusion-processes|Dynamic Hawkes Processes for Discovering Time-evolving Communities' States behind Diffusion Processes]]: uses mixtures of monotonic networks with tanh hidden activations, softplus in the last layer, and automatic differentiation (Section 4.1).
- Sill (1998), "Monotonic networks": a foundational reference cited by DHP as reference [33].
- Chilinski and Silva (2020), "Neural likelihoods via cumulative distribution functions": cited by DHP for monotonic neural constructions (reference [6]).
- Omi et al. (2019), "Fully neural network based model for general temporal point processes": cited by DHP as inspiration for modeling an integrated function (reference [28]).

## Related Concepts

- [[concepts/dynamic-hawkes-processes|Dynamic Hawkes Processes]]: uses a monotonic antiderivative to couple time rescaling with nonnegative excitation modulation.
- [[concepts/non-parametric-bayesian-hawkes-processes|Non-parametric Bayesian Hawkes Processes]]: uses squared Gaussian processes to ensure nonnegative kernels, a different construction with different inference requirements.
