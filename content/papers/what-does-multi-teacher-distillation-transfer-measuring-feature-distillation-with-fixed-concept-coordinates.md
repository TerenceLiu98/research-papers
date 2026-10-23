---
title: "What Does Multi-Teacher Distillation Transfer? Measuring Feature Distillation with Fixed Concept Coordinates"
type: paper
authors:
  - Anonymous
year: null
source_job_id: "684e1631-393b-4859-9345-cefa6c289a7a"
tags:
  - knowledge-distillation
  - representation-alignment
  - sparse-autoencoders
  - computer-vision
---

## TL;DR

Learned feature-prediction heads can absorb an invertible change of basis, so accurate teacher-feature regression does not show that a student uses corresponding internal coordinates. This paper evaluates [[concepts/fixed-coordinate-compatibility|Fixed-Coordinate Compatibility]] through a pretrained [[concepts/universal-concept-spaces|Universal Concept Space]] whose decoders are fixed before student training. Same-patch coordinate supervision improves direct held-out decoding for ViT-S and supervised external decoding for ConvNeXt-Tiny, while controls show that coordinate allocation without spatial correspondence and value matching without autonomous support selection are insufficient.

[[index|Library home]]

## Research Question

What evidence is required to show that multi-teacher feature distillation transfers information into independently specified student coordinates, rather than merely enabling prediction through learned alignment heads?

## Motivation

Standard [[concepts/knowledge-distillation|Knowledge Distillation]] objectives jointly learn a student representation and a teacher-specific prediction head. If the student features are transformed by any invertible matrix and the head by its inverse, the prediction objective is unchanged. Teacher-feature accuracy and downstream task quality therefore do not identify where the transferred information resides inside the student. The paper introduces an evaluation axis for direct reuse of a coordinate system fixed independently of the training being audited.

## Contributions

- Identifies the change-of-basis ambiguity that prevents learned-head feature regression from supporting coordinate-level transfer claims.
- Defines fixed-coordinate compatibility as direct decoding through a reference decoder fixed before student optimization, distinct from downstream representation quality.
- Uses correspondence and support interventions to separate coordinate allocation from spatial matching and value alignment from autonomous coordinate selection.
- Reports the same direction of the same-patch effect for transformer and convolutional students, while distinguishing adapter-free ViT evaluation from supervised ConvNeXt decoding.

## Method

### Fixed Reference Coordinates

The audit uses the pretrained Universal Sparse Autoencoder (USAE) of Thasarathan et al. (2025). Frozen model-specific encoders map DINOv2 and SigLIP patch features into a shared 6,144-coordinate sparse vocabulary, retaining the top 32 values per patch. Frozen model-specific decoders map this code back to each teacher feature space. A trainable projection maps student features into the same code; only the student and projection are optimized.

Same-patch concept-supervised distillation combines decoded teacher-feature reconstruction with a SmoothL1 loss against the frozen teacher codes. Reconstruction-only training removes the coordinate loss. The dense Raw MSE, PHI-S, and CosPress references use learned maps and therefore have downstream quality scores but no fixed-coordinate compatibility score.

### Compatibility Audit

A frozen ViT dictionary branch excluded from student distillation directly decodes the student's sparse code. Mean cosine and normalized MSE against held-out ViT features measure compatibility. A matched-random support supplies a floor, and the held-out branch's own encode-decode reconstruction supplies an oracle anchor. The resulting oracle-relative progress measures how far the student advances from the random floor toward that anchor.

The held-out ViT was part of USAE pretraining, so this is adapter-free with respect to the student but not zero-shot extension to a previously unseen model family.

### Matched Interventions

- **Shuffled-target CSD** preserves coordinate-target marginals, loss weight, token count, and the reconstruction objective while breaking patch correspondence.
- **Global TopK CSD** trains all streams on a shared support selected from student and teacher logits. Evaluation then compares deployable student-local support with a non-deployable diagnostic that restores teacher-derived support.
- A vocabulary-capacity decomposition bounds teacher-space error by student code error plus the fixed dictionary residual, but the bound is not a causal or additive decomposition.

## Experiments

Students are unpretrained ViT-S/16 and ConvNeXt-Tiny models trained without labels on ImageNet-1K for five epochs with DINOv2-S/14 and SigLIP-B/16 teachers. Results aggregate three backbone seeds. Frozen-backbone 20-NN and linear probes measure representation quality; compatibility is evaluated on all 50,000 ImageNet validation images.

At epoch 5, same-patch supervision raises ViT-S held-out cosine from $0.423\pm0.002$ to $0.443\pm0.003$, while linear-probe accuracy changes from $61.04\pm0.23\%$ to $60.71\pm0.34\%$. CosPress reaches $64.82\pm0.28\%$ linear accuracy but has no fixed-coordinate compatibility score. This differing ordering supports compatibility as an additional measurement axis rather than a proxy for downstream quality.

At the epoch-1 intervention checkpoint, shuffled targets assign $74.67\pm0.73\%$ of selected ReLU mass to teacher-shared coordinates, close to same-patch CSD at $74.04\pm0.81\%$, but their compatibility is $0.372\pm0.001$ versus $0.384\pm0.003$. Reconstruction-only compatibility is $0.373\pm0.001$. The allocation shift alone therefore does not explain the same-patch gain.

Global TopK obtains stronger DINO/SigLIP value correlations on teacher-selected coordinates than same-patch CSD, $0.676/0.559$ versus $0.319/0.323$, but weaker local-support Jaccard, $0.063/0.051$ versus $0.209/0.161$. Its compatibility rises from $0.213\pm0.001$ with student-local support to $0.529\pm0.0003$ when teacher-derived support is restored. The latter diagnostic requires both teachers and is not deployable.

For ConvNeXt-Tiny, a separately fitted external decoder raises cosine from $0.242\pm0.004$ to $0.274\pm0.002$ under same-patch supervision, while linear accuracy changes from $60.95\pm1.04\%$ to $61.03\pm0.22\%$. This supports supervised coordinate reuse, not adapter-free or zero-shot compatibility.

## Limitations

- Compatibility is relative to one pretrained USAE; another fixed factorization could produce different residuals, coordinate assignments, and conclusions.
- The held-out ViT branch participated in dictionary pretraining, and the ConvNeXt decoder was fitted on paired features. Neither experiment establishes zero-shot communication with an unseen model family.
- Five epochs, two teachers, two student architectures, and three seeds do not establish convergence or scaling behavior. The trajectory does not determine whether same-patch supervision changes the asymptotic solution or only optimization speed.
- Coordinate frequency and decoding statistics do not establish that individual sparse dimensions have stable semantic or causal meanings.
- The fixed-coordinate pathway trails the strongest dense reference in downstream quality and is reported as 15.0% slower than raw MSE, with 69.4% more peak allocated memory and 8.7% more filtered checkpoint state in the matched benchmark.
- The teacher-assisted support result is diagnostic and non-deployable, while the vocabulary residual bound is non-tight and does not assign causal shares of error.
- The supplied manuscript is an anonymous submission with no stable paper identifier or explicit publication year.

## Related Concepts

- [[concepts/fixed-coordinate-compatibility|Fixed-Coordinate Compatibility]]: the paper's independently anchored measurement of direct coordinate reuse.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: the broader teacher-student training framework whose learned-head ambiguity motivates the audit.
- [[concepts/universal-concept-spaces|Universal Concept Spaces]]: provide the shared sparse coordinate system and frozen model-specific decoders used as the reference.
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]: supply the TopK sparse coding machinery, while their reconstruction residual limits the measurement instrument.

## Related Papers

- [[papers/universal-sparse-autoencoders-interpretable-cross-model-concept-alignment|Universal Sparse Autoencoders: Interpretable Cross-Model Concept Alignment]]: supplies the pretrained shared vocabulary and model-specific branches used by the audit.
- Hinton, Vinyals, and Dean (2015), "Distilling the Knowledge in a Neural Network": foundational knowledge-distillation reference.
- Romero et al. (2015), "FitNets: Hints for Thin Deep Nets": introduces learned mappings for intermediate feature distillation.
- Ranzinger et al. (2024), "PHI-S: Distribution Balancing for Label-Free Multi-Teacher Distillation": a geometry-oriented learned-map baseline.
- Mannix, Hodgkinson, and Bondell (2024), "Preserving Angles Improves Feature Distillation": introduces the CosPress baseline used for downstream-quality comparison.
- Nasiri-Sarvi, Rivaz, and Hosseini (2026), "SPARC: Concept-Aligned Sparse Autoencoders for Cross-Model and Cross-Modal Interpretability": motivates the support-alignment intervention, although the paper does not reproduce SPARC.
