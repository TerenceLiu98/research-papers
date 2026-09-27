---
title: "From Observations to States: Latent Time Series Forecasting"
type: paper
authors:
  - Jie Yang
  - Yifan Hu
  - Yuante Li
  - Kexin Zhang
  - Kaize Ding
  - Philip S. Yu
year: null
tags:
  - time-series-forecasting
  - latent-prediction
  - representation-learning
  - autoencoders
---

## TL;DR

LatentTSF pretrains a point-wise autoencoder, freezes it, and trains a forecasting backbone to predict future encoded observations using latent squared error and cosine alignment. It reports improved forecasting and temporal representation diagnostics across six benchmarks, with exceptions such as DLinear on Traffic. The results support the usefulness of a learned forecasting space; they do not establish recovery of hidden physical states. Several appendix tables qualify broader claims in the text.

## Research Question

Can forecasting learned latent states improve temporal coherence and prediction robustness beyond direct observation-space regression?

## Motivation

The authors call the coexistence of low forecast error and temporally disordered embeddings **Latent Chaos**. Their diagnostics examine adjacent-state distances, t-SNE trajectories, and frequency spectra. They argue that point-wise observation losses provide insufficient constraints on latent geometry, particularly under noise and partial observability. Appendix A distinguishes temporal coherence from indiscriminate smoothing: genuine regime changes may produce sharp but structured transitions.

## Contributions

- Characterizes representation disorder in forecasting backbones despite reasonable observation-space accuracy.
- Introduces a two-stage [[concepts/latent-space-time-series-forecasting|Latent-Space Time Series Forecasting]] procedure compatible with linear and transformer backbones.
- Motivates latent prediction and alignment through information-theoretic arguments, while explicitly acknowledging that the implemented cosine objective is not an InfoNCE lower bound.
- Evaluates forecasting, representation diagnostics, objective and encoder ablations, and input-corruption robustness.

## Method

**Construct the representation.** A shared point-wise MLP encoder maps each multivariate observation $x_t\in\mathbb R^C$ to $z_t=\mathcal E(x_t)\in\mathbb R^D$. A decoder reconstructs the same observation. Pretraining minimizes MAE reconstruction loss. Both modules are then frozen. The latent dimension can be smaller or larger than the number of observed channels; expansion is not essential to the method (Section 3.3 and Appendix K).

**Forecast encoded targets.** For historical window $X$ and future window $Y$,

$$
Z_X=\mathcal E(X),\qquad Z_Y=\mathcal E(Y),\qquad
\widehat Z_Y=\mathcal F_\theta^Z(Z_X),\qquad
\widehat Y=\mathcal D(\widehat Z_Y).
$$

The future observations supply training targets only. Inference encodes the history, predicts future latents, and decodes the result. The default forecasting loss is

$$
\mathcal L=\alpha\|Z_Y-\widehat Z_Y\|_F^2
+\beta\left(1-\frac{\langle Z_Y,\widehat Z_Y\rangle_F}
{\|Z_Y\|_F\|\widehat Z_Y\|_F}\right),
\qquad \alpha=10,\quad\beta=15.
$$

The Frobenius inner product compares flattened latent forecast sequences. There is no decoded observation-space loss in the default second stage. Adding such a loss and fine-tuning the autoencoder are separate ablations.

**Theoretical scope.** Fixed-variance Gaussian conditional modeling motivates latent squared error as a variational likelihood objective, up to constants including target entropy. Removing negative-pair normalization from InfoNCE leaves cosine alignment as a heuristic surrogate, not a mutual-information bound. Freezing the encoder prevents the targets from changing during backbone training. Appendix C.3's stronger anti-collapse argument compares a constant predictor with exact target matching and assumes target directions do not all lie on one ray; it does not establish that future targets are exactly predictable from the available history.

The source provides a [code repository](https://github.com/Muyiiiii/LatentTSF).

## Experiments

**Setup.** The main experiments use ETTh1, ETTh2, ETTm1, ETTm2, Electricity, and Traffic with CMoS, DLinear, PatchTST, TimeBase, TimeXer, and iTransformer. History length is 720; forecast horizons are 96, 192, 336, and 720. Training uses Adam, up to 100 backbone epochs, early-stopping patience five, and one NVIDIA RTX 4090 with 24 GB memory (Appendix D). MSE and MAE evaluate decoded forecasts.

**Selected main comparisons.** These are the horizon averages printed in **Table 7**; lower is better. The iTransformer column is fully recoverable there, unlike the malformed summary Table 1 in the supplied Markdown.

| Dataset / backbone | Original MSE | LatentTSF MSE | Original MAE | LatentTSF MAE |
| --- | --- | --- | --- | --- |
| Electricity / DLinear | 0.201 | 0.182 | 0.313 | 0.284 |
| Electricity / PatchTST | 0.389 | 0.207 | 0.456 | 0.318 |
| Electricity / iTransformer | 0.268 | 0.194 | 0.375 | 0.299 |
| ETTh2 / DLinear | 0.500 | 0.363 | 0.480 | 0.407 |
| Traffic / TimeXer | 1.270 | 0.636 | 0.721 | 0.438 |
| Traffic / DLinear | 0.525 | 0.552 | 0.373 | 0.376 |

Gains are common but not universal. DLinear's Traffic average worsens on both metrics; individual horizon regressions also occur, including iTransformer on ETTm1 at horizon 96 (MSE 0.309 to 0.313).

**Ablations.** Table 12 reports Electricity DLinear MSE of 0.2006 for the baseline, 0.1960 for observation-space alignment, 0.1830 for latent prediction alone, and 0.1820 for the full method. This supports latent prediction as the larger contributor in that comparison. The claimed ordering across all five datasets is too strong: observation-space alignment beats latent prediction alone on ETTm1 and ETTm2. Sections 5.3-5.4 report that decoded-space supervision and jointly adapting the encoder/decoder generally underperform the default frozen pipeline in the tested settings.

**Representation and robustness.** Table 11 reports Electricity effective rank increasing from 7.89 to 34.90 and temporal transition consistency, defined as adjacent-state cosine similarity, from 0.894 to 0.967. ETTh1 consistency rises from 0.913 to 0.983. These diagnose representation geometry rather than physical state identification. In Table 14, LatentTSF has lower MSE for both tested backbones at every ETTh1 Gaussian-noise and random-missingness level. At 30% missingness, PatchTST improves from 0.5044 to 0.4761 and DLinear from 0.5125 to 0.5057.

**Encoder and dimension sensitivity.** Table 13's 300-epoch Electricity encoder gives MSE 0.2071, worse than baseline 0.2006, contradicting the claim that every pretraining budget improves performance. On Traffic, Table 15 reports improvements for both $D=512$ and $D=862$, but uses different baseline MSEs, 0.982 and 1.297. Its $D=512$ LatentTSF score, 0.786, also differs from Table 7's 0.719. These are separate reported results, not a reconciled controlled estimate of dimension effects. Larger latent dimensions exceeded GPU memory.

## Limitations

- A deterministic point-wise encoder cannot by itself establish recovery of information absent from its inputs. Reconstruction, effective rank, CKA, and temporal locality do not prove identification of the underlying dynamical state.
- The latent transition operator has no explicit stability or spectral constraints. The authors leave structured operators and joint training with stable targets as future work.
- The anti-collapse reasoning assumes more than a merely frozen encoder: non-collinear target directions and achievable target matching matter. It is not a general optimization guarantee under uncertain futures.
- Main tables give point estimates without run uncertainty. Noise and missingness sweeps cover only ETTh1 with DLinear and PatchTST; wider robustness is not established.
- Some ablations differ numerically from the main results, and prose overstates Table 12's ordering and Table 13's consistency. The learning-rate prose in Appendix D.4 also conflicts with the dataset-specific table. Exact cross-table aggregates and replication settings require clarification.
- The supplied source gives no explicit publication year, confirmed venue, DOI, or arXiv identifier for this paper. It ends after limitation (ii), although Appendix L announces three limitations. Missing metadata and the unfinished limitation are not inferred.

## Related Concepts

- [[concepts/latent-space-time-series-forecasting|Latent-Space Time Series Forecasting]]: learning dynamics over encoded observations and decoding the forecast.
- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]: related latent-target prediction; LatentTSF instead uses a reconstruction-pretrained, fully frozen target encoder.
- [[concepts/function-space-autoencoders|Function-Space Autoencoders]]: a representation-learning comparison; these encode functional objects, whereas LatentTSF encodes individual multivariate time points.

## Related Papers

- Hu et al. (2026), "Bridging past and future: Distribution-aware alignment for time series forecasting": cited alignment-based predecessor, discussed as TimeAlign.
- Oord, Li, and Vinyals (2018), "Representation learning with contrastive predictive coding": cited basis for the InfoNCE motivation.
- [[papers/joint-embeddings-go-temporal|Joint Embeddings Go Temporal]]: library comparison using masked temporal embedding prediction and moving targets; not a cited baseline in the supplied manuscript.
- [[papers/multivariate-time-series-forecasting-needs-cross-variable-loss|Multivariate Time Series Forecasting needs Cross Variable Loss]]: library comparison that adds structure to observation-space residual supervision; not an evaluated comparator here.

[[index|Library home]]
