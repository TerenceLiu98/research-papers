---
title: "Predicting the Unpredictable: LLM-powered Long-term Chaotic Time Series Forecasting under Short-term Observations"
type: paper
authors:
  - Yuhang Yao
  - Bohan Jiang
year: null
tags:
  - chaotic-time-series
  - time-series-forecasting
  - large-language-models
  - phase-space-reconstruction
---

## TL;DR

PAC-LLM forecasts chaotic systems from short observation windows by combining a Takens-inspired learnable delay embedding, statistics-conditioned modulation, a reprogrammed language-model branch, and an auxiliary cross-variable branch with adaptive gated fusion. Across four synthetic systems, the paper reports the best result in 23 of 24 comparisons spanning trajectory, valid-prediction-time, and attractor metrics. Ablations indicate that the auxiliary interaction branch and phase-space features contribute more than the textual prompt alone, while controlled backbone replacements suggest a smaller but generally positive contribution from language-model pretraining.

## Research Question

Can long-horizon multivariate chaotic trajectories be forecast from limited recent observations by combining local phase-space reconstruction with pretrained language-model representations and explicit cross-variable interaction modeling?

## Motivation

Chaotic systems follow deterministic dynamics but rapidly amplify small state errors, so long autoregressive forecasts can lose both trajectory accuracy and attractor structure. This is especially difficult when sensing duration or online operation provides only a short context. General LLM-based forecasters model temporal patterns but do not explicitly reconstruct delayed state coordinates or represent coupling among variables. The paper therefore treats short-context forecasting as a local-state reconstruction problem rather than relying on longer histories alone.

## Contributions

- Formulates a common short-observation protocol in which 30 observed steps, approximately one Lyapunov time for the synthetic systems, support rollouts of 30, 120, and 300 steps.
- Introduces PAC-LLM, coupling learned delay coordinates and chaos-aware statistical modulation with an LLM temporal branch.
- Adds a channel-attention auxiliary branch and similarity- and reliability-aware gates that inject cross-variable corrections into the main forecast.
- Evaluates pointwise errors, valid prediction time, and attractor geometry and distribution, with ablations, backbone controls, observation-noise tests, context-length sensitivity, and an experimental double-pendulum dataset.

## Method

**Phase-space representation.** Each observed variable is expanded into delayed coordinates whose continuous delays are learned through differentiable linear interpolation. A linear projection maps the reconstructed states to latent features. Complexity, kurtosis, spectral entropy, and related system statistics generate feature-wise scale and shift parameters, which modulate those features before overlapping patch tokenization. This is a learned instance of [[concepts/dynamical-systems-reconstruction|Dynamical Systems Reconstruction]] rather than a fixed offline choice of delay parameters.

**LLM temporal branch.** A dynamics-aware textual prompt summarizes trend, energy, morphology, and other descriptors. Cross-attention uses numeric patch tokens as queries and mapped vocabulary embeddings as keys and values, placing the patches in the language model's input space. The prompt and reprogrammed tokens pass through the first two GPT-2 layers by default, and the retained time-series hidden states form the main forecast representation. This branch instantiates [[concepts/model-reprogramming|Model Reprogramming]] around a pretrained backbone.

**Auxiliary interaction branch.** The patch representation retains its variable axis. Channel-wise self-attention at each patch position models multivariate dependencies, after which an MLP encoder produces auxiliary forecast features.

**Adaptive fusion and training.** A first gate uses cosine similarity, both branch features, and their absolute difference to refine the auxiliary representation. A second reliability gate controls a learned auxiliary correction added to the main representation. A residual prediction head produces the rollout. Training combines mean-squared losses on the fused forecast and a separate auxiliary forecast, weighted by a reported coefficient of 0.9 for the fused loss.

## Experiments

**Data and protocol.** Four synthetic systems from `dysts` are used: Lorenz63, Rossler, Chua, and an eight-dimensional Lorenz96. Trajectories are integrated at a 0.001 step, downsampled to about 30 points per Lyapunov time, and stripped of a five-Lyapunov-time transient. Each system has one 30,000-point training trajectory and multiple test trajectories from unseen attractor initial conditions. The real-world evaluation uses 21 IBM double-pendulum experiments, split 15/3/3 by trajectory. All methods use autoregressive evaluation at 30, 120, and 300 steps; an additional validation-based analysis lets methods choose among context lengths.

**Comparisons and metrics.** Baselines include NVAR, ESN, Time-LLM, LLM-Mixer, Crossformer, TimesNet, LSTNet, NBEATS, and [[papers/panda-a-pretrained-forecast-model-for-chaotic-dynamics|Panda]]. Metrics comprise MSE, MAE, sMAPE, valid prediction time (VPT), correlation-dimension discrepancy, and state-space distribution divergence.

**Reported synthetic results.** PAC-LLM ranks first in 23 of the 24 system-metric comparisons in Table 1 and second in the remaining comparison. For example, its VPT is 4.57 Lyapunov times on Lorenz63, 9.53 on Rossler, 8.50 on Chua, and 1.77 on Lorenz96. Its 300-step sMAPE is 81.51, 19.68, 31.73, and 92.25 on those systems, respectively. On Lorenz96, NVAR has lower 30-step sMAPE (10.50 versus 23.06), while PAC-LLM leads at the two longer horizons and on VPT and both attractor metrics.

**Ablations and controls.** On Lorenz63, removing the auxiliary branch raises average MSE and MAE by 57.9% and 62.2%; removing the full temporal feature module raises them by 44.6% and 49.1%; and replacing weighted fusion raises them by 17.8% and 20.1%. Removing only the prompt also degrades results, but less than the structural components. PAC-LLM generally beats matched randomly initialized and numeric Transformer replacements on Lorenz63 and Rossler. One exception is Rossler state-space divergence, where the numeric Transformer records 0.0036 versus 0.004 for PAC-LLM.

**Backbones, robustness, and efficiency.** On Rossler, larger Qwen2.5-3B and Llama-3.2-3B backbones do not consistently improve over GPT-2, while fine-tuned GPT-2 improves the reported 300-step MSE/MAE from 0.115/0.108 to 0.104/0.103. Forecasts remain relatively stable under Gaussian observation noise through a reported scale of $10^{-2}$ and degrade under stronger corruption. On the experimental double pendulum, the paper reports the lowest short-horizon MSE and longest VPT, though the figure rather than a numeric table supplies those comparisons. On Lorenz63, PAC-LLM is reported at 61.08M parameters, 2,458 MB, and 0.0898 seconds per iteration, compared with 3,163 MB and 0.1110 seconds for Time-LLM and 3,740 MB and 0.1121 seconds for LLM-Mixer.

## Limitations

- The supplied manuscript does not provide a publication year, venue, DOI, arXiv identifier, source-code URL, or uncertainty estimates; the metadata therefore leaves `year` null and the reported rankings cannot be paired with confidence intervals.
- Synthetic-system training uses one long trajectory per system. Unseen initial conditions test rollout transfer on the same governing system, not transfer to unseen equations or broad zero-shot generalization of a [[concepts/time-series-foundation-models|Time Series Foundation Model]].
- Most evidence comes from four standard simulated systems. The only physical dataset contains 21 double-pendulum trajectories, and its main comparison is presented graphically without the underlying numeric table.
- The uniform 30-step training window and rollout protocol improve comparability, but model-specific validation selects context length only in a narrower sensitivity analysis involving a subset of competitors.
- The controlled backbone study supports a contribution from pretraining on most reported metrics, but PAC-Numeric-Transformer nearly matches PAC-LLM on Rossler and slightly improves one attractor-distribution metric. The evidence does not identify which pretrained language capabilities transfer.
- Robustness is limited to input-side Gaussian perturbations with an unchanged trained model. Severe corruption degrades both forecast accuracy and attractor reconstruction.
- Physics-informed constraints are proposed as future work rather than incorporated into the model, leaving behavior on dissipative, constrained, or more heterogeneous physical systems unresolved.

## Related Concepts

- [[concepts/dynamical-systems-reconstruction|Dynamical Systems Reconstruction]]: separates near-term trajectory tracking from preservation of attractor geometry and long-run state distributions.
- [[concepts/model-reprogramming|Model Reprogramming]]: maps numerical patches into a frozen or adapted language model's embedding space through a learned interface.
- [[concepts/time-series-foundation-models|Time Series Foundation Models]]: provides the broader context for pretrained temporal models and distinctions among zero-shot use, frozen-backbone adaptation, and fine-tuning.

## Related Papers

- [[papers/time-llm-time-series-forecasting-by-reprogramming-large-language-models|TIME-LLM: Time Series Forecasting by Reprogramming Large Language Models]] supplies the patch reprogramming and prompt-based adaptation pattern used as a baseline and architectural starting point.
- [[papers/panda-a-pretrained-forecast-model-for-chaotic-dynamics|Panda: A Pretrained Forecast Model for Universal Representation of Chaotic Dynamics]] is the cited chaotic-dynamics foundation model and exhibits a different context-length regime, benefiting more from longer histories.
- [[papers/true-zero-shot-inference-of-dynamical-systems-preserving-long-term-statistics|True Zero-Shot Inference of Dynamical Systems Preserving Long-Term Statistics]] studies context-conditioned reconstruction of held-out systems with explicit long-term statistical evaluation.

[[index|Library home]]
