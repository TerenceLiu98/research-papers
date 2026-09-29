---
title: Counterfactual Quantile Learning
type: concept
tags:
  - causal-inference
  - distributional-treatment-effects
  - risk-sensitive-policy-optimization
---

## Overview

Counterfactual quantile learning estimates quantiles of the outcome distribution that would arise under a specified intervention or policy. For a time-specific potential outcome $Y_t(\pi)$, the target is

$$
q_\tau(Y_t(\pi))=\inf\{y:F_{Y_t(\pi)}(y)\geq\tau\}.
$$

This exposes distributional features that a mean can miss. An upper quantile can guide action when large outcomes are undesirable; its usefulness depends on causal identification and accurate tail estimation.

## Key Ideas

- **Interventional target:** A conditional forecast under recorded treatment is not automatically a counterfactual distribution under a new policy. CT-CQL assumes consistency, overlap, sequential ignorability given observed history, and a specified stochastic dynamics model.
- **Quantile contrasts:** The difference between quantiles under two policies describes a contrast of marginal outcome distributions. It is not generally the quantile of individual treatment effects, which depends on the unobserved joint distribution of potential outcomes.
- **Continuous-time construction:** CT-CQL couples an SDE for trajectories with a Fokker-Planck description of density evolution. Simulations under candidate policies yield empirical outcome quantiles at numerical time points.
- **Policy criterion:** Modeling a distribution is distinct from using it in decisions. CT-CQL combines utility optimization with dose and duration budgets and an upper-quantile constraint. Estimated constraint satisfaction is conditional on model and numerical accuracy.
- **Tail stability:** Appendix B.3 of CT-CQL uses a density lower bound near the target quantile to translate CDF error into quantile error. Sparse tails can make quantiles unstable even when overall distribution fit appears good.
- **Adjustment scope:** Outcome and propensity models can support doubly robust causal estimation under the relevant assumptions. Robustness of a mean estimator does not automatically establish robustness of an entire CDF or its quantiles; that extension needs its own argument.

## Important Papers

- [[papers/continuous-time-counterfactual-quantile-learning-for-risk-sensitive-policy-optimization|Continuous-Time Counterfactual Quantile Learning for Risk-Sensitive Policy Optimization]]: combines neural stochastic dynamics, minimax density-consistency training, an AIPW loss, and quantile-constrained policy search. Evidence includes simulated counterfactual benchmarks and an offline ICU application.

## Related Concepts

- [[concepts/double-machine-learning|Double Machine Learning]]: nuisance estimation and orthogonal causal scores; cross-fitting and inference conditions remain separate requirements.
- [[concepts/distributional-reinforcement-learning|Distributional Reinforcement Learning]]: learns return distributions, whereas counterfactual quantile learning here targets potential outcomes at a specified time.
- [[concepts/distributional-difference-in-differences|Distributional Difference-in-Differences]]: another route to counterfactual outcome distributions, based on restrictions on untreated distributional evolution.
