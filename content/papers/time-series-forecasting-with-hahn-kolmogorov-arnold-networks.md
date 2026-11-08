---
title: "Time Series Forecasting with Hahn Kolmogorov-Arnold Networks"
type: paper
authors:
  - Md Zahidul Hasan
  - A. Ben Hamza
  - Nizar Bouguila
year: null
tags:
  - time-series-forecasting
  - kolmogorov-arnold-networks
  - multivariate-time-series
  - patch-based-models
---

## TL;DR

HaKAN is a channel-independent, patch-based model for long-term multivariate forecasting. It replaces attention and fixed-activation MLP mixing with [[concepts/kolmogorov-arnold-networks|Kolmogorov-Arnold Network]] layers whose edge functions are expanded in Hahn polynomials. Alternating intra-patch and inter-patch mixing targets local and global temporal structure, while a bottleneck head maps the learned representation to the forecast horizon. Across the paper's optimized-look-back comparison, HaKAN reports the best MSE in 18 of 32 dataset-horizon cases and the best MAE in 19 of 32. The result is not uniform: it trails Timer-XL on Traffic, where the model's channel-independence assumption prevents explicit modeling of cross-variable dependence.

## Research Question

Can Hahn-polynomial KAN layers provide an efficient alternative to attention and fixed-activation MLPs for long-horizon multivariate time-series forecasting while capturing both within-patch and across-patch temporal patterns?

## Motivation

Transformer forecasters can model long-range dependencies but incur quadratic attention cost and require positional mechanisms to represent temporal order. Lightweight MLP forecasters avoid attention but may struggle with nonlinear and high-frequency structure. The paper uses learnable univariate edge functions from KANs to increase functional flexibility, then replaces the usual B-spline parameterization with a low-degree Hahn-polynomial basis that does not require a spline grid.

## Contributions

- Introduces HaKAN, which combines channel independence, RevIN, temporal patching, positional embeddings, stacked Hahn-KAN blocks, and a two-layer bottleneck forecast head.
- Designs each Hahn-KAN block with intra-patch feature mixing and inter-patch patch mixing, connected residually to capture local and global temporal patterns.
- Parameterizes every KAN edge function as a learned combination of Hahn polynomials and argues a per-layer complexity of $O(d_{in}d_{out}d)$ for polynomial degree $d$, removing the grid-size dependence of B-spline KANs.
- Evaluates the model on eight standard forecasting datasets, two look-back protocols, component and hyperparameter ablations, and three-seed robustness runs on six datasets.

## Method

For an input with $M$ variables and look-back length $L$, HaKAN processes each channel as a separate univariate series. RevIN normalizes each series, which is divided into overlapping length-$P$ patches with stride $S$. A linear projection maps each patch to dimension $D$, and learned positional embeddings retain patch order.

The backbone stacks residual Hahn-KAN blocks. One KAN layer mixes the $D$ features within each patch; after transposition, the other mixes across the $N$ patches. Each scalar edge function is

$$
\phi_{q,p}(x_p)=\sum_{r=0}^{d}\gamma_{q,p,r}P_r(x_p),
$$

where $P_r$ is a Hahn polynomial and the coefficients $\gamma_{q,p,r}$ are learned. After the stack, HaKAN flattens the $N\times D$ representation, down-projects it to a bottleneck of width $H$, up-projects it to forecast horizon $T$, and reverses RevIN. Training minimizes mean squared error across channels and future steps.

With $R$ blocks, the paper gives per-channel backbone time complexity $O(R(N^2D+ND^2))$ and total model complexity $O(M[R(N^2D+ND^2)+NDH+HT])$. This can be lower than attention over the original length $L$ when patching makes $N\ll L$, although the inter-patch layer remains quadratic in the number of patches.

## Experiments

The main benchmark covers ETTh1, ETTh2, ETTm1, ETTm2, Weather, Traffic, Electricity, and Illness. Forecast horizons are 96, 192, 336, and 720 except for Illness, which uses 24, 36, 48, and 60. Models are evaluated by MSE and MAE. The implementation uses PyTorch, Adam, and one 24 GB RTX 4090; the common configuration uses degree-3 Hahn polynomials with parameters $a=1$, $b=1$, and $n=7$, patch length 16, stride 8, and embedding width 128, with dataset-specific settings reported separately.

When each method may select its best look-back from 96, 192, 336, and 720, HaKAN reports the best MSE in 18 of 32 cases and the best MAE in 19 of 32. Its reported average improvements include 8.98% MSE and 3.96% MAE on Illness and 5.28% MSE and 2.07% MAE on ETTh2 relative to PatchTST/64. On Traffic, however, HaKAN's average MSE/MAE is 0.403/0.269 versus Timer-XL's 0.374/0.255. Under a fixed look-back of 96 on the four ETT datasets, its average MSE/MAE is 0.439/0.429 on ETTh1, 0.348/0.383 on ETTh2, 0.384/0.399 on ETTm1, and 0.276/0.324 on ETTm2.

The ablations support the complete architecture within the tested setup. Hahn bases produce average MSE/MAE of 0.507/0.431, compared with 0.531/0.435 for Lucas, 0.539/0.439 for Chebyshev, and 0.548/0.443 for B-splines. Removing intra-patch mixing worsens the aggregate to 0.559/0.447; removing inter-patch mixing gives 0.520/0.435. Five blocks, bottleneck width 336, and patch length 16 are the best tested settings. Three-seed results are also reported for ETTh1, ETTh2, ETTm1, ETTm2, Weather, and Electricity.

## Limitations

- Channel independence omits explicit cross-variable interactions. The paper identifies this as a likely reason for weaker Traffic results, where sensor variables are strongly related.
- The headline statement of consistent superiority is broader than the tables support: several individual horizons favor other methods, and Timer-XL is better on every reported Traffic horizon.
- Comparisons combine values from baseline papers and use each method's best look-back in the main table; the fixed-look-back table is more controlled but covers only the four ETT datasets.
- The model is described as interpretable because it uses learnable edge functions, but the experiments do not visualize those functions, extract formulas, or quantitatively evaluate interpretability.
- The source contains an internal hyperparameter inconsistency: the implementation section states five Hahn-KAN blocks, while an appendix sentence states three for both look-back settings. The ablation table favors five blocks.
- The supplied Markdown provides no publication year, venue, DOI, arXiv identifier, or repository URL, so none is inferred. This page was revalidated against the parsed Markdown supplied for Cognitio job `910ccc1f-9e04-45c8-81d2-5fc587dd34b7`.

## Related Concepts

- [[concepts/kolmogorov-arnold-networks|Kolmogorov-Arnold Networks]]: the edge-function architecture that HaKAN parameterizes with Hahn polynomials instead of the usual B-splines.
- Channel-independent forecasting: treating each multivariate channel as a separate univariate sequence improves simplicity but excludes explicit cross-channel dependence.
- Patch-based time-series modeling: overlapping temporal segments shorten the modeled sequence and separate local feature mixing from longer-range patch mixing.
- Reversible instance normalization: normalizes each input instance and restores its scale after forecasting to address distribution shifts.

## Related Papers

- [[papers/kan-kolmogorov-arnold-networks|KAN: Kolmogorov-Arnold Networks]]: introduces the modern spline-based KAN architecture that HaKAN modifies.
- [[papers/kolmogorov-arnold-networks-for-time-series-bridging-predictive-power-and-interpretability|Kolmogorov-Arnold Networks for Time Series: Bridging Predictive Power and Interpretability]]: applies spline-based KANs to univariate and multivariate forecasting with an explicit interpretability objective.
- Nie et al. (2023), "A Time Series Is Worth 64 Words: Long-Term Forecasting with Transformers": introduces the channel-independent patching strategy used by HaKAN and supplies a principal baseline.
- Huang et al. (2025), "TimeKAN: KAN-Based Frequency Decomposition Learning Architecture for Long-Term Time Series Forecasting": a frequency-decomposition KAN baseline contrasted with HaKAN's hierarchical patch mixing.
- Chen et al. (2025), "TsKAN: A Transparent Architecture for Improving the Interpretability of Multivariate Time Series Forecasting": a multi-scale patching KAN baseline in the main comparison.
- Liu et al. (2024), "iTransformer: Inverted Transformers Are Effective for Time Series Forecasting": an attention-based multivariate forecasting baseline in the fixed-look-back comparison.

[[index|Library home]]
