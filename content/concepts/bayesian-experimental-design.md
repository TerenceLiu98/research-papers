---
title: Bayesian Experimental Design
type: concept
aliases:
  - Bayesian Optimal Design
  - Bayesian Adaptive Design
  - Information-Theoretic Experimental Design
tags:
  - bayesian-inference
  - experimental-design
  - expected-information-gain
  - active-learning
---

## Overview

Bayesian experimental design chooses controllable aspects of an experiment by maximizing expected utility under a probabilistic model. Its most common information-theoretic objective is expected information gain (EIG): the expected change from prior to posterior beliefs about a target quantity. The target can be a parameter, prediction, optimum, model identity, or another quantity for which the experiment should reduce uncertainty.

## Key Ideas

- **Expected information gain:** For design $\xi$, target $\theta$, and outcome $y$, EIG is the mutual information $I(\theta;y\mid\xi)$. Equivalently, it is the expected posterior-to-prior KL divergence or the expected reduction in uncertainty about $\theta$.
- **Model-based design:** A prior and outcome model or simulator define hypothetical experiment outcomes. The design is optimal only relative to this model, target, and utility; model misspecification can therefore direct data collection toward systematically unhelpful regions.
- **Adaptive design:** Sequential designs condition each decision on previously observed design-outcome pairs. Greedy methods maximize one-step EIG, while non-myopic methods optimize information over the full sequence.
- **Nested computation:** EIG usually contains an intractable marginal likelihood or posterior inside an expectation. Nested Monte Carlo, multilevel debiasing, variational bounds, density-ratio estimation, and mutual-information estimators offer different bias, variance, and computational tradeoffs.
- **Implicit likelihoods:** BED can operate with simulators whose likelihood density cannot be evaluated. Suitable variational or ratio-estimation objectives require samples rather than a tractable likelihood.
- **Amortized policies:** A learned policy can map an experimental history directly to the next design. Expensive training occurs upfront, permitting fast deployment across repeated realizations and allowing optimization of total rather than only immediate information gain.
- **Downstream fit matters:** Data informative for one modeled target need not be good for model checking, a different inferential model, or non-Bayesian prediction. Design objectives should reflect the actual downstream use of the data.

## Important Papers

- [[papers/modern-bayesian-experimental-design|Modern Bayesian Experimental Design]] reviews EIG estimation, stochastic optimization, likelihood-free methods, and policy-based adaptive design, while emphasizing scalability and misspecification as open problems.
- Lindley (1956), "On a measure of the information provided by an experiment": foundational information-gain formulation.
- Chaloner and Verdinelli (1995), "Bayesian experimental design: a review": foundational review of Bayesian design methods.
- Foster et al. (2021), "Deep adaptive design: amortizing sequential Bayesian experimental design": learns non-myopic history-to-design policies.

## Related Concepts

- [[concepts/neural-simulation-based-inference|Neural Simulation-Based Inference]] learns posterior or density-ratio approximations from simulator draws.
- [[concepts/amortized-variational-inference|Amortized Variational Inference]] shares inference computation across observations rather than optimizing a fresh approximation for every case.
- [[concepts/density-ratio-estimation|Density Ratio Estimation]] supplies likelihood-to-evidence ratios used by likelihood-free information objectives.
- Active learning is a special case in which designs select inputs whose labels should be acquired.
- Bayesian optimization uses information-based acquisition functions to learn about optima or promising evaluations.
