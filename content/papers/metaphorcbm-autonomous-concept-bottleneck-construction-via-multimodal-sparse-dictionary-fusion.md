---
title: "MetaphorCBM: Autonomous Concept Bottleneck Construction via Multimodal Sparse Dictionary Fusion"
type: paper
authors:
  - Boxuan Zhu
  - Qiao Yuan
  - Weizhi Huang
  - Martin Gairing
  - Yushan Pan
  - Sheng-Uei Guan
  - Wei Wang
year: null
repository: "https://github.com/JulienInWired/metaphorCBM-code"
tags:
  - concept-bottleneck-models
  - sparse-autoencoders
  - multimodal-learning
  - optimal-transport
  - interpretable-machine-learning
---

## TL;DR

MetaphorCBM constructs an image-classification concept bottleneck from target-domain image and text corpora without expert concept labels, an external concept vocabulary, LLM-generated knowledge, or CLIP's joint embedding geometry. It learns separate visual and textual sparse dictionaries, fuses their bases with alternating local and global structured optimal-transport couplings, and uses the resulting image-side sparse activations for prediction while textual bases supply natural-language semantics. Across two frozen CLIP image backbones and four datasets, it reports the strongest top-1 accuracy among the compared concept bottleneck methods, while remaining close to a black-box linear probe.

## Research Question

Can a model autonomously construct a domain-grounded, human-readable concept bottleneck by aligning independently learned visual and textual sparse dictionaries, while retaining enough predictive information for downstream classification?

## Motivation

Existing [[Concept Bottleneck Models]] commonly depend on expert annotations, predefined vocabularies, LLM-generated descriptions, or a pretrained vision-language joint space. Those priors can be expensive, incomplete, or poorly matched to specialized domains. Paired image and text data offer complementary evidence, but their representations occupy different spaces and may contain unequal semantic mass. The paper therefore treats concept construction as cross-modal information fusion rather than vocabulary selection or direct embedding similarity.

## Contributions

- Frames autonomous concept-bottleneck construction as fusion of visual and textual sparse dictionaries learned independently from target-domain data.
- Introduces alternating sample-conditioned local and dictionary-level global coupling based on unbalanced structured [[Optimal Transport]] and [[Gromov-Wasserstein Distance]].
- Adds usage-entropy regularization during dictionary induction and bidirectional anti-hubness feedback during fusion to prevent a few bases from dominating activation or correspondence mass.
- Uses concept-wise position-aware aggregation to retain spatial activation patterns without mixing concept channels before classification.
- Demonstrates general-domain concepts on MS-COCO and fine-grained bird concepts on CUB-200-2011, with visual MaxActs, textual MaxActs, spatial maps, and class-conditional contribution scores as interpretation evidence.

## Method

### Concept-basis induction

The first stage trains separate overcomplete top-k [[Sparse Autoencoders]] on local image features and token-level text features. Each decoder atom is treated as a modality-specific concept basis. A usage-entropy regularizer discourages sparse activations from repeatedly selecting only a small subset of bases. The full image and text collections are used for dictionary learning; only a smaller paired image-text subset is required for later coupling.

### Multimodal dictionary fusion

For each paired sample, active visual and textual bases define local supports. A sample-conditioned unbalanced coupling combines within-modality relational geometry, weak cross-modal activation-signature evidence, usage-aware marginal penalties, and a prior derived from the current global coupling. The normalized local couplings are aggregated, then a global coupling over both complete dictionaries is updated using a Gromov-Wasserstein term, local-consistency and marginal terms, anti-hubness penalties, and the same weak unary evidence.

Local and global updates alternate. After each global update, bases receiving more correspondence mass than their usage-aware targets are downweighted in subsequent local priors. The final soft coupling permits one-to-many and many-to-one alignments: visual bases retain predictive and spatial evidence, while coupled textual bases provide natural-language descriptions.

### Downstream prediction

The frozen visual backbone and image-side SAE produce a spatial activation map for each visual concept. A shared lightweight convolutional aggregator processes each concept map independently, after which the resulting concept features are concatenated and passed to a linear classifier. Class-specific classifier weights reduce each concept's output to a scalar contribution for an instance and target class.

## Experiments

The evaluation uses frozen CLIP-RN50 and CLIP ViT-B/16 image backbones. Dictionary induction and qualitative analysis use MS-COCO, ImageNet, and CUB-200-2011; predictive evaluation covers CIFAR-10, CIFAR-100, CUB-200-2011, and ImageNet. The construction does not use CLIP text embeddings or CLIP image-text distances.

With CLIP-RN50, MetaphorCBM reports 88.58%, 70.06%, 66.59%, and 72.69% top-1 accuracy on CIFAR-10, CIFAR-100, CUB-200-2011, and ImageNet. With CLIP ViT-B/16, the corresponding results are 95.98%, 82.39%, 79.84%, and 79.24%. These are the best results among the compared CBMs in each reported column, though the black-box linear probe remains higher on CUB and ImageNet and is slightly lower on both CIFAR datasets.

Few-shot [[Linear Probing]] finds that bottleneck features outperform the original frozen features from 2 to 16 shots on MS-COCO, CIFAR-10, and CIFAR-100, while remaining close on CUB-200 and Tiny-ImageNet. The paper interprets this as improved sample efficiency on simpler tasks and substantial, but not complete, preservation of fine-grained information on harder ones.

The stage-wise ablations support the proposed mechanisms. On CUB with ViT-B/16, usage-entropy regularization raises relative active-basis coverage from 6.0% to 42.1% while reducing reconstruction loss from 0.1584 to 0.1532. With RN50, coverage rises from 20.6% to 78.2% at the strongest tested weight, but reconstruction loss worsens from 0.2660 to 0.3150. Dual anti-hubness reduces the top-1% visual coupling mass from 66.2% to 3.5% and raises the entropy-effective visual-basis rate from 1.1% to 85.2%. On ImageNet with RN50, the best position-aware aggregator reaches 72.692%, 0.768 percentage points above hand-designed aggregation.

## Limitations

The experiments are limited to image classification and paired image-text data; extensions to video, audio, and structured prediction are proposed but not evaluated. Dictionary coupling still requires a task-relevant paired subset, and the paper leaves better use of weakly paired or unpaired data to future work. The strongest usage-entropy setting can degrade reconstruction, and bottleneck features trail dense features on the more specialized or large-scale CUB and ImageNet tasks. Interpretability evidence is primarily qualitative concept inspection plus coupling-distribution diagnostics; the study does not report human evaluation of concept names, intervention experiments, or causal-faithfulness tests. Although the method avoids CLIP's joint image-text geometry, its evaluated visual features still come from frozen CLIP image encoders.

## Related Concepts

- [[Concept Bottleneck Models]]
- [[Sparse Autoencoders]]
- [[Optimal Transport]]
- [[Gromov-Wasserstein Distance]]
- [[Linear Probing]]
- [[Disentangled Representations]]
- Multimodal representation learning
- Dictionary learning

## Related Papers

- [[Learning Concept Bottleneck Models from Mechanistic Explanations]]
- [[V2C-CBM: Building Concept Bottlenecks with Vision-to-Concept Tokenizer]]
- [[Zero-shot Concept Bottleneck Models]]
- [[Interpretable and Steerable Concept Bottleneck Sparse Autoencoders]]
- Koh et al. (2020), "Concept Bottleneck Models."
- Oikarinen et al. (2023), "Label-Free Concept Bottleneck Models."
- Yuksekgonul, Wang, and Zou (2023), "Post-hoc Concept Bottleneck Models."
- Rao et al. (2024), "Discover-then-Name: Task-Agnostic Concept Bottlenecks via Automated Concept Discovery."

[[index|Library home]]
