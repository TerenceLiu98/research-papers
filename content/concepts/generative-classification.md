---
title: Generative Classification
type: concept
aliases:
  - Generative Classifiers
tags:
  - generative-models
  - classification
  - density-estimation
  - bayesian-inference
---

## Overview

Generative classification predicts a label by modeling how likely the observed input is under each class. Given class-conditional models $p(x\mid c)$ and class priors $p(c)$, Bayes' rule produces $p(c\mid x)$. This contrasts with discriminative classifiers, which directly learn a decision rule or posterior without modeling the input distribution.

## Key Ideas

- **Classification is relative density estimation.** A decision only requires comparing class-conditional scores; each likelihood need not be accurately calibrated in absolute terms if their differences are reliable.
- **Priors remain part of the decision rule.** Uniform class priors reduce prediction to maximum conditional likelihood, while nonuniform priors can change the posterior ranking.
- **Approximate likelihoods can suffice.** Latent-variable models may replace intractable log likelihoods with variational bounds or other density surrogates, but the approximation can affect which class wins.
- **Shared randomness reduces comparison variance.** When scores are estimated by Monte Carlo, evaluating every class with matched random samples can estimate pairwise differences much more precisely than independent sampling.
- **Generative objectives may change robustness and composition.** Modeling $p(x\mid c)$ can encourage broader class structure than fitting a decision boundary, but any advantage is empirical and may vary across distribution shifts.
- **Inference is often the central cost.** Scoring every candidate under a large generative model can be far slower than one discriminative forward pass. Adaptive elimination or discriminative pruning trades purity of the generative procedure for speed.

## Important Papers

- [[papers/your-diffusion-model-is-secretly-a-zero-shot-classifier|Your Diffusion Model is Secretly a Zero-Shot Classifier]] uses paired Monte Carlo estimates of diffusion denoising error to classify with Stable Diffusion and DiT without an added prediction head.
- Ng and Jordan (2001), "On Discriminative vs. Generative Classifiers: A Comparison of Logistic Regression and Naive Bayes": analyzes classical differences between direct decision modeling and class-conditional modeling.
- Zimmermann et al. (2021), "Score-Based Generative Classifiers": develops classification with score-based generative models.
- Grathwohl et al. (2020), "Your Classifier is Secretly an Energy Based Model and You Should Treat It Like One": gives the complementary view of discriminative classifiers as energy-based generative models.

## Related Concepts

- [[concepts/diffusion-models|Diffusion Models]]: conditional denoisers can provide variational density scores for generative classification.
- [[concepts/neural-simulation-based-inference|Neural Simulation-Based Inference]]: also uses learned conditional distributions, but typically targets posterior inference over latent parameters rather than a finite class decision.
- [[concepts/transferability-evaluation|Transferability Evaluation]]: distinguishes zero-shot reuse from adaptation and highlights exposure and protocol confounds.
