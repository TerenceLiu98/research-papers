---
title: "Local Support Learning"
type: paper
authors:
  - Assaf Ben-Kish
  - Akarsh Kumar
  - James Glass
  - Raja Giryes
year: null
source_job_id: "2153265b-e055-4303-bd8a-996046136a25"
tags:
  - continual-learning
  - catastrophic-forgetting
  - parameter-efficient-finetuning
  - support-estimation
  - gaussian-mixture-models
---

## TL;DR

Local Support Learning (LSL) limits a finetuning adapter's effect to activations resembling those from its own training phase. Per-matrix Gaussian-mixture gates route each token between frozen pretrained weights and phase-specific adapters, allowing Qwen2.5 models up to 7B parameters to learn new domains while retaining substantially more pretrained and earlier finetuned capability than the evaluated baselines.

## Research Question

Can a pretrained model learn through multiple post-training phases without access to prior training data and without applying each new weight update globally across activation space?

## Motivation

Gradient updates to a weight matrix change its output for any input that is not orthogonal to the update. A new-task update can therefore alter behavior on unseen pretraining inputs even when the optimizer, adapter rank, or weight-space constraint reduces the magnitude or dimension of change. The paper reframes retention geometrically: an update should act only on the support of the activation distribution that produced it.

## Contributions

- Formulates forgetting at the level of a weight matrix's input space and argues for [[concepts/local-support-updates|Local-Support Updates]] as the retention objective.
- Introduces LSL, pairing a standard trainable adapter with a support gate at each adapted matrix while keeping the pretrained weights frozen.
- Connects gate quality to density and support estimation: false acceptance outside the current distribution is the excess region that exposes prior behavior to interference.
- Evaluates single- and multi-phase post-training, hyperparameter robustness, scaling from 1.5B to 7B parameters, routing ablations, and compute and memory overhead.

## Method

For every adapted weight matrix and learning phase, LSL trains an adapter normally with its gate held open, then fits a positive [[concepts/gaussian-mixture-models|Gaussian Mixture Model]] to that matrix's input activations. A shared negative GMM is fitted once from up to one million tokens of generic reference data. At inference, phase $i$'s adapter is enabled when its positive density exceeds the negative density for the current activation. The generic sample is used as an input-dependent likelihood threshold rather than as a replay approximation of the original pretraining corpus.

Each token receives a separate routing decision at every adapted matrix. An exponential moving average smooths these decisions over time. Across phases, the frozen base contribution and every accepted phase adapter are summed. GMM fitting proceeds module by module so only one module's activations must be retained at once; the approach stores fixed-size parametric gates rather than all training activations.

The theoretical analysis separates gate error into deficit, where current-distribution inputs are rejected, and excess, where inputs outside the current support are accepted. Training data directly constrains deficit but not excess. Under stated bounded-domain and density assumptions, an $L^1$-consistent density estimator controls disagreement volume; the paper also notes that a misspecified parametric density can retain excess even with unlimited data.

## Experiments

The main experiments finetune Qwen2.5-7B-Instruct separately on cybersecurity instruction data, English-to-Igbo translation, and chemistry instruction data. New-task evaluation uses SecEval, chrF, and Chem-Bench respectively. Retention is the average over GSM8K, HumanEval, and IFEval. Baselines are LoRA, orthogonal-projection LoRA, and Learning without Forgetting; hyperparameters are selected using new-task validation rather than retention benchmarks.

LSL combines strong new-task performance with near-base retention across all three settings, while the reported baselines forget more. In the sequential Igbo, chemistry, and cybersecurity experiment, LSL preserves pretrained and learned-task scores; the LoRA baseline loses 44% of pretrained performance after the first phase, then loses 8% on translation after two later phases and 5% on chemistry after one later phase. LSL's retention remains stable across sweeps of learning rate, adapter rank, and batch size, and improves with tested model scale from 1.5B to 7B.

Ablations support locality rather than the GMM architecture alone. A local union-of-spheres gate reaches similar retention but requires about 5.67 GB, versus 13.8 MB total for the GMMs. A discriminative MLP gate performs worse on out-of-distribution inputs. A single embedding-level router recovers only 50-77% of LSL's new-task improvement and can reduce retention. The GMM raises reported retention from 55.3 to 69.8, or 76.6% to 96.6% of base performance; temporal smoothing raises it further to 71.1, or 98.8%.

On Qwen2.5-7B-Instruct with an Nvidia B200, the GMMs add 13.8 MB, corresponding to 6.9 MB per phase because the negative model is shared. The reported adapter adds 86 ms per forward pass. Adapter training on one million tokens is comparable to LoRA, while GMM fitting makes total training time 1.64 times the LoRA baseline; the one-time negative-GMM fit is excluded.

## Limitations

- Adapters cannot be merged into the base weights. Compute grows linearly with the number of learning phases, although phase computations can be parallelized and a phase may contain multiple tasks.
- The formal motivation analyzes one weight matrix. Its extension to a multilayer network is empirical rather than proved.
- Routing assumes the base model's representations make each phase's activations amenable to GMM density estimation. The better results at larger model scales are consistent with, but do not establish, this dependence.
- Parametric density misspecification can leave accepted regions outside the true support. The gate still opens on some out-of-distribution tokens, and temporal smoothing relies on task boundaries changing more slowly than individual tokens.
- Evaluation covers models only through 7B parameters, three finetuning domains, and a small number of sequential phases; larger models, other modalities, reinforcement-learning objectives, and hundreds of phases remain future work.
- The supplied Markdown gives no publication year, venue, DOI, or stable paper identifier, so no such metadata is inferred.

## Related Concepts

- [[concepts/local-support-updates|Local-Support Updates]]: restricting an adapter's functional effect to the activation region associated with its training phase.
- [[concepts/continual-learning|Continual Learning]]: the broader setting of learning sequentially while retaining prior capabilities.
- [[concepts/gaussian-mixture-models|Gaussian Mixture Models]]: LSL's fixed-size density estimators for per-matrix routing.

## Related Papers

Works cited in the source, without matching Paper pages found in this library:

- Hu et al. (2021), "LoRA: Low-Rank Adaptation of Large Language Models": the adapter baseline and the weight-update component used by LSL.
- Li and Hoiem (2017), "Learning without Forgetting": a function-regularization baseline that penalizes changes to base-model outputs.
- Xiong and Xie (2025), "Orthogonal Subspace Learning for Language Model Continual Learning": the orthogonal-projection LoRA baseline.
- Saha et al. (2021), "Gradient Projection Memory for Continual Learning": prior-data subspace projection that motivates the paper's per-matrix interference analysis.

[[index|Library home]]
