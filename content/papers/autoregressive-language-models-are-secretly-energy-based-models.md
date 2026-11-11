---
title: "Autoregressive Language Models are Secretly Energy-Based Models: Insights into the Lookahead Capabilities of Next-Token Prediction"
type: paper
authors:
  - Mathieu Blondel
  - Michael E. Sander
  - Germain Vivier-Ardisson
  - Tianlin Liu
  - Vincent Roulet
year: null
tags:
  - language-models
  - energy-based-models
  - reinforcement-learning
---

[[index|Library home]]

## TL;DR

A soft Bellman mapping makes autoregressive models (ARMs) and energy-based models (EBMs) equivalent in unrestricted function space. Equal optimal supervised likelihoods and a distillation error bound explain how next-token logits can encode future continuation values, without guaranteeing that finite neural models efficiently learn them.

## Research Question

Can next-token prediction represent globally normalized sequence distributions, and what follows for lookahead, teacher forcing, and reward-based post-training?

## Motivation

ARMs support tractable likelihood training and ancestral sampling. EBMs score complete sequences but require expensive normalization. KL-regularized reward maximization has an EBM as its unrestricted optimum, making their relationship relevant to alignment.

## Contributions

- An invertible reward-to-logit mapping preserves sequence distributions (Proposition 1).
- Optimal supervised negative log-likelihoods agree in function space (Proposition 2).
- Uniform mapped-logit approximation error bounds sequence KL divergence (Proposition 3).
- Exactly enumerable synthetic models illustrate the theoretical results.

## Method

The [[concepts/soft-bellman-mapping-for-sequence-models|Soft Bellman Mapping for Sequence Models]] adds the soft value of the successor prefix to each immediate token reward. EOS has no continuation value. Subtracting that value gives the inverse. Local normalizers telescope into global EBM normalization.

For maximum length $T$, uniform error $\varepsilon$ in mapped logits bounds either direction of sequence KL by $2T\varepsilon$. The causal Transformer approximation argument establishes existence and requires embedding dimension to scale with vocabulary size.

Teacher forcing follows from factorizing sequence likelihood along observed prefixes. Its unrestricted optimum matches that of EBM likelihood training without explicitly computing the mapping. Explicit EBM-to-ARM conversion remains exponential in sequence length. KL-regularized post-training targets a distribution proportional to the reference policy times exponentiated reward, relating the result to [[concepts/maximum-entropy-rl-for-posterior-sampling|Maximum-Entropy RL for Posterior Sampling]].

## Experiments

Section 5 and Appendix C enumerate vocabulary/length pairs $(8,4)$ and $(4,8)$: 4,096 and 65,536 sequences. Two- and three-layer Transformers implement causal ARMs and non-causal EBMs. Expected risks and normalization are computed exactly for Zipfian and normal-softmax targets.

The authors report closely matching loss curves and convergence to the same minima. Mapped, centered logits agree more closely than unmapped scores. Experiments support the KL bound, but sharply peaked normal-softmax targets exhibit KL convergence without convergence of maximum logit discrepancy. Additional experiments find slightly greater ARM robustness to learning-rate choice and similar gradient-noise sensitivity.

## Limitations

Function-space equivalence does not imply equivalence between fixed-size causal and non-causal architectures. Learning continuation values can be difficult; the results do not resolve optimization error, sample efficiency, or comparative representation complexity. Experiments use tiny synthetic spaces rather than natural-language planning benchmarks. Latent thinking traces remain a future direction.

The supplied Markdown does not establish a publication year or stable identifier; these are not inferred from cited works.

## Related Concepts

- [[concepts/soft-bellman-mapping-for-sequence-models|Soft Bellman Mapping for Sequence Models]]
- [[concepts/maximum-entropy-rl-for-posterior-sampling|Maximum-Entropy RL for Posterior Sampling]]

## Related Papers

- [[papers/a-law-of-next-token-prediction-in-large-language-models|A law of next-token prediction in large language models]]: complementary empirical analysis of layerwise next-token representations, rather than sequence-distribution equivalence.
