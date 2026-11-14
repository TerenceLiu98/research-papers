---
title: "Geometric Functional Inequalities for Markov Processes: An Invitation via the Langevin Diffusion"
type: paper
authors:
  - Sam Power
year: null
source_job_id: 2f33caa1-8785-4bd3-b15f-17c45bffef88
tags:
  - functional-inequalities
  - markov-processes
  - langevin-diffusion
---

## TL;DR

An expository tutorial connects the geometry of a target distribution to Markov-process convergence through functional inequalities. For overdamped Langevin diffusion, the Poincaré inequality controls chi-squared relaxation, while the logarithmic Sobolev inequality controls relative-entropy decay. Transfer principles, coupling, and Lyapunov arguments make these bounds reusable beyond uniformly convex targets.

## Research Question

How can familiar probabilistic information about a Markov process establish functional inequalities, and how do those inequalities translate into mixing, concentration, and regularisation guarantees?

## Motivation

Pathwise coupling and drift arguments provide concrete local information, but direct total-variation contraction is often unavailable. Comparing a divergence to its instantaneous dissipation converts the convergence question into a static inequality that behaves well under products and changes of measure.

## Contributions

- Synthesises established theory rather than presenting a new algorithm or experimental benchmark.
- Derives variance and entropy dissipation explicitly for Langevin diffusion.
- Organises tensorisation, Lipschitz transport, convolution, bounded perturbations, and overlapping mixtures into a toolkit for transferring inequalities.
- Explains how coupling contraction and drift plus local Poincaré estimates supply global bounds.
- Surveys weak, super, and weighted inequalities and provides an annotated literature guide.

## Method

For a smooth positive target density $\pi$, the tutorial studies

$$
dX_t=\nabla\log\pi(X_t)\,dt+\sqrt{2}\,dW_t,
\qquad \mathcal L f=\langle\nabla\log\pi,\nabla f\rangle+\Delta f.
$$

Reversibility gives the Dirichlet form $\mathcal E(f,g)=\mathbb E_\pi\langle\nabla f,\nabla g\rangle$. Differentiating a convex $\Phi$-entropy along the semigroup yields

$$
-\partial_t\operatorname{Ent}_\Phi(P_tf)
=\mathbb E_\pi[\Phi''(P_tf)\|\nabla P_tf\|^2].
$$

A lower bound on this dissipation by a constant times entropy implies exponential decay by Grönwall's lemma. With the paper's rate convention, [[concepts/poincare-inequality|Poincaré Inequality]] with constant $\gamma$ gives $\chi^2(\mu_t,\pi)\le e^{-2\gamma t}\chi^2(\mu_0,\pi)$; [[concepts/logarithmic-sobolev-inequality|Logarithmic Sobolev Inequality]] with constant $\lambda$ gives $\mathrm{KL}(\mu_t\|\pi)\le e^{-2\lambda t}\mathrm{KL}(\mu_0\|\pi)$.

Products retain the smallest component rate; an $L$-Lipschitz pushforward retains at least the reference rate divided by $L^2$. Bounded density perturbations degrade the rate by a density-ratio condition number. Mixtures additionally require overlap control. Under appropriate compatibility assumptions, Wasserstein coupling contraction yields a spectral-gap bound, but does not by itself imply entropy contraction. A Lyapunov drift condition combined with a local Poincaré inequality offers another route without relying on high-dimensional minorisation.

## Experiments

No numerical experiments or datasets are reported. Analytical examples illustrate the distinctions:

- A Gaussian with covariance $C$ has PI and LSI rates at least $\lambda_{\min}(C^{-1})$; uniform strong log-concavity yields the analogous curvature bound.
- The unit-rate exponential distribution has sharp Poincaré rate $1/4$ but no positive LSI rate.
- For the rescaled Student target $\pi_\nu(x)\propto(1+x^2)^{-(\nu+1)/2}$, $\nu\ge3$, weak PI yields $O(t^{-\nu/2})$ chi-squared decay for bounded initial density ratios. Weighting the diffusion by $1+x^2$ instead gives exponential chi-squared decay at rate $2(\nu-1)$ for finite initial chi-squared divergence.

## Limitations

The exposition mainly treats reversible Euclidean diffusions and suppresses many analytic regularity assumptions and proofs. Non-reversible hypocoercivity and discrete processes receive limited treatment. Divergence contraction requires finite initial divergence; point initialisations need a separate smoothing argument. Continuous-time results do not themselves give discretised sampler guarantees. Dimension-free relaxation rates do not remove dimension dependence in initial divergence.

The supplied text gives no explicit publication year, venue, DOI, or identifier for this article; the year is left unknown. Its discussion of recent conjecture resolutions labels them as claims, not established results; those claims are not used as premises here.

## Related Concepts

- [[concepts/poincare-inequality|Poincaré Inequality]]
- [[concepts/logarithmic-sobolev-inequality|Logarithmic Sobolev Inequality]]
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]: the broader gradient-flow interpretation connects dissipation to optimisation on probability measures.

## Related Papers

- [[papers/probabilistic-representation-and-convergence-of-gromov-wasserstein-gradient-flows|Probabilistic Representation and Convergence of Gromov-Wasserstein Gradient Flows]]: a related library application of Gaussian log-Sobolev control to entropy convergence under a different flow geometry.
- Gross (1975), *Logarithmic Sobolev Inequalities*, is the source's foundational reference for LSI and hypercontractivity.
- Bakry, Barthe, Cattiaux, and Guillin (2008), *A Simple Proof of the Poincaré Inequality for a Large Class of Probability Measures*, supplies the drift-plus-local-inequality route.

Source: supplied parsed Markdown for Cognitio job `2f33caa1-8785-4bd3-b15f-17c45bffef88`, especially Sections 2–3.

[[index|Library home]]
