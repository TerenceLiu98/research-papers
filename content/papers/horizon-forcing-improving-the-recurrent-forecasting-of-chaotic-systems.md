---
title: "Horizon Forcing: Improving the Recurrent Forecasting of Chaotic Systems"
type: paper
authors:
  - Yong Zhuang
  - Matthew Almeida
  - Wei Ding
  - Shafiqul Islam
  - Zihan Li
  - Ping Chen
year: 2025
doi: "10.1145/3718090"
venue: "ACM Transactions on Intelligent Systems and Technology, 16(5), Article 120"
tags:
  - time-series-forecasting
  - chaotic-systems
  - recurrent-neural-networks
  - curriculum-learning
---

## TL;DR

[[concepts/horizon-forcing|Horizon Forcing]] trains a recurrent forecaster first on one-step predictions, then on progressively longer rollouts through shared-weight Error Trajectory Tracing (ETT) towers. It improves prediction horizons on three simulated chaotic systems and several real-world series, but does not uniformly outperform competing methods on electricity, gait force, or dwelling-worm measurements.

## Research Question

Can a recurrent model extend useful forecasts of chaotic dynamics by learning the downstream consequences of local prediction errors, without knowing the governing equations?

## Motivation

In a chaotic system, the direction and location of a small prediction error can matter more than its immediate magnitude. Teacher forcing minimizes error under observed histories, while deployment repeatedly feeds back predictions, exposing the model to [[concepts/exposure-bias|Exposure Bias]] and compounding deviations. Optimizing only a distant endpoint also risks rewarding a trajectory that diverges and later happens to return near the truth.

## Contributions

- Introduces ETT towers that propagate predicted states and hidden states through repeated applications of a shared recurrent cell.
- Defines a Lyapunov-inspired loss for local error growth and a staged horizon curriculum for optimizing future prediction errors.
- Evaluates three simulated systems and six real-world datasets, with ablations separating gradual horizon extension from direct long-horizon training.

## Method

The model learns an unknown state-transition function from observed sequences. At each timestep, ETT extends the recurrent computation into a tower whose cells share weights with the base model. Each level consumes the previous prediction and hidden state, allowing gradients from future errors to pass through predicted inputs (Sections 3.2 and 3.5).

For a predicted state $\hat{\mathbf u}_t$, the proposed Lyapunov horizon loss is

$$
\lambda_t=\log\frac{\|f_\theta^k(\hat{\mathbf u}_t)-\mathbf u_{t+k}\|}{\|\hat{\mathbf u}_t-\mathbf u_t\|}.
$$

Equation (6) adds these log error-growth ratios to summed one-step squared errors. This is a training objective inspired by sensitivity to initial conditions, not a proof that the learned system has a particular Lyapunov exponent or bounded rollout error.

Horizon Forcing first trains the base network with teacher forcing, then initializes successive ETT models from the preceding trained model. Experiments extend the tower horizon in increments of five, producing HF5, HF10, HF15, and HF20. Section 3.4 describes a tower of depth $k$ as assessing $k$ additional transitions after the initial prediction, or $k+1$ steps from its preceding observed input. Shared weights let distant losses update the same transition model used for one-step prediction.

## Experiments

**Setup.** The backbone is a single-layer GRU with 256 latent units and 100 observed input timesteps. Training uses batches of 30 trajectories, at most 200 epochs, and early stopping after 15 epochs without improvement. Comparators include teacher forcing, full-schedule scheduled sampling (SSFS), BLS, ELM, TimesNet, Music Transformer, Informer, Autoformer, FEDformer, and iTransformer. The paper tunes learning rates while otherwise largely using the published comparator settings (Section 4.1).

**Evaluation.** Reported mean errors average per-step RMSE, mean normalized error, or SMAPE over sequences and time. Prediction horizon is the first timestep where the error averaged across test sequences exceeds a dataset-specific threshold; it is not the average of individual sequences' crossing times. Thresholds are chosen from the average performance of the best two methods. The six real-world datasets are roaming worms, two dwelling-worm subsets, accelerometer, gait force, and electricity. Real-world train/test assignment is by sequence identifier (Sections 4.2-4.3).

| Dataset and comparison | Mean per-step RMSE | RMSE prediction horizon, steps | Source |
| --- | --- | --- | --- |
| Lorenz: teacher forcing / HF15 | 3.971 / 2.865 | 102 / 126 | Tables 4-5 |
| Rossler: teacher forcing / HF5 | 9.158 / 1.623 | 94 / 739 | Tables 4-5 |
| Lotka-Volterra: teacher forcing / HF20 | 1.966 / 1.132 | 41 / 77 | Tables 4-5 |
| Roaming worm: SSFS / HF20 | 2.295 / 2.267 | 50 / 56 | Table 6 |
| Accelerometer: Informer / HF20 | 0.280 / 0.262 | 101 / 132 | Table 6 |
| Gait force: SSFS / HF20 | 154.833 / 159.771 | 143 / 134 | Table 6 |
| Electricity: TimesNet / HF20 | 33.413 / 99.535 | 135 / 8 | Table 6 |
| Dwelling worm subset 1: BLS / HF20 | 1.587 / 1.674 | 63 / 68 | Table 6 |
| Dwelling worm subset 2: BLS / HF20 | 1.444 / 1.530 | 74 / 66 | Table 6 |

The direct ETT20 ablation is much worse than staged HF20: on Lorenz, mean RMSE is 8.115 versus 2.944 and the RMSE horizon is 0 versus 123; on Rossler, these are 13.768 versus 1.722 and 0 versus 724. Direct ETT20 also underperforms teacher forcing on most reported ablation datasets, supporting the importance of the curriculum (Table 4).

Longer training horizons do not improve every metric: HF15 has the lowest Lorenz mean RMSE, HF5 the lowest Rossler mean RMSE, and HF10 the longest Rossler RMSE horizon. On electricity, the authors interpret TimesNet and iTransformer's nearly flat error curves as low-variance predictions, but their measured errors and horizons still outperform HF. BLS also has better gait-force SMAPE, despite occasional large errors visible under other metrics (Tables 5-6; Section 4.5).

## Limitations

- ETT increases training computation and runtime as towers grow. The paper proposes linear RNNs or Mamba as future alternatives, without evaluating them.
- Sampling losses at selected horizons can miss large intermediate deviations or coincidental endpoint realignment. Section 4.6 identifies periodicity and non-chaotic systems as cases where the approach may be less useful.
- Prediction horizons depend on thresholds chosen using compared methods' performance, so these are benchmark-relative measures rather than externally fixed reliability guarantees.
- Benchmark tables provide no uncertainty intervals or repeated-seed variability, and comparator tuning is limited. Small numerical differences should not be read as established statistical differences.
- The supplied text has reporting inconsistencies: Table 3 lists six gait-force variables while Section 4.3.2 says five; the accelerometer HF5 SMAPE horizon differs between Tables 4 and 6. Neither disputed quantity is used in the comparison above.

## Related Concepts

- [[concepts/horizon-forcing|Horizon Forcing]]: a curriculum over the future consequences of local forecasting errors.
- [[concepts/exposure-bias|Exposure Bias]]: the observed-history versus generated-history mismatch in recurrent prediction.
- [[concepts/scheduled-autoregressive-bptt|Scheduled Autoregressive BPTT]]: a related curriculum that changes input exposure while preserving feedback gradients.

## Related Papers

- [[papers/learning-from-predictions-fusing-training-and-autoregressive-inference-for-long-term-spatiotemporal-forecasts|Learning from Predictions: Fusing Training and Autoregressive Inference for Long-Term Spatiotemporal Forecasts]] is a related library paper on differentiating through recurrent feedback. Its curriculum changes the probability of using predictions; HF extends rollout depth. This is a conceptual connection, not a citation claimed for the source paper.
- Bengio et al. (2015), "Scheduled sampling for sequence prediction with recurrent neural networks," supplies the scheduled-sampling baseline (reference 3).
- Pathak et al. (2018), "Hybrid forecasting of chaotic processes: Using machine learning in conjunction with a knowledge-based model," combines reservoir computing with known dynamics, unlike the equation-free setting here (reference 38).
- Gilpin (2020), "Deep reconstruction of strange attractors from time series," supplies the real-world dataset collection and ecosystem simulation used for evaluation (reference 13).

Published in October 2025; [DOI: 10.1145/3718090](https://doi.org/10.1145/3718090).

[[index|Library home]]
