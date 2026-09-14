---
title: Multivariate Time Series Forecasting needs Cross Variable Loss
type: paper
authors:
  - Kuiye Ding
  - Yifan Hu
  - Hanchen Wang
  - Hao Xue
year: null
tags:
  - time-series-forecasting
  - multivariate-time-series
  - loss-functions
  - graph-regularization
---

## TL;DR

CvLoss augments point-wise forecasting MSE with an absolute graph penalty on differences between forecast residuals across variables and temporal patches. It changes training without adding inference computation. The paper reports improvements across seven forecasting backbones, with uneven gains and some ties or regressions. Its Gaussian analysis motivates coupling residuals but does not derive the implemented absolute-value penalty; inconsistencies between summary and detailed tables limit interpretation of exact aggregate results.

## Research Question

Can explicitly constraining cross-variable structure in future forecast errors improve multivariate direct forecasting beyond modeling dependencies in historical inputs?

## Motivation

Point-wise MSE measures absolute prediction errors but does not explicitly penalize discrepancies between predicted and observed relationships across variables. Shared model parameters can still learn dependencies, so direct forecasting does not itself require independent outputs. The paper argues that adding supervision on relative differences can help preserve synchronous and lagged relationships that an input-side architecture may leave imperfectly modeled.

## Contributions

- Formulates an objective discrepancy between isotropic squared error and a Gaussian residual likelihood with fixed spatiotemporal covariance (Theorem 3.1).
- Connects a squared graph penalty to a restricted Gaussian precision family, then adopts an absolute graph penalty as an empirical alternative (Proposition 3.2 and Appendix C.4).
- Defines CvLoss over variable-patch nodes, supporting synchronous, asynchronous, and combined cross-variable edges without modifying the forecasting backbone.
- Reports comparisons against forecasting architectures and alternative losses, topology and norm ablations, seven-seed comparisons, and separate scalability studies.

## Method

For targets and predictions $Y,\hat Y\in\mathbb R^{T\times D}$, divide the forecast horizon into $P$ non-overlapping patches of length $L$, with $T=PL$. Each node $v=(p,d)$ contains a length-$L$ patch for variable $d$, and its residual is $e_v=\hat z_v-z_v$. An undirected edge set $\mathcal E$ connects different variables, either at the same patch index, at different patch indices, or both. The default combines both types with uniform edge weights.

The discrepancy between predicted and observed patch differences equals a residual difference:

$$
(\hat z_i-\hat z_j)-(z_i-z_j)=e_i-e_j.
$$

Equations (8)-(13) define

$$
\mathcal L_{\mathrm{df}}=\frac{\|\hat Y-Y\|_F^2}{TD},
\qquad
\mathcal L_{\mathrm{cv}}=\frac{1}{|\mathcal E|L}
\sum_{(i,j)\in\mathcal E}\|e_i-e_j\|_1,
$$

$$
\mathcal L_\alpha=(1-\alpha)\mathcal L_{\mathrm{df}}
+\alpha\mathcal L_{\mathrm{cv}}.
$$

This is [[concepts/graph-total-variation|Graph Total Variation]] on the residual field, not smoothing of the raw target values. A fixed scalar $\alpha$ and patch length $L$ are selected on validation data. The MSE term anchors absolute errors: identical nonzero residuals at every connected node incur zero structural penalty. The main formulation uses $0<\alpha<1$; sensitivity sweeps also include the endpoints.

Under a fixed Gaussian residual covariance $\Sigma_{ST}$, the difference from scaled MSE is the quadratic form $e^\top(\Sigma_{ST}^{-1}-\sigma^{-2}I)e/(2TD)$. Proposition 3.2 uses a lifted graph incidence matrix $\tilde A=A\otimes I_L$ to construct precision $\sigma^{-2}(I+\lambda\tilde A^\top\tilde A)$. Its likelihood contains a **squared** edge penalty. The deployed $\ell_1$ penalty instead defines a non-Gaussian pairwise Gibbs field when combined with the positive MSE term; its norm choice is empirical.

Default accuracy comparisons use the full graph; the topology ablations use their specified restricted supports. Random sampling of at most 1,000 edges per batch is studied separately for efficiency (Appendix C.10). Appendix D also proposes selecting variable pairs with the largest discrepancy between predicted and target absolute Pearson correlations. That selection uses training labels and is not the mechanism underlying the main accuracy tables. The auxiliary learned coefficients in Table 20 likewise are a diagnostic, not the deployed $\alpha$. All loss computation is removed at inference.

## Experiments

The benchmark suite contains four ETT subsets, Weather, ECL, Traffic, Solar, and PEMS03/04/07/08, with chronological splits and 7-883 variables. The standard history length is 96; long-horizon tests use 96, 192, 336, and 720 steps. PEMS horizons are reported inconsistently: Appendix B describes 12/24/36/48, while Table 9 displays 12/24/48. Training uses Adam, validation early stopping with patience three, and baseline configurations retained when adding CvLoss. The final test batch is retained.

Selected dataset averages from **Table 1**, where CvLoss uses TimeFilter, are:

| Dataset | TimeFilter MSE | + CvLoss MSE | TimeFilter MAE | + CvLoss MAE |
| --- | --- | --- | --- | --- |
| ETTh1 | 0.420 | 0.419 | 0.428 | 0.427 |
| Weather | 0.240 | 0.236 | 0.270 | 0.260 |
| ECL | 0.159 | 0.157 | 0.256 | 0.252 |
| Traffic | 0.408 | 0.407 | 0.269 | 0.254 |
| Solar | 0.228 | 0.218 | 0.262 | 0.254 |
| PEMS07 | 0.071 | 0.063 | 0.170 | 0.156 |

CvLoss improves all 24 dataset-metric entries against TimeFilter in Table 1. This does not mean it beats every architecture: TQNet has lower Solar MSE, 0.197 versus 0.218. Table 2 reports 111 improvements, two ties, and one regression across 114 overlapping dataset-metric comparisons involving TimeFilter, TQNet, PDF, CFPT, iTransformer, DLinear, and PatchTST. Reported mean relative reductions are 3.39% MSE and 3.61% MAE. These are the authors' descriptive aggregates, not independent task samples or a pooled significance test, and the table inconsistencies below affect their exact interpretation.

The loss comparison includes QDF, Time-o1, FreDF, DBLoss, KMB-DF, DistDF, and shape-alignment objectives. CvLoss is competitive rather than uniformly best: Table 14 gives KMB-DF lower average ETTh1 MSE (0.426 versus 0.432). In Table 4, combining synchronous and asynchronous edges improves all eight dataset-average metrics over DF, while either restricted topology can regress. In Table 15, the absolute penalty beats the squared penalty in all eight averaged metrics; the squared variant improves five against the base, ties two, and worsens Weather/TQNet MSE.

Tables 17-18 examine seeds 2020-2026 on ECL and Weather with TimeFilter and TQNet. Of 13 comparisons selected because their marginal intervals overlap, 11 paired 95% intervals exclude zero. Weather/TQNet MSE at horizons 336 and 720 remains inconclusive. The reported median relative reduction over the 40 cells, which include horizon averages, is 1.66%.

Correlation visualizations measure absolute Pearson-correlation error, not signed dependence or covariance recovery. The reported fractions of entries improved are 84.83% for ECL, 61.98% for PEMS03, 62% for ETTh2, and 44% for Weather (Figures 1 and 5-7). These examples do not establish universal structural improvement. Figures 10-13 report greater full-graph training overhead on ECL than ETTh2, inference latency near parity, and sampling speedups with little plotted MSE change; the Markdown provides no numerical speedup table.

## Limitations

- **Theory scope:** Different covariance matrices imply different objective functions in general, not a nonzero objective difference for every residual vector. The Gaussian argument assumes covariance fixed independently of model parameters and does not establish that MSE cannot estimate a conditional mean under correlated outcomes. It also does not prove forecast improvements from CvLoss.
- **Structural assumptions:** A uniform complete graph and fixed patches may couple uninformative pairs. The Laplacian precision family remains restricted even with complete support; it is not an estimate of arbitrary signed, heterogeneous residual dependencies. The squared-penalty argument does not derive the implemented $\ell_1$ loss.
- **Scaling and anchoring:** The full graph has $O(P^2D^2)$ edges, each comparing length-$L$ vectors. Sampling bounds evaluated interactions but is a separate efficiency experiment. Top-K selection still requires computing or approximating the discrepancies used to rank pairs. With $\alpha=1$, structural loss alone cannot identify common residual offsets; ECL deteriorates at that endpoint in the sensitivity tables.
- **Reporting discrepancies:** Table 3 reports TQNet/ETTh1 CvLoss MSE/MAE as 0.430/0.438 and identifies an MAE regression in Table 2, whereas Tables 4 and 13 report 0.438/0.430. Table 1 and Table 8 also differ in some TimeFilter averages. Thus the exact 111/2/1 aggregate should be retained as reported, not treated as independently reconciled evidence. PEMS horizon descriptions conflict with Table 9, and some prose claims of consistent improvement exceed individual table entries.
- **Evidence boundaries:** Evaluation concerns deterministic forecasts on regular benchmark series. Exchange is excluded, and irregular sampling, missing values, and probabilistic forecasting remain untested extensions. Seven-seed inference covers only two datasets and two backbones; overlapping metrics, horizons, and comparison blocks are not independent replications.
- **Source completeness:** The supplied Markdown gives no explicit publication year, confirmed venue, DOI, or arXiv identifier for this paper and ends immediately after the opening sentence of Appendix F. These metadata are left unspecified rather than inferred from cited works.

## Related Concepts

- [[concepts/graph-total-variation|Graph Total Variation]]: the edge-difference operator underlying CvLoss.
- Cross-variable residual consistency and multi-output learning objectives.
- Structured Gaussian precision matrices and pairwise Gibbs fields.

## Related Papers

The supplied manuscript cites the following work; these titles have no matching canonical paper pages in the current library:

- Hu et al. (2025), "Timefilter: Patch-specific spatial-temporal graph filtration for time series forecasting": default backbone and input-side graph modeling.
- Liu et al. (2024), "itransformer: Inverted transformers are effective for time series forecasting": forecasting backbone and correlation-structure examples.
- Wang et al. (2025), "Fredf: Learning to forecast in the frequency domain": transformed-label learning objective.
- Wang et al. (2026), "Quadratic direct forecast for training multi-step time-series forecast models": competing objective and comparison protocol.
- Qiu et al. (2025), "Dbloss: Decomposition-based loss function for time series forecasting": decomposition-based comparator.
- Kudrat et al. (2025), "Patch-wise structural loss for time series forecasting": related supervision of temporal structure.

[[index|Library home]]
