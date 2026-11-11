---
title: Energy-Based Transformers are Scalable Learners and Thinkers
type: paper
authors:
  - Alexi Gladstone
  - Ganesh Nanduru
  - Md Mofijul Islam
  - Peixuan Han
  - Hyeonjeong Ha
  - Aman Chadha
  - Yilun Du
  - Heng Ji
  - Jundong Li
  - Tariq Iqbal
year: null
source_job_id: "0e029f0b-2ff7-4bba-8b27-46e4c5258ffc"
tags:
  - energy-based-models
  - transformers
  - test-time-compute
  - scaling-laws
  - multimodal-learning
---

## TL;DR

Energy-Based Transformers (EBTs) score the compatibility of a context and candidate prediction, then refine the prediction by descending the learned energy landscape. In the paper's small-scale language and vision experiments, EBTs have steeper fitted learning curves than Transformer++ baselines, gain up to 29% from additional language-model inference computation, and outperform a Diffusion Transformer on image denoising with far fewer forward passes. These results support energy-guided iterative prediction under the tested settings, but foundation-model performance is extrapolated rather than demonstrated.

## Research Question

Can a Transformer learn an explicit verifier through unsupervised pretraining and use [[concepts/inference-time-energy-minimization|Inference-Time Energy Minimization]] to allocate additional computation, estimate relative compatibility, and improve predictions across discrete and continuous modalities?

## Motivation

Many inference-time reasoning methods depend on text, externally supervised reward models, or domains with easily checked answers. Standard feed-forward Transformers also spend a fixed amount of computation per prediction. Energy-based models offer a different interface: one model assigns an unnormalized compatibility score to a context-candidate pair, while the gradient of that score supplies an update direction for the candidate. The paper asks whether a Transformer implementation can make this interface stable and scalable enough to learn both prediction and verification during pretraining.

## Contributions

- Introduces decoder-only autoregressive and bidirectional EBT architectures that output scalar energies for candidate predictions.
- Trains prediction by backpropagating through gradient-based energy minimization, using Hessian-vector products rather than a full Hessian.
- Uses replay-buffer initialization, Langevin noise, randomized step sizes, and randomized optimization lengths to regularize the energy landscape for longer inference and minimum-energy candidate selection.
- Compares learning curves with Transformer++ across data, batch size, depth, parameters, FLOPs, and width, and compares bidirectional EBTs with Diffusion Transformers.
- Evaluates whether additional optimization steps and self-verification improve language and image predictions, including under distribution shift.

## Method

Given context $x$ and candidate $\hat y_i$, the model returns $E_\theta(x,\hat y_i)$. Prediction begins from Gaussian noise and iterates

$$
\hat y_{i+1}=\hat y_i-\alpha\nabla_{\hat y_i}E_\theta(x,\hat y_i).
$$

Training compares the final candidate with the target using cross-entropy for language and a reconstruction loss for vision, then differentiates through the optimization process. The autoregressive architecture represents observed and predicted tokens separately and uses a custom causal-attention computation so all next-token candidates can be refined in parallel without leaking future observations. The bidirectional variant follows the more direct sequence-wide formulation.

The paper distinguishes stability-oriented S1 models from S2 models intended for additional inference computation. S2 training retains gradients across prediction updates, applies the loss only at the final step, and regularizes trajectories with replay-buffer samples, Langevin noise, and randomized step sizes and lengths. At inference, the model can take more descent steps or optimize several candidates and choose the one with minimum energy.

## Experiments

Autoregressive language models are pretrained from scratch on a 100B-sample RedPajamaV2 source using a 66-million-sample training split and small models under a restricted compute budget. Across six fitted scaling axes, the reported EBT slopes exceed those of the Transformer++ recipe; the largest reported gap is about 35% for data scaling. On four downstream language datasets, extra optimization and minimum-energy selection improve EBT perplexity by as much as 29%, while the fixed-depth baseline cannot refine an individual token with extra passes. Improvements grow with the paper's measure of distribution shift. With slightly worse pretraining perplexity, EBT is better on GSM8K, BigBench Math QA, and Dyck Languages, but slightly worse on SQuAD.

For autoregressive video prediction on Something-Something V2 latent frames, EBT width and parameter scaling rates are reported as more than 33% steeper than Transformer++. For bidirectional COCO image denoising, EBT reaches PSNR 27.25 versus 26.58 in distribution and 23.29 versus 19.56 at the tested out-of-distribution noise level. The comparison reports comparable or better denoising with three EBT forward passes versus 300 DiT passes. Linear probing on ImageNet-1k gives EBT 5.32% top-1 accuracy versus 0.31% for DiT, although both absolute results are low.

## Limitations

- The largest run is approximately $10^{21}$ FLOPs (about 1,300 A100 GPU-hours); claims about modern foundation-model scale are extrapolations from fitted curves.
- Scaling-law conclusions are sensitive to hyperparameters and finite ranges. The models are trained from scratch at small scale, and EBT-specific tuning differs by modality.
- EBT training is substantially more expensive per token. The paper estimates two-step S1 training at about 6.66 times the FLOPs of a comparable feed-forward Transformer, with S2 cost depending on truncation, replay, and step count.
- Training with more than two or three optimization steps was unstable because of longer higher-order gradient chains.
- Small text-to-image experiments failed to generate sharp novel samples for highly multimodal conditions, instead producing blurred averages; the proposed explanation is not experimentally resolved.
- The denoising comparison uses the best tested recursive DDIM baseline and different update mechanisms, so the forward-pass ratio is not a complete latency or hardware-efficiency comparison.
- Energy is an unnormalized compatibility score. Its usefulness for uncertainty and verification is empirical and does not establish calibrated probability estimates.
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier, so those metadata are left unset.

## Related Concepts

- [[concepts/inference-time-energy-minimization|Inference-Time Energy Minimization]]: refines predictions using gradients of an explicit compatibility function.
- [[concepts/adaptive-computation|Adaptive Computation]]: additional optimization steps allocate more computation to a prediction.
- [[concepts/latent-reasoning|Latent Reasoning]]: refinement occurs in continuous prediction space rather than a visible chain of thought.
- [[concepts/joint-energy-based-models|Joint Energy-Based Models]]: another explicit energy formulation, focused on shared input-label density rather than iterative prediction.
- [[concepts/diffusion-models|Diffusion Models]]: the principal iterative generative comparison; diffusion predicts a score or noise update rather than directly returning a scalar energy.

## Related Papers

- Du et al. (2022), "Learning Iterative Reasoning through Energy Minimization," supplies the optimization-trained EBM foundation.
- Wang et al. (2023), "Energy-Inspired Self-Supervised Pretraining for Vision Models," motivates regularized optimization-based EBM training.
- Geiping et al. (2025), "Scaling Up Test-Time Compute with Latent Reasoning," provides the recurrent-depth comparison discussed by the paper.
- Peebles and Xie (2023), "Scalable Diffusion Models with Transformers," supplies the Diffusion Transformer baseline.
- [[papers/thinking-with-looped-flows|Thinking with Looped Flows]] is related library reading on iterative latent computation and inference-depth scaling, but is not cited by the supplied manuscript.

[[index|Library home]]
