---
title: "Concept Embedding Models: Beyond the Accuracy-Explainability Trade-Off"
type: paper
authors:
  - Mateo Espinosa Zarlenga
  - Pietro Barbiero
  - Giuseppe Marra
  - Michelangelo Diligenti
  - Frederic Precioso
  - Pietro Lio
  - Gabriele Ciravegna
  - Francesco Giannini
  - Zohreh Shams
  - Stefano Melacci
  - Adrian Weller
  - Mateja Jamnik
year: null
tags:
  - concept-bottleneck-models
  - interpretable-machine-learning
  - concept-supervision
  - representation-learning
---

## TL;DR

[[concepts/concept-embedding-models|Concept Embedding Models]] (CEMs) replace scalar concept predictions with input-dependent positive and negative embeddings mixed by a predicted concept probability. This retains task-relevant information when concept labels are incomplete while allowing interventions to select an entire concept embedding. Across three synthetic tasks and two image tasks, CEMs achieve competitive or higher task accuracy than the compared models without concept supervision. Training with random concept interventions improves their response to corrections, but CEMs do not dominate scalar bottlenecks under every intervention setting.

## Research Question

Can a supervised concept bottleneck retain enough information for accurate classification while preserving concept alignment and useful test-time interventions, especially when the annotated concepts do not fully determine the task?

## Motivation

Scalar [[concepts/concept-bottleneck-models|Concept Bottleneck Models]] can discard information needed for the downstream task. Hybrid bottlenecks add unsupervised dimensions to recover capacity, but correcting their supervised coordinates can have little effect on predictions. CEM assigns additional capacity to each concept and makes that capacity accessible through a concept-level intervention.

## Contributions

- Introduces a bottleneck formed by mixtures of positive and negative embeddings for each supervised binary concept.
- Proposes RandInt, which replaces predicted mixing probabilities with concept labels during training to improve later intervention effectiveness.
- Introduces [[concepts/concept-alignment-score|Concept Alignment Score]] (CAS) to assess label alignment in multidimensional representations, and applies information-plane analysis to compare bottleneck information retention.
- Evaluates task accuracy, concept alignment, correct and incorrect interventions, reduced concept supervision, and representation transfer, with ablations on backbone capacity, embedding size, and training procedure.

## Method

For input $x$, a shared encoder produces $h=\psi(x)$. Two concept-specific layers generate input-dependent embeddings $e_i^+(x),e_i^-(x)\in\mathbb{R}^m$. A sigmoid scoring function, shared across concepts, predicts $p_i$ from their concatenation. The bottleneck contains

$$
e_i=p_i e_i^+ +(1-p_i)e_i^-,\qquad
\hat y=f([e_1,\ldots,e_k]).
$$

The experiments use a linear label predictor $f$. Joint training minimizes task cross-entropy plus $\alpha$ times concept cross-entropy. Unlike fixed concept prototypes, both embedding endpoints vary with the input, allowing them to carry information beyond the binary concept label (Section 3.1).

An intervention sets $p_i$ to a supplied binary concept value, selecting $e_i^+$ or $e_i^-$. RandInt independently substitutes the ground-truth concept label for each mixing probability with probability $p_{\mathrm{int}}=0.25$ during training. Concept supervision still trains the predicted probabilities; the task loss updates the selected embedding. Ordinary inference uses predicted probabilities unless an intervention is requested (Section 3.2).

CAS clusters each concept's representations using k-medoids and summarizes cluster homogeneity with respect to ground-truth concept labels across concepts and cluster counts. The implementation samples cluster counts in steps of 50. Information-plane analysis estimates mutual information between bottleneck activations and inputs or task labels using kernel density estimation with added Gaussian noise; Appendix A.2 scales the noise variance with bottleneck dimension. This is an empirical diagnostic of information retention, not a proof of semantic faithfulness.

## Experiments

**Setup.** XOR, Trigonometric, and Dot each contain 3,000 synthetic samples. CUB uses 112 binary bird attributes and 200 classes; the paper treats this concept set as complete for its task. The constructed CelebA task uses six balanced attributes as concepts and eight attributes to define 256 classes, deliberately withholding two task-relevant attributes from concept supervision. It uses about 16,900 subsampled images. Baselines are Boolean, fuzzy, and hybrid CBMs plus a model without concept supervision. CEM and hybrid bottlenecks both have $km$ activations; scalar bottlenecks have $k$. Image experiments use pretrained ResNet-34 encoders and $m=16$; synthetic experiments use MLPs and $m=128$ (Appendices A.3 and A.6).

**Training.** Appendix A.6 specifies the following settings. Epoch counts are maximum budgets, with early stopping after 15 epochs without validation-loss improvement.

| Tasks | Concept-loss weight $\alpha$ | Optimizer | Initial learning rate | Batch size | Maximum epochs |
| --- | ---: | --- | ---: | ---: | ---: |
| Synthetic | 1 | Adam | $10^{-2}$ | 256 | 500 |
| CUB | 5 | SGD, momentum 0.9 | $10^{-2}$ | 128 | 300 |
| CelebA | 1 | SGD, momentum 0.9 | $5\times10^{-3}$ | 512 | 200 |

All tasks use weight decay $4\times10^{-5}$ and reduce the learning rate by a factor of 0.1 after 10 epochs without validation-loss improvement. CUB and CelebA use class-weighted concept losses. Synthetic tasks and CelebA use 70%/10%/20% training/validation/test splits; CUB follows the splits used by Koh et al. The model without concept supervision uses the hybrid architecture with concept-loss weight zero.

**Task accuracy.** Table 1 reports the following test means in percent across five seeds. CelebA results are top-1 accuracy for the constructed 256-class task.

| Dataset | No concepts | Boolean CBM | Fuzzy CBM | Hybrid CBM | CEM |
| --- | ---: | ---: | ---: | ---: | ---: |
| XOR | 99.33 | 51.33 | 51.42 | 99.23 | 99.17 |
| Trigonometric | 98.47 | 77.77 | 98.37 | 98.67 | 98.43 |
| Dot | 97.57 | 48.00 | 48.17 | 96.67 | 97.13 |
| CUB | 73.41 | 67.11 | 72.98 | 70.70 | 77.11 |
| CelebA | 26.80 | 24.23 | 25.07 | 30.24 | 30.63 |

CEM's reported 95% confidence intervals are [75.89, 78.10] on CUB and [29.62, 31.74] on CelebA. The corresponding intervals for the model without concepts are [71.83, 74.70] and [25.90, 27.84]. These tabulated means imply gains of 3.70 and 3.83 percentage points, respectively. The XOR result also reflects the use of a linear downstream predictor: scalar Boolean concepts do not make XOR linearly separable.

**Alignment and transfer.** Table 2 reports CAS on a percentage scale: CEM scores 95.98 on Dot, 86.14 on CUB, and 79.47 on CelebA, versus 72.66, 83.19, and 77.48 for the hybrid model. CEM does not have the highest CAS on every synthetic dataset. When trained with only 28 of CUB's 112 concepts, [[concepts/linear-probing|linear probes]] recover the 84 held-out concepts from the full CEM bottleneck at $94.33\%\pm0.88\%$ mean concept accuracy, versus $91.83\%\pm0.51\%$ for the hybrid bottleneck (reported 95% intervals; Appendix A.9). This measures accessible information rather than establishing that every embedding contains only its named concept.

In that same 28-concept experiment, CEM's original task accuracy is $76.76\%\pm0.27\%$, compared with the hybrid model's $77.15\%\pm0.33\%$. The better held-out concept probes therefore do not imply a higher task-accuracy mean in this setting (Appendix A.9).

**Interventions.** Correct and deliberately incorrect interventions use randomly selected concepts; CUB interventions operate on 28 groups of mutually exclusive attributes. CEM responds more strongly to corrections than hybrid CBMs, and RandInt improves its intervention performance. Incorrect interventions still reduce CEM accuracy, although it tolerates some mistakes better than scalar CBMs. Appendix A.13 qualifies the overall comparison: on concept-complete CUB, fuzzy CBMs other than the sequential variant tend to respond better to correct interventions than CEM; on concept-incomplete CelebA, CEM outperforms sequential and independent scalar CBMs by a large margin.

**Ablations.** Reducing CUB concept supervision harms embedding-based models less than scalar CBMs. Increasing RandInt probability introduces a small validation-accuracy trade-off, and its benefits do not transfer uniformly to standard CBMs: it can hurt them on CelebA. Embedding sizes around 8--16 suffice in the image-task ablations. Appendix A.11 reports less than 10% increases in per-epoch runtime on CUB and CelebA relative to vanilla CBMs, with no statistically significant difference in convergence epochs (Appendices A.5, A.8, and A.11--A.14).

## Limitations

Concept labels still require careful selection and annotation. The evaluation covers three constructed tasks and two image datasets; intervention experiments simulate corrections and errors rather than measuring expert behavior or user trust directly. The deliberately incomplete CelebA classification task should not be conflated with standard CelebA attribute prediction.

The CUB scarcity experiment selects a smaller fixed vocabulary of concept types and retains their annotations across examples (Appendix A.8). It does not test arbitrary missing concept labels on individual training examples. Likewise, XOR's concepts fully determine its label, but the shared linear downstream predictor cannot express XOR directly from Boolean concept coordinates. Concept completeness and downstream predictor capacity are distinct constraints in interpreting these results.

The classifier consumes full embeddings, so the concept-probability vector alone does not exhaust the information used for prediction. High CAS and successful linear probes support alignment and information availability, but do not guarantee exclusive concept semantics or causal explanations. Appendix A.7 notes that class-specific concept correlations can give a model without concept supervision a high CAS. Mutual-information estimates additionally depend on noise and representation dimension.

The reported advantage depends on bottleneck capacity, downstream predictor, dataset, and intervention regime. Scalar models can outperform CEM under correct interventions on CUB, and very small embeddings can reduce CEM accuracy. CEM also adds computation. The supplied Markdown does not identify a publication year or a stable identifier for this paper; these metadata are left unspecified.

## Related Concepts

- [[concepts/concept-embedding-models|Concept Embedding Models]]
- [[concepts/concept-bottleneck-models|Concept Bottleneck Models]]
- [[concepts/concept-alignment-score|Concept Alignment Score]]
- [[concepts/linear-probing|Linear Probing]]
- [[concepts/model-steerability|Model Steerability]]

## Related Papers

- Koh et al. (2020), "Concept Bottleneck Models." Source reference [9]; establishes scalar concept bottlenecks and test-time concept corrections.
- Mahinpei et al. (2021), "Promises and Pitfalls of Black-Box Concept Learning Models." Source reference [14]; motivates examining extra capacity and information beyond concept labels.
- Yeh et al. (2020), "On Completeness-Aware Concept-Based Explanations in Deep Neural Networks." Source reference [15]; addresses whether a concept set captures task-relevant information.
- Chen, Bei, and Rudin (2020), "Concept Whitening for Interpretable Image Recognition." Source reference [12]; another concept-aligned architecture, excluded from the intervention baselines because the authors identify no clear comparable intervention mechanism.

[[index|Library home]]
