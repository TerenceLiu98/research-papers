---
title: "CLIP-Free, Label Free, Unsupervised Concept Bottleneck Models"
type: paper
authors:
  - Fawaz Sammani
  - Jonas Fischer
  - Nikos Deligiannis
year: null
tags:
  - concept-bottleneck-models
  - interpretable-machine-learning
  - knowledge-distillation
  - vision-language-alignment
  - zero-shot-image-captioning
---

## TL;DR

This paper introduces TextUnlock, a lightweight projection that maps a frozen image classifier's features into a text-embedding space while matching the classifier's original output distribution. The resulting U-F2-CBM discovers concepts from text embeddings and derives concept-to-class weights without image-concept annotations, CLIP supervision, or a trained linear probe. Across more than 40 visual classifiers, the reported models retain nearly all original ImageNet accuracy and outperform the compared supervised CLIP-based concept bottleneck models.

## Research Question

Can an existing visual classifier be converted into an interpretable [[Concept Bottleneck Models|concept bottleneck model]] without CLIP, image-concept labels, or supervised training of the concept-to-class predictor, while preserving the classifier's original decision distribution?

## Motivation

Modern label-free concept bottleneck models commonly use CLIP or another vision-language model to supply image-concept similarity targets. This makes explanations depend on the external model's embedding space and can transfer its biases to the classifier being interpreted. Manual concept annotation is costly, while retraining a specialist classifier on image-text data can alter the behavior that the explanation is meant to expose. The paper therefore seeks a post-hoc route from a frozen classifier to a text-queryable concept space that retains the classifier's predictions.

## Contributions

- Introduces TextUnlock, which trains only a multilayer perceptron to project frozen visual features into the space of a frozen text encoder.
- Uses the original classifier's soft class distribution as the target, requiring neither image labels nor image-concept annotations.
- Constructs U-F2-CBM concept activations by comparing projected image features with a text-encoded concept bank.
- Derives concept-to-class weights directly from concept and class-name embeddings, avoiding a supervised linear probe.
- Evaluates the approach on more than 40 convolutional, transformer, and hybrid classifiers, along with concept interventions, ablations, additional datasets, and zero-shot image captioning.

## Method

### TextUnlock

Let a frozen visual encoder produce an image feature $f$ and let its original linear head produce a class distribution $o$. A trainable MLP maps $f$ to a vector $\tilde{f}$ in the space of a frozen text encoder. The text encoder embeds prompts formed only from the classifier's class names; stacking those embeddings yields a class matrix $U$. Cosine similarities $\tilde{f}U^T$ define the projected classifier's logits.

The MLP is trained with cross-entropy against the original soft distribution $o$. This is a form of [[Knowledge Distillation|distribution matching]], but the objective is not to compress a larger teacher. It aligns two formulations of the same frozen classifier so that the text-space version retains the original class relationships and decision behavior. The visual encoder, original classification head, and text encoder remain frozen.

### U-F2-CBM

The method encodes a filtered bank of 20,000 common English words into a concept matrix $C$. For an image, $\tilde{f}C^T$ gives concept activations. Rather than fitting a concept-to-class probe, the method computes its weights as $CU^T$, the text-space similarity between concepts and class prompts. The complete class score is therefore

$$
(\tilde{f}C^T)(CU^T) = \tilde{f}(C^TC)U^T.
$$

This formulation inserts the concept Gram matrix between the projected feature and the text-derived classifier. Because all components are frozen after TextUnlock training, a different concept bank can be substituted at inference time. The paper filters target class names, constituent words, synonyms, parent categories, and related species from the evaluation bank to reduce direct label leakage.

### Zero-shot captioning

The shared image-text space also supports captioning. The paper adapts ZeroCap by prefix-tuning a frozen GPT-2 decoder separately for each test image so that candidate sentences align with the projected visual feature. A second compositional variant detects concepts and verbs and asks a language model to combine them in the style of COCO captions.

## Experiments

On ImageNet-1K, TextUnlock is applied to more than 40 pretrained classifiers spanning ResNets, DenseNets, EfficientNets, ConvNeXts, Vision Transformers, Swin Transformers, BEiT, DINOv2, and other architectures. For the 17 main-table models, the transformed classifier differs from its original top-1 accuracy by roughly 0.2 percentage points on average. The reported U-F2-CBM top-1 results include 73.9% for ResNet-50, 83.2% for ViT-B/16v2, 83.0% for BEiT-B/16, and 86.4% for ConvNeXtV2-B pretrained on ImageNet-21K and evaluated at 384-pixel resolution. The last result exceeds the strongest listed supervised CLIP-based CBM result, 79.5%, although the compared methods use different backbones and training regimes.

On other datasets, reported U-F2-CBM accuracies reach 53.42% on Places365 with DenseNet-161, 94.22% on EuroSAT with ResNet-50, and 68.88% on DTD with ResNet-50. These results exceed the listed supervised CLIP-based baselines for the corresponding datasets.

Concept interventions behave in the expected direction. On the Waterbirds setup, removing bird concepts reduces accuracy by 8.57 to 12.86 points across the five reported models, while suppressing non-bird concepts increases it by 4.28 to 6.43 points. In a ten-class ImageNet subset, removing five class-related concepts lowers accuracy by about 20 points. Mean, random, shuffled, and random-weight MLP ablations reduce ImageNet accuracy to at most 1.87%, supporting the claim that the learned projection is not a trivial constant mapping.

For zero-shot COCO captioning, the best non-compositional model reports CIDEr 17.9 and SPICE 6.9, compared with 14.6 and 5.5 for ZeroCap. Its BLEU-4 and METEOR scores remain below ZeroCap, while the compositional variant raises those overlap-based metrics and reaches CIDEr 18.7 and SPICE 7.2.

## Limitations

The concept-to-class mapping inherits semantic ambiguities from the text encoder. The paper reports polysemy failures such as the bird class "drake" activating concepts associated with the musician, and "African grey" producing geography and color associations unrelated to the bird. The authors report that such terms contribute little to the total logit and occur less often with an ImageNet-specific concept bank, but they remain an explanation-quality and ethical concern.

The approach is label-free with respect to annotations, not data-free: TextUnlock is trained on images from the classifier's domain, and most experiments use ImageNet training images. Its faithfulness claim is based on output-distribution preservation, accuracy, interventions, and agreement measures; these do not guarantee that every textual concept is a causal or complete account of the original representation. Comparisons with CLIP-based CBMs also span different backbones, parameter counts, and pretraining data, so headline accuracy gaps do not isolate the effect of the bottleneck construction alone. Captioning additionally requires per-image test-time optimization, and the compositional variant depends on an external language model.

## Related Concepts

- [[Concept Bottleneck Models]]
- [[concepts/zero-shot-concept-bottleneck-models|Zero-shot Concept Bottleneck Models]]
- [[Knowledge Distillation]]
- [[Text Embedding Models]]
- [[Model Steerability]]
- Vision-language alignment
- Zero-shot image captioning

## Related Papers

- [[Zero-shot Concept Bottleneck Models]]
- [[V2C-CBM: Building Concept Bottlenecks with Vision-to-Concept Tokenizer]]
- [[Concepts from Representations: Post-hoc Concept Bottleneck Models via Sparse Decomposition of Visual Representations]]
- Oikarinen, Das, Nguyen, and Weng (2023), "Label-Free Concept Bottleneck Models."
- Yuksekgonul, Wang, and Zou (2023), "Post-hoc Concept Bottleneck Models."
- Moayeri, Rezaei, Sanjabi, and Feizi (2023), "Text-to-Concept (and Back) via Cross-Model Alignment."
- Tewel, Shalev, Schwartz, and Wolf (2022), "ZeroCap: Zero-Shot Image-to-Text Generation for Visual-Semantic Arithmetic."

[[index|Library home]]
