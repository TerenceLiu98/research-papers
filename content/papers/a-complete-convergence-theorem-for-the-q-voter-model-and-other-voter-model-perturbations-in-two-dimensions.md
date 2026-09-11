---
title: "A complete convergence theorem for the q-voter model and other voter model perturbations in two dimensions"
type: paper
authors:
  - Ted Cox
  - Edwin Perkins
year: 2025
arxiv: "2310.00812"
journal: "Electronic Journal of Probability"
volume: 30
article_number: 9
tags:
  - voter-model
  - interacting-particle-systems
  - stochastic-processes
  - scaling-limits
---

## TL;DR

For the [[Q-Voter Model]] on an infinite lattice, Cox and Perkins prove [[Complete Convergence with Coexistence]] when $q<1$ is sufficiently close to 1, the neighbourhood has at most eight sites, and $d=2,3,4$. Every initial configuration converges in law to a mixture of the two consensus states and a unique coexistence equilibrium of density $1/2$. The central two-dimensional theorem applies more generally to monotone, cancellative, finite-range voter model perturbations with positive drift $\Theta_3$ in a [[Super-Brownian Motion]] scaling limit.

## Research Question

Can a small nonlinear advantage for locally rare types prevent the clustering of the two-dimensional [[Voter Model]] and yield convergence to a unique coexistence law? Which structural conditions and random-walk asymptotics make this conclusion extend to other voter model perturbations?

## Motivation

The two-dimensional voter model clusters: its long-time local behavior approaches mixtures of uniform configurations rather than a coexistence equilibrium. Replacing the opposite-type frequency $f$ by $f^q$, with $q<1$, increases the rate relative to neutral copying by $f^{q-1}$, disproportionately favoring locally rare types. Establishing the long-time effect is difficult because recurrent two-dimensional random walks produce strong spatial correlations and invalidate the higher-dimensional equilibrium-based reaction-diffusion argument used in earlier perturbation theory.

## Contributions

- **Q-voter convergence (Theorem 1.1; Corollary 1.2).** For an admissible neighbourhood $\mathcal N$ with $|\mathcal N|\leq8$ and $d=2,3,4$, there exists $q_c\in(0,1)$ such that complete convergence holds for $q_c<q<1$. The coexistence law and the two consensus point masses are the only extremal invariant laws.
- **General two-dimensional criterion (Theorem 1.9).** A monotone, cancellative, finite-range voter model perturbation has complete convergence with coexistence for sufficiently small perturbation strength if $\Theta_3>0$.
- **Checkable drift positivity (Corollary 5.3).** Strict subadditivity of the limiting perturbation rate $r^s(A)$ is sufficient for positive $\Theta_3$, using asymptotic probabilities of three surviving coalescing-walk groups.
- **Broader scaling limit (Theorems 1.11 and 1.15).** Asymptotically symmetric finite-range perturbations converge, under the stated low-density scaling, to super-Brownian motion with drift $\Theta_2+\Theta_3$. This theorem requires neither monotonicity nor cancellativity. The q-voter scaling limit allows any admissible two-dimensional neighbourhood.
- **Further models (Theorems 5.6-5.8).** The criterion yields complete convergence for affine and geometric voter models near their voter-model parameters and recovers the earlier symmetric spatial Lotka-Volterra result, without the eight-neighbour restriction.

## Method

Let $\mathcal N\subset\mathbb Z^d\setminus\{0\}$ be finite, symmetric, and generate the lattice, with uniform-step covariance $\sigma^2 I$. If $f_i(x,\xi)$ is the fraction of neighbours in state $i$, the flip rate is

$$
c^{(q)}(x,\xi)=(1-\xi(x))f_1(x,\xi)^q+\xi(x)f_0(x,\xi)^q.
$$

Both uniform configurations are absorbing. Writing $q=1-\varepsilon$ gives a voter model perturbation with limiting local rate

$$
r^s(A)=\frac{|A|}{|\mathcal N|}\log\frac{|\mathcal N|}{|A|},\qquad r^s(\emptyset)=0.
$$

This function is strictly subadditive on nonempty disjoint sets. The drift is

$$
\Theta_3=\sum_{\emptyset\ne A\subseteq\mathcal N}r^s(A)\bigl(\Theta^+(A)-\Theta^-(A)\bigr),
$$

where $\Theta^\pm$ sum three-group coalescing-walk constants over partitions of $\mathcal N\cup\{0\}$ (equations 1.10 and 1.19). Proposition 1.6 establishes that within-group coalescence together with noncollision between $n$ groups has probability asymptotic to $K_n/(\log t)^{\binom n2}$. A partition argument translates strict subadditivity into positive drift.

For the two-dimensional q-voter scaling limit, take

$$
q_N=1-\frac{(\log N)^3}{N},\qquad
X_t^N=\frac{\log N}{N}\sum_{z\in\mathbb Z^2}\xi_{Nt}^{(q_N)}(z)\,\delta_{z/\sqrt N}.
$$

If $X_0^N\to X_0$ weakly as finite measures, then $X^N$ converges in the Skorokhod space of finite-measure-valued paths to super-Brownian motion with branching rate $4\pi\sigma^2$, diffusion coefficient $\sigma^2$, and drift $\Theta_3>0$. The proof compares the perturbed process with voter processes over short intervals, controls total-mass moments and nearby-particle pairs, establishes tightness, and identifies the limiting martingale problem (Sections 6-9).

Positive drift then supplies block growth estimates. Couplings with processes killed outside finite boxes provide the spatial dependence control needed for comparison with supercritical oriented percolation. Cancellativity, which provides an annihilating dual, combines with these propagation estimates to yield the complete convergence theorem (Sections 3-4 and 10).

Specifically, if $\tau_{\mathbf0},\tau_{\mathbf1}$ are the hitting times of the uniform states, define $\beta_i(\xi_0)=P_{\xi_0}(\tau_{\mathbf i}<\infty)$ and $\beta_\infty(\xi_0)=P_{\xi_0}(\tau_{\mathbf0}=\tau_{\mathbf1}=\infty)$. Then

$$
\mathcal L_{\xi_0}(\xi_t)\Rightarrow
\beta_0(\xi_0)\delta_{\mathbf0}
+\beta_\infty(\xi_0)\nu_{1/2}
+\beta_1(\xi_0)\delta_{\mathbf1}.
$$

The law $\nu_{1/2}$ almost surely has infinitely many sites of each type. The coexistence weight is positive for every nonuniform initial configuration; if both types initially occupy infinitely many sites, that weight is one (equation 1.3).

## Experiments

The evidence is mathematical rather than empirical or simulation-based. Appendix 1 uses Maple-assisted matrix inversion and exact logarithmic expressions to verify cancellativity for eight neighbours near $q=1$. Floating-point calculations for neighbourhood sizes $9$ through $20$ suggest the same property but are explicitly supporting observations, not an extension of the theorem (Remark 11.1). Appendix 2 proves an identity connecting the general drift formula to the earlier Lotka-Volterra drift.

## Limitations

The coexistence result is perturbative: it gives no explicit value of $q_c$ and does not prove convergence for every $0<q<1$. The eight-neighbour restriction comes from verification of cancellativity, not from the drift-positivity or q-voter scaling-limit arguments. Extension to arbitrary neighbourhoods and all $0<q<1$ remains conjectural in this paper (Conjectures 1.4, 1.5, and 3.5).

The results concern infinite lattices with finite-range interactions and the stated symmetry, irreducibility, and covariance assumptions. They do not establish analogous behavior on arbitrary social networks or finite populations. For $q>1$, the authors expect takeover favoring locally dominant types, but do not prove a corresponding long-time theorem; Remark 1.12 gives only the opposite-sign drift scaling limit near 1. The opinion and population interpretations are not empirically calibrated.

## Related Concepts

- [[Q-Voter Model]]
- [[Voter Model]]
- [[Complete Convergence with Coexistence]]
- [[Super-Brownian Motion]]
- [[Opinion Dynamics]]

## Related Papers

- Cox and Perkins (2014), "A complete convergence theorem for voter model perturbations," *Annals of Applied Probability* 24, 150-197. Supplies the earlier convergence framework used here.
- Cox, Merle, and Perkins (2010), "Co-existence in a two-dimensional Lotka-Volterra model," *Electronic Journal of Probability* 15, 1190-1266. Provides two-dimensional scaling and coexistence methods extended by this paper.
- Agarwal, Simper, and Durrett (2021), "The q-voter model on the torus." Supplies higher-dimensional q-voter results and the subadditivity calculation motivating the drift criterion.
- Cox, Durrett, and Perkins (2000), "Rescaled voter models converge to super-Brownian motion," *Annals of Probability* 28, 185-234. Establishes the unperturbed scaling-limit foundation.
- [[Consensus, polarization, and nonlinear response in a two-layer voter model with intra-agent cross-layer reconciliation]] is a library comparison for finite-time, finite-network behavior; its simulation crossover is distinct from the infinite-lattice convergence theorem here.

[[index|Library home]]
