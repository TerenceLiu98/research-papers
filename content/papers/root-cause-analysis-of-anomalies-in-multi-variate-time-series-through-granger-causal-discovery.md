---
title: "Root Cause Analysis of Anomalies in Multi-Variate Time Series through Granger Causal Discovery"
type: paper
authors:
  - Xiao Han
  - Saima Absar
  - Lu Zhang
  - Shuhan Yuan
year: null
source_job_id: d27a0568-279e-48dc-b855-f62e0261e0e4
tags:
  - time-series
  - granger-causality
  - root-cause-analysis
  - anomaly-detection
---

## TL;DR

AERCA jointly learns lagged dependencies and estimates exogenous variables from normal multivariate time series. It treats anomalies as interventions on those variables and localizes their origins using residual z-scores. Synthetic results are strong, but real-world top-ranked localization is weaker, and the method relies on independent exogenous noise, no hidden confounding, and no instantaneous effects.

## Research Question

Can an encoder-decoder learn Granger causal relationships while estimating the exogenous variables needed to identify both the affected series and the time steps where an anomaly originates?

## Motivation

An intervention can propagate through a system, making several measurements abnormal even though only some received the original disturbance. A dependency graph alone does not distinguish those origins from downstream effects. The paper proposes learning normal exogenous behavior alongside temporal dependencies so root-cause scores measure unexplained disturbances after accounting for the observed past.

## Contributions

- An encoder-decoder architecture combining [[concepts/granger-causality|Granger Causality]] discovery with explicit estimation of additive exogenous variables.
- A Gaussian KL constraint intended to encourage independence of the estimated exogenous variables, together with sparse and temporally smooth dependency coefficients.
- A finite-window decoder motivated by an autoregressive expansion, and a streaming residual-scoring procedure for [[concepts/root-cause-analysis-in-time-series|Root Cause Analysis in Time Series]].
- Evaluation of graph recovery, root-variable ranking, and localization at specific time steps on four synthetic and two real-world datasets.

## Method

**Generative assumption.** The model uses additive assignments

$$
x_t^{(j)}=f^{(j)}(\mathbf{x}_{<t})+u_t^{(j)}.
$$

An anomaly adds an intervention term to an exogenous variable, replacing $u_t^{(j)}$ with $u_t^{(j)}+\epsilon_t^{(j)}$ while retaining the temporal mechanism. The target is the variable-time pair receiving this intervention, including when its effects persist elsewhere (Sections 3 and 4.1).

**Encoder.** For each of $K$ lags, a neural network produces a data-dependent coefficient matrix. The encoder subtracts the resulting prediction from the current observation:

$$
\mathbf{u}_t=\mathbf{x}_t-\sum_{k=1}^{K}\omega_{\theta_k}(\mathbf{x}_{t-k})\mathbf{x}_{t-k}.
$$

The inferred residuals serve as exogenous-variable estimates. Under a multivariate Gaussian approximation, a KL penalty matches their distribution to a standard isotropic Gaussian. Independence is an intended consequence of this modeling constraint, not an independently established property of arbitrary residual distributions.

**Decoder and objective.** The decoder combines recent exogenous estimates, an older observed window, and the current exogenous estimate to reconstruct the current observation (Equation 9). An autoregressive expansion motivates using finite windows instead of the entire exogenous history. Training on normal data combines reconstruction error, the KL term, L1/L2 sparsity penalties, and temporal smoothness penalties on coefficient matrices. Graph strengths are obtained from median absolute coefficients over time, maximized over lags, then thresholded using a coefficient quantile (Section 4.2).

**Localization.** For each arriving observation, AERCA computes the exogenous estimate and its z-score relative to that series' normal residual mean and standard deviation. Streaming peaks-over-threshold (SPOT) determines a dynamic threshold for potential roots (Section 4.3). The supplied equation uses a signed z-score; it does not specify an absolute-value or two-sided scoring transformation.

## Experiments

**Setup.** Training uses only normal data. Synthetic datasets are Linear (4 variables), Nonlinear (6), Lotka-Volterra (40), and Lorenz 96 (20), with 5,000, 5,000, 40,000, and 200,000 training time steps respectively. Synthetic anomalies include point and sequential exogenous interventions. SWaT has 51 variables and 49,500 training steps; MSDS has 10 variables and 29,268 training steps. Real-world datasets evaluate localization only because causal graphs are unavailable (Table 1).

Appendix A.2.2 reports two-layer networks of width 50 for synthetic data and eight-layer networks of width 1,000 for real data, MinMax scaling, SWaT downsampling every 10 seconds, and MSDS downsampling every five steps. Training uses Adam with learning rate $10^{-6}$, up to 5,000 epochs, and early stopping after 20 epochs without loss improvement. Results are reported as means and standard deviations over five independent runs. The paper supplies the [AERCA code repository](https://github.com/hanxiao0607/AERCA); its contents were not inspected for this ingest.

**Graph recovery.** Comparators include VAR, cMLP, cLSTM, TCDF, eSRU, PCMCI, PCMCI+, GVAR, and CUTS. On Linear, AERCA and PCMCI+ both achieve F1, AUC-PR, and AUC-ROC of 1.000 with zero normalized Hamming distance. On Nonlinear, AERCA reports F1 $0.826\pm0.057$ and AUC-PR $0.996\pm0.013$ (Table 2). The continuation of Table 2 loses its dataset group headings in the supplied Markdown, so its numerical blocks are not reassigned here. The text reports strong nonlinear graph recovery, but does not establish a uniform win on every metric.

**Root-variable ranking.** Baselines are epsilon-Diagnosis, RCD, and CIRCA. AC@K counts true root variables among the top K, divided by $\min(K,\text{number of true roots})$, and averages over sequences. Avg@10 averages AC@k for k from 1 through 10. Selected unambiguous Table 3 values are:

| Dataset | AERCA AC@1 | AERCA AC@3 | AERCA Avg@10 |
| --- | --- | --- | --- |
| Linear | $1.000\pm0.000$ | $1.000\pm0.000$ | $1.000\pm0.000$ |
| Nonlinear | $1.000\pm0.000$ | $1.000\pm0.000$ | $1.000\pm0.000$ |
| Lotka-Volterra | $1.000\pm0.000$ | $1.000\pm0.000$ | $1.000\pm0.000$ |
| Lorenz 96 | $0.996\pm0.009$ | $0.996\pm0.009$ | $0.990\pm0.011$ |
| SWaT | $0.220\pm0.111$ | $0.290\pm0.088$ | Ambiguous cell placement |
| MSDS | $0.381\pm0.408$ | $0.908\pm0.062$ | $0.896\pm0.037$ |

SWaT performance remains low despite exceeding the listed baselines. On MSDS, CIRCA's AC@1 ($0.454\pm0.238$) and RCD's AC@1 ($0.412\pm0.048$) exceed AERCA's; RCD also has higher AC@5 (0.984 versus 0.974). AERCA has the highest listed MSDS Avg@10. AC@10 is saturated on datasets with at most ten variables, limiting its discriminatory value.

**Time-step localization.** Appendix A.2.3 ranks candidates across variables and time steps using AC*@K. AERCA's AC*@1 means are 0.763 (Linear), 0.433 (Nonlinear), 0.997 (Lotka-Volterra), 0.842 (Lorenz 96), 0.020 (SWaT), and 0.230 (MSDS). On SWaT, epsilon-Diagnosis has higher AC*@1 (0.075), although AERCA reaches AC*@100 of 1.000. Methods without time-specific predictions are assigned to the last step of a sliding window, an evaluation adaptation that should be retained when interpreting comparisons (Table 4).

**Ablation and sensitivity.** Removing the exogenous-independence constraint lowers reported graph-recovery performance, with a smaller effect on Lorenz 96 (Figure 2). Under longer sequences of interventions on different variables, variable-level ranking remains more stable than time-specific localization; Lotka-Volterra's time-specific performance deteriorates markedly as the candidate set grows (Appendix A.2.4). Exact plot values are not supplied in the Markdown text.

## Limitations

- Causal interpretation assumes no hidden confounders or instantaneous effects. The authors suggest violations of these assumptions and exogenous independence as possible reasons for weak SWaT performance; they do not isolate these explanations experimentally.
- The target is an additive exogenous intervention under a learned normal mechanism. The results do not establish robustness to changing mechanisms or arbitrary distribution shifts.
- Gaussian matching and reconstruction provide modeling constraints, but the supplied proposition motivates a decoder window rather than proving general identifiability of nonlinear causal structure or exogenous variables.
- Real-world graph recovery is untested, and strong synthetic ranking does not imply reliable top-one localization in deployment. Per-time-step evaluation also depends on the stated adaptation of baseline outputs.
- The supplied text has inconsistent coefficient direction descriptions and damaged recursive notation, while Tables 3 and 4 contain displaced or duplicated aggregate cells. This summary retains readable definitions and clearly aligned results without repairing those entries by inference.
- The supplied Markdown does not state this paper's publication year, venue, DOI, or arXiv identifier. These metadata remain unspecified.

## Related Concepts

- [[concepts/granger-causality|Granger Causality]]: temporal predictive dependence and the assumptions needed for causal interpretation.
- [[concepts/root-cause-analysis-in-time-series|Root Cause Analysis in Time Series]]: separating intervention origins from propagated anomalies.
- [[concepts/causal-representation-learning|Causal Representation Learning]]: a broader connection through structured encoders and exogenous variables; AERCA begins with observed series as its causal units.
- [[concepts/time-series-anomaly-prediction|Time-Series Anomaly Prediction]]: a different task that predicts future abnormality; AERCA's residual score requires the current observation.

## Related Papers

- Marcinkevics and Vogt (2021), "Interpretable Models for Granger Causality Using Self-Explaining Neural Networks": the cited GVAR approach using neural coefficient matrices.
- Li et al. (2022), "Causal Inference-Based Root Cause Analysis for Online Service Systems with Intervention Recognition": the CIRCA baseline.
- Ikram et al. (2022), "Root Cause Analysis of Failures in Microservices through Causal Discovery": the RCD baseline.
- [[papers/toward-causal-representation-learning|Toward Causal Representation Learning]]: a complementary Wiki connection on causal models, exogenous noise, and identification assumptions, not a reported AERCA baseline.

[[index|Library home]]
