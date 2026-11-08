---
title: "Text-Conditional JEPA for Learning Semantically Rich Visual Representations"
type: paper
authors:
  - Chen Huang
  - Xianhang Li
  - Vimal Thilak
  - Etai Littwin
  - Josh Susskind
year: null
source_job_id: "e1c619b6-15f0-477c-ac27-bc467efd929e"
tags:
  - self-supervised-learning
  - representation-learning
  - vision-language-learning
  - masked-image-modeling
---

## TL;DR

Text-Conditional JEPA (TC-JEPA) conditions an I-JEPA predictor on image captions so that text can reduce ambiguity when predicting masked patch features. Sparse, cross-layer-consistent patch-word attention produces stronger frozen visual representations than the paper's I-JEPA and contrastive baselines, especially for detection and segmentation. The evidence covers ImageNet and image-text pretraining, several model sizes, and multimodal transfer, but relies on synthetic captions during pretraining and does not isolate the effects of caption-model bias.

## Research Question

Can fine-grained caption conditioning reduce uncertainty in masked latent feature prediction and thereby improve the semantic content, stability, and scalability of visual representations without using a contrastive image-text objective?

## Motivation

An image-based [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architecture]] predicts the latent features of masked patches from visible context. When several hidden contents are plausible, the context may contain too little information to select the actual target, making training sensitive to the masking strategy or encouraging weak semantics. Captions can describe objects, composition, and spatial relationships that are absent from the visible patches. TC-JEPA uses this information only during pretraining; its visual encoder runs without text at inference time.

## Contributions

- Introduces text-conditioned masked feature prediction as a non-contrastive vision-language pretraining objective.
- Adds lightweight cross-attention from predicted patch features to word tokens at multiple predictor layers, learning patch-word correspondences without grounding annotations.
- Regularizes those correspondences with sparsity and cross-layer consistency losses and combines information from multiple captions by layer-wise max pooling.
- Evaluates classification, object detection, semantic segmentation, captioning, and visual question answering across ImageNet and image-text pretraining regimes.
- Reports improved robustness to masking-block scales and favorable scaling with model and data size relative to I-JEPA.

## Method

TC-JEPA retains the I-JEPA context encoder, exponential-moving-average target encoder, masked target blocks, and latent feature-prediction loss. A frozen T5 text encoder maps each caption to word embeddings. At multiple layers of the narrow predictor, every context or target patch feature queries the word sequence through residual cross-attention. This makes conditioning patch-specific rather than appending text only at the predictor input.

The model rectifies patch-word cosine similarities and applies two auxiliary penalties. An L1 sparsity loss encourages each patch to select a small set of relevant words, while a consistency loss keeps those selections similar across predictor layers. With multiple captions, each caption independently conditions the patch features and max pooling fuses them at every layer. The full objective combines latent prediction with the two regularizers, using reported coefficients $\lambda=0.1$ and $\beta=0.5$. The default configuration samples up to eight captions per image.

For ImageNet pretraining, ShareGPT4V supplies synthetic captions for IN-1k and IN-21k. The paper evaluates ViT-B/16, ViT-L/16, and ViT-H/14 encoders. Larger-scale image-text experiments train on YFCC15M or CC12M plus YFCC15M, mixing original and synthetic captions. The text encoder, predictor, and conditioner are discarded after pretraining.

## Experiments

**ImageNet pretraining.** On IN-1k linear probing, TC-JEPA reaches 75.8, 79.6, and 80.4 top-1 accuracy with ViT-B/16, ViT-L/16, and ViT-H/14, compared with 72.9, 77.5, and 79.3 for I-JEPA. With ViT-H/14 it also improves over I-JEPA on COCO detection (55.2 versus 53.7 AP) and ADE20K linear segmentation (39.5 versus 36.9 mIoU). On IN-21k with ViT-L/16, it reports 82.1 ImageNet linear accuracy and 41.2 ADE20K linear mIoU.

**Image-text pretraining.** With ViT-B/16 trained on YFCC15M, TC-JEPA reports 77.1 ImageNet linear accuracy, 54.5 COCO detection AP, and 55.2 ADE20K fine-tuned mIoU. The matched table gives CLIP 66.5, 43.6, and 47.8 and SPARC 73.4, 52.0, and 52.3. On CC27M, the ViT-L/14 configuration reaches 81.9, 58.0, and 58.8 on the same measures. With a frozen YFCC15M-pretrained ViT-B/16 feeding a common autoregressive decoder, TC-JEPA scores 111.6 CIDEr on COCO captioning, 46.3 accuracy on GQA, and 57.8 on VQAv2, exceeding the reported CLIP and SPARC baselines.

**Ablations.** Removing sparsity and consistency regularization substantially reduces classification and segmentation performance; sparsity accounts for the larger recovery. Conditioning multiple predictor layers outperforms one-layer conditioning, and word-level conditioning outperforms methods using holistic caption embeddings, particularly on segmentation. Max pooling is selected over average pooling because it performs better overall and avoids the parameters of attention pooling. Performance saturates near eight captions. Across the tested masking-block scales, TC-JEPA is less sensitive than I-JEPA, and the reported coefficient sweep remains stable when both auxiliary-loss weights are multiplied by values from 0.5 to 2.5.

## Limitations

- Captions provide additional weak supervision, so comparisons with image-only self-supervised methods do not isolate the objective from the extra information available during pretraining.
- Synthetic captions can contain hallucinations and inherit biases from the caption generator. Attention may filter irrelevant tokens, but the experiments do not establish that it removes systematic bias; the paper explicitly notes possible unfair downstream outcomes.
- Caption generation is an additional data-preparation cost not included in the predictor-overhead discussion.
- The strongest comparisons span different datasets, architectures, and training scales. Matched comparisons are available for several baselines, but broad state-of-the-art claims are not controlled experiments against every listed model.
- The downstream evidence is limited to the reported classification, dense prediction, captioning, and VQA protocols. It does not establish benefits for retrieval, open-vocabulary grounding, or all multimodal tasks.
- The supplied Markdown provides no publication year, venue, or stable identifier, so those metadata remain unasserted.

## Related Concepts

- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]
- [[concepts/linear-probing|Linear Probing]]

## Related Papers

- Assran et al. (2023), "Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture": supplies the I-JEPA baseline and masked latent-prediction framework.
- Bar et al. (2024), "Stochastic Positional Embeddings Improve Masked Image Modeling": addresses masked-position uncertainty without adding caption information and serves as the StoP baseline.
- Bica et al. (2024), "Improving Fine-Grained Understanding in Image-Text Pre-Training": provides the SPARC fine-grained contrastive baseline.
- Zheng et al. (2024), "DreamLIP: Language-Image Pre-Training with Long Captions": motivates the synthetic-caption pipeline and provides a multi-caption contrastive comparison.
- [[papers/levljepa-end-to-end-vision-language-pretraining-without-negatives|LeVLJEPA: End-to-End Vision-Language Pretraining Without Negatives]] is another non-contrastive vision-language JEPA, but predicts across modalities and regularizes embedding distributions rather than conditioning masked image-feature prediction on words.

[[index|Library home]]
