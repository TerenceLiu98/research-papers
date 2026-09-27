---
title: "When Does LeJEPA Learn a World Model?"
type: paper
authors:
  - David Klindt
  - Yann LeCun
  - Randall Balestriero
year: null
source_job_id: "b3e3fd66-11d3-4934-be4e-1fc0064ff9e2"
tags:
  - self-supervised-learning
  - representation-learning
  - identifiability
  - world-models
---

## TL;DR

For standard Gaussian latents with isotropic Ornstein-Uhlenbeck (OU) positive-pair transitions, the population alignment objective with Gaussian output regularization recovers the true latents up to rotation or reflection. A Hermite expansion shows why nonlinear features lose temporal correlation; centering and whitening already suffice for this forward result. The paper also gives an approximate recovery bound, argues for Gaussian uniqueness through a constant-diffusion spectral analysis, and establishes planning equivalence under correct transformed dynamics and orthogonally invariant costs. Synthetic and rendered Reacher experiments support parts of this account, but do not establish identifiability for arbitrary real-world dynamics or end-to-end action-conditioned control.

## Research Question

When does the alignment-plus-Gaussian-regularization objective of LeJEPA recover the latent variables generating nonlinear observations, and what does that recovery imply for planning?

## Motivation

Useful predictions or strong probe scores need not imply that an encoder preserves the world's latent geometry. Nonlinear distortions can retain information while making linear readouts and straight-line latent plans unreliable. LeJEPA makes the output distribution explicit through Sketched Isotropic Gaussian Regularization (SIGReg), creating a tractable setting for studying [[concepts/structural-identifiability|Structural Identifiability]].

## Contributions

- Characterizes all population optima as orthogonal maps of the true latents under the specified Gaussian OU world and matched latent/output dimension, allowing measurable encoders rather than requiring smooth invertible encoders.
- Presents a Gaussian-uniqueness converse using the affine-eigenfunction condition of a constant-diffusion Sturm-Liouville operator (Theorem 2; Appendix B).
- Bounds distance to an orthogonal representation using alignment excess and covariance error while retaining the Gaussian OU world (Theorem 3).
- Shows that orthogonal recovery preserves optimal values and sets of optimal action sequences when costs are invariant and dynamics are correctly pushed forward (Theorem 4).
- Tests nonlinear mixings, dimensions through 1,024, non-Gaussian latent distributions, and pixel-based Reacher representations; reports Lean verification conditional on explicitly axiomatized mathematical premises.

## Method

### World and Objective

Observations are $x=g(z)$, with encoder $f$ and composed representation $h=f\circ g$. The forward result assumes $z\sim\mathcal N(0,I_n)$, output dimension $n$, and

$$
z'=\rho z+\sqrt{1-\rho^2}\eta,
\qquad \eta\sim\mathcal N(0,I_n),\quad \eta\perp z,\quad 0<\rho<1.
$$

The same correlation $\rho$ applies to all coordinates. The idealized objective is

$$
\min_h\ \mathcal L(h)=\mathbb E\|h(z')-h(z)\|^2
\quad\text{subject to}\quad h(z)\sim\mathcal N(0,I_n).
$$

The optimization over $h$ presumes that the observations and encoder capacity permit the desired recovery. Practical training uses a weighted sum of alignment and SIGReg, which compares empirical sliced characteristic functions with a Gaussian target.

### Spectral Identifiability

For the OU transition, a degree-$d$ Hermite component has eigenvalue $\rho^d$. If a centered, unit-variance output coordinate assigns variance fraction $w_d$ to degree $d$, then

$$
\mathbb E[h_i(z')h_i(z)]=\sum_{d\geq1}w_d\rho^d\leq\rho.
$$

Equality requires all variance to be linear. Across $n$ centered, whitened outputs this gives $\mathcal L(h)\geq2(1-\rho)n$, with equality exactly when $h(z)=Qz$ almost surely for an orthogonal $Q$. Full output Gaussianity is sufficient but stronger than needed for this argument. The connection to [[concepts/slow-feature-analysis|Slow Feature Analysis]] is that alignment selects maximally correlated features under whitening constraints.

The converse uses the one-dimensional generator $\mathcal D\varphi=p^{-1}(Kp\varphi')'$ for constant diffusion $K>0$ and a positive stationary density on the real line. An affine nonconstant eigenfunction forces $(\log p)'$ to be affine, hence $p$ to be Gaussian. This is the proof setting underlying the paper's broader uniqueness statement.

### Approximate Recovery and Planning

For centered $h$, assume

$$
\mathcal L(h)\leq2(1-\rho)\operatorname{tr}(\operatorname{Cov}(h(z)))+\delta,
\qquad \|\operatorname{Cov}(h(z))-I_n\|_F\leq\varepsilon.
$$

Writing $D=\delta/[2\rho(1-\rho)]$, Theorem 3 gives

$$
\min_{Q\in O(n)}\mathbb E\|h(z)-Qz\|^2\leq D+(\varepsilon+D)^2.
$$

Alignment excess controls nonlinear energy; covariance error controls distortion of the linear part. This relaxes objective satisfaction, not the assumed latent distribution or transition. For fixed $\delta$, the bound becomes less informative as $\rho$ approaches either endpoint.

If $h(z)=Qz$, planning with the exact pushforward transition and orthogonally invariant stage/terminal costs preserves expected costs and optimal actions. Goal-distance costs require rotating the goal together with the state. General quadratic costs require transforming their weight matrices consistently; arbitrary fixed quadratic costs are not rotation invariant. Learning the action-conditioned transition remains a separate problem (Appendix D).

## Experiments

**Synthetic recovery.** Four 2D mixings include a Gaussian-measure-preserving spiral, sinusoidal and parabolic shears, and RealNVP coupling. The spiral demonstrates why Gaussian output statistics alone cannot certify latent recovery. Synthetic runs use online samples, 20,000 training steps, batch size 256, and 10,000 fixed evaluation points. Scaling uses a matched inverse-RealNVP encoder, five seeds, and lowest-loss selection among three restarts for dimensions at most 32.

Table 1 reports mean linear recovery $R^2(h\to z)$:

| Latent dimension | SIGReg | VICReg | InfoNCE |
| --- | --- | --- | --- |
| 2 | 0.999998 | 0.999996 | 0.950961 |
| 16 | 0.999988 | 0.999987 | 0.999880 |
| 128 | 0.999938 | 0.999942 | 0.566955 |
| 1,024 | 0.999561 | 0.999582 | 0.720241 |

SIGReg and VICReg retain high recovery throughout. The authors attribute InfoNCE's nonmonotonic degradation to numerical underflow with fixed Gaussian kernel width $\sigma=1$, not an inherent failure of contrastive learning (Appendix H.10). The generalized-normal sweep peaks at Gaussian shape $\alpha=2$; SIGReg and InfoNCE retain a wider heavy-tail recovery plateau than VICReg. Regularizer-weight sweeps also reveal poor recovery when Gaussianization overwhelms alignment.

**Rendered Reacher.** A roughly 1.1M-parameter CNN maps $64\times64$ images to two joint-angle coordinates. Conditions use 100,000 training pairs, three seeds, and best regularizer weight per condition. At OU correlation $\rho=0.99$, Table 2 reports $R^2(h\to z)=0.95\pm0.0004$. Policy-trajectory training instead uses pairs from 10,000 SAC episodes and a shared Gaussian evaluation distribution. At stride 8, Table 2 reports $R^2(z\to h)=0.50\pm0.02$ and per-joint reverse-direction scores $R^2(h\to z_0)=0.80\pm0.002$ and $R^2(h\to z_1)=0.78\pm0.006$. These are distinct metrics: the prose's claim that total recovery never exceeds 0.5 should not be read as a ceiling on every reverse-direction score. Policy data jointly change marginal distributions, correlation rates, and wrapping frequency, so this comparison does not isolate Gaussianity.

**Approximation and planning diagnostics.** The authors report broad agreement with the recovery bound on Gaussian-world runs, with a few near-zero violations attributed to finite-sample estimation. Planning evaluation interpolates between start/goal embeddings in 15 intervals, decodes by nearest-neighbor retrieval from 10,000 labeled frames, and measures joint-space path length relative to the straight chord over 30 start-goal pairs. The Gaussian encoder is reported to approach the oracle geometry, while the trajectory encoder produces longer paths. This is a representation-geometry diagnostic rather than executed closed-loop control with learned action dynamics (Appendix H.12).

## Limitations

- The forward guarantee is for a population global optimum with Gaussian latents, the specified isotropic OU transition, sufficient encoder expressivity, and matched output dimension. Finite-sample rates, optimization guarantees, and dimension mismatch remain unresolved.
- Gaussian marginals and stationary additive noise alone should not be substituted for the explicit OU transition. Likewise, the converse proof uses a continuous-time constant-diffusion generator and density assumptions beyond the terse general-world statement; its derivation does not itself establish the claim for every discrete additive-noise process.
- Temporal rate differences can let nonlinear harmonics of slow coordinates outrank linear features of faster coordinates under whitening. Appendix F discusses this spectral ordering; isotropy is a sufficient way to avoid that competition, rather than evidence that every amount of anisotropy causes failure.
- The approximate bound does not quantify robustness to non-Gaussian latents or misspecified dynamics. Empirical robustness outside the Gaussian world is separate evidence.
- Reacher images encode arm configuration, and angle wrapping limits global injectivity. Policy-versus-OU comparisons combine several assumption violations and a difference between policy training and Gaussian evaluation distributions.
- Lean verification is reported with zero `sorry` obligations but axiomatizes substantial Hermite, spectral, matrix, and pushforward facts (Appendix G; Table 4). It is conditional verification of the resulting proof chains, not an independent verification of all analytical premises.
- The supplied Markdown omits this paper's publication year, venue, and stable paper identifier. These are left unasserted; identifiers in its bibliography refer to other works.

## Related Concepts

- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]
- [[concepts/structural-identifiability|Structural Identifiability]]
- [[concepts/slow-feature-analysis|Slow Feature Analysis]]
- [[concepts/world-models|World Models]]
- [[concepts/linear-probing|Linear Probing]]
- [[concepts/independent-component-analysis|Independent Component Analysis]]

## Related Papers

- Balestriero and LeCun (2025), "LeJEPA: Provable and Scalable Self-Supervised Learning Without the Heuristics," arXiv:2511.08544: the alignment/SIGReg method analyzed here (reference [2]).
- Maes et al. (2026), "LeWorldModel: Stable End-to-End Joint-Embedding Predictive Architecture from Pixels," arXiv:2603.19312: action-conditioned JEPA work and the source of Reacher policy trajectories (reference [9]).
- Sprekeler, Zito, and Wiskott (2014), "An Extension of Slow Feature Analysis for Nonlinear Blind Source Separation": the spectral predecessor discussed in Appendix F (reference [72]).
- [[papers/toward-causal-representation-learning|Toward Causal Representation Learning]] motivates recovering latent structure for interventions and generalization (reference [10]); the present encoder result does not recover a causal graph.
- [[papers/statistical-and-structural-identifiability-in-representation-learning|Statistical and Structural Identifiability in Representation Learning]] offers a library comparison between consistency across learned models and recovery of true factors; it is not cited in this paper's bibliography.

[[index|Library home]]
