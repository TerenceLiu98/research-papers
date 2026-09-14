---
title: Joint Embeddings Go Temporal
type: paper
authors:
  - Sofiane Ennadir
  - Siavash Golkar
  - Leopoldo Sarra
year: null
tags:
  - time-series
  - self-supervised-learning
  - representation-learning
  - joint-embedding-predictive-architectures
---

## TL;DR

TS-JEPA learns time-series representations by predicting masked patch embeddings from visible patches, using a slowly updated target encoder. With frozen-encoder evaluation, it leads the compared self-supervised methods on FordA and FordB classification, but falls behind MAE on the other three classification datasets. Forecasting results are mixed: autoregression generally does better on next-patch prediction, while the authors report lower cumulative rollout error for TS-JEPA on two of three datasets. These experiments motivate further work on time-series foundation models; they do not demonstrate a broadly pretrained foundation model.

## Research Question

Can a joint-embedding predictive objective learn time-series representations that support both classification and forecasting, including transfer to related classification datasets?

## Motivation

Reconstructing raw observations may require modeling noise and unpredictable variation. The paper proposes predicting learned targets in latent space to emphasize predictable structure instead. This is the motivation for TS-JEPA, rather than an experimentally established guarantee of noise robustness.

## Contributions

- Adapts the [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architecture]] to univariate temporal sequences with patch tokenization and positional encoding.
- Compares latent prediction with contrastive, masked input-reconstruction, and autoregressive pretraining using matched encoder dimensions and attention-head counts.
- Evaluates classification, transfer between related classification datasets, limited-label learning, and short- and long-term forecasting.

## Method

Each series is divided into 10 non-overlapping patches, embedded with a 1D convolution and absolute sinusoidal positional encodings. Uniform masking hides 70% of patches. A transformer encoder processes the visible patches; a transformer predictor maps these representations to predictions for the masked positions. A second encoder embeds the masked patches to supply targets. Its parameters follow an exponential moving average (EMA) of the main encoder, with momentum 0.998, rather than direct gradient updates.

For visible indices $\mathcal N$ and masked indices $\mathcal M$, the objective is

$$
\mathcal L = \frac{1}{|\mathcal M|}\sum_{i\in\mathcal M}
\left\|P_\beta(E_\theta(\mathcal P_{\mathcal N}))_i-t_i\right\|_1,
\qquad t_{\mathcal M}=E_{\bar\theta}(\mathcal P_{\mathcal M}).
$$

The encoder and predictor use embedding dimension 128 and two attention heads. Training uses AdamW, batch size 32, and learning-rate search over $10^{-3},10^{-4},10^{-5},10^{-6}$. The MAE comparison uses 75% masking. For the main downstream protocol, the pretrained encoder is frozen and a small classification or regression head is trained; the source does not fully specify the heads, so this should not automatically be equated with strictly linear probing.

## Experiments

**Classification.** Table 1 reports accuracy in percent, with standard deviations over 10 runs. FordB uses an encoder pretrained on FordA, and FaultDetectionB uses one pretrained on FaultDetectionA. The other rows use the same dataset for pretraining and downstream evaluation.

| Dataset | TS2Vec | MAE | Autoregressive | TS-JEPA |
| --- | --- | --- | --- | --- |
| FordA | 86.4 +/- 0.2 | 85.1 +/- 0.6 | 69.6 +/- 0.4 | 91.5 +/- 0.1 |
| FordB (transfer) | 72.4 +/- 0.7 | 59.6 +/- 0.5 | 61.9 +/- 0.3 | 73.8 +/- 0.3 |
| FaultDetectionA | 83.9 +/- 0.4 | 90.4 +/- 0.3 | 81.6 +/- 0.2 | 85.8 +/- 0.1 |
| FaultDetectionB (transfer) | 53.9 +/- 0.6 | 54.3 +/- 0.4 | 51.4 +/- 0.7 | 50.6 +/- 1.3 |
| ECG5000 | 86.9 +/- 0.3 | 91.6 +/- 0.7 | 87.5 +/- 0.2 | 89.5 +/- 0.1 |

TS-JEPA exceeds autoregression and TS2Vec on four of five rows, but exceeds MAE on only two. Its FordA accuracy approaches the fully supervised transformer's 91.8 +/- 0.5%; on FaultDetectionA, it trails both the supervised transformer (91.8 +/- 0.8%) and CNN (98.4 +/- 0.3%). Frozen random-encoder controls are substantially weaker, with accuracies from 40.2% to 58.4% across these datasets.

**Limited labels.** With 5%-20% of labels and the remaining samples used as unlabeled pretraining data, the authors report better sample efficiency than a fully supervised transformer on FordA and FaultDetectionA (Figure 2). The gap narrows as more labels become available. Exact plotted values are not given in the supplied text.

**Forecasting.** Next-patch prediction uses ETT-Small, Weather, and Electricity. Table 2 reports:

| Dataset | Autoregressive MSE | TS-JEPA MSE | Autoregressive MAE | TS-JEPA MAE |
| --- | --- | --- | --- | --- |
| ETT-Small | 0.009 | 0.017 | 0.083 | 0.110 |
| Weather | 0.022 | 0.015 | 0.108 | 0.109 |
| Electricity | 0.010 | 0.014 | 0.076 | 0.086 |

Autoregression wins five of the six dataset-metric comparisons; Weather MSE is the exception to the text's broad statement that autoregression performs better at short horizons. For longer horizons, the authors report lower cumulative MSE for TS-JEPA on ETT and Electricity, but not Weather, under autoregressive rollout (Figure 3). Numerical rollout scores are not supplied in the text. Appendix Table 3 shows substantial learning-rate sensitivity for both methods.

## Limitations

- The study focuses on univariate data and small dataset-specific pretraining runs. Multivariate adaptation and foundation-model scaling remain proposed extensions.
- Transfer evidence is mixed: FordA-to-FordB is favorable, whereas FaultDetectionA-to-FaultDetectionB trails every compared pretrained method.
- No architectural ablation is reported. EMA is motivated as a defense against collapse, but the paper does not provide an EMA ablation or a general collapse-prevention proof. Dedicated noise or confounder robustness experiments are also absent.
- Forecasting comparisons shown in Table 2 cover only autoregression and TS-JEPA. The results do not establish superiority over the broader forecasting literature.
- The supplied Markdown omits a publication year, paper identifier, and the GitHub URL referenced by a footnote. It ends at the Table 4 caption, without the dataset statistics. Forecast horizons, head details, and numerical uncertainty for forecasting are not fully recoverable from the text. The body names ECG500, while Table 1 names ECG5000; the table label is retained here.

## Related Concepts

- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]
- [[concepts/linear-probing|Linear Probing]]: related frozen-representation evaluation, with the head-capacity qualification above.
- [[concepts/function-space-autoencoders|Function-Space Autoencoders]]: a related representation-learning family based on reconstruction of functional observations.

## Related Papers

- Assran et al. (2023), "Self-supervised learning from images with a joint-embedding predictive architecture": the image JEPA predecessor cited as reference [1].
- Yue et al. (2022), "TS2Vec: Towards universal representation of time series": the contrastive baseline, reference [20].
- Verdenius, Zerio, and Wang (2024), "Lat-PFN: A joint embedding predictive architecture for in-context time-series forecasting": related temporal JEPA work cited as reference [19].
- [[papers/functional-autoencoders-for-functional-data-representation-learning|Functional Autoencoders for Functional Data Representation Learning]]: a library comparison for learning finite-dimensional representations of temporal or functional observations through reconstruction; not a cited baseline in this paper.

[[index|Library home]]
