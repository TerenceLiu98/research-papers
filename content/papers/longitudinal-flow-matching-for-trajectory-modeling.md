---
title: "Longitudinal Flow Matching for Trajectory Modeling"
type: paper
authors:
  - Mohammad Mohaiminul Islam
  - Thijs P. Kuipers
  - Afsana Khan
  - Sharvaree Vadgama
  - Clara I. Sanchez
  - Coen de Vente
  - Erik J. Bekkers
year: null
source_job_id: 19e4e302-26d0-46d0-9d24-a7f56a67ac48
tags:
  - flow-matching
  - longitudinal-imaging
  - trajectory-forecasting
  - stochastic-differential-equations
  - multi-marginal-optimal-transport
---

## TL;DR

Interpolative Multi-Marginal Flow Matching (IMMFM) learns subject-specific continuous trajectories from sparse, irregular observations by replacing independently chained linear bridges with a piecewise-quadratic Gaussian path across multiple time points. It jointly estimates a probability-flow velocity, score, and error-driven diffusion coefficient, and reports stronger forecasting and downstream segmentation results than the tested neural ODE, diffusion, and flow-matching baselines. The evidence is strongest for aligned longitudinal images; the learned uncertainty is tied to predictive residuals rather than independently calibrated, and performance depends on input quality and the coverage of training trajectories.

## Research Question

How can a continuous generative model learn smooth, stochastic, subject-specific dynamics from sparse and irregular high-dimensional longitudinal observations without reducing the problem to independent pairwise transitions?

## Motivation

Pairwise transport models can match consecutive time marginals while missing dependencies across a complete trajectory, and chaining linear conditional paths creates velocity discontinuities at observation times. Spline-based multi-marginal alternatives can be costly or unreliable in image-scale spaces. Longitudinal medical imaging makes these problems concrete: visits are sparse and irregular, images are high-dimensional, and prognosis requires individual trajectories rather than population-level synthesis.

## Contributions

- A piecewise-quadratic conditional Gaussian path whose mean blends consecutive segment velocities, giving analytically tractable velocity and score targets while coupling each segment to the next.
- A stochastic formulation that learns the probability-flow velocity and score through simulation-free conditional regression and fits a state-dependent diffusion coefficient to squared next-state prediction error.
- A pairwise-additive multi-marginal [[concepts/optimal-transport|Optimal Transport]] construction that combines consecutive augmented transport plans into a joint trajectory coupling.
- Experiments spanning synthetic curves, controlled image motion, and longitudinal MRI for Alzheimer's disease, multiple sclerosis, and glioblastoma, including 2D and 3D forecasts and a downstream Alzheimer classification analysis.

## Method

IMMFM extends [[concepts/trajectory-flow-matching|Trajectory Flow Matching]] from adjacent linear bridges to a multi-observation conditional path. Within an interval $[t_i,t_{i+1}]$, its Gaussian mean adds a quadratic correction based on the difference between the current and subsequent segment velocities. The variance follows a bridge-like schedule that is zero at observed endpoints and largest inside the interval. Both the conditional probability-flow velocity and Gaussian score are available in closed form, enabling the model to train without simulating full SDE trajectories.

The model separately predicts velocity $v_\theta$, score $s_\theta$, and diffusion $g_\theta$. At inference, these components are assembled into an SDE drift using the probability-flow identity and integrated autoregressively. The diffusion target is the squared error of a one-step reconstruction, so stochasticity reflects model prediction error. The paper states a stationary-point gradient-equivalence result for adding this uncertainty loss under regularity, correct-model, and conditional residual assumptions.

For unpaired sparse marginals, the paper assumes an additive cost over consecutive states. It solves pairwise transport problems between spatially augmented empirical distributions and combines the resulting plans into a Markov-style joint coupling. For image experiments, a pretrained U-Net-style autoencoder supplies latent states and a U-ViT regressor learns the dynamics. The evaluated variants are deterministic O-IMMFM, fixed-diffusion S-IMMFM, and learned-diffusion SU-IMMFM; the preceding image latent conditions each interval to retain subject-specific context.

## Experiments

The evaluation uses S-shaped and sigma-shaped Gaussian trajectories, the three-class Starmen motion dataset, and structural MRI cohorts: ADNI1 (317 participants, 4-6 visits), Brain MS (19 patients, 4-6 visits), and Brain GBM (91 patients, 2-18 visits). Comparators include ImageFlowNet, I2SB, TFM, and linear and spline-based multi-marginal flow-matching variants. Metrics cover MSE, PSNR, SSIM, Dice overlap, and Hausdorff distance.

Across the clinical 2D experiments, the authors summarize gains over baselines of 1-4.4 percentage points in Dice, 1.5-2.2 dB in PSNR, and 1.2-4.5 percentage points in SSIM. Results vary by metric: for example, ImageFlowNet has higher PSNR than IMMFM on Brain GBM, while SU-IMMFM has the best reported Dice and Hausdorff distance there. On ADNI, SU-IMMFM reports PSNR 37.52, Dice 0.92, and Hausdorff distance 6.50; on Brain MS it reports PSNR 36.67 and Dice 0.73.

Ablations attribute the largest gains to the quadratic path, with Dice improvements up to 3.7 percentage points and PSNR improvements above 2 dB. Learned diffusion has its clearest effect on Brain GBM, improving Dice by 1.5 percentage points and Hausdorff distance by 6.29 pixels. Forecast accuracy degrades with horizon, especially on GBM, where Dice falls by about 13%. Three-dimensional models improve ADNI Dice from 0.920 to 0.947 and GBM Dice from 0.460 to 0.489 relative to the reported 2D SU-IMMFM results, but Brain MS is excluded because its sample is too small for the higher-capacity model.

For a downstream ADNI analysis, ventricular area forecast to roughly 36 months raises AD-versus-cognitively-normal classification accuracy from 71.7% at the second observed visit to 80.8% under one reported 75/25 threshold-training/evaluation split. This is a secondary analysis on partitions of the main test set, not an external clinical validation.

## Limitations

- The learned diffusion coefficient is supervised by squared prediction residuals; the experiments do not establish probabilistic calibration or disentangle intrinsic stochasticity from model error.
- The theoretical stationary-point argument assumes correct recovery of drift, score, and diffusion and a zero-mean conditional residual. These conditions are stronger than the empirical evidence verifies.
- Pairwise-additive transport and spatial registration impose a particular Markov and alignment structure on the reconstructed multi-marginal coupling.
- Clinical cohorts are limited to aligned neuroimaging data, with only 19 Brain MS patients and no 3D MS experiment. Generalization beyond these cohorts and modalities is not shown.
- Performance degrades at longer horizons, sharply for glioblastoma, and the method remains sensitive to systematic imaging artifacts and to trajectory diversity in the training set.
- The autoencoder processes snapshots independently, so temporal coherence is imposed by the dynamics model rather than learned directly in the representation.
- The paper reports about 3,000 GPU hours for development and experiments; its primary models require roughly 12-18 hours on an A100, in addition to autoencoder training.
- The supplied manuscript does not establish a publication year, venue, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/trajectory-flow-matching|Trajectory Flow Matching]]: the closest framework; IMMFM adds a quadratic multi-segment path and multi-marginal coupling.
- [[concepts/flow-matching|Flow Matching]]: supplies the conditional velocity-regression objective and probability-flow formulation.
- [[concepts/optimal-transport|Optimal Transport]]: constructs couplings between sparse time marginals after spatial augmentation.
- [[concepts/neural-controlled-differential-equations|Neural Controlled Differential Equations]]: another continuous-time approach to irregular observations, used here as background rather than an experimental comparator.
- [[concepts/probabilistic-time-series-forecasting|Probabilistic Time Series Forecasting]]: the broader problem of predicting future distributions and assessing uncertainty.

## Related Papers

- [[papers/trajectory-flow-matching-with-applications-to-clinical-time-series-modeling|Trajectory Flow Matching with Applications to Clinical Time Series Modeling]]: a rolling-window, history-conditioned flow-matching baseline with learned observation timing and uncertainty.
- Rohbeck et al. (2025), "Modeling Complex System Dynamics with Flow Matching Across Time and Conditions": the spline-based multi-marginal comparator used for L-MMFM and M-MMFM.
- Lee, Moradijamei, and Shakeri (2025), "Multi-Marginal Stochastic Flow Matching for High-Dimensional Snapshot Data at Irregular Time Points": concurrent spline-based SDE work that appeared too late for the reported comparison.
- Liu et al. (2025), "ImageFlowNet: Forecasting Multiscale Image-Level Trajectories of Disease Progression with Irregularly-Sampled Longitudinal Medical Images": a neural ODE image-forecasting baseline.
- Tong et al. (2024), "Simulation-Free Schrodinger Bridges via Score and Flow Matching": supplies the simulation-free score-and-flow training decomposition.

Code supplied by the paper: [github.com/niazoys/longitudinal-flow-matching](https://github.com/niazoys/longitudinal-flow-matching).

[[index|Library home]]
