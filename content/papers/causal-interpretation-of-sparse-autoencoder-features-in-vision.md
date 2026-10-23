---
title: "Causal Interpretation of Sparse Autoencoder Features in Vision"
type: paper
authors:
  - Sangyu Han
  - Yearim Kim
  - Nojun Kwak
year: null
source_job_id: "57989c31-d757-4cb0-b63c-3e33248c1864"
tags:
  - sparse-autoencoders
  - vision-transformers
  - feature-attribution
  - mechanistic-interpretability
  - explainability-evaluation
---

## TL;DR

This paper introduces Causal Feature Explanation (CaFE), which explains a vision [[concepts/sparse-autoencoders|Sparse Autoencoder]] feature by attributing its activation back to input patches rather than assuming that the patch where it fires contains its meaning. On CLIP-ViT-L/14, these effective receptive field maps expose context-dependent, spatially displaced features and recover feature activation more quickly than activation-ranked patches in insertion tests. The evidence supports attribution as a more faithful patch-ranking method in the studied model, but the paper relies partly on subjective feature annotation and does not report exact insertion AUC values in the supplied text.

## Research Question

When self-attention mixes information across image patches, can input attribution identify the visual evidence that causes a vision-SAE feature to activate more faithfully than the feature's activation location alone?

## Motivation

Vision-SAE features are commonly labeled from their most activating images or patches. This assumes that an activation is spatially localized and that its location contains the evidence responsible for it. In a Vision Transformer, however, self-attention can move contextual information across tokens. A feature may therefore activate strongly at a background patch while depending on an object elsewhere in the image, making activation maps correlational evidence rather than a reliable account of what drove the feature.

## Contributions

- Defines an input-space effective receptive field (ERF) for an individual SAE feature activation as an attribution score over image patches.
- Introduces CaFE, which backpropagates relevance from a target SAE neuron through the SAE encoder and vision transformer, using Attention-LRP as the main attribution method.
- Compares Attention-LRP with Integrated Gradients, KernelSHAP, and raw gradients through a common ERF interface.
- Uses patch-insertion experiments to test whether attribution-ranked patches recover feature activation faster than patches ranked by SAE activation.
- Documents non-local visual SAE features whose activation locations diverge from the image regions that attribution identifies as their drivers, and reports that these features become more frequent in later transformer layers.

## Method

The study trains a Matryoshka SAE at each layer of CLIP-ViT-L/14 on patch embeddings from ImageNet-1K. For a target feature $k$ and image $I$, it treats the feature activation $z_k(I)$ as the scalar output to explain. An attribution method assigns each input patch $p$ a score $A(p\mid z_k,I)$; the resulting patch-score map is called the feature's effective receptive field.

The main CaFE implementation propagates relevance backward from the target SAE neuron through the encoder and then through the transformer with Attention-LRP. Integrated Gradients, KernelSHAP, and ordinary gradients provide alternative attribution maps. This use of "effective receptive field" concerns the image patches contributing to a particular activation, rather than the region of activation space on which an SAE encoder neuron is active.

For causal-fidelity evaluation, an insertion test begins with a blank image and restores original patches in descending order of estimated importance. The method tracks the target feature's activation as patches are inserted and summarizes recovery with area under the insertion curve. CaFE rankings are compared with a baseline that ranks patches by their local SAE activation magnitude.

## Experiments

The experiments use CLIP-ViT-L/14 and layer-specific Matryoshka SAEs trained on $5\times10^8$ ImageNet-1K training patches, with reconstruction and sparsity hyperparameters held fixed across layers. The supplied paper text does not state the SAE width, optimization details, sample size for insertion evaluation, or exact AUC values.

Across layers, ERF-guided insertion recovers feature activation faster than activation-based ranking. Attention-LRP performs best among the tested attribution methods, including Integrated Gradients, KernelSHAP, and gradients. The paper also reports a smaller improvement for conventionally localized features, suggesting that attribution can refine patch selection even when activation and causal evidence broadly coincide. These comparisons are presented graphically rather than with numerical results in the supplied text.

Qualitative examples show that a feature's highest activation can be spatially separated from its attributed evidence. A "Despair" feature activates on a background-floor token while its ERF emphasizes spilled pills together with a frowning face. Other examples suggest compositional dependencies, such as a "roaring face" feature requiring eyes and a nose rather than merely an open mouth.

The authors manually inspect the first 100 SAE features at each layer and mark features whose top-activation patches are spatially inconsistent with their ERFs. They report few non-local features before layer 9, all associated with the class token, followed by a sharp increase in later layers and a peak of approximately 14% at layer 22. Later non-local features are described as more abstract and compositional, consistent with progressively mixed global context.

## Limitations

- Computing a feature-level ERF requires forward and backward passes, which makes broad analysis expensive for deep models and large SAE dictionaries.
- The non-local-feature count is based on manual review and therefore depends on subjective judgments; the paper does not provide an automated criterion or annotation-reliability analysis.
- The reported evaluation is limited to CLIP-ViT-L/14 and ImageNet-1K-trained SAEs, so the layerwise pattern may not generalize to other architectures, datasets, SAE variants, or modalities.
- Insertion tests measure activation recovery under synthetic blank-and-patched inputs. They support the relative quality of the patch rankings but do not by themselves prove a complete causal explanation under natural-image interventions.
- The supplied text reports insertion results only in figures and qualitative terms, without exact AUC values, uncertainty estimates, or enough protocol detail to assess statistical reliability.
- Attribution methods can differ in assumptions and faithfulness. Attention-LRP's stronger insertion performance in this setting does not establish that its maps uniquely identify the causal mechanism.
- The supplied Markdown gives no publication year or stable paper identifier; neither is inferred here.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]: provide the sparse visual features whose individual activations CaFE explains.
- Vision Transformers: self-attention creates the non-local information flow that can separate a feature's activation site from its input evidence.
- Feature attribution: CaFE applies input-attribution methods to an internal SAE neuron rather than directly to a class prediction.
- Layer-wise relevance propagation: Attention-LRP is the paper's primary mechanism for distributing a target feature's relevance through transformer attention.
- Insertion and deletion evaluation: patch insertion tests whether an explanation's highest-ranked evidence restores the target activation efficiently.

## Related Papers

- Achtibat et al. (2024), "AttnLRP: Attention-Aware Layer-Wise Relevance Propagation for Transformers": supplies the primary transformer-attribution method used by CaFE.
- Sundararajan, Taly, and Yan (2017), "Axiomatic Attribution for Deep Networks": introduces Integrated Gradients, one of the compared attribution methods.
- Lundberg and Lee (2017), "A Unified Approach to Interpreting Model Predictions": introduces SHAP; the paper compares KernelSHAP with the other ERF estimators.
- Samek et al. (2016), "Evaluating the Visualization of What a Deep Neural Network Has Learned": provides precedent for perturbation-based explanation evaluation.
- [[papers/discovering-sparse-concept-graphs-for-mechanistic-interpretability-in-vision-transformers|Discovering Sparse Concept Graphs for Mechanistic Interpretability in Vision Transformers]]: evaluates relationships among visual SAE features with insertion and deletion interventions, while CaFE attributes one feature activation to input patches.
- [[papers/analyzing-hierarchical-structure-in-vision-models-with-sparse-autoencoders|Analyzing Hierarchical Structure in Vision Models with Sparse Autoencoders]]: uses relevancy maps to inspect vision-SAE features but focuses on taxonomic structure rather than activation-location mismatch.
- [[papers/interpretable-and-steerable-concept-bottleneck-sparse-autoencoders|Interpretable and Steerable Concept Bottleneck Sparse Autoencoders]]: distinguishes readable SAE features from features that causally steer downstream behavior.

[[index|Library home]]
