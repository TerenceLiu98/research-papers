---
title: "Simple approximative algorithms for free-support Wasserstein barycenters"
type: paper
authors:
  - Johannes von Lindheim
year: 2023
tags:
  - optimal-transport
  - wasserstein-barycenters
  - approximation-algorithms
---

## TL;DR

One barycentric relocation step, built from ordinary two-marginal optimal transport plans, gives sparse approximations to free-support Wasserstein barycenters. A reference version needs $N-1$ transport solves; a pairwise version needs $N(N-1)/2$ and has a factor-2 objective guarantee for $p=2$. The paper also treats $p=1$, including geometric-median approximation error, and derives inexpensive instance-specific certificates. On its ellipse benchmark, the pairwise method achieves an objective ratio of 1.0012 in 0.3095 seconds, with a certified ratio at most 1.0164.

## Research Question

Can a simple, single-step transport-based algorithm approximate discrete free-support Wasserstein barycenters with sparse output, meaningful worst-case guarantees, and useful practical speed and accuracy for $p=1,2$?

## Motivation

Fixed-support barycenter methods optimize masses on a prescribed grid, which becomes costly in high dimensions. Free-support methods can exploit sparse point clouds, but exact multi-marginal formulations have exponentially many candidate combinations and the general problem is NP-hard. The paper analyzes a familiar fixed-point update as a standalone approximation that only requires an existing two-marginal OT solver.

## Contributions

- Analyzes reference and pairwise configurations of a known barycentric-update framework for both squared Euclidean and Euclidean transport costs.
- Establishes reference-dependent and factor-2 approximation bounds, with explicit adjustments for approximate geometric medians, and constructions showing sharp or asymptotically sharp behavior.
- Derives computable upper bounds on the achieved objective ratio without requiring an optimal barycenter.
- Demonstrates sparse output and reuse of transport plans when interpolating the same inputs with different barycenter weights.

## Method

For discrete probability measures $\mu^1,\ldots,\mu^N$ and positive weights summing to one, the objective is

$$
\Psi_p(\nu)=\sum_{i=1}^N\lambda_i W_p^p(\nu,\mu^i).
$$

Given a reference measure $\nu=\sum_k a_k\delta_{y_k}$ and transport plans $\pi^i$ to each input, relocate each atom to

$$
m_k\in\arg\min_m\sum_i\lambda_i\sum_l
\frac{\pi^i_{kl}}{a_k}\|m-x_l^i\|^p,
\qquad \widetilde\nu=\sum_k a_k\delta_{m_k}.
$$

For $p=2$, this is a weighted mean computed by matrix products. For $p=1$, it is a weighted geometric median, approximated by Weiszfeld's algorithm to a multiplicative objective tolerance $1+\varepsilon$.

**Reference algorithm.** Choose input $\mu^j$ as the reference, solve $N-1$ OT problems, and relocate its atoms while retaining their masses. Output support has at most $n_j$ points. Corollary 4.5 bounds $\Psi_p(\widetilde\nu)/\Psi_p(\widehat\nu)$ by $1/\lambda_j$ for $p=2$ and $(1+\varepsilon)/\lambda_j$ for $p=1$. Choosing a maximum-weight input gives a bound at most $N$ or $N(1+\varepsilon)$, respectively. Sampling the reference with probabilities $\lambda_j$ gives an expected objective ratio at most 2 or $2(1+\varepsilon)$.

**Pairwise algorithm.** Solve OT for every unordered input pair and reuse transposed plans for the reverse direction. Compute each reference-based approximation $\widetilde\nu^i$ and return the mixture $\sum_i\lambda_i\widetilde\nu^i$. This has at most $\sum_i n_i$ support points and objective ratio at most 2 for $p=2$, or $2(1+\varepsilon)$ for $p=1$. Pairwise plans depend on the inputs, not the barycenter weights, so they can be reused across interpolations.

**Certificates.** Proposition 4.2 supplies the lower bound

$$
L_p=\sum_{i<j}\lambda_i\lambda_jW_p^p(\mu^i,\mu^j)
\leq\Psi_p(\widehat\nu),\qquad p\in\{1,2\}.
$$

Transporting from relocated atoms along the existing plans supplies a feasible-cost upper bound $U_p$ on $\Psi_p(\widetilde\nu)$. Thus $U_p/L_p$ certifies an objective ratio when $L_p>0$. For the pairwise $p=2$ algorithm, Remark 4.6 simplifies the certificate to

$$
\eta=2-\frac{\sum_i\lambda_i\sum_k\mu_k^i
\|m_k^i-x_k^i\|^2}{L_2}.
$$

An exact relocation with optimal plans from the current measure cannot increase the objective (Proposition 4.4). Repeating the update nevertheless need not reach a global optimum.

## Experiments

The main comparison uses ten nested ellipse measures on $60\times60$ images with uniform barycenter weights. Exact pairwise plans use POT 0.7.0's network-simplex solver. Timings are reported on an Intel i7-8550U laptop with 8 GB memory; the paper compares public Python and MATLAB implementations (Section 5.1, Table 1).

| Method | Objective ratio to optimum | Runtime (seconds) |
| --- | ---: | ---: |
| Reference | 1.0061 | 0.0501 |
| Pairwise | 1.0012 | 0.3095 |
| Pairwise full, using grid Sinkhorn plans | 1.0042 | 0.5092 |
| Debiased | 1.0033 | 1.5061 |
| IBP | 1.0214 | 0.0914 |
| Exact | 1.0000 | 18187.6740 |

Pairwise has the lowest measured error among the tested approximate methods; Reference has the shortest runtime. The pairwise certificate guarantees at most 1.64% excess objective without the exact solution, compared with its observed 0.12% excess.

On ten centered, 50-point unit-disk samples, the first reference update removes 83.2% of the initial objective gap. Subsequent updates yield smaller improvements and converge to a suboptimal fixed point after five iterations (Section 3.1).

For $p=1$, the ellipse shape is less well preserved. Replacing the transport cost with squared Euclidean cost while retaining geometric-median relocation improves visual structure; the paper presents this as a possible robust alternative, rather than establishing an outlier benchmark (Section 5.2).

Interpolation of four $50\times50$ image measures demonstrates transport-plan reuse. Pairwise reduces artifacts seen with Reference when the reference weight is small; the uniform-weight pairwise certificate bounds excess objective by 3.6%. A further qualitative application interpolates four $256\times256$ textures through multiscale patch-feature measures and texture synthesis (Sections 5.3-5.4).

## Limitations

Worst-case ratios can be far from one: the $p=2$ reference bound is attained, and pairwise examples approach factor 2 as the number of inputs grows. Relocation preserves each source atom's mass rather than splitting it into multiple output atoms, which can prevent an optimal solution. Additional iterations do not remove this limitation in general.

The theory relies on the stated OT and geometric-median accuracy conditions. Substituting regularized or inexact transport plans does not automatically preserve the exact-plan certificates. The paper's $p=1$ implementation bounds include the $1+\varepsilon$ factor. Its main guarantees cover $p=1,2$; extensions to other exponents are left open.

The timing comparison uses one sparse ellipse dataset, which favors free-support representations. The paper also tests full-grid variants, but notes implementation concerns for FastIBP and excludes BADMM after convergence problems. Texture results and the suggested robustness of hybrid mean-cost/median-location updates are qualitative evidence.

## Related Concepts

- [[concepts/wasserstein-barycenters|Wasserstein Barycenters]]
- [[concepts/optimal-transport|Optimal Transport]]

## Related Papers

- Cuturi and Doucet (2014), "Fast computation of Wasserstein barycenters": earlier iterative barycenter framework discussed by this paper.
- Anderes, Borgwardt, and Miller (2016), "Discrete Wasserstein barycenters: optimal transport for discrete data": sparse-support structure.
- Altschuler and Boix-Adsera (2022), "Wasserstein barycenters are NP-hard to compute": computational-hardness context.
- [[papers/fast-unsupervised-ground-metric-learning-with-tree-wasserstein-distance|Fast Unsupervised Ground Metric Learning with Tree-Wasserstein Distance]]: another computational use of Wasserstein geometry in this library, focused on learning ground metrics rather than averaging input measures.

[[index|Library home]]
