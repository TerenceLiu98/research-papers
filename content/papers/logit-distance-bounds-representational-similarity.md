---
title: "Logit Distance Bounds Representational Similarity"
type: paper
authors:
  - Beatrix M. G. Nielsen
  - Emanuele Marconato
  - Luigi Gresele
  - Andrea Dittadi
  - Simon Buchholz
year: null
tags:
  - representational-similarity
  - knowledge-distillation
  - identifiability
  - interpretable-machine-learning
---

## TL;DR

For discriminative models whose logits factor into embeddings and unembeddings, the paper proves that [[concepts/logit-distance|Logit Distance]] controls linear representational similarity while KL divergence generally does not. Logit-matched students preserve teacher geometry and linearly recoverable concepts substantially better than KL-distilled students on synthetic, CIFAR-100, and SUB experiments, although the guarantees rely on diversity, dimensionality, and probability-support assumptions.

## Research Question

When two models induce similar conditional distributions, which notion of distributional closeness guarantees that their final representations are approximately related by an invertible linear transformation?

## Motivation

Exact identifiability results imply that models with equal conditional distributions have linearly equivalent embeddings and unembeddings under a diversity condition. Practical models only approximate one another, however, and arbitrarily small KL divergence can coexist with large changes in representation geometry because KL assigns little weight to discrepancies on very unlikely labels. This matters for [[concepts/knowledge-distillation|Knowledge Distillation]] when a student should preserve not only predictions but also the teacher's linear representation structure and interpretable linear features.

## Contributions

- Defines logit distance as the root mean squared Euclidean distance between centered logit vectors and shows that it is a metric on the induced conditional distributions; pointwise, it is the Aitchison distance between probability vectors.
- Proves that logit distance lower-bounds KL divergence and, when both models' probabilities are uniformly bounded below by $\tau$, is upper-bounded by KL with a factor scaling as $\log^2(\tau)/\tau$.
- Bounds mean canonical correlation between model embeddings and between unembeddings using logit distance and the smallest nonzero eigenvalue of the reference model's logit covariance.
- Introduces a linear-identifiability dissimilarity that respects the joint inverse-linear symmetry of embeddings and unembeddings, and proves that logit distance bounds it under a general-position assumption.
- Shows theoretically and empirically that logit-based distillation better preserves linearly encoded concepts than standard KL-based distillation.

## Method

The model family represents a conditional distribution as

$$
p_{f,g}(y\mid x)=\frac{\exp(f(x)^\top g(y))}{\sum_{y'}\exp(f(x)^\top g(y'))},
$$

with centered unembeddings and therefore centered logits $u(x)$. The proposed distance is

$$
d_{\mathrm{logit}}^2(p,p')=\mathbb{E}_x\|u(x)-u'(x)\|_2^2.
$$

The main comparison with KL is

$$
2d_{\mathrm{KL}}(p,p')\le d_{\mathrm{logit}}^2(p,p')
\le \frac{4\log^2(\tau)}{\tau}d_{\mathrm{KL}}(p,p'),
$$

where the upper bound requires every conditional probability of both models to be at least $\tau$. Because $\tau\le 1/k$ for $k$ labels and is often much smaller, this KL guarantee is usually quantitatively weak.

For representations of dimension $m$, the paper bounds mean CCA by

$$
m_{\mathrm{CCA}}(f,f')\ge 1-\frac{d_{\mathrm{logit}}^2(p,p')}{m\mu_m},
$$

where $\mu_m$ is the smallest nonzero eigenvalue of the reference logit covariance; the same result holds for unembeddings. The stronger joint measure $d_{\mathrm{rep}}$ averages embedding-alignment error over every pivot label and every size-$m$ set of shifted unembeddings. Under general position,

$$
d_{\mathrm{rep}}\le \sqrt{\frac{2m}{k-1}}\frac{d_{\mathrm{logit}}}{\sigma_{\min}},
$$

where $\sigma_{\min}$ is the smallest singular value across the shifted-unembedding matrices. The paper also proves that a concept linearly encoded in the teacher remains approximately linearly recoverable from the student, with an error controlled by squared logit distance.

Students are trained with teacher-to-student KL, squared $L_2$ logit distance, or an $L_1$ logit loss. The experiments use a two-dimensional synthetic classification problem, CIFAR-100 with a ResNet-50 teacher and ResNet-18 students, and SUB bird images with DINOv2 features and 33 human-interpretable attributes.

## Experiments

All three student objectives achieve similar label accuracy within each dataset, but the representation measures differ sharply. On Synth, KL, $L_1$, and $L_2$ students attain 0.999 label accuracy; the main results table reports $d_{\mathrm{rep}}$ values of 49.5, 1.44, and 0.20, while mean CCA is 0.580, 0.999, and 0.999. The supplied manuscript is internally inconsistent about the KL value: its extended table reports about 6.07 and a figure caption reports about 6.9. On CIFAR-100, the corresponding mean CCA values are 0.515, 0.767, and 0.763, and $d_{\mathrm{rep}}$ is 87.6, 4.56, and 0.66.

The SUB experiment directly tests concept preservation. The teacher reaches 0.91 label accuracy and 0.92 concept-probe accuracy. The KL student reaches 0.93 label accuracy but only 0.06 concept accuracy, $d_{\mathrm{rep}}=3100$, and mean CCA 0.42. The $L_1$ and $L_2$ students reach label accuracies of 0.92, concept accuracies of 0.75 and 0.72, $d_{\mathrm{rep}}$ values of 10.0 and 1.6, and mean CCA 0.99. Thus matching predictions under KL does not preserve the teacher's linearly accessible attributes, whereas logit matching largely does in this setting.

An ablation varying SUB student representation dimension from 2 to the teacher's dimension of 10 shows that KL students quickly match label accuracy but remain poor at concept recovery and linear alignment. Logit-based students improve concept recovery as their dimension grows and maintain high mean CCA. A CIFAR diagnostic also verifies the paper's canonical-correlation bound across measured epochs and five student seeds.

## Limitations

The main theory generally assumes that the number of labels exceeds the representation dimension plus one, embeddings and unembeddings have sufficient rank, and compared models use the same representation dimension. The linear-identifiability dissimilarity further assumes shifted unembeddings are in general position for every pivot and label subset. The KL upper bound requires all conditional probabilities to be uniformly bounded away from zero and becomes weak as the minimum probability shrinks.

The experiments cover small synthetic and image-classification settings, not language-model distillation, despite autoregressive language models motivating the large-label regime. Teacher and student architectures are mostly closely related, and larger-scale optimization behavior remains untested. Logit matching also weights unlikely labels strongly; if their teacher logits encode noise rather than useful structure, preserving them may be harmful. The supplied manuscript does not state a publication year or stable paper identifier.

## Related Concepts

- [[concepts/logit-distance|Logit Distance]]
- [[concepts/statistical-identifiability|Statistical Identifiability]]
- [[concepts/knowledge-distillation|Knowledge Distillation]]
- [[concepts/linear-probing|Linear Probing]]
- Canonical correlation analysis
- Representational similarity

## Related Papers

- Nielsen et al. (2025), "When Does Closeness in Distribution Imply Representational Similarity? An Identifiability Perspective."
- Roeder, Metz, and Kingma (2021), "On Linear Identifiability of Learned Representations."
- Hinton, Vinyals, and Dean (2015), "Distilling the Knowledge in a Neural Network."
- Kornblith et al. (2019), "Similarity of Neural Network Representations Revisited."
- Marconato et al. (2025), "All or None: Identifiable Linear Properties of Next-Token Predictors in Language Modeling."

[[index|Library home]]
