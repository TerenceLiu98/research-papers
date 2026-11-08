---
title: The Bayesian Geometry of Transformer Attention
type: paper
authors:
  - Naman Agarwal
  - Siddhartha R. Dalal
  - Vishal Misra
year: 2025
tags:
  - bayesian-inference
  - transformers
  - mechanistic-interpretability
  - in-context-learning
---

## TL;DR

Small sequence models are trained in [[concepts/bayesian-wind-tunnels|Bayesian Wind Tunnels]], synthetic tasks whose exact posterior is available and whose task instances are freshly sampled. Transformers closely match analytic posterior predictions on bijection learning, hidden Markov model (HMM) filtering, and Bayesian regression. Comparisons with Mamba, LSTMs, and MLPs motivate a taxonomy of [[concepts/bayesian-inference-primitives|Bayesian Inference Primitives]]: belief accumulation, belief transport, and random-access binding. The reported architecture ranking is evidence from these controlled tasks under the paper's training protocol, not an absolute expressivity result or evidence about Bayesian uncertainty over network weights.

## Research Question

Can neural sequence models implement an analytic Bayesian posterior predictive through [[concepts/in-context-learning|In-Context Learning]], rather than merely approximate task-specific patterns, and which architectural mechanisms support the required computations?

## Motivation

Natural-language behavior does not provide a known ground-truth posterior, and large pretrained models may reproduce memorized patterns. The paper instead studies controlled prediction problems in which the posterior is computable at every position, task instances do not repeat, and the hypothesis space is too large for instance memorization. This turns Bayesian behavior into a position-wise calibration test and permits mechanistic analysis of internal representations.

## Contributions

- Introduces Bayesian wind tunnels for comparing a model's predictive distribution with an analytic posterior under non-repeating task instances.
- Decomposes sequential Bayesian computation into belief accumulation, belief transport, and random-access binding.
- Compares Transformers, Mamba, LSTMs, and capacity-matched MLPs on tasks chosen to exercise different primitives.
- Relates Transformer performance to approximately orthogonal key directions, progressively sharper query-key alignment, and a low-dimensional value manifold associated with posterior entropy.
- Reports that Mamba's HMM representations form five clusters corresponding to the five hidden states, with confidence varying within clusters.

## Method

Population cross-entropy is minimized by the Bayesian posterior predictive when data come from a latent task distribution. The experiments test whether finite models trained with cross-entropy approach this target.

The four task families are:

- **Bijection learning:** observations eliminate mappings from a finite hypothesis space; analytic predictive entropy is $\log_2(V-k+1)$ for a previously unseen input after $k-1$ mappings.
- **HMM filtering:** the forward algorithm supplies the exact filtering posterior and requires recursively transporting belief through stochastic dynamics.
- **Bayesian linear regression:** a Gaussian prior and likelihood give a closed-form continuous posterior predictive, discretized into 41 output bins for model training.
- **Associative recall:** cue-target retrieval isolates content-addressable binding.

Models receive freshly sampled tasks and are evaluated with entropy error, distributional distances, accuracy, length generalization, ablations, linear probes, and representation geometry. The paper distinguishes posterior prediction over task variables from Bayesian inference over network weights.

## Experiments

On held-out bijections, the task-optimized 2.67M-parameter Transformer reports entropy MAE of $3\times10^{-3}$ bits over 2,000 instances, KL below 0.01 nats, and total variation distance below 3%. A separate parameter-matched architecture comparison reports bijection MAE values of 0.007 for Transformer, $0.010\pm0.001$ for Mamba, $0.009\pm0.000$ for LSTM, and 1.85 for MLP.

For HMM filtering, the task-optimized 2.68M-parameter Transformer reports entropy MAE of $7.5\times10^{-5}$ bits at training length 20, increasing to 0.0125 at length 30 and 0.0288 at length 50. In the parameter-matched comparison, Mamba performs best at $0.024\pm0.009$ bits, followed by Transformer at 0.049; LSTM and MLP report approximately 0.411 and 0.40. Disabling attention in the top two Transformer layers preserves a reasonable fit at length 20 but raises error to 0.555 at length 30 and 1.79 at length 50.

On associative recall with 64 cue-target pairs, Transformer reaches 100% accuracy. Mamba reaches 97.8% but requires 2.5 times more training epochs, while LSTM remains at 0.5%. On Bayesian regression, an 857k-parameter Transformer reports KL 0.034 nats to the analytic predictive, compared with 0.22 for the capacity-matched MLP.

Mechanistic diagnostics find Layer 0 keys more orthogonal than random-vector baselines, a particularly important Layer 0 attention head, sharper query-key alignment with depth, and value representations organized by posterior entropy. These observations support the paper's proposed mechanism but do not by themselves establish that the same geometry appears in large pretrained language models.

## Limitations

- Experiments use synthetic tasks, modest vocabularies, low-dimensional latent spaces, and models with roughly 1-5M parameters; transfer to natural language or frontier models is untested.
- The architecture comparison describes what the selected implementations learned under the reported optimization protocol. Specialized initialization or broader tuning could change the gaps, especially for state-space models.
- Entropy agreement is supplemented by KL and total variation only for selected experiments; matching entropy alone would not establish equality of full predictive distributions.
- The tasks cover elimination, filtering, continuous regression, and recall, not general Bayesian model selection or posterior uncertainty over neural-network parameters.
- Some headline metrics come from task-optimized models while the cross-architecture table uses separate parameter-matched configurations, so those numbers should not be interchanged.

## Related Concepts

- [[concepts/bayesian-wind-tunnels|Bayesian Wind Tunnels]]
- [[concepts/bayesian-inference-primitives|Bayesian Inference Primitives]]
- [[concepts/in-context-learning|In-Context Learning]]
- [[concepts/bayesian-predictive-coherence|Bayesian Predictive Coherence]]

## Related Papers

- [[papers/do-bayesian-neural-networks-actually-behave-like-bayesian-models|Do Bayesian Neural Networks Actually Behave Like Bayesian Models?]]: also distinguishes Bayesian claims from empirical predictive behavior, but studies Bayesian neural networks rather than contextual task inference.
- Agarwal, Dalal, and Misra (2025), "Gradient Dynamics of Attention: How Cross-Entropy Sculpts Bayesian Manifolds," arXiv:2512.22473: the trilogy's second paper, cited for the proposed optimization dynamics behind the geometry.
- Agarwal, Dalal, and Misra (2025), "Geometric Scaling of Bayesian Inference in LLMs," arXiv:2512.23752: the trilogy's third paper, cited as extending the geometric account toward larger language models.
- Jelassi et al. (2024), "Repeat After Me: Transformers are Better than State Space Models at Copying," arXiv:2402.01032: motivates the distinction between state propagation and random-access retrieval.

[[index|Library home]]
