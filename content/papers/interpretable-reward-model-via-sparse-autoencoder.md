---
title: "Interpretable Reward Model via Sparse Autoencoder"
type: paper
authors:
  - Shuyi Zhang
  - Wei Shi
  - Sihang Li
  - Jiayi Liao
  - Hengxing Cai
  - Xiang Wang
year: null
source_job_id: "ca1b37a2-1558-4546-a3f6-f67de58bbf25"
tags:
  - reward-modeling
  - sparse-autoencoders
  - mechanistic-interpretability
  - preference-steering
  - reinforcement-learning-from-human-feedback
---

## TL;DR

Sparse Autoencoder-enhanced Reward Modeling (SARM) replaces the opaque final layers of a scalar reward model with a frozen, sequence-level [[concepts/sparse-autoencoders|Sparse Autoencoder]] encoder and a learned linear value head. Each reward becomes a weighted sum of sparse features, allowing feature-level attribution and post-training preference interventions without multidimensional labels. On RewardBench 2, the reported SARM-4B score is 73.6, compared with 72.5 for the strongest listed open-source baseline and 72.3 for the strongest listed closed-source baseline. The evidence is limited by added SAE training cost, uncertain feature semantics, and a steering case study centered on one selected safety feature.

## Research Question

Can a scalar reward model expose human-interpretable feature contributions and support targeted preference changes while retaining competitive reward-model accuracy, using only ordinary pairwise preference supervision?

## Motivation

Conventional reward models compress a prompt-response pair into one score whose internal basis is difficult to inspect or modify. Multidimensional reward models make named attributes visible, but they require explicit attribute ratings and do not necessarily explain each score at the feature level. SARM instead uses an unsupervised sparse feature basis and learns how those features contribute to pairwise preference judgments.

## Contributions

- Introduces a two-stage reward-model architecture that inserts a pretrained TopK SAE at an intermediate language-model layer and learns a scalar head over its sparse features.
- Trains the SAE on final-token activations so that its features represent sequence-level semantics rather than primarily token-local patterns.
- Attributes each reward directly to active feature-value products and interprets selected features from their activating contexts.
- Demonstrates a post-training intervention by changing one feature's value-head weight and measuring its selective effect on safety-related rewards.
- Compares several SARM sizes with open- and closed-source models on RewardBench 2 and ablates SAE pretraining and sequence-level activation selection.

## Method

SARM first collects final-token hidden states from the midpoint layer of a pretrained Llama-3 backbone. A TopK SAE maps each dense state to an overcomplete sparse vector and reconstructs the original state. The authors train this SAE on 50 million OpenWebText2 sequences, use a feature width 16 times the hidden size, and retain $3/64$ of the hidden-size count as active features.

For reward modeling, the architecture discards backbone layers after the SAE attachment point, freezes the SAE encoder, and adds a learned linear value head. For sparse code $\mathbf z$, the reward is $r(x,y)=\sum_i z_iw_i$. The backbone layers before the attachment and the value head are trained for three epochs on Skywork-Reward-Preference-80K-v0.2 with the standard Bradley-Terry pairwise loss. This makes each active term $z_iw_i$ an explicit contribution to the scalar reward.

To interpret features, the authors collect activating contexts on RM-Bench and ask GPT-4o to describe their shared semantics. Positive-weight examples include calculations, programming, and ethical considerations; negative-weight examples include offensive language and harmful advice. For steering, they identify the feature most correlated with chosen answers in RM-Bench's safety subset, multiply its value-head weight by a constant, and compare RewardBench 2 score distributions before and after the intervention.

## Experiments

The main benchmark is RewardBench 2, covering factuality, precise instruction following, mathematics, safety, focus, and ties. SARM-2B, SARM-3B, and SARM-4B achieve reported overall scores of 62.5, 64.2, and 73.6. SARM-4B exceeds every baseline listed in the paper: LDL-Reward-Gemma-2-27B-v0.1 scores 72.5, GPT-4.1 scores 72.3, and Skywork-Llama-8B-v0.2 scores 71.8. Category results are uneven rather than uniformly dominant; SARM-4B reports 68.5 on factuality, 42.5 on precise instruction following, 63.9 on mathematics, 91.3 on safety, 96.0 on focus, and 79.6 on ties.

The component ablation scores 68.4 when the pretrained SAE encoder is replaced by a parameter-matched random linear layer and 71.5 when the SAE is pretrained on token-level activations, versus 73.6 for sequence-level SARM-4B. These results support both learned sparse structure and final-token pretraining within the tested setup, although they do not isolate interpretability from all other architectural effects.

In the safety intervention, increasing the selected feature weight shifts the target distribution, consisting of chosen responses to safety queries, toward higher rewards while leaving the defined complement largely unchanged. The paper presents distribution plots but does not report a numerical effect size or uncertainty estimate. Hyperparameter studies on the 3B backbone show poor performance for shallow SAE attachment layers, relatively stable scores across feature widths of 8x to 32x and TopK settings of 48 to 240, and a default choice of layer 14, 16x width, and $k=144$. Reported compute is 40 RTX 3090 GPU-hours for SAE training and 40 A100 GPU-hours for reward-model training.

## Limitations

- SAE pretraining adds computational cost beyond ordinary scalar reward-model training; the reported resource table covers the two main training stages but not every experimental or interpretation cost.
- Sparse features are learned without semantic supervision, so they are not guaranteed to be monosemantic, human-readable, causally independent, or aligned with concepts users want to control.
- Feature descriptions are generated by GPT-4o from activating contexts. The paper gives examples but no systematic human validation, agreement analysis, or coverage rate for interpretable versus dead or ambiguous features.
- The preference-manipulation evidence focuses on one feature selected using safety data. The paper does not quantify the intervention multiplier, distributional effect size, statistical uncertainty, or robustness across features, preference domains, and backbones.
- The complement set mixes rejected safety responses with all non-safety responses. Its stability supports selectivity under this partition but does not establish that the intervention has no unrelated behavioral effects.
- Benchmark evidence uses Llama-3-derived models, one reward-training dataset, and one main benchmark. Comparisons with leaderboard models do not control training data, architecture, or parameterization.
- The supplied Markdown states neither a publication year nor a stable paper identifier, so neither is inferred here.

The supplied source links the authors' [SARM code repository](https://github.com/schrieffer-z/sarm); it was not used as evidence for this ingest.

## Related Concepts

- [[concepts/interpretable-reward-modeling|Interpretable Reward Modeling]]: exposes the factors behind scalar preference scores and supports inspectable interventions.
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]: provide SARM's sparse feature basis.
- [[concepts/bradley-terry-scaling|Bradley-Terry Scaling]]: supplies the pairwise preference objective used to train the reward model.
- [[concepts/model-steerability|Model Steerability]]: distinguishes readable features from interventions that measurably change model behavior.
- [[concepts/distributional-reward-modeling|Distributional Reward Modeling]]: preserves uncertainty or disagreement in rewards, whereas SARM retains a scalar output and decomposes its feature contributions.

## Related Papers

- Huben et al. (2024), "Sparse Autoencoders Find Highly Interpretable Features in Language Models": establishes SAEs as tools for extracting interpretable language-model features.
- Gao et al. (2025), "Scaling and evaluating sparse autoencoders": supplies the TopK SAE formulation and training practices used by SARM.
- Wang et al. (2024), "Interpretable Preferences via Multi-Objective Reward Modeling and Mixture-of-Experts": represents the multidimensional reward-modeling alternative discussed by the authors.
- Wang et al. (2024), "HelpSteer2: Open-source dataset for training top-performing reward models": provides another multidimensional reward-modeling comparison.
- Li et al. (2025), "SAFER: Probing Safety in Reward Models with Sparse Autoencoder": motivates the safety-feature scoring procedure used for intervention.
- [[papers/difusion-reward-models|Difusion Reward Models]]: replaces deterministic scalar rewards with flexible conditional reward distributions rather than decomposing a scalar reward into sparse features.

[[index|Library home]]
