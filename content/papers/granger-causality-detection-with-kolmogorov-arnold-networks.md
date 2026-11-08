---
title: "Granger Causality Detection with Kolmogorov-Arnold Networks"
type: paper
authors:
  - Hongyu Lin
  - Mohan Ren
  - Paolo Barucca
  - Tomaso Aste
year: null
source_job_id: "304ddc69-5763-4a4b-8a2b-87ac9349031c"
tags:
  - granger-causality
  - kolmogorov-arnold-networks
  - time-series
  - causal-discovery
  - structured-sparsity
---

## TL;DR

GC-KAN fits one [[concepts/kolmogorov-arnold-networks|Kolmogorov-Arnold Network]] per target series and identifies [[concepts/granger-causality|Granger Causality]] from sparse first-layer mappings of lagged inputs. A soft-thresholding step sets weak base and spline weights exactly to zero, avoiding a separate post-training pruning threshold. On synthetic 20-variable VAR and Lorenz-96 systems, GC-KAN and a component-wise MLP with hierarchical group lasso attain broadly similar AUROC. GC-KAN is strongest at larger VAR sample sizes and selected nonlinear settings, but is substantially weaker on VAR data with only 250 observations. The study does not evaluate real data, causal identifiability under violated assumptions, or uncertainty in the recovered graph.

## Research Question

Can KAN edge functions and first-layer proximal sparsification recover interpretable linear and nonlinear Granger-causal structure as accurately as component-wise MLPs while using compact networks?

## Motivation

Classical vector autoregression represents lagged linear dependence, while nonlinear Granger-causality models require a flexible prediction function for each target series. Neural approaches such as component-wise MLPs infer edges from regularized first-layer weights, but fixed activations may require wider networks and their grouped penalties impose a particular structure across lags. KANs replace scalar connections with learnable univariate spline functions, offering flexible lag-to-target mappings that can be inspected and sparsified.

## Contributions

- Introduces GC-KAN, a component-wise architecture that predicts each target series from all variables over a chosen maximum lag.
- Combines KAN activation-magnitude and entropy regularization with a proximal update applied only to the first layer's base and spline weights.
- Extracts lag-specific contribution scores from first-layer mappings whose irrelevant connections can become exactly zero during training.
- Compares GC-KAN with component-wise MLPs using hierarchical group lasso on synthetic VAR and Lorenz-96 systems with known causal graphs.
- Contrasts independent lag selection in GC-KAN with the lower-to-higher lag hierarchy imposed by the cMLP penalty.

## Method

For an $n$-series system and maximum lag $p$, the KAN for target $i$ receives

$$
\mathbf z=[\mathbf x_{t-1},\ldots,\mathbf x_{t-p}]\in\mathbb R^{np}
$$

and predicts $x_{t,i}$. Each KAN edge combines a weighted base activation, such as SiLU, with a learned B-spline. The training objective adds activation-based L1 and entropy terms to mean squared prediction error:

$$
\mathcal L_{\mathrm{GC-KAN}}
=\mathcal L_{\mathrm{MSE}}
+\lambda\left(\mu_1|\Phi|_1+\mu_2S(\Phi)\right),
$$

with the paper normally setting $\mu_1=\mu_2=1$. Gradient descent updates the full network. After each gradient step, first-layer base and spline weights receive elementwise soft thresholding,

$$
\operatorname{Prox}_{\lambda_{\mathrm{prox}}}(w)
=\operatorname{sign}(w)\max(|w|-\eta\lambda_{\mathrm{prox}},0).
$$

Restricting this operation to the input layer targets the mappings used for graph extraction while leaving deeper transformations unpenalized by the proximal step. After training, the contribution of variable $j$ at lag $k$ is the sum of absolute mapping strengths into the first hidden layer. Unlike the hierarchical group-lasso baseline, GC-KAN treats every variable-lag input independently; it does not require lower lags to remain active before a higher lag can be selected.

## Experiments

### Linear VAR Systems

The authors generate 20-variable VAR(1) and VAR(2) series. Each target has a self-dependency and three randomly selected parents. Both methods receive five lags. GC-KAN uses one hidden neuron, while the cMLP baseline uses one hidden layer with 100 neurons and hierarchical group lasso. AUROC is averaged over five initializations:

| System | Model | $T=250$ | $T=500$ | $T=1000$ |
| --- | --- | ---: | ---: | ---: |
| VAR(1) | cMLP | $91.6\pm0.4$ | $94.9\pm0.2$ | $98.4\pm0.1$ |
| VAR(1) | GC-KAN | $81.7\pm0.2$ | $96.5\pm0.1$ | $99.3\pm0.1$ |
| VAR(2) | cMLP | $84.4\pm0.2$ | $88.3\pm0.4$ | $95.1\pm0.2$ |
| VAR(2) | GC-KAN | $76.1\pm0.3$ | $84.5\pm0.3$ | $95.9\pm0.1$ |

GC-KAN is markedly worse at $T=250$, mixed at $T=500$, and slightly better at $T=1000$. In a qualitative VAR(3) example, both models find the true parents, but hierarchical group lasso concentrates contribution at lower lags whereas GC-KAN distributes contribution more evenly. This is an example rather than a quantitative lag-recovery evaluation.

### Nonlinear Lorenz-96 Systems

Lorenz-96 simulations use 20 variables, sampling interval 0.05, five input lags, and forcing constants $F=10$ and $F=40$. Each GC-KAN contains one hidden layer with ten neurons; the comparison cMLP again uses 100. Results are averages over five initializations:

| Forcing | Model | $T=250$ | $T=500$ | $T=1000$ |
| --- | --- | ---: | ---: | ---: |
| $F=10$ | cMLP | $86.6\pm0.2$ | $96.6\pm0.2$ | $98.4\pm0.1$ |
| $F=10$ | GC-KAN | $86.9\pm0.5$ | $92.1\pm0.3$ | $96.2\pm0.2$ |
| $F=40$ | cMLP | $84.0\pm0.5$ | $89.6\pm0.2$ | $95.5\pm0.3$ |
| $F=40$ | GC-KAN | $86.3\pm0.2$ | $87.1\pm0.4$ | $95.7\pm0.2$ |

Neither method dominates across all settings. GC-KAN leads at $T=250$ for both forcing constants and narrowly at $F=40,T=1000$, while cMLP leads at both $T=500$ settings and at $F=10,T=1000$. The paper additionally reports that a ten-hidden-neuron cMLP reaches about 94% AUROC for $F=40,T=1000$, roughly one to two points below GC-KAN, but this capacity-matched figure is cited from the baseline paper rather than produced in the main comparison.

An appendix visualization compares standard KAN training with the proximal update on one VAR(1) example. Standard training retains weak irrelevant edges, while the proximal version leaves only the two causal parents nonzero. No aggregate ablation quantifies this effect across datasets or proximal strengths.

## Limitations

- Evaluation is restricted to synthetic VAR and Lorenz-96 systems with known, sparse graphs. The paper provides no real-data study, robustness analysis for misspecified dynamics, or assessment under hidden confounding and contemporaneous effects.
- A Granger-causal interpretation assumes stationarity, a complete observed system, aligned sampling frequencies, finite lag order, and an adequately chosen maximum lag. Predictive dependence alone does not establish intervention-level causality when these assumptions fail.
- The main architecture comparison is not capacity matched: cMLP uses 100 hidden neurons, whereas GC-KAN uses one for VAR and ten for Lorenz-96. The single capacity-matched result is imported from prior work.
- Reported variability covers five initializations, but the supplied text does not indicate repeated independently generated datasets. It also does not report uncertainty for individual recovered edges.
- Graph recovery depends on regularization and proximal strengths. ROC construction explicitly varies proximal strength, so deployment still requires a model-selection rule even though soft thresholding removes the need for a post hoc edge threshold within a fitted model.
- Independent variable-lag sparsification does not encode hierarchical lag structure. The qualitative lag comparison shows different contribution profiles but does not establish which method recovers lag order more accurately.
- AUROC can summarize edge ranking across sparsity settings but does not give the precision, recall, or graph quality of one selected operating point.
- No publication year, venue, DOI, arXiv identifier, implementation link, runtime, or training-cost comparison appears in the supplied Markdown.

## Related Concepts

- [[concepts/granger-causality|Granger Causality]]: defines the lagged predictive-dependence target and the assumptions required for causal interpretation.
- [[concepts/kolmogorov-arnold-networks|Kolmogorov-Arnold Networks]]: supplies the spline-valued edge functions and activation-based sparsity regularizers used by GC-KAN.

## Related Papers

- [[papers/kan-kolmogorov-arnold-networks|KAN: Kolmogorov-Arnold Networks]]: introduces the spline-based architecture, activation regularization, and pruning mechanisms adapted here.
- Tank et al. (2021), "Neural Granger Causality": introduces the component-wise MLP and structured sparsity baseline used in the experiments.
- [[papers/kolmogorov-arnold-networks-for-time-series-bridging-predictive-power-and-interpretability|Kolmogorov-Arnold Networks for Time Series: Bridging Predictive Power and Interpretability]]: applies KANs to forecasting and interpretable lagged prediction without making the same causal-discovery claim.
- [[papers/root-cause-analysis-of-anomalies-in-multi-variate-time-series-through-granger-causal-discovery|Root Cause Analysis of Anomalies in Multi-Variate Time Series through Granger Causal Discovery]]: combines neural Granger graph learning with exogenous-residual estimation for anomaly localization.

[[index|Library home]]
