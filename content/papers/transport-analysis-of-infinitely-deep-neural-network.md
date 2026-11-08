---
title: Transport Analysis of Infinitely Deep Neural Network
type: paper
authors:
  - Sho Sonoda
  - Noboru Murata
year: null
source_job_id: "6dd78b02-1e96-44d6-aebf-0fba43b03a70"
tags:
  - representation-learning
  - optimal-transport
  - autoencoders
---

## TL;DR

The paper represents network depth as transport time and analyzes ideal [[concepts/denoising-autoencoders|Denoising Autoencoders]] through particle trajectories, evolving densities, and [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]. In the continuous-depth Gaussian case, denoising follows the score of the current distribution and decreases Shannon entropy via a backward heat equation. Analytic and small numerical examples show faster concentration and different attractors than shallow denoising.

## Research Question

How does depth change the transport of data, and what do intermediate representations do in denoising networks?

## Motivation

Function composition is awkward to study through the linear-combination viewpoint of shallow networks. A flow representation makes composition into time evolution and describes the learned map without relying on a particular redundant neural parameterization.

## Contributions

- Connects discrete layer maps to an ODE in the depth continuum limit and to a continuity equation for their pushforward distributions.
- Derives the population-optimal additive-noise denoiser and characterizes continuous Gaussian denoising as entropy descent.
- Establishes a conditional equivalence between stacked and composed generalized DAEs through decoder projections and topological conjugacy.
- Develops a double continuum perspective combining depth flows with width integral representations and ridgelet transforms.

## Method

For clean data $X\sim\mu_0$ and independent corruption $\varepsilon\sim\nu_t$, minimizing squared reconstruction error gives the conditional mean (Section 3):

$$
g_t^*(y)=\mathbb E[X\mid X+\varepsilon=y].
$$

For Gaussian corruption of covariance $tI$, this becomes

$$
g_t^*(x)=x+t\nabla\log(\nu_t*\mu_0)(x).
$$

Composition trains each successive denoiser on the distribution transported by earlier denoisers. As time steps shrink, the ideal continuous Gaussian DAE satisfies

$$
\dot x_t=\nabla\log\mu_t(x_t),\qquad
\partial_t\mu_t=-\nabla\cdot(\mu_t\nabla\log\mu_t)=-\Delta\mu_t.
$$

Here $\mu_t$ is the evolving pushforward, not the original density held fixed. Under the stated regularity and existence conditions, this is Wasserstein descent of $H[\mu]=-\int\mu\log\mu$ (Theorems 7–8).

The stacking result uses generalized DAEs associated with elliptic operators. Theorem 10 assumes continuous injective encoders and injective decoder restrictions on the relevant data manifolds. Composing the decoders maps the stacked encoder trajectory into a composition of generalized DAEs; it does not assert identical hidden coordinates for arbitrary networks.

Section 7 represents maps as integrals of activation functions. For a smooth compactly supported potential, Theorem 11 gives $R_\rho[\nabla V](a,b)=-aR_{\rho'}[V](a,b)$, connecting vector-valued flow representations to scalar ridgelet analysis.

## Experiments

The evidence consists of analytic Gaussian examples and illustrative numerical trajectories, rather than a downstream benchmark suite (Sections 5–6).

- For initial $N(m_0,\sigma_0^2)$, shallow transport has variance $\sigma_0^2/(1+t/\sigma_0^2)^2$, whereas continuous transport has variance $\sigma_0^2-2t$ before the singular time $\sigma_0^2/2$.
- For the bivariate Gaussian with covariance $\operatorname{diag}(2,1)$, continuous transport reaches an attractor on the horizontal axis at $t=1/2$. Shallow transport only degenerates asymptotically. Finer compositions approach the continuous trajectories.
- Gaussian-mixture examples illustrate changes in attraction basins with mixture weights and covariances. Componentwise transport approximations require well-separated components.
- Figure 10 compares theoretical Gaussian-distribution trajectories with ten trials of trained finite networks. Early empirical trajectories approximately follow the entropy gradient flow, while finite compositions can drift away.
- A two-dimensional swissroll becomes thinner under both stacked and composed DAEs. The authors explicitly present this as an illustration, not a numerical verification of topological conjugacy.

## Limitations

The main derivations assume enough data and network capacity to attain the population optimum; approximation and estimation errors are left for future work. The backward heat description requires an admissible solution interval and can reach singular distributions in finite time. Stacking equivalence depends on injectivity and generalized diffusion operators. The examples support specific transport behavior, not a general guarantee that deeper networks improve predictive accuracy.

The supplied Markdown contains damaged mathematical notation and no unambiguous publication year or stable identifier; these metadata are not inferred from reference dates.

## Related Concepts

- [[concepts/denoising-autoencoders|Denoising Autoencoders]]: reconstruction as conditional-mean estimation and score-driven transport.
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]: distributional interpretation of continuous denoising.
- [[concepts/optimal-transport|Optimal Transport]]: geometric framework; a transport interpretation alone does not establish minimum-cost transport.

## Related Papers

- [[papers/measuring-optimal-transport-in-transformer-depth|Measuring Optimal Transport in Transformer Depth]]: a complementary library connection testing minimum-cost layer transitions empirically in transformers, rather than deriving ideal DAE dynamics.
- Alain and Bengio (2014), *What regularized auto-encoders learn from the data generating distribution*: the cited precursor for the population denoising formula.
- Vincent et al. (2010), *Stacked denoising autoencoders*: the cited stacking procedure analyzed here.

[[index|Library home]]
