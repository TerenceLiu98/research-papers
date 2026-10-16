---
title: "RMLR: Extending Multinomial Logistic Regression into General Geometries"
type: paper
authors:
  - Ziheng Chen
  - Yue Song
  - Rui Wang
  - Xiao-Jun Wu
  - Nicu Sebe
year: null
source_job_id: "a89db4a4-5536-40c3-9a41-a37c4e9b4424"
repository: "https://github.com/GitZH-Chen/RMLR"
tags:
  - riemannian-geometry
  - classification
  - geometric-deep-learning
  - matrix-manifolds
---

[[index|Library home]]

## TL;DR

RMLR constructs multinomial logistic classifiers on Riemannian manifolds by pairing a logarithmic displacement with a class-specific tangent normal. It instantiates this construction under five families of symmetric positive definite (SPD) metrics and on rotation groups. Selected classifiers improve accuracy over LogEig classification across several backbones, with gains of 14.23 percentage points for SPDNet on HDM05 and 4.46 points in inter-subject EEG balanced accuracy. Performance and computational cost depend strongly on the metric and task.

## Research Question

Can manifold-valued neural features be classified intrinsically without requiring gyrogroup structure, a geometry-specific trigonometric identity, or a global Euclidean flattening?

## Motivation

Many Riemannian networks end with a matrix logarithm at the identity followed by a Euclidean linear classifier and softmax, termed LogEig MLR here. Earlier intrinsic classifiers depend on specific geometric structures. RMLR seeks a common construction using the manifold's metric and a well-defined Riemannian logarithm, including geometries that are not geodesically complete.

## Contributions

- Defines an angular Riemannian margin with a closed-form tangent-space expression and derives the associated softmax classifier (Definition 3.1; Theorems 3.2-3.3).
- Derives five SPD classifier families using log-Euclidean, affine-invariant, power-Euclidean, log-Cholesky, and Bures-Wasserstein geometries (Theorem 4.2), incorporating earlier gyro and flat SPD classifiers.
- Constructs a Lie MLR for rotation matrices and evaluates it on LieNet (Section 5).
- Derives an implicit backward rule for the Lyapunov operator used by Bures-Wasserstein classifiers, avoiding eigenvalue-difference denominators in direct eigendecomposition backpropagation (Appendix F.2.2).

## Method

For each class $k$, learn a point $P_k\in\mathcal M$ and a nonzero normal $\widetilde A_k\in T_{P_k}\mathcal M$. The classifier is

$$
z_k(S)=g_{P_k}\!\left(\operatorname{Log}_{P_k}S,\widetilde A_k\right),
\qquad p(y=k\mid S)=\frac{\exp z_k(S)}{\sum_j\exp z_j(S)}.
$$

The associated hyperplane is the zero set of $z_k$. Rather than solving for the shortest distance from $S$ to that set, the paper defines an angular margin whose closed form is

$$
d_{\mathrm{margin}}(S,H_{\widetilde A,P})=
\frac{|g_P(\operatorname{Log}_P S,\widetilde A)|}{\|\widetilde A\|_P}.
$$

This is the magnitude of the normal projection in the tangent space at $P$. It recovers Euclidean hyperplane distance, but should not generally be identified with the infimum of manifold geodesic distances to the hyperplane. Signed margin times normal magnitude gives the logit above. A normal in a fixed tangent space is mapped to $T_{P_k}\mathcal M$ by parallel transport or a Lie group translation differential, allowing its coordinates to be optimized as Euclidean parameters.

For SPD matrices, power deformation uses $\phi_\theta(P)=P^\theta$ and $\widetilde g=\theta^{-2}\phi_\theta^*g$, with $\theta\ne0$. The parameterized inner product is

$$
\langle V,W\rangle^{(\alpha,\beta)}=
\alpha\langle V,W\rangle_F+\beta\operatorname{tr}(V)\operatorname{tr}(W),
\qquad \min(\alpha,\alpha+n\beta)>0.
$$

Log-Euclidean logits pair $\log S-\log P_k$ with $A_k$ under this inner product. Power-Euclidean logits instead pair $(S^\theta-P_k^\theta)/\theta$ with $A_k$. Log-Euclidean geometry is unchanged by the normalized power deformation; the other families provide different metric choices. The Bures-Wasserstein implementation uses Cholesky-based left translation to generate normals. For its Lyapunov solve $XP+PX=V$, an incoming gradient $G$ gives gradients $\mathcal L_P[G]$ with respect to $V$ and $-X\mathcal L_P[G]-\mathcal L_P[G]X$ with respect to $P$.

On $\mathrm{SO}(n)$, the construction uses a relative-rotation logit $\langle\log(P_k^\top S),A_k\rangle_F$, where $A_k$ is skew-symmetric, followed by softmax. LieNet operates on products of $\mathrm{SO}(3)$; class reference rotations are shared across time to reduce cost. Training uses cross-entropy, Riemannian AMSGrad for the described SPDNet/TSMNet experiments, and Riemannian SGD for LieNet.

## Experiments

The paper replaces LogEig classifiers in four SPD backbones and LieNet. Values below are reported percentages, mean plus/minus standard deviation; gains are percentage-point differences. Hinss2021 uses balanced accuracy, while the other rows use accuracy.

| Backbone and task | LogEig baseline | Selected RMLR | Gain | Source |
| --- | --- | --- | --- | --- |
| SPDNet, 5-block Radar | 93.47 ± 0.45 | 95.87 ± 0.58, LEM | 2.40 | Table 3 |
| SPDNet, 1-block HDM05 | 57.42 ± 1.31 | 71.65 ± 0.88, deformed EM | 14.23 | Table 4 |
| TSMNet, Hinss2021 inter-session | 53.83 ± 9.77 | 56.43 ± 8.79, deformed LCM | 2.60 | Table 5 |
| TSMNet, Hinss2021 inter-subject | 49.68 ± 7.88 | 54.14 ± 8.36, deformed LCM | 4.46 | Table 6 |
| RResNet, HDM05 | 58.17 ± 2.07 | 71.89 ± 0.60, deformed EM | 13.72 | Table 7 |
| RResNet, NTU60 | 45.22 ± 1.23 | 53.63 ± 0.95, deformed LCM | 8.41 | Table 7 |
| SPDGCN, Disease | 90.55 ± 4.83 | 96.33 ± 2.19, LEM | 5.78 | Table 8 |
| LieNet, G3D | 87.91 ± 0.90 | 89.13 ± 1.70, Lie MLR | 1.22 | Table 10 |
| LieNet, HDM05 | 76.92 ± 1.27 | 78.24 ± 1.03, Lie MLR | 1.32 | Table 10 |

Radar and SPD HDM05 results use 10-fold experiments; RResNet NTU60 uses five folds. EEG evaluation randomly leaves out 5% of sessions or subjects. SPDGCN also evaluates Cora and Pubmed. Direct classification without a learned backbone improves HDM05 accuracy from 48.43 ± 1.25 to 66.77 ± 1.34 using BWM (Table 9).

Improvements are not uniform across metric choices: on Cora, BWM scores 73.46 ± 2.18 and LCM 77.59 ± 1.20 against the 78.04 ± 1.27 baseline. The selected best metrics therefore support task-dependent gains, not dominance of every intrinsic classifier.

LieNet HDM05 results select the best 10 folds from 20 experiments. The baseline fails to converge in 8 of 20 folds, compared with 2 of 20 for Lie MLR. This supports the reported stability benefit, but the selected accuracy average is not an all-run estimate.

## Limitations

- Each class requires both a manifold point and a tangent normal, producing possible overparameterization as the class count grows (Appendix A).
- Matrix operations can impose substantial cost. On 117-class HDM05, Table 16 reports 1.95 seconds per epoch for LogEig versus 31.64 for standard AIM and 33.14 for standard BWM; EM and LCM take 3.91 and 3.29 seconds. These timings use the deepest SPDNet architecture and standard metrics.
- The construction assumes that the required logarithms are well-defined. Applicability to other manifolds is a theoretical scope claim; the experiments focus on SPD features and rotation groups.
- Reported metric-family results include hyperparameter selection. Different families win on different tasks, and some settings underperform LogEig.
- Best-10-of-20 selection limits the interpretation of LieNet's HDM05 accuracy comparison.

Source note: The supplied Markdown does not explicitly establish the publication year, venue, DOI, or arXiv identifier; the year is therefore null. Equation 22 omits an exponential in its probability display. The summary expresses its inner product as a logit and applies the softmax specified by the general framework in Equation 11, rather than treating a possibly negative inner product as a probability.

## Related Concepts

- [[concepts/riemannian-multinomial-logistic-regression|Riemannian Multinomial Logistic Regression]]: logarithmic displacement, tangent normals, and intrinsic classification.
- [[concepts/riemannian-representation-learning|Riemannian Representation Learning]]: the manifold-valued features consumed by the classifier.
- [[concepts/geodesic-distance|Geodesic Distance]]: distinguishes shortest manifold distance from the angular margin used here.

## Related Papers

- Chen et al. (2024), "Riemannian multinomial logistics regression for SPD neural networks" (reference 16): earlier classifiers under flat SPD metrics incorporated by RMLR.
- Nguyen and Yang (2023), "Building neural networks on matrix manifolds: A Gyrovector space approach" (reference 50): gyro SPD classifiers recovered under standard AIM, LEM, and LCM.
- Nguyen, Yang, and Histace (2024), "Matrix manifold neural networks++" (reference 51): gyro SPSD classifiers related through the product geometry in Appendix D.
- Ganea, Becigneul, and Hofmann (2018), "Hyperbolic neural networks" (reference 23): prior hyperbolic margin-based classification motivating the generalization.
