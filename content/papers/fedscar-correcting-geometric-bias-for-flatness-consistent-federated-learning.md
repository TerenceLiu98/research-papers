---
title: "FedScar: Correcting Geometric Bias for Flatness-Consistent Federated Learning"
type: paper
authors:
  - Jianfeng Lu
  - Yuzhao Xiang
  - Yue Chen
  - Gang Li
  - Shuqin Cao
  - Guanghui Wen
year: null
tags:
  - federated-learning
  - optimization
  - data-heterogeneity
---

[[index|Library home]]

## TL;DR

FedScar uses accumulated client-update discrepancies to correct geometric misalignment in heterogeneous federated learning. It reports better accuracy and stability than several drift-correction and sharpness-aware baselines. The full method requires an extra downlink vector; its simplified variants target lower overhead.

## Research Question

Can historical differences between local and global updates help align local loss landscapes with the global objective, beyond correcting first-order client drift?

## Motivation

Locally flat solutions need not aggregate into a globally flat solution when client distributions differ. The paper distinguishes this [[concepts/flatness-discrepancy|Flatness Discrepancy]] from ordinary [[concepts/client-drift|Client Drift]]. Its diagnostic experiment reports accuracy correlations of −0.716 with discrepancy and 0.009 with absolute flatness; these are observational associations within the tested setting.

## Contributions

- A history-dependent geometric correction combined with a separate parameter-drift control variable.
- An adaptive correction magnitude based on dispersion of client updates, avoiding explicit Hessian transmission.
- A split-dual ADMM interpretation and conditional convergence analysis.
- Image, text, and tabular classification experiments, component ablations, and communication/computation variants.

## Method

Client i maintains a drift variable hᵢ and geometric memory bᵢ. Local SGD minimizes the empirical loss plus a quadratic penalty toward the global model, a linear drift correction, and a linear geometric correction using the global average bias minus bᵢ (Eq. 7).

The server measures the dispersion of client updates around the global update. It updates bᵢ by retaining a fraction γ of its previous value and adding the normalized global-minus-local update direction scaled by this dispersion (Eqs. 5–6). Aggregation also includes a correction from the dual variables (Eq. 8). This is a proxy for persistent geometric bias, not an exact recovery of global SAM perturbations.

The authors claim an O(1/√T) nonconvex convergence rate under smoothness, unbiased bounded-variance gradients, bounded gradient and Hessian heterogeneity, and small perturbations. The displayed bound retains a variance term; the claimed vanishing rate needs additional noise control. The discrepancy analysis describes contraction toward a noise floor rather than unconditional elimination of all discrepancy.

The base method uses SGD. FedScar-SAM adds local SAM; FedScarS encodes correction in personalized initialization; FedScarL removes the separate drift variable. Appendix G.1 specifies one model-sized upload and two model-sized downloads per participating client, consistent with Table 1's 1.5× total communication relative to FedAvg.

## Experiments

The main setup uses 100 clients and 500 rounds, a CNN for CIFAR-10 and ResNet-8 for CIFAR-100, with group normalization. It varies Dirichlet and pathological partitions, quantity imbalance, and participation. Main results report maximum accuracy and mean accuracy over the last 50 rounds.

| Setting and source | FedScar max / mean (%) | Comparator max / mean (%) |
| --- | --- | --- |
| CIFAR-10, Dirichlet 0.01, 10% participation, Table 2 | 78.42 / 77.24 | FedGMT: 76.65 / 75.28 |
| CIFAR-100, Dirichlet 0.01, 10% participation, Table 2 | 46.57 / 45.78 | FedGMT: 46.18 / 45.50 |
| CIFAR-100, Dirichlet 0.01, C=10, separate FedGF setup, Table 12 | 55.01 / 54.33 | FedGF: 47.67 / 46.08 |
| Sensorless Drive, Dirichlet 0.1, 10% participation, Table 13 | 94.04 / 91.60 | FedGMT: 93.88 / 87.81 |
| AG News, Dirichlet 0.1, 10% participation, Table 13 | 86.30 / 84.44 | FedGMT: 84.87 / 83.13 |

Table 3's CIFAR-10 Dirichlet 0.01 ablation rises from 75.29 / 73.40 with ADMM alone to 77.92 / 76.72 with historical bias, then 78.42 / 77.24 with adaptive scaling. These results support complementary benefits within this setup. Sensitivity experiments show that the preferred memory factor depends on heterogeneity and local training duration.

## Limitations

- The abstract's claim of no additional communication overhead does not describe the full algorithm: Appendix G.1 explicitly doubles its downlink payload.
- The empirical discrepancy is a global-versus-local loss gap, not a direct measurement of worst-case perturbation sharpness. Its curvature interpretation assumes small local gradients and a valid Taylor approximation.
- Table 11 lists 77.92 / 76.72 for the FedScar CIFAR-10 Dirichlet 0.01, 10% setting, whereas Table 2 lists 78.42 / 77.24. These values should not be silently merged.
- Appendix E models the bias update as a different EMA from Eq. 6. The theoretical interpretation therefore needs care when applied to the implemented recurrence. Some parsed equations and references are incomplete.
- Table 12's prose describes C as sampled clients, while its caption calls it local epochs. The table above preserves C without resolving that ambiguity.
- Evaluation uses simulated client partitions and modest classification architectures; it does not establish deployment performance for arbitrary heterogeneous systems.

The supplied Markdown does not establish a publication year, venue, DOI, or arXiv identifier; year is left null. Source: Cognitio job `8bd3b9fe-fe40-4ba9-a610-f184488d679f`, supplied parsed manuscript; revalidated against supplied parsed Markdown for Cognitio job `2e80f045-a354-47e4-b2e3-5ffb0eb3a585`. Code URL reported by the paper: https://github.com/Ultraman6/FedScar.

## Related Concepts

- [[concepts/flatness-discrepancy|Flatness Discrepancy]]: mismatch between global and aggregated local sharpness.
- [[concepts/client-drift|Client Drift]]: divergence of local optimization from the global objective.

## Related Papers

- [[papers/federated-learning-with-sample-level-client-drift-mitigation|Federated Learning with Sample-level Client Drift Mitigation]]: addresses drift through sample scheduling, providing a complementary mechanism to geometric correction.
- Rethinking the Flat Minima Searching in Federated Learning (Lee and Yoon, 2024): the cited FedGF work on flatness discrepancy.
- Locally Estimated Global Perturbations Are Better than Local Perturbations for Federated Sharpness-Aware Minimization (Fan et al., 2024): the cited FedLESAM approach.
