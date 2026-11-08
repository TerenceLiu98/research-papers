---
title: Mean Flows as Controllable Priors for Solving Inverse Problems
type: paper
authors:
  - Ahmed Abdelaal
  - Xianda Du
  - Amir-Hossein Karimi
year: null
source_job_id: 2a74ff78-4d6a-4270-a5bb-9c61a9654db7
tags:
  - flow-matching
  - inverse-problems
  - generative-models
---

## TL;DR

Pretrained MeanFlow models provide finite-interval transport for training-free image restoration. Receding-Horizon State Optimization (RHSO) repeatedly optimizes intermediate generative states through a predicted clean endpoint. Across four priors and five tasks, it leads in 35 of 60 task–metric cells (including ties) and wins 200 of 240 pairwise baseline comparisons. Separate capacity- and cost-matched sweeps favor MeanFlow at every tested stage count on all three average quality metrics.

## Research Question

How does a learned finite-interval transport map change inverse-problem control, and how much does distributing optimization along a trajectory contribute beyond deeper endpoint prediction?

## Motivation

An instantaneous [[concepts/flow-matching|Flow Matching]] velocity requires numerical integration or coarse extrapolation to predict a distant clean endpoint. [[concepts/average-velocity-fields|Average Velocity Fields]] supply that transport in one network evaluation, making repeated endpoint differentiation affordable without retraining the prior.

## Contributions

- A common finite-interval interface adapting PnP-Flow, D-Flow, MPC-RHC, and MPC-∆t to pretrained MeanFlow priors.
- RHSO, which optimizes the current generative state before executing one interval and replanning.
- A first-order analysis of intervention placement, plus experiments separating placement, prediction depth, and model capacity.

## Method

The time convention is noise at zero and data at one. MeanFlow supplies $T_\theta(x;t\to t')=x+(t'-t)u_\theta(x;t,t')$. At stage $k$, save the reached state $s$, predict its clean endpoint with $P_k$, and approximately minimize

$$
\Phi(P_k(x);y)+\frac{\mu}{2d}\|x-s\|_2^2.
$$

After $M$ fresh Adam updates, execute only the next transport interval and repeat. The anchor remains fixed during the inner optimization; optimizer momentum is reset between stages. Latent priors optimize codes and evaluate measurement fidelity after decoding. Standard flow priors can use either direct endpoint extrapolation or an integrated remaining trajectory.

For $N$ stages, MeanFlow requires $N(M+1)$ model evaluations and $NM$ backpropagations. At $N=4,M=40$, this is 164/160, versus 167/160 for the direct JiT planner and 647/640 for its integrated-suffix planner; latent decoder costs are additional.

The first-order endpoint correction is a sum of transported state corrections. Its least-displacement geometry is governed by $W=\sum_k J_{t_k}J_{t_k}^{\top}$, where $J_t$ is the remaining transport Jacobian. Adding a positive-definite contribution with lower condition number reduces the Gramian's condition number. Late-stage isotropy requires bounded smoothed log-density curvature near the endpoint. Monotonic improvement with every later stage is not general; the Gaussian case admits an exact characterization (Section 3.3 and Appendix B).

## Experiments

The evaluation uses 100 ImageNet validation images from distinct classes at 256 × 256, with known source-class conditioning and pure-noise initialization. Five tasks are Gaussian denoising, Gaussian deblurring, 2× super-resolution, 70%-missing random inpainting, and box inpainting. Configurations are selected on eight separate tuning images and frozen. Metrics are PSNR, SSIM, LPIPS, and measurement RMSE.

**Solver benchmark (Tables 1–2).** On pMF-L/16, RHSO's five-task means are 28.89 dB PSNR, .856 SSIM, and .083 LPIPS, versus 28.45/.819/.109 for MPC-∆t. RHSO has the best mean of every metric on each prior except iMF-B/2, where MPC-∆t slightly leads PSNR and SSIM. Denoising is a consistent exception: another solver has better LPIPS on every prior. Benchmark configurations are separately tuned and have unequal computational costs.

**Matched interface comparison (Section 4.3).** pMF-L/16 (411M parameters) is paired with JiT-L/16 (459M); iMF-XL/2 (610M) with SiT-XL/2 (675M). Both use direct-terminal RHSO under fixed total updates or fixed updates per stage. MeanFlow leads in 153/165 pixel and 165/165 latent task–metric cells. At fixed 160 updates and four stages, Table 12 reports gains of .44 dB in pixel space and 4.12 dB in latent space. Latent gains concern optimization efficiency at tested budgets, not an established asymptotic quality advantage.

**Placement versus depth (Table 3).** With 160 total optimizer updates on JiT-B/16:

| Controller | Mean PSNR | Mean LPIPS | Evaluations/backpropagations |
| --- | --- | --- | --- |
| Source-only, direct endpoint | 18.18 | .713 | 161/160 |
| Source-only, four-step suffix | 20.84 | .551 | 1127/1120 |
| RHSO, direct endpoint | 28.47 | .122 | 167/160 |
| RHSO, integrated suffix | 28.79 | .121 | 647/640 |

The large improvement from repeated intermediate-state optimization exceeds the gain from deepening source-only prediction. Pixel-space noise sweeps also show that more stages can improve measurement fit while worsening reconstruction; strong anchoring can reverse some degradation. Latent results are consistent with decoder regularization, without establishing that mechanism independently.

## Limitations

Evidence covers one dataset and resolution, oracle class labels, linear operators, and Gaussian noise. Capacity matching does not match architecture, training recipe, or guidance. The one-step D-Flow adaptation is not a reproduction of the original multistep solver. RHSO remains expensive relative to methods without prior backpropagation; evaluation/backpropagation counts exclude latent decoder work. The local theory is not a global reconstruction guarantee. No publication year or stable paper identifier is stated in the supplied Markdown, so year remains null.

## Related Concepts

- [[concepts/average-velocity-fields|Average Velocity Fields]]: learned finite-interval transport.
- [[concepts/flow-matching|Flow Matching]]: instantaneous dynamics and numerical endpoint prediction.

## Related Papers

- [[papers/mean-flows-for-one-step-generative-modeling|Mean Flows for One-step Generative Modeling]]: foundational finite-interval prior, cited as reference 21.
- Ben-Hamu et al. (2024), “D-Flow: Differentiating through Flows for Controlled Generation”: source-state optimization comparator (reference 17).
- Webber et al. (2026), “Solving Inverse Problems with Flow-Based Models via Model Predictive Control”: explicit-control comparators (reference 20).

Code reported by the paper: [meanflow-rhso](https://github.com/Abdelaal495/meanflow-rhso).

[[index|Library home]]
