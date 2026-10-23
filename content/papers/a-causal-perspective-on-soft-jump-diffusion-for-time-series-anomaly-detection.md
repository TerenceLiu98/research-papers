---
title: "A Causal Perspective on Soft Jump-Diffusion for Time-Series Anomaly Detection"
type: paper
authors:
  - Anonymous authors
year: null
tags:
  - time-series
  - anomaly-detection
  - jump-diffusion
  - regime-modeling
  - counterfactual-learning
---

## TL;DR

CSJD-AD models normal time-series behavior with environment-conditioned latent drift and diffusion, then uses a differentiable soft-gated jump to represent deviations that those regime-specific dynamics do not explain. It contrasts diffusion-only and jump-augmented latent trajectories and reports strong F1 and AUCPR across ten benchmarks. Its counterfactual language refers to interventions inside the learned model, not identification of real-world causal effects.

## Research Question

Can [[concepts/time-series-anomaly-detection|Time-Series Anomaly Detection]] distinguish benign operating-regime changes from anomalous structural deviations by jointly learning discrete environments, smooth stochastic dynamics, and soft jumps?

## Motivation

Stationary reconstruction and density models can flag a legitimate shift in operating conditions as anomalous because they compare observations with a single reference distribution. The paper instead treats normality as regime-dependent: a latent environment code selects the dynamics expected for the current operating state, while a jump represents behavior not explained by those dynamics.

## Contributions

- A variational encoder that infers a continuous window-level latent state and a discrete environment code from the same observed window.
- An environment-conditioned [[concepts/jump-diffusion-models|Jump-Diffusion Model]] whose jump contribution is a differentiable product of a learned propensity and jump magnitude.
- Paired diffusion-only and jump-augmented trajectories, with a contrastive loss based on their discrepancy.
- Evaluation on ten public anomaly-detection benchmarks, including component ablations, environment-code interventions, perturbation tests, and a WADI case study.

## Method

The encoder maps a window $X$ to a Gaussian latent state $U$ and a Gumbel-Softmax environment code $E$. Networks conditioned on $E$ parameterize drift, diffusion, jump magnitude, and a scalar jump gate. Euler-Maruyama integration produces a no-jump latent endpoint $U_{\mathrm{CF}}$; the jump-augmented path is

$$
U_{\mathrm{F}} = U_{\mathrm{CF}} + p_E(U_{\mathrm{CF}},E)J_E(U_{\mathrm{CF}},E).
$$

The model blends these endpoints and decodes the result to reconstruct the input. Its objective combines reconstruction error, a weighted squared discrepancy between $U_{\mathrm{F}}$ and $U_{\mathrm{CF}}$, Gaussian KL regularization for $U$, and an entropy-based regularizer for $E$. At inference, the total loss is used as the window anomaly score.

The paper gives two operational interventions on the learned computation graph: suppressing the jump while retaining the inferred environment, and replacing the inferred environment with a prescribed code before recomputing the score. These are model-implied counterfactuals. The authors explicitly state that they do not establish causal identification from observational time series.

## Experiments

The study uses eight multivariate datasets (ASD, ECG, MSL, SMAP, SMD, SWaT, WADI, and PSM) and two univariate datasets (Yahoo and KPI). Multivariate experiments use anomaly-free training splits; Yahoo and KPI are treated as unsupervised because their manually created training splits may contain anomalies. All methods are evaluated with point-wise F1 and AUCPR without point adjustment. CSJD-AD uses a fixed window length of 200 and is compared with eleven VAE-, Transformer-, diffusion-, and CNN-based detectors.

The reported F1 scores for CSJD-AD range from 0.346 on KPI to 0.966 on Yahoo; reported AUCPR ranges from 0.342 on KPI to 0.938 on Yahoo. The paper reports the best F1 among compared methods on nine of ten datasets, with Sensitive-HUE higher on SWaT, and the best reported AUCPR on eight of ten, with Sensitive-HUE higher on SWaT and the soft-gate ablation slightly higher on ASD. This qualifies the paper's broader claim of state-of-the-art performance across every benchmark and metric.

Ablations are mixed but generally support the full design. Removing the factual path substantially lowers F1 on ASD, Yahoo, and KPI, while removing the environment code has little effect on SMD and slightly improves its AUCPR. Removing the causal or KL loss slightly improves F1 on ASD, and removing the gate slightly improves AUCPR there. At test time, shuffling environment assignments lowers F1 by about 0.13 on average, while forcing a single environment lowers it by about 0.025. Noise and missing-value tests show dataset-dependent changes rather than uniform degradation; mild noise improves several scores. On WADI, the qualitative case study shows local attacks without environment switches, benign environment switches without alarms, and attacks that coincide with a new inferred regime.

## Limitations

- The discrete environment code is inferred without regime labels. Cluster separation and performance degradation under code overrides show that the code is used by the model, but do not prove that it recovers true causal environments.
- “Counterfactual” and $do(\cdot)$ refer to clamping internal model nodes. They should not be interpreted as estimates of interventions on the physical data-generating system.
- One expected soft jump per window is a first-moment approximation to aggregate jump effects; it does not recover the number or timing of physical shocks within a window.
- The anomaly score is the training loss, combining reconstruction and regularization terms. The supplied text does not establish calibration of this score or deployment-specific false-alarm behavior.
- Results rely on point-wise F1 and AUCPR over established benchmarks. Some ablations outperform the default on individual dataset-metric pairs, and the robustness results vary by dataset and corruption level.
- The supplied manuscript is anonymous and under double-blind review; it provides no publication year, venue, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/time-series-anomaly-detection|Time-Series Anomaly Detection]]: the detection task and evaluation setting studied across all ten datasets.
- [[concepts/jump-diffusion-models|Jump-Diffusion Models]]: the stochastic-process template adapted with environment-conditioned neural drift, diffusion, and expected soft jumps.
- [[concepts/concept-drift-in-time-series|Concept Drift in Time Series]]: a neighboring account of changing temporal regimes, although this paper focuses on anomaly scoring rather than online forecast adaptation.
- [[concepts/causal-representation-learning|Causal Representation Learning]]: the broader effort to encode mechanism-related latent factors; this paper makes only an operational, model-internal causal claim.

## Related Papers

- Merton (1976), "Option pricing when underlying stock returns are discontinuous": the classical jump-diffusion reference adapted by the method.
- Jia and Benson (2019), "Neural Jump Stochastic Differential Equations": a neural jump-SDE precedent that the paper distinguishes from dense sensor-stream anomaly detection.
- [[papers/neural-mjd-neural-non-stationary-merton-jump-diffusion-for-time-series-prediction|Neural MJD: Neural Non-Stationary Merton Jump Diffusion for Time Series Prediction]]: another neural jump-diffusion model, designed for forecasting rather than anomaly detection.
- [[papers/paano-patch-based-representation-learning-for-time-series-anomaly-detection|PaAno: Patch-Based Representation Learning for Time-Series Anomaly Detection]]: a contrasting normal-only detector with explicit attention to evaluation methodology.

[[index|Library home]]
