---
title: Lightweight multi-period universal representation learning for multivariate time series
type: paper
authors:
  - Lei Chen
  - Bowen Hu
  - Ying Zou
  - Bisheng Wen
  - Xinyao Li
  - Ming Lu
year: null
tags:
  - time-series
  - representation-learning
  - edge-computing
---

## TL;DR

TS-Linear learns multivariate time-series representations using multiple period-specific Fourier-inspired feature extractors, shallow MLP decoders, and a shared temporal aggregator. The paper evaluates forecasting, classification, and anomaly detection across 26 datasets. Its clearest result is competitive representation quality with fast edge inference: the reported Raspberry Pi 4b experiment takes 8.4 seconds for 1,000 test points and uses 175 MB RAM. Accuracy gains depend on dataset, horizon, and metric.

## Research Question

Can shallow MLP-based representations capture multiple temporal periods and cross-variable dependencies while supporting several downstream tasks on resource-constrained devices?

## Motivation

Deep temporal encoders can impose substantial compute and memory costs at the edge. Single shallow models may miss intertwined periodic patterns. TS-Linear divides representation learning across selected periods and shares features across variable-specific reconstruction tasks.

## Contributions

- A three-stage architecture for period selection, period-specific representation, and context-aware aggregation.
- A trainable sinusoidal feature construction with a separate bias term intended to capture trends.
- A shared-encoder, variable-specific-decoder structure, called “1+M,” used in both reconstruction and aggregation.
- Evaluations against eleven baselines, including TS2Vec, TimesNet, DLinear, MF-CLR, and SISSEL, plus deployment on Raspberry Pi 4b and Jetson Xavier NX.

## Method

For an input with M variables and T timestamps, the model produces d-dimensional timestamp representations.

1. **Select periods.** Segment the training data, apply FFT, average amplitudes across variables and segments, and select representatives from zones of sorted amplitudes. The source's conversion from these representatives to period lengths is ambiguous: Equation 1 divides segment length by a quantity explicitly called an amplitude, rather than clearly specifying a frequency index.
2. **Learn each period separately.** Use non-overlapping segments whose starting offsets change between epochs. The shared extractor learns sine/cosine amplitudes, frequencies, phases, timestamp inputs, and bias terms. M separate two-layer ReLU MLPs reconstruct the variables under an MSE objective. Period branches can run independently.
3. **Aggregate representations.** Concatenate the K period representations, project back to dimension d, and combine a trailing window of L timestamps with learned elementwise weights. Variable-specific decoders predict the current and next P−1 observations using overlapping samples and MSE. This future-oriented objective trains the aggregated representation.

The default period count is K=4. Reported optimization uses Adam, learning rate 0.001, batch size 64, dropout 0.5, and seed 42. Dataset-specific configurations use reported optima or genetic-algorithm tuning. “Universal” refers to application across tasks, rather than a demonstrated single pretrained model transferring across all datasets.

## Experiments

The downstream protocol replaces raw inputs with learned representations and uses ridge regression for forecasting, SVM for classification, and L1-distance-based anomaly detection. These are representation-pipeline comparisons, not necessarily the original end-to-end settings of every baseline.

| Evaluation | Reported evidence |
| --- | --- |
| Forecasting | Ten datasets; horizons 24, 48, 96, 288, and 672; MSE and MAE |
| Classification | Nine datasets; accuracy and AUPRC |
| Anomaly detection | Seven datasets; F1, precision, recall, accuracy, and AUC |
| Edge efficiency | ETTh1 48-step forecasting on two edge platforms |

Table 4 reports ETTh1 48-step MSE of 0.3127 for TS-Linear versus 0.3585 for TimesNet and 0.3500 for SISSEL. Performance is not uniformly strongest: ETTh2 at 96 steps reports 1.4250 versus 0.3590 for iTransformer. Table 5 reports Chinatown accuracy of 0.9971 but UCIHAR accuracy of 0.9440 versus SISSEL's 0.9820. Table 6 reports best AUC on six of seven datasets; WADI is the exception, with 0.8199 versus SISSEL's 0.9498.

Table 7 reports 102.3K parameters and 1.16G FLOPs. PC training takes 7.9 seconds per epoch and all-point testing 1.1 seconds. Jetson testing takes 4.5 seconds for 3,000 points; Raspberry Pi testing takes 8.4 seconds for 1,000 points. DLinear has lower FLOPs (0.12G) and slightly lower Raspberry Pi memory (172 MB versus 175 MB), so TS-Linear does not minimize every resource measure.

Ablations on six datasets at a 48-step horizon favor multiple periods over a random single scale (mean MSE 0.4464 versus 0.5264). Removing context aggregation increases ETTh1 MSE from 0.3127 to 0.7233. Fourier-extractor and shared-decoder ablations also favor the full design. Sensitivity analyses show dataset-dependent choices of representation dimension, period count, context length, and prediction length.

## Limitations

- The supplied Markdown has corrupted mathematical symbols and an incomplete forecasting table. Publication year, venue, and DOI are not established; year is left null.
- The stated universal 60/40 split conflicts with several dataset counts in Table 2. The text also describes label-free representation training alongside downstream SVM classification without fully clarifying label use at each stage.
- The period-conversion notation and trainable timestamp-indexed parameters leave implementation and unseen-sequence handling insufficiently clear from the text alone.
- The abstract's broad ranking claims exceed the displayed results. Long-horizon forecasting and some classification metrics show substantial exceptions.
- Timing measurements are specific to the reported workloads and hardware; the text gives differing overall speedup ranges. Fixed seed 42 is reported without a multi-seed uncertainty analysis.

## Related Concepts

- [[concepts/time-series-anomaly-detection|Time-Series Anomaly Detection]]: one downstream use of the learned representation, evaluated through L1-distance scoring.

## Related Papers

- Yue et al. (2022), *TS2Vec: Towards Universal Representation of Time Series*: universal-representation baseline cited as reference 9.
- Wu et al. (2023), *TimesNet: Temporal 2D-Variation Modeling for General Time Series Analysis*: cited inspiration for period selection (reference 10).
- [[papers/joint-embeddings-go-temporal|Joint Embeddings Go Temporal]]: a library comparison using latent prediction for temporal representations, rather than TS-Linear's variable reconstruction; not a cited predecessor.

Source code listed in the paper: https://github.com/infogroup502/TSLinear.
