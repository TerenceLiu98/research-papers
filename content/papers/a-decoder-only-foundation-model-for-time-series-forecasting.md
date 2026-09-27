---
title: A Decoder-Only Foundation Model for Time-Series Forecasting
type: paper
authors:
  - Abhimanyu Das
  - Weihao Kong
  - Rajat Sen
  - Yichen Zhou
year: 2024
tags:
  - time-series-forecasting
  - foundation-models
  - transformers
  - zero-shot-learning
---

## TL;DR

TimesFM is a 200M-parameter decoder-only transformer pretrained from scratch on real and synthetic time series. It turns 32-point input patches into 128-point forecasts and supports different context and horizon lengths without target-task weight updates. It achieves competitive aggregate accuracy against supervised forecasting models on Monash, Darts, and ETT benchmarks, but does not win every dataset or aggregation. The main ETT comparison covers only the final test window, and some Monash context lengths are selected using target-series validation data.

## Research Question

Can one model pretrained on a large, diverse time-series corpus forecast previously unseen datasets across domains, temporal granularities, context lengths, and prediction horizons without dataset-specific training?

## Motivation

Training a forecasting model separately for every dataset creates data and compute burdens. A reusable model could transfer temporal patterns between datasets, but time series lack a shared discrete vocabulary and vary in scale, seasonality, frequency, and available history. TimesFM addresses these issues through numeric patch embeddings, causal prediction, variable-context training, and a mixture of real and synthetic pretraining data.

## Contributions

- Introduces a [[concepts/time-series-foundation-models|time series foundation model]] trained directly on temporal data, without text-pretrained language-model weights.
- Combines causal patch-level training with output patches longer than input patches, reducing the number of autoregressive steps needed for long horizons.
- Uses partial first-patch masking to train across all context lengths up to the training maximum.
- Evaluates zero-shot forecasting, model and patch-size ablations, synthetic-data contributions, and limited-data fine-tuning of input/output blocks.

## Method

**Architecture.** A univariate history is split into non-overlapping patches of length $p$. A residual MLP embeds each patch, adds positional encoding, and passes the tokens through causal transformer layers. An output residual MLP maps each token to the next $h$ time points. The main model has $p=32$, $h=128$, 20 layers, width 1280, 16 attention heads, and dropout 0.2 (Section 4; Appendix A.6).

For $N$ input patches, training minimizes observation-space point-forecast error at every patch boundary:

$$
\mathcal L = \frac{1}{N}\sum_{j=1}^{N}
\operatorname{MSE}\!\left(\hat{\mathbf y}_{pj+1:pj+h},\mathbf y_{pj+1:pj+h}\right).
$$

Each training example masks a randomly chosen $r\in\{0,\ldots,p-1\}$ initial time points. Predictions at successive patch boundaries therefore see contexts of lengths $p-r,2p-r,\ldots$, collectively covering every length up to the maximum. Fully masked patches are excluded from attention. Longer forecasts append predicted output patches to the history and repeat inference; a 256-point horizon requires two 128-point generation steps rather than eight 32-point steps.

**Pretraining.** The corpus combines Google Trends, Wikimedia pageviews, synthetic series, and public forecasting datasets including M4, Electricity, Traffic, Weather, Favorita sales, and LibCity traffic data. The paper describes its scale as $O(100\mathrm{B})$ time points. The loader samples 80% real and 20% synthetic data; real-data groups receive equal weights for hourly/sub-hourly, daily, weekly, and monthly granularities. Three million synthetic series of length 2048 combine trends, ARMA processes, and seasonal sine/cosine components (Section 5; Appendix A.8).

Maximum training context is 512 points where available, 256 for weekly data, and 64 for monthly or coarser data. Normalization uses the mean and standard deviation of the first input patch. The main run uses 1.5M steps, global batch size 4096, and approximately two days on 16 TPUv5e cores. The tested model predicts points from univariate history; covariates, date-derived features, and probabilistic output heads are proposed extensions.

## Experiments

**Zero-shot benchmarks.** Monash evaluation retains 18 datasets without missing values; Darts contains eight individual series. Their MAEs are divided by a last-value naive baseline before aggregation. ETT evaluates four transformer-temperature datasets at horizons 96 and 192 with context 512. Lower scores are better (Tables 3-5).

| Benchmark and aggregation | TimesFM | Selected comparisons |
| --- | --- | --- |
| Monash, geometric mean scaled MAE | 0.6846 | N-BEATS 0.7005; llmtime 0.9715; pretrained PatchTST 1.0557 |
| Monash, arithmetic mean scaled MAE | 0.8005 | N-BEATS 0.7844; llmtime 1.0588 |
| Darts, geometric mean scaled MAE | 0.5767 | llmtime 0.4882; ARIMA 0.5219; supervised PatchTST 0.6458 |
| Darts, arithmetic mean scaled MAE | 0.6829 | ARIMA 0.6045; llmtime 0.6641 |
| ETT, mean normalized MAE over eight final-window tasks | 0.36 | Supervised PatchTST 0.37; pretrained PatchTST 0.35; llmtime 0.45 |

TimesFM leads Monash's geometric-mean comparison, while N-BEATS leads the arithmetic-mean comparison. The authors describe their difference as within statistical uncertainty and report more than 25% improvement over llmtime on the geometric aggregate. Darts numerically favors llmtime or ARIMA depending on aggregation; the paper emphasizes wide uncertainty from only eight series. Figures display one-standard-error bars, which should not be read as proof of equivalence.

For ETT, the main comparison uses only the last test window because llmtime evaluation is expensive. Table 5 includes an additional compute-matched, pretrained PatchTST control whose rounded aggregate is slightly lower than TimesFM's. Appendix A.6 states that ETT llmtime uses GPT-3.5-Turbo, whereas Monash and Darts use previously supplied GPT-3 outputs.

**Ablations.** Across 17M, 70M, and 200M models, Monash error decreases with training FLOPs in the preliminary scaling study. For 512-step ETT forecasting on rolling test windows, increasing output patch length from 8 to 128 reduces average MAE. Input patch sizes 16 and 32 perform best in the 70M study; 32 trains almost twice as fast as 16. Removing synthetic data worsens Monash and 15-minute ETT performance, with little change on hourly ETT. Compute-matched pretrained PatchTST is much weaker on Monash but competitive on ETT, where evaluation context matches the predominantly 512-point training context (Section 6.2; Appendix A.4).

**Fine-tuning.** Appendix A.3 trains only TimesFM's input/output residual blocks on 10% of each ETT training set and evaluates the original test protocol, averaging horizons 96, 192, 336, and 720:

| Dataset | TimesFM fine-tuned MAE | GPT4TS fine-tuned MAE |
| --- | --- | --- |
| ETTh1 | 0.426 | 0.525 |
| ETTh2 | 0.410 | 0.421 |
| ETTm1 | 0.388 | 0.441 |
| ETTm2 | 0.334 | 0.335 |

TimesFM leads each dataset average among the listed methods, but the ETTm2 difference is small. GPT4TS is better at ETTm2 horizon 336 (0.346 versus 0.349), and the two tie at horizon 192 (0.309). These are adaptation results, separate from zero-shot performance.

## Limitations

- **Task scope:** The study addresses univariate point forecasting. Probabilistic calibration, covariate handling, and date features are not demonstrated by the tested model (Appendices A.1 and A.7).
- **Evaluation scope:** Missing-value datasets are excluded from Monash; Darts has only eight series; the main ETT scores are final-window results rather than full rolling-test performance. Appendix A.5.2 selects some Monash context lengths by forecasting held-out portions of target training histories, so zero-shot here means no weight updates, not absence of target-data model selection.
- **Pretraining separation:** The authors state that evaluation datasets were held out, but both the pretraining description and Monash table contain traffic datasets. The supplied text does not fully document their separation. It also notes possible llmtime contamination from widely circulated Darts examples; this is a concern, not an established finding.
- **Ablation interpretation:** The pretrained PatchTST control uses the same loader and FLOP budget, but sees predominantly long contexts and performs fewer optimization iterations. Its Monash deficit does not isolate architecture independently of context coverage and training allocation. The scaling study is preliminary, not a fitted universal scaling law.
- **Source inconsistencies:** Appendix A.9 claims the best AirPassengers MAE for TimesFM, but Table 3 gives 62.51 versus ARIMA's 24.03. Table 5's pretrained PatchTST aggregate also qualifies the main text's broad ETT ranking. Appendix A.5.2 repeats tourism monthly with conflicting chosen context lengths, and the prose's roughly 300B Wikimedia points does not match the larger sum of Table 1 rows. This page retains table values and avoids inferring corrections.
- **Provenance and release status:** This summary follows the supplied preprint dated April 19, 2024. No identifier for the paper itself is present in that text. Weight release is described as planned, not verified as completed. Interpretability, data bias, and broader adaptation remain open issues in the paper.

## Related Concepts

- [[concepts/time-series-foundation-models|Time Series Foundation Models]]: broad temporal pretraining for reusable forecasting.
- [[concepts/transferability-evaluation|Transferability Evaluation]]: distinguishing zero-shot accuracy, target-data selection, and gains after fine-tuning.

## Related Papers

- Nie et al., "A Time Series Is Worth 64 Words: Long-Term Forecasting with Transformers" [NNSK22]: the cited PatchTST patching predecessor and a supervised/pretrained comparison.
- Gruver et al. (2023), "Large Language Models Are Zero-Shot Time Series Forecasters" [GFQW23]: the llmtime baseline, listed as arXiv:2310.07820 in the supplied bibliography.
- Garza and Mergenthaler-Canseco (2023), "TimeGPT-1" [GMC23]: parallel foundation-model work discussed by the authors, not an evaluated baseline; listed as arXiv:2310.03589.
- [[papers/time-series-foundation-models-for-multivariate-financial-time-series-forecasting|Time Series Foundation Models for Multivariate Financial Time Series Forecasting]]: a later library comparison examining task-dependent transfer and conventional baselines in finance, not an experiment or citation in this preprint.
- [[papers/joint-embeddings-go-temporal|Joint Embeddings Go Temporal]]: a library comparison using patch-level latent prediction for temporal representation learning, whereas TimesFM trains directly on future observed values. The studies do not directly compare their models.

[[index|Library home]]
