---
title: "KD2M: A Unifying Framework for Feature Knowledge Distillation"
type: paper
authors:
  - Eduardo Fernandes Montesuma
year: null
venue: 7th International Conference on Geometric Science of Information
source_job_id: "90e1c022-6cad-4ce3-bc37-5612bce21dba"
tags:
  - knowledge-distillation
  - representation-learning
  - distribution-matching
  - optimal-transport
---

## TL;DR

KD2M casts feature-based [[concepts/knowledge-distillation|knowledge distillation]] as matching the distributions induced by teacher and student encoders. The framework covers empirical and Gaussian feature models and several discrepancies, including Wasserstein, class-conditional Wasserstein, joint feature-label Wasserstein, maximum mean discrepancy, and KL divergence. On SVHN, CIFAR-10, and CIFAR-100, every tested feature-matching variant improves on the undistilled ResNet18 student, while label-aware variants have a small average advantage. A theoretical result bounds the student-teacher risk difference by their feature-distribution Wasserstein distance and then by the encoders' $L_2(P)$ distance.

## Research Question

Can feature-based distillation methods be expressed in one distribution-matching framework, and what theoretical and empirical guarantees does that view support?

## Motivation

Classical distillation compares teacher and student predictions. Feature-based methods instead align intermediate activations, but use different distribution models and discrepancies. KD2M separates this common principle from the particular metric: the student minimizes supervised classification loss plus a discrepancy between the pushforward distributions produced by its encoder and a frozen teacher encoder.

## Contributions

- Formalizes feature distillation as distribution matching between student and teacher encoder pushforwards.
- Organizes objectives by empirical versus Gaussian feature models and by whether label information enters the discrepancy.
- Adapts a domain-adaptation bound to relate student-teacher risk differences to Wasserstein feature alignment and encoder distance.
- Compares six feature-matching objectives on three image-classification datasets under one student-teacher setup.

## Method

Let $g_S$ and $g_T$ denote the student and teacher encoders, $h_S$ the student classifier, and $P$ the data distribution. The training objective is

$$
\theta^\star=\arg\min_{\theta\in\Theta}
\mathbb E_{(x,y)\sim P}\!\left[\mathcal L\!\left(y,h_S(g_S(x))\right)\right]
+\lambda\,\mathbb D(g_{S,\sharp}P,g_{T,\sharp}P),
$$

where $g_{\sharp}P$ is the pushforward feature distribution and $\mathbb D$ is a distribution discrepancy. Each minibatch passes through the trainable student and frozen teacher; the optimizer differentiates the sum of classification and feature-distribution losses through the student.

For empirical feature distributions, the paper considers 2-Wasserstein distance, class-conditional Wasserstein distance averaged across classes, and a joint Wasserstein cost combining feature distance with a label discrepancy. For Gaussian approximations, it considers closed-form 2-Wasserstein distance, class-conditional Gaussian Wasserstein distance, and Gaussian KL divergence. The discussion also places [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]] within the same framework.

The theoretical argument starts from a domain-adaptation result bounding a fixed classifier's risk difference across two feature distributions by their 2-Wasserstein distance. Because both distributions are pushforwards of the same input law, coupling each input with itself yields

$$
\left|\mathcal R_{P_S}(h)-\mathcal R_{P_T}(h)\right|
\leq \mathbb W_2(g_{S,\sharp}P,g_{T,\sharp}P)
\leq \lVert g_S-g_T\rVert_{L_2(P)},
$$

under the stated kernel, integrability, and loss assumptions. This is a conditional risk-difference bound, not a general claim that the student's error is upper-bounded by the teacher's error.

## Experiments

The experiments use ResNet18 students and ResNet34 teachers on SVHN, CIFAR-10, and CIFAR-100. Models are optimized for 15 epochs with SGD, learning rate 0.01, momentum 0.9, cosine annealing to $10^{-4}$, and dataset-specific augmentation and normalization. The supplied paper reports one accuracy per method and dataset and does not report confidence intervals or variation across runs.

| Method | Distribution model | SVHN | CIFAR-10 | CIFAR-100 | Mean |
| --- | --- | ---: | ---: | ---: | ---: |
| Student | None | 93.10 | 85.11 | 56.66 | 78.29 |
| Teacher | None | 94.41 | 86.98 | 62.21 | 81.20 |
| $W_2$ | Empirical | 94.00 | 86.45 | 61.07 | 80.51 |
| $CW_2$ | Empirical | 94.06 | 86.54 | 61.47 | 80.69 |
| $JW_2$ | Empirical | 94.00 | 86.60 | 61.07 | 80.55 |
| $W_2$ | Gaussian | 93.94 | 86.63 | 60.68 | 80.41 |
| $CW_2$ | Gaussian | 93.95 | 86.25 | 61.43 | 80.54 |
| KL | Gaussian | 94.05 | 86.44 | 60.66 | 80.38 |

All six distillation objectives improve on the student baseline for all three datasets. Empirical class-conditional Wasserstein has the highest reported mean accuracy, 80.69%, a 2.40-point gain over the student and 0.14 points above empirical joint Wasserstein. The methods remain close overall: their mean accuracies span 80.38%-80.69%. None reaches the teacher's 81.20% mean. The SVHN visualizations report improved teacher-student feature alignment and show sensitivity to the loss weight $\lambda$, but the supplied text does not provide the plotted numerical values.

The authors provide [implementation code](https://github.com/eddardd/kddm). It was not executed for this Wiki entry.

## Limitations

- The benchmark is limited to three small image-classification datasets and one ResNet18/ResNet34 pairing, with a short 15-epoch training schedule.
- The paper reports no uncertainty, repeated-run variation, computational cost, or statistical comparison between objectives; the small differences among distillation metrics may not be robust.
- The risk bound applies under the cited domain-adaptation assumptions to a common classifier evaluated across feature distributions. It does not by itself compare the full student and teacher predictors when their classifier heads differ.
- The $L_2(P)$ encoder bound follows from a particular same-input coupling and can be loose relative to the optimal Wasserstein coupling.
- Gaussian objectives depend on the adequacy of Gaussian feature approximations; empirical optimal transport can be sensitive to minibatch size and high-dimensional sampling.
- The supplied Markdown gives no publication year or stable bibliographic identifier. Several extracted equations contain damaged notation, so this page retains only claims and formulas whose intended meaning is clear.

## Related Concepts

- [[concepts/knowledge-distillation|Knowledge Distillation]]: the broader teacher-student learning framework.
- [[concepts/optimal-transport|Optimal Transport]]: supplies the Wasserstein discrepancies and the coupling argument used in the bound.
- [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]]: a kernel discrepancy covered by the distribution-matching formulation.

## Related Papers

- Hinton, Vinyals, and Dean (2015), "Distilling the Knowledge in a Neural Network": foundational output-distribution distillation contrasted with feature matching.
- Chen et al. (2021), "Wasserstein Contrastive Representation Distillation": cited empirical Wasserstein feature-distillation method.
- Lohit and Jones (2022), "Model Compression Using Optimal Transport": cited optimal-transport approach to model compression.
- Lv, Yang, and Li (2024), "Wasserstein Distance Rivals Kullback-Leibler Divergence for Knowledge Distillation": cited Gaussian Wasserstein and KL comparison.
- [[papers/beyond-logits-aligning-feature-dynamics-for-effective-knowledge-distillation|Beyond Logits: Aligning Feature Dynamics for Effective Knowledge Distillation]]: aligns intermediate prediction trajectories rather than treating feature batches as distributions.

[[index|Library home]]
