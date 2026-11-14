---
title: Federated Learning with Sample-level Client Drift Mitigation
type: paper
authors:
  - Haoran Xu
  - Jiaze Li
  - Wanyi Wu
  - Hao Ren
year: null
tags:
  - federated-learning
  - data-heterogeneity
  - sample-selection
---

## TL;DR

FedBSS mitigates [[concepts/client-drift|Client Drift]] by warming up on all local data, then ordering local training from low-loss to high-loss samples using the current global model. It improves accuracy across the reported Dirichlet partitions and noisy-label settings, but does not win every shard-partition comparison.

## Research Question

Can dynamically scheduling individual training samples reduce the divergence of local client updates under heterogeneous data while retaining knowledge from difficult samples?

## Motivation

Update correction and aggregation methods address client drift after or during local optimization. This paper instead studies differences among individual samples: low-loss subsets produce less drift in its motivating visualization, while permanently excluding high-loss samples would discard useful information. Loss is used as a practical proxy for sample bias, not a direct measurement of gradient disagreement.

## Contributions

- Proposes a sample-level perspective on client drift and a dynamically recomputed loss ordering.
- Introduces FedBSS, combining full-data warmup, uncertainty-based partitioning, and progressive inclusion of higher-loss samples.
- Evaluates label skew, feature skew, label noise, and alternative warmup and sample-selection choices.

## Method

During warmup, clients train on all their local samples. Subsequently, each participating client evaluates its samples with the received global model and sorts them by loss. For predicted class probabilities, the uncertainty score is

$$u(x)=1-[\max_k p_k(x)-\min_k p_k(x)].$$

The loss of the maximum-uncertainty sample defines the boundary between the lower-loss and higher-loss groups. These groups are called “unbiased” and “biased” in the paper; the names do not establish statistical unbiasedness.

Local training starts with the lower-loss group and progressively includes higher-loss samples in loss order. At local epoch $e$ out of $E$, the inclusion fraction follows $r(e)=[1-\cos(\pi e/E)]/2$ (Equation 6). Scores and the partition are recomputed across communication rounds. Warmup provides initial knowledge before relying on this changing partition.

## Experiments

The main simulation uses 100 clients, 10% participation per round, 200 communication rounds, 10 local epochs, batch size 64, and 50 warmup rounds. Fashion-MNIST uses a small CNN; CIFAR-10 and CIFAR-100 use ResNet-50. Comparisons include FedAvg, FedProx, FedExP, FedLC, FedRS, SCAFFOLD, FedCDA, and InCo. Reported means and standard deviations summarize the final 10 rounds of each run, rather than clearly specified independent-seed uncertainty.

Selected test accuracies from Tables 1–2:

| Setting | FedBSS | Best competing result |
| --- | --- | --- |
| CIFAR-10, Dirichlet 0.5 | 45.27 ± 0.19% | FedLC: 40.76 ± 1.02% |
| CIFAR-100, Dirichlet 0.1 | 18.37 ± 0.27% | FedRS: 14.02 ± 0.12% |
| Fashion-MNIST, 8 shards/client | 79.31 ± 0.87% | SCAFFOLD: 82.51 ± 0.99% |
| CIFAR-10, 8 shards/client | 34.04 ± 0.23% | FedAvg: 36.18 ± 2.25% |
| CIFAR-10, 50% noisy labels | 38.96 ± 0.19% | FedCDA: 30.49 ± 0.28% |

FedBSS has the highest mean in all nine Dirichlet comparisons and all nine noisy-label comparisons. For feature skew, six DomainNet clients each represent one domain, all participate, and ResNet-18 classifies ten categories. The text reports improvement over FedAvg on each domain and the global model; numerical values are presented only graphically.

Warmup comparisons use 0, 25, 50, and 100 rounds. The authors report worse results without warmup and sensitivity to excessive warmup. They also report that cosine inclusion outperforms permanent filtering and linear inclusion, without numerical ablation tables in the supplied text.

## Limitations

The evidence is empirical and does not establish a convergence guarantee or prove that loss reliably measures drift across tasks. Warmup length is sensitive and 50 rounds is not claimed to be universally optimal. Per-round scoring and sorting add work, but runtime overhead is not quantified. Feature-skew evidence compares with FedAvg on a restricted ten-category task. Label-noise generation details and independent-run counts are not clearly specified in the supplied text. Some shard settings favor competing methods.

The supplied Markdown does not establish a publication year, venue, DOI, or identifier; these are left unspecified.

## Related Concepts

- [[concepts/client-drift|Client Drift]]: the optimization problem targeted through sample scheduling.
- [[concepts/heterogeneous-federated-reinforcement-learning|Heterogeneous Federated Reinforcement Learning]]: a related setting where differing local environments complicate shared-model training; FedBSS is evaluated on supervised classification.

## Related Papers

- SCAFFOLD: Stochastic Controlled Averaging for Federated Learning (Karimireddy et al., 2020): a cited gradient-control baseline.
- Federated Optimization in Heterogeneous Networks (Li et al., 2020): introduces the proximal approach used as FedProx.
- [[papers/heterogeneous-federated-reinforcement-learning-using-wasserstein-barycenters|Heterogeneous Federated Reinforcement Learning Using Wasserstein Barycenters]]: a library comparison addressing model fusion through aggregation geometry rather than sample scheduling; not a cited FedBSS baseline.

[[index|Library home]]
