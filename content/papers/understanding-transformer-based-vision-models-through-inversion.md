---
title: Understanding Transformer-Based Vision Models via Modular Feature Inversion
type: paper
authors:
  - Jan Rathjens
  - Shirin Reyhanian
  - David Kappel
  - Laurenz Wiskott
year: null
source_job_id: "2dd9fe01-c36b-45b6-b4f7-492b7026fc19"
openreview: "O5sMv2o3EV"
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

Each inverse component learns to reconstruct the preceding stage's representation from the current stage, using mean squared error (MSE). At inference, inverses are composed back to pixels.

DETR-R50 is inverted at backbone, encoder, decoder, and prediction-head outputs. ViT-B/16 is inverted at patch embedding and encoder outputs; its class-token prediction head is excluded. Inverse architectures mirror the corresponding forward components, using deconvolutions, transformers, and an MLP. DETR prediction inversion consumes bounding boxes and full class logits; a separate one-hot variant tests the information beyond the winning class.

Under the paper's simplifying assumption of equally sized forward stages and matching inverse sizes, full-path inverses require a total of $p(n+1)/2$ parameters for $n$ stages of a $p$-parameter network; modular inverses require $p$. This is a parameter-count argument, not a measured runtime speedup.

## Experiments

Inverse modules are trained for 100 epochs on COCO 2017 for DETR and ImageNet-1K for ViT, Swin, and DeiT III, with evaluation on the corresponding validation sets. Main analyses use one selected instance per inverse module; additional instances provide sanity checks.

Table 2 reports classic versus modular parameter counts and training minutes per epoch on one NVIDIA A100:

| Model | Parameters, classic / modular (M) | Minutes/epoch, classic / modular |
| --- | --- | --- |
| DETR | 358 / 96 | 114 / 51 |
| ViT / DeiT III | 87 / 86 | 473 / 377 |
| Swin | 149 / 87 | 550 / 245 |

These are setup-dependent observations, not convergence-matched benchmarks. Table 1 shows that modular inversion does not uniformly improve reconstruction: DETR decoder FID improves from 309.5 to 156.1 while MSE increases from 0.0641 to 0.0937. Swin final-stage reconstruction accuracy improves from 0.17 to 0.46. ViT and DeiT III encoder reconstruction accuracy is unchanged (0.60 and 0.67 respectively), while classical inversion has better pixel and perceptual fidelity.

| Analysis | Reported finding |
| --- | --- |
| Reconstruction fidelity | ViT has lower reconstruction MSE across the studied stages. DETR decoder and later reconstructions exceed the dataset-mean-image MSE baseline while retaining structured object content. |
| Full-path inversion and fine-tuning | Classical inversion has lower MSE than modular inversion, but more grayish reconstructions in DETR. Increasing reconstruction emphasis generally improves fidelity at a cost to task performance. Controls use reconstruction weights 0, 0.1, 0.9, and 1. |
| Color perturbations | DETR reconstructions shift toward typical object colors, whereas ViT retains perturbations. Under full-image recoloring, DETR performance is reported as unaffected while ViT accuracy drops. |
| Spatial intervention | Replacing 20% of tokens with identical uniform noise produces local patch corruption in ViT, but more distributed effects in DETR. A local inverse-backbone control helps distinguish backbone mixing from encoder mixing. |
| Attention ablation | A fine-tuned ViT retaining class-token-to-image-token attention but disabling image-token self-attention achieves 69.84% best top-1 accuracy; the self-attention-enabled fine-tuning control reaches 84.84%. |
| Detection errors | Missed objects fade from later reconstructions; false positives can acquire features consistent with incorrect classes. This is qualitative diagnosis, not a validated error detector. |
| Intermediate layers | Inverses trained at component boundaries also produce recognizable reconstructions from other layers, with degradation farther from their training representations. |

Section 4.8 controls for training data and task using DeiT III and classification-trained DETR. Truncating DETR’s ResNet backbone progressively reduces prototypical transformations and improves preservation of instance details. This supports the backbone as a major contributor, not the sole cause; the two-block variant also loses approximately 15% accuracy relative to the full-backbone variant.

Appendix A.3 repeats DETR inversion with SSIM, LPIPS, and mixed objectives: texture and sharpness change, but the principal color and shape abstraction trends persist. Appendix A.4 adds an analysis of 200 detection errors. Swin retains detail in early stages but loses more at its final stages.

## Limitations

- Learned inverses can introduce artifacts and accumulate errors; reconstructability does not establish which features causally drive predictions.
- The authors acknowledge that assigning reconstructed properties to specific forward stages requires additional quantitative analysis.
- Architecture, task, and training data differ in the main comparison. Appendix controls narrow these explanations without exhaustively isolating every component.
- Several mechanistic interpretations remain qualitative; numerical reconstruction comparisons do not by themselves establish causal use of the recovered information. The attention-ablation model was trained only once.
- Intermediate-layer inversion applies modules outside their training distribution. Recognizable outputs support gradual change but are not a direct similarity metric.
- The supplied manuscript gives an OpenReview identifier but no explicit publication year; year remains null.

## Related Concepts

- [[concepts/modular-feature-inversion|Modular Feature Inversion]]
- [[concepts/mechanistic-interpretability|Mechanistic Interpretability]]
- [[concepts/patch-token-decoding-explainability|Patch-Token Decoding Explainability]]

## Related Papers

- [[papers/do-vision-transformers-see-like-convolutional-neural-networks|Do Vision Transformers See Like Convolutional Neural Networks?]]: cited evidence for gradual representational changes in ViT.

- Dosovitskiy and Brox (2016), *Inverting Visual Representations with Convolutional Networks*: the cited full-path inversion baseline.
- Mahendran and Vedaldi (2014), *Understanding Deep Image Representations by Inverting Them*: the cited image-space optimization approach.
- [[papers/the-explainability-illusion-must-vits-exhibit-patch-decoding-interpretability|The Explainability Illusion: Must ViTs Exhibit Patch-Decoding Interpretability?]]: a library comparison, not a citation in this manuscript. It studies native-head patch decoding rather than learned image inversion, and clarifies why spatial visualizations require independent validation.

[[index|Library home]]
