---
title: "Beyond Logits: Aligning Feature Dynamics for Effective Knowledge Distillation"
type: paper
authors:
  - Guoqiang Gong
  - Jiaxing Wang
  - Jin Xu
  - Deping Xiang
  - Zicheng Zhang
  - Leqi Shen
  - Yifeng Zhang
  - Junhua Shu
  - Zhaolong Xing
  - Zhen Chen
  - Pengzhang Liu
  - Ke Zhang
year: null
tags:
  - knowledge-distillation
  - large-language-models
  - representation-learning
  - neural-odes
---

## TL;DR

[[concepts/feature-dynamics-distillation|Feature Dynamics Distillation (FDD)]] supplements output-distribution [[concepts/knowledge-distillation|knowledge distillation]] with losses matching intermediate predictions and their changes across selected layers. Each model's language-model head maps hidden states into a shared vocabulary space. FDD achieves the highest mean ROUGE-L among the compared methods in four teacher/student settings, although it does not win every individual benchmark. Its applicability requires access to teacher internals and compatible vocabulary predictions.

## Research Question

Can matching the trajectory and cross-layer changes of intermediate predictions transfer more useful teacher knowledge than matching only final output distributions?

## Motivation

Residual transformer layers can be interpreted as discrete steps in an ordinary differential equation (ODE), with hidden states evolving along model depth. From this perspective, final-output matching constrains only the endpoint. Intermediate-layer supervision can supply additional information, but different hidden dimensions complicate direct feature alignment. The authors use pretrained LM heads to compare models in a task-relevant prediction space.

## Contributions

- Frames teacher/student alignment as matching a discretized trajectory and its first-order changes along depth.
- Combines intermediate prediction KL divergence and cosine distance between prediction deltas with conventional output KL divergence.
- Uses each model's existing LM head to accommodate different hidden dimensions, with optional Tuned Lens-style adapters.
- Reports instruction-following results across four size pairings and ablations of loss terms, sampled-layer count, and alignment strategies.

## Method

Let $h_i^M(l)$ be the hidden representation at token position $i$ and layer $l$ of model $M$, where $M$ is teacher $T$ or student $S$. The paper defines

$$
y_i^M(l)=\log f_{\mathrm{head}}^M(h_i^M(l)).
$$

Thus, the operational trajectory consists of **log vocabulary probabilities**, rather than raw hidden states or unnormalized logits. Selected teacher and student layers are paired in depth order; experiments sample layers uniformly. For paired indices $t_j,s_j$, the trajectory loss compares $\exp y_i^T(t_j)$ and $\exp y_i^S(s_j)$ using teacher-to-student KL divergence (Section 3.2).

The derivative loss uses finite differences between consecutive **selected** layers:

$$
\Delta_i^T(j)=y_i^T(t_j)-y_i^T(t_{j-1}),\qquad
\Delta_i^S(j)=y_i^S(s_j)-y_i^S(s_{j-1}).
$$

It averages cosine distance $1-a^\top b/(\|a\|\|b\|)$ between teacher and student deltas. This aligns change directions; cosine distance does not require their magnitudes to match. The ODE interpretation motivates the objective, but training does not run a continuous ODE solver.

The combined objective is

$$
\mathcal L=\mathcal L_{\mathrm{KD}}
+\alpha\mathcal L_{\mathrm{KD}}^{\mathrm{Traj}}
+\beta\mathcal L_{\mathrm{KD}}^{\mathrm{Der}}.
$$

Experiments set $\alpha=\beta=1$. Because a final-layer LM head may decode intermediate states poorly, Section 4.1 optionally introduces lightweight adapters trained before distillation, following Tuned Lens. The source does not clearly identify which reported configurations use these adapters. Compatibility with reverse KL, Jensen-Shannon, and skew KL objectives is proposed, rather than established by a separate comparison of all combinations.

## Experiments

Training uses 14,000 Dolly examples, with 500 each for validation and testing. Students first receive three epochs of supervised fine-tuning. Distillation uses a constant learning rate of $5\times10^{-4}$; GPT-2 trains all parameters for 20 epochs, while LLaMA2 and Open-LLaMA2 use rank-16 LoRA on query and value weights for 10 epochs. Checkpoints are selected by validation ROUGE-L.

Evaluation covers Dolly, Self-Instruct, Vicuna, Wizard, Koala, Super-Natural Instructions (S-NI), and Unnatural Instructions (UnNI). ROUGE-L is reported on five datasets, and GPT-4o judging on five, with overlap. The GPT-4o metric is a ratio of total scores assigned to model responses versus reference answers, not a pairwise win rate. Response sampling uses five random seeds and reported scores are averaged.

Tables 1 and 2 report the following **mean ROUGE-L over five datasets**, excluding GPT-4o scores:

| Teacher to student | SFT student | DistiLLM | FDD | FDD minus DistiLLM |
| --- | ---: | ---: | ---: | ---: |
| LLaMA2 13B to 7B | 26.81 | 29.82 | 32.09 | +2.27 |
| Open-LLaMA2 7B to 3B | 22.65 | 28.25 | 29.82 | +1.57 |
| GPT-2 XL 1.5B to GPT-2 0.1B | 17.15 | 20.60 | 22.16 | +1.56 |
| LLaMA2 13B to TinyLLaMA 1B | 21.70 | 26.45 | 27.95 | +1.50 |

Other baselines include KD, SeqKD, ImitKD, GKD, and MiniLLM. FDD has the strongest aggregate ROUGE-L in each setting. Vicuna ROUGE-L is an exception: MiniLLM exceeds FDD for LLaMA2 and GPT-2, and DistiLLM exceeds it for Open-LLaMA2 and TinyLLaMA. FDD students exceed their SFT teachers' mean ROUGE-L in the two larger-student settings, but not in the GPT-2 or TinyLLaMA settings.

In the GPT-2 ablation (Table 3), output KD alone scores 19.28, adding trajectory matching gives 21.35, adding delta matching gives 20.52, and both give 22.16. Figure 2's accompanying text reports a peak at four sampled layers, followed by a slight decline with more layers. The authors conjecture that excessive constraints make teacher imitation harder for the smaller student. Figure 3 reports better results from LM-head alignment than learned projection and pretrained projection on Dolly, S-NI, and UnNI; exact figure values are not supplied in the Markdown text.

## Limitations

- **Access and vocabulary:** FDD is a white-box method requiring intermediate representations and LM heads. A shared, compatible vocabulary prediction space is assumed; different tokenizers or vocabulary configurations require additional alignment not provided here.
- **Scale and scope:** Teachers reach 13B parameters and students 7B. The experiments concern instruction-following after Dolly training; they do not establish performance at much larger scales or across arbitrary architectures and tasks.
- **Alignment choices:** Uniform layer sampling is not adaptive ODE discretization. More supervised layers can reduce performance, and the continuous-dynamics framing does not establish exact recovery of teacher feature dynamics.
- **Reporting gaps:** Table 1 gives standard GPT-2 KD a mean ROUGE-L of 16.80, while the output-only KD ablation gives 19.28. The supplied text does not explain that discrepancy. No confidence intervals, training-seed variability, or quantified training-time/memory overhead are reported.
- **Source metadata:** The supplied Markdown gives no publication year, venue, or stable identifier for this paper; `year` is left null. Some equations contain extraction artifacts, so this page summarizes their interpretable definitions without reproducing damaged indexing or normalization expressions.

## Related Concepts

- [[concepts/knowledge-distillation|Knowledge Distillation]]
- [[concepts/feature-dynamics-distillation|Feature Dynamics Distillation]]

## Related Papers

- Hinton, Vinyals, and Dean (2015), "Distilling the Knowledge in a Neural Network": the output-distribution KD foundation cited by this paper.
- Gu et al. (2024), "MiniLLM: Knowledge Distillation of Large Language Models," and Ko et al. (2024), "DistiLLM: Towards Streamlined Distillation for Large Language Models": principal comparison methods.
- Liang et al. (2023), "Less Is More: Task-Aware Layer-Wise Distillation for Language Model Compression": task-aware intermediate-feature filtering discussed as a related approach.
- Belrose et al. (2023), "Eliciting Latent Predictions from Transformers with the Tuned Lens": motivates the optional intermediate-layer adapters.
- [[papers/layerwise-change-of-knowledge-in-neural-networks|Layerwise Change of Knowledge in Neural Networks]]: a conceptual comparison within this Wiki, not a citation in the supplied paper. It analyzes intermediate representations through probe-derived interaction effects, whereas FDD trains a student to match intermediate predictions and their deltas.

[[index|Library home]]
