---
title: Differentially Private Decoding
type: concept
aliases:
  - DP Decoding
tags:
  - differential-privacy
  - language-models
  - decoding
  - privacy-utility-tradeoff
---

## Overview

Differentially private decoding concerns privacy guarantees for a language model's token-sampling process. The protected input and adjacency relation must be specified: privacy for records in retrieved context is different from privacy for records used in model training. The temperature-based analysis below concerns a dataset accessible during generation.

## Key Ideas

### Logit Sensitivity and Temperature

Suppose the next-token distribution is $\pi_D(w\mid h)\propto\exp(\ell_D(w,h)/T)$ for $T>0$. If every neighboring pair obeys

$$
\sup_{w,h}|\ell_D(w,h)-\ell_{D'}(w,h)|\leq\Delta,
$$

the ratio of token probabilities is bounded by $\exp(2\Delta/T)$. One factor comes from the change in the token's unnormalized weight and another from the normalizer. This yields pure-DP parameter $2\Delta/T$ per token and, by basic composition, $2\Delta L/T$ for a fixed $L$-token output. The guarantee requires uniform sensitivity control across tokens, histories, and neighboring datasets; observing small changes on a few examples cannot certify it.

### Utility and Scope

Higher temperature flattens the softmax distribution and tightens this sufficient privacy bound. It can also reduce task utility, but the direction and size of that effect depend on the utility definition. Yang and Zhu illustrate a decline using an exponential function of cumulative logits, not an independent correctness measure.

Their covariance identity $d\mathbb{E}_{\pi_T}[\nu]/dT=-\operatorname{Cov}_{\pi_T}(\nu,U)/T^2$ assumes a global Gibbs distribution $\pi_T(m)\propto\exp(U(m)/T)$. An autoregressive model with prefix-dependent normalizers does not generally have this form when $U$ is simply the sum of raw logits. Likewise, rewarding temperature linearly without an upper limit does not yield a finite optimum when expected utility is bounded and the reward coefficient is positive. These are qualifications on this particular temperature-design formulation.

## Important Papers

- [[papers/differential-privacy-in-generative-ai-agents-analysis-and-optimal-tradeoffs|Differential Privacy in Generative AI Agents: Analysis and Optimal Tradeoffs]]: derives the sensitivity-based bounds and illustrates empirical leakage and utility trends with GPT-2.
- Majmudar et al. (2022), "Differentially private decoding in large language models": earlier decoding-stage work cited as reference [10] by Yang and Zhu; not independently summarized here.

## Related Concepts

- [[concepts/differential-privacy|Differential Privacy]]
