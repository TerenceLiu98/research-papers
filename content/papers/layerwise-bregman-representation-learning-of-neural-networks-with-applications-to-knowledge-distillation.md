---
title: Layerwise Bregman Representation Learning of Neural Networks with Applications to Knowledge Distillation
type: paper
authors:
  - Ehsan Amid
  - Rohan Anil
  - Christopher Fifty
  - Manfred K. Warmuth
year: null
openreview: 6dsvH7pQHH
source_job_id: 42175810-0c45-477a-b65b-ba617108de9c
tags:
  - knowledge-distillation
  - representation-learning
  - dimensionality-reduction
  - information-geometry
---

## TL;DR

The paper compresses teacher activations using [[concepts/bregman-pca|Bregman PCA]] whose reconstruction loss respects the layer's activation function, then exports the learned directions and mean as a fixed nonlinear decoder in a student. This Bregman Representation Learning (BRL) approach turns intermediate [[concepts/knowledge-distillation|knowledge distillation]] into prediction of compact teacher coefficients. On ImageNet-1k, BRL combined with soft-label supervision reaches 72.6% top-1 accuracy versus 71.5% for soft-label distillation, with more student parameters and longer training.

## Research Question

Can activation-aware compression of a teacher's internal representations transfer more useful information to a smaller student than output soft labels or ordinary PCA representations?

## Motivation

Euclidean reconstruction error does not account for the nonlinear transformation that produced a layer's activations. A transfer-function-induced Bregman divergence measures reconstruction in the corresponding geometry. Compressing the representation also provides a lower-dimensional regression target and an explicit decoder that can be reused by a student.

## Contributions

- Extends Bregman PCA with a dual mean and principal directions orthonormal under a metric evaluated at that mean.
- Provides a metric-aware QR procedure to normalize learned directions while transforming coefficients to preserve reconstruction.
- Introduces BRL distillation through a fixed teacher-derived decoder and student-predicted coefficients.
- Evaluates probability reconstruction, hidden-activation reconstruction, and image-classification distillation on CIFAR-10/100 and ImageNet-1k.

## Method

For post-activation vectors $y_i$ and transfer function $f=\nabla F$, define the mean in pre-activation coordinates as

$$
m=f^{-1}\left(\frac{1}{n}\sum_i y_i\right).
$$

The representation-learning problem is

$$
\min_{V,\{c_i\}}\sum_i D_{F^*}\bigl(y_i,f(m+Vc_i)\bigr),
\qquad V^\top H_F(m)V=I_k.
$$

Here $F^*$ is the convex conjugate, $H_F(m)$ is the local Hessian metric, and $c_i$ is a $k$-dimensional code (Sections 2-3). With an identity transfer function this recovers ordinary PCA. For softmax outputs the loss is KL divergence; Appendix B handles the redundant constant-logit direction separately.

Gradient updates jointly fit directions and per-example coefficients. At the end, for a positive-definite metric $M$, factor $M^{1/2}V=\widetilde Q R$ and set $Q=M^{-1/2}\widetilde Q$. Then $Q^\top M Q=I_k$, and replacing each code by $Rc_i$ preserves the decoder input. This normalization is inexpensive for diagonal metrics induced by elementwise activations. The general optimization has no closed-form solution; convexity in each factor with the other fixed does not establish joint convexity or a global optimum for the constrained problem.

The student predicts $c(x)$ and reconstructs $f(m+Vc(x))$ through the imported decoder, keeping $m$ and $V$ fixed. A readout maps this reconstruction to class probabilities. Experiments compare both a newly trained readout and reuse of the teacher's readout.

For CIFAR, a five-convolution student predicts coefficients for an 8192-dimensional penultimate representation. It first minimizes coefficient squared error for 25 epochs, then switches to output cross-entropy for the remainder of 51 epochs. For ImageNet, Bregman PCA is fitted online during the teacher's final 10 training epochs, using an exponential moving average for the mean. The 2048-dimensional representation is compressed to 512 coefficients. Student training combines soft-label supervision with a coefficient squared-error regularizer and reuses the teacher readout.

## Experiments

**Reconstruction on CIFAR.** The modified PreAct ResNet-18 teacher achieves 92.62% top-1 accuracy on CIFAR-10 and 70.44% on CIFAR-100. Its penultimate ReLU is replaced by leaky ReLU with negative slope $10^{-4}$; flattening replaces global average pooling. Bregman PCA produces lower output-probability KL error than PCA on logits and CoDA PCA. Reconstructed penultimate activations also retain more classification accuracy than ordinary PCA on pre- or post-activations (Figure 3). Exact curve values are not supplied in the Markdown text.

**CIFAR distillation.** Main experiments omit augmentation and compare full training sets with a fixed random 50% subset. Baselines include supervised training, teacher-readout initialization, and tuned soft-label distillation. Section 4.3 reports 56.5% top-1 accuracy for BRL versus 54.1% for soft-label distillation on CIFAR-100 at a larger component count. Small-code gains are less pronounced on CIFAR-100. The reported CIFAR-10 BRL/soft-label gap grows from 6.3 percentage points with full data to 9.0 with half data. Appendix E states that CIFAR results average five independent trials.

**ImageNet-1k.** Table 1 reports 90-epoch training runs on the same $8\times8$ TPU v3 hardware:

| Model | Top-1 | Top-5 | Parameters | Reported runtime |
| --- | ---: | ---: | ---: | ---: |
| ResNet-50 teacher | 76.2% | 93.0% | 25.6M | 1.7 h |
| ResNet-18 baseline | 70.1% | 89.4% | 11.7M | 1.3 h |
| ResNet-18 soft-label distillation | 71.5% | 90.4% | 11.7M | 2.4 h |
| ResNet-18 BRL with soft labels | 72.6% | 91.1% | 15.6M | 3.9 h |

BRL gains 1.1 percentage points over soft-label distillation while remaining below the teacher. Its optimizer and schedule also change to Adam with cosine decay, whereas the baseline uses momentum SGD with a piecewise constant schedule. The table therefore compares complete training configurations rather than isolating the representation objective alone.

**Augmentation.** Appendix F reports that random crops, horizontal flips, and Mixup improve every CIFAR method and narrow BRL's advantage at $k=100$. The supplied Markdown ends at Table 2's caption, so numerical augmentation results cannot be recovered from this source.

## Limitations

- The construction requires suitable monotonic transfer functions. Experiments replace ReLU with strictly monotonic leaky ReLU; extensions to non-monotonic activations remain open. Softmax requires separate treatment of its shift invariance.
- Only single-layer transfer is evaluated. Multi-layer distillation and cascades of smaller students are proposed future directions.
- ImageNet BRL uses 15.6M parameters and 3.9 h versus 11.7M and 2.4 h for soft-label distillation. Reported accuracy gains do not establish an equal-capacity or equal-compute advantage, and inference energy savings are not measured.
- CIFAR benefits depend on code dimension and sample availability; augmentation narrows the gap. The experiments do not establish gains for arbitrary architectures or tasks.
- The supplied source has mathematical extraction artifacts and lacks a publication year and venue. The year remains null; the stable [OpenReview record](https://openreview.net/forum?id=6dsvH7pQHH) is given in the source header.

## Related Concepts

- [[concepts/bregman-pca|Bregman PCA]]: activation-aware reconstruction, dual centering, and metric-normalized directions.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: transfer of teacher behavior and internal representations to a student.
- [[concepts/low-rank-knowledge-distillation|Low-Rank Knowledge Distillation]]: related compression through limited-dimensional representations; BRL specifically fixes a nonlinear decoder rather than directly imposing low-rank student weights.

## Related Papers

- Collins, Dasgupta, and Schapire (2001), "A generalization of principal component analysis to the exponential family": cited antecedent for generalized PCA.
- Avalos et al. (2018), "Representation learning of compositional data": source of the CoDA PCA comparison.
- Hinton, Vinyals, and Dean (2015), "Distilling the knowledge in a neural network": cited soft-label distillation baseline.
- Romero et al. (2014), "Fitnets: Hints for thin deep nets": cited intermediate-representation supervision approach.
- [[papers/beyond-logits-aligning-feature-dynamics-for-effective-knowledge-distillation|Beyond Logits: Aligning Feature Dynamics for Effective Knowledge Distillation]]: a Wiki comparison, not a citation in this source. It aligns intermediate predictions and their changes across transformer layers, whereas BRL transfers a compressed representation from a single teacher layer.

[[index|Library home]]
