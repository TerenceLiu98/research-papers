---
title: "DisMS-TS: Eliminating Redundant Multi-Scale Features for Time Series Classification"
type: paper
authors:
  - Zhipeng Liu
  - Peibo Duan
  - Binwu Wang
  - Xuan Tang
  - Qi Chu
  - Changsheng Zhang
  - Yongsheng Huang
  - Bin Zhang
year: 2025
venue: "ACM Multimedia (MM '25)"
doi: "10.1145/3746027.3754842"
tags:
  - time-series
  - classification
  - multi-scale-learning
  - representation-learning
---

## TL;DR

DisMS-TS separates each temporal-scale embedding into shared and scale-specific components, averages the shared components, and retains the specific components for classification. It achieves the highest mean accuracy, macro-F1, and MCC on five of six datasets against seven baselines; Pathformer performs slightly better on AWR. Its largest reported accuracy gain is 9.71% relative on Finger Movements, corresponding to 5.40 percentage points (61.00% versus 55.60%).

## Research Question

Can separating information shared across temporal resolutions from information specific to each resolution improve time-series classification over direct scale-wise feature fusion?

## Motivation

Downsampled versions of a time series preserve overlapping information. Weighting whole scale embeddings couples the weight on that shared information to the weights on scale-specific information. Section 3.2 illustrates this with an additive model: if each scale contains $F_{\mathrm{sha}}+F_{s,\mathrm{spe}}$, weighted fusion gives the shared feature coefficient $\sum_s\alpha_s$, which need not equal its desired coefficient. This motivates [[concepts/shared-and-scale-specific-temporal-representations|Shared and Scale-Specific Temporal Representations]].

## Contributions

- An additive analysis of how scale-wise fusion can over- or underweight shared features.
- A temporal disentanglement module using complementary masks, paired with shared-feature similarity and specific-feature disparity losses.
- A supervised CNN-GRU classification framework evaluated on six datasets, with fusion replacements, local-encoder ablations, scale-count sensitivity, and representation visualizations.

## Method

**Multi-scale encoding.** Repeated average pooling produces $S$ coarser sequences alongside the original input. A convolutional local multi-channel projection processes each variable, and GRUs aggregate temporal information. Learned variable weights precede concatenation into each scale embedding $F_s$; the variable-weighting mechanism is unnecessary for univariate inputs (Sections 3.4-3.5).

**Complementary masks.** An MLP produces logits $M_s$. The shared mask is $m_s=\sigma(M_s/\tau)$ and the specific mask is $\sigma(-M_s/\tau)=1-m_s$:

$$
F_{s,\mathrm{sha}}=m_s\odot F_s,\qquad
F_{s,\mathrm{spe}}=(1-m_s)\odot F_s.
$$

The classifier combines the mean shared embedding with concatenated scale-specific embeddings through a two-layer feed-forward network (Sections 3.6-3.7). The supplied extraction damages the concatenation symbol in Equation 8; the surrounding text identifies the operation as concatenation.

**Objective.** Training combines cross-entropy with pairwise cosine-similarity penalties:

$$
\mathcal L=\mathcal L_{\mathrm{class}}+
\lambda_1\mathcal L_{\mathrm{sim}}+
\lambda_2\mathcal L_{\mathrm{dis}}.
$$

The shared penalty minimizes squared deviations of cross-scale cosine similarity from one; the specific penalty minimizes squared deviations from zero. Both average over distinct scale pairs. These encourage alignment and orthogonality, respectively, rather than proving independent latent factors.

## Experiments

**Protocol.** Five multivariate datasets (HAR, ISRUC-S3, NASDAQ, AWR, and Finger Movements) and the univariate Epilepsy dataset cover activity, sleep, financial, movement, speech-related, and seizure classification. The paper uses predefined UEA train-test splits for AWR and FM, and follows cited protocols for the other datasets. Results are means and standard deviations over five independent runs. Training uses Adam, learning rate 0.005, 100 epochs, and batch size 256 except 48 for ISRUC-S3, on one RTX 4070 Ti (Section 4.1).

**Main results.** Table 2 compares LSTNet, DTP, TS-TCC, PatchTST, MAGNN, Pathformer, and TimeMixer. Accuracy values below are percentages; differences are calculated from the displayed means.

| Dataset | DisMS-TS accuracy, mean +/- SD | Best baseline accuracy, mean +/- SD | Difference (percentage points) |
| --- | --- | --- | --- |
| HAR | 96.47 +/- 0.37 | 95.53 +/- 0.65 (TimeMixer) | +0.94 |
| ISRUC-S3 | 85.37 +/- 0.51 | 83.50 +/- 1.04 (TimeMixer) | +1.87 |
| NASDAQ | 39.71 +/- 0.76 | 38.42 +/- 0.75 (TimeMixer) | +1.29 |
| AWR | 98.27 +/- 0.86 | 98.43 +/- 1.13 (Pathformer) | -0.16 |
| FM | 61.00 +/- 3.16 | 55.60 +/- 1.85 (Pathformer) | +5.40 |
| Epilepsy | 71.30 +/- 0.71 | 69.18 +/- 0.88 (Pathformer) | +2.12 |

The paper reports t-test significance at $p<0.01$ for improvements over the best baseline on the five winning datasets. On AWR, macro-F1 is 98.23 versus Pathformer's 98.41, and MCC is 0.976 versus 0.981. On NASDAQ, the highest mean accuracy still accompanies a low MCC of 0.104.

**Ablations.** Removing local multi-channel projection reduces accuracy on every dataset. Replacing the disentanglement module and regularizers together with MAGNN or TimeMixer scale-wise fusion also reduces every mean accuracy. On FM, the full model reaches 61.00%, versus 51.40% without local projection, 52.50% with MAGNN fusion, and 56.60% with TimeMixer fusion (Table 3). The prose's claimed minimum relative gain of 6.84% over removal of local projection does not match AWR's displayed values, 98.27% versus 93.84%, which imply about 4.72%.

**Sensitivity and representations.** Section 4.4 varies the number of downsampling levels from zero to seven and reports optima of 3, 5, 5, and 6 for HAR, ISRUC-S3, NASDAQ, and Epilepsy. Larger values can hurt. The two loss weights are varied together on HAR and Epilepsy. Cosine-similarity matrices show aligned shared representations and weakly aligned specific representations; t-SNE plots separate specific embeddings by scale (Section 4.5).

## Limitations

- The additive argument illustrates a restriction of the stated fusion model; it is not a general impossibility result for nonlinear fusion architectures.
- Complementary masks sum to one but do not by themselves imply uncorrelated outputs. Cosine orthogonality, shared-vector alignment, and t-SNE separation do not establish statistical independence or recovery of generative factors.
- The fusion ablations replace the disentanglement module and both losses together. The loss-weight sweep ties the two weights, so these experiments do not isolate the individual regularizers' effects.
- Evaluation covers six datasets and does not show uniform superiority: Pathformer leads on AWR. The supplied paper provides no runtime or memory comparison.
- Several symbols and footnote destinations are missing or corrupted in the supplied Markdown. The stated public GitHub repository has no recoverable URL in this source, so none is inferred.

## Related Concepts

- [[concepts/shared-and-scale-specific-temporal-representations|Shared and Scale-Specific Temporal Representations]]: separates common information from resolution-dependent information before fusion.
- [[concepts/disentangled-representations|Disentangled Representations]]: broader factor-separation goal; DisMS-TS operationalizes separation through scale-based masks and geometric penalties.

## Related Papers

- Chen et al. (2023), "Multi-scale adaptive graph neural network for multivariate time series forecasting": MAGNN baseline and source of a replacement fusion mechanism.
- Chen et al. (2024), "Pathformer: Multi-scale transformers with adaptive pathways for time series forecasting": adaptive multi-scale baseline with the highest AWR scores.
- Wang et al. (2024), "TimeMixer: Decomposable multiscale mixing for time series forecasting": baseline and alternative fusion mechanism.
- Nie et al. (2022), "A time series is worth 64 words: Long-term forecasting with transformers": PatchTST, cited for patching and channel independence.
- [[papers/mts-jepa-multi-resolution-joint-embedding-predictive-architecture-for-time-series-anomaly-prediction|MTS-JEPA]]: a library comparison using multiple temporal resolutions for future anomaly prediction through self-supervised latent prediction; not a cited DisMS-TS baseline.

[[index|Library home]]
