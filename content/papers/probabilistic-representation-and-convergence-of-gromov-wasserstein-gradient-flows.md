---
title: Probabilistic Representation and Convergence of Gromov-Wasserstein Gradient Flows
type: paper
authors:
  - Venkatkrishna Karumanchi
  - Ziv Goldfeld
  - Kengo Kato
  - Zhengxin Zhang
year: 2026
source_job_id: b39b382f-3271-4c04-81a9-84638d4c84f7
tags:
  - gromov-wasserstein
  - gradient-flows
  - fokker-planck-equations
  - stochastic-differential-equations
  - relative-entropy
---

## TL;DR

Karumanchi, Goldfeld, Kato, and Zhang construct the inner-product Gromov-Wasserstein (IGW) gradient flow of relative entropy with respect to the standard Gaussian even though the energy is not globally lambda-convex along the relevant IGW geodesics. They turn its implicit integro-differential characterization into a nonlinear Fokker-Planck equation, show that the second-moment matrix follows an autonomous ODE, and thereby obtain a linear time-inhomogeneous Fokker-Planck equation and linear SDE representation. The flow converges exponentially to the Gaussian in relative entropy.

## Research Question

Can the relative-entropy gradient flow be constructed in [[concepts/inner-product-gromov-wasserstein-gradient-flows|Inner-Product Gromov-Wasserstein Gradient Flows]] despite the failure of global geodesic convexity, and can its dynamics and convergence be represented explicitly through PDEs and stochastic processes?

## Motivation

Classical [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]] connect variational time discretization, Fokker-Planck equations, and Langevin diffusions. Existing IGW flow theory instead gives an implicit partial integro-differential equation and assumes global lambda-convexity along generalized or modified generalized IGW geodesics. Whether relative entropy satisfies that assumption, how its IGW flow should be interpreted, and whether it converges quantitatively were unresolved.

## Contributions

- Gives counterexamples showing that relative entropy with respect to the standard Gaussian is not lambda-convex for any real lambda along generalized or modified generalized IGW geodesics.
- Establishes a local convexity estimate sufficient to construct the IGW-JKO limit, strengthen convergence of the discrete interpolants, and extend the flow to all nonnegative times under finite initial relative entropy and a nonsingular second-moment matrix.
- Evaluates the inverse IGW mobility operator to derive an explicit nonlinear Fokker-Planck equation.
- Proves that the second-moment matrix decouples from the full law and solves the autonomous matrix ODE $\dot A_t=\tfrac12(A_t^{-1}-I)$.
- Uses that ODE to linearize the Fokker-Planck equation and represent the law as the time marginals of a linear, time-inhomogeneous SDE.
- Proves exponential convergence to the standard Gaussian in relative entropy, with rate controlled by the largest eigenvalue of the initial second-moment matrix.

## Method

The authors begin with an IGW analogue of the Jordan-Kinderlehrer-Otto scheme. Because global geodesic convexity fails, they prove a local convexity inequality and use it to obtain uniform cross-partition Cauchy bounds for the discrete IGW-JKO interpolants. Entropy bounds give uniform upper and lower spectral control of their second-moment matrices, enabling concatenation of the locally constructed flow to an infinite time horizon.

For the limiting law $\rho_t$ with second-moment matrix $\Sigma_t$, evaluation of the inverse mobility operator yields

$$
\partial_t\rho_t-\nabla\cdot\left(\frac12\Sigma_t^{-1}\nabla\rho_t
+\frac14(\Sigma_t^{-1}+\Sigma_t^{-2})x\rho_t\right)=0.
$$

Testing this equation against quadratic functions shows that $\Sigma_t$ obeys $\dot\Sigma_t=\tfrac12(\Sigma_t^{-1}-I)$. The coefficients are therefore fixed by an autonomous matrix flow, making the PDE linear and time-inhomogeneous. Its unique solution is the law of

$$
dX_t=-\frac14(A_t^{-1}+A_t^{-2})X_t\,dt+A_t^{-1/2}\,dW_t,
\qquad A_t=\Sigma_t.
$$

Gaussian log-Sobolev control and spectral bounds on the mobility operator then give

$$
H(\rho_t\|\gamma)\leq H(\rho_0\|\gamma)
\exp\left[-\frac{t}{2\max\{\lambda_{\max}(\Sigma_0),1\}}\right].
$$

## Experiments

The paper is theoretical and reports no numerical experiments. Its evidence consists of constructive counterexamples, existence and uniqueness arguments, PDE and SDE representation theorems, regularity results, and an explicit relative-entropy convergence bound.

## Limitations

- The analysis is specific to relative entropy with respect to the standard Gaussian and assumes the initial law has finite relative entropy and a nonsingular second-moment matrix.
- Linearization relies on the Gaussian case's autonomous second-moment dynamics; the authors expect this decoupling to fail for more general rotationally invariant log-concave targets.
- The resulting diffusion resembles an Ornstein-Uhlenbeck process but is not generally a deterministic time change of one.
- The paper does not identify a physical or biological system naturally governed by the derived Fokker-Planck equation or SDE.
- No DOI, arXiv identifier, or venue is present in the supplied manuscript, so none is inferred.

## Related Concepts

- [[concepts/inner-product-gromov-wasserstein-gradient-flows|Inner-Product Gromov-Wasserstein Gradient Flows]]
- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]
- [[concepts/optimal-transport|Optimal Transport]]

## Related Papers

- Zhang et al. (2026), "Gradient Flows and Riemannian Structure in the Gromov-Wasserstein Geometry": supplies the IGW gradient-flow framework that this paper extends beyond its global convexity assumption.
- Jordan, Kinderlehrer, and Otto (1998), "The Variational Formulation of the Fokker-Planck Equation": foundational variational discretization for Wasserstein gradient flows.
- Ambrosio and Savare (2007), "Gradient Flows of Probability Measures": supplies entropy dissipation tools used in the convergence analysis.
- [[papers/local-convergence-of-mean-field-langevin-dynamics-from-gradient-flows-to-linearly-monotone-games|Local Convergence of Mean-Field Langevin Dynamics: From Gradient Flows to Linearly Monotone Games]]: a complementary study of entropy-regularized distributional dynamics and convergence rates.

Source: supplied parsed Markdown for Cognitio job `b39b382f-3271-4c04-81a9-84638d4c84f7`.

[[index|Library home]]
