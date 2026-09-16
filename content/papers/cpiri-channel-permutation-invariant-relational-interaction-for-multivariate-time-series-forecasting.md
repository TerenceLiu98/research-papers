---
title: "CPiRi: Channel Permutation-Invariant Relational Interaction for Multivariate Time Series Forecasting"
type: paper
authors:
  - Jiyuan Xu
  - Wenyu Zhang
  - Xin Jing
  - Shuai Chen
  - Shuai Zhang
  - Jiahao Nie
year: null
tags:
  - time-series-forecasting
  - multivariate-time-series
  - permutation-equivariance
  - foundation-models
---

## TL;DR

CPiRi inserts trainable cross-channel attention between a frozen Sundial temporal encoder and decoder. It combines channel-wise temporal representations with content-based interactions and training-time channel shuffling. The reported results show strong forecasting accuracy, robustness to channel reordering, and useful transfer from a subset of training channels to the full channel set. These tests do not establish general robustness to simultaneous topology and distribution shifts, and several prose claims require qualification against the tables.

## Research Question

Can a multivariate forecaster capture cross-channel dependencies while remaining insensitive to arbitrary channel ordering and generalizing to channels absent during task-specific training?

## Motivation

Channel-independent forecasting preserves flexibility but omits explicit interactions between series. Channel-dependent models can exploit those interactions while becoming tied to channel indices or fixed structures. Sensor reordering and changes in channel availability motivate separating reusable temporal features from content-based relational modeling. Channel shuffling provides a diagnostic for order sensitivity; it does not by itself test every form of changing sensor configuration.

## Contributions

- A temporal-spatial-temporal pipeline with a frozen univariate foundation model and a trainable spatial attention module.
- Paired input/target channel shuffling during training, framed as permutation-focused augmentation rather than task-adaptive meta-learning.
- An equivariance argument for the composed architecture, alongside permutation, subset-channel, ablation, and scalability experiments.

## Method

Given history $X\in\mathbb R^{L\times C}$, the model forecasts $Y\in\mathbb R^{T\times C}$. A shared frozen Sundial encoder independently processes each channel and supplies its final patch representation $h_c\in\mathbb R^D$. A trainable Transformer spatial module attends across the set of channel representations without channel-position cues. The shared frozen Sundial decoder independently maps each updated representation to its channel forecast (Sections 3.2-3.3).

At each training step, the same random channel permutation is applied to inputs and targets. Only spatial-module parameters are updated:

$$
\min_\theta\;\mathbb E_{(X,Y),\pi}
\left[\mathcal L(F_\theta(XP_\pi),YP_\pi)\right],
$$

where $P_\pi$ permutes channel columns. The relevant architectural property is [[concepts/channel-permutation-equivariance|Channel Permutation Equivariance]]:

$$
F(XP_\pi)=F(X)P_\pi.
$$

Predictions follow the reordered channels; an aggregate error can then be invariant when targets are reordered consistently. Shared channel-wise encoding/decoding and position-free channel attention preserve this property. The paper calls the resulting performance property channel permutation invariance (CPI).

Experiments use history and horizon lengths of 336, dropout 0.3, and an NVIDIA A800 with 80 GB memory. Appendix Table 8 lists hidden dimension 768, 12 attention heads, learning rate 0.001, and four layers. The main text describes a single Transformer encoder block, leaving the exact layer assignment unclear. The supplied algorithms leave the forecasting loss as a generic `Loss` function.

## Experiments

The six standard datasets are METR-LA, PEMS-BAY, PEMS-04, PEMS-08, SD, and Electricity. BasicTS+ supplies preprocessing and split protocols. The authors report five training runs and compare against DLinear, PatchTST, Informer, CrossGNN, TimeXer, iTransformer, STID, Crossformer, and pretrained Chronos-Bolt, Sundial, and Timer-XL baselines.

Selected results from Table 1:

| Dataset | CPiRi WAPE | CPiRi MAE | Best baseline WAPE |
| --- | --- | --- | --- |
| METR-LA | 9.14% | 4.62 | 8.48% (STID) |
| PEMS-BAY | 3.90% | 2.36 | 3.91% (STID) |
| PEMS-04 | 11.67% | 23.96 | 12.43% (STID) |
| PEMS-08 | 9.43% | 17.46 | 10.70% (iTransformer) |
| SD | 12.25% | 26.85 | 12.45% (iTransformer) |
| Electricity | 9.90% | 235.33 | 10.22% (Chronos-Bolt) |

CPiRi has the lowest listed WAPE on five of six datasets. It does not uniformly win MAE: STID obtains 26.64 on SD and ties CPiRi at 2.36 on PEMS-BAY. The authors attribute the METR-LA disadvantage to exogenous holiday features used by STID and Crossformer.

**Permutation tests.** Table 3 reports PEMS-08 WAPE of 9.43% for CPiRi at every tested shuffle fraction from 0% to 100%. iTransformer is also unchanged at 10.70%. Informer rises from 13.02% to 118.19%, and STID from 10.90% to 65.18%. This supports order robustness without making it unique to CPiRi. Table 2 separately reports CPiRi test-shuffle and train-shuffle rows of 10.08% and 9.43% on PEMS-08, so these rows should not be conflated with Table 3's fixed-model permutation comparison.

**Subset-channel generalization.** Models train on 25%, 50%, or 75% of channels and are evaluated on all channels without retraining. Table 10 reports PEMS-08 WAPE of 10.72% with shuffling versus 14.22% without it when only 25% of channels are used for training. With all channels, the corresponding values are 9.43% and 10.08%. This demonstrates a larger observed augmentation benefit under limited channel coverage; Appendix A.1.4 explicitly leaves a comprehensive direct addition/removal benchmark to future work.

**Ablations.** On PEMS-08, Table 4 reports WAPE of 22.69% without the spatial module, 52.29% without pretrained weights, 11.17% with a three-layer encoder trained from scratch, and 10.80% when jointly fine-tuning the encoder. Late encoder fine-tuning improves METR-LA and SD but worsens the other three datasets; the authors report roughly fivefold higher training memory for that variant.

**Scale and efficiency.** Table 5 extends evaluation to GBA, GLA, and CA, with up to 8,600 channels. On CA, CPiRi achieves 12.68% WAPE versus Sundial's 23.60%. Table 6 reports compiled batch-four inference of 1.62 seconds and 32.00 GB GPU memory for CPiRi, expressed as averages of 0.41 seconds and 8.00 GB per instance. Sundial uses 1.61 seconds and 20.68 GB for batch four. These average memory figures are not batch-one peak measurements. iTransformer is faster at a reported 0.20 seconds per instance, while Timer-XL uses 75.68 GB at batch one.

**Statistical comparison.** Table 11 reports one-tailed Wilcoxon tests across five datasets: $p=0.031$ against the listed shuffled-condition baselines, but $p=0.156$ against fixed-order STID and Crossformer. These are dataset-level comparisons, not five-run confidence intervals for every result.

## Limitations

- **Symmetry and generalization:** Equivariance constrains behavior under reindexing. It does not guarantee accuracy on added channels, causal relationship recovery, or robustness to distribution shifts. Subset-training/full-set evaluation is narrower than an operational co-drift benchmark.
- **Augmentation mechanism:** For an exactly equivariant deterministic model and a permutation-invariant loss, paired shuffling leaves each example's objective unchanged. The reported training gains therefore need an implementation or stochastic-optimization explanation beyond the architectural symmetry argument. Finite augmentation alone does not prove exact equivariance for an arbitrary model.
- **Reporting consistency:** Section 4.2 claims a WAPE deviation below 0.25% across datasets, but Table 2's SD rows differ by 1.21 percentage points. The prose's roughly 2% accuracy-loss summary for training on 25% of channels is not a uniform relative-WAPE result: PEMS-08 rises from 9.43% to 10.72%. Main-text references to five benchmarks omit Electricity from the six-dataset table.
- **Architectural and computational detail:** The single-block description and four-layer hyperparameter entry need reconciliation. Spatial attention still scales quadratically in channel count; the paper's abbreviated complexity expressions do not specify all channel-wise backbone costs or establish a general complexity characterization of competing implementations.
- **Scope:** Evaluation is dominated by traffic data at one history/horizon setting. The authors identify static temporal-spatial fusion as a weakness under abrupt trend shifts and leave external unstructured signals and dynamic fusion to future work. Pretrained baselines and task-trained models have different adaptation budgets.
- **Metadata:** The supplied Markdown provides no explicit publication year, confirmed venue, DOI, or arXiv identifier for CPiRi. It names the code repository as `JasonStraka/CPiRi`; its contents were not inspected for this ingest.

## Related Concepts

- [[concepts/channel-permutation-equivariance|Channel Permutation Equivariance]]: distinguishes reorder-consistent predictions from accuracy under changing channel sets.
- Frozen temporal feature extraction and content-based cross-channel attention.
- Inductive generalization from partial channel coverage.

## Related Papers

- [[papers/multivariate-time-series-forecasting-needs-cross-variable-loss|Multivariate Time Series Forecasting needs Cross Variable Loss]]: a related library paper that constrains cross-variable forecast residuals through the training objective. CPiRi instead modifies input-side representations; this is a thematic connection, not a citation in CPiRi.
- Liu et al. (2025), "Sundial: A Family of Highly Capable Time Series Foundation Models": the cited frozen temporal backbone.
- Liu et al. (2024), "iTransformer: Inverted Transformers Are Effective for Time Series Forecasting": a cited cross-channel baseline that also passes the reported permutation test.
- Zaheer et al. (2017), "Deep Sets": cited motivation for permutation-aware set functions.

[[index|Library home]]
