---
title: "Variational representations of annealing paths: Bregman information under monotonic embedding"
type: paper
authors:
  - Rob Brekelmans
  - Frank Nielsen
year: 2024
source_job_id: 4e38b726-32e7-4fcb-b320-0254df2a1d91
tags:
  - information-geometry
  - bregman-divergences
  - monte-carlo
---

## TL;DR

The paper extends the Bregman mean-as-barycenter result to monotonic representations: a quasi-arithmetic mean minimizes expected representational Bregman divergence, and the minimum is a Jensen gap. Applied to [[concepts/quasi-arithmetic-annealing-paths|Quasi-Arithmetic Annealing Paths]], this gives multiple divergence-minimization interpretations of the same path and proves that it is an affine geodesic. The contribution consists of theoretical results and worked examples, not new sampling benchmarks.

## Research Question

Which divergence objectives have quasi-arithmetic annealing paths as their minimizers, and how do the resulting minimum values connect familiar statistical divergences, parametric families, and information geometry?

## Motivation

Annealed importance sampling, sequential Monte Carlo, thermodynamic integration, and parallel tempering use intermediate densities to bridge tractable and difficult distributions. Geometric averaging is common, but power-mean paths offer alternative bridges. Existing variational interpretations associate these paths with particular losses; a representational framework explains why many different losses can select the same intermediate density.

## Contributions

- Extends [[concepts/bregman-information|Bregman Information]] to monotonic embeddings, including the minimizing quasi-arithmetic mean, its Jensen-gap value, and an exact suboptimality decomposition (Theorem 1; vector version in Appendix B.2).
- Proves that these paths are autoparallel for the primal affine connection induced by the representational Bregman divergence, with a corresponding dual statement (Theorem 2).
- Derives q-path objectives involving Beta and Cichocki-Amari divergences in addition to the known Amari alpha-divergence objective (Section 4.1).
- Relates the construction to one-parameter deformed exponential families, partition-function generators, and the distinction between normalized and unnormalized endpoints (Section 4.2).

## Method

Let $\rho$ be a strictly monotonic representation and $f$ a differentiable strictly convex generator on its admissible range. For density representations $a=\rho(\tilde\pi_a)$ and $b=\rho(\tilde\pi_b)$, define

$$
D_f[a:b]=\int\bigl(f(a(x))-f(b(x))-(a(x)-b(x))f'(b(x))\bigr)\,dx.
$$

The conjugate representation is $\tau=f'\circ\rho$. For nonnegative weights $w_i$ summing to one, finite required integrals, and an admissible represented mean, Theorem 1 gives

$$
\mu^*=\rho^{-1}\!\left(\sum_i w_i\rho(\tilde\pi_i)\right)
=\arg\min_\mu\sum_i w_iD_f[\rho(\tilde\pi_i):\rho(\mu)].
$$

Writing $\Psi_f[a]=\int f(a(x))\,dx$, the optimal value is

$$
\mathcal I_{f,\rho}
=\sum_iw_i\Psi_f[\rho(\tilde\pi_i)]-\Psi_f[\rho(\mu^*)].
$$

The objective at any admissible $\mu$ equals $\mathcal I_{f,\rho}+D_f[\rho(\mu^*):\rho(\mu)]$. Thus the representation determines the minimizer, while the generator determines the loss and information value. The candidate must occupy the second argument of the representational divergence.

For two endpoints and weight $\beta$, the path is

$$
\tilde\pi_\beta^{(\rho)}
=\rho^{-1}\bigl((1-\beta)\rho(\tilde\pi_0)+\beta\rho(\tilde\pi_1)\bigr).
$$

With $\rho(u)=\log_q u=(u^{1-q}-1)/(1-q)$, this becomes the q-path. It recovers geometric averaging as $q\to1$ and arithmetic averaging at $q=0$. Varying the conjugate representation while keeping $\rho$ fixed gives different divergence objectives with the same path. In particular, the Beta-divergence formulation minimizes over its first argument, because its orientation is reversed relative to $D_f$ (Example 8).

The minimum value and its scaled version have different familiar instances:

| Construction | Information value |
| --- | --- |
| Arithmetic mixture with forward KL to the representative | Weighted Jensen-Shannon divergence, without additional scaling |
| Unnormalized geometric path with reverse KL | $\mathcal I/[\beta(1-\beta)]$ is Amari alpha-divergence of order $\beta$ in the paper's convention |
| Geometric family with log-partition generator | Scaled Jensen gap gives a Renyi divergence with the paper's additional order-dependent scaling |
| q-path with Amari divergence of order $q$ | Scaled information gives Zhang's two-parameter divergence |

The roles of $q$ and $\beta$ are distinct: $q$ chooses the representation, whereas $\beta$ interpolates endpoints. Under absolute continuity, the path also has the form $\tilde\pi_0\exp_q\{\beta\log_q(\tilde\pi_1/\tilde\pi_0)\}$, a deformed likelihood-ratio exponential family. Its scaled normalizer $\mathcal Z_q(\beta)/q$ supplies a parametric generator for $q>0$; at $q=1$, using $\mathcal Z_1$ versus $\log\mathcal Z_1$ distinguishes unnormalized from normalized KL constructions.

Theorem 2 identifies linearity in $\rho$ coordinates with an affine geodesic. This concerns the induced affine connection, not a general shortest-path claim for the Fisher-Rao metric.

## Experiments

No new empirical sampling evaluation is reported. Figure 1 illustrates the variational construction, and Tables 1-3 organize divergence examples, induced connections, and limiting cases. Appendices prove the barycenter and geodesic results and review annealed importance sampling. The paper refers to Masrani et al. (2021) for empirical q-path evaluation; those results are not experiments performed here.

## Limitations

- The barycenter identity requires admissible represented means and finite expectations; strict convexity underlies uniqueness, and the geometric statements require sufficient smoothness. Normalization or additional family constraints cannot simply be added to the unconstrained optimization.
- Normalizing the endpoints generally changes the q-path at a fixed $\beta$. Example 12 gives the matching parameter $\beta'=\beta Z_1^{q-1}/((1-\beta)Z_0^{q-1}+\beta Z_1^{q-1})$, which involves the often unknown endpoint normalizers. For $q=1$, $\beta'=\beta$.
- A variational or affine-geodesic characterization does not establish lower Monte Carlo variance or faster mixing. Choosing or learning a useful path and schedule remains future work.
- The supplied text contains inconsistent notation in some displayed formulas and tables. The summary uses the main barycenter identities and explicitly distinguishes scaling conventions; the paper's Renyi convention includes an extra factor relative to the standard definition (footnote referenced in Example 10).
- The supplied manuscript states online publication on 2 February 2024 but supplies no identifiable DOI or arXiv ID for this paper.

## Related Concepts

- [[concepts/quasi-arithmetic-annealing-paths|Quasi-Arithmetic Annealing Paths]]: interpolation by averaging transformed densities.
- [[concepts/bregman-information|Bregman Information]]: the optimal expected loss and Jensen-gap identity generalized here.
- [[concepts/bregman-divergences|Bregman Divergences]]: ambient losses evaluated in representation coordinates.
- [[concepts/alpha-divergences|Alpha Divergences]]: appear both as representational losses and scaled information values. The order $a$ used here corresponds to conventional alpha parameter $2a-1$.

## Related Papers

- [[papers/clustering-with-bregman-divergences|Clustering with Bregman Divergences]] (Banerjee et al., 2005): source of the arithmetic barycenter and Bregman information framework generalized here (reference 7).
- Masrani et al. (2021), "q-Paths: generalizing the geometric annealing path using power means": introduces the q-paths and their empirical study (reference 45).
- Grosse, Maddison, and Salakhutdinov (2013), "Annealing between distributions by averaging moments": prior variational and moment-averaging path construction (reference 34).
- Zhang (2004), "Divergence function, duality, and convex analysis," and Zhang (2013), "Nonparametric information geometry: from divergence function to referential-representational biduality on statistical manifolds": foundations for the representational divergence framework (references 77-78).

[[index|Library home]]
