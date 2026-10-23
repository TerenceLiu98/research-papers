---
title: "Local Convergence of Mean-Field Langevin Dynamics: From Gradient Flows to Linearly Monotone Games"
type: paper
authors:
  - Guillaume Wang
  - Lénaïc Chizat
year: 2026
source_job_id: 31d263eb-d6a4-47b7-9035-53ba6f09dff2
tags:
  - mean-field-langevin-dynamics
  - wasserstein-gradient-flows
  - local-convergence
  - continuous-games
  - poincare-inequality
---

## TL;DR

Wang and Chizat prove local exponential convergence in $\chi^2$ divergence for diffusion-driven mean-field systems whose equilibria satisfy Poincare inequalities and whose interactions obey a linear convexity or monotonicity condition. The proof tracks a Lyapunov functional mixing $\chi^2$ with a weighted negative Sobolev norm. It yields the sharp lower rate $2\tau c_{\mathrm{PI}}$ for linearly convex mean-field Langevin dynamics and extends to non-gradient descent-ascent and multi-species games, but does not resolve their global convergence.

## Research Question

What determines the exact final-phase convergence rate of [[concepts/mean-field-langevin-dynamics|Mean-Field Langevin Dynamics]], and can the same analysis establish local convergence for linearly monotone systems that lack a gradient-flow structure?

## Motivation

Known global guarantees for linearly convex MFLD use uniform log-Sobolev inequalities and need not identify the sharp behavior near equilibrium. For mean-field Langevin descent-ascent in continuous zero-sum games, convergence at ordinary temperatures remains open. The paper therefore isolates assumptions that control local stability and rates without displacement convexity, displacement monotonicity, or a high-temperature condition.

## Contributions

- Proves local $\chi^2(\cdot\|\nu)$ convergence for MFLD at any rate arbitrarily close to $2(\tau-\tau_0)c_{\mathrm{PI}}$, where $\tau_0<\tau$ measures local weak linear convexity at equilibrium.
- Shows that the rate becomes $2\tau c_{\mathrm{PI}}$ for linearly convex objectives and is sharp for linear objectives, which reduce to overdamped Langevin dynamics.
- Gives explicit initialization radii and prefactors for quadratic functionals with bounded mixed derivatives of the interaction kernel.
- Extends the Lyapunov argument to mean-field Langevin descent-ascent, obtaining a rate arbitrarily close to $2\tau\min(c_{\mathrm{PI}}^x,c_{\mathrm{PI}}^y)$.
- Generalizes the result to $N$-species diffusive flows under local weak linear monotonicity, including pairwise zero-sum polymatrix continuous games.
- Connects the rate to the Wasserstein Hessian at equilibrium and conjectures a sharper spectral characterization.

## Method

Let $f_t=d\mu_t/d\nu-1$, so $\chi^2(\mu_t\|\nu)=\|f_t\|_{L^2_\nu}^2$. A direct derivative of this quantity contains an interaction term whose sign is not controlled by linear convexity. The authors instead introduce the weighted negative Sobolev norm

$$
\|f\|_{H^{-1}_\nu}^2=\langle f,L^{-1}f\rangle_\nu,
\qquad
L=-\nu^{-1}\nabla\cdot(\nu\nabla\cdot).
$$

Applying $L^{-1}$ cancels the elliptic prefactor in the linearized interaction. Local weak convexity bounds the remaining quadratic form below by $-\tau_0\|f\|_{L^2_\nu}^2$, while the Poincare inequality relates $H^{-1}_\nu$ and $L^2_\nu$. Higher-order terms are controlled inside a small neighborhood. A mixed Lyapunov functional

$$
W_t=\|f_t\|_{H^{-1}_\nu}^2+\gamma\|f_t\|_{L^2_\nu}^2
$$

then contracts exponentially and transfers the rate to $\chi^2$. In descent-ascent systems, the bilinear cross terms cancel between players; in the multi-species setting, linear monotonicity supplies the corresponding nonnegative quadratic form.

## Experiments

The paper is theoretical and reports no numerical experiments. Its quantitative evidence consists of theorem-level rate and neighborhood bounds, a tightness result for overdamped Langevin dynamics, and reductions covering quadratic MFLD, two-player descent-ascent, two-timescale dynamics, and multi-species flows.

## Limitations

- The principal guarantees are local: they require initialization in a sufficiently small $\chi^2$ sublevel set and do not show that arbitrary trajectories enter it.
- Global convergence of single-timescale mean-field Langevin descent-ascent remains open; the result only characterizes the rate conditional on reaching the local basin.
- The general MFLD and multi-species theorems require bounded mixed spatial derivatives of second and third variations. Explicit radii are available only in more structured linear or quadratic cases.
- The lower rate may not be the exact rate for nonlinear interactions. A proposed characterization through the spectral abscissa of an unbounded linearized operator is left unproved.
- The critical case $\tau_0=\tau$ is not covered.
- The supplied manuscript is dated February 13, 2026 but gives no DOI, arXiv identifier, or venue, so none is inferred.

## Related Concepts

- [[concepts/mean-field-langevin-dynamics|Mean-Field Langevin Dynamics]]
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]
- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/approximate-nash-equilibrium|Approximate Nash Equilibrium]]

## Related Papers

- Chizat (2022), "Mean-Field Langevin Dynamics: Exponential Convergence and Annealing": global convergence under linear convexity and uniform log-Sobolev control.
- Nitanda, Wu, and Suzuki (2022), "Convex Analysis of the Mean Field Langevin Dynamics": independent global analysis of linearly convex MFLD.
- Tamura (1984), "On Asymptotic Behaviors of the Solution of a Nonlinear Diffusion Equation": closely related local analysis for quadratic functionals.
- Wang and Chizat (2024), "Open Problem: Convergence of Single-Timescale Mean-Field Langevin Descent-Ascent for Two-Player Zero-Sum Games": states the global question that the local result partially addresses.
- [[papers/an-exponentially-converging-particle-method-for-the-mixed-nash-equilibrium-of-continuous-games|An Exponentially Converging Particle Method for the Mixed Nash Equilibrium of Continuous Games]]: a complementary local-convergence approach for discrete particle algorithms in continuous games.

Source: supplied parsed Markdown for Cognitio job `31d263eb-d6a4-47b7-9035-53ba6f09dff2`.

[[index|Library home]]

