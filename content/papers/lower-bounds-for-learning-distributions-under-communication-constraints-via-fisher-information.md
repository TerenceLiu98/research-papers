---
title: Lower Bounds for Learning Distributions under Communication Constraints via Fisher Information
type: paper
authors:
  - Leighton Pate Barnes
  - Yanjun Han
  - Ayfer Ozgur
year: null
source_job_id: 70130d17-9ea6-478a-a59e-dc17c4262695
tags:
  - distributed-estimation
  - communication-constraints
  - fisher-information
  - minimax-theory
---

## TL;DR

Barnes, Han, and Ozgur use [[concepts/fisher-information-under-quantization|Fisher Information under Quantization]] to derive minimax lower bounds when each of $n$ nodes observes one independent sample and communicates at most $k$ bits. The tails of the statistical score determine whether the information bound grows as $k$, $k^2$, or $2^k$. The bounds cover independent, sequential, and fully interactive blackboard protocols, recover known optimal rates for several models, and give a Gaussian diagonal-covariance lower bound whose tightness remains open in the paper.

[[index|Library home]]

## Research Question

How do communication budget, dimension, and the underlying statistical model jointly constrain distribution-estimation accuracy, even when nodes can interact?

## Motivation

Gaussian mean estimation and discrete distribution estimation exhibit different communication penalties: their risk can decrease inversely with $k$ and $2^k$, respectively. A common information-geometric argument explains this difference without constructing a separate hypothesis-testing reduction for each model. The same setup also models storing each observation in a stream using a fixed number of bits.

## Contributions

- Expresses the trace of quantized Fisher information as the expected squared norm of conditional score means (Lemmas 1 and 2).
- Bounds that trace using either directional score variance or directional Orlicz norms (Theorems 1 and 2).
- Combines transcript-information bounds with the van Trees inequality to handle all three communication models (Theorem 3 and Appendix C).
- Recovers Gaussian-location, discrete-distribution, and product-Bernoulli lower bounds, and derives a diagonal Gaussian covariance bound (Corollaries 5--8).
- Establishes matching rates for one-dimensional Holder density estimation, with an independent protocol achieving the lower bound valid for blackboard protocols (Theorem 4).

## Method

### Information Retained by a Message

For a dominated regular family $P_\theta$, define the score $S_\theta(X)=\nabla_\theta\log f(X\mid\theta)$. A possibly randomized quantizer produces $M$ with at most $2^k$ values. Differentiation under the integral gives

$$
S_\theta(M)=\mathbb E_\theta[S_\theta(X)\mid M],\qquad
\operatorname{Tr}I_M(\theta)=\mathbb E_\theta\left\|\mathbb E_\theta[S_\theta(X)\mid M]\right\|_2^2.
$$

For deterministic quantization, these conditional means have a centroid interpretation in score space. Uniformly over parameters and unit directions $u$, the paper obtains:

| Assumption on the projected score | Upper bound on $\operatorname{Tr}I_M$ |
| --- | --- |
| $\operatorname{Var}\langle u,S_\theta(X)\rangle\leq I_0$ | $\min\{\operatorname{Tr}I_X,2^k I_0\}$ |
| $\lVert\langle u,S_\theta(X)\rangle\rVert_{\Psi_p}^2\leq I_0$, $p\geq1$ | $\min\{\operatorname{Tr}I_X,4k^{2/p}I_0\}$ |

Here $\Psi_p(t)=\exp(t^p)-1$. Sub-Gaussian scores use $p=2$; sub-exponential scores use $p=1$. The scale $I_0$ can depend on dimension and parameter region, so the polynomial bound need not be the stronger one. Dense and sparse product-Bernoulli models illustrate this distinction.

### From Information to Risk

For a parameter space containing $[-B,B]^d$, the van Trees argument bounds worst-case squared parameter error below by

$$
\frac{d^2}{\sup_\theta\operatorname{Tr}I_Y(\theta)+d\pi^2/B^2},
$$

where $Y$ is the full transcript. Independent and sequential protocols admit a conditional Fisher-information chain rule. For blackboard protocols, the proof factors transcript likelihoods across samples, cancels cross-score terms, and uses a protocol-tree identity to control each node's contribution. The resulting transcript bounds are $n2^kI_0$ and $4nk^{2/p}I_0$.

### Model-Specific Rates

The following are lower bounds up to positive constant factors, for all three protocol classes. Each row includes the sample-size condition used to absorb the prior-information term.

| Model | Squared-error lower bound | Condition |
| --- | --- | --- |
| Gaussian mean, covariance $\sigma^2 I_d$, parameter cube of radius $B$ | $\sigma^2\max\{d^2/(nk),d/n\}$ | $nB^2\min\{k,d\}\geq d\sigma^2$ |
| Gaussian diagonal variances in $[\sigma_{\min}^2,\sigma_{\max}^2]^d$ | $\sigma_{\min}^4\max\{d^2/(nk^2),d/n\}$ | $n(\sigma_{\max}^2-\sigma_{\min}^2)^2\min\{k^2,d\}\geq d\sigma_{\min}^4$ |
| Discrete distribution on $d+1$ symbols | $\max\{d/(n2^k),1/n\}$ | $n\min\{2^k,d\}\geq d^2$ |
| Product Bernoulli, $\theta\in[0,1]^d$ | $\max\{d^2/(nk),d/n\}$ | $n\min\{k,d\}\geq d$ |
| Product Bernoulli, $\sum_i\theta_i=1$ | $\max\{d/(n2^k),1/n\}$ | $n\min\{2^k,d\}\geq d^2$ |

For densities on $[0,1]$ with Holder smoothness $s\in(0,1]$ and constant $L$, Theorem 4 gives the minimax integrated squared-error rate

$$
\max\left\{n^{-2s/(2s+1)},(n2^k)^{-s/(s+1)}\right\},
$$

with constants depending only on $s,L$. A smooth-bump parametric subfamily supplies the lower bound. An independent histogram protocol allocates nodes to groups of $2^k-1$ bins, reserving one message for observations outside the assigned group. Balancing approximation and estimation errors yields the matching upper bound.

## Experiments

This is a theoretical paper with proofs and analytical examples, not empirical benchmarks. As a direct sharpness check, quantizing the signs of $\min\{k,d\}$ Gaussian coordinates at $\theta=0$ retains trace information $2\min\{k,d\}/(\pi\sigma^2)$. Other sharpness claims rely on matching communication schemes in the cited literature; the density-estimation upper bound is constructed in Section 4.

## Limitations

- The Gaussian diagonal-covariance information and risk bounds are not shown to be order optimal. The $k^2$ dependence is a proved bound, not an established achievable rate.
- The framework assumes independent observations, one per node, a per-node bit constraint, and regular dominated statistical models. The square-root density must be coordinate-wise continuously differentiable almost everywhere, with finite, coordinate-wise continuous Fisher information.
- The explicit parametric rates above require the stated sample-size and parameter-space conditions. The general van Trees bound retains the prior-information term outside those regimes.
- The nonparametric result treats one-dimensional densities with $0<s\leq1$. It does not establish the same rate for arbitrary smoothness or higher-dimensional supports.
- The supplied Markdown omits this paper's publication year and stable identifier; `year` is left null. It also contains damaged notation, so equations here follow the named theorem statements and their surrounding definitions.

## Related Concepts

- [[concepts/fisher-information-under-quantization|Fisher Information under Quantization]]: conditional score geometry and communication-dependent information bounds.
- [[concepts/representative-points|Representative Points]]: a complementary finite-representation perspective; here the objective is retained parameter information rather than reconstruction distortion.

## Related Papers

- Barnes, Han, and Ozgur (2018), "A geometric characterization of Fisher information from quantized samples with applications to distributed statistical estimation": earlier introduction of the framework.
- Barnes, Han, and Ozgur (2019), "Fisher information for distributed estimation under a blackboard communication protocol": precursor for interactive protocols.
- Han, Ozgur, and Weissman (2018), "Geometric lower bounds for distributed parameter estimation under communication constraints": prior geometric lower bounds recovered by this approach.
- Han, Mukherjee, Ozgur, and Weissman (2018), "Distributed statistical estimation of high-dimensional and nonparametric distributions": matching discrete-distribution communication scheme.
- Gill and Levit (1995), "Applications of the van Trees inequality: a Bayesian Cramer-Rao bound": risk-lower-bound tool used in Theorem 3.
