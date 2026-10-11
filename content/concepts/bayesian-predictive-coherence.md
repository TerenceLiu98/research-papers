---
title: Bayesian Predictive Coherence
type: concept
aliases:
  - Predictive Coherence of Bayesian Updating
tags:
  - bayesian-inference
  - uncertainty-quantification
  - sequential-learning
---

## Overview

Bayesian predictive coherence requires that updating on observations sampled from a model's own posterior predictive preserves its current beliefs on average. Individual hypothetical observations change beliefs, but averaging over those observations recovers the original posterior. This provides a behavioral diagnostic for approximate inference that complements static prediction metrics.

## Key Ideas

For observed data $D$ and fixed future inputs $X^*$, exact Bayesian updating satisfies, under the usual integrability conditions,

$$
\mathbb E_{Y^*\sim p(\cdot\mid X^*,D)}
 [\pi(\theta\mid D,X^*,Y^*)]=\pi(\theta\mid D).
$$

- **The expectation matters.** Coherence does not require every updated posterior to equal the current one. It requires their predictive-probability-weighted average to match.
- **Joint labels preserve shared uncertainty.** To sample a future dataset in a conditionally independent Bayesian model, draw a shared parameter vector, then draw each label conditionally on that vector. Independently sampling each label from its marginal BMA generally changes the joint distribution.
- **Finite resampling supplies a diagnostic.** Train on original observations plus each synthetic labeling, average the resulting predictions, and compare with the initial predictive distribution. Significant disagreement falsifies the tested coherence property; agreement on a few metrics does not prove full Bayesian fidelity.
- **Sequential coherence is related but distinct.** Exact updating on successive observed batches equals conditioning on their union. An approximate posterior passed as a new prior can lose old information even when its static predictions appear reasonable.
- **Martingale posteriors offer a broader framework.** Fong et al.'s construction represents parameter uncertainty through hypothetical completions of missing data. The finite retraining ensemble used by Pituk et al. is an adaptation for testing BNN updates, rather than the full infinite predictive-resampling construction.
- **Coherence and utility need separate evaluation.** A resampling ensemble can improve accuracy while violating the invariance above. Conversely, an inaccurate posterior approximation can preserve a coherence property in a tractable setting. Neither static calibration nor predictive coherence alone establishes exact inference.

## Important Papers

- [[papers/do-bayesian-neural-networks-actually-behave-like-bayesian-models|Do Bayesian Neural Networks Actually Behave Like Bayesian Models?]]: tests sequential and predictive coherence in approximate BNNs; finds violations for MFVI and SGLD in classification experiments, with mixed predictive benefits from resampling ensembles.
- Fong, Holmes, and Walker (2023), "Martingale posterior distributions": framework underlying the predictive interpretation, as reviewed by Pituk et al.
- Falck, Wang, and Holmes (2024), "Is in-context learning in large language models Bayesian? A martingale perspective": related predictive diagnostic discussed by Pituk et al.

## Related Concepts

- [[concepts/sampling-based-inference-for-bayesian-neural-networks|Sampling-Based Inference for Bayesian Neural Networks]]: approximate posterior samples require evaluation beyond static model averages.
- [[concepts/probability-calibration|Probability Calibration]]: compares probabilities with outcomes, whereas predictive coherence tests the consistency of an updating procedure with its own predictive beliefs.
