---
title: "Addressing Information Asymmetry: Deep Temporal Causality Discovery for Mixed Time Series"
type: paper
authors:
  - Jiawei Chen
  - Chunhui Zhao
year: null
source_job_id: cbc7cd83-87f0-4788-951b-74c6b0f11845
tags:
  - causal-discovery
  - time-series
  - mixed-data
  - representation-learning
---

## TL;DR

MiTCD learns continuous representations of discrete time series using multiscale Gaussian kernels, continuous-variable forecasting, and discrete reconstruction. It then estimates a sparse Granger graph over observed continuous variables and the learned representations. Reported benchmark results improve over the listed baselines, but recovery depends on informative continuous variables, and the method targets numeric discrete states arising from latent continuous signals rather than arbitrary categories.

## Research Question

Can temporal context and observed continuous variables compensate for information lost through discretization sufficiently to improve nonlinear, multivariate causal discovery in mixed time series?

## Motivation

Mixed time series combine fine-grained continuous measurements with discrete observations such as thresholded alarms. Dropping discrete variables omits potential dependencies; discretizing every variable loses continuous information. The paper calls the resulting distributional heterogeneity and difference in information granularity the information asymmetry problem. Its proposed solution is to learn continuous representations for the discrete series before applying [[concepts/granger-causality|Granger Causality]] discovery.

## Contributions

- MiTCD, a framework for [[concepts/mixed-time-series-causal-discovery|Mixed Time-Series Causal Discovery]] that models observed discrete variables as quantized latent continuous variables.
- Contextual Adaptive Gaussian Kernel Embedding (CAGKE), which combines learned bandwidths and scale weights to recover continuous temporal representations.
- Two training stages coupling continuous forecasting and discrete reconstruction with sparse neural graph learning.
- Evaluation across five benchmark families, with ablations, discrete-proportion and state-count sensitivity studies, and transfer of pretrained embeddings to other discovery methods.

## Method

**Target and assumptions.** A system contains $p-n$ observed continuous variables and $n$ discrete variables. The latter are assumed to arise from latent continuous variables through a generally non-injective discretization function. The target is a directed summary graph: $A_{ij}=1$ denotes a Granger link from variable $j$ to variable $i$, aggregated across lags. Causal interpretation assumes causal sufficiency, temporal priority, and no contemporaneous effects (Section III-A).

**Continuous embedding.** For a discrete series $x^D_j$, CAGKE places a Gaussian kernel at each nonzero observation, weighted by that observation's numeric magnitude. It combines $d$ bandwidths with softmax-normalized weights:

$$
F_j(t;\sigma)=\sum_{s=1}^{T}x^D_{s,j}\frac{1}{\sqrt{2\pi}\sigma}
\exp\left(-\frac{(t-s)^2}{2\sigma^2}\right),
\qquad
\widetilde{x}^{LC}_{t,j}=\sum_{r=1}^{d}\widehat{\alpha}_r F_j(t;\sigma_r)+\varepsilon_t.
$$

The bandwidth bounds and mixture weights are learned, with intermediate bandwidths arranged arithmetically. Small kernels represent local variation; larger kernels aggregate longer temporal context. The paper adds Gaussian noise $\varepsilon_t\sim\mathcal{N}(0,0.01)$ (Equations 2-6).

**Self-supervised pretraining.** Predictors forecast continuous variables from their lagged histories and the embedded discrete histories. Separate decoders reconstruct the discrete observations from their embeddings. Adam minimizes a weighted sum of continuous forecasting MSE and discrete reconstruction cross-entropy. Reconstruction constrains the representation to retain the original discrete information (Section III-D).

**Sparse graph learning.** The second stage transfers the pretrained embeddings and decoders, freezes decoder parameters and kernel bandwidths, and leaves mixture weights trainable. Individual predictors forecast both continuous variables and recovered continuous representations. Training combines forecasting, discrete reconstruction, and hierarchical group-lasso penalties on first-layer input weights. Proximal gradient descent can set entire lagged input groups to zero. A source with zero input weights at every modeled lag is excluded from the target's learned Granger graph (Section III-E).

**Recovery argument.** Section IV assumes Gaussian distributions for continuous and latent continuous recordings and independent generative noise. Within that setup, Theorem 1 relates minimizing continuous forecasting MSE to maximizing mutual information between the continuous target and its predictor inputs. The authors interpret this as encouraging embeddings to preserve latent information associated with the continuous variables. The proof is deferred to an appendix absent from the supplied Markdown. This argument does not establish unique recovery of the original continuous trajectories from their discrete observations.

## Experiments

**Setup.** The five benchmark families are linear VAR, chaotic Lorenz-96, simulated fMRI, multispecies Lotka-Volterra, and DREAM3 gene-network simulations. Mixed observations are constructed by min-max normalization followed by thresholding selected variables at 0.5. Main experiments use binary states; further experiments use four and eight states. VAR uses 10 variables and 200-2,000 time steps; main Lorenz-96 experiments use 10, 15, or 20 variables and 1,000 steps. DREAM3 uses 100 variables, including 20 discrete variables, with a reported series length of 950 (Table II).

The study compares 18 baseline configurations, including LGC, VARLiNGAM, two PCMCI tests, TCDF, eSRU, GVAR, cMLP, cLSTM, Hetcor-PC, Dynotears, NTSnotears, SS/MS-CASTLE, PCTMI, NTiCD, CR-VAE, and RegCI. Hetcor-PC and RegCI are used as conditional-independence tests within PCMCI. Baseline hyperparameters are tuned for best AUPRC. PCMCI with conditional mutual information, PCTMI, and NTiCD are omitted from DREAM3 for computational reasons.

**Selected results.** Scores below are percentages. Dataset labels follow the result tables; $n$ denotes the number of discrete variables. These are reported point estimates, not independently reproduced results.

| Dataset and setting | MiTCD AUROC | MiTCD AUPRC | Source |
| --- | --- | --- | --- |
| VAR, $T=200$ | 94.12 | 84.39 | Table IV |
| VAR, $T=1000$ | 99.87 | 99.55 | Table IV |
| VAR, $T=2000$ | 100.00 | 100.00 | Table IV |
| Lorenz-96, $p=10,n=4,F=5$ | 96.88 | 96.02 | Table III |
| Lorenz-96, $p=20,n=8,F=10$ | 99.69 | 98.84 | Table III |
| fMRI, $n=4$ | 90.36 | 80.88 | Table V |
| fMRI, $n=5$ | 87.64 | 78.19 | Table V |
| Lotka-Volterra, $n=5$ | 91.29 | 77.69 | Table V |
| Lotka-Volterra, $n=6$ | 92.26 | 78.28 | Table V |
| DREAM3, average over five networks | 60.03 | Not reported | Table VI |

MiTCD has the highest listed scores in these main result tables. On DREAM3 its average AUROC exceeds GVAR's 56.81 by 3.22 percentage points, while absolute discrimination remains modest. For VAR at $T=200$, the AUROC improvement over TCDF is 5.87 points. The supplied Table IV reports an 8.38-point AUPRC improvement, but its best listed baseline is SS-CASTLE at 77.24, giving a **calculated 7.15-point difference** from MiTCD's 84.39.

**Sensitivity and negative findings.** On Lorenz-96 with $p=10,F=10$, increasing the discrete proportion from 10% to 80% lowers AUROC from 99.29 to 86.46 and AUPRC from 99.00 to 84.60; intermediate scores are not strictly monotonic (Table VIII). Increasing the number of discrete states from two to eight improves both metrics in all four reported dataset settings (Table X). On fully continuous fMRI, the embedding and pretraining are removed, and the paper reports a weaker advantage without supplying exact plot values in the text (Section V-C6).

**Ablations and portability.** On Lorenz-96 with $p=10,F=5$, Table VII gives AUPRC 96.02 for MiTCD, 93.84 without reconstruction, 91.75 without reconstruction and pretraining, and 88.12 for the fixed single-kernel variant, also without reconstruction and pretraining. These are cumulative removals, so the last difference from full MiTCD does not isolate kernel adaptivity alone. Reconstruction removal slightly raises Lotka-Volterra AUROC from 91.29 to 91.49 while lowering AUPRC. Transferring pretrained CAGKE raises GVAR AUROC from 73.08 to 78.85 and cLSTM AUROC from 90.50 to 95.53 on the tested Lorenz-96 setting (Table IX); this is evidence for portability within that experiment.

## Limitations

- Discrete states must encode ordered numeric magnitude associated with latent continuous signals. The authors explicitly exclude direct application to nominal categories such as colors or blood types.
- Recovery requires informative relationships between continuous variables and latent continuous variables. Few or weakly related continuous observations reduce the supervision available for embedding learning.
- Learned predictive dependencies require the stated causal assumptions for causal interpretation. Reconstruction of discrete states and forecasting accuracy do not by themselves establish identification of latent values or intervention effects.
- Equation 3 uses symmetric kernels summed over the entire sequence. As written, an embedding at time $t$ can depend on observations after $t$. A strictly past-only or online implementation is not specified in the supplied text; this is a temporal-information concern when interpreting the resulting graph as lagged causality.
- The experiments construct mixed data by discretizing benchmark continuous series. They do not establish performance on naturally collected heterogeneous measurements or arbitrary discretization mechanisms. Main result tables provide no uncertainty intervals, and the supplied text does not establish a separate held-out protocol for hyperparameter selection.
- Dataset descriptions conflict: Section V-A lists fMRI discrete counts of 5/6 and Lotka-Volterra counts of 4/5, whereas Tables II and V use 4/5 and 5/6 respectively. The results above follow Table V. Other arithmetic inconsistencies, including the VAR improvement noted above, limit literal reuse of the narrative comparisons.
- The supplied Markdown lacks the referenced appendices and does not identify this paper's publication year, venue, DOI, or arXiv ID. Those metadata remain unspecified.

## Related Concepts

- [[concepts/mixed-time-series-causal-discovery|Mixed Time-Series Causal Discovery]]: joint temporal graph estimation with continuous and discrete measurements.
- [[concepts/granger-causality|Granger Causality]]: predictive dependence over lagged histories and its causal scope conditions.
- [[concepts/causal-representation-learning|Causal Representation Learning]]: the broader problem of learning variables suitable for causal analysis; MiTCD retains one representation per observed discrete series.

## Related Papers

- Tank et al. (2022), "Neural Granger Causality": cited sparse neural approach underlying the cMLP/cLSTM comparison and structured-input perspective.
- Zeng et al. (2022), "Causal Discovery for Linear Mixed Data": cited work on mixed-variable causal discovery under a linear model.
- Yamayoshi, Tsuchida, and Yadohisa (2020), "An Estimation of Causal Structure Based on Latent LiNGAM for Mixed Data": cited precedent for latent continuous variables behind discrete observations.
- Hyvarinen, Sasaki, and Turner (2019), "Nonlinear ICA Using Auxiliary Variables and Generalized Contrastive Learning": cited motivation for recovering latent information using statistically related auxiliary variables.
- [[papers/root-cause-analysis-of-anomalies-in-multi-variate-time-series-through-granger-causal-discovery|Root Cause Analysis of Anomalies in Multi-Variate Time Series through Granger Causal Discovery]]: a related Wiki paper coupling Granger graph learning with exogenous-variable estimation for anomaly localization; it is not a reported MiTCD baseline.

[[index|Library home]]
