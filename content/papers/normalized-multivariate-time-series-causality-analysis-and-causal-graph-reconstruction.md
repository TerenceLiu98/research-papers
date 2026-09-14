---
title: "Normalized Multivariate Time Series Causality Analysis and Causal Graph Reconstruction"
type: paper
authors:
  - X. San Liang
year: null
tags:
  - causality
  - time-series
  - information-flow
  - causal-graph-reconstruction
---

## TL;DR

The paper extends information-flow causality estimation from two time series to multiple observed variables under a linear stochastic model. It estimates directed entropy contributions, self effects, and noise effects, with significance tests and a normalization for relative influence. Synthetic autoregressive and nearly synchronized oscillator examples recover the intended inter-variable directions, although nonlinear dynamics produce residual reverse flows and the experiments do not establish general robustness to hidden confounding.

## Research Question

Can a dynamical definition of information flow yield a practical multivariate time-series estimator that reconstructs directed graphs, including self effects, and quantifies the relative importance of incoming influences?

## Motivation

Correlation and synchronization can arise from common drivers without a direct connection between the observed responses. Earlier work in this framework supplied a bivariate estimator and a general dynamical theory, but lacked a practical multivariate estimator. Raw information-flow magnitudes also omit the destination's other entropy contributions, making relative influence difficult to interpret.

## Contributions

- Derives a covariance-based multivariate estimator of directed information flow under a linear model, extending Liang (2014).
- Estimates the self contribution to marginal entropy change and uses it to identify self loops in the dynamical graph.
- Gives large-sample significance tests using Fisher information and constructs graphs from significant directed flows.
- Normalizes incoming flows against the absolute contributions from self dynamics, other variables, and noise.
- Demonstrates the method on a six-variable autoregressive network and three coupled chaotic Rossler oscillators, each with an observed common driver.

## Method

In the paper's framework, $T_{j\to i}$ is the contribution of component $X_j$ to the rate of change of the marginal entropy of $X_i$, measured in nats per unit time. Nonzero flow defines causality within this framework. The reviewed nil-causality theorem states that the flow vanishes if neither the target drift nor its diffusion variance depends on the source (Section II).

The estimator assumes stationary, equally spaced observations and fits a linear stochastic system with constant coefficients and diagonal additive noise. For target $i$, let $C$ be the sample covariance matrix of the observed variables and let $(c_i)_j=\operatorname{Cov}(X_j,\dot X_i)$. The normal equations in Section III can be written as

$$
C\hat a_i=c_i,\qquad
\widehat T_{j\to i}=\hat a_{ij}\frac{C_{ij}}{C_{ii}},\quad j\ne i,
$$

where $\hat a_i=(\hat a_{i1},\ldots,\hat a_{id})^\mathsf{T}$. Derivatives are approximated by $\dot X_{i,n}=(X_{i,n+k}-X_{i,n})/(k\Delta t)$, usually with $k=1$; the chaotic example uses $k=2$. This is the matrix form of the paper's cofactor estimator in Equations (9) and (14), and requires a nonsingular $C$.

The self entropy contribution is $\widehat{dH_i^*/dt}=\hat a_{ii}$. With residual sum of squares $Q_{N,i}$, the estimated noise variance rate is $\hat g_{ii}=Q_{N,i}\Delta t/N$, giving a noise entropy contribution $\hat g_{ii}/(2C_{ii})$. The normalized flow is

$$
\widehat\tau_{j\to i}=\frac{\widehat T_{j\to i}}{\widehat Z_i},\qquad
\widehat Z_i=|\hat a_{ii}|+\sum_{j\ne i}|\widehat T_{j\to i}|+
\left|\frac{\hat g_{ii}}{2C_{ii}}\right|.
$$

For a positive denominator, the normalized flow lies in $[-1,1]$. Absolute values prevent cancellation between entropy contributions, which could make total entropy change an unsuitable denominator (Section IV). These are relative entropy contributions, not percentages of explained variance or intervention effects.

Large-sample normal approximations and the inverse Fisher information provide confidence intervals for the drift coefficients and flows. The algorithm adds an edge when the corresponding flow is significant; normalized magnitude describes its relative importance rather than replacing the significance test.

## Experiments

**Autoregressive network (Section V.A).** Six series contain a three-node cycle, a two-node cycle, and a common driver $X_6$ feeding $X_2$ and $X_5$. With 10,000 observations and noise amplitudes $b_{ii}=1$, the reported significant absolute flows are:

| Direction | Absolute flow, nats per step |
| --- | ---: |
| $1\to2$ | 0.01 |
| $2\to3$ | 0.09 |
| $3\to1$ | 0.05 |
| $4\to5$ | 0.04 |
| $5\to4$ | 0.05 |
| $6\to2$ | 0.19 |
| $6\to5$ | 0.18 |

The paper reports a maximum confidence-interval error of 0.005 at the 90% level and recovers all seven designed inter-variable links, with no significant direct flow between the commonly driven $X_2$ and $X_5$. All six self contributions are significant. Here self effects refer to the derivative model: for a one-step VAR with $\Delta t=1$, its drift diagonal is the VAR diagonal minus one, explaining self effects even at nodes with zero VAR diagonal coefficients.

Normalization gives $|\tau_{6\to2}|=13.2\%$ and $|\tau_{6\to5}|=12.5\%$. The two-node cycle has reported relative flows of 2.4% for $4\to5$ and 8.8% for $5\to4$, despite similar raw magnitudes. Increasing all noise amplitudes to 100 reportedly yields almost the same results; a 500-observation example at that noise amplitude is also reported to retain the intended significant links.

**Coupled oscillators (Section V.B).** Three Rossler systems form a nine-dimensional dynamical system, with $X$ driving $Y$ and $Z$ and no direct coupling between $Y$ and $Z$. The simulation uses second-order Runge-Kutta integration with $\Delta t=0.001$, discards 10,000 of 50,000 steps, and represents each oscillator by its first coordinate for inference. The paper reports the intended directions $X\to Y$ and $X\to Z$, without a significant direct $Y$-$Z$ link, including nearly synchronized regimes above coupling strength $\epsilon=0.15$. Section VI nevertheless acknowledges nonzero reverse-flow estimates where the true reverse influences vanish.

## Limitations

- The general information-flow theory covers nonlinear systems, but this practical estimator assumes linear dynamics; the oscillator results demonstrate qualitative success with residual errors, not exact nonlinear recovery.
- The estimation setup assumes stationary, equally spaced series, diagonal additive noise, and large-sample inference. The covariance inversion requires nondegeneracy; the nearly synchronized example does not establish identifiability under exact synchronization.
- Both examples include the common driver in the observed variables. They do not demonstrate recovery under arbitrary unobserved confounding.
- Increasing process-noise amplitudes in a synthetic VAR does not establish robustness to arbitrary measurement noise. The supplied experiments report neither a systematic multi-run benchmark nor a direct quantitative comparison against competing estimators.
- Section III specifies edgewise significance tests without a graph-wide multiple-testing correction. The short-series table is rounded, so its claimed significant-link set cannot be independently reconstructed precisely from the displayed values alone.

The supplied Markdown does not state the paper's publication year, venue, DOI, or arXiv identifier; these are left unspecified.

## Related Concepts

- [[concepts/information-flow-causality|Information-Flow Causality]]: the entropy-rate definition, multivariate estimator, and normalization used here.
- [[concepts/independent-causal-mechanisms|Independent Causal Mechanisms]]: discussed in the introduction as part of the broader causal-learning context; it is not the estimator's derivation principle.

## Related Papers

- Liang and Kleeman (2005), "Information transfer between dynamical system components": the framework's early two-dimensional formulation.
- Liang (2014), "Unraveling the cause-effect relation between time series": the bivariate estimator extended here.
- Liang (2015), "Normalizing the causality between time series": the normalization approach generalized here.
- Liang (2016), "Information flow and causality as rigorous notions ab initio": the general theory underlying the estimator.
- Palus et al. (2018), "Causality, dynamical systems and the arrow of time": a source for the coupled-oscillator experimental setup.

[[index|Library home]]
