---
title: Information Geometry of Message Passing
type: paper
authors:
  - Mykola Lukashchuk
  - Kyrylo Yemets
  - Alex Ledbetter
  - İsmail Şenöz
year: null
source_job_id: "b040b425-8989-4509-ad5c-3e92266a0a5e"
tags:
  - variational-inference
  - message-passing
  - information-geometry
  - uncertainty-calibration
---

## TL;DR

The paper derives [[concepts/natural-gradient-message-passing|Natural-Gradient Message Passing]] (NGMP), an edge-local stationary condition for exponential-family approximations on Forney-style factor graphs. Each factor sends the Fisher-metric projection of its exact belief-propagation log-message into the tangent space of the receiving marginal. Compared with variational message passing (VMP), this preserves the component of cavity uncertainty that the chosen family can represent. Controlled experiments show little difference when neighboring beliefs concentrate, but materially better uncertainty calibration when approximate updates are repeatedly composed through missing-state chains or sequential batches.

## Research Question

Can the global natural-gradient stationary condition for fixed-form variational inference be localized into finite factor-to-edge messages while preserving the modular structure of a factor graph?

## Motivation

Exact belief propagation is local but may produce messages outside any tractable finite family at non-conjugate factors. VMP restores closure by averaging a factor over neighboring beliefs, which can discard uncertainty that matters to an outgoing message. A useful alternative should retain edge-local computation, allow different exponential families on different edges, and preserve as much of the exact message as the receiving family can express.

## Contributions

- Derives an edge-constrained Bethe stationary condition in which an edge's natural parameter equals the sum of projected messages from its two incident factors.
- Defines each finite message as the natural-gradient projection of the exact BP log-message at the current receiving marginal, rather than as an expected-log-factor update.
- Gives a per-interface surrogate interpretation: a non-representable factor contribution becomes a conjugate leaf whose natural parameters equal the projected message.
- Relates NGMP to BP, structured VMP, non-conjugate VMP (NCVMP), projective VMP (PVMP), conjugate-computation variational inference, and expectation propagation while distinguishing their information flows.
- Identifies persistent edge uncertainty and repeated composition of approximate updates as the regimes in which NGMP most improves calibration.

## Method

For an edge marginal in a regular minimal exponential family,

$$
q_{\lambda_i}(z_i)=\exp\{\lambda_i^\top T_i(z_i)-A_i(\lambda_i)\},
$$

the paper defines the tangent projection of a function $r$ at the receiving marginal as

$$
\mathsf T_i^{\lambda_i}[r]
=G_i(\lambda_i)^{-1}\operatorname{Cov}_{q_{\lambda_i}}[T_i,r]
=\nabla_{\mu_i}\mathbb E_{q_{\lambda_i}}[r].
$$

If $\ell_{a\to i}$ is the exact BP log-message from factor $a$ to edge $i$, its projected natural parameter is

$$
\eta_{a\to i}=\mathsf T_i^{\lambda_i}[\ell_{a\to i}].
$$

For a degree-two edge incident to factors $b$ and $c$, constrained-Bethe stationarity gives

$$
\lambda_i=\eta_{b\to i}+\eta_{c\to i}.
$$

The transmitted finite message is therefore $\widehat\mu_{a\to i}(z_i)\propto\exp\{\eta_{a\to i}^\top T_i(z_i)\}$. The projection depends on the receiving marginal, so NGMP repeatedly rebuilds local conjugate surrogates and runs ordinary BP on the frozen surrogate graph. Its outer iteration is the fixed-point map $\lambda^{(t+1)}=\Phi(\lambda^{(t)})$, optionally damped in natural coordinates.

For a Poisson observation attached to a Gaussian latent state, the projection is analytic and yields a Gaussian pseudo-observation. Multi-interface factors instead produce one projected surrogate leaf per constrained interface. When a mean-field constraint is also imposed, the exact cavity log-message is replaced by the VMP tilted log-message; one projection step then recovers NCVMP, while iterating the edge projection recovers PVMP.

## Experiments

### Controlled comparisons

- **Normal mean-precision model:** Both methods become accurate as the shared mean and precision concentrate. For the precision marginal, reported inclusive KL divergence decays approximately as $N^{-2}$ for VMP and $N^{-3}$ for NGMP. At $N=512$, NGMP is about 700 times closer by this metric, but the remaining VMP error is only a 0.2% posterior-variance deficit, so the practical effect is negligible in this isolated setting.
- **Poisson smoothing:** On monthly sunspots, PVMP and NGMP are statistically similar at 5-20% holdout. At 50% holdout, NGMP improves held-out NLL from $5.411\pm0.162$ to $4.930\pm0.035$ and RMSE from $16.839\pm0.471$ to $15.789\pm0.162$. PVMP keeps latent variance nearly fixed through long missing stretches; NGMP propagates cavity uncertainty and widens toward gap centers.
- **Sequential heteroscedastic regression:** Fitting 400 observations in ten batches raises PVMP NLL by $0.235\pm0.030$ nats relative to a full-batch fit, versus $0.009\pm0.010$ for NGMP. Sequential PVMP also produces a much more concentrated noise-weight posterior (reported $\log\det\Sigma_w=-72.34$ versus $-8.01$), while point-error differences remain modest.
- **Budget-matched NCVMP:** Restricting PVMP to one inner natural-gradient step does not close the gap. It substantially worsens likelihood and RMSE on the sunspot task and underfits the heteroscedastic model while following the same concentration path.

### Larger models

On six UCI regression datasets, the depth-three NGMP heteroscedastic hierarchy has the lowest mean NLL on Concrete, Energy, Power, and Yacht; DVI variants are stronger on Boston, and Wine intervals overlap the best result. RMSE is more mixed, consistent with the paper's emphasis on predictive uncertainty rather than only the mean.

For ETTh1/ETTh2 forecasting, NGMP replaces PVMP inside the same precision-gated ensemble of seven frozen experts. It has lower NLL than PVMP at all four ETTh1 horizons and at ETTh2 horizons 192 and 336, but is worse at ETTh2 horizons 96 and 720. Neural gates can achieve competitive RMSE while producing extremely poor likelihoods, supporting the paper's claim that point error can conceal predictive-scale collapse.

## Limitations

- The theorem characterizes stationary points, not global minima. The reduced objective may be non-convex, and an intermediate surrogate marginal is not claimed to equal the original constrained optimum.
- Undamped fixed-point iteration can oscillate or diverge on difficult Poisson chains. Damping improves robustness; momentum can accelerate deeper models but may leave the valid natural-parameter domain.
- Tangent projections are analytic only for some factor-family pairs. The experiments also use unscented approximations and one-dimensional quadrature, whose accuracy depends on those numerical rules.
- NGMP and PVMP traces score different approximate Bethe functionals, so their absolute free-energy levels are not directly comparable; the traces establish convergence rather than objective superiority.
- The larger UCI comparison is framework-level rather than a controlled NGMP-PVMP ablation. NGMP uses full-covariance layer beliefs and substantially more uncertainty parameters than several baselines.
- The strongest empirical gains concern calibration under persistent uncertainty and repeated composition. They do not imply that NGMP always improves point prediction, and the batching result is model-specific.
- The supplied Markdown does not state a publication year, venue, or stable identifier. Those fields are therefore left unset rather than inferred.

## Related Concepts

- [[concepts/natural-gradient-message-passing|Natural-Gradient Message Passing]]
- [[concepts/forecast-combination|Forecast Combination]]: the ETTh application uses projected precision messages to combine frozen forecasters with probabilistic scale semantics.
- [[concepts/amortized-variational-inference|Amortized Variational Inference]]: a contrasting way to share approximate-inference computation through a learned encoder rather than local fixed-point messages.

## Related Papers

- Winn and Bishop (2005), "Variational Message Passing": establishes expected-log-factor message updates for conjugate-exponential models.
- Knowles and Minka (2011), "Non-conjugate Variational Message Passing for Multinomial and Binary Regression": introduces receiving-marginal Fisher geometry into non-conjugate VMP.
- Khan and Lin (2017), "Conjugate-Computation Variational Inference": turns natural-gradient contributions of non-conjugate terms into conjugate surrogate parameters.
- Şenöz et al. (2021), "Variational Message Passing and Local Constraint Manipulation in Factor Graphs": supplies the constrained-Bethe framework on which the edge-local derivation builds.
- Minka (2001), "Expectation Propagation for Approximate Bayesian Inference": provides the cavity, tilted-distribution, and moment-projection comparison.

[[index|Library home]]
