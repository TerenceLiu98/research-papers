---
title: "Deepfake Detection in Image Sequences: A Temporal Approach for Anomaly Detection"
type: paper
authors:
  - Rongju Yao
  - Zhiqing Bai
  - Jing Tong
  - Khosro Rezaee
year: 2025
venue: International Journal of Intelligent Systems
tags:
  - anomaly-detection
  - deepfake-detection
  - independent-component-analysis
---

## TL;DR

The paper combines FastICA feature extraction with locality-sensitive hashing and isolation forests (LSHiForest), motivated by temporal inconsistencies in manipulated image sequences. The authors report improved AP and AUC against three anomaly-detection baselines on KDDCUP99. This is a network-intrusion dataset used as a hypothetical visual-sequence proxy; the experiments do not establish deepfake-video detection performance.

## Research Question

Can independent-component features and hash-partitioned isolation forests provide an efficient anomaly detector for the temporal inconsistencies hypothesized to occur in deepfake image sequences?

## Motivation

Single-frame analysis may miss changes in motion, lighting, or appearance across frames. The authors propose reducing feature dimensionality before anomaly scoring to address computational cost and correlated inputs, using agricultural packaging images as an illustrative application.

## Contributions

- A proposed pipeline joining FastICA and LSHiForest for sequence anomaly detection.
- A temporal-analysis rationale based on adjacent-component correlations, differences, and deviations from normal variation.
- Comparisons of accuracy and runtime on a network-traffic proxy, with sensitivity studies for component count and forest size.

## Method

**Feature extraction (§4.1).** Center and whiten the input matrix, then apply FastICA fixed-point updates to maximize non-Gaussianity, normalizing weights and applying symmetric decorrelation. The resulting representation is $S = WX^{\mathrm{whitened}}$. The experiments vary the retained dimension $k$. This applies [[concepts/independent-component-analysis|Independent Component Analysis]]; statistical independence alone does not establish that a recovered component corresponds to a facial feature, lighting, or motion.

**Temporal rationale (§4.2).** The paper proposes inspecting correlations between adjacent component vectors, differences $C_{t+1}-C_t$, and departures from baseline component variability. Low correlation or abrupt changes are suggested as manipulation cues. The supplied algorithms do not clearly specify how these temporal statistics enter the final detector.

**Anomaly scoring (§4.3).** Normalize component vectors, assign them to locality-sensitive hash buckets, and build isolation trees within each bucket. Average isolation path length produces the score $s(v,n)=2^{-E[h(v)]/c(n)}$, where $n$ is bucket size and $c(n)$ normalizes path length. Scores above a threshold flag anomalies. Shorter isolation paths yield higher scores.

## Experiments

**Data and protocol.** KDDCUP99 contains approximately 4.9 million connection records with 41 features and normal/attack labels. The authors interpret basic connection attributes as hypothetical frame properties, content attributes as within-frame anomalies, and traffic attributes as inter-frame behavior. No actual image-sequence conversion or visual benchmark is demonstrated. Experiments use PyTorch on an NVIDIA RTX 3060 and are reported as repeated 100 times.

**Comparisons (§5.2).** Baselines are sklearn.ISO, L2SH, and KLSH. Forest size ranges from 10 to 200, with $k=5$ for the main comparisons. The text reports higher AP and AUC for the proposed method. sklearn.ISO has the lowest training time but the poorest accuracy; the proposed method is faster than L2SH and KLSH. Similar runtime ordering is reported for testing. Exact metric values and timings are not transcribed in the supplied Markdown, whose results are image-based plots.

**Sensitivity.** Sweeping $k$ from 1 to 8 gives the highest reported AP at $k=4$ or $5$, with similar AUC behavior. Increasing forest size generally improves accuracy while increasing training and testing costs. Larger $k$ also increases runtime. These are parameter sweeps, rather than controlled removal of FastICA or temporal-analysis components.

## Limitations

- KDDCUP99 is not visual data. The paper itself acknowledges that transfer to real deepfake videos remains unvalidated; FaceForensics++ and KoDF evaluation is future work.
- The supplied description does not clearly establish train/test partitioning, categorical-feature encoding, threshold selection, or the operational construction of temporal sequences from connection records.
- The relationship between the proposed temporal statistics and the implemented scoring pipeline is underspecified. The experiments do not isolate the contribution of temporal modeling.
- FastICA may miss semantic inconsistencies, and performance depends on component count and forest size. Whitening without explicit component truncation does not itself reduce dimension.
- Comparisons against supervised deepfake detectors such as MRE-Net and FAMM are deferred. Audio-visual input, compression, occlusion, and edge deployment remain untested.
- Runtime comparisons on the proxy do not establish end-to-end real-time video processing. No DOI or article identifier for this paper is present in the supplied text.

## Related Concepts

- [[concepts/independent-component-analysis|Independent Component Analysis]]: FastICA supplies the representation used before hashing and anomaly scoring.
- [[concepts/time-series-anomaly-detection|Time-Series Anomaly Detection]]: the intended temporal detection task; the proxy evaluation leaves its visual instantiation unresolved.

## Related Papers

- [[papers/paano-patch-based-representation-learning-for-time-series-anomaly-detection|PaAno: Patch-Based Representation Learning for Time-Series Anomaly Detection]]: a related representation-then-scoring approach that uses learned local patches and a normal-example memory bank. It is not a baseline in this paper.
