---
title: "Question-Driven Decision Tree via Knowledge Distillation for Interpretable Prediction"
type: paper
authors:
  - Xuancheng Yao
  - Zhong Zhang
  - Qiuhui Chen
  - Yi Hong
year: null
tags:
  - interpretable-machine-learning
  - knowledge-distillation
  - medical-imaging
  - decision-trees
  - concept-supervision
---

## TL;DR

Question-Driven Decision Tree (QDT) predicts clinically meaningful binary sub-tasks and maps them to a diagnosis through a predefined decision tree. A flexible teacher transfers output distributions and spatial attention to the logic-constrained student. On three dermatology datasets, deployable QDT students outperform the reported interpretable baselines and remain close to their corresponding teachers, while exposing thresholded question-level paths; the feature extractor itself remains opaque.

## Research Question

Can a medical-image classifier follow an auditable, clinically defined sequence of binary questions without paying the usual large predictive penalty of an interpretable-by-design model?

## Motivation

Post-hoc saliency and perturbation explanations may be unstable and need not reflect the computation that produced a prediction. [[concepts/concept-bottleneck-models|Concept Bottleneck Models]] expose human-readable intermediate variables, but their usual flat concept-to-label mapping does not represent the conditional sequence used in clinical diagnosis. QDT instead makes the final decision a deterministic function of task-specific diagnostic questions, then uses [[concepts/knowledge-distillation|Knowledge Distillation]] to recover capacity lost under that structural constraint.

## Contributions

- Defines diagnosis as traversal of a task-specific tree of clinically meaningful binary questions rather than a flat set of concepts.
- Combines shared image features, task-specific heads, gated self-attention, and cross-attention to integrate sub-task evidence into the main diagnostic representation.
- Trains an unconstrained teacher and distills both output distributions and spatial attention into a student whose deployed aggregation is deterministic.
- Evaluates the framework with CNN and Transformer backbones on pressure-injury staging, ISIC-2019, and MILK10k.

## Method

The teacher and student share an image encoder, one binary head for each clinical sub-task, and a main diagnosis head. A fusion module normalizes the main and sub-task representations, assigns learned gates to the sub-task features, models their interactions with self-attention, and injects them into the main representation with cross-attention.

Their aggregation rules differ. The teacher uses a learned MLP to map sub-task probabilities to the primary diagnosis. The student uses a predefined clinical logic tree. During training, soft path probabilities preserve differentiability; during inference, each sub-task probability is thresholded at 0.5 and the resulting binary answers determine a single auditable path.

For pressure-injury staging, five questions test wound obstruction, skin integrity, signs of deep-tissue pressure injury, dermal confinement, and exposed subcutaneous fat without deeper involvement. The hierarchy is derived from clinical guidelines, organized with LLM assistance, and then reviewed and refined by clinicians. ISIC-2019 and MILK10k use separate task-specific trees informed by dermatological heuristics and label structure. QDT requires only an image at test time; the question labels supervise training rather than serving as manual test-time inputs.

Training has two stages. The teacher minimizes main-task cross-entropy, binary cross-entropy over sub-tasks, and KL divergence between its direct diagnosis and learned sub-task aggregation. Once frozen, it supervises the student through main- and sub-task output-distribution matching and squared error between spatial attention maps, alongside the student's hard-label and logic-alignment losses.

## Experiments

The evaluation uses a private pressure-injury dataset (2,292 images, 6 classes), ISIC-2019 (25,331 images, 8 classes), and MILK10k (5,240 images, 10 classes). The pressure-injury results use five-fold cross-validation; the two public datasets use a 7:1:2 train-validation-test split. Reported metrics are accuracy, weighted F1, and macro F1.

With a ResNet50 backbone, the student reaches 74.32% accuracy on pressure injuries, 84.18% on ISIC-2019, and 72.32% on MILK10k. The corresponding teacher accuracies are 74.84%, 84.90%, and 72.80%. On ISIC-2019, the student exceeds the reported CBM and Deep Concept Reasoner accuracies of 80.97% and 72.21%; its macro F1 is 78.17%, compared with 72.98% for vanilla ResNet50.

The ResNet50 ablation attributes complementary effects to the components. On ISIC-2019, sub-task heads raise accuracy from 81.49% to 83.81%, attention fusion raises it to 84.09%, the alignment loss lowers it to 83.41%, and distillation restores it to 84.18%. On MILK10k the same sequence ends at 72.32%, above the 71.66% baseline. These results support the paper's claim that distillation compensates for some cost of deterministic aggregation, although the component effects are not uniformly positive before the complete model is assembled.

For interpretability, the paper visualizes a Stage 3 pressure-injury path with question probabilities and attention maps. Across the pressure-injury dataset, the sub-task classifiers average 83.2% accuracy. This demonstrates inspectable intermediate outputs, but the paper does not report comprehensive quantitative fidelity or path-stability metrics.

## Limitations

- The evaluation covers three dermatology tasks, including one private dataset; broader medical-domain generalization is not established.
- Each task requires sub-task annotations and a clinically validated tree. The reported semi-automatic construction process still depends on suitable guidelines and expert review.
- Interpretability evidence is mainly structural and qualitative. The paper leaves quantitative fidelity, sub-task consistency, and reasoning-path stability for future work.
- The deterministic decision path does not make the CNN or Transformer feature extractor intrinsically interpretable, and an attention map is not by itself proof of faithful visual reasoning.
- The comparisons do not include a broad set of recent neuro-symbolic methods, and the supplied text reports no confidence intervals or significance tests for the public-dataset results.
- The supplied Markdown contains extraction damage in the pressure-injury path equations and provides no publication year, venue, or stable identifier; this page therefore records `year: null` and summarizes the intended tree computation without reconstructing the corrupted formulas.

## Related Concepts

- [[concepts/knowledge-distillation|Knowledge Distillation]]
- [[concepts/concept-bottleneck-models|Concept Bottleneck Models]]
- [[concepts/causal-concept-bottlenecks|Causal Concept Bottlenecks]]
- Interpretable machine learning
- Attention transfer
- Clinical decision trees

## Related Papers

- Koh et al. (2020), "Concept Bottleneck Models": the flat concept-based architecture used as an interpretable baseline and point of contrast.
- Hinton, Vinyals, and Dean (2015), "Distilling the Knowledge in a Neural Network": the teacher-student foundation for QDT's output-level transfer.
- Zagoruyko and Komodakis (2016), "Paying More Attention to Attention": the cited basis for transferring attention maps.
- Barbiero et al. (2023), "Interpretable Neural-Symbolic Concept Reasoning": the Deep Concept Reasoner baseline.
- [[papers/causally-reliable-concept-bottleneck-models|Causally Reliable Concept Bottleneck Models]]: another approach that replaces a flat concept-to-task relation with explicit structure, using a causal graph rather than a deterministic diagnostic tree.

[[index|Library home]]
