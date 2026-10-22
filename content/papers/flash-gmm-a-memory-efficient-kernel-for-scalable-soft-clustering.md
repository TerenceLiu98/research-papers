---
title: "Flash-GMM: A Memory-Efficient Kernel for Scalable Soft Clustering"
type: paper
authors:
  - Gal Bloch
  - Ariel Gera
  - Matan Orbach
  - Ohad Eytan
  - Assaf Toledo
year: null
source_job_id: eb4943d2-5666-40af-bc6f-ac051bcc4662
url: "https://github.com/IBM/Flash-GMM"
tags:
  - gaussian-mixture-models
  - gpu-kernels
  - approximate-nearest-neighbor-search
  - soft-clustering
---

## TL;DR

Flash-GMM fuses the expectation and sufficient-statistic computations of isotropic [[concepts/gaussian-mixture-models|Gaussian Mixture Models]] so that the full $N \times K$ responsibility matrix is not materialized in GPU high-bandwidth memory. On an A100-80 GB, the paper reports 19–32x speedup over TorchGMM, execution at up to 100 million points, and improved recall-compute tradeoffs when GMM responsibilities drive adaptive multi-assignment in an [[concepts/inverted-file-index|Inverted File Index]].

[[index|Library home]]

## Research Question

Can Gaussian-mixture expectation-maximization be reorganized around GPU memory traffic so that soft clustering scales to large datasets, and can its probabilistic assignments improve the coarse partition of approximate nearest-neighbor indexes?

## Motivation

Standard GMM implementations repeatedly materialize and scan an $N \times K$ responsibility matrix. At large $N$, this consumes device memory and high-bandwidth-memory traffic even though the maximization step ultimately needs only responsibility-weighted sufficient statistics. This systems bottleneck has made soft clustering impractical at the scales routinely handled by hard [[concepts/k-means-clustering|K-Means Clustering]]. In IVF search, hard assignment also hides vectors near cell boundaries whenever a query probes the neighboring cell instead.

## Contributions

- Introduces a fused Triton kernel that streams data tiles, computes numerically stable responsibilities, and immediately accumulates mixture sufficient statistics without storing the full responsibility matrix.
- Uses two sweeps over component blocks: an online log-sum-exp sweep for each point's normalizer, followed by responsibility recomputation and accumulation of effective counts, weighted sums, and weighted squared residuals.
- Applies learned GMM centroids as a drop-in IVF coarse quantizer and proposes adaptive multi-assignment based on final-iteration responsibilities.
- Evaluates kernel runtime and memory scaling, IVF recall versus distance-computation cost, alternative initializations and thresholds, hard top-2 assignment, different cluster counts, and compatibility with product-quantized IVF variants.

## Method

### Fused soft-EM kernel

For an isotropic $K$-component GMM, Flash-GMM partitions the $N \times D$ data matrix into row tiles. Within each tile, it scans components in blocks and maintains the per-point log normalizer using online log-sum-exp. A second component sweep recomputes each block's log scores, converts them to responsibilities, and accumulates the three quantities needed by the M-step: effective component counts, responsibility-weighted feature sums, and responsibility-weighted squared residuals.

Tile-level statistics are atomically reduced into global buffers, from which mixture weights, means, and scalar variances are updated. The paper characterizes high-bandwidth-memory reads as $ND+2KD$, compared with approximately $3ND+4NK$ memory accesses for its naive formulation; the $O(NK)$ responsibility traffic is eliminated.

The reported implementation uses 64-row data tiles, 16-component blocks, four warps per block, and dimensions padded to 128. It was developed on an A100 and checked for numerical correctness against SciPy; the authors also report validation on H100 and RTX 5080 GPUs.

### IVF multi-assignment

GMM centroids can replace k-means centroids without changing the IVF query algorithm. Under single assignment, each database vector enters the posting list with maximum responsibility. Under multi-assignment, it enters at most two lists whose responsibilities exceed $1/K$, the uniform component prior. This makes redundancy adaptive: only assignments whose posterior exceeds the prior are retained.

Training uses a warm start of 10 FAISS k-means iterations followed by 90 Flash-GMM iterations. Search quality is measured by recall@10, while cost is measured by distance-computation operations (DCO) so that longer posting lists from multi-assignment are accounted for.

## Experiments

Kernel benchmarks use an NVIDIA A100-80 GB with $K=1024$ and $D=128$. Across 10,000 to 1 million points, Flash-GMM reports 19–32x speedup over TorchGMM and 766–1,738x over SciPy. At 1 million points, reported kernel allocation is 4.5 MB versus 21,006 MB for TorchGMM. TorchGMM is reported out of memory above 1 million points, while Flash-GMM runs through 100 million points; 30 EM iterations at that scale take 74.27 seconds.

The IVF study uses SIFT1M, Deep10M, and GloVe-100 with 1,024 clusters and three random seeds. At a fixed probe count, multi-assignment scans longer lists but raises recall. Comparing operating points by DCO, the paper reports up to 1.7x fewer distance computations at a fixed recall target and gains of 2–12 recall@10 percentage points at matched compute. Average assignments per vector are 1.49, 1.60, and 1.78 for the three datasets. Recall at a fixed probe count varies by less than 0.003 across seeds.

Flash-GMM index training takes 11.8 seconds on SIFT1M, 123.1 seconds on Deep10M, and 21.8 seconds on GloVe-100, versus 3.5, 53.3, and 6.4 seconds for k-means. Warm-starting is reported to match k-means++ recall while training 3–4x faster. Hard k-means top-2 assignment is less DCO-efficient than single assignment in the reported ablation, supporting the use of responsibilities rather than redundancy alone. Gains persist with IVF-PQ and IVF-PQ fast-scan in the tested SIFT1M configurations.

## Limitations

- Flash-GMM training is approximately 2–3x slower than k-means, which matters when indexes are rebuilt frequently.
- Multi-assignment enlarges posting-list storage by an average factor of 1.49–1.78 in the reported datasets.
- IVF experiments stop at 10 million vectors, while the kernel benchmark reaches 100 million. Billion-scale full-batch training would require the proposed but unevaluated SSD streaming path because the input itself no longer fits on one GPU.
- The IVF evaluation covers $K \in \{256,1024,4096\}$, with the strongest recall gain at 1,024 clusters; behavior for larger $K$ remains untested.
- The model uses isotropic scalar covariance. Full covariance is not a drop-in option at the evaluated IVF regime because per-cluster sample counts are too small for stable $D \times D$ covariance estimates.
- The closest RAIRS comparison relies on published results under a shared configuration because RAIRS code was unavailable; it is not a controlled head-to-head experiment.
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier, so those fields are not inferred.

## Related Concepts

- [[concepts/gaussian-mixture-models|Gaussian Mixture Models]]: the probabilistic soft-clustering model whose EM sufficient statistics are fused by Flash-GMM.
- [[concepts/inverted-file-index|Inverted File Index]]: the approximate-search structure in which responsibilities provide adaptive assignment to posting lists.
- [[concepts/k-means-clustering|K-Means Clustering]]: the conventional IVF coarse quantizer and the warm-start method used in the experiments.
- IO-aware GPU kernels: tiling and fusion retain intermediate state on chip to reduce high-bandwidth-memory traffic.
- Soft clustering: points have graded component memberships rather than one hard cluster label.

## Related Papers

- [[papers/flash-kmeans-fast-and-memory-efficient-exact-k-means|Flash-KMeans: Fast and Memory-Efficient Exact K-Means]]: applies related IO-aware fusion to exact hard-assignment clustering rather than soft EM.
- Dao et al. (2022), "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness": motivates the tiled online-reduction design.
- Jegou et al. (2011), "Searching in One Billion Vectors: Re-rank with Source Coding": introduces the IVF search setting used for the application.
- Yang and Chen (2026), "RAIRS: Optimizing Redundant Assignment and List Layout for IVF-Based ANN Search": uses a geometric heuristic for universal second-list assignment rather than adaptive GMM responsibilities.
