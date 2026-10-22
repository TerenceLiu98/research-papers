---
title: "ELF: Embedded Language Flows"
type: paper
authors:
  - Keya Hu
  - Linlu Qiu
  - Yiyang Lu
  - Hanhong Zhao
  - Tianhong Li
  - Yoon Kim
  - Jacob Andreas
  - Kaiming He
year: null
source_job_id: 4bec2c89-a0ce-42bb-a081-38da5651e513
code: https://github.com/lillian039/ELF
tags:
  - diffusion-language-models
  - flow-matching
  - continuous-generative-models
  - language-modeling
---

## TL;DR

ELF is a continuous diffusion language model that performs continuous-time [[concepts/flow-matching|Flow Matching]] in token-embedding space and converts embeddings to discrete tokens only at the final step. A shared network alternates between denoising and decoding modes, avoiding a separate inference-time decoder. On OpenWebText, the 105M-parameter ELF-B reaches generative perplexity 24.08 at 32 sampling steps while using an estimated 45.2B training tokens; the paper also reports leading results among its compared similarly scaled systems on WMT14 German-to-English translation and XSum summarization.

## Research Question

Can a language model retain a continuous state and objective throughout almost the entire generative trajectory, discretizing only once at the end, while matching or exceeding discrete diffusion language models in quality and sampling efficiency?

## Motivation

Leading diffusion language models commonly operate over discrete tokens, while earlier continuous approaches often apply token-level supervision throughout denoising or require a separately trained decoder. ELF tests whether the performance gap reflects an inherent disadvantage of continuous representations or underexplored design choices at the continuous-to-discrete interface. Its formulation also aims to transfer techniques developed for continuous image diffusion, especially classifier-free guidance, directly to language generation.

## Contributions

- A continuous-time language model that follows a rectified-flow path in contextual embedding space and delays token discretization until the final step.
- A shared-weight transformer with denoising and decoding modes, trained with an embedding-space velocity loss and a final-step token cross-entropy loss.
- An $x$-prediction parameterization that remains stable as embedding dimensionality grows and aligns the denoising target with final token decoding.
- Training-time classifier-free guidance built from self-conditioning, plus deterministic ODE and noise-reinjecting SDE-inspired samplers.
- Evaluations on unconditional generation, translation, and summarization, together with ablations of embeddings, prediction targets, bottlenecks, samplers, guidance, conditioning, and optimization.

## Method

Given tokens $s$, a frozen T5-small encoder produces contextual embeddings $x$. For Gaussian noise $\epsilon$ and time $t\in[0,1]$, ELF uses the linear interpolant

$$
z_t=tx+(1-t)\epsilon,
$$

whose target velocity is $v=x-\epsilon$. Rather than predicting velocity directly, the transformer predicts clean embeddings $x_\theta(z_t,t)$ and converts them to

$$
v_\theta(z_t,t)=\frac{x_\theta(z_t,t)-z_t}{1-t}.
$$

The denoising branch minimizes velocity mean-squared error. In the decoding branch, token-wise logit-normal corruption makes the final-step input nontrivial; the same transformer runs in a distinct decode mode, and a learned unembedding matrix is optimized with cross-entropy against the clean tokens. Training assigns 80% of examples to denoising and 20% to decoding. The default model projects 512-dimensional T5 embeddings through a 128-dimensional bottleneck before a 105M-parameter Diffusion Transformer.

Self-conditioning concatenates the previous clean-embedding prediction with the noisy state. ELF treats that prediction as a condition for training-time classifier-free guidance, with time, guidance scale, and denoise/decode mode represented by prepended control tokens. Conditional generation additionally prepends uncorrupted source embeddings. At inference, the model integrates the learned field using either an ODE solver or an SDE-inspired update that reinjects Gaussian noise and shifts evaluation toward the noisier part of the trajectory; only the final network call and unembedding operation produce tokens.

## Experiments

**Unconditional generation.** Models are trained on roughly 9B OpenWebText tokens and evaluated on 1,000 samples using GPT-2 Large generative perplexity and unigram entropy. ELF-B (105M parameters plus the 35M frozen training-time encoder) obtains generative perplexity $24.08\pm0.16$ and entropy $5.15\pm0.002$ at 32 SDE-inspired steps across six evaluation seeds. The compared MDLM, Duo, FLM, and LangFlow systems use about 170M parameters and are reported as requiring more than 500B effective training tokens, versus 45.2B for ELF. Progressive distillation further improves few-step results, reaching generative perplexity 21.32 at 32 steps and 136.10 at one step, but adds five rounds of training.

**Conditional generation.** On WMT14 German-to-English, ELF-B reports 26.4 BLEU, compared with 25.2 for the autoregressive baseline and 24.9 for CDCD. On XSum it reports ROUGE-1/2/L of 36.0/12.2/27.8, compared with 33.4/11.6/25.8 for the strongest listed MDLM baseline. These experiments use 64-step ODE sampling, self-conditioning guidance scale 1, and input-condition guidance scale 2.

**Ablations.** Pretrained contextual embeddings provide the strongest quality-diversity trade-off among the tested embedding choices. A shared denoiser-decoder performs similarly to a separately trained decoder while reaching lower-perplexity regimes and removing an extra training stage. Clean-embedding prediction is stable at embedding dimensions 512, 768, and 1024, whereas velocity prediction degrades at larger dimensions and noise prediction collapses in the reported tests. A 128-dimensional bottleneck balances perplexity and entropy better than 32 or 512 dimensions. SDE-inspired sampling improves few-step perplexity over ODE sampling, and logit-normal inference schedules outperform uniform schedules. Increasing guidance generally lowers perplexity but also lowers entropy; excessive guidance reverses the improvement.

## Limitations

- Unconditional quality is summarized mainly by GPT-2 Large generative perplexity and unigram entropy on 1,000 OpenWebText samples; these metrics do not establish factuality, usefulness, safety, or broad-domain language quality.
- The qualitative samples remain error-prone despite favorable aggregate metrics, including fabricated entities and facts, repetition, malformed words, and a summary that reverses the source meaning.
- The principal system comparison uses different model sizes and estimated training-token budgets, and some conditional baselines are reproduced with adapted architectures or decoding settings rather than evaluated from identical implementations.
- The frozen T5 encoder is needed during training even though it is absent at inference, so the method does not eliminate pretrained representation dependence in its strongest configuration.
- Guidance and stochastic noise reinjection introduce tuned quality-diversity trade-offs. Very strong guidance can worsen results, and the SDE variant is described as an approximation inspired by the associated SDE rather than an exact numerical SDE solver.
- The reported evidence covers a 9B-token corpus and models up to 652M parameters; it does not establish behavior at contemporary large-language-model scale.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: the continuous-time transport objective underlying ELF's embedding-space denoising process.
- [[concepts/diffusion-models|Diffusion Models]]: the broader family supplying guidance, self-conditioning, and iterative sampling techniques.
- [[concepts/discrete-diffusion-models|Discrete Diffusion Models]]: the token-space alternative used by several comparison systems.
- [[concepts/absorbing-state-diffusion|Absorbing-State Diffusion]]: the masked-token diffusion formulation used by models such as MDLM.

## Related Papers

- [[papers/mean-flows-for-one-step-generative-modeling|Mean Flows for One-step Generative Modeling]]: learns finite-interval velocity fields to reduce flow-model sampling to one or a few evaluations.
- [[papers/generative-modeling-via-drifting|Generative Modeling via Drifting]]: another flow-based generative formulation that studies transport dynamics beyond standard diffusion parameterizations.

[[index|Library home]]
