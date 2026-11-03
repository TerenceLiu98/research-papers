---
title: Number Theoretic Accelerated Learning of Physics-Informed Neural Networks
type: paper
authors:
  - Takashi Matsubara
  - Takaharu Yaguchi
year: 2025
source_job_id: "02328009-7567-4eb7-a315-ad3178cc18c0"
tags:
  - physics-informed-neural-networks
  - quasi-monte-carlo
  - numerical-integration
  - collocation-methods
  - partial-differential-equations
---

## TL;DR

Matsubara and Yaguchi treat the physics-informed loss as a numerical approximation to an integral and choose PINN collocation points with [[concepts/good-lattice-training|Good Lattice Training]]. For smooth, periodized losses, a rank-1 lattice gives a theoretically faster integration-error rate than random sampling. Across low-dimensional PINN benchmarks, GLT reaches competitive errors with 2-7 times fewer collocation points, and it also accelerates competitive PINNs. Its advantage weakens with dimension, non-smooth solutions, and domains that do not readily support lattice construction.

## Research Question

Can number-theoretic lattice rules reduce the discretization error of physics-informed losses, allowing PINNs and their variants to reach comparable accuracy with fewer collocation points?

## Motivation

A PINN minimizes PDE residuals at finitely many collocation points even though solution quality depends on an integrated residual over the continuous domain. Too few points give a poor approximation to that integral, while more points increase every training step's cost. Common random, Latin-hypercube, uniform-grid, and Sobol designs do not fully exploit the smoothness typical of low-dimensional physical simulations.

## Contributions

- Recasts collocation-point selection as a numerical-integration problem and separates neural approximation error from the error induced by approximating the integrated physics loss.
- Introduces [[concepts/good-lattice-training|Good Lattice Training]], which uses rank-1 lattice points selected by number-theoretic criteria.
- Establishes an integration-error rate of $O((\log N)^{\alpha s}/N^\alpha)$ when the loss lies in a Korobov space of smoothness $\alpha$, compared with the dimension-independent $O(N^{-1/2})$ Monte Carlo rate.
- Adds periodization constructions for initial and boundary conditions and a random-shift procedure for stochastic training.
- Tests the point design with standard PINNs, white-box system identification, and competitive PINNs rather than changing their objectives or optimizers.

## Method

For a PDE residual loss $\mathcal P[\tilde u]$ on $[0,1]^s$, practical PINN training minimizes

$$
\frac{1}{N}\sum_{j=0}^{N-1}\mathcal P[\tilde u](\mathbf x_j)
$$

as an approximation to $\int_{[0,1]^s}\mathcal P[\tilde u](\mathbf x)\,d\mathbf x$. The paper's first error bound makes the resulting solution error depend on three terms: neural-network approximation error, the optimized empirical residual, and the quadrature error between the finite sum and the integral.

GLT constructs a rank-1 lattice from an integer vector $\mathbf z$:

$$
L^*=\left\{\operatorname{frac}\left(\frac{j}{N}\mathbf z\right):j=0,\ldots,N-1\right\}.
$$

Fourier modes whose integer frequencies do not belong to the dual lattice cancel in the finite average. Choosing $\mathbf z$ to suppress the remaining modes controls the worst-case error for smooth functions in a Korobov space. In two dimensions, Fibonacci pairs $N=F_k$ and $\mathbf z=(1,F_{k-1})$ give a good construction; more general dimensions use tabulated vectors or a search reported to cost $O(N^2)$.

The theoretical argument requires a smooth periodic integrand. The proposed periodization tricks fold time coordinates, encode periodic spatial coordinates with sine and cosine, and build initial or Dirichlet conditions into the network output. Random shifts $\mathbf r\sim U([0,1]^s)$ produce $\operatorname{frac}(j\mathbf z/N+\mathbf r)$, with a fresh shift at each SGD iteration in the main PINN experiments.

## Experiments

The main PINN study compares GLT with uniformly random points, uniform grids, Latin hypercube sampling, and Sobol sequences on nonlinear Schrodinger, Korteweg-de Vries, Allen-Cahn, and two- and four-dimensional Poisson equations. Each method and point count uses five trials. The authors also evaluate KdV and Allen-Cahn parameter identification and apply GLT to competitive PINNs on nonlinear Schrodinger and Burgers equations.

At the paper's saturation threshold, defined as error within 130% of the lowest observed value, GLT uses the following point counts:

| Problem | GLT points | Best reported competing count |
| --- | ---: | ---: |
| Nonlinear Schrodinger | 987 | 2,048 (Sobol) |
| Korteweg-de Vries | 987 | 2,048 (Sobol) |
| Allen-Cahn | 1,597 | 4,096 (Sobol) |
| Poisson, $s=2$ | 610 | 4,181 (LHS) |
| Poisson, $s=4$ | 307 | 701 (LHS) |

At the common competitive budgets selected in Table 1, GLT has the smallest reported relative error in all five problems: $1.22$, $2.19$, $0.93$, $0.76$, and $0.15$, respectively, on the table's $10^{-3}$ scale. A separate 10,000-repeat calculation finds that the standard deviation of the sampled physics loss falls faster with $N$ for GLT than for the comparison designs.

For system identification, GLT attains comparable parameter error with roughly half as many collocation points as Sobol sampling in most reported cases. In competitive PINNs, it reaches useful convergence with 6,765 nonlinear-Schrodinger points and 2,584 Burgers points; the corresponding LHS runs need about three to four times as many points for comparable or worse performance.

## Limitations

- The theoretical advantage requires a sufficiently smooth, periodic physics loss. Discontinuities, sharp gradients, higher-order PDE derivatives, or non-smooth activations reduce the effective smoothness $\alpha$ and can erase the faster rate.
- GLT is most favorable in low dimensions. For six- and eight-dimensional Poisson problems, random sampling is as effective as or better than GLT, and the PINNs do not converge to useful precision within the reported budget.
- The construction directly targets rectangular, flat domains. Irregular domains require coordinate transformations, whose effect on optimization is not evaluated here.
- Periodization and hard enforcement of initial or boundary conditions substantially improve every sampling method. The ablation without these tricks usually still favors GLT, but some of the full-system gain is not specific to lattice sampling.
- The standard deviation of repeated finite losses is used as a proxy because the integrated physics loss is unavailable. It is not a direct measurement of the quadrature error for each trained model.
- Most comparisons use five trials, and the reported saturation threshold is a study-specific rule. The benchmark errors also saturate because of model capacity, numerical reference errors, evaluation discretization, and finite precision.
- Optimal lattice vectors may require tabulated values or an $O(N^2)$ search. The paper does not benchmark that preprocessing cost against end-to-end training savings.

## Related Concepts

- [[concepts/good-lattice-training|Good Lattice Training]]: the proposed rank-1 lattice design, periodization conditions, and random shifts.
- [[concepts/evidence-based-loss-weighting-for-physics-informed-neural-networks|Evidence-Based Loss Weighting for Physics-Informed Neural Networks]]: an orthogonal approach that changes how PINN residual and boundary losses are weighted rather than where they are evaluated.
- [[concepts/representative-points|Representative Points]]: a broader view of finite point sets used to approximate continuous distributions or integrals, including Monte Carlo and quasi-Monte Carlo designs.

## Related Papers

- Raissi, Perdikaris, and Karniadakis (2019), "Physics-informed neural networks: A deep learning framework for solving forward and inverse problems involving nonlinear partial differential equations": supplies the foundational PINN formulation and several benchmark datasets.
- Longo et al. (2021), "Higher-order quasi-Monte Carlo training of deep neural networks": provides the higher-order QMC comparison that motivates avoiding prior smoothness knowledge and hyperparameter tuning.
- Zeng et al. (2023), "Competitive Physics Informed Networks": supplies the adversarial PINN variant used to test whether GLT transfers beyond the standard squared-residual objective.
- [[papers/bayesian-reasoning-for-physics-informed-neural-networks|Bayesian Reasoning for Physics-Informed Neural Networks]]: a library comparison focused on loss weighting, model selection, and local uncertainty rather than collocation design; not cited in this manuscript.
- [[papers/a-new-resampling-method-for-meta-gaussian-distributions|A New Resampling Method for Meta Gaussian Distributions]]: a library comparison of good-lattice QMC points with alternative finite-support approximations in a statistical setting; not cited in this manuscript.

[[index|Library home]]
