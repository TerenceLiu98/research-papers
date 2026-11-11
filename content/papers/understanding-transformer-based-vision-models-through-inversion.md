---
title: Understanding Transformer-based Vision Models through Inversion
type: paper
authors:
  - Anonymous authors
year: null
source_job_id: "d04e476e-046f-424d-b0ca-5f136380d5db"
tags:
  - vision-transformers
  - model-interpretability
  - feature-inversion
---

## TL;DR

Independently trained inverse modules reconstruct images from successive components of DETR and ViT. The resulting [[concepts/modular-feature-inversion|Modular Feature Inversion]] analysis finds increasingly prototypical colors and shapes in DETR reconstructions, while ViT retains substantially more local visual detail. Reconstruction-based interpretations are supported by color perturbations, token interventions, and reconstruction/task-loss controls, but do not uniquely identify the cause of every visual artifact.

## Research Question

Can component-wise feature inversion efficiently expose how transformer vision models preserve, abstract, and spatially distribute information?

## Motivation

Training a separate full inverse network for every inspected stage duplicates computation. Attention maps and similarity metrics provide complementary information but do not directly reconstruct the visual content recoverable from a representation.

## Contributions

- Introduces independently trained local inverses that can be composed into image reconstructors.
- Compares DETR and ViT through color, structure, spatial-token perturbations, detection failures, and intermediate-layer reconstructions.
- Tests reconstruction fidelity against classical full-path inversion and forward-model fine-tuning.
- Adds appendix controls using classification-trained DETR, DeiT III, and Swin.

## Method

Each inverse component learns to reconstruct the preceding stage's representation from the current stage, using mean squared error (MSE). At inference, inverses are composed back to pixels. This describes the prose-defined objective; Equation 1 in the supplied Markdown instead repeats the current-stage variable as its target, an apparent notation inconsistency.

DETR-R50 is inverted at backbone, encoder, decoder, and prediction-head outputs. ViT-B/16 is inverted at patch embedding and encoder outputs; its class-token prediction head is excluded. Inverse architectures mirror the corresponding forward components, using deconvolutions, transformers, and an MLP. DETR prediction inversion consumes bounding boxes and full class logits; a separate one-hot variant tests the information beyond the winning class.

Under the paper's simplifying assumption of equally sized forward stages and matching inverse sizes, full-path inverses require a total of $p(n+1)/2$ parameters for $n$ stages of a $p$-parameter network; modular inverses require $p$. This is a parameter-count argument, not a measured runtime speedup.

## Experiments

Inverse modules are trained on COCO 2017, with at least three instances per variant interchanged during analysis. The text calls the evaluation split the test set, while Figure 4 calls it validation. ImageNet-1K is used for ViT fine-tuning and classification evaluation.

| Analysis | Reported finding |
| --- | --- |
| Reconstruction fidelity | ViT has lower reconstruction MSE across the studied stages. DETR decoder and later reconstructions exceed the dataset-mean-image MSE baseline while retaining structured object content. |
| Full-path inversion and fine-tuning | Classical inversion has lower MSE than modular inversion, but more grayish reconstructions in DETR. Increasing reconstruction emphasis generally improves fidelity at a cost to task performance. Controls use reconstruction weights 0, 0.1, 0.9, and 1. |
| Color perturbations | DETR reconstructions shift toward typical object colors, whereas ViT retains perturbations. Under full-image recoloring, DETR performance is reported as unaffected while ViT accuracy drops. |
| Spatial intervention | Replacing 20% of tokens with identical uniform noise produces local patch corruption in ViT, but more distributed effects in DETR. A local inverse-backbone control helps distinguish backbone mixing from encoder mixing. |
| Attention ablation | A fine-tuned ViT retaining class-token-to-image-token attention but disabling image-token self-attention achieves approximately 69% top-1 accuracy versus 76% for the comparison ViT-B/16. |
| Detection errors | Missed objects fade from later reconstructions; false positives can acquire features consistent with incorrect classes. This is qualitative diagnosis, not a validated error detector. |
| Intermediate layers | Inverses trained at component boundaries also produce recognizable reconstructions from other layers, with degradation farther from their training representations. |

Appendix A reports that DETR trained for ImageNet classification still develops stage-wise abstraction, supporting an architectural contribution. Its prediction-head inversions instead collapse to class-specific prototypes, showing that objective also matters. Bounding-box ablations of no-object queries are described as not presented in the original manuscript, with detailed analysis promised for a revision; they are not a fully documented benchmark here.

Appendix B reports ViT-like detail preservation for DeiT III and most Swin stages, with greater detail loss and distortion in late Swin stages. These controls qualify the main discussion's earlier speculation that ViT's larger training dataset alone explains the contrast.

## Limitations

- Learned inverses can introduce artifacts and accumulate errors; reconstructability does not establish which features causally drive predictions.
- The authors acknowledge that assigning reconstructed properties to specific forward stages requires additional quantitative analysis.
- Architecture, task, and training data differ in the main comparison. Appendix controls narrow these explanations without exhaustively isolating every component.
- Many conclusions rely on qualitative figures. Exact MSE, AP, and color-robustness values are not supplied as numerical tables in the Markdown.
- Intermediate-layer inversion applies modules outside their training distribution. Recognizable outputs support gradual change but are not a direct similarity metric.
- The supplied manuscript is anonymous and under double-blind review; no publication year or stable identifier is stated. The year is therefore left null.

## Related Concepts

- [[concepts/modular-feature-inversion|Modular Feature Inversion]]
- [[concepts/mechanistic-interpretability|Mechanistic Interpretability]]
- [[concepts/patch-token-decoding-explainability|Patch-Token Decoding Explainability]]

## Related Papers

- Dosovitskiy and Brox (2016), *Inverting Visual Representations with Convolutional Networks*: the cited full-path inversion baseline.
- Mahendran and Vedaldi (2014), *Understanding Deep Image Representations by Inverting Them*: the cited image-space optimization approach.
- [[papers/the-explainability-illusion-must-vits-exhibit-patch-decoding-interpretability|The Explainability Illusion: Must ViTs Exhibit Patch-Decoding Interpretability?]]: a library comparison, not a citation in this manuscript. It studies native-head patch decoding rather than learned image inversion, and clarifies why spatial visualizations require independent validation.

[[index|Library home]]
