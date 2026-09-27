---
title: Discrete Diffusion Models
type: concept
aliases:
  - D3PM
  - D3PMs
  - Discrete Denoising Diffusion Probabilistic Models
tags:
  - diffusion-models
  - discrete-generative-models
  - categorical-data
---

## Overview

Discrete diffusion models generate categorical data by learning to reverse a Markov corruption process. A transition matrix specifies which categories can replace each other and with what probabilities. The state remains discrete throughout corruption and generation, making the framework applicable to tokens and quantized pixel values without a continuous relaxation.

## Key Ideas

- **Tractable corruption.** With one-hot row vectors and row-stochastic transition matrices $Q_t$, the forward marginal is $q(x_t\mid x_0)=\operatorname{Cat}(x_t;x_0Q_1\cdots Q_t)$. A closed-form posterior over the preceding state permits variational training.
- **Structure is an inductive bias.** Uniform replacement treats all categories alike. Ordinal kernels favor nearby pixel values, embedding graphs encode token neighborhoods, and [[concepts/absorbing-state-diffusion|Absorbing-State Diffusion]] marks corrupted positions explicitly.
- **The terminal distribution matters.** The forward process should approach a tractable prior. Doubly stochastic transitions preserve a uniform distribution, but convergence also requires suitable mixing conditions and a sufficient schedule. Absorbing corruption instead approaches a point mass.
- **Predict clean data to parameterize reverse steps.** D3PM predicts a distribution over $x_0$ and combines it with the known forward joint distribution. This enforces the reverse transition support and permits skipping timesteps. Conditional independence of reverse outputs does not prevent the network from conditioning on the full noisy sequence or image.
- **Likelihoods are bounded.** The standard objective is a variational upper bound on NLL. An auxiliary clean-data cross-entropy term changes training emphasis; a better sample-quality metric need not imply a better likelihood bound.
- **Noise need not mean variance.** A mutual-information schedule controls how much information about a clean token remains. In D3PM this uses the empirical token marginal, rather than the joint information content of an entire sequence.
- **Vocabulary size constrains implementation.** Dense storage for every timestep scales as $O(K^2T)$. Uniform and absorbing transitions admit compact products; fixed-generator matrix exponentials offer another storage reduction. These techniques do not make every structured transition equally cheap.

Austin et al.'s experiments show why transition design requires empirical validation: ordinal Gaussian corruption helps CIFAR-10, while embedding-neighborhood corruption offers only a small text8 improvement and worsens LM1B results relative to uniform corruption.

## Important Papers

- [[papers/structured-denoising-diffusion-models-in-discrete-state-spaces|Structured Denoising Diffusion Models in Discrete State-Spaces]] (Austin et al., 2021): structured categorical transitions, auxiliary denoising, and image/text evaluations.
- Sohl-Dickstein et al. (2015), "Deep unsupervised learning using nonequilibrium thermodynamics": binary diffusion precursor, discussed by Austin et al.
- Hoogeboom et al. (2021), "Argmax flows and multinomial diffusion: Towards non-autoregressive language models": uniform categorical diffusion precursor and baseline, discussed by Austin et al.

## Related Concepts

- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/absorbing-state-diffusion|Absorbing-State Diffusion]]
