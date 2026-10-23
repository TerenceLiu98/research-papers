---
title: "Frozen Transformers in Language Models Are Effective Visual Encoder Layers"
type: paper
authors:
  - Ziqi Pang
  - Ziyang Xie
  - Yunze Man
  - Yu-Xiong Wang
year: null
repository: "https://github.com/ziqipang/LM4VisualEncoding"
tags:
  - visual-representation-learning
  - large-language-models
  - transformers
  - multimodal-learning
  - transfer-learning
---

## TL;DR

A frozen transformer block taken from a text-only LLM can serve as an additional visual encoder layer: trainable linear projections map visual tokens into and out of the block, while the visual backbone and task head train normally. Across image, point-cloud, video, motion-forecasting, retrieval, and visual-question-answering experiments, this design usually improves matched baselines. The gains depend on model scale, layer choice, and placement, and the proposed information-filtering explanation remains an empirically motivated hypothesis rather than a complete mechanism.

## Research Question

Can a pretrained text-only LLM transformer block improve visual representation learning when it directly processes visual tokens without language prompts, language inputs, tokenized outputs, or an intact language model?

## Motivation

Most uses of LLMs in computer vision treat the language model as a decoder or combine visual and linguistic inputs inside a vision-language system. This paper instead asks whether a single pretrained language-model block contains useful computation that transfers across modalities. The question separates the value of transformer computation learned at scale from the language interface and from full-model generation.

## Contributions

- Introduces [[concepts/frozen-language-model-blocks-as-modality-encoders|Frozen Language-Model Blocks as Modality Encoders]], a small architectural modification that inserts a frozen LLM block after a task encoder and surrounds it with trainable dimension-matching projections.
- Tests the same principle across 2D images, 3D point clouds, videos, motion trajectories, image-text retrieval, and 2D and 3D visual question answering.
- Shows through capacity-matched MLP and randomly initialized transformer controls that parameter count alone does not account for the reported gains.
- Proposes an information-filtering hypothesis: training the surrounding network to cooperate with the frozen block makes informative tokens contribute more strongly to downstream representations.

## Method

Given an encoder $F_E$, decoder $F_D$, and a pretrained language-model block $F_{LM}$, the method computes

$$
F_E(x) \rightarrow z, \qquad F_L^2(F_{LM}(F_L^1(z))) \rightarrow z', \qquad F_D(z') \rightarrow y.
$$

The two linear maps $F_L^1$ and $F_L^2$ reconcile the visual and language-model hidden dimensions. The LLM block remains frozen; the adapters, original encoder, and decoder are optimized for the target task. For visual inputs, the block omits autoregressive masking and the LLM's positional embeddings, retaining only padding masks where needed. The default implementation uses the last block of LLaMA-7B after the visual encoder, although the study also tests OPT blocks, other depths, insertion positions, and two-block variants.

The proposed information-filtering account distinguishes feature activation from attention weights. The authors report that feature magnitudes or frequency-domain activations become more concentrated on task-relevant tokens after training with the frozen block, even when attention maps remain noisy. They interpret this as selection and amplification of useful visual tokens rather than improved attention localization alone.

## Experiments

For ImageNet classification, adding the LLaMA block raises top-1 accuracy from 72.1% to 73.2% for ViT-T, 80.1% to 80.7% for ViT-S, and 80.6% to 81.7% for ViT-B. The same models improve on ImageNet-C, ImageNet-A, ImageNet-SK, and ImageNet-R. On ViT-S, a capacity-matched MLP reaches 80.4%, while fine-tuning the LLaMA block reaches 78.9%, below both the frozen-block model and the 80.1% baseline.

On ScanObjectNN, Point-BERT with the frozen block improves all three reported splits: 87.4% to 88.0% on BG, 88.1% to 88.5% on OBJ, and 83.1% to 83.8% on T50. ModelNet40 is mixed: accuracy falls slightly at 1k and 4k points and rises from 93.19% to 93.56% at 8k points. On Something-Something-v2, top-1 accuracy rises from 64.71% to 65.89% for ViT-S and from 64.97% to 66.03% for ViT-B.

The Argoverse motion-forecasting gains are smaller: VectorNet improves from 0.77/1.23/13.2 to 0.76/1.20/12.7 on ADE/FDE/MR, and mmTransformer from 0.72/1.10/10.7 to 0.71/1.08/10.5. For METER, VQAv2 overall accuracy increases from 69.60% to 70.23%, while Flickr30k image-retrieval recall rises from 49.66/80.86/89.48 to 50.22/82.26/90.08 at ranks 1/5/10. On SQA3D, EM@1 and EM@10 rise from 47.20/86.82 to 48.09/89.03.

Ablations establish boundary conditions. OPT-125M and OPT-350M blocks reduce ViT-S accuracy to 71.63% and 71.56% in the 100-epoch setting, while blocks from OPT-1.3B through OPT-6.7B exceed the 75.25% baseline. Tail insertion performs better than middle or head insertion, and two tail blocks reach 77.10% versus 75.84% for one block in that ablation. Different LLaMA and OPT layers also produce materially different results.

The mechanism analysis compares pseudo-masks derived from feature activation and attention against ImageNet-S segmentation masks. The reported activation masks align better than attention-derived masks and improve over the corresponding ViT features. Qualitative examples for action recognition, point clouds, and 2D/3D VQA show similar concentration on relevant regions or frames.

## Limitations

The study emphasizes breadth and matched comparisons rather than state-of-the-art systems, and several baselines use less compute than their original implementations. Improvements are not universal: low-density ModelNet40 results decline, motion-forecasting gains are modest, small OPT blocks hurt performance, early insertion is poor, and end-to-end fine-tuning can overfit. The largest default block also adds substantial frozen inference cost even though it adds few trainable parameters.

The information-filtering hypothesis is supported by activation visualizations and a segmentation-overlap proxy, but it does not isolate the roles of individual sublayers or explain how training makes the surrounding visual network cooperate with a frozen language block. Per-image threshold selection maximizes the pseudo-mask IoU over a fixed grid, so the analysis measures available localization signal rather than a directly deployable segmentation procedure. Evidence is confined to the evaluated architectures and tasks.

## Related Concepts

- [[concepts/frozen-language-model-blocks-as-modality-encoders|Frozen Language-Model Blocks as Modality Encoders]]
- [[concepts/semantic-associations-in-transformers|Semantic Associations in Transformers]]
- [[concepts/early-fusion-vision-language-models|Early Fusion Vision-Language Models]]

## Related Papers

- Touvron et al. (2023), "LLaMA: Open and Efficient Foundation Language Models": supplies the default pretrained transformer block.
- Zhang et al. (2022), "OPT: Open Pre-trained Transformer Language Models": supplies the scale and layer-depth ablations.
- Dosovitskiy et al. (2021), "An Image Is Worth 16x16 Words": provides the image-token backbone used in the main classification experiments.
- Dou et al. (2022), "An Empirical Study of Training End-to-End Vision-and-Language Transformers": provides the METER baseline for VQA and retrieval.
- Schwettmann, Chowdhury, and Torralba (2023), "Multimodal Neurons in Pretrained Text-Only Transformers": studies visual concepts represented within text-only transformers.

[[index|Library home]]
