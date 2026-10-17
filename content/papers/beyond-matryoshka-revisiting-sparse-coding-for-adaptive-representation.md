---
title: "Beyond Matryoshka: Revisiting Sparse Coding for Adaptive Representation"
type: paper
authors:
  - Tiansheng Wen
  - Yifei Wang
  - Zequn Zeng
  - Zhong Peng
  - Yudi Su
  - Xinyang Liu
  - Bo Chen
  - Hongwei Liu
  - Stefanie Jegelka
  - Chenyu You
year: null
tags:
  - sparse-representations
  - adaptive-embeddings
  - sparse-autoencoders
  - efficient-retrieval
---

## TL;DR

Contrastive Sparse Representation (CSR) converts frozen dense embeddings into high-dimensional, nonnegative sparse vectors using a lightweight autoencoder with reconstruction and contrastive objectives. Varying the number of active coordinates provides an alternative to truncating Matryoshka embeddings. On ImageNet, text tasks, and image-text retrieval, CSR often improves the accuracy-efficiency trade-off, especially at small activity budgets, although compression still loses information and multimodal dead latents remain a problem.

## Research Question

Can sparse coding produce adaptive retrieval representations from pretrained embeddings with less additional training and better fidelity than learning nested dense prefixes through Matryoshka Representation Learning (MRL)?

## Motivation

Dense embeddings make similarity search costly at large database sizes. MRL trains multiple embedding prefixes jointly, enabling shorter vectors at inference but requiring backbone optimization in the comparisons considered here. Sparse coding instead separates dictionary capacity from per-example activity: an embedding can select a small subset of coordinates from a large dictionary while retaining the pretrained encoder.

## Contributions

- Introduces CSR as a post-training module for image, text, and multimodal embeddings.
- Combines TopK sparse reconstruction with a nonnegative contrastive objective to improve discriminative quality and latent utilization.
- Evaluates sparse versus dense retrieval timing, dictionary width, backbone quality, and dead latents alongside downstream benchmarks.

## Method

For a frozen embedding $v=f(x)\in\mathbb{R}^d$, the encoder and decoder compute

$$
z_k=\operatorname{ReLU}\!\left(\operatorname{TopK}(W_{\mathrm{enc}}(v-b_{\mathrm{pre}})+b_{\mathrm{enc}})\right),
\qquad \hat v_k=W_{\mathrm{dec}}z_k+b_{\mathrm{pre}}.
$$

The latent space has width $h$, generally $4d$, while TopK followed by ReLU retains at most $k$ nonzero coordinates. Sparse vectors are used directly for retrieval. The reported implementation ties encoder and decoder weights.

With $L(k)=\lVert v-\hat v_k\rVert_2^2$, reconstruction uses

$$
L_{\mathrm{recon}}=L(k)+\tfrac18L(4k)+\beta L_{\mathrm{aux}},
\qquad L_{\mathrm{CSR}}=L_{\mathrm{recon}}+\gamma L_{\mathrm{ncl}}.
$$

The auxiliary objective reconstructs residual error using otherwise inactive latents. The contrastive term shapes sparse similarities for the task; Appendix C.4 specifies same-class positives for text classification and clustering. Image and text share a sparse module in multimodal experiments. Section 3 motivates the loss using prior nonnegative contrastive-learning identifiability results; this is not a separate proof that the complete CSR system satisfies those results' assumptions.

Appendix settings vary by task: ImageNet uses $d=2048$, $h=8192$, ten epochs and $\gamma=0.1$; text uses NV-Embed-V2 with $d=4096$, $h=16384$, ten epochs and $\gamma=1$. Multimodal modules train for five epochs on COCO/Flickr30K or one epoch on CC3M. These are module-training costs; Appendix D.2 also describes backbone fine-tuning before the multimodal compression stage.

## Experiments

### Image representations

The controlled ImageNet comparison uses the FF2048 ResNet-50 backbone from the MRL study. Table 4 reports 1-NN accuracy using the training set as a roughly 1.3-million-image database and the 50,000-image validation set as queries.

| Active coordinates / dense dimensions | MRL | SAE | CSR |
| --- | --- | --- | --- |
| 8 | 62.19% | 67.14% | 67.78% |
| 32 | 69.46% | 68.91% | 70.15% |
| 256 | 70.62% | 70.35% | 71.31% |

The uncompressed FF2048 representation scores 71.19%. A stronger RN50 backbone yields CSR accuracy of 74.53% at $k=32$, compared with its own full-vector accuracy of 75.19%; that result should be separated from the controlled MRL comparison. Linear-probe results in Table 5 are less uniformly favorable: at 256 dimensions, MRL scores 76.47% versus CSR's 76.25%.

### Text representations

The study covers classification, clustering, and retrieval subsets of [[concepts/massive-text-embedding-benchmark-mteb|MTEB]]. Dataset-specific experiments use separate splits of the same dataset; task-specific transfer trains on source datasets and evaluates on unseen datasets within each task. Table 1 compares CSR on NV-Embed-V2 with several separately pretrained embedding models, so these comparisons combine compression differences with backbone differences.

At $k=32$, CSR obtains 91.02% Banking77 accuracy versus 92.20% for full NV-Embed-V2 and 88.11% for reconstruction-only SAE. FiQA2018 nDCG@10 is 57.54 versus 62.65 for the full representation and 49.18 for SAE. Table 1 gives normalized retrieval times of 1.0 for CSR and 37.6 for the full representation. Its caption and Section 5.2 separately claim a 61-fold speedup; the displayed timing column supports 37.6-fold for those rows, so the two figures are not interchangeable.

### Multimodal representations

ViT-B/16 image-text retrieval is evaluated on MS COCO and Flickr30K, both with dataset-specific training and after CC3M training for zero-shot transfer. At 64 active dimensions, COCO in-distribution Recall@5 is 62.75% image-to-text and 78.10% text-to-image for CSR, versus 62.61% and 72.43% for MRL (Table 2). The corresponding full representation scores 74.42% and 86.47%. CSR uses 1.1 million trainable module parameters compared with 86 million in the MRL fine-tuning comparison.

### Efficiency and ablations

Retrieval timing uses PyTorch GPU operations, batches of 512 queries, and 2,000 rounds after 100 warm-up rounds; both sparse queries and database embeddings use compressed sparse row storage (Appendix E.3). The study varies database sizes from 0.5 million to 10 million entries. Sparse multiplication can outperform dense multiplication at small activity budgets, but timing depends on the backend and sparsity pattern. These timings concern retrieval over embeddings, not total input-to-result latency.

Dictionary-width sweeps peak around $h=4d$ and deteriorate beyond that, especially under stronger sparsity. Better backbones retain more accuracy at the same activity budget. Auxiliary reconstruction and multi-TopK reduce dead latents, with contrastive training reducing them further; multimodal alignment still exhibits a sharp dead-latent increase under stringent sparsity.

## Limitations

- Dead latents remain unresolved, particularly in the shared image-text space; increasing dictionary width does not monotonically improve accuracy.
- Equal active-coordinate counts do not imply equal storage or end-to-end cost: sparse formats store indices, and the dense encoder plus sparse projection still run before retrieval.
- Text comparisons use different pretrained backbones. Multimodal module-training savings exclude the preceding backbone fine-tuning described in the appendix.
- The parsed source contains inconsistent timing claims and task-dependent hyperparameters. Its clustering results are labeled Top-1 accuracy, so they should not be silently relabeled as a different standard clustering metric.
- The supplied Markdown does not establish a publication year, venue, or stable identifier for this paper. The year is left unspecified, and the abstract's unresolved code-link placeholder is omitted.

## Related Concepts

- [[concepts/adaptive-sparse-embeddings|Adaptive Sparse Embeddings]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/text-embedding-models|Text Embedding Models]]
- [[concepts/massive-text-embedding-benchmark-mteb|Massive Text Embedding Benchmark (MTEB)]]
- [[concepts/linear-probing|Linear Probing]]

## Related Papers

- Kusupati et al. (2022), "Matryoshka Representation Learning": the nested dense representation baseline.
- Gao et al. (2024), "Scaling and Evaluating Sparse Autoencoders": source of the TopK SAE and auxiliary reconstruction approach cited here.
- Wang et al. (2024), "Non-negative Contrastive Learning": theoretical motivation for the nonnegative contrastive objective.
- [[papers/concepts-from-representations-post-hoc-concept-bottleneck-models-via-sparse-decomposition-of-visual-representations|Concepts from Representations: Post-hoc Concept Bottleneck Models via Sparse Decomposition of Visual Representations]]: a related library paper using sparse decomposition of frozen visual embeddings for interpretable concept bottlenecks, rather than retrieval acceleration.

[[index|Library home]]
