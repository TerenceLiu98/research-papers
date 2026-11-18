---
title: Kernel-Gradient Drifting Models
type: paper
authors:
  - Maria Esteban-Casadevall
  - Jorge Carrasco-Pollo
  - Max Welling
  - Jan-Willem van de Meent
  - Erik J. Bekkers
  - Floor Eijkelboom
year: null
source_job_id: 20f1ab20-dfc3-48b8-ad58-8e14874bb718
tags:
  - generative-models
  - kernel-methods
  - one-step-generation
  - manifold-learning
---

## TL;DR

Replacing kernel-weighted displacements with kernel gradients makes the drifting field a difference of smoothed scores. Under the paper's regularity and characteristic-kernel assumptions, zero population drift identifies the data distribution. Intrinsic gradients extend teacher-free one-step generation to manifolds and categorical sequences, with improvements over displacement drifting on most tested settings.

## Research Question

Can drifting retain an identifiable score-based interpretation beyond Gaussian kernels, while respecting curved supports and discrete data geometry?

## Motivation

Original [[concepts/drifting-models|Drifting Models]] combine similarity weights with Euclidean displacements. These directions coincide with kernel gradients for Gaussian kernels, up to scale, but generally differ for other kernels. This disconnect complicates both distributional guarantees and geometric extensions.

## Contributions

- A kernel-gradient field with an exact smoothed score-ratio identity.
- Population identifiability for characteristic smoothing kernels and a smoothed-law KL descent interpretation.
- Riemannian updates and a Fisher–Rao simplex construction for categorical generation.
- Controlled geometry and kernel ablations, Earth-event modeling, promoter DNA generation, and QM9 SMILES generation.

## Method

For positive normalized kernels, define smoothed densities $\hat p_k(x)=\mathbb E_p[k(x,y)]$ and $\hat q_k(x)=\mathbb E_q[k(x,y)]$. Differentiating under the integral under the stated regularity conditions gives

$$
V^\nabla_{p,q}(x)=\frac{\mathbb E_p[\nabla_x k(x,y)]}{\mathbb E_p[k(x,y)]}-\frac{\mathbb E_q[\nabla_x k(x,y)]}{\mathbb E_q[k(x,y)]}=\nabla_x\log\frac{\hat p_k(x)}{\hat q_k(x)}.
$$

A generator regresses toward stopped targets $x+\eta V^\nabla(x)$; inference uses one generator evaluation. Characteristic kernels make smoothing injective, so equality of the smoothed densities implies equality of the original laws. This is a population fixed-point result, not neural optimization convergence.

On manifolds, Riemannian gradients supply tangent vectors and the exponential map transports samples. Squared geodesic target distance equals squared tangent displacement locally within the injectivity radius. Spectral Matérn and heat kernels provide a characteristic-kernel construction when all relevant spectral coefficients are positive; finite truncations are approximations.

For categorical sequences, probabilities map to the positive spherical orthant by square roots. With the standard Fisher–Rao metric, $p\mapsto2\sqrt p$ maps to a radius-two sphere; the unit-sphere convention rescales the metric. Generation operates on a product of these spaces and discretizes by per-position argmax.

## Experiments

**Synthetic data (Table 1).** Three-seed comparisons cross displacement/gradient directions with ambient/intrinsic geometry. On spherical checkerboards, intrinsic gradient drifting reduces sliced Wasserstein-2 from $0.032\pm0.008$ to $0.011\pm0.002$ and raises tile accuracy from $0.80\pm0.04$ to $0.87\pm0.01$. Improvements are not universal: intrinsic hyperbolic swissroll SW changes from $0.042\pm0.007$ to $0.044\pm0.015$. Appendix F specifies ambient-embedding SW evaluation.

**Earth events (Table 2).** Best reported discrepancies across variants are 0.112 for Volcano, 0.037 for Earthquake, 0.029 for Fire, and 0.053 for Flood, versus Euclidean Laplace displacement values 0.146, 0.044, 0.036, and 0.064. Different variants win different datasets. Appendix F clarifies that the geodesic Gaussian statistic called MMD is not a strict MMD because positive definiteness is not guaranteed. Sinkhorn and nearest-neighbor metrics provide additional comparisons.

**Promoter DNA (Table 3).** Conditional generation produces 1,024-nucleotide sequences. Spherical gradient drifting achieves 6-mer correlation $0.84\pm0.04$ and Sei MSE $0.043\pm0.002$, versus spherical displacement's $0.78\pm0.08$ and $0.044\pm0.004$. Euclidean gradient has lower Sei MSE ($0.032\pm0.001$) but lower correlation ($0.62\pm0.01$). The strongest listed Riemannian MeanFlow correlations reach 0.96; drifting does not dominate the flow baselines.

**QM9 (Table 4).** Unconditional generation uses length-32 SMILES with a 40-token vocabulary. Spherical Laplace gradient improves validity from 22.0% to 38.9% and reported uniqueness from 40.0% to 44.1% over Euclidean Laplace drifting. PairFlow (+DCD) reports 44.3% validity and 44.1% uniqueness. Appendix F defines uniqueness among valid molecules; the baseline percentages are reproduced from the table without assuming identical denominator conventions.

## Limitations

- The KL descent argument concerns infinitesimal dynamics of smoothed laws; Appendix D explicitly restricts its proof to Euclidean additive updates. It does not prove descent for unsmoothed particles, finite neural updates, or the manifold implementation.
- Kernel choice and hyperparameters matter; the authors leave systematic stability analysis and broader kernel families for future work.
- Geodesic radial kernels need not satisfy the theoretical assumptions. Exact spectral guarantees should not automatically be transferred to truncated expansions.
- SMILES avoids graph permutation symmetry; permutation-aware graph neighborhoods remain future work. Sequence and molecule metrics do not establish biological or chemical utility.
- The supplied Markdown does not identify this manuscript's publication year, venue, DOI, or arXiv identifier; year is left null.

## Related Concepts

- [[concepts/drifting-models|Drifting Models]]: the underlying stopped-target, single-pass generator framework.
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]: the smoothed-law KL interpretation, with the scope above.
- [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]]: kernel distribution comparison and the qualification needed for the Earth metric.

## Related Papers

- [[papers/generative-modeling-via-drifting|Generative Modeling via Drifting]]: the displacement-based formulation generalized here.
- Weber (2023), “The Score-Difference Flow for Implicit Generative Modeling”: the cited score-difference and KL descent foundation.
- Davis et al. (2024), “Fisher Flow Matching for Generative Modeling over Discrete Data”: the cited simplex geometry construction.
- Cao et al. (2026), “Gradient Flow Drifting”: concurrent divergence-based analysis, distinguished by this paper's emphasis on geometry and real-data experiments.
