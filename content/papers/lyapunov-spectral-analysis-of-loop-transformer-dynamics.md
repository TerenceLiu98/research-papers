---
title: "Lyapunov Spectral Analysis of Loop Transformer Dynamics"
type: paper
authors:
  - Fynn Kiwitt
  - Christopher Irwin
  - Riccardo Ali
  - Pietro Liò
year: null
source_job_id: "c778189a-2d01-47ba-acee-303cf5027208"
tags:
  - looped-transformers
  - dynamical-systems
  - mechanistic-interpretability
---

[[index|Library home]]

## TL;DR

Finite-time Lyapunov spectra distinguish expanding recurrent dynamics in Ouro-1.4B from contracting dynamics in Huginn-0125. Sublayer attribution shows that both regimes arise from near-cancellation of large opposing contributions, distributed differently across the architectures. These measurements characterize hidden-state stability, not reasoning quality or guaranteed asymptotic behavior.

## Research Question

Can perturbation growth distinguish slow convergence, marginal stability, and chaos in looped Transformers, and identify which components produce their observed stability regimes?

## Motivation

Repeated shared blocks allow additional inference depth without additional parameters. Hidden-state or attention similarity alone cannot determine whether apparently stable trajectories converge or remain sensitive to perturbations. Quantifying that sensitivity complements analyses of [[concepts/cyclic-fixed-points-in-looped-transformers|Cyclic Fixed Points in Looped Transformers]].

## Contributions

- Estimates the top 50 Lyapunov exponents of two recurrent language models over 20 prompts.
- Decomposes growth into sublayer contributions to explain the balance between contraction and expansion.
- Tracks Huginn's leading exponent across eight intermediate checkpoints and the final model.

## Method

The recurrence is a fixed map $z_{t+1}=f_\theta(z_t)$ on the full-sequence residual stream, without a KV cache. Ouro repeats 24 decoder layers followed by RMSNorm; its learned early-exit gate is bypassed. Huginn repeats an input-injection adapter and four core layers. Ouro was trained at four recurrences; Huginn's mean training depth was 32.

The [[concepts/lyapunov-spectra-of-recurrent-neural-dynamics|Lyapunov spectrum]] is estimated with the Benettin algorithm: propagate orthonormal probes through Jacobian-vector products, apply QR re-orthogonalization, and average the logarithms of the absolute diagonal entries of $R$. Main runs use 50 probes and 64 loops; attribution uses QR after each sublayer for 32 loops. Weights, JVPs, and QR use FP32, with FP64 accumulation. State dimensions range from 8,192 to 89,760 depending on model and prompt.

## Experiments

The 20 short prompts cover declarative, narrative, instructional, and reasoning text; these are dynamical measurements rather than task-accuracy benchmarks.

| Measurement | Reported result |
| --- | --- |
| Ouro, 64 loops | Leading exponent is positive for all 20 prompts: mean 0.145, standard deviation 0.046. Mean per-prompt inverse exponent is 7.9 loops. |
| Ouro, 32 loops | 16 of 50 prompt-averaged exponents are positive; the lowest measured exponent is approximately −0.06. |
| Huginn | Top 50 exponents lie in approximately [−0.31, −0.22] at 32 loops; leading exponent is approximately −0.19 at 64 loops. |
| Ouro depth sweep | First-loop mean log-growth is +2.292; loops 2–3 and 4–7 contract on average. Persistent average expansion appears beyond roughly eight loops. |
| Huginn attribution | Adapter contribution is −1.47 per loop versus +1.20 from the first core layer; remaining layers contribute little. |
| Huginn checkpoint sweep | Eight intermediate checkpoints plus the final model, five prompts, one probe, 32 loops: leading exponent stays in [−0.27, −0.22]. |

Ouro's early layers contract, later layers selectively expand leading directions, and the final RMSNorm expands approximately uniformly across measured directions. Huginn's adapter contraction and first-layer expansion are both approximately direction-independent. The sublayer log-growth contributions sum to the loop-level estimate (§3.2).

Huginn's contraction persists across checkpoints covering approximately 13–89% of training and the final model. The authors predict that weakening input injection could reverse the regime, but do not perform that intervention.

## Limitations

- Finite horizons and only 50 directions out of thousands do not establish the complete asymptotic spectrum. Positive finite-time growth supports the reported chaotic interpretation over the measured horizon.
- Ouro is evaluated far beyond its four-loop training depth with early exit disabled; long-horizon expansion should not be conflated with its usual inference behavior.
- Two architectures and 20 short prompts limit generality; the checkpoint sweep uses only five prompts and one probe.
- Huginn's first 13% of training is unobserved, so architecture cannot be separated from early learning as the cause of stability. Comparable Ouro checkpoints are unavailable.
- Input-injection ablations and validation of the exponent as a general training diagnostic remain future work. No demonstrated relationship to reasoning accuracy is established.
- The supplied Markdown gives no explicit publication year or stable identifier; the year is left unspecified.

## Related Concepts

- [[concepts/lyapunov-spectra-of-recurrent-neural-dynamics|Lyapunov Spectra of Recurrent Neural Dynamics]]
- [[concepts/cyclic-fixed-points-in-looped-transformers|Cyclic Fixed Points in Looped Transformers]]
- [[concepts/latent-reasoning|Latent Reasoning]]
- [[concepts/mechanistic-interpretability|Mechanistic Interpretability]]

## Related Papers

- [[papers/a-mechanistic-analysis-of-looped-reasoning-language-models|A Mechanistic Analysis of Looped Reasoning Language Models]]: the directly discussed precursor uses hidden-state and attention similarity; spectral analysis resolves the ambiguity between slow convergence and persistent perturbation growth.
