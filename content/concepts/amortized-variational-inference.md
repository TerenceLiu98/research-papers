---
title: Amortized Variational Inference
type: concept
aliases:
  - Amortized Inference
tags:
  - variational-inference
  - bayesian-inference
  - deep-generative-models
---

## Overview

Amortized variational inference learns a shared mapping from observations to an approximate posterior distribution. A trained encoder predicts distribution parameters for each observation, spreading the cost of inference across many cases. This differs from optimizing a separate set of variational parameters for every observed case.

## Key Ideas

- **Variational objective:** For latent variables $z$ and observations $x$, the ordinary evidence lower bound is $\mathbb E_{q_\phi(z\mid x)}[\log p_\theta(x,z)-\log q_\phi(z\mid x)]$. Under the usual prior-likelihood factorization, this equals expected log likelihood minus $D_{\mathrm{KL}}(q_\phi(z\mid x)\Vert p(z))$.
- **Shared inference network:** An encoder maps $x$ to parameters such as Gaussian means and variances. Its weights are shared across observations and can support inference for new cases from the modeled setting without separate optimization for each case.
- **Amortization gap:** A shared encoder may not reach the best approximation available from independent optimization for every observation. Its computational benefit must be evaluated alongside approximation quality and generalization.
- **Posterior dependence:** Amortization does not require independence between all latent variables. VIBO conditions respondent ability on sampled item characteristics, while learning item posterior parameters without amortization.
- **Stochastic optimization:** Minibatches estimate the data expectation. Reparameterization, such as $z=\mu_\phi(x)+\sigma_\phi(x)\odot\epsilon$ with standard Normal $\epsilon$, permits gradients through posterior samples. The response model can also be learned jointly with the encoder.
- **Evaluation:** Parameter recovery, held-out prediction, and posterior predictive checks probe different properties. Agreement on response accuracy does not establish equivalence of full posterior distributions. Changing the KL weight or posterior family also changes the inference tradeoff.

## Important Papers

- [[papers/modeling-item-response-theory-with-stochastic-variational-inference|Modeling Item Response Theory with Stochastic Variational Inference]]: demonstrates shared ability inference for IRT, with non-amortized item distributions and ablations of posterior dependence and response aggregation.
- Gershman and Goodman (2014), "Amortized inference in probabilistic reasoning": cited foundation for sharing inference computations in the VIBO paper.
- Kingma and Welling (2013), "Auto-encoding variational bayes": cited foundation for jointly learning a generative model and a reparameterized inference network.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: VIBO applies amortization to respondent ability inference while retaining uncertainty about items.
