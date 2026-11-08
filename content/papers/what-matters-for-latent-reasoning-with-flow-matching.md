---
title: What Matters for Latent Reasoning with Flow Matching
type: paper
authors:
  - Yassine Ouali
  - Adrian Bulat
  - Georgios Tzimiropoulos
year: 2026
source_job_id: "9c57b4a5-8574-4607-b83b-bd159bbb5ba0"
tags:
  - latent-reasoning
  - flow-matching
  - chain-of-thought
  - test-time-compute
  - self-training
---

## TL;DR

Flow-based Latent Reasoning (FLaRe) compresses symbolic chains of thought into a smooth VAE latent space, learns a question-conditioned flow from Gaussian noise to those codes, and trains the answer reader on imperfect generated thoughts. A second stage self-trains through verified, full denoising rollouts. On arithmetic reasoning, the resulting thoughts are more useful, diverse, decodable, refinable, and efficient than the evaluated latent-reasoning baselines; at two Euler steps, the direct reader reaches 97% of explicit-CoT accuracy at about one quarter of its latency.

## Research Question

Which representation, training, readout, and self-training choices make [[concepts/flow-matching|Flow Matching]] produce effective [[concepts/latent-reasoning|Latent Reasoning]] rather than merely reconstructible latent codes?

## Motivation

Explicit chain-of-thought generation spends sequential inference time verbalizing intermediate computation. Existing latent methods can be faster, but an answer may bypass the latent thought, repeated samples may collapse to one trajectory, the thought may resist interpretation, and added inference computation may not improve it. The paper therefore treats accuracy as insufficient and evaluates whether a latent thought is useful, diverse, explainable, refinable, and efficient.

## Contributions

- Defines five requirements for latent thoughts and targeted probes for causal use, sampling diversity, decodability and faithfulness, inference-time refinement, and latency-accuracy trade-offs.
- Shows through controlled ablations that downstream generation quality does not track VAE reconstruction quality: across 66 VAEs, reconstruction and decoded accuracy have a correlation of -0.12.
- Introduces FLaRe, combining information-dense symbolic targets, dual reconstruction routes, latent-space corruption, noise-focused flow training, generated-thought readout training, multiple solutions per question, and verified rollout self-training.
- Reports stronger arithmetic reasoning and latency-accuracy trade-offs than the evaluated latent baselines, while distinguishing the direct answer reader used at inference from the slower decoded-CoT probe.

## Method

FLaRe first trains a VAE whose 1B encoder compresses a symbolic CoT into eight 512-dimensional slots. A fine-tuned 3B decoder reconstructs either the symbolic trace from the code alone or a natural-language trace when also given the question. Token substitution, variance-preserving latent noise, and latent dropout make neighborhoods decode consistently; increasing code capacity for near-perfect reconstruction instead makes the flow target harder to generate.

The shared flow-and-answer model is a Llama-3.2-1B-Instruct model. It learns a rectified flow from Gaussian noise to standardized VAE codes, conditioned on the question. Training times follow a logit-normal distribution shifted toward the high-noise region where inference begins. Four independent noise-time draws reduce gradient variance, classifier-free guidance conditions sampling, and several valid CoTs per question teach noise samples to cover multiple solution modes.

Stage 1 trains the answer pass on a 50/50 mixture of lightly noised VAE codes and detached one-step endpoints predicted by the model. Stage 2 samples eight full 20-step thoughts for each new question, decodes and verifies their final answers, re-encodes distinct accepted CoTs as flow targets, and combines those targets with stage-1 replay. An answer loss is backpropagated through a fresh ten-step guided rollout; the ablations attribute most of stage 2's gain to this full-rollout gradient.

## Experiments

The main model is trained on GSM8K-Aug plus 216K diverse CoTs and evaluated on GSM8K, GSM8K-Hard, SVAMP, and MultiArith. Stage 2 uses 100K OpenMathInstruct-2 questions with reference answers but no added CoT annotations.

- On GSM8K with the 1B backbone, stage 2 reaches 59.1% direct accuracy, versus 55.6% for CODI, 53.4% for PCCoT, and 62.5% for explicit CoT. Its decoded reading is 62.6%.
- Under 16 samples, the stage-2 decoded reading rises from 62.6% greedy accuracy to 77.3% pass@16; majority voting reaches 64.4%. The tested baselines gain at most five points of coverage and do not improve through voting.
- The twin intervention test finds that stage-2 answers follow an injected twin thought on 37.3% of all pairs and 76.1% of pairs both questions are answered correctly, compared with 31.8% and 68.4% for CODI. This supports causal use but not complete control by the latent thought.
- Decoded thoughts contain all reference intermediate values in order on 48.6% of GSM8K questions, compared with 38.5% for CODI, 19.1% for Coconut, and 7.8% for PCCoT.
- Increasing Euler steps from one to twenty raises stage-2 decoded accuracy from 36.6% to 62.6%, but direct accuracy only from 56.7% to 59.1%.
- On an RTX 3090, the direct reader at two Euler steps reports 57.4% accuracy in 68 ms, versus 59.3% in 267 ms for explicit CoT. The decoded probe at twenty steps takes 959 ms and is not used for inference.

## Limitations

- The empirical study is confined to arithmetic word problems and mostly GSM8K-derived training data. Transfer is uneven: FLaRe does not lead on SVAMP, where distractor numbers are common.
- Explanation remains partial. A decoded trace contains all reference intermediate values for about half the questions, and on roughly 40% of twin interventions the thought shows the changed value without the answer following the twin.
- Verification in stage 2 checks only the decoded final answer, not the validity of intermediate reasoning.
- Most direct-readout accuracy is available after one or two steps; the strong refinement curve belongs mainly to the decoded thought. Full decoding also costs more than explicit CoT and serves only as an analysis probe.
- The fixed eight-slot code is sufficient for the short symbolic traces studied here. The paper's variable-width extension does not improve GSM8K, so its value for longer reasoning remains untested.
- FLaRe requires a separate VAE, symbolic-CoT conversion for natural-language datasets, and substantial multi-stage training. The symbolic conversion pipeline itself relies on an LLM and filtering.

## Related Concepts

- [[concepts/latent-reasoning|Latent Reasoning]]
- [[concepts/flow-matching|Flow Matching]]
- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/amortized-variational-inference|Amortized Variational Inference]]
- [[index|Library home]]

## Related Papers

- [[papers/thinking-with-looped-flows|Thinking with Looped Flows]]: also uses flow integration for adjustable latent computation, but carries reasoning in a recurrent hidden state rather than a VAE code decoded into a CoT.
- Hao et al. (2025), "Training Large Language Models to Reason in a Continuous Latent Space": introduces Coconut, a horizontal continuous-feedback baseline evaluated by the paper.
- Shen et al. (2025), "CODI: Compressing Chain-of-Thought into Continuous Space via Self-Distillation": distills explicit CoTs into continuous feedback states.
- Kang et al. (2026), "LaDiR: Latent Diffusion Enhances LLMs for Text Reasoning": the closest denoising-based baseline, generating reasoning blocks sequentially in a learned latent space.
