---
title: "PrismFlow: Residual Dynamics for Flow Matching in Time-Series Generation"
type: paper
authors:
  - Junru Zhang
  - Lang Feng
  - Jinbo Wang
  - Xu Guo
  - Yucheng Wang
  - Han Yu
  - Min Wu
  - Yabo Dong
  - Duanqing Xu
year: null
source_job_id: "459aab09-5c67-4a21-9851-ee54a8cdd1e9"
tags:
  - time-series-generation
  - flow-matching
  - mixture-of-experts
  - koopman-operators
---

## TL;DR

PrismFlow augments a global [[concepts/flow-matching|Flow Matching]] vector field with hard-routed, Koopman-inspired residual experts. The experts specialize in different temporal regimes under a confidence-aware winner-take-all objective and add a residual velocity during sampling. Across six datasets and four unconditional-generation metrics, the paper reports the best result in 16 of 24 comparisons, plus improved low-data results on Stocks and qualitative forecasting and imputation examples. The gains are not uniform across datasets or metrics, and the supplied manuscript does not provide broad numerical conditional-task or compute comparisons.

## Research Question

Can mode-specific residual dynamics prevent a finite-capacity flow-matching estimator from averaging incompatible local velocities and thereby preserve multimodal, oscillatory, and high-frequency structure in generated time series?

## Motivation

Under squared-error velocity regression, nearby flow states associated with different temporal regimes can induce conflicting target velocities. A single learned estimator can then favor a conditional-average direction, producing smooth trajectories with reduced spectral support. PrismFlow treats this as an estimator-level limitation rather than a defect of the exact flow-matching transport field. Its design retains a shared global field for stable transport while delegating regime-specific corrections to specialized experts.

## Contributions

- Frames time-series mode collapse in learned flow matching as velocity averaging that can attenuate branch-specific and high-frequency dynamics.
- Introduces a bank of stable, Koopman-inspired linear latent experts whose decoded velocities act as residual corrections to the global transport field.
- Uses confidence-aware winner-take-all routing, gradient masking for non-winning experts, and a batch-level load-balancing loss to promote specialization without soft velocity averaging.
- Evaluates unconditional generation, low-data training, guided forecasting and imputation, spectral coverage, component ablations, and the effect of expert count.

## Method

**Global transport.** For data $x_1$ and Gaussian noise $x_0$, the model uses the linear path $x_t=(1-t)x_0+tx_1$ and trains a global field $v_t^\theta$ against the constant target velocity $x_1-x_0$ with the standard conditional flow-matching loss.

**Latent dynamical experts.** A shared encoder and projector map $x_t$ to a latent state $z_t$. Expert $k$ defines a linear latent velocity

$$
\frac{dz_t}{dt}=A^kz_t,
$$

which a shared decoder maps to a data-space residual velocity $v_t^{\psi,k}$. To constrain the latent dynamics, the operator is parameterized as

$$
A^k=(S^k-(S^k)^\top)-(R^k)^\top R^k-\delta I.
$$

The skew-symmetric component supports rotations, while the negative-semidefinite and margin terms enforce dissipativity. This is a finite-dimensional use of [[concepts/koopman-operator-learning|Koopman Operator Learning]], not an exact Koopman representation of the original dynamics.

**Hard routing and training.** A router produces expert probabilities $\pi_t^k$ from the flow time and encoded state. During training, each expert predicts a candidate endpoint. Selection minimizes the candidate's endpoint error minus a confidence term $\beta\log(\pi_t^k+\varepsilon)$. Only the winning expert receives the winner-take-all specialization gradient. A KL penalty between average batch routing probabilities and a uniform prior discourages dead experts. The total objective combines global conditional flow matching, winner-take-all specialization, and load balancing.

**Sampling.** At inference, the router selects the expert with maximum probability. An ODE step adds its scheduled residual to the global velocity:

$$
x_{t+\Delta t}=x_t+\left(v_t^\theta(x_t,t)+\gamma\lambda_t v_t^{\psi,k_t^*}(x_t,t)\right)\Delta t.
$$

Forecasting and imputation add a flow-matching guidance gradient that enforces consistency with observed values.

## Experiments

**Setup.** The evaluation uses four real datasets (Stocks, ETTh, Energy, and fMRI) and two synthetic datasets (Sines and MuJoCo). Unconditional generation is measured by Context-FID, Correlational Score, Discriminative Score, and Predictive Score against GAN, VAE, diffusion, and flow-matching baselines. Dynamic mode decomposition (DMD) spectra are used to assess temporal-mode coverage.

**Unconditional generation.** PrismFlow records the best result in 16 of the 24 dataset-metric comparisons in Table 1. On Energy, it reports Context-FID $0.022$ and Discriminative Score $0.039$, versus the next-best $0.049$ and $0.139$. The abstract reports gains of 15.6% in Context-FID and 38.6% in Discriminative Score. Results are mixed elsewhere: SMF has lower Context-FID on Stocks and Diffusion-TS has lower Context-FID on fMRI; several predictive and correlational comparisons are ties or favor another method.

**Mode diversity.** On Stocks and fMRI, vanilla flow matching concentrates DMD eigenvalues closer to the real axis, whereas PrismFlow more closely overlaps the broader real-data spectrum. The fMRI expert analysis assigns slow or non-oscillatory structure mainly to one expert and oscillatory structure to another. These diagnostics support specialization on the examined datasets but do not establish that every expert has a stable semantic role across tasks.

**Low-data and conditional tasks.** On Stocks with 20% of training data, PrismFlow reports Context-FID $1.920$ versus $5.197$ for Diffusion-TS and $6.406$ for SMF; its Discriminative Score is $0.303$ versus $0.351$ and $0.347$. Forecasting and imputation examples on fMRI show closer tracking of sharp transitions than Diffusion-TS, but the supplied text presents these conditional results visually rather than in a broad numerical table.

**Ablations.** Removing the winner-take-all loss causes the largest reported degradation, including fMRI Discriminative Score increasing from $0.129$ to $0.402$. Removing load balancing or router confidence and disabling the sampling residual also worsens the Stocks and fMRI results. Four experts are the default; eight help Stocks further, while too many experts slightly hurt MuJoCo.

## Limitations

- PrismFlow is not uniformly best: eight of the 24 primary comparisons favor or tie another model, including Context-FID on Stocks and fMRI and several Predictive Scores.
- The low-data study covers only Stocks, while the spectral comparison covers Stocks and fMRI and the detailed expert interpretation covers fMRI. These experiments do not establish the same specialization behavior on every dataset.
- Conditional forecasting and imputation evidence in the supplied manuscript is primarily qualitative. The text does not provide task-wide error tables or comparisons across observation patterns.
- Training chooses the winner using target-endpoint error and router confidence, whereas inference selects by router probability alone. Performance therefore depends on the router learning to reproduce assignments made with information unavailable at sampling time.
- The paper states that baseline parameter budgets are comparable and refers to appendix efficiency evidence, but the supplied text does not provide a complete hardware-normalized account of training cost, sampling latency, or memory.
- DMD spectral overlap is a useful dynamical diagnostic, but it does not by itself establish full distributional fidelity or rule out other forms of mode dropping.
- The supplied manuscript does not establish a publication year, venue, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: supplies the global velocity-regression objective and ODE sampler that PrismFlow augments.
- [[concepts/koopman-operator-learning|Koopman Operator Learning]]: motivates approximately linear latent experts with controlled spectra.
- [[concepts/sparse-mixture-of-experts|Sparse Mixture of Experts]]: provides the broader hard-routing and load-balancing perspective, although PrismFlow routes residual vector fields rather than Transformer feed-forward blocks.
- [[concepts/diffusion-models|Diffusion Models]]: the principal iterative-generation baseline family in the experiments.

## Related Papers

- [[papers/fm-ts-flow-matching-for-time-series-generation|FM-TS: Flow Matching for Time Series Generation]]: applies a single rectified-flow estimator to the same six unconditional-generation datasets and supports forecasting and imputation through masked inference.
- [[papers/flow-matching-with-gaussian-process-priors-for-probabilistic-time-series-forecasting|Flow Matching with Gaussian Process Priors for Probabilistic Time Series Forecasting]]: changes the source prior for probabilistic forecasting rather than adding routed residual dynamics.
- [[papers/diff-mn-diffusion-parameterized-moe-ncde-for-continuous-time-series-generation-with-irregular-observations|Diff-MN: Diffusion Parameterized MoE-NCDE for Continuous Time Series Generation with Irregular Observations]]: combines expert dynamics with diffusion for irregular and continuous-time generation, using soft sequence-specific mixtures rather than PrismFlow's hard residual routing.
- Kim et al. (2025), "Sequence Modeling with Spectral Mean Flows": the flow-based baseline denoted SMF in the experiments, cited as arXiv:2510.15366.
- Adrien Cortés, Rémi Rehm, and Victor Letzelter (2025), "Winner-Takes-All for Multivariate Probabilistic Time Series Forecasting": the output-diversity method contrasted with PrismFlow's estimator-level residual specialization, cited as arXiv:2506.05515.

[[index|Library home]]
