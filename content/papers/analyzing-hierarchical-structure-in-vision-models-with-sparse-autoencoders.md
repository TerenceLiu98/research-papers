---
title: Analyzing Hierarchical Structure in Vision Models with Sparse Autoencoders
type: paper
authors:
  - Matthew L. Olson
  - Musashi Hinck
  - Neale Ratzlaff
  - Changbai Li
  - Phillip Howard
  - Vasudev Lal
  - Shao-Yen Tseng
year: null
source_job_id: "2389b90a-f2f5-448b-8a5c-848033251b27"
tags:
  - sparse-autoencoders
  - vision-transformers
  - mechanistic-interpretability
  - hierarchical-representations
---

## TL;DR

The paper trains one ReLU [[concepts/sparse-autoencoders|Sparse Autoencoder]] on the DINOv2 class token at each of 40 layers and compares the resulting features with the WordNet hierarchy underlying ImageNet-1k. Early class-token states are easy to reconstruct, activate few SAE latents, and perform poorly under linear probing; later layers contain multi-class features with greater taxonomic coherence. At layer 36, the authors report 90 multi-class SAE heads with perfect ontological coverage, including features associated with whales, elasmobranchs, woodwind instruments, and warships. The study is a single-model case study, and its hierarchy metrics can overrate singleton features or be distorted by one outlying class.

## Research Question

Do DINOv2's internal representations reflect the ImageNet class hierarchy, can SAEs expose that structure, and how does the apparent taxonomic organization vary across layers?

## Motivation

ImageNet-1k classes are WordNet synsets embedded in a broader hypernym hierarchy, but ordinary classification accuracy does not reveal whether a vision model organizes classes according to that taxonomy. SAEs offer an unsupervised decomposition of dense activations into sparse features. Comparing each feature's activated classes with WordNet therefore provides a way to test whether model-internal features correspond to higher-order visual categories rather than isolated labels.

## Contributions

- Applies layer-specific ReLU SAEs to DINOv2 class-token activations as probes of hierarchical visual representations.
- Defines Lowest Common Hypernym (LCH) Height and Ontological Coverage to quantify the abstraction level and taxonomic completeness of a feature's activated ImageNet classes.
- Compares SAE reconstruction and sparsity statistics with independently trained layerwise linear probes.
- Uses gradient-weighted attention relevancy maps to spatially inspect images that activate selected hierarchical SAE features.

## Method

For every DINOv2 layer, the authors train a ReLU SAE on its class-token embedding. The SAE has an eightfold hidden expansion, giving 12,288 latent units, and is optimized for three epochs with minibatches of 64, Adam at learning rate $10^{-4}$, 5% learning-rate and sparsity-coefficient warmups, 20% linear learning-rate decay, and an $L_1$ coefficient of 10. Images are resized to $224\times224$. Reconstruction MSE, latent $L_1$ norm, and the number of active latents characterize each fitted SAE; a separate linear classifier at each layer measures label information.

For an SAE head $k$, let $C_k$ be the ImageNet-1k classes on which it activates. Its lowest common hypernym $h_k$ is the smallest WordNet subtree containing those classes. LCH Height averages the path distance from members of $C_k$ to $h_k$, while Ontological Coverage is $|C_k|/|L(h_k)|$, the fraction of the hypernym's ImageNet descendant classes captured by the head. These metrics are interpreted jointly: height describes abstraction and coverage describes completeness.

The paper also produces feature-wise relevancy maps using positive gradient-weighted attention propagated through the transformer layers. These maps are used as qualitative evidence that selected SAE features attend to image regions associated with their proposed higher-order category.

## Experiments

The experiments use ImageNet-1k and DINOv2, fitting 40 SAEs and 40 corresponding linear probes. The early class-token layers have very low SAE reconstruction error, few active latents, and poor linear classification accuracy. All three observations are interpreted as evidence that task-relevant information accumulates in the class token with depth, although SAE statistics alone do not identify what information is present.

Taxonomic evaluation focuses on SAE heads from layers 24, 28, 32, and 36 because earlier layers show little activation. At layer 24, most heads either activate on one class or on many dissimilar classes; head 657 is a reported exception, activating on seven bird species with coverage 0.119. Later layers contain more high-coverage multi-class heads. At layer 36, 90 multi-class heads have coverage 1.0, with examples corresponding to elasmobranchs, whales, woodwind instruments, and warships.

A qualitative layer-36 example activates for both orcas and grey whales. Its relevancy maps concentrate on semantically meaningful image regions, supporting spatial grounding for this selected feature but not establishing that all high-coverage heads are similarly grounded or causally used by DINOv2.

## Limitations

- The study analyzes one vision foundation model and one taxonomy, so the reported depth pattern may not transfer to other architectures, training objectives, datasets, or human category systems.
- Ontological coverage equals 1 for any singleton head. Conversely, one taxonomically distant activation can force a broad lowest common hypernym and sharply reduce coverage, even when most activated classes are coherent.
- WordNet/ImageNet provides the evaluation hierarchy, so the metrics measure agreement with that taxonomy rather than hierarchy in a taxonomy-independent sense.
- SAE features can be redundant or shaped by the sparsity constraint. Reconstruction and sparsity statistics do not by themselves establish monosemanticity, causal relevance, or completeness of concept recovery.
- Relevancy maps provide selected qualitative localization evidence rather than a systematic causal test of feature use.
- The paper's discussion says early layers show stronger hierarchical alignment, which conflicts with its reported results that early class-token states are largely uninformative and later layers contain more high-coverage features.
- The supplied Markdown gives no publication year or stable paper identifier; neither is inferred here.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]: the layerwise dictionaries used to expose class-associated features.
- [[concepts/dynamical-interpretability|Dynamical Interpretability]]: a complementary view of how vision-transformer representations change with depth.
- [[concepts/sparse-autoencoder-receptive-fields|Sparse Autoencoder Receptive Fields]]: explains why encoder geometry can constrain which concepts an SAE latent isolates.
- [[concepts/hierarchical-concept-embedding|Hierarchical Concept Embedding]]: explicitly represents semantic taxonomies, whereas this paper measures whether an independently trained model implicitly reflects one.

## Related Papers

Works cited by the paper include:

- Bilal et al. (2017), "Do Convolutional Neural Networks Learn Class Hierarchy?": earlier probing of ImageNet hierarchy in convolutional encoders.
- Deng et al. (2009), "ImageNet: A Large-Scale Hierarchical Image Database": introduces the dataset and hierarchy used for evaluation.
- Oquab et al. (2023), "DINOv2: Learning Robust Visual Features without Supervision": the vision foundation model analyzed.
- Cunningham et al. (2023), "Sparse Autoencoders Find Highly Interpretable Features in Language Models": motivates SAEs as representation probes.
- Stevens et al. (2025), "Sparse Autoencoders for Scientifically Rigorous Interpretation of Vision Models": studies SAEs on image-encoder patch embeddings.
- Li et al. (2024), "The Geometry of Concepts: Sparse Autoencoder Feature Structure": examines hierarchical feature structure in language models.

Related library reading, without implying citation by the source paper:

- [[papers/projecting-assumptions-the-duality-between-sparse-autoencoders-and-concept-geometry|Projecting Assumptions: The Duality Between Sparse Autoencoders and Concept Geometry]] analyzes how SAE encoder geometry affects visual concept recovery.
- [[papers/block-recurrent-dynamics-in-vits|Block-Recurrent Dynamics in ViTs]] studies the layerwise evolution of DINOv2 token representations from a dynamical perspective.

[[index|Library home]]
