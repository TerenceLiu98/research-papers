---
title: "Flash-KMeans: Fast and Memory-Efficient Exact K-Means"
type: paper
authors:
  - Shuo Yang
  - Haocheng Xi
  - Yilong Zhao
  - Muyang Li
  - Xiaoze Fan
  - Jintao Zhang
  - Han Cai
  - Yujun Lin
  - Xiuyu Li
  - Kurt Keutzer
  - Song Han
  - Chenfeng Xu
  - Ion Stoica
year: null
source_job_id: f3a8edcf-93c9-4dbf-bc04-45c89430acea
url: "https://github.com/svg-project/flash-kmeans"
tags:
  - k-means
  - gpu-kernels
  - io-aware-computing
  - clustering
---

## TL;DR

Flash-KMeans preserves exact Lloyd-style [[concepts/k-means-clustering|K-Means Clustering]] while redesigning its GPU dataflow. FlashAssign fuses distance computation with online argmin so the full point-by-centroid distance matrix is never written to high-bandwidth memory, and sort-inverse update replaces token-level atomic scatters with localized reductions over sorted assignments. On an NVIDIA H200, the paper reports up to 17.9x end-to-end speedup over the strongest baseline in its tested regimes, execution on as many as one billion points, and up to 175x lower configuration-tuning overhead.

[[index|Library home]]

## Research Question

Can exact k-means become a low-latency online GPU primitive by reorganizing memory traffic, synchronization, out-of-core transfer, and kernel configuration without changing Lloyd's mathematical objective?

## Motivation

Modern training and inference systems repeatedly invoke k-means for operations such as sparse routing, semantic deduplication, embedding quantization, token permutation, and KV-cache compression. Standard GPU implementations first materialize an $N \times K$ distance matrix in high-bandwidth memory and then reduce it, while centroid updates scatter atomic writes from individual points. The paper argues that these data-movement and synchronization costs, rather than arithmetic complexity alone, prevent algorithmic reductions in FLOPs from becoming proportional wall-clock gains.

## Contributions

- Introduces **FlashAssign**, which streams point and centroid tiles, maintains an online nearest-centroid state on chip, and avoids materializing the $N \times K$ distance matrix.
- Introduces **sort-inverse update**, which sorts the assignment vector by cluster ID and performs segment-local aggregation, reducing atomic merges from per-point behavior toward the number of cluster segments and CTA boundary splits.
- Adds double-buffered chunk transfer for out-of-core datasets and a cache-aware configuration heuristic for dynamic shapes.
- Separately evaluates assignment, centroid update, complete iterations, out-of-core execution, and time-to-first-run against fast_pytorch_kmeans, fastkmeans, cuML, and FAISS.

## Method

### Materialization-free assignment

For points $X \in \mathbb{R}^{N \times d}$ and centroids $C \in \mathbb{R}^{K \times d}$, ordinary assignment computes all squared distances before taking a row-wise minimum. FlashAssign instead processes centroid tiles sequentially. For every point tile it keeps the current minimum distance and centroid index in registers, computes a tile-local minimum, and updates that running pair. Double buffering overlaps loading the next centroid tile with computation on the current tile.

The paper characterizes the resulting idealized assignment IO as $O(Nd+Kd)$ reads plus assignment output, rather than the $O(NK)$ writes and reads caused by the explicit distance matrix. The online reduction still examines all relevant distances and therefore does not approximate the nearest-centroid decision.

### Sort-inverse centroid update

The update stage applies `argsort` only to the one-dimensional assignment vector, grouping equal cluster IDs without physically reordering the point matrix. Each cooperative thread array walks a chunk of this sorted index sequence, gathers the corresponding point features, accumulates each local segment on chip, and performs global atomic merges only at segment boundaries. The stated worst-case atomic-merge count is

$$
O\left(\left(K+\left\lceil N/B_N\right\rceil\right)d\right),
$$

compared with $O(Nd)$ token-level atomics in the standard scatter update.

### Deployment path

For inputs larger than GPU memory, a double-buffered CUDA-stream pipeline overlaps host-to-device transfer of one chunk with computation on another. For dynamic shapes, a heuristic selects configurations from the problem dimensions and L1/L2 cache properties instead of exhaustively autotuning each shape.

## Experiments

All reported benchmarks use an NVIDIA H200 with CUDA 12.8 and sweep point counts, cluster counts, feature dimensions, and batch sizes.

- **End to end:** Flash-KMeans reports up to 17.9x speedup over fast_pytorch_kmeans in a large-$N$, small-$K$ setting and over 5.4x over fastkmeans in a large-$N$, large-$K$ setting. It reports up to 33x over cuML and more than 200x over FAISS across the broader evaluation.
- **Assignment kernel:** For $N=1$ million and $K=8192$, latency falls from 122.5 ms to 5.8 ms, a reported 21.2x speedup.
- **Centroid update:** Sort-inverse update reaches a reported 6.3x speedup for $B=1$, $N=33$ million, and $K=4096$.
- **Out of core:** At one billion points, $K=32768$, and $d=128$, one iteration takes 41.4 seconds versus 261.8 seconds for fastkmeans, a 6.3x speedup. At $N=400$ million and $K=16384$, the reported times are 8.4 and 88.4 seconds, a 10.5x speedup.
- **Dynamic shapes:** The cache-aware heuristic takes less than 2.5 seconds on all six tested shapes, reports up to 175x less tuning time than exhaustive search, and stays within 0.3% of the exhaustively tuned iteration latency.

## Limitations

- Every reported performance result is from one NVIDIA H200/CUDA 12.8 environment; portability and relative performance on other GPU generations or vendors are not evaluated.
- The work optimizes Euclidean Lloyd iterations rather than changing their convergence behavior, initialization sensitivity, local-optimum properties, or number of iterations.
- Speedups depend on workload shape and comparator. The headline maxima occur in different configurations and should not be read as one jointly achieved operating point.
- The sort-inverse update adds an assignment sort and irregular feature gathers; the supplied evaluation does not isolate regimes where that overhead could outweigh reduced atomic contention.
- The cache-aware heuristic is compared with exhaustive tuning on six scale-up workloads, not on a broad cross-hardware deployment study.
- The supplied Markdown provides no publication year, venue, DOI, or arXiv identifier, so those fields are not inferred.

## Related Concepts

- [[concepts/k-means-clustering|K-Means Clustering]]: the exact alternating assignment-and-centroid procedure whose GPU execution is reorganized.
- IO-aware GPU kernels: operator fusion and tiling reduce high-bandwidth-memory traffic by retaining intermediate state on chip.
- Segmented reduction: sorting keys converts irregular scatter updates into localized group reductions.
- Out-of-core computation: chunked streams bound device-memory use while overlapping transfer and computation.

## Related Papers

- Dao et al. (2022), "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness": the cited model for eliminating a large intermediate matrix through tiled online reduction.
- Clavie and Warner (2025), "fastkmeans: Accelerated KMeans Clustering in PyTorch and Triton": the strongest reported end-to-end baseline in the large-$N$, large-$K$ and out-of-core comparisons.
- Johnson, Douze, and Jegou (2019), "Billion-Scale Similarity Search with GPUs": describes FAISS, one of the evaluated industry libraries.
- [[papers/quantization-and-clustering-with-bregman-divergences|Quantization and Clustering with Bregman Divergences]]: studies existence and statistical guarantees for quantization objectives, whereas Flash-KMeans targets systems execution of Euclidean Lloyd iterations.
