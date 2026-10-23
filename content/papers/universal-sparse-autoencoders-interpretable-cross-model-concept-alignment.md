---
title: "Universal Sparse Autoencoders: Interpretable Cross-Model Concept Alignment"
type: paper
authors:
  - Harrish Thasarathan
  - Julian Forsyth
  - Thomas Fel
  - Matthew Kowal
  - Konstantinos G. Derpanis
year: null
source_job_id: "e0487c98-210e-4d2f-90b6-a3099ec8c210"
tags:
  - sparse-autoencoders
  - mechanistic-interpretability
  - representation-alignment
  - computer-vision
---

## TL;DR

Universal Sparse Autoencoders (USAEs) jointly learn a sparse concept space for several pretrained vision models. Model-specific encoders map activations into one shared code, and model-specific decoders reconstruct every model from that code. On SigLIP, DINOv2, and ViT, the learned dimensions include shared visual concepts, model-specific features, and concepts that do not appear under independent SAE training.

## Research Question

Can one sparse, interpretable representation align internal features across neural networks with different architectures, objectives, and activation dimensions while retaining enough information for within-model and cross-model reconstruction?

## Motivation

Most concept-based interpretability methods analyze one network at a time. Existing methods for finding common features typically discover concepts separately and align them afterward, which makes many-model analysis expensive and does not provide a shared space for translating activations or coordinating interventions. A jointly learned basis could make similarities and differences between models directly comparable.

## Contributions

- Introduces the USAE, which aligns model-specific activations during training through a shared sparse code and model-specific encoder-decoder pairs.
- Defines firing entropy and co-fire proportion to distinguish concepts that are uniformly active across models from concepts biased toward one model.
- Compares universal training with independently trained SAEs and finds that the shared objective both preserves some single-model concepts and discovers additional shared representations.
- Introduces coordinated activation maximization, which visualizes the same shared dimension separately through each participating model.

## Method

For each model, a TopK-style encoder maps standardized activations to a common 6,144-dimensional sparse code. During an iteration, one model's encoder is selected, but its code is decoded through every model-specific dictionary. The summed reconstruction loss therefore requires a code inferred from any one model to predict all models' activations. The implementation replaces the stated TopK SAE's L2 reconstruction loss with L1 loss and uses a linear layer, batch normalization, and ReLU in each encoder.

The experiments use final-layer patch activations from SigLIP, DINOv2, and ViT. Class tokens are removed, DINOv2 tokens are interpolated to the common patch resolution, and each model's activations are standardized. Training uses ImageNet and an eightfold expansion over the largest activation dimension.

Concept importance is measured by decoder energy: the squared norm of a concept's mean activation multiplied by its dictionary element. Firing entropy measures how evenly a concept fires across models, while co-fire proportion measures how often the models activate that concept on the same input. Independent SAE and USAE dictionaries are compared by cosine similarity after Hungarian matching.

Coordinated activation maximization optimizes a separate input for each model to activate one selected shared concept. This exposes differences in how the models realize a dimension that the USAE treats as aligned.

## Experiments

Qualitative inspection finds shared dimensions ranging from colors, textures, curves, and crosses to object parts, grouped faces, and spatial compositions. Cross-model reconstruction has positive off-diagonal $R^2$ values, while self-reconstruction is strongest; DINOv2 has the best reported self-reconstruction among the three models.

More than 1,000 dimensions lie at the maximum of the reported firing-entropy distribution. Among the 1,000 most energetic concepts, the first roughly 100 co-fire across models more than half the time. Co-fire frequency correlates with energy at $r=0.63$ over all concepts and $r=0.89$ among concepts with at least 1,000 co-fires, supporting the paper's claim that its most important features tend to be widely shared.

After matching against independent SAEs, 38% of ViT, 26% of DINOv2, and 23% of SigLIP universal concepts exceed cosine similarity 0.5; a sampled baseline has no matches above that threshold. For the 1,000 most frequently co-firing concepts, mean similarity to independently learned features is 0.65 for DINOv2, 0.52 for ViT, and 0.40 for SigLIP.

Low-entropy dimensions reveal model-specific structure. DINOv2 dimensions respond to perspective, depth, view angle, and geometric cues, while SigLIP dimensions combine visual forms with printed text or letters. On CelebA and DTD, the ImageNet-trained USAE retains positive reconstruction $R^2$ for all three models and reproduces the reported universality trends; qualitative concepts such as jaws, checkerboards, and stripes transfer across datasets.

## Limitations

- The study analyzes only the final layer of three vision models, so it does not establish alignment across depth, other architectures, or other modalities.
- Training becomes sensitive to hyperparameters as more models are added and required approximately three days on one NVIDIA RTX 6000 GPU for the reported setup.
- Some learned dimensions remain qualitatively uninterpretable, as in independently trained SAEs.
- Reconstruction is imperfect, and shared activation statistics do not by themselves establish that a concept has the same causal role in every model.
- Coordinated activation maximization is presented qualitatively; its visualizations can suggest representational differences but do not constitute a quantitative semantic validation.

## Related Concepts

- [[Universal Concept Spaces]]
- [[Sparse Autoencoders]]
- Feature visualization
- Representational alignment
- Concept-based interpretability

## Related Papers

- [[Projecting Assumptions: The Duality Between Sparse Autoencoders and Concept Geometry]]: analyzes geometric restrictions imposed by common SAE encoders.
- [[Discovering Sparse Concept Graphs for Mechanistic Interpretability in Vision Transformers]]: connects independently learned visual SAE features across layers rather than aligning features across models.
- Dravid et al. (2023), "Rosetta Neurons: Mining the Common Units in a Model Zoo": mines correlated units across models after training.
- Kowal et al. (2024), "Understanding Video Transformers via Universal Concept Discovery": aligns concepts through shared exemplars in video transformers.
- Lindsey et al. (2024), "Sparse Crosscoders for Cross-Layer Features and Model Diffing": learns shared sparse features between states of a model.

[[index|Library home]]
