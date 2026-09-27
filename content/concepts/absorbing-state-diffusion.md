---
title: Absorbing-State Diffusion
type: concept
aliases:
  - Absorbing Diffusion
  - Mask Diffusion
tags:
  - diffusion-models
  - discrete-generative-models
  - masked-language-modeling
---

## Overview

Absorbing-state diffusion is a form of [[concepts/discrete-diffusion-models|Discrete Diffusion Models]] in which corruption replaces a value with a designated state that cannot be left during the forward process. For text, this state is typically a mask token. Generation starts from masks and learns to reveal tokens using the surrounding noisy context.

## Key Ideas

For absorbing category $m$ and masking probability $\beta_t$, the transition matrix is

$$
Q_t=(1-\beta_t)I+\beta_t\mathbf{1}e_m^\top.
$$

An ordinary token survives a step with probability $1-\beta_t$, while an existing mask remains masked. With $\bar\alpha_t=\prod_{s=1}^{t}(1-\beta_s)$, the cumulative transition is

$$
\bar Q_t=\bar\alpha_t I+(1-\bar\alpha_t)\mathbf{1}e_m^\top.
$$

- **Recognizable corruption.** When the mask is absent from clean data, an unmasked token retains its original value. Under the D3PM reverse parameterization, it remains unchanged during reverse sampling; masked positions either stay masked or receive predicted clean values.
- **Simple information schedule.** The schedule $\beta_t=1/(T-t+1)$ gives masking probability $t/T$ and a fully masked terminal state. For a mask absent from the clean vocabulary, remaining mutual information equals $(1-t/T)H(x_0)$ (Austin et al., Appendix A.7).
- **Connection to masked language modeling.** With clean-data prediction and this schedule, the variational objective reduces to masked-token cross-entropy weighted by $1/t$, summed across timesteps. Independent per-position masking differs from choosing exactly a fixed number of tokens to mask (Appendix A.3).
- **Connection to autoregression.** Deterministically masking one position at a time yields an autoregressive objective when reversed. Stochastic masking permits several tokens to be revealed in one reverse step, with fewer steps trading quality for speed.
- **Domain limits.** D3PM's absorbing variant performs best among its tested text diffusion models, but remains behind autoregressive baselines. On CIFAR-10, using gray channel values as the absorbing state underperforms ordinal Gaussian transitions. Because gray occurs in clean images, the special-mask interpretation and information identity require care in that setting.

## Important Papers

- [[papers/structured-denoising-diffusion-models-in-discrete-state-spaces|Structured Denoising Diffusion Models in Discrete State-Spaces]] (Austin et al., 2021): absorbing categorical transitions, masked-language-model connections, and text/image comparisons.
- Ghazvininejad et al. (2019), "Mask-Predict: Parallel decoding of conditional masked language models": related masked prediction objective discussed by Austin et al.; the masking and generation procedures are not identical.

## Related Concepts

- [[concepts/discrete-diffusion-models|Discrete Diffusion Models]]
- [[concepts/diffusion-models|Diffusion Models]]
