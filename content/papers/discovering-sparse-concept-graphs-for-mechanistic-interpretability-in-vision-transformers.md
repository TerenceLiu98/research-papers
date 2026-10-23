---
title: Discovering Sparse Concept Graphs for Mechanistic Interpretability in Vision Transformers
type: paper
authors:
  - Tommaso Giordano
year: 2025
source_job_id: "51c3cba2-2bca-48fb-85cb-22c60700e04b"
tags:
  - mechanistic-interpretability
  - sparse-autoencoders
  - vision-transformers
  - concept-graphs
  - causal-interventions
---

## TL;DR

This master's thesis trains [[Sparse Autoencoders]] on the CLS-token residual streams of the final four layers of an ImageNet-pretrained ViT-B/16, then links the resulting features across layers with linear regressions. The induced sparse concept graph supports dataset-level and image-specific explanations, while feature substitutions and c-deletion/c-insertion experiments show that its strongest edges track intervention effects better than random orderings. The evidence is promising but limited by imperfect SAE reconstruction, linear approximations of transformer blocks, and the omission of patch-token information flows.

## Research Question

Can sparse features extracted from successive layers of a pretrained Vision Transformer be organized into an interpretable graph that describes how visual concepts combine and that remains consistent with the model's behavior under interventions?

## Motivation

Saliency and attention visualizations can identify influential image regions without exposing the internal features that support a prediction, and attention weights need not measure causal importance. Concept-based explanations are more semantic, but many require concepts to be specified in advance. The thesis instead seeks an unsupervised, model-internal representation that can expose both individual visual features and their cross-layer dependencies.

## Contributions

- Applies overcomplete SAEs to the CLS-token residual stream of layers 9-12 in a unimodal Vision Transformer and interprets latent neurons using top-activating images and patch-level cosine-similarity heatmaps.
- Defines global concept activations from SAE hidden activations scaled by decoder-column norms and uses them for ablation, selective activation, and cross-image feature substitution.
- Fits linear regressions between consecutive sparse feature spaces, and from the final feature space to class probabilities, to form a multilayer directed concept graph.
- Adapts the global graph to individual images by scaling each concept's outgoing edges by that image's concept activation.
- Evaluates graph-edge rankings with c-deletion and c-insertion interventions rather than treating regression weights as causal evidence by themselves.
- Implements an interactive, precomputed graph viewer for tracing class-level and image-specific concept pathways.

## Method

The study uses TorchVision's ImageNet-1k-pretrained ViT-B/16 and the 100,000-image ILSVRC2011 test set, split 90/10 for training and validation. Separate ReLU SAEs reconstruct the normalized CLS-token residual stream at layers 9, 10, 11, and 12. Each has expansion factor 8, producing 6,144 latent features from 768-dimensional activations; the sparsity coefficient is tuned to keep roughly 20 latents active per image. A latent's activation is multiplied by its decoder-column norm so that it reflects the feature's reconstruction contribution.

Concept semantics are inspected primarily through the images with the highest activation. Heatmaps provide complementary localization by computing cosine similarity between a decoder direction and every patch-token residual, then interpolating the patch scores to image resolution. For interventions, the method sets selected SAE latents to zero or positive values, decodes the modified representation, restores the original SAE reconstruction error, and resumes the ViT forward pass.

For each consecutive pair of analyzed layers, rare features are removed, remaining activations are max-normalized, and a bias-free linear regression predicts the next layer's activations. A final regression predicts class softmax probabilities from layer-12 concepts. Regression weights become directed graph edges. An image-specific graph multiplies each source concept's outgoing weights by its activation for that image.

Edge reliability is tested with c-deletion and c-insertion. For each image and each of its five most active target concepts, source concepts are ordered by the learned edge weights. Deletion removes sources in that order; insertion restores them in that order. Normalized target-activation AUC is compared with a random-order baseline, using ten intervention points for computational efficiency.

## Experiments

The expansion-factor-8 SAEs obtain cosine similarities of 0.79, 0.76, 0.86, and 0.90 at layers 9-12, respectively. Their reconstruction $R^2$ values are 0.4191, 0.4673, 0.6826, and 0.7081, with median active-feature counts of 21, 24, 17, and 23. Expansion factors 2 and 4 give broadly similar reconstruction results, while factor 8 provides more learned features.

The cross-layer regressions remain sparse without explicit weight regularization. For layer pairs 9->10, 10->11, and 11->12, cosine similarity is 0.406, 0.609, and 0.762; $R^2$ is 0.237, 0.457, and 0.359; and Hoyer sparsity is 0.66, 0.75, and 0.70. The layer-12-to-class regression reaches cosine similarity 0.883, $R^2$ 0.695, and Hoyer sparsity 0.66.

Substituting the five strongest layer-12 concepts between images drives down the source-class confidence and raises the target-class confidence. A single-feature substitution has a weaker but still visible effect; ablation chiefly lowers the source logit, while insertion raises the target logit and can also lower the source logit. Effects become less direct in earlier layers.

Across all analyzed layer transitions and the final concept-to-logit mapping, weight-ordered c-insertion has higher AUC and weight-ordered c-deletion lower AUC than random ordering. The gap is strongest for the most active target concept and declines through the fifth-ranked target. The supplied thesis reports these comparisons graphically rather than as a numeric table, so the result supports ranking reliability without providing exact effect sizes in the text.

Qualitative examples recover features associated with objects, colors, textures, text, and crowds. Class graphs for docks and zebras trace higher-level predictions to groups such as boats, cranes, containers, piers, and striped patterns. Image-specific graphs suppress pathways associated with content absent from the selected image, and a misclassification example links a coffee mug held near a face to camera-related features.

## Limitations

- SAE reconstruction is incomplete, especially in earlier layers, so the sparse representation does not preserve all residual-stream information.
- A bias-free linear regression approximates each nonlinear transformer block and can miss interactions that are not expressible as additive feature effects.
- The analysis follows only the CLS-token stream. This is most appropriate near the classifier but omits information processed and exchanged through patch tokens, particularly in earlier layers.
- Heatmaps are heuristic: a patch can align with a feature direction even when the relevant information was aggregated from elsewhere. Top-activating images and interventions are needed as complementary evidence.
- Experiments use one relatively small ViT architecture and 100,000 in-distribution ImageNet images; larger models or broader datasets may have different feature structure.
- C-deletion and c-insertion validate whether a learned ordering predicts intervention effects, but they do not establish that regression edges are a complete or uniquely identified causal graph.
- The thesis provides qualitative examples selectively and only eight randomly selected concepts in its appendix; two of those random concepts appear uninterpretable.

## Related Concepts

- [[Sparse Autoencoders]]
- Mechanistic interpretability
- Concept-based explanations
- Vision Transformers
- Model interventions
- Feature visualization

## Related Papers

- [[Projecting Assumptions: The Duality Between Sparse Autoencoders and Concept Geometry]]: characterizes architectural restrictions on the concept regions that common SAE encoders can represent.
- [[Interpretable and Steerable Concept Bottleneck Sparse Autoencoders]]: separates interpretability and steerability evaluation while adding explicit concept coverage to an SAE.
- [[papers/sparsealign-ooc-auditing-news-image-text-out-of-context-detection-with-sparse-autoencoders|SparseAlign-OOC: Auditing News Image-Text Out-of-Context Detection with Sparse Autoencoders]]: uses SAE features and interventions to audit a multimodal classifier.
- Fel et al. (2023), "A Holistic Approach to Unifying Automatic Concept Extraction and Concept Importance Estimation": supplies the c-deletion and c-insertion evaluation framework.
- Rajaram et al. (2024), "Automatic Discovery of Visual Circuits": related work on extracting compact visual-model circuits from neuron interactions.

[[index|Library home]]
