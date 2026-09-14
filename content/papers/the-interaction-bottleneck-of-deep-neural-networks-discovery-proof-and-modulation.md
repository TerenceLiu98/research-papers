---
title: "The Interaction Bottleneck of Deep Neural Networks: Discovery, Proof, and Modulation"
type: paper
authors:
  - Huiqi Deng
  - Qihan Ren
  - Zhuofan Chen
  - Zhenyuan Cui
  - Wen Shen
  - Peng Zhang
  - Hongbin Pei
  - Quanshi Zhang
year: null
tags:
  - neural-network-interpretability
  - feature-interactions
  - representation-learning
  - adversarial-robustness
---

## TL;DR

Across the evaluated neural networks, pairwise interaction strength is high under small and nearly complete contexts but low under intermediate contexts. The paper explains this interaction bottleneck through a conditional gradient analysis and introduces losses that shift emphasis across [[concepts/multi-order-interactions|Multi-Order Interactions]]. Low-order-biased models show smaller train-test gaps and greater tabular PGD robustness, while high-order-biased models show stronger structural sensitivity and fitting. Smaller gaps do not necessarily yield higher test accuracy.

## Research Question

Which context sizes support the pairwise interactions that DNNs learn, why are intermediate orders underrepresented, and can changing the interaction distribution alter fitting, generalization, structural sensitivity, and robustness?

## Motivation

Expressivity bounds describe functions an architecture could represent, while accuracy and robustness summarize aggregate behavior. The authors instead measure cooperative effects among input variables to connect learned representations with those aggregate outcomes. Interaction order here counts contextual variables accompanying a fixed pair, rather than the size of a distinct interacting subset.

## Contributions

- Reports a U-shaped interaction-strength distribution across image, language, point-cloud, and tabular classification models, including measurements during training.
- Derives an order-dependent learning-strength expression under a zero-mean interaction-gradient assumption and interprets its middle-order trough through the number of possible contexts.
- Introduces classification and entropy losses on masked-output differences to encourage or suppress selected interaction orders.
- Compares the resulting models on structural masking, training loss, train-test gaps, and adversarial accuracy. Section 2.3 identifies this manuscript as an expanded journal version of the authors' ICLR 2022 paper.

## Method

For input-variable indices $N$, let $v(S)$ be the model score when variables outside $S$ are replaced by baseline values. For a pair $i,j$ and a context $S$ excluding that pair, define

$$
\Delta v(i,j,S)=v(S\cup\{i,j\})-v(S\cup\{i\})-v(S\cup\{j\})+v(S).
$$

The order-$m$ interaction is $I^{(m)}(i,j)=\mathbb{E}_{S\subseteq N\setminus\{i,j\},\,|S|=m}[\Delta v(i,j,S)]$. Averaging across orders recovers the Shapley bivariate interaction index. The relative strength $J^{(m)}$ averages $|I^{(m)}|$ across pairs and samples, then divides by the mean strength across orders (Equations 3-7). It is a normalized magnitude, not a probability mass or count of reasoning steps.

The analysis decomposes a parameter update into independent-variable and interaction components. Its learning-strength measure is $F^{(m)}=\mathbb{E}_{i,j}\|\Delta W^{(m)}(i,j)\|_2$. Under Theorem 1's zero-mean gradient assumption and its coordinate-variance setup, Equation 13 gives the order dependence

$$
F^{(m)}\propto\frac{n-m-1}{n(n-1)\sqrt{\binom{n-2}{m}}}.
$$

The context count $u(m)=\binom{n-2}{m}$ peaks near the middle. The authors interpret the resulting small aggregate gradient contribution as difficulty learning intermediate orders. For the empirical curve comparison, they normalize at order zero and use an effective latent dimension $n'\ll n$ (Section 5.3).

Modulation uses nested masks of sizes $r_1n$ and $r_2n$ and their averaged score difference $\Delta u=\mathbb{E}[v(S_2)-(r_2/r_1)v(S_1)]$. Cross-entropy on its classwise softmax encourages discriminative information; negative prediction entropy suppresses it. These terms supplement ordinary classification loss. Theorem 2's weights emphasize orders near $r_1n$, include lower orders, and vanish above $r_2n-2$: the signal is weighted across orders rather than confined exactly to the stated interval. The displayed formula directly applies only for $r_1>0$.

## Experiments

**Bottleneck discovery (Section 4).** The reported coverage includes CNNs on CIFAR-10, Tiny-ImageNet, and ImageNet; ViT, DeiT, PVT, TNT, and Swin on Tiny-ImageNet and ImageNet; five point-cloud architectures on ModelNet10 and ShapeNet; BERT, DistilBERT, XLNet, and ALBERT on SST-2, AG News, and CoLA; and MLP-5/8 on UCI Census and Commercial. Figures 4-5 report the U-shaped distribution across these settings and during training, with early emergence illustrated by epoch 10.

**Modulation (Section 6.2).** AlexNet experiments vary target ranges, combine encouraging and suppressing terms, and vary loss weights over 0.1, 1, and 10. The reported curves shift toward the selected orders; combinations can produce two peaks.

**Structural sensitivity (Section 6.3.1).** AlexNet and VGG-16 on CIFAR-10 and Tiny-ImageNet are tested with random masking versus peripheral masking that preserves the central layout. High-order models have a larger accuracy advantage under peripheral masking. This is a structural-sensitivity proxy based on the area between accuracy curves.

**Fitting and generalization (Table 3).** Representative VGG-16 results are:

| Interaction regime | CIFAR-10 training loss | CIFAR-10 loss gap | Tiny-ImageNet training loss | Tiny-ImageNet loss gap |
| --- | ---: | ---: | ---: | ---: |
| Low-order | 0.059 | 0.396 | 0.226 | 1.75 |
| Normal | 0.002 | 0.507 | 0.006 | 2.98 |
| High-order | 0.002 | 0.614 | 0.011 | 3.35 |

Low-order models fit less and have smaller gaps. High-order models do not uniformly fit better than normal models: their Tiny-ImageNet training losses are higher. Section 6.3.2 also reports similar final test accuracies among the tabular variants despite different fitting and gap trajectories.

**Adversarial robustness (Table 4).** Untargeted $L_\infty$ PGD uses $\epsilon=0.6$ and 100 steps on Census, and $\epsilon=0.2$ and 50 steps on Commercial, with step size 0.01. Census MLP-8 adversarial accuracies are 44.65%, 39.33%, 18.10%, and 2.02% for low-order, normal, mid-order, and high-order models. Commercial MLP-8 gives 28.86%, 25.92%, 22.55%, and 20.58%, respectively. Mid-order models are less robust than the normal baseline in every reported setting.

## Limitations

The broad empirical pattern does not establish universality for arbitrary architectures, tasks, or input decompositions. Interaction estimates depend on variable grouping, masking baselines, and the output score. The conditional theorem is not an unconditional optimization guarantee; the supplementary proofs and many implementation details referenced by the manuscript are absent from the supplied Markdown. Its context-count argument should not be read as a measurement of gradient variance in every tested model, and the use of effective dimension qualifies the theory-to-data comparison.

A small train-test gap can coexist with underfitting and is not equivalent to strong test performance. Structural masking is a proxy for use of spatial layout, and the robustness comparison covers specific tabular PGD settings rather than certified or general robustness.

The source includes unresolved notation issues: it uses $r_1=0$ in modulation experiments despite division by $r_1$ in Equation 14, and describes the tabular fitting models inconsistently as three-layer MLPs and MLP-8. No endpoint convention or architecture correction is inferred here. The supplied text gives no publication year, journal name, DOI, or manuscript identifier; the year remains unknown rather than inheriting the conference predecessor's date.

## Related Concepts

- [[concepts/multi-order-interactions|Multi-Order Interactions]]
- [[concepts/and-or-interaction-primitives|AND/OR Interaction Primitives]]: a related masked-score decomposition whose order counts subset members, not contextual variables around a fixed pair.

## Related Papers

- Deng, Ren, Zhang, and Zhang (2022), "Discovering and Explaining the Representation Bottleneck of DNNs," ICLR: the conference predecessor identified in Section 2.3 and reference [3].
- Zhang et al. (2020), "Interpreting and Boosting Dropout from a Game-Theoretic View," ICLR: reference [57], used for multi-order interactions and the output decomposition.
- Ren et al. (2021), "A Unified Game-Theoretic Interpretation of Adversarial Robustness," NeurIPS: reference [33], connected to disruption of high-order interactions by adversarial attacks.
- [[papers/layerwise-change-of-knowledge-in-neural-networks|Layerwise Change of Knowledge in Neural Networks]]: a related Wiki study of masked-input interactions across layers. Its subset-order and cross-model-overlap measures differ from this paper's context-order and train-test-gap measures.

[[index|Library home]]
