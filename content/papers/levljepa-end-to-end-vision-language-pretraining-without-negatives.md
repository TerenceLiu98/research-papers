---
title: "LeVLJEPA: End-to-End Vision-Language Pretraining Without Negatives"
type: paper
authors:
  - Lukas Kuhn
  - Giuseppe Serra
  - Randall Balestriero
  - Florian Buettner
year: null
source_job_id: "1bbc554f-1c3c-426b-ba60-d87a134f8711"
tags:
  - vision-language-learning
  - self-supervised-learning
  - representation-learning
  - non-contrastive-learning
---

## TL;DR

LeVLJEPA replaces contrastive image-text discrimination with bidirectional cross-modal prediction: image and text encoders predict each other's detached embeddings, while SIGReg independently pushes each modality's marginal embedding distribution toward an isotropic Gaussian. Under matched ViT-B/16 training, it trails CLIP and SigLIP on large-scale zero-shot classification but is comparable on global linear probes and stronger on frozen patch-token evaluations. It improves linear semantic segmentation by at least 2.08 mIoU and is the best frozen visual backbone across GQA, VQAv2, and POPE with two language models. The evidence supports stronger dense features at the tested scale, not parity in zero-shot alignment or established scaling beyond ViT-B/16 and roughly 92 million downloadable DataComp-L pairs.

## Research Question

Can an end-to-end vision-language encoder learn useful cross-modal and dense visual representations without negative pairs, a temperature, a momentum encoder, or a teacher-student schedule?

## Motivation

CLIP-style objectives directly supervise pooled image-text similarity, yet many downstream systems consume the complete grid of visual patch tokens. Visual question answering, semantic segmentation, and language-conditioned control therefore depend on dense features that standard zero-shot evaluation does not measure. The paper asks whether a non-contrastive [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architecture]] can preserve more useful token-level structure while retaining competitive global visual features.

## Contributions

- Introduces a fully non-contrastive end-to-end image-text pretraining objective based on matched-pair prediction, stop-gradient targets, and per-modality Sketched Isotropic Gaussian Regularization (SIGReg).
- Shows through ablations that symmetric image-text MSE collapses, SIGReg alone does not make that alignment useful, and predictors without SIGReg remain weak; the full combination is required in the tested setup.
- Compares LeVLJEPA with InfoNCE and SigLIP under matched ViT-B/16 backbones, data, samples seen, and evaluation protocols at CC12M and DataComp-L scales.
- Separates pooled-feature evaluation from patch-token evaluation, finding comparable global linear-probe performance but stronger semantic segmentation and frozen-backbone VLM performance for LeVLJEPA.
- Reports approximate invariance to batch sizes 1,024-4,096 on CC12M, in contrast to CLIP's improvement with larger batches under matched compute.

## Method

Image and text encoders produce embeddings $z_i^v$ and $z_i^t$. Separate predictors map each modality toward the other, and the target branch is detached:

$$
\mathcal L_{\mathrm{cross}}=\frac{1}{B}\sum_{i=1}^{B}\left[\lVert h_v(z_i^v)-\operatorname{sg}(z_i^t)\rVert_2^2+\lVert h_t(z_i^t)-\operatorname{sg}(z_i^v)\rVert_2^2\right].
$$

The full objective is

$$
\mathcal L_{\mathrm{LeVLJEPA}}=(1-\lambda_v-\lambda_t)\mathcal L_{\mathrm{cross}}+\lambda_v\operatorname{SIGReg}(Z^v)+\lambda_t\operatorname{SIGReg}(Z^t).
$$

Stop-gradient prevents each encoder from chasing a jointly moving symmetric target, the predictors absorb modality-specific differences, and SIGReg discourages collapse by matching random one-dimensional projections of each modality's embeddings to a standard Gaussian. Training uses a ViT-B/16 image encoder, a GPT-2 text encoder, one-layer projection heads, and separate depth-4, width-2,048 cross-modal MLPs. The reported configuration sets $\lambda_v=\lambda_t=0.01$, uses 10% predictor dropout, and trains with a global batch size of 4,096 on 16 GPUs.

## Experiments

Hyperparameters and ablations use CC12M; the selected configuration is transferred without additional method-specific tuning to the surviving DataComp-L pool of roughly 92 million image-caption pairs. DataComp-L runs see 819 million samples. Contrastive baselines use established OpenCLIP settings, and every method uses the same backbone and evaluation protocol.

**Global readouts.** On DataComp-L zero-shot classification, LeVLJEPA scores 42.45% on ImageNet versus 47.32% for InfoNCE and 50.78% for SigLIP; it also trails on Places365, Aircraft, and Pets. Frozen CLS-token linear probes are much closer: ImageNet accuracy is 65.42%, compared with 65.75% and 66.34%, and LeVLJEPA stays within about 1.5 points of the strongest baseline on all four datasets. On ImageNet-9 it achieves the highest Original, Mixed-Same, and Mixed-Rand accuracies (96.96%, 91.01%, and 79.75%).

**Dense prediction.** A linear head over frozen patch tokens reaches 23.15 mIoU on ADE20K and 31.10 on COCO-Stuff. The strongest contrastive results are 20.90 and 29.02, giving LeVLJEPA gains of 2.25 and 2.08 points.

**Frozen VLM backbone.** With both the vision encoder and language model frozen and only an MLP bridge trained, LeVLJEPA is best in all six model-benchmark combinations. With Llama-1B it scores 44.6 on GQA, 54.2 on VQAv2, and 66.9 on POPE; with Qwen-1.5B it scores 43.7, 54.1, and 75.0. On POPE it has the highest accuracy under both language models and the lowest answer bias, although its Llama-1B F1 (66.6) is below InfoNCE (69.4) because its lower yes-rate trades recall for fewer false positives.

**Ablations and scaling.** After 20,000 steps, direct MSE without SIGReg has vision effective rank 3 and ImageNet linear-probe accuracy 0.18%; the full predictor, stop-gradient, and SIGReg system reaches rank 477 and 27.51%. One predictor layer is insufficient, while depths two through four are more stable. SIGReg weight 0.001 degenerates, whereas weights 0.005-0.04 are broadly stable. CC12M model-size and data-fraction sweeps show LeVLJEPA remaining competitive with CLIP, but do not evaluate architectures larger than ViT-B/16.

## Limitations

- Contrastive objectives retain a clear advantage on DataComp-L zero-shot classification; the proposed objective does not combine its dense-feature gains with equally strong large-scale image-text discrimination.
- Main experiments use one vision architecture, ViT-B/16. Larger model and data scales remain untested.
- DataComp-L link rot reduced the usable set from about 140 million to about 92 million pairs, so absolute results are not directly comparable with work trained on a larger downloadable fraction.
- Comparisons hold compute and samples seen fixed rather than maximizing each method with a separate scaling recipe. The contrastive baselines use established OpenCLIP settings, while LeVLJEPA's choices are selected on CC12M.
- Dense-feature evidence comes from two segmentation datasets and three VLM benchmarks with frozen encoders and small language models. It does not establish superiority for end-to-end fine-tuning, larger language models, retrieval, robotics, or all dense tasks.
- The background-robustness results are consistent with a more object-focused representation, but do not directly identify the mechanism producing that robustness.
- The supplied Markdown gives no publication year, venue, or stable identifier, so these metadata are left unasserted.

## Related Concepts

- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]
- [[concepts/linear-probing|Linear Probing]]

## Related Papers

- Balestriero and LeCun (2025), "LeJEPA: Provable and Scalable Self-Supervised Learning Without the Heuristics": supplies the SIGReg-based non-contrastive framework extended here (reference [3]).
- Chen et al. (2025), "VL-JEPA: Joint Embedding Predictive Architecture for Vision-Language": predicts caption embeddings but retains a bidirectional InfoNCE objective and in-batch negatives (reference [8]).
- Radford et al. (2021), "Learning Transferable Visual Models from Natural Language Supervision": introduces the CLIP contrastive baseline used in the comparison (reference [24]).
- Zhai et al. (2023), "Sigmoid Loss for Language Image Pre-Training": introduces the SigLIP baseline (reference [28]).
- [[papers/when-does-lejepa-learn-a-world-model|When Does LeJEPA Learn a World Model?]] analyzes what alignment plus SIGReg can identify under explicit latent-process assumptions; it is library context rather than a paper cited by LeVLJEPA.

[[index|Library home]]
