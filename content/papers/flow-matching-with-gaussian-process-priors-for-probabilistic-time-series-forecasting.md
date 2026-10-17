---
title: Flow Matching with Gaussian Process Priors for Probabilistic Time Series Forecasting
type: paper
authors:
  - Marcel Kollovieh
  - Marten Lienen
  - David Lüdke
  - Leo Schwinn
  - Stephan Günnemann
year: null
tags:
  - time-series
  - probabilistic-forecasting
  - flow-matching
  - gaussian-processes
---

[[index|Library home]]

## TL;DR

TSFlow replaces isotropic noise with temporally structured Gaussian-process (GP) priors in a flow-matching model. It supports forecasting either through directly trained conditional flows with GP-regression priors or through conditional prior sampling and guidance applied to an unconditional model. Across eight benchmarks, conditional TSFlow is competitive with statistical, neural, and diffusion baselines; the benefits of particular priors and inference components vary by dataset and task.

## Research Question

Can a prior that already captures temporal structure simplify generative time-series modeling, and can conditioning both the prior and the flow improve probabilistic forecasting?

## Motivation

Independent Gaussian noise lacks the correlations present in time series. A learned flow must therefore construct temporal structure while matching the data distribution. [[concepts/flow-matching|Flow Matching]] permits flexible source distributions and couplings, making it possible to encode smoothness, roughness, or periodicity before learning the transformation. The paper distinguishes flow time, which indexes generation, from the time index within each generated sequence.

## Contributions

- Introduces TSFlow with squared-exponential, Ornstein-Uhlenbeck (OU), and periodic GP priors.
- Combines structured priors with mini-batch optimal-transport coupling for unconditional training.
- Develops conditional prior sampling (CPS) and trajectory guidance for forecasting with an unconditionally trained model.
- Trains a separate conditional variant whose prior is a GP regression distribution given observed history.
- Evaluates unconditional sample quality, downstream prediction, forecasting, missing observations, and a multivariate extension.

## Method

**Unconditional training.** Prior and data batches are paired using mini-batch [[concepts/optimal-transport|Optimal Transport]]. Given endpoints $x_0$ and $y$, the conditional path has mean $(1-t)x_0+ty$. With constant path variance, the regression target is the displacement $y-x_0$. For guided generation, the paper instead uses decreasing path noise and the corresponding variance-dependent vector-field correction (Appendix C).

**Structured prior.** [[concepts/gaussian-process-priors-for-generative-time-series|Gaussian Process Priors for Generative Time Series]] encode temporal covariance through a kernel. Squared-exponential, OU, and periodic kernels express different assumptions about sequence structure. The experiments use fixed kernel parameters, frequency-scaled time coordinates, and additive white-noise covariance for numerical stability rather than fitting GP hyperparameters to each dataset (Appendices A.2 and A.6).

**Conditionally trained forecasting.** The observed past is retained in the prior sample, while its future is sampled from

$$
x_0^f\mid y^p\sim\mathcal N(\mu_{f\mid p},\Sigma_{f\mid p}),\qquad
\mu_{f\mid p}=\Sigma_{fp}\Sigma_{pp}^{-1}y^p,
$$

$$
\Sigma_{f\mid p}=\Sigma_{ff}-\Sigma_{fp}\Sigma_{pp}^{-1}\Sigma_{pf}.
$$

Training draws pairs from $q_1(y)q_0(x_0\mid y^p)$, rather than the unconditional mini-batch OT coupling. The vector-field network receives history and an observation mask; lagged values extend its historical information. Covariance calculations can be reused across instances with the same sampling layout (Section 3.2).

**Forecasting from unconditional training.** CPS uses Langevin-style updates to adjust the initial latent sample toward consistency with observed history. Its approximate likelihood compares history with a generated trajectory using an asymmetric Laplace model. Guidance then adjusts the vector field during ODE integration. These are distinct interventions: one changes initialization, the other changes generation dynamics. Both use approximate flow evaluations and observation likelihoods (Sections 3.1.2-3.1.3).

**Implementation.** A DiffWave-style network with three S4 residual blocks has approximately 176,000 parameters. Training uses Adam, learning rate $10^{-3}$, batch size 64, and exponential moving averages. Conditional and unconditional models train for 400 and 1,000 epochs respectively. Forecasting uses a 32-step Euler solver; unconditional CPS adds four iterations with four flow evaluations each (Appendix A.2).

## Experiments

**Protocol.** The eight datasets are Electricity, Exchange, KDDCup, M4-Hourly, Solar, Traffic, UberTLC-Hourly, and Wikipedia/Wiki2000. Forecast horizons range from 24 to 48 steps. Results report means and standard deviations over five seeds. Forecast CRPS is approximated using nine quantiles from 0.1 to 0.9 and 100 forecast samples. Unconditional evaluation uses 10,000 samples for Wasserstein distance and for the Linear Predictive Score (LPS), which evaluates a ridge predictor trained on synthetic sequences against real test data.

**Forecasting.** Selected Table 3 results are below; lower CRPS is better. These are main-table results, which differ from some appendix configurations.

| Dataset | TSFlow conditional, OU | TSFlow unconditional | TSDiff |
| --- | --- | --- | --- |
| Electricity | 0.045 ± 0.000 | 0.049 ± 0.001 | 0.049 ± 0.000 |
| KDDCup | 0.288 ± 0.004 | 0.287 ± 0.005 | 0.311 ± 0.026 |
| M4-Hourly | 0.028 ± 0.008 | 0.032 ± 0.001 | 0.036 ± 0.001 |
| Solar | 0.344 ± 0.006 | 0.396 ± 0.005 | 0.358 ± 0.020 |
| Traffic | 0.082 ± 0.000 | 0.086 ± 0.000 | 0.098 ± 0.002 |
| Wiki2000 | 0.207 ± 0.001 | 0.291 ± 0.005 | 0.221 ± 0.001 |

Across TSFlow variants, Table 3 gives the best or tied-best mean on six datasets. TFT leads Exchange at 0.007, and SSSD leads KDDCup at 0.274. Different kernels win on different datasets; the table does not establish one universally superior kernel.

**Generation and downstream usefulness.** In Table 1, the 4-evaluation OU prior lowers KDDCup Wasserstein distance from 27.264 to 23.762 relative to an isotropic prior, and Solar from 5.193 to 4.564. At 16 evaluations, TSFlow variants outperform TSDiff's 100-evaluation results across all eight listed datasets. In Table 2, the periodic prior has the lowest LPS on six datasets, but its KDDCup LPS is 0.900 versus TSDiff's 0.651. Better geometric sample matching does not guarantee better downstream prediction for every prior.

**Ablations.** Adding the OU prior to the base conditional model improves all five Table 7 means, including Electricity from 0.058 to 0.049 and Traffic from 0.133 to 0.107. Later additions are mixed: adding lags worsens KDDCup from 0.273 to 0.392. Table 8 shows four CPS iterations improving four means, tying two, and worsening KDDCup and Solar; this contradicts the accompanying claim of equal-or-better results on seven of eight datasets. Solar worsens from 0.371 to 0.464. Table 9 similarly supports ALD guidance over Gaussian guidance on seven means, rather than the six stated in its prose.

**Extensions and cost.** With 50% missing history, TSFlow beats the reported best TSDiff variant in 12 of 18 comparisons (Tables 11-13). A feature-axis transformer extension has the best CRPS-Sum on three of four multivariate datasets, while the channel-independent variant wins Exchange (Table 14). On Solar, Table 6 reports evaluation times of 24.29 for the isotropic conditional model, 24.65 for the GP conditional model, and 81.97 for CPS plus guidance on an A100; the table does not label time units. The unconditional forecasting procedure is roughly three times slower in this comparison.

## Limitations

- Evidence is primarily univariate, with a smaller four-dataset multivariate extension. The extension uses feature attention rather than demonstrating a full multivariate GP prior.
- Kernel and guidance choices depend on the task and validation data. Gains from structured priors, CPS, and lag features are not uniform.
- Unconditional forecasting uses a longer context and differentiation through flow integration, so low ODE step counts alone do not establish lower end-to-end latency.
- CPS and guidance rely on approximate observation likelihoods and numerical integration; their practical forecasts should not be interpreted as exact conditional samples.
- The supplied Markdown has mathematical inconsistencies: Equation 7 subtracts the log-density score in its Langevin update, and Equation 16 equates a likelihood gradient with a pinball-loss value. These expressions require checking against an implementation before reuse.
- The supplied source does not establish the paper's publication year, venue, DOI, or arXiv identifier; these are left unspecified.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: regression of conditional vector fields and ODE sampling.
- [[concepts/gaussian-process-priors-for-generative-time-series|Gaussian Process Priors for Generative Time Series]]: temporal covariance and history-conditioned source distributions.
- [[concepts/optimal-transport|Optimal Transport]]: mini-batch pairing of prior and target samples.
- [[concepts/diffusion-models|Diffusion Models]]: forecasting comparators and the inspiration for observation guidance.

## Related Papers

- Lipman et al. (2022), "Flow matching for generative modeling": the source's cited CFM foundation.
- Tong et al. (2023), "Improving and generalizing flow-based generative models with minibatch optimal transport": arbitrary source distributions and mini-batch OT coupling.
- Kollovieh et al. (2023), "Predict, refine, synthesize: Self-guiding diffusion models for probabilistic time series forecasting": TSDiff, a forecasting and generation baseline and source of the guidance approach.
- Biloš et al. (2023), "Modeling temporal data as continuous functions with stochastic process diffusion": a temporal stochastic-process diffusion comparator; TSFlow distinguishes its OT paths and couplings.
- [[papers/flow-matching-on-lie-groups|Flow Matching on Lie Groups]]: a complementary library connection that changes interpolation geometry, whereas TSFlow changes the source distribution and its coupling. This is not a TSFlow experimental comparison.
