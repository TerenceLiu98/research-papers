---
title: "Difusion Reward Models"
type: paper
authors:
  - Xiangyang Wang
  - Bingxiang He
  - Zeyuan Liu
  - Jiaze Wang
  - Ziqing Qiao
  - Yuxin Zuo
  - Tianyu Yu
  - Qianyu Chen
  - Huan-ang Gao
  - Cheng Qian
  - Wenbin Zhang
  - Ran Li
  - Youbang Sun
  - Ning Ding
  - Yuanchun Shi
  - Zhiyuan Liu
  - Chaojun Xiao
  - Chun Yu
year: null
tags:
  - diffusion-reward-models
  - reward-modeling
  - reinforcement-learning-from-human-feedback
  - large-language-models
  - uncertainty
---

## TL;DR

DRM replaces a reward model's deterministic value head with a conditional diffusion head that samples a reward distribution for each prompt-response pair. A frozen LLM encoder supplies the representation, while a lightweight Diffusion Transformer models either multi-attribute rewards or scalar pairwise preferences. Across five reward-model benchmarks, the matched DRM-Multi-8B variant averages 66.2, above the matched ArmoRM scalar head at 62.3 and QRM at 64.1; DRM-Pref-8B averages 65.8. The learned samples also support uncertainty-aware rejection, risk-sensitive aggregation, and an additional reward-axis test-time scaling knob. The evidence is promising but comes from one 8B encoder, modest training data, and an initial study rather than a broad scaling evaluation.

## Research Question

Can a reward model represent the conditional, potentially multimodal distribution of human judgments instead of collapsing every prompt-response pair to a scalar or a fixed parametric distribution family?

## Motivation

Human preference can vary across annotators, rubrics, and trade-offs such as helpfulness versus harmlessness. A scalar reward hides that variation, while Gaussian, categorical, or fixed-quantile heads restrict the possible output shapes. DRM treats reward modeling as conditional density estimation, retaining samples that can be summarized according to the downstream decision rather than choosing one output family in advance.

## Contributions

- Introduces a diffusion reward head conditioned on a frozen LLM representation and designed to model $p(\mathbf{r}\mid x,y)$ without an imposed parametric output family.
- Uses one reward space for masked multi-attribute denoising and pairwise preference learning with a Bradley-Terry auxiliary loss.
- Shows that reward samples can provide more than a mean score: uncertainty for selective prediction, lower-confidence-bound aggregation, quantiles, and a reward-axis test-time compute control.
- Evaluates DRM-Multi-8B and DRM-Pref-8B against discriminative, generative, and parametric distributional reward models, then tests distributional fidelity and downstream RLHF.

## Method

For a prompt-response pair $(x,y)$, a frozen LLM encoder produces a last-token representation $\mathbf{h}=\operatorname{Enc}(x,y)$. The trainable Diffusion Reward Head receives a noisy reward vector $\mathbf{r}_t$, diffusion timestep $t$, and $\mathbf{h}$, and predicts the injected Gaussian noise. Conditioning and timestep information enter the DiT blocks through adaptive layer normalization. The encoder representations are precomputed, so only the approximately 12M-parameter reward head is trained.

For multi-attribute data, a mask excludes unannotated reward dimensions from the denoising mean-squared-error objective. For pairwise data, the authors construct symmetric pseudo-rewards with a fixed margin and add a Bradley-Terry loss on reconstructed rewards:

$$
\mathcal{L}_{\mathrm{pair}}=\mathcal{L}_{\mathrm{denoise}}+\lambda_{\mathrm{BT}}[-\log\sigma(\hat r_0^{(w)}-\hat r_0^{(l)})].
$$

At inference, DDIM sampling with classifier-free guidance produces $N$ independent reward samples. Their empirical distribution can be summarized by a mean for ordinary RLHF or Best-of-$N$ scoring, by variance or quantiles for uncertainty and risk, or by a lower-confidence bound $\mu-\lambda\sigma$. Increasing $N$ for a fixed response improves the estimate of its reward distribution, giving DRM a reward-axis scaling dimension in addition to the usual response-axis candidate scaling.

## Experiments

### Setup

DRM-Multi-8B uses the frozen FsfairX-LLaMA3-RM-v0.1 encoder and 569K aggregated multi-attribute examples over 19 attributes. DRM-Pref-8B uses the same encoder and 273K Tulu3 preference pairs with a scalar reward dimension. The default configuration uses 10 DDIM steps, guidance scale 7, and 32 reward samples. Evaluation covers RewardBench v2, PPE, RMB, RM-Bench, and JudgeBench.

### Benchmark results

| Model | Supervision | Average across six reported benchmark scores |
| --- | --- | ---: |
| ArmoRM-Llama3-8B-v0.1 | Scalar multi-attribute | 62.3 |
| QRM-Llama3.1-8B-v2 | Parametric quantile | 64.1 |
| URM-LLaMA-3.1-8B | Parametric Gaussian | 66.1 |
| DRM-Multi-8B | Multi-attribute diffusion | 66.2 |
| DRM-Pref-8B | Pairwise preference diffusion | 65.8 |

Under the matched ArmoRM corpus and backbone, DRM-Multi-8B reaches 66.2 versus 62.3 for ArmoRM and 64.1 for QRM; its largest reported advantage in that comparison is on RMB, where it scores 78.0. DRM-Pref-8B is slightly stronger on RewardBench v2, PPE Preference, and RMB Pairwise, while DRM-Multi-8B is stronger on PPE Correctness and JudgeBench. These comparisons are not all matched in model size or training data, so the controlled head comparison is the strongest evidence.

### Distributional validation and decisions

On HelpSteer2-Disagreements, DRM's Wasserstein distance to repeated human ratings is 0.804 for helpfulness and 0.846 for correctness, the best Wasserstein result among the compared baselines in both dimensions. For helpfulness, it also has the lowest reported Jensen-Shannon divergence and $L_1$ distance. DRM's multimodal ratio rises with human rating disagreement: from 37.6% for low-range helpfulness examples to 55.5% for range-at-least-two examples and 63.2% for polarized examples; correctness follows a similar 37.6%, 54.7%, and 62.0% pattern.

Distributional uncertainty improves selective prediction. At 70% coverage, PPE Correctness gains 2.81 points on average across five subtasks, while RMB gains 4.56 to 7.31 points across its reported helpfulness and harmlessness settings. When all candidates must be ranked, the reported lower-confidence-bound aggregation consistently improves on the mean, including a +0.380 gain for RMB Helpfulness Best-of-3.

### Downstream use and efficiency

In a common-setup RLHF experiment, the DRM-Multi reward produces an Arena-Hard v2 score of 2.0 and an MT-Bench score of 74.8, compared with 1.3 and 73.6 for the FsfairX reward baseline. Under the default 32-sample, 10-step configuration, DRM costs 1.63 times the FsfairX end-to-end latency; five DDIM steps reduce this to 1.38 times while DRM-Multi's average benchmark score falls from 66.2 to 65.9. Precomputing the frozen encoder representation can further reduce repeated-scoring cost.

## Limitations

The study uses one frozen 8B encoder and a few hundred thousand open-source examples, so behavior across backbone families, model sizes, and much larger training regimes is not established. DRM does not match the strongest open-source scalar reward models in absolute benchmark performance. The difference between the full multi-attribute and preference variants is confounded by training scale, although a half-sized multi-attribute ablation narrows that comparison and favors the pairwise variant at similar scale.

The distributional validation is based on selected repeated-annotation datasets and shows association with human disagreement, not that every sampled mode corresponds to a distinct human rationale. The qualitative multimodality comparison is a single-example illustration. Stochastic sampling adds inference cost, and downstream RLHF can still amplify biases or reward hacking because DRM remains a learned reward. The supplied Markdown does not state a publication year or stable paper identifier.

## Related Concepts

- [[concepts/distributional-reward-modeling|Distributional Reward Modeling]]
- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/bradley-terry-scaling|Bradley-Terry Scaling]]
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]
- [[concepts/confidence-based-judge-cascades|Confidence-Based Judge Cascades]]

## Related Papers

The following cited works have no matching Paper pages in the library:

- Bradley and Terry (1952), “Rank analysis of incomplete block designs: I. the method of paired comparisons.”
- Ho, Jain, and Abbeel (2020), “Denoising diffusion probabilistic models.”
- Ho and Salimans (2022), “Classifier-free diffusion guidance.”
- Dhariwal and Nichol (2021), “Diffusion models beat GANs on image synthesis.”
- Christiano et al. (2017), “Deep reinforcement learning from human preferences.”
- Ouyang et al. (2022), “Training language models to follow instructions with human feedback.”
- Dorka (2024), “Quantile regression for distributional reward models in RLHF.”

The authors provide implementation links to the [Hugging Face checkpoint](https://huggingface.co/Teburile/DRM) and [GitHub repository](https://github.com/thunlp/DRM).

[[index|Library home]]
